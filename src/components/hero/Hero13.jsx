"use client";
import Image from "next/image";
import HeroSearch1 from "../element/HeroSearch1";
import { useState } from "react";
import { useRouter } from "next/navigation";

const role = [
  "Science, Biology & Chemistry",
  "Languages",
  "Math & Physics",
  "IT & Coding",
  "Art & Craft",
  "Music",
  "Test Prep",
];

const popular = ["Math", "English", "Thai", "Physics", "Chemistry", "Python"];

import { funfactsData } from "@/data/fanfact";
import React from "react";
import CountUp from "react-countup";

export default function Hero13() {
  const [getSelectedRole, setSelectedRole] = useState(null);

  // role handler
  const roleHandler = (select) => {
    setSelectedRole(select);
  };
  const router = useRouter();

  // search handler
  const searchHandler = () => {
    router.push("/project-1");
  };
  return (
    <section className="hero-home13 overflow-hidden">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-7">
            <div className="home13-hero-content">
              <span
                className="d-inline-block tag animate-up-1 mb15 text-white"
                style={{ background: "#222222" }}
              >
                Get Started
              </span>
              <h1 className="animate-up-1 mb25">
                Find the best tutors <br className="d-none d-xl-block" />
                online and onsite
              </h1>
              <p className="text animate-up-2">
                Whatever you want to learn
                the most <br className="d-none d-lg-block" />
                out of your time and cost
              </p>
              <div className="advance-search-tab bgc-white p10 bdrs4-sm bdrs12 banner-btn position-relative zi1 animate-up-3 mt30">
                <div className="row">
                  <div className="col-md-5 col-lg-6 col-xl-6">
                    <div className="advance-search-field mb10-sm bdrr1 bdrn-sm">
                      <HeroSearch1 />
                    </div>
                  </div>
                  <div className="col-md-4 col-lg-4 col-xl-3">
                    <div className="bselect-style1">
                      <div className="dropdown bootstrap-select">
                        <button
                          type="button"
                          className="btn dropdown-toggle btn-light"
                          data-bs-toggle="dropdown"
                        >
                          <div className="filter-option">
                            <div className="filter-option-inner">
                              <div className="filter-option-inner-inner">
                                {getSelectedRole !== null
                                  ? getSelectedRole
                                  : "Choose Category"}
                              </div>
                            </div>{" "}
                          </div>
                        </button>
                        <div className="dropdown-menu ">
                          <div className="inner show">
                            <ul className="dropdown-menu inner show">
                              {role.map((item, index) => (
                                <li
                                  onClick={() => roleHandler(item)}
                                  key={index}
                                  className="selected active"
                                >
                                  <a
                                    className={`dropdown-item selected ${
                                      getSelectedRole === item ? "active" : ""
                                    }`}
                                  >
                                    <span className="text">{item}</span>
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 col-lg-2 col-xl-2">
                    <div className="text-center text-xl-start">
                      <button
                        className="ud-btn btn-dark w-100 bdrs12"
                        type="button"
                        onClick={searchHandler}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt30 justify-content-between animate-up-4">
                {funfactsData.map((elm, i) => (
                  <div key={i} className="col-6 col-sm-3 funfact_one">
                    <div className="details">
                      <ul className="ps-0 mb-0 d-flex">
                        <li>
                          <div className="timer">
                            <CountUp end={elm.value} duration={2.75} />
                          </div>
                        </li>
                        <li>
                          <span>M</span>
                        </li>
                      </ul>
                      <p className="mb-0">{elm.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-xl-5 d-none d-xl-block">
            <div className="home13-hero-img position-relative">
              <div className="position-relative">
                <div className="d-flex align-items-center">
                  <div>
                   
                 
                  </div>
                  <div className="ml10">
                    <Image
                      width={660}
                      height={800}
                      style={{ height: "fit-content" }}
                      className="img-3"
                      src="/images/about/book.png"
                      alt=" image "
                    />
               
                  </div>
                </div>
              </div>
          
  <div className="iconbox-small1 text-start d-flex wow fadeInRight default-box-shadow4 bounce-x animate-up-1"
  style={{ marginLeft: "10px", marginTop: "180px" }}
>
                <span className="icon flaticon-badge"></span>
                <div className="details pl20">
                  <h6 className="mb-2">Proof of quality</h6>
                  <p className="text fz13 mb-0">Lorem Ipsum Dolar Amet</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
