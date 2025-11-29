"use client"

import { SparklesIcon } from '@heroicons/react/24/outline';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  variant?: 'default' | 'poker' | 'minimal';
}

export default function LoadingSpinner({ 
  size = 'md', 
  text, 
  variant = 'default' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  if (variant === 'minimal') {
    return (
      <div className="flex items-center justify-center">
        <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-poker-700 border-t-accent-green`} />
      </div>
    );
  }

  if (variant === 'poker') {
    return (
      <div className="flex flex-col items-center justify-center space-y-3">
        <div className="relative">
          <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-poker-700 border-t-accent-gold`} />
          <div className="absolute inset-0 flex items-center justify-center">
            <SparklesIcon className={`${size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : 'w-6 h-6'} text-accent-gold animate-pulse`} />
          </div>
        </div>
        {text && (
          <div className={`text-poker-400 ${textSizes[size]} text-center`}>
            {text}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-poker-700 border-t-accent-green`} />
      {text && (
        <div className={`text-poker-400 ${textSizes[size]} text-center`}>
          {text}
        </div>
      )}
    </div>
  );
}
