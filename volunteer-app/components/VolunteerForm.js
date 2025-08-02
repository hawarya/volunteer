'use client';

import { useState, useEffect } from 'react';

export default function VolunteerForm({ onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', email: '', phone: '' });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        marginTop: '20px',
        backgroundColor: '#fdfdfd',
        boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
      }}
    >
      <h3 style={{ marginBottom: '15px', color: '#333' }}>
        {initialData ? 'Edit Volunteer' : 'Add Volunteer'}
      </h3>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Phone:</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
      </div>

      <button
        type="submit"
        style={{
          padding: '10px 20px',
          backgroundColor: '#3e4c5dff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        {initialData ? 'Update' : 'Submit'}
      </button>
    </form>
  );
}
