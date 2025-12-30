import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { getDailyStatsCollection } from '@/lib/mongodb';
import { DailyStats } from '@/models/dailyStats';

export async function GET(request: NextRequest) {
  try {
    const userSession = await getUserFromRequest(request);
    if (!userSession) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const dailyStats = await getDailyStatsCollection();
    const today = new Date().toISOString().split('T')[0];

    // Get or create today's stats
    let todayStats = await dailyStats.findOne({
      userId: userSession.id as any,
      date: today
    });

    if (!todayStats) {
      // Create new daily stats
      const newStats: DailyStats = {
        userId: userSession.id as any,
        date: today,
        sessionsCompleted: 0,
        totalFocusScore: 0,
        livesLost: 0,
        perfectSessions: 0,
        focusTimeMinutes: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const result = await dailyStats.insertOne(newStats);
      todayStats = await dailyStats.findOne({ _id: result.insertedId as any });
    }

    return NextResponse.json(todayStats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
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

    const statsData: Partial<DailyStats> = await request.json();
    const dailyStats = await getDailyStatsCollection();
    const today = new Date().toISOString().split('T')[0];

    // Get today's stats
    let todayStats = await dailyStats.findOne({
      userId: userSession.id as any,
      date: today
    });

    if (!todayStats) {
      // Create new daily stats
      const newStats: DailyStats = {
        userId: userSession.id as any,
        date: today,
        sessionsCompleted: statsData.sessionsCompleted || 0,
        totalFocusScore: statsData.totalFocusScore || 0,
        livesLost: statsData.livesLost || 0,
        perfectSessions: statsData.perfectSessions || 0,
        focusTimeMinutes: statsData.focusTimeMinutes || 0,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const result = await dailyStats.insertOne(newStats);
      todayStats = await dailyStats.findOne({ _id: result.insertedId as any });
    } else {
      // Update existing stats
      const { _id, userId, date, createdAt, ...updateData } = statsData;
      await dailyStats.updateOne(
        { _id: todayStats._id },
        {
          $set: {
            ...updateData,
            updatedAt: new Date()
          }
        }
      );

      todayStats = await dailyStats.findOne({ _id: todayStats._id });
    }

    return NextResponse.json(todayStats);
  } catch (error) {
    console.error('Error updating stats:', error);
    return NextResponse.json(
      { error: 'Failed to update stats' },
      { status: 500 }
    );
  }
}