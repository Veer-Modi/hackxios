import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { getSessionsCollection } from '@/lib/mongodb';
import { PomodoroSession } from '@/models/pomodoroSession';

export async function GET(request: NextRequest) {
  try {
    const userSession = await getUserFromRequest(request);
    if (!userSession) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const sessions = await getSessionsCollection();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Get user's sessions from last 30 days
    const userSessions = await sessions.find({
      userId: userSession.id as any,
      createdAt: { $gte: thirtyDaysAgo }
    }).sort({ createdAt: -1 }).toArray();

    return NextResponse.json(userSessions);
  } catch (error) {
    console.error('Error fetching sessions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sessions' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userSession = await getUserFromRequest(request);
    if (!userSession) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const sessionData = await request.json();
    const sessions = await getSessionsCollection();

    const newSession: PomodoroSession = {
      userId: userSession.id as any,
      startTime: sessionData.startTime ? new Date(sessionData.startTime) : new Date(),
      minutesFocused: sessionData.minutesFocused || 0,
      livesLostDuringSession: sessionData.livesLostDuringSession || 0,
      focusScore: sessionData.focusScore || 0,
      completed: sessionData.completed || false,
      createdAt: new Date()
    };

    const result = await sessions.insertOne(newSession);
    const insertedSession = await sessions.findOne({ _id: result.insertedId as any });

    return NextResponse.json(insertedSession, { status: 201 });
  } catch (error) {
    console.error('Error creating session:', error);
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const userSession = await getUserFromRequest(request);
    if (!userSession) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const sessionData = await request.json();
    const sessions = await getSessionsCollection();

    if (!sessionData._id) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    const { _id, userId, createdAt, ...updateData } = sessionData;

    // Convert date strings to Date objects if present
    if (updateData.startTime) updateData.startTime = new Date(updateData.startTime);
    if (updateData.endTime) updateData.endTime = new Date(updateData.endTime);

    const result = await sessions.updateOne(
      { _id: sessionData._id as any, userId: userSession.id as any },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    const updatedSession = await sessions.findOne({ _id: sessionData._id as any });
    return NextResponse.json(updatedSession);
  } catch (error) {
    console.error('Error updating session:', error);
    return NextResponse.json(
      { error: 'Failed to update session' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const userSession = await getUserFromRequest(request);
    if (!userSession) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    const sessions = await getSessionsCollection();
    const result = await sessions.deleteOne({
      _id: id as any,
      userId: userSession.id as any
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Session deleted successfully' });
  } catch (error) {
    console.error('Error deleting session:', error);
    return NextResponse.json(
      { error: 'Failed to delete session' },
      { status: 500 }
    );
  }
}