// /app/api/auth/me/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';

export async function GET() {
  try {
    // แก้ไขจาก cookies() เป็น await cookies()
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    
    if (!accessToken) {
      return NextResponse.json({ success: false, message: 'Not authenticated' }, { status: 401 });
    }
    
    // เลือก endpoint ตามบทบาทผู้ใช้ (ตรวจสอบจาก token)
    // ในกรณีนี้เราจะเรียกทั้งสองและดูว่าอันไหนสำเร็จ
    const endpoints = [
      'https://core-dev.prepmee.co/api/v1/auth/member/me',
      'https://core-dev.prepmee.co/api/v1/auth/tutor/me'
    ];
    
    for (const endpoint of endpoints) {
      try {
        const response = await axios.get(endpoint, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        
        // ถ้า request สำเร็จ
        if (response.status === 200) {
          const data = response.data;
          return NextResponse.json({
            success: true,
            user: data.result || data.data
          });
        }
      } catch (endpointError) {
        console.error('Error fetching from endpoint:', endpoint, endpointError);
      }
    }
    
    // ถ้าไม่สามารถดึงข้อมูลจากทั้งสอง endpoint ได้
    // ลองใช้ refresh token
    return NextResponse.redirect(new URL('/api/auth/refresh', request.url));
  } catch (error) {
    console.error('Auth me error:', error);
    return NextResponse.json({ 
      success: false, 
      message: error.response?.data?.message || 'Failed to get user profile' 
    }, { status: 500 });
  }
}