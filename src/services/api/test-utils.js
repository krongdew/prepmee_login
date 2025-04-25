// src/services/api/test-utils.js
import { axiosInstance, studentAxios, tutorAxios, setDirectAccessToken } from './axios-config';
import tokenService from './token.service';

/**
 * โมดูลสำหรับการทดสอบ API ตามเอกสาร Postman
 * ใช้สำหรับทดสอบการเรียก API โดยตรงตามรูปแบบใน Postman
 */
export const apiTestUtils = {
  // Member Register - ลงทะเบียนนักเรียน
  memberRegister: async (userData) => {
    try {
      const response = await axiosInstance.post('/member/signup', userData);
      return response.data;
    } catch (error) {
      console.error('Member registration error:', error);
      throw error;
    }
  },

  // Tutor Register - ลงทะเบียนติวเตอร์
  tutorRegister: async (userData) => {
    try {
      const response = await axiosInstance.post('/tutor/signup', userData);
      return response.data;
    } catch (error) {
      console.error('Tutor registration error:', error);
      throw error;
    }
  },

  // Member login with credential - เข้าสู่ระบบนักเรียนด้วย email/password
  memberLogin: async (credentials) => {
    try {
      const response = await axiosInstance.post('/auth/member/signin', credentials);
      
      // บันทึก token หากต้องการใช้ต่อ
      if (response.data?.result?.accessToken) {
        tokenService.setTokens(
          response.data.result.accessToken,
          response.data.result.refreshToken,
          'student'
        );
      }
      
      return response.data;
    } catch (error) {
      console.error('Member login error:', error);
      throw error;
    }
  },

  // Tutor login - เข้าสู่ระบบติวเตอร์ด้วย email/password
  tutorLogin: async (credentials) => {
    try {
      const response = await axiosInstance.post('/auth/tutor/signin', credentials);
      
      // บันทึก token หากต้องการใช้ต่อ
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
      throw error;
    }
  },

  // Member login with Google - เข้าสู่ระบบนักเรียนด้วย Google
  memberGoogleLogin: async (googleData) => {
    try {
      const response = await axiosInstance.post('/auth/member/google-auth', googleData);
      
      // บันทึก token หากต้องการใช้ต่อ
      if (response.data?.result?.accessToken) {
        tokenService.setTokens(
          response.data.result.accessToken,
          response.data.result.refreshToken,
          'student'
        );
      }
      
      return response.data;
    } catch (error) {
      console.error('Member Google login error:', error);
      throw error;
    }
  },

  // Member Get Profile - ดึงข้อมูลโปรไฟล์นักเรียน
  getMemberProfile: async (token) => {
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      
      const response = await axiosInstance.get('/auth/member/me', { 
        headers 
      });
      
      return response.data;
    } catch (error) {
      console.error('Get member profile error:', error);
      throw error;
    }
  },

  // Tutor Get Profile - ดึงข้อมูลโปรไฟล์ติวเตอร์
  getTutorProfile: async (token) => {
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      
      const response = await axiosInstance.get('/auth/tutor/me', { 
        headers 
      });
      
      return response.data;
    } catch (error) {
      console.error('Get tutor profile error:', error);
      throw error;
    }
  },

  // Subjects - ดึงรายการวิชา
  getSubjects: async () => {
    try {
      const response = await axiosInstance.get('/common/subjects');
      return response.data;
    } catch (error) {
      console.error('Get subjects error:', error);
      throw error;
    }
  },

  // Provinces - ดึงรายการจังหวัด
  getProvinces: async () => {
    try {
      const response = await axiosInstance.get('/common/provinces');
      return response.data;
    } catch (error) {
      console.error('Get provinces error:', error);
      throw error;
    }
  },

  // สำหรับตั้ง token โดยตรงเมื่อต้องการเรียก API ที่ต้องการการยืนยันตัวตน
  setToken: (token, role = 'student') => {
    setDirectAccessToken(token, role);
    return true;
  },

  // สร้างฟังก์ชั่นสำหรับช่วยแปลง format ระหว่าง camelCase และ snake_case
  transformToCamelCase: (obj) => {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map(v => apiTestUtils.transformToCamelCase(v));
    }

    return Object.keys(obj).reduce((result, key) => {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
      result[camelKey] = apiTestUtils.transformToCamelCase(obj[key]);
      return result;
    }, {});
  },

  transformToSnakeCase: (obj) => {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map(v => apiTestUtils.transformToSnakeCase(v));
    }

    return Object.keys(obj).reduce((result, key) => {
      const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
      result[snakeKey] = apiTestUtils.transformToSnakeCase(obj[key]);
      return result;
    }, {});
  }
};

export default apiTestUtils;