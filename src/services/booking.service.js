// src/services/booking.service.js
import { axiosInstance, studentAxios, handleApiError } from './api/axios-config';

export const bookingService = {
  // ===== ส่วนที่ไม่ต้องการการยืนยันตัวตน (ไม่ต้องใช้ token) =====
  
  // ค้นหาติวเตอร์
  searchTutors: async (searchParams) => {
    try {
      const response = await axiosInstance.get('/tutors/search', { params: searchParams });
      return response.data;
    } catch (error) {
      console.error('Error searching tutors:', error);
      throw new Error(handleApiError(error));
    }
  },

  // ดึงข้อมูลรายละเอียดติวเตอร์
  getTutorDetails: async (tutorId) => {
    try {
      const response = await axiosInstance.get(`/tutors/${tutorId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting tutor details:', error);
      throw new Error(handleApiError(error));
    }
  },

  // ดึงรายการวิชาที่ติวเตอร์สอน
  getTutorSubjects: async (tutorId) => {
    try {
      const response = await axiosInstance.get(`/tutors/${tutorId}/subjects`);
      return response.data;
    } catch (error) {
      console.error('Error getting tutor subjects:', error);
      throw new Error(handleApiError(error));
    }
  },

  // ดึงตารางเวลาสอนของติวเตอร์
  getTutorSchedule: async (tutorId, dateRange) => {
    try {
      const response = await axiosInstance.get(`/tutors/${tutorId}/schedule`, { 
        params: dateRange 
      });
      return response.data;
    } catch (error) {
      console.error('Error getting tutor schedule:', error);
      throw new Error(handleApiError(error));
    }
  },

  // ตรวจสอบความพร้อมของติวเตอร์ในช่วงเวลาที่ต้องการ
  checkTutorAvailability: async (tutorId, scheduleData) => {
    try {
      const response = await axiosInstance.post(`/tutors/${tutorId}/check-availability`, scheduleData);
      return response.data;
    } catch (error) {
      console.error('Error checking tutor availability:', error);
      throw new Error(handleApiError(error));
    }
  },

  // ===== ส่วนที่ต้องการการยืนยันตัวตน (ต้องใช้ token) =====
  
  // จองคลาสเรียนกับติวเตอร์
  bookSession: async (bookingData) => {
    try {
      const response = await studentAxios.post('/bookings', bookingData);
      return response.data;
    } catch (error) {
      console.error('Error booking session:', error);
      throw new Error(handleApiError(error));
    }
  },

  // ยกเลิกการจองคลาสเรียน
  cancelBooking: async (bookingId, reason) => {
    try {
      const response = await studentAxios.post(`/bookings/${bookingId}/cancel`, { reason });
      return response.data;
    } catch (error) {
      console.error('Error canceling booking:', error);
      throw new Error(handleApiError(error));
    }
  },

  // ดึงรายการจองที่กำลังจะเกิดขึ้น
  getUpcomingBookings: async () => {
    try {
      const response = await studentAxios.get('/bookings/upcoming');
      return response.data;
    } catch (error) {
      console.error('Error getting upcoming bookings:', error);
      throw new Error(handleApiError(error));
    }
  },

  // ดึงรายการประวัติการจอง
  getBookingHistory: async (options = {}) => {
    try {
      const response = await studentAxios.get('/bookings/history', { params: options });
      return response.data;
    } catch (error) {
      console.error('Error getting booking history:', error);
      throw new Error(handleApiError(error));
    }
  },

  // ให้คะแนนและรีวิวหลังเรียนเสร็จ
  submitReview: async (bookingId, reviewData) => {
    try {
      const response = await studentAxios.post(`/bookings/${bookingId}/review`, reviewData);
      return response.data;
    } catch (error) {
      console.error('Error submitting review:', error);
      throw new Error(handleApiError(error));
    }
  },

  // ชำระเงินสำหรับการจอง
  processPayment: async (bookingId, paymentData) => {
    try {
      const response = await studentAxios.post(`/bookings/${bookingId}/payment`, paymentData);
      return response.data;
    } catch (error) {
      console.error('Error processing payment:', error);
      throw new Error(handleApiError(error));
    }
  },
  
  // รับลิงก์เข้าห้องเรียนออนไลน์
  getClassroomLink: async (bookingId) => {
    try {
      const response = await studentAxios.get(`/bookings/${bookingId}/classroom-link`);
      return response.data;
    } catch (error) {
      console.error('Error getting classroom link:', error);
      throw new Error(handleApiError(error));
    }
  },
  
  // ขอเปลี่ยนเวลาการจอง
  requestReschedule: async (bookingId, rescheduleData) => {
    try {
      const response = await studentAxios.post(`/bookings/${bookingId}/reschedule`, rescheduleData);
      return response.data;
    } catch (error) {
      console.error('Error requesting reschedule:', error);
      throw new Error(handleApiError(error));
    }
  },
  
  // ยอมรับหรือปฏิเสธคำขอเปลี่ยนเวลา (สำหรับติวเตอร์)
  respondToReschedule: async (bookingId, accepted, message) => {
    try {
      const response = await studentAxios.post(`/bookings/${bookingId}/reschedule-response`, {
        accepted,
        message
      });
      return response.data;
    } catch (error) {
      console.error('Error responding to reschedule request:', error);
      throw new Error(handleApiError(error));
    }
  }
};

export default bookingService;