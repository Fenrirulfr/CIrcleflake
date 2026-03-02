import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Zap, Globe, Shield, Info, Briefcase, Lock, FileText } from 'lucide-react';

interface StaticPageProps {
  title: string;
  content: string;
  onBack: () => void;
}

export default function StaticPage({ title, content, onBack }: StaticPageProps) {
  const getIcon = () => {
    switch (title.toLowerCase()) {
      case 'capabilities': return <Zap className="w-8 h-8 text-cyan-glow" />;
      case 'network': return <Globe className="w-8 h-8 text-electric-indigo" />;
      case 'security': return <Shield className="w-8 h-8 text-emerald-500" />;
      case 'about us': return <Info className="w-8 h-8 text-magenta-500" />;
      case 'careers': return <Briefcase className="w-8 h-8 text-amber-500" />;
      case 'privacy policy': return <Lock className="w-8 h-8 text-slate-400" />;
      case 'terms of service': return <FileText className="w-8 h-8 text-slate-400" />;
      default: return <Zap className="w-8 h-8 text-white" />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex flex-col bg-deep-charcoal overflow-y-auto min-h-screen"
    >
      <nav className="h-24 flex items-center justify-between px-8 border-b border-white/5 bg-deep-charcoal/50 backdrop-blur-2xl sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2.5 bg-white/[0.03] border border-white/5 rounded-xl text-slate-500 hover:text-white transition-all hover:bg-white/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="h-8 w-[1px] bg-white/10 mx-2" />
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-electric-indigo rounded-xl flex items-center justify-center agent-glow">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white tracking-tighter">Circleflake</span>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto w-full py-24 px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center">
              {getIcon()}
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tighter">{title}</h1>
          </div>

          <div className="glass-card p-12 border-white/5 bg-white/[0.01] relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-xl text-slate-400 leading-relaxed font-light">
                {content}
              </p>
              
              <div className="mt-12 space-y-8">
                <h3 className="text-lg font-bold text-white tracking-tight">Overview</h3>
                <p className="text-slate-500 leading-relaxed">
                  Circleflake is designed to be the definitive intelligence hub for modern teams. This page provides detailed information regarding our {title.toLowerCase()} protocols and standards.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                    <h4 className="text-sm font-bold text-white mb-2">Protocol V1.4</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">Standardized multiverse communication layer for agentic workflows.</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                    <h4 className="text-sm font-bold text-white mb-2">Node Status</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">Global node distribution active across all regional clusters.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-electric-indigo/5 blur-[80px] rounded-full" />
          </div>

          <div className="pt-12 border-t border-white/5 flex items-center justify-between">
            <p className="text-xs text-slate-700 font-mono uppercase tracking-widest">Last Updated: Feb 2026</p>
            <button 
              onClick={onBack}
              className="text-xs font-bold text-electric-indigo uppercase tracking-widest hover:text-cyan-glow transition-colors"
            >
              Back to Home
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
