import DashboardLayout from "@/components/dashboard/DashboardLayout";
import MessageInfo from "@/components/dashboard/section/MessageInfo";

import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "Messages",
};

export default function page() {
  return (
    <>
    
    <MobileNavigation2 />
      <DashboardLayout>
        <MessageInfo />
      </DashboardLayout>
    </>
  );
}
