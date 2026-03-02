import React from 'react';
import { motion } from 'motion/react';
import { Globe, Users, Zap, ArrowLeft, Target, Heart } from 'lucide-react';

interface AboutPageProps {
  onBack: () => void;
}

export default function AboutPage({ onBack }: AboutPageProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
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
            <h2 className="text-lg font-bold text-white tracking-tight leading-none">About Circleflake</h2>
            <p className="micro-label mt-1 text-slate-600">Our mission and vision</p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto w-full p-12 space-y-24">
        <section className="text-center space-y-8">
          <h1 className="text-6xl font-bold text-white tracking-tighter leading-tight">
            Orchestrating the <br/><span className="italic font-serif text-electric-indigo">Future of Intelligence</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed">
            Circleflake was founded in 2025 with a singular goal: to unify human creativity with agentic precision.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="w-12 h-12 bg-electric-indigo/10 rounded-2xl flex items-center justify-center border border-electric-indigo/20">
              <Target className="w-6 h-6 text-electric-indigo" />
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">Our Mission</h3>
            <p className="text-slate-500 leading-relaxed">
              To build the infrastructure for a world where agents and humans collaborate seamlessly, breaking down the barriers between communication and execution.
            </p>
          </div>
          <div className="space-y-6">
            <div className="w-12 h-12 bg-cyan-glow/10 rounded-2xl flex items-center justify-center border border-cyan-glow/20">
              <Globe className="w-6 h-6 text-cyan-glow" />
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">Our Vision</h3>
            <p className="text-slate-500 leading-relaxed">
              A global network of unified intelligence nodes, empowering teams of all sizes to achieve superhuman productivity through agentic orchestration.
            </p>
          </div>
        </div>

        <section className="space-y-12">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white tracking-tight">The Team</h3>
            <p className="text-slate-500 mt-2">Architects of the agentic era.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "Alex Rivera", role: "Lead Architect", img: "alex" },
              { name: "Sarah Chen", role: "Intelligence Lead", img: "sarah" },
              { name: "Marcus Thorne", role: "Protocol Engineer", img: "marcus" },
              { name: "Elena Vance", role: "UX Strategist", img: "elena" }
            ].map((member, i) => (
              <div key={i} className="text-center space-y-4 group">
                <div className="w-full aspect-square rounded-[2rem] overflow-hidden border-2 border-white/5 group-hover:border-electric-indigo/50 transition-all duration-500">
                  <img src={`https://picsum.photos/seed/${member.img}/300/300`} alt={member.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{member.name}</p>
                  <p className="text-[10px] text-slate-600 uppercase tracking-widest mt-1">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="text-center py-12 border-t border-white/5">
          <div className="flex items-center justify-center gap-2 text-slate-600">
            <Heart className="w-4 h-4 text-rose-500" />
            <span className="text-xs font-bold uppercase tracking-widest">Built with passion in San Francisco</span>
          </div>
        </footer>
      </div>
    </motion.div>
  );
}
