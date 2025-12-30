// Daily Stats model for AI Study Buddy
// This would be used when connecting to a real MongoDB database

export interface DailyStatsDocument {
  _id: string;
  userId: string;
  date: string; // ISO date string (YYYY-MM-DD)
  sessionsCompleted: number;
  totalFocusTime: number; // in minutes
  livesLost: number;
  perfectSessions: number;
  focusScore: number;
  createdAt: Date;
  updatedAt: Date;
}

// In a real application with MongoDB/Mongoose, this would be:
/*
import mongoose from 'mongoose';

const dailyStatsSchema = new mongoose.Schema({
  userId: { type: String, required: true, ref: 'User' },
  date: { type: String, required: true }, // ISO date string (YYYY-MM-DD)
  sessionsCompleted: { type: Number, default: 0 },
  totalFocusTime: { type: Number, default: 0 }, // in minutes
  livesLost: { type: Number, default: 0 },
  perfectSessions: { type: Number, default: 0 },
  focusScore: { type: Number, default: 0 },
}, {
  timestamps: true
});

export default mongoose.models.DailyStats || mongoose.model<DailyStatsDocument>('DailyStats', dailyStatsSchema);
*/