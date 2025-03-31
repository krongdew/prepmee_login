"use client";
import { tutorProducts } from "@/data/tutorProducts";
import ListingOption2 from "../element/ListingOption2";
import ListingSidebarModal1 from "../modal/ListingSidebarModal1";
import ListingSidebar1 from "../sidebar/ListingSidebar1";
import Pagination1 from "./Pagination1";
import TrendingServiceCard1 from "../card/TrendingServiceCard1";
import listingStore from "@/store/listingStore";
import priceStore from "@/store/priceStore";
import PopularServiceSlideCard1 from "../card/PopularServiceSlideCard1";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Listing3() {
  // ดึงข้อมูลจาก store
  const getPriceRange = priceStore((state) => state.priceRange);
  const getLocation = listingStore((state) => state.getLocation);
  const getCategory = listingStore((state) => state.getCategory);
  const getSearch = listingStore((state) => state.getSearch);
  const setCategory = listingStore((state) => state.setCategory);
  
  // สร้าง state สำหรับเก็บข้อมูลที่กรองแล้ว
  const [filteredProducts, setFilteredProducts] = useState(tutorProducts || []);
  // เก็บค่าที่ได้จาก URL โดยตรง
  const [directSubject, setDirectSubject] = useState(null);
  
  // ดึง URL parameters
  const searchParams = useSearchParams();
  const subjectParam = searchParams?.get("subject");
  
  // อ่านค่า subject จาก URL เมื่อโหลดหรือเมื่อ URL เปลี่ยน
  useEffect(() => {
    if (!searchParams) return;
    
    const subject = searchParams.get("subject");
    
    // อัปเดตค่า directSubject เมื่อมีการเปลี่ยนแปลงใน URL
    if (subject) {
      console.log("Listing3 - Subject จาก URL:", subject);
      setDirectSubject(subject);
      
      // อัปเดต store ถ้ายังไม่มีการตั้งค่า
      if (typeof setCategory === 'function' && 
          (!Array.isArray(getCategory) || getCategory.length === 0)) {
        console.log("Listing3 - อัปเดต store ด้วย subject จาก URL:", subject);
        setCategory(subject);
      }
    } else if (directSubject) {
      // ล้างค่า directSubject เมื่อไม่มี subject ใน URL แล้ว
      console.log("Listing3 - ล้างค่า directSubject เนื่องจากไม่มี subject ใน URL แล้ว");
      setDirectSubject(null);
    }
  }, [searchParams, setCategory, getCategory, directSubject]);
  
  // กรองข้อมูลเมื่อมีการเปลี่ยนแปลงใน store หรือ directSubject
  useEffect(() => {
    // ตรวจสอบว่ามีข้อมูลหรือไม่
    if (!tutorProducts || tutorProducts.length === 0) {
      console.log("Listing3 - ไม่มีข้อมูล tutorProducts");
      setFilteredProducts([]);
      return;
    }
    
    // กรองข้อมูลใหม่ทั้งหมดทุกครั้ง
    let result = [...tutorProducts];
    
    console.log("Listing3 - เริ่มกรองข้อมูล:", {
      getCategory: getCategory || [],
      directSubject,
      subjectParam,
      getCategoryLength: getCategory?.length || 0,
    });
    
    // 1. กรองตาม subject (จากหลายแหล่งข้อมูล)
    // ลำดับความสำคัญ: getCategory > directSubject > subjectParam
    if (Array.isArray(getCategory) && getCategory.length > 0) {
      // กรณีที่มีการเลือกตัวกรองในหน้าเว็บ (จาก store)
      const before = result.length;
      result = result.filter(item => 
        item.subject && getCategory.includes(item.subject)
      );
      console.log(`Listing3 - กรองตาม getCategory (${getCategory.join(", ")}): ${before} -> ${result.length}`);
    } else if (directSubject) {
      // กรณีที่มีการตั้งค่าจาก directSubject
      const before = result.length;
      result = result.filter(item => 
        item.subject && item.subject === directSubject
      );
      console.log(`Listing3 - กรองตาม directSubject (${directSubject}): ${before} -> ${result.length}`);
    } else if (subjectParam) {
      // กรณีที่มี parameter ใน URL แต่ยังไม่ได้ตั้งค่าใน directSubject
      const before = result.length;
      result = result.filter(item => 
        item.subject && item.subject === subjectParam
      );
      console.log(`Listing3 - กรองตาม subjectParam (${subjectParam}): ${before} -> ${result.length}`);
    }
    
    // 2. กรองตามราคา
    if (getPriceRange && typeof getPriceRange.min === 'number' && typeof getPriceRange.max === 'number') {
      const before = result.length;
      result = result.filter(item => 
        item.price >= getPriceRange.min && item.price <= getPriceRange.max
      );
      console.log(`Listing3 - กรองตามราคา (${getPriceRange.min}-${getPriceRange.max}): ${before} -> ${result.length}`);
    }
    
    // 3. กรองตามสถานที่
    if (Array.isArray(getLocation) && getLocation.length > 0) {
      const before = result.length;
      result = result.filter(item => 
        item.location && getLocation.includes(item.location)
      );
      console.log(`Listing3 - กรองตามสถานที่ (${getLocation.join(", ")}): ${before} -> ${result.length}`);
    }
    
    // 4. กรองตามคำค้นหา
    if (getSearch && typeof getSearch === 'string' && getSearch.trim() !== "") {
      const before = result.length;
      const searchLower = getSearch.toLowerCase().trim();
      result = result.filter(item => 
        (item.title && item.title.toLowerCase().includes(searchLower)) ||
        (item.category && item.category.toLowerCase().includes(searchLower)) ||
        (item.subject && item.subject.toLowerCase().includes(searchLower))
      );
      console.log(`Listing3 - กรองตามคำค้นหา (${searchLower}): ${before} -> ${result.length}`);
    }
    
    // อัปเดต state
    setFilteredProducts(result);
    console.log(`Listing3 - ผลลัพธ์การกรอง: ${result.length} รายการ`);
    
  }, [getCategory, getLocation, getSearch, getPriceRange, directSubject, subjectParam]);

  // สร้างข้อมูลสำหรับแสดงผล
  const content = filteredProducts.map((item, i) => (
    <div key={i} className="col-sm-6 col-xl-4">
      {item?.gallery ? (
        <PopularServiceSlideCard1 data={item} />
      ) : (
        <TrendingServiceCard1 data={item} />
      )}
    </div>
  ));

  // แสดงตัวกรองที่ใช้งานอยู่
  const activeFilterSubject = 
    (Array.isArray(getCategory) && getCategory.length > 0) ? getCategory.join(", ") : 
    directSubject ? directSubject :
    subjectParam ? subjectParam : null;

  return (
    <>
      <section className="pt30 pb90">
        <div className="container">
          {/* แสดงข้อมูลตัวกรองที่ใช้งาน */}
          {activeFilterSubject && (
            <div className="alert alert-info mb-4">
              กำลังกรองตามวิชา: {activeFilterSubject} (พบ {filteredProducts.length} รายการ)
            </div>
          )}
          
          <div className="row">
            <div className="col-lg-3">
              <ListingSidebar1 directSubject={directSubject || subjectParam} />
            </div>
            <div className="col-lg-9">
              <ListingOption2 itemLength={content?.length} />
              {content.length > 0 ? (
                <div className="row">{content}</div>
              ) : (
                <div className="alert alert-warning">
                  ไม่พบผลลัพธ์ที่ตรงกับเงื่อนไขที่ค้นหา กรุณาลองปรับการค้นหาใหม่
                </div>
              )}
              {content.length > 0 && <Pagination1 />}
            </div>
          </div>
        </div>
      </section>
      <ListingSidebarModal1 directSubject={directSubject || subjectParam} />
    </>
  );
}