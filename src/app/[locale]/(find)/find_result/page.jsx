import Breadcumb3 from "@/components/breadcumb/Breadcumb3";
import Footer8 from "@/components/footer/Footer8";
import Header20 from "@/components/header/Header20";
import Listing3 from "@/components/section/Listing3";
import TabSection1 from "@/components/section/TabSection1";

export const metadata = {
    title: "Tutor Finder",
};

export default function page() {
    return (
        <>
            <Header20 />
            <TabSection1 />
            <Breadcumb3 path={["Home", "Services", "Design & Creative"]} />
          
            <Listing3 />
            <Footer8 />
        </>
    );
}
