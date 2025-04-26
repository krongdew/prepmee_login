// prepmee_website/src/app/layout.js
import './globals.css'
import getRequestConfig from '@/i18n';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';  // Update this import path

export const metadata = {
  title: 'Prepmee',
  description: 'Prepmee - Find your perfect tutor',
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  const { messages } = getRequestConfig({ locale }); 
  
  // Declare session as let not const
  let session = null;
  
  try {
    session = await getServerSession(authOptions);
  } catch (error) {
    console.error("Session error:", error);
    // Continue without session
  }

  return (
    <html lang={locale}>
      <body>
        {children}
      </body>
    </html>
  );
}