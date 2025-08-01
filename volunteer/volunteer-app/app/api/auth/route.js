import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';

const dummyUsers = [
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'volunteer', password: 'vol123', role: 'volunteer' },
];

export async function POST(req) {
  const { username, password, role } = await req.json();

  const user = dummyUsers.find(
    (u) => u.username === username && u.password === password && u.role === role
  );

  if (user) {
    return NextResponse.json({ success: true, role: user.role });
  } else {
    return NextResponse.json({ success: false, message: 'Invalid credentials' });
  }
}
