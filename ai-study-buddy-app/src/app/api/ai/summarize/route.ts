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
  }
}
