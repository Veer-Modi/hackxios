Leaderboard System Logic
🏠 Room Leaderboard (Local Competition)
Room Concept:

Small groups of 10-20 users studying together
Friends, classmates, or study groups
More intimate competition with people you know
Easier to reach top positions for motivation
Room Leaderboard Logic:

function calculateRoomLeaderboard(roomId, timeframe = 'daily') {
    let roomMembers = getRoomMembers(roomId);
    let leaderboard = [];
    
    for (let user of roomMembers) {
        let userStats = getUserStats(user.id, timeframe);
        let focusScore = calculateFocusScore(userStats);
        
        leaderboard.push({
            userId: user.id,
            username: user.username,
            focusScore: focusScore.totalScore,
            studyTime: userStats.focusedMinutes,
            focusQuality: focusScore.breakdown.focusQuality,
            livesRemaining: userStats.livesRemaining,
            sessionsCompleted: userStats.completedSessions,
            currentStreak: userStats.dailyStreak,
            rank: 0 // Will be set after sorting
        });
    }
    
    // Sort by focus score (descending)
    leaderboard.sort((a, b) => b.focusScore - a.focusScore);
    
    // Assign ranks
    leaderboard.forEach((entry, index) => {
        entry.rank = index + 1;
    });
    
    return leaderboard;
}
Room Creation & Management:

function createStudyRoom(creatorId, roomName, isPrivate = false) {
    let room = {
        roomId: generateRoomId(),
        name: roomName,
        createdBy: creatorId,
        createdAt: new Date(),
        isPrivate: isPrivate,
        inviteCode: generateInviteCode(),
        members: [creatorId],
        maxMembers: 20,
        settings: {
            allowInvites: true,
            showRealNames: false,
            dailyGoal: 120 // minutes
        }
    };
    
    saveRoom(room);
    return room;
}

function joinRoom(userId, inviteCode) {
    let room = getRoomByInviteCode(inviteCode);
    
    if (!room) {
        throw new Error('Invalid invite code');
    }
    
    if (room.members.length >= room.maxMembers) {
        throw new Error('Room is full');
    }
    
    if (!room.members.includes(userId)) {
        room.members.push(userId);
        saveRoom(room);
        
        // Notify room members
        notifyRoomMembers(room.roomId, `${getUserName(userId)} joined the room!`);
    }
    
    return room;
}
🌍 Global Daily Leaderboard (Worldwide Competition)
Global Leaderboard Logic:

function calculateGlobalLeaderboard(date = new Date(), limit = 100) {
    // Get all users who studied today
    let activeUsers = getActiveUsersForDate(date);
    let globalLeaderboard = [];
    
    for (let user of activeUsers) {
        let dailyStats = getUserDailyStats(user.id, date);
        
        // Only include users who completed at least 1 session
        if (dailyStats.completedSessions > 0) {
            let focusScore = calculateFocusScore(dailyStats);
            
            globalLeaderboard.push({
                userId: user.id,
                username: user.username,
                country: user.country,
                focusScore: focusScore.totalScore,
                studyTime: dailyStats.focusedMinutes,
                focusQuality: focusScore.breakdown.focusQuality,
                sessionsCompleted: dailyStats.completedSessions,
                livesRemaining: dailyStats.livesRemaining,
                currentStreak: dailyStats.dailyStreak,
                rank: 0
            });
        }
    }
    
    // Sort by focus score
    globalLeaderboard.sort((a, b) => b.focusScore - a.focusScore);
    
    // Assign ranks and limit results
    return globalLeaderboard.slice(0, limit).map((entry, index) => {
        entry.rank = index + 1;
        return entry;
    });
}
Efficient Global Ranking (For Scale):

// Pre-calculated rankings for performance
function updateGlobalRankingsCache() {
    let today = new Date();
    let rankings = calculateGlobalLeaderboard(today, 1000);
    
    // Cache top 1000 for fast access
    redis.setex(`global_leaderboard:${formatDate(today)}`, 3600, JSON.stringify(rankings));
    
    // Update user rank cache
    rankings.forEach(entry => {
        redis.setex(`user_rank:${entry.userId}:${formatDate(today)}`, 3600, entry.rank);
    });
}

// Run every hour
setInterval(updateGlobalRankingsCache, 3600000);
📊 Multi-Timeframe Leaderboards
Daily, Weekly, Monthly, All-Time:

function getLeaderboard(type, timeframe, userId = null) {
    let leaderboard;
    
    switch (type) {
        case 'room':
            let userRooms = getUserRooms(userId);
            leaderboard = calculateRoomLeaderboard(userRooms[0], timeframe);
            break;
            
        case 'global':
            leaderboard = getGlobalLeaderboard(timeframe);
            break;
            
        case 'friends':
            let friends = getUserFriends(userId);
            leaderboard = calculateFriendsLeaderboard(friends, timeframe);
            break;
    }
    
    // Add user's position if not in top results
    if (userId && !leaderboard.find(entry => entry.userId === userId)) {
        let userEntry = getUserLeaderboardEntry(userId, type, timeframe);
        leaderboard.push({
            ...userEntry,
            isCurrentUser: true
        });
    }
    
    return leaderboard;
}
Timeframe Calculation Logic:

