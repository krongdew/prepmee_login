// // src/context/AuthContext.js
// 'use client';

// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { authService } from '@/services/api';
// import { useRouter } from 'next/navigation';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     // Check if user is logged in
//     const checkUserLoggedIn = async () => {
//       try {
//         const token = localStorage.getItem('accessToken');
//         if (token) {
//           const userData = await authService.getProfile();
//           setUser(userData);
//         }
//       } catch (error) {
//         console.error('Auth check failed:', error);
//         // Clear invalid token
//         authService.logout();
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkUserLoggedIn();
//   }, []);

//   // Register user
//   const register = async (userData) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const data = await authService.register(userData);
//       // Redirect to login page in the same locale as current path
//       const locale = window.location.pathname.split('/')[1];
//       router.push(`/${locale}/login`);
//       return data;
//     } catch (error) {
//       setError(error.message);
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Login user
//   const login = async (email, password) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const loginData = await authService.login(email, password);
//       console.log('Login successful, data:', loginData); // Debug: log successful login
      
//       try {
//         // Try to get profile data if login was successful
//         const userData = await authService.getProfile();
//         console.log('Profile data retrieved:', userData); // Debug: log profile data
//         setUser(userData);
//       } catch (profileError) {
//         console.error('Failed to get profile after login:', profileError);
//         // Don't throw an error here - if login was successful but profile fetch fails,
//         // we still want to redirect the user to the dashboard
//       }
      
//       // Redirect to dashboard page in the same locale as current path
//       const locale = window.location.pathname.split('/')[1];
//       console.log(`Redirecting to dashboard: /${locale}/dashboard`);
//       router.push(`/${locale}/dashboard`);
//       return loginData;
//     } catch (error) {
//       console.error('Login error in context:', error); // Debug: log login error
//       setError(error.message);
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Logout user
//   const logout = () => {
//     authService.logout();
//     setUser(null);
//     router.push('/login');
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, error, register, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

// src/context/AuthContext.js
'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '@/services/api';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // ตรวจสอบสถานะการเข้าสู่ระบบเมื่อโหลดแอป
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        // ตรวจสอบว่ามี valid token หรือไม่
        const token = await authService.getValidToken();
        
        if (token) {
          // ถ้ามี token ที่ valid ให้ดึงข้อมูลผู้ใช้
          const userData = await authService.getProfile();
          setUser(userData);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // ล้าง token ที่ไม่ถูกต้อง
        authService.clearTokens();
      } finally {
        setLoading(false);
      }
    };

    checkUserLoggedIn();
  }, []);

  // ตั้งเวลาสำหรับตรวจสอบและ refresh token ทุก 15 นาที
  useEffect(() => {
    const tokenRefreshInterval = setInterval(async () => {
      if (user) {
        try {
          await authService.getValidToken();
        } catch (error) {
          console.error('Token refresh failed:', error);
          // ถ้า refresh token ไม่สำเร็จ ให้บังคับ logout
          logout();
        }
      }
    }, 15 * 60 * 1000); // 15 นาที

    return () => clearInterval(tokenRefreshInterval);
  }, [user]);

  // ลงทะเบียนผู้ใช้
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.register(userData);
      // ไปยังหน้า login ในโลเคลเดียวกัน
      const locale = window.location.pathname.split('/')[1];
      router.push(`/${locale}/login`);
      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // เข้าสู่ระบบ
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const loginData = await authService.login(email, password);
      
      try {
        // ดึงข้อมูลโปรไฟล์หลังจากเข้าสู่ระบบสำเร็จ
        const userData = await authService.getProfile();
        setUser(userData);
      } catch (profileError) {
        console.error('Failed to get profile after login:', profileError);
      }
      
      // ไปยังหน้า dashboard ในโลเคลเดียวกัน
      const locale = window.location.pathname.split('/')[1];
      router.push(`/${locale}/dashboard`);
      return loginData;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ออกจากระบบ
  const logout = () => {
    authService.logout();
    setUser(null);
    const locale = window.location.pathname.split('/')[1];
    router.push(`/${locale}/login`);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      error, 
      register, 
      login, 
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);