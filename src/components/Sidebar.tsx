import React from 'react';
import { Channel } from '../types';
import { Hash, Plus, Globe, Lock, User, Zap, Moon, Sun, Activity, BarChart3, Search } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'motion/react';
import Logo from './Logo';

import ThemeToggle from './ThemeToggle';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarProps {
  channels: Channel[];
  activeChannel: string;
  onChannelSelect: (id: string) => void;
  isOpen: boolean;
  activeView: string;
  onViewChange: (view: 'landing' | 'welcome' | 'dashboard' | 'settings' | 'intelligence-hub' | 'cms' | 'automation' | 'analytics' | 'profile') => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export default function Sidebar({ channels, activeChannel, onChannelSelect, isOpen, activeView, onViewChange, isDarkMode, toggleTheme }: SidebarProps) {
  return (
    <div className={cn(
      "w-64 h-full glass-sidebar flex flex-col transition-all duration-300",
      !isOpen && "w-0 overflow-hidden border-none"
    )}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-10">
          <div 
            onClick={() => onViewChange('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <motion.div 
              whileHover={{ rotate: 12, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="group cursor-pointer transition-transform duration-500"
            >
              <Logo size={40} className="agent-glow" />
            </motion.div>
            <h1 className="text-xl font-bold text-[var(--text-main)] tracking-tighter">Circleflake</h1>
          </div>
          <div className="scale-75 origin-right">
            <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <div className="flex items-center justify-between mb-4 px-2">
              <span className="micro-label text-[var(--text-secondary)]">Workspace</span>
            </div>
            <div className="space-y-0.5">
              <motion.button
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onViewChange('welcome')}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative overflow-hidden min-h-[44px] cf-focus",
                  activeView === 'welcome' 
                    ? "bg-[var(--card-bg)] text-[var(--text-main)] shadow-sm ring-1 ring-[var(--sidebar-border)]" 
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-stream)] hover:text-[var(--text-main)]"
                )}
              >
                {activeView === 'welcome' && (
                  <motion.div 
                    layoutId="active-pill"
                    className="absolute left-0 w-1 h-6 bg-[var(--accent-human)] rounded-r-full"
                  />
                )}
                <Globe className={cn(
                  "w-4 h-4 transition-colors",
                  activeView === 'welcome' ? "text-[var(--accent-human)]" : "text-[var(--text-secondary)] group-hover:text-[var(--text-main)]"
                )} aria-hidden="true" />
                <span className="flex-1 text-left">Welcome Feed</span>
              </motion.button>
              <motion.button
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onViewChange('dashboard')}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative overflow-hidden min-h-[44px] cf-focus",
                  activeView === 'dashboard' 
                    ? "bg-[var(--card-bg)] text-[var(--text-main)] shadow-sm ring-1 ring-[var(--sidebar-border)]" 
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-stream)] hover:text-[var(--text-main)]"
                )}
              >
                {activeView === 'dashboard' && (
                  <motion.div 
                    layoutId="active-pill"
                    className="absolute left-0 w-1 h-6 bg-[var(--accent-human)] rounded-r-full"
                  />
                )}
                <Hash className={cn(
                  "w-4 h-4 transition-colors",
                  activeView === 'dashboard' ? "text-[var(--accent-human)]" : "text-[var(--text-secondary)] group-hover:text-[var(--text-main)]"
                )} aria-hidden="true" />
                <span className="flex-1 text-left">Chat</span>
              </motion.button>
              <motion.button
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onViewChange('intelligence-hub')}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative overflow-hidden min-h-[44px] cf-focus",
                  activeView === 'intelligence-hub' 
                    ? "bg-[var(--card-bg)] text-[var(--text-main)] shadow-sm ring-1 ring-[var(--sidebar-border)]" 
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-stream)] hover:text-[var(--text-main)]"
                )}
              >
                {activeView === 'intelligence-hub' && (
                  <motion.div 
                    layoutId="active-pill"
                    className="absolute left-0 w-1 h-6 bg-[var(--accent-ai)] rounded-r-full"
                  />
                )}
                <Zap className={cn(
                  "w-4 h-4 transition-colors",
                  activeView === 'intelligence-hub' ? "text-[var(--accent-ai)]" : "text-[var(--text-secondary)] group-hover:text-[var(--text-main)]"
                )} aria-hidden="true" />
                <span className="flex-1 text-left">Intelligence Hub</span>
              </motion.button>
              <motion.button
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onViewChange('cms')}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative overflow-hidden min-h-[44px] cf-focus",
                  activeView === 'cms' 
                    ? "bg-[var(--card-bg)] text-[var(--text-main)] shadow-sm ring-1 ring-[var(--sidebar-border)]" 
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-stream)] hover:text-[var(--text-main)]"
                )}
              >
                {activeView === 'cms' && (
                  <motion.div 
                    layoutId="active-pill"
                    className="absolute left-0 w-1 h-6 bg-emerald-500 rounded-r-full"
                  />
                )}
                <Globe className={cn(
                  "w-4 h-4 transition-colors",
                  activeView === 'cms' ? "text-emerald-500" : "text-[var(--text-secondary)] group-hover:text-[var(--text-main)]"
                )} aria-hidden="true" />
                <span className="flex-1 text-left">Living Library</span>
              </motion.button>
              <motion.button
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onViewChange('automation')}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative overflow-hidden min-h-[44px] cf-focus",
                  activeView === 'automation' 
                    ? "bg-[var(--card-bg)] text-[var(--text-main)] shadow-sm ring-1 ring-[var(--sidebar-border)]" 
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-stream)] hover:text-[var(--text-main)]"
                )}
              >
                {activeView === 'automation' && (
                  <motion.div 
                    layoutId="active-pill"
                    className="absolute left-0 w-1 h-6 bg-purple-500 rounded-r-full"
                  />
                )}
                <Activity className={cn(
                  "w-4 h-4 transition-colors",
                  activeView === 'automation' ? "text-purple-500" : "text-[var(--text-secondary)] group-hover:text-[var(--text-main)]"
                )} aria-hidden="true" />
                <span className="flex-1 text-left">Automation Canvas</span>
              </motion.button>
              <motion.button
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onViewChange('analytics')}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative overflow-hidden min-h-[44px] cf-focus",
                  activeView === 'analytics' 
                    ? "bg-[var(--card-bg)] text-[var(--text-main)] shadow-sm ring-1 ring-[var(--sidebar-border)]" 
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-stream)] hover:text-[var(--text-main)]"
                )}
              >
                {activeView === 'analytics' && (
                  <motion.div 
                    layoutId="active-pill"
                    className="absolute left-0 w-1 h-6 bg-amber-500 rounded-r-full"
                  />
                )}
                <BarChart3 className={cn(
                  "w-4 h-4 transition-colors",
                  activeView === 'analytics' ? "text-amber-500" : "text-[var(--text-secondary)] group-hover:text-[var(--text-main)]"
                )} aria-hidden="true" />
                <span className="flex-1 text-left">Dashboard</span>
              </motion.button>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4 px-2">
              <span className="micro-label text-[var(--text-secondary)]">Channels</span>
              <div className="flex items-center gap-2">
                <button className="w-5 h-5 flex items-center justify-center bg-[var(--card-bg)] border border-[var(--card-border)] rounded-md text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-[var(--bg-stream)] transition-all" title="Search AI">
                  <Search className="w-3 h-3" />
                </button>
                <button className="w-5 h-5 flex items-center justify-center bg-[var(--card-bg)] border border-[var(--card-border)] rounded-md text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-[var(--bg-stream)] transition-all">
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
            <div className="space-y-0.5">
              {channels.map(channel => (
                <button
                  key={channel.id}
                  onClick={() => onChannelSelect(channel.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group min-h-[44px] cf-focus",
                    activeChannel === channel.id && activeView === 'dashboard'
                      ? "bg-[var(--card-bg)] text-[var(--text-main)] shadow-sm ring-1 ring-[var(--sidebar-border)]" 
                      : "text-[var(--text-secondary)] hover:bg-[var(--bg-stream)] hover:text-[var(--text-main)]"
                  )}
                >
                  <Hash className={cn(
                    "w-4 h-4 transition-colors",
                    activeChannel === channel.id && activeView === 'dashboard' ? "text-[var(--accent-human)]" : "text-[var(--text-secondary)] group-hover:text-[var(--text-main)]"
                  )} aria-hidden="true" />
                  <span className="flex-1 text-left">{channel.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto p-6 border-t border-[var(--card-border)] bg-[var(--bg-stream)]">
        <button 
          onClick={() => onViewChange('profile')}
          className={cn(
            "w-full flex items-center gap-4 p-2 rounded-2xl hover:bg-[var(--card-bg)] transition-all group text-left min-h-[44px] cf-focus",
            activeView === 'profile' && "bg-[var(--card-bg)]"
          )}
        >
          <div className="relative">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[var(--accent-human)]/50 to-[var(--accent-ai)]/50 p-[1px] group-hover:rotate-6 transition-transform duration-500">
              <div className="w-full h-full rounded-2xl bg-[var(--bg-main)] flex items-center justify-center overflow-hidden">
                <img src="https://picsum.photos/seed/alex/100/100" alt="Alex" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-[var(--bg-main)] rounded-full" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-[var(--text-main)] leading-none tracking-tight">Alex Rivera</p>
            <p className="micro-label mt-1.5 text-[var(--text-secondary)]">Lead Architect</p>
          </div>
        </button>
      </div>
    </div>
  );
}
