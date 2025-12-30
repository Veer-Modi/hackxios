<<<<<<< HEAD
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { question, level } = await request.json();
    
    // In a real app, this would call the OpenAI API
    // For demo purposes, we'll simulate an AI response
    console.log(`AI received question: ${question} at level: ${level}`);
    
    // Simulated AI response
    const response = `Thank you for your question: "${question}"
    
Step-by-step explanation:
1. First, let's understand the core concept
2. Then we'll break it down into manageable parts
3. Finally, we'll apply it with an example

Example:
Here's a practical example to illustrate the concept.

Practice Questions:
1. How would you apply this in a different scenario?
2. What are the key components involved?`;

    return Response.json({ 
      response,
      question,
      level,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error processing AI request:', error);
    return Response.json({ error: 'Failed to process AI request' }, { status: 500 });
=======
import { NextRequest, NextResponse } from 'next/server';
import { askAI } from '@/lib/openai';
import { getUserFromRequest } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { question, level } = body;

    // Validate input
    if (!question || typeof question !== 'string') {
      return NextResponse.json(
        { error: 'Question is required and must be a string' },
        { status: 400 }
      );
    }

    if (!level || !['beginner', 'intermediate', 'advanced'].includes(level)) {
      return NextResponse.json(
        { error: 'Level must be one of: beginner, intermediate, advanced' },
        { status: 400 }
      );
    }

    if (question.length > 500) {
      return NextResponse.json(
        { error: 'Question must be less than 500 characters' },
        { status: 400 }
      );
    }

    // Call OpenAI API
    const response = await askAI({ question: question.trim(), level });

    return NextResponse.json(response);

  } catch (error) {
    console.error('Ask AI error:', error);
    return NextResponse.json(
      { error: 'Failed to get AI response. Please try again.' },
      { status: 500 }
    );
>>>>>>> 6843f05f19f2701fb3752d9c7fdcb19727c1d911
  }
}