import React from 'react';
import { motion } from 'motion/react';
import { Bot, Zap, Cpu, Shield, MessageSquare, Plus, ArrowRight, Search } from 'lucide-react';

const AGENTS = [
  {
    id: 'content-bot',
    name: 'Content-Bot',
    role: 'CMS Orchestrator',
    status: 'Active',
    capabilities: ['Asset Fetching', 'Draft Generation', 'Live Editing'],
    color: 'text-[var(--accent-ai)]',
    bg: 'bg-[var(--accent-ai)]/10',
    border: 'border-[var(--accent-ai)]/20'
  },
  {
    id: 'publisher-bot',
    name: 'Publisher-Bot',
    role: 'Network Distributor',
    status: 'Standby',
    capabilities: ['Scheduling', 'Multi-channel Publishing', 'Analytics'],
    color: 'text-[var(--accent-human)]',
    bg: 'bg-[var(--accent-human)]/10',
    border: 'border-[var(--accent-human)]/20'
  },
  {
    id: 'circle-bot',
    name: 'CircleBot',
    role: 'System Assistant',
    status: 'Active',
    capabilities: ['Onboarding', 'Command Help', 'System Monitoring'],
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    border: 'border-emerald-400/20'
  }
];

export default function IntelligenceHub() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 flex flex-col bg-[var(--bg-main)] overflow-y-auto"
    >
      <header className="h-20 flex items-center justify-between px-8 border-b border-[var(--card-border)] bg-[var(--bg-main)]/50 backdrop-blur-2xl sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-10 h-10 rounded-xl bg-[var(--accent-human)]/10 border border-[var(--accent-human)]/20 flex items-center justify-center agent-glow"
          >
            <Cpu className="w-5 h-5 text-[var(--accent-human)]" />
          </motion.div>
          <div>
            <h2 className="text-lg font-bold text-[var(--text-main)] tracking-tight leading-none">Intelligence Hub</h2>
            <p className="micro-label mt-1 text-[var(--text-secondary)]">Manage your agentic workforce</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" aria-hidden="true" />
            <input 
              type="text" 
              placeholder="Search agents..." 
              className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-full py-2 pl-11 pr-6 text-xs focus:outline-none focus:border-[var(--accent-human)]/30 transition-all w-48 placeholder:text-[var(--text-secondary)] text-[var(--text-main)] cf-focus min-h-[44px]"
              aria-label="Search agents"
            />
          </div>
          <button className="px-6 py-2 bg-[var(--text-main)] text-[var(--bg-main)] rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[var(--accent-ai)] transition-all cf-focus min-h-[44px]">
            Deploy New Agent
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto w-full p-12 space-y-16">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--accent-human)]/10 border border-[var(--accent-human)]/20 micro-label text-[var(--accent-human)]">
              Agentic Framework v2.4
            </span>
            <h1 className="text-6xl font-bold text-[var(--text-main)] tracking-tighter leading-[0.9]">
              Your Team, <br />
              <span className="italic font-serif text-[var(--accent-ai)]">Augmented.</span>
            </h1>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-md">
              Circleflake agents are more than bots. They are context-aware intelligence units that live within your communication stream.
            </p>
            <div className="flex items-center gap-8 pt-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-[var(--text-main)]">03</p>
                <p className="micro-label text-[var(--text-secondary)] mt-1">Active Units</p>
              </div>
              <div className="w-[1px] h-10 bg-[var(--card-border)]" />
              <div className="text-center">
                <p className="text-3xl font-bold text-[var(--text-main)]">142</p>
                <p className="micro-label text-[var(--text-secondary)] mt-1">Actions / Day</p>
              </div>
              <div className="w-[1px] h-10 bg-[var(--card-border)]" />
              <div className="text-center">
                <p className="text-3xl font-bold text-[var(--text-main)]">99.9%</p>
                <p className="micro-label text-[var(--text-secondary)] mt-1">Accuracy</p>
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-[var(--accent-human)]/10 blur-[100px] rounded-full animate-pulse-slow" />
            <div className="relative glass-card p-8 border-[var(--card-border)] shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--accent-ai)]/10 border border-[var(--accent-ai)]/20 flex items-center justify-center">
                    <Bot className="w-6 h-6 text-[var(--accent-ai)]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[var(--text-main)]">Content-Bot</p>
                    <p className="text-[10px] text-[var(--text-secondary)] uppercase tracking-widest">Processing Request...</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <div className="w-1 h-1 rounded-full bg-[var(--accent-ai)] animate-bounce" />
                  <div className="w-1 h-1 rounded-full bg-[var(--accent-ai)] animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1 h-1 rounded-full bg-[var(--accent-ai)] animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-[var(--card-bg)] rounded-xl border border-[var(--card-border)] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase">Input</span>
                    <span className="text-[10px] font-mono text-[var(--text-secondary)]">0.2ms</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] font-mono">/fetch_asset welcome-post</p>
                </div>
                <div className="p-4 bg-[var(--accent-ai)]/5 rounded-xl border border-[var(--accent-ai)]/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[var(--accent-ai)] uppercase">Output</span>
                    <span className="text-[10px] font-mono text-[var(--accent-ai)]/50">142ms</span>
                  </div>
                  <p className="text-xs text-[var(--text-main)] leading-relaxed">Asset "Welcome to Circleflake" retrieved and injected into #general thread.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Agents Grid */}
        <div className="space-y-8">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-bold text-[var(--text-main)] tracking-tight">Deployed Intelligence Units</h3>
            <button className="text-xs font-bold text-[var(--accent-human)] hover:text-[var(--text-main)] transition-colors flex items-center gap-2 group cf-focus min-h-[44px] px-2 rounded-xl">
              View All Registry
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {AGENTS.map(agent => (
              <div key={agent.id} className={`glass-card p-8 group hover:${agent.border} transition-all relative overflow-hidden border-[var(--card-border)]`}>
                <div className="relative z-10">
                  <div className={`w-14 h-14 ${agent.bg} rounded-2xl flex items-center justify-center mb-8 border ${agent.border} group-hover:scale-110 transition-transform duration-500`}>
                    <Bot className={`w-7 h-7 ${agent.color}`} />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xl font-bold text-[var(--text-main)] tracking-tight">{agent.name}</h4>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-widest ${agent.status === 'Active' ? 'bg-emerald-500/20 text-emerald-600' : 'bg-[var(--card-bg)] text-[var(--text-secondary)]'}`}>
                      {agent.status}
                    </span>
                  </div>
                  <p className="micro-label text-[var(--text-secondary)] mb-6">{agent.role}</p>
                  <div className="space-y-2">
                    {agent.capabilities.map(cap => (
                      <div key={cap} className="flex items-center gap-3 text-xs text-[var(--text-secondary)]">
                        <Zap className={`w-3 h-3 ${agent.color}`} aria-hidden="true" />
                        {cap}
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-8 py-3 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-[var(--bg-stream)] transition-all cf-focus min-h-[44px]">
                    Configure Logic
                  </button>
                </div>
                <div className={`absolute -right-10 -bottom-10 w-32 h-32 ${agent.bg} blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
