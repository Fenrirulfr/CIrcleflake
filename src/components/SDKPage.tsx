import React from 'react';
import { motion } from 'motion/react';
import { Code, Terminal, Copy, Download, ExternalLink, Shield, Zap, Book, Box, Layers } from 'lucide-react';

const Globe = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const SDKS = [
  {
    id: 'sdk-1',
    name: 'Warp_Engine Core SDK',
    version: 'v4.2.1',
    description: 'The foundational SDK for building multiversal experiences.',
    language: 'TypeScript / C++',
    status: 'Stable',
    icon: Box
  },
  {
    id: 'sdk-2',
    name: 'Agentic Intelligence Kit',
    version: 'v2.0.4',
    description: 'Tools for integrating agentic reasoning into your projects.',
    language: 'Python / TypeScript',
    status: 'Beta',
    icon: Zap
  },
  {
    id: 'sdk-3',
    name: 'Multiverse Networking',
    version: 'v1.1.0',
    description: 'High-performance networking layer for real-time collaboration.',
    language: 'Rust / C++',
    status: 'Stable',
    icon: Globe
  }
];

export default function SDKPage() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 flex flex-col bg-slate-50 dark:bg-deep-charcoal overflow-y-auto"
    >
      <header className="h-20 flex items-center justify-between px-8 border-b border-black/5 dark:border-white/5 bg-white/50 dark:bg-deep-charcoal/50 backdrop-blur-2xl sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-electric-indigo/10 border border-electric-indigo/20 flex items-center justify-center agent-glow">
            <Code className="w-5 h-5 text-electric-indigo" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight leading-none">SDK Management</h2>
            <p className="micro-label mt-1 text-slate-500 dark:text-slate-600">Developer Tools & Resources</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-6 py-2 bg-black/5 dark:bg-white/[0.03] border border-black/5 dark:border-white/10 text-slate-600 dark:text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-black/10 dark:hover:bg-white/10 transition-all flex items-center gap-2">
            <Book className="w-3.5 h-3.5" />
            Documentation
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto w-full p-12 space-y-12">
        {/* Quick Start */}
        <div className="glass-card p-12 border-electric-indigo/20 bg-electric-indigo/[0.02] relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">Quick Start</h3>
            <div className="space-y-6 max-w-2xl">
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Install the Warpdev CLI to manage your projects and deployments directly from your terminal.
              </p>
              <div className="bg-slate-100 dark:bg-black/40 rounded-xl p-4 border border-black/5 dark:border-white/5 flex items-center justify-between group">
                <code className="text-cyan-600 dark:text-cyan-glow font-mono text-xs">npm install -g @warpverse/cli</code>
                <button 
                  onClick={() => copyToClipboard('npm install -g @warpverse/cli')}
                  className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg text-slate-500 dark:text-slate-600 hover:text-slate-900 dark:hover:text-white transition-all"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-electric-indigo/5 blur-[80px] rounded-full" />
        </div>

        {/* SDK List */}
        <div className="space-y-6">
          <span className="micro-label text-slate-500 dark:text-white px-2">Available SDKs</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SDKS.map(sdk => (
              <motion.div 
                key={sdk.id}
                whileHover={{ scale: 1.01 }}
                className="glass-card p-8 group hover:border-black/10 dark:hover:border-white/10 transition-all border-black/5 dark:border-white/5"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-black/5 dark:bg-white/[0.03] rounded-2xl flex items-center justify-center border border-black/5 dark:border-white/5 group-hover:bg-electric-indigo/10 transition-all">
                      <sdk.icon className="w-6 h-6 text-electric-indigo" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">{sdk.name}</h4>
                      <span className="text-[10px] text-slate-500 dark:text-slate-600 font-mono">{sdk.version}</span>
                    </div>
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-widest ${sdk.status === 'Stable' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'}`}>
                    {sdk.status}
                  </span>
                </div>
                
                <p className="text-sm text-slate-600 dark:text-slate-500 leading-relaxed mb-8">{sdk.description}</p>
                
                <div className="flex items-center justify-between pt-6 border-t border-black/5 dark:border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-600">
                      <Terminal className="w-3 h-3" />
                      {sdk.language}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2.5 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2.5 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* API Keys Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <span className="micro-label text-slate-500 dark:text-white">Access Tokens</span>
            <button className="text-[10px] font-bold text-electric-indigo uppercase tracking-widest hover:text-cyan-600 dark:hover:text-cyan-glow transition-colors">
              Generate New Token
            </button>
          </div>
          <div className="glass-card p-8 space-y-6 border-black/5 dark:border-white/5">
            <div className="flex items-center justify-between py-4 border-b border-black/5 dark:border-white/5">
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">Production API Key</p>
                <p className="text-xs text-slate-500 mt-1">Used for live environment requests.</p>
              </div>
              <div className="flex items-center gap-4">
                <code className="text-[10px] font-mono text-slate-600 bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded">wp_live_************************</code>
                <button className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg text-slate-500 dark:text-slate-600 hover:text-slate-900 dark:hover:text-white transition-all">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between py-4">
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">Development Token</p>
                <p className="text-xs text-slate-500 mt-1">Used for local testing and CI/CD.</p>
              </div>
              <div className="flex items-center gap-4">
                <code className="text-[10px] font-mono text-slate-600 bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded">wp_test_************************</code>
                <button className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg text-slate-500 dark:text-slate-600 hover:text-slate-900 dark:hover:text-white transition-all">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
