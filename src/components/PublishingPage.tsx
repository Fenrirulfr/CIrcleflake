import React from 'react';
import { motion } from 'motion/react';
import { Globe, Rocket, CheckCircle2, AlertCircle, Clock, ExternalLink, Shield, Zap, MoreVertical } from 'lucide-react';

const DEPLOYMENTS = [
  {
    id: 'd-992',
    project: 'Neon Nexus',
    environment: 'Production',
    version: 'v1.4.2',
    status: 'Live',
    url: 'https://neon-nexus.warpverse.run',
    timestamp: '2h ago'
  },
  {
    id: 'd-991',
    project: 'Warpstrike: Zero',
    environment: 'Staging',
    version: 'v0.8.9-beta',
    status: 'Ready',
    url: 'https://staging.warpstrike.run',
    timestamp: '5h ago'
  },
  {
    id: 'd-990',
    project: 'Neon Nexus',
    environment: 'Development',
    version: 'v1.4.3-alpha',
    status: 'Deploying',
    url: 'https://dev.neon-nexus.run',
    timestamp: 'Just now'
  }
];

export default function PublishingPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 flex flex-col bg-deep-charcoal overflow-y-auto"
    >
      <header className="h-20 flex items-center justify-between px-8 border-b border-white/5 bg-deep-charcoal/50 backdrop-blur-2xl sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center agent-glow">
            <Rocket className="w-5 h-5 text-emerald-500" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight leading-none">Publishing</h2>
            <p className="micro-label mt-1 text-slate-600">Release Management & Deployment</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-6 py-2 bg-emerald-500 text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-2">
            <Globe className="w-3.5 h-3.5" />
            New Release
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto w-full p-12 space-y-12">
        {/* Release Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-8 border-emerald-500/20 bg-emerald-500/[0.02]">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              </div>
              <h4 className="text-sm font-bold text-white tracking-tight">Active Releases</h4>
            </div>
            <p className="text-4xl font-bold text-white mb-2">12</p>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Across 4 Projects</p>
          </div>
          <div className="glass-card p-8 border-cyan-glow/20 bg-cyan-glow/[0.02]">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-cyan-glow/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-cyan-glow" />
              </div>
              <h4 className="text-sm font-bold text-white tracking-tight">Pending Approval</h4>
            </div>
            <p className="text-4xl font-bold text-white mb-2">03</p>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Awaiting Review</p>
          </div>
          <div className="glass-card p-8 border-white/5">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                <Shield className="w-5 h-5 text-slate-500" />
              </div>
              <h4 className="text-sm font-bold text-white tracking-tight">Security Status</h4>
            </div>
            <p className="text-4xl font-bold text-emerald-500 mb-2">Verified</p>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">All nodes secure</p>
          </div>
        </div>

        {/* Deployments List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <span className="micro-label text-white">Recent Deployments</span>
            <div className="flex items-center gap-4">
              <span className="text-[10px] text-slate-600 font-mono">NODE_CLUSTER: ASIA-SOUTH-1</span>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </div>

          <div className="space-y-4">
            {DEPLOYMENTS.map(deploy => (
              <motion.div 
                key={deploy.id}
                whileHover={{ x: 4 }}
                className="glass-card p-6 flex items-center justify-between group hover:border-white/10 transition-all"
              >
                <div className="flex items-center gap-8">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white tracking-tight">{deploy.project}</span>
                    <span className="text-[10px] text-slate-600 font-mono uppercase tracking-widest">{deploy.environment}</span>
                  </div>
                  <div className="w-[1px] h-8 bg-white/5" />
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400">{deploy.version}</span>
                    <span className="text-[10px] text-slate-600">{deploy.id}</span>
                  </div>
                  <div className="w-[1px] h-8 bg-white/5" />
                  <div className="flex items-center gap-2">
                    {deploy.status === 'Live' ? (
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    ) : deploy.status === 'Deploying' ? (
                      <div className="w-2 h-2 rounded-full bg-cyan-glow animate-ping" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-slate-700" />
                    )}
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${deploy.status === 'Live' ? 'text-emerald-500' : deploy.status === 'Deploying' ? 'text-cyan-glow' : 'text-slate-600'}`}>
                      {deploy.status}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right hidden md:block">
                    <p className="text-xs text-slate-500">{deploy.url}</p>
                    <p className="text-[10px] text-slate-700 mt-1">{deploy.timestamp}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-slate-500 hover:text-white transition-all">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    <button className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-slate-500 hover:text-white transition-all">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
