'use client';
import { useState, useEffect } from 'react';
import styles from '@/styles/management.module.css';

export default function EventsManagement() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    maxVolunteers: '',
    requiredSkills: '',
    priority: 'medium'
  });

  useEffect(() => {
    // Mock events data
    const mockEvents = [
      {
        id: 1,
        title: 'Community Clean-up Drive',
        description: 'Join us for a neighborhood clean-up initiative to make our community cleaner and greener.',
        date: '2024-04-15',
        time: '09:00',
        location: 'Central Park, Main Street',
        maxVolunteers: 20,
        assignedVolunteers: 15,
        requiredSkills: ['Physical Work', 'Teamwork'],
        priority: 'high',
        status: 'active',
        createdDate: '2024-03-20',
        organizer: 'Admin User'
      },
      {
        id: 2,
        title: 'Food Bank Distribution',
        description: 'Help distribute food packages to families in need in our local community.',
        date: '2024-04-18',
        time: '14:00',
        location: 'Community Center, 123 Oak Avenue',
        maxVolunteers: 12,
        assignedVolunteers: 8,
        requiredSkills: ['Customer Service', 'Organization'],
        priority: 'high',
        status: 'active',
        createdDate: '2024-03-22',
        organizer: 'Admin User'
      },
      {
        id: 3,
        title: 'Senior Center Reading Program',
        description: 'Read books and spend time with elderly residents at the local senior center.',
        date: '2024-04-20',
        time: '10:30',
        location: 'Sunset Senior Center, 456 Pine Road',
        maxVolunteers: 8,
        assignedVolunteers: 6,
        requiredSkills: ['Communication', 'Patience', 'Reading'],
        priority: 'medium',
        status: 'active',
        createdDate: '2024-03-25',
        organizer: 'Admin User'
      },
      {
        id: 4,
        title: 'Tree Planting Initiative',
        description: 'Plant trees in the city park to contribute to environmental conservation.',
        date: '2024-04-25',
        time: '08:00',
        location: 'Riverside Park, East Side',
        maxVolunteers: 25,
        assignedVolunteers: 0,
        requiredSkills: ['Physical Work', 'Environmental Awareness'],
        priority: 'medium',
        status: 'draft',
        createdDate: '2024-03-28',
        organizer: 'Admin User'
      },
      {
        id: 5,
        title: 'Youth Mentorship Workshop',
        description: 'Mentor young people and help them develop life skills and career guidance.',
        date: '2024-04-12',
        time: '15:00',
        location: 'Youth Center, 789 Maple Street',
        maxVolunteers: 6,
        assignedVolunteers: 6,
        requiredSkills: ['Mentoring', 'Communication', 'Leadership'],
        priority: 'low',
        status: 'completed',
        createdDate: '2024-03-15',
        organizer: 'Admin User'
      }
    ];
    setEvents(mockEvents);
  }, []);

  const filteredEvents = events.filter(event => {
    const matchesSearch = 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.requiredSkills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filterStatus === 'all' || event.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const event = {
      id: Date.now(),
      ...newEvent,
      assignedVolunteers: 0,
      requiredSkills: newEvent.requiredSkills.split(',').map(skill => skill.trim()),
      maxVolunteers: parseInt(newEvent.maxVolunteers),
      status: 'draft',
      createdDate: new Date().toISOString().split('T')[0],
      organizer: 'Admin User'
    };
    
    setEvents(prev => [event, ...prev]);
    setNewEvent({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      maxVolunteers: '',
      requiredSkills: '',
      priority: 'medium'
    });
    setShowCreateModal(false);
    setIsLoading(false);
  };

  const handleStatusChange = async (eventId, newStatus) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setEvents(prev => 
      prev.map(event => 
        event.id === eventId 
          ? { ...event, status: newStatus }
          : event
      )
    );
    setIsLoading(false);
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setEvents(prev => prev.filter(event => event.id !== eventId));
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: '#38a169', bg: '#c6f6d5', text: 'Active' },
      draft: { color: '#d69e2e', bg: '#faf089', text: 'Draft' },
      completed: { color: '#718096', bg: '#e2e8f0', text: 'Completed' },
      cancelled: { color: '#e53e3e', bg: '#fed7d7', text: 'Cancelled' }
    };
    
    const config = statusConfig[status] || statusConfig.draft;
    
    return (
      <span 
        className={styles.statusBadge}
        style={{ 
          backgroundColor: config.bg, 
          color: config.color 
        }}
      >
        {config.text}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      high: { color: '#e53e3e', bg: '#fed7d7', text: 'High' },
      medium: { color: '#d69e2e', bg: '#faf089', text: 'Medium' },
      low: { color: '#38a169', bg: '#c6f6d5', text: 'Low' }
    };
    
    const config = priorityConfig[priority] || priorityConfig.medium;
    
    return (
      <span 
        className={styles.statusBadge}
        style={{ 
          backgroundColor: config.bg, 
          color: config.color 
        }}
      >
        {config.text}
      </span>
    );
  };

  const getVolunteerProgress = (assigned, max) => {
    const percentage = (assigned / max) * 100;
    let color = '#38a169';
    if (percentage < 50) color = '#e53e3e';
    else if (percentage < 80) color = '#d69e2e';
    
    return { percentage, color };
  };

  return (
    <div className={styles.managementContainer}>
      <div className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <h1 className={styles.pageTitle}>Events Management</h1>
          <p className={styles.pageSubtitle}>Create and manage volunteer events</p>
        </div>
        <button 
          className={styles.primaryButton}
          onClick={() => setShowCreateModal(true)}
        >
          <span className={styles.buttonIcon}>➕</span>
          Create Event
        </button>
      </div>

      {/* Filters and Search */}
      <div className={styles.filtersSection}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search events by title, location, or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          <span className={styles.searchIcon}>🔍</span>
        </div>
        
        <div className={styles.filterContainer}>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Statistics */}
      <div className={styles.statsRow}>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>{events.length}</span>
          <span className={styles.statLabel}>Total Events</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>{events.filter(e => e.status === 'active').length}</span>
          <span className={styles.statLabel}>Active</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>{events.filter(e => e.status === 'draft').length}</span>
          <span className={styles.statLabel}>Draft</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>{events.reduce((sum, e) => sum + e.assignedVolunteers, 0)}</span>
          <span className={styles.statLabel}>Total Volunteers</span>
        </div>
      </div>

      {/* Events Grid */}
      <div className={styles.eventsGrid}>
        {filteredEvents.map(event => {
          const progress = getVolunteerProgress(event.assignedVolunteers, event.maxVolunteers);
          
          return (
            <div key={event.id} className={styles.eventCard}>
              <div className={styles.eventHeader}>
                <div className={styles.eventMeta}>
                  {getStatusBadge(event.status)}
                  {getPriorityBadge(event.priority)}
                </div>
                <div className={styles.eventActions}>
                  <button 
                    className={styles.actionButton}
                    onClick={() => setSelectedEvent(event)}
                    title="View Details"
                  >
                    👁️
                  </button>
                  <button 
                    className={styles.actionButton}
                    onClick={() => alert('Edit functionality coming soon!')}
                    title="Edit Event"
                  >
                    ✏️
                  </button>
                  <button 
                    className={`${styles.actionButton} ${styles.deleteButton}`}
                    onClick={() => handleDeleteEvent(event.id)}
                    title="Delete Event"
                    disabled={isLoading}
                  >
                    🗑️
                  </button>
                </div>
              </div>
              
              <div className={styles.eventContent}>
                <h3 className={styles.eventTitle}>{event.title}</h3>
                <p className={styles.eventDescription}>{event.description}</p>
                
                <div className={styles.eventDetails}>
                  <div className={styles.eventDetail}>
                    <span className={styles.detailIcon}>📅</span>
                    <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
                  </div>
                  <div className={styles.eventDetail}>
                    <span className={styles.detailIcon}>📍</span>
                    <span>{event.location}</span>
                  </div>
                </div>
                
                <div className={styles.volunteerProgress}>
                  <div className={styles.progressHeader}>
                    <span>Volunteers: {event.assignedVolunteers}/{event.maxVolunteers}</span>
                    <span>{Math.round(progress.percentage)}%</span>
                  </div>
                  <div className={styles.progressBar}>
                    <div 
                      className={styles.progressFill}
                      style={{ 
                        width: `${progress.percentage}%`,
                        backgroundColor: progress.color
                      }}
                    />
                  </div>
                </div>
                
                <div className={styles.skillsRequired}>
                  <span className={styles.skillsLabel}>Required Skills:</span>
                  <div className={styles.skillsList}>
                    {event.requiredSkills.map((skill, index) => (
                      <span key={index} className={styles.skillTag}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className={styles.eventFooter}>
                <select
                  value={event.status}
                  onChange={(e) => handleStatusChange(event.id, e.target.value)}
                  className={styles.statusSelect}
                  disabled={isLoading}
                >
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <button 
                  className={styles.assignButton}
                  onClick={() => alert('Assignment functionality coming soon!')}
                >
                  Assign Volunteers
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredEvents.length === 0 && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📅</div>
          <h3>No events found</h3>
          <p>Try adjusting your search criteria or create new events.</p>
        </div>
      )}

      {/* Create Event Modal */}
      {showCreateModal && (
        <div className={styles.modalOverlay} onClick={() => setShowCreateModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Create New Event</h3>
              <button 
                className={styles.closeButton}
                onClick={() => setShowCreateModal(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleCreateEvent} className={styles.modalContent}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Event Title *</label>
                  <input
                    type="text"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                    className={styles.formInput}
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label>Priority</label>
                  <select
                    value={newEvent.priority}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, priority: e.target.value }))}
                    className={styles.formInput}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                
                <div className={styles.formGroup}>
                  <label>Date *</label>
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                    className={styles.formInput}
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label>Time *</label>
                  <input
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                    className={styles.formInput}
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label>Location *</label>
                  <input
                    type="text"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                    className={styles.formInput}
                    placeholder="Enter event location"
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label>Max Volunteers *</label>
                  <input
                    type="number"
                    value={newEvent.maxVolunteers}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, maxVolunteers: e.target.value }))}
                    className={styles.formInput}
                    min="1"
                    required
                  />
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label>Description *</label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                  className={styles.formTextarea}
                  rows="3"
                  placeholder="Describe the event and what volunteers will do"
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label>Required Skills</label>
                <input
                  type="text"
                  value={newEvent.requiredSkills}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, requiredSkills: e.target.value }))}
                  className={styles.formInput}
                  placeholder="Enter skills separated by commas (e.g., Communication, Teamwork)"
                />
              </div>
              
              <div className={styles.modalActions}>
                <button 
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className={styles.submitButton}
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating...' : 'Create Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className={styles.modalOverlay} onClick={() => setSelectedEvent(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Event Details</h3>
              <button 
                className={styles.closeButton}
                onClick={() => setSelectedEvent(null)}
              >
                ×
              </button>
            </div>
            <div className={styles.modalContent}>
              <div className={styles.eventDetailView}>
                <div className={styles.eventDetailHeader}>
                  <h4>{selectedEvent.title}</h4>
                  <div className={styles.eventBadges}>
                    {getStatusBadge(selectedEvent.status)}
                    {getPriorityBadge(selectedEvent.priority)}
                  </div>
                </div>
                
                <p className={styles.eventDetailDescription}>{selectedEvent.description}</p>
                
                <div className={styles.eventDetailGrid}>
                  <div className={styles.detailItem}>
                    <label>Date & Time</label>
                    <div>{new Date(selectedEvent.date).toLocaleDateString()} at {selectedEvent.time}</div>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Location</label>
                    <div>{selectedEvent.location}</div>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Volunteers</label>
                    <div>{selectedEvent.assignedVolunteers}/{selectedEvent.maxVolunteers}</div>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Created</label>
                    <div>{new Date(selectedEvent.createdDate).toLocaleDateString()}</div>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Organizer</label>
                    <div>{selectedEvent.organizer}</div>
                  </div>
                </div>
                
                <div className={styles.skillsSection}>
                  <label>Required Skills</label>
                  <div className={styles.skillsList}>
                    {selectedEvent.requiredSkills.map((skill, index) => (
                      <span key={index} className={styles.skillTag}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}