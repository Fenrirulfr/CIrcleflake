import React, { useState, useRef, useEffect } from 'react';
import { Message, CMSAsset } from '../types';
import MessageItem from './MessageItem';
import CommandBar from './CommandBar';
import AgentInput from './AgentInput';
import { Send, Zap, Paperclip, Smile } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatStreamProps {
  messages: Message[];
  onSendMessage: (content: string, threadId?: string, metadata?: any) => void;
  onAssetSelect: (asset: CMSAsset) => void;
  isAgentThinking?: boolean;
}

export default function ChatStream({ messages, onSendMessage, onAssetSelect, isAgentThinking }: ChatStreamProps) {
  const [inputValue, setInputValue] = useState('');
  const [showCommands, setShowCommands] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    onSendMessage(inputValue);
    setInputValue('');
    setShowCommands(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
    if (e.key === 'Escape') {
      setShowCommands(false);
    }
  };

  useEffect(() => {
    if (inputValue.startsWith('/')) {
      setShowCommands(true);
    } else {
      setShowCommands(false);
    }
  }, [inputValue]);

  const handleCommandSelect = (command: string) => {
    setInputValue(command + ' ');
    setShowCommands(false);
  };

  // Group messages by thread
  const mainMessages = messages.filter(m => !m.threadId);
  const threads = messages.reduce((acc, m) => {
    if (m.threadId) {
      if (!acc[m.threadId]) acc[m.threadId] = [];
      acc[m.threadId].push(m);
    }
    return acc;
  }, {} as Record<string, Message[]>);

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[var(--bg-stream)] transition-colors duration-300">
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth relative"
      >
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={() => onSendMessage('/summarize')}
            className="px-3 py-1.5 bg-[var(--card-bg)] border border-[var(--accent-ai)]/30 rounded-lg text-xs font-bold text-[var(--accent-ai)] hover:bg-[var(--accent-ai)]/10 transition-colors flex items-center gap-2 shadow-sm"
          >
            <Zap className="w-3 h-3" />
            Thread Summary
          </button>
        </div>
        {mainMessages.map(message => (
          <div key={message.id} className="space-y-2">
            <MessageItem 
              message={message} 
              onAssetSelect={onAssetSelect}
            />
            {threads[message.id] && (
              <div className="ml-12 pl-6 border-l-2 border-[var(--card-border)] space-y-4 py-2">
                {threads[message.id].map(reply => (
                  <MessageItem 
                    key={reply.id} 
                    message={reply} 
                    isReply
                    onAssetSelect={onAssetSelect}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
        
        {isAgentThinking && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 p-4 bg-[var(--accent-ai)]/5 rounded-2xl border border-[var(--accent-ai)]/10 w-fit"
            role="status"
            aria-live="polite"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent-ai)] to-[var(--accent-human)] flex items-center justify-center agent-glow">
              <Zap className="w-5 h-5 text-white animate-pulse motion-reduce:animate-none" aria-hidden="true" />
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-[var(--accent-ai)] uppercase tracking-widest">
                <span className="motion-reduce:hidden">Agent Thinking</span>
                <span className="hidden motion-reduce:inline">Agent Processing</span>
              </p>
              <div className="flex gap-1 motion-reduce:hidden" aria-hidden="true">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-ai)] animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-ai)] animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-ai)] animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="p-8 pt-0">
        <div className="relative">
          <AnimatePresence>
            {showCommands && (
              <CommandBar 
                onSelect={handleCommandSelect} 
                onClose={() => setShowCommands(false)} 
                filter={inputValue}
              />
            )}
          </AnimatePresence>
          <AgentInput onSend={onSendMessage} placeholder="Type / for commands or message..." />
        </div>
        <div className="flex items-center justify-center gap-4 mt-4">
          <span className="micro-label text-[var(--text-secondary)]">Thread-First Architecture</span>
          <div className="w-1 h-1 rounded-full bg-[var(--card-border)]" />
          <span className="micro-label text-[var(--text-secondary)]">Agentic Stream</span>
        </div>
      </div>
    </div>
  );
}
