import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, MessageSquare, FileText, Bot, Shield, Globe, Cpu, Loader2, Moon, Sun } from 'lucide-react';
import Logo from './Logo';

import ThemeToggle from './ThemeToggle';

interface LandingPageProps {
  onGetStarted: () => void;
  onNavigate: (view: string) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export default function LandingPage({ onGetStarted, onNavigate, isDarkMode, toggleTheme }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] selection:bg-electric-indigo/30 overflow-x-hidden transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-[var(--card-border)] bg-[var(--bg-main)]/50 backdrop-blur-2xl transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-8 h-24 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size={44} className="agent-glow" />
            <span className="text-xl font-bold text-[var(--text-main)] tracking-tighter">Circleflake</span>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--text-secondary)]">
              <button 
                onClick={() => onNavigate('capabilities')} 
                className="hover:text-[var(--text-main)] transition-colors font-semibold"
              >
                Capabilities
              </button>
              <button 
                onClick={() => onNavigate('intelligence')} 
                className="hover:text-[var(--text-main)] transition-colors font-semibold"
              >
                Intelligence
              </button>
              <button 
                onClick={() => onNavigate('network')} 
                className="hover:text-[var(--text-main)] transition-colors font-semibold"
              >
                Network
              </button>
            </div>
            
            <div className="flex items-center">
              <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onGetStarted}
              className="px-6 py-2.5 bg-[var(--accent-human)] text-white rounded-full font-bold text-sm shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-all"
            >
              Launch App
            </motion.button>
          </div>
        </div>
      </nav>
          
      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-6 overflow-hidden">
        {/* Background Network Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10 text-[var(--text-main)]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="network-grid" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="1" fill="currentColor" />
                <line x1="50" y1="50" x2="150" y2="50" stroke="currentColor" strokeWidth="0.5" />
                <line x1="50" y1="50" x2="50" y2="150" stroke="currentColor" strokeWidth="0.5" />
                <line x1="50" y1="50" x2="150" y2="150" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#network-grid)" />
          </svg>
        </div>
        
        {/* Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-electric-indigo/5 blur-[160px] rounded-full -z-10 animate-pulse-slow" />
        <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-cyan-glow/5 blur-[120px] rounded-full -z-10" />

        {/* Large Background Logo */}
        <div className="absolute top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-10 pointer-events-none">
          <Logo size={800} className="animate-[spin_60s_linear_infinite]" />
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block px-5 py-2 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] micro-label text-[var(--accent-ai)] mb-8">
              Next-Gen Intelligence Hub
            </span>
            <h1 className="text-7xl md:text-[10rem] font-bold text-[var(--text-main)] tracking-tighter leading-[0.85] mb-10">
              Unified <span className="italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-human)] to-[var(--accent-ai)]">Intelligence</span>
            </h1>
            <p className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-3xl mx-auto mb-14 leading-relaxed font-normal">
              Circleflake orchestrates real-time communication and content management into a single, agent-aware stream.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onGetStarted}
                className="w-full sm:w-auto px-10 py-5 bg-[var(--card-bg)] text-[var(--text-main)] rounded-full font-bold text-lg hover:bg-[var(--accent-ai)]/10 transition-all shadow-xl shadow-[var(--accent-ai)]/10 border border-[var(--card-border)]"
              >
                Launch Workspace
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-10 py-5 bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-main)] rounded-full font-bold text-lg transition-all backdrop-blur-md hover:bg-[var(--bg-stream)] shadow-sm"
              >
                Watch Demo
              </motion.button>
            </div>
          </motion.div>

          {/* Mockup Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20 relative"
          >
            <div className="relative glass-card p-2 border-[var(--card-border)] shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg-main)]/50 to-[var(--bg-main)] pointer-events-none z-10" />
              
              {/* Video Generation Container */}
              <div className="relative rounded-lg overflow-hidden aspect-video bg-black">
                {/* Base Image (simulating generated frame) */}
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop" 
                  alt="AI Avatar Video Generation" 
                  className="w-full h-full object-cover opacity-90"
                  referrerPolicy="no-referrer"
                />

                {/* Thumbnail Text Overlays (Simulating the user's requested image style) */}
                <div className="absolute top-8 left-8 z-10 flex flex-col items-start gap-2 transform -rotate-2">
                  <div className="bg-black/80 px-4 py-1 rounded-md border-l-4 border-electric-indigo">
                    <span className="text-white font-black italic text-2xl tracking-tighter uppercase">MUST HAVE TECH!</span>
                  </div>
                  <div className="bg-white/90 px-4 py-0 rounded-sm shadow-lg">
                    <span className="text-electric-indigo font-black text-5xl tracking-tighter uppercase leading-none">AWESOME AI</span>
                  </div>
                  <div className="bg-white/90 px-4 py-0 rounded-sm shadow-lg">
                    <span className="text-electric-indigo font-black text-5xl tracking-tighter uppercase leading-none">SMART HUB!</span>
                  </div>
                  <div className="bg-yellow-400 px-4 py-1 rounded-md shadow-xl mt-2 transform rotate-1">
                    <span className="text-black font-black text-3xl tracking-tighter uppercase">INSANE REVIEW!</span>
                  </div>
                </div>
                
                {/* Face Scanning Effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-cyan-glow/30 rounded-full animate-pulse z-20">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-glow rounded-full" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-cyan-glow rounded-full" />
                  <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-glow rounded-full" />
                  <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-glow rounded-full" />
                  <div className="absolute inset-0 border-t border-b border-cyan-glow/50 animate-[spin_4s_linear_infinite]" />
                </div>
                
                {/* Scanning Line Effect */}
                <motion.div 
                  className="absolute top-0 left-0 w-full h-1 bg-cyan-glow shadow-[0_0_20px_rgba(102,252,241,0.8)] z-20"
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                />
                
                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-10" />
                
                {/* UI Overlay */}
                <div className="absolute bottom-8 left-8 right-8 z-30">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-cyan-glow animate-pulse" />
                      <span className="text-xs font-mono text-cyan-glow uppercase tracking-wider">Generating Avatar...</span>
                    </div>
                    <span className="text-xs font-mono text-slate-400">00:04 / 00:15</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-electric-indigo to-cyan-glow"
                      animate={{ width: ["0%", "100%"] }}
                      transition={{ duration: 15, ease: "linear", repeat: Infinity }}
                    />
                  </div>
                  
                  {/* Prompt Text */}
                  <div className="mt-4 p-3 bg-black/40 backdrop-blur-md rounded-lg border border-white/5 hidden sm:block">
                    <p className="text-xs font-mono text-slate-300">
                      <span className="text-electric-indigo">&gt;</span> prompt: viral youtube thumbnail, excited female tech reviewer holding smart home device, bold text overlays "AWESOME AI", high contrast, 4k --ar 16:9
                    </p>
                  </div>
                </div>

                {/* Center Logo/Icon */}
                <div className="absolute inset-0 flex items-center justify-center z-0">
                   <Logo size={80} className="opacity-20 animate-pulse-slow" />
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-10 -left-10 glass-card p-4 hidden lg:block animate-bounce" style={{ animationDuration: '4s' }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Loader2 className="w-4 h-4 text-emerald-400 animate-spin" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Agent Status</p>
                  <p className="text-xs text-white font-semibold">Content-Bot Active</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 -right-10 glass-card p-4 hidden lg:block animate-bounce" style={{ animationDuration: '5s' }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-cyan-glow/20 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-cyan-glow" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Latest Asset</p>
                  <p className="text-xs text-white font-semibold">Q1 Marketing Plan.md</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-40 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <div className="max-w-2xl">
              <span className="micro-label text-[var(--accent-human)] mb-4 block">Capabilities</span>
              <h2 className="text-5xl md:text-7xl font-bold text-[var(--text-main)] tracking-tighter leading-tight">Engineered for <span className="italic font-serif text-[var(--accent-ai)]">Intelligence</span></h2>
            </div>
            <p className="text-[var(--text-secondary)] max-w-sm text-lg leading-relaxed">
              Everything you need to manage your team's communication and assets in one place, powered by agentic workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Main Feature Card */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="md:col-span-8 glass-card p-12 flex flex-col justify-between overflow-hidden relative group min-h-[500px] border-[var(--card-border)]"
            >
              <div className="relative z-10">
                <div className="w-14 h-14 bg-[var(--accent-human)]/10 rounded-2xl flex items-center justify-center mb-8 border border-[var(--accent-human)]/20 group-hover:bg-[var(--accent-human)]/20 transition-all">
                  <Cpu className="w-7 h-7 text-[var(--accent-human)]" />
                </div>
                <h3 className="text-4xl font-bold text-[var(--text-main)] mb-6 tracking-tight">Agent-Aware Stream</h3>
                <p className="text-[var(--text-secondary)] max-w-md text-xl leading-relaxed font-light">
                  Every channel in Circleflake is natively aware of your AI agents. They read history, access CMS assets, and take actions based on your chat commands.
                </p>
              </div>
              <div className="mt-16 flex flex-wrap gap-4 relative z-10">
                <div className="px-5 py-2.5 bg-[var(--card-bg)] rounded-full border border-[var(--card-border)] micro-label text-[var(--accent-ai)] group-hover:border-[var(--accent-ai)]/30 transition-colors">Real-time Sync</div>
                <div className="px-5 py-2.5 bg-[var(--card-bg)] rounded-full border border-[var(--card-border)] micro-label text-[var(--accent-human)] group-hover:border-[var(--accent-human)]/30 transition-colors">MCP Protocol</div>
                <div className="px-5 py-2.5 bg-[var(--card-bg)] rounded-full border border-[var(--card-border)] micro-label text-[var(--text-main)] group-hover:border-[var(--text-secondary)]/30 transition-colors">Thread-First</div>
              </div>
              {/* Decorative Glow */}
              <div className="absolute -right-20 -bottom-20 w-[500px] h-[500px] bg-electric-indigo/10 blur-[120px] rounded-full group-hover:bg-electric-indigo/20 transition-all duration-1000" />
              <div className="absolute top-12 right-12 w-48 h-48 border border-[var(--card-border)] rounded-full animate-pulse-slow" />
            </motion.div>

            {/* Side Feature Card */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="md:col-span-4 glass-card p-12 flex flex-col items-center text-center justify-center group hover:border-[var(--accent-ai)]/30 transition-all relative overflow-hidden border-[var(--card-border)]"
            >
              <div className="w-24 h-24 bg-[var(--accent-ai)]/5 rounded-[2.5rem] flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-700 border border-[var(--accent-ai)]/10">
                <FileText className="w-10 h-10 text-[var(--accent-ai)]" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--text-main)] mb-4 tracking-tight">Living Library</h3>
              <p className="text-[var(--text-secondary)] text-base leading-relaxed font-light">
                The CMS is no longer a separate tab. It's a living part of your chat stream.
              </p>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--accent-ai)]/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>

            {/* Bottom Row */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="md:col-span-5 glass-card p-12 group hover:border-[var(--card-border)] transition-all border-[var(--card-border)]"
            >
              <div className="w-14 h-14 bg-[var(--card-bg)] rounded-2xl flex items-center justify-center mb-8 border border-[var(--card-border)] group-hover:bg-[var(--bg-stream)] transition-all">
                <MessageSquare className="w-7 h-7 text-[var(--text-main)]" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--text-main)] mb-4 tracking-tight">Thread-First Architecture</h3>
              <p className="text-[var(--text-secondary)] text-base leading-relaxed font-light">
                Keep the main channel clean. All deep dives and agent interactions happen in nested threads.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="md:col-span-7 glass-card p-12 flex items-center justify-between overflow-hidden relative group border-[var(--card-border)]"
            >
              <div className="relative z-10 flex-1">
                <h3 className="text-3xl font-bold text-[var(--text-main)] mb-6 tracking-tight">Interoperable AI Agents</h3>
                <p className="text-[var(--text-secondary)] max-w-sm text-base leading-relaxed font-light">
                  Use the Model Context Protocol (MCP) to ensure AI agents can fetch data from the CMS and channels without manual API glue code.
                </p>
              </div>
              <div className="hidden lg:flex items-center gap-6 relative z-10">
                <motion.div 
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  className="w-20 h-20 rounded-3xl bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center group-hover:bg-[var(--bg-stream)] transition-all"
                >
                  <Globe className="w-10 h-10 text-[var(--text-secondary)]" />
                </motion.div>
                <motion.div 
                  whileHover={{ rotate: -12, scale: 1.1 }}
                  className="w-20 h-20 rounded-3xl bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center group-hover:bg-[var(--bg-stream)] transition-all"
                >
                  <Shield className="w-10 h-10 text-[var(--text-secondary)]" />
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.2 }}
                  className="w-20 h-20 rounded-3xl bg-[var(--accent-human)]/10 border border-[var(--accent-human)]/20 flex items-center justify-center agent-glow"
                >
                  <Logo size={48} />
                </motion.div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--accent-ai)]/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-[var(--card-border)] bg-[var(--text-main)]/[0.02]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div>
            <p className="text-4xl font-bold text-[var(--text-main)] mb-1">99.9%</p>
            <p className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-widest">Uptime</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-[var(--text-main)] mb-1">25ms</p>
            <p className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-widest">Latency</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-[var(--text-main)] mb-1">10k+</p>
            <p className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-widest">Teams</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-[var(--text-main)] mb-1">24/7</p>
            <p className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-widest">AI Support</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-electric-indigo/10 -z-10" />
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl font-bold text-[var(--text-main)] tracking-tight mb-8">Ready to unify your intelligence?</h2>
          <p className="text-[var(--text-secondary)] text-lg mb-12">Join thousands of teams building the future of work on Circleflake.</p>
          <button 
            onClick={onGetStarted}
            className="px-10 py-5 bg-[var(--accent-human)] text-white rounded-full font-bold text-xl luminous-button hover:scale-105 transition-all"
          >
            Get Started for Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-8 border-t border-[var(--card-border)] bg-[var(--bg-stream)] relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--accent-human)]/5 blur-[120px] rounded-full -z-10" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <Logo size={40} className="agent-glow" />
              <span className="text-xl font-bold text-[var(--text-main)] tracking-tighter">Circleflake</span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-xs">
              The unified intelligence hub for modern teams. Orchestrating communication and content with agentic precision.
            </p>
          </div>
          <div>
            <h4 className="micro-label text-[var(--text-main)] mb-8">Product</h4>
            <ul className="space-y-4 text-sm text-[var(--text-secondary)]">
              <li><button onClick={() => onNavigate('capabilities')} className="hover:text-[var(--accent-ai)] transition-colors">Capabilities</button></li>
              <li><button onClick={() => onNavigate('intelligence')} className="hover:text-[var(--accent-ai)] transition-colors">Intelligence</button></li>
              <li><button onClick={() => onNavigate('network')} className="hover:text-[var(--accent-ai)] transition-colors">Network</button></li>
              <li><button onClick={() => onNavigate('security')} className="hover:text-[var(--accent-ai)] transition-colors">Security</button></li>
            </ul>
          </div>
          <div>
            <h4 className="micro-label text-[var(--text-main)] mb-8">Company</h4>
            <ul className="space-y-4 text-sm text-[var(--text-secondary)]">
              <li><button onClick={() => onNavigate('about')} className="hover:text-[var(--accent-ai)] transition-colors">About Us</button></li>
              <li><button onClick={() => onNavigate('careers')} className="hover:text-[var(--accent-ai)] transition-colors">Careers</button></li>
              <li><button onClick={() => onNavigate('privacy')} className="hover:text-[var(--accent-ai)] transition-colors">Privacy</button></li>
              <li><button onClick={() => onNavigate('terms')} className="hover:text-[var(--accent-ai)] transition-colors">Terms</button></li>
            </ul>
          </div>
          <div>
            <h4 className="micro-label text-[var(--text-main)] mb-8">Social</h4>
            <ul className="space-y-4 text-sm text-[var(--text-secondary)]">
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent-ai)] transition-colors">Twitter</a></li>
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent-ai)] transition-colors">GitHub</a></li>
              <li><a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent-ai)] transition-colors">Discord</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent-ai)] transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-[var(--card-border)] flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-[var(--text-secondary)] font-mono tracking-widest uppercase">© 2026 CIRCLEFLAKE_INTELLIGENCE_SYSTEMS</p>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-[var(--text-secondary)]">
              <Globe className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Global Node</span>
            </div>
            <span className="text-[10px] text-[var(--text-secondary)] font-mono">v1.0.4-stable</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
