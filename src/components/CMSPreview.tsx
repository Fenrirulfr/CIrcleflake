import { CMSAsset } from '../types';
import { FileText, Clock, Edit3, Globe, Share2, MoreVertical, Plus, User, Search } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';

interface CMSPreviewProps {
  asset: CMSAsset | null;
  allAssets: CMSAsset[];
  onAssetSelect: (asset: CMSAsset) => void;
}

export default function CMSPreview({ asset, allAssets, onAssetSelect }: CMSPreviewProps) {
  if (!asset) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-8"
      >
        <div className="relative">
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-24 h-24 bg-[var(--card-bg)] rounded-[2rem] flex items-center justify-center border border-[var(--card-border)]"
          >
            <FileText className="w-10 h-10 text-[var(--text-secondary)]" />
          </motion.div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-[var(--accent-ai)]/10 rounded-full flex items-center justify-center border border-[var(--accent-ai)]/20">
            <Search className="w-4 h-4 text-[var(--accent-ai)]" />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-[var(--text-main)] tracking-tight">Living Library</h3>
          <p className="text-sm text-[var(--text-secondary)] max-w-[240px] leading-relaxed">
            Select an asset from the library or use <code className="font-mono text-[var(--accent-ai)] bg-[var(--accent-ai)]/10 px-1.5 py-0.5 rounded">/fetch_asset</code> in chat.
          </p>
        </div>
        <div className="w-full space-y-3 mt-12">
          <div className="flex items-center justify-between px-2">
            <span className="micro-label text-[var(--text-secondary)]">Recent Intelligence</span>
            <div className="w-1 h-1 rounded-full bg-[var(--card-border)]" />
          </div>
          <div className="space-y-1">
            {allAssets.map(a => (
              <motion.button
                key={a.id}
                whileHover={{ x: 4, backgroundColor: 'rgba(255,255,255,0.03)' }}
                onClick={() => onAssetSelect(a)}
                className="w-full flex items-center gap-4 p-4 rounded-2xl transition-all group text-left border border-transparent hover:border-[var(--card-border)] hover:bg-[var(--bg-stream)]"
              >
                <div className="w-10 h-10 bg-[var(--card-bg)] rounded-xl flex items-center justify-center group-hover:bg-[var(--accent-ai)]/10 transition-colors border border-[var(--card-border)]">
                  <FileText className="w-5 h-5 text-[var(--text-secondary)] group-hover:text-[var(--accent-ai)] transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[var(--text-main)] truncate group-hover:text-[var(--accent-human)] transition-colors">{a.title}</p>
                  <p className="micro-label mt-1 text-[var(--text-secondary)]">{a.status}</p>
                </div>
              </motion.button>
            ))}
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl border border-dashed border-[var(--card-border)] text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:border-[var(--accent-human)]/30 hover:bg-[var(--bg-stream)] transition-all group"
          >
            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
            <span className="text-sm font-bold">Initialize New Asset</span>
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex-1 flex flex-col min-h-0"
    >
      <div className="p-6 border-b border-[var(--card-border)] flex items-center justify-between bg-[var(--bg-main)]">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold bg-[var(--accent-ai)]/20 text-[var(--accent-ai)] px-2 py-0.5 rounded uppercase tracking-wider">
            {asset.status}
          </span>
          <span className="text-[10px] text-[var(--text-secondary)] flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Modified 2m ago
          </span>
        </div>
        <div className="flex items-center gap-1">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            className="p-2 hover:bg-[var(--bg-stream)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-main)] transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            className="p-2 hover:bg-[var(--bg-stream)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-main)] transition-colors"
          >
            <MoreVertical className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-10">
        <div className="space-y-4">
          <h1 className="editorial-title text-[var(--text-main)]">
            {asset.title}
          </h1>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full overflow-hidden border border-[var(--card-border)]">
                <img src="https://picsum.photos/seed/alex/50/50" alt="Alex" className="w-full h-full object-cover" />
              </div>
              <span className="text-xs font-medium text-[var(--text-secondary)]">Alex Rivera</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
              <Globe className="w-3.5 h-3.5" />
              <span>Public Access</span>
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose dark:prose-invert prose-slate prose-sm max-w-none text-[var(--text-main)] leading-relaxed bg-[var(--card-bg)] p-8 rounded-[2rem] border border-[var(--card-border)] shadow-inner"
        >
          <ReactMarkdown>{asset.content}</ReactMarkdown>
        </motion.div>
      </div>

      <div className="p-6 border-t border-[var(--card-border)] bg-[var(--bg-main)]/50 backdrop-blur-md">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 bg-[var(--accent-human)] text-white font-bold rounded-xl flex items-center justify-center gap-2 luminous-button"
        >
          <Edit3 className="w-4 h-4" />
          Live Edit in Chat
        </motion.button>
      </div>
    </motion.div>
  );
}
