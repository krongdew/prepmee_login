"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './minimal-calendar.css';
import { Button, Modal, Form } from 'react-bootstrap';

// Sample data - replace with your actual data fetching logic
const sampleBookings = [
  {
    id: 1,
    title: 'Math Tutoring - Alex',
    start: new Date(2025, 2, 3, 10, 0), // March 3, 2025, 10:00 AM
    end: new Date(2025, 2, 3, 12, 0),   // March 3, 2025, 12:00 PM
    studentName: 'Alex Johnson',
    subject: 'Mathematics',
    status: 'confirmed'
  },
  {
    id: 2,
    title: 'Physics Tutoring - Emma',
    start: new Date(2025, 2, 5, 14, 0), // March 5, 2025, 2:00 PM
    end: new Date(2025, 2, 5, 16, 0),   // March 5, 2025, 4:00 PM
    studentName: 'Emma Wilson',
    subject: 'Physics',
    status: 'confirmed'
  },
  {
    id: 3,
    title: 'Available Time Slot',
    start: new Date(2025, 2, 4, 9, 0),  // March 4, 2025, 9:00 AM
    end: new Date(2025, 2, 4, 12, 0),   // March 4, 2025, 12:00 PM
    status: 'available'
  }
];

const localizer = momentLocalizer(moment);

