import { NextRequest } from 'next/server';
import { User } from '@/types';

// In-memory storage for demo purposes (in production, use a database)
// This should match the users array in the signup route
const users: User[] = [
  {
    id: 'user-1',
    username: 'Demo User',
    email: 'demo@example.com',
    livesRemaining: 5,
    dailyStreak: 0,
    perfectFocusStreak: 0,
    lastStudyDate: new Date().toISOString(),
    isBlocked: false
  }
];

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    // Find user by email
    const user = users.find(user => user.email === email);
    if (!user) {
      return Response.json({ error: 'Invalid email or password' }, { status: 401 });
    }
    
    // In a real app, you would verify the password here
    // For demo purposes, we'll assume the password is correct if the user exists
    
    // Return user info (excluding sensitive data like password)
    return Response.json({ 
      message: 'Login successful', 
      user: { 
        id: user.id, 
        username: user.username, 
        email: user.email 
      },
      // In a real app, you would generate and return a JWT token
      token: `fake-jwt-token-${user.id}`
    });
  } catch (error) {
    console.error('Error logging in:', error);
    return Response.json({ error: 'Failed to login' }, { status: 500 });
  }
}