// OpenAI API helper for AI Study Buddy

interface AskAIRequest {
  question: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}

interface AskAIResponse {
  explanation: string;
  example: string;
  practiceQuestions: string[];
}

interface SummarizeRequest {
  text: string;
}

interface SummarizeResponse {
  summary: string[];
}

// Ask AI with level-based responses
export async function askAI(request: AskAIRequest): Promise<AskAIResponse> {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey || apiKey === 'your_openai_api_key_here') {
    // Demo mode responses
    return getDemoAIResponse(request);
  }
  
  const systemPrompts = {
    beginner: 'You are a helpful tutor for beginners. Explain concepts in simple terms with basic examples. Avoid jargon and complex terminology.',
    intermediate: 'You are a knowledgeable instructor for intermediate learners. Provide detailed explanations with practical examples and some technical depth.',
    advanced: 'You are an expert educator for advanced students. Give comprehensive explanations with complex examples, technical details, and nuanced insights.'
  };
  
  try {
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
            content: `${systemPrompts[request.level]} 

Your response must be in this exact JSON format:
{
  "explanation": "Step-by-step explanation of the concept",
  "example": "A concrete example that illustrates the concept",
  "practiceQuestions": ["Question 1", "Question 2"]
}

Make sure to provide exactly 2 practice questions that test understanding of the concept.`
          },
          {
            role: 'user',
            content: request.question
          }
        ],
        max_tokens: 800,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error('No response from OpenAI');
    }
    
    // Parse JSON response
    const parsed = JSON.parse(content);
    return {
      explanation: parsed.explanation || 'No explanation provided',
      example: parsed.example || 'No example provided',
      practiceQuestions: parsed.practiceQuestions || []
    };
    
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    // Fallback to demo response
    return getDemoAIResponse(request);
  }
}

// Summarize text
export async function summarizeText(request: SummarizeRequest): Promise<SummarizeResponse> {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey || apiKey === 'your_openai_api_key_here') {
    // Demo mode response
    return getDemoSummaryResponse(request);
  }
  
  try {
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
            content: `You are a helpful study assistant that creates concise, well-structured summaries. 

Your response must be in this exact JSON format:
{
  "summary": ["• Key point 1", "• Key point 2", "• Key point 3"]
}

Create bullet points for key concepts, highlight important terms, and organize information logically. Keep summaries clear and study-friendly. Use bullet points (•) for each point.`
          },
          {
            role: 'user',
            content: `Please summarize the following text:\n\n${request.text}`
          }
        ],
        max_tokens: 600,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error('No response from OpenAI');
    }
    
    // Parse JSON response
    const parsed = JSON.parse(content);
    return {
      summary: parsed.summary || ['• No summary could be generated']
    };
    
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    // Fallback to demo response
    return getDemoSummaryResponse(request);
  }
}

// Demo responses for when API key is not available
function getDemoAIResponse(request: AskAIRequest): AskAIResponse {
  const demoResponses: Record<string, AskAIResponse> = {
    'photosynthesis': {
      explanation: 'Photosynthesis is the process by which plants convert sunlight, carbon dioxide, and water into glucose and oxygen. It occurs in two main stages: the light-dependent reactions (in the thylakoids) and the Calvin cycle (in the stroma).',
      example: 'When a leaf absorbs sunlight, chlorophyll captures the light energy. This energy splits water molecules (H₂O) into hydrogen and oxygen. The oxygen is released as a byproduct, while the hydrogen combines with CO₂ to form glucose (C₆H₁₂O₆).',
      practiceQuestions: [
        'What are the main inputs and outputs of photosynthesis?',
        'Where do the light-dependent reactions occur in plant cells?'
      ]
    },
    'pythagorean theorem': {
      explanation: 'The Pythagorean theorem states that in a right triangle, the square of the hypotenuse (longest side) equals the sum of squares of the other two sides. The formula is: a² + b² = c².',
      example: 'In a right triangle with sides of 3 and 4 units, the hypotenuse would be: √(3² + 4²) = √(9 + 16) = √25 = 5 units.',
      practiceQuestions: [
        'Find the hypotenuse of a right triangle with sides 5 and 12.',
        'If the hypotenuse is 13 and one side is 5, what is the other side?'
      ]
    }
  };
  
  const lowerQuestion = request.question.toLowerCase();
  
  // Find matching demo response
  for (const [key, response] of Object.entries(demoResponses)) {
    if (lowerQuestion.includes(key) || key.includes(lowerQuestion.split(' ')[0])) {
      return response;
    }
  }
  
  // Default demo response
  return {
    explanation: `This is a demo response for "${request.question}" at ${request.level} level. To get real AI answers, please add your OpenAI API key to the .env.local file.`,
    example: 'Example would be provided here with a real API key.',
    practiceQuestions: [
      'Practice question 1 would be generated here.',
      'Practice question 2 would be generated here.'
    ]
  };
}

function getDemoSummaryResponse(request: SummarizeRequest): SummarizeResponse {
  const wordCount = request.text.split(' ').length;
  
  return {
    summary: [
      `• Demo summary for ${wordCount} words of text`,
      '• Key concepts would be extracted and organized',
      '• Important facts and relationships would be highlighted',
      '• Main takeaways would be clearly presented',
      '• Add your OpenAI API key to .env.local for real summarization'
    ]
  };
}