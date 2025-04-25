// src/services/payment.service.js
import { studentAxios, tutorAxios, handleApiError } from './api/axios-config';

export const paymentService = {
  // ===== ระบบการชำระเงินสำหรับนักเรียน =====
  student: {
    // ดึงรายการประวัติการชำระเงิน
    getTransactionHistory: async (params = {}) => {
      try {
        const response = await studentAxios.get('/member/payments/transactions', { params });
        return response.data;
      } catch (error) {
        console.error('Error getting payment history:', error);
        throw new Error(handleApiError(error));
      }
    },

    // ดึงรายละเอียดของรายการชำระเงิน
    getTransactionDetails: async (transactionId) => {
      try {
        const response = await studentAxios.get(`/member/payments/transactions/${transactionId}`);
        return response.data;
      } catch (error) {
        console.error('Error getting transaction details:', error);
        throw new Error(handleApiError(error));
      }
    },

    // ดึงข้อมูลบัตรเครดิตที่บันทึกไว้
    getSavedCards: async () => {
      try {
        const response = await studentAxios.get('/member/payments/cards');
        return response.data;
      } catch (error) {
        console.error('Error getting saved cards:', error);
        throw new Error(handleApiError(error));
      }
    },

    // บันทึกข้อมูลบัตรเครดิตใหม่
    addNewCard: async (cardData) => {
      try {
        const response = await studentAxios.post('/member/payments/cards', cardData);
        return response.data;
      } catch (error) {
        console.error('Error adding new card:', error);
        throw new Error(handleApiError(error));
      }
    },

    // ลบบัตรเครดิตที่บันทึกไว้
    deleteCard: async (cardId) => {
      try {
        const response = await studentAxios.delete(`/member/payments/cards/${cardId}`);
        return response.data;
      } catch (error) {
        console.error('Error deleting card:', error);
        throw new Error(handleApiError(error));
      }
    },

    // ดึงเครดิตคงเหลือ
    getCreditsBalance: async () => {
      try {
        const response = await studentAxios.get('/member/payments/credits');
        return response.data;
      } catch (error) {
        console.error('Error getting credits balance:', error);
        throw new Error(handleApiError(error));
      }
    },

    // เติมเครดิต
    topUpCredits: async (topUpData) => {
      try {
        const response = await studentAxios.post('/member/payments/credits/topup', topUpData);
        return response.data;
      } catch (error) {
        console.error('Error topping up credits:', error);
        throw new Error(handleApiError(error));
      }
    },

    // บันทึกใบเสร็จ/ใบกำกับภาษี
    downloadInvoice: async (transactionId) => {
      try {
        const response = await studentAxios.get(`/member/payments/invoice/${transactionId}`, {
          responseType: 'blob'
        });
        
        // สร้าง URL สำหรับไฟล์ PDF เพื่อดาวน์โหลด
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        
        // สร้าง element a สำหรับดาวน์โหลด
        const a = document.createElement('a');
        a.href = url;
        a.download = `invoice-${transactionId}.pdf`;
        document.body.appendChild(a);
        a.click();
        
        // Cleanup
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        return { success: true };
      } catch (error) {
        console.error('Error downloading invoice:', error);
        throw new Error(handleApiError(error));
      }
    }
  },

  // ===== ระบบการเงินสำหรับติวเตอร์ =====
  tutor: {
    // ดึงรายการธุรกรรมการเงิน
    getTransactionHistory: async (params = {}) => {
      try {
        const response = await tutorAxios.get('/tutor/payments/transactions', { params });
        return response.data;
      } catch (error) {
        console.error('Error getting transaction history:', error);
        throw new Error(handleApiError(error));
      }
    },

    // ดึงรายละเอียดของธุรกรรม
    getTransactionDetails: async (transactionId) => {
      try {
        const response = await tutorAxios.get(`/tutor/payments/transactions/${transactionId}`);
        return response.data;
      } catch (error) {
        console.error('Error getting transaction details:', error);
        throw new Error(handleApiError(error));
      }
    },

    // ดึงยอดเงินปัจจุบัน
    getBalanceSummary: async () => {
      try {
        const response = await tutorAxios.get('/tutor/payments/balance');
        return response.data;
      } catch (error) {
        console.error('Error getting balance summary:', error);
        throw new Error(handleApiError(error));
      }
    },

    // ขอถอนเงิน
    requestWithdrawal: async (withdrawalData) => {
      try {
        const response = await tutorAxios.post('/tutor/payments/withdraw', withdrawalData);
        return response.data;
      } catch (error) {
        console.error('Error requesting withdrawal:', error);
        throw new Error(handleApiError(error));
      }
    },

    // ดึงประวัติการถอนเงิน
    getWithdrawalHistory: async (params = {}) => {
      try {
        const response = await tutorAxios.get('/tutor/payments/withdrawals', { params });
        return response.data;
      } catch (error) {
        console.error('Error getting withdrawal history:', error);
        throw new Error(handleApiError(error));
      }
    },

    // ดึงข้อมูลบัญชีธนาคารที่บันทึกไว้
    getBankAccounts: async () => {
      try {
        const response = await tutorAxios.get('/tutor/payments/bank-accounts');
        return response.data;
      } catch (error) {
        console.error('Error getting bank accounts:', error);
        throw new Error(handleApiError(error));
      }
    },

    // เพิ่มบัญชีธนาคาร
    addBankAccount: async (accountData) => {
      try {
        const response = await tutorAxios.post('/tutor/payments/bank-accounts', accountData);
        return response.data;
      } catch (error) {
        console.error('Error adding bank account:', error);
        throw new Error(handleApiError(error));
      }
    },

    // ลบบัญชีธนาคาร
    deleteBankAccount: async (accountId) => {
      try {
        const response = await tutorAxios.delete(`/tutor/payments/bank-accounts/${accountId}`);
        return response.data;
      } catch (error) {
        console.error('Error deleting bank account:', error);
        throw new Error(handleApiError(error));
      }
    },

    // ตั้งเป็นบัญชีหลัก
    setDefaultBankAccount: async (accountId) => {
      try {
        const response = await tutorAxios.put(`/tutor/payments/bank-accounts/${accountId}/default`);
        return response.data;
      } catch (error) {
        console.error('Error setting default bank account:', error);
        throw new Error(handleApiError(error));
      }
    },

    // ดาวน์โหลดรายงานภาษี
    downloadTaxReport: async (year) => {
      try {
        const response = await tutorAxios.get(`/tutor/payments/tax-report/${year}`, {
          responseType: 'blob'
        });
        
        // สร้าง URL สำหรับไฟล์ PDF เพื่อดาวน์โหลด
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        
        // สร้าง element a สำหรับดาวน์โหลด
        const a = document.createElement('a');
        a.href = url;
        a.download = `tax-report-${year}.pdf`;
        document.body.appendChild(a);
        a.click();
        
        // Cleanup
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        return { success: true };
      } catch (error) {
        console.error('Error downloading tax report:', error);
        throw new Error(handleApiError(error));
      }
    }
  }
};

export default paymentService;