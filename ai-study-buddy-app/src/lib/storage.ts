// Storage utilities for AI Study Buddy
// Uses API when available, falls back to localStorage

import { User, DailyStats, LifeSystem } from '@/types';
import { fetchUser, updateUser, fetchDailyStats, updateDailyStats, fetchLifeSystem, updateLifeSystem } from './api';

const STORAGE_KEYS = {
  USER: 'ai-study-buddy-user',
  DAILY_STATS: 'ai-study-buddy-daily-stats',
  LIFE_SYSTEM: 'ai-study-buddy-life-system',
  CURRENT_SESSION: 'ai-study-buddy-current-session',
  TOTAL_STATS: 'ai-study-buddy-total-stats'
};

export interface TotalStats {
  totalSessions: number;
  totalFocusTime: number; // in minutes
  focusStreak: number;
  perfectStreak: number;
  bestDaySessions: number;
  bestStreak: number;
}

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
function safeJsonSave(key: string, value: unknown): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
}

// User data functions
export async function getUserAsync(): Promise<User> {
  try {
    // Try API first
    return await fetchUser();
  } catch (error) {
    // Fallback to localStorage
    console.warn('API failed, using localStorage:', error);
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
}

export function getUser(): User {
  // Synchronous version for compatibility
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

export async function saveUserAsync(user: User): Promise<User> {
  try {
    // Try API first
    const updatedUser = await updateUser(user);
    // Also save to localStorage as backup
    safeJsonSave(STORAGE_KEYS.USER, updatedUser);
    return updatedUser;
  } catch (error) {
    // Fallback to localStorage only
    console.warn('API failed, saving to localStorage only:', error);
    safeJsonSave(STORAGE_KEYS.USER, user);
    return user;
  }
}

export function saveUser(user: User): void {
  // Synchronous version for compatibility
  safeJsonSave(STORAGE_KEYS.USER, user);
}

// Daily stats functions
export async function getDailyStatsAsync(): Promise<DailyStats> {
  try {
    // Try API first
    return await fetchDailyStats();
  } catch (error) {
    // Fallback to localStorage
    console.warn('API failed, using localStorage:', error);
    const today = new Date().toISOString().split('T')[0];
    return safeJsonParse(STORAGE_KEYS.DAILY_STATS, {
      date: today,
      sessionsCompleted: 0,
      totalFocusTime: 0,
      livesLost: 0,
      perfectSessions: 0
    });
  }
}

export function getDailyStats(): DailyStats {
  // Synchronous version for compatibility
  const today = new Date().toISOString().split('T')[0];
  return safeJsonParse(STORAGE_KEYS.DAILY_STATS, {
    date: today,
    sessionsCompleted: 0,
    totalFocusTime: 0,
    livesLost: 0,
    perfectSessions: 0
  });
}

export async function saveDailyStatsAsync(stats: DailyStats): Promise<DailyStats> {
  try {
    // Try API first
    const updatedStats = await updateDailyStats(stats);
    // Also save to localStorage as backup
    safeJsonSave(STORAGE_KEYS.DAILY_STATS, updatedStats);
    return updatedStats;
  } catch (error) {
    // Fallback to localStorage only
    console.warn('API failed, saving to localStorage only:', error);
    safeJsonSave(STORAGE_KEYS.DAILY_STATS, stats);
    return stats;
  }
}

export function saveDailyStats(stats: DailyStats): void {
  // Synchronous version for compatibility
  safeJsonSave(STORAGE_KEYS.DAILY_STATS, stats);
}

// Life system functions
export async function getLifeSystemAsync(): Promise<LifeSystem> {
  try {
    // Try API first
    return await fetchLifeSystem();
  } catch (error) {
    // Fallback to localStorage
    console.warn('API failed, using localStorage:', error);
    const today = new Date().toISOString().split('T')[0];
    return safeJsonParse(STORAGE_KEYS.LIFE_SYSTEM, {
      livesRemaining: 5,
      maxLives: 5,
      lastReset: today,
      dailyLivesLost: 0
    });
  }
}

export function getLifeSystem(): LifeSystem {
  // Synchronous version for compatibility
  const today = new Date().toISOString().split('T')[0];
  return safeJsonParse(STORAGE_KEYS.LIFE_SYSTEM, {
    livesRemaining: 5,
    maxLives: 5,
    lastReset: today,
    dailyLivesLost: 0
  });
}

export async function saveLifeSystemAsync(lifeSystem: LifeSystem): Promise<LifeSystem> {
  try {
    // Try API first
    const updatedLifeSystem = await updateLifeSystem(lifeSystem);
    // Also save to localStorage as backup
    safeJsonSave(STORAGE_KEYS.LIFE_SYSTEM, updatedLifeSystem);
    return updatedLifeSystem;
  } catch (error) {
    // Fallback to localStorage only
    console.warn('API failed, saving to localStorage only:', error);
    safeJsonSave(STORAGE_KEYS.LIFE_SYSTEM, lifeSystem);
    return lifeSystem;
  }
}

export function saveLifeSystem(lifeSystem: LifeSystem): void {
  // Synchronous version for compatibility
  safeJsonSave(STORAGE_KEYS.LIFE_SYSTEM, lifeSystem);
}

// Total stats functions
export async function getTotalStatsAsync(): Promise<TotalStats> {
  try {
    // In a real backend, we'd have a separate endpoint for total stats
    // For now, we'll use localStorage as the source of truth for total stats
    return safeJsonParse(STORAGE_KEYS.TOTAL_STATS, {
      totalSessions: 0,
      totalFocusTime: 0,
      focusStreak: 0,
      perfectStreak: 0,
      bestDaySessions: 0,
      bestStreak: 0
    });
  } catch (error) {
    console.error('Error getting total stats:', error);
    return {
      totalSessions: 0,
      totalFocusTime: 0,
      focusStreak: 0,
      perfectStreak: 0,
      bestDaySessions: 0,
      bestStreak: 0
    };
  }
}

export function getTotalStats(): TotalStats {
  return safeJsonParse(STORAGE_KEYS.TOTAL_STATS, {
    totalSessions: 0,
    totalFocusTime: 0,
    focusStreak: 0,
    perfectStreak: 0,
    bestDaySessions: 0,
    bestStreak: 0
  });
}

export async function saveTotalStatsAsync(stats: TotalStats): Promise<TotalStats> {
  try {
    // In a real backend, we'd have a separate endpoint for total stats
    // For now, we'll save to localStorage
    safeJsonSave(STORAGE_KEYS.TOTAL_STATS, stats);
    return stats;
  } catch (error) {
    console.error('Error saving total stats:', error);
    return stats;
  }
}

export function saveTotalStats(stats: TotalStats): void {
  safeJsonSave(STORAGE_KEYS.TOTAL_STATS, stats);
}

// Check if we need to reset daily data
export async function checkDailyResetAsync(): Promise<boolean> {
  const today = new Date().toISOString().split('T')[0];
  
  try {
    // Try API first
    const lifeSystem = await getLifeSystemAsync();
    
    if (lifeSystem.lastReset !== today) {
      // Get yesterday's stats to update total stats
      const yesterdayStats = getDailyStats();
      
      // Update total stats
      const totalStats = await getTotalStatsAsync();
      const updatedTotalStats: TotalStats = {
        ...totalStats,
        totalSessions: totalStats.totalSessions + yesterdayStats.sessionsCompleted,
        totalFocusTime: totalStats.totalFocusTime + yesterdayStats.totalFocusTime,
        // Update best day sessions if needed
        bestDaySessions: Math.max(totalStats.bestDaySessions, yesterdayStats.sessionsCompleted)
      };
      await saveTotalStatsAsync(updatedTotalStats);
      
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
      
      await saveLifeSystemAsync(resetLifeSystem);
      await saveDailyStatsAsync(resetStats);
      
      // Update user to unblock them
      const user = await getUserAsync();
      user.isBlocked = false;
      user.blockedAt = undefined;
      
      // Handle streaks
      if (yesterdayStats.sessionsCompleted > 0) {
        user.dailyStreak++;
        // Update best streak if needed
        if (user.dailyStreak > user.perfectFocusStreak) {
          updatedTotalStats.bestStreak = user.dailyStreak;
          await saveTotalStatsAsync(updatedTotalStats);
        }
      } else {
        user.dailyStreak = 0;
      }
      
      await saveUserAsync(user);
      
      return true;
    }
    
    return false;
  } catch (error) {
    // Fallback to localStorage only
    console.warn('API failed in checkDailyReset, using localStorage:', error);
    const lifeSystem = getLifeSystem();
    
    if (lifeSystem.lastReset !== today) {
      // Get yesterday's stats to update total stats
      const yesterdayStats = getDailyStats();
      
      // Update total stats
      const totalStats = getTotalStats();
      const updatedTotalStats: TotalStats = {
        ...totalStats,
        totalSessions: totalStats.totalSessions + yesterdayStats.sessionsCompleted,
        totalFocusTime: totalStats.totalFocusTime + yesterdayStats.totalFocusTime,
        // Update best day sessions if needed
        bestDaySessions: Math.max(totalStats.bestDaySessions, yesterdayStats.sessionsCompleted)
      };
      saveTotalStats(updatedTotalStats);
      
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
      
      // Handle streaks
      if (yesterdayStats.sessionsCompleted > 0) {
        user.dailyStreak++;
        // Update best streak if needed
        if (user.dailyStreak > user.perfectFocusStreak) {
          updatedTotalStats.bestStreak = user.dailyStreak;
          saveTotalStats(updatedTotalStats);
        }
      } else {
        user.dailyStreak = 0;
      }
      
      saveUser(user);
      
      return true;
    }
    
    return false;
  }
}

// Synchronous version for compatibility
export function checkDailyReset(): boolean {
  const today = new Date().toISOString().split('T')[0];
  const lifeSystem = getLifeSystem();
  
  if (lifeSystem.lastReset !== today) {
    // Get yesterday's stats to update total stats
    const yesterdayStats = getDailyStats();
    
    // Update total stats
    const totalStats = getTotalStats();
    const updatedTotalStats: TotalStats = {
      ...totalStats,
      totalSessions: totalStats.totalSessions + yesterdayStats.sessionsCompleted,
      totalFocusTime: totalStats.totalFocusTime + yesterdayStats.totalFocusTime,
      // Update best day sessions if needed
      bestDaySessions: Math.max(totalStats.bestDaySessions, yesterdayStats.sessionsCompleted)
    };
    saveTotalStats(updatedTotalStats);
    
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
    
    // Handle streaks
    if (yesterdayStats.sessionsCompleted > 0) {
      user.dailyStreak++;
      // Update best streak if needed
      if (user.dailyStreak > user.perfectFocusStreak) {
        updatedTotalStats.bestStreak = user.dailyStreak;
        saveTotalStats(updatedTotalStats);
      }
    } else {
      user.dailyStreak = 0;
    }
    
    saveUser(user);
    
    return true;
  }
  
  return false;
}