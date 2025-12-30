<<<<<<< HEAD
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();
    
    // In a real app, this would call the OpenAI API
    // For demo purposes, we'll simulate an AI summary
    console.log(`AI received text to summarize with ${text.length} characters`);
    
    // Simulated summary
    const summary = `## Key Points:
- Main concept: ${text.substring(0, 20)}...
- Key takeaway 1: Important point from the text
- Key takeaway 2: Another important point
- Key takeaway 3: Final important point

## Summary:
This text discusses important concepts related to your topic. The main theme is about understanding and applying these concepts in practical scenarios. The key is to focus on the core principles and build upon them.`;

    return Response.json({ 
      summary,
      originalLength: text.length,
      summaryLength: summary.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error processing AI summarize request:', error);
    return Response.json({ error: 'Failed to process AI summarize request' }, { status: 500 });
=======
import { NextRequest, NextResponse } from 'next/server';
import { summarizeText } from '@/lib/openai';
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
    const { text } = body;

    // Validate input
    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Text is required and must be a string' },
        { status: 400 }
      );
    }

    if (text.length < 50) {
      return NextResponse.json(
        { error: 'Text must be at least 50 characters long for meaningful summarization' },
        { status: 400 }
      );
    }

    if (text.length > 10000) {
      return NextResponse.json(
        { error: 'Text must be less than 10,000 characters' },
        { status: 400 }
      );
    }

    // Call OpenAI API
    const response = await summarizeText({ text: text.trim() });

    return NextResponse.json(response);

  } catch (error) {
    console.error('Summarize error:', error);
    return NextResponse.json(
      { error: 'Failed to generate summary. Please try again.' },
      { status: 500 }
    );
>>>>>>> 6843f05f19f2701fb3752d9c7fdcb19727c1d911
  }
}