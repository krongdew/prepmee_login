// //src\context\AuthContext.js
// 'use client';

// import { createContext, useContext, useState, useEffect } from 'react';
// import { useSession, signOut } from 'next-auth/react';
// import { useRouter, usePathname } from 'next/navigation';
// import authService from '@/services/authService';

// // Create the authentication context
// const AuthContext = createContext({});

// /**
//  * Authentication provider component
//  */
// export function AuthProvider({ children }) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const { data: session, status } = useSession();
  
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [emailVerified, setEmailVerified] = useState(false);
  
//   // Get locale from URL path
//   const getLocale = () => {
//     const parts = pathname.split('/');
//     return parts.length > 1 ? parts[1] : 'en';
//   };
  
//   /**
//    * Redirect to appropriate dashboard based on role
//    */
//   const redirectToDashboard = (role) => {
//     const locale = getLocale();
//     const path = role === 'tutor' ? `/${locale}/tutor-dashboard` : `/${locale}/dashboard`;
//     router.push(path);
//   };
  
//   /**
//    * Redirect to verification page
//    */
//   const redirectToVerification = (email, role) => {
//     const locale = getLocale();
//     router.push(`/${locale}/verify-email?email=${encodeURIComponent(email)}&role=${role}`);
//   };
  
//   /**
//    * Set auth tokens in localStorage
//    */
//   const setTokens = (accessToken, refreshToken) => {
//     if (accessToken) {
//       localStorage.setItem('accessToken', accessToken);
//     }
//     if (refreshToken) {
//       localStorage.setItem('refreshToken', refreshToken);
//     }
//   };

//   /**
//    * Load user profile based on role
//    */
  
//   /**
//    * Load user profile based on role
//    */

// const loadUserProfile = async () => {
//   if (!session) return null;
  
//   try {
//     setLoading(true);
    
//     let profile;
//     if (session.role === 'tutor') {
//       profile = await authService.getTutorProfile();
//     } else {
//       profile = await authService.getStudentProfile();
//     }
    
//     // สำหรับทั้งนักเรียนและติวเตอร์: ถ้ามีข้อมูล profile แสดงว่าอีเมลได้รับการยืนยันแล้ว
//     if (profile) {
//       setEmailVerified(true);
//     } else {
//       setEmailVerified(false);
//     }
    
//     // Set user data
//     setUser(profile);
    
//     return profile;
//   } catch (error) {
//     console.error('Failed to load user profile:', error);
//     setError('Failed to load user profile');
//     setEmailVerified(false);
//     return null;
//   } finally {
//     setLoading(false);
//   }
// };
  
//   // Effect to load user profile when session changes
//   useEffect(() => {
//     const initializeAuth = async () => {
//       if (status === 'loading') return;
      
//       if (session?.accessToken) {
//         const profile = await loadUserProfile();
        
//         // If no profile or email not verified, redirect to verification page
//         if (!profile && pathname !== '/verify-email') {
//           redirectToVerification(session.user?.email, session.role);
//         }
//       } else {
//         setUser(null);
//         setEmailVerified(false);
//       }
      
//       setLoading(false);
//     };
    
//     initializeAuth();
//   }, [session, status]);
  
//   /**
//    * Student login with credentials
//    */

// //src\context\AuthContext.js
// 'use client';

// import { createContext, useContext, useState, useEffect } from 'react';
// import { useSession, signOut } from 'next-auth/react';
// import { useRouter, usePathname } from 'next/navigation';
// import authService from '@/services/authService';

// // Create the authentication context
// const AuthContext = createContext({});

// /**
//  * Authentication provider component
//  */
// export function AuthProvider({ children }) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const { data: session, status } = useSession();
  
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [emailVerified, setEmailVerified] = useState(false);
  
//   // Get locale from URL path
//   const getLocale = () => {
//     const parts = pathname.split('/');
//     return parts.length > 1 ? parts[1] : 'en';
//   };
  
//   /**
//    * Redirect to appropriate dashboard based on role
//    */
//   const redirectToDashboard = (role) => {
//     const locale = getLocale();
//     const path = role === 'tutor' ? `/${locale}/tutor-dashboard` : `/${locale}/dashboard`;
//     router.push(path);
//   };
  
//   /**
//    * Redirect to verification page
//    */
//   const redirectToVerification = (email, role) => {
//     const locale = getLocale();
//     router.push(`/${locale}/verify-email?email=${encodeURIComponent(email)}&role=${role}`);
//   };
  
//   /**
//    * Set auth tokens in localStorage
//    */
//   const setTokens = (accessToken, refreshToken) => {
//     if (accessToken) {
//       localStorage.setItem('accessToken', accessToken);
//     }
//     if (refreshToken) {
//       localStorage.setItem('refreshToken', refreshToken);
//     }
//   };

//   /**
//    * Load user profile based on role
//    */
//   const loadUserProfile = async () => {
//     // Check for tokens either in session or localStorage
//     const accessToken = session?.accessToken || localStorage.getItem('accessToken');
//     const role = session?.role || (pathname.includes('tutor') ? 'tutor' : 'student');
    
