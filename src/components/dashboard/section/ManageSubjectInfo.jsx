"use client";
import Link from "next/link";
import DashboardNavigation from "../header/DashboardNavigation";
import { useState } from "react";
import Pagination1 from "@/components/section/Pagination1";
import ManageSubjectCard from "../card/ManageSubjectCard";
import ProposalModal1 from "../modal/ProposalModal1";
import DeleteModal from "../modal/DeleteModal";

const tab = [
  "My Subjects",

];

export default function ManageSubjectInfo() {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-9">
            <div className="dashboard_title_area">
              <h2>Manage Subjects</h2>
              <p className="text">Manage subjects you teach here</p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="text-lg-end">
              <Link
                href="/create-projects"
                className="ud-btn btn-dark default-box-shadow2"
              >
                Add subject
                <i className="fal fa-arrow-right-long" />
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="navtab-style1">
                <nav>
                  <div className="nav nav-tabs mb30">
                    {tab.map((item, i) => (
                      <button
                        key={i}
                        className={`nav-link fw500 ps-0 ${
                          selectedTab == i ? "active" : ""
                        }`}
                        onClick={() => setSelectedTab(i)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </nav>
                {selectedTab === 0 && (
                  <div className="packages_table table-responsive">
                    <table className="table-style3 table at-savesearch">
                      <thead className="t-head">
                        <tr>
                          <th scope="col">Subjects</th>
                          <th scope="col">Online/On-Site</th>
                          <th scope="col">Rate</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="t-body">
                        {Array(7)
                          .fill(7)
                          .map((_, i) => (
                            <ManageSubjectCard key={i} />
                          ))}
                      </tbody>
                    </table>
                    <div className="mt30">
                      <Pagination1 />
                    </div>
                  </div>
                )}
                {selectedTab === 1 && (
                  <div className="packages_table table-responsive">
                    <table className="table-style3 table at-savesearch">
                      <thead className="t-head">
                        <tr>
                          <th scope="col">Subjects</th>
                          <th scope="col">Online/On-Site</th>
                          <th scope="col">Hourly Rate</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="t-body">
                        {Array(7)
                          .fill(7)
                          .map((_, i) => (
                            <ManageSubjectCard key={i} />
                          ))}
                      </tbody>
                    </table>
                    
                  </div>
                )}
        
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProposalModal1 />
      <DeleteModal />
    </>
  );
}
