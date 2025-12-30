'use client';

import { useState } from 'react';
<<<<<<< HEAD
import { useRouter } from 'next/navigation';
import Button from '@/components/UI/Button';
import Card from '@/components/UI/Card';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
=======
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Card from '@/components/UI/Card';
import Button from '@/components/UI/Button';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
>>>>>>> 6843f05f19f2701fb3752d9c7fdcb19727c1d911
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

<<<<<<< HEAD
    try {
      // In a real app, this would be an API call to your backend
      // For now, we'll simulate the login process
      console.log('Login attempt:', { email, password });
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
=======
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
>>>>>>> 6843f05f19f2701fb3752d9c7fdcb19727c1d911
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
<<<<<<< HEAD
      <Card className="w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-gray-600">Sign in to your AI Study Buddy account</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <div>
            <Button
              type="submit"
              variant="primary"
              size="large"
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <a href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              Sign up
            </a>
          </p>
        </div>
      </Card>
=======
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🍅 AI Study Buddy
          </h1>
          <h2 className="text-xl text-gray-600">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-gray-500 mt-2">
            {isSignUp ? 'Join the focus revolution' : 'Sign in to continue studying'}
          </p>
        </div>

        {/* Login Form */}
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="student@example.com"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
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
              className="text-blue-600 hover:text-blue-800 text-sm"
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
        <div className="mt-8">
          <Card title="What You'll Get">
            <div className="grid grid-cols-1 gap-3 text-sm">
              <div className="flex items-center gap-3">
                <span className="text-green-600">✓</span>
                <span>Focus-enforced Pomodoro timer</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-600">✓</span>
                <span>AI-powered study assistant</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-600">✓</span>
                <span>Progress tracking & leaderboards</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-600">✓</span>
                <span>Daily & perfect focus streaks</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-600">✓</span>
                <span>Note summarization tools</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Demo Notice */}
        <div className="text-center text-xs text-gray-500">
          <p>🔒 This is a demo app. No real authentication is implemented yet.</p>
          <p>Click "Try Demo" to explore all features!</p>
        </div>
      </div>
>>>>>>> 6843f05f19f2701fb3752d9c7fdcb19727c1d911
    </div>
  );
}