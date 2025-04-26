// prepmee_website/src/app/[locale]/layout.js
import { NextIntlClientProvider } from 'next-intl';
import ClientWrapper from './ClientWrapper';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';  // Make sure this path is correct

async function getMessages(locale) {
  try {
    return (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    console.error('Failed to load messages:', error);
    return {};
  }
}

export default async function LocaleLayout({ children, params: paramsPromise  }) {
  // Handle params correctly based on your Next.js version
  const params = await paramsPromise;
  const { locale } = params;
  const messages = await getMessages(locale);
  
  // Declare session as let not const
  let session = null;
  
  try {
    session = await getServerSession(authOptions);
  } catch (error) {
    console.error("Session error:", error);
    // Continue without session
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ClientWrapper session={session}>{children}</ClientWrapper>
    </NextIntlClientProvider>
  );
}