import { useState, useCallback } from 'react';

interface AIResponse {
  action?: string;
  duration?: number;
  message?: string;
}

export function useAIModel() {
  const [isThinking, setIsThinking] = useState(false);

  const processCommand = useCallback(async (command: string): Promise<AIResponse> => {
    setIsThinking(true);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsThinking(false);
        if (command.trim() === '/status') {
          resolve({
            action: 'showAgentThinking',
            duration: 1500,
            message: '```json\n{\n  "action": "showAgentThinking",\n  "duration": 1500\n}\n```'
          });
        } else if (command.trim() === '/summarize') {
          resolve({
            action: 'summarize',
            duration: 2000,
            message: '```json\n{\n  "action": "summarize",\n  "duration": 2000\n}\n```'
          });
        } else {
          resolve({
            message: `Processed command: ${command}`
          });
        }
      }, 500); // Simulate network latency
    });
  }, []);

  return { isThinking, processCommand };
}
