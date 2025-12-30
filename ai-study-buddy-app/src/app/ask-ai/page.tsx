'use client';

import { useState } from 'react';
<<<<<<< HEAD
import Button from '@/components/UI/Button';
import Card from '@/components/UI/Card';

export default function AskAIPage() {
  const [question, setQuestion] = useState('');
  const [level, setLevel] = useState('beginner');
  const [response, setResponse] = useState('');
=======
import Link from 'next/link';
import Card from '@/components/UI/Card';
import Button from '@/components/UI/Button';

export default function AskAI() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
>>>>>>> 6843f05f19f2701fb3752d9c7fdcb19727c1d911
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
<<<<<<< HEAD
    setResponse('');

    try {
      // Call the AI API
      const response = await fetch('/api/ai/ask', {
=======
    setAnswer('');

    try {
      const response = await fetch('/api/ask-ai', {
>>>>>>> 6843f05f19f2701fb3752d9c7fdcb19727c1d911
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
<<<<<<< HEAD
        body: JSON.stringify({ question, level }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }
      
      const data = await response.json();
      setResponse(data.response);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setResponse('Sorry, there was an error processing your request. Please try again.');
=======
        body: JSON.stringify({ question }),
      });

      const data = await response.json();

      if (response.ok) {
        setAnswer(data.answer);
      } else {
        setAnswer(`Error: ${data.error}`);
      }
    } catch (error) {
      setAnswer('Error: Failed to connect to AI service');
>>>>>>> 6843f05f19f2701fb3752d9c7fdcb19727c1d911
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD


  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🤖 Ask AI</h1>
          <p className="text-gray-600">Get instant explanations for any topic</p>
        </div>

        <Card className="mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
                What do you want to learn?
              </label>
              <textarea
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="E.g., Explain recursion in programming with an example..."
              />
            </div>

            <div>
              <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty Level
              </label>
              <select
                id="level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="beginner">Beginner - Simple explanations</option>
                <option value="intermediate">Intermediate - Detailed explanations</option>
                <option value="advanced">Advanced - Technical depth</option>
              </select>
            </div>

            <div>
              <Button
                variant="primary"
                size="large"
                disabled={loading || !question.trim()}
                className="w-full"
                type="submit"
              >
                {loading ? 'Asking AI...' : 'Ask AI'}
              </Button>
            </div>
          </form>
        </Card>

        {response && (
          <Card>
            <div className="prose max-w-none">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Response</h3>
              <div className="whitespace-pre-line text-gray-700">
                {response}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-2">Need more help?</h4>
                <div className="flex flex-wrap gap-2">
                  <Button variant="secondary" size="small">
                    Explain more simply
                  </Button>
                  <Button variant="secondary" size="small">
                    Give more examples
                  </Button>
                  <Button variant="secondary" size="small">
                    Provide practice questions
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}
=======
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🤖 Ask AI
          </h1>
          <p className="text-gray-600">
            Get instant answers to your study questions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Question Input */}
          <Card title="Ask Your Question">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
                  What would you like to know?
                </label>
                <textarea
                  id="question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="e.g., Explain photosynthesis in simple terms..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  disabled={loading}
                />
              </div>
              <Button 
                type="submit" 
                disabled={!question.trim() || loading}
                size="large"
                className="w-full"
              >
                {loading ? 'Thinking...' : 'Ask AI'}
              </Button>
            </form>

            {/* Example Questions */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Example Questions:</h3>
              <div className="space-y-2">
                {[
                  "Explain the water cycle",
                  "What is the Pythagorean theorem?",
                  "How does photosynthesis work?",
                  "What are the main causes of World War I?"
                ].map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setQuestion(example)}
                    className="block w-full text-left p-2 text-sm text-blue-600 hover:bg-blue-50 rounded border border-blue-200"
                    disabled={loading}
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* AI Response */}
          <Card title="AI Response">
            {loading && (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">AI is thinking...</span>
              </div>
            )}

            {answer && !loading && (
              <div className="prose prose-sm max-w-none">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="whitespace-pre-wrap text-gray-800">{answer}</div>
                </div>
              </div>
            )}

            {!answer && !loading && (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-4">🤖</div>
                <p>Ask a question to get started!</p>
              </div>
            )}
          </Card>
        </div>

        {/* Tips */}
        <div className="mt-8">
          <Card title="💡 Tips for Better Answers">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Be Specific</h4>
                <p className="text-gray-600">Instead of "Tell me about history", ask "What caused the American Civil War?"</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Ask for Examples</h4>
                <p className="text-gray-600">Request examples to better understand concepts: "Give me examples of renewable energy"</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Break Down Complex Topics</h4>
                <p className="text-gray-600">Ask about one concept at a time for clearer explanations</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Request Different Formats</h4>
                <p className="text-gray-600">Ask for step-by-step guides, summaries, or comparisons</p>
              </div>
            </div>
          </Card>
        </div>
>>>>>>> 6843f05f19f2701fb3752d9c7fdcb19727c1d911
      </div>
    </div>
  );
}