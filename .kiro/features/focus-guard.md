Tab Switching Detection & Timer Pausing
🎯 Core Detection Methods
1. Page Visibility API (Primary Method)

// Detect when user switches away from tab
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // User switched away - PAUSE TIMER
        pauseTimer();
        recordTabSwitch();
        deductLife();
    } else {
        // User returned - SHOW WARNING
        showReturnWarning();
        // Timer stays paused until user clicks "Resume"
    }
});
2. Window Focus Events (Backup Method)

// Additional detection for window focus changes
window.addEventListener('blur', function() {
    // Window lost focus - likely tab switch
    if (!document.hidden) {
        pauseTimer();
        recordTabSwitch();
    }
});

window.addEventListener('focus', function() {
    // Window regained focus
    if (!timerPaused) {
        showReturnWarning();
    }
});
⏰ Timer Pause Logic
Timer State Management:

let timerState = {
    isRunning: false,
    isPaused: false,
    timeRemaining: 1500, // 25 minutes in seconds
    pausedAt: null,
    totalPauseTime: 0
};

function pauseTimer() {
    if (timerState.isRunning && !timerState.isPaused) {
        timerState.isPaused = true;
        timerState.pausedAt = Date.now();
        
        // Stop the countdown interval
        clearInterval(timerInterval);
        
        // Update UI to show paused state
        updateTimerDisplay();
        
        // Log the pause event
        logEvent('timer_paused', 'tab_switch');
    }
}

function resumeTimer() {
    if (timerState.isPaused) {
        // Calculate how long we were paused
        let pauseDuration = Date.now() - timerState.pausedAt;
        timerState.totalPauseTime += pauseDuration;
        
        // Resume countdown
        timerState.isPaused = false;
        timerState.pausedAt = null;
        
        // Restart the interval
        startTimerInterval();
        
        // Log the resume event
        logEvent('timer_resumed', pauseDuration);
    }
}
🚨 Edge Cases & Solutions
1. Browser Minimization

// Problem: Minimizing browser triggers visibility change
// Solution: Don't penalize for minimizing if no other tabs open

function handleVisibilityChange() {
    if (document.hidden) {
        // Check if this is a minimize vs tab switch
        setTimeout(() => {
            if (document.hidden) {
                // Still hidden after delay = likely tab switch
                pauseTimer();
                deductLife();
            }
        }, 100);
    }
}
2. Alt+Tab (Application Switching)

// Problem: Switching to other applications
// Solution: Detect application focus loss

let applicationFocused = true;

window.addEventListener('blur', function() {
    applicationFocused = false;
    
    // Give brief grace period for quick Alt+Tab
    setTimeout(() => {
        if (!applicationFocused && !document.hidden) {
            pauseTimer();
            deductLife();
        }
    }, 2000); // 2-second grace period
});

window.addEventListener('focus', function() {
    applicationFocused = true;
});
3. Developer Tools Opening

// Problem: Opening DevTools can trigger focus events
// Solution: Detect DevTools and ignore

let devToolsOpen = false;

// Detect DevTools by checking window size changes
let windowHeight = window.outerHeight;
setInterval(() => {
    if (window.outerHeight < windowHeight * 0.8) {
        devToolsOpen = true;
    } else {
        devToolsOpen = false;
    }
    windowHeight = window.outerHeight;
}, 1000);

function shouldIgnoreFocusLoss() {
    return devToolsOpen || 
           window.outerHeight < 400 || // Very small window
           document.fullscreenElement; // Fullscreen mode
}
4. Mobile Browser Behavior

// Problem: Mobile browsers behave differently
// Solution: Detect mobile and adjust sensitivity

function isMobile() {
    return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function handleMobileVisibility() {
    if (isMobile()) {
        // Mobile: Only penalize after longer delay
        setTimeout(() => {
            if (document.hidden) {
                pauseTimer();
                deductLife();
            }
        }, 3000); // 3-second grace period for mobile
    } else {
        // Desktop: Immediate response
        pauseTimer();
        deductLife();
    }
}
5. System Notifications & Popups

// Problem: System notifications can steal focus
// Solution: Track focus duration before penalizing

let focusLostTime = null;
const GRACE_PERIOD = 5000; // 5 seconds

document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        focusLostTime = Date.now();
        
        // Start grace period timer
        setTimeout(() => {
            if (document.hidden && focusLostTime) {
                let timeLost = Date.now() - focusLostTime;
                if (timeLost >= GRACE_PERIOD) {
                    pauseTimer();
                    deductLife();
                }
            }
        }, GRACE_PERIOD);
    } else {
        // Returned within grace period
        focusLostTime = null;
    }
});
6. Browser Refresh/Reload

// Problem: Page refresh loses timer state
// Solution: Save state to localStorage before unload

window.addEventListener('beforeunload', function() {
    if (timerState.isRunning) {
        // Save current timer state
        localStorage.setItem('pomodoroState', JSON.stringify({
            timeRemaining: timerState.timeRemaining,
            startTime: timerState.startTime,
            isPaused: timerState.isPaused,
            sessionId: currentSessionId
        }));
    }
});

// Restore state on page load
window.addEventListener('load', function() {
    let savedState = localStorage.getItem('pomodoroState');
    if (savedState) {
        let state = JSON.parse(savedState);
        // Restore timer with adjusted time
        restoreTimerState(state);
        localStorage.removeItem('pomodoroState');
    }
});
7. Multiple Browser Windows

// Problem: User opens study app in multiple windows
// Solution: Use localStorage to coordinate between windows

function checkMultipleWindows() {
    localStorage.setItem('activeWindow', window.name);
    
    // Listen for other windows
    window.addEventListener('storage', function(e) {
        if (e.key === 'activeWindow' && e.newValue !== window.name) {
            // Another window became active
            if (timerState.isRunning) {
                pauseTimer();
                showMessage('Timer paused - active in another window');
            }
        }
    });
}
🛡️ Anti-Cheat Measures
Prevent Timer Manipulation:

// Server-side validation
function validateSession(sessionData) {
    let expectedDuration = 25 * 60 * 1000; // 25 minutes
    let actualDuration = sessionData.endTime - sessionData.startTime;
    let pauseTime = sessionData.totalPauseTime;
    
    // Check if timing makes sense
    if (actualDuration - pauseTime > expectedDuration * 1.1) {
        // Suspicious - took too long
        flagSuspiciousSession(sessionData);
    }
    
    // Check pause frequency
    if (sessionData.pauseCount > 10) {
        // Too many pauses - possible manipulation
        flagSuspiciousSession(sessionData);
    }
}
📱 Cross-Platform Considerations
Desktop Browsers:

Full Page Visibility API support
Reliable focus/blur events
Can detect DevTools opening
Mobile Browsers:

Limited background processing
Different visibility behavior
Need longer grace periods
PWA (Progressive Web App):

Better background detection
Can use Service Workers
More native-like behavior
This comprehensive approach ensures your focus detection is robust while being fair to users and handling the many edge cases that can occur in real-world usage!