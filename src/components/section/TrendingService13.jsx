"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";

import { Navigation } from "swiper";

import TrendingServiceCard1 from "../card/TrendingServiceCard1";
import { product1 } from "@/data/product";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function TrendingService13() {
  const [showSwiper, setShowSwiper] = useState(false);
  useEffect(() => {
    setShowSwiper(true);
  }, []);

  return (
    <>
      <section className="pb90 pb30-md bgc-thm3">
        <div className="container">
          <div className="row align-items-center wow fadeInUp">
            <div className="col-lg-9">
              <div className="main-title">
                <h2 className="title">New Tutors</h2>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="text-start text-lg-end mb-4 mb-lg-2">
                <Link className="ud-btn2" href="/service-1">
                  All Categories
                  <i className="fal fa-arrow-right-long" />
                </Link>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="position-relative">
                {showSwiper && (
                  <Swiper
                    slidesPerView={6}
                    spaceBetween={15}
                    freeMode={true}
                    className="mySwiper"
                    navigation={{
                      prevEl: ".prev-btn",
                      nextEl: ".next-btn",
                    }}
                    style={{ 
                      overflow: "visible",
                      padding: "0 10px"  // Add padding for better visibility
                    }}
                    modules={[Navigation]}
                    breakpoints={{
                      0: {
                        slidesPerView: 2,
                        spaceBetween: 10
                      },
                      576: {
                        slidesPerView: 3,
                        spaceBetween: 10
                      },
                      768: {
                        slidesPerView: 4,
                        spaceBetween: 15
                      },
                      992: {
                        slidesPerView: 5,
                        spaceBetween: 15
                      },
                      1200: {
                        slidesPerView: 6,
                        spaceBetween: 15
                      },
                    }}
                  >
                    {product1.map((item, i) => (
                      <SwiperSlide key={i} className="p-1">
                        <div style={{ transform: 'scale(0.9)' }}>
                          <TrendingServiceCard1 data={item} />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
                <button type="button" className="prev-btn">
                  <i className="far fa-chevron-left" />
                </button>
                <button type="button" className="next-btn">
                  <i className="far fa-chevron-right" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}