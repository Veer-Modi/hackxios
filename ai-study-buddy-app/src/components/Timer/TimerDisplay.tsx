// Timer display component for AI Study Buddy

'use client';

import React from 'react';
import { formatTime } from '@/lib/timer';
import { TimerState } from '@/types';

interface TimerDisplayProps {
  timeRemaining: number;
  state: TimerState;
  sessionNumber?: number;
}

export default function TimerDisplay({ 
  timeRemaining, 
  state, 
  sessionNumber = 1 
}: TimerDisplayProps) {
  const getStateDisplay = () => {
    switch (state) {
      case 'running':
        return '🍅 POMODORO IN PROGRESS';
      case 'paused':
        return '⏸️ TIMER PAUSED';
      case 'completed':
        return '✅ SESSION COMPLETED!';
      case 'stopped':
        return '⏹️ SESSION STOPPED';
      default:
        return '📚 READY TO STUDY';
    }
  };
  
  const getStateColor = () => {
    switch (state) {
      case 'running':
        return 'text-green-400';
      case 'paused':
        return 'text-yellow-400';
      case 'completed':
        return 'text-cyan-400';
      case 'stopped':
        return 'text-red-400';
      default:
        return 'text-white/70';
    }
  };
  
  return (
    <div className="text-center">
      {/* Session Info */}
      <div className="text-sm text-white/70 mb-4">
        Session {sessionNumber} of today
      </div>
      
      {/* Timer Display - Large numbers with gradient */}
      <div className="mb-6">
        <div className="text-7xl md:text-8xl font-mono font-bold gradient-text mb-4 animate-pulse-glow">
          {formatTime(timeRemaining)}
        </div>
      </div>
      
      {/* State Display */}
      <div className={`text-xl font-semibold mb-6 ${getStateColor()}`}>
        {getStateDisplay()}
      </div>
      
      {/* Focus Message */}
      {state === 'running' && (
        <div className="mt-6 p-4 bg-cyan-500/20 border border-cyan-400/50 rounded-xl">
          <p className="text-white font-medium">
            Stay focused on this tab! 👀
          </p>
          <p className="text-white/80 text-sm mt-1">
            Switching tabs will pause your timer and cost you a life ❤️
          </p>
        </div>
      )}
    </div>
  );
}