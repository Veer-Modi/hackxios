// Pomodoro session model for AI Study Buddy

export interface PomodoroSession {
  _id?: string;
  userId: string;
  
  // Session timing
  startTime: Date;
  endTime?: Date;
  minutesFocused: number;
  
  // Focus tracking
  livesLostDuringSession: number;
  focusScore: number;
  completed: boolean;
  
  // Metadata
  createdAt: Date;
}

export interface CreateSessionData {
  userId: string;
  startTime: Date;
}

export interface CompleteSessionData {
  sessionId: string;
  endTime: Date;
  minutesFocused: number;
  livesLostDuringSession: number;
  focusScore: number;
  completed: boolean;
}

export interface SessionViolationData {
  sessionId: string;
  livesLostDuringSession: number;
}