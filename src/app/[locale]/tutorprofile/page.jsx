import DashboardLayout from "@/components/dashboard/DashboardLayout";
import TutorProfileInfo from "@/components/dashboard/section/TutorProfileInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";
import DashboardNavigation from "@/components/dashboard/header/DashboardNavigation";

export const metadata = {
  title: "Tutor Profile",
};

export default function page() {
  return (
     <>
         <MobileNavigation2 />
         <DashboardLayout>
         <DashboardNavigation />
               
               
         <div className="dashboard__content hover-bgc-color">
           <div className="row pb10">
             <div className="col-lg-12">
              
             </div>
             <div className="col-lg-9">
               <div className="dashboard_title_area">
                 <h2>Tutor Profile</h2>
                 <p className="text">Update tutor profile</p>
               </div>
             </div>
           </div>
           <div className="row">
             <div className="col-xl-12">
               <TutorProfileInfo/>
               
             </div>
           </div>
         </div>
         </DashboardLayout>
       </>
     );
   }
   