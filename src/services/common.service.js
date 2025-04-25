// src/services/common.service.js
import { axiosInstance, handleApiError } from './api/axios-config';

export const commonService = {
  // ดึงรายการวิชาทั้งหมด
  getSubjects: async () => {
    try {
      const response = await axiosInstance.get('/common/subjects');
      return response.data;
    } catch (error) {
      console.error('Error fetching subjects:', error);
      throw new Error(handleApiError(error));
    }
  },

  // ดึงรายการจังหวัด
  getProvinces: async () => {
    try {
      const response = await axiosInstance.get('/common/provinces');
      return response.data;
    } catch (error) {
      console.error('Error fetching provinces:', error);
      throw new Error(handleApiError(error));
    }
  },

  // ดึงรายการหมวดหมู่วิชา (ถ้ามี)
//   getCategories: async () => {
//     try {
//       const response = await axiosInstance.get('/common/categories');
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//       throw new Error(handleApiError(error));
//     }
//   },

  // ส่งข้อความติดต่อ/สอบถาม
//   submitContactForm: async (contactData) => {
//     try {
//       const response = await axiosInstance.post('/common/contact', contactData);
//       return response.data;
//     } catch (error) {
//       console.error('Error submitting contact form:', error);
//       throw new Error(handleApiError(error));
//     }
//   },

  // ฟังก์ชันช่วยเหลือสำหรับการจัดรูปแบบข้อมูล
  formatProvincesData: (provinces) => {
    if (!provinces || !Array.isArray(provinces)) return [];
    
    return provinces.map(province => ({
      id: province.id,
      nameEn: province.name_en,
      nameTh: province.name_th,
      code: province.code
    }));
  },

  formatSubjectsData: (subjects) => {
    if (!subjects || !Array.isArray(subjects)) return [];
    
    return subjects.map(subject => ({
      id: subject.id,
      name: subject.name,
      category: subject.category,
      description: subject.description || ''
    }));
  }
};

export default commonService;