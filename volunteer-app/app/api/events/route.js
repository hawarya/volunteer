// app/api/events/route.js

import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { ObjectId } from 'mongodb';

export async function GET() {
  const db = await connectDB();
  const events = await db.collection('events').find({}).toArray();
  return NextResponse.json(events);
}

export async function POST(req) {
  const db = await connectDB();
  const body = await req.json();

  if (!body.name || !body.date || !body.location) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const result = await db.collection('events').insertOne(body);
  return NextResponse.json({ message: 'Event added', id: result.insertedId });
}

export async function PUT(req) {
  const db = await connectDB();
  const body = await req.json();

  if (!body._id) {
    return NextResponse.json({ error: 'Missing event ID' }, { status: 400 });
  }

  const id = new ObjectId(body._id);
  delete body._id;

  await db.collection('events').updateOne({ _id: id }, { $set: body });
  return NextResponse.json({ message: 'Event updated' });
}

export async function DELETE(req) {
  const db = await connectDB();
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ error: 'Missing event ID' }, { status: 400 });
  }

  await db.collection('events').deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ message: 'Event deleted' });
}