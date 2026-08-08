import React, { useState, useEffect } from 'react';
import { 
  Mic, Play, Pause, Star, Download, Share2, Trash2, Settings, Sparkles, 
  Globe, Volume2, ShieldCheck, Zap, User, ArrowRight, CheckCircle2, Sliders,
  Key, RefreshCw, Layers, Radio, Cpu
} from 'lucide-react';
import { VoiceCharacter, VoiceLanguage, VoiceStyle, GeneratedAudio, ApiProviderConfig } from '../types';

interface AndroidSimulatorProps {
  onOpenApiArchitecture: () => void;
}

const INITIAL_CHARACTERS: VoiceCharacter[] = [
  { id: 'c1', name: 'Aria Vox', gender: 'Female', category: 'Narrator', avatar: '🎙️', description: 'Deep, warm, cinematic voice ideal for audiobooks.', styleCount: 6, isPopular: true, isPremium: false, pitchOffset: 1.1 },
  { id: 'c2', name: 'Marcus Sterling', gender: 'Male', category: 'News', avatar: '📺', description: 'Crisp, professional broadcast news anchor voice.', styleCount: 5, isPopular: true, isPremium: true, pitchOffset: 0.8 },
  { id: 'c3', name: 'Nova Cyber', gender: 'Neutral', category: 'Robot', avatar: '🤖', description: 'Futuristic sci-fi synthesizer voice.', styleCount: 4, isPopular: false, isPremium: false, pitchOffset: 1.5 },
  { id: 'c4', name: 'Sakura Chan', gender: 'Female', category: 'Anime', avatar: '✨', description: 'Energetic, expressive anime heroine voice.', styleCount: 8, isPopular: true, isPremium: false, pitchOffset: 1.4 },
  { id: 'c5', name: 'David Atten', gender: 'Male', category: 'Story', avatar: '🦉', description: 'Soothing wildlife storyteller tone.', styleCount: 7, isPopular: true, isPremium: true, pitchOffset: 0.7 },
  { id: 'c6', name: 'Leo Broadcast', gender: 'Male', category: 'Podcast', avatar: '🎧', description: 'Conversational podcast host tone.', styleCount: 5, isPopular: false, isPremium: false, pitchOffset: 0.95 }
];

const LANGUAGES: VoiceLanguage[] = [
  { code: 'en-US', name: 'English', nativeName: 'US', flagEmoji: '🇺🇸' },
  { code: 'hi-IN', name: 'Hindi', nativeName: 'हिंदी', flagEmoji: '🇮🇳' },
  { code: 'ur-PK', name: 'Urdu', nativeName: 'اردو', flagEmoji: '🇵🇰' },
  { code: 'ar-SA', name: 'Arabic', nativeName: 'العربية', flagEmoji: '🇸🇦' },
  { code: 'es-ES', name: 'Spanish', nativeName: 'Español', flagEmoji: '🇪🇸' },
  { code: 'fr-FR', name: 'French', nativeName: 'Français', flagEmoji: '🇫🇷' },
  { code: 'de-DE', name: 'German', nativeName: 'Deutsch', flagEmoji: '🇩🇪' },
  { code: 'ja-JP', name: 'Japanese', nativeName: '日本語', flagEmoji: '🇯🇵' }
];

const STYLES: VoiceStyle[] = [
  { id: 's1', name: 'Neutral', description: 'Standard balanced delivery', iconName: 'smile' },
  { id: 's2', name: 'Empathetic', description: 'Soft and warm tone', iconName: 'heart' },
  { id: 's3', name: 'Dramatic', description: 'High intensity cinematic', iconName: 'zap' },
  { id: 's4', name: 'Whisper', description: 'Quiet intimate style', iconName: 'feather' },
  { id: 's5', name: 'Excited', description: 'Fast cheerful cadence', iconName: 'sun' }
];

