import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { getUsersCollection, getSessionsCollection } from '@/lib/mongodb';

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

    const body = await request.json();
    const { sessionId } = body;

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    const users = await getUsersCollection();
    const sessions = await getSessionsCollection();

    // Get current user
    const user = await users.findOne({ _id: userSession.id as any });
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Find the session
    const session = await sessions.findOne({ 
      _id: sessionId as any,
      userId: user._id as any,
      completed: false
    });

    if (!session) {
      return NextResponse.json(
        { error: 'Active session not found' },
        { status: 404 }
      );
    }

    // Check if user still has lives
    if (user.livesToday <= 0) {
      return NextResponse.json({
        success: false,
        error: 'No lives remaining',
        livesRemaining: 0,
        sessionEnded: true
      });
    }

    // Deduct a life
    const newLivesCount = Math.max(0, user.livesToday - 1);
    const isNowBlocked = newLivesCount === 0;

    // Update user lives
    await users.updateOne(
      { _id: user._id },
      { 
        $set: { 
          livesToday: newLivesCount,
          isBlockedToday: isNowBlocked
        }
      }
    );

    // Update session to track lives lost
    await sessions.updateOne(
      { _id: session._id },
      { 
        $inc: { livesLostDuringSession: 1 }
      }
    );

    // If no lives left, end the session
    if (isNowBlocked) {
      await sessions.updateOne(
        { _id: session._id },
        { 
          $set: { 
            endTime: new Date(),
            completed: false // Session was not completed successfully
          }
        }
      );

      return NextResponse.json({
        success: true,
        livesRemaining: 0,
        message: 'Life deducted. You are now blocked for today.',
        sessionEnded: true,
        blocked: true
      });
    }

    return NextResponse.json({
      success: true,
      livesRemaining: newLivesCount,
      message: `Life deducted for losing focus. ${newLivesCount} lives remaining.`,
      sessionEnded: false,
      blocked: false
    });

  } catch (error) {
    console.error('Pomodoro violation error:', error);
    return NextResponse.json(
      { error: 'Failed to process violation' },
      { status: 500 }
    );
  }
}