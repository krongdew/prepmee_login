'use client';

import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { authService } from '@/services/auth.service';
import { useRouter, usePathname } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userType, setUserType] = useState(null); // 'student' or 'tutor'
  const [emailVerified, setEmailVerified] = useState(true); // Assume verified until checked
  const router = useRouter();
  const pathname = usePathname();

  // Check if path is for tutor dashboard
  const isTutorPath = useCallback(() => {
    return pathname.includes('(dashboard_tutor)') || pathname.includes('/tutor-dashboard');
  }, [pathname]);

  // Get correct role based on path or stored value
  const getRole = useCallback(() => {
    if (userType) return userType;
    return isTutorPath() ? 'tutor' : 'student';
  }, [isTutorPath, userType]);

  // Get correct navigation path based on user type
  const getDashboardPath = useCallback((locale) => {
    const role = getRole();
    return `/${locale}/${role === 'tutor' ? 'tutor-dashboard' : 'dashboard'}`;
  }, [getRole]);

  // Check if user is logged in
  const checkUserLoggedIn = useCallback(async () => {
    try {
      setLoading(true);
      const role = getRole();
      const storedUserType = authService.getUserType();
      
      // If path and stored user type don't match, clear tokens
      if (storedUserType && storedUserType !== role) {
        authService.clearTokens(storedUserType);
      }
      
      // Try to get a valid token for the current role
      const token = await authService.getValidToken(role);
      
      if (token) {
        // Get user profile based on role
        let userData;
        if (role === 'tutor') {
          userData = await authService.getTutorProfile();
        } else {
          userData = await authService.getStudentProfile();
        }
        
        setUser(userData);
        setUserType(role);
        // Always set email verified to true - if we can get profile data, user is verified
        setEmailVerified(true);
      } else {
        setUser(null);
        setUserType(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
      setUserType(null);
    } finally {
      setLoading(false);
    }
  }, [getRole]);

  // Initial auth check on mount
  useEffect(() => {
    checkUserLoggedIn();
  }, [checkUserLoggedIn]);

  // Setup token refresh interval
  useEffect(() => {
    if (!user) return;
    
    const tokenRefreshInterval = setInterval(async () => {
      try {
        await authService.getValidToken(userType);
      } catch (error) {
        console.error('Token refresh failed:', error);
        logout();
      }
    }, 15 * 60 * 1000); // 15 minutes
    
    return () => clearInterval(tokenRefreshInterval);
  }, [user, userType]);

  // Student registration
  const registerStudent = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.registerStudent(userData);
      // After registration, redirect to login page instead of verify-email
      const locale = window.location.pathname.split('/')[1];
      router.push(`/${locale}/login?status=success&message=${encodeURIComponent('Registration successful! Please log in.')}`);
      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Tutor registration
  const registerTutor = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.registerTutor(userData);
      // After registration, redirect to login page instead of verify-email
      const locale = window.location.pathname.split('/')[1];
      router.push(`/${locale}/tutor-login?status=success&message=${encodeURIComponent('Application submitted! Please log in.')}`);
      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Student login
  const loginStudent = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const loginData = await authService.loginStudent(email, password);
      
      // Get user profile
      const userData = await authService.getStudentProfile();
      setUser(userData);
      setUserType('student');
      setEmailVerified(true); // Always set to true
      
      // Always redirect to dashboard without checking email verification
      const locale = window.location.pathname.split('/')[1];
      router.push(getDashboardPath(locale));
      
      return loginData;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Tutor login
  const loginTutor = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const loginData = await authService.loginTutor(email, password);
      
      // Get user profile
      const userData = await authService.getTutorProfile();
      setUser(userData);
      setUserType('tutor');
      setEmailVerified(true); // Always set to true
      
      // Always redirect to dashboard without checking email verification
      const locale = window.location.pathname.split('/')[1];
      router.push(getDashboardPath(locale));
      
      return loginData;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Student login with Google
  const loginStudentGoogle = async (credential, clientId) => {
    setLoading(true);
    setError(null);
    try {
      const loginData = await authService.loginStudentGoogle(credential, clientId);
      
      // Get user profile
      const userData = await authService.getStudentProfile();
      setUser(userData);
      setUserType('student');
      setEmailVerified(true); // Always set to true
      
      // Always redirect to dashboard
      const locale = window.location.pathname.split('/')[1];
      router.push(getDashboardPath(locale));
      
      return loginData;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Tutor login with Google
  const loginTutorGoogle = async (credential, clientId) => {
    setLoading(true);
    setError(null);
    try {
      const loginData = await authService.loginTutorGoogle(credential, clientId);
      
      // Get user profile
      const userData = await authService.getTutorProfile();
      setUser(userData);
      setUserType('tutor');
      setEmailVerified(true); // Always set to true
      
      // Always redirect to dashboard
      const locale = window.location.pathname.split('/')[1];
      router.push(getDashboardPath(locale));
      
      return loginData;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Request email verification - keep for future use if needed
  const requestEmailVerification = async (email, role) => {
    setLoading(true);
    setError(null);
    try {
      return await authService.requestEmailVerification(email, role || userType);
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Verify email - keep for future use if needed
  const verifyEmail = async (email, code, role) => {
    setLoading(true);
    setError(null);
    try {
      const result = await authService.verifyEmail(email, code, role || userType);
      setEmailVerified(true);
      
      // If user is logged in, update status
      if (user) {
        setUser({...user, email_verified: true});
      }
      
      return result;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Request password reset
  const requestPasswordReset = async (email, role) => {
    setLoading(true);
    setError(null);
    try {
      return await authService.requestPasswordReset(email, role);
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Reset password
  const resetPassword = async (email, code, newPassword, role) => {
    setLoading(true);
    setError(null);
    try {
      return await authService.resetPassword(email, code, newPassword, role);
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    authService.logout(userType);
    setUser(null);
    setUserType(null);
    setEmailVerified(false);
    
    const locale = window.location.pathname.split('/')[1];
    const loginPath = userType === 'tutor' ? '/tutor-login' : '/login';
    router.push(`/${locale}${loginPath}`);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      error, 
      userType,
      emailVerified,
      registerStudent,
      registerTutor,
      loginStudent,
      loginTutor,
      loginStudentGoogle,
      loginTutorGoogle,
      requestEmailVerification,
      verifyEmail,
      requestPasswordReset,
      resetPassword,
      logout,
      isAuthenticated: !!user,
      isTutor: userType === 'tutor',
      isStudent: userType === 'student'
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);