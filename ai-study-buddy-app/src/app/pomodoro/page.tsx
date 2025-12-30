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
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  const timerState = getTimerState(currentSession);
  const canStart = canStartSession();

  return (
    <div className="min-h-screen py-8 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 gradient-text">
            🍅 FocusGuard Pomodoro Arena
          </h1>
          <p className="text-white/80 text-lg">
            Stay focused, build streaks, and earn rewards!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Timer Section - CENTER FOCUS */}
          <div className="lg:col-span-2">
            <Card className="glass-strong">
              <TimerDisplay
                timeRemaining={currentSession?.timeRemaining || POMODORO_DURATION}
                state={timerState}
                sessionNumber={dailyStats.sessionsCompleted + 1}
              />
              
              {/* Timer Controls */}
              <div className="flex justify-center gap-4 mt-8">
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

          {/* Sidebar - Discipline & Motivation */}
          <div className="space-y-6">
            {/* Life System - LEFT PANEL (Discipline) */}
            <Card title="❤️ Lives" className={showLifeWarning ? 'animate-shake' : ''}>
              <LifeDisplay 
                livesRemaining={lifeSystem.livesRemaining}
                showWarning={showLifeWarning}
              />
              
              {user.isBlocked && (
                <div className="mt-4 p-4 bg-red-500/20 border border-red-400/50 rounded-lg">
                  <p className="text-red-300 font-semibold">🚫 Blocked!</p>
                  <p className="text-red-200 text-sm mt-1">
                    Reset in: {getTimeUntilReset()}
                  </p>
                </div>
              )}
            </Card>

            {/* Motivation Panel - RIGHT */}
            <Card title="🔥 Focus Streak">
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-400 mb-2 animate-pulse-glow">
                  🔥 {user.dailyStreak || 0}
                </div>
                <p className="text-white/70 text-sm">Daily Streak</p>
              </div>
            </Card>

            <Card title="📅 Daily Streak">
              <div className="text-center">
                <div className="text-4xl font-bold text-teal-400 mb-2">
                  📅 {dailyStats.sessionsCompleted}
                </div>
                <p className="text-white/70 text-sm">Sessions Today</p>
              </div>
            </Card>

            {/* Today's Progress */}
            <Card title="Today's Progress">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/70">Sessions:</span>
                  <span className="font-semibold text-white">{dailyStats.sessionsCompleted}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Focus Time:</span>
                  <span className="font-semibold text-green-400">{dailyStats.totalFocusTime}m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Lives Lost:</span>
                  <span className="font-semibold text-red-400">{dailyStats.livesLost}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Perfect Sessions:</span>
                  <span className="font-semibold text-emerald-400">{dailyStats.perfectSessions}</span>
                </div>
              </div>
            </Card>

            {/* Focus Rules */}
            <Card title="Focus Rules">
              <div className="space-y-3 text-sm">
                <div className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  <span className="text-white/80">Switching tabs costs 1 life</span>
                </div>
                <div className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  <span className="text-white/80">Minimizing window costs 1 life</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  <span className="text-white/80">Focus on this tab to earn rewards</span>
                </div>
                <div className="flex items-start">
                  <span className="text-emerald-400 mr-2">•</span>
                  <span className="text-white/80">Complete sessions to build streaks</span>
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
