"use client";

export default function PrintableInvoice({ invoice }) {
  if (!invoice) return null;

  return (
    <div id="printable-invoice" style={{ 
      padding: "20px", 
      maxWidth: "800px", 
      margin: "0 auto",
      fontFamily: "Arial, sans-serif",
      color: "#000",
      background: "#fff"
    }}>
      {/* ส่วนหัวของใบเสร็จ */}
      <table border="0" cellPadding="0" cellSpacing="0" style={{ width: "100%" }}>
        <tbody>
          <tr>
            <td style={{ width: "50%", verticalAlign: "top" }}>
              <h3 style={{ color: "#22cc9c", margin: "0 0 10px 0" }}>PREPMEE</h3>
              <p style={{ margin: "0 0 3px 0" }}>{invoice.companyInfo.name}</p>
              <p style={{ margin: "0 0 3px 0" }}>เลขประจำตัวผู้เสียภาษี: {invoice.companyInfo.taxId}</p>
              <p style={{ margin: "0 0 3px 0" }}>{invoice.companyInfo.address}</p>
              <p style={{ margin: "0 0 3px 0" }}>โทร: {invoice.companyInfo.phone}</p>
              <p style={{ margin: "0 0 3px 0" }}>อีเมล: {invoice.companyInfo.email}</p>
            </td>
            <td style={{ width: "50%", verticalAlign: "top", textAlign: "right" }}>
              <h2 style={{ margin: "0 0 10px 0" }}>ใบเสร็จรับเงิน</h2>
              <p style={{ margin: "0 0 3px 0" }}><strong>เลขที่:</strong> {invoice.invoiceId}</p>
              <p style={{ margin: "0 0 3px 0" }}><strong>วันที่:</strong> {invoice.purchaseDate}</p>
              <p style={{ margin: "0 0 3px 0" }}>
                <strong>สถานะ:</strong> {invoice.status === 1 ? 'Completed' : invoice.status === 2 ? 'Pending' : 'Failed'}
              </p>
            </td>
          </tr>
        </tbody>
      </table>

      {/* ข้อมูลลูกค้า */}
      <div style={{ border: "1px solid #e0e0e0", borderRadius: "5px", padding: "15px", margin: "20px 0", background: "#f9f9f9" }}>
        <h5 style={{ margin: "0 0 10px 0" }}>ข้อมูลลูกค้า</h5>
        <p style={{ margin: "0 0 3px 0" }}><strong>ชื่อ:</strong> {invoice.customerInfo.name}</p>
        <p style={{ margin: "0 0 3px 0" }}><strong>อีเมล:</strong> {invoice.customerInfo.email}</p>
        <p style={{ margin: "0 0 3px 0" }}><strong>ที่อยู่:</strong> {invoice.customerInfo.address}</p>
        <p style={{ margin: "0 0 3px 0" }}><strong>โทรศัพท์:</strong> {invoice.customerInfo.phone}</p>
      </div>

      {/* รายการสินค้า */}
      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: "100%", borderCollapse: "collapse", margin: "20px 0" }}>
        <thead>
          <tr style={{ background: "#f5f5f5" }}>
            <th style={{ textAlign: "left" }}>รายการ</th>
            <th style={{ textAlign: "center" }}>จำนวน</th>
            <th style={{ textAlign: "right" }}>ราคาต่อหน่วย</th>
            <th style={{ textAlign: "right" }}>รวม</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, index) => (
            <tr key={index}>
              <td style={{ textAlign: "left" }}>{item.description}</td>
              <td style={{ textAlign: "center" }}>{item.quantity}</td>
              <td style={{ textAlign: "right" }}>฿{item.price.toFixed(3)}</td>
              <td style={{ textAlign: "right" }}>฿{item.total.toFixed(3)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan="3" style={{ textAlign: "right" }}>ยอดรวมทั้งสิ้น:</th>
            <th style={{ textAlign: "right" }}>฿{invoice.amount.toFixed(3)}</th>
          </tr>
        </tfoot>
      </table>

      {/* ข้อมูลการชำระเงิน */}
      <div style={{ margin: "20px 0" }}>
        <h5 style={{ margin: "0 0 10px 0" }}>ข้อมูลการชำระเงิน</h5>
        <p style={{ margin: "0 0 3px 0" }}><strong>วิธีชำระเงิน:</strong> {invoice.paymentMethod}</p>
        <p style={{ margin: "0 0 3px 0" }}><strong>เลขอ้างอิง:</strong> {invoice.transactionId}</p>
        <p style={{ margin: "0 0 3px 0" }}><strong>วันที่ชำระเงิน:</strong> {invoice.purchaseDate}</p>
      </div>

      {/* หมายเหตุและลายเซ็น */}
      <table border="0" cellPadding="0" cellSpacing="0" style={{ width: "100%", marginTop: "50px" }}>
        <tbody>
          <tr>
            <td style={{ width: "60%" }}>
              <p style={{ color: "#6c757d" }}>
                <small>ขอบคุณที่ใช้บริการ Prepmee</small>
              </p>
            </td>
            <td style={{ width: "40%", textAlign: "right" }}>
              <div style={{ marginTop: "50px" }}>
                <hr style={{ margin: "0 0 5px 0" }} />
                <p style={{ margin: "0" }}>ผู้รับเงิน</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}