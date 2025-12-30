'use client';

import { useState } from 'react';
import Button from '@/components/UI/Button';
import Card from '@/components/UI/Card';

export default function SummarizePage() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
if (!text.trim()) return;

    setLoading(true);
    setSummary('');

    try {
// Call the AI API
      const response = await fetch('/api/ai/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
body: JSON.stringify({ text }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get summary');
      }
      
      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      console.error('Error getting summary:', error);
      setSummary('Sorry, there was an error processing your request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

return (
    <div className="min-h-screen py-8 bg-slate-900">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 gradient-text">📝 Summarize Notes</h1>
          <p className="text-white/80 text-lg">Convert long text into concise bullet points</p>
        </div>

        <Card glass={false} className="bg-white/5 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="text" className="block text-sm font-medium text-white mb-2">
                Paste your text to summarize
              </label>
              <textarea
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={8}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 backdrop-blur-sm"
                placeholder="Paste your lecture notes, article, or any long text here..."
              />
            </div>

            <div>
              <Button
                variant="secondary"
                size="large"
                disabled={loading || !text.trim()}
                className="w-full"
                type="submit"
              >
                {loading ? 'Summarizing...' : 'Summarize'}
              </Button>
            </div>
          </form>
        </Card>

        {summary && (
          <Card className="glass-strong">
            <div className="prose prose-invert max-w-none">
              <h3 className="text-xl font-semibold text-white mb-4 gradient-text">Summary</h3>
              <div className="whitespace-pre-line text-white/90 leading-relaxed">
                {summary}
              </div>
              
              <div className="mt-6 pt-6 border-t border-white/20">
                <h4 className="font-medium text-white mb-3">Actions</h4>
                <div className="flex flex-wrap gap-2">
                  <Button variant="secondary" size="small">
                    Copy Summary
                  </Button>
                  <Button variant="secondary" size="small">
                    Export to PDF
                  </Button>
                  <Button variant="secondary" size="small">
                    Save to Notes
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
