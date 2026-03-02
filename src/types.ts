export interface Channel {
  id: string;
  name: string;
}

export interface Message {
  id: string;
  channelId: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: string;
  threadId?: string;
  isAgent?: boolean;
  metadata?: any;
}

export interface CMSAsset {
  id: string;
  title: string;
  content: string;
  status: 'draft' | 'published';
  lastModified: string;
}
