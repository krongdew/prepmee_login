"use client";
import { browserCategory } from "@/data/project";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import BrowserCategoryCard5 from "../card/BrowserCategoryCard5";
import { useParams } from "next/navigation";

export default function BrowserCategory5() {
  // Get current locale from URL params
  const params = useParams();
  const locale = params?.locale || "en";

  // Function to create the URL with subject parameter
  const createSubjectUrl = (subject) => {
    const encodedSubject = encodeURIComponent(subject);
    const url = `/${locale}/find_result?subject=${encodedSubject}`;
    console.log(`สร้าง URL สำหรับวิชา "${subject}":`, url);
    return url;
  };

  return (
    <>
      <section className="pb70 pb30-md pt40">
        <div className="container">
          <div
            className="row align-items-md-center wow fadeInUp"
            data-wow-delay="00ms"
          >
            <div className="col-lg-9">
              <div className="main-title2">
                <h2 className="title">Browse Tutor by subject</h2>
                <p className="paragraph">
                  Get some Inspirations from 1800+ skills
                </p>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="text-start text-lg-end mb-3">
                <Link className="ud-btn2" href="/find_result">
                  All subject
                  <i className="fal fa-arrow-right-long dark-color" />
                </Link>
              </div>
            </div>
          </div>
          <div className="row wow fadeInUp" data-wow-delay="300ms">
            {browserCategory.slice(0, 8).map((item, i) => (
              <div key={i} className="col-sm-6 col-lg-3">
                <Link href={createSubjectUrl(item.title)}>
                  <BrowserCategoryCard5 data={item} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}