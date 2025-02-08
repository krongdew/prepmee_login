
import DashboardNavigation from "../header/DashboardNavigation";


export default function DashboardInfo() {
  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-12">
            <div className="dashboard_title_area">
              <h2>My Lessons</h2>
              <p className="text">You can see your upcoming lessons and previous lessons here</p>
            </div>
          </div>
        </div>
       </div>
    </>
  );
}
