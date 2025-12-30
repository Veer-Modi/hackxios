// Pomodoro Session model for AI Study Buddy
// This would be used when connecting to a real MongoDB database

export interface PomodoroSessionDocument {
  _id: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  duration: number; // in milliseconds
  timeRemaining: number; // in milliseconds
  isActive: boolean;
  isPaused: boolean;
  livesLost: number;
  completed: boolean;
  pausedAt?: Date;
  totalPauseTime: number;
  focusScore: number;
  createdAt: Date;
  updatedAt: Date;
}

// In a real application with MongoDB/Mongoose, this would be:
/*
import mongoose from 'mongoose';

const pomodoroSessionSchema = new mongoose.Schema({
  userId: { type: String, required: true, ref: 'User' },
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  duration: { type: Number, required: true }, // in milliseconds
  timeRemaining: { type: Number, required: true }, // in milliseconds
  isActive: { type: Boolean, default: false },
  isPaused: { type: Boolean, default: false },
  livesLost: { type: Number, default: 0 },
  completed: { type: Boolean, default: false },
  pausedAt: { type: Date },
  totalPauseTime: { type: Number, default: 0 },
  focusScore: { type: Number, default: 0 },
}, {
  timestamps: true
});

export default mongoose.models.PomodoroSession || mongoose.model<PomodoroSessionDocument>('PomodoroSession', pomodoroSessionSchema);
*/