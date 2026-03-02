import React from 'react';
import { motion } from 'motion/react';
import { Shield, Eye, Lock, ArrowLeft, FileText } from 'lucide-react';

interface PrivacyPageProps {
  onBack: () => void;
}

export default function PrivacyPage({ onBack }: PrivacyPageProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
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
            <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight leading-none">Privacy Policy</h2>
            <p className="micro-label mt-1 text-slate-500 dark:text-slate-600">Last updated: Feb 2026</p>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto w-full p-12 space-y-12">
        <section className="space-y-6">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Your Privacy Matters</h1>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            At Circleflake, we believe privacy is a fundamental right. This policy outlines how we collect, use, and protect your data in our unified intelligence hub.
          </p>
        </section>

        <section className="space-y-8">
          {[
            {
              title: "1. Data Collection",
              content: "We collect information necessary to provide our services, including account details, communication logs within channels, and content stored in the Living Library. All data collection is transparent and purposeful."
            },
            {
              title: "2. Agentic Processing",
              content: "Our agents process data to provide contextual insights and automation. This processing occurs in secure, isolated environments. We do not use your private data to train global models without explicit consent."
            },
            {
              title: "3. Data Sharing",
              content: "We do not sell your personal data. Data is only shared with third-party services essential for our operations (e.g., cloud infrastructure) and always under strict confidentiality agreements."
            },
            {
              title: "4. Your Rights",
              content: "You have the right to access, export, or delete your data at any time. Our 'Right to be Forgotten' protocol ensures complete removal of your intelligence nodes upon request."
            }
          ].map((section, i) => (
            <div key={i} className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">{section.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-500 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </section>

        <div className="glass-card p-8 border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.01] flex items-center gap-6">
          <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20">
            <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-500" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900 dark:text-white">Questions about privacy?</p>
            <p className="text-xs text-slate-500 mt-1">Contact our Data Protection Officer at privacy@circleflake.ai</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
