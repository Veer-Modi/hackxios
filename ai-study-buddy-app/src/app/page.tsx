'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/UI/Button';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-900">
      {/* Floating shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }}></div>
      
      {/* Hero Section */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in-up">
        <h1 className="text-6xl md:text-7xl font-bold mb-6 gradient-text">
          Study Smarter.<br />
          Focus Better.
        </h1>
        
        <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto">
          A calm, colorful, modern digital study room that rewards discipline.
          <br />
          <span className="text-lg text-white/60 mt-2 block">
            FocusGuard Pomodoro Arena
          </span>
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            variant="primary" 
            size="large"
            onClick={() => router.push('/dashboard')}
            className="min-w-[200px]"
          >
            Get Started
          </Button>
          <Button 
            variant="secondary" 
            size="large"
            onClick={() => router.push('/pomodoro')}
            className="min-w-[200px]"
          >
            Start Pomodoro
          </Button>
        </div>
        
        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="glass p-6 card-hover">
            <div className="text-4xl mb-3">🤖</div>
            <h3 className="text-lg font-semibold text-white mb-2">AI-Powered</h3>
            <p className="text-white/70 text-sm">Get instant explanations and study help</p>
          </div>
          
          <div className="glass p-6 card-hover">
            <div className="text-4xl mb-3">🍅</div>
            <h3 className="text-lg font-semibold text-white mb-2">Focus-Enforced</h3>
            <p className="text-white/70 text-sm">Pomodoro timer with life system</p>
          </div>
          
          <div className="glass p-6 card-hover">
            <div className="text-4xl mb-3">🏆</div>
            <h3 className="text-lg font-semibold text-white mb-2">Gamified</h3>
            <p className="text-white/70 text-sm">Build streaks and compete</p>
          </div>
        </div>
      </div>
    </div>
  );
}

