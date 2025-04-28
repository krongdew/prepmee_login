'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import MobileNavigation2 from "@/components/header/MobileNavigation2";

/**
 * Student Dashboard Layout
 * This layout is protected and only accessible to authenticated students
 */
export default function StudentDashboardLayout({ children }) {
  return (
    <ProtectedRoute requiredRole="student">
      <MobileNavigation2 />
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </ProtectedRoute>
  );
}