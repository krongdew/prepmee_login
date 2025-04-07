"use client";
import { useState, useEffect } from "react";
import { invoiceMockData, paymentStatus } from "@/data/invoice";
import DashboardNavigation from "../header/DashboardNavigation";
import Pagination1 from "@/components/section/Pagination1";
import PrintableInvoice from "./PrintableInvoice";
import './invoice.css'

export default function InvoiceInfo() {
  const [invoices, setInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [printMode, setPrintMode] = useState(false);

  // โหลดข้อมูลเมื่อคอมโพเนนต์ถูกเรียกใช้งาน
  useEffect(() => {
    setInvoices(invoiceMockData);
  }, []);

  // ฟังก์ชันสำหรับการพิมพ์ใบเสร็จ
// ฟังก์ชันสำหรับการพิมพ์ใบเสร็จแบบใหม่
const handlePrint = () => {
  const printContents = document.getElementById('printable-invoice').innerHTML;
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  document.body.appendChild(iframe);
  
  iframe.contentDocument.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>ใบเสร็จรับเงิน - ${selectedInvoice.invoiceId}</title>
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

  // ฟังก์ชันสำหรับการเลือกใบเสร็จที่จะแสดง
  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ฟังก์ชันสำหรับการค้นหาใบเสร็จ
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // ฟังก์ชันสำหรับกลับไปที่รายการใบเสร็จ
  const handleBackToList = () => {
    setSelectedInvoice(null);
  };

  // กรองใบเสร็จตามคำค้นหา
  const filteredInvoices = invoices.filter(invoice => 
    invoice.invoiceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.invoiceName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // สถานะการชำระเงิน
  const getStatusLabel = (statusCode) => {
    return paymentStatus[statusCode]?.label || "Unknown";
  };

  // ถ้าอยู่ในโหมดพิมพ์ แสดงเฉพาะใบเสร็จ
  if (printMode && selectedInvoice) {
    return <PrintableInvoice invoice={selectedInvoice} />;
  }

  return (
    <>
      <div className="dashboard__content hover-bgc-color non-printable">
        <div className="row pb10">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
        </div>

        {selectedInvoice ? (
          /* แสดงรายละเอียดใบเสร็จเมื่อเลือก */
          <div className="row">
            <div className="col-12 mb-4">
              <button 
                onClick={handleBackToList} 
                className="btn btn-outline-secondary"
              >
                <i className="fa fa-arrow-left me-2"></i> กลับไปยังรายการใบเสร็จ
              </button>
            </div>

            <div className="col-xl-12">
              <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
                <div className="d-flex justify-content-between mb-4">
                  <h3>ใบเสร็จรับเงิน #{selectedInvoice.invoiceId}</h3>
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

                {/* ฝังคอมโพเนนต์ PrintableInvoice ที่นี่ */}
                <PrintableInvoice invoice={selectedInvoice} />
              </div>
            </div>
          </div>
        ) : (
          /* แสดงรายการใบเสร็จ */
          <>
            <div className="row align-items-center justify-content-between pb10">
              <div className="col-xl-4">
                <div className="dashboard_title_area">
                  <h2>Receipt</h2>
                  <p className="text">ประวัติการซื้อทั้งหมดของคุณ</p>
                </div>
              </div>
              <div className="col-xl-4">
                <div className="dashboard_search_meta">
                  <div className="search_area">
                    <input
                      type="text"
                      className="form-control bdrs4"
                      placeholder="ค้นหาใบเสร็จ"
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
            <div className="row">
              <div className="col-xl-12">
                <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
                  <div className="packages_table table-responsive">
                    <table className="table-style3 table at-savesearch">
                      <thead className="t-head">
                        <tr>
                          <th scope="col">เลขที่ใบเสร็จ</th>
                          <th scope="col">วันที่ซื้อ</th>
                          <th scope="col">จำนวนเงิน</th>
                          <th scope="col">สถานะ</th>
                          <th scope="col">การดำเนินการ</th>
                        </tr>
                      </thead>
                      <tbody className="t-body">
                        {filteredInvoices.map((item, i) => (
                          <tr key={i}>
                            <th scope="row">
                              <div>
                                #{item.invoiceId} <span className="ms-3">{item.invoiceName}</span>
                              </div>
                            </th>
                            <td className="vam">{item.purchaseDate}</td>
                            <td className="vam">฿{item.amount.toFixed(3)}</td>
                            <td className="vam">
                              <span
                                className={`pending-style ${paymentStatus[item.status]?.class || ""}`}
                              >
                                {getStatusLabel(item.status)}
                              </span>
                            </td>
                            <td className="vam">
                              <a 
                                className="table-action fz15 fw500 text-thm2 cursor-pointer" 
                                onClick={() => handleViewInvoice(item)}
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
          </>
        )}
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