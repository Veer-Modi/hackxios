'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/UI/Button';
import Card from '@/components/UI/Card';
import { getUser, getUserAsync, getTotalStats, getTotalStatsAsync } from '@/lib/storage';
import { User, TotalStats } from '@/types';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [totalStats, setTotalStats] = useState<TotalStats | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const userData = await getUserAsync();
        const statsData = await getTotalStatsAsync();
        setUser(userData);
        setTotalStats(statsData);
      } catch (error) {
        console.error('Error loading profile:', error);
        // Fallback to sync versions
        setUser(getUser());
        setTotalStats(getTotalStats());
      }
    };

    loadProfile();
  }, []);

  return (
    <div className="min-h-screen py-8 bg-slate-900">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 gradient-text">👤 Your Profile</h1>
          <p className="text-white/80 text-lg">Your study progress and achievements</p>
        </div>

        {/* User Info Card */}
        <Card className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-1">{user?.username || 'Student'}</h2>
              <p className="text-white/70">{user?.email || 'student@example.com'}</p>
            </div>
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 border-4 border-white/30 shadow-lg"></div>
          </div>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-l-4 border-cyan-400">
            <h3 className="font-semibold text-white mb-4 gradient-text">Study Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-white/70">Total Sessions:</span>
                <span className="font-semibold text-white">{totalStats?.totalSessions || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Total Focus Time:</span>
                <span className="font-semibold text-green-400">{totalStats?.totalFocusTime || 0}m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Lives Today:</span>
                <span className="font-semibold text-red-400">❤️ {user?.livesRemaining || 5}/5</span>
              </div>
            </div>
          </Card>

          <Card className="border-l-4 border-purple-400">
            <h3 className="font-semibold text-white mb-4 gradient-text">Achievements</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-white/70">Global Rank:</span>
                <span className="font-semibold text-yellow-400">#42</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Focus Streak:</span>
                <span className="font-semibold text-orange-400">🔥 {user?.dailyStreak || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Perfect Streak:</span>
                <span className="font-semibold text-emerald-400">⭐ {user?.perfectFocusStreak || 0}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="mb-8">
          <h3 className="font-semibold text-white mb-4 gradient-text">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <span className="text-white/90">Completed Pomodoro Session</span>
              <span className="text-sm text-white/50">Today, 10:30 AM</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <span className="text-white/90">Asked AI about React Hooks</span>
              <span className="text-sm text-white/50">Yesterday, 4:15 PM</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <span className="text-white/90">Summarized lecture notes</span>
              <span className="text-sm text-white/50">Dec 28, 9:20 AM</span>
            </div>
          </div>
        </Card>

        {/* Profile Actions */}
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Edit Profile</Button>
          <Button variant="secondary">Export Data</Button>
          <Button variant="secondary">Privacy Settings</Button>
        </div>
      </div>
    </div>
  );
}