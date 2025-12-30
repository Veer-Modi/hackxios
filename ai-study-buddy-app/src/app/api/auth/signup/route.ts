import { NextRequest } from 'next/server';
import { User } from '@/types';

// In-memory storage for demo purposes (in production, use a database)
const users: User[] = [];

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();
    
    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return Response.json({ error: 'User already exists' }, { status: 400 });
    }
    
    // Create new user
    const newUser: User = {
      id: `user-${Date.now()}`,
      username: name,
      email: email,
      livesRemaining: 5,
      dailyStreak: 0,
      perfectFocusStreak: 0,
      lastStudyDate: new Date().toISOString(),
      isBlocked: false
    };
    
    users.push(newUser);
    
    // In a real app, you would hash the password and store securely
    return Response.json({ 
      message: 'User created successfully', 
      user: { id: newUser.id, username: newUser.username, email: newUser.email } 
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return Response.json({ error: 'Failed to create user' }, { status: 500 });
  }
}