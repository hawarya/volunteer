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
    <div style={{ padding: '40px' }}>
      <h1>Assign Work to Volunteers</h1>

      <div style={{ marginTop: '20px' }}>
        <label>
          Select Volunteer:
          <select
            value={selectedVolunteer}
            onChange={(e) => setSelectedVolunteer(e.target.value)}
            style={selectStyle}
          >
            <option value="">-- Choose --</option>
            {volunteers.map(v => (
              <option key={v.id} value={v.id}>{v.name}</option>
            ))}
          </select>
        </label>

        <label>
          Select Event:
          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            style={selectStyle}
          >
            <option value="">-- Choose --</option>
            {events.map(e => (
              <option key={e.id} value={e.id}>{e.name}</option>
            ))}
          </select>
        </label>

        <button onClick={handleAssign} style={buttonStyle}>Assign</button>
      </div>

      <h3 style={{ marginTop: '30px' }}>Assigned Work</h3>
      <ul>
        {assignments.map((a, idx) => (
          <li key={idx} style={cardStyle}>
            {a.volunteer.name} → <strong>{a.event.name}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

const selectStyle = {
  padding: '8px',
  margin: '10px',
  display: 'block',
  width: '200px'
};

const buttonStyle = {
  padding: '8px 12px',
  backgroundColor: '#28a745',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  marginTop: '10px',
  cursor: 'pointer'
};

const cardStyle = {
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '6px',
  backgroundColor: '#f0f0f0',
  marginBottom: '8px'
};
