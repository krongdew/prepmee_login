// // src/components/auth/ProtectedRoute.jsx
// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '@/context/AuthContext';

// export default function ProtectedRoute({ children }) {
//   const { user, loading } = useAuth();
//   const router = useRouter();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   useEffect(() => {
//     // Only redirect if component is mounted and loading is complete and user is null
//     if (mounted && !loading && !user) {
//       console.log('Not authenticated, redirecting to login');
//       // Get the current locale from the URL path
//       const locale = window.location.pathname.split('/')[1];
//       router.push(`/${locale}/login`);
//     }
//   }, [user, loading, router, mounted]);

//   // Don't render anything on the server or during initial mount to prevent flash
//   if (!mounted) {
//     return null;
//   }

//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   if (!user) {
//     // Show a loading state while redirecting
//     return (
//       <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
//         <div className="text-center">
//           <div className="spinner-border text-primary mb-3" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//           <p>Redirecting to login...</p>
//         </div>
//       </div>
//     );
//   }

//   return <>{children}</>;
// }
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { authService } from '@/services/api';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isValidToken, setIsValidToken] = useState(null); // เริ่มต้นด้วย null เพื่อระบุว่ายังไม่ได้ตรวจสอบ
  const [isCheckingToken, setIsCheckingToken] = useState(true); // เพิ่มสถานะการตรวจสอบ token

  useEffect(() => {
    setMounted(true);

    // ตรวจสอบความถูกต้องของ token
    const checkToken = async () => {
      try {
        setIsCheckingToken(true);
        const token = await authService.getValidToken();
        console.log('Token validation result:', !!token);
        setIsValidToken(!!token);
      } catch (error) {
        console.error('Token validation failed:', error);
        setIsValidToken(false);
      } finally {
        setIsCheckingToken(false);
      }
    };

    if (mounted) {
      checkToken();
    }
  }, [mounted]);

  useEffect(() => {
    // ทำงานเฉพาะเมื่อตรวจสอบทุกอย่างเสร็จสิ้นแล้วเท่านั้น
    if (mounted && !loading && !isCheckingToken && isValidToken === false) {
      console.log('Not authenticated or invalid token, redirecting to login');
      const locale = window.location.pathname.split('/')[1];
      router.push(`/${locale}/login`);
    }
  }, [user, loading, router, mounted, isValidToken, isCheckingToken]);

  // ยังไม่แสดงอะไรระหว่างการโหลดครั้งแรก
  if (!mounted) {
    return null;
  }

  // แสดง loading indicator ถ้ากำลังโหลดข้อมูลผู้ใช้หรือตรวจสอบ token
  if (loading || isCheckingToken || isValidToken === null) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // ถ้าตรวจสอบแล้วว่า token ไม่ถูกต้อง จะแสดงหน้าโหลดระหว่างการเปลี่ยนเส้นทาง
  if (isValidToken === false) {
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

  // ถ้ามา render ถึงจุดนี้ แสดงว่า token valid แล้ว
  return <>{children}</>;
}