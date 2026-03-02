import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Zap, Globe, Cpu, ArrowLeft, ArrowRight } from 'lucide-react';

interface CareersPageProps {
  onBack: () => void;
}

const JOBS = [
  {
    title: "Senior Intelligence Engineer",
    team: "Core AI",
    location: "Remote / SF",
    type: "Full-time"
  },
  {
    title: "Protocol Architect",
    team: "Infrastructure",
    location: "Remote / London",
    type: "Full-time"
  },
  {
    title: "Agentic UX Designer",
    team: "Product",
    location: "Remote / NY",
    type: "Full-time"
  },
  {
    title: "Developer Advocate",
    team: "Ecosystem",
    location: "Remote",
    type: "Full-time"
  }
];

export default function CareersPage({ onBack }: CareersPageProps) {
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
            <h2 className="text-lg font-bold text-white tracking-tight leading-none">Careers</h2>
            <p className="micro-label mt-1 text-slate-600">Join the agentic revolution</p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto w-full p-12 space-y-24">
        <section className="text-center space-y-8">
          <div className="w-20 h-20 bg-electric-indigo/10 rounded-[2.5rem] flex items-center justify-center mx-auto border border-electric-indigo/20 agent-glow">
            <Briefcase className="w-10 h-10 text-electric-indigo" />
          </div>
          <h1 className="text-5xl font-bold text-white tracking-tighter">Help us build the <br/><span className="text-cyan-glow">Unified Intelligence Hub</span></h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            We're looking for visionary engineers, designers, and thinkers to help us define the next era of human-agent collaboration.
          </p>
        </section>

        <section className="space-y-12">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-2xl font-bold text-white tracking-tight">Open Roles</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Hiring Now</span>
            </div>
          </div>
          <div className="space-y-4">
            {JOBS.map((job, i) => (
              <motion.div 
                key={i}
                whileHover={{ x: 4 }}
                className="glass-card p-6 flex items-center justify-between group hover:border-white/10 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-8">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white tracking-tight">{job.title}</span>
                    <span className="text-[10px] text-slate-600 uppercase tracking-widest mt-1">{job.team}</span>
                  </div>
                  <div className="w-[1px] h-8 bg-white/5 hidden md:block" />
                  <div className="hidden md:flex flex-col">
                    <span className="text-xs text-slate-500">{job.location}</span>
                    <span className="text-[10px] text-slate-700 mt-1">{job.type}</span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-700 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </motion.div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Zap, title: "High Impact", desc: "Work on the core protocols of the agentic era." },
            { icon: Globe, title: "Remote First", desc: "Collaborate with a global team of experts." },
            { icon: Cpu, title: "Cutting Edge", desc: "Access the latest in LLM and agentic research." }
          ].map((benefit, i) => (
            <div key={i} className="glass-card p-8 space-y-4 text-center">
              <div className="w-12 h-12 bg-white/[0.03] rounded-2xl flex items-center justify-center border border-white/5 mx-auto">
                <benefit.icon className="w-6 h-6 text-electric-indigo" />
              </div>
              <h4 className="text-sm font-bold text-white">{benefit.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </section>
      </div>
    </motion.div>
  );
}
