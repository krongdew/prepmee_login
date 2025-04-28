// src/services/googleAuthService.js
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://core-dev.prepmee.co/api/v1';
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "684610343882-n2u6lf9lfl4mjjcb6jlplssd2r640p37.apps.googleusercontent.com";

/**
 * Service for handling direct Google authentication
 */
const googleAuthService = {
  /**
   * Authenticate student with Google
   * @param {string} credential - Google JWT credential
   * @returns {Promise} API response with tokens
   */
  async authenticateStudent(credential) {
    try {
      const response = await axios.post(`${API_URL}/auth/member/google-auth`, {
        credential,
        client_id: GOOGLE_CLIENT_ID
      });
      
      return response.data;
    } catch (error) {
      console.error('Student Google authentication error:', error);
      throw error.response?.data || error;
    }
  },
  
  /**
   * Authenticate tutor with Google
   * @param {string} credential - Google JWT credential
   * @returns {Promise} API response with tokens
   */
  async authenticateTutor(credential) {
    try {
      const response = await axios.post(`${API_URL}/auth/tutor/google-auth`, {
        credential,
        client_id: GOOGLE_CLIENT_ID
      });
      
      return response.data;
    } catch (error) {
      console.error('Tutor Google authentication error:', error);
      throw error.response?.data || error;
    }
  },
  
  /**
   * Store authentication tokens
   * @param {string} accessToken - JWT access token
   * @param {string} refreshToken - JWT refresh token
   */
  storeTokens(accessToken, refreshToken) {
    if (typeof window === 'undefined') return;
    
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }
    
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
  },
  
  /**
   * Clear authentication tokens
   */
  clearTokens() {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
};

export default googleAuthService;