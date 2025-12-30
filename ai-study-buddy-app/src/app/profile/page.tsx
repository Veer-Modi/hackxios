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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">👤 Your Profile</h1>
          <p className="text-gray-600">Your study progress and achievements</p>
        </div>

        {/* User Info Card */}
        <Card className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{user?.username || 'Student'}</h2>
              <p className="text-gray-600">{user?.email || 'student@example.com'}</p>
            </div>
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
          </div>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <h3 className="font-semibold text-gray-900 mb-4">Study Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Sessions:</span>
                <span className="font-semibold">{totalStats?.totalSessions || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Focus Time:</span>
                <span className="font-semibold">{totalStats?.totalFocusTime || 0}m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Lives Today:</span>
                <span className="font-semibold">❤️ {user?.livesRemaining || 5}/5</span>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="font-semibold text-gray-900 mb-4">Achievements</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Global Rank:</span>
                <span className="font-semibold">#42</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Focus Streak:</span>
                <span className="font-semibold">🔥 {user?.dailyStreak || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Perfect Streak:</span>
                <span className="font-semibold">⭐ {user?.perfectFocusStreak || 0}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <span className="text-gray-700">Completed Pomodoro Session</span>
              <span className="text-sm text-gray-500">Today, 10:30 AM</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <span className="text-gray-700">Asked AI about React Hooks</span>
              <span className="text-sm text-gray-500">Yesterday, 4:15 PM</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <span className="text-gray-700">Summarized lecture notes</span>
              <span className="text-sm text-gray-500">Dec 28, 9:20 AM</span>
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