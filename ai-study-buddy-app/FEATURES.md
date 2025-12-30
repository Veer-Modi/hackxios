# 🍅 AI Study Buddy - Feature Documentation

## 📁 Folder Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Main dashboard with navigation
│   ├── pomodoro/          # Enhanced Pomodoro room
│   ├── ask-ai/           # AI question answering
│   └── api/              # Backend API routes
├── components/            # Reusable React components
├── lib/                   # Utility functions and helpers
```

## 🎯 Features Implemented

### 1. Dashboard Page (`/dashboard`)
- **Navigation Hub**: Central place to access all features
- **Quick Stats**: Today's progress overview
- **Feature Cards**: Ask AI, Summarize Notes, Pomodoro Room

### 2. Enhanced Pomodoro Room (`/pomodoro`)
- **Life System**: 5 lives per day, lose 1 per tab switch
- **Focus Score**: `(minutes focused × 10) + (remaining lives × 20)`
- **Leaderboard**: Daily ranking with dummy data
- **Session Results**: Shows score after completion
- **Blocking System**: Prevents new sessions when lives = 0

### 3. AI Assistant (`/ask-ai`)
- **OpenAI Integration**: GPT-3.5-turbo for answers
- **Example Questions**: Pre-built study questions
- **Real-time Responses**: Streaming AI answers
- **Study Tips**: Guidelines for better questions

### 4. Life System Logic
```javascript
// Life Rules:
- Start with 5 lives daily
- Lose 1 life per tab switch/focus loss
- Lives reset at midnight
- 0 lives = blocked until tomorrow

// Focus Score Formula:
score = (minutesFocused × 10) + (remainingLives × 20)
```

### 5. Streak Tracking (No Database Yet)
```javascript
// Daily Streak:
- Increment if completed session yesterday and today
- Reset to 1 if gap in days
- Stored in localStorage

// Perfect Focus Streak:
- Increment if no lives lost in a day
- Reset to 0 if any lives lost
- Requires at least 1 completed session
```

## 🔧 API Routes

### `/api/ask-ai` (POST)
```javascript
// Request:
{
  "question": "Explain photosynthesis"
}

// Response:
{
  "answer": "Photosynthesis is the process..."
}
```

## 🗄️ MongoDB Integration Guide

### 1. Install MongoDB
```bash
npm install mongodb
```

### 2. Environment Variables
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
MONGODB_DB=ai-study-buddy
```

### 3. Connection Setup
```javascript
// lib/mongodb.ts
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);
export default client.connect();
```

### 4. Database Schema
```javascript
// Users Collection
{
  _id: ObjectId,
  username: String,
  email: String,
  livesRemaining: Number,
  dailyStreak: Number,
  perfectFocusStreak: Number,
  lastStudyDate: String,
  isBlocked: Boolean,
  createdAt: Date
}

// Sessions Collection
{
  _id: ObjectId,
  userId: String,
  startTime: Date,
  endTime: Date,
  duration: Number,
  completed: Boolean,
  livesLost: Number,
  focusScore: Number
}

// Daily Stats Collection
{
  _id: ObjectId,
  userId: String,
  date: String, // YYYY-MM-DD
  sessionsCompleted: Number,
  totalFocusTime: Number,
  livesLost: Number,
  perfectSessions: Number,
  totalScore: Number
}
```

## 🚀 How to Use

### 1. Start the App
```bash
cd ai-study-buddy-app
npm run dev
```

### 2. Navigate the App
1. **Home** (`/`) - Landing page with overview
2. **Dashboard** (`/dashboard`) - Main navigation hub
3. **Pomodoro Room** (`/pomodoro`) - Focus timer with life system
4. **Ask AI** (`/ask-ai`) - AI-powered study assistant

### 3. Test Features
- **Life System**: Start a Pomodoro, switch tabs to lose lives
- **Focus Score**: Complete a session to see your score
- **AI Assistant**: Ask study questions (requires OpenAI API key)
- **Leaderboard**: View your ranking against others

## 🔑 Environment Setup

### Required API Keys
```env
# OpenAI API Key (for AI features)
OPENAI_API_KEY=sk-...

# MongoDB (for database features)
MONGODB_URI=mongodb+srv://...
MONGODB_DB=ai-study-buddy
```

### Get OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Create account and add payment method
3. Generate API key in API Keys section
4. Add to `.env.local` file

## 📊 Focus Score Explanation

The focus score encourages both **completion** and **focus quality**:

```
Focus Score = (Minutes Focused × 10) + (Remaining Lives × 20)

Examples:
- 25 minutes, 5 lives = (25 × 10) + (5 × 20) = 350 points
- 25 minutes, 3 lives = (25 × 10) + (3 × 20) = 310 points
- 15 minutes, 5 lives = (15 × 10) + (5 × 20) = 250 points
```

**Why this works:**
- Rewards completion (minutes focused)
- Heavily rewards focus quality (remaining lives)
- Creates incentive to avoid tab switching
- Makes perfect sessions significantly more valuable

## 🏆 Leaderboard Logic

Currently uses dummy data, but here's how real leaderboard would work:

```javascript
// Daily Leaderboard
1. Calculate daily total score for each user
2. Rank by total score (highest first)
3. Update every session completion
4. Reset daily at midnight

// Weekly/Monthly Leaderboards
1. Sum daily scores over period
2. Include streak bonuses
3. Separate categories (most sessions, best focus, etc.)
```

## 🔄 Streak Tracking Logic

### Daily Streak
```javascript
// Conditions to increment:
1. Complete at least 1 session today
2. Completed at least 1 session yesterday
3. No gap in study days

// Reset conditions:
1. Miss a day (no sessions)
2. First time using app
```

### Perfect Focus Streak
```javascript
// Conditions to increment:
1. Complete at least 1 session today
2. Lose 0 lives today
3. Had perfect day yesterday

// Reset conditions:
1. Lose any lives in a day
2. Miss a day completely
```

## 🎨 UI Components Used

- **Card**: Reusable container component
- **Button**: Styled button with variants
- **TimerDisplay**: Shows countdown and state
- **LifeDisplay**: Shows hearts and warnings

## 🔮 Future Enhancements

1. **User Authentication**: Login/signup system
2. **Real Database**: Replace localStorage with MongoDB
3. **Social Features**: Friend system, group challenges
4. **Study Analytics**: Detailed progress charts
5. **Customization**: Themes, timer durations, life counts
6. **Mobile App**: React Native version
7. **Notifications**: Browser notifications for breaks
8. **Study Materials**: Note-taking and summarization tools

Your AI Study Buddy is now a comprehensive study platform with focus enforcement, AI assistance, and gamification elements! 🎉