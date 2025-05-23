"use client";
import React, { useState } from "react";
import SelectInput from "../option/SelectInput";
import Link from "next/link";
import Image from "next/image";

export default function TutorProfileInfo() {
  const [getHourly, setHourly] = useState({
    option: "Select",
    value: null,
  });
  const [getGender, setGender] = useState({
    option: "Select",
    value: null,
  });
  const [getSpecialization, setSpecialization] = useState({
    option: "Select",
    value: null,
  });
  const [getType, setType] = useState({
    option: "Select",
    value: null,
  });
  const [getCountry, setCountry] = useState({
    option: "Select",
    value: null,
  });
  const [getCity, setCity] = useState({
    option: "Select",
    value: null,
  });
  const [getLanguage, setLanguage] = useState({
    option: "Select",
    value: null,
  });
  const [getLanLevel, setLanLevel] = useState({
    option: "Select",
    value: null,
  });
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(event);
    setSelectedImage(URL.createObjectURL(file));
  };

  // handlers
  const hourlyHandler = (option, value) => {
    setHourly({ option, value });
  };
  const genderHandler = (option, value) => {
    setGender({ option, value });
  };

  const specializationHandler = (option, value) => {
    setSpecialization({ option, value });
  };
  const typeHandler = (option, value) => {
    setType({ option, value });
  };
  const countryHandler = (option, value) => {
    setCountry({ option, value });
  };
  const cityHandler = (option, value) => {
    setCity({ option, value });
  };
  const languageHandler = (option, value) => {
    setLanguage({ option, value });
  };
  const lanLevelHandler = (option, value) => {
    setLanLevel({ option, value });
  };

  return (
    <>
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb25">
          <h5 className="list-title">Tutor Profile</h5>
        </div>
        <div className="col-xl-7">
          <div className="profile-box d-sm-flex align-items-center mb30">
            <div className="profile-img mb20-sm">
              <Image
                height={120}
                width={120}
                className="rounded-circle wa-xs"
                src={selectedImage ? selectedImage : "/images/team/fl-1.png"}
                style={{
                  height: "120px",
                  width: "120px",
                  objectFit: "cover",
                }}
                alt="profile"
              />
            </div>
            <div className="profile-content ml20 ml0-xs">
              <div className="d-flex align-items-center my-3">
                <a
                  className="tag-delt text-thm2"
                  onClick={() => setSelectedImage(null)}
                >
                  <span className="flaticon-delete text-thm2" />
                </a>
                <label>
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    className="d-none"
                    onChange={handleImageChange}
                  />
                  <a className="upload-btn ml10">Upload Images</a>
                </label>
              </div>
              <p className="text mb-0">
                Max file size is 1MB, Minimum dimension: 330x300 And Suitable
                files are .jpg &amp; .png
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-7">
          <form className="form-style1">
            <div className="row">
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="username"
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="@"
                  />
                </div>
              </div>
      
            
              <div className="col-sm-6">
                <div className="mb20">
                  <SelectInput
                    label="Gender"
                    defaultSelect={getGender}
                    data={[
                      { option: "Male", value: "male" },
                      {
                        option: "Female",
                        value: "female",
                      },
                      { option: "Other", value: "other" },
                    ]}
                    handler={genderHandler}
                  />
                </div>
              </div>
        
            
              <div className="col-sm-6">
                <div className="mb20">
                  <SelectInput
                    label="City"
                    defaultSelect={getCity}
                    data={[
                      {
                        option: "New York",
                        value: "new-york",
                      },
                      {
                        option: "Toronto",
                        value: "toronto",
                      },
                      {
                        option: "London",
                        value: "london",
                      },
                      {
                        option: "Sydney",
                        value: "sydney",
                      },
                      {
                        option: "Berlin",
                        value: "berlin",
                      },
                      { option: "Tokyo", value: "tokyo" },
                    ]}
                    handler={cityHandler}
                  />
                </div>
              </div>
             
              <div className="col-md-12">
                <div className="mb10">
                  <label className="heading-color ff-heading fw500 mb10">
                    Introduce Yourself
                  </label>
                  <textarea cols={30} rows={6} placeholder="Description" />
                </div>
              </div>
              <div className="col-md-12">
                <div className="text-start">
                  <Link className="ud-btn btn-thm" href="/contact">
                    Save
                    <i className="fal fa-arrow-right-long" />
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
