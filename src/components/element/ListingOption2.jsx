"use client";
import toggleStore from "@/store/toggleStore";
import SortOption1 from "../option/SortOption1";

export default function ListingOption2({ itemLength }) {
  const listingToggle = toggleStore((state) => state.listingToggleHandler);
  
  const handleClick = () => {
    console.log("คลิกที่ปุ่มตัวกรอง");
    listingToggle();
  };

  return (
    <>
      <div className="row align-items-center mb20">
        <div className="col-md-6">
          <div className="text-center text-md-start">
            <p className="text mb-0 mb10-sm">
              <span className="fw500">{itemLength}</span> รายการที่พบ
            </p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="page_control_shorting d-md-flex align-items-center justify-content-center justify-content-md-end">
            <div className="dropdown-lists d-block d-lg-none me-2 mb10-sm">
              <ul className="p-0 mb-0 text-center text-md-start">
                <li>
                  <button
                    onClick={handleClick}
                    type="button"
                    className="open-btn filter-btn-left"
                  >
                    <img
                      className="me-2"
                      src="/images/icon/all-filter-icon.svg"
                      alt="filter icon"
                      width={18}
                      height={18}
                    />
                    ตัวกรองทั้งหมด
                  </button>
                </li>
              </ul>
            </div>
            <SortOption1 />
          </div>
        </div>
      </div>
    </>
  );
}