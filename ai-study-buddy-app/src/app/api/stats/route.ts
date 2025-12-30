import { NextRequest } from 'next/server';
import { DailyStats } from '@/types';

// In-memory storage for demo purposes (in production, use a database)
let dailyStats: DailyStats = {
  date: new Date().toISOString().split('T')[0],
  sessionsCompleted: 0,
  totalFocusTime: 0,
  livesLost: 0,
  perfectSessions: 0
};

export async function GET(request: NextRequest) {
  try {
    // Check if we need to reset stats for a new day
    const today = new Date().toISOString().split('T')[0];
    if (dailyStats.date !== today) {
      dailyStats = {
        date: today,
        sessionsCompleted: 0,
        totalFocusTime: 0,
        livesLost: 0,
        perfectSessions: 0
      };
    }

    return Response.json(dailyStats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    return Response.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const statsData: Partial<DailyStats> = await request.json();
    
    // Update stats data
    dailyStats = { ...dailyStats, ...statsData };
    
    return Response.json(dailyStats);
  } catch (error) {
    console.error('Error updating stats:', error);
    return Response.json({ error: 'Failed to update stats' }, { status: 500 });
  }
}