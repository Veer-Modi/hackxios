# 🎯 Frontend Navigation Flow - AI Study Buddy

## 🏠 Main Dashboard (Home Screen)
*What the user sees when they first open the app*

### 📱 Display Elements
- **🚀 Big "START POMODORO" button** (if lives > 0)
- **❤️ Lives remaining:** ❤️❤️❤️❤️❤️ (5/5)
- **📊 Today's stats:** "2 sessions completed, 50 minutes focused"
- **🔥 Current streaks:** "Daily streak: 5 days, Perfect focus: 3 sessions"

### 🎮 User Actions
- **Click "Start Pomodoro"** → Go to Timer Screen
- **View stats** (displayed on same screen)
- **If lives = 0** → Show "Blocked until tomorrow" message

---

## ⏰ Timer Screen (Active Session)
*Where the user spends their 25-minute focus time*

### 📱 Display Elements
- **⏱️ Large countdown timer:** "23:45" remaining
- **📈 Current session info:** "Session 3 of today"
- **❤️ Lives remaining:** ❤️❤️❤️ (3/5)
- **🎛️ Control buttons:** "PAUSE" and "STOP"
- **💡 Focus message:** "Stay on this tab to keep your timer running!"

### 🎮 User Actions
- **Stay focused** → Timer continues counting down
- **Switch tabs** → Timer pauses + lose life + warning appears
- **Return to tab** → Timer resumes from paused time
- **Click "Pause"** → Manually pause timer
- **Click "Stop"** → End session early → Go back to Dashboard

---

## ⚠️ Tab Switch Warning (Overlay)
*Appears when user returns after switching tabs*

### 📱 Display Elements
- **🚨 Warning message:** "You lost focus! -1 life"
- **❤️ Updated lives count:** ❤️❤️ (2/5)
- **▶️ "Resume Timer" button**
- **⏱️ Time lost:** "You were away for 2 minutes"

### 🎮 User Actions
- **Click "Resume Timer"** → Return to Timer Screen
- Timer continues from where it paused

---

## 🎉 Session Complete (Success Screen)
*Shows when 25-minute timer finishes successfully*

### 📱 Display Elements
- **🎊 Success message:** "Great job! Session completed!"
- **📊 Session summary:** "25 minutes focused, 0 lives lost"
- **📈 Updated stats:** "3 sessions today, 75 minutes total"
- **☕ "Take a 5-minute break" button**
- **🔄 "Start another session" button**

### 🎮 User Actions
- **Click "Take break"** → Go to Break Timer
- **Click "Start another"** → Go back to Timer Screen
- **Click "Done for now"** → Go back to Dashboard

---

## ☕ Break Timer (Optional)
*5-minute break countdown*

### 📱 Display Elements
- **⏰ Break countdown:** "4:30" remaining
- **😌 Relaxing message:** "Take a deep breath and relax"
- **⏭️ "Skip break" button**
- **📚 "Back to studying"** appears when break ends

### 🎮 User Actions
- **Wait for break to finish** → Auto-return to Dashboard
- **Click "Skip break"** → Go back to Dashboard
- **Click "Back to studying"** → Go to Timer Screen

---

## 🚫 Blocked Screen (No Lives Left)
*Shows when user has 0 lives remaining*

### 📱 Display Elements
- **🛑 Block message:** "No lives remaining!"
- **⏰ Countdown to next day:** "Reset in 8 hours 23 minutes"
- **📊 Today's final stats:** "4 sessions, 100 minutes, 5 lives lost"
- **💪 Motivational message:** "Come back tomorrow and try to stay more focused!"

### 🎮 User Actions
- **Only option:** Wait until tomorrow
- Can view stats but cannot start new sessions

---

## 📊 Stats/Leaderboard (Future Feature)
*Accessible from main dashboard*

### 📱 Display Elements
- Personal statistics over time
- Comparison with other users
- Achievement badges
- Progress charts

---

## 🗺️ Simple Navigation Map

```
Dashboard → Timer Screen → Session Complete → Dashboard
    ↓           ↓              ↓
 Blocked    Tab Warning    Break Timer
 Screen     (overlay)         ↓
              ↓          Dashboard
         Timer Screen
```

---

## 🎯 Key User Experience Principles

| Principle | Implementation |
|-----------|----------------|
| **🎯 Always Clear Next Action** | Big buttons show what to do next |
| **⚡ Immediate Feedback** | Instant response to tab switching |
| **👁️ Progress Visibility** | Always show lives, time, and stats |
| **🤗 Gentle Guidance** | Encouraging messages, not harsh penalties |
| **🧭 Simple Navigation** | Mostly linear flow, hard to get lost |

> **Design Philosophy:** This flow keeps things simple for beginners while making the focus enforcement feel natural and engaging rather than punitive.