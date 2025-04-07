// src/app/[locale]/layout.js
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import ClientWrapper from './ClientWrapper';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

async function getMessages(locale) {
  try {
    return (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

export default async function LocaleLayout({ children, params }) {
  // In Next.js 15, params is a promise that needs to be awaited
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages(locale);

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <ClientWrapper>{children}</ClientWrapper>
    </NextIntlClientProvider>
  );
}