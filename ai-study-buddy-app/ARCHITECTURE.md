# 🍅 AI Study Buddy – FocusGuard Pomodoro Arena
## Complete Architecture & Implementation Guide

## 📁 FRONTEND STRUCTURE

```
src/
├── app/
│   ├── layout.tsx              # Main layout with gradient background
│   ├── page.tsx                # Landing page with hero section
│   ├── login/
│   │   └── page.tsx            # Login form (email/password)
│   ├── signup/
│   │   └── page.tsx            # Signup form (name/email/password)
│   ├── dashboard/
│   │   └── page.tsx            # Main hub with all feature buttons
│   ├── ask-ai/
│   │   └── page.tsx            # AI Q&A with level selection
│   ├── summarize/
│   │   └── page.tsx            # Note summarization interface
│   ├── pomodoro/
│   │   └── page.tsx            # Main Pomodoro arena with timer
│   ├── leaderboard/
│   │   └── page.tsx            # Room & global leaderboards
│   ├── profile/
│   │   └── page.tsx            # User profile with stats
│   └── api/                    # Backend API routes
│       ├── auth/
│       │   ├── signup/route.ts
│       │   └── login/route.ts
│       ├── ai/
│       │   ├── ask/route.ts
│       │   └── summarize/route.ts
│       ├── pomodoro/
│       │   ├── start/route.ts
│       │   ├── violation/route.ts
│       │   └── complete/route.ts
│       ├── leaderboard/
│       │   ├── room/route.ts
│       │   └── daily/route.ts
│       └── profile/
│           └── me/route.ts
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Top navigation with user menu
│   │   └── Sidebar.tsx         # Side navigation (if needed)
│   ├── ui/
│   │   ├── Button.tsx          # Styled button component
│   │   ├── Card.tsx            # White card with shadow
│   │   └── Modal.tsx           # Modal dialogs
│   ├── pomodoro/
│   │   ├── Timer.tsx           # Animated countdown timer
│   │   ├── LivesDisplay.tsx    # ❤️❤️❤️❤️❤️ hearts display
│   │   └── FocusDetector.tsx   # Tab switch detection
│   ├── leaderboard/
│   │   └── LeaderboardTable.tsx # Ranking table with hover effects
│   ├── profile/
│   │   └── StreakBadge.tsx     # Green streak badges
│   └── auth/
│       ├── LoginForm.tsx       # Reusable login form
│       └── SignupForm.tsx      # Reusable signup form
│
├── lib/
│   ├── auth.ts                 # Authentication helpers
│   ├── db.ts                   # MongoDB connection
│   ├── openai.ts               # OpenAI API wrapper
│   ├── utils.ts                # Utility functions
│   └── constants.ts            # App constants
│
├── models/
│   ├── User.ts                 # User model interface
│   ├── DailyStats.ts           # Daily stats model
│   └── PomodoroSession.ts      # Session model
│
├── types/
│   └── index.ts                # TypeScript type definitions
│
└── styles/
    └── globals.css             # Global styles with gradients
```

## 🔌 BACKEND API ROUTES

### 🔐 Authentication APIs

#### POST /api/auth/signup
```typescript
// Request
{
  "name": "John Doe",
  "email": "john@example.com", 
  "password": "securepass123"
}

// Response (Success)
{
  "success": true,
  "user": {
    "id": "user123",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "jwt_token_here"
}

// Response (Error)
{
  "success": false,
  "error": "Email already exists"
}
```

#### POST /api/auth/login
```typescript
// Request
{
  "email": "john@example.com",
  "password": "securepass123"
}

// Response (Success)
{
  "success": true,
  "user": {
    "id": "user123",
    "name": "John Doe",
    "email": "john@example.com",
    "livesToday": 5,
    "focusStreak": 3,
    "dailyStreak": 7
  },
  "token": "jwt_token_here"
}
```

### 🤖 AI APIs

#### POST /api/ai/ask
```typescript
// Request
{
  "question": "What is photosynthesis?",
  "level": "beginner" // "beginner" | "intermediate" | "advanced"
}

// Response
{
  "explanation": "Photosynthesis is the process by which plants...",
  "example": "For example, when a leaf absorbs sunlight...",
  "practiceQuestions": [
    "What are the main inputs of photosynthesis?",
    "Where does photosynthesis occur in plant cells?"
  ]
}
```

#### POST /api/ai/summarize
```typescript
// Request
{
  "text": "Long text content to summarize..."
}

// Response
{
  "summary": [
    "• Key point 1 from the text",
    "• Key point 2 from the text", 
    "• Key point 3 from the text"
  ]
}
```

### ⏱️ Pomodoro APIs

#### POST /api/pomodoro/start
```typescript
// Request
{} // No body needed, uses session

// Response (Success)
{
  "success": true,
  "sessionId": "session123",
  "livesRemaining": 5,
  "canStart": true
}

// Response (Blocked)
{
  "success": false,
  "error": "No lives remaining",
  "livesRemaining": 0,
  "blockedUntil": "2024-01-02T00:00:00Z"
}
```

