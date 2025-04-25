'use client';

import ProtectedRoute from "@/components/auth/ProtectedRoute_Backup";

export default function DashboardLayout({ children }) {
  return (
    <ProtectedRoute requiredRole="student">
      {children}
    </ProtectedRoute>
  );
}