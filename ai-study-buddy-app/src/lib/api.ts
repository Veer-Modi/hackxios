// API service for AI Study Buddy
import { User, DailyStats, LifeSystem, PomodoroSession } from '@/types';

const API_BASE = '/api';

// User API functions
export async function fetchUser(): Promise<User> {
  const response = await fetch(`${API_BASE}/user`);
  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }
  return response.json();
}

export async function updateUser(userData: Partial<User>): Promise<User> {
  const response = await fetch(`${API_BASE}/user`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error('Failed to update user data');
  }
  return response.json();
}

// Stats API functions
export async function fetchDailyStats(): Promise<DailyStats> {
  const response = await fetch(`${API_BASE}/stats`);
  if (!response.ok) {
    throw new Error('Failed to fetch daily stats');
  }
  return response.json();
}

export async function updateDailyStats(statsData: Partial<DailyStats>): Promise<DailyStats> {
  const response = await fetch(`${API_BASE}/stats`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(statsData),
  });
  if (!response.ok) {
    throw new Error('Failed to update daily stats');
  }
  return response.json();
}

// Life system API functions
export async function fetchLifeSystem(): Promise<LifeSystem> {
  const response = await fetch(`${API_BASE}/life`);
  if (!response.ok) {
    throw new Error('Failed to fetch life system');
  }
  return response.json();
}

export async function updateLifeSystem(lifeData: Partial<LifeSystem>): Promise<LifeSystem> {
  const response = await fetch(`${API_BASE}/life`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(lifeData),
  });
  if (!response.ok) {
    throw new Error('Failed to update life system');
  }
  return response.json();
}

// Session API functions
export async function fetchSessions(): Promise<PomodoroSession[]> {
  const response = await fetch(`${API_BASE}/sessions`);
  if (!response.ok) {
    throw new Error('Failed to fetch sessions');
  }
  return response.json();
}

export async function createSession(sessionData: PomodoroSession): Promise<PomodoroSession> {
  const response = await fetch(`${API_BASE}/sessions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sessionData),
  });
  if (!response.ok) {
    throw new Error('Failed to create session');
  }
  return response.json();
}

export async function updateSession(sessionData: PomodoroSession): Promise<PomodoroSession> {
  const response = await fetch(`${API_BASE}/sessions`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sessionData),
  });
  if (!response.ok) {
    throw new Error('Failed to update session');
  }
  return response.json();
}

export async function deleteSession(sessionId: string): Promise<void> {
  const response = await fetch(`${API_BASE}/sessions?id=${sessionId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete session');
  }
}