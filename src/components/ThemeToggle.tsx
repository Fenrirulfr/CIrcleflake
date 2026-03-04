import React from 'react';
import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export default function ThemeToggle({ isDarkMode, toggleTheme }: ThemeToggleProps) {
  return (
    <button
      onClick={toggleTheme}
      className={`relative w-16 h-9 rounded-full p-1 transition-all duration-500 cf-focus min-h-[44px] ${
        isDarkMode 
          ? 'bg-[var(--card-bg)] border border-[var(--card-border)] shadow-inner' 
          : 'bg-[var(--bg-stream)] border border-[var(--card-border)] shadow-inner'
      }`}
      aria-label="Toggle theme"
    >
      {/* Background Icons (Stationary) */}
      <div className="absolute inset-0 flex items-center justify-between px-2.5 pointer-events-none">
        <Sun className={`w-3.5 h-3.5 transition-opacity duration-300 ${isDarkMode ? 'text-[var(--text-secondary)] opacity-100' : 'opacity-0'}`} aria-hidden="true" />
        <Moon className={`w-3.5 h-3.5 transition-opacity duration-300 ${!isDarkMode ? 'text-[var(--text-secondary)] opacity-100' : 'opacity-0'}`} aria-hidden="true" />
      </div>

      {/* Sliding Knob */}
      <motion.div
        className="w-7 h-7 rounded-full bg-[var(--bg-main)] shadow-md flex items-center justify-center z-10 relative border border-[var(--card-border)]"
        animate={{ x: isDarkMode ? 28 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <motion.div
          initial={false}
          animate={{ rotate: isDarkMode ? 0 : 180, scale: isDarkMode ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Moon className="w-4 h-4 text-[var(--accent-human)] fill-[var(--accent-human)]/10" aria-hidden="true" />
        </motion.div>
        
        <motion.div
          initial={false}
          animate={{ rotate: isDarkMode ? -180 : 0, scale: isDarkMode ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sun className="w-4 h-4 text-amber-500 fill-amber-500/10" aria-hidden="true" />
        </motion.div>
      </motion.div>
    </button>
  );
}
