'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/UI/Button';
import Card from '@/components/UI/Card';
import { getTotalStats, getTotalStatsAsync } from '@/lib/storage';
import { TotalStats } from '@/types';

export default function DashboardPage() {
  const [totalStats, setTotalStats] = useState<TotalStats | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const stats = await getTotalStatsAsync();
        setTotalStats(stats);
      } catch (error) {
        console.error('Error loading stats:', error);
        // Fallback to sync version
        setTotalStats(getTotalStats());
      }
    };

    loadStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            📚 AI Study Buddy Dashboard
          </h1>
          <p className="text-gray-600">Your personal AI-powered study companion</p>
        </div>

        {/* Welcome Card */}
        <Card className="mb-8">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Welcome to AI Study Buddy!</h2>
            <p className="text-gray-600 mb-4">
              Get instant help with your studies, stay focused with our Pomodoro timer, and track your progress.
            </p>
          </div>
        </Card>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link href="/ask-ai">
            <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
              <div className="text-3xl mb-2">🤖</div>
              <h3 className="font-semibold text-gray-900">Ask AI</h3>
              <p className="text-sm text-gray-600 mt-1">Get instant explanations</p>
            </Card>
          </Link>

          <Link href="/summarize">
            <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
              <div className="text-3xl mb-2">📝</div>
              <h3 className="font-semibold text-gray-900">Summarize Notes</h3>
              <p className="text-sm text-gray-600 mt-1">Convert long text to bullet points</p>
            </Card>
          </Link>

          <Link href="/pomodoro">
            <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
              <div className="text-3xl mb-2">🍅</div>
              <h3 className="font-semibold text-gray-900">Pomodoro Room</h3>
              <p className="text-sm text-gray-600 mt-1">Focus with our timer system</p>
            </Card>
          </Link>

          <Link href="/leaderboard">
            <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
              <div className="text-3xl mb-2">🏆</div>
              <h3 className="font-semibold text-gray-900">Leaderboard</h3>
              <p className="text-sm text-gray-600 mt-1">See your ranking</p>
            </Card>
          </Link>
        </div>

        {/* Stats Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{totalStats?.totalSessions || 0}</div>
              <div className="text-sm text-gray-600">Total Sessions</div>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{totalStats?.totalFocusTime || 0}m</div>
              <div className="text-sm text-gray-600">Focus Time</div>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">🔥 {totalStats?.focusStreak || 0}</div>
              <div className="text-sm text-gray-600">Daily Streak</div>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">⭐ {totalStats?.perfectStreak || 0}</div>
              <div className="text-sm text-gray-600">Perfect Streak</div>
            </div>
          </Card>
        </div>

        {/* Feature Descriptions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <h3 className="font-semibold text-gray-900 mb-2">AI-Powered Learning</h3>
            <p className="text-gray-600 text-sm">
              Ask any question and get step-by-step explanations, examples, and practice questions instantly.
            </p>
          </Card>

          <Card>
            <h3 className="font-semibold text-gray-900 mb-2">Focus Enforcement</h3>
            <p className="text-gray-600 text-sm">
              Pomodoro timer with life system that helps you stay focused and avoid distractions.
            </p>
          </Card>

          <Card>
            <h3 className="font-semibold text-gray-900 mb-2">Progress Tracking</h3>
            <p className="text-gray-600 text-sm">
              Track your study progress, streaks, and compete on leaderboards with friends.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
