import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Search, Plus, Filter, Folder, Edit3, Globe, Lock, MoreVertical, Share2, Zap, CheckCircle2, AlertCircle, X, Send } from 'lucide-react';
import { CMSAsset, Channel } from '../types';
import ReactMarkdown from 'react-markdown';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CMSLibraryProps {
  assets: CMSAsset[];
  channels: Channel[];
  onAssetSelect: (asset: CMSAsset) => void;
  onShare: (assetId: string, channelId: string) => void;
  onImproveTone?: (assetId: string) => void;
  onSummarizeForSlack?: (assetId: string) => void;
  onCheckSEO?: (assetId: string) => void;
}

export default function CMSLibrary({ assets, channels, onAssetSelect, onShare, onImproveTone, onSummarizeForSlack, onCheckSEO }: CMSLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeAsset, setActiveAsset] = useState<CMSAsset | null>(assets[0] || null);
  const [content, setContent] = useState(activeAsset?.content || '');
  const [showAIWriter, setShowAIWriter] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState(channels[0]?.id || '');

  const filteredAssets = assets.filter(a => 
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAssetClick = (asset: CMSAsset) => {
    setActiveAsset(asset);
    setContent(asset.content);
    onAssetSelect(asset);
  };

  const handleShare = () => {
    if (activeAsset && selectedChannel) {
      onShare(activeAsset.id, selectedChannel);
      setShowShareModal(false);
    }
  };

  return (
    <div className="flex-1 flex h-full bg-[var(--bg-main)] overflow-hidden">
      {/* Left Column: Content Library */}
      <div className={cn(
        "w-full md:w-80 flex flex-col border-r border-[var(--card-border)] bg-[var(--sidebar-bg)]",
        activeAsset ? "hidden md:flex" : "flex"
      )}>
        <div className="p-6 border-b border-[var(--card-border)]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-[var(--text-main)] tracking-tight">Content Library</h2>
            <button 
              className="p-2 bg-[var(--accent-human)] text-white rounded-lg shadow-sm hover:bg-[var(--accent-human)]/90 transition-colors cf-focus min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Add new asset"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" aria-hidden="true" />
            <input 
              type="text" 
              placeholder="Search assets..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl py-2 pl-9 pr-4 text-sm text-[var(--text-main)] focus:outline-none focus:border-[var(--accent-human)]/30 transition-all placeholder:text-[var(--text-secondary)] cf-focus min-h-[44px]"
              aria-label="Search assets"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredAssets.map(asset => (
            <motion.button
              key={asset.id}
              whileHover={{ x: 4 }}
              onClick={() => handleAssetClick(asset)}
              className={cn(
                "w-full flex flex-col gap-2 p-3 rounded-xl text-left transition-all border cf-focus min-h-[44px]",
                activeAsset?.id === asset.id 
                  ? "bg-[var(--card-bg)] border-[var(--card-border)] shadow-sm" 
                  : "border-transparent hover:bg-[var(--bg-stream)] hover:border-[var(--card-border)]"
              )}
              aria-label={`Select asset ${asset.title}`}
            >
              <div className="flex items-center justify-between">
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
              <h4 className="text-sm font-bold text-[var(--text-main)] truncate">{asset.title}</h4>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Center Column: Content Editor */}
      <div className={cn(
        "flex-1 flex flex-col relative bg-[var(--bg-main)]",
        !activeAsset ? "hidden md:flex" : "flex"
      )}>
        {activeAsset ? (
          <>
            <div className="h-20 flex items-center justify-between px-4 md:px-8 border-b border-[var(--card-border)] bg-[var(--bg-main)]/80 backdrop-blur-md sticky top-0 z-10">
              <div className="flex items-center gap-2 md:gap-4">
                <button 
                  onClick={() => setActiveAsset(null)}
                  className="md:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--text-main)] transition-colors cf-focus min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Back to library"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
                <h2 className="text-lg md:text-xl font-bold text-[var(--text-main)] tracking-tight truncate max-w-[150px] sm:max-w-[200px] md:max-w-none">{activeAsset.title}</h2>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <button 
                  onClick={() => setShowShareModal(true)}
                  className="px-3 md:px-4 py-2 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl text-sm font-medium text-[var(--text-main)] hover:border-[var(--accent-human)]/30 transition-colors flex items-center gap-2 shadow-sm cf-focus min-h-[44px]"
                  aria-label="Share to Chat"
                >
                  <Share2 className="w-4 h-4" aria-hidden="true" />
                  <span className="hidden sm:inline">Share to Chat</span>
                  <span className="sm:hidden">Share</span>
                </button>
                <button 
                  className="px-3 md:px-4 py-2 bg-[var(--accent-human)] text-white rounded-xl text-sm font-medium hover:bg-[var(--accent-human)]/90 transition-colors flex items-center gap-2 shadow-sm luminous-button cf-focus min-h-[44px]"
                  aria-label="Publish asset"
                >
                  <Globe className="w-4 h-4" aria-hidden="true" />
                  <span className="hidden sm:inline">Publish</span>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-full min-h-[500px] bg-transparent border-none resize-none focus:outline-none text-[var(--text-main)] text-base leading-relaxed font-sans cf-focus p-4 rounded-xl"
                placeholder="Start writing..."
                aria-label="Content editor"
              />
            </div>

            {/* Floating AI Writer Toolbar */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] md:w-auto max-w-md">
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="glass-panel p-2 flex items-center justify-between md:justify-start gap-1 md:gap-2 rounded-2xl shadow-[var(--shadow-glass-lg)] border border-[var(--accent-ai)]/20 bg-[var(--card-bg)]/80 backdrop-blur-xl overflow-x-auto"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[var(--accent-ai)] to-[var(--accent-human)] flex items-center justify-center agent-glow shadow-[var(--shadow-glow-cyan)] shrink-0">
                  <Zap className="w-4 h-4 text-white" aria-hidden="true" />
                </div>
                <div className="h-6 w-px bg-[var(--card-border)] mx-1 shrink-0" />
                <button className="px-2 md:px-3 py-1.5 hover:bg-[var(--bg-stream)] rounded-lg text-xs md:text-sm font-medium text-[var(--text-main)] transition-colors flex items-center gap-1 md:gap-2 cf-focus min-h-[44px] shrink-0">
                  <Edit3 className="w-4 h-4 text-[var(--accent-ai)]" aria-hidden="true" />
                  <span className="hidden sm:inline">Generate Draft</span>
                  <span className="sm:hidden">Draft</span>
                </button>
                <button className="px-2 md:px-3 py-1.5 hover:bg-[var(--bg-stream)] rounded-lg text-xs md:text-sm font-medium text-[var(--text-main)] transition-colors flex items-center gap-1 md:gap-2 cf-focus min-h-[44px] shrink-0">
                  <FileText className="w-4 h-4 text-[var(--accent-ai)]" aria-hidden="true" />
                  <span className="hidden sm:inline">Contextualize</span>
                  <span className="sm:hidden">Context</span>
                </button>
                <button className="px-2 md:px-3 py-1.5 hover:bg-[var(--bg-stream)] rounded-lg text-xs md:text-sm font-medium text-[var(--text-main)] transition-colors flex items-center gap-1 md:gap-2 cf-focus min-h-[44px] shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-ai)]" aria-hidden="true" />
                  <span className="hidden sm:inline">Optimize SEO</span>
                  <span className="sm:hidden">SEO</span>
                </button>
              </motion.div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-[var(--text-secondary)]">
            Select an asset to edit
          </div>
        )}
      </div>

      {/* Right Column: AI Optimizer & Live Preview */}
      {activeAsset && (
        <div className="hidden lg:flex w-96 flex-col border-l border-[var(--card-border)] bg-[var(--sidebar-bg)]">
          <div className="p-6 border-b border-[var(--card-border)]">
            <h3 className="text-lg font-bold text-[var(--text-main)] tracking-tight flex items-center gap-2">
              <Zap className="w-5 h-5 text-[var(--accent-ai)]" />
              AI Optimizer
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            <div className="space-y-3">
              <button 
                onClick={() => {
                  if (onImproveTone) onImproveTone(activeAsset.id);
                  console.log(JSON.stringify({
                    tool: "improve_tone",
                    asset_id: activeAsset.id,
                    parameters: { target_tone: "professional" }
                  }, null, 2));
                }}
                className="w-full px-4 py-3 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl text-sm font-medium text-[var(--text-main)] hover:border-[var(--accent-ai)]/50 transition-colors flex items-center gap-3 shadow-sm group"
              >
                <div className="w-8 h-8 rounded-lg bg-[var(--accent-ai)]/10 flex items-center justify-center group-hover:bg-[var(--accent-ai)]/20 transition-colors">
                  <Edit3 className="w-4 h-4 text-[var(--accent-ai)]" />
                </div>
                <div className="text-left">
                  <div className="font-bold">Improve Tone</div>
                  <div className="text-xs text-[var(--text-secondary)]">Make it more professional</div>
                </div>
              </button>
              <button 
                onClick={() => {
                  if (onSummarizeForSlack) onSummarizeForSlack(activeAsset.id);
                  console.log(JSON.stringify({
                    tool: "summarize_for_slack",
                    asset_id: activeAsset.id,
                    parameters: { max_length: 200 }
                  }, null, 2));
                }}
                className="w-full px-4 py-3 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl text-sm font-medium text-[var(--text-main)] hover:border-[var(--accent-ai)]/50 transition-colors flex items-center gap-3 shadow-sm group"
              >
                <div className="w-8 h-8 rounded-lg bg-[var(--accent-ai)]/10 flex items-center justify-center group-hover:bg-[var(--accent-ai)]/20 transition-colors">
                  <FileText className="w-4 h-4 text-[var(--accent-ai)]" />
                </div>
                <div className="text-left">
                  <div className="font-bold">Summarize for Slack</div>
                  <div className="text-xs text-[var(--text-secondary)]">Generate a quick update</div>
                </div>
              </button>
              <button 
                onClick={() => {
                  if (onCheckSEO) onCheckSEO(activeAsset.id);
                  console.log(JSON.stringify({
                    tool: "check_seo",
                    asset_id: activeAsset.id,
                    parameters: { target_keywords: [] }
                  }, null, 2));
                }}
                className="w-full px-4 py-3 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl text-sm font-medium text-[var(--text-main)] hover:border-[var(--accent-ai)]/50 transition-colors flex items-center gap-3 shadow-sm group"
              >
                <div className="w-8 h-8 rounded-lg bg-[var(--accent-ai)]/10 flex items-center justify-center group-hover:bg-[var(--accent-ai)]/20 transition-colors">
                  <Search className="w-4 h-4 text-[var(--accent-ai)]" />
                </div>
                <div className="text-left">
                  <div className="font-bold">Check SEO</div>
                  <div className="text-xs text-[var(--text-secondary)]">Analyze keyword density</div>
                </div>
              </button>
            </div>

            <div className="pt-6 border-t border-[var(--card-border)] space-y-4">
              <h4 className="text-sm font-bold text-[var(--text-main)] uppercase tracking-widest flex items-center gap-2">
                <Globe className="w-4 h-4 text-[var(--text-secondary)]" />
                Live Preview
              </h4>
              <div className="prose dark:prose-invert prose-sm max-w-none text-[var(--text-main)] bg-[var(--card-bg)] p-4 rounded-xl border border-[var(--card-border)]">
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-panel w-full max-w-md p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-[var(--text-main)] tracking-tight">Share to Chat</h3>
                <button onClick={() => setShowShareModal(false)} className="p-1 text-[var(--text-secondary)] hover:text-[var(--text-main)] cf-focus min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label="Close modal">
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="p-4 bg-[var(--bg-stream)] rounded-xl border border-[var(--card-border)] flex items-center gap-4">
                  <div className="w-10 h-10 bg-[var(--accent-ai)]/10 rounded-lg flex items-center justify-center border border-[var(--accent-ai)]/20">
                    <FileText className="w-5 h-5 text-[var(--accent-ai)]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[var(--text-main)]">{activeAsset?.title}</p>
                    <p className="text-xs text-[var(--text-secondary)]">ID: {activeAsset?.id}</p>
                  </div>
                </div>

                <div>
                  <label htmlFor="channel-select" className="block text-sm font-medium text-[var(--text-main)] mb-2">Select Channel</label>
                  <select 
                    id="channel-select"
                    value={selectedChannel}
                    onChange={(e) => setSelectedChannel(e.target.value)}
                    className="w-full bg-[var(--bg-stream)] border border-[var(--card-border)] rounded-xl p-3 text-sm text-[var(--text-main)] focus:outline-none focus:border-[var(--accent-human)]/30 cf-focus min-h-[44px]"
                  >
                    {channels.map(c => (
                      <option key={c.id} value={c.id}># {c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => setShowShareModal(false)}
                  className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-main)] cf-focus min-h-[44px]"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleShare}
                  className="px-4 py-2 bg-[var(--accent-human)] text-white rounded-xl text-sm font-medium hover:bg-[var(--accent-human)]/90 transition-colors flex items-center gap-2 luminous-button cf-focus min-h-[44px]"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  Share Asset
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
