// src/services/auth.service.js
import { axiosInstance, studentAxios, tutorAxios, handleApiError } from './api/axios-config';
import tokenService from './api/token.service';
import authInterceptors from './api/auth-interceptors';

// เริ่มต้น interceptors เมื่อมีการ import service นี้
authInterceptors.setupInterceptors();

export const authService = {
  // ดึง valid token สำหรับ role ที่ระบุ
  async getValidToken(role) {
    try {
      const token = tokenService.getAccessToken(role);
      
      // ถ้ามี token และยังไม่หมดอายุ
      if (token && !tokenService.isTokenExpired(token)) {
        // ตรวจสอบว่า token ตรงกับ role ที่ต้องการ
        const tokenRole = tokenService.getUserRole(token);
        if ((role === 'tutor' && tokenRole === 'TUTOR_ACCESS') || 
            (role === 'student' && tokenRole === 'MEMBER_ACCESS')) {
          return token;
        }
      }
      
      // ถ้า token ไม่ตรงเงื่อนไข ให้ refresh
      return await authInterceptors.refreshAuthToken(role);
    } catch (error) {
      console.error(`Error getting valid token for ${role}:`, error);
      return null;
    }
  },

  // Student registration (ลงทะเบียนนักเรียน)
  async registerStudent(userData) {
    try {
      const response = await axiosInstance.post('/member/signup', {
        email: userData.email,
        first_name: userData.firstName || userData.first_name,
        last_name: userData.lastName || userData.last_name,
        display_name: userData.displayName || userData.display_name,
        gender: userData.gender || 'Not specified',
        password: userData.password,
        phone: userData.phone || '',
        bio: userData.bio || '', 
        auth_type: 'credential'
      });
      
      return response.data;
    } catch (error) {
      console.error('Student registration error:', error);
      throw new Error(handleApiError(error));
    }
  },

  // Tutor registration (ลงทะเบียนติวเตอร์)
  async registerTutor(userData) {
    try {
      const response = await axiosInstance.post('/tutor/signup', {
        email: userData.email,
        first_name: userData.firstName || userData.first_name,
        last_name: userData.lastName || userData.last_name,
        display_name: userData.displayName || userData.display_name,
        gender: userData.gender || 'Not specified',
        password: userData.password,
        phone: userData.phone || '',
        teaching_experience: userData.teachingExperience || userData.teaching_experience || '',
        education_background: userData.educationBackground || userData.education_background || '',
        teching_province_id: userData.provinceId || userData.teching_province_id || '',
        subjects: userData.subjects || [],
        online_mode: userData.onlineMode || userData.online_mode || false,
        onsite_mode: userData.onsiteMode || userData.onsite_mode || false,
        teching_area: userData.teachingArea || userData.teching_area || ''
      });
      
      return response.data;
    } catch (error) {
      console.error('Tutor registration error:', error);
      throw new Error(handleApiError(error));
    }
  },

  // Student login with credentials (เข้าสู่ระบบนักเรียนด้วยอีเมลและรหัสผ่าน)
  async loginStudent(email, password) {
    try {
      const response = await axiosInstance.post('/auth/member/signin', {
        email,
        password,
      });
      
      if (response.data?.result?.accessToken) {
        tokenService.setTokens(
          response.data.result.accessToken,
          response.data.result.refreshToken,
          'student'
        );
      }
      
      return response.data;
    } catch (error) {
      console.error('Student login error:', error);
      throw new Error(handleApiError(error));
    }
  },

  // Tutor login with credentials (เข้าสู่ระบบติวเตอร์ด้วยอีเมลและรหัสผ่าน)
  async loginTutor(email, password) {
    try {
      const response = await axiosInstance.post('/auth/tutor/signin', {
        email,
        password,
      });
      
      if (response.data?.result?.accessToken) {
        tokenService.setTokens(
          response.data.result.accessToken,
          response.data.result.refreshToken,
          'tutor'
        );
      }
      
      return response.data;
    } catch (error) {
      console.error('Tutor login error:', error);
      throw new Error(handleApiError(error));
    }
  },

  // Student login with Google (เข้าสู่ระบบนักเรียนด้วย Google)
  async loginStudentGoogle(credential, clientId) {
    try {
      const response = await axiosInstance.post('/auth/member/google-auth', {
        credential,
        client_id: clientId
      });
      
      if (response.data?.result?.accessToken) {
        tokenService.setTokens(
          response.data.result.accessToken,
          response.data.result.refreshToken,
          'student'
        );
      }
      
      return response.data;
    } catch (error) {
      console.error('Student Google login error:', error);
      throw new Error(handleApiError(error));
    }
  },

  // Tutor login with Google (เข้าสู่ระบบติวเตอร์ด้วย Google)
  async loginTutorGoogle(credential, clientId) {
    try {
      const response = await axiosInstance.post('/auth/tutor/google-auth', {
        credential,
        client_id: clientId
      });
      
      if (response.data?.result?.accessToken) {
        tokenService.setTokens(
          response.data.result.accessToken,
          response.data.result.refreshToken,
          'tutor'
        );
      }
      
      return response.data;
    } catch (error) {
      console.error('Tutor Google login error:', error);
      throw new Error(handleApiError(error));
    }
  },

  // Get student profile (ดึงข้อมูลโปรไฟล์นักเรียน)
  async getStudentProfile() {
    try {
      const response = await studentAxios.get('/auth/member/me');
      
      const data = response.data;
      if (data.result) {
        return { ...data.result, userType: 'student' };
      } else if (data.data) {
        return { ...data.data, userType: 'student' };
      } else {
        return { ...data, userType: 'student' };
      }
    } catch (error) {
      // ถ้าเป็น error 403 (Forbidden) อาจหมายถึงยังไม่ได้ยืนยันอีเมล
      if (error.response?.status === 403 && 
          error.response?.data?.message?.includes('verify')) {
        throw new Error('EMAIL_NOT_VERIFIED');
      }
      
      console.error('Get student profile error:', error);
      throw new Error(handleApiError(error));
    }
  },

  // Get tutor profile (ดึงข้อมูลโปรไฟล์ติวเตอร์)
  async getTutorProfile() {
    try {
      const response = await tutorAxios.get('/auth/tutor/me');
      
      const data = response.data;
      if (data.result) {
        return { ...data.result, userType: 'tutor' };
      } else if (data.data) {
        return { ...data.data, userType: 'tutor' };
      } else {
        return { ...data, userType: 'tutor' };
      }
    } catch (error) {
      // ถ้าเป็น error 403 (Forbidden) อาจหมายถึงยังไม่ได้ยืนยันอีเมล
      if (error.response?.status === 403 && 
          error.response?.data?.message?.includes('verify')) {
        throw new Error('EMAIL_NOT_VERIFIED');
      }
      
      console.error('Get tutor profile error:', error);
      throw new Error(handleApiError(error));
    }
  },

  // Request email verification (common for both roles)
  async requestEmailVerification(email, role) {
    try {
      const endpoint = role === 'tutor' ? 'auth/tutor/request-verification' : 'auth/member/request-verification';
      const response = await axiosInstance.post(endpoint, { email });
      
      return response.data;
    } catch (error) {
      console.error('Email verification request error:', error);
      throw new Error(handleApiError(error));
    }
  },

  // Verify email with code (common for both roles)
  async verifyEmail(email, code, role) {
    try {
      const endpoint = role === 'tutor' ? 'auth/tutor/verify-email' : 'auth/member/verify-email';
      const response = await axiosInstance.post(endpoint, { email, code });
      
      return response.data;
    } catch (error) {
      console.error('Email verification error:', error);
      throw new Error(handleApiError(error));
    }
  },

  // Check email verification status directly
  async checkEmailVerificationStatus(role) {
    try {
      if (role === 'tutor') {
        await this.getTutorProfile();
      } else {
        await this.getStudentProfile();
      }
      return true; // สามารถดึงข้อมูลได้แสดงว่ายืนยันอีเมลแล้ว
    } catch (error) {
      if (error.message === 'EMAIL_NOT_VERIFIED') {
        return false; // ยังไม่ได้ยืนยันอีเมล
      }
      throw error; // ส่งต่อ error อื่นๆ
    }
  },

  // Refresh token (ต่ออายุ token)
  async refreshToken(role) {
    return await authInterceptors.refreshAuthToken(role);
  },

  // Logout (ออกจากระบบ)
  logout(role) {
    if (role === 'all') {
      tokenService.clearAllTokens();
    } else {
      tokenService.clearTokens(role || tokenService.getUserType());
    }
    return true;
  },

  // เพิ่มเติม: ฟังก์ชัน helper เพื่อความสะดวก
  getUserType() {
    return tokenService.getUserType();
  },

  isAuthenticated(role) {
    const token = tokenService.getAccessToken(role);
    return !!token && !tokenService.isTokenExpired(token);
  }
};

export default authService;