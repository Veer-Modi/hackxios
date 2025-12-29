# ❤️ Life System - 5 Lives Per Day Focus Enforcement

## 🎮 Core Life System Mechanics

### 📅 Daily Life Allocation
- **🎯 Starting Lives:** Every user starts each day with exactly **5 lives** ❤️❤️❤️❤️❤️
- **🔄 Reset Schedule:** Lives reset to 5 at midnight in the user's timezone
- **💎 Scarcity:** Lives are precious - once lost, they don't regenerate until tomorrow

### ⚠️ Life Loss Triggers
| Trigger | Penalty | Condition |
|---------|---------|-----------|
| **📱 Tab Switch** | -1 life | During active Pomodoro |
| **🔄 Window Switch** | -1 life | Alt+Tab to other apps |
| **📉 Browser Minimize** | -1 life | For >30 seconds |
| **📱 Mobile Background** | -1 life | For >1 minute |

### 📊 Life Loss Consequences

```
5 Lives: ❤️❤️❤️❤️❤️ - Full access, no restrictions
4 Lives: ❤️❤️❤️❤️⚫ - Warning message appears
3 Lives: ❤️❤️❤️⚫⚫ - "Be careful!" reminder
2 Lives: ❤️❤️⚫⚫⚫ - "Last chances!" urgent warning
1 Life:  ❤️⚫⚫⚫⚫ - "FINAL WARNING!" critical alert
0 Lives: ⚫⚫⚫⚫⚫ - BLOCKED until tomorrow
```

---

## ⏰ Daily Reset System

### 🌙 Midnight Reset Logic
```javascript
function checkDailyReset() {
    let now = new Date();
    let lastReset = new Date(user.lastLifeReset);
    
    // Check if it's a new day
    if (now.getDate() !== lastReset.getDate() || 
        now.getMonth() !== lastReset.getMonth() ||
        now.getFullYear() !== lastReset.getFullYear()) {
        
        // Reset lives to 5
        user.livesRemaining = 5;
        user.lastLifeReset = now;
        user.dailyLivesLost = 0;
        
        // Unblock user if they were blocked
        user.isBlocked = false;
        user.blockedAt = null;
        
        saveUserData(user);
        
        // Show welcome back message
        showDailyResetMessage();
    }
}
```

### 🌍 Timezone Handling

function getUserMidnight(userTimezone) {
    let now = new Date();
    let userTime = new Date(now.toLocaleString("en-US", {timeZone: userTimezone}));
    
    // Calculate next midnight in user's timezone
    let nextMidnight = new Date(userTime);
    nextMidnight.setHours(24, 0, 0, 0);
    
    return nextMidnight;
}
🚫 Blocking System
When Lives Reach Zero:

function handleLifeLoss() {
    user.livesRemaining--;
    user.dailyLivesLost++;
    
    if (user.livesRemaining <= 0) {
        // BLOCK USER
        user.isBlocked = true;
        user.blockedAt = new Date();
        
        // Stop any active timers
        stopAllTimers();
        
        // Show blocked screen
        showBlockedScreen();
        
        // Calculate time until reset
        let timeUntilReset = calculateTimeUntilMidnight();
        showCountdownToReset(timeUntilReset);
    } else {
        // Show life lost warning
        showLifeLostWarning(user.livesRemaining);
    }
}
Blocked State UI:

┌─────────────────────────────────────────┐
│            🚫 NO LIVES LEFT! 🚫         │
│                                         │
│         Lives: ⚫⚫⚫⚫⚫ (0/5)          │
│                                         │
│      You've lost focus too many times   │
│                                         │
│        ⏰ Reset in: 7h 23m 45s          │
│                                         │
│     Today's Stats:                      │
│     • Sessions completed: 3             │
│     • Focus time: 67 minutes           │
│     • Lives lost: 5                    │
│                                         │
│   Come back tomorrow and stay focused!  │
│                                         │
│        [  VIEW LEADERBOARD  ]           │
└─────────────────────────────────────────┘
📊 Life System Psychology
Why 5 Lives Works:

