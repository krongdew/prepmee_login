
import Hero13 from "@/components/hero/Hero13";
import NeedSomething2 from "@/components/section/NeedSomething2";
import TrendingService15 from "@/components/section/TrendingService15";
import React from "react";
import CTa13 from "@/components/section/CTa13";
import Header20 from "@/components/header/Header20";
import Footer8 from "@/components/footer/Footer8";

export const metadata = {
    title: "Home",
};
export default function page({params}) {
    return (
        <>
            <div className="wrapper ovh">
            <Header20 params={params} />
          
                <div className="body_content">
                <Hero13 params={params} />
           
                    <TrendingService15 />
                    <NeedSomething2 />
                    <CTa13 />
                </div>
                <Footer8 />
            </div>
        </>
    );
}
