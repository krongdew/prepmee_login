'use client';

import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { authService } from '@/services/auth.service';
import { useRouter, usePathname } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userType, setUserType] = useState(null); // 'student' หรือ 'tutor'
  const [emailVerified, setEmailVerified] = useState(false); // เริ่มต้นเป็น false จนกว่าจะตรวจสอบแล้ว
  const router = useRouter();
  const pathname = usePathname();

  // เช็คว่า path ปัจจุบันเป็นของ tutor หรือไม่
  const isTutorPath = useCallback(() => {
    return pathname.includes('(dashboard_tutor)') || pathname.includes('/tutor-dashboard');
  }, [pathname]);

  // ดึง role ที่ถูกต้องตาม path หรือค่าที่เก็บไว้
  const getRole = useCallback(() => {
    if (userType) return userType;
    return isTutorPath() ? 'tutor' : 'student';
  }, [isTutorPath, userType]);

  // สร้าง path สำหรับ dashboard ตาม role
  const getDashboardPath = useCallback((locale) => {
    const role = getRole();
    return `/${locale}/${role === 'tutor' ? 'tutor-dashboard' : 'dashboard'}`;
  }, [getRole]);

  // สร้าง path สำหรับหน้ายืนยันอีเมล
  const getVerifyEmailPath = useCallback((locale, email) => {
    const role = getRole();
    return `/${locale}/verify-email?email=${encodeURIComponent(email)}&role=${role}`;
  }, [getRole]);

  // ตรวจสอบสถานะการล็อกอิน
  const checkUserLoggedIn = useCallback(async () => {
    try {
      setLoading(true);
      const role = getRole();
      const storedUserType = authService.getUserType();
      
      // ถ้าไม่มีการ login หรือบทบาทไม่ตรงกัน
      if (!storedUserType || storedUserType !== role) {
        setUser(null);
        setUserType(null);
        return;
      }
      
      // ลองดึง token ที่ถูกต้องสำหรับ role ปัจจุบัน
      const token = await authService.getValidToken(role);
      
      if (token) {
        try {
          // ดึงข้อมูลโปรไฟล์ตาม role
          let userData;
          if (role === 'tutor') {
            userData = await authService.getTutorProfile();
          } else {
            userData = await authService.getStudentProfile();
          }
          
          setUser(userData);
          setUserType(role);
          setEmailVerified(true); // สามารถดึงข้อมูลได้แสดงว่ายืนยันอีเมลแล้ว
        } catch (profileError) {
          // ถ้าเป็นเพราะยังไม่ยืนยันอีเมล
          if (profileError.message === 'EMAIL_NOT_VERIFIED') {
            setEmailVerified(false);
            // ไม่ล้าง token และยังคงถือว่าผู้ใช้ล็อกอินแล้ว แต่ต้องยืนยันอีเมล
          } else {
            // กรณีอื่นๆ ถือว่าไม่ได้ล็อกอิน
            authService.clearTokens(role);
            setUser(null);
            setUserType(null);
          }
        }
      } else {
        setUser(null);
        setUserType(null);
        setEmailVerified(false);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
      setUserType(null);
      setEmailVerified(false);
    } finally {
      setLoading(false);
    }
  }, [getRole]);

  // เช็คสถานะการล็อกอินเมื่อโหลดแอป
  useEffect(() => {
    checkUserLoggedIn();
  }, [checkUserLoggedIn]);

  // ตั้งเวลาให้ refresh token ทุก 15 นาที
  useEffect(() => {
    if (!user) return;
    
    const tokenRefreshInterval = setInterval(async () => {
      try {
        await authService.getValidToken(userType);
      } catch (error) {
        console.error('Token refresh failed:', error);
        logout();
      }
    }, 15 * 60 * 1000); // 15 นาที
    
    return () => clearInterval(tokenRefreshInterval);
  }, [user, userType]);

  // ลงทะเบียนนักเรียน
  const registerStudent = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.registerStudent(userData);
      // หลังจากลงทะเบียน ให้ redirect ไปหน้ายืนยันอีเมล
      const locale = window.location.pathname.split('/')[1];
      router.push(getVerifyEmailPath(locale, userData.email || userData.first_name));
      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ลงทะเบียนติวเตอร์
  const registerTutor = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.registerTutor(userData);
      // หลังจากลงทะเบียน ให้ redirect ไปหน้ายืนยันอีเมล
      const locale = window.location.pathname.split('/')[1];
      router.push(getVerifyEmailPath(locale, userData.email || userData.first_name));
      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // นักเรียนล็อกอิน
  const loginStudent = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const loginData = await authService.loginStudent(email, password);
      
      try {
        // ดึงข้อมูลโปรไฟล์หลังล็อกอินสำเร็จ
        const userData = await authService.getStudentProfile();
        setUser(userData);
        setUserType('student');
        setEmailVerified(true);
        
        // นำทางไปยัง dashboard
        const locale = window.location.pathname.split('/')[1];
        router.push(getDashboardPath(locale));
      } catch (profileError) {
        if (profileError.message === 'EMAIL_NOT_VERIFIED') {
          setEmailVerified(false);
          // นำทางไปยังหน้ายืนยันอีเมล
          const locale = window.location.pathname.split('/')[1];
          router.push(getVerifyEmailPath(locale, email));
        } else {
          throw profileError;
        }
      }
      
      return loginData;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ติวเตอร์ล็อกอิน
  const loginTutor = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const loginData = await authService.loginTutor(email, password);
      
      try {
        // ดึงข้อมูลโปรไฟล์หลังล็อกอินสำเร็จ
        const userData = await authService.getTutorProfile();
        setUser(userData);
        setUserType('tutor');
        setEmailVerified(true);
        
        // นำทางไปยัง dashboard
        const locale = window.location.pathname.split('/')[1];
        router.push(getDashboardPath(locale));
      } catch (profileError) {
        if (profileError.message === 'EMAIL_NOT_VERIFIED') {
          setEmailVerified(false);
          // นำทางไปยังหน้ายืนยันอีเมล
          const locale = window.location.pathname.split('/')[1];
          router.push(getVerifyEmailPath(locale, email));
        } else {
          throw profileError;
        }
      }
      
      return loginData;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // นักเรียนล็อกอินด้วย Google
  const loginStudentGoogle = async (credential, clientId) => {
    setLoading(true);
    setError(null);
    try {
      const loginData = await authService.loginStudentGoogle(credential, clientId);
      
      try {
        // ดึงข้อมูลโปรไฟล์
        const userData = await authService.getStudentProfile();
        setUser(userData);
        setUserType('student');
        setEmailVerified(true);
        
        // นำทางไปยัง dashboard
        const locale = window.location.pathname.split('/')[1];
        router.push(getDashboardPath(locale));
      } catch (profileError) {
        if (profileError.message === 'EMAIL_NOT_VERIFIED') {
          setEmailVerified(false);
          // นำทางไปยังหน้ายืนยันอีเมล - ดึงอีเมลจากผลลัพธ์ของการล็อกอิน
          const locale = window.location.pathname.split('/')[1];
          const email = loginData.result?.email || 'your.email@example.com';
          router.push(getVerifyEmailPath(locale, email));
        } else {
          throw profileError;
        }
      }
      
      return loginData;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ติวเตอร์ล็อกอินด้วย Google
  const loginTutorGoogle = async (credential, clientId) => {
    setLoading(true);
    setError(null);
    try {
      const loginData = await authService.loginTutorGoogle(credential, clientId);
      
      try {
        // ดึงข้อมูลโปรไฟล์
        const userData = await authService.getTutorProfile();
        setUser(userData);
        setUserType('tutor');
        setEmailVerified(true);
        
        // นำทางไปยัง dashboard
        const locale = window.location.pathname.split('/')[1];
        router.push(getDashboardPath(locale));
      } catch (profileError) {
        if (profileError.message === 'EMAIL_NOT_VERIFIED') {
          setEmailVerified(false);
          // นำทางไปยังหน้ายืนยันอีเมล - ดึงอีเมลจากผลลัพธ์ของการล็อกอิน
          const locale = window.location.pathname.split('/')[1];
          const email = loginData.result?.email || 'your.email@example.com';
          router.push(getVerifyEmailPath(locale, email));
        } else {
          throw profileError;
        }
      }
      
      return loginData;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ขอส่งอีเมลยืนยันใหม่
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

  // ยืนยันอีเมลด้วยโค้ด
  const verifyEmail = async (email, code, role) => {
    setLoading(true);
    setError(null);
    try {
      const result = await authService.verifyEmail(email, code, role || userType);
      setEmailVerified(true);
      
      // อัปเดตสถานะผู้ใช้หากอยู่ในระบบแล้ว
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

  // ตรวจสอบสถานะการยืนยันอีเมลโดยตรง
  const checkEmailVerification = async () => {
    setLoading(true);
    try {
      const isVerified = await authService.checkEmailVerificationStatus(userType);
      setEmailVerified(isVerified);
      return isVerified;
    } catch (error) {
      console.error('Error checking email verification:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // ร้องขอรีเซ็ตรหัสผ่าน
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

  // รีเซ็ตรหัสผ่าน
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

  // ออกจากระบบ
  const logout = () => {
    authService.logout(userType);
    setUser(null);
    setUserType(null);
    setEmailVerified(false);
    
    const locale = window.location.pathname.split('/')[1];
    const loginPath = userType === 'tutor' ? '/tutor_login' : '/login';
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
      checkEmailVerification,
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