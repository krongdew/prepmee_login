"use client";
import React from 'react';
import { ArrowRight } from 'lucide-react';
import './lesson-modal.css';

const LessonDetailModal = ({ lesson, onClose, onCancel, canCancel }) => {
  // Primary color for the theme
  const primaryColor = '#5BBBA1';

  if (!lesson) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Lesson Details</h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onClose}
            >
              ×
            </button>
          </div>
          
          <div className="modal-body">
            <div className="tutor-profile">
              <div className="tutor-avatar">
                <img src={lesson.tutorImg} alt={lesson.tutor} />
              </div>
              <div>
                <h5 className="mb-0 fw600">{lesson.tutor}</h5>
                <p className="mb-0" style={{color: '#6B7280'}}>{lesson.subject}</p>
              </div>
            </div>
            
            <div className="lesson-details mb-4">
              <div className="lesson-details-row">
                <div className="lesson-detail-label">Date:</div>
                <div className="lesson-detail-value">{lesson.day}, {lesson.date} {lesson.month}</div>
              </div>
              <div className="lesson-details-row">
                <div className="lesson-detail-label">Time:</div>
                <div className="lesson-detail-value">{lesson.time}</div>
              </div>
              <div className="lesson-details-row">
                <div className="lesson-detail-label">Duration:</div>
                <div className="lesson-detail-value">90 minutes</div>
              </div>
              <div className="lesson-details-row">
                <div className="lesson-detail-label">Format:</div>
                <div className="lesson-detail-value">Online</div>
              </div>
            </div>
            
            <div className="session-notes">
              <h6 className="mb-2">Session Notes</h6>
              <p className="mb-0">Review of last week's topics on algebraic equations and introduction to quadratic formulas.</p>
            </div>
          </div>
          
          <div className="modal-footer">
            <button 
              type="button" 
              className="ud-btn btn-light" 
              onClick={onClose}
            >
              Close
            </button>
            
            {canCancel ? (
              <button 
                type="button" 
                className="ud-btn btn-danger" 
                onClick={onCancel}
              >
                Cancel Lesson
              </button>
            ) : (
              <button 
                type="button" 
                className="ud-btn btn-danger" 
                disabled
                title="Lessons can only be cancelled more than 24 hours in advance"
              >
                Cancel Lesson
              </button>
            )}
            
            <button 
              type="button" 
              className="ud-btn btn-thm" 
              style={{backgroundColor: primaryColor, borderColor: primaryColor}}
            >
              Join Lesson
              <ArrowRight size={16} className="ms-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonDetailModal;