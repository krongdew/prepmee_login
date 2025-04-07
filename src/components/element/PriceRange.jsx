"use client";
import React, { useState, useEffect } from 'react';

const PriceRange = ({ min = 0, max = 1000, onChange }) => {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);

  useEffect(() => {
    if (onChange) {
      onChange({ min: minValue, max: maxValue });
    }
  }, [minValue, maxValue, onChange]);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxValue - 1);
    setMinValue(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minValue + 1);
    setMaxValue(value);
  };

  const minPercent = ((minValue - min) / (max - min)) * 100;
  const maxPercent = ((maxValue - min) / (max - min)) * 100;

  return (
    <div className="price-range-widget">
      <div className="range-slider mt15">
        <div className="range-labels d-flex justify-content-between mb10">
          <span>${minValue}</span>
          <span>${maxValue}</span>
        </div>
        
        <div className="slider-track" style={{ 
          background: `linear-gradient(
            to right, 
            #e7e7ed 0%, 
            #e7e7ed ${minPercent}%, 
            #3584e4 ${minPercent}%, 
            #3584e4 ${maxPercent}%, 
            #e7e7ed ${maxPercent}%, 
            #e7e7ed 100%
          )`,
          height: '4px',
          position: 'relative',
          borderRadius: '4px',
          margin: '10px 0',
        }}>
          <input
            type="range"
            min={min}
            max={max}
            value={minValue}
            onChange={handleMinChange}
            style={{
              position: 'absolute',
              width: '100%',
              height: '4px',
              background: 'transparent',
              appearance: 'none',
              pointerEvents: 'none',
              zIndex: 2
            }}
          />
          <input
            type="range"
            min={min}
            max={max}
            value={maxValue}
            onChange={handleMaxChange}
            style={{
              position: 'absolute',
              width: '100%',
              height: '4px',
              background: 'transparent',
              appearance: 'none',
              pointerEvents: 'none',
              zIndex: 2
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRange;