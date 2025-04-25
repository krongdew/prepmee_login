// src/services/api/token.service.js

/**
 * Token Service - จัดการเกี่ยวกับ tokens authentication (JWT)
 */

// เก็บค่า keys ที่ใช้ใน localStorage ตาม role
const getStorageKeys = (role) => {
    const prefix = role === 'tutor' ? 'tutor_' : 'student_';
    return {
      access: `${prefix}accessToken`,
      refresh: `${prefix}refreshToken`,
      userType: 'userType' // shared key สำหรับระบุ role ของผู้ใช้ปัจจุบัน
    };
  };
  
  // ฟังก์ชันตรวจสอบว่า token หมดอายุหรือไม่
  const isTokenExpired = (token) => {
    if (!token) return true;
    
    try {
      // แยกส่วน payload จาก JWT (ส่วนที่ 2 ในรูปแบบ x.y.z)
      const payload = JSON.parse(atob(token.split('.')[1]));
      
      // เช็คว่าเวลาหมดอายุ (มิลลิวินาที) น้อยกว่าเวลาปัจจุบันหรือไม่
      return payload.exp * 1000 < Date.now();
    } catch (error) {
      console.error('Error parsing token:', error);
      return true; // หากมี error ในการตรวจสอบให้ถือว่าหมดอายุ
    }
  };
  
  // ดึง role จาก token
  const getUserRole = (token) => {
    if (!token) return null;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role;
    } catch (error) {
      console.error('Error extracting role from token:', error);
      return null;
    }
  };
  
  // บันทึก tokens ลง localStorage
  const setTokens = (accessToken, refreshToken, role) => {
    const keys = getStorageKeys(role);
    
    if (accessToken) {
      localStorage.setItem(keys.access, accessToken);
    }
    
    if (refreshToken) {
      localStorage.setItem(keys.refresh, refreshToken);
    }
    
    if (role) {
      localStorage.setItem(keys.userType, role);
    }
  };
  
  // ลบ tokens ตาม role ที่ระบุ
  const clearTokens = (role) => {
    const keys = getStorageKeys(role);
    localStorage.removeItem(keys.access);
    localStorage.removeItem(keys.refresh);
    
    // ลบ userType เฉพาะเมื่อ userType ปัจจุบันตรงกับ role ที่ต้องการลบ
    const currentUserType = localStorage.getItem(keys.userType);
    if (currentUserType === role) {
      localStorage.removeItem(keys.userType);
    }
  };
  
  // ลบ tokens ทั้งหมด (ทั้ง student และ tutor)
  const clearAllTokens = () => {
    clearTokens('tutor');
    clearTokens('student');
    localStorage.removeItem('userType');
  };
  
  // ดึงค่า UserType ปัจจุบัน
  const getUserType = () => {
    return localStorage.getItem('userType');
  };
  
  // ดึง Access Token สำหรับ role ที่ระบุ
  const getAccessToken = (role) => {
    const keys = getStorageKeys(role);
    return localStorage.getItem(keys.access);
  };
  
  // ดึก Refresh Token สำหรับ role ที่ระบุ
  const getRefreshToken = (role) => {
    const keys = getStorageKeys(role);
    return localStorage.getItem(keys.refresh);
  };
  
  // Export token service functions
  export const tokenService = {
    getStorageKeys,
    isTokenExpired,
    getUserRole,
    setTokens,
    clearTokens,
    clearAllTokens,
    getUserType,
    getAccessToken,
    getRefreshToken
  };
  
  export default tokenService;