import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BarChart3, TrendingUp, Users, Zap, Calendar, Filter, MessageSquare, Clock, Star } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const activityData = [
  { name: 'Mon', messages: 4000, tasks: 2400 },
  { name: 'Tue', messages: 3000, tasks: 1398 },
  { name: 'Wed', messages: 2000, tasks: 9800 },
  { name: 'Thu', messages: 2780, tasks: 3908 },
  { name: 'Fri', messages: 1890, tasks: 4800 },
  { name: 'Sat', messages: 2390, tasks: 3800 },
  { name: 'Sun', messages: 3490, tasks: 4300 },
];

const agentPerformanceData = [
  { name: 'Content-Bot', completed: 120, time: 1.2, rating: 4.8 },
  { name: 'Social-Scheduler', completed: 85, time: 0.8, rating: 4.5 },
  { name: 'Data-Analyst', completed: 45, time: 2.5, rating: 4.9 },
  { name: 'Design-Bot', completed: 60, time: 3.1, rating: 4.7 },
];

export default function AnalyticsDashboard() {
  const [dateRange, setDateRange] = useState('Last 7 Days');
  const [selectedAgent, setSelectedAgent] = useState('All Agents');

  return (
    <div className="flex-1 flex flex-col h-full bg-[var(--bg-stream)] overflow-y-auto">
      <header className="h-20 flex items-center justify-between px-8 border-b border-[var(--card-border)] bg-[var(--bg-main)]/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent-ai)]/10 border border-[var(--accent-ai)]/20 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-[var(--accent-ai)]" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[var(--text-main)] tracking-tight leading-none">Analytics & Insights</h2>
            <p className="micro-label mt-1 text-[var(--text-secondary)]">Workspace & AI Performance</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="appearance-none bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl py-2 pl-10 pr-8 text-sm font-medium text-[var(--text-main)] focus:outline-none focus:border-[var(--accent-human)]/30 transition-all"
            >
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Quarter</option>
            </select>
            <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
          </div>
          <div className="relative">
            <select 
              value={selectedAgent}
              onChange={(e) => setSelectedAgent(e.target.value)}
              className="appearance-none bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl py-2 pl-10 pr-8 text-sm font-medium text-[var(--text-main)] focus:outline-none focus:border-[var(--accent-human)]/30 transition-all"
            >
              <option>All Agents</option>
              <option>Content-Bot</option>
              <option>Social-Scheduler</option>
              <option>Data-Analyst</option>
            </select>
            <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
          </div>
        </div>
      </header>

      <div className="flex-1 p-8 max-w-7xl mx-auto w-full space-y-8">
        {/* AI Verbal Summary */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-6 relative overflow-hidden group border border-[var(--accent-ai)]/20 bg-[var(--accent-ai)]/5"
        >
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-[var(--accent-ai)]/20 rounded-full blur-3xl group-hover:bg-[var(--accent-ai)]/30 transition-colors duration-700" />
          <div className="relative z-10 flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--accent-ai)] to-[var(--accent-human)] flex items-center justify-center agent-glow shadow-[var(--shadow-glow-cyan)] flex-shrink-0">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h4 className="text-base font-bold text-[var(--text-main)]">AI Verbal Summary</h4>
                <span className="text-[10px] font-bold bg-[var(--accent-ai)]/10 text-[var(--accent-ai)] border border-[var(--accent-ai)]/20 px-1.5 py-0.5 rounded uppercase tracking-widest">CircleBot</span>
              </div>
              <p className="text-sm text-[var(--text-main)] leading-relaxed">
                Workspace activity is up <span className="text-emerald-500 font-bold">15%</span> compared to last week. The <span className="font-mono text-xs bg-[var(--bg-stream)] px-1 rounded border border-[var(--card-border)]">#design</span> channel productivity has increased significantly since <strong>Content-Bot</strong> started managing briefs. Agent response times remain optimal, averaging 1.8s across all tasks.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-panel p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-blue-500" />
              </div>
              <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg">+12.5%</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[var(--text-main)]">24,592</h3>
              <p className="text-sm text-[var(--text-secondary)]">Total Messages</p>
            </div>
          </div>
          <div className="glass-panel p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-500" />
              </div>
              <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg">+5.2%</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[var(--text-main)]">1,204</h3>
              <p className="text-sm text-[var(--text-secondary)]">Active Users</p>
            </div>
          </div>
          <div className="glass-panel p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-emerald-500" />
              </div>
              <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg">+22.4%</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[var(--text-main)]">8,430</h3>
              <p className="text-sm text-[var(--text-secondary)]">AI Tasks Completed</p>
            </div>
          </div>
          <div className="glass-panel p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-500" />
              </div>
              <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg">-0.4s</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[var(--text-main)]">1.8s</h3>
              <p className="text-sm text-[var(--text-secondary)]">Avg. Agent Response</p>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-panel p-6">
            <h3 className="text-lg font-bold text-[var(--text-main)] mb-6">Workspace Activity</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent-human)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--accent-human)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent-ai)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--accent-ai)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--card-border)" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)', borderRadius: '12px', color: 'var(--text-main)' }}
                    itemStyle={{ color: 'var(--text-main)' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                  <Area type="monotone" dataKey="messages" name="Messages" stroke="var(--accent-human)" strokeWidth={2} fillOpacity={1} fill="url(#colorMessages)" />
                  <Area type="monotone" dataKey="tasks" name="AI Tasks" stroke="var(--accent-ai)" strokeWidth={2} fillOpacity={1} fill="url(#colorTasks)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-panel p-6">
            <h3 className="text-lg font-bold text-[var(--text-main)] mb-6">Agent Performance</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={agentPerformanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--card-border)" />
                  <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis yAxisId="left" orientation="left" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis yAxisId="right" orientation="right" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)', borderRadius: '12px', color: 'var(--text-main)' }}
                    cursor={{ fill: 'var(--bg-stream)' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                  <Bar yAxisId="left" dataKey="completed" name="Tasks Completed" fill="var(--accent-ai)" radius={[4, 4, 0, 0]} barSize={30} />
                  <Bar yAxisId="right" dataKey="rating" name="Avg Rating" fill="var(--accent-human)" radius={[4, 4, 0, 0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
