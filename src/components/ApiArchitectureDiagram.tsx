import React, { useState } from 'react';
import { Cpu, Layers, Sparkles, Zap, Globe, ShieldCheck, ArrowRight, CheckCircle, Database, Server, Smartphone, Key, RefreshCw, Terminal, Eye } from 'lucide-react';

export const ApiArchitectureDiagram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'workflow' | 'api' | 'database' | 'admin'>('workflow');
  const [selectedEndpoint, setSelectedEndpoint] = useState<'get_characters' | 'get_providers' | 'get_settings'>('get_characters');

  return (
    <div className="bg-[#0B0F19] border border-slate-800 rounded-2xl p-6 text-slate-200 font-sans space-y-6 shadow-2xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-violet-600/20 text-violet-300 border border-violet-500/30 text-[11px] font-bold">
              Production Architecture
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-600/20 text-cyan-300 border border-cyan-500/30 text-[11px] font-bold">
              2-Project Decoupled Model
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1.5 flex items-center gap-2">
            <Server className="w-5 h-5 text-cyan-400" />
            <span>Android App + Website Admin Backend (PHP &amp; MySQL)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Zero APK updates needed! Control characters, voices, API providers, secret keys, user credits, and app settings remotely from your PHP Website Admin Panel.
          </p>
        </div>

        {/* Sub Navigation */}
        <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('workflow')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'workflow' ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Architecture Flow
          </button>
          <button
            onClick={() => setActiveTab('api')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'api' ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            REST API &amp; Payload
          </button>
          <button
            onClick={() => setActiveTab('database')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'database' ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            MySQL Database
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'admin' ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Admin Panel Demo
          </button>
        </div>
      </div>

      {/* TAB 1: ARCHITECTURE FLOW */}
      {activeTab === 'workflow' && (
        <div className="space-y-6">
          
          {/* Main Decoupled Diagram Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
            
            {/* Project 1: Android App */}
            <div className="p-5 rounded-xl bg-slate-900/90 border border-amber-500/30 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4" />
                    Project 1: Android App
                  </span>
                  <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded text-[10px] font-bold">Java + XML</span>
                </div>
                <h3 className="font-bold text-white text-sm mb-2">Clean MVVM App Client</h3>
                <ul className="text-xs text-slate-300 space-y-2">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span>Fetches voice characters &amp; styles on app startup via Retrofit</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span>SharedPreferences cache allows offline voice generation fallback</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span>Never hardcodes API keys or voice lists inside app APK</span>
                  </li>
                </ul>
              </div>

              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-[11px] font-mono text-amber-300">
                RemoteRepository.java &bull; RetrofitClient.java
              </div>
            </div>

            {/* Connection Layer */}
            <div className="p-5 rounded-xl bg-violet-950/30 border border-violet-800/50 flex flex-col justify-center items-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-violet-600/30 flex items-center justify-center border border-violet-500/40 text-violet-300 shadow-lg">
                <RefreshCw className="w-6 h-6 animate-spin-slow" />
              </div>
              <div>
                <h4 className="font-bold text-white text-xs uppercase tracking-wider">HTTPS REST API Bridge</h4>
                <p className="text-[11px] text-slate-400 mt-1">JSON Payloads &bull; Bearer Auth &bull; CORS Allowed</p>
              </div>
              <div className="text-[10px] font-mono bg-violet-900/40 text-violet-200 px-3 py-1 rounded border border-violet-700/50">
                GET /api/v1/get_characters.php<br />
                GET /api/v1/get_providers.php
              </div>
            </div>

            {/* Project 2: Website & Admin Panel */}
            <div className="p-5 rounded-xl bg-slate-900/90 border border-cyan-500/30 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                    <Globe className="w-4 h-4" />
                    Project 2: Website Backend
                  </span>
                  <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-300 rounded text-[10px] font-bold">PHP + MySQL</span>
                </div>
                <h3 className="font-bold text-white text-sm mb-2">Central Admin Control Panel</h3>
                <ul className="text-xs text-slate-300 space-y-2">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>Add/Edit new anime, documentary &amp; cartoon characters</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>Change API Keys (Fish Audio, Gemini, ElevenLabs, OpenRouter)</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>User credit management &amp; subscription status controls</span>
                  </li>
                </ul>
              </div>

              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-[11px] font-mono text-cyan-300">
                /admin/index.php &bull; /api/get_characters.php
              </div>
            </div>

          </div>

          {/* Key Advantages Summary */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-violet-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span>Why This Production Architecture Is Superior:</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <div className="font-bold text-amber-300 mb-1">1. No APK Re-Publishing</div>
                <p className="text-[11px] text-slate-400">Add 100+ voices or tweak pitch settings in Admin Panel without uploading new APK to Play Store.</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <div className="font-bold text-cyan-300 mb-1">2. Instant API Key Swapping</div>
                <p className="text-[11px] text-slate-400">If Fish Audio or ElevenLabs key expires, paste new key in Admin Panel. All app users sync instantly.</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <div className="font-bold text-emerald-300 mb-1">3. Security &amp; User Control</div>
                <p className="text-[11px] text-slate-400">Block abusive users or give free promotional credits to VIP members directly from database.</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <div className="font-bold text-violet-300 mb-1">4. Scalable Architecture</div>
                <p className="text-[11px] text-slate-400">Works seamlessly whether you have 10 users or 100,000 active daily voice generations.</p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: REST API PAYLOAD EXPLORER */}
      {activeTab === 'api' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedEndpoint('get_characters')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                selectedEndpoint === 'get_characters' ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-400'
              }`}
            >
              GET /api/v1/get_characters.php
            </button>
            <button
              onClick={() => setSelectedEndpoint('get_providers')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                selectedEndpoint === 'get_providers' ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-400'
              }`}
            >
              GET /api/v1/get_providers.php
            </button>
            <button
              onClick={() => setSelectedEndpoint('get_settings')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                selectedEndpoint === 'get_settings' ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-400'
              }`}
            >
              GET /api/v1/get_settings.php
            </button>
          </div>

          <div className="bg-[#05080E] border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-200 space-y-2">
            <div className="flex items-center justify-between text-slate-500 border-b border-slate-800 pb-2">
              <span className="text-emerald-400 font-bold">STATUS 200 OK</span>
              <span>Content-Type: application/json</span>
            </div>

            <pre className="text-cyan-300 overflow-x-auto p-2">
              {selectedEndpoint === 'get_characters' && JSON.stringify({
                "success": true,
                "message": "Characters fetched successfully from website backend.",
                "count": 4,
                "data": [
                  {
                    "id": "narrator_deep",
                    "name": "Deep Morgan",
                    "gender": "Male",
                    "category": "Documentary",
                    "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
                    "description": "Resonant documentary voice suitable for storytelling.",
                    "styleCount": 5,
                    "isPopular": true,
                    "isPremium": false,
                    "pitchOffset": -0.2
                  },
                  {
                    "id": "anime_female",
                    "name": "Aria Harmony",
                    "gender": "Female",
                    "category": "Anime & Story",
                    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
                    "description": "Expressive anime voice with dramatic audio inflections.",
                    "styleCount": 6,
                    "isPopular": true,
                    "isPremium": false,
                    "pitchOffset": 0.3
                  }
                ]
              }, null, 2)}

              {selectedEndpoint === 'get_providers' && JSON.stringify({
                "success": true,
                "message": "API Providers configuration loaded.",
                "data": [
                  {
                    "providerId": "google_ai_studio",
                    "providerName": "Google AI Studio (Gemini)",
                    "baseUrl": "https://generativelanguage.googleapis.com/v1beta/",
                    "apiKey": "AIzaSyA_Example_Key_Value",
                    "isEnabled": true,
                    "isDefault": true,
                    "maxTextLength": 5000
                  },
                  {
                    "providerId": "fish_audio",
                    "providerName": "Fish Audio TTS",
                    "baseUrl": "https://api.fish.audio/v1/",
                    "apiKey": "fish_key_88f921",
                    "isEnabled": true,
                    "isDefault": false,
                    "maxTextLength": 3000
                  }
                ]
              }, null, 2)}

              {selectedEndpoint === 'get_settings' && JSON.stringify({
                "success": true,
                "data": {
                  "maintenance_mode": "0",
                  "min_app_version": "1.0.0",
                  "banner_ad_unit_id": "ca-app-pub-3940256099942544/6300978111",
                  "welcome_credits": "50"
                }
              }, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {/* TAB 3: MYSQL DATABASE */}
      {activeTab === 'database' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
            <Database className="w-4 h-4" />
            <span>MySQL Database Tables Structure (database.sql)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
              <h4 className="font-bold text-white text-xs font-mono text-amber-300">TABLE 1: `characters`</h4>
              <p className="text-[11px] text-slate-400">Stores all dynamic voices, categories, avatar URLs, and audio parameters.</p>
              <div className="text-[11px] font-mono bg-slate-950 p-2.5 rounded text-slate-300 space-y-0.5">
                <p>• id (INT AUTO_INCREMENT)</p>
                <p>• char_code (VARCHAR 50 UNIQUE)</p>
                <p>• name, gender, category, avatar</p>
                <p>• is_popular, is_premium, pitch_offset</p>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
              <h4 className="font-bold text-white text-xs font-mono text-cyan-300">TABLE 2: `providers`</h4>
              <p className="text-[11px] text-slate-400">Stores API keys for Fish Audio, Gemini, ElevenLabs &amp; OpenRouter.</p>
              <div className="text-[11px] font-mono bg-slate-950 p-2.5 rounded text-slate-300 space-y-0.5">
                <p>• provider_id (VARCHAR 50 UNIQUE)</p>
                <p>• provider_name, base_url, api_key</p>
                <p>• is_enabled, is_default, max_text_length</p>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
              <h4 className="font-bold text-white text-xs font-mono text-violet-300">TABLE 3: `users`</h4>
              <p className="text-[11px] text-slate-400">Stores user subscription plans, remaining credits, and block status.</p>
              <div className="text-[11px] font-mono bg-slate-950 p-2.5 rounded text-slate-300 space-y-0.5">
                <p>• user_token (VARCHAR 64 UNIQUE)</p>
                <p>• subscription_plan (FREE/PRO/VIP)</p>
                <p>• credits_remaining (INT)</p>
                <p>• status (ACTIVE/BLOCKED)</p>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
              <h4 className="font-bold text-white text-xs font-mono text-emerald-300">TABLE 4: `app_settings`</h4>
              <p className="text-[11px] text-slate-400">Global configurations, banner ad IDs, and minimum app version.</p>
              <div className="text-[11px] font-mono bg-slate-950 p-2.5 rounded text-slate-300 space-y-0.5">
                <p>• setting_key (VARCHAR 100 UNIQUE)</p>
                <p>• setting_value (TEXT)</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: ADMIN PANEL DEMO */}
      {activeTab === 'admin' && (
        <div className="bg-[#0D1322] border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold text-violet-400 flex items-center gap-1.5">
                <Key className="w-4 h-4 text-violet-400" />
                <span>PHP Website Admin Control Center</span>
              </span>
              <p className="text-[11px] text-slate-400">Simulate making changes to your website database without recompiling the APK!</p>
            </div>
            <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 font-bold text-xs rounded border border-emerald-500/30">
              LIVE SYSTEM READY
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
              <div className="font-bold text-white flex items-center justify-between">
                <span>➕ Add New Voice Character</span>
                <span className="text-[10px] text-emerald-400 font-mono">POST /admin/add_character.php</span>
              </div>
              <p className="text-slate-400 text-[11px]">Type character name, select gender, set category, and upload avatar URL. Once saved, it immediately shows up in the Android app!</p>
            </div>

            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
              <div className="font-bold text-white flex items-center justify-between">
                <span>🔑 Change API Keys</span>
                <span className="text-[10px] text-cyan-400 font-mono">POST /admin/update_keys.php</span>
              </div>
              <p className="text-slate-400 text-[11px]">Update Fish Audio, OpenRouter, Gemini or ElevenLabs API keys anytime. The Android Retrofit client loads new keys automatically.</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