export default function TutorCalendar() {
  const [events, setEvents] = useState(sampleBookings);
  const [showModal, setShowModal] = useState(false);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newAvailability, setNewAvailability] = useState({
    start: new Date(),
    end: new Date(moment().add(2, 'hours').toDate())
  });

  // Event styling based on status
  const eventStyleGetter = (event) => {
    let style = {
      borderRadius: '5px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block',
      padding: '5px'
    };
    
    if (event.status === 'available') {
      style.backgroundColor = '#28a745'; // Green for available slots
    } else if (event.status === 'confirmed') {
      style.backgroundColor = '#007bff'; // Blue for confirmed bookings
    } else if (event.status === 'pending') {
      style.backgroundColor = '#ffc107'; // Yellow for pending
    } else if (event.status === 'cancelled') {
      style.backgroundColor = '#dc3545'; // Red for cancelled
    }
    
    return {
      style
    };
  };

  // Handle event click
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  // Handle creating a new event (available time slot)
  const handleSelectSlot = ({ start, end }) => {
    setNewAvailability({ start, end });
    setShowAvailabilityModal(true);
  };

  // Add new available time slot
  const addAvailableTimeSlot = () => {
    const newEvent = {
      id: events.length + 1,
      title: 'Available Time Slot',
      start: newAvailability.start,
      end: newAvailability.end,
      status: 'available'
    };
    
    setEvents([...events, newEvent]);
    setShowAvailabilityModal(false);
  };

  // Update event (move or resize)
  const moveEvent = ({ event, start, end }) => {
    const idx = events.indexOf(event);
    const updatedEvent = { ...event, start, end };
    
    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);
    
    setEvents(nextEvents);
  };

  // Delete event
  const deleteEvent = () => {
    const filteredEvents = events.filter(event => event.id !== selectedEvent.id);
    setEvents(filteredEvents);
    setShowModal(false);
  };

  // Update event details
  const updateEvent = (updatedDetails) => {
    const updatedEvents = events.map(event => 
      event.id === selectedEvent.id ? { ...event, ...updatedDetails } : event
    );
    setEvents(updatedEvents);
    setShowModal(false);
  };

  // Change event status
  const changeStatus = (newStatus) => {
    const updatedEvents = events.map(event => 
      event.id === selectedEvent.id ? { ...event, status: newStatus } : event
    );
    setEvents(updatedEvents);
    setShowModal(false);
  };

  // Custom toolbar component
  const CustomToolbar = ({ date, onNavigate, onView, label, view }) => {
    const goToBack = () => {
      onNavigate('PREV');
    };

    const goToNext = () => {
      onNavigate('NEXT');
    };

    const goToToday = () => {
      onNavigate('TODAY');
    };

    const changeView = (newView) => {
      onView(newView);
    };

    return (
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <button 
            className="btn btn-outline-secondary me-2"
            onClick={goToToday}
          >
            Today
          </button>
          <button 
            className="btn btn-outline-secondary me-2"
            onClick={goToBack}
          >
            Back
          </button>
          <button 
            className="btn btn-outline-secondary me-2"
            onClick={goToNext}
          >
            Next
          </button>
          <span className="ms-3 fw-bold">{label}</span>
        </div>
        <div>
          <button 
            className={`btn ${view === 'month' ? 'btn-secondary' : 'btn-outline-secondary'} me-2`}
            onClick={() => changeView('month')}
          >
            Month
          </button>
          <button 
            className={`btn ${view === 'week' ? 'btn-secondary' : 'btn-outline-secondary'} me-2`}
            onClick={() => changeView('week')}
          >
            Week
          </button>
          <button 
            className={`btn ${view === 'day' ? 'btn-secondary' : 'btn-outline-secondary'}`}
            onClick={() => changeView('day')}
          >
            Day
          </button>
        </div>
      </div>
    );
  };

  // Current date state
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState('week');

  // Navigation handlers
  const handleNavigate = useCallback((newDate) => {
    setCurrentDate(newDate);
  }, []);

  const handleViewChange = useCallback((newView) => {
    setCurrentView(newView);
  }, []);

  return (
<div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
          <div >
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3>Tutor Schedule</h3>
              <Button 
                variant="primary"
                onClick={() => {
                  setNewAvailability({
                    start: new Date(),
                    end: new Date(moment().add(2, 'hours').toDate())
                  });
                  setShowAvailabilityModal(true);
                }}
              >
                Add Available Time Slot
              </Button>
            </div>
            
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 600 }}
              selectable
              onSelectEvent={handleSelectEvent}
              onSelectSlot={handleSelectSlot}
              onEventDrop={moveEvent}
              onEventResize={moveEvent}
              resizable
              eventPropGetter={eventStyleGetter}
              step={30}
              timeslots={2}
              date={currentDate}
              view={currentView}
              onNavigate={handleNavigate}
              onView={handleViewChange}
              defaultView="week"
              views={['month', 'week', 'day']}
              components={{
                toolbar: CustomToolbar
              }}
            />
          </div>
        </div>
      </div>

      {/* Event Details Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedEvent?.status === 'available' ? 'Available Time Slot' : 'Booking Details'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEvent && (
            <div>
              {selectedEvent.status === 'available' ? (
                <p>This time slot is currently marked as available for bookings.</p>
              ) : (
                <>
                  <p><strong>Student:</strong> {selectedEvent.studentName}</p>
                  <p><strong>Subject:</strong> {selectedEvent.subject}</p>
                </>
              )}
              <p><strong>Date:</strong> {moment(selectedEvent.start).format('MMMM D, YYYY')}</p>
              <p><strong>Time:</strong> {moment(selectedEvent.start).format('h:mm A')} - {moment(selectedEvent.end).format('h:mm A')}</p>
              <p><strong>Status:</strong> <span className={`badge ${selectedEvent.status === 'confirmed' ? 'bg-primary' : selectedEvent.status === 'available' ? 'bg-success' : 'bg-warning'}`}>{selectedEvent.status}</span></p>
              
              {selectedEvent.status !== 'available' && (
                <Form.Group className="mt-3">
                  <Form.Label>Change Status</Form.Label>
                  <div>
                    <Button variant="success" className="me-2" onClick={() => changeStatus('confirmed')}>Confirm</Button>
                    <Button variant="warning" className="me-2" onClick={() => changeStatus('pending')}>Set as Pending</Button>
                    <Button variant="danger" onClick={() => changeStatus('cancelled')}>Cancel</Button>
                  </div>
                </Form.Group>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={deleteEvent}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Available Time Modal */}
      <Modal show={showAvailabilityModal} onHide={() => setShowAvailabilityModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Available Time Slot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Start Date and Time</Form.Label>
              <Form.Control 
                type="datetime-local" 
                value={moment(newAvailability.start).format('YYYY-MM-DDTHH:mm')}
                onChange={(e) => setNewAvailability({
                  ...newAvailability,
                  start: new Date(e.target.value)
                })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>End Date and Time</Form.Label>
              <Form.Control 
                type="datetime-local"
                value={moment(newAvailability.end).format('YYYY-MM-DDTHH:mm')}
                onChange={(e) => setNewAvailability({
                  ...newAvailability,
                  end: new Date(e.target.value)
                })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Repeat</Form.Label>
              <Form.Select>
                <option value="none">No repeat</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="biweekly">Bi-weekly</option>
                <option value="monthly">Monthly</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAvailabilityModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={addAvailableTimeSlot}>
            Add Available Time
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}