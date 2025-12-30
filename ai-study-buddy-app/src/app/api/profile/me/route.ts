import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { getUsersCollection, getDailyStatsCollection } from '@/lib/mongodb';

export async function GET(request: NextRequest) {
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
    const dailyStats = await getDailyStatsCollection();

    // Get current user
    const user = await users.findOne({ _id: userSession.id as any });
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Get today's stats
    const today = new Date().toISOString().split('T')[0];
    const todayStats = await dailyStats.findOne({ 
      userId: user._id as any, 
      date: today 
    });

    // Calculate global rank based on total focus time
    const globalRank = await users.countDocuments({
      totalFocusTime: { $gt: user.totalFocusTime }
    }) + 1;

    // Calculate today's rank
    const todayRank = todayStats ? await dailyStats.countDocuments({
      date: today,
      totalFocusScore: { $gt: todayStats.totalFocusScore }
    }) + 1 : null;

    // Get recent session history (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentStats = await dailyStats.find({
      userId: user._id as any,
      createdAt: { $gte: sevenDaysAgo }
    }).sort({ date: -1 }).limit(7).toArray();

    // Calculate weekly totals
    const weeklyTotals = recentStats.reduce((acc, stat) => ({
      sessions: acc.sessions + stat.sessionsCompleted,
      focusTime: acc.focusTime + stat.focusTimeMinutes,
      perfectSessions: acc.perfectSessions + stat.perfectSessions
    }), { sessions: 0, focusTime: 0, perfectSessions: 0 });

    const response = {
      user: {
        name: user.name,
        email: user.email,
        
        // Rankings
        globalRank,
        todayRank,
        
        // Streaks
        focusStreak: user.focusStreak,
        dailyStreak: user.dailyStreak,
        
        // Today's stats
        livesRemaining: user.livesToday,
        isBlockedToday: user.isBlockedToday,
        focusTimeToday: todayStats?.focusTimeMinutes || 0,
        sessionsToday: todayStats?.sessionsCompleted || 0,
        perfectSessionsToday: todayStats?.perfectSessions || 0,
        todayScore: todayStats?.totalFocusScore || 0,
        
        // All-time stats
        totalSessions: user.totalSessions,
        totalFocusTime: user.totalFocusTime,
        
        // Weekly stats
        weeklyStats: {
          sessions: weeklyTotals.sessions,
          focusTime: weeklyTotals.focusTime,
          perfectSessions: weeklyTotals.perfectSessions,
          avgSessionsPerDay: Math.round(weeklyTotals.sessions / 7 * 10) / 10
        },
        
        // Account info
        memberSince: user.createdAt,
        lastActive: user.lastActiveDate
      },
      
      // Recent activity
      recentActivity: recentStats.map(stat => ({
        date: stat.date,
        sessions: stat.sessionsCompleted,
        focusTime: stat.focusTimeMinutes,
        score: stat.totalFocusScore,
        perfect: stat.perfectSessions > 0
      }))
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Profile error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile data' },
      { status: 500 }
    );
  }
}