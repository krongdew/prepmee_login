"use client";


import ServiceDetailPrice1 from "../element/ServiceDetailPrice1";
import ServiceDetailReviewInfo1 from "../element/ServiceDetailReviewInfo1";
import ServiceDetailSlider1 from "../element/ServiceDetailSlider1";
import { Sticky, StickyContainer } from "react-sticky";
import useScreen from "@/hook/useScreen";
import ServiceContactWidget1 from "../element/ServiceContactWidget1";
import Image from "next/image";
import { useParams } from "next/navigation";
import { product1 } from "@/data/product";

export default function ServiceDetail2() {
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
                  <div className="row mb30 pb30 bdrb1">
                    <div className="col-xl-12">
                      <div className="position-relative">
                        {data ? (
                          <h2>{data.title}</h2>
                        ) : (
                          <h2>
                            Want to master your English? You come to the right person
                          </h2>
                        )}
                        <div className="list-meta mt30">
                          <a className="list-inline-item mb5-sm" href="#">
                            <span className="position-relative mr10">
                              <Image
                                width={40}
                                height={40}
                                className="rounded-circle"
                                src="/images/team/fl-d-1.png"
                                alt="Freelancer Photo"
                              />
                              <span className="online-badge"></span>
                            </span>
                            <span className="fz14">Eleanor Pena</span>
                          </a>
                          <p className="mb-0 dark-color fz14 list-inline-item ml25 ml15-sm mb5-sm ml0-xs">
                            <i className="fas fa-star vam fz10 review-color me-2"></i>{" "}
                            4.82 94 reviews
                          </p>
                          <p className="mb-0 dark-color fz14 list-inline-item ml25 ml15-sm mb5-sm ml0-xs">
                            <i className="flaticon-file-1 vam fz20 me-2"></i> 2
                            Order in Queue
                          </p>
                          <p className="mb-0 dark-color fz14 list-inline-item ml25 ml15-sm mb5-sm ml0-xs">
                            <i className="flaticon-website vam fz20 me-2"></i>{" "}
                            902 Views
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <ServiceDetailSlider1 />
                  <div className="service-about">
                    <h4>About</h4>
                    <p className="text mb30">
                      It is a long established fact that a reader will be
                      distracted by the readable content of a page when looking
                      at its layout. The point of using Lorem Ipsum is that it
                      has a more-or-less normal distribution of letters, as
                      opposed to using 'Content here, content here', making it
                      look like readable English.
                
                      Many desktop publishing packages and web page editors now
                      use Lorem Ipsum as their default model text, and a search
                      for 'lorem ipsum' will uncover many web sites still in
                      their infancy. Various versions have evolved over the
                      years, sometimes by accident, sometimes on purpose
                      (injected humour and the like).
                    </p>
                 
                   
                   
                    <hr className="opacity-100 mb15" />
                    <ServiceDetailReviewInfo1 />
                  
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
                            <ServiceDetailPrice1 />
                            <ServiceContactWidget1 />
                          </div>
                        </div>
                      )}
                    </Sticky>
                  ) : (
                    <div className="scrollbalance-inner">
                      <div className="blog-sidebar ms-lg-auto">
                        <ServiceDetailPrice1 />
                  
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
