'use client';
import { useState, useEffect } from 'react';
import styles from '@/styles/dashboard.module.css';
import { useRouter } from 'next/navigation';
import NotificationSystem from '@/components/NotificationSystem';

 function VolunteerLayout({ children }) {
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
          <h2>Volunteer Portal</h2>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>
              {currentUser?.firstName?.charAt(0) || 'V'}
            </div>
            <span className={styles.userName}>
              {currentUser?.firstName || 'Volunteer'}
            </span>
          </div>
        </div>
        
        <nav className={styles.navigation}>
          <button 
            onClick={() => router.push('/dashboard/volunteer')}
            className={styles.navButton}
          >
            <span className={styles.navIcon}></span>
            Dashboard
          </button>
          <button 
            onClick={() => router.push('/dashboard/volunteer/my-events')}
            className={styles.navButton}
          >
            <span className={styles.navIcon}></span>
            My Assignments
          </button>
          <button 
            onClick={() => router.push('/dashboard/volunteer/profile')}
            className={styles.navButton}
          >
            <span className={styles.navIcon}></span>
            My Profile
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
            <h1 className={styles.pageTitle}>Volunteer Dashboard</h1>
          </div>
          <div className={styles.topBarRight}>
            <NotificationSystem userRole="volunteer" />
          </div>
        </header>

        <main className={styles.main}>
          {children}
        </main>
      </div>
    </div>
  );
}
export default VolunteerLayout;
