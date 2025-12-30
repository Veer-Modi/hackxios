import { NextRequest } from 'next/server';
import { LifeSystem } from '@/types';

// In-memory storage for demo purposes (in production, use a database)
let lifeSystem: LifeSystem = {
  livesRemaining: 5,
  maxLives: 5,
  lastReset: new Date().toISOString().split('T')[0],
  dailyLivesLost: 0
};

export async function GET(request: NextRequest) {
  try {
    // Check if we need to reset life system for a new day
    const today = new Date().toISOString().split('T')[0];
    if (lifeSystem.lastReset !== today) {
      lifeSystem = {
        livesRemaining: 5,
        maxLives: 5,
        lastReset: today,
        dailyLivesLost: 0
      };
    }

    return Response.json(lifeSystem);
  } catch (error) {
    console.error('Error fetching life system:', error);
    return Response.json({ error: 'Failed to fetch life system' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const lifeData: Partial<LifeSystem> = await request.json();
    
    // Update life system data
    lifeSystem = { ...lifeSystem, ...lifeData };
    
    return Response.json(lifeSystem);
  } catch (error) {
    console.error('Error updating life system:', error);
    return Response.json({ error: 'Failed to update life system' }, { status: 500 });
  }
}