// Timer logic for AI Study Buddy

import { PomodoroSession, TimerState } from '@/types';

export const POMODORO_DURATION = 25 * 60 * 1000; // 25 minutes in milliseconds
export const BREAK_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

export function createNewSession(): PomodoroSession {
  return {
    id: `session-${Date.now()}`,
    userId: 'user-1',
    startTime: Date.now(),
    duration: POMODORO_DURATION,
    timeRemaining: POMODORO_DURATION,
    isActive: false,
    isPaused: false,
    livesLost: 0,
    completed: false,
    totalPauseTime: 0
  };
}

export function startSession(session: PomodoroSession): PomodoroSession {
  return {
    ...session,
    isActive: true,
    isPaused: false,
    startTime: Date.now()
  };
}

export function pauseSession(session: PomodoroSession): PomodoroSession {
  if (!session.isActive || session.isPaused) return session;
  
  return {
    ...session,
    isPaused: true,
    pausedAt: Date.now()
  };
}

export function resumeSession(session: PomodoroSession): PomodoroSession {
  if (!session.isPaused || !session.pausedAt) return session;
  
  const pauseDuration = Date.now() - session.pausedAt;
  
  return {
    ...session,
    isPaused: false,
    pausedAt: undefined,
    totalPauseTime: session.totalPauseTime + pauseDuration
  };
}

export function updateSessionTime(session: PomodoroSession): PomodoroSession {
  if (!session.isActive || session.isPaused) return session;
  
  const elapsed = Date.now() - session.startTime - session.totalPauseTime;
  const timeRemaining = Math.max(0, session.duration - elapsed);
  
  return {
    ...session,
    timeRemaining
  };
}

export function completeSession(session: PomodoroSession): PomodoroSession {
  return {
    ...session,
    isActive: false,
    isPaused: false,
    completed: true,
    endTime: Date.now(),
    timeRemaining: 0
  };
}

export function stopSession(session: PomodoroSession): PomodoroSession {
  return {
    ...session,
    isActive: false,
    isPaused: false,
    completed: false,
    endTime: Date.now()
  };
}

export function getTimerState(session: PomodoroSession | null): TimerState {
  if (!session) return 'idle';
  if (session.completed) return 'completed';
  if (!session.isActive) return 'stopped';
  if (session.isPaused) return 'paused';
  if (session.timeRemaining <= 0) return 'completed';
  return 'running';
}

export function formatTime(milliseconds: number): string {
  const totalSeconds = Math.ceil(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export function calculateFocusTime(session: PomodoroSession): number {
  if (!session.endTime) return 0;
  
  const totalTime = session.endTime - session.startTime;
  const focusTime = totalTime - session.totalPauseTime;
  
  return Math.max(0, focusTime);
}

export function calculateFocusQuality(session: PomodoroSession): number {
  if (!session.endTime) return 0;
  
  const totalTime = session.endTime - session.startTime;
  const focusTime = calculateFocusTime(session);
  
  if (totalTime === 0) return 0;
  
  return Math.round((focusTime / totalTime) * 100);
}