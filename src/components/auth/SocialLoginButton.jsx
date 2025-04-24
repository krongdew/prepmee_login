'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

// Google client ID from environment variable
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "684610343882-n2u6lf9lfl4mjjcb6jlplssd2r640p37.apps.googleusercontent.com";
const FACEBOOK_APP_ID = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || "your-facebook-app-id";

export default function SocialLoginButtons({ role = 'student' }) {
  const { loginStudentGoogle, loginTutorGoogle, loading } = useAuth();
  const [error, setError] = useState(null);
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const [facebookLoaded, setFacebookLoaded] = useState(false);

  // Load Google SDK
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

  // Load Facebook SDK
  useEffect(() => {
    // Only load the Facebook SDK once
    if (window.FB || document.getElementById('facebook-sdk')) {
      setFacebookLoaded(true);
      return;
    }

    window.fbAsyncInit = function() {
      window.FB.init({
        appId: FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: 'v18.0' // Use the latest version
      });
      
      setFacebookLoaded(true);
    };

    // Load the SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-sdk'));
  }, []);

  // Handle Google Sign-In response
  const handleGoogleResponse = async (response) => {
    if (!response || !response.credential) {
      setError('Google authentication failed. Please try again.');
      return;
    }

    try {
      if (role === 'tutor') {
        await loginTutorGoogle(response.credential, GOOGLE_CLIENT_ID);
      } else {
        await loginStudentGoogle(response.credential, GOOGLE_CLIENT_ID);
      }
    } catch (error) {
      console.error('Google login error:', error);
      setError(error.message || 'Failed to login with Google. Please try again.');
    }
  };

  // Handle Facebook login
  const handleFacebookLogin = () => {
    if (!window.FB) {
      setError('Facebook SDK not loaded. Please try again later.');
      return;
    }

    window.FB.login(async (response) => {
      if (response.authResponse) {
        try {
          // Get user info and handle login
          window.FB.api('/me', { fields: 'email,name' }, async (userInfo) => {
            // Call your backend with this token and user info
            console.log('Facebook token:', response.authResponse.accessToken);
            console.log('User info:', userInfo);
            
            // Implement Facebook login through backend
            // This would require additional API endpoints on your backend
            alert('Facebook login not fully implemented yet. Please use Google or email login.');
          });
        } catch (error) {
          console.error('Facebook login error:', error);
          setError('Failed to login with Facebook. Please try again.');
        }
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }, { scope: 'email,public_profile' });
  };

  return (
    <div className="social-login-container">
      {error && (
        <div className="alert alert-danger mb-3" role="alert">
          {error}
        </div>
      )}
      
      <div className="mb-3">
        <div id="google-sign-in-button" className="w-100"></div>
      </div>
      
      <div className="mb-3">
        <button 
          className="ud-btn btn-facebook w-100 justify-content-center d-flex align-items-center"
          type="button"
          onClick={handleFacebookLogin}
          disabled={!facebookLoaded || loading}
        >
          <i className="fab fa-facebook-f me-2"></i>
          Continue with Facebook
        </button>
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