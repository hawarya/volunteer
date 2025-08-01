// components/EventForm.js
'use client';

import { useState, useEffect } from 'react';

export default function EventForm({ onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
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
    setFormData({ title: '', description: '', date: '' });
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px', border: '1px solid #aaa', marginTop: '20px' }}>
      <h3>{initialData ? 'Edit Event' : 'Add Event'}</h3>
      <div style={{ marginBottom: '10px' }}>
        <label>Title: </label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Description: </label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Date: </label>
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
      </div>
      <button type="submit">{initialData ? 'Update' : 'Create'}</button>
    </form>
  );
}
