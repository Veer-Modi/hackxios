// Life display component for AI Study Buddy

'use client';

import React from 'react';
import { getLivesDisplay, getLifeWarningMessage } from '@/lib/life-system';

interface LifeDisplayProps {
  livesRemaining: number;
  showWarning?: boolean;
}

export default function LifeDisplay({ livesRemaining, showWarning = false }: LifeDisplayProps) {
  const livesDisplay = getLivesDisplay();
  const warningMessage = getLifeWarningMessage(livesRemaining);
  
  return (
    <div className="text-center">
      <div className="text-3xl mb-3">
        <span className="text-red-400">{livesDisplay}</span>
        <span className="text-white/70 ml-2 text-lg">({livesRemaining}/5)</span>
      </div>
      
      {showWarning && livesRemaining < 5 && (
        <div className={`
          p-3 rounded-lg text-sm font-medium animate-life-lost
          ${livesRemaining <= 1 ? 'bg-red-500/30 text-red-200 border border-red-400/50' : 
            livesRemaining <= 2 ? 'bg-orange-500/30 text-orange-200 border border-orange-400/50' : 
            'bg-yellow-500/30 text-yellow-200 border border-yellow-400/50'}
        `}>
          {warningMessage}
        </div>
      )}
    </div>
  );
}