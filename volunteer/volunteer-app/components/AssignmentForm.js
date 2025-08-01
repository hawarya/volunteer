// components/AssignmentForm.js
'use client';

import { useState, useEffect } from 'react';

export default function AssignmentForm({ onAssign }) {
  const [volunteers, setVolunteers] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedVolunteer, setSelectedVolunteer] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const resVolunteers = await fetch('/api/volunteers');
      const resEvents = await fetch('/api/events');
      const volunteerData = await resVolunteers.json();
      const eventData = await resEvents.json();
      setVolunteers(volunteerData);
      setEvents(eventData);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedVolunteer && selectedEvent) {
      await onAssign({ volunteerId: selectedVolunteer, eventId: selectedEvent });
      setSelectedVolunteer('');
      setSelectedEvent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px', border: '1px solid #aaa', marginTop: '20px' }}>
      <h3>Assign Volunteer to Event</h3>

      <div style={{ marginBottom: '10px' }}>
        <label>Select Volunteer: </label>
        <select value={selectedVolunteer} onChange={(e) => setSelectedVolunteer(e.target.value)} required>
          <option value="">-- Choose --</option>
          {volunteers.map((vol) => (
            <option key={vol._id} value={vol._id}>
              {vol.name}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Select Event: </label>
        <select value={selectedEvent} onChange={(e) => setSelectedEvent(e.target.value)} required>
          <option value="">-- Choose --</option>
          {events.map((ev) => (
            <option key={ev._id} value={ev._id}>
              {ev.title}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Assign</button>
    </form>
  );
}
