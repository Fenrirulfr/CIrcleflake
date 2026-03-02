import React from 'react';
import { motion } from 'motion/react';
import { Shield, Bell, User, Globe, Moon, Zap, ArrowLeft, Save } from 'lucide-react';

interface SettingsPageProps {
  onBack: () => void;
}

export default function SettingsPage({ onBack }: SettingsPageProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-1 flex flex-col bg-[var(--bg-main)] overflow-y-auto"
    >
      <header className="h-20 flex items-center justify-between px-8 border-b border-[var(--card-border)] bg-[var(--bg-main)]/50 backdrop-blur-2xl sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <motion.button 
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="p-2.5 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl transition-all text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-[var(--bg-stream)]"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <div>
            <h2 className="text-lg font-bold text-[var(--text-main)] tracking-tight leading-none">System Settings</h2>
            <p className="micro-label mt-1 text-[var(--text-secondary)]">Configure your workspace</p>
          </div>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2.5 bg-[var(--accent-human)] text-white rounded-full text-xs font-bold luminous-button flex items-center gap-2"
        >
          <Save className="w-3.5 h-3.5" />
          Save Changes
        </motion.button>
      </header>

      <div className="max-w-4xl mx-auto w-full p-12 space-y-12">
        {/* Profile Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 px-2">
            <User className="w-4 h-4 text-[var(--accent-human)]" />
            <span className="micro-label text-[var(--text-secondary)]">Identity</span>
          </div>
          <div className="glass-card p-8 space-y-8 border-[var(--card-border)]">
            <div className="flex items-center gap-8">
              <div className="relative group">
                <div className="w-24 h-24 rounded-[2rem] overflow-hidden border-2 border-[var(--card-border)] group-hover:border-[var(--accent-human)]/50 transition-all duration-500">
                  <img src="https://picsum.photos/seed/alex/200/200" alt="Alex" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>
                <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-[var(--accent-human)] rounded-full flex items-center justify-center border-2 border-[var(--bg-main)] shadow-lg hover:scale-110 transition-transform">
                  <Zap className="w-4 h-4 text-white" />
                </button>
              </div>
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest ml-1">Full Name</label>
                    <input type="text" defaultValue="Alex Rivera" className="w-full bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-main)] focus:outline-none focus:border-[var(--accent-human)]/30 transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest ml-1">Title</label>
                    <input type="text" defaultValue="Lead Architect" className="w-full bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-main)] focus:outline-none focus:border-[var(--accent-human)]/30 transition-all" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Preferences */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 px-2">
            <Moon className="w-4 h-4 text-[var(--accent-ai)]" />
            <span className="micro-label text-[var(--text-secondary)]">Interface</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-6 flex items-center justify-between group cursor-pointer border-[var(--card-border)]">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[var(--card-bg)] rounded-xl flex items-center justify-center border border-[var(--card-border)] group-hover:bg-[var(--accent-ai)]/10 transition-colors">
                  <Bell className="w-5 h-5 text-[var(--text-secondary)] group-hover:text-[var(--accent-ai)]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[var(--text-main)]">Notifications</p>
                  <p className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider">Enabled</p>
                </div>
              </div>
              <div className="w-10 h-5 bg-[var(--accent-ai)]/20 rounded-full relative border border-[var(--accent-ai)]/30">
                <div className="absolute right-1 top-1 w-3 h-3 bg-[var(--accent-ai)] rounded-full" />
              </div>
            </div>

            <div className="glass-card p-6 flex items-center justify-between group cursor-pointer border-[var(--card-border)]">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[var(--card-bg)] rounded-xl flex items-center justify-center border border-[var(--card-border)] group-hover:bg-[var(--accent-human)]/10 transition-colors">
                  <Globe className="w-5 h-5 text-[var(--text-secondary)] group-hover:text-[var(--accent-human)]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[var(--text-main)]">Public Profile</p>
                  <p className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider">Visible to Network</p>
                </div>
              </div>
              <div className="w-10 h-5 bg-[var(--accent-human)]/20 rounded-full relative border border-[var(--accent-human)]/30">
                <div className="absolute right-1 top-1 w-3 h-3 bg-[var(--accent-human)] rounded-full" />
              </div>
            </div>
          </div>
        </section>

        {/* Security */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 px-2">
            <Shield className="w-4 h-4 text-emerald-500" />
            <span className="micro-label text-[var(--text-secondary)]">Security</span>
          </div>
          <div className="glass-card p-8 space-y-6 border-[var(--card-border)]">
            <div className="flex items-center justify-between py-4 border-b border-[var(--card-border)]">
              <div>
                <p className="text-sm font-bold text-[var(--text-main)]">Two-Factor Authentication</p>
                <p className="text-xs text-[var(--text-secondary)] mt-1">Add an extra layer of security to your account.</p>
              </div>
              <button className="px-4 py-2 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-[var(--bg-stream)] transition-all">
                Configure
              </button>
            </div>
            <div className="flex items-center justify-between py-4">
              <div>
                <p className="text-sm font-bold text-[var(--text-main)]">Active Sessions</p>
                <p className="text-xs text-[var(--text-secondary)] mt-1">Manage your logged-in devices and locations.</p>
              </div>
              <button className="px-4 py-2 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-[var(--bg-stream)] transition-all">
                View All
              </button>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
