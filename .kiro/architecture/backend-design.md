# 🏗️ Backend Responsibilities - AI Study Buddy

## 🗄️ Data Storage & Management

### 👤 User Data
- **🔐 User accounts** (username, email, password)
- **❤️ Current lives remaining** (0-5)
- **📅 Daily reset timestamps**
- **⚙️ User preferences and settings**

### 📊 Session Data
- **⏰ Active Pomodoro sessions** (start time, duration, status)
- **✅ Completed sessions** (date, duration, lives lost)
- **☕ Break sessions** and their completion status
- **⚠️ Session interruptions** and tab switch events

### 📈 Statistics & Progress
- **📅 Daily study time totals**
- **📊 Weekly/monthly aggregated data**
- **🔥 Streak counters** (daily and perfect focus)
- **📈 Historical performance data** for trends

---

## ⏰ Time & Session Management

### 🔄 Daily Reset Logic
```
Every day at midnight:
1. Reset all users' lives to 5
2. Check if users maintained their daily streak
3. Update streak counters based on previous day activity
4. Archive yesterday's session data
```

### 📊 Session Tracking
- **🚀 Start new Pomodoro sessions**
- **⏸️ Pause/resume sessions** when tab switches occur
- **📊 Calculate actual focus time** vs total session time
- **✅ Handle session completion** and validation

### ❤️ Life Management
- **➖ Deduct lives** when tab switches happen
- **🚫 Block users** when lives reach 0
- **📅 Track when blocking occurred** for accurate reset timing

---

## 🏆 Leaderboard & Ranking System

### ⚡ Real-time Calculations
- **📊 Total study time rankings** (daily, weekly, monthly)
- **🎯 Focus quality scores** (time focused / total time)
- **⭐ Perfect session counts**
- **🔥 Streak length comparisons**

### 🔄 Leaderboard Updates
- **📊 Recalculate rankings** when sessions complete
- **⚡ Update user positions** in real-time
- **🤝 Handle ties** and equal scores
- **📸 Maintain historical** leaderboard snapshots

---

## 📊 Streak & Achievement Logic

### 📅 Daily Streak Tracking
```
At end of each day:
1. Check if user completed at least 1 Pomodoro
2. If yes: increment daily streak
3. If no: reset daily streak to 0
4. Update user's streak record
```

### ⭐ Perfect Focus Streak
```
After each session:
1. Check if any lives were lost during session
2. If no lives lost: increment perfect streak
3. If lives were lost: reset perfect streak to 0
4. Update user's perfect streak record
```

---

## 🔐 API Endpoints (What Frontend Calls)

### 🔑 Authentication
| Method | Endpoint | Purpose |
|--------|----------|---------|
| `POST` | `/login` | User login |
| `POST` | `/register` | Create new account |
| `POST` | `/logout` | End user session |

### ⏰ Session Management
| Method | Endpoint | Purpose |
|--------|----------|---------|
| `POST` | `/session/start` | Begin new Pomodoro |
| `PUT` | `/session/pause` | Pause due to tab switch |
| `PUT` | `/session/resume` | Resume after returning |
| `POST` | `/session/complete` | Mark session finished |
| `GET` | `/session/current` | Get active session info |

### 👤 User Data
| Method | Endpoint | Purpose |
|--------|----------|---------|
| `GET` | `/user/stats` | Get current lives, streaks, stats |
| `GET` | `/user/history` | Get past session data |
| `PUT` | `/user/life-lost` | Deduct a life (tab switch) |

### 🏆 Leaderboard
| Method | Endpoint | Purpose |
|--------|----------|---------|
| `GET` | `/leaderboard/daily` | Today's rankings |
| `GET` | `/leaderboard/weekly` | This week's rankings |
| `GET` | `/leaderboard/alltime` | Overall rankings |

---

## 🛡️ Security & Validation

### 🚫 Prevent Cheating
- **✅ Validate session durations** server-side
- **🔍 Check that life deductions** match tab switch events
- **🔒 Ensure users can't manipulate** their own stats
- **⏱️ Rate limit API calls** to prevent abuse

### 🔐 Data Integrity
- **✅ Validate all timestamps** and durations
- **❤️ Ensure lives never go** below 0 or above 5
- **🔥 Check that streaks** increment logically
- **💾 Backup critical user data** regularly

---

## 🔄 Background Jobs & Automation

### 🌙 Daily Tasks (Run at Midnight)
```
1. Reset all users' lives to 5
2. Process daily streak updates
3. Archive completed session data
4. Generate daily leaderboard snapshots
5. Clean up old session data
```

### ⚡ Real-time Tasks
- **📊 Update leaderboards** when sessions complete
- **🎉 Send notifications** for streak milestones
- **🧹 Monitor for inactive sessions** to clean up

---

## 📱 Implementation Complexity Levels

### 🟢 For Beginners (Start Here)
- **💾 Use local browser storage** (no real backend needed)
- **📝 Simple JavaScript** to handle lives and basic stats
- **🚫 No user accounts** or leaderboards initially

### 🟡 Intermediate Backend
- **🟢 Simple Node.js server** with SQLite database
- **👤 Basic user accounts** and session tracking
- **👥 Local leaderboards** (friends only)

### 🔴 Advanced Backend
- **🗄️ Full server** with PostgreSQL/MongoDB
- **⚡ Real-time updates** with WebSockets
- **🌍 Global leaderboards** and social features
- **🤖 Advanced analytics** and AI recommendations

---

## 🎯 Key Backend Principles

| Principle | Implementation |
|-----------|----------------|
| **📊 Data Consistency** | Lives, streaks, and stats must always be accurate |
| **🎮 Fair Play** | Prevent users from cheating or manipulating data |
| **⚡ Performance** | Leaderboards and stats should load quickly |
| **🔒 Reliability** | Don't lose user progress due to server issues |
| **📈 Scalability** | Handle many users studying simultaneously |

> **Backend Role:** The backend essentially acts as the "referee" that enforces the rules, keeps score, and makes sure everyone plays fairly!