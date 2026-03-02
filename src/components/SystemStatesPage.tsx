import React from 'react';
import { motion } from 'motion/react';
import { Activity, Server, Database, Cpu, HardDrive, Shield, Zap, RefreshCw, AlertTriangle } from 'lucide-react';

const NODES = [
  { id: 'node-01', region: 'ASIA-SOUTH-1', status: 'Healthy', load: '42%', latency: '12ms' },
  { id: 'node-02', region: 'US-EAST-1', status: 'Healthy', load: '68%', latency: '24ms' },
  { id: 'node-03', region: 'EU-WEST-1', status: 'Healthy', load: '31%', latency: '18ms' },
  { id: 'node-04', region: 'US-WEST-2', status: 'Warning', load: '92%', latency: '84ms' }
];

const Globe = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

export default function SystemStatesPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 flex flex-col bg-deep-charcoal overflow-y-auto"
    >
      <header className="h-20 flex items-center justify-between px-8 border-b border-white/5 bg-deep-charcoal/50 backdrop-blur-2xl sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center agent-glow">
            <Activity className="w-5 h-5 text-emerald-500" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight leading-none">System States</h2>
            <p className="micro-label mt-1 text-slate-600">Infrastructure & Node Health</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-slate-500 hover:text-white transition-all">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto w-full p-12 space-y-12">
        {/* Real-time Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="glass-card p-8 border-emerald-500/20 bg-emerald-500/[0.02]">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <Server className="w-5 h-5 text-emerald-500" />
              </div>
              <h4 className="text-sm font-bold text-white tracking-tight">Active Nodes</h4>
            </div>
            <p className="text-4xl font-bold text-white mb-2">1,284</p>
            <p className="text-[10px] text-emerald-500 uppercase tracking-widest font-bold">All Systems Nominal</p>
          </div>
          <div className="glass-card p-8 border-cyan-glow/20 bg-cyan-glow/[0.02]">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-cyan-glow/10 flex items-center justify-center">
                <Cpu className="w-5 h-5 text-cyan-glow" />
              </div>
              <h4 className="text-sm font-bold text-white tracking-tight">Compute Load</h4>
            </div>
            <p className="text-4xl font-bold text-white mb-2">64.2%</p>
            <p className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">Optimized</p>
          </div>
          <div className="glass-card p-8 border-white/5">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                <Database className="w-5 h-5 text-slate-500" />
              </div>
              <h4 className="text-sm font-bold text-white tracking-tight">Storage Used</h4>
            </div>
            <p className="text-4xl font-bold text-white mb-2">8.4 TB</p>
            <p className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">82% Capacity</p>
          </div>
          <div className="glass-card p-8 border-white/5">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                <Shield className="w-5 h-5 text-slate-500" />
              </div>
              <h4 className="text-sm font-bold text-white tracking-tight">Security Node</h4>
            </div>
            <p className="text-4xl font-bold text-emerald-500 mb-2">Active</p>
            <p className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">Threat Level: Zero</p>
          </div>
        </div>

        {/* Node Health Table */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <span className="micro-label text-white">Regional Node Health</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">Live Telemetry</span>
            </div>
          </div>

          <div className="glass-card overflow-hidden border-white/5">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest">Node ID</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest">Region</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest">Load</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest">Latency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {NODES.map(node => (
                  <tr key={node.id} className="hover:bg-white/[0.01] transition-colors">
                    <td className="px-6 py-5">
                      <span className="text-sm font-bold text-white tracking-tight">{node.id}</span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <Globe className="w-3.5 h-3.5 text-slate-600" />
                        <span className="text-xs text-slate-400">{node.region}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        {node.status === 'Healthy' ? (
                          <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        ) : (
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                        )}
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${node.status === 'Healthy' ? 'text-emerald-500' : 'text-amber-500'}`}>
                          {node.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="w-32 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${parseInt(node.load) > 80 ? 'bg-amber-500' : 'bg-cyan-glow'}`} 
                          style={{ width: node.load }} 
                        />
                      </div>
                      <span className="text-[10px] text-slate-600 mt-1 block">{node.load}</span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-xs text-slate-500 font-mono">{node.latency}</span>
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
