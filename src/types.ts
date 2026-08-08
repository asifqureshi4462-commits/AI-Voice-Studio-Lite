export interface VoiceCharacter {
  id: string;
  name: string;
  gender: 'Male' | 'Female' | 'Neutral';
  category: string;
  avatar: string;
  description: string;
  styleCount: number;
  isPopular: boolean;
  isPremium: boolean;
  sampleAudioUrl?: string;
  pitchOffset?: number;
}

export interface VoiceLanguage {
  code: string;
  name: string;
  nativeName: string;
  flagEmoji: string;
}

export interface VoiceStyle {
  id: string;
  name: string;
  description: string;
  iconName: string;
}

export interface GeneratedAudio {
  id: string;
  textPrompt: string;
  characterName: string;
  language: string;
  voiceStyle: string;
  speed: number;
  pitch: number;
  durationSeconds: number;
  createdAtTimestamp: number;
  audioPath: string;
  isFavorite: boolean;
  isDownloaded: boolean;
  providerName: string;
  fileSizeFormatted: string;
}

export interface ApiProviderConfig {
  providerId: string;
  providerName: string;
  baseUrl: string;
  apiKey: string;
  isEnabled: boolean;
  isDefault: boolean;
  maxTextLength: number;
  icon: string;
}

export interface ProjectFile {
  path: string;
  name: string;
  type: 'java' | 'xml' | 'gradle' | 'json' | 'yml' | 'md' | 'php' | 'sql';
  category: 'manifest' | 'java' | 'layout' | 'values' | 'gradle' | 'ci' | 'php_api' | 'php_admin' | 'database';
  project: 'android' | 'backend';
  content: string;
}
