import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { getUsersCollection, getSessionsCollection } from '@/lib/mongodb';
import { PomodoroSession } from '@/models/PomodoroSession';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const userSession = await getUserFromRequest(request);
    if (!userSession) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const users = await getUsersCollection();
    const sessions = await getSessionsCollection();

    // Get current user data
    const user = await users.findOne({ _id: userSession.id as any });
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if user has lives remaining
    if (user.livesToday <= 0 || user.isBlockedToday) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      return NextResponse.json({
        success: false,
        error: 'No lives remaining',
        livesRemaining: 0,
        canStart: false,
        blockedUntil: tomorrow.toISOString()
      });
    }

    // Check if user already has an active session
    const activeSession = await sessions.findOne({
      userId: user._id as any,
      completed: false,
      endTime: { $exists: false }
    });

    if (activeSession) {
      return NextResponse.json({
        success: false,
        error: 'You already have an active session',
        sessionId: activeSession._id,
        livesRemaining: user.livesToday
      });
    }

    // Create new Pomodoro session
    const newSession: PomodoroSession = {
      userId: user._id as any,
      startTime: new Date(),
      minutesFocused: 0,
      livesLostDuringSession: 0,
      focusScore: 0,
      completed: false,
      createdAt: new Date()
    };

    const result = await sessions.insertOne(newSession);

    return NextResponse.json({
      success: true,
      sessionId: result.insertedId.toString(),
      livesRemaining: user.livesToday,
      canStart: true,
      message: 'Pomodoro session started successfully'
    });

  } catch (error) {
    console.error('Start Pomodoro error:', error);
    return NextResponse.json(
      { error: 'Failed to start Pomodoro session' },
      { status: 500 }
    );
  }
}