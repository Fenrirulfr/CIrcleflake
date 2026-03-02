import React from 'react';
import { motion } from 'motion/react';
import { Box, Play, Pause, RotateCcw, Save, Share2, Layers, MousePointer2, Move, Maximize2, Cpu, Zap } from 'lucide-react';

export default function SandboxPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex flex-col bg-deep-charcoal overflow-hidden"
    >
      {/* Sandbox Toolbar */}
      <header className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-deep-charcoal/80 backdrop-blur-xl z-20">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-electric-indigo/20 border border-electric-indigo/30 flex items-center justify-center">
              <Box className="w-4 h-4 text-electric-indigo" />
            </div>
            <span className="text-sm font-bold text-white tracking-tight">Warp_Engine Sandbox</span>
          </div>
          <div className="h-6 w-[1px] bg-white/10" />
          <div className="flex items-center gap-1">
            <button className="p-2 hover:bg-white/5 rounded-lg text-slate-500 hover:text-white transition-all">
              <MousePointer2 className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-white/5 rounded-lg text-slate-500 hover:text-white transition-all">
              <Move className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-white/5 rounded-lg text-slate-500 hover:text-white transition-all">
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-black/40 rounded-lg p-1 border border-white/5 mr-4">
            <button className="p-2 bg-emerald-500/10 text-emerald-500 rounded-md hover:bg-emerald-500/20 transition-all">
              <Play className="w-4 h-4" />
            </button>
            <button className="p-2 text-slate-600 hover:text-white transition-all">
              <Pause className="w-4 h-4" />
            </button>
          </div>
          <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-slate-300 hover:text-white transition-all flex items-center gap-2">
            <Save className="w-3.5 h-3.5" />
            Save
          </button>
          <button className="px-4 py-2 bg-electric-indigo text-white rounded-lg text-xs font-bold luminous-button flex items-center gap-2">
            <Share2 className="w-3.5 h-3.5" />
            Deploy
          </button>
        </div>
      </header>

      <div className="flex-1 flex relative overflow-hidden">
        {/* Scene Tree / Hierarchy */}
        <aside className="w-64 border-r border-white/5 bg-deep-charcoal/50 flex flex-col z-10">
          <div className="p-4 border-b border-white/5 flex items-center justify-between">
            <span className="micro-label text-white">Hierarchy</span>
            <Layers className="w-3 h-3 text-slate-600" />
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {['World_Root', 'Main_Camera', 'Directional_Light', 'Agent_Player', 'Environment_Mesh', 'Physics_Volume'].map((item, i) => (
              <div key={i} className={`px-3 py-2 rounded-lg text-xs flex items-center gap-3 cursor-pointer transition-all ${i === 3 ? 'bg-electric-indigo/10 text-electric-indigo border border-electric-indigo/20' : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'}`}>
                <Box className="w-3 h-3 opacity-50" />
                {item}
              </div>
            ))}
          </div>
        </aside>

        {/* Viewport */}
        <main className="flex-1 relative bg-black group">
          {/* Mock 3D Grid / Environment */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(circle, #1e293b 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Mock 3D Object */}
              <motion.div 
                animate={{ rotateY: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-48 h-48 border-2 border-cyan-glow/50 bg-cyan-glow/5 rounded-2xl flex items-center justify-center agent-glow relative"
              >
                <Zap className="w-12 h-12 text-cyan-glow animate-pulse" />
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-deep-charcoal border border-cyan-glow/30 rounded-full text-[10px] text-cyan-glow font-bold uppercase tracking-widest">
                  Agent_Entity
                </div>
              </motion.div>
              {/* Gizmos */}
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-4">
                <div className="w-1 h-24 bg-rose-500/50 rounded-full" />
                <div className="w-24 h-1 bg-emerald-500/50 rounded-full" />
                <div className="w-1 h-24 bg-blue-500/50 rounded-full rotate-45" />
              </div>
            </div>
          </div>

          {/* Viewport HUD */}
          <div className="absolute top-6 left-6 flex flex-col gap-2">
            <div className="px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg flex items-center gap-3">
              <Cpu className="w-3.5 h-3.5 text-cyan-glow" />
              <span className="text-[10px] font-mono text-slate-400">FPS: 144 • GPU: 12%</span>
            </div>
            <div className="px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg flex items-center gap-3">
              <Maximize2 className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-[10px] font-mono text-slate-400">1920 x 1080</span>
            </div>
          </div>
        </main>

        {/* Inspector */}
        <aside className="w-80 border-l border-white/5 bg-deep-charcoal/50 flex flex-col z-10">
          <div className="p-4 border-b border-white/5 flex items-center justify-between">
            <span className="micro-label text-white">Inspector</span>
            <Zap className="w-3 h-3 text-cyan-glow" />
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            <section className="space-y-4">
              <h4 className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Transform</h4>
              <div className="space-y-3">
                {['Position', 'Rotation', 'Scale'].map(label => (
                  <div key={label} className="grid grid-cols-4 gap-2 items-center">
                    <span className="text-[10px] text-slate-500">{label}</span>
                    <input type="text" defaultValue="0.00" className="bg-white/[0.03] border border-white/5 rounded px-2 py-1 text-[10px] text-white focus:outline-none focus:border-cyan-glow/30" />
                    <input type="text" defaultValue="0.00" className="bg-white/[0.03] border border-white/5 rounded px-2 py-1 text-[10px] text-white focus:outline-none focus:border-cyan-glow/30" />
                    <input type="text" defaultValue="0.00" className="bg-white/[0.03] border border-white/5 rounded px-2 py-1 text-[10px] text-white focus:outline-none focus:border-cyan-glow/30" />
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h4 className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Agent Intelligence</h4>
              <div className="glass-card p-4 border-cyan-glow/20 bg-cyan-glow/[0.02] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">Behavior Model</span>
                  <span className="text-[10px] font-bold text-cyan-glow">GPT-4o-Warp</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">Autonomy Level</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} className={`w-1.5 h-3 rounded-sm ${i <= 4 ? 'bg-cyan-glow' : 'bg-white/5'}`} />
                    ))}
                  </div>
                </div>
                <button className="w-full py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold text-slate-300 hover:text-white transition-all">
                  Configure Logic
                </button>
              </div>
            </section>
          </div>
        </aside>
      </div>
    </motion.div>
  );
}
