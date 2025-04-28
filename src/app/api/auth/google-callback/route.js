//src\app\api\auth\google-callback\route.js
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://core-dev.prepmee.co/api/v1';

/**
 * Google authentication callback handler
 */
export async function GET(request) {
  try {
    // Get the role from query parameters
    const url = new URL(request.url);
    const role = url.searchParams.get('role') || 'student';
    
    // Get JWT token containing Google credentials
    const token = await getToken({ req: request });
    
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    // Determine which endpoint to call based on role
    const endpoint = role === 'tutor' 
      ? `${API_URL}/auth/tutor/google-auth` 
      : `${API_URL}/auth/member/google-auth`;
    
    // Call API to authenticate with Google
    const response = await axios.post(endpoint, {
      credential: token.idToken, // The Google ID token
      client_id: process.env.GOOGLE_CLIENT_ID
    });
    
    if (response.data.result) {
      // Get user profile to check if email is verified
      const profileEndpoint = role === 'tutor' 
        ? `${API_URL}/auth/tutor/me` 
        : `${API_URL}/auth/member/me`;
      
      try {
        const profileResponse = await axios.get(profileEndpoint, {
          headers: {
            Authorization: `Bearer ${response.data.result.accessToken}`
          }
        });
        
        const isVerified = profileResponse.data.result?.email_verified || false;
        
        // Redirect based on verification status
        if (isVerified) {
          const dashboardPath = role === 'tutor' ? '/tutor-dashboard' : '/dashboard';
          return NextResponse.redirect(new URL(dashboardPath, request.url));
        } else {
          const email = profileResponse.data.result?.email || token.email;
          return NextResponse.redirect(
            new URL(`/verify-email?email=${encodeURIComponent(email)}&role=${role}`, request.url)
          );
        }
      } catch (profileError) {
        console.error('Failed to get user profile:', profileError);
        // Redirect to verification page as fallback
        const email = token.email;
        return NextResponse.redirect(
          new URL(`/verify-email?email=${encodeURIComponent(email)}&role=${role}`, request.url)
        );
      }
    }
    
    // If we couldn't authenticate, redirect to login with error
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent('Failed to authenticate with Google')}`, request.url)
    );
  } catch (error) {
    console.error('Google callback error:', error);
    
    // Redirect to login with error message
    const errorMessage = error.response?.data?.message || 'Authentication failed';
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(errorMessage)}`, request.url)
    );
  }
}