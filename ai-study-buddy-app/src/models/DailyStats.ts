// Daily stats model for AI Study Buddy

export interface DailyStats {
  _id?: string;
  userId: string;
  date: string; // YYYY-MM-DD format
  
  // Session stats
  sessionsCompleted: number;
  totalFocusScore: number;
  livesLost: number;
  perfectSessions: number;
  focusTimeMinutes: number;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateDailyStatsData {
  userId: string;
  date: string;
  sessionsCompleted?: number;
  totalFocusScore?: number;
  livesLost?: number;
  perfectSessions?: number;
  focusTimeMinutes?: number;
}

export interface UpdateDailyStatsData {
  sessionsCompleted?: number;
  totalFocusScore?: number;
  livesLost?: number;
  perfectSessions?: number;
  focusTimeMinutes?: number;
  updatedAt: Date;
}