// // src/services/api.js
// const API_URL = 'https://core-dev.prepmee.co/api/v1';

// export const authService = {
//   // Register user with credentials
//   async register(userData) {
//     try {
//       const response = await fetch(`${API_URL}/user/signup`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           firstname: userData.displayName.split(' ')[0] || userData.displayName,
//           lastname: userData.displayName.split(' ')[1] || '',
//           email: userData.email,
//           password: userData.password,
//           phone: userData.phone || '',
//           auth_type: 'credential',
//           member_type: 'student'
//         }),
//       });

//       const data = await response.json();
      
//       if (!response.ok) {
//         throw new Error(data.message || 'Failed to register');
//       }
      
//       return data;
//     } catch (error) {
//       console.error('Registration error:', error);
//       throw error;
//     }
//   },

//   // Login user with credentials
//   async login(email, password) {
//     try {
//       const response = await fetch(`${API_URL}/auth/signin`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email,
//           password,
//         }),
//       });

//       const data = await response.json();
      
//       if (!response.ok) {
//         throw new Error(data.message || 'Failed to login');
//       }
      
//       console.log('Login response:', data); // Debug: log the response to see structure
      
//       // Store tokens in localStorage based on the API response structure
//       if (data.result && data.result.accessToken) {
//         localStorage.setItem('accessToken', data.result.accessToken);
        
//         if (data.result.refreshToken) {
//           localStorage.setItem('refreshToken', data.result.refreshToken);
//         }
//       } else if (data.accessToken) {
//         localStorage.setItem('accessToken', data.accessToken);
        
//         if (data.refreshToken) {
//           localStorage.setItem('refreshToken', data.refreshToken);
//         }
//       }
      
//       return data;
//     } catch (error) {
//       console.error('Login error:', error);
//       throw error;
//     }
//   },

//   // Get user profile
//   async getProfile() {
//     try {
//       const token = localStorage.getItem('accessToken');
      
//       console.log('Stored token:', token); // Debug: log the stored token
      
//       if (!token) {
//         throw new Error('No authentication token found');
//       }
      
//       const response = await fetch(`${API_URL}/auth/me`, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       console.log('Profile response status:', response.status); // Debug: log response status
      
//       const data = await response.json();
//       console.log('Profile response data:', data); // Debug: log the profile data
      
//       if (!response.ok) {
//         throw new Error(data.message || 'Failed to get profile');
//       }
      
//       // Handle different response structures
//       if (data.result) {
//         return data.result;
//       } else if (data.data) {
//         return data.data;
//       } else {
//         return data;
//       }
//     } catch (error) {
//       console.error('Get profile error:', error);
//       throw error;
//     }
//   },

//   // Logout user
//   logout() {
//     localStorage.removeItem('accessToken');
//   }
// };

// src/services/api.js
const API_URL = 'https://core-dev.prepmee.co/api/v1';

// ฟังก์ชันสำหรับตรวจสอบ token หมดอายุหรือไม่
const isTokenExpired = (token) => {
  if (!token) return true;
  
  try {
    // แยกส่วน payload จาก token (ส่วนที่สอง หลังจากแยกด้วย .)
    const payload = JSON.parse(atob(token.split('.')[1]));
    // ตรวจสอบว่า exp (expiration time) น้อยกว่าเวลาปัจจุบันหรือไม่
    return payload.exp * 1000 < Date.now();
  } catch (error) {
    console.error('Token parsing error:', error);
    return true; // ถ้าเกิด error ในการอ่าน token ให้ถือว่าหมดอายุ
  }
};

export const authService = {
  // เก็บ tokens ลง localStorage
  setTokens(accessToken, refreshToken) {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
  },

  // ลบ tokens จาก localStorage
  clearTokens() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },

  // ดึง token ที่ valid
  async getValidToken() {
    const accessToken = localStorage.getItem('accessToken');
    console.log('Checking access token:', accessToken ? 'Present' : 'Not present');
    
    // ถ้ามี access token และยังไม่หมดอายุ ให้ใช้ token นั้น
    if (accessToken && !isTokenExpired(accessToken)) {
      console.log('Access token is valid');
      return accessToken;
    }
    
    console.log('Access token is expired or not present, trying refresh token');
    // ถ้า access token หมดอายุ ให้ลองใช้ refresh token
    return await this.refreshToken();
  },

  // Refresh token เพื่อได้ access token ใหม่
  async refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (!refreshToken) {
      return null;
    }
    
    if (isTokenExpired(refreshToken)) {
      this.clearTokens();
      return null;
    }
    
    try {
      // เรียก API เพื่อ refresh token
      // หมายเหตุ: คุณอาจต้องปรับ endpoint ตามที่ backend ของคุณกำหนด
      const response = await fetch(`${API_URL}/auth/refresh`, {
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
      
      // บันทึก token ใหม่
      if (data.result && data.result.accessToken) {
        this.setTokens(data.result.accessToken, null); // ไม่ต้องอัปเดต refreshToken
        return data.result.accessToken;
      }
      
      return null;
    } catch (error) {
      console.error('Token refresh failed:', error);
      this.clearTokens();
      return null;
    }
  },

  // ลงทะเบียนผู้ใช้ด้วย credentials
  async register(userData) {
    try {
      const response = await fetch(`${API_URL}/user/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: userData.displayName.split(' ')[0] || userData.displayName,
          lastname: userData.displayName.split(' ')[1] || '',
          email: userData.email,
          password: userData.password,
          phone: userData.phone || '',
          auth_type: 'credential',
          member_type: 'student'
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to register');
      }
      
      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  // เข้าสู่ระบบด้วย credentials
  async login(email, password) {
    try {
      const response = await fetch(`${API_URL}/auth/signin`, {
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
      
      // บันทึก tokens
      if (data.result && data.result.accessToken) {
        this.setTokens(data.result.accessToken, data.result.refreshToken);
      }
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // ดึงข้อมูลโปรไฟล์ผู้ใช้
  async getProfile() {
    try {
      const token = await this.getValidToken();
      
      if (!token) {
        throw new Error('No valid authentication token found');
      }
      
      const response = await fetch(`${API_URL}/auth/me`, {
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
      
      // จัดการกับรูปแบบข้อมูลต่างๆ ที่อาจได้รับจาก API
      if (data.result) {
        return data.result;
      } else if (data.data) {
        return data.data;
      } else {
        return data;
      }
    } catch (error) {
      console.error('Get profile error:', error);
      
      // ถ้าเกิด error เกี่ยวกับ authentication ให้ล้าง tokens
      if (error.message.includes('authentication') || error.message.includes('token')) {
        this.clearTokens();
      }
      
      throw error;
    }
  },

  // ออกจากระบบ
  logout() {
    this.clearTokens();
  }
};