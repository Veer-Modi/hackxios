// Life system management for AI Study Buddy

import { User, LifeSystem, DailyStats } from '@/types';
import { getUser, saveUser, getLifeSystem, saveLifeSystem, getDailyStats, saveDailyStats, getUserAsync, saveUserAsync, getLifeSystemAsync, saveLifeSystemAsync, getDailyStatsAsync, saveDailyStatsAsync } from './storage';

export async function loseLifeAsync(): Promise<{ success: boolean; livesRemaining: number; isBlocked: boolean }> {
  const lifeSystem = await getLifeSystemAsync();
  const user = await getUserAsync();
  const dailyStats = await getDailyStatsAsync();
  
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
  await saveLifeSystemAsync(lifeSystem);
  await saveUserAsync(user);
  await saveDailyStatsAsync(dailyStats);
  
  return {
    success: true,
    livesRemaining: lifeSystem.livesRemaining,
    isBlocked: user.isBlocked
  };
}

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

export async function canStartSessionAsync(): Promise<boolean> {
  const user = await getUserAsync();
  const lifeSystem = await getLifeSystemAsync();
  
  return !user.isBlocked && lifeSystem.livesRemaining > 0;
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