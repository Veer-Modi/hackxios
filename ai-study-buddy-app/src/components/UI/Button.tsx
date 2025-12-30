// Multi-color gradient button component for AI Study Buddy

import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'teal' | 'glass';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  className = '',
  type = 'button'
}: ButtonProps) {
  const baseClasses = 'font-semibold rounded-xl btn-press focus:outline-none focus:ring-2 focus:ring-white/50 text-white';
  
  const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
    // Primary: Indigo → Purple (Start, Ask AI, Submit)
    primary: 'bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 hover:from-indigo-600 hover:via-purple-600 hover:to-fuchsia-600 focus:ring-purple-500 shadow-lg shadow-purple-500/30',
    
    // Secondary: Teal → Cyan (Explain Simply, Summarize)
    secondary: 'bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 hover:from-teal-600 hover:via-cyan-600 hover:to-blue-600 focus:ring-cyan-500 shadow-lg shadow-cyan-500/30',
    
    // Danger/Warning: Red → Orange (Reset, Stop)
    danger: 'bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 hover:from-red-600 hover:via-orange-600 hover:to-amber-600 focus:ring-red-500 shadow-lg shadow-red-500/30',
    
    // Success: Green gradient
    success: 'bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 focus:ring-emerald-500 shadow-lg shadow-emerald-500/30',
    
    // Warning: Orange gradient
    warning: 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 focus:ring-orange-500 shadow-lg shadow-orange-500/30',
    
    // Teal: Teal gradient
    teal: 'bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 focus:ring-teal-500 shadow-lg shadow-teal-500/30',
    
    // Glass: Subtle glass effect
    glass: 'glass text-white hover:bg-white/15 focus:ring-white/30'
  };
  
  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
  };
  
  const disabledClasses = disabled 
    ? 'opacity-50 cursor-not-allowed grayscale' 
    : 'cursor-pointer';
  
  const classes = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${disabledClasses}
    ${className}
  `.trim();
  
  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}






