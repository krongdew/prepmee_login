"use client";
import ServiceDetailComment1 from "../element/ServiceDetailComment1";

import ServiceDetailReviewInfo1 from "../element/ServiceDetailReviewInfo1";
import { Sticky, StickyContainer } from "react-sticky";
import useScreen from "@/hook/useScreen";
import ServiceContactWidget1 from "../element/ServiceContactWidget1";
import ServiceDetailSlider2 from "../element/ServiceDetailSlider2";
import { useParams } from "next/navigation";
import { product1 } from "@/data/product";

export default function ServiceDetail3() {
  const isMatchedScreen = useScreen(1216);
  const { id } = useParams();

  const data = product1.find((item) => item.id == id);

  return (
    <>
      <StickyContainer>
        <section className="pt10 pb90 pb30-md">
          <div className="container">
            <div className="row wrap">
              <div className="col-lg-8">
                <div className="column">
                  <div className="row  px30 bdr1 pt30 pb-0 mb30 bg-white bdrs12 wow fadeInUp default-box-shadow1">
                    <div className="col-xl-12 mb30 pb30 bdrb1">
                      <div className="position-relative">
                        {data ? (
                          <h2>{data.title}</h2>
                        ) : (
                          <h2>
                            Headline..........
                          </h2>
                        )}
                        
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6 col-md-4">
                        <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                          <div className="icon flex-shrink-0">
                            <span className="flaticon-rocket" />
                          </div>
                          <div className="details">
                            <h5 className="title">Subject</h5>
                            <p className="mb-0 text">Math</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6 col-md-4">
                        <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                          <div className="icon flex-shrink-0">
                            <span className="flaticon-goal" />
                          </div>
                          <div className="details">
                            <h5 className="title">Grade Level</h5>
                            <p className="mb-0 text">All Grades</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6 col-md-4">
                        <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                          <div className="icon flex-shrink-0">
                            <span className="flaticon-tracking" />
                          </div>
                          <div className="details">
                            <h5 className="title">Location</h5>
                            <p className="mb-0 text">Bangkok & Online</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <ServiceDetailSlider2 />
                  <div className="service-about">
                    <div className="px30 bdr1 pt30 pb-0 mb30 bg-white bdrs12 wow fadeInUp default-box-shadow1">
                      <h4>Tutor Detail</h4>
                      <p className="text mb30">
                      My name is Kru.....
                      </p>
                      <p className="text mb-0">Experience: </p>
                      <p className="text mb-0">1) </p>
                      <p className="text mb-0">2) </p>
                      <p className="text mb-0">3) </p>
                      <p className="text mb-0">4) </p>
                      <p className="text mb30">5) </p>
                      <p className="text mb30">
                        My Rules: 

                      </p>
                      <div className="d-flex align-items-start mb50">
                        <div className="list1">
                          <h6>Grade Level</h6>
                          <p className="text mb-0">
                            Business, Food &amp; drink,
                          </p>
                          <p className="text">Graphics &amp; design</p>
                        </div>
                        <div className="list1 ml80">
                          <h6>Tools and Materials</h6>
                          <p className="text mb-0">Adobe XD, Figma,</p>
                          <p className="text">Adobe Photoshop</p>
                        </div>
                        <div className="list1 ml80">
                          <h6>Rules</h6>
                          <p className="text">Mobile, Desktop</p>
                        </div>
                      </div>
                    </div>
                   
                    <div className="px30 bdr1 pt30 pb-0 mb30 bg-white bdrs12 wow fadeInUp default-box-shadow1">
                      <ServiceDetailReviewInfo1 />
                      <ServiceDetailComment1 />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="column">
                  {isMatchedScreen ? (
                    <Sticky>
                      {({ style }) => (
                        <div className="scrollbalance-inner" style={style}>
                          <div className="blog-sidebar ms-lg-auto">
                          
                            <ServiceContactWidget1 />
                          </div>
                        </div>
                      )}
                    </Sticky>
                  ) : (
                    <div className="scrollbalance-inner">
                      <div className="blog-sidebar ms-lg-auto">
                    
                        <ServiceContactWidget1 />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </StickyContainer>
    </>
  );
}
