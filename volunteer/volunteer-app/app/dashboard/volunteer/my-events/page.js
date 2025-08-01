'use client';

import { useEffect, useState } from 'react';

export default function VolunteerWorkPage() {
  const [assignedWork, setAssignedWork] = useState([]);

  // Simulate fetching volunteer's assigned work
  useEffect(() => {
    const mockAssignments = [
      {
        event: {
          name: 'Beach Cleanup',
          description: 'Cleaning the marina beach area on Sunday, 9 AM',
        },
        status: 'Pending'
      },
      {
        event: {
          name: 'Blood Donation Camp',
          description: 'Helping manage donors at the Red Cross Hall, Monday 10 AM',
        },
        status: 'Completed'
      }
    ];

    setAssignedWork(mockAssignments);
  }, []);

  return (
    <div style={{ padding: '40px' }}>
      <h1>Your Assigned Work</h1>

      {assignedWork.length === 0 ? (
        <p style={{ marginTop: '20px' }}>No work assigned yet.</p>
      ) : (
        <ul style={{ marginTop: '20px', listStyle: 'none', padding: 0 }}>
          {assignedWork.map((item, index) => (
            <li key={index} style={cardStyle}>
              <h3>{item.event.name}</h3>
              <p>{item.event.description}</p>
              <p><strong>Status:</strong> {item.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const cardStyle = {
  padding: '15px',
  border: '1px solid #ccc',
  borderRadius: '6px',
  backgroundColor: '#f9f9f9',
  marginBottom: '15px'
};