const INITIAL_PROVIDERS: ApiProviderConfig[] = [
  { providerId: 'dummy_provider', providerName: 'Built-in Engine (Offline/Dummy)', baseUrl: 'local://engine', apiKey: '', isEnabled: true, isDefault: true, maxTextLength: 5000, icon: 'Cpu' },
  { providerId: 'google_ai_studio', providerName: 'Google AI Studio / Gemini', baseUrl: 'https://generativelanguage.googleapis.com/v1beta', apiKey: '', isEnabled: true, isDefault: false, maxTextLength: 10000, icon: 'Sparkles' },
  { providerId: 'eleven_labs', providerName: 'ElevenLabs Voice AI', baseUrl: 'https://api.elevenlabs.io/v1', apiKey: '', isEnabled: true, isDefault: false, maxTextLength: 5000, icon: 'Zap' },
  { providerId: 'open_router', providerName: 'OpenRouter AI', baseUrl: 'https://openrouter.ai/api/v1', apiKey: '', isEnabled: true, isDefault: false, maxTextLength: 8000, icon: 'Layers' },
  { providerId: 'fish_audio', providerName: 'Fish Audio TTS', baseUrl: 'https://api.fish.audio/v1', apiKey: '', isEnabled: true, isDefault: false, maxTextLength: 6000, icon: 'Globe' }
];

