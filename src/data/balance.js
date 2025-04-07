// /src/data/balance.js
export const balanceMockData = [
    {
      id: 1,
      amount: 100.000,
      date: "Mar 13, 2023",
      method: "QR-Code",
      status: 1,  // 1 = Completed
      reference: "TRX-123456"
    },
    {
      id: 2,
      amount: 200.000,
      date: "Apr 21, 2023",
      method: "QR-Code",
      status: 1,  // 1 = Completed
      reference: "TRX-789012"
    },
    {
      id: 3,
      amount: 50.000,
      date: "Jun 05, 2023",
      method: "QR-Code",
      status: 2,  // 2 = Pending
      reference: "TRX-345678"
    },
    {
      id: 4,
      amount: 150.000,
      date: "Aug 17, 2023",
      method: "QR-Code",
      status: 1,  // 1 = Completed
      reference: "TRX-901234"
    },
    {
      id: 5,
      amount: 75.000,
      date: "Oct 30, 2023",
      method: "QR-Code",
      status: 3,  // 3 = Failed
      reference: "TRX-567890"
    },
    {
      id: 6,
      amount: 300.000,
      date: "Dec 12, 2023",
      method: "QR-Code",
      status: 1,  // 1 = Completed
      reference: "TRX-135792"
    },
    {
      id: 7,
      amount: 250.000,
      date: "Jan 25, 2024",
      method: "QR-Code",
      status: 2,  // 2 = Pending
      reference: "TRX-246813"
    }
  ];
  
  // สถานะการชำระเงิน
  export const paymentStatus = {
    1: {
      label: "Completed",
      class: "style1"  // สีเขียว
    },
    2: {
      label: "Pending",
      class: "style2"  // สีเหลือง
    },
    3: {
      label: "Failed",
      class: "style3"  // สีแดง
    }
  };