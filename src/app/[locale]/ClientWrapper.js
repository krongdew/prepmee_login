"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import toggleStore from "@/store/toggleStore";
import SearchModal1 from "@/components/modal/SearchModal1";
import BottomToTop from "@/components/button/BottomToTop";
import NavSidebar from "@/components/sidebar/NavSidebar";

if (typeof window !== "undefined") {
  import("bootstrap");
}

export default function ClientWrapper({ children }) {
  const isListingActive = toggleStore((state) => state.isListingActive);
  const path = usePathname();

  useEffect(() => {
    const { WOW } = require("wowjs");
    const wow = new WOW({
      live: false,
    });
    wow.init();
  }, [path]);

  return (
    <>
      <SearchModal1 />
      {children}
      <BottomToTop />
      <NavSidebar />
    </>
  );
}