export const AndroidSimulator: React.FC<AndroidSimulatorProps> = ({ onOpenApiArchitecture }) => {
  const [activeTab, setActiveTab] = useState<'home' | 'generate' | 'history' | 'downloads' | 'profile' | 'api_settings' | 'subscription'>('home');
  
  // Generator State
  const [scriptText, setScriptText] = useState("Welcome to AI Voice Studio! Transform your written text into lifelike speech instantly with extensible AI provider models.");
  const [selectedChar, setSelectedChar] = useState<VoiceCharacter>(INITIAL_CHARACTERS[0]);
  const [selectedLang, setSelectedLang] = useState<VoiceLanguage>(LANGUAGES[0]);
  const [selectedStyle, setSelectedStyle] = useState<VoiceStyle>(STYLES[0]);
  const [speed, setSpeed] = useState<number>(1.0);
  const [pitch, setPitch] = useState<number>(1.0);

  // Providers State
  const [providers, setProviders] = useState<ApiProviderConfig[]>(INITIAL_PROVIDERS);
  const [activeProviderId, setActiveProviderId] = useState<string>('dummy_provider');

  // Generation status
  const [isGenerating, setIsGenerating] = useState(false);
  const [genProgress, setGenProgress] = useState(0);

  // Audio Playback
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  // History & Downloads
  const [history, setHistory] = useState<GeneratedAudio[]>([
    {
      id: 'gen_101',
      textPrompt: 'Welcome to AI Voice Studio! Transform your written text into lifelike speech instantly.',
      characterName: 'Aria Vox',
      language: 'English',
      voiceStyle: 'Empathetic',
      speed: 1.0,
      pitch: 1.0,
      durationSeconds: 8,
      createdAtTimestamp: Date.now() - 3600000,
      audioPath: 'aria_welcome.mp3',
      isFavorite: true,
      isDownloaded: true,
      providerName: 'ElevenLabs Voice AI',
      fileSizeFormatted: '1.20 MB'
    },
    {
      id: 'gen_102',
      textPrompt: 'Welcome listeners to episode 42 of the Tech Horizons podcast.',
      characterName: 'Leo Broadcast',
      language: 'English',
      voiceStyle: 'Neutral',
      speed: 1.1,
      pitch: 1.0,
      durationSeconds: 14,
      createdAtTimestamp: Date.now() - 86400000,
      audioPath: 'leo_podcast.mp3',
      isFavorite: false,
      isDownloaded: true,
      providerName: 'Google AI Studio / Gemini',
      fileSizeFormatted: '2.10 MB'
    }
  ]);

  const activeProvider = providers.find(p => p.providerId === activeProviderId) || providers[0];

  // Speech Synth Preview
  const handlePlaySpeech = (text: string, audioId: string) => {
    if (playingAudioId === audioId) {
      window.speechSynthesis.cancel();
      setPlayingAudioId(null);
      return;
    }

    window.speechSynthesis.cancel();
    setPlayingAudioId(audioId);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = speed;
    utterance.pitch = (selectedChar.pitchOffset || 1.0) * pitch;

    utterance.onend = () => setPlayingAudioId(null);
    utterance.onerror = () => setPlayingAudioId(null);

    window.speechSynthesis.speak(utterance);
  };

  const handleGenerate = () => {
    if (!scriptText.trim()) return;

    setIsGenerating(true);
    setGenProgress(10);

    const timer = setInterval(() => {
      setGenProgress(prev => {
        if (prev >= 90) {
          clearInterval(timer);
          return 90;
        }
        return prev + 25;
      });
    }, 300);

    setTimeout(() => {
      clearInterval(timer);
      setGenProgress(100);
      setIsGenerating(false);

      const newAudio: GeneratedAudio = {
        id: 'gen_' + Date.now(),
        textPrompt: scriptText,
        characterName: selectedChar.name,
        language: selectedLang.name,
        voiceStyle: selectedStyle.name,
        speed,
        pitch,
        durationSeconds: Math.max(3, Math.floor(scriptText.length / 12)),
        createdAtTimestamp: Date.now(),
        audioPath: `speech_${selectedChar.name.toLowerCase().replace(/\s+/g, '_')}.mp3`,
        isFavorite: false,
        isDownloaded: true,
        providerName: activeProvider.providerName,
        fileSizeFormatted: `${(0.4 + scriptText.length * 0.005).toFixed(2)} MB`
      };

      setHistory(prev => [newAudio, ...prev]);
      setActiveTab('history');
      handlePlaySpeech(newAudio.textPrompt, newAudio.id);
    }, 1500);
  };

  const toggleFavorite = (id: string) => {
    setHistory(prev => prev.map(item => item.id === id ? { ...item, isFavorite: !item.isFavorite } : item));
  };

  const deleteAudio = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="flex justify-center items-center py-4">
      {/* Phone Shell */}
      <div className="w-[380px] h-[780px] bg-[#090D16] rounded-[48px] p-3 shadow-[0_25px_60px_-15px_rgba(139,92,246,0.3)] border-4 border-[#1E293B] relative flex flex-col overflow-hidden text-slate-100 font-sans">
        
        {/* Notch Header Bar */}
        <div className="h-7 w-full flex items-center justify-between px-6 pt-1 text-[11px] font-semibold text-slate-400 select-none z-20">
          <span>09:41</span>
          <div className="w-20 h-4 bg-slate-900 rounded-full border border-slate-800 flex items-center justify-center">
            <div className="w-3 h-3 bg-slate-800 rounded-full"></div>
          </div>
          <div className="flex items-center gap-1.5">
            <span>5G</span>
            <div className="w-5 h-2.5 border border-slate-400 rounded-sm p-0.5 flex items-center">
              <div className="w-full h-full bg-emerald-400 rounded-2xs"></div>
            </div>
          </div>
        </div>

        {/* Screen Content Container */}
        <div className="flex-1 overflow-y-auto px-4 pt-3 pb-20 scrollbar-none">
          
          {/* HOME TAB */}
          {activeTab === 'home' && (
            <div className="space-y-4">
              {/* Top Welcome Header */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-800 shadow-lg space-y-3">
                <div className="flex items-center justify-between bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-1 rounded-lg text-[10px] font-mono text-emerald-300">
                  <span className="flex items-center gap-1.5 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>REST API Sync</span>
                  </span>
                  <span className="text-slate-400">PHP + MySQL Backend</span>
                </div>

                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-bold text-white flex items-center gap-1.5">
                      Hello, Asif! <span className="text-sm">👋</span>
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">Ready to generate AI voice speech?</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('subscription')}
                    className="px-2.5 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-lg text-[10px] font-bold tracking-wider hover:bg-amber-500/30 transition-all"
                  >
                    PRO STUDIO
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-800/80">
                  <div>
                    <div className="text-base font-bold text-cyan-400">4,500</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">Credits Left</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-violet-400 truncate">{activeProvider.providerName}</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">Active Engine</div>
                  </div>
                </div>
              </div>

              {/* Quick Action Generate Banner */}
              <button
                onClick={() => setActiveTab('generate')}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 shadow-lg shadow-violet-950/50 active:scale-[0.98] transition-all"
              >
                <Mic className="w-4 h-4 text-cyan-300 animate-pulse" />
                <span>Create New AI Voice Speech</span>
              </button>

              {/* Category Filter Pills */}
              <div>
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Explore Categories</h3>
                <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {['All', 'Narrator', 'Male', 'Female', 'Cartoon', 'Robot', 'Anime', 'News', 'Gaming', 'Story'].map((cat, idx) => (
                    <span 
                      key={cat}
                      className={`px-3 py-1 rounded-full text-[11px] whitespace-nowrap font-medium cursor-pointer border ${
                        idx === 0 ? 'bg-violet-600/30 border-violet-500 text-violet-200' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Popular Voice Characters */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Popular AI Voices</h3>
                  <button onClick={() => setActiveTab('generate')} className="text-[11px] text-violet-400 hover:underline">See All</button>
                </div>
                <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
                  {INITIAL_CHARACTERS.map(char => (
                    <div 
                      key={char.id}
                      onClick={() => {
                        setSelectedChar(char);
                        setActiveTab('generate');
                      }}
                      className="w-36 p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-violet-500/50 flex-shrink-0 cursor-pointer transition-all hover:scale-[1.02]"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-2xl">{char.avatar}</span>
                        {char.isPremium && (
                          <span className="text-[9px] font-bold text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">PRO</span>
                        )}
                      </div>
                      <div className="font-bold text-xs text-white mt-2 truncate">{char.name}</div>
                      <div className="text-[10px] text-cyan-400 mt-0.5">{char.category} • {char.gender}</div>
                      <div className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-tight">{char.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent History Preview */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Recent Studio Generations</h3>
                  <button onClick={() => setActiveTab('history')} className="text-[11px] text-violet-400 hover:underline">View History</button>
                </div>
                <div className="space-y-2">
                  {history.slice(0, 3).map(item => (
                    <div key={item.id} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-2">
                      <button 
                        onClick={() => handlePlaySpeech(item.textPrompt, item.id)}
                        className="w-8 h-8 rounded-full bg-violet-600/30 text-violet-300 flex items-center justify-center flex-shrink-0 hover:bg-violet-600 transition-colors"
                      >
                        {playingAudioId === item.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                      </button>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-slate-200 truncate">{item.textPrompt}</div>
                        <div className="text-[10px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                          <span>{item.characterName}</span>
                          <span>•</span>
                          <span>{item.language}</span>
                          <span>•</span>
                          <span className="text-cyan-400">{item.providerName}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* GENERATOR TAB */}
          {activeTab === 'generate' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-bold text-white">AI Voice Generator</h2>
                <p className="text-xs text-slate-400">Type script &amp; select voice character parameters</p>
              </div>

              {/* Script Input Box */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 focus-within:border-violet-500 transition-colors">
                <textarea
                  value={scriptText}
                  onChange={e => setScriptText(e.target.value)}
                  rows={4}
                  placeholder="Enter script text to synthesize into speech..."
                  className="w-full bg-transparent text-xs text-slate-100 placeholder-slate-500 outline-none resize-none"
                />
                <div className="flex justify-between items-center text-[10px] text-slate-500 pt-2 border-t border-slate-800">
                  <span>{scriptText.length} / 5,000 chars</span>
                  <button onClick={() => setScriptText('')} className="hover:text-slate-300">Clear</button>
                </div>
              </div>

              {/* Character Selector */}
              <div>
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">Select Voice Character</label>
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {INITIAL_CHARACTERS.map(char => (
                    <div 
                      key={char.id}
                      onClick={() => setSelectedChar(char)}
                      className={`p-2.5 rounded-xl border flex-shrink-0 w-28 cursor-pointer transition-all ${
                        selectedChar.id === char.id 
                          ? 'bg-violet-600/20 border-violet-500 text-white shadow-md' 
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      <div className="text-xl">{char.avatar}</div>
                      <div className="text-xs font-bold truncate mt-1">{char.name}</div>
                      <div className="text-[10px] text-cyan-400">{char.category}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Language Selector */}
              <div>
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">Language</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {LANGUAGES.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => setSelectedLang(lang)}
                      className={`p-2 rounded-lg border text-center transition-all ${
                        selectedLang.code === lang.code 
                          ? 'bg-cyan-500/20 border-cyan-500 text-cyan-200' 
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      <div className="text-base">{lang.flagEmoji}</div>
                      <div className="text-[10px] font-bold truncate mt-0.5">{lang.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Voice Style / Emotion */}
              <div>
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">Emotion &amp; Delivery Style</label>
                <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {STYLES.map(st => (
                    <button
                      key={st.id}
                      onClick={() => setSelectedStyle(st)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-medium whitespace-nowrap transition-all ${
                        selectedStyle.id === st.id 
                          ? 'bg-violet-600 border-violet-500 text-white' 
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      {st.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Controls: Speed & Pitch */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                    <span>Speed Rate</span>
                    <span className="text-cyan-400 font-bold">{speed.toFixed(1)}x</span>
                  </div>
                  <input 
                    type="range" min="0.5" max="2.0" step="0.1" value={speed} 
                    onChange={e => setSpeed(parseFloat(e.target.value))}
                    className="w-full accent-violet-500"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                    <span>Pitch Height</span>
                    <span className="text-cyan-400 font-bold">{pitch.toFixed(1)}x</span>
                  </div>
                  <input 
                    type="range" min="0.5" max="2.0" step="0.1" value={pitch} 
                    onChange={e => setPitch(parseFloat(e.target.value))}
                    className="w-full accent-cyan-500"
                  />
                </div>
              </div>

              {/* Progress Bar during generation */}
              {isGenerating && (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] text-cyan-300 font-medium">
                    <span>Synthesizing speech via {activeProvider.providerName}...</span>
                    <span>{genProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-300" style={{ width: `${genProgress}%` }}></div>
                  </div>
                </div>
              )}

              {/* Main Action Generate Button */}
              <button
                disabled={isGenerating || !scriptText.trim()}
                onClick={handleGenerate}
                className="w-full py-3.5 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 rounded-xl font-bold text-sm text-white shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
              >
                {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                <span>{isGenerating ? 'Synthesizing...' : '⚡ Generate AI Voice Speech'}</span>
              </button>
            </div>
          )}

          {/* HISTORY TAB */}
          {activeTab === 'history' && (
            <div className="space-y-3">
              <div>
                <h2 className="text-lg font-bold text-white">Audio History</h2>
                <p className="text-xs text-slate-400">All generated voice audio clips</p>
              </div>

              {history.map(item => (
                <div key={item.id} className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <button 
                      onClick={() => handlePlaySpeech(item.textPrompt, item.id)}
                      className="w-9 h-9 rounded-full bg-violet-600 text-white flex items-center justify-center flex-shrink-0 hover:bg-violet-500 transition-colors shadow-md"
                    >
                      {playingAudioId === item.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-100 line-clamp-2">{item.textPrompt}</p>
                      <div className="text-[10px] text-slate-400 mt-1 flex flex-wrap gap-x-2">
                        <span>{item.characterName}</span>
                        <span>•</span>
                        <span>{item.language}</span>
                        <span>•</span>
                        <span>{item.durationSeconds}s</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[10px] text-slate-400">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-medium">{item.providerName}</span>
                    <div className="flex items-center gap-3">
                      <button onClick={() => toggleFavorite(item.id)} className={item.isFavorite ? 'text-amber-400' : 'hover:text-white'}>
                        <Star className="w-3.5 h-3.5 fill-current" />
                      </button>
                      <button onClick={() => deleteAudio(item.id)} className="hover:text-red-400">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* DOWNLOADS TAB */}
          {activeTab === 'downloads' && (
            <div className="space-y-3">
              <div>
                <h2 className="text-lg font-bold text-white">Downloaded Voice Files</h2>
                <p className="text-xs text-slate-400">Offline saved audio files</p>
              </div>

              {history.filter(i => i.isDownloaded).map(item => (
                <div key={item.id} className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between gap-3">
                  <button 
                    onClick={() => handlePlaySpeech(item.textPrompt, item.id)}
                    className="w-8 h-8 rounded-full bg-cyan-600 text-white flex items-center justify-center flex-shrink-0"
                  >
                    {playingAudioId === item.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-100 truncate">{item.audioPath}</div>
                    <div className="text-[10px] text-slate-400">{item.language} • {item.durationSeconds}s • {item.fileSizeFormatted}</div>
                  </div>
                  <button onClick={() => deleteAudio(item.id)} className="text-slate-500 hover:text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-violet-600/30 border-2 border-violet-500 flex items-center justify-center mx-auto text-2xl">
                  👤
                </div>
                <h2 className="text-base font-bold text-white">Asif Qureshi</h2>
                <p className="text-xs text-slate-400">asifqureshi4462@gmail.com</p>
                <div className="inline-block px-3 py-1 bg-amber-500/20 text-amber-300 text-[10px] font-bold rounded-full border border-amber-500/30">
                  PRO STUDIO MEMBER
                </div>
              </div>

              <div className="space-y-2">
                <button 
                  onClick={() => setActiveTab('api_settings')}
                  className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between text-xs text-slate-200 hover:border-violet-500/50"
                >
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-cyan-400" />
                    <span>AI Provider Engine Settings</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                </button>

                <button 
                  onClick={() => setActiveTab('subscription')}
                  className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between text-xs text-slate-200 hover:border-amber-500/50"
                >
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>Manage Subscription Tier</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                </button>
              </div>
            </div>
          )}

          {/* API SETTINGS SCREEN */}
          {activeTab === 'api_settings' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <button onClick={() => setActiveTab('profile')} className="text-xs text-slate-400 hover:text-white">← Back</button>
                <h2 className="text-base font-bold text-white">AI Provider Engine</h2>
              </div>

              <div className="p-3 bg-violet-950/40 border border-violet-800/50 rounded-xl text-xs text-violet-200">
                <p className="font-semibold">Plug-and-Play AI Architecture (`ApiManager.java`)</p>
                <p className="text-[11px] text-violet-300 mt-1">Switch between Google AI Studio, ElevenLabs, OpenRouter, Fish Audio, or built-in engine without altering UI code.</p>
              </div>

              <div className="space-y-2.5">
                {providers.map(prov => (
                  <div 
                    key={prov.providerId}
                    onClick={() => setActiveProviderId(prov.providerId)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      activeProviderId === prov.providerId 
                        ? 'bg-violet-900/30 border-violet-500 text-white' 
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-xs text-slate-200">{prov.providerName}</div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${activeProviderId === prov.providerId ? 'border-violet-400 bg-violet-500' : 'border-slate-600'}`}>
                        {activeProviderId === prov.providerId && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                      </div>
                    </div>
                    {prov.providerId !== 'dummy_provider' && (
                      <input 
                        type="password"
                        placeholder="Enter API Key..."
                        value={prov.apiKey}
                        onChange={e => {
                          const val = e.target.value;
                          setProviders(prev => prev.map(p => p.providerId === prov.providerId ? { ...p, apiKey: val } : p));
                        }}
                        className="w-full mt-2 p-1.5 bg-slate-950 border border-slate-800 rounded text-[11px] text-slate-200 outline-none focus:border-violet-500"
                      />
                    )}
                  </div>
                ))}
              </div>

              <button 
                onClick={onOpenApiArchitecture}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-semibold text-cyan-300 border border-slate-700 flex items-center justify-center gap-2"
              >
                <Layers className="w-4 h-4" />
                <span>View Full API Manager Architecture</span>
              </button>
            </div>
          )}

          {/* SUBSCRIPTION SCREEN */}
          {activeTab === 'subscription' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <button onClick={() => setActiveTab('home')} className="text-xs text-slate-400 hover:text-white">← Back</button>
                <h2 className="text-base font-bold text-white">Upgrade Studio Access</h2>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-b from-amber-500/10 to-slate-900 border border-amber-500/30 space-y-3">
                <div className="text-amber-400 font-bold text-sm">Studio Pro Plan</div>
                <div className="text-2xl font-extrabold text-white">$12.99 <span className="text-xs text-slate-400 font-normal">/ month</span></div>
                <ul className="text-xs text-slate-300 space-y-1.5">
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> 50,000 Voice Generation Credits</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> All 12+ Character Voice Categories</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Zero Latency Cloud Queue</li>
                </ul>
                <button className="w-full py-2.5 bg-amber-500 font-bold text-slate-950 rounded-xl text-xs">
                  Subscribe Now
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Mobile Bottom Navigation Bar */}
        <div className="h-16 w-full bg-[#0D1322] border-t border-slate-800/80 px-3 flex items-center justify-around absolute bottom-0 left-0 right-0 z-30 select-none">
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-medium ${activeTab === 'home' ? 'text-violet-400' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <Mic className="w-4 h-4" />
            <span>Home</span>
          </button>

          <button 
            onClick={() => setActiveTab('generate')}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-medium ${activeTab === 'generate' ? 'text-violet-400' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Generator</span>
          </button>

          <button 
            onClick={() => setActiveTab('history')}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-medium ${activeTab === 'history' ? 'text-violet-400' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <Volume2 className="w-4 h-4" />
            <span>History</span>
          </button>

          <button 
            onClick={() => setActiveTab('downloads')}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-medium ${activeTab === 'downloads' ? 'text-violet-400' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <Download className="w-4 h-4" />
            <span>Files</span>
          </button>

          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-medium ${activeTab === 'profile' || activeTab === 'api_settings' ? 'text-violet-400' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <User className="w-4 h-4" />
            <span>Profile</span>
          </button>
        </div>

      </div>
    </div>
  );
};
