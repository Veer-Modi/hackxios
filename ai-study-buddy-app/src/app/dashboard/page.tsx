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
    <div className="min-h-screen py-8 bg-slate-900">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 gradient-text">
            📚 Dashboard
          </h1>
          <p className="text-white/80 text-lg">Your personal AI-powered study companion</p>
        </div>

        {/* Welcome Card */}
        <Card className="mb-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-white mb-2">Welcome to AI Study Buddy!</h2>
            <p className="text-white/70 mb-4">
              Get instant help with your studies, stay focused with our Pomodoro timer, and track your progress.
            </p>
          </div>
        </Card>

        {/* Stats Preview - Colorful cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-t-4 border-red-400">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400 mb-1">❤️ {totalStats?.totalSessions || 0}</div>
              <div className="text-sm text-white/70">Total Sessions</div>
            </div>
          </Card>

          <Card className="border-t-4 border-green-400">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-1">{totalStats?.totalFocusTime || 0}m</div>
              <div className="text-sm text-white/70">Focus Time</div>
            </div>
          </Card>

          <Card className="border-t-4 border-orange-400">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400 mb-1">🔥 {totalStats?.focusStreak || 0}</div>
              <div className="text-sm text-white/70">Daily Streak</div>
            </div>
          </Card>

          <Card className="border-t-4 border-teal-400">
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-400 mb-1">⭐ {totalStats?.perfectStreak || 0}</div>
              <div className="text-sm text-white/70">Perfect Streak</div>
            </div>
          </Card>
        </div>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link href="/ask-ai">
            <Card className="text-center card-hover cursor-pointer border-l-4 border-cyan-400">
              <div className="text-4xl mb-3">🤖</div>
              <h3 className="font-semibold text-white mb-1">Ask AI</h3>
              <p className="text-sm text-white/70">Get instant explanations</p>
            </Card>
          </Link>

          <Link href="/summarize">
            <Card className="text-center card-hover cursor-pointer border-l-4 border-teal-400">
              <div className="text-4xl mb-3">📝</div>
              <h3 className="font-semibold text-white mb-1">Summarize Notes</h3>
              <p className="text-sm text-white/70">Convert long text to bullet points</p>
            </Card>
          </Link>

          <Link href="/pomodoro">
            <Card className="text-center card-hover cursor-pointer border-l-4 border-orange-400">
              <div className="text-4xl mb-3">🍅</div>
              <h3 className="font-semibold text-white mb-1">Pomodoro Room</h3>
              <p className="text-sm text-white/70">Focus with our timer system</p>
            </Card>
          </Link>

          <Link href="/leaderboard">
            <Card className="text-center card-hover cursor-pointer border-l-4 border-yellow-400">
              <div className="text-4xl mb-3">🏆</div>
              <h3 className="font-semibold text-white mb-1">Leaderboard</h3>
              <p className="text-sm text-white/70">See your ranking</p>
            </Card>
          </Link>
        </div>

        {/* Feature Descriptions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <h3 className="font-semibold text-white mb-2 gradient-text">AI-Powered Learning</h3>
            <p className="text-white/70 text-sm">
              Ask any question and get step-by-step explanations, examples, and practice questions instantly.
            </p>
          </Card>

          <Card>
            <h3 className="font-semibold text-white mb-2 gradient-text">Focus Enforcement</h3>
            <p className="text-white/70 text-sm">
              Pomodoro timer with life system that helps you stay focused and avoid distractions.
            </p>
          </Card>

          <Card>
            <h3 className="font-semibold text-white mb-2 gradient-text">Progress Tracking</h3>
            <p className="text-white/70 text-sm">
              Track your study progress, streaks, and compete on leaderboards with friends.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
