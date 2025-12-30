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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">📝 Summarize Notes</h1>
          <p className="text-gray-600">Convert long text into concise bullet points</p>
        </div>

        <Card className="mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-2">
                Paste your text to summarize
              </label>
              <textarea
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Paste your lecture notes, article, or any long text here..."
              />
            </div>

            <div>
              <Button
                variant="primary"
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
          <Card>
            <div className="prose max-w-none">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
              <div className="whitespace-pre-line text-gray-700">
                {summary}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-2">Actions</h4>
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