'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

/**
 * Tutor Dashboard Layout
 * This layout is protected and only accessible to authenticated tutors
 */
export default function TutorDashboardLayout({ children }) {
  return (
    <ProtectedRoute requiredRole="tutor">
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </ProtectedRoute>
  );
}