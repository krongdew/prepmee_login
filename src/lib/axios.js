// import axios from 'axios';
// import { getSession, signOut } from 'next-auth/react';

// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://core-dev.prepmee.co/api/v1';

// /**
//  * Create a base Axios instance with common configuration
//  */
// const apiClient = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   timeout: 15000, // 15 seconds timeout
// });

// /**
//  * Request interceptor to add authentication headers
//  */
// apiClient.interceptors.request.use(
//   async (config) => {
//     // Get session to retrieve the access token
//     const session = await getSession();
    
//     if (session?.accessToken) {
//       config.headers.Authorization = `Bearer ${session.accessToken}`;
//     }
    
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// /**
//  * Response interceptor for handling common errors and token refresh
//  */
// apiClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
    
//     // Handle unauthenticated errors (401)
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
      
//       try {
//         const session = await getSession();
        
//         if (!session?.refreshToken) {
//           // No refresh token available, force logout
//           await signOut({ callbackUrl: '/login' });
//           return Promise.reject(error);
//         }
        
//         // Implement token refresh logic
//         const refreshResponse = await axios.post(`${API_URL}/auth/refresh`, {
//           refreshToken: session.refreshToken
//         });
        
//         if (refreshResponse.data.result?.accessToken) {
//           // Update the session with new tokens (handled by your session provider)
//           // This is a placeholder for the actual session update mechanism
          
//           // Retry the original request with the new token
//           originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.result.accessToken}`;
//           return axios(originalRequest);
//         }
//       } catch (refreshError) {
//         console.error('Failed to refresh token:', refreshError);
//         // Force logout on refresh token failure
//         await signOut({ callbackUrl: '/login' });
//       }
//     }
    
//     // Format error for consistent handling
//     if (error.response?.data) {
//       return Promise.reject({
//         status: error.response.status,
//         data: error.response.data,
//         message: error.response.data.message || error.message
//       });
//     }
    
//     return Promise.reject(error);
//   }
// );

// export default apiClient;
//src\lib\axios.js
// src/lib/axios.js
import axios from 'axios';
import { getSession, signOut, useSession } from 'next-auth/react';

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
 * Function to update the session after token refresh
 * Note: This must be called from a component context where useSession is available
 */
export const updateSession = async (newAccessToken, newRefreshToken = null) => {
  try {
    // In NextAuth.js, you need to make a POST request to update the session
    // This endpoint is automatically handled by NextAuth
    await fetch('/api/auth/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accessToken: newAccessToken,
        ...(newRefreshToken && { refreshToken: newRefreshToken }),
      }),
    });
    
    // Optional: Force session refresh to get the updated tokens
    await getSession({ force: true });
    
    return true;
  } catch (error) {
    console.error('Failed to update session:', error);
    return false;
  }
};

/**
 * Request interceptor to add authentication headers
 */
apiClient.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Store for saving refreshed tokens between requests
 * This helps when multiple requests are failing simultaneously
 */
const tokenRefreshStore = {
  isRefreshing: false,
  newAccessToken: null,
  refreshSubscribers: [],
  
  // Function to subscribe to token refresh
  subscribeToRefresh(callback) {
    this.refreshSubscribers.push(callback);
  },
  
  // Function to notify subscribers about new token
  notifySubscribers(token) {
    this.refreshSubscribers.forEach(callback => callback(token));
    this.refreshSubscribers = [];
  },
  
  // Reset the refresh state
  reset() {
    this.isRefreshing = false;
    this.newAccessToken = null;
  }
};

/**
 * Response interceptor for handling common errors and token refresh
 */
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle network error
    if (!error.response) {
      return Promise.reject({
        status: 0,
        message: 'Network Error. Please check your internet connection.',
        data: null
      });
    }
    
    // Handle unauthenticated errors (401)
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // If already refreshing, wait for the new token
      if (tokenRefreshStore.isRefreshing) {
        try {
          // Wait for the token refresh to complete
          const newToken = await new Promise((resolve, reject) => {
            tokenRefreshStore.subscribeToRefresh(token => {
              resolve(token);
            });
            
            // Add a timeout to prevent infinite waiting
            setTimeout(() => {
              reject(new Error('Token refresh timeout'));
            }, 10000);
          });
          
          // Use the new token for this request
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return apiClient(originalRequest);
        } catch (waitError) {
          console.error('Waiting for token refresh failed:', waitError);
          await signOut({ callbackUrl: '/login' });
          return Promise.reject(waitError);
        }
      }
      
      // Set refreshing flag
      tokenRefreshStore.isRefreshing = true;
      
      try {
        const session = await getSession();
        
        if (!session?.refreshToken) {
          tokenRefreshStore.reset();
          await signOut({ callbackUrl: '/login' });
          return Promise.reject(error);
        }
        
        // Attempt to refresh the token
        const refreshResponse = await axios.post(`${API_URL}/auth/refresh`, {
          refreshToken: session.refreshToken
        });

        if (refreshResponse.data.result?.accessToken) {
          const newAccessToken = refreshResponse.data.result.accessToken;
          const newRefreshToken = refreshResponse.data.result.refreshToken || null;
          
          // Save the new token for other requests
          tokenRefreshStore.newAccessToken = newAccessToken;
          
          // Try to update the session
          try {
            // In a real application, you would need to call the updateSession function
            // However, this cannot be called directly from an interceptor since it needs React hooks
            // You'll need to handle the session update in your components or through a custom event
            
            // For now, we'll just create a custom event that components can listen for
            if (typeof window !== 'undefined') {
              const tokenRefreshEvent = new CustomEvent('tokenRefresh', {
                detail: { 
                  accessToken: newAccessToken,
                  refreshToken: newRefreshToken
                }
              });
              window.dispatchEvent(tokenRefreshEvent);
            }
          } catch (sessionUpdateError) {
            console.warn('Failed to update session after token refresh:', sessionUpdateError);
            // Continue with the request even if session update fails
          }
          
          // TEMPORARILY attach new token to this request
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          
          // Notify all subscribers about the new token
          tokenRefreshStore.notifySubscribers(newAccessToken);
          tokenRefreshStore.reset();
          
          return apiClient(originalRequest);
        } else {
          tokenRefreshStore.reset();
          await signOut({ callbackUrl: '/login' });
          return Promise.reject(error);
        }
      } catch (refreshError) {
        console.error('Failed to refresh token:', refreshError);
        tokenRefreshStore.reset();
        await signOut({ callbackUrl: '/login' });
        return Promise.reject(refreshError);
      }
    }

    // Format error
    return Promise.reject({
      status: error.response.status,
      data: error.response.data,
      message: error.response.data.message || error.message
    });
  }
);

/**
 * Helper hooks and components for handling token refresh
 */
export const useTokenRefreshListener = () => {
  const { update } = useSession();
  
  useEffect(() => {
    // Function to handle token refresh events
    const handleTokenRefresh = async (event) => {
      const { accessToken, refreshToken } = event.detail;
      
      // Use NextAuth's update function to update the session
      if (accessToken) {
        await update({
          accessToken,
          ...(refreshToken && { refreshToken })
        });
      }
    };
    
    // Add event listener
    window.addEventListener('tokenRefresh', handleTokenRefresh);
    
    // Cleanup
    return () => {
      window.removeEventListener('tokenRefresh', handleTokenRefresh);
    };
  }, [update]);
};

// Export both the apiClient and token update functions
export default apiClient;