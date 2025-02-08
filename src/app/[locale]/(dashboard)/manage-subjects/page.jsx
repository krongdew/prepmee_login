import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ManageProjectInfo from "@/components/dashboard/section/ManageSubjectInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title:
    "Manage Subjects",
};

export default function page() {
  return (
    <>
    
    <MobileNavigation2 />
      <DashboardLayout>
        <ManageProjectInfo />
      </DashboardLayout>
    </>
  );
}
