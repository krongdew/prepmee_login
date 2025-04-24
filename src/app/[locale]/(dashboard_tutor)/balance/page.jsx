import DashboardLayout from "@/components/dashboard/DashboardLayout";
import BalanceInfo from "@/components/dashboard/section/BalanceInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";


export const metadata = {
  title: "Balance",
};

export default function page() {
  return (
    <>
    
    <MobileNavigation2 />
      <DashboardLayout>
        <BalanceInfo />
      </DashboardLayout>
    </>
  );
}
