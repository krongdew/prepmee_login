import { useState } from 'react';
import Link from 'next/link';

export default function PayoutForm() {
  const [formData, setFormData] = useState({
    accountName: '',
    bankBranch: '',
    accountNumber: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form-style1">
      <div className="row">
      <div className="col-sm-6">
          <div className="mb20">
            <label className="heading-color ff-heading fw500 mb-1">
              Account Name 
            </label>
            <input
              type="text"
              name="accountName"
              value={formData.accountName}
              onChange={handleChange}
              className="form-control"
              placeholder="Name"
            />
          </div>
        </div>
      <div className="col-sm-6">
          <div className="mb20">
            <label className="heading-color ff-heading fw500 mb-1">
              Account Number
            </label>
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              className="form-control"
              placeholder="12345678"
              pattern="[0-9]*"
            />
          </div>
        </div>
  
    
        <div className="col-sm-6">
          <div className="mb20">
            <label className="heading-color ff-heading fw500 mb-1">
              Bank Branch
            </label>
            <input
              type="text"
              name="bankBranch"
              value={formData.bankBranch}
              onChange={handleChange}
              className="form-control"
              placeholder="สาขา"
            />
          </div>
        </div>
       
        
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="text-start">
            <Link className="ud-btn btn-thm" href="/contact">
              Save Detail
              <i className="fal fa-arrow-right-long" />
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}