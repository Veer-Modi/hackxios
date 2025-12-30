import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { notes } = await request.json();

    if (!notes) {
      return NextResponse.json(
        { error: 'Notes content is required' },
        { status: 400 }
      );
    }

    // Check if OpenAI API key is configured
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey || apiKey === 'your_openai_api_key_here') {
      // Demo mode - return a sample summary
      const wordCount = notes.split(' ').length;
      const demoSummary = `📋 Demo Summary (${wordCount} words processed)

Key Points:
• This is a demonstration of the summarization feature
• Your notes have been processed and would normally be summarized by AI
• The summary would extract the main concepts and organize them clearly

To enable real AI summarization:
1. Get an OpenAI API key from https://platform.openai.com/
2. Add OPENAI_API_KEY=sk-your-key-here to .env.local
3. Restart the server

Your original content would be analyzed to identify:
- Main topics and themes
- Important facts and figures  
- Key relationships between concepts
- Essential takeaways for studying

Demo mode is currently active - add your API key for full functionality!`;
      
      return NextResponse.json({ summary: demoSummary });
    }

    // Call OpenAI API for summarization
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful study assistant that creates concise, well-structured summaries. Create bullet points for key concepts, highlight important terms, and organize information logically. Keep summaries clear and study-friendly.'
          },
          {
            role: 'user',
            content: `Please summarize the following notes in a clear, structured format with key points and important concepts highlighted:\n\n${notes}`
          }
        ],
        max_tokens: 800,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      // Handle specific error cases
      if (response.status === 429) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please try again in a moment.' },
          { status: 429 }
        );
      }
      if (response.status === 401) {
        return NextResponse.json(
          { error: 'Invalid API key. Please check your OpenAI configuration.' },
          { status: 401 }
        );
      }
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const summary = data.choices[0]?.message?.content || 'Sorry, I could not generate a summary.';

    return NextResponse.json({ summary });

  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return NextResponse.json(
      { error: 'Failed to generate summary. Please try again.' },
      { status: 500 }
    );
  }
}