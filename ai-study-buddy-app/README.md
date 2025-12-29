# AI Study Buddy - Focus-Enforced Pomodoro Timer

A Next.js application that helps you stay focused while studying using a Pomodoro timer with a life system that enforces focus.

## Features

### 🍅 Pomodoro Timer
- 25-minute focused study sessions
- Visual timer display with state indicators
- Start, pause, resume, and stop controls

### ❤️ Life System
- 5 lives per day
- Lose a life when you switch tabs or lose focus
- Get blocked for the day when you run out of lives
- Lives reset daily at midnight

### 📊 Progress Tracking
- Daily session count
- Total focus time
- Lives lost tracking
- Perfect sessions (no lives lost)
- Daily and perfect focus streaks

### 🔍 Focus Detection
- Automatically detects when you switch tabs
- Pauses timer and deducts a life
- Handles various focus loss scenarios (Alt+Tab, clicking outside, etc.)

## How It Works

1. **Start a Session**: Click "Start Pomodoro" to begin a 25-minute study session
2. **Stay Focused**: Keep the tab active and focused - switching away pauses the timer and costs a life
3. **Complete Sessions**: Finish sessions to build your daily streak and improve your focus score
4. **Daily Reset**: Lives and stats reset at midnight each day

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                 # Next.js app router
├── components/          # React components
│   ├── Timer/          # Timer display components
│   ├── LifeSystem/     # Life system components
│   └── UI/             # Reusable UI components
├── lib/                # Utility functions
│   ├── timer.ts        # Timer logic
│   ├── life-system.ts  # Life system management
│   ├── focus-detection.ts # Tab switching detection
│   └── storage.ts      # Local storage utilities
└── types/              # TypeScript type definitions
```

## Technologies Used

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Local Storage** - Data persistence

## Focus Enforcement

The app uses the Page Visibility API and Window Focus events to detect when you:
- Switch to another tab
- Alt+Tab to another application
- Click outside the browser window
- Minimize the browser

When focus is lost, the timer automatically pauses and you lose a life. This encourages genuine focus during study sessions.

## Development

This project was planned and built with the help of Kiro AI assistant, following a structured approach:
1. Requirements gathering and feature planning
2. Architecture design and component structure
3. Step-by-step implementation with TypeScript
4. Focus detection and life system integration

The complete planning documentation can be found in the `.kiro/` directory.
