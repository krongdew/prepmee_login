"use client";
import { useState } from "react";
import Image from "next/image";

export default function TopUpModal({ onTopUp }) {
  const [amount, setAmount] = useState("");
  
  // แพ็คเกจเติมเงินสำเร็จรูป
  const predefinedAmounts = [
    { value: 100, label: "฿100" },
    { value: 200, label: "฿200" },
    { value: 500, label: "฿500" },
    { value: 1000, label: "฿1,000" }
  ];

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const selectPredefinedAmount = (value) => {
    setAmount(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("กรุณาระบุจำนวนเงินให้ถูกต้อง");
      return;
    }
    
    // สร้างรายการเติมเงินใหม่
    const newPayment = {
      id: Date.now(), // ใช้ timestamp เป็น id ชั่วคราว
      amount: parseFloat(amount),
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      method: "QR-Code",
      status: 2, // เริ่มต้นเป็นสถานะ Pending
      reference: `TRX-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`
    };
    
    // เรียกใช้ callback เพื่อเพิ่มรายการเติมเงิน
    if (onTopUp) {
      onTopUp(newPayment);
    }
    
    // รีเซ็ตฟอร์ม
    setAmount("");
  };

  // สร้าง QR Code จำลอง (ในโปรดักชันควรใช้ API จริงเพื่อสร้าง QR Code)
  const qrCodeUrl = "/images/qr-code-placeholder.png";

  return (
    <>
      <div
        className="modal fade"
        id="topUpModal"
        tabIndex={-1}
        aria-labelledby="topUpModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content position-relative">
            <button
              type="button"
              className="btn-close position-absolute"
              data-bs-dismiss="modal"
              aria-label="Close"
              style={{ top: "10px", right: "10px", zIndex: "9" }}
            />
            <div className="modal-body p-4">
              <h4 className="mb-4 text-center">เติมเงิน</h4>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="form-label fw-bold">เลือกจำนวนเงิน</label>
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    {predefinedAmounts.map((item, index) => (
                      <button
                        key={index}
                        type="button"
                        className={`btn ${amount === item.value ? 'btn-thm' : 'btn-outline-secondary'}`}
                        onClick={() => selectPredefinedAmount(item.value)}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                  
                  <label className="form-label fw-bold">หรือระบุจำนวนเงิน (บาท)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={amount}
                    onChange={handleAmountChange}
                    min="1"
                    placeholder="ระบุจำนวนเงิน"
                    required
                  />
                </div>
                
                {amount && parseFloat(amount) > 0 && (
                  <div className="text-center mb-4">
                    <div className="mb-3">
                      <h5 className="mb-3">สแกน QR Code เพื่อชำระเงิน</h5>
                      <div className="d-flex justify-content-center">
                        <div className="p-3 border rounded" style={{ background: "#f8f9fa" }}>
                          {/* ตรงนี้ควรใช้รูปจริงๆ จาก payment gateway */}
                          <img
                            src="/images/about/prepmeelogo.svg"
                            alt="QR Code for payment"
                            width={200}
                            height={200}
                            className="img-fluid"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="alert alert-info text-start" role="alert">
                      <p className="mb-1"><strong>จำนวนเงิน:</strong> ฿{parseFloat(amount).toFixed(2)}</p>
                      <p className="mb-1"><strong>วิธีการชำระเงิน:</strong> QR Code</p>
                      <p className="mb-0"><small>กรุณาสแกน QR Code และชำระเงินผ่านแอปพลิเคชันธนาคารของท่าน เงินจะเข้าสู่ระบบภายใน 5-10 นาที</small></p>
                    </div>
                  </div>
                )}
                
                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="ud-btn btn-thm"
                    data-bs-dismiss="modal"
                  >
                    ยืนยันการชำระเงิน
                    <i className="fal fa-arrow-right-long" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}