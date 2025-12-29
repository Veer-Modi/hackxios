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
      <div className="text-2xl mb-2">
        <span className="font-semibold">Lives: </span>
        <span className="text-3xl">{livesDisplay}</span>
        <span className="text-gray-600 ml-2">({livesRemaining}/5)</span>
      </div>
      
      {showWarning && livesRemaining < 5 && (
        <div className={`
          p-3 rounded-lg text-sm font-medium
          ${livesRemaining <= 1 ? 'bg-red-100 text-red-800' : 
            livesRemaining <= 2 ? 'bg-orange-100 text-orange-800' : 
            'bg-yellow-100 text-yellow-800'}
        `}>
          {warningMessage}
        </div>
      )}
    </div>
  );
}