import Image from "next/image";
import Link from "next/link";

export default function About5() {
  return (
    <>
      <section className="our-about pb0 pt60-lg">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 col-xl-6">
              <div
                className="about-img mb30-sm wow fadeInRight"
                data-wow-delay="300ms"
              >
                <Image
                  height={574}
                  width={691}
                  className="w100 h-100"
                  src="/images/about/about-1.png"
                  alt="about"
                />
              </div>
            </div>
            <div className="col-md-6 col-xl-5 offset-xl-1">
              <div
                className="position-relative wow fadeInLeft"
                data-wow-delay="300ms"
              >
                <h2 className="mb25">
                  The Best Tutor Marketplace{" "}
                  <br className="d-none d-xl-block" />
                </h2>
                <p className="text mb25">
               
At Premee, we're transforming the way students connect with qualified tutors. Whether you're looking to excel in academics, master a new skill, or prepare for important exams, we make finding the perfect tutor seamless and stress-free.
Your Learning Journey Made Simple
Finding the right tutor shouldn't be complicated. That's why we've created a platform that handles everything from tutor discovery to scheduling and payments, letting you focus on what matters most - learning.
                </p>
                <div className="list-style2">
                  <ul className="mb20">
                    <li>
                      <i className="far fa-check" />
                      Tutor Marketplace
                    </li>
                    <li>
                      <i className="far fa-check" />
                      Handle Schedule
                    </li>
                    <li>
                      <i className="far fa-check" />
                      Handle Payment
                    </li>
                  </ul>
                </div>
                <Link
                  href="/freelancer-single"
                  className="ud-btn btn-thm-border"
                >
                  Find Tutors
                  <i className="fal fa-arrow-right-long" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
