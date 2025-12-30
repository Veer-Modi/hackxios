import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { getUsersCollection } from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const users = await getUsersCollection();

    // Get global daily leaderboard (based on overall stats)
    const globalLeaderboard = await users.aggregate([
      { $match: { totalSessions: { $gt: 0 } } }, // Only users with sessions
      { $sort: { 
          totalFocusTime: -1, // Primary sort by total focus time
          focusStreak: -1,    // Secondary sort by focus streak
          dailyStreak: -1     // Tertiary sort by daily streak
        } 
      },
      { $limit: 50 },
      { $project: {
          name: 1,
          totalFocusTime: 1,
          totalSessions: 1,
          focusStreak: 1,
          dailyStreak: 1,
          livesToday: 1,
          // Calculate average session time
          avgSessionTime: { 
            $cond: {
              if: { $gt: ['$totalSessions', 0] },
              then: { $divide: ['$totalFocusTime', '$totalSessions'] },
              else: 0
            }
          }
        }
      }
    ]).toArray();

    // Add rank numbers and format response
    const rankedGlobalLeaderboard = globalLeaderboard.map((entry, index) => ({
      rank: index + 1,
      name: entry.name,
      totalFocusTime: entry.totalFocusTime,
      totalSessions: entry.totalSessions,
      focusStreak: entry.focusStreak,
      dailyStreak: entry.dailyStreak,
      avgSessionTime: Math.round(entry.avgSessionTime || 0),
      livesToday: entry.livesToday
    }));

    return NextResponse.json({
      globalLeaderboard: rankedGlobalLeaderboard,
      totalPlayers: globalLeaderboard.length,
      lastUpdated: new Date().toISOString()
    });

  } catch (error) {
    console.error('Global leaderboard error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch global leaderboard' },
      { status: 500 }
    );
  }
}