// User model for AI Study Buddy

export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string; // hashed with bcrypt
  createdAt: Date;
  
  // Daily stats
  livesToday: number;
  lastLifeReset: Date;
  isBlockedToday: boolean;
  
  // Streaks
  focusStreak: number;
  dailyStreak: number;
  lastActiveDate: Date;
  
  // Totals
  totalSessions: number;
  totalFocusTime: number;
  globalRank?: number;
}

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface UserSession {
  id: string;
  name: string;
  email: string;
  livesToday: number;
  focusStreak: number;
  dailyStreak: number;
}