'use client';
import { useState, useEffect } from 'react';
import styles from '@/styles/dashboard.module.css';
import { useRouter } from 'next/navigation';

export default function VolunteerDashboard() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [volunteerStats, setVolunteerStats] = useState({
    assignedTasks: 0,
    completedTasks: 0,
    upcomingEvents: 0,
    totalHours: 0
  });

  useEffect(() => {
    // Get current user data
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }

    // Mock volunteer statistics
    setVolunteerStats({
      assignedTasks: 3,
      completedTasks: 12,
      upcomingEvents: 2,
      totalHours: 48
    });
  }, []);

  const upcomingTasks = [
    {
      id: 1,
      title: 'Food Distribution Drive',
      date: '2024-12-15',
      time: '09:00 AM',
      location: 'Community Center',
      status: 'assigned',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Tree Plantation Event',
      date: '2024-12-18',
      time: '07:00 AM',
      location: 'City Park',
      status: 'assigned',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Educational Workshop',
      date: '2024-12-20',
      time: '02:00 PM',
      location: 'School Auditorium',
      status: 'pending',
      priority: 'low'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'task_assigned',
      message: 'You were assigned to Food Distribution Drive',
      timestamp: '1 hour ago',
      icon: '🎯'
    },
    {
      id: 2,
      type: 'task_completed',
      message: 'Community Clean-up Drive completed successfully',
      timestamp: '2 days ago',
      icon: '✅'
    },
    {
      id: 3,
      type: 'profile_updated',
      message: 'Your volunteer profile was updated',
      timestamp: '1 week ago',
      icon: '👤'
    }
  ];

  const quickActions = [
    {
      title: 'View My Tasks',
      description: 'Check your assigned volunteer tasks',
      icon: '📋',
      action: () => router.push('/dashboard/volunteer/my-events'),
      color: '#667eea'
    },
    {
      title: 'Update Profile',
      description: 'Edit your volunteer information',
      icon: '👤',
      action: () => router.push('/dashboard/volunteer/profile'),
      color: '#38a169'
    },
    {
      title: 'View Schedule',
      description: 'Check your volunteer schedule',
      icon: '📅',
      action: () => alert('Schedule feature coming soon!'),
      color: '#d69e2e'
    },
    {
      title: 'Contact Admin',
      description: 'Get in touch with administrators',
      icon: '💬',
      action: () => alert('Contact feature coming soon!'),
      color: '#9f7aea'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#e53e3e';
      case 'medium': return '#d69e2e';
      case 'low': return '#38a169';
      default: return '#718096';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'assigned': return '#667eea';
      case 'pending': return '#d69e2e';
      case 'completed': return '#38a169';
      default: return '#718096';
    }
  };

  return (
    <div className={styles.dashboardContent}>
      <div className={styles.welcomeSection}>
        <div className={styles.welcomeText}>
          <h1>Welcome back, {currentUser?.firstName || 'Volunteer'}! 🌟</h1>
          <p>Thank you for your dedication to making a difference in our community.</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: '#667eea' }}>
            📋
          </div>
          <div className={styles.statContent}>
            <h3>{volunteerStats.assignedTasks}</h3>
            <p>Assigned Tasks</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: '#38a169' }}>
            ✅
          </div>
          <div className={styles.statContent}>
            <h3>{volunteerStats.completedTasks}</h3>
            <p>Completed Tasks</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: '#d69e2e' }}>
            📅
          </div>
          <div className={styles.statContent}>
            <h3>{volunteerStats.upcomingEvents}</h3>
            <p>Upcoming Events</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: '#9f7aea' }}>
            ⏰
          </div>
          <div className={styles.statContent}>
            <h3>{volunteerStats.totalHours}</h3>
            <p>Total Hours</p>
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

      <div className={styles.twoColumnLayout}>
        {/* Upcoming Tasks */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Upcoming Tasks</h2>
          <div className={styles.taskList}>
            {upcomingTasks.map((task) => (
              <div key={task.id} className={styles.taskCard}>
                <div className={styles.taskHeader}>
                  <h3 className={styles.taskTitle}>{task.title}</h3>
                  <div className={styles.taskBadges}>
                    <span 
                      className={styles.priorityBadge}
                      style={{ backgroundColor: getPriorityColor(task.priority) }}
                    >
                      {task.priority}
                    </span>
                    <span 
                      className={styles.statusBadge}
                      style={{ backgroundColor: getStatusColor(task.status) }}
                    >
                      {task.status}
                    </span>
                  </div>
                </div>
                <div className={styles.taskDetails}>
                  <div className={styles.taskDetail}>
                    <span className={styles.taskIcon}>📅</span>
                    <span>{task.date}</span>
                  </div>
                  <div className={styles.taskDetail}>
                    <span className={styles.taskIcon}>⏰</span>
                    <span>{task.time}</span>
                  </div>
                  <div className={styles.taskDetail}>
                    <span className={styles.taskIcon}>📍</span>
                    <span>{task.location}</span>
                  </div>
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
    </div>
  );
}
