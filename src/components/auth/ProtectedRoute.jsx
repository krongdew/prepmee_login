'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function ProtectedRoute({ children, requiredRole }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, emailVerified, loading, isAuthenticated, checkEmailVerification } = useAuth();
  
  const [checking, setChecking] = useState(true);
  
  // แยก checkAuth ออกมาเป็น useCallback เพื่อหลีกเลี่ยงการสร้างฟังก์ชันใหม่ทุกครั้งที่ render
  const verifyAccess = useCallback(async () => {
    // ป้องกันการทำงานซ้ำซ้อน
    if (loading) return;
    
    // ถ้าไม่ได้ล็อกอิน ให้ redirect ไปหน้า login
    if (!isAuthenticated) {
      const locale = pathname.split('/')[1];
      const loginPath = requiredRole === 'tutor' ? 'tutor_login' : 'login';
      
      router.replace(`/${locale}/${loginPath}?status=error&message=${encodeURIComponent('Please login to access this page')}`);
      return;
    }
    
    // ตรวจสอบบทบาท
    if (requiredRole && user?.role && user.role !== requiredRole) {
      const locale = pathname.split('/')[1];
      const dashboardPath = user.role === 'tutor' ? 'tutor-dashboard' : 'dashboard';
      
      router.replace(`/${locale}/${dashboardPath}`);
      return;
    }
    
    // ตรวจสอบการยืนยัน email
    if (!emailVerified) {
      // เรียกฟังก์ชัน checkEmailVerification แค่ครั้งเดียว
      const isVerified = await checkEmailVerification();
      
      if (!isVerified) {
        const locale = pathname.split('/')[1];
        const email = user?.email || '';
        const role = user?.role || requiredRole || 'student';
        router.replace(`/${locale}/verify-email?email=${encodeURIComponent(email)}&role=${role}`);
        return;
      }
    }
    
    setChecking(false);
  }, [isAuthenticated, user, emailVerified, pathname, requiredRole, router]); // ไม่รวม checkEmailVerification ใน dependencies
  
  useEffect(() => {
    let isMounted = true;
    
    const checkAuth = async () => {
      if (isMounted) {
        await verifyAccess();
      }
    };
    
    checkAuth();
    
    return () => {
      isMounted = false;
    };
  }, [verifyAccess]);
  
  // แสดง loading ระหว่างตรวจสอบ
  if (checking || loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  // แสดงเนื้อหาหากผ่านการตรวจสอบ
  return children;
}