//     if (!accessToken) return null;
    
//     try {
//       setLoading(true);
      
//       let profile;
//       if (role === 'tutor') {
//         profile = await authService.getTutorProfile();
//       } else {
//         profile = await authService.getStudentProfile();
//       }
      
//       // If we have a profile, email is verified
//       if (profile) {
//         setEmailVerified(true);
//       } else {
//         setEmailVerified(false);
//       }
      
//       // Set user data
//       setUser(profile);
      
//       return profile;
//     } catch (error) {
//       console.error('Failed to load user profile:', error);
//       setError('Failed to load user profile');
//       setEmailVerified(false);
//       return null;
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   // Effect to load user profile when session changes
//   useEffect(() => {
//     const initializeAuth = async () => {
//       if (status === 'loading') return;
      
//       // Check for tokens either in session or localStorage
//       const accessToken = session?.accessToken || localStorage.getItem('accessToken');
      
//       if (accessToken) {
//         const profile = await loadUserProfile();
        
//         // If no profile or email not verified, redirect to verification page
//         if (!profile && pathname !== '/verify-email') {
//           const email = session?.user?.email || user?.email;
//           const role = session?.role || (pathname.includes('tutor') ? 'tutor' : 'student');
//           redirectToVerification(email, role);
//         }
//       } else {
//         setUser(null);
//         setEmailVerified(false);
//       }
      
//       setLoading(false);
//     };
    
//     initializeAuth();
//   }, [session, status]);
// }
  
//   /**
//    * Tutor login with credentials
//    */
//   const loginTutor = async (email, password) => {
//     try {
//       setLoading(true);
//       setError('');
      
//       const result = await authService.loginTutor(email, password);
      
//       if (result.error) {
//         throw new Error(result.error);
//       }
      
//       const profile = await loadUserProfile();
      
//       if (profile) {
//         if (profile.email_verified) {
//           redirectToDashboard('tutor');
//         } else {
//           redirectToVerification(email, 'tutor');
//         }
//       } else {
//         redirectToVerification(email, 'tutor');
//       }
      
//       return result;
//     } catch (error) {
//       setError(error.message || 'Login failed');
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   /**
//    * Student login with Google
//    */
//   const loginStudentGoogle = async () => {
//     try {
//       setLoading(true);
//       setError('');
      
//       await authService.loginStudentGoogle();
      
//       // Google login is handled by NextAuth callback
//       // We don't need to do anything here as the redirect will be handled by NextAuth
//     } catch (error) {
//       setError(error.message || 'Google login failed');
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   /**
//    * Tutor login with Google
//    */
//   const loginTutorGoogle = async () => {
//     try {
//       setLoading(true);
//       setError('');
      
//       await authService.loginTutorGoogle();
      
//       // Google login is handled by NextAuth callback
//       // We don't need to do anything here as the redirect will be handled by NextAuth
//     } catch (error) {
//       setError(error.message || 'Google login failed');
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   /**
//    * Student registration
//    */
//   const registerStudent = async (userData) => {
//     try {
//       setLoading(true);
//       setError('');
      
//       const result = await authService.registerStudent(userData);
      
//       if (result) {
//         // After registration, redirect to verification page
//         const locale = getLocale();
//         router.push(`/${locale}/verify-email?email=${encodeURIComponent(userData.email)}&role=student`);
//       }
      
//       return result;
//     } catch (error) {
//       setError(error.message || 'Registration failed');
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   /**
//    * Tutor registration
//    */
//   const registerTutor = async (userData) => {
//     try {
//       setLoading(true);
//       setError('');
      
//       const result = await authService.registerTutor(userData);
      
//       if (result) {
//         // After registration, redirect to verification page
//         const locale = getLocale();
//         router.push(`/${locale}/verify-email?email=${encodeURIComponent(userData.email)}&role=tutor`);
//       }
      
//       return result;
//     } catch (error) {
//       setError(error.message || 'Registration failed');
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   /**
//    * Request email verification
//    */
//   const requestEmailVerification = async (email, role) => {
//     try {
//       setLoading(true);
//       setError('');
      
//       await authService.requestEmailVerification(email, role);
//     } catch (error) {
//       setError(error.message || 'Failed to request verification');
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   /**
//    * Check email verification status
//    */
//   const checkEmailVerification = async () => {
//     if (!session) return false;
    
//     try {
//       let profile;
//       if (session.role === 'tutor') {
//         profile = await authService.getTutorProfile();
//       } else {
//         profile = await authService.getStudentProfile();
//       }
      
//       // ถ้าสามารถดึงข้อมูลโปรไฟล์ได้ แสดงว่าอีเมลยืนยันแล้ว
//       const isVerified = !!profile;
//       setEmailVerified(isVerified);
//       return isVerified;
//     } catch (error) {
//       console.error('Failed to check verification status:', error);
//       return false;
//     }
//   };
  
