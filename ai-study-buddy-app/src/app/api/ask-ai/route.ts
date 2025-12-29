import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json();

    if (!question) {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      );
    }

    // Check if OpenAI API key is configured
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey || apiKey === 'your_openai_api_key_here') {
      // Demo mode - return a sample response
      const demoAnswers = {
        'explain photosynthesis': 'Photosynthesis is the process by which plants convert sunlight, carbon dioxide, and water into glucose and oxygen. It occurs in two main stages: the light-dependent reactions (in the thylakoids) and the Calvin cycle (in the stroma). This process is essential for life on Earth as it produces oxygen and serves as the foundation of most food chains.',
        'what is the pythagorean theorem': 'The Pythagorean theorem states that in a right triangle, the square of the hypotenuse (the longest side) equals the sum of squares of the other two sides. The formula is: a² + b² = c², where c is the hypotenuse and a and b are the other two sides.',
        'how does photosynthesis work': 'Photosynthesis works in two main stages: 1) Light reactions capture sunlight energy and split water molecules, producing ATP and NADPH. 2) The Calvin cycle uses this energy to convert CO₂ into glucose. The overall equation is: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂.',
        'what are the main causes of world war i': 'The main causes of World War I include: 1) Militarism - arms race between nations, 2) Alliances - complex web of treaties, 3) Imperialism - competition for colonies, 4) Nationalism - ethnic tensions in Europe. The immediate trigger was the assassination of Archduke Franz Ferdinand in 1914.'
      };
      
      const lowerQuestion = question.toLowerCase();
      let demoAnswer = demoAnswers[lowerQuestion as keyof typeof demoAnswers];
      
      if (!demoAnswer) {
        // Find partial matches
        for (const [key, value] of Object.entries(demoAnswers)) {
          if (lowerQuestion.includes(key.split(' ')[1]) || key.includes(lowerQuestion.split(' ')[0])) {
            demoAnswer = value;
            break;
          }
        }
      }
      
      if (!demoAnswer) {
        demoAnswer = `This is a demo response for: "${question}"\n\nTo get real AI answers, please:\n1. Get an OpenAI API key from https://platform.openai.com/\n2. Add it to your .env.local file as OPENAI_API_KEY=sk-your-key-here\n3. Restart the server\n\nFor now, try asking about photosynthesis, Pythagorean theorem, or World War I causes to see sample responses!`;
      }
      
      return NextResponse.json({ answer: `🤖 Demo Mode: ${demoAnswer}` });
    }

    // Call OpenAI API
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
            content: 'You are a helpful study assistant. Provide clear, concise answers to help students learn better. Keep responses focused and educational.'
          },
          {
            role: 'user',
            content: question
          }
        ],
        max_tokens: 500,
        temperature: 0.7,
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
    const answer = data.choices[0]?.message?.content || 'Sorry, I could not generate an answer.';

    return NextResponse.json({ answer });

  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return NextResponse.json(
      { error: 'Failed to get AI response' },
      { status: 500 }
    );
  }
}