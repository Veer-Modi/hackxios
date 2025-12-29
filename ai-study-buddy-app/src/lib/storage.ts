// Local storage utilities for AI Study Buddy

import { User, DailyStats, LifeSystem } from '@/types';

const STORAGE_KEYS = {
  USER: 'ai-study-buddy-user',
  DAILY_STATS: 'ai-study-buddy-daily-stats',
  LIFE_SYSTEM: 'ai-study-buddy-life-system',
  CURRENT_SESSION: 'ai-study-buddy-current-session'
};

// Helper function to safely parse JSON from localStorage
function safeJsonParse<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error parsing ${key} from localStorage:`, error);
    return defaultValue;
  }
}

// Helper function to safely save to localStorage
function safeJsonSave(key: string, value: any): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
}

// User data functions
export function getUser(): User {
  return safeJsonParse(STORAGE_KEYS.USER, {
    id: 'user-1',
    username: 'Student',
    livesRemaining: 5,
    dailyStreak: 0,
    perfectFocusStreak: 0,
    lastStudyDate: '',
    isBlocked: false
  });
}

export function saveUser(user: User): void {
  safeJsonSave(STORAGE_KEYS.USER, user);
}

// Daily stats functions
export function getDailyStats(): DailyStats {
  const today = new Date().toISOString().split('T')[0];
  return safeJsonParse(STORAGE_KEYS.DAILY_STATS, {
    date: today,
    sessionsCompleted: 0,
    totalFocusTime: 0,
    livesLost: 0,
    perfectSessions: 0
  });
}

export function saveDailyStats(stats: DailyStats): void {
  safeJsonSave(STORAGE_KEYS.DAILY_STATS, stats);
}

// Life system functions
export function getLifeSystem(): LifeSystem {
  const today = new Date().toISOString().split('T')[0];
  return safeJsonParse(STORAGE_KEYS.LIFE_SYSTEM, {
    livesRemaining: 5,
    maxLives: 5,
    lastReset: today,
    dailyLivesLost: 0
  });
}

export function saveLifeSystem(lifeSystem: LifeSystem): void {
  safeJsonSave(STORAGE_KEYS.LIFE_SYSTEM, lifeSystem);
}

// Check if we need to reset daily data
export function checkDailyReset(): boolean {
  const today = new Date().toISOString().split('T')[0];
  const lifeSystem = getLifeSystem();
  
  if (lifeSystem.lastReset !== today) {
    // Reset daily data
    const resetLifeSystem: LifeSystem = {
      livesRemaining: 5,
      maxLives: 5,
      lastReset: today,
      dailyLivesLost: 0
    };
    
    const resetStats: DailyStats = {
      date: today,
      sessionsCompleted: 0,
      totalFocusTime: 0,
      livesLost: 0,
      perfectSessions: 0
    };
    
    saveLifeSystem(resetLifeSystem);
    saveDailyStats(resetStats);
    
    // Update user to unblock them
    const user = getUser();
    user.isBlocked = false;
    user.blockedAt = undefined;
    saveUser(user);
    
    return true;
  }
  
  return false;
}