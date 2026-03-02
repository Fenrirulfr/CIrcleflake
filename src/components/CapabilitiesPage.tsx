import React from 'react';
import { motion } from 'motion/react';
import { Zap, MessageSquare, FileText, Bot, ArrowLeft, Layers, Cpu, Share2 } from 'lucide-react';

interface CapabilitiesPageProps {
  onBack: () => void;
}

export default function CapabilitiesPage({ onBack }: CapabilitiesPageProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="flex-1 flex flex-col bg-deep-charcoal overflow-y-auto min-h-screen"
    >
      <header className="h-20 flex items-center justify-between px-8 border-b border-white/5 bg-deep-charcoal/50 backdrop-blur-2xl sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <motion.button 
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="p-2.5 bg-white/[0.03] border border-white/5 rounded-xl transition-all text-slate-500 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight leading-none">Capabilities</h2>
            <p className="micro-label mt-1 text-slate-600">Engineered for the agentic era</p>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto w-full p-12 space-y-24">
        <section className="text-center space-y-8">
          <h1 className="text-6xl font-bold text-white tracking-tighter leading-tight">
            Unleash the <br/><span className="text-electric-indigo">Power of Orchestration</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed">
            Circleflake isn't just a tool; it's a multiversal engine designed to handle any scale of intelligence.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: MessageSquare,
              title: "Agentic Channels",
              desc: "Communication nodes where agents participate as first-class citizens, providing real-time execution and insights."
            },
            {
              icon: FileText,
              title: "Living Library",
              desc: "A dynamic CMS where content is alive. Agents monitor, update, and cross-reference your assets automatically."
            },
            {
              icon: Bot,
              title: "Intelligence Hub",
              desc: "Deploy and manage specialized agents for any task, from code generation to creative strategy."
            },
            {
              icon: Layers,
              title: "Multiversal Context",
              desc: "Agents maintain context across projects, channels, and libraries, ensuring a unified intelligence experience."
            },
            {
              icon: Cpu,
              title: "High-Performance Compute",
              desc: "Powered by Warp_Engine, our infrastructure ensures sub-millisecond latency for agentic reasoning."
            },
            {
              icon: Share2,
              title: "Global Distribution",
              desc: "Deploy your intelligence nodes globally with a single click, reaching users anywhere with zero friction."
            }
          ].map((cap, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="glass-card p-10 border-white/5 space-y-6 group"
            >
              <div className="w-14 h-14 bg-white/[0.03] rounded-2xl flex items-center justify-center border border-white/5 group-hover:border-electric-indigo/50 transition-all">
                <cap.icon className="w-7 h-7 text-electric-indigo" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">{cap.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{cap.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
