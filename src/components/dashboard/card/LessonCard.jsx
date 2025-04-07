"use client";
import React from 'react';
import { Star } from 'lucide-react';

const LessonCard = ({ lesson, type, onViewDetails, onRateLesson }) => {
  // Primary color for the theme
  const primaryColor = '#5BBBA1';

  // Render stars for rating
  const renderStars = (count) => {
    return (
      <div className="d-flex align-items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star}
            size={18} 
            fill={star <= count ? primaryColor : 'none'} 
            color={primaryColor}
          />
        ))}
      </div>
    );
  };

  const isUpcoming = type === 'upcoming';

  return (
    <div className="card p-0 bdrs8 shadow-sm">
      <div className="card-body p20 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-3">
          <div className="text-center lesson-date" style={{minWidth: '70px'}}>
            <div className="small fw500" style={{color: isUpcoming ? primaryColor : '#9CA3AF'}}>{lesson.month}</div>
            <div className="fs-4 fw700">{lesson.date}</div>
          </div>
          <div className="lesson-time fw500">
            <p className="mb-1">{lesson.day}</p>
            <p className="mb-0">{lesson.time}</p>
          </div>
        </div>
        
        <div className="d-flex align-items-center gap-3">
          <div className="d-flex align-items-center gap-2">
            <div className="tutor-avatar rounded-circle overflow-hidden" style={{width: '45px', height: '45px'}}>
              <img src={lesson.tutorImg} className="img-fluid w-100 h-100" alt={lesson.tutor} style={{objectFit: 'cover'}} />
            </div>
            <div className="tutor-info">
              <h6 className="mb-0 fw600">{lesson.tutor}</h6>
              <p className="mb-0 fz14" style={{color: '#6B7280'}}>{lesson.subject}</p>
            </div>
          </div>
          
          {isUpcoming ? (
            <div className="lesson-actions">
              <button 
                className="ud-btn btn-thm p-2 px-3" 
                onClick={() => onViewDetails(lesson)} 
                style={{backgroundColor: primaryColor, borderColor: primaryColor}}
              >
                View Details
              </button>
            </div>
          ) : (
            <div className="d-flex align-items-center gap-3">
              <div className="status-badge px-3 py-1 rounded-pill" style={{backgroundColor: `${primaryColor}20`, color: primaryColor}}>
                {lesson.status} • {lesson.paid}
              </div>
              
              {lesson.rated ? (
                <div className="rating-display">
                  {renderStars(lesson.rating)}
                </div>
              ) : (
                <button 
                  className="ud-btn btn-light p-2 px-3" 
                  onClick={() => onRateLesson(lesson)}
                >
                  Rate Lesson
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonCard;