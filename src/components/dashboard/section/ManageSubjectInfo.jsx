"use client";
import Link from "next/link";
import DashboardNavigation from "../header/DashboardNavigation";
import { useState, useEffect } from "react";
import Pagination1 from "@/components/section/Pagination1";
import ManageSubjectCard from "../card/ManageSubjectCard";
import ProposalModal1 from "../modal/ProposalModal1";
import DeleteModal from "../modal/DeleteModal";
import { subjectsMockData } from "@/data/subjects";

const tab = [
  "My Subjects",
];

export default function ManageSubjectInfo() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [subjects, setSubjects] = useState([]);
  const [editingSubject, setEditingSubject] = useState(null);

  // โหลดข้อมูลจำลองเมื่อคอมโพเนนต์ถูกโหลด
  useEffect(() => {
    setSubjects(subjectsMockData);
  }, []);

  // ฟังก์ชันจัดการการเพิ่มรายวิชาใหม่
  const handleAddSubject = (newSubject) => {
    // สร้าง ID ใหม่โดยใช้ ID ที่มีค่าสูงสุดบวก 1
    const newId = subjects.length > 0 
      ? Math.max(...subjects.map(subject => subject.id)) + 1 
      : 1;
    
    // เพิ่ม ID ให้กับรายวิชาใหม่
    const subjectWithId = {
      ...newSubject,
      id: newId
    };
    
    // เพิ่มรายวิชาใหม่เข้าไปในสถานะ
    setSubjects(prevSubjects => [...prevSubjects, subjectWithId]);
  };

  // ฟังก์ชันจัดการการแก้ไขรายวิชา
  const handleEditSubject = (updatedSubject) => {
    setSubjects(prevSubjects => 
      prevSubjects.map(subject => 
        subject.id === updatedSubject.id ? updatedSubject : subject
      )
    );
    setEditingSubject(null);
  };

  // ฟังก์ชันจัดการการลบรายวิชา
  const handleDeleteSubject = (id) => {
    setSubjects(prevSubjects => 
      prevSubjects.filter(subject => subject.id !== id)
    );
  };

  // ฟังก์ชันเปิดโมดัลสำหรับการเพิ่มรายวิชา
  const openAddModal = () => {
    setEditingSubject(null);
  };

  // ฟังก์ชันเปิดโมดัลสำหรับการแก้ไขรายวิชา
  const openEditModal = (subject) => {
    setEditingSubject(subject);
  };

  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb10">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-9">
            <div className="dashboard_title_area">
              <h2>Manage Subjects</h2>
              <p className="text">Manage subjects you teach here</p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="text-lg-end">
              <button
                className="ud-btn btn-dark default-box-shadow2"
                data-bs-toggle="modal"
                data-bs-target="#proposalModal"
                onClick={openAddModal}
              >
                Add subject
                <i className="fal fa-arrow-right-long" />
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="navtab-style1">
                <nav>
                  <div className="nav nav-tabs mb30">
                    {tab.map((item, i) => (
                      <button
                        key={i}
                        className={`nav-link fw500 ps-0 ${
                          selectedTab == i ? "active" : ""
                        }`}
                        onClick={() => setSelectedTab(i)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </nav>
                {selectedTab === 0 && (
                  <div className="packages_table table-responsive">
                    <table className="table-style3 table at-savesearch">
                      <thead className="t-head">
                        <tr>
                          <th scope="col">Subjects</th>
                          <th scope="col">Online/On-Site</th>
                          <th scope="col">Rate</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="t-body">
                        {subjects.map((subject, i) => (
                          <ManageSubjectCard 
                            key={i} 
                            subject={subject}
                            onEdit={openEditModal}
                          />
                        ))}
                      </tbody>
                    </table>
                    <div className="mt30">
                      <Pagination1 />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ส่งรายวิชาที่กำลังแก้ไขและฟังก์ชันการบันทึกไปยังโมดัล */}
      <ProposalModal1 
        subject={editingSubject}
        onSave={editingSubject ? handleEditSubject : handleAddSubject}
      />
      {/* ส่งฟังก์ชันการยืนยันการลบไปยังโมดัลลบ */}
      <DeleteModal onConfirm={handleDeleteSubject} />
    </>
  );
}