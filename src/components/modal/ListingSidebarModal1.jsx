"use client";
import toggleStore from "@/store/toggleStore";
import LocationOption1 from "../option/LocationOption1";
import BudgetOption2 from "../option/BudgetOption2";
import ClearButton from "../button/ClearButton";
import SubjectOption from "../option/SubjectOption";
import { useEffect, useRef } from "react";

export default function ListingSidebarModal1({ directSubject }) {
  const listingToggle = toggleStore((state) => state.listingToggleHandler);
  const isActive = toggleStore((state) => state.isListingActive);
  
  // Use a ref to track if the effect has run
  const hasEffectRun = useRef(false);
  
  // ป้องกันการเลื่อนหน้าเมื่อ modal เปิด และป้องกัน infinite loop
  useEffect(() => {
    // Skip effect if it has already run for this render cycle
    if (hasEffectRun.current) return;
    
    if (typeof document !== 'undefined') {
      if (isActive) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
    
    console.log("Modal ควรจะ", isActive ? "เปิด" : "ปิด");
    
    // Mark effect as having run
    hasEffectRun.current = true;
    
    // Clean up function
    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
      }
      // Reset the ref for next render
      hasEffectRun.current = false;
    };
  }, [isActive]);

  if (!isActive) {
    return null; // ถ้าไม่ active ไม่ต้องแสดง modal
  }

  return (
    <>
      {/* พื้นหลังทึบเมื่อ modal เปิด */}
      <div 
        onClick={listingToggle}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9998,
        }}
      />
      
      {/* Modal ตัวกรอง */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '280px',
          height: '100%',
          backgroundColor: '#fff',
          zIndex: 9999,
          overflowY: 'auto',
          boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)',
        }}
      >
        <div style={{ padding: '15px', borderBottom: '1px solid #e5e5e5', display: 'flex', justifyContent: 'space-between' }}>
          <h4 style={{ margin: 0 }}>ตัวกรองทั้งหมด</h4>
          <div 
            onClick={listingToggle} 
            style={{ cursor: 'pointer' }}
          >
            <span className="far fa-times" />
          </div>
        </div>
        
        <div style={{ padding: '15px' }}>
          <div className="widget-wrapper">
            <div className="sidebar-accordion">
              <div className="accordion" id="accordionExample2">
                <div className="card mb20 pb10 rounded-0">
                  <div className="card-header" id="headingSubject">
                    <h4>
                      <button
                        className="btn btn-link ps-0"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseSubject"
                        aria-expanded="true"
                        aria-controls="collapseSubject"
                      >
                        วิชา (Subject)
                      </button>
                    </h4>
                  </div>
                  <div
                    id="collapseSubject"
                    className="collapse show"
                    aria-labelledby="headingSubject"
                    data-parent="#accordionExample2"
                  >
                    <SubjectOption directSubject={directSubject} />
                  </div>
                </div>
                
                <div className="card mb20 pb0 rounded-0">
                  <div className="card-header" id="headingOnes">
                    <h4>
                      <button
                        className="btn btn-link ps-0"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOnes"
                        aria-expanded="false"
                        aria-controls="collapseOnes"
                      >
                        งบประมาณ (Budget)
                      </button>
                    </h4>
                  </div>
                  <div
                    id="collapseOnes"
                    className="collapse"
                    aria-labelledby="headingOnes"
                    data-parent="#accordionExample2"
                  >
                    <BudgetOption2 />
                  </div>
                </div>
                
                <div className="card mb20 pb5 rounded-0">
                  <div className="card-header" id="headingThrees">
                    <h4>
                      <button
                        className="btn btn-link ps-0"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThrees"
                        aria-expanded="false"
                        aria-controls="collapseThrees"
                      >
                        สถานที่ (Location)
                      </button>
                    </h4>
                  </div>
                  <div
                    id="collapseThrees"
                    className="collapse"
                    aria-labelledby="headingThrees"
                    data-parent="#accordionExample2"
                  >
                    <LocationOption1 />
                  </div>
                </div>
              </div>
              <ClearButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}