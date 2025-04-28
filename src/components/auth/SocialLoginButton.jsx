// /components/auth/SocialLoginButton.jsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "684610343882-n2u6lf9lfl4mjjcb6jlplssd2r640p37.apps.googleusercontent.com";

export default function SocialLoginButtons({ role = 'student' }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const router = useRouter();

  // โค้ดโหลด Google SDK
  useEffect(() => {
    // Only load the Google SDK once
    if (window.google || document.getElementById('google-sdk')) {
      setGoogleLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.id = 'google-sdk';
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      setGoogleLoaded(true);
    };
    
    script.onerror = () => {
      console.error('Failed to load Google SDK');
      setError('Failed to load Google authentication. Please try again later.');
    };
    
    document.body.appendChild(script);
    
    return () => {
      // Cleanup if component unmounts
      if (document.getElementById('google-sdk')) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Initialize Google Sign-In
  useEffect(() => {
    if (!googleLoaded || !window.google) return;
    
    try {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
      });
      
      window.google.accounts.id.renderButton(
        document.getElementById('google-sign-in-button'),
        { theme: 'outline', size: 'large', width: '100%', text: 'continue_with' }
      );
    } catch (error) {
      console.error('Google Sign-In initialization error:', error);
      setError('Failed to initialize Google login. Please try again later.');
    }
  }, [googleLoaded]);

  // Handle Google Sign-In response
  const handleGoogleResponse = async (response) => {
    if (!response || !response.credential) {
      setError('Google authentication failed. Please try again.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      console.log('Google credential received:', response.credential.substring(0, 20) + '...');
      
      // เรียกใช้ API route ของเราด้วย axios
      const result = await axios.post('/api/auth/google', {
        credential: response.credential,
        client_id: GOOGLE_CLIENT_ID
      });

      if (result.data.success) {
        console.log('Authentication successful');
        
        // ทำการเช็คว่า email ถูกยืนยันหรือไม่
        try {
          // เรียก API เพื่อตรวจสอบสถานะ email verification
          const profileResponse = await axios.get('/api/auth/me');
          
          if (profileResponse.data.success) {
            // ถ้ามีโปรไฟล์แสดงว่า email ยืนยันแล้ว นำทางไปยังหน้า dashboard
            const locale = window.location.pathname.split('/')[1] || 'en';
            const dashboardPath = role === 'tutor' ? `/${locale}/tutor-dashboard` : `/${locale}/dashboard`;
            router.push(dashboardPath);
          } else {
            // ถ้าไม่มีโปรไฟล์แสดงว่ายังไม่ยืนยัน email
            const locale = window.location.pathname.split('/')[1] || 'en';
            const email = result.data.user?.email || '';
            router.push(`/${locale}/verify-email?email=${encodeURIComponent(email)}&role=${role}`);
          }
        } catch (profileError) {
          console.error('Failed to check profile:', profileError);
          const locale = window.location.pathname.split('/')[1] || 'en';
          router.push(`/${locale}/verify-email?role=${role}`);
        }
      } else {
        throw new Error(result.data.message || 'Authentication failed. Please try again.');
      }
    } catch (error) {
      console.error('Google login error:', error);
      setError(error.response?.data?.message || error.message || 'Failed to login with Google. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="social-login-container">
      {error && (
        <div className="alert alert-danger mb-3" role="alert">
          {error}
        </div>
      )}
      
      <div className="mb-3">
        {loading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div id="google-sign-in-button" className="w-100"></div>
        )}
      </div>
      
      <div className="mt-3 text-center">
        <small className="text-muted">
          By continuing, you agree to our <a href="/terms" className="text-decoration-underline">Terms of Service</a> and 
          <a href="/privacy" className="text-decoration-underline"> Privacy Policy</a>
        </small>
      </div>
    </div>
  );
}