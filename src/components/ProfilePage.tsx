import React from 'react';
import { motion } from 'motion/react';
import { User, Mail, MapPin, Calendar, Edit3, Share2, MessageSquare, FileText, Zap, ArrowLeft } from 'lucide-react';

interface ProfilePageProps {
  onBack: () => void;
}

export default function ProfilePage({ onBack }: ProfilePageProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex-1 flex flex-col bg-[var(--bg-main)] overflow-y-auto"
    >
      {/* Cover Image */}
      <div className="h-64 bg-gradient-to-r from-[var(--accent-human)]/20 via-[var(--accent-ai)]/10 to-[var(--bg-main)] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/abstract/1920/400')] opacity-20 mix-blend-overlay grayscale" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--bg-main)]" />
        
        <button 
          onClick={onBack}
          className="absolute top-8 left-8 p-2.5 bg-[var(--card-bg)]/50 backdrop-blur-xl border border-[var(--card-border)] rounded-xl text-[var(--text-main)] hover:bg-[var(--card-bg)] transition-all z-20"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      <div className="max-w-5xl mx-auto w-full px-8 -mt-24 relative z-10 pb-24">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Left Column: Profile Card */}
          <div className="w-full md:w-80 space-y-8">
            <div className="glass-card p-8 border-[var(--card-border)] shadow-2xl">
              <div className="relative mb-8">
                <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-4 border-[var(--bg-main)] shadow-2xl mx-auto">
                  <img src="https://picsum.photos/seed/alex/200/200" alt="Alex" className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-0 right-1/2 translate-x-16 w-10 h-10 bg-[var(--accent-human)] border-4 border-[var(--bg-main)] rounded-full flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
              </div>
              
              <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold text-[var(--text-main)] tracking-tight">Alex Rivera</h1>
                <p className="micro-label text-[var(--accent-human)]">Lead Architect</p>
                <p className="text-sm text-[var(--text-secondary)] mt-4 leading-relaxed">
                  Building the future of unified intelligence at Circleflake.
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-[var(--card-border)] space-y-4">
                <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)]">
                  <Mail className="w-4 h-4 text-[var(--text-secondary)]" />
                  alex.rivera@circleflake.ai
                </div>
                <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)]">
                  <MapPin className="w-4 h-4 text-[var(--text-secondary)]" />
                  San Francisco, CA
                </div>
                <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)]">
                  <Calendar className="w-4 h-4 text-[var(--text-secondary)]" />
                  Joined Jan 2026
                </div>
              </div>

              <div className="mt-8 flex gap-2">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-2.5 bg-[var(--text-main)] text-[var(--bg-main)] rounded-xl text-xs font-bold hover:bg-[var(--accent-ai)] transition-all"
                >
                  Edit Profile
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2.5 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-main)] transition-all"
                >
                  <Share2 className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            <div className="glass-card p-6 border-[var(--card-border)]">
              <h4 className="micro-label text-[var(--text-main)] mb-4">Intelligence Stats</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[var(--text-secondary)]">Assets Created</span>
                  <span className="text-xs font-bold text-[var(--text-main)]">42</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[var(--text-secondary)]">Agent Commands</span>
                  <span className="text-xs font-bold text-[var(--text-main)]">1,284</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[var(--text-secondary)]">Network Reach</span>
                  <span className="text-xs font-bold text-[var(--accent-ai)]">Top 5%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Activity/Content */}
          <div className="flex-1 space-y-12">
            <div className="flex items-center gap-8 border-b border-[var(--card-border)] pb-4">
              <button className="text-sm font-bold text-[var(--text-main)] border-b-2 border-[var(--accent-human)] pb-4 -mb-[18px]">Recent Activity</button>
              <button className="text-sm font-bold text-[var(--text-secondary)] hover:text-[var(--text-main)] transition-colors pb-4">Contributions</button>
              <button className="text-sm font-bold text-[var(--text-secondary)] hover:text-[var(--text-main)] transition-colors pb-4">Network</button>
            </div>

            <div className="space-y-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="glass-card p-6 group hover:border-[var(--card-border)] transition-all flex gap-6 border-[var(--card-border)]">
                  <div className="w-12 h-12 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--accent-human)]/10 transition-colors">
                    {i % 2 === 0 ? <MessageSquare className="w-6 h-6 text-[var(--accent-human)]" /> : <FileText className="w-6 h-6 text-[var(--accent-ai)]" />}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-[var(--text-main)]">
                        {i % 2 === 0 ? 'Responded to #general thread' : 'Updated "Q1 Marketing Strategy"'}
                      </p>
                      <span className="text-[10px] text-[var(--text-secondary)] font-mono">2h ago</span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                      {i % 2 === 0 
                        ? 'Orchestrated the agentic workflow for the upcoming product launch. Verified all MCP protocols are active.'
                        : 'Refined the content structure and added new intelligence nodes for the global distribution plan.'}
                    </p>
                    <div className="flex items-center gap-4 pt-2">
                      <div className="flex items-center gap-1.5 text-[10px] text-[var(--text-secondary)]">
                        <Zap className="w-3 h-3 text-[var(--accent-ai)]" />
                        Agent-Aware
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-[var(--text-secondary)]">
                        <Edit3 className="w-3 h-3" />
                        Modified
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <button className="w-full py-4 border border-dashed border-[var(--card-border)] rounded-2xl text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:border-[var(--card-border)] transition-all">
                Load More Activity
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
