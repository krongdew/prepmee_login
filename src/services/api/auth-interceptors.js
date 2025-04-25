// src/services/api/auth-interceptors.js
import { studentAxios, tutorAxios, axiosInstance, API_URL } from './axios-config';
import tokenService from './token.service';

// เก็บค่า request ที่รออยู่ระหว่างการ refresh token
let isRefreshing = false;
const studentSubscribers = [];
const tutorSubscribers = [];

// Function to set up queue for retry
const addSubscriber = (role, callback) => {
  if (role === 'tutor') {
    tutorSubscribers.push(callback);
  } else {
    studentSubscribers.push(callback);
  }
};

// Function to process subscribers queue
const onTokenRefreshed = (role, newToken) => {
  const subscribers = role === 'tutor' ? tutorSubscribers : studentSubscribers;
  subscribers.forEach(callback => callback(newToken));
  if (role === 'tutor') {
    tutorSubscribers.length = 0;
  } else {
    studentSubscribers.length = 0;
  }
};

// Function to handle token refresh
const refreshAuthToken = async (role) => {
    // เช็คก่อนว่ามีการ login หรือไม่
    const userType = localStorage.getItem('userType');
    if (!userType || userType !== role) {
      console.warn(`ไม่มีผู้ใช้ login สำหรับบทบาท ${role}`);
      return null;
    }
  
    try {
      const refreshToken = tokenService.getRefreshToken(role);
      
      if (!refreshToken) {
        console.warn(`ไม่พบโทเค็นรีเฟรชสำหรับ ${role}`);
        tokenService.clearTokens(role);
        return null;
      }
  
      // โค้ดการรีเฟรชโทเค็นต่อไป
    } catch (error) {
      console.error(`การรีเฟรชโทเค็นล้มเหลวสำหรับ ${role}:`, error);
      tokenService.clearTokens(role);
      return null;
    }
  };

// ตั้งค่า interceptors สำหรับ student axios instance
const setupStudentInterceptors = () => {
    studentAxios.interceptors.request.use(
      async (config) => {
        try {
          // ตรวจสอบก่อนว่ามีการ login หรือไม่
          const userType = localStorage.getItem('userType');
          if (userType !== 'student') {
            console.warn('ไม่มีการ login เป็นนักเรียน');
            return config; // ส่ง request ต่อโดยไม่มี token
          }
  
          let token = tokenService.getAccessToken('student');
          
          if (token && !tokenService.isTokenExpired(token)) {
            config.headers.Authorization = `Bearer ${token}`;
          } else {
            const newToken = await refreshAuthToken('student');
            if (newToken) {
              config.headers.Authorization = `Bearer ${newToken}`;
            }
          }
        } catch (error) {
          console.error('Student request interceptor error:', error);
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  };

// ตั้งค่า interceptors สำหรับ tutor axios instance
const setupTutorInterceptors = () => {
  // Request interceptor: เพิ่ม Authorization header ทุกครั้งที่มีการส่ง request
  tutorAxios.interceptors.request.use(
    async (config) => {
      try {
        // ดึง token ปัจจุบัน
        let token = tokenService.getAccessToken('tutor');
        
        // เช็คว่า token ยังไม่หมดอายุ
        if (token && !tokenService.isTokenExpired(token)) {
          config.headers.Authorization = `Bearer ${token}`;
        } else {
          // หาก token หมดอายุ ให้ลอง refresh ใหม่
          const newToken = await refreshAuthToken('tutor');
          config.headers.Authorization = `Bearer ${newToken}`;
        }
      } catch (error) {
        console.error('Tutor request interceptor error:', error);
        // ไม่ใส่ token ใน header หาก refresh token ล้มเหลว
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor: จัดการ refresh token เมื่อได้รับ 401 Unauthorized
  tutorAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      
      // เช็คว่าเป็น error 401 และยังไม่เคยลองทำคำขอซ้ำ
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        // ถ้ากำลัง refresh token อยู่แล้ว ให้รอและ retry เมื่อ refresh เสร็จ
        if (isRefreshing) {
          try {
            const newToken = await new Promise((resolve, reject) => {
              addSubscriber('tutor', (token) => {
                resolve(token);
              });
            });
            
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return tutorAxios(originalRequest);
          } catch (error) {
            return Promise.reject(error);
          }
        }

        // เริ่มกระบวนการ refresh token
        isRefreshing = true;
        
        try {
          const newToken = await refreshAuthToken('tutor');
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return tutorAxios(originalRequest);
        } catch (refreshError) {
          console.error('Failed to refresh token and retry request:', refreshError);
          
          // ในกรณีที่ล้มเหลว อาจต้องมีการ redirect หน้าไปยัง login
          // window.location.href = `/${window.location.pathname.split('/')[1]}/tutor_login`;
          
          return Promise.reject(refreshError);
        }
      }
      
      return Promise.reject(error);
    }
  );
};

// ตั้งค่า global error handler สำหรับ axiosInstance ทั้งหมด
const setupGlobalErrorHandler = () => {
    axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        // จัดการ error อย่างละเอียด
        console.error('API Error:', {
          url: error.config?.url,
          method: error.config?.method,
          status: error.response?.status,
          data: error.response?.data,
          headers: error.config?.headers
        });
  
        // ส่ง error กลับเพื่อให้ที่เรียกใช้จัดการต่อ
        return Promise.reject(error);
      }
    );
  };
  
  // Setup เดียวกันสำหรับ studentAxios และ tutorAxios
  // ไม่ต้องทำซ้ำที่นี่เพราะได้ทำในฟังก์ชันที่เฉพาะเจาะจงแล้ว

// ฟังก์ชันเริ่มต้น interceptors ทั้งหมด
export const setupInterceptors = () => {
  setupStudentInterceptors();
  setupTutorInterceptors();
  setupGlobalErrorHandler();
};

export default {
  setupInterceptors,
  refreshAuthToken
};