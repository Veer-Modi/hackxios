// Dashboard component for AI Study Buddy
// Shows comprehensive statistics and progress tracking

'use client';

import React from 'react';
import Card from '@/components/UI/Card';
import { User, DailyStats } from '@/types';

interface DashboardProps {
  user: User;
  dailyStats: DailyStats;
  totalSessions?: number;
  totalFocusTime?: number; // in minutes
  focusStreak?: number;
  perfectStreak?: number;
}

export default function Dashboard({ 
  user, 
  dailyStats,
  totalSessions = 0,
  totalFocusTime = 0,
  focusStreak = 0,
  perfectStreak = 0
}: DashboardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Today's Stats */}
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

      {/* Overall Stats */}
      <Card title="Overall Stats">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Total Sessions:</span>
            <span className="font-semibold">{totalSessions}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total Focus Time:</span>
            <span className="font-semibold">{totalFocusTime}m</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Focus Streak:</span>
            <span className="font-semibold">🔥 {focusStreak}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Perfect Streak:</span>
            <span className="font-semibold">⭐ {perfectStreak}</span>
          </div>
        </div>
      </Card>

      {/* Daily Streak */}
      <Card title="Streaks">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Daily Streak:</span>
            <span className="font-semibold">🔥 {user.dailyStreak}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Perfect Focus:</span>
            <span className="font-semibold">⭐ {user.perfectFocusStreak}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Best Day:</span>
            <span className="font-semibold">🎯 {dailyStats.sessionsCompleted} sessions</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Best Streak:</span>
            <span className="font-semibold">🏆 {perfectStreak} days</span>
          </div>
        </div>
      </Card>

      {/* Focus Quality */}
      <Card title="Focus Quality">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-gray-600">Today&apos;s Focus</span>
              <span className="font-semibold">{dailyStats.sessionsCompleted > 0 ? Math.max(0, Math.min(100, Math.round((1 - dailyStats.livesLost / (dailyStats.sessionsCompleted * 2)) * 100))) : 100}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${dailyStats.sessionsCompleted > 0 ? Math.max(0, Math.min(100, Math.round((1 - dailyStats.livesLost / (dailyStats.sessionsCompleted * 2)) * 100))) : 100}%` }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-gray-600">Weekly Avg</span>
              <span className="font-semibold">{totalFocusTime > 0 ? Math.min(100, Math.round(totalFocusTime / 7)) : 0}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: `${totalFocusTime > 0 ? Math.min(100, Math.round(totalFocusTime / 7)) : 0}%` }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-gray-600">Best Session</span>
              <span className="font-semibold">100%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}