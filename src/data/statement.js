// /src/data/statement.js
export const statementMockData = [
    {
      id: 1,
      date: "Mar 15, 2023",
      type: 3, // 3 = Salary Payment
      method: "Bank Transfer",
      detail: "Salary payment for February 2023",
      hours: 25,
      price: 400,
      amount: 10000.00,
      status: 1, // 1 = Completed
      reference: "PAY-123456",
      tutor: {
        name: "John Doe",
        email: "johndoe@example.com",
        address: "123 Main St, Bangkok, Thailand",
        phone: "+66 123 456 789",
        taxId: "1234567890123"
      },
      company: {
        name: "Prepmee Co., Ltd.",
        taxId: "0123456789012",
        address: "456 Business Park, Bangkok, Thailand",
        phone: "+66 2 123 4567",
        email: "finance@prepmee.com",
        website: "www.prepmee.com"
      },
      items: [
        {
          description: "Mathematics Tutoring",
          hours: 10,
          rate: 400,
          total: 4000
        },
        {
          description: "Physics Tutoring",
          hours: 8,
          rate: 450,
          total: 3600
        },
        {
          description: "Chemistry Tutoring",
          hours: 7,
          rate: 400,
          total: 2800
        }
      ],
      deductions: {
        tax: 500.00,
        socialSecurity: 250.00,
        other: 0
      },
      bankInfo: {
        bankName: "Bangkok Bank",
        accountName: "John Doe",
        accountNumber: "123-4-56789-0"
      }
    },
    {
      id: 2,
      date: "Apr 15, 2023",
      type: 3, // 3 = Salary Payment
      method: "Bank Transfer",
      detail: "Salary payment for March 2023",
      hours: 30,
      price: 400,
      amount: 12000.00,
      status: 1, // 1 = Completed
      reference: "PAY-789012",
      tutor: {
        name: "Jane Smith",
        email: "janesmith@example.com",
        address: "456 Center St, Bangkok, Thailand",
        phone: "+66 234 567 890",
        taxId: "2345678901234"
      },
      company: {
        name: "Prepmee Co., Ltd.",
        taxId: "0123456789012",
        address: "456 Business Park, Bangkok, Thailand",
        phone: "+66 2 123 4567",
        email: "finance@prepmee.com",
        website: "www.prepmee.com"
      },
      items: [
        {
          description: "English Tutoring",
          hours: 15,
          rate: 400,
          total: 6000
        },
        {
          description: "Literature Tutoring",
          hours: 15,
          rate: 400,
          total: 6000
        }
      ],
      deductions: {
        tax: 600.00,
        socialSecurity: 300.00,
        other: 0
      },
      bankInfo: {
        bankName: "Kasikorn Bank",
        accountName: "Jane Smith",
        accountNumber: "987-6-54321-0"
      }
    },
    {
      id: 3,
      date: "May 15, 2023",
      type: 3, // 3 = Salary Payment
      method: "Bank Transfer",
      detail: "Salary payment for April 2023",
      hours: 22,
      price: 450,
      amount: 9900.00,
      status: 1, // 1 = Completed
      reference: "PAY-345678",
      tutor: {
        name: "Michael Johnson",
        email: "michael@example.com",
        address: "789 Park Ave, Bangkok, Thailand",
        phone: "+66 345 678 901",
        taxId: "3456789012345"
      },
      company: {
        name: "Prepmee Co., Ltd.",
        taxId: "0123456789012",
        address: "456 Business Park, Bangkok, Thailand",
        phone: "+66 2 123 4567",
        email: "finance@prepmee.com",
        website: "www.prepmee.com"
      },
      items: [
        {
          description: "Computer Science Tutoring",
          hours: 12,
          rate: 450,
          total: 5400
        },
        {
          description: "Programming Tutoring",
          hours: 10,
          rate: 450,
          total: 4500
        }
      ],
      deductions: {
        tax: 495.00,
        socialSecurity: 248.00,
        other: 0
      },
      bankInfo: {
        bankName: "Siam Commercial Bank",
        accountName: "Michael Johnson",
        accountNumber: "456-7-89012-3"
      }
    },
    {
      id: 4,
      date: "Jun 15, 2023",
      type: 3, // 3 = Salary Payment
      method: "Bank Transfer",
      detail: "Salary payment for May 2023",
      hours: 28,
      price: 420,
      amount: 11760.00,
      status: 2, // 2 = Pending
      reference: "PAY-901234",
      tutor: {
        name: "Sarah Williams",
        email: "sarah@example.com",
        address: "321 Garden Road, Bangkok, Thailand",
        phone: "+66 456 789 012",
        taxId: "4567890123456"
      },
      company: {
        name: "Prepmee Co., Ltd.",
        taxId: "0123456789012",
        address: "456 Business Park, Bangkok, Thailand",
        phone: "+66 2 123 4567",
        email: "finance@prepmee.com",
        website: "www.prepmee.com"
      },
      items: [
        {
          description: "Biology Tutoring",
          hours: 18,
          rate: 420,
          total: 7560
        },
        {
          description: "Chemistry Tutoring",
          hours: 10,
          rate: 420,
          total: 4200
        }
      ],
      deductions: {
        tax: 588.00,
        socialSecurity: 294.00,
        other: 0
      },
      bankInfo: {
        bankName: "Krung Thai Bank",
        accountName: "Sarah Williams",
        accountNumber: "789-0-12345-6"
      }
    },
    {
      id: 5,
      date: "Jul 15, 2023",
      type: 3, // 3 = Salary Payment
      method: "Bank Transfer",
      detail: "Salary payment for June 2023",
      hours: 35,
      price: 400,
      amount: 14000.00,
      status: 1, // 1 = Completed
      reference: "PAY-567890",
      tutor: {
        name: "David Brown",
        email: "david@example.com",
        address: "654 Highland Ave, Bangkok, Thailand",
        phone: "+66 567 890 123",
        taxId: "5678901234567"
      },
      company: {
        name: "Prepmee Co., Ltd.",
        taxId: "0123456789012",
        address: "456 Business Park, Bangkok, Thailand",
        phone: "+66 2 123 4567",
        email: "finance@prepmee.com",
        website: "www.prepmee.com"
      },
      items: [
        {
          description: "Mathematics Tutoring",
          hours: 20,
          rate: 400,
          total: 8000
        },
        {
          description: "Physics Tutoring",
          hours: 15,
          rate: 400,
          total: 6000
        }
      ],
      deductions: {
        tax: 700.00,
        socialSecurity: 350.00,
        other: 0
      },
      bankInfo: {
        bankName: "Bangkok Bank",
        accountName: "David Brown",
        accountNumber: "234-5-67890-1"
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
    },
    4: {
      label: "Service Purchased",
      class: "style4"  // สถานะอื่นๆ
    },
    5: {
      label: "Wallet Topup",
      class: "style5"  // สถานะอื่นๆ
    }
  };