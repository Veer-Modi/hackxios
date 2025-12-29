import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              🎯 AI Study Buddy
            </h1>
            <p className="text-gray-600 text-sm">
              Focus-based Pomodoro timer with life system
            </p>
          </div>
        </header>
        
        <main className="max-w-4xl mx-auto px-4 py-8">
          {children}
        </main>
        
        <footer className="bg-white border-t mt-16">
          <div className="max-w-4xl mx-auto px-4 py-6 text-center text-gray-600 text-sm">
            Built with Next.js • Stay focused, build habits! 🚀
          </div>
        </footer>
      </body>
    </html>
  );
}
