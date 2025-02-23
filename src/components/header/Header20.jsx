"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
// import usePathname useRouter useTranslations
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from 'next-intl';
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
    const currentLocale = pathname.split('/')[1] || 'th';
    const t = useTranslations('Common');

    useEffect(() => {
        setHasMounted(true);
    }, []);

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
                                        <Link
                                            className={`login-info mr15-lg mr30 ${
                                                pathname === `/${currentLocale}/login` ? "ui-active" : ""
                                            }`}
                                            href={`/${currentLocale}/login`}
                                        >
                                            {t('nav.signin')}
                                        </Link>
                                        <Link
                                            className="ud-btn btn-thm add-joining"
                                            href={`/${currentLocale}/register`}
                                        >
                                            {t('nav.join')}
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
                <MobileNavigation2 currentLocale={currentLocale} />
            </div>
        </>
    );
}