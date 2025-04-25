// src/services/auth.service.js
const API_URL = 'https://core-dev.prepmee.co/api/v1';

// Helper functions
const isTokenExpired = (token) => {
  if (!token) return true;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch (error) {
    console.error('Token parsing error:', error);
    return true;
  }
};

const getUserRole = (token) => {
  if (!token) return null;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role;
  } catch (error) {
    console.error('Failed to extract role from token:', error);
    return null;
  }
};

export const authService = {
  // Storage keys with role prefixes to avoid conflicts
  getStorageKeys(role) {
    const prefix = role === 'tutor' ? 'tutor_' : 'student_';
    return {
      access: `${prefix}accessToken`,
      refresh: `${prefix}refreshToken`,
      userType: 'userType' // shared key to track current user type
    };
  },

  // Set tokens with proper prefixes
  setTokens(accessToken, refreshToken, role) {
    const keys = this.getStorageKeys(role);
    
    if (accessToken) {
      localStorage.setItem(keys.access, accessToken);
    }
    if (refreshToken) {
      localStorage.setItem(keys.refresh, refreshToken);
    }
    if (role) {
      localStorage.setItem(keys.userType, role);
    }
  },

  // Clear tokens for specific role
  clearTokens(role) {
    const keys = this.getStorageKeys(role);
    localStorage.removeItem(keys.access);
    localStorage.removeItem(keys.refresh);
    localStorage.removeItem(keys.userType);
  },

  // Clear all auth tokens
  clearAllTokens() {
    this.clearTokens('tutor');
    this.clearTokens('student');
  },

  // Get user type (student or tutor)
  getUserType() {
    return localStorage.getItem('userType');
  },

  // Get valid token for the specific role
  async getValidToken(role) {
    const keys = this.getStorageKeys(role);
    const accessToken = localStorage.getItem(keys.access);
    
    // If we have a valid access token, return it
    if (accessToken && !isTokenExpired(accessToken)) {
      // Verify the token belongs to the correct role
      const tokenRole = getUserRole(accessToken);
      if ((role === 'tutor' && tokenRole === 'TUTOR_ACCESS') || 
          (role === 'student' && tokenRole === 'MEMBER_ACCESS')) {
        return accessToken;
      }
    }
    
    // Try to refresh if token is invalid or expired
    return await this.refreshToken(role);
  },

  // Refresh token for specific role
  async refreshToken(role) {
    const keys = this.getStorageKeys(role);
    const refreshToken = localStorage.getItem(keys.refresh);
    
    if (!refreshToken) {
      return null;
    }
    
    if (isTokenExpired(refreshToken)) {
      this.clearTokens(role);
      return null;
    }
    
    try {
      const endpoint = role === 'tutor' ? 'auth/tutor/refresh' : 'auth/refresh';
      const response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }
      
      const data = await response.json();
      
      if (data.result && data.result.accessToken) {
        this.setTokens(data.result.accessToken, null, role);
        return data.result.accessToken;
      }
      
      return null;
    } catch (error) {
      console.error('Token refresh failed:', error);
      this.clearTokens(role);
      return null;
    }
  },

  // Student registration
  async registerStudent(userData) {
    try {
      const response = await fetch(`${API_URL}/member/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email,
          first_name: userData.firstName || userData.displayName.split(' ')[0],
          last_name: userData.lastName || userData.displayName.split(' ').slice(1).join(' '),
          display_name: userData.displayName,
          gender: userData.gender || 'Not specified',
          password: userData.password,
          phone: userData.phone || '',
          bio: userData.bio || '', 
          auth_type: 'credential'
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to register');
      }
      
      return data;
    } catch (error) {
      console.error('Student registration error:', error);
      throw error;
    }
  },

  // Tutor registration
  async registerTutor(userData) {
    try {
      const response = await fetch(`${API_URL}/tutor/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email,
          first_name: userData.firstName || userData.displayName.split(' ')[0],
          last_name: userData.lastName || userData.displayName.split(' ').slice(1).join(' '),
          display_name: userData.displayName,
          gender: userData.gender || 'Not specified',
          password: userData.password,
          phone: userData.phone || '',
          teaching_experience: userData.teachingExperience || '',
          education_background: userData.educationBackground || '',
          teching_province_id: userData.provinceId || '',
          subjects: userData.subjects || [],
          online_mode: userData.onlineMode || false,
          onsite_mode: userData.onsiteMode || false,
          teching_area: userData.teachingArea || ''
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to register');
      }
      
      return data;
    } catch (error) {
      console.error('Tutor registration error:', error);
      throw error;
    }
  },

  // Student login with credentials
  async loginStudent(email, password) {
    try {
      const response = await fetch(`${API_URL}/auth/member/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to login');
      }
      
      if (data.result && data.result.accessToken) {
        this.setTokens(data.result.accessToken, data.result.refreshToken, 'student');
      }
      
      return data;
    } catch (error) {
      console.error('Student login error:', error);
      throw error;
    }
  },

  // Tutor login with credentials
  async loginTutor(email, password) {
    try {
      const response = await fetch(`${API_URL}/auth/tutor/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to login');
      }
      
      if (data.result && data.result.accessToken) {
        this.setTokens(data.result.accessToken, data.result.refreshToken, 'tutor');
      }
      
      return data;
    } catch (error) {
      console.error('Tutor login error:', error);
      throw error;
    }
  },

  // Student login with Google
  async loginStudentGoogle(credential, clientId) {
    try {
      const response = await fetch(`${API_URL}/auth/member/google-auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          credential,
          client_id: clientId
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to login with Google');
      }
      
      if (data.result && data.result.accessToken) {
        this.setTokens(data.result.accessToken, data.result.refreshToken, 'student');
      }
      
      return data;
    } catch (error) {
      console.error('Student Google login error:', error);
      throw error;
    }
  },

  // Tutor login with Google
  async loginTutorGoogle(credential, clientId) {
    try {
      const response = await fetch(`${API_URL}/auth/tutor/google-auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          credential,
          client_id: clientId
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to login with Google');
      }
      
      if (data.result && data.result.accessToken) {
        this.setTokens(data.result.accessToken, data.result.refreshToken, 'tutor');
      }
      
      return data;
    } catch (error) {
      console.error('Tutor Google login error:', error);
      throw error;
    }
  },

  // Get student profile
  async getStudentProfile() {
    try {
      const token = await this.getValidToken('student');
      
      if (!token) {
        throw new Error('No valid authentication token found');
      }
      
      const response = await fetch(`${API_URL}/auth/member/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to get profile');
      }
      
      if (data.result) {
        return { ...data.result, userType: 'student' };
      } else if (data.data) {
        return { ...data.data, userType: 'student' };
      } else {
        return { ...data, userType: 'student' };
      }
    } catch (error) {
      console.error('Get student profile error:', error);
      
      if (error.message.includes('authentication') || error.message.includes('token')) {
        this.clearTokens('student');
      }
      
      throw error;
    }
  },

  // Get tutor profile
  async getTutorProfile() {
    try {
      const token = await this.getValidToken('tutor');
      
      if (!token) {
        throw new Error('No valid authentication token found');
      }
      
      const response = await fetch(`${API_URL}/auth/tutor/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to get profile');
      }
      
      if (data.result) {
        return { ...data.result, userType: 'tutor' };
      } else if (data.data) {
        return { ...data.data, userType: 'tutor' };
      } else {
        return { ...data, userType: 'tutor' };
      }
    } catch (error) {
      console.error('Get tutor profile error:', error);
      
      if (error.message.includes('authentication') || error.message.includes('token')) {
        this.clearTokens('tutor');
      }
      
      throw error;
    }
  },

  // Request email verification (common for both roles)
  async requestEmailVerification(email, role) {
    try {
      const endpoint = role === 'tutor' ? 'auth/tutor/request-verification' : 'auth/member/request-verification';
      const response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to request email verification');
      }
      
      return data;
    } catch (error) {
      console.error('Email verification request error:', error);
      throw error;
    }
  },

  // Verify email with code (common for both roles)
  async verifyEmail(email, code, role) {
    try {
      const endpoint = role === 'tutor' ? 'auth/tutor/verify-email' : 'auth/member/verify-email';
      const response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to verify email');
      }
      
      return data;
    } catch (error) {
      console.error('Email verification error:', error);
      throw error;
    }
  },

  // Request password reset (common for both roles)
  async requestPasswordReset(email, role) {
    try {
      const endpoint = role === 'tutor' ? 'auth/tutor/forgot-password' : 'auth/member/forgot-password';
      const response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to request password reset');
      }
      
      return data;
    } catch (error) {
      console.error('Password reset request error:', error);
      throw error;
    }
  },

  // Reset password with code (common for both roles)
  async resetPassword(email, code, newPassword, role) {
    try {
      const endpoint = role === 'tutor' ? 'auth/tutor/reset-password' : 'auth/member/reset-password';
      const response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code, newPassword }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to reset password');
      }
      
      return data;
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    }
  },

  // Logout (works for both roles)
  logout(role) {
    if (role === 'all') {
      this.clearAllTokens();
    } else {
      this.clearTokens(role || this.getUserType());
    }
    return true;
  }
};