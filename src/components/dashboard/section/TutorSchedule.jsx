import Pagination1 from "@/components/section/Pagination1";
import ProposalCard1 from "../card/ProposalCard1";
import DashboardNavigation from "../header/DashboardNavigation";
import { project1 } from "@/data/product";
import DeleteModal from "../modal/DeleteModal";
import ProposalModal1 from "../modal/ProposalModal1";
import TutorCalendar from "./TutorCalendar.jsx"

export default function TutorSchedule() {
  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb10">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-12">
            <div className="dashboard_title_area">
              <h2>Manage Schedule</h2>
              <p className="text">You can manage your schedule here</p>
            </div>
          </div>
        </div>
            
        {/* Tutor Calendar Component */}
        <TutorCalendar />
        
      </div>
      <ProposalModal1 />
      <DeleteModal />
    </>
  );
}
