"use client";
import React from 'react';

const GalleryBox = () => {
  return (
    <div className="gallery-box">
      <div className="product-img">
        {/* Placeholder image gallery */}
        <div className="main-image mb-3">
          <img src="/images/placeholder.jpg" alt="Gallery" className="w-100 rounded" />
        </div>
        <div className="thumbnail-images d-flex gap-2">
          {[1, 2, 3, 4].map((item, index) => (
            <div key={index} className="thumb-item" style={{ width: '25%' }}>
              <img 
                src="/images/placeholder.jpg" 
                alt={`Thumbnail ${index}`} 
                className="w-100 rounded" 
                style={{ cursor: 'pointer' }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryBox;