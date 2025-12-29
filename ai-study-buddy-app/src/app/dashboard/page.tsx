'use client';

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
          </Card>
        </div>
      </div>
    </div>
  );
}