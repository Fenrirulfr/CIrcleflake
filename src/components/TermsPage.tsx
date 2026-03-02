import React from 'react';
import { motion } from 'motion/react';
import { FileText, Scale, AlertCircle, ArrowLeft, Gavel } from 'lucide-react';

interface TermsPageProps {
  onBack: () => void;
}

export default function TermsPage({ onBack }: TermsPageProps) {
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
            <h2 className="text-lg font-bold text-white tracking-tight leading-none">Terms of Service</h2>
            <p className="micro-label mt-1 text-slate-600">Agreement for the agentic era</p>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto w-full p-12 space-y-12">
        <section className="space-y-6">
          <h1 className="text-3xl font-bold text-white tracking-tight">Terms of Service</h1>
          <p className="text-slate-400 leading-relaxed">
            By accessing or using Circleflake, you agree to be bound by these terms. Please read them carefully.
          </p>
        </section>

        <section className="space-y-10">
          {[
            {
              title: "1. Acceptance of Terms",
              content: "Circleflake Intelligence Systems provides a unified intelligence hub. By using our services, you agree to these terms and our Privacy Policy."
            },
            {
              title: "2. User Responsibilities",
              content: "You are responsible for the content you create and the actions of the agents you deploy within your workspace. Misuse of agentic capabilities for illegal or harmful purposes is strictly prohibited."
            },
            {
              title: "3. Service Availability",
              content: "While we strive for 99.9% uptime across our global node network, we do not guarantee uninterrupted service. Maintenance and updates may occasionally cause temporary downtime."
            },
            {
              title: "4. Intellectual Property",
              content: "You retain ownership of the data you bring into Circleflake. Circleflake retains ownership of the underlying engine, protocols, and interface."
            },
            {
              title: "5. Limitation of Liability",
              content: "Circleflake is not liable for any indirect, incidental, or consequential damages arising from the use of our agentic intelligence services."
            }
          ].map((section, i) => (
            <div key={i} className="space-y-4">
              <h3 className="text-lg font-bold text-white tracking-tight">{section.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </section>

        <div className="glass-card p-8 border-white/5 bg-white/[0.01] flex items-center gap-6">
          <div className="w-12 h-12 bg-electric-indigo/10 rounded-xl flex items-center justify-center border border-electric-indigo/20">
            <Gavel className="w-6 h-6 text-electric-indigo" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Legal Inquiries</p>
            <p className="text-xs text-slate-500 mt-1">For formal legal matters, please contact legal@circleflake.ai</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
