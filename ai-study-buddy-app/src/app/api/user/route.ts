import { NextRequest } from 'next/server';
import { User } from '@/types';

// In-memory storage for demo purposes (in production, use a database)
let user: User = {
  id: 'user-1',
  username: 'Student',
  livesRemaining: 5,
  dailyStreak: 0,
  perfectFocusStreak: 0,
  lastStudyDate: '',
  isBlocked: false
};

export async function GET(request: NextRequest) {
  try {
    return Response.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return Response.json({ error: 'Failed to fetch user data' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const userData: Partial<User> = await request.json();
    
    // Update user data
    user = { ...user, ...userData };
    
    return Response.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    return Response.json({ error: 'Failed to update user data' }, { status: 500 });
  }
}