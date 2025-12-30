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
  }
}
