import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare, FileText, Zap, Plus, ArrowRight, Activity, TrendingUp } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface WelcomeFeedProps {
  onNavigate: (view: string, id?: string) => void;
}

export default function WelcomeFeed({ onNavigate }: WelcomeFeedProps) {
  const recentActivity = [
    { id: '1', type: 'mention', title: 'Mentioned in #marketing', desc: 'Alex Rivera: Can you review the latest draft?', time: '10m ago', icon: MessageSquare, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { id: '2', type: 'cms', title: 'CMS Draft Updated', desc: 'Q3 Campaign Strategy was updated by Sarah.', time: '1h ago', icon: FileText, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { id: '3', type: 'mention', title: 'Mentioned in #design', desc: 'Design Bot: New assets are ready for review.', time: '2h ago', icon: MessageSquare, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { id: '4', type: 'cms', title: 'New Asset Published', desc: 'Product Launch Guidelines is now live.', time: '5h ago', icon: FileText, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-[var(--bg-stream)] overflow-y-auto">
      <header className="h-20 flex items-center px-4 md:px-8 border-b border-[var(--card-border)] bg-[var(--bg-main)]/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-2 md:gap-4">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center">
            <Activity className="w-4 h-4 md:w-5 md:h-5 text-[var(--accent-ai)]" />
          </div>
          <div>
            <h2 className="text-base md:text-lg font-bold text-[var(--text-main)] tracking-tight leading-none">Welcome Feed</h2>
            <p className="micro-label mt-1 text-[var(--text-secondary)] hidden sm:block">Your Workspace Overview</p>
          </div>
        </div>
      </header>

      <div className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Left Column: Recent Activity Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="text-lg md:text-xl font-bold text-[var(--text-main)] tracking-tight">Recent Activity</h3>
            <div className="flex gap-2 md:gap-3">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate('dashboard')}
                className="px-3 md:px-4 py-2 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl text-xs md:text-sm font-medium text-[var(--text-main)] hover:border-[var(--accent-human)]/30 transition-colors flex items-center gap-1 md:gap-2 shadow-sm cf-focus min-h-[44px] flex-1 sm:flex-none justify-center"
              >
                <MessageSquare className="w-4 h-4" aria-hidden="true" />
                <span className="hidden sm:inline">New Thread</span>
                <span className="sm:hidden">Thread</span>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate('cms')}
                className="px-3 md:px-4 py-2 bg-[var(--accent-human)] text-white rounded-xl text-xs md:text-sm font-medium hover:bg-[var(--accent-human)]/90 transition-colors flex items-center gap-1 md:gap-2 shadow-sm luminous-button cf-focus min-h-[44px] flex-1 sm:flex-none justify-center"
              >
                <Plus className="w-4 h-4" aria-hidden="true" />
                <span className="hidden sm:inline">New CMS Draft</span>
                <span className="sm:hidden">Draft</span>
              </motion.button>
            </div>
          </div>

          <div className="space-y-4">
            {recentActivity.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => onNavigate(item.type === 'cms' ? 'cms' : 'dashboard', item.id)}
                className="glass-panel p-5 cursor-pointer group flex items-start gap-4 cf-focus min-h-[44px]"
                tabIndex={0}
                role="button"
                aria-label={`View ${item.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onNavigate(item.type === 'cms' ? 'cms' : 'dashboard', item.id);
                  }
                }}
              >
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", item.bg)}>
                  <item.icon className={cn("w-5 h-5", item.color)} aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-bold text-[var(--text-main)] group-hover:text-[var(--accent-human)] transition-colors">{item.title}</h4>
                    <span className="text-xs text-[var(--text-secondary)]">{item.time}</span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] truncate">{item.desc}</p>
                </div>
                <div className="self-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-5 h-5 text-[var(--accent-human)]" aria-hidden="true" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: AI Insights Panel */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-[var(--text-main)] tracking-tight">AI Insights</h3>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel p-6 relative overflow-hidden group"
          >
            {/* Decorative background glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[var(--accent-ai)]/20 rounded-full blur-3xl group-hover:bg-[var(--accent-ai)]/30 transition-colors duration-700" />
            
            <div className="relative z-10 flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--accent-ai)] to-[var(--accent-human)] flex items-center justify-center agent-glow shadow-[var(--shadow-glow-cyan)]">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[var(--text-main)]">Weekly Summary</h4>
                  <p className="text-xs text-[var(--accent-ai)] font-medium tracking-wide uppercase mt-0.5">CircleBot Analysis</p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-[var(--text-main)] leading-relaxed">
                  Workspace productivity is up <span className="text-emerald-500 font-bold">18%</span> this week. The #marketing channel has been highly active, resolving 12 threads.
                </p>
                
                <div className="p-4 bg-[var(--card-bg)] rounded-xl border border-[var(--card-border)]">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-[var(--accent-ai)]" />
                    <span className="text-xs font-bold text-[var(--text-main)] uppercase tracking-wider">Optimization Tip</span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Consider creating a CMS template for "Campaign Strategy" to reduce setup time by an estimated 45 minutes per project.
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-2.5 bg-[var(--accent-ai)]/10 text-[var(--accent-ai)] hover:bg-[var(--accent-ai)]/20 border border-[var(--accent-ai)]/20 rounded-xl text-sm font-bold transition-colors cf-focus min-h-[44px]"
              >
                View Full Analytics
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
