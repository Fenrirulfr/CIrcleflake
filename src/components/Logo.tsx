import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className = "", size = 40 }: LogoProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background Glow */}
      <defs>
        <linearGradient id="circle-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--card-bg)" />
          <stop offset="100%" stopColor="var(--sidebar-border)" />
        </linearGradient>
      </defs>
      
      {/* Connecting Lines - Thinner, more precise */}
      <g stroke="var(--text-secondary)" strokeWidth="1" opacity="0.4">
        <line x1="50" y1="50" x2="50" y2="15" />
        <line x1="50" y1="50" x2="80" y2="32.5" />
        <line x1="50" y1="50" x2="80" y2="67.5" />
        <line x1="50" y1="50" x2="50" y2="85" />
        <line x1="50" y1="50" x2="20" y2="67.5" />
        <line x1="50" y1="50" x2="20" y2="32.5" />
        
        {/* Inner hexagon connections */}
        <path d="M50 25 L71.6 37.5 L71.6 62.5 L50 75 L28.4 62.5 L28.4 37.5 Z" fill="none" />
      </g>

      {/* Outer Nodes - Solid, no glow */}
      <circle cx="50" cy="15" r="6" fill="var(--logo-node)" stroke="var(--logo-stroke)" strokeWidth="1.5" />
      <circle cx="80" cy="32.5" r="6" fill="var(--logo-node)" stroke="var(--logo-stroke)" strokeWidth="1.5" />
      <circle cx="80" cy="67.5" r="6" fill="var(--logo-node)" stroke="var(--logo-stroke)" strokeWidth="1.5" />
      <circle cx="50" cy="85" r="6" fill="var(--logo-node)" stroke="var(--logo-stroke)" strokeWidth="1.5" />
      <circle cx="20" cy="67.5" r="6" fill="var(--logo-node)" stroke="var(--logo-stroke)" strokeWidth="1.5" />
      <circle cx="20" cy="32.5" r="6" fill="var(--logo-node)" stroke="var(--logo-stroke)" strokeWidth="1.5" />

      {/* Intermediate Nodes - Tiny dots */}
      <circle cx="50" cy="32.5" r="2" fill="var(--logo-stroke)" />
      <circle cx="65" cy="41.25" r="2" fill="var(--logo-stroke)" />
      <circle cx="65" cy="58.75" r="2" fill="var(--logo-stroke)" />
      <circle cx="50" cy="67.5" r="2" fill="var(--logo-stroke)" />
      <circle cx="35" cy="58.75" r="2" fill="var(--logo-stroke)" />
      <circle cx="35" cy="41.25" r="2" fill="var(--logo-stroke)" />

      {/* Center Node - Solid */}
      <circle cx="50" cy="50" r="10" fill="var(--logo-node)" stroke="url(#circle-grad)" strokeWidth="2" />
      <circle cx="50" cy="50" r="4" fill="var(--logo-stroke)" />
    </svg>
  );
}
