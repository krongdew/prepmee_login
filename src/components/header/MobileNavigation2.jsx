"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";

export default function MobileNavigation2() {
  const { user, isAuthenticated, logout } = useAuth();
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'th';
  
  // สำหรับเมนูเปิดปิด offcanvas (ไม่ต้องใช้ useState เพราะ Bootstrap จัดการให้)
  // แต่เราอาจต้องการปิดเมนูเมื่อเลือกเมนูย่อยหรือล็อกเอาท์
  const handleLogout = () => {
    // ปิด offcanvas (Bootstrap 5)
    const offcanvasElement = document.getElementById('offcanvasExample');
    if (offcanvasElement) {
      const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
      if (bsOffcanvas) {
        bsOffcanvas.hide();
      }
    }
    
    // เรียกใช้ฟังก์ชัน logout จาก Context
    logout();
  };

  return (
    <>
      <div className="mobilie_header_nav stylehome1">
        <div className="mobile-menu">
          <div className="header bdrb1">
            <div className="menu_and_widgets">
              <div className="mobile_menu_bar d-flex justify-content-between align-items-center">
                <Link className="mobile_logo" href={`/${currentLocale}`}>
                  <Image
                    height={40}
                    width={133}
                    src="/images/about/prepmeelogo.png"
                    alt="Header Logo"
                  />
                </Link>
                <div className="right-side text-end">
                  {!isAuthenticated ? (
                    <Link href={`/${currentLocale}/login`}>join</Link>
                  ) : (
                    <span className="text-primary me-2" style={{ fontSize: '14px' }}>
                      {user?.firstname || 'User'}
                    </span>
                  )}
                  <a
                    className="menubar ml30"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasExample"
                    aria-controls="offcanvasExample"
                  >
                    <Image
                      height={20}
                      width={20}
                      src="/images/mobile-dark-nav-icon.svg"
                      alt="icon"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="posr">
              <div className="mobile_menu_close_btn">
                <span className="far fa-times" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Offcanvas Sidebar */}
      <div
        className="offcanvas offcanvas-start mobile_menu-canvas"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <div className="logo-sidebar">
            <Image
              height={40}
              width={133}
              src="/images/about/prepmeelogo.png"
              alt="Header Logo"
            />
          </div>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          {isAuthenticated && (
            <div className="user-info p-3 mb-3 bg-light rounded">
              <div className="fw-bold">{user?.firstname} {user?.lastname}</div>
              <div className="small text-muted">{user?.email}</div>
            </div>
          )}
          
          <ul className="mobile-menu-list">
            <li><Link href={`/${currentLocale}`}>Home</Link></li>
            <li><Link href={`/${currentLocale}/about`}>About</Link></li>
            <li><Link href={`/${currentLocale}/tutors`}>Tutors</Link></li>
            <li><Link href={`/${currentLocale}/courses`}>Courses</Link></li>
            <li><Link href={`/${currentLocale}/contact`}>Contact</Link></li>
            <li><Link href={`/${currentLocale}/applytoteach`}>Become a Tutor</Link></li>
            
            {isAuthenticated ? (
              <>
                <li><Link href={`/${currentLocale}/dashboard`}>Dashboard</Link></li>
                <li><Link href={`/${currentLocale}/profile`}>Profile</Link></li>
                <li><Link href={`/${currentLocale}/settings`}>Settings</Link></li>
                <li>
                  <a 
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLogout();
                    }}
                  >
                    Logout
                  </a>
                </li>
              </>
            ) : (
              <>
                <li><Link href={`/${currentLocale}/login`}>Sign In</Link></li>
                <li><Link href={`/${currentLocale}/register`}>Register</Link></li>
              </>
            )}
          </ul>
          
          <div className="social-links mt-4 mb-3">
            <h6>Follow Us</h6>
            <ul className="d-flex gap-3 list-unstyled">
              <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
              <li><a href="#"><i className="fab fa-twitter"></i></a></li>
              <li><a href="#"><i className="fab fa-instagram"></i></a></li>
              <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}