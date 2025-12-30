'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname === path;
  
  return (
    <header className="bg-white/10 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div>
            <Link href="/" className="text-2xl font-bold gradient-text">
              🎯 AI Study Buddy
            </Link>
            <p className="text-white/70 text-sm mt-1">
              FocusGuard Pomodoro Arena
            </p>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className={`font-medium transition-colors ${
                isActive('/') 
                  ? 'text-white border-b-2 border-indigo-400 pb-1' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/dashboard" 
              className={`font-medium transition-colors ${
                isActive('/dashboard') 
                  ? 'text-white border-b-2 border-purple-400 pb-1' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Dashboard
            </Link>
            <Link 
              href="/ask-ai" 
              className={`font-medium transition-colors ${
                isActive('/ask-ai') 
                  ? 'text-white border-b-2 border-cyan-400 pb-1' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Ask AI
            </Link>
            <Link 
              href="/pomodoro" 
              className={`font-medium transition-colors ${
                isActive('/pomodoro') 
                  ? 'text-white border-b-2 border-orange-400 pb-1' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Pomodoro
            </Link>
            <Link 
              href="/leaderboard" 
              className={`font-medium transition-colors ${
                isActive('/leaderboard') 
                  ? 'text-white border-b-2 border-yellow-400 pb-1' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Leaderboard
            </Link>
            <Link 
              href="/profile" 
              className={`font-medium transition-colors ${
                isActive('/profile') 
                  ? 'text-white border-b-2 border-pink-400 pb-1' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Profile
            </Link>
            
            {/* Right side indicators */}
            <div className="flex items-center space-x-4 ml-6 pl-6 border-l border-white/20">
              <div className="flex items-center space-x-1 text-red-400">
                <span className="text-lg">❤️</span>
                <span className="text-sm font-semibold">5</span>
              </div>
              <div className="flex items-center space-x-1 text-orange-400">
                <span className="text-lg">🔥</span>
                <span className="text-sm font-semibold">7</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 border-2 border-white/30"></div>
            </div>
          </nav>
        </div>
        
        {/* Mobile Navigation */}
        <nav className="md:hidden mt-4">
          <ul className="flex flex-wrap justify-center space-x-3">
            <li>
              <Link 
                href="/" 
                className={`text-sm font-medium px-2 py-1 rounded transition-colors ${
                  isActive('/') ? 'text-white bg-white/20' : 'text-white/70 hover:text-white'
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                href="/dashboard" 
                className={`text-sm font-medium px-2 py-1 rounded transition-colors ${
                  isActive('/dashboard') ? 'text-white bg-white/20' : 'text-white/70 hover:text-white'
                }`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link 
                href="/ask-ai" 
                className={`text-sm font-medium px-2 py-1 rounded transition-colors ${
                  isActive('/ask-ai') ? 'text-white bg-white/20' : 'text-white/70 hover:text-white'
                }`}
              >
                Ask AI
              </Link>
            </li>
            <li>
              <Link 
                href="/pomodoro" 
                className={`text-sm font-medium px-2 py-1 rounded transition-colors ${
                  isActive('/pomodoro') ? 'text-white bg-white/20' : 'text-white/70 hover:text-white'
                }`}
              >
                Pomodoro
              </Link>
            </li>
            <li>
              <Link 
                href="/leaderboard" 
                className={`text-sm font-medium px-2 py-1 rounded transition-colors ${
                  isActive('/leaderboard') ? 'text-white bg-white/20' : 'text-white/70 hover:text-white'
                }`}
              >
                Leaderboard
              </Link>
            </li>
            <li>
              <Link 
                href="/profile" 
                className={`text-sm font-medium px-2 py-1 rounded transition-colors ${
                  isActive('/profile') ? 'text-white bg-white/20' : 'text-white/70 hover:text-white'
                }`}
              >
                Profile
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

