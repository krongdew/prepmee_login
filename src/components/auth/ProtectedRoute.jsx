'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function ProtectedRoute({ children, requiredRole = null }) {
  const { user, loading, userType, isAuthenticated } = useAuth(); // ลบ emailVerified ออก
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Determine if path is for tutor dashboard
  const isTutorPath = () => {
    return pathname.includes('(dashboard_tutor)') || pathname.includes('/tutor-dashboard');
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || loading) return;

    const locale = window.location.pathname.split('/')[1];
    const currentRole = isTutorPath() ? 'tutor' : 'student';
    
    // If specific role is required and user doesn't match
    if (requiredRole && userType !== requiredRole) {
      console.log(`Required role: ${requiredRole}, current user: ${userType}`);
      const loginPath = requiredRole === 'tutor' ? '/tutor-login' : '/login';
      router.push(`/${locale}${loginPath}`);
      return;
    }

    // If user is not authenticated
    if (!isAuthenticated) {
      console.log('Not authenticated, redirecting to login');
      const loginPath = currentRole === 'tutor' ? '/tutor-login' : '/login';
      router.push(`/${locale}${loginPath}`);
      return;
    }

    // If role mismatch with path
    if (userType && userType !== currentRole) {
      console.log(`Role mismatch: User is ${userType} but path is for ${currentRole}`);
      const dashboardPath = userType === 'tutor' ? '/tutor-dashboard' : '/dashboard';
      router.push(`/${locale}${dashboardPath}`);
      return;
    }

    // ลบโค้ดตรวจสอบการยืนยันอีเมลออกชั่วคราว
    /* 
    // If email is not verified
    if (isAuthenticated && !emailVerified) {
      console.log('Email not verified, redirecting to verification page');
      router.push(`/${locale}/verify-email?email=${encodeURIComponent(user.email)}&role=${userType}`);
      return;
    }
    */
  }, [user, loading, userType, router, mounted, pathname, isAuthenticated, requiredRole]);

  // Not showing content until we're confident about auth state
  if (!mounted || loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // ลบการเช็ค emailVerified ออก
  if (!isAuthenticated) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Verifying your session...</p>
        </div>
      </div>
    );
  }

  // All checks passed, render the protected content
  return <>{children}</>;
}