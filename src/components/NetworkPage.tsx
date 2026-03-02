import React from 'react';
import { motion } from 'motion/react';
import { Globe, Zap, Activity, ArrowLeft, Server, Cpu } from 'lucide-react';

interface NetworkPageProps {
  onBack: () => void;
}

export default function NetworkPage({ onBack }: NetworkPageProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex-1 flex flex-col bg-slate-50 dark:bg-deep-charcoal overflow-y-auto min-h-screen"
    >
      <header className="h-20 flex items-center justify-between px-8 border-b border-black/5 dark:border-white/5 bg-white/50 dark:bg-deep-charcoal/50 backdrop-blur-2xl sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <motion.button 
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="p-2.5 bg-black/5 dark:bg-white/[0.03] border border-black/5 dark:border-white/5 rounded-xl transition-all text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight leading-none">Global Network</h2>
            <p className="micro-label mt-1 text-slate-500 dark:text-slate-600">The backbone of Circleflake</p>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto w-full p-12 space-y-24">
        <section className="text-center space-y-8">
          <div className="w-20 h-20 bg-cyan-600/10 dark:bg-cyan-glow/10 rounded-[2.5rem] flex items-center justify-center mx-auto border border-cyan-600/20 dark:border-cyan-glow/20 agent-glow">
            <Globe className="w-10 h-10 text-cyan-600 dark:text-cyan-glow" />
          </div>
          <h1 className="text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">A Distributed <br/><span className="text-cyan-600 dark:text-cyan-glow">Intelligence Grid</span></h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Our network spans 42 regions globally, ensuring that your agents are always close to your users and your data.
          </p>
        </section>

        <div className="relative h-96 glass-card border-black/5 dark:border-white/5 overflow-hidden">
          {/* Mock Map Visualization */}
          <div className="absolute inset-0 opacity-20" 
               style={{ backgroundImage: 'radial-gradient(circle, #06b6d4 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full">
              {[
                { t: '20%', l: '30%' }, { t: '40%', l: '70%' }, { t: '60%', l: '20%' },
                { t: '10%', l: '80%' }, { t: '80%', l: '50%' }, { t: '30%', l: '10%' }
              ].map((pos, i) => (
                <motion.div 
                  key={i}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                  className="absolute w-3 h-3 bg-cyan-600 dark:bg-cyan-glow rounded-full shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                  style={{ top: pos.t, left: pos.l }}
                />
              ))}
              <svg className="absolute inset-0 w-full h-full opacity-10">
                <line x1="30%" y1="20%" x2="70%" y2="40%" stroke="#06b6d4" strokeWidth="1" />
                <line x1="70%" y1="40%" x2="50%" y2="80%" stroke="#06b6d4" strokeWidth="1" />
                <line x1="50%" y1="80%" x2="20%" y2="60%" stroke="#06b6d4" strokeWidth="1" />
                <line x1="20%" y1="60%" x2="30%" y2="20%" stroke="#06b6d4" strokeWidth="1" />
              </svg>
            </div>
          </div>
          <div className="absolute bottom-6 left-6 px-4 py-2 bg-white/60 dark:bg-black/60 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-lg">
            <span className="text-[10px] font-mono text-cyan-700 dark:text-cyan-glow uppercase tracking-widest font-bold">Live Network Status: Nominal</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Server, title: "Edge Nodes", val: "1,284", desc: "Distributed compute points." },
            { icon: Zap, title: "Avg Latency", val: "14ms", desc: "Global round-trip time." },
            { icon: Activity, title: "Uptime", val: "99.99%", desc: "Guaranteed availability." }
          ].map((stat, i) => (
            <div key={i} className="glass-card p-8 text-center space-y-4 border-black/5 dark:border-white/5">
              <div className="w-12 h-12 bg-black/5 dark:bg-white/[0.03] rounded-2xl flex items-center justify-center border border-black/5 dark:border-white/5 mx-auto">
                <stat.icon className="w-6 h-6 text-cyan-600 dark:text-cyan-glow" />
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{stat.val}</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-600 uppercase tracking-widest font-bold mt-1">{stat.title}</p>
              </div>
              <p className="text-xs text-slate-500">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
