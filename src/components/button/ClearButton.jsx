"use client";
import listingStore from "@/store/listingStore";
import priceStore from "@/store/priceStore";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ClearButton() {
  // Set handlers
  const setDeliveryTime = listingStore((state) => state.setDeliveryTime);
  const setLevel = listingStore((state) => state.setLevel);
  const setLocation = listingStore((state) => state.setLocation);
  const setBestSeller = listingStore((state) => state.setBestSeller);
  const setDesginTool = listingStore((state) => state.setDesginTool);
  const setSpeak = listingStore((state) => state.setSpeak);
  const setPriceRange = priceStore((state) => state.priceRangeHandler);
  const setSearch = listingStore((state) => state.setSearch);
  const setCategory = listingStore((state) => state.setCategory);
  const setProjectType = listingStore((state) => state.setProjectType);
  const setEnglishLevel = listingStore((state) => state.setEnglishLevel);
  const setJobType = listingStore((state) => state.setJobType);
  const setNoOfEmployee = listingStore((state) => state.setNoOfEmployee);

  // Get state
  const getDeliveryTime = listingStore((state) => state.getDeliveryTime);
  const getLevel = listingStore((state) => state.getLevel);
  const getLocation = listingStore((state) => state.getLocation);
  const getBestSeller = listingStore((state) => state.getBestSeller);
  const getDesginTool = listingStore((state) => state.getDesginTool);
  const getSpeak = listingStore((state) => state.getSpeak);
  const getPriceRange = priceStore((state) => state.priceRange);
  const getSearch = listingStore((state) => state.getSearch);
  const getCategory = listingStore((state) => state.getCategory);
  const getProjectType = listingStore((state) => state.getProjectType);
  const getEnglishLevel = listingStore((state) => state.getEnglishLevel);
  const getJobType = listingStore((state) => state.getJobType);
  const getNoOfEmployee = listingStore((state) => state.getNoOfEmployee);

  // Router และ URL parameters
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const subjectParam = searchParams?.get("subject");
  const locale = params?.locale || "en";

  // ตรวจสอบว่ามีตัวกรองใดทำงานอยู่บ้าง
  const [isAnyFilterActive, setIsAnyFilterActive] = useState(false);

  // ตรวจสอบสถานะตัวกรองและอัปเดต state
  useEffect(() => {
    const hasActiveFilter = 
      getDeliveryTime !== "" ||
      (Array.isArray(getLevel) && getLevel.length !== 0) ||
      (Array.isArray(getLocation) && getLocation.length !== 0) ||
      getSearch !== "" ||
      getBestSeller !== "best-seller" ||
      (Array.isArray(getDesginTool) && getDesginTool.length !== 0) ||
      (Array.isArray(getSpeak) && getSpeak.length !== 0) ||
      (getPriceRange && (getPriceRange.min !== 0 || getPriceRange.max !== 100000)) ||
      (Array.isArray(getCategory) && getCategory.length !== 0) ||
      (Array.isArray(getProjectType) && getProjectType.length !== 0) ||
      (Array.isArray(getEnglishLevel) && getEnglishLevel.length !== 0) ||
      (Array.isArray(getJobType) && getJobType.length !== 0) ||
      (Array.isArray(getNoOfEmployee) && getNoOfEmployee.length !== 0) ||
      !!subjectParam; // ตรวจสอบว่ามี URL parameter ด้วย
    
    setIsAnyFilterActive(hasActiveFilter);
  }, [
    getDeliveryTime, getLevel, getLocation, getSearch, getBestSeller,
    getDesginTool, getSpeak, getPriceRange, getCategory, getProjectType,
    getEnglishLevel, getJobType, getNoOfEmployee, subjectParam
  ]);

  // Clear handler - ล้างตัวกรองทั้งหมด
  const clearHandler = () => {
    console.log("ClearButton - กำลังล้างตัวกรองทั้งหมด");

    // ล้างตัวกรอง category (subject) ก่อน
    if (Array.isArray(getCategory) && getCategory.length > 0) {
      console.log("ClearButton - ล้าง categories:", getCategory);
      
      // ล้างทีละตัว - deep copy เพื่อป้องกันการเปลี่ยนแปลงขณะวนลูป
      [...getCategory].forEach(category => {
        if (typeof setCategory === 'function') {
          console.log(`ClearButton - ล้าง category: ${category}`);
          setCategory(category);
        }
      });
    }
    
    // ล้างตัวกรองอื่นๆ
    setDeliveryTime("");
    setLevel([]);
    setLocation([]);
    setBestSeller("best-seller");
    setDesginTool([]);
    setSpeak([]);
    if (typeof setPriceRange === 'function') {
      setPriceRange(0, 100000);
    }
    setSearch("");
    setProjectType([]);
    setEnglishLevel([]);
    setJobType([]);
    setNoOfEmployee([]);

    // นำทางกลับไปหน้าไม่มีพารามิเตอร์ subject
    if (subjectParam) {
      console.log(`ClearButton - นำทางกลับไปที่: /${locale}/find_result`);
      router.push(`/${locale}/find_result`);
    }
  };

  return (
    <>
      {isAnyFilterActive && (
        <button
          onClick={clearHandler}
          className="ud-btn btn-thm ui-clear-btn w-100"
        >
          Clear
          <i className="fal fa-arrow-right-long"></i>
        </button>
      )}
    </>
  );
}