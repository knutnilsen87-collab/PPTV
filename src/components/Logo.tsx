import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

/**
 * Logo Component with Enhanced Text Effects
 * 
 * Available variants:
 * - default: Enhanced green-to-teal-to-blue gradient with subtle animation
 * - premium: Gold-to-yellow-to-orange gradient with premium feel
 * - gold: Simple gold-to-yellow gradient
 * - rainbow: Full spectrum rainbow gradient with smooth animation
 * - fire: Orange-to-gold-to-yellow gradient with fire effect
 * - ocean: Blue-to-cyan-to-teal gradient with ocean feel
 * 
 * All variants include:
 * - Enhanced typography with extrabold font weight
 * - Smooth gradient animations
 * - Hover effects with glow and scale
 * - Responsive sizing (sm, md, lg)
 */
interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
  variant?: 'default' | 'premium' | 'gold' ;
}

export default function Logo({ size = 'md', showText = true, className = '', variant = 'default' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  const getTextClasses = () => {
    const baseClasses = `${textSizes[size]} font-extrabold tracking-tight`;
    
    switch (variant) {
      case 'premium':
        return `${baseClasses} text-gradient-premium`;
      case 'gold':
        return `${baseClasses} text-gradient-gold`;
      default:
        return `${baseClasses} text-gradient-enhanced`;
    }
  };

  return (
    <Link href="/" className={`flex-shrink-0 flex items-center space-x-3 ${className}`}>
      <Image 
        src="/Pro Poker.svg"
        alt="ProPokerTV Logo" 
        width={size === 'sm' ? 32 : size === 'lg' ? 48 : 40}
        height={size === 'sm' ? 32 : size === 'lg' ? 48 : 40}
        className={`${sizeClasses[size]} transition-transform hover:scale-105`}
        priority
      />
      {showText && (
        <span className={`${getTextClasses()} logo-text-effect`}>
          ProPokerTV
        </span>
      )}
    </Link>
  );
}
