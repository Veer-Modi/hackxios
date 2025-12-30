'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import TimerDisplay from '@/components/Timer/TimerDisplay';
import LifeDisplay from '@/components/LifeSystem/LifeDisplay';
import Button from '@/components/UI/Button';
import Card from '@/components/UI/Card';
import { 
  createNewSession, 
  startSession, 
  pauseSession, 
  resumeSession, 
  updateSessionTime,
  completeSession,
  stopSession,
  getTimerState,
  POMODORO_DURATION 
} from '@/lib/timer';
import { loseLife, loseLifeAsync, canStartSession, canStartSessionAsync, getTimeUntilReset } from '@/lib/life-system';
import { createFocusDetector } from '@/lib/focus-detection';
import { checkDailyReset, getUser, getDailyStats, getLifeSystem, checkDailyResetAsync, getUserAsync, getDailyStatsAsync, getLifeSystemAsync } from '@/lib/storage';
import { PomodoroSession, User, DailyStats, LifeSystem } from '@/types';

export default function PomodoroPage() {
  // State management
  const [currentSession, setCurrentSession] = useState<PomodoroSession | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [dailyStats, setDailyStats] = useState<DailyStats | null>(null);
  const [lifeSystem, setLifeSystem] = useState<LifeSystem | null>(null);
  const [showLifeWarning, setShowLifeWarning] = useState(false);
// Refs for cleanup
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const focusDetectorRef = useRef<ReturnType<typeof createFocusDetector> | null>(null);

  // Initialize data on component mount
  useEffect(() => {
    const initializeData = async () => {
      await checkDailyResetAsync();
      setUser(await getUserAsync());
      setDailyStats(await getDailyStatsAsync());
      setLifeSystem(await getLifeSystemAsync());
    };
    
    initializeData();
  }, []);

  // Timer update effect
  useEffect(() => {
    if (currentSession && getTimerState(currentSession) === 'running') {
      timerRef.current = setInterval(() => {
        setCurrentSession(prev => {
          if (!prev) return null;
          const updated = updateSessionTime(prev);
          
          // Check if session completed
          if (updated.timeRemaining <= 0) {
            handleSessionComplete();
            return completeSession(updated);
          }
          
          return updated;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentSession]);

  // Focus detection effect
  useEffect(() => {
    if (currentSession && getTimerState(currentSession) === 'running') {
      focusDetectorRef.current = createFocusDetector(
        handleFocusLost,
        handleFocusRegained
      );
      focusDetectorRef.current.start();
    } else {
      if (focusDetectorRef.current) {
        focusDetectorRef.current.stop();
        focusDetectorRef.current = null;
      }
    }

    return () => {
      if (focusDetectorRef.current) {
        focusDetectorRef.current.stop();
      }
    };
  }, [currentSession]);

const handleStartSession = async () => {
    if (!(await canStartSessionAsync())) {
      alert("You're blocked! Wait until tomorrow to start a new session.");
      return;
    }

    const newSession = createNewSession();
    const startedSession = startSession(newSession);
    setCurrentSession(startedSession);

  };

  const handlePauseSession = () => {
    if (!currentSession) return;
    const pausedSession = pauseSession(currentSession);
    setCurrentSession(pausedSession);
  };

  const handleResumeSession = () => {
    if (!currentSession) return;
    const resumedSession = resumeSession(currentSession);
    setCurrentSession(resumedSession);
  };

  const handleStopSession = () => {
    if (!currentSession) return;
    const stoppedSession = stopSession(currentSession);
    setCurrentSession(stoppedSession);
    
    // Clean up focus detector
    if (focusDetectorRef.current) {
      focusDetectorRef.current.stop();
      focusDetectorRef.current = null;
    }
  };

const handleSessionComplete = async () => {
    // Update daily stats
    if (dailyStats && user && currentSession) {
      const updatedStats = {
        ...dailyStats,
        sessionsCompleted: dailyStats.sessionsCompleted + 1,
        totalFocusTime: dailyStats.totalFocusTime + 25,
perfectSessions: currentSession.livesLost === 0 ? dailyStats.perfectSessions + 1 : dailyStats.perfectSessions
      };
      setDailyStats(updatedStats);
      
      // Update user stats
      const updatedUser = { ...user };
      if (currentSession.livesLost === 0) {
        updatedUser.perfectFocusStreak++;
      } else {
        updatedUser.perfectFocusStreak = 0; // Reset perfect streak if lives were lost
      }
      
      setUser(updatedUser);
      
      // Save to backend
      try {
        await import('@/lib/storage').then(async ({ saveDailyStatsAsync, saveUserAsync }) => {
          await saveDailyStatsAsync(updatedStats);
          await saveUserAsync(updatedUser);
        });
      } catch (error) {
        console.error('Failed to save session completion to backend:', error);
      }
    }
    // Clean up focus detector
    if (focusDetectorRef.current) {
      focusDetectorRef.current.stop();
      focusDetectorRef.current = null;
    }
  };

const handleFocusLost = async () => {
    if (!currentSession || getTimerState(currentSession) !== 'running') return;
    
    // Pause the session
    const pausedSession = pauseSession(currentSession);
    setCurrentSession({
      ...pausedSession,
      livesLost: pausedSession.livesLost + 1
    });

    // Lose a life
const result = await loseLifeAsync();
    setLifeSystem(await getLifeSystemAsync());
    setUser(await getUserAsync());
    setDailyStats(await getDailyStatsAsync());
    setShowLifeWarning(true);

    // Hide warning after 3 seconds
    setTimeout(() => setShowLifeWarning(false), 3000);

    if (result.isBlocked) {
      alert("You've lost all your lives! You're blocked until tomorrow.");
      handleStopSession();
    }
  };

  const handleFocusRegained = () => {
    // Session will remain paused - user needs to manually resume
  };

  const handleNewSession = () => {
    setCurrentSession(null);

  };

  if (!user || !dailyStats || !lifeSystem) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  const timerState = getTimerState(currentSession);
  const canStart = canStartSession();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
<h1 className="text-4xl font-bold text-gray-900 mb-2">
            🍅 FocusGuard Pomodoro Arena
          </h1>
          <p className="text-gray-600">
            Stay focused, build streaks, and earn rewards!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Timer Section */}
          <div className="lg:col-span-2">
            <Card title="Pomodoro Timer">
              <TimerDisplay
                timeRemaining={currentSession?.timeRemaining || POMODORO_DURATION}
                state={timerState}
                sessionNumber={dailyStats.sessionsCompleted + 1}
              />
              
              {/* Timer Controls */}
              <div className="flex justify-center gap-4 mt-6">
                {timerState === 'idle' && (
                  <Button 
                    onClick={handleStartSession}
                    disabled={!canStart}
                    size="large"
                  >
                    Start Pomodoro
                  </Button>
                )}
                
                {timerState === 'running' && (
                  <Button 
                    onClick={handlePauseSession}
                    variant="secondary"
                    size="large"
                  >
                    Pause
                  </Button>
                )}
                
                {timerState === 'paused' && (
                  <>
                    <Button 
                      onClick={handleResumeSession}
                      size="large"
                    >
                      Resume
                    </Button>
                    <Button 
                      onClick={handleStopSession}
                      variant="danger"
                      size="large"
                    >
                      Stop
                    </Button>
                  </>
                )}
                
                {(timerState === 'completed' || timerState === 'stopped') && (
                  <Button 
                    onClick={handleNewSession}
                    size="large"
                  >
                    New Session
                  </Button>
                )}
              </div>

            </Card>
          </div>

          {/* Sidebar */}
<div className="space-y-6">
            {/* Life System */}
            <Card title="Life System">
              <LifeDisplay 
                livesRemaining={lifeSystem.livesRemaining}
                showWarning={showLifeWarning}
              />
              
              {user.isBlocked && (
                <div className="mt-4 p-4 bg-red-100 border border-red-200 rounded-lg">
                  <p className="text-red-800 font-semibold">🚫 Blocked!</p>
                  <p className="text-red-600 text-sm mt-1">
                    Reset in: {getTimeUntilReset()}
                  </p>
                </div>
              )}
</Card>

            {/* Focus Rules */}
            <Card title="Focus Rules">
              <div className="space-y-3 text-sm">
                <div className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Switching tabs costs 1 life</span>
                </div>
                <div className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Minimizing window costs 1 life</span>
                </div>
                <div className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Focus on this tab to earn rewards</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Complete sessions to build streaks</span>
                </div>
              </div>
            </Card>

            {/* Today's Progress */}
            <Card title="Today's Progress">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sessions:</span>
                  <span className="font-semibold">{dailyStats.sessionsCompleted}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Focus Time:</span>
                  <span className="font-semibold">{dailyStats.totalFocusTime}m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lives Lost:</span>
                  <span className="font-semibold text-red-600">{dailyStats.livesLost}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Perfect Sessions:</span>
                  <span className="font-semibold text-green-600">{dailyStats.perfectSessions}</span>
                </div>
              </div>
            </Card>

{/* Quick Links */}
            <Card title="Quick Links">
              <div className="space-y-2">
                <Link href="/leaderboard" className="block">
                  <Button variant="secondary" size="small" className="w-full">
                    🏆 View Leaderboard
                  </Button>
                </Link>
                <Link href="/profile" className="block">
                  <Button variant="secondary" size="small" className="w-full">
                    👤 Your Profile
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
