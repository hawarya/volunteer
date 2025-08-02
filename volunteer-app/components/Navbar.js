// components/Navbar.js
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Navbar({ role }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <nav style={{ padding: '10px', backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <h3>Volunteer Assignment Tool</h3>
      </div>
      <div>
        {role === 'admin' && (
          <>
            <button onClick={() => router.push('/dashboard/admin/volunteers')} style={{ marginRight: '10px' }}>Volunteers</button>
            <button onClick={() => router.push('/dashboard/admin/events')} style={{ marginRight: '10px' }}>Events</button>
            <button onClick={() => router.push('/dashboard/admin/assignments')} style={{ marginRight: '10px' }}>Assignments</button>
          </>
        )}
        {role === 'volunteer' && (
          <>
            <button onClick={() => router.push('/dashboard/volunteer/my-events')} style={{ marginRight: '10px' }}>My Events</button>
            <button onClick={() => router.push('/dashboard/volunteer/profile')} style={{ marginRight: '10px' }}>Profile</button>
          </>
        )}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}
