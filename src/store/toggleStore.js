import { create } from "zustand";

const toggleStore = create((set) => ({
  isListingActive: false,
  isDasboardSidebarActive: false,
  
  // ปรับปรุงฟังก์ชันให้แสดงข้อมูลดีบัก
  listingToggleHandler: () => {
    console.log("listingToggleHandler ถูกเรียก");
    set((state) => {
      console.log("กำลังเปลี่ยนค่า isListingActive จาก", state.isListingActive, "เป็น", !state.isListingActive);
      return { isListingActive: !state.isListingActive };
    });
  },
  
  dashboardSlidebarToggleHandler: () =>
    set((state) => ({
      isDasboardSidebarActive: !state.isDasboardSidebarActive,
    })),
}));

export default toggleStore;