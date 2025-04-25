// src/services/examples.js
// ตัวอย่างการใช้งาน services ที่ปรับเปลี่ยนเป็น Axios

import { 
    authService, 
    commonService, 
    apiTestUtils 
  } from './index';
  
  // ตัวอย่าง 1: การลงทะเบียนนักเรียน (Member Register)
  export const exampleMemberRegister = async () => {
    try {
      const userData = {
        email: "example@email.com",
        first_name: "John",
        last_name: "Doe",
        display_name: "John Doe",
        gender: "Male",
        password: "Secure@1234",
        bio: "Student bio",
        phone: "0811111111"
      };
      
      const result = await authService.registerStudent(userData);
      console.log('Registration result:', result);
      return result;
    } catch (error) {
      console.error('Registration failed:', error.message);
      throw error;
    }
  };
  
  // ตัวอย่าง 2: การลงทะเบียนติวเตอร์ (Tutor Register)
  export const exampleTutorRegister = async () => {
    try {
      // สมมติว่าเราได้ดึงข้อมูลจังหวัดและวิชามาแล้ว
      const provinces = await commonService.getProvinces();
      const subjects = await commonService.getSubjects();
      
      // เราจะใช้ province และ subject แรกในการลงทะเบียน (ในสถานการณ์จริงควรให้ผู้ใช้เลือก)
      const firstProvinceId = provinces.result && provinces.result.length > 0 ? provinces.result[0].id : '';
      const subjectIds = subjects.result && subjects.result.length > 0 
        ? [subjects.result[0].id, subjects.result[1]?.id].filter(Boolean) 
        : [];
      
      const userData = {
        email: "tutor_example@email.com",
        first_name: "Tutor",
        last_name: "Example",
        display_name: "Tutor Example",
        gender: "Female",
        password: "Secure@1234",
        phone: "0822222222",
        teaching_experience: "5 years of teaching experience",
        education_background: "Master's degree in Education",
        teching_province_id: firstProvinceId,
        subjects: subjectIds,
        online_mode: true,
        onsite_mode: true,
        teching_area: "Central area"
      };
      
      const result = await authService.registerTutor(userData);
      console.log('Tutor registration result:', result);
      return result;
    } catch (error) {
      console.error('Tutor registration failed:', error.message);
      throw error;
    }
  };
  
  // ตัวอย่าง 3: การเข้าสู่ระบบนักเรียน (Member login with credential)
  export const exampleMemberLogin = async () => {
    try {
      const credentials = {
        email: "example@email.com",
        password: "Secure@1234"
      };
      
      const result = await authService.loginStudent(credentials.email, credentials.password);
      console.log('Login result:', result);
      // Token จะถูกบันทึกอัตโนมัติโดย authService
      return result;
    } catch (error) {
      console.error('Login failed:', error.message);
      throw error;
    }
  };
  
  // ตัวอย่าง 4: การเข้าสู่ระบบติวเตอร์ (Tutor login)
  export const exampleTutorLogin = async () => {
    try {
      const credentials = {
        email: "tutor_example@email.com",
        password: "Secure@1234"
      };
      
      const result = await authService.loginTutor(credentials.email, credentials.password);
      console.log('Tutor login result:', result);
      // Token จะถูกบันทึกอัตโนมัติโดย authService
      return result;
    } catch (error) {
      console.error('Tutor login failed:', error.message);
      throw error;
    }
  };
  
  // ตัวอย่าง 5: การเข้าสู่ระบบด้วย Google (Member login with Google)
  export const exampleGoogleLogin = async () => {
    try {
      // หมายเหตุ: ในกรณีจริง credential จะได้มาจาก Google Sign-In API
      // ตัวอย่างนี้เป็นเพียงการจำลองการใช้งาน
      const googleCredentials = {
        credential: "google_credential_token_here",
        client_id: "your_google_client_id"
      };
      
      const result = await authService.loginStudentGoogle(
        googleCredentials.credential, 
        googleCredentials.client_id
      );
      console.log('Google login result:', result);
      return result;
    } catch (error) {
      console.error('Google login failed:', error.message);
      throw error;
    }
  };
  
  // ตัวอย่าง 6: การดึงข้อมูลโปรไฟล์นักเรียน (Member Get Profile)
  export const exampleGetMemberProfile = async () => {
    try {
      // ต้องทำการล็อกอินก่อน หรือมี token ที่ถูกต้อง
      const result = await authService.getStudentProfile();
      console.log('Member profile:', result);
      return result;
    } catch (error) {
      console.error('Failed to get member profile:', error.message);
      throw error;
    }
  };
  
  // ตัวอย่าง 7: การดึงข้อมูลโปรไฟล์ติวเตอร์ (Tutor Get Profile)
  export const exampleGetTutorProfile = async () => {
    try {
      // ต้องทำการล็อกอินก่อน หรือมี token ที่ถูกต้อง
      const result = await authService.getTutorProfile();
      console.log('Tutor profile:', result);
      return result;
    } catch (error) {
      console.error('Failed to get tutor profile:', error.message);
      throw error;
    }
  };
  
  // ตัวอย่าง 8: การดึงรายการวิชา (Subjects)
  export const exampleGetSubjects = async () => {
    try {
      const result = await commonService.getSubjects();
      console.log('Subjects:', result);
      return result;
    } catch (error) {
      console.error('Failed to get subjects:', error.message);
      throw error;
    }
  };
  
  // ตัวอย่าง 9: การดึงรายการจังหวัด (Provinces)
  export const exampleGetProvinces = async () => {
    try {
      const result = await commonService.getProvinces();
      console.log('Provinces:', result);
      return result;
    } catch (error) {
      console.error('Failed to get provinces:', error.message);
      throw error;
    }
  };
  
  // ตัวอย่าง 10: การทดสอบ API โดยตรงตามรูปแบบ Postman
  export const exampleTestWithPostmanFormat = async () => {
    try {
      // ตัวอย่างการลงทะเบียนนักเรียนตามรูปแบบ Postman
      const memberData = {
        email: "test_postman@email.com",
        first_name: "Postman",
        last_name: "Test",
        display_name: "Postman Test",
        gender: "Male",
        password: "Secure@1234",
        bio: "Testing with Postman format",
        phone: "0833333333"
      };
      
      const registrationResult = await apiTestUtils.memberRegister(memberData);
      console.log('Registration using Postman format:', registrationResult);
      
      // ตัวอย่างการล็อกอินตามรูปแบบ Postman
      const loginResult = await apiTestUtils.memberLogin({
        email: "test_postman@email.com",
        password: "Secure@1234"
      });
      console.log('Login using Postman format:', loginResult);
      
      // ดึง token จากผลลัพธ์การล็อกอิน
      const token = loginResult.result?.accessToken;
      
      // ตัวอย่างการดึงโปรไฟล์ด้วย token โดยตรงตามรูปแบบ Postman
      if (token) {
        const profileResult = await apiTestUtils.getMemberProfile(token);
        console.log('Profile using Postman format:', profileResult);
      }
      
      return { registrationResult, loginResult };
    } catch (error) {
      console.error('Postman format test failed:', error.message);
      throw error;
    }
  };