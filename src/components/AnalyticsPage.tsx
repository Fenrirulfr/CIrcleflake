import React from 'react';
import { motion } from 'motion/react';
import { BarChart3, TrendingUp, Users, Clock, Globe, ArrowUpRight, ArrowDownRight, Zap, PieChart } from 'lucide-react';

const STATS = [
  { label: 'Total Engagement', value: '1.2M', trend: '+12.4%', up: true },
  { label: 'Active Sessions', value: '42.1k', trend: '+5.2%', up: true },
  { label: 'Retention (D7)', value: '38.4%', trend: '-2.1%', up: false },
  { label: 'Avg. Latency', value: '24ms', trend: '-4ms', up: true }
];

export default function AnalyticsPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 flex flex-col bg-slate-50 dark:bg-deep-charcoal overflow-y-auto"
    >
      <header className="h-20 flex items-center justify-between px-8 border-b border-black/5 dark:border-white/5 bg-white/50 dark:bg-deep-charcoal/50 backdrop-blur-2xl sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-magenta-500/10 border border-magenta-500/20 flex items-center justify-center agent-glow">
            <BarChart3 className="w-5 h-5 text-magenta-500" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight leading-none">Analytics</h2>
            <p className="micro-label mt-1 text-slate-500 dark:text-slate-600">Engagement & Performance Insights</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-6 py-2 bg-black/5 dark:bg-white/[0.03] border border-black/5 dark:border-white/10 text-slate-600 dark:text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-black/10 dark:hover:bg-white/10 transition-all">
            Export Data
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto w-full p-12 space-y-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="glass-card p-8 border-black/5 dark:border-white/5 relative overflow-hidden group"
            >
              <p className="micro-label text-slate-500 dark:text-slate-600 mb-4">{stat.label}</p>
              <div className="flex items-end justify-between">
                <p className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">{stat.value}</p>
                <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${stat.up ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'}`}>
                  {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.trend}
                </div>
              </div>
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-black/[0.01] dark:bg-white/[0.01] rounded-full group-hover:scale-150 transition-transform duration-700" />
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 glass-card p-12 min-h-[400px] flex flex-col justify-between border-black/5 dark:border-white/5">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Engagement Over Time</h3>
                <p className="text-xs text-slate-500 dark:text-slate-600 mt-1">Real-time telemetry from all active nodes</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-600 dark:bg-cyan-glow" />
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Direct</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-electric-indigo" />
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Agentic</span>
                </div>
              </div>
            </div>
            
            {/* Mock Chart Visualization */}
            <div className="flex-1 flex items-end gap-2 mb-8">
              {[40, 60, 45, 80, 55, 90, 70, 85, 60, 75, 95, 65, 80, 100, 85].map((h, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: i * 0.05, duration: 0.8 }}
                  className="flex-1 bg-gradient-to-t from-electric-indigo/20 to-cyan-600/40 dark:to-cyan-glow/40 rounded-t-sm relative group"
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-deep-charcoal border border-white/10 px-2 py-1 rounded text-[8px] text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {h}k units
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="flex items-center justify-between pt-6 border-t border-black/5 dark:border-white/5">
              <span className="text-[10px] text-slate-500 dark:text-slate-700 font-mono">00:00</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-700 font-mono">06:00</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-700 font-mono">12:00</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-700 font-mono">18:00</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-700 font-mono">23:59</span>
            </div>
          </div>

          <div className="lg:col-span-4 glass-card p-12 flex flex-col justify-between border-black/5 dark:border-white/5">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Node Distribution</h3>
              <p className="text-xs text-slate-500 dark:text-slate-600 mt-1">Global traffic by region</p>
            </div>
            
            <div className="relative py-12 flex items-center justify-center">
              <div className="w-48 h-48 rounded-full border-8 border-black/5 dark:border-white/5 flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-full border-8 border-cyan-600 dark:border-cyan-glow border-t-transparent border-r-transparent rotate-45" />
                <div className="absolute inset-0 rounded-full border-8 border-electric-indigo border-b-transparent border-l-transparent -rotate-12" />
                <div className="text-center">
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">74%</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-600 uppercase tracking-widest">Efficiency</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-cyan-600 dark:bg-cyan-glow" />
                  <span className="text-xs text-slate-500 dark:text-slate-400">North America</span>
                </div>
                <span className="text-xs font-bold text-slate-900 dark:text-white">42%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-electric-indigo" />
                  <span className="text-xs text-slate-500 dark:text-slate-400">Europe</span>
                </div>
                <span className="text-xs font-bold text-slate-900 dark:text-white">28%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-magenta-500" />
                  <span className="text-xs text-slate-500 dark:text-slate-400">Asia Pacific</span>
                </div>
                <span className="text-xs font-bold text-slate-900 dark:text-white">18%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
