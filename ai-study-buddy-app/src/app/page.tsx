'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🍅 AI Study Buddy
          </h1>
          <p className="text-gray-600 mb-6">
            Your intelligent study companion with focus enforcement
          </p>
          <Link href="/dashboard">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-lg transition-colors mr-4">
              Enter Study Dashboard
            </button>
          </Link>
          <Link href="/login">
            <button className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg text-lg transition-colors">
              Login / Sign Up
            </button>
          </Link>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 text-center">
            <div className="text-4xl mb-4">🍅</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Focus Timer</h3>
            <p className="text-gray-600 text-sm">
              25-minute Pomodoro sessions with life-based focus enforcement
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 text-center">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Assistant</h3>
            <p className="text-gray-600 text-sm">
              Get instant answers to your study questions with AI
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 text-center">
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Leaderboard</h3>
            <p className="text-gray-600 text-sm">
              Compete with others and track your focus streaks
            </p>
          </div>
        </div>

        {/* How it Works */}
        <div className="mt-12 bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl mb-2">1️⃣</div>
              <h4 className="font-semibold mb-1">Start Session</h4>
              <p className="text-sm text-gray-600">Begin a 25-minute focus session</p>
            </div>
            <div>
              <div className="text-2xl mb-2">2️⃣</div>
              <h4 className="font-semibold mb-1">Stay Focused</h4>
              <p className="text-sm text-gray-600">Keep the tab active - switching costs a life</p>
            </div>
            <div>
              <div className="text-2xl mb-2">3️⃣</div>
              <h4 className="font-semibold mb-1">Earn Points</h4>
              <p className="text-sm text-gray-600">Complete sessions to build your score</p>
            </div>
            <div>
              <div className="text-2xl mb-2">4️⃣</div>
              <h4 className="font-semibold mb-1">Build Streaks</h4>
              <p className="text-sm text-gray-600">Maintain daily and perfect focus streaks</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
