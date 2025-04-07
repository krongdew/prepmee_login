// prepmee_website/src/i18n.js
export const locales = ['en', 'th'];
export const defaultLocale = 'th';

export default function getRequestConfig({ locale }) {
  // ตรวจสอบค่า locale และใช้ค่าเริ่มต้นถ้าเป็น undefined
  const safeLocale = locale || defaultLocale;
  
  return {
    messages: {
      ...require(`./messages/${safeLocale}.json`)
    },
    timeZone: 'Asia/Bangkok',
    defaultLocale,
    locales,
    locale: safeLocale
  }
}