Streak System Logic - Daily & Perfect Focus
📅 Daily Streak Logic
What Counts as a "Study Day":

Complete at least 1 full Pomodoro session (25 minutes)
Session must be completed, not just started
Partial sessions (stopped early) don't count
Break timers don't count toward daily requirement
Daily Streak Rules:

function updateDailyStreak(userId, sessionData) {
    let user = getUser(userId);
    let today = new Date();
    let yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Check if this is the first completed session today
    let todaysSessions = getUserSessionsForDate(userId, today);
    let completedToday = todaysSessions.filter(s => s.completed).length;
    
    if (completedToday === 1) { // First completion today
        // Check if user studied yesterday
        let yesterdaysSessions = getUserSessionsForDate(userId, yesterday);
        let completedYesterday = yesterdaysSessions.filter(s => s.completed).length;
        
        if (completedYesterday > 0) {
            // Continuing streak
            user.dailyStreak++;
        } else {
            // Check if this is day 2 of a new streak
            let lastStudyDate = user.lastStudyDate;
            if (isSameDay(lastStudyDate, yesterday)) {
                user.dailyStreak++;
            } else {
                // Starting new streak
                user.dailyStreak = 1;
            }
        }
        
        // Update last study date
        user.lastStudyDate = today;
        
        // Update best streak if needed
        if (user.dailyStreak > user.bestDailyStreak) {
            user.bestDailyStreak = user.dailyStreak;
        }
        
        saveUser(user);
        
        // Trigger streak milestone notifications
        checkDailyStreakMilestones(user);
    }
}
Daily Streak Reset Logic:

function checkDailyStreakReset() {
    // Run this at midnight for all users
    let allUsers = getAllActiveUsers();
    let today = new Date();
    let yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    for (let user of allUsers) {
        // Check if user studied yesterday
        let yesterdaysSessions = getUserSessionsForDate(user.id, yesterday);
        let completedYesterday = yesterdaysSessions.filter(s => s.completed).length;
        
        if (completedYesterday === 0 && user.dailyStreak > 0) {
            // User broke their streak
            user.dailyStreak = 0;
            user.streakBrokenDate = yesterday;
            
            saveUser(user);
            
            // Send streak broken notification
            sendStreakBrokenNotification(user);
        }
    }
}

// Schedule to run at midnight
cron.schedule('0 0 * * *', checkDailyStreakReset);
🎯 Perfect Focus Streak Logic
What Counts as "Perfect Focus":

