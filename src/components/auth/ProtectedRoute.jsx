'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function ProtectedRoute({ children, requiredRole = null }) {
  const { 
    user, 
    loading, 
    userType,
    emailVerified, 
    isAuthenticated,
    checkEmailVerification 
  } = useAuth();
  
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [verificationChecked, setVerificationChecked] = useState(false);

  // เช็คว่า path ปัจจุบันเป็นของ tutor หรือไม่
  const isTutorPath = () => {
    return pathname.includes('(dashboard_tutor)') || pathname.includes('/tutor-dashboard');
  };

  // ตรวจสอบสถานะการยืนยันอีเมล
  useEffect(() => {
    const verifyEmailStatus = async () => {
      if (mounted && isAuthenticated && !verificationChecked) {
        await checkEmailVerification();
        setVerificationChecked(true);
      }
    };

    verifyEmailStatus();
  }, [mounted, isAuthenticated, verificationChecked, checkEmailVerification]);

  // ตั้งค่า component ถูกโหลดแล้ว
  useEffect(() => {
    setMounted(true);
  }, []);

  // จัดการการเปลี่ยนเส้นทาง
  useEffect(() => {
    if (!mounted || loading) return;

    const locale = window.location.pathname.split('/')[1];
    const currentRole = isTutorPath() ? 'tutor' : 'student';
    
    // ถ้ามีการระบุ role ที่ต้องการและผู้ใช้ไม่ตรงกับ role ที่กำหนด
    if (requiredRole && userType !== requiredRole) {
      console.log(`Required role: ${requiredRole}, current user: ${userType}`);
      const loginPath = requiredRole === 'tutor' ? '/tutor_login' : '/login';
      router.push(`/${locale}${loginPath}`);
      return;
    }

    // ถ้าไม่ได้ล็อกอิน
    if (!isAuthenticated) {
      console.log('Not authenticated, redirecting to login');
      const loginPath = currentRole === 'tutor' ? '/tutor_login' : '/login';
      router.push(`/${locale}${loginPath}`);
      return;
    }

    // ถ้า role ไม่ตรงกับ path
    if (userType && userType !== currentRole) {
      console.log(`Role mismatch: User is ${userType} but path is for ${currentRole}`);
      const dashboardPath = userType === 'tutor' ? '/tutor-dashboard' : '/dashboard';
      router.push(`/${locale}${dashboardPath}`);
      return;
    }

    // ถ้ายังไม่ยืนยันอีเมลและตรวจสอบสถานะแล้ว
    if (verificationChecked && !emailVerified && user) {
      console.log('Email not verified, redirecting to email verification page');
      const email = user.email || '';
      router.push(`/${locale}/verify-email?email=${encodeURIComponent(email)}&role=${userType}`);
      return;
    }
  }, [
    user, 
    loading, 
    userType, 
    router, 
    mounted, 
    pathname, 
    isAuthenticated, 
    requiredRole, 
    emailVerified, 
    verificationChecked
  ]);

  // ไม่แสดงเนื้อหาจนกว่าจะมั่นใจเกี่ยวกับสถานะการยืนยันตัวตน
  if (!mounted || loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // ถ้าไม่ได้ล็อกอิน
  if (!isAuthenticated) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // ถ้ายังไม่ยืนยันอีเมลและอยู่ในสถานะตรวจสอบ
  if (verificationChecked && !emailVerified) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Redirecting to email verification...</p>
        </div>
      </div>
    );
  }

  // ผ่านการตรวจสอบทั้งหมด -> แสดงเนื้อหาที่ต้องการป้องกัน
  return <>{children}</>;
}