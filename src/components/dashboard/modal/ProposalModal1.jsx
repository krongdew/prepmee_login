"use client";
import { useEffect, useState } from "react";
import { browserCategory } from "@/data/project";

export default function ProposalModal1({ subject, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    mode: "Online",
    location: "",
    rate: "",
    duration: "1 hour",
    description: ""
  });

  // เมื่อ subject props เปลี่ยน ให้อัปเดตข้อมูลในฟอร์ม
  useEffect(() => {
    if (subject) {
      setFormData({
        id: subject.id,
        name: subject.name || "",
        category: subject.category || "",
        mode: subject.mode || "Online",
        location: subject.location || "",
        rate: subject.rate || "",
        duration: subject.duration || "1 hour",
        description: subject.description || ""
      });
    } else {
      // รีเซ็ตฟอร์มเมื่อเพิ่มรายวิชาใหม่
      setFormData({
        name: "",
        category: "",
        mode: "Online",
        location: "",
        rate: "",
        duration: "1 hour",
        description: ""
      });
    }
  }, [subject]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleModeChange = (option, value) => {
    setFormData(prev => ({
      ...prev,
      mode: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    
    // ปิดโมดัลโดยใช้ data-bs-dismiss attribute แทนการใช้ bootstrap API
    // ไม่ต้องใช้ bootstrap.Modal.getInstance อีกต่อไป
  };

  // ดึงหมวดหมู่จากข้อมูล browserCategory
  const categories = browserCategory.map(item => item.title);

  return (
    <>
      <div
        className="modal fade"
        id="proposalModal"
        tabIndex={-1}
        aria-labelledby="proposalModalLabel"
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
              <h4 className="mb-4">{subject ? "Edit Subject" : "Add New Subject"}</h4>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Subject name*</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Category*</label>
                      <select
                        className="form-control"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Category</option>
                        {categories.map((category, i) => (
                          <option key={i} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Mode*</label>
                      <select
                        className="form-control"
                        name="mode"
                        value={formData.mode}
                        onChange={handleChange}
                        required
                      >
                        <option value="Online">Online</option>
                        <option value="Onsite">Onsite</option>
                      </select>
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">
                        {formData.mode === "Onsite" ? "Location*" : "Location (optional)"}
                      </label>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required={formData.mode === "Onsite"}
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Rate per hour*</label>
                  <input 
                    type="number" 
                    className="form-control"
                    name="rate"
                    value={formData.rate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Subject Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="ud-btn btn-thm"
                  data-bs-dismiss="modal" // เพิ่ม attribute นี้เพื่อปิดโมดัลอัตโนมัติเมื่อกดปุ่ม
                >
                  {subject ? "Update" : "Add"} Subject
                  <i className="fal fa-arrow-right-long" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}