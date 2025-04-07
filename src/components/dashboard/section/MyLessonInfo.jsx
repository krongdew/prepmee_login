"use client";
import React, { useState } from 'react';
import Pagination1 from '@/components/section/Pagination1';
import { lessons } from '@/data/lessons';

// Import separated components
import LessonCard from '../card/LessonCard';
import LessonDetailModal from '../modal/LessonDetailModal';
import RatingModal from '../modal/RatingModal';

const MyLessonInfo = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);
  const [currentLessons, setCurrentLessons] = useState(lessons);

  // Handle opening details modal for upcoming lessons
  const handleViewDetails = (lesson) => {
    setSelectedLesson(lesson);
    setShowDetails(true);
  };

  // Handle opening rating modal for past lessons
  const handleRating = (lesson) => {
    setSelectedLesson(lesson);
    setRatingValue(lesson.rated ? lesson.rating : 0);
    setShowRatingModal(true);
  };

  // Handle submitting ratings
  const submitRating = () => {
    const updatedLessons = {
      ...currentLessons,
      past: currentLessons.past.map(lesson => 
        lesson.id === selectedLesson.id 
          ? {...lesson, rated: true, rating: ratingValue} 
          : lesson
      )
    };
    
    setCurrentLessons(updatedLessons);
    setShowRatingModal(false);
  };

  // Check if a lesson can be cancelled (more than 24 hours before start)
  const canCancel = (lesson) => {
    if (!lesson.lessonDate) return false;
    
    const now = new Date();
    const timeDiff = lesson.lessonDate.getTime() - now.getTime();
    const hoursDiff = timeDiff / (1000 * 60 * 60);
    
    return hoursDiff > 24;
  };

  // Handle lesson cancellation
  const handleCancelLesson = () => {
    const updatedLessons = {
      ...currentLessons,
      upcoming: currentLessons.upcoming.filter(lesson => lesson.id !== selectedLesson.id)
    };
    
    setCurrentLessons(updatedLessons);
    setShowDetails(false);
  };

  return (
    <div className="ps-widget bgc-white bdrs4 p30 mb60 overflow-hidden position-relative">
      <div className="lesson-list-view">
        {/* Upcoming Lessons Section */}
        <div className="mb40">
          <h4 className="mb20">Upcoming Lessons</h4>
          {currentLessons.upcoming.length > 0 ? (
            <div className="d-flex flex-column gap-3">
              {currentLessons.upcoming.map((lesson) => (
                <LessonCard 
                  key={lesson.id} 
                  lesson={lesson} 
                  type="upcoming"
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          ) : (
            <div className="alert alert-info">No upcoming lessons scheduled.</div>
          )}
        </div>

        {/* Past Lessons Section */}
        <div>
          <h4 className="mb20">Past Lessons</h4>
          {currentLessons.past.length > 0 ? (
            <div className="d-flex flex-column gap-3">
              {currentLessons.past.map((lesson) => (
                <LessonCard 
                  key={lesson.id} 
                  lesson={lesson} 
                  type="past"
                  onRateLesson={handleRating}
                />
              ))}
            </div>
          ) : (
            <div className="alert alert-info">No past lessons found.</div>
          )}
        </div>

        {/* Pagination */}
        {(currentLessons.upcoming.length > 0 || currentLessons.past.length > 0) && (
          <div className="mt30">
            <Pagination1 />
          </div>
        )}
      </div>

      {/* Lesson Details Modal */}
      {showDetails && selectedLesson && (
        <LessonDetailModal 
          lesson={selectedLesson}
          onClose={() => setShowDetails(false)}
          onCancel={handleCancelLesson}
          canCancel={canCancel(selectedLesson)}
        />
      )}

      {/* Rating Modal */}
      {showRatingModal && selectedLesson && (
        <RatingModal 
          lesson={selectedLesson}
          ratingValue={ratingValue}
          setRatingValue={setRatingValue}
          onSubmit={submitRating}
          onClose={() => setShowRatingModal(false)}
        />
      )}
    </div>
  );
};

export default MyLessonInfo;