import Hero13 from "@/components/hero/Hero13";
import NeedSomething2 from "@/components/section/NeedSomething2";
import TrendingService15 from "@/components/section/TrendingService15";
import React from "react";
import CTa13 from "@/components/section/CTa13";
import Header20 from "@/components/header/Header20";
import Footer8 from "@/components/footer/Footer8";
import BrowserCategory5 from "@/components/section/BrowserCategory5";
import { locales, defaultLocale } from '@/i18n';

export const metadata = {
    title: "Home",
};

export default async function Page({ params }) {
    // ใช้ await กับ params
    const { locale: requestedLocale } = await params;
    
    // ตรวจสอบและกำหนด locale
    const locale = locales.includes(requestedLocale) 
        ? requestedLocale 
        : defaultLocale;
    
    return (
        <>
            <div className="wrapper ovh">
            <Header20 locale={locale} />
          
                <div className="body_content">
                <Hero13 locale={locale} />
                     <BrowserCategory5 />
                    <TrendingService15 />
                    <NeedSomething2 />
                    <CTa13 />
                </div>
                <Footer8 />
            </div>
        </>
    );
}

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}