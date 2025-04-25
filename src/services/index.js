// src/services/index.js
// ไฟล์นี้รวบรวม service ทั้งหมดเพื่อให้สามารถนำเข้าได้จากที่เดียว

// นำเข้า services หลัก
import authService from './auth.service';
import userService from './user.service';
import bookingService from './booking.service';
import commonService from './common.service';
import paymentService from './payment.service';

// นำเข้า utility modules
import apiTestUtils from './api/test-utils';
import { setupInterceptors } from './api/auth-interceptors';
import { 
  axiosInstance, 
  studentAxios, 
  tutorAxios,
  handleApiError, 
  setDirectAccessToken 
} from './api/axios-config';

// เริ่มต้น interceptors สำหรับการจัดการ authentication token อัตโนมัติ
setupInterceptors();

// ส่งออก services และ utilities
export {
  // Main services
  authService,
  userService,
  bookingService,
  commonService,
  paymentService,
  
  // API utilities
  apiTestUtils,
  axiosInstance,
  studentAxios,
  tutorAxios,
  handleApiError,
  setDirectAccessToken
};

// ส่งออกเป็น default object สำหรับนำเข้าทั้งหมด
export default {
  auth: authService,
  user: userService,
  booking: bookingService,
  common: commonService,
  payment: paymentService,
  apiTest: apiTestUtils
};