import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://core-dev.prepmee.co/api/v1';

/**
 * Create a base Axios instance with common configuration
 */
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 seconds timeout
});

/**
 * Request interceptor to add authentication headers
 */
apiClient.interceptors.request.use(
  async (config) => {
    // Get session to retrieve the access token
    const session = await getSession();
    
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor for handling common errors and token refresh
 */
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Handle unauthenticated errors (401)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const session = await getSession();
        
        if (!session?.refreshToken) {
          // No refresh token available, force logout
          await signOut({ callbackUrl: '/login' });
          return Promise.reject(error);
        }
        
        // Implement token refresh logic
        const refreshResponse = await axios.post(`${API_URL}/auth/refresh`, {
          refreshToken: session.refreshToken
        });
        
        if (refreshResponse.data.result?.accessToken) {
          // Update the session with new tokens (handled by your session provider)
          // This is a placeholder for the actual session update mechanism
          
          // Retry the original request with the new token
          originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.result.accessToken}`;
          return axios(originalRequest);
        }
      } catch (refreshError) {
        console.error('Failed to refresh token:', refreshError);
        // Force logout on refresh token failure
        await signOut({ callbackUrl: '/login' });
      }
    }
    
    // Format error for consistent handling
    if (error.response?.data) {
      return Promise.reject({
        status: error.response.status,
        data: error.response.data,
        message: error.response.data.message || error.message
      });
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;