#### POST /api/pomodoro/violation
```typescript
// Request
{
  "sessionId": "session123"
}

// Response
{
  "success": true,
  "livesRemaining": 4,
  "message": "Life deducted for losing focus"
}
```

#### POST /api/pomodoro/complete
```typescript
// Request
{
  "sessionId": "session123",
  "minutesFocused": 25,
  "livesRemaining": 3
}

// Response
{
  "success": true,
  "focusScore": 310, // (25 × 10) + (3 × 20)
  "streakUpdated": true,
  "newRank": 15
}
```

### 🏆 Leaderboard APIs

#### GET /api/leaderboard/room
```typescript
// Response
{
  "leaderboard": [
    {
      "rank": 1,
      "userId": "user123",
      "name": "John Doe",
      "focusScore": 850,
      "sessionsToday": 4
    },
    {
      "rank": 2, 
      "userId": "user456",
      "name": "Jane Smith",
      "focusScore": 720,
      "sessionsToday": 3
    }
  ]
}
```

#### GET /api/leaderboard/daily
```typescript
// Response
{
  "globalLeaderboard": [
    {
      "rank": 1,
      "name": "Alex Chen",
      "totalScore": 2450,
      "perfectSessions": 8,
      "focusStreak": 12
    }
  ]
}
```

### 🔥 Profile API

#### GET /api/profile/me
```typescript
// Response
{
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "globalRank": 12,
    "focusStreak": 5,
    "dailyStreak": 8,
    "focusTimeToday": 125, // minutes
    "livesRemaining": 3,
    "totalSessions": 45,
    "perfectSessions": 23
  }
}
```

## 🔄 FRONTEND ↔ BACKEND COMMUNICATION

### Simple Flow Example:

1. **User Action**: Clicks "Start Pomodoro" button
2. **Frontend**: Calls `fetch('/api/pomodoro/start', { method: 'POST' })`
3. **Backend**: 
   - Checks user's lives in MongoDB
   - Creates new session if allowed
   - Returns response
4. **Frontend**: Updates UI based on response
5. **Database**: Single source of truth for all data

### Authentication Flow:
```typescript
// 1. Login
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});

// 2. Store token
const { token, user } = await response.json();
localStorage.setItem('token', token);

// 3. Use token in subsequent requests
fetch('/api/pomodoro/start', {
  headers: { 
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
```

### Real-time Focus Detection:
```typescript
// Frontend focus detection
useEffect(() => {
  const handleVisibilityChange = () => {
    if (document.hidden && timerRunning) {
      // Call violation API
      fetch('/api/pomodoro/violation', {
        method: 'POST',
        body: JSON.stringify({ sessionId })
      });
    }
  };
  
  document.addEventListener('visibilitychange', handleVisibilityChange);
  return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
}, [timerRunning, sessionId]);
```

## 📊 DATABASE MODELS

### User Model
```typescript
interface User {
  _id: ObjectId;
  name: string;
  email: string;
  password: string; // hashed
  createdAt: Date;
  
  // Daily stats
  livesToday: number;
  lastLifeReset: Date;
  isBlockedToday: boolean;
  
  // Streaks
  focusStreak: number;
  dailyStreak: number;
  lastActiveDate: Date;
  
  // Totals
  totalSessions: number;
  totalFocusTime: number;
}
```

### DailyStats Model
```typescript
interface DailyStats {
  _id: ObjectId;
  userId: ObjectId;
  date: string; // YYYY-MM-DD
  
  sessionsCompleted: number;
  totalFocusScore: number;
  livesLost: number;
  perfectSessions: number;
  focusTimeMinutes: number;
  
  createdAt: Date;
  updatedAt: Date;
}
```

### PomodoroSession Model
```typescript
interface PomodoroSession {
  _id: ObjectId;
  userId: ObjectId;
  
  startTime: Date;
  endTime?: Date;
  minutesFocused: number;
  livesLostDuringSession: number;
  focusScore: number;
  completed: boolean;
  
  createdAt: Date;
}
```

## 🎨 DESIGN SYSTEM

### Colors & Gradients
```css
/* Gradient background */
.gradient-bg {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Card styling */
.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 24px;
}

/* Button variants */
.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
  padding: 12px 24px;
  transition: all 0.2s;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 15px rgba(102, 126, 234, 0.4);
}
```

### Component Examples
```typescript
// Lives Display Component
const LivesDisplay = ({ lives }: { lives: number }) => (
  <div className="flex gap-1">
    {Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-2xl ${i < lives ? 'text-red-500' : 'text-gray-300'}`}>
        ❤️
      </span>
    ))}
  </div>
);

// Streak Badge Component  
const StreakBadge = ({ streak, type }: { streak: number; type: 'focus' | 'daily' }) => (
  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
    {type === 'focus' ? '🔥' : '📅'} {streak} day streak
  </div>
);
```

## ⚡ IMPLEMENTATION PRIORITY

1. **Phase 1**: Authentication & Database setup
2. **Phase 2**: Basic Pomodoro timer with life system  
3. **Phase 3**: AI features (Ask AI, Summarize)
4. **Phase 4**: Leaderboards & streaks
5. **Phase 5**: Polish UI & animations

This architecture provides a complete, scalable foundation for your AI Study Buddy platform! 🚀