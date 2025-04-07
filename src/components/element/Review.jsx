"use client";
import React from 'react';

const Review = () => {
  // Sample review data
  const reviews = [
    {
      id: 1,
      user: {
        name: 'John Doe',
        avatar: '/images/placeholder.jpg',
        date: 'March 15, 2025',
      },
      rating: 5,
      content: 'The service was excellent! The work was delivered on time and exceeded my expectations. Communication was great throughout the process.',
    },
    {
      id: 2,
      user: {
        name: 'Sarah Smith',
        avatar: '/images/placeholder.jpg',
        date: 'March 10, 2025',
      },
      rating: 4,
      content: 'Very good experience working with this freelancer. The quality of work was high, though there were a few minor revisions needed.',
    },
    {
      id: 3,
      user: {
        name: 'Michael Johnson',
        avatar: '/images/placeholder.jpg',
        date: 'March 5, 2025',
      },
      rating: 5,
      content: 'Outstanding service! Fast delivery, excellent communication, and the end result was exactly what I was looking for. Highly recommended!',
    }
  ];

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i 
          key={i} 
          className={`fas fa-star ${i <= rating ? 'text-warning' : 'text-muted'}`}
          style={{ marginRight: '2px' }}
        ></i>
      );
    }
    return stars;
  };

  return (
    <div className="review-list">
      {reviews.map((review) => (
        <div key={review.id} className="review-item mb-4 pb-4" style={{ borderBottom: '1px solid #e7e7ed' }}>
          <div className="review-header d-flex align-items-center mb-3">
            <div className="reviewer-avatar me-3">
              <img 
                src={review.user.avatar} 
                alt={review.user.name} 
                className="rounded-circle"
                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
              />
            </div>
            <div className="reviewer-info">
              <h5 className="reviewer-name mb-1">{review.user.name}</h5>
              <div className="d-flex align-items-center">
                <div className="reviewer-rating me-2">
                  {renderStars(review.rating)}
                </div>
                <span className="review-date text-muted small">{review.user.date}</span>
              </div>
            </div>
          </div>
          <div className="review-content">
            <p>{review.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Review;