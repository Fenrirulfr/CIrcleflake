import { useState, useCallback } from 'react';

export interface AgentStep {
  id: string;
  message: string;
  status: 'pending' | 'active' | 'completed' | 'error';
}

export function useAgent() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentSteps, setCurrentSteps] = useState<AgentStep[]>([]);

  const executeSteps = async (steps: string[]) => {
    setIsProcessing(true);
    const initialSteps = steps.map((s, i) => ({
      id: `step-${i}`,
      message: s,
      status: 'pending' as const
    }));
    setCurrentSteps(initialSteps);

    for (let i = 0; i < initialSteps.length; i++) {
      setCurrentSteps(prev => prev.map((step, idx) => 
        idx === i ? { ...step, status: 'active' } : step
      ));
      
      // Simulate work
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setCurrentSteps(prev => prev.map((step, idx) => 
        idx === i ? { ...step, status: 'completed' } : step
      ));
    }
    
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentSteps([]);
    }, 1000);
  };

  const syncCMSWithChat = useCallback(async (assetId: string, channelId: string, status: string = 'draft') => {
    await executeSteps([
      `Locating asset ${assetId} in CMS...`,
      `Formatting high-fidelity preview card...`,
      `Pushing to channel ${channelId}...`
    ]);
    
    // Return the JSON payload for the UI to render
    return {
      action: "sync_cms",
      asset_id: assetId,
      channel_id: channelId,
      preview_card: {
        title: "CMS Asset Preview",
        status: status,
        warning: status === 'draft' ? "This asset is currently a Draft and not ready for production." : null,
        render_badge: status === 'draft'
      }
    };
  }, []);

  const generateContentFromThread = useCallback(async (channelId: string) => {
    await executeSteps([
      `Reading last 20 messages in ${channelId}...`,
      `Extracting key topics and decisions...`,
      `Generating Markdown draft...`,
      `Saving to CMS Living Library...`
    ]);
    
    return {
      action: "generate_content",
      channel_id: channelId,
      status: "success",
      new_asset_id: `draft_${Date.now()}`
    };
  }, []);

  const automateDistribution = useCallback(async (assetId: string) => {
    await executeSteps([
      `Analyzing asset ${assetId} for optimal channels...`,
      `Generating social media copy...`,
      `Scheduling for distribution...`
    ]);
    
    return {
      action: "automate_distribution",
      asset_id: assetId,
      status: "scheduled"
    };
  }, []);

  const improveTone = useCallback(async (assetId: string) => {
    await executeSteps([
      `Analyzing asset ${assetId}...`,
      `Applying professional tone...`,
      `Updating CMS draft...`
    ]);
    return { action: "improve_tone", status: "success" };
  }, []);

  const summarizeForSlack = useCallback(async (assetId: string) => {
    await executeSteps([
      `Reading asset ${assetId}...`,
      `Extracting key points...`,
      `Formatting for Slack...`
    ]);
    return { action: "summarize_for_slack", status: "success" };
  }, []);

  const checkSEO = useCallback(async (assetId: string) => {
    await executeSteps([
      `Scanning asset ${assetId}...`,
      `Analyzing keyword density...`,
      `Generating SEO report...`
    ]);
    return { action: "check_seo", status: "success" };
  }, []);

  return {
    isProcessing,
    currentSteps,
    syncCMSWithChat,
    generateContentFromThread,
    automateDistribution,
    improveTone,
    summarizeForSlack,
    checkSEO
  };
}
