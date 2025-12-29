import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { getDailyStatsCollection } from '@/lib/mongodb';

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

    const dailyStats = await getDailyStatsCollection();
    const today = new Date().toISOString().split('T')[0];

    // Get room leaderboard (today's top performers)
    const leaderboard = await dailyStats.aggregate([
      { $match: { date: today } },
      { $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' },
      { $sort: { totalFocusScore: -1 } },
      { $limit: 20 },
      { $project: {
          rank: { $add: [{ $indexOfArray: [[], null] }, 1] },
          userId: '$userId',
          name: '$user.name',
          focusScore: '$totalFocusScore',
          sessionsToday: '$sessionsCompleted',
          perfectSessions: '$perfectSessions',
          focusTimeMinutes: '$focusTimeMinutes',
          livesLost: '$livesLost'
        }
      }
    ]).toArray();

    // Add rank numbers
    const rankedLeaderboard = leaderboard.map((entry, index) => ({
      ...entry,
      rank: index + 1
    }));

    return NextResponse.json({
      leaderboard: rankedLeaderboard,
      totalPlayers: leaderboard.length,
      lastUpdated: new Date().toISOString()
    });

  } catch (error) {
    console.error('Room leaderboard error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch room leaderboard' },
      { status: 500 }
    );
  }
}