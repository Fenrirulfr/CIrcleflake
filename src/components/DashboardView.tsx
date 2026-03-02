import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Bell, Activity, Hash, FileText, Zap, TrendingUp, ChevronRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const agentPerformanceData = [
  { name: 'Content-Bot', completed: 120, color: 'var(--accent-ai)' },
  { name: 'Social-Scheduler', completed: 85, color: 'var(--accent-human)' },
  { name: 'Data-Analyst', completed: 45, color: '#10b981' },
  { name: 'Design-Bot', completed: 60, color: '#8b5cf6' },
];

const trendingChannels = [
  { name: 'marketing', activity: '+24%', users: 12 },
  { name: 'design', activity: '+18%', users: 8 },
  { name: 'engineering', activity: '+12%', users: 24 },
];

const recentDrafts = [
  { title: 'Q3 Campaign Strategy', agent: 'Content-Bot', time: '2h ago' },
  { title: 'Product Launch Guidelines', agent: 'Design-Bot', time: '5h ago' },
  { title: 'Weekly Analytics Report', agent: 'Data-Analyst', time: '1d ago' },
];

export default function DashboardView() {
  const [searchQuery, setSearchQuery] = useState('');
  const completionPercentage = 82;

  // SVG Circle calculations
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (completionPercentage / 100) * circumference;

  return (
    <div className="flex-1 flex flex-col h-full bg-[var(--bg-stream)] overflow-y-auto">
      {/* Header */}
      <header className="h-20 flex items-center justify-between px-8 border-b border-[var(--card-border)] bg-[var(--bg-main)]/80 backdrop-blur-md sticky top-0 z-10">
        <div className="relative w-96">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" aria-hidden="true" />
          <input 
            type="text" 
            placeholder="Search workspace..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[var(--card-bg)] border border-[var(--card-border)] rounded-full py-2.5 pl-11 pr-6 text-sm text-[var(--text-main)] focus:outline-none focus:border-[var(--accent-human)]/30 transition-all placeholder:text-[var(--text-secondary)] shadow-sm dark:shadow-none cf-focus min-h-[44px]"
            aria-label="Search workspace"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            className="relative p-2.5 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-full text-[var(--text-secondary)] hover:text-[var(--text-main)] transition-colors shadow-sm dark:shadow-none cf-focus min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" aria-hidden="true" />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-[var(--accent-ai)] rounded-full shadow-[var(--shadow-glow-cyan)] animate-pulse motion-reduce:animate-none" />
          </button>
          <div className="w-10 h-10 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] overflow-hidden shadow-sm dark:shadow-none cursor-pointer">
            <img src="https://picsum.photos/seed/user1/100/100" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      <div className="flex-1 p-8 max-w-7xl mx-auto w-full space-y-8">
        {/* Hero Section: Workspace Health */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-8 relative overflow-hidden group shadow-sm dark:shadow-[var(--shadow-glow-blue)]"
        >
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[var(--accent-ai)]/10 rounded-full blur-3xl group-hover:bg-[var(--accent-ai)]/20 transition-colors duration-700" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke="var(--card-border)"
                  strokeWidth="12"
                  fill="none"
                />
                <motion.circle
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke="var(--accent-ai)"
                  strokeWidth="12"
                  fill="none"
                  strokeLinecap="round"
                  style={{ strokeDasharray: circumference }}
                  className="drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-[var(--text-main)]">{completionPercentage}%</span>
                <span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Health</span>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-5 h-5 text-[var(--accent-ai)]" />
                <h3 className="text-2xl font-bold text-[var(--text-main)] tracking-tight">Workspace Health</h3>
              </div>
              <p className="text-[var(--text-secondary)] leading-relaxed max-w-xl mb-6">
                Your AI agents are operating at peak efficiency. Task completion rate is up 12% this week, with Content-Bot leading in automated resolutions.
              </p>
              <div className="flex gap-4">
                <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl px-4 py-3 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  <div>
                    <div className="text-sm font-bold text-[var(--text-main)]">All Systems Nominal</div>
                    <div className="text-xs text-[var(--text-secondary)]">Agent Status</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Trending Channels */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-panel p-6 shadow-sm dark:shadow-[var(--shadow-glow-blue)] flex flex-col"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[var(--accent-human)]" />
                Trending Channels
              </h3>
            </div>
            <div className="space-y-4 flex-1">
              {trendingChannels.map((channel, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-[var(--bg-stream)] transition-colors cursor-pointer border border-transparent hover:border-[var(--card-border)] group cf-focus min-h-[44px]" tabIndex={0} role="button" aria-label={`View channel ${channel.name}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center group-hover:border-[var(--accent-human)]/30 transition-colors">
                      <Hash className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-[var(--accent-human)] transition-colors" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[var(--text-main)]">{channel.name}</div>
                      <div className="text-xs text-[var(--text-secondary)]">{channel.users} active users</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg">{channel.activity}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent CMS Drafts */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-6 shadow-sm dark:shadow-[var(--shadow-glow-blue)] flex flex-col"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-500" />
                Recent CMS Drafts
              </h3>
            </div>
            <div className="space-y-4 flex-1">
              {recentDrafts.map((draft, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-[var(--bg-stream)] transition-colors cursor-pointer border border-transparent hover:border-[var(--card-border)] group cf-focus min-h-[44px]" tabIndex={0} role="button" aria-label={`View draft ${draft.title}`}>
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="text-sm font-bold text-[var(--text-main)] truncate group-hover:text-emerald-500 transition-colors">{draft.title}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Zap className="w-3 h-3 text-[var(--accent-ai)]" aria-hidden="true" />
                      <span className="text-xs text-[var(--text-secondary)] truncate">Edited by {draft.agent}</span>
                    </div>
                  </div>
                  <span className="text-xs text-[var(--text-secondary)] whitespace-nowrap">{draft.time}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* AI Agent Performance */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-panel p-6 shadow-sm dark:shadow-[var(--shadow-glow-blue)] flex flex-col"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
                <Zap className="w-5 h-5 text-[var(--accent-ai)]" aria-hidden="true" />
                Agent Performance
              </h3>
            </div>
            <div className="h-48 flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={agentPerformanceData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="var(--card-border)" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" stroke="var(--text-secondary)" fontSize={11} tickLine={false} axisLine={false} width={100} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)', borderRadius: '12px', color: 'var(--text-main)' }}
                    cursor={{ fill: 'var(--bg-stream)' }}
                  />
                  <Bar dataKey="completed" radius={[0, 4, 4, 0]} barSize={16}>
                    {agentPerformanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex items-center justify-center">
              <button className="text-xs font-bold text-[var(--accent-ai)] hover:text-[var(--accent-ai)]/80 transition-colors flex items-center gap-1 uppercase tracking-widest cf-focus min-h-[44px] px-4 rounded-xl">
                View All Metrics <ChevronRight className="w-3 h-3" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
