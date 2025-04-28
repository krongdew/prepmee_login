// /app/api/auth/refresh/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';

export async function GET() {
  try {
    const cookieStore = cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;
    
    if (!refreshToken) {
      return NextResponse.json({ success: false, message: 'No refresh token' }, { status: 401 });
    }
    
    // เรียก API เพื่อรับ token ใหม่
    const response = await axios.post('https://core-dev.prepmee.co/api/v1/auth/refresh', {
      refreshToken
    });
    
    const data = response.data;
    
    if (data.result?.accessToken) {
      // อัปเดต accessToken cookie
      cookieStore.set('accessToken', data.result.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600, // 1 ชั่วโมง
        path: '/',
        sameSite: 'lax'
      });
      
      // อัปเดต refreshToken cookie ถ้ามี
      if (data.result.refreshToken) {
        cookieStore.set('refreshToken', data.result.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 7 * 24 * 60 * 60, // 7 วัน
          path: '/',
          sameSite: 'lax'
        });
      }
      
      return NextResponse.json({ success: true });
    }
    
    return NextResponse.json({ success: false, message: 'Failed to refresh token' }, { status: 401 });
  } catch (error) {
    console.error('Token refresh error:', error);
    return NextResponse.json({ 
      success: false, 
      message: error.response?.data?.message || 'Failed to refresh token' 
    }, { status: 500 });
  }
}