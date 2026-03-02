import React from 'react';
import { CMSAsset } from '../types';
import { FileText, User, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CMSPreviewPanelProps {
  assets: CMSAsset[];
  onContextualize: (assetId: string) => void;
}

export default function CMSPreviewPanel({ assets, onContextualize }: CMSPreviewPanelProps) {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-[var(--text-main)] tracking-tight">Content Assets</h3>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 bg-[var(--accent-human)] text-white rounded-lg shadow-md hover:bg-[var(--accent-human)]/90 transition-colors cf-focus min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Add new asset"
        >
          <Plus className="w-4 h-4" aria-hidden="true" />
        </motion.button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {assets.map((asset) => (
          <motion.div
            key={asset.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-5 flex flex-col gap-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono text-[var(--text-secondary)] bg-[var(--bg-stream)] px-1.5 py-0.5 rounded border border-[var(--card-border)]">
                    {asset.id}
                  </span>
                  <span className={cn(
                    "text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded",
                    asset.status === 'published' 
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20" 
                      : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                  )}>
                    {asset.status}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[var(--text-main)] truncate" title={asset.title}>
                  {asset.title}
                </h4>
              </div>
              <div className="w-8 h-8 rounded-full bg-[var(--bg-stream)] border border-[var(--card-border)] flex items-center justify-center flex-shrink-0 overflow-hidden">
                <User className="w-4 h-4 text-[var(--text-secondary)]" />
              </div>
            </div>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--card-border)]">
              <div className="flex items-center gap-1.5 text-[10px] text-[var(--text-secondary)]">
                <FileText className="w-3.5 h-3.5" />
                <span>Asset</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onContextualize(asset.id)}
                className="px-3 py-1.5 bg-[var(--accent-ai)]/10 text-[var(--accent-ai)] hover:bg-[var(--accent-ai)]/20 border border-[var(--accent-ai)]/20 rounded-lg text-xs font-bold transition-colors cf-focus min-h-[44px]"
                aria-label={`Contextualize asset ${asset.title}`}
              >
                Contextualize
              </motion.button>
            </div>
          </motion.div>
        ))}
        {assets.length === 0 && (
          <div className="text-center p-8 text-[var(--text-secondary)] text-sm">
            No assets found.
          </div>
        )}
      </div>
    </div>
  );
}
