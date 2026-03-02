import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { Channel, Message, CMSAsset } from './types';
import Sidebar from './components/Sidebar';
import ChatStream from './components/ChatStream';
import CMSPreviewPanel from './components/CMSPreviewPanel';
import WelcomeFeed from './components/WelcomeFeed';
import LandingPage from './components/LandingPage';
import SettingsPage from './components/SettingsPage';
import IntelligenceHub from './components/IntelligenceHub';
import CMSLibrary from './components/CMSLibrary';
import AutomationCanvas from './components/AutomationCanvas';
import DashboardView from './components/DashboardView';
import ProfilePage from './components/ProfilePage';
import InfoPage, { InfoPageType } from './components/InfoPage';
import { motion, AnimatePresence } from 'motion/react';
import { Layout, MessageSquare, FileText, Bot, Settings, Search, AlertCircle, X } from 'lucide-react';
import { useAIModel } from './hooks/useAIModel';
import { useAgent } from './hooks/useAgent';
import ProcessingOverlay from './components/ProcessingOverlay';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [view, setView] = useState<'landing' | 'welcome' | 'dashboard' | 'settings' | 'intelligence-hub' | 'cms' | 'automation' | 'analytics' | 'profile' | InfoPageType>('landing');
  const [channels, setChannels] = useState<Channel[]>([]);
  const [activeChannel, setActiveChannel] = useState<string>('general');
  const [messages, setMessages] = useState<Message[]>([]);
  const [cmsAssets, setCmsAssets] = useState<CMSAsset[]>([]);
  const [activeAsset, setActiveAsset] = useState<CMSAsset | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAgentThinking, setIsAgentThinking] = useState(false);
  const [agentError, setAgentError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') || 
             window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });
  
  const { processCommand } = useAIModel();
  const { isProcessing, currentSteps, syncCMSWithChat, generateContentFromThread, automateDistribution, improveTone, summarizeForSlack, checkSEO } = useAgent();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    if (view !== 'landing') {
      const newSocket = io();
      setSocket(newSocket);

      // Initial data fetch
      fetch('/api/channels').then(res => res.json()).then(setChannels);
      fetch('/api/cms/assets').then(res => res.json()).then(setCmsAssets);

      return () => {
        newSocket.close();
      };
    }
  }, [view]);

  useEffect(() => {
    if (!socket || view === 'landing') return;

    socket.emit('join-channel', activeChannel);
    fetch(`/api/messages/${activeChannel}`).then(res => res.json()).then(setMessages);

    const handleNewMessage = (msg: Message) => {
      if (msg.channelId === activeChannel) {
        setMessages(prev => [...prev, msg]);
      }
    };

    socket.on('new-message', handleNewMessage);

    return () => {
      socket.off('new-message', handleNewMessage);
    };
  }, [socket, activeChannel, view]);

  const sendMessage = async (content: string, threadId?: string, metadata?: any) => {
    if (!socket) return;

    const msg: Message = {
      id: `msg-${Date.now()}`,
      channelId: activeChannel,
      userId: 'user-1',
      userName: 'Alex Rivera',
      content,
      timestamp: new Date().toISOString(),
      threadId,
      metadata
    };

    socket.emit('send-message', msg);

    // Show thinking state if it's a command
    if (content.startsWith('/')) {
      setIsAgentThinking(true);
      
      const response = await processCommand(content);
      
      if (response.action === 'showAgentThinking' && response.duration) {
        // Send the JSON block message immediately
        const agentMsg: Message = {
          id: `msg-${Date.now()}`,
          channelId: activeChannel,
          userId: 'agent-1',
          userName: 'CircleBot',
          content: response.message || '',
          timestamp: new Date().toISOString(),
          isAgent: true,
          threadId
        };
        socket.emit('send-message', agentMsg);

        // Keep thinking state for the specified duration
        setTimeout(() => {
          setIsAgentThinking(false);
          // Optionally send a follow-up message after thinking
          const followUpMsg: Message = {
            id: `msg-${Date.now() + 1}`,
            channelId: activeChannel,
            userId: 'agent-1',
            userName: 'CircleBot',
            content: 'Status check complete. All systems nominal.',
            timestamp: new Date().toISOString(),
            isAgent: true,
            threadId
          };
          socket.emit('send-message', followUpMsg);
        }, response.duration);
      } else if (response.action === 'summarize' && response.duration) {
        // Send the JSON block message immediately
        const agentMsg: Message = {
          id: `msg-${Date.now()}`,
          channelId: activeChannel,
          userId: 'agent-1',
          userName: 'CircleBot',
          content: response.message || '',
          timestamp: new Date().toISOString(),
          isAgent: true,
          threadId
        };
        socket.emit('send-message', agentMsg);

        setTimeout(() => {
          setIsAgentThinking(false);
          const followUpMsg: Message = {
            id: `msg-${Date.now() + 1}`,
            channelId: activeChannel,
            userId: 'agent-1',
            userName: 'CircleBot',
            content: 'Here is the summary of the recent messages.',
            timestamp: new Date().toISOString(),
            isAgent: true,
            threadId,
            metadata: {
              type: 'summary',
              content: '• The team discussed the upcoming Q3 Campaign Strategy.\n• Sarah updated the CMS draft and Alex requested a review.\n• The Design Bot notified the team that new assets are ready for review.'
            }
          };
          socket.emit('send-message', followUpMsg);
        }, response.duration);
      } else {
        setIsAgentThinking(false);
        const agentMsg: Message = {
          id: `msg-${Date.now()}`,
          channelId: activeChannel,
          userId: 'agent-1',
          userName: 'CircleBot',
          content: response.message || '',
          timestamp: new Date().toISOString(),
          isAgent: true,
          threadId
        };
        socket.emit('send-message', agentMsg);
      }
    } else if (
      content.toLowerCase().includes('generate a cms draft') || 
      content.toLowerCase().includes('summarize this') ||
      content.toLowerCase().includes('schedule this for distribution') ||
      content.toLowerCase().includes('analyze the sentiment') ||
      content.toLowerCase().includes('error')
    ) {
      // Handle natural language agent commands
      if (content.toLowerCase().includes('error')) {
        setAgentError("JSON Validation Failed: Missing required parameter 'target_tone' in tool call 'improve_tone'.");
        setTimeout(() => setAgentError(null), 5000);
      } else if (content.toLowerCase().includes('generate a cms draft')) {
        const payload = await generateContentFromThread(activeChannel);
        const agentMsg: Message = {
          id: `msg-${Date.now()}`,
          channelId: activeChannel,
          userId: 'agent-1',
          userName: 'CircleBot',
          content: `I've generated a new CMS draft based on this thread.\n\n\`\`\`json\n${JSON.stringify(payload, null, 2)}\n\`\`\``,
          timestamp: new Date().toISOString(),
          isAgent: true,
          threadId
        };
        socket.emit('send-message', agentMsg);
      } else if (content.toLowerCase().includes('summarize this')) {
        setIsAgentThinking(true);
        setTimeout(() => {
          setIsAgentThinking(false);
          const followUpMsg: Message = {
            id: `msg-${Date.now() + 1}`,
            channelId: activeChannel,
            userId: 'agent-1',
            userName: 'CircleBot',
            content: 'Here is the summary of the recent messages.',
            timestamp: new Date().toISOString(),
            isAgent: true,
            threadId,
            metadata: {
              type: 'summary',
              content: '• The team discussed the upcoming Q3 Campaign Strategy.\n• Sarah updated the CMS draft and Alex requested a review.\n• The Design Bot notified the team that new assets are ready for review.'
            }
          };
          socket.emit('send-message', followUpMsg);
        }, 2000);
      } else if (content.toLowerCase().includes('schedule this for distribution')) {
        const payload = await automateDistribution('asset_123');
        const agentMsg: Message = {
          id: `msg-${Date.now()}`,
          channelId: activeChannel,
          userId: 'agent-1',
          userName: 'CircleBot',
          content: `I've scheduled the asset for distribution.\n\n\`\`\`json\n${JSON.stringify(payload, null, 2)}\n\`\`\``,
          timestamp: new Date().toISOString(),
          isAgent: true,
          threadId
        };
        socket.emit('send-message', agentMsg);
      } else if (content.toLowerCase().includes('analyze the sentiment')) {
        setIsAgentThinking(true);
        setTimeout(() => {
          setIsAgentThinking(false);
          const followUpMsg: Message = {
            id: `msg-${Date.now() + 1}`,
            channelId: activeChannel,
            userId: 'agent-1',
            userName: 'CircleBot',
            content: 'Sentiment Analysis Complete: The overall tone of this thread is **Positive (85%)** and **Collaborative**.',
            timestamp: new Date().toISOString(),
            isAgent: true,
            threadId
          };
          socket.emit('send-message', followUpMsg);
        }, 2000);
      }
    }
  };



  const handleAssetSelect = (asset: CMSAsset) => {
    setActiveAsset(asset);
  };

  if (view === 'landing') {
    return <LandingPage onGetStarted={() => setView('dashboard')} onNavigate={(v) => setView(v as any)} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />;
  }

  const renderContent = () => {
    switch (view) {
      case 'welcome':
        return <WelcomeFeed onNavigate={(v, id) => {
          setView(v as any);
          if (id && v === 'dashboard') {
            // Optionally handle channel selection if id was a channel id
          }
        }} />;
      case 'dashboard':
        return (
          <>
            <main className="flex-1 flex flex-col min-w-0 border-r border-[var(--card-border)] relative bg-[var(--bg-stream)]">
              <header className="h-20 flex items-center justify-between px-8 border-b border-[var(--card-border)] bg-[var(--bg-main)]/50 backdrop-blur-2xl sticky top-0 z-10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-[var(--accent-human)]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[var(--text-main)] tracking-tight leading-none">
                      #{channels.find(c => c.id === activeChannel)?.name || activeChannel}
                    </h2>
                    <p className="micro-label mt-1 text-[var(--text-secondary)]">Active Agent Stream</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="relative hidden lg:block">
                    <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
                    <input 
                      type="text" 
                      placeholder="Search history..." 
                      className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-full py-2.5 pl-11 pr-6 text-sm focus:outline-none focus:border-[var(--accent-human)]/30 transition-all w-64 placeholder:text-[var(--text-secondary)] text-[var(--text-main)]"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setView('landing')}
                      className="p-2.5 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl transition-all text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-[var(--bg-stream)]"
                      title="Back to Landing"
                    >
                      <Layout className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => setView('settings')}
                      className="p-2.5 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl transition-all text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-[var(--bg-stream)]"
                    >
                      <Settings className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </header>

              <ChatStream 
                messages={messages} 
                onSendMessage={sendMessage}
                onAssetSelect={handleAssetSelect}
                isAgentThinking={isAgentThinking}
              />
            </main>

            <aside className="cms-panel-visibility bg-[var(--sidebar-bg)] backdrop-blur-2xl">
              <header className="h-20 flex items-center px-8 border-b border-[var(--card-border)]">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center">
                    <FileText className="w-5 h-5 text-[var(--accent-ai)]" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[var(--text-main)] tracking-tight leading-none">Living Library</h2>
                    <p className="micro-label mt-1 text-[var(--text-secondary)]">Contextual CMS Preview</p>
                  </div>
                </div>
              </header>
              <CMSPreviewPanel 
                assets={cmsAssets}
                onContextualize={(assetId) => sendMessage('', undefined, { type: 'cms-preview', assetId })}
              />
            </aside>
          </>
        );
      case 'settings':
        return <SettingsPage onBack={() => setView('dashboard')} />;
      case 'intelligence-hub':
        return <IntelligenceHub />;
      case 'cms':
        return <CMSLibrary 
          assets={cmsAssets} 
          channels={channels}
          onAssetSelect={handleAssetSelect} 
          onShare={async (assetId, channelId) => {
            setActiveChannel(channelId);
            const payload = await syncCMSWithChat(assetId, channelId, 'draft');
            sendMessage('', undefined, { type: 'cms-preview', assetId, ...payload });
            setView('dashboard');
          }}
          onImproveTone={improveTone}
          onSummarizeForSlack={summarizeForSlack}
          onCheckSEO={checkSEO}
        />;
      case 'automation':
        return <AutomationCanvas onRunWorkflow={() => automateDistribution('asset_123')} />;
      case 'analytics':
        return <DashboardView />;
      case 'profile':
        return <ProfilePage onBack={() => setView('dashboard')} />;
      case 'capabilities':
      case 'intelligence':
      case 'network':
      case 'security':
      case 'about':
      case 'careers':
      case 'privacy':
      case 'terms':
        return <InfoPage type={view as InfoPageType} onBack={() => setView('landing')} />;
      default:
        return null;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex h-screen w-full bg-[var(--bg-main)] overflow-hidden selection:bg-[var(--accent-human)]/30 relative text-[var(--text-main)] justify-center"
    >
      <ProcessingOverlay isProcessing={isProcessing} steps={currentSteps} />
      <AnimatePresence>
        {agentError && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-4 py-3 bg-red-500 text-white rounded-xl shadow-2xl border border-red-400 font-medium text-sm"
            role="alert"
            aria-live="assertive"
          >
            <AlertCircle className="w-5 h-5" aria-hidden="true" />
            <span>{agentError}</span>
            <button 
              onClick={() => setAgentError(null)}
              className="p-1 hover:bg-red-600 rounded-lg transition-colors ml-2 cf-focus"
              aria-label="Dismiss error"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="grain-overlay" />
      
      <div className="flex w-full max-w-screen-2xl h-full relative">
        <div className="hidden md:flex h-full">
          <Sidebar 
            channels={channels} 
            activeChannel={activeChannel} 
            onChannelSelect={(id) => {
              setActiveChannel(id);
              setView('dashboard');
            }}
            isOpen={isSidebarOpen}
            activeView={view}
            onViewChange={setView}
            isDarkMode={isDarkMode}
            toggleTheme={toggleTheme}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={view}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex overflow-hidden pb-[72px] md:pb-0"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 h-[72px] bg-[var(--card-bg)] border-t border-[var(--card-border)] flex items-center justify-around px-4 z-50 pb-safe">
          <button 
            onClick={() => setView('dashboard')}
            className={cn(
              "flex flex-col items-center justify-center min-w-[44px] min-h-[44px] gap-1 transition-colors cf-focus rounded-xl",
              view === 'dashboard' ? "text-[var(--accent-human)]" : "text-[var(--text-secondary)]"
            )}
          >
            <MessageSquare className="w-6 h-6" aria-hidden="true" />
            <span className="text-[10px] font-medium">Chat</span>
          </button>
          <button 
            onClick={() => setView('cms')}
            className={cn(
              "flex flex-col items-center justify-center min-w-[44px] min-h-[44px] gap-1 transition-colors cf-focus rounded-xl",
              view === 'cms' ? "text-[var(--accent-human)]" : "text-[var(--text-secondary)]"
            )}
          >
            <FileText className="w-6 h-6" aria-hidden="true" />
            <span className="text-[10px] font-medium">CMS</span>
          </button>
          <button 
            onClick={() => setView('automation')}
            className={cn(
              "flex flex-col items-center justify-center min-w-[44px] min-h-[44px] gap-1 transition-colors cf-focus rounded-xl",
              view === 'automation' ? "text-[var(--accent-human)]" : "text-[var(--text-secondary)]"
            )}
          >
            <Bot className="w-6 h-6" aria-hidden="true" />
            <span className="text-[10px] font-medium">Agents</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
