"use client";

import { DM_Sans } from "next/font/google";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
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

export default function ClientLayout({ children }) {
  const path = usePathname();

  // Initialize WOW.js
  useEffect(() => {
    const { WOW } = require("wowjs");
    const wow = new WOW({
      live: false,
    });
    wow.init();
  }, [path]);

  return (
    <div className={dmSans.className}>
      <SearchModal1 />
      {children}

      {/* bottom to top */}
      <BottomToTop />

      {/* sidebar mobile navigation */}
      <NavSidebar />
    </div>
  );
}