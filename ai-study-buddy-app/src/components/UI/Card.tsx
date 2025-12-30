// Simple card component for AI Study Buddy

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  glass?: boolean;
}

export default function Card({ children, className = '', title, glass = false }: CardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md border border-gray-200 p-6 ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      )}
      {children}
    </div>
  );
}




