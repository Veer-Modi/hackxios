import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Study Buddy - Focus-Based Pomodoro Timer",
  description: "A gamified Pomodoro timer that enforces focus through a life system. Stay focused, build streaks, and compete with friends!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 min-h-screen`}>
        <header className="glass shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div>
                <Link href="/" className="text-2xl font-bold text-gray-900">
                  🎯 AI Study Buddy
                </Link>
                <p className="text-gray-600 text-sm mt-1">
                  Focus-based Pomodoro timer with life system
                </p>
              </div>
              
              <nav className="hidden md:block">
                <ul className="flex space-x-6">
                  <li><Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link></li>
                  <li><Link href="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">Dashboard</Link></li>
                  <li><Link href="/ask-ai" className="text-gray-700 hover:text-blue-600 font-medium">Ask AI</Link></li>
                  <li><Link href="/pomodoro" className="text-gray-700 hover:text-blue-600 font-medium">Pomodoro</Link></li>
                  <li><Link href="/leaderboard" className="text-gray-700 hover:text-blue-600 font-medium">Leaderboard</Link></li>
                  <li><Link href="/profile" className="text-gray-700 hover:text-blue-600 font-medium">Profile</Link></li>
                </ul>
              </nav>
            </div>
            
            {/* Mobile Navigation */}
            <nav className="md:hidden mt-4">
              <ul className="flex flex-wrap justify-center space-x-4">
                <li><Link href="/" className="text-gray-700 hover:text-blue-600 text-sm font-medium px-2">Home</Link></li>
                <li><Link href="/dashboard" className="text-gray-700 hover:text-blue-600 text-sm font-medium px-2">Dashboard</Link></li>
                <li><Link href="/ask-ai" className="text-gray-700 hover:text-blue-600 text-sm font-medium px-2">Ask AI</Link></li>
                <li><Link href="/pomodoro" className="text-gray-700 hover:text-blue-600 text-sm font-medium px-2">Pomodoro</Link></li>
                <li><Link href="/leaderboard" className="text-gray-700 hover:text-blue-600 text-sm font-medium px-2">Leaderboard</Link></li>
                <li><Link href="/profile" className="text-gray-700 hover:text-blue-600 text-sm font-medium px-2">Profile</Link></li>
              </ul>
            </nav>
          </div>
        </header>
        
        <main className="max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>
        
        <footer className="glass border-t mt-16">
          <div className="max-w-4xl mx-auto px-4 py-6 text-center text-gray-600 text-sm">
            Built with Next.js • Stay focused, build habits! 🚀
          </div>
        </footer>
      </body>
    </html>
  );
}



