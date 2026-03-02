import React from 'react';
import { motion } from 'motion/react';
import { Bot, FileText, Send, Zap, HelpCircle, Search } from 'lucide-react';

interface CommandBarProps {
  onSelect: (command: string) => void;
  onClose: () => void;
  filter?: string;
}

const COMMANDS = [
  {
    id: 'cms',
    name: 'List Assets',
    description: 'View all living library content',
    icon: FileText,
    agent: 'Content-Bot'
  },
  {
    id: 'fetch_asset',
    name: 'Fetch Asset',
    description: 'Pull a CMS draft into this thread',
    icon: Search,
    agent: 'Content-Bot'
  },
  {
    id: 'publish',
    name: 'Publish',
    description: 'Schedule or publish a CMS asset',
    icon: Send,
    agent: 'Publisher-Bot'
  },
  {
    id: 'help',
    name: 'Help',
    description: 'Get assistance from CircleBot',
    icon: HelpCircle,
    agent: 'CircleBot'
  }
];

export default function CommandBar({ onSelect, onClose, filter = '' }: CommandBarProps) {
  const filteredCommands = COMMANDS.filter(cmd => 
    `/${cmd.id}`.toLowerCase().startsWith(filter.toLowerCase()) || 
    cmd.name.toLowerCase().includes(filter.replace('/', '').toLowerCase())
  );

  if (filteredCommands.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      className="absolute bottom-full left-0 w-full mb-4 glass-card overflow-hidden z-50 shadow-2xl"
    >
      <div className="p-4 border-b border-[var(--card-border)] bg-[var(--bg-stream)] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Zap className="w-4 h-4 text-[var(--accent-ai)] animate-pulse" />
          <span className="micro-label text-[var(--text-main)]">Agent Command Interface</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9px] text-[var(--text-secondary)] font-mono">SYS_READY</span>
          <div className="w-1 h-1 rounded-full bg-emerald-500" />
        </div>
      </div>
      <div className="max-h-80 overflow-y-auto p-2 space-y-1">
        {filteredCommands.map((cmd) => (
          <button
            key={cmd.id}
            onClick={() => onSelect(`/${cmd.id}`)}
            className="w-full flex items-center gap-4 p-3.5 rounded-xl hover:bg-[var(--bg-stream)] transition-all group text-left relative overflow-hidden"
          >
            <div className="w-11 h-11 rounded-xl bg-[var(--card-bg)] flex items-center justify-center group-hover:bg-[var(--accent-human)]/10 transition-all duration-500 border border-[var(--card-border)] group-hover:border-[var(--accent-human)]/30">
              <cmd.icon className="w-5 h-5 text-[var(--text-secondary)] group-hover:text-[var(--accent-human)] transition-colors" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-sm font-bold text-[var(--text-main)] tracking-tight group-hover:text-[var(--accent-ai)] transition-colors">{cmd.name}</span>
                <span className="text-[9px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">via {cmd.agent}</span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] truncate group-hover:text-[var(--text-main)] transition-colors">{cmd.description}</p>
            </div>
            <div className="font-mono text-[10px] text-[var(--text-secondary)] group-hover:text-[var(--accent-human)] transition-colors bg-[var(--card-bg)] px-2 py-1 rounded-md border border-[var(--card-border)]">
              /{cmd.id}
            </div>
            {/* Hover Indicator */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--accent-human)] scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
          </button>
        ))}
      </div>
    </motion.div>
  );
}
