import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Zap, Shield, Globe, Cpu, Users, Briefcase, Lock, FileText } from 'lucide-react';
import Logo from './Logo';

export type InfoPageType = 
  | 'capabilities' 
  | 'intelligence' 
  | 'network' 
  | 'security' 
  | 'about' 
  | 'careers' 
  | 'privacy' 
  | 'terms';

interface InfoPageProps {
  type: InfoPageType;
  onBack: () => void;
}

const PAGE_CONTENT: Record<InfoPageType, { title: string; subtitle: string; icon: React.ReactNode; content: React.ReactNode }> = {
  capabilities: {
    title: 'Capabilities',
    subtitle: 'Engineered for Agentic Precision',
    icon: <Cpu className="w-12 h-12 text-[var(--accent-human)]" />,
    content: (
      <div className="space-y-12">
        <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
          Circleflake is built on a foundation of real-time interoperability. Our system is designed to handle complex agentic workflows that bridge the gap between human communication and automated execution.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card p-8 border-[var(--card-border)]">
            <h4 className="text-[var(--text-main)] font-bold mb-4">Real-time Sync</h4>
            <p className="text-[var(--text-secondary)] text-sm">Ultra-low latency message distribution across global nodes using advanced WebSocket protocols.</p>
          </div>
          <div className="glass-card p-8 border-[var(--card-border)]">
            <h4 className="text-[var(--text-main)] font-bold mb-4">MCP Integration</h4>
            <p className="text-[var(--text-secondary)] text-sm">Native support for the Model Context Protocol, allowing AI agents to understand and interact with your data structure.</p>
          </div>
          <div className="glass-card p-8 border-[var(--card-border)]">
            <h4 className="text-[var(--text-main)] font-bold mb-4">Thread-First Design</h4>
            <p className="text-[var(--text-secondary)] text-sm">Organized conversations that prevent information overload and keep high-level channels focused.</p>
          </div>
          <div className="glass-card p-8 border-[var(--card-border)]">
            <h4 className="text-[var(--text-main)] font-bold mb-4">Living Library</h4>
            <p className="text-[var(--text-secondary)] text-sm">A contextual CMS that evolves with your team's knowledge, accessible directly within the chat stream.</p>
          </div>
        </div>
      </div>
    )
  },
  intelligence: {
    title: 'Intelligence',
    subtitle: 'The Brain of Your Workspace',
    icon: <Zap className="w-12 h-12 text-[var(--accent-ai)]" />,
    content: (
      <div className="space-y-12">
        <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
          Intelligence at Circleflake isn't just about LLMs. It's about the orchestration of data, context, and action. Our Intelligence Hub provides a unified interface for managing your AI workforce.
        </p>
        <div className="glass-card p-12 relative overflow-hidden border-[var(--card-border)]">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-[var(--text-main)] mb-6">Agent Orchestration</h3>
            <p className="text-[var(--text-secondary)] mb-8">Deploy, monitor, and refine agents that specialize in your team's specific domains. From content creation to code review, our agents are built to assist.</p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-ai)]" />
                Context-aware responses based on Living Library assets
              </li>
              <li className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-ai)]" />
                Multi-agent collaboration on complex tasks
              </li>
              <li className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-ai)]" />
                Automated workflow triggers based on chat sentiment
              </li>
            </ul>
          </div>
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-[var(--accent-ai)]/10 blur-3xl rounded-full" />
        </div>
      </div>
    )
  },
  network: {
    title: 'Network',
    subtitle: 'Global Infrastructure for Modern Teams',
    icon: <Globe className="w-12 h-12 text-emerald-400" />,
    content: (
      <div className="space-y-12">
        <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
          Circleflake operates on a distributed network of high-performance nodes, ensuring that your intelligence hub is always available and responsive, no matter where your team is located.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 text-center border-[var(--card-border)]">
            <p className="text-3xl font-bold text-[var(--text-main)] mb-2">25ms</p>
            <p className="micro-label text-[var(--text-secondary)]">Avg. Latency</p>
          </div>
          <div className="glass-card p-6 text-center border-[var(--card-border)]">
            <p className="text-3xl font-bold text-[var(--text-main)] mb-2">12</p>
            <p className="micro-label text-[var(--text-secondary)]">Global Regions</p>
          </div>
          <div className="glass-card p-6 text-center border-[var(--card-border)]">
            <p className="text-3xl font-bold text-[var(--text-main)] mb-2">99.99%</p>
            <p className="micro-label text-[var(--text-secondary)]">SLA Guarantee</p>
          </div>
        </div>
      </div>
    )
  },
  security: {
    title: 'Security',
    subtitle: 'Enterprise-Grade Protection',
    icon: <Shield className="w-12 h-12 text-rose-400" />,
    content: (
      <div className="space-y-12">
        <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
          Your data is your most valuable asset. Circleflake implements rigorous security measures to ensure that your communication and content remain private and protected.
        </p>
        <div className="space-y-6">
          <div className="flex gap-6 p-6 glass-card border-[var(--card-border)]">
            <Lock className="w-6 h-6 text-rose-500 shrink-0" />
            <div>
              <h4 className="text-[var(--text-main)] font-bold mb-2">End-to-End Encryption</h4>
              <p className="text-[var(--text-secondary)] text-sm">All messages and assets are encrypted at rest and in transit using industry-standard AES-256 encryption.</p>
            </div>
          </div>
          <div className="flex gap-6 p-6 glass-card border-[var(--card-border)]">
            <Shield className="w-6 h-6 text-rose-500 shrink-0" />
            <div>
              <h4 className="text-[var(--text-main)] font-bold mb-2">Role-Based Access Control</h4>
              <p className="text-[var(--text-secondary)] text-sm">Granular permissions allow you to control exactly who can see and interact with specific channels and assets.</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  about: {
    title: 'About Us',
    subtitle: 'The Future of Collective Intelligence',
    icon: <Users className="w-12 h-12 text-[var(--text-main)]" />,
    content: (
      <div className="space-y-12">
        <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
          Circleflake was founded with a simple mission: to build the tools that allow humans and AI to work together seamlessly. We believe that the next generation of software will be agentic, contextual, and deeply integrated.
        </p>
        <div className="glass-card p-12 border-[var(--card-border)]">
          <h3 className="text-2xl font-bold text-[var(--text-main)] mb-6">Our Philosophy</h3>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            We don't just build features; we build systems. Every part of Circleflake is designed to reinforce the others, creating a feedback loop of intelligence that helps teams move faster and think more clearly.
          </p>
        </div>
      </div>
    )
  },
  careers: {
    title: 'Careers',
    subtitle: 'Join the Intelligence Revolution',
    icon: <Briefcase className="w-12 h-12 text-amber-400" />,
    content: (
      <div className="space-y-12">
        <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
          We're looking for thinkers, builders, and dreamers who want to shape the future of work. At Circleflake, you'll work on the cutting edge of AI and distributed systems.
        </p>
        <div className="space-y-4">
          <div className="glass-card p-6 flex items-center justify-between group cursor-pointer hover:bg-[var(--bg-stream)] transition-all border-[var(--card-border)]">
            <div>
              <h4 className="text-[var(--text-main)] font-bold">Senior AI Engineer</h4>
              <p className="text-[var(--text-secondary)] text-sm">Remote / San Francisco</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[var(--card-bg)] flex items-center justify-center group-hover:bg-[var(--accent-human)] transition-all">
              <ArrowLeft className="w-4 h-4 text-[var(--text-main)] group-hover:text-white rotate-180" />
            </div>
          </div>
          <div className="glass-card p-6 flex items-center justify-between group cursor-pointer hover:bg-[var(--bg-stream)] transition-all border-[var(--card-border)]">
            <div>
              <h4 className="text-[var(--text-main)] font-bold">Product Designer</h4>
              <p className="text-[var(--text-secondary)] text-sm">Remote / London</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[var(--card-bg)] flex items-center justify-center group-hover:bg-[var(--accent-human)] transition-all">
              <ArrowLeft className="w-4 h-4 text-[var(--text-main)] group-hover:text-white rotate-180" />
            </div>
          </div>
        </div>
      </div>
    )
  },
  privacy: {
    title: 'Privacy Policy',
    subtitle: 'Your Data, Your Control',
    icon: <Lock className="w-12 h-12 text-[var(--text-secondary)]" />,
    content: (
      <div className="space-y-8 text-[var(--text-secondary)] leading-relaxed">
        <p>Last updated: February 27, 2026</p>
        <h3 className="text-xl font-bold text-[var(--text-main)] mt-8">1. Data Collection</h3>
        <p>We collect only the data necessary to provide our services, including account information, message content, and usage metadata. We never sell your data to third parties.</p>
        <h3 className="text-xl font-bold text-[var(--text-main)] mt-8">2. Data Usage</h3>
        <p>Your data is used to facilitate communication, power AI agent interactions within your workspace, and improve the performance of the Circleflake platform.</p>
        <h3 className="text-xl font-bold text-[var(--text-main)] mt-8">3. Your Rights</h3>
        <p>You have the right to access, export, or delete your data at any time. We provide tools within the settings panel to manage your privacy preferences.</p>
      </div>
    )
  },
  terms: {
    title: 'Terms of Service',
    subtitle: 'The Circleflake Agreement',
    icon: <FileText className="w-12 h-12 text-[var(--text-secondary)]" />,
    content: (
      <div className="space-y-8 text-[var(--text-secondary)] leading-relaxed">
        <p>By using Circleflake, you agree to the following terms and conditions.</p>
        <h3 className="text-xl font-bold text-[var(--text-main)] mt-8">1. Acceptable Use</h3>
        <p>Circleflake is intended for professional collaboration. Users must not use the platform for illegal activities, harassment, or the distribution of malicious software.</p>
        <h3 className="text-xl font-bold text-[var(--text-main)] mt-8">2. Intellectual Property</h3>
        <p>You retain all rights to the content you create and share on Circleflake. Circleflake retains all rights to the platform's infrastructure, design, and proprietary algorithms.</p>
        <h3 className="text-xl font-bold text-[var(--text-main)] mt-8">3. Limitation of Liability</h3>
        <p>Circleflake is provided "as is" without warranties of any kind. We are not liable for any indirect or consequential damages arising from the use of our services.</p>
      </div>
    )
  }
};

export default function InfoPage({ type, onBack }: InfoPageProps) {
  const page = PAGE_CONTENT[type];

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-secondary)] selection:bg-[var(--accent-human)]/30 overflow-y-auto w-full">
      <div className="max-w-4xl mx-auto px-8 py-24">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-main)] transition-colors mb-16 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="micro-label">Back to Home</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="w-20 h-20 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-3xl flex items-center justify-center mb-10">
            {page.icon}
          </div>
          <h1 className="text-6xl font-bold text-[var(--text-main)] tracking-tighter mb-4">{page.title}</h1>
          <p className="text-xl text-[var(--text-secondary)] font-light mb-20">{page.subtitle}</p>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            {page.content}
          </div>
        </motion.div>

        <div className="mt-32 pt-16 border-t border-[var(--card-border)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size={32} />
            <span className="text-sm font-bold text-[var(--text-main)] tracking-tighter">Circleflake</span>
          </div>
          <p className="text-[10px] text-[var(--text-secondary)] font-mono uppercase tracking-widest">© 2026 CIRCLEFLAKE_INTELLIGENCE_SYSTEMS</p>
        </div>
      </div>
    </div>
  );
}
