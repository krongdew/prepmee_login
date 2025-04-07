export const locales = ['en', 'th'];
export const defaultLocale = 'th';

export default function getRequestConfig({ locale }) {
  // ใช้ defaultLocale ถ้า locale เป็น undefined
  const safeLocale = locales.includes(locale) ? locale : defaultLocale;

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