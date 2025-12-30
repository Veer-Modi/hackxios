<<<<<<< HEAD
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
=======
import { NextRequest, NextResponse } from 'next/server';
import { getUsersCollection } from '@/lib/mongodb';
import { hashPassword, generateToken, isValidEmail, isValidPassword, isValidName } from '@/lib/auth';
import { User, CreateUserData } from '@/models/User';

export async function POST(request: NextRequest) {
  try {
    const body: CreateUserData = await request.json();
    const { name, email, password } = body;

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    // Validate name
    const nameValidation = isValidName(name);
    if (!nameValidation.valid) {
      return NextResponse.json(
        { success: false, error: nameValidation.message },
        { status: 400 }
      );
    }

    // Validate email
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password
    const passwordValidation = isValidPassword(password);
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { success: false, error: passwordValidation.message },
        { status: 400 }
      );
    }

    const users = await getUsersCollection();

    // Check if user already exists
    const existingUser = await users.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'Email already registered' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const newUser: User = {
      name: name.trim(),
      email: email.toLowerCase(),
      password: hashedPassword,
      createdAt: new Date(),
      
      // Daily stats
      livesToday: 5,
      lastLifeReset: new Date(),
      isBlockedToday: false,
      
      // Streaks
      focusStreak: 0,
      dailyStreak: 0,
      lastActiveDate: new Date(),
      
      // Totals
      totalSessions: 0,
      totalFocusTime: 0
    };

    const result = await users.insertOne(newUser);
    
    if (!result.insertedId) {
      throw new Error('Failed to create user');
    }

    // Generate JWT token
    const userWithId = { ...newUser, _id: result.insertedId.toString() };
    const token = generateToken(userWithId);

    // Return success response (don't include password)
    const { password: _, ...userResponse } = userWithId;

    return NextResponse.json({
      success: true,
      user: userResponse,
      token
    });

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
>>>>>>> 6843f05f19f2701fb3752d9c7fdcb19727c1d911
  }
}