// prepmee_website/src/app/[locale]/layout.js
import { NextIntlClientProvider } from 'next-intl';
import ClientWrapper from './ClientWrapper';

async function getMessages(locale) {
  try {
    return (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    console.error('Failed to load messages:', error);
    return {};
  }
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = params;
  const messages = await getMessages(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ClientWrapper>{children}</ClientWrapper>
    </NextIntlClientProvider>
  );
}