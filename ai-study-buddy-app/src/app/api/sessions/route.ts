import { NextRequest } from 'next/server';
import { PomodoroSession } from '@/types';

// In-memory storage for demo purposes (in production, use a database)
let sessions: PomodoroSession[] = [];

export async function GET(request: NextRequest) {
  try {
    // Filter out completed sessions older than 30 days for demo purposes
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
    sessions = sessions.filter(session => 
      session.completed ? (session.endTime && session.endTime > thirtyDaysAgo) : true
    );

    return Response.json(sessions);
  } catch (error) {
    console.error('Error fetching sessions:', error);
    return Response.json({ error: 'Failed to fetch sessions' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const sessionData: PomodoroSession = await request.json();
    
    // Add the new session to the list
    sessions.push(sessionData);
    
    return Response.json(sessionData, { status: 201 });
  } catch (error) {
    console.error('Error creating session:', error);
    return Response.json({ error: 'Failed to create session' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const sessionData: PomodoroSession = await request.json();
    
    // Find and update the session
    const index = sessions.findIndex(session => session.id === sessionData.id);
    if (index !== -1) {
      sessions[index] = sessionData;
      return Response.json(sessionData);
    } else {
      // If session doesn't exist, create it
      sessions.push(sessionData);
      return Response.json(sessionData, { status: 201 });
    }
  } catch (error) {
    console.error('Error updating session:', error);
    return Response.json({ error: 'Failed to update session' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return Response.json({ error: 'Session ID is required' }, { status: 400 });
    }
    
    sessions = sessions.filter(session => session.id !== id);
    
    return Response.json({ message: 'Session deleted successfully' });
  } catch (error) {
    console.error('Error deleting session:', error);
    return Response.json({ error: 'Failed to delete session' }, { status: 500 });
  }
}