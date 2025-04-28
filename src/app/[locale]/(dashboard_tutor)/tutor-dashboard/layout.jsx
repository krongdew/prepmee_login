'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import MobileNavigation2 from "@/components/header/MobileNavigation2";

/**
 * Tutor Dashboard Layout
 * This layout is protected and only accessible to authenticated tutors
 */
export default function TutorDashboardLayout({ children }) {
  return (
    <ProtectedRoute requiredRole="tutor">
      <MobileNavigation2 />
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </ProtectedRoute>
  );
}