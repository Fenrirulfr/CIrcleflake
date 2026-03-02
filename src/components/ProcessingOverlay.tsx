import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, CheckCircle2, Circle, Zap } from 'lucide-react';
import { AgentStep } from '../hooks/useAgent';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ProcessingOverlayProps {
  isProcessing: boolean;
  steps: AgentStep[];
}

export default function ProcessingOverlay({ isProcessing, steps }: ProcessingOverlayProps) {
  return (
    <AnimatePresence>
      {isProcessing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className={cn(
              "w-full max-w-md p-6 rounded-2xl bg-[var(--card-bg)] shadow-2xl",
              "border-2",
              "dark:border-[var(--accent-ai)] dark:shadow-[var(--shadow-glow-cyan)] dark:animate-pulse-slow",
              "border-[#0ea5e9]" // Electric Blue in light mode
            )}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-ai)]/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-[var(--accent-ai)]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[var(--text-main)] tracking-tight">Agent Processing</h3>
                <p className="text-xs text-[var(--text-secondary)] uppercase tracking-widest">Executing Workflow</p>
              </div>
            </div>

            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {step.status === 'completed' ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : step.status === 'active' ? (
                      <Loader2 className="w-5 h-5 text-[var(--accent-ai)] animate-spin" />
                    ) : (
                      <Circle className="w-5 h-5 text-[var(--text-secondary)]/50" />
                    )}
                  </div>
                  <div>
                    <p className={cn(
                      "text-sm font-medium transition-colors",
                      step.status === 'active' ? "text-[var(--text-main)]" :
                      step.status === 'completed' ? "text-[var(--text-secondary)]" :
                      "text-[var(--text-secondary)]/50"
                    )}>
                      Step {index + 1}: {step.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
