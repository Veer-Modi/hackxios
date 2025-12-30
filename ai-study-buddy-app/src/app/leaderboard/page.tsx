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
    <div className="min-h-screen py-8 bg-slate-900">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 gradient-text">🏆 Leaderboard</h1>
          <p className="text-white/80 text-lg">See how you rank against other focused learners</p>
        </div>

        {/* View Toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-xl shadow-lg overflow-hidden" role="group">
            <button
              type="button"
              className={`px-6 py-2 text-sm font-medium transition-all ${
                view === 'global'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
              onClick={() => setView('global')}
            >
              Global
            </button>
            <button
              type="button"
              className={`px-6 py-2 text-sm font-medium transition-all ${
                view === 'room'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
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
            <table className="min-w-full divide-y divide-white/10">
              <thead>
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                    Rank
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                    Focus Score
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                    Daily Streak
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                    Perfect Streak
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-white/50">
                      Loading leaderboard...
                    </td>
                  </tr>
                ) : (
                  leaderboard.map((entry) => (
                    <tr 
                      key={entry.id} 
                      className={`${
                        entry.name === 'You' ? 'bg-cyan-500/20' : ''
                      } ${
                        entry.rank === 1 ? 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20' :
                        entry.rank === 2 ? 'bg-gradient-to-r from-gray-400/20 to-slate-400/20' :
                        entry.rank === 3 ? 'bg-gradient-to-r from-orange-600/20 to-amber-600/20' : ''
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className={`text-lg font-bold ${
                            entry.rank === 1 ? 'text-yellow-400' : 
                            entry.rank === 2 ? 'text-gray-300' : 
                            entry.rank === 3 ? 'text-orange-400' : 'text-white'
                          }`}>
                            #{entry.rank}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="bg-gradient-to-br from-indigo-400 to-purple-400 rounded-xl w-10 h-10 border-2 border-white/30" />
                          </div>
                          <div className="ml-4">
                            <div className={`text-sm font-medium ${
                              entry.name === 'You' ? 'text-cyan-300 font-semibold' : 'text-white'
                            }`}>
                              {entry.name}
                              {entry.name === 'You' && (
                                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-500/30 text-cyan-200 border border-cyan-400/50">
                                  You
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white font-semibold">{entry.focusScore}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-orange-400">🔥 {entry.dailyStreak}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-yellow-400">⭐ {entry.perfectStreak}</div>
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
          <Card className="text-center border-t-4 border-cyan-400">
            <div className="text-3xl font-bold text-cyan-400">1250</div>
            <div className="text-sm text-white/70">Your Focus Score</div>
          </Card>
          <Card className="text-center border-t-4 border-orange-400">
            <div className="text-3xl font-bold text-orange-400">7</div>
            <div className="text-sm text-white/70">Daily Streak</div>
          </Card>
          <Card className="text-center border-t-4 border-purple-400">
            <div className="text-3xl font-bold text-purple-400">3</div>
            <div className="text-sm text-white/70">Perfect Streak</div>
          </Card>
        </div>
      </div>
    </div>
  );
}