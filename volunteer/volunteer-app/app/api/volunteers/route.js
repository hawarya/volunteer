// app/api/volunteers/route.js
import { connectDB } from '@/lib/db';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

const volunteerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  role: String
});

const Volunteer = mongoose.models.Volunteer || mongoose.model('Volunteer', volunteerSchema);

export async function GET() {
  await connectDB();
  const volunteers = await Volunteer.find();
  return NextResponse.json(volunteers);
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const newVolunteer = new Volunteer(data);
  const saved = await newVolunteer.save();
  return NextResponse.json(saved);
}

export async function PUT(req) {
  await connectDB();
  const data = await req.json();
  const { _id, ...rest } = data;
  const updated = await Volunteer.findByIdAndUpdate(_id, rest, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(req) {
  await connectDB();
  const { id } = await req.json();
  await Volunteer.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Volunteer deleted' });
}
