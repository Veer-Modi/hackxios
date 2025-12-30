// User model for AI Study Buddy
// This would be used when connecting to a real MongoDB database

export interface UserDocument {
  _id: string;
  name: string;
  email: string;
  password: string; // This should be hashed in a real application
  livesRemaining: number;
  dailyStreak: number;
  perfectFocusStreak: number;
  lastStudyDate: string;
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// In a real application with MongoDB/Mongoose, this would be:
/*
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Should be hashed
  livesRemaining: { type: Number, default: 5 },
  dailyStreak: { type: Number, default: 0 },
  perfectFocusStreak: { type: Number, default: 0 },
  lastStudyDate: { type: Date, default: null },
  isBlocked: { type: Boolean, default: false },
}, {
  timestamps: true
});

export default mongoose.models.User || mongoose.model<UserDocument>('User', userSchema);
*/