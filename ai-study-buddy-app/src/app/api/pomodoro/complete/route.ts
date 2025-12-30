import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest, calculateStreaks } from '@/lib/auth';
import { getUsersCollection, getSessionsCollection, getDailyStatsCollection } from '@/lib/mongodb';
import { DailyStats } from '@/models/dailyStats';

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
    const { sessionId, minutesFocused, livesRemaining } = body;

    // Validate input
    if (!sessionId || typeof minutesFocused !== 'number' || typeof livesRemaining !== 'number') {
      return NextResponse.json(
        { error: 'Session ID, minutes focused, and lives remaining are required' },
        { status: 400 }
      );
    }

    if (minutesFocused < 0 || minutesFocused > 25) {
      return NextResponse.json(
        { error: 'Minutes focused must be between 0 and 25' },
        { status: 400 }
      );
    }

    const users = await getUsersCollection();
    const sessions = await getSessionsCollection();
    const dailyStats = await getDailyStatsCollection();

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

    // Calculate focus score: (minutesFocused × 10) + (remainingLives × 20)
    const focusScore = (minutesFocused * 10) + (livesRemaining * 20);
    const isPerfectSession = session.livesLostDuringSession === 0;

    // Update session as completed
    await sessions.updateOne(
      { _id: session._id },
      { 
        $set: { 
          endTime: new Date(),
          minutesFocused,
          focusScore,
          completed: true
        }
      }
    );

    // Get or create today's stats
    const today = new Date().toISOString().split('T')[0];
    let todayStats = await dailyStats.findOne({ 
      userId: user._id as any, 
      date: today 
    });

    if (!todayStats) {
      // Create new daily stats
      const newStats: DailyStats = {
        userId: user._id as any,
        date: today,
        sessionsCompleted: 1,
        totalFocusScore: focusScore,
        livesLost: session.livesLostDuringSession,
        perfectSessions: isPerfectSession ? 1 : 0,
        focusTimeMinutes: minutesFocused,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const insertResult = await dailyStats.insertOne(newStats);
      todayStats = await dailyStats.findOne({ _id: insertResult.insertedId as any });
    } else {
      // Update existing daily stats
      await dailyStats.updateOne(
        { _id: todayStats._id },
        { 
          $inc: {
            sessionsCompleted: 1,
            totalFocusScore: focusScore,
            perfectSessions: isPerfectSession ? 1 : 0,
            focusTimeMinutes: minutesFocused
          },
          $set: {
            updatedAt: new Date()
          }
        }
      );

      // Get updated stats
      todayStats = await dailyStats.findOne({ _id: todayStats._id });
    }

    // Calculate streaks
    const completedSessionsToday = (todayStats?.sessionsCompleted || 0);
    const { newDailyStreak, newFocusStreak } = calculateStreaks(user, completedSessionsToday);

    // Check for focus streak (3+ perfect sessions in a day)
    let updatedFocusStreak = user.focusStreak;
    if (todayStats && todayStats.perfectSessions >= 3 && todayStats.livesLost === 0) {
      updatedFocusStreak = newFocusStreak + 1;
    } else if (todayStats && todayStats.livesLost > 0) {
      updatedFocusStreak = 0; // Reset if any lives lost today
    }

    // Update user stats
    await users.updateOne(
      { _id: user._id },
      { 
        $inc: {
          totalSessions: 1,
          totalFocusTime: minutesFocused
        },
        $set: {
          dailyStreak: newDailyStreak,
          focusStreak: updatedFocusStreak,
          lastActiveDate: new Date()
        }
      }
    );

    // Calculate new rank (simplified - could be more sophisticated)
    const userRank = await dailyStats.countDocuments({
      date: today,
      totalFocusScore: { $gt: todayStats?.totalFocusScore || 0 }
    }) + 1;

    return NextResponse.json({
      success: true,
      focusScore,
      isPerfectSession,
      sessionsToday: completedSessionsToday,
      streakUpdated: newDailyStreak > user.dailyStreak,
      newRank: userRank,
      dailyStreak: newDailyStreak,
      focusStreak: updatedFocusStreak,
      message: 'Pomodoro session completed successfully!'
    });

  } catch (error) {
    console.error('Complete Pomodoro error:', error);
    return NextResponse.json(
      { error: 'Failed to complete Pomodoro session' },
      { status: 500 }
    );
  }
}
