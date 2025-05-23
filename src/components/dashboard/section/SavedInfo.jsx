"use client";
import Pagination1 from "@/components/section/Pagination1";
import DashboardNavigation from "../header/DashboardNavigation";
import { useState } from "react";
import ServiceCard1 from "../card/ServiceCard1";
import ProjectCard1 from "../card/ProjectCard1";
import JobCard1 from "../card/JobCard1";
import { product1, project1 } from "@/data/product";
import { job1 } from "@/data/job";

const tab = ["Saved Tutors"];

export default function SavedInfo() {
  const [getCurrentTab, setCurrentTab] = useState(0);

  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb10">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-12">
            <div className="dashboard_title_area">
              <h2>Saved</h2>
              <p className="text">View all your saved tutors here</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 position-relative">
              <div className="navtab-style1">
                <nav>
                  <div className="nav nav-tabs mb30">
                    {tab.map((item, i) => (
                      <button
                        onClick={() => setCurrentTab(i)}
                        key={i}
                        className={`nav-link fw500 ps-0 ${
                          getCurrentTab === i ? "active" : ""
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </nav>
                {/* services tab */}
                {getCurrentTab === 0 && (
                  <div className="row">
                    {product1.slice(0, 8).map((item,i) => (
                      <div key={i} className="col-sm-6 col-xl-3">
                        <ServiceCard1 data={item} />
                      </div>
                    ))}
                  </div>
                )}

                

               
              </div>

              <Pagination1 />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
