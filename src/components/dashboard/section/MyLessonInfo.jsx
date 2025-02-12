import React from 'react';
import { Calendar, List, MoreHorizontal } from 'lucide-react';
import Pagination1 from '@/components/section/Pagination1';

const MyLessonInfo = () => {
  const lessons = {
    upcoming: [
      { date: '11', month: 'APR', day: 'Monday', time: '12:00 - 13:00', tutor: 'Rizza', subject: 'English' },
      { date: '19', month: 'APR', day: 'Tuesday', time: '10:00 - 11:00', tutor: 'Rizza', subject: 'English' }
    ],
    past: [
      { date: '04', month: 'APR', day: 'Monday', time: '12:00 - 13:00', tutor: 'Rizza', subject: 'English', paid: '300 BAHT' },
      { date: '30', month: 'MAR', day: 'Wednesday', time: '11:00 - 12:00', tutor: 'Rizza', subject: 'English', paid: '300 BAHT' },
      { date: '21', month: 'FEB', day: 'Monday', time: '11:00 - 12:00', tutor: 'Rizza', subject: 'English', paid: '300 BAHT' },
      { date: '18', month: 'FEB', day: 'Friday', time: '11:00 - 12:00', tutor: 'Rizza', subject: 'English', paid: '300 BAHT' }
    ]
  };

  const customColor = '#5BBBA1';

  return (
    <div className="min-vh-100 bg-light">
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
        
          <div className="d-flex gap-2">
    
            <button className="btn btn-success text-white" style={{ backgroundColor: customColor, borderColor: customColor }}>+ Schedule new lesson</button>
          </div>
        </div>

        <div className="d-flex gap-4 mb-4">
          <button className="btn btn-link p-0 text-decoration-none" style={{ color: customColor }}>
            <List size={20} className="me-2" />
            List
          </button>
          <button className="btn btn-link text-secondary p-0 text-decoration-none">
            <Calendar size={20} className="me-2" />
            Calendar
          </button>
        </div>

        <div className="mb-4">
          <h2 className="h6 text-secondary mb-3">Upcoming lessons</h2>
          <div className="d-flex flex-column gap-2">
            {lessons.upcoming.map((lesson, index) => (
              <div key={index} className="card shadow-sm">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-3">
                    <div className="text-center" style={{width: '3rem'}}>
                      <div className="text-danger small">{lesson.month}</div>
                      <div className="fs-5 fw-bold">{lesson.date}</div>
                    </div>
                    <div className="fw-medium">{lesson.day}, {lesson.time}</div>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <div className="d-flex align-items-center gap-2">
                      <img src="/api/placeholder/32/32" className="rounded-circle" width="32" height="32" alt="Tutor" />
                      <div>
                        <div className="fw-medium">{lesson.tutor}</div>
                        <div className="small text-secondary">{lesson.subject}</div>
                      </div>
                    </div>
                    <button className="btn btn-link text-secondary p-1">
                      <MoreHorizontal size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="h6 text-secondary mb-3">Past lessons</h2>
          <div className="d-flex flex-column gap-2">
            {lessons.past.map((lesson, index) => (
              <div key={index} className="card shadow-sm">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-3">
                    <div className="text-center" style={{width: '3rem'}}>
                      <div className="text-danger small">{lesson.month}</div>
                      <div className="fs-5 fw-bold">{lesson.date}</div>
                    </div>
                    <div className="fw-medium">{lesson.day}, {lesson.time}</div>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <div className="d-flex align-items-center gap-2">
                      <img src="/api/placeholder/32/32" className="rounded-circle" width="32" height="32" alt="Tutor" />
                      <div>
                        <div className="fw-medium">{lesson.tutor}</div>
                        <div className="small text-secondary">{lesson.subject}</div>
                      </div>
                    </div>
                    <span className="badge" style={{ backgroundColor: `${customColor}20`, color: customColor }}>
                      Confirmed {lesson.paid}
                    </span>
                    <button className="btn btn-link text-secondary p-1">
                      <MoreHorizontal size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Pagination1 />
    </div>
  );
};

export default MyLessonInfo;