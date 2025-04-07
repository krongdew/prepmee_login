// /src/data/invoice.js
import { payout } from "@/data/dashboard";

export const invoiceMockData = [
  {
    invoiceId: "INV-001",
    invoiceName: "Credit Purchase",
    purchaseDate: "Mar 16, 2023",
    amount: 50.000,
    status: 1, // 1 = Completed
    items: [
      {
        description: "Credit Package Standard",
        quantity: 1,
        price: 50.000,
        total: 50.000
      }
    ],
    paymentMethod: "QR-Code",
    transactionId: "TRX-123456",
    customerInfo: {
      name: "John Doe",
      email: "johndoe@example.com",
      address: "123 Main St, Bangkok, Thailand",
      phone: "+66 123 456 789"
    },
    companyInfo: {
      name: "Prepmee Co., Ltd.",
      taxId: "0123456789012",
      address: "456 Business Park, Bangkok, Thailand",
      phone: "+66 2 123 4567",
      email: "contact@prepmee.com",
      website: "www.prepmee.com"
    }
  },
  {
    invoiceId: "INV-002",
    invoiceName: "Premium Credit Package",
    purchaseDate: "Apr 21, 2023",
    amount: 100.000,
    status: 1, // 1 = Completed
    items: [
      {
        description: "Credit Package Premium",
        quantity: 1,
        price: 100.000,
        total: 100.000
      }
    ],
    paymentMethod: "QR-Code",
    transactionId: "TRX-789012",
    customerInfo: {
      name: "Jane Smith",
      email: "janesmith@example.com",
      address: "456 Center St, Bangkok, Thailand",
      phone: "+66 234 567 890"
    },
    companyInfo: {
      name: "Prepmee Co., Ltd.",
      taxId: "0123456789012",
      address: "456 Business Park, Bangkok, Thailand",
      phone: "+66 2 123 4567",
      email: "contact@prepmee.com",
      website: "www.prepmee.com"
    }
  },
  {
    invoiceId: "INV-003",
    invoiceName: "Credit Subscription",
    purchaseDate: "May 10, 2023",
    amount: 30.000,
    status: 1, // 1 = Completed
    items: [
      {
        description: "Credit Monthly Subscription",
        quantity: 1,
        price: 30.000,
        total: 30.000
      }
    ],
    paymentMethod: "QR-Code",
    transactionId: "TRX-345678",
    customerInfo: {
      name: "Michael Johnson",
      email: "michael@example.com",
      address: "789 Park Ave, Bangkok, Thailand",
      phone: "+66 345 678 901"
    },
    companyInfo: {
      name: "Prepmee Co., Ltd.",
      taxId: "0123456789012",
      address: "456 Business Park, Bangkok, Thailand",
      phone: "+66 2 123 4567",
      email: "contact@prepmee.com",
      website: "www.prepmee.com"
    }
  },
  {
    invoiceId: "INV-004",
    invoiceName: "Special Promotion Credits",
    purchaseDate: "Jun 15, 2023",
    amount: 75.000,
    status: 2, // 2 = Pending
    items: [
      {
        description: "Special Summer Promotion",
        quantity: 1,
        price: 75.000,
        total: 75.000
      }
    ],
    paymentMethod: "QR-Code",
    transactionId: "TRX-567890",
    customerInfo: {
      name: "Sarah Williams",
      email: "sarah@example.com",
      address: "321 Garden Road, Bangkok, Thailand",
      phone: "+66 456 789 012"
    },
    companyInfo: {
      name: "Prepmee Co., Ltd.",
      taxId: "0123456789012",
      address: "456 Business Park, Bangkok, Thailand",
      phone: "+66 2 123 4567",
      email: "contact@prepmee.com",
      website: "www.prepmee.com"
    }
  },
  {
    invoiceId: "INV-005",
    invoiceName: "Bulk Credit Purchase",
    purchaseDate: "Jul 02, 2023",
    amount: 200.000,
    status: 1, // 1 = Completed
    items: [
      {
        description: "Bulk Credits Package",
        quantity: 1,
        price: 200.000,
        total: 200.000
      }
    ],
    paymentMethod: "QR-Code",
    transactionId: "TRX-901234",
    customerInfo: {
      name: "David Brown",
      email: "david@example.com",
      address: "654 Highland Ave, Bangkok, Thailand",
      phone: "+66 567 890 123"
    },
    companyInfo: {
      name: "Prepmee Co., Ltd.",
      taxId: "0123456789012",
      address: "456 Business Park, Bangkok, Thailand",
      phone: "+66 2 123 4567",
      email: "contact@prepmee.com",
      website: "www.prepmee.com"
    }
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