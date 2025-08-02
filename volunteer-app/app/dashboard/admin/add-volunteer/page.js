'use client';
import { useState } from 'react';
import VolunteerForm from '@/components/VolunteerForm';

export default function AddVolunteerPage() {
  const [volunteers, setVolunteers] = useState([]);

  const handleAddVolunteer = (newVolunteer) => {
    const newEntry = { id: Date.now(), ...newVolunteer };
    setVolunteers((prevVolunteers) => [...prevVolunteers, newEntry]);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 20px', fontFamily: 'Arial, sans-serif' }}>


      <VolunteerForm onSubmit={handleAddVolunteer} />

      <div style={{
        marginTop: '30px',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
      }}>
        <h3 style={{ color: '#444', marginBottom: '15px' }}>Newly Added Volunteers</h3>

        {volunteers.length === 0 ? (
          <p style={{ color: '#777' }}>No volunteers added yet.</p>
        ) : (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {volunteers.map((volunteer) => (
              <li key={volunteer.id} style={{
                padding: '10px',
                borderBottom: '1px solid #ccc',
                fontSize: '16px',
                color: '#333'
              }}>
                <strong>{volunteer.name}</strong> - {volunteer.email} - {volunteer.phone}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
