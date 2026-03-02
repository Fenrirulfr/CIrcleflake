import React, { useState, useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  Position,
  NodeProps
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Zap, MessageSquare, FileText, Share2, Play, Plus, Settings } from 'lucide-react';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Custom Node Components
const TriggerNode = ({ data, isConnectable }: NodeProps) => {
  return (
    <div className="glass-panel p-4 rounded-xl border-2 border-emerald-500/30 bg-[var(--card-bg)] shadow-sm min-w-[200px] group relative">
      <button 
        className="absolute top-2 right-2 p-1.5 rounded-lg bg-[var(--bg-stream)] border border-[var(--card-border)] text-[var(--text-secondary)] hover:text-[var(--text-main)] opacity-0 group-hover:opacity-100 transition-opacity cf-focus min-w-[44px] min-h-[44px] flex items-center justify-center"
        aria-label="Settings for Trigger"
      >
        <Settings className="w-3 h-3" aria-hidden="true" />
      </button>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
          <MessageSquare className="w-4 h-4 text-emerald-500" aria-hidden="true" />
        </div>
        <div>
          <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Trigger</div>
          <div className="text-sm font-bold text-[var(--text-main)]">{data.label as string}</div>
        </div>
      </div>
      <Handle type="source" position={Position.Right} isConnectable={isConnectable} className="w-3 h-3 bg-emerald-500 border-2 border-[var(--card-bg)]" />
    </div>
  );
};

const AgentNode = ({ data, isConnectable, selected }: NodeProps) => {
  return (
    <div className={cn(
      "glass-panel p-4 rounded-xl border-2 bg-[var(--card-bg)] shadow-sm min-w-[200px] transition-all duration-300 group relative",
      data.isActive ? "border-[var(--accent-ai)] shadow-[var(--shadow-glow-cyan)]" : "border-[var(--accent-ai)]/30",
      selected && "ring-2 ring-[var(--accent-ai)] ring-offset-2 ring-offset-[var(--bg-main)]"
    )}>
      <button 
        onClick={() => {
          console.log(JSON.stringify({
            model_id: "gemini-1.5-pro",
            context_source_id: "msg_12345",
            output_channel_id: "ch_marketing",
            action: "generate_blog",
            parameters: {
              tone: "professional",
              length: "medium"
            }
          }, null, 2));
        }}
        className="absolute top-2 right-2 p-1.5 rounded-lg bg-[var(--bg-stream)] border border-[var(--card-border)] text-[var(--text-secondary)] hover:text-[var(--text-main)] opacity-0 group-hover:opacity-100 transition-opacity cf-focus min-w-[44px] min-h-[44px] flex items-center justify-center"
        aria-label="Settings for AI Agent"
      >
        <Settings className="w-3 h-3" aria-hidden="true" />
      </button>
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} className="w-3 h-3 bg-[var(--accent-ai)] border-2 border-[var(--card-bg)]" />
      <div className="flex items-center gap-3 mb-2">
        <div className={cn(
          "w-8 h-8 rounded-lg flex items-center justify-center",
          data.isActive ? "bg-gradient-to-br from-[var(--accent-ai)] to-[var(--accent-human)] agent-glow" : "bg-[var(--accent-ai)]/10"
        )}>
          <Zap className={cn("w-4 h-4", data.isActive ? "text-white animate-pulse motion-reduce:animate-none" : "text-[var(--accent-ai)]")} aria-hidden="true" />
        </div>
        <div>
          <div className="text-[10px] font-bold text-[var(--accent-ai)] uppercase tracking-widest">AI Agent</div>
          <div className="text-sm font-bold text-[var(--text-main)]">{data.label as string}</div>
        </div>
      </div>
      <Handle type="source" position={Position.Right} isConnectable={isConnectable} className="w-3 h-3 bg-[var(--accent-ai)] border-2 border-[var(--card-bg)]" />
    </div>
  );
};

