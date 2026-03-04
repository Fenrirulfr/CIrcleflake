import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className = "", size = 40 }: LogoProps) {
  return (
    <img 
      src="https://lh3.googleusercontent.com/d/1fn4ePTYfVAw2M2uJmcs814YUrO3YcIrU" 
      alt="Circleflake Logo"
      width={size}
      height={size}
      className={`rounded-full ${className}`}
      referrerPolicy="no-referrer"
      style={{ objectFit: 'contain' }}
    />
  );
}
