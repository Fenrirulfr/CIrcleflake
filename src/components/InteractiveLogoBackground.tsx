import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

export default function InteractiveLogoBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      // Calculate relative distance from center (-1 to 1)
      mouseX.set((e.clientX - centerX) / (width / 2));
      mouseY.set((e.clientY - centerY) / (height / 2));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Transforms for different elements to create parallax/depth
  const rotateX = useTransform(y, [-1, 1], [10, -10]);
  const rotateY = useTransform(x, [-1, 1], [-10, 10]);
  const translateX = useTransform(x, [-1, 1], [-30, 30]);
  const translateY = useTransform(y, [-1, 1], [-30, 30]);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-center pointer-events-none -z-20 overflow-hidden"
    >
      <motion.div 
        style={{ 
          rotateX, 
          rotateY,
          x: translateX,
          y: translateY,
          perspective: 1000 
        }}
        className="relative w-[800px] h-[800px] opacity-[0.08]"
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <radialGradient id="bg-logo-glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="var(--color-cyan-glow)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="var(--color-cyan-glow)" stopOpacity="0" />
            </radialGradient>
          </defs>
          
          <circle cx="50" cy="50" r="45" fill="url(#bg-logo-glow)" />

          {/* Connecting Lines */}
          <g stroke="var(--color-electric-indigo)" strokeWidth="0.5" opacity="0.4">
            <line x1="50" y1="50" x2="50" y2="15" />
            <line x1="50" y1="50" x2="80" y2="32.5" />
            <line x1="50" y1="50" x2="80" y2="67.5" />
            <line x1="50" y1="50" x2="50" y2="85" />
            <line x1="50" y1="50" x2="20" y2="67.5" />
            <line x1="50" y1="50" x2="20" y2="32.5" />
            <path d="M50 25 L71.6 37.5 L71.6 62.5 L50 75 L28.4 62.5 L28.4 37.5 Z" fill="none" />
          </g>

          {/* Outer Nodes */}
          <circle cx="50" cy="15" r="3" fill="var(--color-cyan-glow)" />
          <circle cx="80" cy="32.5" r="3" fill="var(--color-cyan-glow)" />
          <circle cx="80" cy="67.5" r="3" fill="var(--color-cyan-glow)" />
          <circle cx="50" cy="85" r="3" fill="var(--color-cyan-glow)" />
          <circle cx="20" cy="67.5" r="3" fill="var(--color-cyan-glow)" />
          <circle cx="20" cy="32.5" r="3" fill="var(--color-cyan-glow)" />

          {/* Center Node */}
          <circle cx="50" cy="50" r="10" fill="var(--color-electric-indigo)" opacity="0.2" />
          <circle cx="50" cy="50" r="4" fill="var(--color-cyan-glow)" className="animate-pulse" />
        </svg>
      </motion.div>
    </div>
  );
}
