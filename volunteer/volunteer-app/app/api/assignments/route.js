"use server";

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { ObjectId } from "mongodb";

// GET all assignments
export async function GET() {
  try {
    const db = await connectDB();
    const assignments = await db.collection("assignments").find({}).toArray();
    return NextResponse.json(assignments);
  } catch (error) {
    return NextResponse.json({ message: "Failed to get assignments", error }, { status: 500 });
  }
}

// POST create a new assignment
export async function POST(request) {
  try {
    const body = await request.json();
    const db = await connectDB();

    const { volunteerId, eventId, task } = body;
    if (!volunteerId || !eventId || !task) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const result = await db.collection("assignments").insertOne({
      volunteerId: new ObjectId(volunteerId),
      eventId: new ObjectId(eventId),
      task,
      assignedAt: new Date(),
    });

    return NextResponse.json({ message: "Assignment created", id: result.insertedId });
  } catch (error) {
    return NextResponse.json({ message: "Failed to assign task", error }, { status: 500 });
  }
}

// DELETE an assignment by id
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const db = await connectDB();
    await db.collection("assignments").deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ message: "Assignment deleted" });
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete assignment", error }, { status: 500 });
  }
}
