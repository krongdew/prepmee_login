"use client";

import toggleStore from "@/store/toggleStore";
import DashboardHeader from "./header/DashboardHeader";
import DashboardSidebar from "./sidebar/DashboardSidebar";
import DashboardFooter from "./footer/DashboardFooter";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function DashboardLayout({ children }) {
  const isActive = toggleStore((state) => state.isDasboardSidebarActive);

  return (
    <ProtectedRoute>
      <DashboardHeader />
      <div className="dashboard_content_wrapper">
        <div
          className={`dashboard dashboard_wrapper pr30 pr0-xl ${
            isActive ? "dsh_board_sidebar_hidden" : ""
          }`}
        >
          <DashboardSidebar />
          <div className="dashboard__main pl0-md">
            {children}
            <DashboardFooter />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}