'use client';
import { useState, useEffect } from 'react';
import styles from '@/styles/dashboard.module.css';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [dashboardStats, setDashboardStats] = useState({
    totalVolunteers: 0,
    activeEvents: 0,
    pendingAssignments: 0,
    completedTasks: 0
  });

  useEffect(() => {
    // Get current user data
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }

    // Mock dashboard statistics
    setDashboardStats({
      totalVolunteers: 24,
      activeEvents: 8,
      pendingAssignments: 12,
      completedTasks: 156
    });
  }, []);

  const quickActions = [
    {
      title: 'Add New Volunteer',
      description: 'Register a new volunteer to the system',
      icon: '👤',
      action: () => router.push('/dashboard/admin/volunteers'),
      color: '#667eea'
    },
    {
      title: 'Create Event',
      description: 'Set up a new volunteer event',
      icon: '📅',
      action: () => router.push('/dashboard/admin/events'),
      color: '#38a169'
    },
    {
      title: 'Assign Tasks',
      description: 'Assign volunteers to events',
      icon: '📋',
      action: () => router.push('/dashboard/admin/assignments'),
      color: '#d69e2e'
    },
    {
      title: 'View Reports',
      description: 'Generate volunteer activity reports',
      icon: '📊',
      action: () => alert('Reports feature coming soon!'),
      color: '#9f7aea'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'volunteer_joined',
      message: 'Sarah Johnson joined as a volunteer',
      timestamp: '2 hours ago',
      icon: '👤'
    },
    {
      id: 2,
      type: 'event_completed',
      message: 'Community Clean-up Drive completed successfully',
      timestamp: '5 hours ago',
      icon: '✅'
    },
    {
      id: 3,
      type: 'assignment_created',
      message: 'John Doe assigned to Food Distribution event',
      timestamp: '1 day ago',
      icon: '📋'
    },
    {
      id: 4,
      type: 'event_created',
      message: 'New event "Tree Plantation Drive" created',
      timestamp: '2 days ago',
      icon: '🌱'
    }
  ];

  return (
    <div className={styles.dashboardContent}>
      <div className={styles.welcomeSection}>
        <div className={styles.welcomeText}>
          <h1>Welcome back, {currentUser?.firstName || 'Admin'}! 👋</h1>
          <p>Here's what's happening with your volunteer community today.</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: '#667eea' }}>
            👥
          </div>
          <div className={styles.statContent}>
            <h3>{dashboardStats.totalVolunteers}</h3>
            <p>Total Volunteers</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: '#38a169' }}>
            📅
          </div>
          <div className={styles.statContent}>
            <h3>{dashboardStats.activeEvents}</h3>
            <p>Active Events</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: '#d69e2e' }}>
            ⏳
          </div>
          <div className={styles.statContent}>
            <h3>{dashboardStats.pendingAssignments}</h3>
            <p>Pending Assignments</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: '#38a169' }}>
            ✅
          </div>
          <div className={styles.statContent}>
            <h3>{dashboardStats.completedTasks}</h3>
            <p>Completed Tasks</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Quick Actions</h2>
        <div className={styles.quickActionsGrid}>
          {quickActions.map((action, index) => (
            <div 
              key={index}
              className={styles.quickActionCard}
              onClick={action.action}
            >
              <div 
                className={styles.quickActionIcon}
                style={{ backgroundColor: action.color }}
              >
                {action.icon}
              </div>
              <div className={styles.quickActionContent}>
                <h3>{action.title}</h3>
                <p>{action.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Recent Activities</h2>
        <div className={styles.activityList}>
          {recentActivities.map((activity) => (
            <div key={activity.id} className={styles.activityItem}>
              <div className={styles.activityIcon}>
                {activity.icon}
              </div>
              <div className={styles.activityContent}>
                <p>{activity.message}</p>
                <span className={styles.activityTime}>{activity.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
