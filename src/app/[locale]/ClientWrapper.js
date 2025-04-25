"use client";

import { DM_Sans } from "next/font/google";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import BottomToTop from "@/components/button/BottomToTop";
import SearchModal1 from "@/components/modal/SearchModal1";
import NavSidebar from "@/components/sidebar/NavSidebar";
import { AuthProvider } from '@/context/AuthContext_backup';
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

export default function ClientWrapper({ children }) {
  const path = usePathname();

  // Initialize WOW.js - แก้ไขโค้ดตรงนี้ใหม่
  useEffect(() => {
    if (typeof window !== "undefined") {
      // วิธีที่ 1: ลองดึง class WOW โดยตรงจาก global scope หลังจาก import script
      const loadWow = async () => {
        // ต้องมั่นใจว่าได้ติดตั้งไลบรารีแล้ว (npm install wowjs)
        await import('wowjs/dist/wow.js');
        
        // หากมีการโหลด script สำเร็จ จะสามารถเข้าถึง WOW ที่ window ได้
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
  );
}