const ActionNode = ({ data, isConnectable }: NodeProps) => {
  return (
    <div className="glass-panel p-4 rounded-xl border-2 border-[var(--accent-human)]/30 bg-[var(--card-bg)] shadow-sm min-w-[200px] group relative">
      <button 
        className="absolute top-2 right-2 p-1.5 rounded-lg bg-[var(--bg-stream)] border border-[var(--card-border)] text-[var(--text-secondary)] hover:text-[var(--text-main)] opacity-0 group-hover:opacity-100 transition-opacity cf-focus min-w-[44px] min-h-[44px] flex items-center justify-center"
        aria-label="Settings for Action"
      >
        <Settings className="w-3 h-3" aria-hidden="true" />
      </button>
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} className="w-3 h-3 bg-[var(--accent-human)] border-2 border-[var(--card-bg)]" />
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-lg bg-[var(--accent-human)]/10 flex items-center justify-center">
          <Share2 className="w-4 h-4 text-[var(--accent-human)]" aria-hidden="true" />
        </div>
        <div>
          <div className="text-[10px] font-bold text-[var(--accent-human)] uppercase tracking-widest">Action</div>
          <div className="text-sm font-bold text-[var(--text-main)]">{data.label as string}</div>
        </div>
      </div>
    </div>
  );
};

const nodeTypes = {
  trigger: TriggerNode,
  agent: AgentNode,
  action: ActionNode,
};

const initialNodes = [
  { id: '1', type: 'trigger', position: { x: 100, y: 200 }, data: { label: 'New Message in #marketing' } },
  { id: '2', type: 'agent', position: { x: 400, y: 200 }, data: { label: 'Agent: Generate Blog', isActive: false } },
  { id: '3', type: 'action', position: { x: 700, y: 200 }, data: { label: 'Publish to LinkedIn' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: 'var(--accent-ai)', strokeWidth: 2 } },
  { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: 'var(--accent-human)', strokeWidth: 2 } },
];

interface AutomationCanvasProps {
  onRunWorkflow?: () => void;
}

export default function AutomationCanvas({ onRunWorkflow }: AutomationCanvasProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isRunning, setIsRunning] = useState(false);

  const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const handleRun = async () => {
    setIsRunning(true);
    
    // Simulate execution flow
    setNodes(nds => nds.map(n => n.id === '2' ? { ...n, data: { ...n.data, isActive: true } } : n));
    
    if (onRunWorkflow) {
      await onRunWorkflow();
    } else {
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
    
    setNodes(nds => nds.map(n => n.id === '2' ? { ...n, data: { ...n.data, isActive: false } } : n));
    setIsRunning(false);
  };

  const handleAddNode = () => {
    const newNode = {
      id: `node_${Date.now()}`,
      type: 'agent',
      position: { x: 250 + Math.random() * 100, y: 250 + Math.random() * 100 },
      data: { label: 'New Agent', isActive: false }
    };
    setNodes((nds) => nds.concat(newNode));
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[var(--bg-main)]">
      <header className="h-20 flex items-center justify-between px-8 border-b border-[var(--card-border)] bg-[var(--bg-main)]/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent-ai)]/10 border border-[var(--accent-ai)]/20 flex items-center justify-center">
            <Zap className="w-5 h-5 text-[var(--accent-ai)]" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[var(--text-main)] tracking-tight leading-none">Automation Canvas</h2>
            <p className="micro-label mt-1 text-[var(--text-secondary)]">Visual Workflow Builder</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={handleAddNode}
            className="px-4 py-2 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl text-sm font-medium text-[var(--text-main)] hover:border-[var(--accent-human)]/30 transition-colors flex items-center gap-2 shadow-sm cf-focus min-h-[44px]"
            aria-label="Add Node"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            Add Node
          </button>
          <button 
            onClick={handleRun}
            disabled={isRunning}
            className={cn(
              "px-4 py-2 text-white rounded-xl text-sm font-medium transition-colors flex items-center gap-2 shadow-sm cf-focus min-h-[44px]",
              isRunning ? "bg-[var(--accent-ai)]/50 cursor-not-allowed" : "bg-[var(--accent-ai)] hover:bg-[var(--accent-ai)]/90 luminous-button"
            )}
            aria-label={isRunning ? 'Executing workflow' : 'Run Workflow'}
          >
            <Play className="w-4 h-4" aria-hidden="true" />
            {isRunning ? 'Executing...' : 'Run Workflow'}
          </button>
        </div>
      </header>

      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          className="bg-[var(--bg-stream)]"
        >
          <Background color="var(--card-border)" gap={16} />
          <Controls className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl shadow-sm overflow-hidden" />
          <MiniMap 
            nodeColor={(node) => {
              switch (node.type) {
                case 'trigger': return '#10b981';
                case 'agent': return '#22d3ee';
                case 'action': return '#6366f1';
                default: return '#eee';
              }
            }}
            className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl shadow-sm"
          />
        </ReactFlow>
      </div>
    </div>
  );
}
