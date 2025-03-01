"use client";
import { dasboardNavigation } from "@/data/dashboard";
import toggleStore from "@/store/toggleStore";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from 'react';
import { useAuth } from "@/context/AuthContext";

const DashboardHeader = () => {
  const toggle = toggleStore((state) => state.dashboardSlidebarToggleHandler);
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // ดึงข้อมูลผู้ใช้และฟังก์ชันออกจากระบบจาก Auth Context
  const { user, logout } = useAuth();

  // ปิด dropdown เมื่อคลิกที่อื่น
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);
  
  // ฟังก์ชันสำหรับออกจากระบบ
  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <header className="header-nav nav-innerpage-style menu-home4 dashboard_header main-menu">
        <nav className="posr">
          <div className="container-fluid pr30 pr15-xs pl30 posr menu_bdrt1">
            <div className="row align-items-center justify-content-between">
              <div className="col-6 col-lg-auto">
                <div className="text-center text-lg-start d-flex align-items-center">
                  <div className="dashboard_header_logo position-relative me-2 me-xl-5">
                    <Link href="/" className="logo">
                      <Image
                        height={100}
                        width={200}
                        src="/images/about/prepmeelogo.svg"
                        alt="logo"
                      />
                    </Link>
                  </div>
                  <div className="fz20 ml90">
                    <a
                      onClick={toggle}
                      className="dashboard_sidebar_toggle_icon vam"
                    >
                      <Image
                        height={18}
                        width={20}
                        src="/images/dashboard-navicon.svg"
                        alt="navicon"
                      />
                    </a>
                  </div>
                  <a
                    className="login-info d-block d-xl-none ml40 vam"
                    data-bs-toggle="modal"
                    href="#exampleModalToggle"
                  >
                    <span className="flaticon-loupe" />
                  </a>
                  <div className="ml40 d-none d-xl-block">
                    <div className="search_area dashboard-style">
                      <input
                        type="text"
                        className="form-control border-0"
                        placeholder="What service are you looking for today?"
                      />
                      <label>
                        <span className="flaticon-loupe" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6 col-lg-auto">
                <div className="text-center text-lg-end header_right_widgets">
                  <ul className="dashboard_dd_menu_list d-flex align-items-center justify-content-center justify-content-sm-end mb-0 p-0">
                    <li className="d-none d-sm-block">
                      <a
                        className="text-center mr5 text-thm2 dropdown-toggle fz20"
                        type="button"
                        data-bs-toggle="dropdown"
                      >
                        <span className="flaticon-notification" />
                      </a>
                      <div className="dropdown-menu">
                        <div className="dboard_notific_dd px30 pt10 pb15">
                          <div className="notif_list d-flex align-items-center bdrb1 pb15 mb10">
                            <Image
                              height={40}
                              width={40}
                              src="/images/resource/notif-1.png"
                              alt="notif"
                            />
                            <div className="details ml10">
                              <p className="text mb-0">Your resume</p>
                              <p className="text mb-0">updated!</p>
                            </div>
                          </div>
                          {/* แสดงการแจ้งเตือนอื่นๆ */}
                        </div>
                      </div>
                    </li>
                    <li className="d-none d-sm-block">
                      <a
                        className="text-center mr5 text-thm2 dropdown-toggle fz20"
                        type="button"
                        data-bs-toggle="dropdown"
                      >
                        <span className="flaticon-mail" />
                      </a>
                      <div className="dropdown-menu">
                        <div className="dboard_notific_dd px30 pt20 pb15">
                          {/* แสดงข้อความ */}
                          <div className="d-grid">
                            <Link
                              href="/message"
                              className="ud-btn btn-thm w-100"
                            >
                              View All Messages
                              <i className="fal fa-arrow-right-long" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="user_setting" ref={dropdownRef}>
                      <div className="position-relative">
                        <a 
                          className="btn p-0" 
                          onClick={() => setIsOpen(!isOpen)}
                        >
                          <Image
                            height={50}
                            width={50}
                            src="/images/resource/user.png"
                            alt="user.png"
                          />
                        </a>
                        
                        {isOpen && (
                          <div 
                            className="dropdown-menu"
                            style={{
                              display: 'block',
                              position: 'absolute',
                              right: 0,
                              top: '100%',
                              minWidth: '200px',
                              marginTop: '5px',
                              backgroundColor: '#fff',
                              borderRadius: '4px',
                              boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
                              zIndex: 1000
                            }}
                          >
                            <div className="user_setting_content p-3">
                              {user && (
                                <div className="user-info mb-3">
                                  <p className="fw-bold mb-1">{user.firstname} {user.lastname}</p>
                                  <p className="text-muted small mb-0">{user.email}</p>
                                </div>
                              )}
                              
                              <div className="dropdown-divider mb-2"></div>
                              
                              <Link 
                                href="/profile" 
                                className="dropdown-item py-2"
                                onClick={() => setIsOpen(false)}
                              >
                                <i className="flaticon-user mr-2"></i> My Profile
                              </Link>
                              
                              <Link 
                                href="/settings" 
                                className="dropdown-item py-2"
                                onClick={() => setIsOpen(false)}
                              >
                                <i className="flaticon-settings mr-2"></i> Settings
                              </Link>
                              
                              <div className="dropdown-divider my-2"></div>
                              
                              <a 
                                className="dropdown-item py-2 text-danger" 
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleLogout();
                                }}
                              >
                                <i className="flaticon-logout mr-2"></i> Sign Out
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default DashboardHeader;