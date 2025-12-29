// Main type definitions for AI Study Buddy

export interface User {
  id: string;
  username: string;
  livesRemaining: number;
  dailyStreak: number;
  perfectFocusStreak: number;
  lastStudyDate: string;
  isBlocked: boolean;
  blockedAt?: string;
}

export interface PomodoroSession {
  id: string;
  userId: string;
  startTime: number;
  endTime?: number;
  duration: number; // 25 minutes in milliseconds
  timeRemaining: number;
  isActive: boolean;
  isPaused: boolean;
  livesLost: number;
  completed: boolean;
  pausedAt?: number;
  totalPauseTime: number;
}

export interface DailyStats {
  date: string;
  sessionsCompleted: number;
  totalFocusTime: number; // in minutes
  livesLost: number;
  perfectSessions: number;
}

export interface LifeSystem {
  livesRemaining: number;
  maxLives: number;
  lastReset: string;
  dailyLivesLost: number;
}

export type TimerState = 'idle' | 'running' | 'paused' | 'completed' | 'stopped';

export interface AppState {
  user: User;
  currentSession: PomodoroSession | null;
  dailyStats: DailyStats;
  lifeSystem: LifeSystem;
}