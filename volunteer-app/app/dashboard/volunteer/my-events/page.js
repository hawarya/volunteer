'use client';

import { useEffect, useState } from 'react';

export default function VolunteerWorkPage() {
  const [assignedWork, setAssignedWork] = useState([]);

  
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
    <div
      style={{
        padding: '40px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f5f7fa',
        minHeight: '100vh',
        color: '#333'
      }}
    >
      <h1 style={{ fontSize: '28px', marginBottom: '30px' }}>Your Assigned Work</h1>

      {assignedWork.length === 0 ? (
        <p style={{ marginTop: '20px', fontSize: '16px' }}>No work assigned yet.</p>
      ) : (
        <ul style={{ marginTop: '20px', listStyle: 'none', padding: 0 }}>
          {assignedWork.map((item, index) => (
            <li
              key={index}
              style={{
                ...cardStyle,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <h3 style={{ marginBottom: '10px', color: '#2c3e50' }}>{item.event.name}</h3>
              <p style={{ marginBottom: '6px', color: '#555' }}>{item.event.description}</p>
              <p style={{ fontWeight: 'bold', color: item.status === 'Completed' ? 'green' : 'orange' }}>
                Status: {item.status}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const cardStyle = {
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  backgroundColor: '#ffffff',
  marginBottom: '20px'
};
