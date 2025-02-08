"use client";
import { useState } from "react";
import PayoutForm from "../element/PayoutForm";

const thaiBanks = [
  'ธนาคารกรุงเทพ (BBL)',
  'ธนาคารกสิกรไทย (KBANK)',
  'ธนาคารกรุงไทย (KTB)',
  'ธนาคารไทยพาณิชย์ (SCB)',
  'ธนาคารกรุงศรีอยุธยา (BAY)',
  'ธนาคารทหารไทยธนชาต (TTB)',
  'ธนาคารเกียรตินาคิน (KKP)',
  'ธนาคารซีไอเอ็มบีไทย (CIMB)',
  'ธนาคารทิสโก้ (TISCO)',
  'ธนาคารยูโอบี (UOB)',
  'ออมสิน (GSB)',
];

export default function PaymentMethod() {
  const [selectedBank, setSelectedBank] = useState(thaiBanks[0]);

  // handler
  const bankHandler = (bank) => {
    setSelectedBank(bank);
  };

  return (
    <>
      <div className="bdrb1 pb15">
        <h5 className="list-title">Payment Detail</h5>
      </div>
      <div className="widget-wrapper mt35">
        <h6 className="list-title mb10">Select Bank</h6>
        <div className="bootselect-multiselect">
          <div className="dropdown bootstrap-select">
            <button
              type="button"
              className="btn dropdown-toggle btn-light"
              data-bs-toggle="dropdown"
            >
              <div className="filter-option">
                <div className="filter-option-inner">
                  <div className="filter-option-inner-inner">
                    {selectedBank}
                  </div>
                </div>
              </div>
            </button>
            <div className="dropdown-menu">
              <div className="inner show">
                <ul className="dropdown-menu inner show">
                  {thaiBanks.map((bank, i) => (
                    <li key={i} className={selectedBank === bank ? "selected active" : ""}>
                      <a
                        className={`dropdown-item ${
                          selectedBank === bank ? "selected active" : ""
                        }`}
                        onClick={() => bankHandler(bank)}
                      >
                        <span className="text">{bank}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h5 className="mb15">Bank Detail</h5>
      <div className="navpill-style1 payout-style">
        <div className="bank-details">
          <PayoutForm selectedBank={selectedBank} />
        </div>
      </div>
    </>
  );
}