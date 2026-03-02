import React from 'react';
import { motion } from 'motion/react';
import { Shield, Lock, Eye, FileCheck, ArrowLeft, Zap, Globe, Cpu } from 'lucide-react';

interface SecurityPageProps {
  onBack: () => void;
}

export default function SecurityPage({ onBack }: SecurityPageProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
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
            <h2 className="text-lg font-bold text-white tracking-tight leading-none">Security Protocol</h2>
            <p className="micro-label mt-1 text-slate-600">Enterprise-grade protection</p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto w-full p-12 space-y-16">
        <section className="text-center space-y-6">
          <div className="w-20 h-20 bg-emerald-500/10 rounded-[2.5rem] flex items-center justify-center mx-auto border border-emerald-500/20 agent-glow">
            <Shield className="w-10 h-10 text-emerald-500" />
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tighter">Your data is secured by <br/><span className="text-emerald-500">Circleflake Sentinel</span></h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            We employ multi-layered encryption and agentic monitoring to ensure your intelligence remains private and protected.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              icon: Lock,
              title: "End-to-End Encryption",
              desc: "All communication and content nodes are encrypted using AES-256 at rest and TLS 1.3 in transit."
            },
            {
              icon: Eye,
              title: "Agentic Monitoring",
              desc: "Autonomous security agents monitor for anomalies and potential threats in real-time across all nodes."
            },
            {
              icon: FileCheck,
              title: "Compliance Ready",
              desc: "Circleflake is SOC2 Type II, GDPR, and HIPAA compliant, ensuring the highest standards of data governance."
            },
            {
              icon: Cpu,
              title: "Isolated Runtimes",
              desc: "Agent executions occur in hardened, isolated sandboxes to prevent cross-contamination or unauthorized access."
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="glass-card p-8 border-white/5 space-y-4"
            >
              <div className="w-12 h-12 bg-white/[0.03] rounded-2xl flex items-center justify-center border border-white/5">
                <item.icon className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">{item.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <section className="glass-card p-12 border-emerald-500/20 bg-emerald-500/[0.02] text-center space-y-8">
          <h3 className="text-2xl font-bold text-white tracking-tight">Security Whitepaper</h3>
          <p className="text-slate-400 max-w-xl mx-auto">
            Deep dive into our architecture, encryption standards, and agentic security protocols.
          </p>
          <button className="px-8 py-3 bg-emerald-500 text-white rounded-full text-sm font-bold luminous-button">
            Download Whitepaper
          </button>
        </section>
      </div>
    </motion.div>
  );
}
