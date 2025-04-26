'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

/**
 * Student Dashboard Layout
 * This layout is protected and only accessible to authenticated students
 */
export default function StudentDashboardLayout({ children }) {
  return (
    <ProtectedRoute requiredRole="student">
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </ProtectedRoute>
  );
}