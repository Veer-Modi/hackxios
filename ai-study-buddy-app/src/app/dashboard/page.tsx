'use client';

<<<<<<< HEAD
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
=======
import Link from 'next/link';
import Card from '@/components/UI/Card';
import Button from '@/components/UI/Button';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🎯 Study Dashboard
          </h1>
          <p className="text-gray-600">
            Choose your study activity
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Ask AI Card */}
          <Card title="🤖 Ask AI">
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Get instant answers to your study questions
              </p>
              <Link href="/ask-ai">
                <Button size="large" className="w-full">
                  Ask AI
                </Button>
              </Link>
            </div>
          </Card>

          {/* Summarize Notes Card */}
          <Card title="📝 Summarize Notes">
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Turn your notes into concise summaries
              </p>
              <Link href="/summarize">
                <Button size="large" className="w-full" variant="secondary">
                  Summarize Notes
                </Button>
              </Link>
            </div>
          </Card>

          {/* Pomodoro Room Card */}
          <Card title="🍅 Pomodoro Room">
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Focus with the life-enforced timer
              </p>
              <Link href="/pomodoro">
                <Button size="large" className="w-full" variant="danger">
                  Enter Room
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="mt-8">
          <Card title="📊 Today's Progress">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">3</div>
                <div className="text-sm text-gray-600">Sessions</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">75m</div>
                <div className="text-sm text-gray-600">Focus Time</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">2</div>
                <div className="text-sm text-gray-600">Lives Lost</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">🔥 5</div>
                <div className="text-sm text-gray-600">Day Streak</div>
              </div>
            </div>
>>>>>>> 6843f05f19f2701fb3752d9c7fdcb19727c1d911
          </Card>
        </div>
      </div>
    </div>
  );
}