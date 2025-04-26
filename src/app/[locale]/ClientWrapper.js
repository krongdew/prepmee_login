"use client";

import { DM_Sans } from "next/font/google";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/context/AuthContext";
import BottomToTop from "@/components/button/BottomToTop";
import SearchModal1 from "@/components/modal/SearchModal1";
import NavSidebar from "@/components/sidebar/NavSidebar";
import "react-tooltip/dist/react-tooltip.css";

// Initialize Bootstrap on client side
if (typeof window !== "undefined") {
  import("bootstrap");
}

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

export default function ClientWrapper({ children, session }) {
  const path = usePathname();

  // Initialize WOW.js
  useEffect(() => {
    if (typeof window !== "undefined") {
      const loadWow = async () => {
        await import('wowjs/dist/wow.js');
        
        if (window.WOW) {
          const wow = new window.WOW({
            live: false,
          });
          wow.init();
        } else {
          console.error("WOW library not found on window object");
        }
      };
      
      loadWow();
    }
  }, [path]);

  return (
    <SessionProvider session={session}>
      <AuthProvider>
        <div className={dmSans.className}>
          <SearchModal1 />
          {children}

          {/* bottom to top */}
          <BottomToTop />

          {/* sidebar mobile navigation */}
          <NavSidebar />
        </div>
      </AuthProvider>
    </SessionProvider>
  );
}