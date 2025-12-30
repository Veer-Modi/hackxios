'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Card from '@/components/UI/Card';
import Button from '@/components/UI/Button';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Demo login - just redirect to dashboard
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 1000);
  };

  const handleDemoLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-900">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="text-white/70 hover:text-white mb-4 inline-block transition-colors">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-2 gradient-text">
            🍅 AI Study Buddy
          </h1>
          <h2 className="text-xl text-white/80">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-white/60 mt-2">
            {isSignUp ? 'Join the focus revolution' : 'Sign in to continue studying'}
          </p>
        </div>

        {/* Login Form - Centered Glass Card */}
        <Card className="glass-strong">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 backdrop-blur-sm"
                placeholder="student@example.com"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 backdrop-blur-sm"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>

            <div>
              <Button
                type="submit"
                disabled={loading || !email || !password}
                size="large"
                className="w-full"
              >
                {loading ? 'Signing in...' : (isSignUp ? 'Create Account' : 'Sign In')}
              </Button>
            </div>
          </form>

          {/* Demo Login */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white/10 text-white/70">Or</span>
              </div>
            </div>

            <div className="mt-6">
              <Button
                onClick={handleDemoLogin}
                variant="secondary"
                size="large"
                className="w-full"
                disabled={loading}
              >
                🚀 Try Demo (No Account Needed)
              </Button>
            </div>
          </div>

          {/* Toggle Sign Up */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-cyan-400 hover:text-cyan-300 text-sm transition-colors"
              disabled={loading}
            >
              {isSignUp 
                ? 'Already have an account? Sign in' 
                : "Don't have an account? Sign up"
              }
            </button>
          </div>
        </Card>

        {/* Features Preview */}
        <Card>
          <h3 className="font-semibold text-white mb-4 gradient-text">What You'll Get</h3>
          <div className="grid grid-cols-1 gap-3 text-sm">
            <div className="flex items-center gap-3">
              <span className="text-green-400">✓</span>
              <span className="text-white/80">Focus-enforced Pomodoro timer</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-400">✓</span>
              <span className="text-white/80">AI-powered study assistant</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-400">✓</span>
              <span className="text-white/80">Progress tracking & leaderboards</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-400">✓</span>
              <span className="text-white/80">Daily & perfect focus streaks</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-400">✓</span>
              <span className="text-white/80">Note summarization tools</span>
            </div>
          </div>
        </Card>

        {/* Demo Notice */}
        <div className="text-center text-xs text-white/50">
          <p>🔒 This is a demo app. No real authentication is implemented yet.</p>
          <p>Click "Try Demo" to explore all features!</p>
        </div>
      </div>
    </div>
  );
}