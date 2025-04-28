// /app/api/auth/logout/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = cookies();
  
  // ลบ cookies ทั้งหมดที่เกี่ยวข้องกับ authentication
  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');
  
  return NextResponse.json({ success: true });
}