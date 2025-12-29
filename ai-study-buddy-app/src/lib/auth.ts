// Authentication helpers for AI Study Buddy
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import { User, UserSession } from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Hash password
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

// Verify password
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// Generate JWT token
export function generateToken(user: User): string {
  const payload = {
    id: user._id,
    email: user.email,
    name: user.name
  };
  
  return jwt.sign(payload, JWT_SECRET, { 
    expiresIn: '7d' // Token expires in 7 days
  });
}

// Verify JWT token
export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

// Extract user from request
export async function getUserFromRequest(request: NextRequest): Promise<UserSession | null> {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return null;
    }
    
    return {
      id: decoded.id,
      email: decoded.email,
      name: decoded.name,
      livesToday: 0, // Will be fetched from database
      focusStreak: 0, // Will be fetched from database
      dailyStreak: 0 // Will be fetched from database
    };
  } catch (error) {
    console.error('Error extracting user from request:', error);
    return null;
  }
}

// Middleware to protect routes
export function requireAuth(handler: Function) {
  return async (request: NextRequest) => {
    const user = await getUserFromRequest(request);
    
    if (!user) {
      return Response.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Add user to request context
    (request as any).user = user;
    return handler(request);
  };
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate password strength
export function isValidPassword(password: string): { valid: boolean; message?: string } {
  if (password.length < 6) {
    return { valid: false, message: 'Password must be at least 6 characters long' };
  }
  
  if (password.length > 100) {
    return { valid: false, message: 'Password must be less than 100 characters' };
  }
  
  return { valid: true };
}

// Validate name
export function isValidName(name: string): { valid: boolean; message?: string } {
  if (!name || name.trim().length < 2) {
    return { valid: false, message: 'Name must be at least 2 characters long' };
  }
  
  if (name.length > 50) {
    return { valid: false, message: 'Name must be less than 50 characters' };
  }
  
  return { valid: true };
}

// Reset daily lives (called at midnight)
export function shouldResetLives(lastReset: Date): boolean {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const lastResetDate = new Date(lastReset.getFullYear(), lastReset.getMonth(), lastReset.getDate());
  
  return today.getTime() > lastResetDate.getTime();
}

// Calculate streak updates
export function calculateStreaks(user: User, completedSessionsToday: number): {
  newDailyStreak: number;
  newFocusStreak: number;
} {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const lastActiveDate = new Date(user.lastActiveDate);
  const wasActiveYesterday = lastActiveDate.toDateString() === yesterday.toDateString();
  
  let newDailyStreak = user.dailyStreak;
  let newFocusStreak = user.focusStreak;
  
  // Daily streak: increment if active today and was active yesterday
  if (completedSessionsToday > 0) {
    if (wasActiveYesterday) {
      newDailyStreak += 1;
    } else {
      newDailyStreak = 1; // Start new streak
    }
  }
  
  // Focus streak: increment if completed 3+ sessions today with perfect focus
  // This will be calculated based on actual session data in the API
  
  return { newDailyStreak, newFocusStreak };
}