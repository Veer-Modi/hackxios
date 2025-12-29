Pomodoro Timer Behavior - Complete Logic
⏰ Timer State Management
Core Timer States:

const TimerState = {
    IDLE: 'idle',           // Not started
    RUNNING: 'running',     // Actively counting down
    PAUSED: 'paused',       // Paused (manual or automatic)
    COMPLETED: 'completed', // Successfully finished
    STOPPED: 'stopped'      // Manually stopped early
};

let pomodoroTimer = {
    state: TimerState.IDLE,
    duration: 25 * 60,      // 25 minutes in seconds
    timeRemaining: 25 * 60,
    startTime: null,
    pausedAt: null,
    totalPauseTime: 0,
    pauseCount: 0,
    sessionId: null,
    interval: null
};
🚀 Timer Start Logic
Starting a New Session:

function startPomodoro() {
    // Check if user has lives remaining
    if (user.livesRemaining <= 0) {
        showBlockedMessage();
        return false;
    }
    
    // Initialize new session
    pomodoroTimer = {
        state: TimerState.RUNNING,
        duration: 25 * 60,
        timeRemaining: 25 * 60,
        startTime: Date.now(),
        pausedAt: null,
        totalPauseTime: 0,
        pauseCount: 0,
        sessionId: generateSessionId(),
        interval: null
    };
    
    // Start the countdown
    startCountdown();
    
    // Update UI
    updateTimerDisplay();
    showTimerScreen();
    
    // Log session start
    logSessionEvent('session_started');
    
    return true;
}
Countdown Mechanism:

function startCountdown() {
    pomodoroTimer.interval = setInterval(() => {
        if (pomodoroTimer.state === TimerState.RUNNING) {
            pomodoroTimer.timeRemaining--;
            
            // Update display every second
            updateTimerDisplay();
            
            // Check if timer completed
            if (pomodoroTimer.timeRemaining <= 0) {
                completePomodoro();
            }
        }
    }, 1000);
}
⏸️ Pause Logic (Automatic & Manual)
Automatic Pause (Tab Switch):

function autoPauseTimer(reason = 'tab_switch') {
    if (pomodoroTimer.state === TimerState.RUNNING) {
        // Pause the timer
        pomodoroTimer.state = TimerState.PAUSED;
        pomodoroTimer.pausedAt = Date.now();
        pomodoroTimer.pauseCount++;
        
        // Stop the countdown
        clearInterval(pomodoroTimer.interval);
        
        // Deduct a life
        deductLife();
        
        // Update UI to show paused state
        updateTimerDisplay();
        showPauseWarning(reason);
        
        // Log the pause event
        logSessionEvent('auto_paused', {
            reason: reason,
            timeRemaining: pomodoroTimer.timeRemaining,
            pauseCount: pomodoroTimer.pauseCount
        });
    }
}
Manual Pause (User Clicks Pause):

function manualPauseTimer() {
    if (pomodoroTimer.state === TimerState.RUNNING) {
        pomodoroTimer.state = TimerState.PAUSED;
        pomodoroTimer.pausedAt = Date.now();
        
        // Stop countdown but don't deduct life
        clearInterval(pomodoroTimer.interval);
        
        // Update UI
        updateTimerDisplay();
        showManualPauseScreen();
        
        // Log manual pause
        logSessionEvent('manual_paused');
    }
}
▶️ Resume Logic
Resume After Automatic Pause:

function resumeAfterTabSwitch() {
    if (pomodoroTimer.state === TimerState.PAUSED) {
        // Calculate pause duration
        let pauseDuration = Date.now() - pomodoroTimer.pausedAt;
        pomodoroTimer.totalPauseTime += pauseDuration;
        
        // Resume timer
        pomodoroTimer.state = TimerState.RUNNING;
        pomodoroTimer.pausedAt = null;
        
        // Restart countdown
        startCountdown();
        
        // Update UI
        updateTimerDisplay();
        hideWarnings();
        
        // Log resume
        logSessionEvent('resumed_after_pause', {
            pauseDuration: pauseDuration,
            totalPauseTime: pomodoroTimer.totalPauseTime
        });
        
        // Show encouragement message
        showResumeMessage();
    }
}
Resume After Manual Pause:

function resumeManualPause() {
    if (pomodoroTimer.state === TimerState.PAUSED) {
        let pauseDuration = Date.now() - pomodoroTimer.pausedAt;
        pomodoroTimer.totalPauseTime += pauseDuration;
        
        pomodoroTimer.state = TimerState.RUNNING;
        pomodoroTimer.pausedAt = null;
        
        startCountdown();
        updateTimerDisplay();
        
        logSessionEvent('manual_resumed', {
            pauseDuration: pauseDuration
        });
    }
}
✅ Completion Logic
Successful Completion:

function completePomodoro() {
    // Stop the timer
    clearInterval(pomodoroTimer.interval);
    pomodoroTimer.state = TimerState.COMPLETED;
    pomodoroTimer.timeRemaining = 0;
    
    // Calculate session metrics
    let sessionMetrics = calculateSessionMetrics();
    
    // Update user statistics
    updateUserStats(sessionMetrics);
    
    // Update streaks
    updateStreaks(sessionMetrics);
    
    // Show completion screen
    showCompletionScreen(sessionMetrics);
    
    // Log completion
    logSessionEvent('session_completed', sessionMetrics);
    
    // Play completion sound/notification
    playCompletionSound();
    
    // Offer break timer
    offerBreakTimer();
}
Session Metrics Calculation:

