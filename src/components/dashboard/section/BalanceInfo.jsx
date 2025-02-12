import Link from "next/link";
import DashboardNavigation from "../header/DashboardNavigation";
import Pagination1 from "@/components/section/Pagination1";
import { payout } from "@/data/dashboard";
import BalanceCard from "@/components/dashboard/card/BalanceCard";

export default function BalanceInfo() {
  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb10">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
        </div>
        <div className="row align-items-center justify-content-between pb10">
          <div className="col-lg-6">
            <div className="dashboard_title_area">
              <h2>Balance</h2>
              <p className="text">View your balance</p>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="text-lg-end">
              <Link
                href="/freelancer-1"
                className="ud-btn btn-dark default-box-shadow2"
              >
                Buy credits
                <i className="fal fa-arrow-right-long" />
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb60 overflow-hidden position-relative">
              <div className="packages_table table-responsive">
                <table className="table-style3 table at-savesearch">
                  <thead className="t-head">
                    <tr>
                      <th scope="col">Amount</th>
                      <th scope="col">Date</th>
                      <th scope="col">Payout Method</th>
                      <th scope="col">Payment Status</th>
                    </tr>
                  </thead>
                  <tbody className="t-body">
                    {payout.map((item,i) => (
                      <BalanceCard key={i} data={item} />
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
      </div>
    </>
  );
}
