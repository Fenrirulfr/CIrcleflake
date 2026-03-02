import React, { useState, useEffect, useRef } from 'react';
import { Send, Zap, Paperclip, Smile } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface AgentInputProps {
  onSend: (message: string) => void;
  placeholder?: string;
}

const SUGGESTIONS = [
  "Do you want me to summarize this?",
  "Should I generate a CMS draft from this thread?",
  "Would you like to schedule this for distribution?",
  "I can analyze the sentiment of these messages."
];

export default function AgentInput({ onSend, placeholder = "Type a message..." }: AgentInputProps) {
  const [value, setValue] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value.length > 5) {
      // Mock logic to find a suggestion
      const match = SUGGESTIONS.find(s => s.toLowerCase().includes(value.toLowerCase().split(' ').pop() || ''));
      if (match && !value.includes(match)) {
        setSuggestion(match);
      } else {
        setSuggestion('');
      }
    } else {
      setSuggestion('');
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab' && suggestion) {
      e.preventDefault();
      setValue(value + (value.endsWith(' ') ? '' : ' ') + suggestion);
      setSuggestion('');
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (value.trim()) {
        onSend(value);
        setValue('');
        setSuggestion('');
      }
    }
  };

  return (
    <div className="relative flex items-center w-full bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl p-2 focus-within:border-[var(--accent-ai)]/50 focus-within:ring-1 focus-within:ring-[var(--accent-ai)]/50 transition-all shadow-sm">
      <div className="pl-2 pr-3 flex items-center gap-2">
        <Zap className="w-4 h-4 text-[var(--accent-ai)]" aria-hidden="true" />
        <button 
          className="p-1.5 hover:bg-[var(--bg-stream)] rounded-lg text-[var(--text-secondary)] transition-colors cf-focus min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Attach file"
        >
          <Paperclip className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
      <div className="relative flex-1 flex items-center h-10">
        {/* Ghost text */}
        {suggestion && (
          <div className="absolute inset-0 flex items-center pointer-events-none text-[var(--text-secondary)]/50 text-sm whitespace-pre">
            <span className="opacity-0">{value}</span>
            <span>{value.endsWith(' ') ? '' : ' '}{suggestion}</span>
          </div>
        )}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full h-full bg-transparent border-none focus:outline-none text-sm text-[var(--text-main)] z-10 cf-focus"
          aria-label="Message input"
        />
      </div>
      <div className="flex items-center gap-2 pr-2">
        <button 
          className="p-1.5 hover:bg-[var(--bg-stream)] rounded-lg text-[var(--text-secondary)] transition-colors cf-focus min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Add emoji"
        >
          <Smile className="w-4 h-4" aria-hidden="true" />
        </button>
        <button 
          onClick={() => {
            if (value.trim()) {
              onSend(value);
              setValue('');
              setSuggestion('');
            }
          }}
          className="p-2 bg-[var(--accent-human)] text-white rounded-lg hover:bg-[var(--accent-human)]/90 transition-colors luminous-button cf-focus min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Send message"
        >
          <Send className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
      
      {/* Accessibility: Live region for AI suggestions */}
      <div aria-live="polite" className="sr-only">
        {suggestion ? `AI Suggestion: ${suggestion}. Press Tab to accept.` : ''}
      </div>
    </div>
  );
}
