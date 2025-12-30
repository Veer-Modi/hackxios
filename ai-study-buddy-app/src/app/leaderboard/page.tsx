'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/UI/Button';
import Card from '@/components/UI/Card';

interface LeaderboardEntry {
  id: string;
  name: string;
  rank: number;
  focusScore: number;
  dailyStreak: number;
  perfectStreak: number;
  avatar?: string;
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'global' | 'room'>('global');

  useEffect(() => {
    // Simulate loading leaderboard data
    const loadLeaderboard = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockData: LeaderboardEntry[] = [
        { id: '1', name: 'You', rank: 1, focusScore: 1250, dailyStreak: 7, perfectStreak: 3 },
        { id: '2', name: 'Alex Johnson', rank: 2, focusScore: 1180, dailyStreak: 12, perfectStreak: 2 },
        { id: '3', name: 'Sam Chen', rank: 3, focusScore: 1120, dailyStreak: 9, perfectStreak: 4 },
        { id: '4', name: 'Taylor Smith', rank: 4, focusScore: 1050, dailyStreak: 5, perfectStreak: 1 },
        { id: '5', name: 'Jordan Williams', rank: 5, focusScore: 980, dailyStreak: 8, perfectStreak: 0 },
        { id: '6', name: 'Morgan Lee', rank: 6, focusScore: 920, dailyStreak: 6, perfectStreak: 2 },
        { id: '7', name: 'Casey Brown', rank: 7, focusScore: 870, dailyStreak: 4, perfectStreak: 0 },
        { id: '8', name: 'Riley Davis', rank: 8, focusScore: 810, dailyStreak: 10, perfectStreak: 1 },
        { id: '9', name: 'Quinn Miller', rank: 9, focusScore: 760, dailyStreak: 3, perfectStreak: 0 },
        { id: '10', name: 'Avery Wilson', rank: 10, focusScore: 720, dailyStreak: 7, perfectStreak: 0 },
      ];
      
      setLeaderboard(mockData);
      setLoading(false);
    };

    loadLeaderboard();
  }, [view]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🏆 Leaderboard</h1>
          <p className="text-gray-600">See how you rank against other focused learners</p>
        </div>

        {/* View Toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                view === 'global'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setView('global')}
            >
              Global
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                view === 'room'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setView('room')}
            >
              Your Room
            </button>
          </div>
        </div>

        {/* Leaderboard Card */}
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Focus Score
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Daily Streak
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Perfect Streak
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                      Loading leaderboard...
                    </td>
                  </tr>
                ) : (
                  leaderboard.map((entry) => (
                    <tr 
                      key={entry.id} 
                      className={entry.name === 'You' ? 'bg-blue-50' : ''}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className={`text-sm font-medium ${
                            entry.rank === 1 ? 'text-yellow-600' : 
                            entry.rank === 2 ? 'text-gray-400' : 
                            entry.rank === 3 ? 'text-yellow-800' : 'text-gray-900'
                          }`}>
                            {entry.rank}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                          </div>
                          <div className="ml-4">
                            <div className={`text-sm font-medium ${
                              entry.name === 'You' ? 'text-blue-600 font-semibold' : 'text-gray-900'
                            }`}>
                              {entry.name}
                              {entry.name === 'You' && (
                                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  You
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-semibold">{entry.focusScore}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">🔥 {entry.dailyStreak}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">⭐ {entry.perfectStreak}</div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="text-center">
            <div className="text-2xl font-bold text-blue-600">1250</div>
            <div className="text-sm text-gray-600">Your Focus Score</div>
          </Card>
          <Card className="text-center">
            <div className="text-2xl font-bold text-orange-600">7</div>
            <div className="text-sm text-gray-600">Daily Streak</div>
          </Card>
          <Card className="text-center">
            <div className="text-2xl font-bold text-purple-600">3</div>
            <div className="text-sm text-gray-600">Perfect Streak</div>
          </Card>
        </div>
      </div>
    </div>
  );
}