"use client";
import React, { useState, useEffect } from "react";
import SelectInput from "../option/SelectInput";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from '@/context/AuthContext';
import authService from '@/services/authService'; 

export default function ProfileDetails() {
  const { user, loadUserProfile } = useAuth();
  // เพิ่มตัวแปรใหม่สำหรับเก็บไฟล์รูปภาพ
const [selectedImage, setSelectedImage] = useState(null);
const [selectedImageFile, setSelectedImageFile] = useState(null);
const [loading, setLoading] = useState(true);
  
  const [getGender, setGender] = useState({
    option: user?.profile?.gerder || "Select",
    value: user?.profile?.gerder?.toLowerCase() || null,
  });


// ข้อมูลในฟอร์ม
const [formData, setFormData] = useState({
  display_name: user?.profile?.display_name || "",
  email: user?.email || "",
  bio: user?.profile?.bio || "",
  firstName: user?.profile?.first_name || "",
  lastName: user?.profile?.last_name || "",
  phone: user?.profile?.phone || ""
});

  
  
   // อัปเดต state เมื่อมีข้อมูลผู้ใช้ใหม่
   useEffect(() => {
    if (user) {
      setFormData({
        display_name: user.profile?.display_name || "",
        email: user.email || "",
        bio: user.profile?.bio || "",
        firstName: user.profile?.first_name || "",
        lastName: user.profile?.last_name || "",
        phone: user.profile?.phone || ""
      });
      
      if (user.profile?.gender) {
        setGender({
          option: user.profile.gender,
          value: user.profile.gender.toLowerCase()
        });
      }
      
      if (user.profile?.profile_picture) {
        setSelectedImage(user.profile.profile_picture);
        setSelectedImageFile(null); // ล้างค่าไฟล์เมื่อโหลดข้อมูลใหม่
      }
    }
  }, [user]);

// แก้ไขฟังก์ชัน handleImageChange
const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    // เก็บไฟล์ไว้สำหรับการอัปโหลด
    setSelectedImageFile(file);
    // สร้าง URL สำหรับการแสดงผลในหน้าเว็บ
    setSelectedImage(URL.createObjectURL(file));
  }
};

  // handlers
  
  // จัดการการเปลี่ยนแปลงของ input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const genderHandler = (option, value) => {
    setGender({ option, value });
  };


  const cityHandler = (option, value) => {
    setCity({ option, value });
  };

//  // บันทึกข้อมูลที่มีการแก้ไข
//  const handleSubmit = async (e) => {
//   e.preventDefault();
  

  
//   // ถ้ามีการเปลี่ยนรูปภาพ
//   // ต้องอัปโหลดรูปภาพก่อนแล้วค่อยอัปเดตโปรไฟล์
  
//   try {
//       // เริ่มแสดงสถานะโหลด (ถ้ามี)
//       setLoading(true);
    
//     // ถ้ามีการเปลี่ยนรูปภาพ
//     let profilePictureUrl = user?.profile?.profile_picture;
    
//     if (selectedImageFile) {
//       // อัปโหลดรูปภาพก่อน
//       const pictureResult = await authService.uploadProfilePicture(selectedImageFile);
//       profilePictureUrl = pictureResult.profile_picture || pictureResult.url;
//     }
    
//     const updatedProfile = {
//     display_name: formData.username,
//     first_name: formData.firstName,
//     last_name: formData.lastName,
//     phone: formData.phone,
//     gender: getGender.option !== "Select" ? getGender.option : null,
//     bio: formData.bio
//     };
//     // แสดงข้อความเมื่อบันทึกสำเร็จ
//      // อัปเดตโปรไฟล์
//      await authService.updateStudentProfile(updatedProfile);
    
//      // แสดงข้อความเมื่อบันทึกสำเร็จ
//      alert("Profile updated successfully");
     
//      // อัปเดตข้อมูลผู้ใช้ในระบบ (ถ้ามีฟังก์ชันนี้)
//      await loadUserProfile(); // ถ้ามีฟังก์ชันนี้ใน useAuth
     
//   } catch (error) {
//     console.error("Failed to update profile:", error);
//     alert("Failed to update profile. Please try again.");
//   }
// };

  return (
    <>
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb25">
          <h5 className="list-title">Profile Details</h5>
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
          {/* <form className="form-style1"  onSubmit={handleSubmit}> */}
            <div className="row">
              <div className="col-sm-6">
                <div className="mb20">
                  
                  <label className="heading-color ff-heading fw500 mb10">
                  Display Name
                  </label>
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    placeholder="Display Name"
                    value={formData.display_name}
                    onChange={handleInputChange}
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
                    value={formData.email}
                    onChange={handleInputChange}
                    readOnly // อีเมลไม่ควรเปลี่ยนแปลงได้
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
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
              <div className="col-md-12">
                <div className="mb10">
                  <label className="heading-color ff-heading fw500 mb10">
                    Bio
                  </label>
                  <textarea 
                    name="bio"
                    cols={30} 
                    rows={6} 
                    placeholder="Tell us about yourself" 
                    value={formData.bio}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            
            
    
              <div className="col-md-12">
                <div className="text-start">
                <button type="submit" className="ud-btn btn-thm">
                    Save
                    <i className="fal fa-arrow-right-long" />
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