Complete a full Pomodoro session (25 minutes)
Zero lives lost during that session
No tab switches, no pauses due to distractions
Manual pauses are allowed (don't break perfect focus)
Perfect Focus Streak Rules:

function updatePerfectFocusStreak(userId, sessionData) {
    let user = getUser(userId);
    
    if (sessionData.completed && sessionData.livesLost === 0) {
        // Perfect session - increment streak
        user.perfectFocusStreak++;
        user.lastPerfectSession = new Date();
        
        // Update best perfect streak
        if (user.perfectFocusStreak > user.bestPerfectStreak) {
            user.bestPerfectStreak = user.perfectFocusStreak;
        }
        
        // Check for perfect streak milestones
        checkPerfectStreakMilestones(user);
        
    } else if (sessionData.completed && sessionData.livesLost > 0) {
        // Completed but lost lives - reset perfect streak
        user.perfectFocusStreak = 0;
        user.perfectStreakBrokenAt = new Date();
        
        // Send gentle encouragement, not harsh notification
        sendPerfectStreakResetMessage(user, sessionData.livesLost);
    }
    
    saveUser(user);
}
Perfect Focus Streak Reset Conditions:

function checkPerfectStreakReset(sessionData) {
    // Perfect streak resets when:
    return (
        sessionData.livesLost > 0 ||           // Lost any lives
        sessionData.tabSwitches > 0 ||        // Any tab switches
        sessionData.focusQuality < 100        // Any focus interruptions
    );
    
    // Perfect streak DOES NOT reset when:
    // - Manual pause/resume
    // - Session stopped early (just doesn't count)
    // - Break timer used
    // - App minimized briefly (<30 seconds)
}
📊 Streak Data Structure
User Streak Schema:

let userStreaks = {
    userId: 'user123',
    
    // Daily Streak Data
    dailyStreak: 15,                    // Current consecutive days
    bestDailyStreak: 45,               // Longest ever achieved
    lastStudyDate: '2024-01-15',       // Last day user studied
    streakBrokenDate: '2023-12-20',    // When last streak was broken
    
    // Perfect Focus Streak Data
    perfectFocusStreak: 8,             // Current consecutive perfect sessions
    bestPerfectStreak: 23,             // Longest perfect streak ever
    lastPerfectSession: '2024-01-15T14:30:00Z',
    perfectStreakBrokenAt: '2024-01-14T10:15:00Z',
    
    // Streak Statistics
    totalStudyDays: 127,               // Lifetime study days
    totalPerfectSessions: 89,          // Lifetime perfect sessions
    streakRecoveries: 5,               // Times rebuilt after breaking
    
    // Milestone Achievements
    achievedMilestones: [
        'daily_7', 'daily_30', 'perfect_10', 'perfect_20'
    ]
};
🏆 Streak Milestones & Rewards
Daily Streak Milestones:

const DAILY_STREAK_MILESTONES = {
    3: { name: 'Getting Started', reward: 'streak_starter_badge', bonus: 10 },
    7: { name: 'One Week Warrior', reward: 'week_warrior_badge', bonus: 25 },
    14: { name: 'Two Week Champion', reward: 'fortnight_badge', bonus: 50 },
    30: { name: 'Monthly Master', reward: 'monthly_badge', bonus: 100 },
    60: { name: 'Consistency King', reward: 'consistency_crown', bonus: 200 },
    100: { name: 'Centurion', reward: 'centurion_badge', bonus: 500 },
    365: { name: 'Year Long Legend', reward: 'legend_status', bonus: 1000 }
};

function checkDailyStreakMilestones(user) {
    let milestone = DAILY_STREAK_MILESTONES[user.dailyStreak];
    
    if (milestone && !user.achievedMilestones.includes(`daily_${user.dailyStreak}`)) {
        // Award milestone
        user.achievedMilestones.push(`daily_${user.dailyStreak}`);
        user.totalScore += milestone.bonus;
        
        // Send celebration notification
        sendMilestoneNotification(user, milestone);
        
        // Unlock special features
        unlockStreakFeatures(user, user.dailyStreak);
    }
}
Perfect Focus Milestones:

const PERFECT_FOCUS_MILESTONES = {
    5: { name: 'Focus Rookie', reward: 'focus_rookie_badge', bonus: 15 },
    10: { name: 'Concentration Cadet', reward: 'concentration_badge', bonus: 30 },
    20: { name: 'Focus Master', reward: 'focus_master_badge', bonus: 75 },
    50: { name: 'Zen Master', reward: 'zen_badge', bonus: 200 },
    100: { name: 'Perfect Mind', reward: 'perfect_mind_badge', bonus: 500 }
};
🔄 Streak Recovery & Grace Periods
Grace Period for Daily Streaks:

function checkStreakGracePeriod(user) {
    // Allow 6-hour grace period for different timezones/late night study
    let now = new Date();
    let sixHoursAgo = new Date(now.getTime() - (6 * 60 * 60 * 1000));
    
    if (user.lastStudyDate && 
        user.lastStudyDate >= sixHoursAgo && 
        user.dailyStreak > 0) {
        // Still within grace period - don't reset streak yet
        return true;
    }
    
    return false;
}
Streak Freeze (Premium Feature):

function useStreakFreeze(userId) {
    let user = getUser(userId);
    
    if (user.streakFreezes > 0 && user.dailyStreak >= 7) {
        user.streakFreezes--;
        user.streakFreezeUsed = new Date();
        
        // Protect streak for 24 hours
        user.streakProtectedUntil = new Date(Date.now() + 24 * 60 * 60 * 1000);
        
        saveUser(user);
        return true;
    }
    
    return false;
}
📱 Streak Display Logic
Streak Visualization:

function formatStreakDisplay(user) {
    let dailyDisplay = {
        current: user.dailyStreak,
        best: user.bestDailyStreak,
        emoji: getStreakEmoji(user.dailyStreak),
        nextMilestone: getNextMilestone(user.dailyStreak, DAILY_STREAK_MILESTONES),
        daysUntilMilestone: null
    };
    
    let perfectDisplay = {
        current: user.perfectFocusStreak,
        best: user.bestPerfectStreak,
        emoji: getPerfectEmoji(user.perfectFocusStreak),
        nextMilestone: getNextMilestone(user.perfectFocusStreak, PERFECT_FOCUS_MILESTONES)
    };
    
    return { daily: dailyDisplay, perfect: perfectDisplay };
}

function getStreakEmoji(streak) {
    if (streak >= 100) return '🔥🔥🔥🔥';
    if (streak >= 30) return '🔥🔥🔥';
    if (streak >= 14) return '🔥🔥';
    if (streak >= 7) return '🔥';
    if (streak >= 3) return '⭐';
    return '📚';
}
🎮 Streak Gamification
Streak Challenges:

function createStreakChallenge(type, duration, participants) {
    return {
        challengeId: generateId(),
        type: type, // 'daily' or 'perfect'
        duration: duration, // days
        participants: participants,
        startDate: new Date(),
        endDate: new Date(Date.now() + duration * 24 * 60 * 60 * 1000),
        leaderboard: [],
        prizes: calculateChallengePrizes(participants.length)
    };
}
Streak Social Features:

function shareStreakMilestone(userId, milestone) {
    let user = getUser(userId);
    let shareData = {
        userId: userId,
        username: user.username,
        milestone: milestone,
        streakCount: user.dailyStreak,
        shareText: `Just hit a ${milestone.name} with ${user.dailyStreak} days of focused studying! 🔥`,
        timestamp: new Date()
    };
    
    // Share to user's study rooms
    let userRooms = getUserRooms(userId);
    userRooms.forEach(roomId => {
        broadcastToRoom(roomId, 'streak_milestone', shareData);
    });
    
    return shareData;
}
🛡️ Streak Integrity & Anti-Cheat
Streak Validation:

function validateStreakIntegrity(userId) {
    let user = getUser(userId);
    let sessions = getUserSessions(userId, user.lastStudyDate);
    
    // Verify streak claims match actual session data
    let actualCompletedDays = countConsecutiveStudyDays(sessions);
    
    if (Math.abs(user.dailyStreak - actualCompletedDays) > 1) {
        // Streak mismatch - recalculate from session data
        user.dailyStreak = actualCompletedDays;
        logStreakCorrection(userId, 'daily_streak_corrected');
    }
    
    // Validate perfect focus streak
    let perfectSessions = countConsecutivePerfectSessions(sessions);
    if (user.perfectFocusStreak !== perfectSessions) {
        user.perfectFocusStreak = perfectSessions;
        logStreakCorrection(userId, 'perfect_streak_corrected');
    }
    
    saveUser(user);
}
This streak system creates powerful habit-building mechanics while maintaining fairness and preventing manipulation. The dual-streak approach rewards both consistency (daily) and quality (perfect focus), giving users multiple paths to achievement!