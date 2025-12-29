// Life system management for AI Study Buddy

import { User, LifeSystem, DailyStats } from '@/types';
import { getUser, saveUser, getLifeSystem, saveLifeSystem, getDailyStats, saveDailyStats } from './storage';

export function loseLife(): { success: boolean; livesRemaining: number; isBlocked: boolean } {
  const lifeSystem = getLifeSystem();
  const user = getUser();
  const dailyStats = getDailyStats();
  
  if (lifeSystem.livesRemaining <= 0) {
    return { success: false, livesRemaining: 0, isBlocked: true };
  }
  
  // Deduct a life
  lifeSystem.livesRemaining--;
  lifeSystem.dailyLivesLost++;
  
  // Update daily stats
  dailyStats.livesLost++;
  
  // Check if user should be blocked
  if (lifeSystem.livesRemaining <= 0) {
    user.isBlocked = true;
    user.blockedAt = new Date().toISOString();
  }
  
  // Save all updates
  saveLifeSystem(lifeSystem);
  saveUser(user);
  saveDailyStats(dailyStats);
  
  return {
    success: true,
    livesRemaining: lifeSystem.livesRemaining,
    isBlocked: user.isBlocked
  };
}

export function getLivesDisplay(): string {
  const lifeSystem = getLifeSystem();
  const hearts = '❤️'.repeat(lifeSystem.livesRemaining);
  const empty = '⚫'.repeat(lifeSystem.maxLives - lifeSystem.livesRemaining);
  return hearts + empty;
}

export function getLifeWarningMessage(livesRemaining: number): string {
  switch (livesRemaining) {
    case 4:
      return "⚠️ Be careful! You lost a life.";
    case 3:
      return "⚠️ Focus up! You're down to 3 lives.";
    case 2:
      return "🚨 Last chances! Only 2 lives left.";
    case 1:
      return "🚨 FINAL WARNING! One life remaining!";
    case 0:
      return "🚫 No lives left! You're blocked until tomorrow.";
    default:
      return "Stay focused!";
  }
}

export function canStartSession(): boolean {
  const user = getUser();
  const lifeSystem = getLifeSystem();
  
  return !user.isBlocked && lifeSystem.livesRemaining > 0;
}

export function getTimeUntilReset(): string {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  
  const timeUntil = tomorrow.getTime() - now.getTime();
  const hours = Math.floor(timeUntil / (1000 * 60 * 60));
  const minutes = Math.floor((timeUntil % (1000 * 60 * 60)) / (1000 * 60));
  
  return `${hours}h ${minutes}m`;
}

export function calculateFocusScore(minutesFocused: number, livesRemaining: number): number {
  // Focus Score Formula: (minutes focused × 10) + (remaining lives × 20)
  return (minutesFocused * 10) + (livesRemaining * 20);
}

// Streak tracking functions
export function updateDailyStreak(): number {
  const user = getUser();
  const dailyStats = getDailyStats();
  const today = new Date().toISOString().split('T')[0];
  
  // Check if user completed at least one session today
  if (dailyStats.sessionsCompleted > 0) {
    // Check if yesterday was also completed
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    if (user.lastStudyDate === yesterdayStr) {
      // Continue streak
      user.dailyStreak += 1;
    } else if (user.lastStudyDate !== today) {
      // Start new streak
      user.dailyStreak = 1;
    }
    
    user.lastStudyDate = today;
    saveUser(user);
  }
  
  return user.dailyStreak;
}

export function updatePerfectFocusStreak(): number {
  const user = getUser();
  const dailyStats = getDailyStats();
  const today = new Date().toISOString().split('T')[0];
  
  // Perfect day = at least 1 session with 0 lives lost
  if (dailyStats.perfectSessions > 0 && dailyStats.livesLost === 0) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    if (user.lastStudyDate === yesterdayStr) {
      // Continue perfect streak
      user.perfectFocusStreak += 1;
    } else if (user.lastStudyDate !== today) {
      // Start new perfect streak
      user.perfectFocusStreak = 1;
    }
  } else if (dailyStats.sessionsCompleted > 0) {
    // Reset perfect streak if had sessions but lost lives
    user.perfectFocusStreak = 0;
  }
  
  saveUser(user);
  return user.perfectFocusStreak;
}