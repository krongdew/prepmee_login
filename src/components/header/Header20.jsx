//src/components/header/Header20.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations, useLocale } from 'next-intl'; // เพิ่ม useLocale
// Update this import in Header20.jsx
import { useAuth } from '@/context/AuthContext';  // Remove the _backup suffix
import Mega from "./Mega";
import Navigation from "./Navigation";
import MobileNavigation2 from "./MobileNavigation2";

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = () => {
    // ดึงภาษาปัจจุบันจาก path
    const currentLang = pathname.split('/')[1];
    const newLang = currentLang === 'en' ? 'th' : 'en';
    const newPath = pathname.replace(`/${currentLang}`, `/${newLang}`);
    router.push(newPath);
  };

  return (
    <button 
      onClick={switchLanguage}
      className="ud-btn btn-thm2 add-joining ml-4"
      style={{ minWidth: '60px' }}
    >
       {pathname.startsWith('/en') ? 'TH' : 'ENG'}
    </button>
  );
};

export default function Header20() {
    const pathname = usePathname();
    const [hasMounted, setHasMounted] = useState(false);
    const currentLocale = useLocale(); // ใช้ useLocale แทนการดึงจาก pathname
    const t = useTranslations('Common');
    const { user, isAuthenticated, logout } = useAuth();
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        setHasMounted(true);

        // Click outside to close user dropdown
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowUserDropdown(false);
            }
        }
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        setShowUserDropdown(false);
        logout();
    };

    if (!hasMounted) {
        return null;
    }

    return (
        <>
            <style jsx global>{`
                @media (min-width: 992px) {
                    .mobile-only { display: none !important; }
                    .desktop-only { display: block !important; }
                }
                @media (max-width: 991.98px) {
                    .mobile-only { display: block !important; }
                    .desktop-only { display: none !important; }
                }
                .user-dropdown {
                    position: absolute;
                    top: 100%;
                    right: 0;
                    background-color: white;
                    border-radius: 4px;
                    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
                    z-index: 1000;
                    min-width: 200px;
                    padding: 0.5rem 0;
                }
                .user-dropdown .dropdown-item {
                    display: block;
                    width: 100%;
                    padding: 0.5rem 1.5rem;
                    clear: both;
                    text-align: inherit;
                    white-space: nowrap;
                    background-color: transparent;
                    border: 0;
                    color: #212529;
                    text-decoration: none;
                }
                .user-dropdown .dropdown-item:hover {
                    background-color: #f8f9fa;
                }
                .user-dropdown .dropdown-divider {
                    height: 0;
                    margin: 0.5rem 0;
                    overflow: hidden;
                    border-top: 1px solid #e9ecef;
                }
            `}</style>

            <div className="desktop-only">
                <header className="header-nav nav-innerpage-style main-menu">
                    <nav className="posr">
                        <div className="container-fluid posr menu_bdrt1">
                            <div className="row align-items-center justify-content-between">
                                <div className="col-auto pe-0">
                                    <div className="d-flex align-items-center">
                                        <Link
                                            className="header-logo bdrr1 pr20 pr5-xl"
                                            href={`/${currentLocale}`}
                                        >
                                            <Image
                                                height={40}
                                                width={100}
                                                className="w-90 h-50 object-fit-contain"
                                                src="/images/about/prepmeelogo.png"
                                                alt="Header Logo"
                                                priority
                                            />
                                        </Link>
                                        <div className="home1_style">
                                            <Mega />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <div className="d-flex align-items-center gap-3">
                                        <Navigation />
                                        <a
                                            className="login-info bdrl1 pl15-lg pl30"
                                            data-bs-toggle="modal"
                                            href="#exampleModalToggle"
                                        >
                                            <span className="flaticon-loupe" />
                                        </a>
                                        <Link
                                            className={`login-info mx15-lg mx30 ${
                                                pathname === `/${currentLocale}/applytoteach`
                                                    ? "ui-active"
                                                    : ""
                                            }`}
                                            href={`/${currentLocale}/applytoteach`}
                                        >
                                            <span className="d-none d-xl-inline-block">
                                                {t('nav.become_prefix')}
                                            </span>{" "}
                                            {t('nav.become_tutor')}
                                        </Link>
                                        
                                        {!isAuthenticated ? (
                                            <>
                                                <Link
                                                    className={`login-info mr15-lg mr30 ${
                                                        pathname === `/${currentLocale}/login` ? "ui-active" : ""
                                                    }`}
                                                    href={`/${currentLocale}/login`}
                                                >
                                                    {t('nav.signin')}
                                                </Link>
                                                <Link
                                                    className={`login-info mr15-lg mr30 ${
                                                        pathname === `/${currentLocale}/login` ? "ui-active" : ""
                                                    }`}
                                                    href={`/${currentLocale}/tutor_login`}
                                                >
                                                    {t('nav.tutorsignin')}
                                                </Link>
                                                <Link
                                                    className="ud-btn btn-thm add-joining"
                                                    href={`/${currentLocale}/register`}
                                                >
                                                    {t('nav.join')}
                                                </Link>
                                            </>
                                        ) : (
                                            <div className="position-relative" ref={dropdownRef}>
                                                <label style={{marginRight:10}}>0.00 ฿</label>
                                                <button 
                                                    className="ud-btn btn-thm add-joining"
                                                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                                                >
                                                    {user?.firstname || 'User'} <i className="fas fa-chevron-down ml-1 fs-12"></i>
                                                </button>
                                                
                                                {showUserDropdown && (
                                                    <div className="user-dropdown">
                                                        <div className="px-3 py-2 text-muted small">
                                                            <div className="fw-bold">{user?.firstname} {user?.lastname}</div>
                                                            <div>{user?.email}</div>
                                                        </div>
                                                        <div className="dropdown-divider"></div>
                                                        <Link 
                                                            href={`/${currentLocale}/dashboard`}
                                                            className="dropdown-item"
                                                            onClick={() => setShowUserDropdown(false)}
                                                        >
                                                            <i className="fas fa-tachometer-alt mr-2"></i> Dashboard
                                                        </Link>
                                                        <Link 
                                                            href={`/${currentLocale}/profile`}
                                                            className="dropdown-item"
                                                            onClick={() => setShowUserDropdown(false)}
                                                        >
                                                            <i className="fas fa-user mr-2"></i> Profile
                                                        </Link>
                                                        <Link 
                                                            href={`/${currentLocale}/settings`}
                                                            className="dropdown-item"
                                                            onClick={() => setShowUserDropdown(false)}
                                                        >
                                                            <i className="fas fa-cog mr-2"></i> Settings
                                                        </Link>
                                                        <div className="dropdown-divider"></div>
                                                        <a 
                                                            href="#" 
                                                            className="dropdown-item"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                handleLogout();
                                                            }}
                                                        >
                                                            <i className="fas fa-sign-out-alt mr-2"></i> Logout
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                        
                                        <LanguageSwitcher />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>
            </div>

            <div className="mobile-only">
                <MobileNavigation2 
                    currentLocale={currentLocale} 
                    isAuthenticated={isAuthenticated}
                    user={user}
                    onLogout={handleLogout}
                />
            </div>
        </>
    );
}