Scarcity - Limited resource makes each life valuable
Forgiveness - Allows some mistakes while learning
Escalation - Increasing tension as lives decrease
Daily Fresh Start - Tomorrow brings hope and renewal
Immediate Feedback - Instant consequence for distraction
Behavioral Impact:

First Life Lost - "Oops, I need to be more careful"
Second Life Lost - "This is getting serious"
Third Life Lost - "I really need to focus now"
Fourth Life Lost - "One more mistake and I'm done"
Fifth Life Lost - "I've learned my lesson for today"
🎯 Advanced Life System Features
Life Recovery Bonuses (Optional):

// Reward perfect sessions
function checkPerfectSession(sessionData) {
    if (sessionData.livesLost === 0 && sessionData.completed) {
        // Perfect session - small chance to recover a life
        if (user.livesRemaining < 5 && Math.random() < 0.1) {
            user.livesRemaining++;
            showLifeRecoveredMessage();
        }
    }
}
Weekend Grace Period (Optional):

// More forgiving on weekends
function getMaxLivesForDay() {
    let today = new Date().getDay();
    if (today === 0 || today === 6) { // Sunday or Saturday
        return 7; // Extra lives on weekends
    }
    return 5; // Normal weekdays
}
Streak Protection (Advanced):

// Protect long streaks from single bad days
function checkStreakProtection(user) {
    if (user.dailyStreak >= 30 && user.livesRemaining === 0) {
        // Give one "streak saver" life for long streaks
        if (!user.usedStreakSaver) {
            user.livesRemaining = 1;
            user.usedStreakSaver = true;
            showStreakSaverMessage();
        }
    }
}
📈 Life System Analytics
Track Life Usage Patterns:

let lifeAnalytics = {
    averageLivesLostPerDay: 2.3,
    mostCommonLossTime: "2:30 PM", // Post-lunch distraction
    worstDay: "Monday",
    bestDay: "Wednesday",
    improvementTrend: "+15% focus over 30 days"
};
Life Loss Heatmap:

Time of Day Life Losses:
9 AM  ████░░░░░░ 40%
12 PM ██████░░░░ 60%  ← Lunch distraction
3 PM  ████████░░ 80%  ← Afternoon slump
6 PM  ██████████ 100% ← Peak distraction time
9 PM  ███░░░░░░░ 30%
🛡️ Anti-Abuse Measures
Prevent Life System Cheating:

// Server-side validation
function validateLifeLoss(userId, timestamp, reason) {
    let user = getUser(userId);
    let lastLoss = user.lastLifeLoss;
    
    // Prevent rapid-fire life losses
    if (timestamp - lastLoss < 5000) { // 5 seconds
        return false; // Ignore duplicate
    }
    
    // Validate loss reason
    if (!['tab_switch', 'window_blur', 'app_background'].includes(reason)) {
        return false; // Invalid reason
    }
    
    return true;
}
Rate Limiting:

// Prevent manipulation by limiting life loss frequency
let lifeLossRateLimit = {
    maxLossesPerMinute: 2,
    maxLossesPerHour: 10,
    suspiciousThreshold: 15
};
🎮 Gamification Elements
Life System Achievements:

"Survivor" - Complete a day with 4+ lives remaining
"Phoenix" - Come back strong after being blocked
"Perfect Day" - Complete 5+ sessions without losing any lives
"Life Saver" - Help a friend avoid getting blocked
"Comeback Kid" - Improve from 5 lives lost to 0 lives lost
Social Features:

Life Sharing - Friends can "gift" a life once per week
Life Leaderboard - Who preserves lives best?
Group Challenges - Team life preservation goals
This life system creates the perfect balance of challenge and forgiveness, making focus feel like a game while building real concentration skills!