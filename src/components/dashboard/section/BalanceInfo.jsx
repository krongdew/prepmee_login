"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import DashboardNavigation from "../header/DashboardNavigation";
import Pagination1 from "@/components/section/Pagination1";
import BalanceCard from "@/components/dashboard/card/BalanceCard";
import TopUpModal from "../modal/TopupModal";
import { balanceMockData } from "@/data/balance";

export default function BalanceInfo() {
  const [transactions, setTransactions] = useState([]);
  const [currentBalance, setCurrentBalance] = useState(0);
  
  // โหลดข้อมูลเมื่อคอมโพเนนต์ถูกเรียกใช้งาน
  useEffect(() => {
    // โหลดข้อมูล transaction จาก mockup
    setTransactions(balanceMockData);
    
    // คำนวณยอดเงินปัจจุบันจากรายการที่สถานะเป็น Completed (status 1)
    const totalCompleted = balanceMockData
      .filter(item => item.status === 1)
      .reduce((sum, item) => sum + item.amount, 0);
    
    setCurrentBalance(totalCompleted);
  }, []);
  
  // ฟังก์ชันสำหรับการเติมเงิน
  const handleTopUp = (newTransaction) => {
    // เพิ่มรายการใหม่ไปที่รายการ transactions
    setTransactions(prevTransactions => [newTransaction, ...prevTransactions]);
    
    // ถ้าในโลกจริง ควรส่งคำขอไปยังเซิร์ฟเวอร์ที่นี่
    console.log("New top-up request:", newTransaction);
  };

  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb10">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
        </div>
        <div className="row align-items-center justify-content-between pb30">
          <div className="col-lg-6">
            <div className="dashboard_title_area">
              <h2>Balance</h2>
              <p className="text">ดูประวัติการเติมเงินและยอดเงินคงเหลือ</p>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="text-lg-end d-flex flex-wrap align-items-center justify-content-md-end">
              <div className="mb-3 mb-lg-0 me-lg-4">
                <h3 className="mb-0">฿{currentBalance.toFixed(3)}</h3>
                <p className="text-muted mb-0">ยอดเงินปัจจุบัน</p>
              </div>
              <button
                className="ud-btn btn-thm default-box-shadow2"
                data-bs-toggle="modal"
                data-bs-target="#topUpModal"
              >
                เติมเงิน
                <i className="fal fa-arrow-right-long" />
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb60 overflow-hidden position-relative">
              <div className="packages_table table-responsive">
                <table className="table-style3 table at-savesearch">
                  <thead className="t-head">
                    <tr>
                      <th scope="col">จำนวนเงิน</th>
                      <th scope="col">วันที่</th>
                      <th scope="col">วิธีการชำระเงิน</th>
                      <th scope="col">สถานะ</th>
                      <th scope="col">เลขอ้างอิง</th>
                    </tr>
                  </thead>
                  <tbody className="t-body">
                    {transactions.map((item, i) => (
                      <BalanceCard key={i} data={item} />
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
      </div>
      
      {/* TopUp Modal */}
      <TopUpModal onTopUp={handleTopUp} />
    </>
  );
}