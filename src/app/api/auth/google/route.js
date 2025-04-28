// /app/api/auth/google/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';

export async function POST(request) {
  try {
    const { credential, client_id } = await request.json();
    
    // เรียก API ของคุณเพื่อยืนยันตัวตนกับ Google
    const response = await axios.post('https://core-dev.prepmee.co/api/v1/auth/member/google-auth', {
      credential,
      client_id
    });
    
    const data = response.data;
    
    if (data.result) {
      // สร้าง HTTP-only cookies
      const cookieStore = await cookies();
      
      // ตั้งค่า accessToken cookie
      cookieStore.set('accessToken', data.result.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600, // 1 ชั่วโมง
        path: '/',
        sameSite: 'lax'
      });
      
      // ตั้งค่า refreshToken cookie
      if (data.result.refreshToken) {
        cookieStore.set('refreshToken', data.result.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 7 * 24 * 60 * 60, // 7 วัน
          path: '/',
          sameSite: 'lax'
        });
      }
      
      // ส่งกลับข้อมูลผู้ใช้ (ไม่ส่ง tokens) พร้อมกำหนดค่าเริ่มต้นสำหรับฟิลด์ที่จำเป็น
      return NextResponse.json({
        success: true,
        user: {
          email: data.result.email || '',
          name: data.result.name || '',
          role: data.result.role || 'student',
          display_name: data.result.display_name || data.result.name || 'User',
          gender:data.result.gender || ''
          // เพิ่มฟิลด์จำเป็นอื่นๆ ที่อาจไม่มีจาก API พร้อมค่าเริ่มต้น
        }
      });
    }
    
    return NextResponse.json({ success: false, message: data.message || 'Authentication failed' });
  } catch (error) {
    console.error('Google authentication error:', error);
    return NextResponse.json({ 
      success: false, 
      message: error.response?.data?.message || 'Authentication failed' 
    }, { status: 500 });
  }
}