'use client';

import { useState } from 'react';
import Button from '@/components/UI/Button';
import Card from '@/components/UI/Card';

export default function AskAIPage() {
  const [question, setQuestion] = useState('');
  const [level, setLevel] = useState('beginner');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
setResponse('');

    try {
      // Call the AI API
      const response = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
    } finally {
      setLoading(false);
    }
  };

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
      </div>
    </div>
  );
}
