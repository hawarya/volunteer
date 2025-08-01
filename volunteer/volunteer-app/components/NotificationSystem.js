'use client';
import { useState, useEffect } from 'react';
import styles from './NotificationSystem.module.css';

export default function NotificationSystem({ userRole }) {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Generate mock notifications based on user role
    const generateNotifications = () => {
      const currentTime = new Date();
      const mockNotifications = [];

      if (userRole === 'admin') {
        mockNotifications.push(
          {
            id: 1,
            type: 'new_volunteer',
            title: 'New Volunteer Registration',
            message: 'Sarah Johnson has registered as a volunteer',
            time: new Date(currentTime - 5 * 60000).toISOString(), // 5 minutes ago
            read: false,
            icon: '👤'
          },
          {
            id: 2,
            type: 'event_update',
            title: 'Event Capacity Reached',
            message: 'Community Clean-up Drive has reached maximum volunteers',
            time: new Date(currentTime - 30 * 60000).toISOString(), // 30 minutes ago
            read: false,
            icon: '📅'
          },
          {
            id: 3,
           type: 'volunteer_update',
            title: 'Volunteer Profile Updated',
            message: 'Mike Chen updated his availability status',
             time: new Date(currentTime - 2 * 60 * 60000).toISOString(), // 2 hours ago
            read: true,
            icon: '✏️'
          },
          {
            id: 4,
          type: 'system',
            title: 'System Maintenance',
            message: 'Scheduled maintenance completed successfully',
              time: new Date(currentTime - 24 * 60 * 60000).toISOString(), // 1 day ago
            read: true,
            icon: '🔧'
          }
        );
      } else {
        mockNotifications.push(
          {
            id: 1,
            type: 'assignment',
            title: 'New Work Assignment',
            message: 'You have been assigned to "Food Bank Volunteer Drive"',
            time: new Date(currentTime - 10 * 60000).toISOString(), // 10 minutes ago
            read: false,
            icon: '📋'
          },
          {
            id: 2,
            type: 'reminder',
            title: 'Event Reminder',
            message: 'Community Clean-up Drive starts tomorrow at 9:00 AM',
            time: new Date(currentTime - 45 * 60000).toISOString(), // 45 minutes ago
            read: false,
            icon: '⏰'
          },
          {
            id: 3,
            type: 'update',
            title: 'Event Update',
            message: 'Meeting location changed for Tree Planting Event',
            time: new Date(currentTime - 3 * 60 * 60000).toISOString(), // 3 hours ago
            read: true,
            icon: '📍'
          },
          {
            id: 4,
            type: 'appreciation',
            title: 'Thank You!',
            message: 'Great job on completing the Library Reading Program!',
            time: new Date(currentTime - 2 * 24 * 60 * 60000).toISOString(), // 2 days ago
            read: true,
            icon: '🎉'
          }
        );
      }

      setNotifications(mockNotifications);
      setUnreadCount(mockNotifications.filter(n => !n.read).length);
    };

    generateNotifications();
  }, [userRole]);

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  };

  const clearNotification = (notificationId) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== notificationId)
    );
    const notification = notifications.find(n => n.id === notificationId);
    if (notification && !notification.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const getNotificationTypeColor = (type) => {
    const colors = {
      assignment: '#667eea',
      reminder: '#f6ad55',
      update: '#4299e1',
      appreciation: '#48bb78',
      new_volunteer: '#38a169',
      event_update: '#ed8936',
      volunteer_update: '#4299e1',
      system: '#718096'
    };
    return colors[type] || '#718096';
  };

  return (
    <div className={styles.notificationContainer}>
      <button 
        className={styles.notificationButton}
        onClick={toggleNotifications}
        aria-label="Notifications"
      >
        <span className={styles.bellIcon}>🔔</span>
        {unreadCount > 0 && (
          <span className={styles.badge}>{unreadCount > 99 ? '99+' : unreadCount}</span>
        )}
      </button>

      {isOpen && (
        <>
          <div className={styles.overlay} onClick={() => setIsOpen(false)} />
          <div className={styles.notificationPanel}>
            <div className={styles.panelHeader}>
              <h3 className={styles.panelTitle}>Notifications</h3>
              {unreadCount > 0 && (
                <button 
                  className={styles.markAllButton}
                  onClick={markAllAsRead}
                >
                  Mark all as read
                </button>
              )}
            </div>

            <div className={styles.notificationList}>
              {notifications.length === 0 ? (
                <div className={styles.emptyState}>
                  <span className={styles.emptyIcon}>📭</span>
                  <p>No notifications yet</p>
                </div>
              ) : (
                notifications.map(notification => (
                  <div 
                    key={notification.id}
                    className={`${styles.notificationItem} ${!notification.read ? styles.unread : ''}`}
                    onClick={() => !notification.read && markAsRead(notification.id)}
                  >
                    <div className={styles.notificationContent}>
                      <div className={styles.notificationHeader}>
                        <span 
                          className={styles.notificationIcon}
                          style={{ backgroundColor: getNotificationTypeColor(notification.type) }}
                        >
                          {notification.icon}
                        </span>
                        <div className={styles.notificationMeta}>
                          <h4 className={styles.notificationTitle}>{notification.title}</h4>
                          <span className={styles.notificationTime}>
                            {formatTimeAgo(notification.time)}
                          </span>
                        </div>
                        <button
                          className={styles.closeButton}
                          onClick={(e) => {
                            e.stopPropagation();
                            clearNotification(notification.id);
                          }}
                          aria-label="Clear notification"
                        >
                          ×
                        </button>
                      </div>
                      <p className={styles.notificationMessage}>{notification.message}</p>
                    </div>
                    {!notification.read && <div className={styles.unreadDot} />}
                  </div>
                ))
              )}
            </div>

            {notifications.length > 0 && (
              <div className={styles.panelFooter}>
                <button className={styles.viewAllButton}>
                  View All Notifications
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}