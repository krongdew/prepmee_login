// src/app/[locale]/AuthClientWrapper.js
"use client";

import { AuthProvider } from '@/context/AuthContext';
import TokenRefreshHandler from '@/components/auth/TokenRefreshHandler';

export default function AuthClientWrapper({ children }) {
  return (
    <AuthProvider>
      <TokenRefreshHandler />
      {children}
    </AuthProvider>
  );
}