'use client';
import { useState, useEffect } from 'react';
import styles from '@/styles/management.module.css';

export default function VolunteersManagement() {
  const [volunteers, setVolunteers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Mock volunteer data
    const mockVolunteers = [
      {
        id: 1,
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@email.com',
        phone: '(555) 123-4567',
        skills: ['Event Management', 'Communication', 'Leadership'],
        availability: 'weekends',
        status: 'active',
        joinDate: '2024-01-15',
        completedEvents: 8,
        totalHours: 32,
        rating: 4.8
      },
      {
        id: 2,
        firstName: 'Mike',
        lastName: 'Chen',
        email: 'mike.chen@email.com',
        phone: '(555) 234-5678',
        skills: ['Teaching', 'Youth Mentoring', 'Sports'],
        availability: 'flexible',
        status: 'active',
        joinDate: '2024-02-03',
        completedEvents: 12,
        totalHours: 48,
        rating: 4.9
      },
      {
        id: 3,
        firstName: 'Emily',
        lastName: 'Rodriguez',
        email: 'emily.rodriguez@email.com',
        phone: '(555) 345-6789',
        skills: ['Healthcare', 'First Aid', 'Community Outreach'],
        availability: 'weekdays',
        status: 'inactive',
        joinDate: '2023-11-20',
        completedEvents: 15,
        totalHours: 60,
        rating: 4.7
      },
      {
        id: 4,
        firstName: 'David',
        lastName: 'Thompson',
        email: 'david.thompson@email.com',
        phone: '(555) 456-7890',
        skills: ['Construction', 'Manual Labor', 'Project Management'],
        availability: 'both',
        status: 'active',
        joinDate: '2024-03-10',
        completedEvents: 5,
        totalHours: 20,
        rating: 4.6
      },
      {
        id: 5,
        firstName: 'Lisa',
        lastName: 'Wang',
        email: 'lisa.wang@email.com',
        phone: '(555) 567-8901',
        skills: ['Technology', 'Data Analysis', 'Training'],
        availability: 'weekends',
        status: 'pending',
        joinDate: '2024-03-25',
        completedEvents: 0,
        totalHours: 0,
        rating: 0
      }
    ];
    setVolunteers(mockVolunteers);
  }, []);

  const filteredVolunteers = volunteers.filter(volunteer => {
    const matchesSearch = 
      volunteer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volunteer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volunteer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volunteer.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filterStatus === 'all' || volunteer.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const handleStatusChange = async (volunteerId, newStatus) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setVolunteers(prev => 
      prev.map(volunteer => 
        volunteer.id === volunteerId 
          ? { ...volunteer, status: newStatus }
          : volunteer
      )
    );
    setIsLoading(false);
  };

  const handleDeleteVolunteer = async (volunteerId) => {
    if (window.confirm('Are you sure you want to remove this volunteer?')) {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setVolunteers(prev => prev.filter(volunteer => volunteer.id !== volunteerId));
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: '#38a169', bg: '#c6f6d5', text: 'Active' },
      inactive: { color: '#718096', bg: '#e2e8f0', text: 'Inactive' },
      pending: { color: '#d69e2e', bg: '#faf089', text: 'Pending' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    
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

  const getAvailabilityText = (availability) => {
    const availabilityMap = {
      weekdays: 'Weekdays',
      weekends: 'Weekends',
      both: 'Both',
      flexible: 'Flexible'
    };
    return availabilityMap[availability] || availability;
  };

  return (
    <div className={styles.managementContainer}>
      <div className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <h1 className={styles.pageTitle}>Volunteer Management</h1>
          <p className={styles.pageSubtitle}>Manage and monitor your volunteer community</p>
        </div>
        <button 
          className={styles.primaryButton}
          onClick={() => setShowAddModal(true)}
        >
          <span className={styles.buttonIcon}>➕</span>
          Add Volunteer
        </button>
      </div>

      {/* Filters and Search */}
      <div className={styles.filtersSection}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search volunteers by name, email, or skills..."
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
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Statistics */}
      <div className={styles.statsRow}>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>{volunteers.length}</span>
          <span className={styles.statLabel}>Total Volunteers</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>{volunteers.filter(v => v.status === 'active').length}</span>
          <span className={styles.statLabel}>Active</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>{volunteers.filter(v => v.status === 'pending').length}</span>
          <span className={styles.statLabel}>Pending</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>{volunteers.reduce((sum, v) => sum + v.completedEvents, 0)}</span>
          <span className={styles.statLabel}>Total Events</span>
        </div>
      </div>

      {/* Volunteers Table */}
      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <h3>Volunteers ({filteredVolunteers.length})</h3>
        </div>
        
        <div className={styles.table}>
          <div className={styles.tableHead}>
            <div className={styles.tableRow}>
              <div className={styles.tableCell}>Volunteer</div>
              <div className={styles.tableCell}>Contact</div>
              <div className={styles.tableCell}>Skills</div>
              <div className={styles.tableCell}>Availability</div>
              <div className={styles.tableCell}>Status</div>
              <div className={styles.tableCell}>Performance</div>
              <div className={styles.tableCell}>Actions</div>
            </div>
          </div>
          
          <div className={styles.tableBody}>
            {filteredVolunteers.map(volunteer => (
              <div key={volunteer.id} className={styles.tableRow}>
                <div className={styles.tableCell}>
                  <div className={styles.volunteerInfo}>
                    <div className={styles.volunteerAvatar}>
                      {volunteer.firstName.charAt(0)}{volunteer.lastName.charAt(0)}
                    </div>
                    <div className={styles.volunteerDetails}>
                      <div className={styles.volunteerName}>
                        {volunteer.firstName} {volunteer.lastName}
                      </div>
                      <div className={styles.volunteerMeta}>
                        Joined {new Date(volunteer.joinDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={styles.tableCell}>
                  <div className={styles.contactInfo}>
                    <div>{volunteer.email}</div>
                    <div className={styles.phoneNumber}>{volunteer.phone}</div>
                  </div>
                </div>
                
                <div className={styles.tableCell}>
                  <div className={styles.skillsList}>
                    {volunteer.skills.slice(0, 2).map((skill, index) => (
                      <span key={index} className={styles.skillTag}>
                        {skill}
                      </span>
                    ))}
                    {volunteer.skills.length > 2 && (
                      <span className={styles.moreSkills}>
                        +{volunteer.skills.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
                
                <div className={styles.tableCell}>
                  <span className={styles.availabilityTag}>
                    {getAvailabilityText(volunteer.availability)}
                  </span>
                </div>
                
                <div className={styles.tableCell}>
                  {getStatusBadge(volunteer.status)}
                </div>
                
                <div className={styles.tableCell}>
                  <div className={styles.performanceInfo}>
                    <div className={styles.performanceItem}>
                      <span className={styles.performanceNumber}>{volunteer.completedEvents}</span>
                      <span className={styles.performanceLabel}>Events</span>
                    </div>
                    <div className={styles.performanceItem}>
                      <span className={styles.performanceNumber}>{volunteer.totalHours}h</span>
                      <span className={styles.performanceLabel}>Hours</span>
                    </div>
                    {volunteer.rating > 0 && (
                      <div className={styles.rating}>
                        ⭐ {volunteer.rating}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className={styles.tableCell}>
                  <div className={styles.actionButtons}>
                    <button 
                      className={styles.actionButton}
                      onClick={() => setSelectedVolunteer(volunteer)}
                      title="View Details"
                    >
                      👁️
                    </button>
                    <select
                      value={volunteer.status}
                      onChange={(e) => handleStatusChange(volunteer.id, e.target.value)}
                      className={styles.statusSelect}
                      disabled={isLoading}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending</option>
                    </select>
                    <button 
                      className={`${styles.actionButton} ${styles.deleteButton}`}
                      onClick={() => handleDeleteVolunteer(volunteer.id)}
                      title="Remove Volunteer"
                      disabled={isLoading}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {filteredVolunteers.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>👥</div>
            <h3>No volunteers found</h3>
            <p>Try adjusting your search criteria or add new volunteers.</p>
          </div>
        )}
      </div>

      {/* Volunteer Details Modal */}
      {selectedVolunteer && (
        <div className={styles.modalOverlay} onClick={() => setSelectedVolunteer(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Volunteer Details</h3>
              <button 
                className={styles.closeButton}
                onClick={() => setSelectedVolunteer(null)}
              >
                ×
              </button>
            </div>
            <div className={styles.modalContent}>
              <div className={styles.volunteerProfile}>
                <div className={styles.profileAvatar}>
                  {selectedVolunteer.firstName.charAt(0)}{selectedVolunteer.lastName.charAt(0)}
                </div>
                <div className={styles.profileInfo}>
                  <h4>{selectedVolunteer.firstName} {selectedVolunteer.lastName}</h4>
                  <p>{selectedVolunteer.email}</p>
                  <p>{selectedVolunteer.phone}</p>
                </div>
              </div>
              
              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <label>Status</label>
                  <div>{getStatusBadge(selectedVolunteer.status)}</div>
                </div>
                <div className={styles.detailItem}>
                  <label>Availability</label>
                  <div>{getAvailabilityText(selectedVolunteer.availability)}</div>
                </div>
                <div className={styles.detailItem}>
                  <label>Join Date</label>
                  <div>{new Date(selectedVolunteer.joinDate).toLocaleDateString()}</div>
                </div>
                <div className={styles.detailItem}>
                  <label>Completed Events</label>
                  <div>{selectedVolunteer.completedEvents}</div>
                </div>
                <div className={styles.detailItem}>
                  <label>Total Hours</label>
                  <div>{selectedVolunteer.totalHours}</div>
                </div>
                <div className={styles.detailItem}>
                  <label>Rating</label>
                  <div>{selectedVolunteer.rating > 0 ? `⭐ ${selectedVolunteer.rating}` : 'No rating yet'}</div>
                </div>
              </div>
              
              <div className={styles.skillsSection}>
                <label>Skills & Expertise</label>
                <div className={styles.skillsList}>
                  {selectedVolunteer.skills.map((skill, index) => (
                    <span key={index} className={styles.skillTag}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}