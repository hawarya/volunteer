'use client';

import { useState } from 'react';

export default function AssignWorkPage() {
  const [volunteers] = useState([
    { id: 1, name: 'Gayathri' },
    { id: 2, name: 'Aishwarya V' }
  ]);

  const [events] = useState([
    { id: 101, name: 'Beach Cleanup' },
    { id: 102, name: 'Blood Donation Camp' }
  ]);

  const [selectedVolunteer, setSelectedVolunteer] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');
  const [assignments, setAssignments] = useState([]);

  const handleAssign = () => {
    if (!selectedVolunteer || !selectedEvent) {
      alert('Please select both event and volunteer');
      return;
    }

    const alreadyAssigned = assignments.find(
      a => a.volunteer.id === parseInt(selectedVolunteer) && a.event.id === parseInt(selectedEvent)
    );

    if (alreadyAssigned) {
      alert('This volunteer is already assigned to this event');
      return;
    }

    const volunteer = volunteers.find(v => v.id === parseInt(selectedVolunteer));
    const event = events.find(e => e.id === parseInt(selectedEvent));

    setAssignments([...assignments, { volunteer, event }]);
    setSelectedVolunteer('');
    setSelectedEvent('');
  };

  return (
    <div
      style={{
        padding: '40px',
        maxWidth: '600px',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
      }}
    >
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>
        Assign Work to Volunteers
      </h1>

      <div>
        <label style={{ display: 'block', marginBottom: '20px' }}>
          <span style={{ fontWeight: 'bold', color: '#444' }}>Select Volunteer:</span>
          <select
            value={selectedVolunteer}
            onChange={(e) => setSelectedVolunteer(e.target.value)}
            style={{
              padding: '10px',
              marginTop: '8px',
              width: '100%',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '16px'
            }}
          >
            <option value="">Choose</option>
            {volunteers.map(v => (
              <option key={v.id} value={v.id}>{v.name}</option>
            ))}
          </select>
        </label>

        <label style={{ display: 'block', marginBottom: '20px' }}>
          <span style={{ fontWeight: 'bold', color: '#444' }}>Select Event:</span>
          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            style={{
              padding: '10px',
              marginTop: '8px',
              width: '100%',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '16px'
            }}
          >
            <option value="">Choose </option>
            {events.map(e => (
              <option key={e.id} value={e.id}>{e.name}</option>
            ))}
          </select>
        </label>

        <button
          onClick={handleAssign}
          style={{
            padding: '12px 20px',
            backgroundColor: '#101316ff',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: 'pointer',
            width: '100%',
            transition: 'background 0.3s'
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#38393aff')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#1c1d1eff')}
        >
          Assign
        </button>
      </div>

      <h3 style={{ marginTop: '40px', color: '#333' }}>Assigned Work</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {assignments.map((a, idx) => (
          <li
            key={idx}
            style={{
              padding: '12px 16px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              backgroundColor: '#fff',
              marginBottom: '10px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
            }}
          >
            <span style={{ color: '#333', fontWeight: '500' }}>{a.volunteer.name}</span> →
            <strong style={{ marginLeft: '8px', color: '#0f1011ff' }}>{a.event.name}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
