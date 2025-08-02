'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import styles from './page.module.css';

export default function HomePage() {
 

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            Volunteer Management System
          </h1>
          <p className={styles.subtitle}>
            Connecting volunteers with meaningful opportunities to make a difference in their communities.
          </p>
          <div className={styles.features}>
            <div className={styles.feature}>
              <span className={styles.featureIcon}></span>
              <span>Manage Volunteers</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}></span>
              <span>Organize Events</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}></span>
              <span>Track Assignments</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}></span>
              <span>Generate Reports</span>
            </div>
          </div>
          <div className={styles.actions}>
            <Link href="/login" className={styles.primaryButton}>
              Sign In
            </Link>
            <Link href="/signup" className={styles.secondaryButton}>
              Create Account
            </Link>
          </div>
        </div>
      </div>
      
      <div className={styles.infoSection}>
        <div className={styles.infoContent}>
          <div className={styles.infoCard}>
            <h3>For Administrators</h3>
            <p>Efficiently manage volunteers, create events, assign tasks, and track progress all in one place.</p>
            <ul>
              <li>Volunteer registration and management</li>
              <li>Event creation and scheduling</li>
              <li>Task assignment and tracking</li>
              <li>Real-time notifications</li>
            </ul>
          </div>
          <div className={styles.infoCard}>
            <h3>For Volunteers</h3>
            <p>Stay connected with your volunteer activities, view assignments, and track your impact.</p>
            <ul>
              <li>View assigned tasks and events</li>
              <li>Update your profile and skills</li>
              <li>Track volunteer hours</li>
              <li>Receive notifications</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
