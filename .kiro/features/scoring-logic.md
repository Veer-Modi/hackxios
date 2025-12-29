# 🎯 Fair Focus Score Formula Design

## 📊 Core Focus Score Formula

### 🧮 Primary Formula
```
Focus Score = (Study Time × Focus Quality × Consistency Bonus) + Streak Multiplier
```

### 📋 Component Definitions
| Component | Description | Range |
|-----------|-------------|-------|
| **⏱️ Study Time** | Total focused minutes (excluding pause time) | 0-∞ minutes |
| **🎯 Focus Quality** | (Lives Remaining / 5) × 100 | 0-100% |
| **✅ Consistency Bonus** | Session completion rate | 0-50% |
| **🔥 Streak Multiplier** | Bonus points for maintaining streaks | 0-350 points |

---

## 💻 Detailed Calculation

```javascript
function calculateFocusScore(sessionData, userStats) {
    // Base Components
    let studyTime = sessionData.focusedMinutes;
    let livesRemaining = sessionData.livesRemaining;
    let sessionsCompleted = sessionData.completedSessions;
    let sessionsStarted = sessionData.totalSessions;
    
    // 1. Time Component (0-1000 points)
    let timeScore = Math.min(studyTime * 2, 1000);
    
    // 2. Focus Quality Component (0-100%)
    let focusQuality = (livesRemaining / 5) * 100;
    
    // 3. Consistency Bonus (0-50%)
    let completionRate = sessionsCompleted / sessionsStarted;
    let consistencyBonus = completionRate * 0.5;
    
    // 4. Calculate base score
    let baseScore = timeScore * (focusQuality / 100) * (1 + consistencyBonus);
    
    // 5. Streak Multiplier
    let streakBonus = calculateStreakBonus(userStats);
    
    // Final Score
    let finalScore = Math.round(baseScore + streakBonus);
    
    return {
        totalScore: finalScore,
        breakdown: {
            timeScore: timeScore,
            focusQuality: focusQuality,
            consistencyBonus: consistencyBonus * 100,
            streakBonus: streakBonus,
            baseScore: Math.round(baseScore)
        }
    };
}
```
📊 Component Breakdown
1. Time Component (Rewards Effort):

// Linear scaling with diminishing returns
function calculateTimeScore(focusedMinutes) {
    if (focusedMinutes <= 0) return 0;
    
    // 2 points per minute, capped at 1000 (8.3 hours)
    let baseTimeScore = Math.min(focusedMinutes * 2, 1000);
    
    // Diminishing returns after 4 hours to prevent grinding
    if (focusedMinutes > 240) {
        let excessMinutes = focusedMinutes - 240;
        baseTimeScore = 480 + (excessMinutes * 0.5);
    }
    
    return Math.round(baseTimeScore);
}
2. Focus Quality (Rewards Discipline):

function calculateFocusQuality(livesRemaining, livesLost) {
    // Method 1: Lives Remaining (0-100%)
    let livesQuality = (livesRemaining / 5) * 100;
    
    // Method 2: Exponential penalty for lives lost (alternative)
    let lossQuality = Math.max(0, 100 - (livesLost * 25));
    
    // Use the more forgiving of the two
    return Math.max(livesQuality, lossQuality);
}
3. Consistency Bonus (Rewards Completion):

function calculateConsistencyBonus(completedSessions, startedSessions) {
    if (startedSessions === 0) return 0;
    
    let completionRate = completedSessions / startedSessions;
    
    // Bonus tiers
    if (completionRate >= 0.9) return 0.5;      // 50% bonus for 90%+ completion
    if (completionRate >= 0.8) return 0.3;      // 30% bonus for 80%+ completion
    if (completionRate >= 0.7) return 0.15;     // 15% bonus for 70%+ completion
    
    return 0; // No bonus below 70%
}
4. Streak Multiplier (Rewards Habit Building):

function calculateStreakBonus(userStats) {
    let dailyStreak = userStats.dailyStreak;
    let perfectStreak = userStats.perfectFocusStreak;
    
    // Daily streak bonus (compound growth)
    let dailyBonus = Math.min(dailyStreak * 5, 200); // Max 200 points
    
    // Perfect focus streak bonus (exponential)
    let perfectBonus = Math.min(Math.pow(perfectStreak, 1.5) * 3, 150); // Max 150 points
    
    return Math.round(dailyBonus + perfectBonus);
}
🏆 Example Score Calculations
Scenario 1: Perfect Student

