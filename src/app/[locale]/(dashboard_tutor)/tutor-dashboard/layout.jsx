'use client';

import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function TutorDashboardLayout({ children }) {
  return (
    <ProtectedRoute requiredRole="tutor">
      {children}
    </ProtectedRoute>
  );
}