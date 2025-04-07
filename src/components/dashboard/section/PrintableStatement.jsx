"use client";

export default function PrintableStatement({ statement }) {
  if (!statement) return null;

  // คำนวณยอดรวม
  const getTotalHours = () => {
    return statement.items.reduce((total, item) => total + item.hours, 0);
  };

  // คำนวณยอดรวมก่อนหักค่าใช้จ่าย
  const getSubtotal = () => {
    return statement.items.reduce((total, item) => total + item.total, 0);
  };

  // คำนวณยอดรวมของการหักภาษีและประกันสังคม
  const getTotalDeductions = () => {
    return statement.deductions.tax + statement.deductions.socialSecurity + statement.deductions.other;
  };

  // คำนวณยอดสุทธิ
  const getNetAmount = () => {
    return getSubtotal() - getTotalDeductions();
  };

  return (
    <div id="printable-statement" style={{ 
      padding: "20px", 
      maxWidth: "800px", 
      margin: "0 auto",
      fontFamily: "Arial, sans-serif",
      color: "#000",
      background: "#fff"
    }}>
      {/* ส่วนหัวของใบสำคัญจ่าย */}
      <table border="0" cellPadding="0" cellSpacing="0" style={{ width: "100%" }}>
        <tbody>
          <tr>
            <td style={{ width: "50%", verticalAlign: "top" }}>
              <h3 style={{ color: "#22cc9c", margin: "0 0 10px 0" }}>PREPMEE</h3>
              <p style={{ margin: "0 0 3px 0" }}>{statement.company.name}</p>
              <p style={{ margin: "0 0 3px 0" }}>เลขประจำตัวผู้เสียภาษี: {statement.company.taxId}</p>
              <p style={{ margin: "0 0 3px 0" }}>{statement.company.address}</p>
              <p style={{ margin: "0 0 3px 0" }}>โทร: {statement.company.phone}</p>
              <p style={{ margin: "0 0 3px 0" }}>อีเมล: {statement.company.email}</p>
            </td>
            <td style={{ width: "50%", verticalAlign: "top", textAlign: "right" }}>
              <h2 style={{ margin: "0 0 10px 0" }}>ใบสำคัญจ่าย</h2>
              <p style={{ margin: "0 0 3px 0" }}><strong>เลขที่:</strong> {statement.reference}</p>
              <p style={{ margin: "0 0 3px 0" }}><strong>วันที่จ่าย:</strong> {statement.date}</p>
              <p style={{ margin: "0 0 3px 0" }}>
                <strong>สถานะ:</strong> {statement.status === 1 ? 'Completed' : statement.status === 2 ? 'Pending' : 'Failed'}
              </p>
              <p style={{ margin: "0 0 3px 0" }}><strong>วิธีการชำระเงิน:</strong> {statement.method}</p>
            </td>
          </tr>
        </tbody>
      </table>

      {/* ข้อมูลผู้รับเงิน (ติวเตอร์) */}
      <div style={{ border: "1px solid #e0e0e0", borderRadius: "5px", padding: "15px", margin: "20px 0", background: "#f9f9f9" }}>
        <h5 style={{ margin: "0 0 10px 0" }}>ข้อมูลผู้รับเงิน</h5>
        <p style={{ margin: "0 0 3px 0" }}><strong>ชื่อ:</strong> {statement.tutor.name}</p>
        <p style={{ margin: "0 0 3px 0" }}><strong>เลขประจำตัวผู้เสียภาษี:</strong> {statement.tutor.taxId}</p>
        <p style={{ margin: "0 0 3px 0" }}><strong>อีเมล:</strong> {statement.tutor.email}</p>
        <p style={{ margin: "0 0 3px 0" }}><strong>ที่อยู่:</strong> {statement.tutor.address}</p>
        <p style={{ margin: "0 0 3px 0" }}><strong>โทรศัพท์:</strong> {statement.tutor.phone}</p>
      </div>

      {/* รายการชั่วโมงสอน */}
      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: "100%", borderCollapse: "collapse", margin: "20px 0" }}>
        <thead>
          <tr style={{ background: "#f5f5f5" }}>
            <th style={{ textAlign: "left" }}>รายการ</th>
            <th style={{ textAlign: "center" }}>จำนวนชั่วโมง</th>
            <th style={{ textAlign: "right" }}>อัตราต่อชั่วโมง (บาท)</th>
            <th style={{ textAlign: "right" }}>รวม (บาท)</th>
          </tr>
        </thead>
        <tbody>
          {statement.items.map((item, index) => (
            <tr key={index}>
              <td style={{ textAlign: "left" }}>{item.description}</td>
              <td style={{ textAlign: "center" }}>{item.hours}</td>
              <td style={{ textAlign: "right" }}>฿{item.rate.toFixed(2)}</td>
              <td style={{ textAlign: "right" }}>฿{item.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th style={{ textAlign: "right" }} colSpan="1">รวมทั้งสิ้น:</th>
            <th style={{ textAlign: "center" }}>{getTotalHours()}</th>
            <th style={{ textAlign: "right" }}>ยอดรวม:</th>
            <th style={{ textAlign: "right" }}>฿{getSubtotal().toFixed(2)}</th>
          </tr>
        </tfoot>
      </table>

      {/* รายการหัก */}
      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: "100%", borderCollapse: "collapse", margin: "20px 0" }}>
        <thead>
          <tr style={{ background: "#f5f5f5" }}>
            <th style={{ textAlign: "left" }} colSpan="2">รายการหัก</th>
            <th style={{ textAlign: "right" }}>จำนวนเงิน (บาท)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ textAlign: "left" }} colSpan="2">ภาษีหัก ณ ที่จ่าย (5%)</td>
            <td style={{ textAlign: "right" }}>฿{statement.deductions.tax.toFixed(2)}</td>
          </tr>
          <tr>
            <td style={{ textAlign: "left" }} colSpan="2">ประกันสังคม</td>
            <td style={{ textAlign: "right" }}>฿{statement.deductions.socialSecurity.toFixed(2)}</td>
          </tr>
          {statement.deductions.other > 0 && (
            <tr>
              <td style={{ textAlign: "left" }} colSpan="2">อื่นๆ</td>
              <td style={{ textAlign: "right" }}>฿{statement.deductions.other.toFixed(2)}</td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <th style={{ textAlign: "right" }} colSpan="2">รวมรายการหัก:</th>
            <th style={{ textAlign: "right" }}>฿{getTotalDeductions().toFixed(2)}</th>
          </tr>
          <tr>
            <th style={{ textAlign: "right" }} colSpan="2">ยอดสุทธิ:</th>
            <th style={{ textAlign: "right" }}>฿{getNetAmount().toFixed(2)}</th>
          </tr>
        </tfoot>
      </table>

      {/* ข้อมูลบัญชีธนาคาร */}
      <div style={{ border: "1px solid #e0e0e0", borderRadius: "5px", padding: "15px", margin: "20px 0", background: "#f9f9f9" }}>
        <h5 style={{ margin: "0 0 10px 0" }}>ข้อมูลบัญชีธนาคาร</h5>
        <p style={{ margin: "0 0 3px 0" }}><strong>ธนาคาร:</strong> {statement.bankInfo.bankName}</p>
        <p style={{ margin: "0 0 3px 0" }}><strong>ชื่อบัญชี:</strong> {statement.bankInfo.accountName}</p>
        <p style={{ margin: "0 0 3px 0" }}><strong>เลขที่บัญชี:</strong> {statement.bankInfo.accountNumber}</p>
      </div>

      {/* หมายเหตุและลายเซ็น */}
      <table border="0" cellPadding="0" cellSpacing="0" style={{ width: "100%", marginTop: "50px" }}>
        <tbody>
          <tr>
            <td style={{ width: "60%" }}>
              <p style={{ color: "#6c757d" }}>
                <small>เอกสารฉบับนี้ออกโดยระบบอิเล็กทรอนิกส์</small>
              </p>
            </td>
            <td style={{ width: "40%", textAlign: "right" }}>
              <div style={{ marginTop: "20px" }}>
                <hr style={{ margin: "0 0 5px 0" }} />
                <p style={{ margin: "0" }}>ผู้รับเงิน</p>
                <p style={{ margin: "30px 0 0 0" }}>({statement.tutor.name})</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}