let perfectStudent = {
    focusedMinutes: 150,        // 2.5 hours
    livesRemaining: 5,          // No distractions
    completedSessions: 6,       // All sessions completed
    totalSessions: 6,
    dailyStreak: 30,           // 30-day streak
    perfectFocusStreak: 15     // 15 perfect sessions
};

// Calculation:
// Time Score: 150 × 2 = 300 points
// Focus Quality: (5/5) × 100 = 100%
// Consistency: 6/6 = 100% → 50% bonus
// Base Score: 300 × 1.0 × 1.5 = 450 points
// Streak Bonus: (30 × 5) + (15^1.5 × 3) = 150 + 174 = 324 points
// Final Score: 450 + 324 = 774 points
Scenario 2: Struggling Student

let strugglingStudent = {
    focusedMinutes: 75,         // 1.25 hours
    livesRemaining: 1,          // Lost 4 lives
    completedSessions: 2,       // Only completed 2/4 sessions
    totalSessions: 4,
    dailyStreak: 3,            // Short streak
    perfectFocusStreak: 0      // No perfect sessions
};

// Calculation:
// Time Score: 75 × 2 = 150 points
// Focus Quality: (1/5) × 100 = 20%
// Consistency: 2/4 = 50% → 0% bonus (below 70%)
// Base Score: 150 × 0.2 × 1.0 = 30 points
// Streak Bonus: (3 × 5) + 0 = 15 points
// Final Score: 30 + 15 = 45 points
Scenario 3: Balanced Student

let balancedStudent = {
    focusedMinutes: 100,        // 1.67 hours
    livesRemaining: 3,          // Lost 2 lives
    completedSessions: 4,       // Completed 4/5 sessions
    totalSessions: 5,
    dailyStreak: 12,           // Good streak
    perfectFocusStreak: 3      // Some perfect sessions
};

// Calculation:
// Time Score: 100 × 2 = 200 points
// Focus Quality: (3/5) × 100 = 60%
// Consistency: 4/5 = 80% → 30% bonus
// Base Score: 200 × 0.6 × 1.3 = 156 points
// Streak Bonus: (12 × 5) + (3^1.5 × 3) = 60 + 16 = 76 points
// Final Score: 156 + 76 = 232 points
🎯 Why This Formula Works
1. Balances Multiple Factors:

Time Investment - Rewards effort and dedication
Focus Quality - Rewards discipline and concentration
Consistency - Rewards completing what you start
Habit Building - Rewards long-term commitment
2. Prevents Gaming:

Diminishing Returns - Can't just grind hours for infinite points
Quality Gates - Poor focus severely limits score potential
Completion Requirements - Must finish sessions to get consistency bonus
3. Encourages Healthy Behavior:

Quality Over Quantity - Better to study 1 hour focused than 3 hours distracted
Sustainable Habits - Streak bonuses reward consistency over intensity
Progressive Improvement - Score naturally improves as focus skills develop
4. Fair Competition:

Multiple Paths to Success - Can excel through time, quality, or consistency
Catch-up Mechanics - New users can compete by focusing on quality
Skill-Based - Rewards actual focus ability, not just time availability
📈 Advanced Scoring Features
Daily Score Decay (Prevents Stale Leaderboards):

function applyDailyDecay(historicalScore, daysOld) {
    // Scores lose 2% value per day to keep leaderboards fresh
    let decayFactor = Math.pow(0.98, daysOld);
    return Math.round(historicalScore * decayFactor);
}
Difficulty Adjustment (Adaptive Scoring):

function adjustForDifficulty(baseScore, userLevel) {
    // Beginners get slight bonus, experts get slight penalty
    let levelMultiplier = {
        'beginner': 1.1,    // 10% bonus
        'intermediate': 1.0, // No adjustment
        'advanced': 0.95,   // 5% penalty (higher expectations)
        'expert': 0.9       // 10% penalty
    };
    
    return Math.round(baseScore * levelMultiplier[userLevel]);
}
Weekly Normalization (Fair Weekly Competition):

function normalizeWeeklyScore(dailyScores) {
    // Prevent weekend warriors from dominating weekly boards
    let maxDailyContribution = Math.max(...dailyScores) * 0.3;
    
    return dailyScores.map(score => 
        Math.min(score, maxDailyContribution)
    ).reduce((sum, score) => sum + score, 0);
}
This scoring system creates meaningful competition while encouraging the exact behaviors you want: consistent, focused study habits that build over time!