<<<<<<< HEAD
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
=======
import { NextRequest, NextResponse } from 'next/server';
import { getUsersCollection } from '@/lib/mongodb';
import { verifyPassword, generateToken, isValidEmail, shouldResetLives } from '@/lib/auth';
import { LoginData } from '@/models/User';

export async function POST(request: NextRequest) {
  try {
    const body: LoginData = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const users = await getUsersCollection();

    // Find user by email
    const user = await users.findOne({ email: email.toLowerCase() });
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check if lives need to be reset (new day)
    let updatedUser = user;
    if (shouldResetLives(user.lastLifeReset)) {
      const updateData = {
        livesToday: 5,
        lastLifeReset: new Date(),
        isBlockedToday: false
      };
      
      await users.updateOne(
        { _id: user._id },
        { $set: updateData }
      );
      
      updatedUser = { ...user, ...updateData };
    }

    // Generate JWT token
    const token = generateToken(updatedUser);

    // Return success response (don't include password)
    const { password: _, ...userResponse } = updatedUser;

    return NextResponse.json({
      success: true,
      user: {
        id: userResponse._id,
        name: userResponse.name,
        email: userResponse.email,
        livesToday: userResponse.livesToday,
        focusStreak: userResponse.focusStreak,
        dailyStreak: userResponse.dailyStreak,
        isBlockedToday: userResponse.isBlockedToday
      },
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
>>>>>>> 6843f05f19f2701fb3752d9c7fdcb19727c1d911
  }
}