import React from 'react';
import { motion } from 'motion/react';
import { Terminal, Play, CheckCircle2, XCircle, Clock, Search, Filter, MoreVertical, Cpu } from 'lucide-react';

const BUILDS = [
  {
    id: 'b-1042',
    project: 'Neon Nexus',
    version: 'v1.4.2-alpha',
    status: 'Success',
    duration: '2m 42s',
    timestamp: '15m ago',
    commit: 'a4f2e91',
    author: 'Alex Rivera'
  },
  {
    id: 'b-1041',
    project: 'Warpstrike: Zero',
    version: 'v0.8.9-beta',
    status: 'Failed',
    duration: '45s',
    timestamp: '1h ago',
    commit: '7d1c3b2',
    author: 'Alex Rivera'
  },
  {
    id: 'b-1040',
    project: 'Neon Nexus',
    version: 'v1.4.1-alpha',
    status: 'Success',
    duration: '3m 12s',
    timestamp: '3h ago',
    commit: 'c9b8a7f',
    author: 'System'
  }
];

export default function BuildsPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 flex flex-col bg-deep-charcoal overflow-y-auto"
    >
      <header className="h-20 flex items-center justify-between px-8 border-b border-white/5 bg-deep-charcoal/50 backdrop-blur-2xl sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-cyan-glow/10 border border-cyan-glow/20 flex items-center justify-center agent-glow">
            <Terminal className="w-5 h-5 text-cyan-glow" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight leading-none">Builds</h2>
            <p className="micro-label mt-1 text-slate-600">CI/CD Pipeline & Artifacts</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-6 py-2 bg-electric-indigo text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-2">
            <Play className="w-3.5 h-3.5" />
            Run Pipeline
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto w-full p-12 space-y-8">
        {/* Active Pipeline Status */}
        <div className="glass-card p-8 border-cyan-glow/20 bg-cyan-glow/[0.02] relative overflow-hidden">
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-cyan-glow/10 border border-cyan-glow/20 flex items-center justify-center">
                <Cpu className="w-8 h-8 text-cyan-glow animate-pulse" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">Active Pipeline: <span className="text-cyan-glow">Neon Nexus</span></h3>
                <p className="text-sm text-slate-500 mt-1">Building v1.4.3-alpha • Step 4/6: Asset Optimization</p>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-right">
                <p className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-1">Progress</p>
                <div className="w-48 h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '65%' }}
                    className="h-full bg-cyan-glow shadow-[0_0_10px_rgba(102,252,241,0.5)]"
                  />
                </div>
              </div>
              <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-slate-400 hover:text-white transition-all">
                Cancel
              </button>
            </div>
          </div>
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-cyan-glow/5 blur-[80px] rounded-full" />
        </div>

        {/* Build History */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-4">
              <span className="micro-label text-white">Build History</span>
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-slate-700" />
                <input type="text" placeholder="Filter builds..." className="bg-transparent border-none text-[10px] text-slate-500 focus:outline-none w-32" />
              </div>
            </div>
            <button className="flex items-center gap-2 text-[10px] font-bold text-slate-600 uppercase tracking-widest hover:text-white transition-colors">
              <Filter className="w-3.5 h-3.5" />
              Filter
            </button>
          </div>

          <div className="glass-card overflow-hidden border-white/5">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest">Build ID</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest">Project</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest">Duration</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest">Commit</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest">Time</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {BUILDS.map(build => (
                  <tr key={build.id} className="hover:bg-white/[0.01] transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-white tracking-tight">{build.id}</span>
                        <span className="text-[10px] text-slate-600 font-mono">{build.version}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm text-slate-400">{build.project}</span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        {build.status === 'Success' ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-500" />
                        )}
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${build.status === 'Success' ? 'text-emerald-500' : 'text-rose-500'}`}>
                          {build.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Clock className="w-3.5 h-3.5" />
                        {build.duration}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-[10px] font-mono text-slate-600 bg-white/5 px-2 py-1 rounded">{build.commit}</span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-xs text-slate-600">{build.timestamp}</span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="p-2 hover:bg-white/5 rounded-lg text-slate-700 hover:text-white transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
