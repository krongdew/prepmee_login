"use client";
import React, { useState } from 'react';

const QuantityCounter = ({ initialValue = 1, min = 1, max = 100, onChange }) => {
  const [quantity, setQuantity] = useState(initialValue);

  const handleIncrement = () => {
    if (quantity < max) {
      const newValue = quantity + 1;
      setQuantity(newValue);
      if (onChange) onChange(newValue);
    }
  };

  const handleDecrement = () => {
    if (quantity > min) {
      const newValue = quantity - 1;
      setQuantity(newValue);
      if (onChange) onChange(newValue);
    }
  };

  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= min && value <= max) {
      setQuantity(value);
      if (onChange) onChange(value);
    }
  };

  return (
    <div className="quantity-counter d-flex align-items-center">
      <button 
        className="quantity-btn" 
        onClick={handleDecrement}
        disabled={quantity <= min}
        style={{
          width: '30px',
          height: '30px',
          border: '1px solid #e7e7ed',
          borderRadius: '4px',
          background: 'transparent',
          cursor: quantity <= min ? 'not-allowed' : 'pointer'
        }}
      >
        -
      </button>
      
      <input
        type="text"
        value={quantity}
        onChange={handleChange}
        style={{
          width: '40px',
          height: '30px',
          textAlign: 'center',
          margin: '0 8px',
          border: '1px solid #e7e7ed',
          borderRadius: '4px'
        }}
      />
      
      <button 
        className="quantity-btn" 
        onClick={handleIncrement}
        disabled={quantity >= max}
        style={{
          width: '30px',
          height: '30px',
          border: '1px solid #e7e7ed',
          borderRadius: '4px',
          background: 'transparent',
          cursor: quantity >= max ? 'not-allowed' : 'pointer'
        }}
      >
        +
      </button>
    </div>
  );
};

export default QuantityCounter;