function calculateSessionMetrics() {
    let totalSessionTime = Date.now() - pomodoroTimer.startTime;
    let actualFocusTime = totalSessionTime - pomodoroTimer.totalPauseTime;
    let focusQuality = (actualFocusTime / totalSessionTime) * 100;
    
    return {
        sessionId: pomodoroTimer.sessionId,
        totalDuration: totalSessionTime,
        focusTime: actualFocusTime,
        pauseTime: pomodoroTimer.totalPauseTime,
        pauseCount: pomodoroTimer.pauseCount,
        focusQuality: Math.round(focusQuality),
        livesLost: pomodoroTimer.pauseCount, // Each pause = 1 life lost
        completed: true,
        endTime: Date.now()
    };
}
🛑 Stop Logic (Early Termination)
Manual Stop:

function stopPomodoro() {
    if (pomodoroTimer.state === TimerState.RUNNING || 
        pomodoroTimer.state === TimerState.PAUSED) {
        
        // Stop the timer
        clearInterval(pomodoroTimer.interval);
        pomodoroTimer.state = TimerState.STOPPED;
        
        // Calculate partial session metrics
        let partialMetrics = calculatePartialMetrics();
        
        // Update statistics (partial credit)
        updatePartialStats(partialMetrics);
        
        // Show stop confirmation
        showStopConfirmation(partialMetrics);
        
        // Log early stop
        logSessionEvent('session_stopped', partialMetrics);
        
        // Return to dashboard
        setTimeout(() => {
            returnToDashboard();
        }, 3000);
    }
}
Partial Session Metrics:

function calculatePartialMetrics() {
    let timeElapsed = pomodoroTimer.duration - pomodoroTimer.timeRemaining;
    let totalSessionTime = Date.now() - pomodoroTimer.startTime;
    let actualFocusTime = totalSessionTime - pomodoroTimer.totalPauseTime;
    
    return {
        sessionId: pomodoroTimer.sessionId,
        timeElapsed: timeElapsed,
        focusTime: actualFocusTime,
        pauseTime: pomodoroTimer.totalPauseTime,
        pauseCount: pomodoroTimer.pauseCount,
        completed: false,
        stoppedAt: pomodoroTimer.timeRemaining,
        endTime: Date.now()
    };
}
🔄 Timer Display Updates
Real-time Display:

function updateTimerDisplay() {
    let minutes = Math.floor(pomodoroTimer.timeRemaining / 60);
    let seconds = pomodoroTimer.timeRemaining % 60;
    
    // Format time display
    let timeDisplay = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Update main timer
    document.getElementById('timer-display').textContent = timeDisplay;
    
    // Update browser title
    document.title = `${timeDisplay} - AI Study Buddy`;
    
    // Update progress bar
    let progress = ((pomodoroTimer.duration - pomodoroTimer.timeRemaining) / pomodoroTimer.duration) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;
    
    // Update state indicator
    updateStateIndicator();
}

function updateStateIndicator() {
    let indicator = document.getElementById('state-indicator');
    
    switch (pomodoroTimer.state) {
        case TimerState.RUNNING:
            indicator.textContent = '🍅 POMODORO IN PROGRESS';
            indicator.className = 'running';
            break;
        case TimerState.PAUSED:
            indicator.textContent = '⏸️ TIMER PAUSED';
            indicator.className = 'paused';
            break;
        case TimerState.COMPLETED:
            indicator.textContent = '✅ SESSION COMPLETED!';
            indicator.className = 'completed';
            break;
    }
}
🎯 Advanced Timer Features
Session Recovery (Browser Refresh):

function recoverSession() {
    let savedSession = localStorage.getItem('activeSession');
    if (savedSession) {
        let session = JSON.parse(savedSession);
        let now = Date.now();
        let elapsed = now - session.startTime;
        
        if (elapsed < session.duration * 1000) {
            // Session still valid - restore it
            pomodoroTimer = session;
            pomodoroTimer.timeRemaining = session.duration - Math.floor(elapsed / 1000);
            
            if (pomodoroTimer.state === TimerState.RUNNING) {
                startCountdown();
            }
            
            updateTimerDisplay();
            showSessionRecoveredMessage();
        }
    }
}
Background Timer (Service Worker):

// Keep timer running even when tab is not active
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/timer-worker.js');
    
    // Sync timer with service worker
    navigator.serviceWorker.addEventListener('message', function(event) {
        if (event.data.type === 'timer-sync') {
            syncTimerWithWorker(event.data.timerState);
        }
    });
}
📊 Timer Analytics
Session Quality Metrics:

function analyzeSessionQuality(metrics) {
    let quality = {
        focusScore: metrics.focusQuality,
        pauseFrequency: metrics.pauseCount / (metrics.totalDuration / 60000), // pauses per minute
        averageFocusStretch: metrics.focusTime / (metrics.pauseCount + 1),
        improvement: calculateImprovement(metrics)
    };
    
    return quality;
}
This comprehensive timer system ensures accurate tracking, fair pause/resume behavior, and meaningful completion metrics that drive the gamification and improvement aspects of your AI Study Buddy!