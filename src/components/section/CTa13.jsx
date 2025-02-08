import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CTa13() {
  return (
    <section className="home11-cta-3 at-home13">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-md-6 col-lg-8 wow fadeInLeft">
            <div className="cta-style3">
              <h2 className="cta-title">
                Teach with us and inspire learners{" "}
                <br className="d-none d-xl-block" />
              
              </h2>
              <p className="cta-text">
                Reach thousands of students
              </p>
              <Link
                href="/applytoteach"
                className="ud-btn btn-dark default-box-shadow1"
              >
                Apply to teach<i className="fal fa-arrow-right-long"></i>
              </Link>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 wow fadeIn">
            <Image
              width={500}
              height={500}
              style={{ height: "fit-content" }}
              className="home11-ctaimg-v3 d-none d-md-block"
              src="/images/about/teachers.png"
              alt=" image "
            />
          </div>
        </div>
      </div>
    </section>
  );
}
