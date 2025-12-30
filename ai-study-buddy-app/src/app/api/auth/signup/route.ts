import { NextRequest, NextResponse } from 'next/server';
import { getUsersCollection } from '@/lib/mongodb';
import { hashPassword, generateToken, isValidEmail, isValidPassword, isValidName } from '@/lib/auth';
import { User } from '@/models/user';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();
    
    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }
    
    const nameValidation = isValidName(name);
    if (!nameValidation.valid) {
      return NextResponse.json(
        { error: nameValidation.message },
        { status: 400 }
      );
    }
    
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }
    
    const passwordValidation = isValidPassword(password);
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { error: passwordValidation.message },
        { status: 400 }
      );
    }
    
    const users = await getUsersCollection();
    
    // Check if user already exists
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }
    
    // Hash password
    const hashedPassword = await hashPassword(password);
    
    // Create new user
    const newUser: User = {
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      livesToday: 5,
      lastLifeReset: new Date(),
      isBlockedToday: false,
      focusStreak: 0,
      dailyStreak: 0,
      lastActiveDate: new Date(),
      totalSessions: 0,
      totalFocusTime: 0
    };
    
    const result = await users.insertOne(newUser);
    
    // Generate JWT token
    const userWithId = { ...newUser, _id: result.insertedId.toString() };
    const token = generateToken(userWithId as any);
    
    return NextResponse.json({ 
      message: 'User created successfully', 
      user: { 
        id: result.insertedId.toString(), 
        name: newUser.name, 
        email: newUser.email 
      },
      token
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}
