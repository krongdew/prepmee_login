// prepmee_website/src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt'
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always'
});

export default async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const pathname = request.nextUrl.pathname;
  
  // Check if the path requires authentication
  const isProtectedDashboardPath = pathname.includes('/(dashboard)');
  const isProtectedTutorDashboardPath = pathname.includes('/(dashboard_tutor)');
  
  // If it's a protected route and there's no token, redirect to login
  if ((isProtectedDashboardPath || isProtectedTutorDashboardPath) && !token) {
    const url = new URL(`/${pathname.split('/')[1]}/login`, request.url);
    return NextResponse.redirect(url);
  }
  
  // Check role-specific paths
  if (isProtectedDashboardPath && token?.role === 'tutor') {
    // Tutor trying to access student dashboard
    const url = new URL(`/${pathname.split('/')[1]}/tutor-dashboard`, request.url);
    return NextResponse.redirect(url);
  }
  
  if (isProtectedTutorDashboardPath && token?.role === 'student') {
    // Student trying to access tutor dashboard
    const url = new URL(`/${pathname.split('/')[1]}/dashboard`, request.url);
    return NextResponse.redirect(url);
  }
  
  // Handle internationalization
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|images|.*\\..*).*)'
  ]
};