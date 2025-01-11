import Breadcumb3 from "@/components/breadcumb/Breadcumb3";
import Footer from "@/components/footer/Footer";
import Header20 from "@/components/header/Header20";
import ServiceDetail2 from "@/components/section/ServiceDetails2";
import React from "react";

export default function page() {
    return (
        <>
            <Header20 />
            <Breadcumb3 path={["Home", "Services", "Design & Creative"]} />
            <ServiceDetail2 />
          
            <Footer />
        </>
    );
}
