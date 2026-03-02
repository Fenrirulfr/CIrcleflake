import React from 'react';
import { motion } from 'motion/react';
import { Package, Search, Plus, Filter, Download, Star, ExternalLink, MoreVertical, Zap, Globe, Shield } from 'lucide-react';

const MODS = [
  {
    id: 'm-001',
    name: 'Agentic Physics',
    description: 'Advanced physics engine extension for agent-driven environments.',
    author: 'Warpverse Core',
    downloads: '12.4k',
    rating: 4.9,
    category: 'Engine',
    status: 'Verified',
    icon: Zap,
    color: 'text-cyan-glow'
  },
  {
    id: 'm-002',
    name: 'Neural Textures',
    description: 'AI-generated high-fidelity textures for procedural worlds.',
    author: 'NeuralLabs',
    downloads: '8.2k',
    rating: 4.7,
    category: 'Assets',
    icon: Globe,
    color: 'text-electric-indigo'
  },
  {
    id: 'm-003',
    name: 'Sentinel Security',
    description: 'Enterprise-grade encryption for multiverse node communication.',
    author: 'SafeNet',
    downloads: '5.1k',
    rating: 5.0,
    category: 'Security',
    status: 'Verified',
    icon: Shield,
    color: 'text-emerald-500'
  }
];

export default function ModRegistryPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 flex flex-col bg-deep-charcoal overflow-y-auto"
    >
      <header className="h-20 flex items-center justify-between px-8 border-b border-white/5 bg-deep-charcoal/50 backdrop-blur-2xl sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-electric-indigo/10 border border-electric-indigo/20 flex items-center justify-center agent-glow">
            <Package className="w-5 h-5 text-electric-indigo" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight leading-none">Mod Registry</h2>
            <p className="micro-label mt-1 text-slate-600">Multiverse Extension Protocols</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
            <input 
              type="text" 
              placeholder="Search registry..." 
              className="bg-white/[0.03] border border-white/5 rounded-full py-2 pl-11 pr-6 text-xs focus:outline-none focus:border-white/10 transition-all w-64 placeholder:text-slate-700"
            />
          </div>
          <button className="px-6 py-2 bg-white text-deep-charcoal rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-cyan-glow transition-all flex items-center gap-2">
            <Plus className="w-3.5 h-3.5" />
            Publish Mod
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto w-full p-12 space-y-12">
        {/* Featured Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 glass-card p-12 bg-gradient-to-br from-electric-indigo/10 via-deep-charcoal to-deep-charcoal border-electric-indigo/20 relative overflow-hidden group">
            <div className="relative z-10 max-w-lg">
              <span className="inline-block px-3 py-1 bg-electric-indigo/20 border border-electric-indigo/30 rounded-full text-[9px] font-bold text-electric-indigo uppercase tracking-widest mb-6">
                Featured Extension
              </span>
              <h3 className="text-4xl font-bold text-white tracking-tighter mb-4 leading-tight">Warp_Engine <br /><span className="italic font-serif text-cyan-glow">Real-time Raytracing</span></h3>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                The definitive lighting solution for agentic multiverses. Fully compatible with Warp_Engine v4.2.
              </p>
              <div className="flex items-center gap-6">
                <button className="px-8 py-3 bg-white text-deep-charcoal rounded-full text-xs font-bold hover:bg-cyan-glow transition-all shadow-lg shadow-cyan-glow/10">
                  Install Now
                </button>
                <div className="flex items-center gap-2 text-slate-500">
                  <Download className="w-4 h-4" />
                  <span className="text-xs font-mono">24.1k installs</span>
                </div>
              </div>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[url('https://picsum.photos/seed/tech/800/600')] opacity-10 grayscale mix-blend-overlay group-hover:scale-110 transition-transform duration-1000" />
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-electric-indigo/10 blur-[80px] rounded-full" />
          </div>
          
          <div className="glass-card p-12 flex flex-col justify-between border-cyan-glow/20 bg-cyan-glow/[0.02]">
            <div>
              <h4 className="text-sm font-bold text-white tracking-tight mb-2">Registry Health</h4>
              <p className="text-xs text-slate-500 leading-relaxed">All extensions verified for Warp_Engine compatibility.</p>
            </div>
            <div className="py-8">
              <div className="flex items-end gap-1 h-24">
                {[30, 50, 40, 60, 45, 70, 55, 80, 65, 90].map((h, i) => (
                  <div key={i} className="flex-1 bg-cyan-glow/20 rounded-t-sm" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-center">
                <p className="text-xl font-bold text-white">1.2k</p>
                <p className="text-[9px] text-slate-600 uppercase tracking-widest">Mods</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-white">99.9%</p>
                <p className="text-[9px] text-slate-600 uppercase tracking-widest">Uptime</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-white">24h</p>
                <p className="text-[9px] text-slate-600 uppercase tracking-widest">Review</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mods Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-6">
              <button className="text-xs font-bold text-white border-b-2 border-electric-indigo pb-2">All Extensions</button>
              <button className="text-xs font-bold text-slate-600 hover:text-white transition-colors pb-2">Verified Only</button>
              <button className="text-xs font-bold text-slate-600 hover:text-white transition-colors pb-2">My Mods</button>
            </div>
            <button className="flex items-center gap-2 text-[10px] font-bold text-slate-600 uppercase tracking-widest hover:text-white transition-colors">
              <Filter className="w-3.5 h-3.5" />
              Sort By: Popular
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MODS.map(mod => (
              <motion.div 
                key={mod.id}
                whileHover={{ y: -5 }}
                className="glass-card p-8 group hover:border-white/10 transition-all flex flex-col justify-between min-h-[280px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 bg-white/[0.03] rounded-2xl flex items-center justify-center border border-white/5 group-hover:bg-white/10 transition-all`}>
                      <mod.icon className={`w-6 h-6 ${mod.color}`} />
                    </div>
                    {mod.status && (
                      <span className="text-[9px] font-bold px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded uppercase tracking-widest border border-emerald-500/20">
                        {mod.status}
                      </span>
                    )}
                  </div>
                  <h4 className="text-lg font-bold text-white tracking-tight mb-2 group-hover:text-cyan-glow transition-colors">{mod.name}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{mod.description}</p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-[10px] text-slate-600">
                      <Download className="w-3 h-3" />
                      {mod.downloads}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-slate-600">
                      <Star className="w-3 h-3 text-amber-500" />
                      {mod.rating}
                    </div>
                  </div>
                  <button className="p-2 bg-white/5 border border-white/10 rounded-lg text-slate-500 hover:text-white transition-all">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
