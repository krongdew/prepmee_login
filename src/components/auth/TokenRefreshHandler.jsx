// src/components/auth/TokenRefreshHandler.jsx
'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useTokenRefreshListener } from '@/lib/axios';

export default function TokenRefreshHandler() {
  // This component doesn't render anything visible
  // It just sets up the token refresh listener
  useTokenRefreshListener();
  
  return null;
}