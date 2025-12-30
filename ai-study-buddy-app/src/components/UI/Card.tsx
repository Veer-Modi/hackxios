// Glass card component for AI Study Buddy

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  glass?: boolean;
}

export default function Card({ children, className = '', title, glass = true }: CardProps) {
  const glassClasses = glass 
    ? 'glass card-hover' 
    : 'bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-lg';
  
  return (
    <div className={`${glassClasses} p-6 ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-white mb-4 gradient-text">{title}</h3>
      )}
      {children}
    </div>
  );
}




