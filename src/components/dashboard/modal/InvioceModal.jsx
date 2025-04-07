"use client";
import { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { paymentStatus } from "@/data/invoice";

export default function InvoiceModal() {
  const [invoice, setInvoice] = useState(null);
  const invoiceRef = useRef(null);
  const modalRef = useRef(null);

  // ฟังก์ชันสำหรับการพิมพ์ใบเสร็จ
  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
    documentTitle: invoice ? `Invoice-${invoice.invoiceId}` : "Invoice",
  });

  // สร้างฟังก์ชัน handleExportPDF สำหรับส่งออกเป็น PDF
  const handleExportPDF = () => {
    handlePrint();
  };

  // ฟังก์ชันสำหรับปิด modal ด้วย JavaScript
  const closeModal = () => {
    if (modalRef.current) {
      // ตรวจสอบว่า bootstrap มีอยู่หรือไม่
      if (typeof bootstrap !== 'undefined') {
        const modalInstance = bootstrap.Modal.getInstance(modalRef.current);
        if (modalInstance) {
          modalInstance.hide();
        }
      } else {
        // ถ้าไม่มี bootstrap ให้ลบ class และ style โดยตรง
        modalRef.current.classList.remove('show');
        modalRef.current.style.display = 'none';
        modalRef.current.removeAttribute('aria-modal');
        modalRef.current.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        
        // ลบ backdrop
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) {
          document.body.removeChild(backdrop);
        }
      }
    }
  };

  // เพิ่ม event listener สำหรับรับข้อมูลใบเสร็จ
  useEffect(() => {
    const handleShowInvoiceEvent = (event) => {
      if (event.detail && event.detail.invoice) {
        setInvoice(event.detail.invoice);
        
        // พยายามเปิด modal ด้วย bootstrap หรือ JavaScript ธรรมดา
        if (modalRef.current) {
          if (typeof bootstrap !== 'undefined') {
            const modal = new bootstrap.Modal(modalRef.current);
            modal.show();
          } else {
            modalRef.current.classList.add('show');
            modalRef.current.style.display = 'block';
            modalRef.current.setAttribute('aria-modal', 'true');
            modalRef.current.removeAttribute('aria-hidden');
            document.body.classList.add('modal-open');
            
            // เพิ่ม backdrop
            if (!document.querySelector('.modal-backdrop')) {
              const backdrop = document.createElement('div');
              backdrop.className = 'modal-backdrop fade show';
              document.body.appendChild(backdrop);
            }
          }
        }
      }
    };

    // เพิ่ม event listener
    document.addEventListener('show-invoice', handleShowInvoiceEvent);

    // ทำความสะอาด event listener เมื่อ component ถูก unmount
    return () => {
      document.removeEventListener('show-invoice', handleShowInvoiceEvent);
    };
  }, []);

  // จัดรูปแบบวันที่
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // สถานะการชำระเงิน
  const getStatusLabel = (statusCode) => {
    return paymentStatus[statusCode]?.label || "Unknown";
  };

  return (
    <>
      <div
        className="modal fade"
        id="invoiceModal"
        ref={modalRef}
        tabIndex={-1}
        aria-labelledby="invoiceModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content position-relative">
            <div className="modal-header">
              <h5 className="modal-title" id="invoiceModalLabel">
                ใบเสร็จรับเงิน
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={closeModal}
                aria-label="Close"
              />
            </div>
            <div className="modal-body p-4">
              {invoice && (
                <div className="invoice-container">
                  {/* ส่วนของใบเสร็จที่จะพิมพ์ */}
                  <div ref={invoiceRef} className="invoice-print-area">
                    <div className="p-4" style={{ maxWidth: "800px", margin: "0 auto" }}>
                      {/* ส่วนหัวของใบเสร็จ */}
                      <div className="row mb-4">
                        <div className="col-6">
                          <img 
                            src="/images/about/prepmeelogo.svg" 
                            alt="Company Logo" 
                            height="60" 
                            className="mb-3"
                          />
                          <h4 className="mb-1">{invoice.companyInfo.name}</h4>
                          <p className="mb-1">เลขประจำตัวผู้เสียภาษี: {invoice.companyInfo.taxId}</p>
                          <p className="mb-1">{invoice.companyInfo.address}</p>
                          <p className="mb-1">โทร: {invoice.companyInfo.phone}</p>
                          <p className="mb-1">อีเมล: {invoice.companyInfo.email}</p>
                        </div>
                        <div className="col-6 text-end">
                          <h2 className="mb-4">ใบเสร็จรับเงิน</h2>
                          <p className="mb-1"><strong>เลขที่:</strong> {invoice.invoiceId}</p>
                          <p className="mb-1"><strong>วันที่:</strong> {invoice.purchaseDate}</p>
                          <p className="mb-1">
                            <strong>สถานะ:</strong> 
                            <span className={`ms-2 badge ${invoice.status === 1 ? 'bg-success' : invoice.status === 2 ? 'bg-warning' : 'bg-danger'}`}>
                              {getStatusLabel(invoice.status)}
                            </span>
                          </p>
                        </div>
                      </div>

                      {/* ข้อมูลลูกค้า */}
                      <div className="row mb-4">
                        <div className="col-12">
                          <div className="card">
                            <div className="card-body">
                              <h5 className="card-title">ข้อมูลลูกค้า</h5>
                              <p className="mb-1"><strong>ชื่อ:</strong> {invoice.customerInfo.name}</p>
                              <p className="mb-1"><strong>อีเมล:</strong> {invoice.customerInfo.email}</p>
                              <p className="mb-1"><strong>ที่อยู่:</strong> {invoice.customerInfo.address}</p>
                              <p className="mb-1"><strong>โทรศัพท์:</strong> {invoice.customerInfo.phone}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* รายการสินค้า */}
                      <div className="row mb-4">
                        <div className="col-12">
                          <table className="table">
                            <thead>
                              <tr>
                                <th>รายการ</th>
                                <th className="text-center">จำนวน</th>
                                <th className="text-end">ราคาต่อหน่วย</th>
                                <th className="text-end">รวม</th>
                              </tr>
                            </thead>
                            <tbody>
                              {invoice.items.map((item, index) => (
                                <tr key={index}>
                                  <td>{item.description}</td>
                                  <td className="text-center">{item.quantity}</td>
                                  <td className="text-end">฿{item.price.toFixed(3)}</td>
                                  <td className="text-end">฿{item.total.toFixed(3)}</td>
                                </tr>
                              ))}
                            </tbody>
                            <tfoot>
                              <tr>
                                <th colSpan="3" className="text-end">ยอดรวมทั้งสิ้น:</th>
                                <th className="text-end">฿{invoice.amount.toFixed(3)}</th>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      </div>

                      {/* ข้อมูลการชำระเงิน */}
                      <div className="row mb-4">
                        <div className="col-6">
                          <h5>ข้อมูลการชำระเงิน</h5>
                          <p className="mb-1"><strong>วิธีชำระเงิน:</strong> {invoice.paymentMethod}</p>
                          <p className="mb-1"><strong>เลขอ้างอิง:</strong> {invoice.transactionId}</p>
                          <p className="mb-1"><strong>วันที่ชำระเงิน:</strong> {invoice.purchaseDate}</p>
                        </div>
                      </div>

                      {/* หมายเหตุและลายเซ็น */}
                      <div className="row">
                        <div className="col-8">
                          <p className="mt-4 text-muted">
                            <small>ขอบคุณที่ใช้บริการ Prepmee</small>
                          </p>
                        </div>
                        <div className="col-4 text-end">
                          <div className="mb-3 mt-5 pt-5">
                            <hr className="mb-1" />
                            <p className="mb-0">ผู้รับเงิน</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer justify-content-between">
              <p className="text-muted"><small>*ใบเสร็จรับเงินนี้ออกเป็นอิเล็กทรอนิกส์</small></p>
              <div>
                <button
                  type="button"
                  className="btn btn-outline-secondary me-2"
                  onClick={handleExportPDF}
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
          </div>
        </div>
      </div>

      {/* สไตล์สำหรับการพิมพ์ */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .invoice-print-area,
          .invoice-print-area * {
            visibility: visible;
          }
          .invoice-print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .modal-footer,
          .modal-header {
            display: none;
          }
        }
      `}</style>
    </>
  );
}