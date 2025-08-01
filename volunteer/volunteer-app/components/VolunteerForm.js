// components/VolunteerForm.js
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
    <form onSubmit={handleSubmit} style={{ padding: '20px', border: '1px solid #ccc', marginTop: '20px' }}>
      <h3>{initialData ? 'Edit Volunteer' : 'Add Volunteer'}</h3>
      <div style={{ marginBottom: '10px' }}>
        <label>Name: </label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Email: </label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Phone: </label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
      </div>
      <button type="submit">{initialData ? 'Update' : 'Submit'}</button>
    </form>
  );
}
