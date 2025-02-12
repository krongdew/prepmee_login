import Pagination1 from "@/components/section/Pagination1";
import DashboardNavigation from "../header/DashboardNavigation";
import StatementCard1 from "../card/StatementCard1";
import PaymentMethod from "./PaymentMethod";
import { statement } from "@/data/dashboard";

export default function StatementInfo() {
  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb10">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-12">
            <div className="dashboard_title_area">
              <h2>Statements and Payouts</h2>
              <p className="text">View all your income history</p>
            </div>
          </div>
        </div>
        
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="packages_table table-responsive">
                <table className="table-style3 table at-savesearch">
                  <thead className="t-head">
                    <tr>
                      <th scope="col">Date</th>
                      <th scope="col">Method</th>
                      <th scope="col">Description</th>
                      <th scope="col">Hours</th>
                      <th scope="col">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="t-body">
                    {statement.map((item,i) => (
                      <StatementCard1 key={ i } data={item} />
                    ))}
                  </tbody>
                </table>
                <div className="mt30">
                  <Pagination1 />
                </div>

                
              </div>
            </div>
          </div>
        </div>
        <div className="ps-widget bgc-white bdrs4 p30 mb30 position-relative">
              <div className="row">
                <div className="col-lg-9">
                  <PaymentMethod />
                </div>
              </div>
            </div>
      </div>
    </>
  );
}
