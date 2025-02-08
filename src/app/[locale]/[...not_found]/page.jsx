import Footer8 from "@/components/footer/Footer8";
import Header20 from "@/components/header/Header20";
import PageNotFound from "@/components/section/PageNotFound";

export const metadata = {
    title: "Not Found",
};
export default function NotFound() {
    return (
        <>
            <Header20 />
            <PageNotFound />
            <Footer8 />
        </>
    );
}
