import React from 'react';
import { Message, CMSAsset } from '../types';
import { Bot, User, ExternalLink, FileText, CheckCircle2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'motion/react';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface MessageItemProps {
  message: Message;
  isReply?: boolean;
  onAssetSelect: (asset: CMSAsset) => void;
}

export default function MessageItem({ message, isReply, onAssetSelect }: MessageItemProps) {
  const isAgent = message.isAgent;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "group flex gap-4 transition-all duration-300",
        isAgent 
          ? "bg-[var(--card-bg)] p-6 rounded-2xl border border-[var(--card-border)] border-l-4 shadow-[var(--card-shadow)]" 
          : "bg-[var(--card-bg)] p-4 rounded-2xl border border-[var(--card-border)] shadow-[var(--card-shadow)] hover:border-[var(--accent-human)]/30"
      )}
      style={isAgent ? {
        borderLeftColor: 'var(--agent-border-color)',
        boxShadow: 'var(--agent-border-shadow)'
      } : {}}
    >
      <div className="flex-shrink-0 mt-1">
        {isAgent ? (
          <div className="w-10 h-10 rounded-xl flex items-center justify-center agent-glow bg-[var(--accent-ai)]/10">
            <Bot className="w-6 h-6 text-[var(--accent-ai)]" />
          </div>
        ) : (
          <div className="relative w-10 h-10">
            <div className="w-full h-full rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center overflow-hidden">
              <img src={`https://picsum.photos/seed/${message.userId}/100/100`} alt={message.userName} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[var(--accent-ai)] rounded-full border-2 border-[var(--card-bg)] shadow-[var(--shadow-glow-cyan)]" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1.5">
          <span className={cn(
            "text-sm font-bold tracking-tight",
            isAgent ? "text-[var(--accent-ai)]" : "text-[var(--text-main)]"
          )}>
            {message.userName}
          </span>
          {isAgent && (
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-bold bg-[var(--accent-ai)]/10 text-[var(--accent-ai)] border border-[var(--accent-ai)]/20 px-1.5 py-0.5 rounded uppercase tracking-widest">Agent</span>
              <div className="w-1 h-1 rounded-full bg-[var(--accent-ai)] animate-pulse" />
            </div>
          )}
          <span className="font-mono text-[10px] text-[var(--text-secondary)]">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
        </div>

        <div className={cn(
          "text-sm leading-relaxed prose dark:prose-invert prose-slate max-w-none text-[var(--text-main)]"
        )}>
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>

        {message.metadata?.type === 'cms-preview' && (
          <div 
            className="mt-4 glass-card p-4 flex items-center justify-between group/card hover:border-[var(--accent-ai)]/30 transition-all cursor-pointer bg-[var(--card-bg)] relative overflow-hidden cf-focus"
            onClick={() => onAssetSelect({ id: message.metadata.assetId, title: message.metadata.preview_card?.title || 'Asset', content: '', status: message.metadata.preview_card?.status || 'draft', lastModified: '' })}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onAssetSelect({ id: message.metadata.assetId, title: message.metadata.preview_card?.title || 'Asset', content: '', status: message.metadata.preview_card?.status || 'draft', lastModified: '' });
              }
            }}
            aria-label={`View CMS Asset: ${message.metadata.preview_card?.title || 'Linked CMS Asset'}. Status: ${message.metadata.preview_card?.status || 'draft'}`}
          >
            {message.metadata.preview_card?.render_badge && (
              <div 
                className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg uppercase tracking-widest"
                aria-hidden="true"
              >
                Draft
              </div>
            )}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[var(--accent-ai)]/5 rounded-xl flex items-center justify-center border border-[var(--accent-ai)]/10 group-hover/card:bg-[var(--accent-ai)]/10 transition-colors">
                <FileText className="w-5 h-5 text-[var(--accent-ai)]" aria-hidden="true" />
              </div>
              <div>
                <p className="micro-label mb-0.5">{message.metadata.preview_card?.title || 'Linked CMS Asset'}</p>
                <p className="text-sm font-bold text-[var(--text-main)] tracking-tight">Asset ID: {message.metadata.assetId}</p>
                {message.metadata.preview_card?.warning && (
                  <p className="text-xs text-amber-500 mt-1">{message.metadata.preview_card.warning}</p>
                )}
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-[var(--bg-stream)] flex items-center justify-center group-hover/card:bg-[var(--card-border)] transition-colors">
              <ExternalLink className="w-4 h-4 text-[var(--text-secondary)] group-hover/card:text-[var(--text-main)] transition-colors" aria-hidden="true" />
            </div>
          </div>
        )}

        {message.metadata?.type === 'summary' && (
          <div className="mt-4 glass-panel p-6 border border-[var(--accent-ai)]/20 bg-[var(--accent-ai)]/5 relative overflow-hidden group/summary">
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-[var(--accent-ai)]/20 rounded-full blur-2xl group-hover/summary:bg-[var(--accent-ai)]/30 transition-colors duration-700" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <Bot className="w-4 h-4 text-[var(--accent-ai)]" aria-hidden="true" />
                <span className="text-xs font-bold text-[var(--accent-ai)] uppercase tracking-widest">AI Summary</span>
              </div>
              <div className="text-sm text-[var(--text-main)] leading-relaxed whitespace-pre-line">
                {message.metadata.content}
              </div>
            </div>
          </div>
        )}

        {isAgent && message.content.includes('Published') && (
          <div className="mt-4 flex items-center gap-2 text-emerald-400 text-[10px] font-bold uppercase tracking-[0.2em] bg-emerald-500/5 px-3 py-1.5 rounded-lg border border-emerald-500/10 w-fit">
            <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
            Action Verified via MCP
          </div>
        )}
      </div>
    </motion.div>
  );
}
