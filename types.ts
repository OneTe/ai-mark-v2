export interface Dataset {
  id: string;
  name: string;
  imageCount: number;
  createdTime: string;
  lastProcessedStatus: 'Success' | 'Failed' | 'In Progress';
  lastProcessedTime: string;
}

export interface ImageItem {
  id: string;
  url: string;
  status: 'Success' | 'Failed' | 'Unprocessed';
  tags?: string[];
  errorMessage?: string;
  filename: string;
}

export interface LabelStat {
  name: string;
  totalImages: number;
  evaluatedImages: number;
  accuracy: number | null; // null if N/A
  status: 'Passed' | 'Calibrating' | 'Failed';
}

export interface ExecutionHistory {
  version: string;
  time: string;
  model: string;
  status: 'Completed' | 'Failed';
  accuracy?: string;
}

export interface PromptVersion {
  id: string;
  version: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  author?: string;
}

export enum Tab {
  Overview = 'overview',
  Prompt = 'prompt',
  Calibration = 'calibration',
  History = 'history'
}
