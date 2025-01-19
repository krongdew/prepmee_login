"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Mega from "./Mega";
import Navigation from "./Navigation";
import MobileNavigation2 from "./MobileNavigation2";

const LanguageSwitcher = () => {
  const [lang, setLang] = useState('en');

  return (
    <button 
      onClick={() => setLang(lang === 'en' ? 'th' : 'en')}
      className="ud-btn btn-thm2 add-joining ml-4"
      style={{ minWidth: '60px' }}
    >
      {lang === 'en' ? 'TH' : 'ENG'}
    </button>
  );
};

export default function Header20() {
    const path = usePathname();
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    // This ensures we only render once mounted on client
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
            `}</style>

            <div className="desktop-only">
                <header className="header-nav nav-innerpage-style main-menu">
                    <nav className="posr">
                        <div className="container-fluid posr menu_bdrt1">
                            <div className="row align-items-center justify-content-between">
                                <div className="col-auto pe-0">
                                    <div className="d-flex align-items-center">
                                        <Link
                                            className="header-logo bdrr1 pr30 pr5-xl"
                                            href="/"
                                        >
                                            <Image
                                                height={40}
                                                width={100}
                                                className="w-100 h-100 object-fit-contain"
                                                src="/images/about/prepmeelogo.svg"
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
                                                path === "/applytoteach"
                                                    ? "ui-active"
                                                    : ""
                                            }`}
                                            href="/applytoteach"
                                        >
                                            <span className="d-none d-xl-inline-block">
                                                Become a
                                            </span>{" "}
                                            Tutor
                                        </Link>
                                        <Link
                                            className={`login-info mr15-lg mr30 ${
                                                path === "/login" ? "ui-active" : ""
                                            }`}
                                            href="/login"
                                        >
                                            Sign in
                                        </Link>
                                        <Link
                                            className="ud-btn btn-thm add-joining"
                                            href="/register"
                                        >
                                            Join
                                        </Link>
                                        <LanguageSwitcher />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>
            </div>

            <div className="mobile-only">
                <MobileNavigation2 />
            </div>
        </>
    );
}