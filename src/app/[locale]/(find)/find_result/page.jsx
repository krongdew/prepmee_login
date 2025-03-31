import Breadcumb3 from "@/components/breadcumb/Breadcumb3";
import Footer8 from "@/components/footer/Footer8";
import Header20 from "@/components/header/Header20";
import Listing3 from "@/components/section/Listing3";
import TabSection1 from "@/components/section/TabSection1";

export const metadata = {
    title: "Tutor Finder",
};

// ใช้ dynamic rendering เพื่อป้องกันปัญหากับ static generation
export const dynamic = 'force-dynamic';

export default function Page({ params, searchParams }) {
    // ใช้ชื่อหมวดหมู่สำหรับ breadcrumb (ไม่ล็อกออกเพื่อป้องกันปัญหา)
    const subjectName = searchParams?.subject || "All Subjects";
    
    return (
        <>
            <Header20 params={params} />
            <TabSection1 />
            <Breadcumb3 path={["Home", "Services", subjectName]} />
            <Listing3 />
            <Footer8 />
        </>
    );
}