import apiClient from '@/lib/axios';
import { signIn, signOut } from 'next-auth/react';

/**
 * Comprehensive authentication service for Prepmee
 */
const authService = {
  /**
   * Student credential login
   * @param {string} email - Student email
   * @param {string} password - Student password
   * @returns {Promise} - Authentication result
   */
  async loginStudent(email, password) {
    try {
      const result = await signIn('student-credentials', {
        email,
        password,
        redirect: false
      });
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      return result;
    } catch (error) {
      console.error('Student login error:', error);
      throw error;
    }
  },
  
  /**
   * Tutor credential login
   * @param {string} email - Tutor email
   * @param {string} password - Tutor password
   * @returns {Promise} - Authentication result
   */
  async loginTutor(email, password) {
    try {
      const result = await signIn('tutor-credentials', {
        email,
        password,
        redirect: false
      });
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      return result;
    } catch (error) {
      console.error('Tutor login error:', error);
      throw error;
    }
  },
  
  /**
   * Student Google login
   * @param {string} credential - Google authentication credential
   * @returns {Promise} - Authentication result
   */
  async loginStudentGoogle() {
    try {
      const result = await signIn('google', {
        callbackUrl: '/api/auth/google-callback?role=student',
        redirect: false
      });
      
      return result;
    } catch (error) {
      console.error('Student Google login error:', error);
      throw error;
    }
  },
  
  /**
   * Tutor Google login
   * @param {string} credential - Google authentication credential
   * @returns {Promise} - Authentication result
   */
  async loginTutorGoogle() {
    try {
      const result = await signIn('google', {
        callbackUrl: '/api/auth/google-callback?role=tutor',
        redirect: false
      });
      
      return result;
    } catch (error) {
      console.error('Tutor Google login error:', error);
      throw error;
    }
  },
  
  /**
   * Student registration
   * @param {Object} userData - Student registration data
   * @returns {Promise} - Registration result
   */
  async registerStudent(userData) {
    try {
      const response = await apiClient.post('/member/signup', {
        email: userData.email,
        first_name: userData.firstName,
        last_name: userData.lastName,
        display_name: userData.displayName,
        gender: userData.gender || 'Male',
        password: userData.password,
        bio: userData.bio || '',
        phone: userData.phone || ''
      });
      
      return response.data;
    } catch (error) {
      console.error('Student registration error:', error);
      throw error;
    }
  },
  
  /**
   * Tutor registration
   * @param {Object} userData - Tutor registration data
   * @returns {Promise} - Registration result
   */
  async registerTutor(userData) {
    try {
      const response = await apiClient.post('/tutor/signup', {
        email: userData.email,
      first_name: userData.firstName,
      last_name: userData.lastName,
      display_name: userData.displayName,
      gender: userData.gender || 'Male',
      password: userData.password,
      phone: userData.phone || '',
      teaching_experience: userData.teachingExperience,
      education_background: userData.educationBackground,
      teching_province_id: userData.provinceId,
      subjects: userData.subjects,
      online_mode: userData.onlineMode,
      onsite_mode: userData.onsiteMode,
      teching_area: userData.teachingArea || ''
      });
      
      return response.data;
    } catch (error) {
      console.error('Tutor registration error:', error);
      throw error;
    }
  },
  
  /**
   * Get student profile
   * @returns {Promise} - Student profile data
   */
  async getStudentProfile() {
    try {
      const response = await apiClient.get('/auth/member/me');
      return response.data.result || response.data.data || response.data;
    } catch (error) {
      console.error('Get student profile error:', error);
      throw error;
    }
  },
  
  /**
   * Get tutor profile
   * @returns {Promise} - Tutor profile data
   */
  async getTutorProfile() {
    try {
      const response = await apiClient.get('/auth/tutor/me');
      return response.data.result || response.data.data || response.data;
    } catch (error) {
      console.error('Get tutor profile error:', error);
      throw error;
    }
  },
  
  /**
   * Request email verification
   * @param {string} email - User email
   * @param {string} role - User role (student or tutor)
   * @returns {Promise} - Request result
   */
  async requestEmailVerification(email, role) {
    try {
      const endpoint = role === 'tutor' 
        ? '/auth/tutor/request-verification' 
        : '/auth/member/request-verification';
        
      const response = await apiClient.post(endpoint, { email });
      return response.data;
    } catch (error) {
      console.error('Request verification error:', error);
      throw error;
    }
  },
  
  /**
  * Check email verification status
  * @param {string} role - User role (student or tutor)
  * @returns {Promise<boolean>} - Verification status
  */
 async checkEmailVerification(role) {
   try {
     const endpoint = role === 'tutor' 
       ? '/auth/tutor/me' 
       : '/auth/member/me';
       
     const response = await apiClient.get(endpoint);
     
     // ถ้ามีข้อมูลใน response แสดงว่าอีเมลยืนยันแล้ว
     return !!response.data.result || !!response.data.data;
   } catch (error) {
     console.error('Check verification error:', error);
     return false;
   }
 },
  
  /**
   * Logout user
   * @param {string} callbackUrl - URL to redirect after logout
   * @returns {Promise} - Logout result
   */
  async logout(callbackUrl = '/login') {
    try {
      return await signOut({ callbackUrl, redirect: true });
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },
  
  /**
   * Get common data (subjects, provinces, etc.)
   * @returns {Promise} - Common data
   */
  async getCommonData() {
    const subjects = await apiClient.get('/common/subjects');
    const provinces = await apiClient.get('/common/provinces');
    
    return {
      subjects: subjects.data.result || [],
      provinces: provinces.data.result || []
    };
  }
};

export default authService;