//   /**
//    * Logout user
//    */
//   const logout = async () => {
//     try {
//       setLoading(true);
      
//       const locale = getLocale();
//       await signOut({ callbackUrl: `/${locale}/login` });
      
//       setUser(null);
//       setEmailVerified(false);
//     } catch (error) {
//       console.error('Logout error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   // Context value
//   const value = {
//     user,
//     loading,
//     error,
//     emailVerified,
//     isAuthenticated: !!session?.accessToken,
//     role: session?.role,
//     loginStudent,
//     loginTutor,
//     loginStudentGoogle,
//     loginTutorGoogle,
//     registerStudent,
//     registerTutor,
//     requestEmailVerification,
//     checkEmailVerification,
//     logout,
//     redirectToDashboard,
//     loadUserProfile 
//   };
  
//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// /**
//  * Hook to use authentication context
//  */
// export const useAuth = () => {
//   const context = useContext(AuthContext);
  
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
  
//   return context;
// };
// /context/AuthContext.js
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import axios from 'axios';

// สร้าง context
const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Get locale from URL path
  const getLocale = () => {
    const parts = pathname.split('/');
    return parts.length > 1 ? parts[1] : 'en';
  };
  
  // โหลดข้อมูลผู้ใช้
  const loadUserProfile = async () => {
    try {
      setLoading(true);
      
      const response = await axios.get('/api/auth/me');
      
      if (response.data.success) {
        const userData = {
          ...response.data.user,
          display_name: response.data.user.display_name || response.data.user.name || ''
        };
        
        setUser(userData);
        setEmailVerified(true);
        setIsAuthenticated(true);
        return userData;
        
      } else {
        setUser(null);
        setEmailVerified(false);
        setIsAuthenticated(false);
        return null;
      }
    } catch (error) {
      console.error('Failed to load user profile:', error);
      setUser(null);
      setEmailVerified(false);
      setIsAuthenticated(false);
      setError(error.response?.data?.message || 'Failed to load user profile');
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  // ตรวจสอบสถานะ authentication เมื่อ component โหลด
  useEffect(() => {
    loadUserProfile();
  }, []);
  
  // ล็อกอินนักเรียนด้วย credentials
  const loginStudent = async (email, password) => {
    try {
      setLoading(true);
      setError('');
      
      const response = await axios.post('/api/auth/login', {
        email, 
        password, 
        role: 'student'
      });
      
      if (response.data.success) {
        const profile = await loadUserProfile();
        
        if (profile) {
          if (profile.email_verified) {
            const locale = getLocale();
            router.push(`/${locale}/dashboard`);
          } else {
            const locale = getLocale();
            router.push(`/${locale}/verify-email?email=${encodeURIComponent(email)}&role=student`);
          }
        } else {
          const locale = getLocale();
          router.push(`/${locale}/verify-email?email=${encodeURIComponent(email)}&role=student`);
        }
        
        return response.data;
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message || 'Login failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // ล็อกอินติวเตอร์ด้วย credentials
  const loginTutor = async (email, password) => {
    try {
      setLoading(true);
      setError('');
      
      const response = await axios.post('/api/auth/login', {
        email, 
        password, 
        role: 'tutor'
      });
      
      if (response.data.success) {
        const profile = await loadUserProfile();
        
        if (profile) {
          if (profile.email_verified) {
            const locale = getLocale();
            router.push(`/${locale}/tutor-dashboard`);
          } else {
            const locale = getLocale();
            router.push(`/${locale}/verify-email?email=${encodeURIComponent(email)}&role=tutor`);
          }
        } else {
          const locale = getLocale();
          router.push(`/${locale}/verify-email?email=${encodeURIComponent(email)}&role=tutor`);
        }
        
        return response.data;
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message || 'Login failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // ออกจากระบบ
  const logout = async () => {
    try {
      setLoading(true);
      
      await axios.post('/api/auth/logout');
      
      setUser(null);
      setEmailVerified(false);
      setIsAuthenticated(false);
      
      const locale = getLocale();
      router.push(`/${locale}/login`);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // ตรวจสอบสถานะการยืนยัน email
  const checkEmailVerification = async () => {
    try {
      const profile = await loadUserProfile();
      const isVerified = !!profile;
      setEmailVerified(isVerified);
      return isVerified;
    } catch (error) {
      console.error('Failed to check verification status:', error);
      return false;
    }
  };
  
  // ขอการยืนยัน email
  const requestEmailVerification = async (email, role) => {
    try {
      setLoading(true);
      setError('');
      
      const response = await axios.post('/api/auth/request-verification', {
        email,
        role
      });
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to request verification');
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message || 'Failed to request verification');
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // สร้าง value สำหรับ context
  const value = {
    user,
    loading,
    error,
    emailVerified,
    isAuthenticated,
    role: user?.role || '',
    loginStudent,
    loginTutor,
    requestEmailVerification,
    checkEmailVerification,
    logout,
    loadUserProfile
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
