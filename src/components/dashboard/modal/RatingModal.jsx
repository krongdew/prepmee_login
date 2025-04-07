"use client";
import React from 'react';
import { Star } from 'lucide-react';
import './lesson-modal.css';

const RatingModal = ({ lesson, ratingValue, setRatingValue, onSubmit, onClose }) => {
  // Primary color for the theme
  const primaryColor = '#5BBBA1';

  if (!lesson) return null;

  // Render stars for rating
  const renderStars = (count, isInteractive = false, onRatingChange = null) => {
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <button 
            key={star} 
            className="star-btn"
            onClick={() => onRatingChange(star)}
          >
            <Star 
              size={24} 
              fill={star <= count ? primaryColor : 'none'} 
              color={primaryColor}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Rate Your Lesson</h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onClose}
            >
              ×
            </button>
          </div>
          
          <div className="modal-body text-center">
            <div className="mb-4">
              <div className="tutor-avatar mx-auto mb-3">
                <img src={lesson.tutorImg} alt={lesson.tutor} />
              </div>
              <h5 className="mb-1 fw600">{lesson.tutor}</h5>
              <p className="mb-0" style={{color: '#6B7280'}}>{lesson.subject}</p>
              <p className="mb-0 fz14">{lesson.day}, {lesson.date} {lesson.month} • {lesson.time}</p>
            </div>
            
            <div className="rating-area">
              <h6 className="mb-3">How would you rate this lesson?</h6>
              {renderStars(ratingValue, true, setRatingValue)}
            </div>
            
            <div className="feedback-area mb-3">
              <h6 className="mb-2">Additional feedback (optional)</h6>
              <textarea 
                className="form-control" 
                rows="3" 
                placeholder="Share your experience with this tutor..."
              ></textarea>
            </div>
          </div>
          
          <div className="modal-footer">
            <button 
              type="button" 
              className="ud-btn btn-light" 
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="button" 
              className="ud-btn btn-thm" 
              style={{backgroundColor: primaryColor, borderColor: primaryColor}}
              onClick={onSubmit}
              disabled={ratingValue === 0}
            >
              Submit Rating
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;