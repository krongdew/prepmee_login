// prepmee_website/src/middleware.js

import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

// Define paths that should skip auth check
const skipAuthPaths = [
  '/verify-email-success',
  '/verify-email-error',
  // '/reset-password-success' ก็เติมในนี้ได้เลย
];

export default async function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // Check if current path is in skipAuthPaths
  if (skipAuthPaths.some(path => pathname.includes(path))) {
    return intlMiddleware(request);
  }

  const token = await getToken({ req: request });

  // Check if the path requires authentication
  const isProtectedDashboardPath = pathname.includes('/(dashboard)');
  const isProtectedTutorDashboardPath = pathname.includes('/(dashboard_tutor)');

  if ((isProtectedDashboardPath || isProtectedTutorDashboardPath) && !token) {
    // If protected and no token, redirect to login
    const lang = pathname.split('/')[1];
    const loginUrl = new URL(`/${lang}/login`, request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Role-based redirections
  if (isProtectedDashboardPath && token?.role === 'tutor') {
    const lang = pathname.split('/')[1];
    const tutorDashboardUrl = new URL(`/${lang}/tutor-dashboard`, request.url);
    return NextResponse.redirect(tutorDashboardUrl);
  }

  if (isProtectedTutorDashboardPath && token?.role === 'student') {
    const lang = pathname.split('/')[1];
    const studentDashboardUrl = new URL(`/${lang}/dashboard`, request.url);
    return NextResponse.redirect(studentDashboardUrl);
  }

  // Handle internationalization normally
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|images|.*\\..*).*)'],
};
