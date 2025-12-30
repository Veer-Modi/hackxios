// Simple button component for AI Study Buddy

import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'purple' | 'pink' | 'teal' | 'glass' | 'gradient';
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
  const baseClasses = 'font-semibold rounded-xl btn-press focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
  secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-500',
  danger: 'bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-500',
  success: 'bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500',
  warning: 'bg-amber-500 hover:bg-amber-600 text-white focus:ring-amber-400',
  purple: 'bg-violet-600 hover:bg-violet-700 text-white focus:ring-violet-500',
  pink: 'bg-pink-600 hover:bg-pink-700 text-white focus:ring-pink-500',
  teal: 'bg-teal-600 hover:bg-teal-700 text-white focus:ring-teal-500',
  glass: 'glass text-gray-900 dark:text-gray-100',
  gradient: 'text-white bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-500 hover:from-violet-700 hover:via-fuchsia-700 hover:to-rose-600 animate-gradient focus:ring-fuchsia-500'
};
  
  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
  };
  
  const disabledClasses = disabled 
    ? 'opacity-50 cursor-not-allowed' 
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






