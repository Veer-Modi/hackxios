import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Study Buddy - FocusGuard Pomodoro Arena",
  description: "A calm, colorful, modern digital study room that rewards discipline. Study smarter, focus better.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}>
        <Navbar />
        
        <main className="max-w-7xl mx-auto px-4 py-8 animate-fade-in-up">
          {children}
        </main>
        
        <footer className="bg-white/5 backdrop-blur-sm border-t border-white/20 mt-16">
          <div className="max-w-4xl mx-auto px-4 py-6 text-center text-white/70 text-sm">
            Built with Next.js • Stay focused, build habits! 🚀
          </div>
        </footer>
      </body>
    </html>
  );
}



