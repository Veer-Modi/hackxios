'use client';

import { useState } from 'react';
<<<<<<< HEAD
import Button from '@/components/UI/Button';
import Card from '@/components/UI/Card';

export default function SummarizePage() {
  const [text, setText] = useState('');
=======
import Link from 'next/link';
import Card from '@/components/UI/Card';
import Button from '@/components/UI/Button';

export default function Summarize() {
  const [notes, setNotes] = useState('');
>>>>>>> 6843f05f19f2701fb3752d9c7fdcb19727c1d911
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
<<<<<<< HEAD
    if (!text.trim()) return;
=======
    if (!notes.trim()) return;
>>>>>>> 6843f05f19f2701fb3752d9c7fdcb19727c1d911

    setLoading(true);
    setSummary('');

    try {
<<<<<<< HEAD
      // Call the AI API
      const response = await fetch('/api/ai/summarize', {
=======
      const response = await fetch('/api/summarize', {
>>>>>>> 6843f05f19f2701fb3752d9c7fdcb19727c1d911
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
<<<<<<< HEAD
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
=======
        body: JSON.stringify({ notes }),
      });

      const data = await response.json();

      if (response.ok) {
        setSummary(data.summary);
      } else {
        setSummary(`Error: ${data.error}`);
      }
    } catch (error) {
      setSummary('Error: Failed to connect to summarization service');
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
=======
  const handleClear = () => {
    setNotes('');
    setSummary('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            📝 Summarize Notes
          </h1>
          <p className="text-gray-600">
            Turn your lengthy notes into concise summaries
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <Card title="Your Notes">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                  Paste your notes here:
                </label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Paste your study notes, lecture transcripts, or any text you want summarized..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={12}
                  disabled={loading}
                />
                <div className="text-sm text-gray-500 mt-1">
                  {notes.length} characters
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  type="submit" 
                  disabled={!notes.trim() || loading}
                  size="large"
                  className="flex-1"
                >
                  {loading ? 'Summarizing...' : 'Summarize'}
                </Button>
                <Button 
                  type="button"
                  onClick={handleClear}
                  variant="secondary"
                  size="large"
                  disabled={loading}
                >
                  Clear
                </Button>
              </div>
            </form>

            {/* Example Notes */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Example Notes to Try:</h3>
              <div className="space-y-2">
                {[
                  "Photosynthesis is the process by which plants convert sunlight into energy...",
                  "The American Civil War (1861-1865) was fought between the Union and Confederate states...",
                  "Newton's three laws of motion describe the relationship between forces and motion...",
                  "The water cycle involves evaporation, condensation, and precipitation..."
                ].map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setNotes(example + " [Add more content here to see better summarization]")}
                    className="block w-full text-left p-2 text-sm text-blue-600 hover:bg-blue-50 rounded border border-blue-200"
                    disabled={loading}
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Summary Output */}
          <Card title="Summary">
            {loading && (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Creating summary...</span>
              </div>
            )}

            {summary && !loading && (
              <div className="prose prose-sm max-w-none">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="text-green-800 font-semibold mb-3">📋 Summary</h3>
                  <div className="whitespace-pre-wrap text-gray-800">{summary}</div>
                </div>
                
                {/* Copy Button */}
                <div className="mt-4">
                  <Button
                    onClick={() => navigator.clipboard.writeText(summary)}
                    variant="secondary"
                    size="small"
                  >
                    📋 Copy Summary
                  </Button>
                </div>
              </div>
            )}

            {!summary && !loading && (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-4">📝</div>
                <p>Enter your notes to get a summary!</p>
                <div className="mt-4 text-sm text-gray-400">
                  <p>Tips for better summaries:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Include complete sentences</li>
                    <li>Add context and details</li>
                    <li>Use clear, structured text</li>
                    <li>Longer notes = better summaries</li>
                  </ul>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Features */}
        <div className="mt-8">
          <Card title="✨ Summarization Features">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl mb-2">🎯</div>
                <h4 className="font-semibold text-gray-800 mb-1">Key Points</h4>
                <p className="text-gray-600">Extracts the most important information</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">📊</div>
                <h4 className="font-semibold text-gray-800 mb-1">Structured</h4>
                <p className="text-gray-600">Organizes content in logical order</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">⚡</div>
                <h4 className="font-semibold text-gray-800 mb-1">Fast</h4>
                <p className="text-gray-600">Quick AI-powered summarization</p>
              </div>
            </div>
          </Card>
        </div>
>>>>>>> 6843f05f19f2701fb3752d9c7fdcb19727c1d911
      </div>
    </div>
  );
}