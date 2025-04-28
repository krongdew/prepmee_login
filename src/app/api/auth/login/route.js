// /app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';

export async function POST(request) {
  try {
    const { email, password, role } = await request.json();
    
    // เลือก endpoint ตามบทบาท
    const endpoint = role === 'tutor'
      ? 'https://core-dev.prepmee.co/api/v1/auth/tutor/signin'
      : 'https://core-dev.prepmee.co/api/v1/auth/member/signin';
    
    const response = await axios.post(endpoint, {
      email, 
      password
    });
    
    const data = response.data;
    
    if (data.result?.accessToken) {
      const cookieStore = cookies();
      
      cookieStore.set('accessToken', data.result.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600, // 1 ชั่วโมง
        path: '/',
        sameSite: 'lax'
      });
      
      if (data.result.refreshToken) {
        cookieStore.set('refreshToken', data.result.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 7 * 24 * 60 * 60, // 7 วัน
          path: '/',
          sameSite: 'lax'
        });
      }
      
      return NextResponse.json({
        success: true,
        user: {
          email: data.result.email,
          name: data.result.name,
          role: role
        }
      });
    }
    
    return NextResponse.json({ success: false, message: data.message || 'Login failed' });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ 
      success: false, 
      message: error.response?.data?.message || 'Login failed' 
    }, { status: 500 });
  }
}