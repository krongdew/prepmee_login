

import Hero13 from "@/components/hero/Hero13";
import BrowserCategory13 from "@/components/section/BrowserCategory13";
import NeedSomething2 from "@/components/section/NeedSomething2";
import TrendingService13 from "@/components/section/TrendingService13";
import React from "react";


import CTa13 from "@/components/section/CTa13";
import Header20 from "@/components/header/Header20";
import Footer8 from "@/components/footer/Footer8";


export default function page() {
    return (
        <>
            <div className="wrapper ovh">
                <Header20 />
           
                <div className="body_content">
                    <Hero13 />
                    <BrowserCategory13 />
                    <TrendingService13 />
                    <NeedSomething2 />
        
            
                    <CTa13 />
                </div>
                <Footer8 />
            </div>
        </>
    );
}
