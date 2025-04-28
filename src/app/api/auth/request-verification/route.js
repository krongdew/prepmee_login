// /app/api/auth/request-verification/route.js
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
  try {
    const { email, role } = await request.json();
    
    const endpoint = role === 'tutor'
      ? 'https://core-dev.prepmee.co/api/v1/auth/tutor/request-verification'
      : 'https://core-dev.prepmee.co/api/v1/auth/member/request-verification';
    
    const response = await axios.post(endpoint, { email });
    
    const data = response.data;
    
    if (response.status === 200) {
      return NextResponse.json({ success: true });
    }
    
    return NextResponse.json({ success: false, message: data.message || 'Failed to request verification' });
  } catch (error) {
    console.error('Request verification error:', error);
    return NextResponse.json({ 
      success: false, 
      message: error.response?.data?.message || 'Failed to request verification' 
    }, { status: 500 });
  }
}