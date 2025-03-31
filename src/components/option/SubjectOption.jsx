"use client";
import { browserCategory } from "@/data/project";
import listingStore from "@/store/listingStore";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

export default function SubjectOption({ directSubject }) {
  // ดึงข้อมูลจาก store
  const getCategory = listingStore((state) => state.getCategory);
  const setCategory = listingStore((state) => state.setCategory);
  
  // เก็บสถานะการเลือกภายในคอมโพเนนต์
  const [selectedItems, setSelectedItems] = useState([]);
  
  // ดึง URL parameters
  const searchParams = useSearchParams();
  
  // อัปเดตสถานะการเลือกเมื่อ component mount
  useEffect(() => {
    // console.log("SubjectOption - โหลดครั้งแรก, ตรวจสอบ parameters");
    
    // อ่านค่า subject จาก URL
    const subjectParam = searchParams?.get("subject");
    
    // อัปเดตสถานะการเลือกจากหลายแหล่งข้อมูล
    if (Array.isArray(getCategory) && getCategory.length > 0) {
      // กรณีที่มีการเลือกจาก store แล้ว ใช้ค่าจาก store
      // console.log("SubjectOption - ใช้ค่าจาก store:", getCategory);
      setSelectedItems([...getCategory]);
    } else if (subjectParam) {
      // กรณีที่มีค่า subject ใน URL และยังไม่มีการเลือกใน store
      // console.log("SubjectOption - ใช้ค่าจาก URL:", subjectParam);
      setSelectedItems([subjectParam]);
      
      // อัปเดต store ด้วย
      if (typeof setCategory === 'function') {
        // console.log("SubjectOption - อัปเดต store ด้วยค่าจาก URL");
        setCategory(subjectParam);
      }
    } else if (directSubject) {
      // กรณีที่มีค่าจาก prop directSubject
      // console.log("SubjectOption - ใช้ค่าจาก directSubject:", directSubject);
      setSelectedItems([directSubject]);
    }
    
  }, [searchParams]); // dependency เป็น searchParams เพื่อให้ทำงานเมื่อ URL เปลี่ยน
  
  // ติดตามการเปลี่ยนแปลงของ getCategory เพื่ออัปเดต selectedItems
  useEffect(() => {
    if (Array.isArray(getCategory)) {
      // console.log("SubjectOption - getCategory เปลี่ยนเป็น:", getCategory);
      setSelectedItems(getCategory);
    }
  }, [getCategory]);
  
  // ติดตามการเปลี่ยนแปลงของ directSubject เพื่ออัปเดต selectedItems
  useEffect(() => {
    if (directSubject) {
      // console.log("SubjectOption - directSubject เปลี่ยนเป็น:", directSubject);
      setSelectedItems([directSubject]);
    }
  }, [directSubject]);
  
  // ฟังก์ชันจัดการการคลิก checkbox
  const handleToggle = useCallback((title) => {
    // console.log(`SubjectOption - คลิกที่ "${title}"`);
    
    // อัปเดต store
    if (typeof setCategory === 'function') {
      setCategory(title);
    }
  }, [setCategory]);

  return (
    <div className="card-body ps-0">
      <div className="checkbox-style1">
        {browserCategory.map((item, i) => (
          <label key={i} className="custom_checkbox">
            {item.title}
            <input
              type="checkbox"
              checked={selectedItems.includes(item.title)}
              onChange={() => handleToggle(item.title)}
            />
            <span className="checkmark" />
          </label>
        ))}
      </div>
    </div>
  );
}