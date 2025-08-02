'use client';
import { useEffect, useState } from 'react';
import styles from '@/styles/profile.module.css';

export default function VolunteerProfilePage() {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
   
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const user = JSON.parse(userData);
      const mockProfile = {
        firstName: user.firstName || 'Aishwarya',
        lastName: user.lastName || 'Vijayakumar',
        email: user.email || 'aish@gmail.com',
        phone: user.phone || '9876543210',
        skills: user.skills || 'Event Management, Communication, Leadership',
        availability: user.availability || 'weekends',
        joinDate: '2024-01-15',
        totalHours: 48,
        completedEvents: 12,
        rating: 4.8,
        bio: 'Passionate volunteer dedicated to making a positive impact in the community. I enjoy organizing events and helping others.',
        address: '123 Main Street, City, State 12345',
        emergencyContact: '9876543211',
        interests: ['Environment', 'Education', 'Community Service', 'Youth Development']
      };
      setProfile(mockProfile);
      setEditedProfile(mockProfile);
    }
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsLoading(true);
    
   
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setProfile(editedProfile);
    setIsEditing(false);
    setIsLoading(false);
    
   
    const userData = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const updatedUser = { ...userData, ...editedProfile };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!profile) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <div className={styles.profileHeaderContent}>
          <div className={styles.avatarSection}>
            <div className={styles.avatar}>
              {profile.firstName?.charAt(0)}{profile.lastName?.charAt(0)}
            </div>
            <div className={styles.profileBasicInfo}>
              <h1>{profile.firstName} {profile.lastName}</h1>
              <p className={styles.memberSince}>Member since {new Date(profile.joinDate).toLocaleDateString()}</p>
              <div className={styles.rating}>
                <span className={styles.stars}>
                  {'★'.repeat(Math.floor(profile.rating))}{'☆'.repeat(5 - Math.floor(profile.rating))}
                </span>
                <span className={styles.ratingValue}>{profile.rating}/5.0</span>
              </div>
            </div>
          </div>
          <div className={styles.profileActions}>
            {!isEditing ? (
              <button onClick={handleEdit} className={styles.editButton}>
                <span className={styles.buttonIcon}>✏️</span>
                Edit Profile
              </button>
            ) : (
              <div className={styles.editActions}>
                <button 
                  onClick={handleSave} 
                  className={`${styles.saveButton} ${isLoading ? styles.loading : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
                <button onClick={handleCancel} className={styles.cancelButton}>
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.profileContent}>
        {/* Statistics Cards */}
        <div className={styles.statsSection}>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ backgroundColor: '#667eea' }}>⏰</div>
            <div className={styles.statContent}>
              <h3>{profile.totalHours}</h3>
              <p>Total Hours</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ backgroundColor: '#38a169' }}>✅</div>
            <div className={styles.statContent}>
              <h3>{profile.completedEvents}</h3>
              <p>Events Completed</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ backgroundColor: '#d69e2e' }}>⭐</div>
            <div className={styles.statContent}>
              <h3>{profile.rating}</h3>
              <p>Average Rating</p>
            </div>
          </div>
        </div>

        <div className={styles.profileSections}>
    
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Personal Information</h2>
            <div className={styles.sectionContent}>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <label>First Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className={styles.input}
                    />
                  ) : (
                    <span>{profile.firstName}</span>
                  )}
                </div>
                <div className={styles.infoItem}>
                  <label>Last Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className={styles.input}
                    />
                  ) : (
                    <span>{profile.lastName}</span>
                  )}
                </div>
                <div className={styles.infoItem}>
                  <label>Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedProfile.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={styles.input}
                    />
                  ) : (
                    <span>{profile.email}</span>
                  )}
                </div>
                <div className={styles.infoItem}>
                  <label>Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editedProfile.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={styles.input}
                    />
                  ) : (
                    <span>{profile.phone}</span>
                  )}
                </div>
                <div className={styles.infoItem}>
                  <label>Address</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className={styles.input}
                    />
                  ) : (
                    <span>{profile.address}</span>
                  )}
                </div>
                <div className={styles.infoItem}>
                  <label>Emergency Contact</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.emergencyContact}
                      onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                      className={styles.input}
                    />
                  ) : (
                    <span>{profile.emergencyContact}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>About Me</h2>
            <div className={styles.sectionContent}>
              {isEditing ? (
                <textarea
                  value={editedProfile.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  className={styles.textarea}
                  rows="4"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className={styles.bio}>{profile.bio}</p>
              )}
            </div>
          </div>

          {/* Skills and Availability */}
          <div className={styles.twoColumnSection}>
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Skills & Expertise</h2>
              <div className={styles.sectionContent}>
                {isEditing ? (
                  <textarea
                    value={editedProfile.skills}
                    onChange={(e) => handleInputChange('skills', e.target.value)}
                    className={styles.textarea}
                    rows="3"
                    placeholder="List your skills separated by commas"
                  />
                ) : (
                  <div className={styles.skillTags}>
                    {profile.skills.split(',').map((skill, index) => (
                      <span key={index} className={styles.skillTag}>
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Availability</h2>
              <div className={styles.sectionContent}>
                {isEditing ? (
                  <select
                    value={editedProfile.availability}
                    onChange={(e) => handleInputChange('availability', e.target.value)}
                    className={styles.select}
                  >
                    <option value="weekdays">Weekdays</option>
                    <option value="weekends">Weekends</option>
                    <option value="both">Both Weekdays & Weekends</option>
                    <option value="flexible">Flexible</option>
                  </select>
                ) : (
                  <div className={styles.availabilityBadge}>
                    {profile.availability.charAt(0).toUpperCase() + profile.availability.slice(1)}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Interests */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Areas of Interest</h2>
            <div className={styles.sectionContent}>
              <div className={styles.interestTags}>
                {profile.interests.map((interest, index) => (
                  <span key={index} className={styles.interestTag}>
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
