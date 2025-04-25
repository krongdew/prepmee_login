// src/services/api/axios-config.js
import axios from 'axios';

// Base API URL - ตั้งค่าให้ตรงกับ API ในเอกสาร Postman
export const API_URL = 'https://core-dev.prepmee.co/api/v1';

// สร้าง request timeout ที่เหมาะสม (กำหนดเป็น 30 วินาที)
const REQUEST_TIMEOUT = 30000;

// สร้าง Axios instance พื้นฐาน (ไม่มี auth token)
export const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// สร้าง Axios instance สำหรับ student (member)
export const studentAxios = axios.create({
  baseURL: API_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// สร้าง Axios instance สำหรับ tutor
export const tutorAxios = axios.create({
  baseURL: API_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// ฟังก์ชันเฮลเปอร์สำหรับการจัดการ error
export const handleApiError = (error) => {
  // กรณีระบบส่ง response กลับมาพร้อม error
  if (error.response) {
    // คืนค่า error message จาก API หรือใช้ข้อความทั่วไปถ้าไม่มี
    return error.response.data?.message || 
           error.response.data?.error || 
           `Error ${error.response.status}: ${error.response.statusText}`;
  } 
  // กรณีส่ง request แล้วไม่ได้รับ response (เช่น network error)
  else if (error.request) {
    console.error('Network error:', error.request);
    return 'Network error. Please check your internet connection.';
  } 
  // กรณีเกิด error อื่นๆ ก่อนการส่ง request
  else {
    console.error('Request error:', error.message);
    return error.message || 'An unexpected error occurred';
  }
};

// เพิ่มฟังก์ชันสำหรับตั้งค่า token โดยตรง (สำหรับการทดสอบเฉพาะ endpoint)
export const setDirectAccessToken = (token, role = 'student') => {
  if (role === 'tutor') {
    tutorAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    studentAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

// Export เฉพาะ axios instances และ helper functions
export default {
  axiosInstance,
  studentAxios,
  tutorAxios,
  handleApiError,
  setDirectAccessToken
};