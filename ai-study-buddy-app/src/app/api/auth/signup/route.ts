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
  }
}