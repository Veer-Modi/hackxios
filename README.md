# AI Study Buddy – FocusGuard Pomodoro Arena

## 🎯 Project Overview

AI Study Buddy is a comprehensive AI-powered study platform that combines focus enforcement with intelligent learning assistance. The application helps students understand topics instantly, stay focused using a Pomodoro timer with life system, and track their progress with streaks and leaderboards.

## 🌟 Key Features

### 1. AI-Powered Learning
- **Ask AI**: Get instant explanations for any topic with step-by-step breakdowns
- **Difficulty Levels**: Choose from Beginner, Intermediate, or Advanced explanations
- **Notes Summarizer**: Convert long texts into concise bullet points

### 2. Focus Enforcement System
- **Pomodoro Timer**: 25-minute focused study sessions
- **Life System**: Start each day with 5 lives, lose one when distracted
- **Focus Detection**: Automatically detects tab switching, window minimization
- **Session Blocking**: Blocked from Pomodoro if all lives are lost in it

### 3. Progress Tracking
- **Daily Streaks**: Complete at least one Pomodoro per day
- **Perfect Focus Streaks**: Complete sessions without losing any lives
- **Focus Score Calculation**: (minutesFocused × 10) + (remainingLives × 20)
- **Leaderboards**: Global and room-based rankings

### 4. Social Learning
- **Study Rooms**: Join or create virtual study spaces
- **Collaborative Features**: Share notes and track group progress
- **Competition**: Friendly competition through leaderboards

## 🛠️ Tech Stack

- **Frontend**: Next.js (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB Atlas (with in-memory fallback for demo)
- **AI Integration**: OpenAI API (simulated for demo)
- **Authentication**: Session-based (JWT-ready)

## 📁 Project Structure

```
ai-study-buddy/
├── src/
│   ├── app/
│   │   ├── api/              # API routes
│   │   │   ├── ai/           # AI functionality
│   │   │   ├── auth/         # Authentication
│   │   │   └── user/         # User data
│   │   ├── login/            # Login page
│   │   ├── signup/           # Signup page
│   │   ├── dashboard/        # Dashboard page
│   │   ├── ask-ai/           # AI question page
│   │   ├── summarize/        # Text summarization page
│   │   ├── pomodoro/         # Pomodoro timer page
│   │   ├── leaderboard/      # Leaderboard page
│   │   └── profile/          # User profile page
│   ├── components/
│   │   ├── Dashboard/        # Dashboard components
│   │   ├── LifeSystem/       # Life system components
│   │   ├── Timer/            # Timer components
│   │   └── UI/               # Reusable UI components
│   ├── lib/
│   │   ├── api.ts            # API service
│   │   ├── focus-detection.ts # Focus detection logic
│   │   ├── life-system.ts    # Life system logic
│   │   ├── storage.ts        # Data storage utilities
│   │   └── timer.ts          # Timer logic
│   ├── models/               # Database models
│   │   ├── user.ts
│   │   ├── pomodoroSession.ts
│   │   └── dailyStats.ts
│   └── types/                # TypeScript type definitions
```

## 🚀 Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
# Create .env.local file
OPENAI_API_KEY=your_openai_api_key
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_secret_key
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔐 Authentication Flow

- **Signup**: Name, email, password
- **Login**: Email and password
- **Session Management**: JWT-based authentication
- **Protected Routes**: Middleware to protect authenticated routes

## 🤖 AI Integration

The application integrates with OpenAI API to provide:
- Question answering with step-by-step explanations
- Text summarization into bullet points
- Practice questions generation
- Difficulty-level customization

## 📊 Focus Enforcement System

The Pomodoro timer includes:
- 25-minute study sessions
- Life system (5 lives per day)
- Tab/window switching detection
- Automatic life deduction on focus loss
- Daily reset functionality

## 🏆 Gamification Features

- **Daily Streaks**: Complete at least one Pomodoro per day
- **Perfect Focus Streaks**: Complete sessions without losing lives
- **Focus Score Calculation**: (minutesFocused × 10) + (remainingLives × 20)
- **Leaderboards**: Global and room-based rankings
- **Achievements**: Badges and rewards for milestones

## 📈 Data Models

### User Model
- Profile information (name, email)
- Streak tracking (daily, perfect focus)
- Account status (blocked, lives remaining)

### Pomodoro Session Model
- Session timing (start, end, duration)
- Focus metrics (lives lost, pause time)
- Scoring (focus score, completion status)

### Daily Stats Model
- Daily activity metrics
- Progress tracking
- Streak maintenance

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user
- `POST /api/auth/login` - User login

### AI Features
- `POST /api/ai/ask` - Ask question to AI
- `POST /api/ai/summarize` - Summarize text

### User Data
- `GET /api/user` - Get user data
- `PUT /api/user` - Update user data
- `GET /api/stats` - Get daily stats
- `PUT /api/stats` - Update daily stats
- `GET /api/life` - Get life system data
- `PUT /api/life` - Update life system data
- `GET /api/sessions` - Get session data
- `POST /api/sessions` - Create session
- `PUT /api/sessions` - Update session

## 🎨 UI Components

- **Dashboard**: Overview of user stats and quick actions
- **Timer Display**: Visual Pomodoro timer with state indicators
- **Life Display**: Visual representation of remaining lives
- **Cards**: Reusable UI containers
- **Buttons**: Consistent button styles

## 🧠 Learning Features

- **Adaptive Explanations**: Adjust difficulty based on user level
- **Practice Questions**: Generate follow-up questions
- **Progress Tracking**: Monitor learning over time
- **Focus Analytics**: Detailed statistics on study habits

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile devices

## 🚀 Deployment

The application is ready for deployment on Vercel:
1. Connect your GitHub repository
2. Configure environment variables
3. Deploy automatically on push

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎯 Vision

AI Study Buddy aims to revolutionize the way students learn by combining:
- AI-powered assistance for instant help
- Gamification to maintain motivation
- Focus enforcement to build discipline
- Social features to foster community

Join us in creating the ultimate study companion that adapts to each student's needs!
