'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useAuth } from '@/context/AuthContext';

/**
 * Higher-order component to protect dashboard routes
 * Can be used to wrap dashboard layouts
 */
export default function ProtectedRoute({ children, requiredRole }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { user, emailVerified, loading, checkEmailVerification } = useAuth();
  
  const [checking, setChecking] = useState(true);
  
  useEffect(() => {
    const checkAuth = async () => {
      // Wait for NextAuth session status to settle
      if (status === 'loading') return;
      
      // If no session, redirect to login
      if (status === 'unauthenticated') {
        // Extract locale from path
        const locale = pathname.split('/')[1];
        const loginPath = requiredRole === 'tutor' ? 'tutor_login' : 'login';
        
        router.replace(`/${locale}/${loginPath}?status=error&message=${encodeURIComponent('Please login to access this page')}`);
        return;
      }
      
      // Check if session exists and role matches
      if (session && session.role) {
        // If role doesn't match, redirect to appropriate dashboard
        if (requiredRole && session.role !== requiredRole) {
          const locale = pathname.split('/')[1];
          const dashboardPath = session.role === 'tutor' ? 'tutor-dashboard' : 'dashboard';
          
          router.replace(`/${locale}/${dashboardPath}`);
          return;
        }
        
        // Verify email if not already verified
        if (!emailVerified) {
          const isVerified = await checkEmailVerification(session.role);
          
          if (!isVerified) {
            const locale = pathname.split('/')[1];
            router.replace(`/${locale}/verify-email?email=${encodeURIComponent(session.user?.email)}&role=${session.role}`);
            return;
          }
        }
      }
      
      setChecking(false);
    };
    
    checkAuth();
  }, [status, session, pathname, router, requiredRole, emailVerified, checkEmailVerification]);
  
  // Show loading state while checking
  if (checking || loading || status === 'loading') {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  // Render children if authenticated
  return children;
}