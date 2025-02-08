import DashboardLayout from "@/components/dashboard/DashboardLayout";
import TutorSchedule from "@/components/dashboard/section/TutorSchedule";
import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "Tutor Schedule",
};

export default function page() {
  return (
    <>
    
    <MobileNavigation2 />
      <DashboardLayout>
        <TutorSchedule/>
      </DashboardLayout>
    </>
  );
}
