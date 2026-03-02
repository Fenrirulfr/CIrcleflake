import React from 'react';
import { motion } from 'motion/react';
import { Layout, Plus, Search, MoreVertical, ExternalLink, Code, Users, Zap } from 'lucide-react';

const PROJECTS = [
  {
    id: 'p1',
    name: 'Neon Nexus',
    description: 'Cyberpunk RPG with real-time agentic NPCs.',
    status: 'In Development',
    builds: 142,
    users: '2.4k',
    lastUpdated: '2h ago',
    color: 'text-cyan-glow',
    bg: 'bg-cyan-glow/10',
    border: 'border-cyan-glow/20'
  },
  {
    id: 'p2',
    name: 'Warpstrike: Zero',
    description: 'Competitive tactical shooter on the Warp_Engine.',
    status: 'Ready',
    builds: 89,
    users: '12.1k',
    lastUpdated: '5h ago',
    color: 'text-electric-indigo',
    bg: 'bg-electric-indigo/10',
    border: 'border-electric-indigo/20'
  },
  {
    id: 'p3',
    name: 'Aetheria',
    description: 'Procedural multiverse exploration protocol.',
    status: 'Draft',
    builds: 12,
    users: '0',
    lastUpdated: '1d ago',
    color: 'text-magenta-500',
    bg: 'bg-magenta-500/10',
    border: 'border-magenta-500/20'
  }
];

export default function ProjectsPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 flex flex-col bg-deep-charcoal overflow-y-auto"
    >
      <header className="h-20 flex items-center justify-between px-8 border-b border-white/5 bg-deep-charcoal/50 backdrop-blur-2xl sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-electric-indigo/10 border border-electric-indigo/20 flex items-center justify-center agent-glow">
            <Layout className="w-5 h-5 text-electric-indigo" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight leading-none">Projects</h2>
            <p className="micro-label mt-1 text-slate-600">Manage your Warpverse creations</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
            <input 
              type="text" 
              placeholder="Search projects..." 
              className="bg-white/[0.03] border border-white/5 rounded-full py-2 pl-11 pr-6 text-xs focus:outline-none focus:border-white/10 transition-all w-48 placeholder:text-slate-700"
            />
          </div>
          <button className="px-6 py-2 bg-white text-deep-charcoal rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-cyan-glow transition-all flex items-center gap-2">
            <Plus className="w-3.5 h-3.5" />
            New Project
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto w-full p-12 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map(project => (
            <motion.div
              key={project.id}
              whileHover={{ y: -5, scale: 1.01 }}
              className={`glass-card p-8 group hover:${project.border} transition-all relative overflow-hidden flex flex-col justify-between min-h-[320px]`}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className={`w-12 h-12 ${project.bg} rounded-2xl flex items-center justify-center border ${project.border} group-hover:scale-110 transition-transform duration-500`}>
                    <Zap className={`w-6 h-6 ${project.color}`} />
                  </div>
                  <button className="p-2 hover:bg-white/5 rounded-lg text-slate-700 hover:text-white transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-cyan-glow transition-colors">{project.name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-6">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-widest ${project.status === 'Ready' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-slate-500'}`}>
                    {project.status}
                  </span>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-widest bg-white/5 text-slate-500">
                    Warp_Engine v4.2
                  </span>
                </div>
              </div>

              <div className="relative z-10 pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-600">
                    <Code className="w-3 h-3" />
                    {project.builds}
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-600">
                    <Users className="w-3 h-3" />
                    {project.users}
                  </div>
                </div>
                <button className="p-2 bg-white/5 border border-white/10 rounded-lg text-slate-500 hover:text-white transition-all">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
              <div className={`absolute -right-10 -bottom-10 w-32 h-32 ${project.bg} blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
            </motion.div>
          ))}
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            className="glass-card border-dashed border-white/10 flex flex-col items-center justify-center p-12 group hover:bg-white/[0.01] transition-all min-h-[320px]"
          >
            <div className="w-16 h-16 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Plus className="w-8 h-8 text-slate-700 group-hover:text-white transition-colors" />
            </div>
            <p className="text-sm font-bold text-slate-600 group-hover:text-white transition-colors">Initialize New Project</p>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
