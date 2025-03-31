import ClearButton from "../button/ClearButton";
import BudgetOption2 from "../option/BudgetOption2";
import LocationOption1 from "../option/LocationOption1";
import SubjectOption from "../option/SubjectOption";
import { useSearchParams } from "next/navigation";

export default function ListingSidebar1({ directSubject }) {
  // ดึง URL parameters เพื่อใช้ตรวจสอบตอน render
  const searchParams = useSearchParams();
  const subjectParam = searchParams?.get("subject");

  return (
    <>
      <div className="list-sidebar-style1 d-none d-lg-block">
        <div className="accordion" id="accordionExample">
          {/* ตัวกรองตามวิชา */}
          <div className="card mb20 pb10 mt-0">
            <div className="card-header" id="heading0">
              <h4>
                <button
                  className="btn btn-link ps-0 pt-0 collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse0"
                  aria-expanded="true"
                  aria-controls="collapse0"
                >
                  วิชา (Subject)
                </button>
              </h4>
            </div>
            <div
              id="collapse0"
              className="collapse show"
              aria-labelledby="heading0"
              data-parent="#accordionExample"
            >
              {/* ส่ง subjectParam ไปให้ SubjectOption ด้วย เผื่อกรณีที่ directSubject ไม่มีค่า */}
              <SubjectOption directSubject={directSubject || subjectParam} />
            </div>
          </div>
          
          {/* ตัวกรองตามงบประมาณ */}
          <div className="card mb20 pb0">
            <div className="card-header" id="heading1">
              <h4>
                <button
                  className="btn btn-link ps-0 collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse1"
                  aria-expanded="false"
                  aria-controls="collapse1"
                >
                  งบประมาณ (Budget)
                </button>
              </h4>
            </div>
            <div
              id="collapse1"
              className="collapse"
              aria-labelledby="heading1"
              data-parent="#accordionExample"
            >
              <BudgetOption2 />
            </div>
          </div>
          
          {/* ตัวกรองตามสถานที่ */}
          <div className="card mb20 pb5">
            <div className="card-header" id="heading3">
              <h4>
                <button
                  className="btn btn-link ps-0 collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse3"
                  aria-expanded="false"
                  aria-controls="collapse3"
                >
                  สถานที่ (Location)
                </button>
              </h4>
            </div>
            <div
              id="collapse3"
              className="collapse"
              aria-labelledby="heading3"
              data-parent="#accordionExample"
            >
              <LocationOption1 />
            </div>
          </div>
        </div>
        
        {/* ปุ่มล้างตัวกรอง */}
        <ClearButton />
      </div>
    </>
  );
}