function getUserStats(userId, timeframe) {
    let startDate, endDate = new Date();
    
    switch (timeframe) {
        case 'daily':
            startDate = new Date();
            startDate.setHours(0, 0, 0, 0);
            break;
            
        case 'weekly':
            startDate = new Date();
            startDate.setDate(startDate.getDate() - startDate.getDay()); // Start of week
            startDate.setHours(0, 0, 0, 0);
            break;
            
        case 'monthly':
            startDate = new Date();
            startDate.setDate(1); // Start of month
            startDate.setHours(0, 0, 0, 0);
            break;
            
        case 'alltime':
            startDate = new Date(0); // Beginning of time
            break;
    }
    
    return aggregateUserStats(userId, startDate, endDate);
}
🏆 Leaderboard Tiers & Divisions
Skill-Based Divisions:

function assignUserDivision(userStats) {
    let totalSessions = userStats.lifetimeCompletedSessions;
    let averageFocusQuality = userStats.averageFocusQuality;
    
    // Division criteria
    if (totalSessions >= 500 && averageFocusQuality >= 90) {
        return 'Champion'; // Top tier
    } else if (totalSessions >= 200 && averageFocusQuality >= 80) {
        return 'Expert';
    } else if (totalSessions >= 50 && averageFocusQuality >= 70) {
        return 'Advanced';
    } else if (totalSessions >= 10 && averageFocusQuality >= 60) {
        return 'Intermediate';
    } else {
        return 'Beginner';
    }
}

function getDivisionLeaderboard(division, timeframe) {
    let users = getUsersByDivision(division);
    return calculateLeaderboardForUsers(users, timeframe);
}
🎯 Real-Time Updates
Live Leaderboard Updates:

// WebSocket updates for real-time competition
function broadcastLeaderboardUpdate(roomId, updatedEntry) {
    let roomMembers = getRoomMembers(roomId);
    
    roomMembers.forEach(member => {
        if (member.isOnline) {
            websocket.send(member.socketId, {
                type: 'leaderboard_update',
                data: {
                    roomId: roomId,
                    updatedUser: updatedEntry,
                    timestamp: new Date()
                }
            });
        }
    });
}

// Update leaderboards when session completes
function onSessionComplete(userId, sessionData) {
    // Update user stats
    updateUserStats(userId, sessionData);
    
    // Recalculate room leaderboard
    let userRooms = getUserRooms(userId);
    userRooms.forEach(roomId => {
        let updatedLeaderboard = calculateRoomLeaderboard(roomId, 'daily');
        broadcastLeaderboardUpdate(roomId, updatedLeaderboard);
    });
    
    // Update global leaderboard cache if user is in top 1000
    updateGlobalLeaderboardIfNeeded(userId);
}
📱 Leaderboard UI Logic
Adaptive Display:

function formatLeaderboardForDisplay(leaderboard, currentUserId) {
    return leaderboard.map(entry => {
        let displayEntry = {
            rank: entry.rank,
            username: entry.username,
            focusScore: entry.focusScore,
            studyTime: formatTime(entry.studyTime),
            focusQuality: `${entry.focusQuality}%`,
            livesDisplay: generateLivesDisplay(entry.livesRemaining),
            streakEmoji: getStreakEmoji(entry.currentStreak),
            isCurrentUser: entry.userId === currentUserId
        };
        
        // Add rank badges
        if (entry.rank === 1) displayEntry.badge = '🥇';
        else if (entry.rank === 2) displayEntry.badge = '🥈';
        else if (entry.rank === 3) displayEntry.badge = '🥉';
        
        return displayEntry;
    });
}

function generateLivesDisplay(livesRemaining) {
    let hearts = '❤️'.repeat(livesRemaining);
    let empty = '⚫'.repeat(5 - livesRemaining);
    return hearts + empty;
}

function getStreakEmoji(streak) {
    if (streak >= 30) return '🔥🔥🔥';
    if (streak >= 14) return '🔥🔥';
    if (streak >= 7) return '🔥';
    return streak.toString();
}
🎮 Gamification Features
Leaderboard Achievements:

function checkLeaderboardAchievements(userId, newRank, timeframe) {
    let achievements = [];
    
    // Rank-based achievements
    if (newRank === 1) {
        achievements.push(`${timeframe}_champion`);
    }
    
    if (newRank <= 3) {
        achievements.push(`${timeframe}_podium`);
    }
    
    if (newRank <= 10) {
        achievements.push(`${timeframe}_top_ten`);
    }
    
    // Improvement achievements
    let previousRank = getUserPreviousRank(userId, timeframe);
    if (previousRank && newRank < previousRank) {
        let improvement = previousRank - newRank;
        if (improvement >= 10) {
            achievements.push('big_climber');
        }
    }
    
    return achievements;
}
Seasonal Competitions:

function createSeasonalLeaderboard(season) {
    return {
        seasonId: generateSeasonId(),
        name: season.name,
        startDate: season.startDate,
        endDate: season.endDate,
        prizes: season.prizes,
        participants: [],
        leaderboard: [],
        isActive: true
    };
}
This leaderboard system creates multiple layers of competition - from intimate room battles to global championships - keeping users engaged at every skill level while maintaining fair and meaningful competition!