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
    <div className="min-h-screen py-8 bg-slate-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 gradient-text">🤖 Ask AI</h1>
          <p className="text-white/80 text-lg">Get instant explanations for any topic</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Input (Soft background) */}
          <div className="space-y-6">
            <Card glass={false} className="bg-white/5">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="question" className="block text-sm font-medium text-white mb-2">
                    What do you want to learn?
                  </label>
                  <textarea
                    id="question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 backdrop-blur-sm"
                    placeholder="E.g., Explain recursion in programming with an example..."
                  />
                </div>

                <div>
                  <label htmlFor="level" className="block text-sm font-medium text-white mb-2">
                    Difficulty Level
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setLevel('beginner')}
                      className={`flex-1 px-4 py-2 rounded-xl font-medium transition-all ${
                        level === 'beginner'
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                          : 'bg-white/10 text-white/70 hover:bg-white/20'
                      }`}
                    >
                      Beginner
                    </button>
                    <button
                      type="button"
                      onClick={() => setLevel('intermediate')}
                      className={`flex-1 px-4 py-2 rounded-xl font-medium transition-all ${
                        level === 'intermediate'
                          ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg'
                          : 'bg-white/10 text-white/70 hover:bg-white/20'
                      }`}
                    >
                      Intermediate
                    </button>
                    <button
                      type="button"
                      onClick={() => setLevel('advanced')}
                      className={`flex-1 px-4 py-2 rounded-xl font-medium transition-all ${
                        level === 'advanced'
                          ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg'
                          : 'bg-white/10 text-white/70 hover:bg-white/20'
                      }`}
                    >
                      Advanced
                    </button>
                  </div>
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
          </div>

          {/* Right Panel - AI Response (Glass focus area) */}
          <div>
            {response ? (
              <Card className="glass-strong h-full">
                <div className="prose prose-invert max-w-none">
                  <h3 className="text-xl font-semibold text-white mb-4 gradient-text">AI Response</h3>
                  <div className="whitespace-pre-line text-white/90 leading-relaxed">
                    {response}
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <h4 className="font-medium text-white mb-3">Need more help?</h4>
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
            ) : (
              <Card className="glass h-full flex items-center justify-center min-h-[400px]">
                <div className="text-center text-white/50">
                  <div className="text-6xl mb-4">💡</div>
                  <p className="text-lg">Your AI response will appear here</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
