import Breadcumb3 from "@/components/breadcumb/Breadcumb3";
import Footer8 from "@/components/footer/Footer8";
import Header20 from "@/components/header/Header20";
import ServiceDetail3 from "@/components/section/ServiceDetails3";
import TabSection1 from "@/components/section/TabSection1";
import React from "react";

export default function page() {
    return (
        <>
            <Header20 />
            <TabSection1 />
            <div className=" bgc-thm3">
                <Breadcumb3 path={["Home", "Subjects", "Maths"]} />
                <ServiceDetail3 />
             
            </div>
            <Footer8 />
        </>
    );
}
