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
        return 'text-green-600';
      case 'paused':
        return 'text-yellow-600';
      case 'completed':
        return 'text-blue-600';
      case 'stopped':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };
  
  return (
    <div className="text-center">
      {/* Session Info */}
      <div className="text-sm text-gray-600 mb-2">
        Session {sessionNumber} of today
      </div>
      
      {/* Timer Display */}
      <div className="bg-gray-100 rounded-lg p-8 mb-4">
        <div className="text-6xl font-mono font-bold text-gray-900 mb-2">
          {formatTime(timeRemaining)}
        </div>
      </div>
      
      {/* State Display */}
      <div className={`text-lg font-semibold ${getStateColor()}`}>
        {getStateDisplay()}
      </div>
      
      {/* Focus Message */}
      {state === 'running' && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 font-medium">
            Stay focused on this tab! 👀
          </p>
          <p className="text-blue-600 text-sm mt-1">
            Switching tabs will pause your timer and cost you a life ❤️
          </p>
        </div>
      )}
    </div>
  );
}