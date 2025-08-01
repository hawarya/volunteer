'use client';
import { useState, useEffect } from 'react';
import styles from '@/styles/dashboard.module.css';
import { useRouter } from 'next/navigation';
import NotificationSystem from '@/components/NotificationSystem';

 function AdminLayout({ children }) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    router.push('/login');
  };

  return (
    <div className={styles.dashboardLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>Admin Panel</h2>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>
              {currentUser?.firstName?.charAt(0) || 'A'}
            </div>
            <span className={styles.userName}>
              {currentUser?.firstName || 'Admin'}
            </span>
          </div>
        </div>
        
        <nav className={styles.navigation}>
          <button 
            onClick={() => router.push('/dashboard/admin')}
            className={styles.navButton}
          >
            <span className={styles.navIcon}>🏠</span>
            Dashboard
          </button>
          <button 
            onClick={() => router.push('/dashboard/admin/volunteers')}
            className={styles.navButton}
          >
            <span className={styles.navIcon}>👥</span>
            Manage Volunteers
          </button>
          <button 
            onClick={() => router.push('/dashboard/admin/events')}
            className={styles.navButton}
          >
            <span className={styles.navIcon}>📅</span>
            Manage Events
          </button>
          <button 
            onClick={() => router.push('/dashboard/admin/assignments')}
            className={styles.navButton}
          >
            <span className={styles.navIcon}>📋</span>
            Assign Work
          </button>
        </nav>

        <div className={styles.sidebarFooter}>
          <button onClick={handleLogout} className={styles.logoutButton}>
            <span className={styles.navIcon}>🚪</span>
            Logout
          </button>
        </div>
      </aside>

      <div className={styles.mainContent}>
        <header className={styles.topBar}>
          <div className={styles.topBarLeft}>
            <h1 className={styles.pageTitle}>Admin Dashboard</h1>
          </div>
          <div className={styles.topBarRight}>
            <NotificationSystem userRole="admin" />
          </div>
        </header>

        <main className={styles.main}>
          {children}
        </main>
      </div>
    </div>
  );
}
 
export default AdminLayout;