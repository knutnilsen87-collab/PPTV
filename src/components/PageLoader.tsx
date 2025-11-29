"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface PageLoaderProps {
  isLoading: boolean;
  onComplete?: () => void;
}

export default function PageLoader({ isLoading, onComplete }: PageLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!isLoading) return;

    // Reset progress when loading starts
    setProgress(0);

    const timer = setInterval(() => {
      setProgress(prev => {
        // Ensure we reach 100% smoothly
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setShowContent(true);
            onComplete?.();
          }, 300);
          return 100;
        }
        // Use a more dynamic increment to ensure smooth progress
        const increment = Math.max(1, Math.floor((100 - prev) / 10));
        return Math.min(100, prev + increment);
      });
    }, 80); // Slightly faster interval for smoother animation

    return () => clearInterval(timer);
  }, [isLoading, onComplete]);

  useEffect(() => {
    if (isLoading) {
      setProgress(0);
      setShowContent(false);
    }
  }, [isLoading]);

  // Ensure progress reaches 100% when loading stops
  useEffect(() => {
    if (!isLoading && progress > 0 && progress < 100) {
      // Complete the progress bar when loading stops
      setProgress(100);
      setTimeout(() => {
        setShowContent(true);
        onComplete?.();
      }, 200);
    }
  }, [isLoading, progress, onComplete]);

  if (!isLoading && showContent) {
    return null;
  }

  return (
    <div className={`fixed inset-0 z-50 bg-poker-950 transition-opacity duration-300 ${
      showContent ? 'opacity-0 pointer-events-none' : 'opacity-100'
    }`}>
      <div className="h-full flex flex-col items-center justify-center px-4">
        {/* Logo */}
        <div className="mb-8 animate-pulse">
          <Image 
            src="/logoGIF.gif" 
            alt="ProPokerTV Logo" 
            width={80}
            height={80}
            className="rounded-2xl shadow-lg"
            priority
          />
        </div>

        {/* Loading Text */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gradient-enhanced mb-2">
            ProPokerTV
          </h2>
          <p className="text-poker-300 text-lg">
            Loading...
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 max-w-full">
          <div className="w-full h-2 bg-poker-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-accent-green to-accent-teal rounded-full transition-all duration-200 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Progress Percentage */}
        <div className="mt-4 text-poker-400 font-medium">
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
}
