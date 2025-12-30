// Enhanced MongoDB connection for AI Study Buddy
import { MongoClient, Db, Collection } from 'mongodb';
import { User } from '@/models/user';
import { DailyStats } from '@/models/dailyStats';
import { PomodoroSession } from '@/models/pomodoroSession';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

// Helper function to get database
export async function getDatabase(): Promise<Db> {
  const client = await clientPromise;
  return client.db(process.env.MONGODB_DB || 'ai-study-buddy');
}

// Collection helpers with proper typing
export async function getUsersCollection(): Promise<Collection<User>> {
  const db = await getDatabase();
  return db.collection<User>('users');
}

export async function getDailyStatsCollection(): Promise<Collection<DailyStats>> {
  const db = await getDatabase();
  return db.collection<DailyStats>('dailyStats');
}

export async function getSessionsCollection(): Promise<Collection<PomodoroSession>> {
  const db = await getDatabase();
  return db.collection<PomodoroSession>('pomodoroSessions');
}

// Database initialization
export async function initializeDatabase() {
  try {
    const db = await getDatabase();
    
    // Create indexes for better performance
    const users = db.collection('users');
    await users.createIndex({ email: 1 }, { unique: true });
    await users.createIndex({ globalRank: 1 });
    
    const dailyStats = db.collection('dailyStats');
    await dailyStats.createIndex({ userId: 1, date: 1 }, { unique: true });
    await dailyStats.createIndex({ date: 1, totalFocusScore: -1 });
    
    const sessions = db.collection('pomodoroSessions');
    await sessions.createIndex({ userId: 1, createdAt: -1 });
    await sessions.createIndex({ createdAt: -1 });
    
    console.log('Database indexes created successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Utility functions for common database operations
export async function findUserByEmail(email: string): Promise<User | null> {
  const users = await getUsersCollection();
  return users.findOne({ email });
}

export async function findUserById(id: string): Promise<User | null> {
  const users = await getUsersCollection();
  return users.findOne({ _id: id as any });
}

export async function getTodayStats(userId: string): Promise<DailyStats | null> {
  const today = new Date().toISOString().split('T')[0];
  const dailyStats = await getDailyStatsCollection();
  return dailyStats.findOne({ userId, date: today });
}

export async function getLeaderboard(limit: number = 10): Promise<any[]> {
  const today = new Date().toISOString().split('T')[0];
  const dailyStats = await getDailyStatsCollection();
  
  return dailyStats.aggregate([
    { $match: { date: today } },
    { $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user'
      }
    },
    { $unwind: '$user' },
    { $sort: { totalFocusScore: -1 } },
    { $limit: limit },
    { $project: {
        name: '$user.name',
        totalFocusScore: 1,
        sessionsCompleted: 1,
        perfectSessions: 1,
        focusTimeMinutes: 1
      }
    }
  ]).toArray();
}