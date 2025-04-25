// src/services/user.service.js
import { studentAxios, tutorAxios, handleApiError } from './api/axios-config';

export const userService = {
  // ===== Student Services =====
  student: {
    // ดึงข้อมูลโปรไฟล์นักเรียน
    getProfile: async () => {
      try {
        const response = await studentAxios.get('/member/profile');
        return response.data;
      } catch (error) {
        console.error('Error getting student profile:', error);
        throw new Error(handleApiError(error));
      }
    },

    // อัปเดตข้อมูลโปรไฟล์นักเรียน
    updateProfile: async (profileData) => {
      try {
        const response = await studentAxios.put('/member/profile', profileData);
        return response.data;
      } catch (error) {
        console.error('Error updating student profile:', error);
        throw new Error(handleApiError(error));
      }
    },

    // อัปโหลดรูปโปรไฟล์
    uploadProfileImage: async (formData) => {
      try {
        const response = await studentAxios.post('/member/upload-profile-image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        return response.data;
      } catch (error) {
        console.error('Error uploading profile image:', error);
        throw new Error(handleApiError(error));
      }
    },

    // ดึงประวัติการจองคลาสเรียน
    getBookingHistory: async () => {
      try {
        const response = await studentAxios.get('/member/bookings');
        return response.data;
      } catch (error) {
        console.error('Error getting booking history:', error);
        throw new Error(handleApiError(error));
      }
    },

    // ดึงรายละเอียดการจองคลาสเรียน
    getBookingDetails: async (bookingId) => {
      try {
        const response = await studentAxios.get(`/member/bookings/${bookingId}`);
        return response.data;
      } catch (error) {
        console.error('Error getting booking details:', error);
        throw new Error(handleApiError(error));
      }
    },
    
    // จัดการรายการโปรด
    favorites: {
      // เพิ่มติวเตอร์เข้ารายการโปรด
      addTutor: async (tutorId) => {
        try {
          const response = await studentAxios.post(`/member/favorites/tutors/${tutorId}`);
          return response.data;
        } catch (error) {
          console.error('Error adding tutor to favorites:', error);
          throw new Error(handleApiError(error));
        }
      },
      
      // ลบติวเตอร์ออกจากรายการโปรด
      removeTutor: async (tutorId) => {
        try {
          const response = await studentAxios.delete(`/member/favorites/tutors/${tutorId}`);
          return response.data;
        } catch (error) {
          console.error('Error removing tutor from favorites:', error);
          throw new Error(handleApiError(error));
        }
      },
      
      // ดึงรายการติวเตอร์โปรด
      getTutors: async () => {
        try {
          const response = await studentAxios.get('/member/favorites/tutors');
          return response.data;
        } catch (error) {
          console.error('Error getting favorite tutors:', error);
          throw new Error(handleApiError(error));
        }
      }
    },
    
    // จัดการการแจ้งเตือน
    notifications: {
      // ดึงรายการแจ้งเตือน
      getAll: async () => {
        try {
          const response = await studentAxios.get('/member/notifications');
          return response.data;
        } catch (error) {
          console.error('Error getting notifications:', error);
          throw new Error(handleApiError(error));
        }
      },
      
      // อ่านการแจ้งเตือน
      markAsRead: async (notificationId) => {
        try {
          const response = await studentAxios.put(`/member/notifications/${notificationId}/read`);
          return response.data;
        } catch (error) {
          console.error('Error marking notification as read:', error);
          throw new Error(handleApiError(error));
        }
      },
      
      // ลบการแจ้งเตือน
      delete: async (notificationId) => {
        try {
          const response = await studentAxios.delete(`/member/notifications/${notificationId}`);
          return response.data;
        } catch (error) {
          console.error('Error deleting notification:', error);
          throw new Error(handleApiError(error));
        }
      }
    }
  },

  // ===== Tutor Services =====
  tutor: {
    // ดึงข้อมูลโปรไฟล์ติวเตอร์
    getProfile: async () => {
      try {
        const response = await tutorAxios.get('/tutor/profile');
        return response.data;
      } catch (error) {
        console.error('Error getting tutor profile:', error);
        throw new Error(handleApiError(error));
      }
    },

    // อัปเดตข้อมูลโปรไฟล์ติวเตอร์
    updateProfile: async (profileData) => {
      try {
        const response = await tutorAxios.put('/tutor/profile', profileData);
        return response.data;
      } catch (error) {
        console.error('Error updating tutor profile:', error);
        throw new Error(handleApiError(error));
      }
    },

    // อัปโหลดรูปโปรไฟล์
    uploadProfileImage: async (formData) => {
      try {
        const response = await tutorAxios.post('/tutor/upload-profile-image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        return response.data;
      } catch (error) {
        console.error('Error uploading profile image:', error);
        throw new Error(handleApiError(error));
      }
    },

    // ดึงประวัติการสอน
    getTeachingHistory: async () => {
      try {
        const response = await tutorAxios.get('/tutor/sessions');
        return response.data;
      } catch (error) {
        console.error('Error getting teaching history:', error);
        throw new Error(handleApiError(error));
      }
    },

    // ดึงรายละเอียดคลาสเรียน
    getSessionDetails: async (sessionId) => {
      try {
        const response = await tutorAxios.get(`/tutor/sessions/${sessionId}`);
        return response.data;
      } catch (error) {
        console.error('Error getting session details:', error);
        throw new Error(handleApiError(error));
      }
    },

    // ดึงข้อมูลรายได้
    getEarnings: async () => {
      try {
        const response = await tutorAxios.get('/tutor/earnings');
        return response.data;
      } catch (error) {
        console.error('Error getting earnings:', error);
        throw new Error(handleApiError(error));
      }
    },

    // จัดการวิชาที่สอน
    subjects: {
      // ดึงข้อมูลวิชาที่สอนทั้งหมด
      getAll: async () => {
        try {
          const response = await tutorAxios.get('/tutor/subjects');
          return response.data;
        } catch (error) {
          console.error('Error getting subjects:', error);
          throw new Error(handleApiError(error));
        }
      },

      // เพิ่มวิชาที่สอน
      add: async (subjectData) => {
        try {
          const response = await tutorAxios.post('/tutor/subjects', subjectData);
          return response.data;
        } catch (error) {
          console.error('Error adding subject:', error);
          throw new Error(handleApiError(error));
        }
      },

      // อัปเดตข้อมูลวิชาที่สอน
      update: async (subjectId, subjectData) => {
        try {
          const response = await tutorAxios.put(`/tutor/subjects/${subjectId}`, subjectData);
          return response.data;
        } catch (error) {
          console.error('Error updating subject:', error);
          throw new Error(handleApiError(error));
        }
      },

      // ลบวิชาที่สอน
      delete: async (subjectId) => {
        try {
          const response = await tutorAxios.delete(`/tutor/subjects/${subjectId}`);
          return response.data;
        } catch (error) {
          console.error('Error deleting subject:', error);
          throw new Error(handleApiError(error));
        }
      }
    },
    
    // จัดการตารางสอน
    schedule: {
      // ดึงตารางสอน
      getAll: async (params) => {
        try {
          const response = await tutorAxios.get('/tutor/schedule', { params });
          return response.data;
        } catch (error) {
          console.error('Error getting schedule:', error);
          throw new Error(handleApiError(error));
        }
      },
      
      // เพิ่มช่วงเวลาว่าง
      addAvailability: async (availabilityData) => {
        try {
          const response = await tutorAxios.post('/tutor/schedule', availabilityData);
          return response.data;
        } catch (error) {
          console.error('Error adding availability:', error);
          throw new Error(handleApiError(error));
        }
      },
      
      // ลบช่วงเวลาว่าง
      removeAvailability: async (availabilityId) => {
        try {
          const response = await tutorAxios.delete(`/tutor/schedule/${availabilityId}`);
          return response.data;
        } catch (error) {
          console.error('Error removing availability:', error);
          throw new Error(handleApiError(error));
        }
      }
    },
    
    // จัดการการแจ้งเตือน
    notifications: {
      // ดึงรายการแจ้งเตือน
      getAll: async () => {
        try {
          const response = await tutorAxios.get('/tutor/notifications');
          return response.data;
        } catch (error) {
          console.error('Error getting notifications:', error);
          throw new Error(handleApiError(error));
        }
      },
      
      // อ่านการแจ้งเตือน
      markAsRead: async (notificationId) => {
        try {
          const response = await tutorAxios.put(`/tutor/notifications/${notificationId}/read`);
          return response.data;
        } catch (error) {
          console.error('Error marking notification as read:', error);
          throw new Error(handleApiError(error));
        }
      },
      
      // ลบการแจ้งเตือน
      delete: async (notificationId) => {
        try {
          const response = await tutorAxios.delete(`/tutor/notifications/${notificationId}`);
          return response.data;
        } catch (error) {
          console.error('Error deleting notification:', error);
          throw new Error(handleApiError(error));
        }
      }
    }
  }
};

export default userService;