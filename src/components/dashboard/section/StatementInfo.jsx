"use client";
import { useState, useEffect } from "react";
import { statementMockData, paymentStatus } from "@/data/statement";
import DashboardNavigation from "../header/DashboardNavigation";
import Pagination1 from "@/components/section/Pagination1";
import StatementCard1 from "../card/StatementCard1";
import PrintableStatement from "./PrintableStatement";
import PaymentMethod from "./PaymentMethod";
import './statement.css';

export default function StatementInfo() {
  const [statements, setStatements] = useState([]);
  const [selectedStatement, setSelectedStatement] = useState(null);
  const [printMode, setPrintMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // โหลดข้อมูลเมื่อคอมโพเนนต์ถูกเรียกใช้งาน
  useEffect(() => {
    setStatements(statementMockData);
  }, []);

  // ฟังก์ชันสำหรับการพิมพ์ใบสำคัญจ่าย
  const handlePrint = () => {
    if (!selectedStatement) return;
    
    const printContents = document.getElementById('printable-statement').innerHTML;
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    
    iframe.contentDocument.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>ใบสำคัญจ่าย - ${selectedStatement.reference}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
            @media print {
              @page { size: A4; margin: 0.5cm; }
              body { margin: 0; padding: 0.5cm; }
            }
          </style>
        </head>
        <body onload="window.focus(); window.print(); window.setTimeout(function() { window.close(); }, 200)">
          ${printContents}
        </body>
      </html>
    `);
    
    iframe.contentDocument.close();
    iframe.contentWindow.focus();
  };

  // ฟังก์ชันสำหรับการเลือกใบสำคัญจ่ายที่จะแสดง
  const handleViewStatement = (statement) => {
    setSelectedStatement(statement);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ฟังก์ชันสำหรับการค้นหา
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // ฟังก์ชันสำหรับกลับไปที่รายการใบสำคัญจ่าย
  const handleBackToList = () => {
    setSelectedStatement(null);
  };

  // กรองรายการตามคำค้นหา
  const filteredStatements = statements.filter(statement => 
    statement.detail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    statement.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
    statement.tutor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="dashboard__content hover-bgc-color non-printable">
        <div className="row pb10">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-12">
            <div className="dashboard_title_area">
              <h2>Statement & Payout</h2>
              <p className="text">ดูประวัติการชำระเงินทั้งหมดของคุณ</p>
            </div>
          </div>
        </div>
        
        {selectedStatement ? (
          /* แสดงรายละเอียดใบสำคัญจ่ายเมื่อเลือก */
          <div className="row">
            <div className="col-12 mb-4">
              <button 
                onClick={handleBackToList} 
                className="btn btn-outline-secondary"
              >
                <i className="fa fa-arrow-left me-2"></i> กลับไปยังรายการใบสำคัญจ่าย
              </button>
            </div>

            <div className="col-xl-12">
              <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
                <div className="d-flex justify-content-between mb-4">
                  <h3>ใบสำคัญจ่าย #{selectedStatement.reference}</h3>
                  <div>
                    <button
                      type="button"
                      className="btn btn-outline-secondary me-2"
                      onClick={handlePrint}
                    >
                      <i className="far fa-download me-2"></i> ดาวน์โหลด PDF
                    </button>
                    <button
                      type="button"
                      className="btn btn-thm"
                      onClick={handlePrint}
                    >
                      <i className="far fa-print me-2"></i> พิมพ์
                    </button>
                  </div>
                </div>

                {/* ฝังคอมโพเนนต์ PrintableStatement ที่นี่ */}
                <PrintableStatement statement={selectedStatement} />
              </div>
            </div>
          </div>
        ) : (
          /* แสดงรายการใบสำคัญจ่าย */
          <div className="row">
            <div className="col-xl-12">
              <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
                <div className="row mb-4">
                  <div className="col-xl-4">
                    <div className="dashboard_search_meta">
                      <div className="search_area">
                        <input
                          type="text"
                          className="form-control bdrs4"
                          placeholder="ค้นหารายการ"
                          value={searchTerm}
                          onChange={handleSearch}
                        />
                        <label>
                          <span className="far fa-magnifying-glass" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="packages_table table-responsive">
                  <table className="table-style3 table at-savesearch">
                    <thead className="t-head">
                      <tr>
                        <th scope="col">วันที่</th>
                        <th scope="col">วิธีการชำระเงิน</th>
                        <th scope="col">รายละเอียด</th>
                        <th scope="col">จำนวนชั่วโมง</th>
                        <th scope="col">จำนวนเงิน</th>
                        <th scope="col">การดำเนินการ</th>
                      </tr>
                    </thead>
                    <tbody className="t-body">
                      {filteredStatements.map((item, i) => (
                        <tr key={i}>
                          <th scope="row">{item.date}</th>
                          <td className="vam">
                            <span className={`pending-style ${paymentStatus[item.status]?.class || ""}`}>
                              {paymentStatus[item.status]?.label || "Unknown"}
                            </span>
                          </td>
                          <td className="vam">{item.detail}</td>
                          <td className="vam">{item.hours}</td>
                          <td className="vam">฿{item.amount.toFixed(2)}</td>
                          <td className="vam">
                            <a 
                              className="table-action fz15 fw500 text-thm2 cursor-pointer" 
                              onClick={() => handleViewStatement(item)}
                            >
                              <span className="flaticon-website me-2 vam" /> View
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="mt30">
                    <Pagination1 />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="ps-widget bgc-white bdrs4 p30 mb30 position-relative">
          <div className="row">
            <div className="col-lg-9">
              <PaymentMethod />
            </div>
          </div>
        </div>
      </div>
      
      {/* สไตล์สำหรับการพิมพ์ */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          body {
            margin: 0;
            padding: 0;
          }
          .printable-content,
          .printable-content * {
            visibility: visible;
          }
          .printable-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 20px;
          }
          .non-printable {
            display: none !important;
          }
        }
        .cursor-pointer {
          cursor: pointer;
        }
      `}</style>
    </>
  );
}