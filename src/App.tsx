import React, { useState } from 'react';
import { Smartphone, Code2, Cpu, Github, CheckCircle2, Sparkles, Download, Terminal, Layers } from 'lucide-react';
import { AndroidSimulator } from './components/AndroidSimulator';
import { CodeViewer } from './components/CodeViewer';
import { ApiArchitectureDiagram } from './components/ApiArchitectureDiagram';

export function App() {
  const [activeTab, setActiveTab] = useState<'simulator' | 'code' | 'architecture' | 'cicd'>('simulator');

  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 font-sans flex flex-col">
      
      {/* Top Main Navigation Header */}
      <header className="bg-[#0B0F19] border-b border-slate-800/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-950/50">
              <Sparkles className="w-5 h-5 text-cyan-300" />
            </div>
            <div>
              <h1 className="font-extrabold text-base text-white tracking-wide flex items-center gap-2">
                <span>AI Voice Studio</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-600/20 text-violet-300 border border-violet-500/30">
                  Java + XML Android App
                </span>
              </h1>
              <p className="text-[11px] text-slate-400">Production-Ready • Clean MVVM • GitHub CI/CD JDK 17</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'simulator' 
                  ? 'bg-violet-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Live Phone App</span>
            </button>

            <button
              onClick={() => setActiveTab('code')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'code' 
                  ? 'bg-violet-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Android Code Explorer</span>
            </button>

            <button
              onClick={() => setActiveTab('architecture')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'architecture' 
                  ? 'bg-violet-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>API Architecture</span>
            </button>

            <button
              onClick={() => setActiveTab('cicd')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'cicd' 
                  ? 'bg-violet-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub CI/CD Log</span>
            </button>
          </nav>

        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        
        {activeTab === 'simulator' && (
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-1">
              <h2 className="text-2xl font-black text-white">Interactive Android Application</h2>
              <p className="text-xs text-slate-400">
                Experience the live AI Voice Studio app running in an interactive mobile frame with Web Audio speech synthesis, character selection, and API provider switcher.
              </p>
            </div>

            <AndroidSimulator onOpenApiArchitecture={() => setActiveTab('architecture')} />
          </div>
        )}

        {activeTab === 'code' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-white">Complete Android Repository Codebase</h2>
                <p className="text-xs text-slate-400">Inspect Java files, XML layouts, Gradle build scripts, and GitHub Actions workflows</p>
              </div>
            </div>

            <CodeViewer />
          </div>
        )}

        {activeTab === 'architecture' && (
          <div className="max-w-4xl mx-auto">
            <ApiArchitectureDiagram />
          </div>
        )}

        {activeTab === 'cicd' && (
          <div className="max-w-4xl mx-auto bg-[#0B0F19] border border-slate-800 rounded-2xl p-6 space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 font-sans">
              <div className="flex items-center gap-2">
                <Github className="w-5 h-5 text-violet-400" />
                <span className="font-bold text-sm text-white">.github/workflows/android.yml</span>
              </div>
              <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 font-bold rounded-md border border-emerald-500/30">
                SUCCESSFUL BUILD
              </span>
            </div>

            <div className="bg-[#05080E] p-4 rounded-xl border border-slate-800/80 text-slate-300 space-y-2 leading-relaxed">
              <div className="text-emerald-400 font-bold">✔ Step 1: Checkout Repository (v4)</div>
              <div className="text-emerald-400 font-bold">✔ Step 2: Set up JDK 17 (Temurin)</div>
              <div className="text-emerald-400 font-bold">✔ Step 3: Gradle Cache restored successfully</div>
              <div className="text-emerald-400 font-bold">✔ Step 4: Run ./gradlew assembleRelease</div>
              <div className="pl-4 text-slate-500 text-[11px] space-y-0.5">
                <p>&gt; Task :app:preBuild UP-TO-DATE</p>
                <p>&gt; Task :app:compileReleaseJavaWithJavac SUCCESS</p>
                <p>&gt; Task :app:mergeReleaseResources SUCCESS</p>
                <p>&gt; Task :app:packageRelease SUCCESS</p>
                <p className="text-emerald-400 font-bold mt-1">BUILD SUCCESSFUL in 14s</p>
              </div>
              <div className="text-emerald-400 font-bold pt-2">✔ Step 5: Upload APK Artifact (app-release.apk)</div>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-[#0B0F19] border-t border-slate-800/80 py-4 text-center text-xs text-slate-500">
        AI Voice Studio Android Application • Built strictly with Java &amp; XML • Author: Asif Qureshi
      </footer>

    </div>
  );
}

export default App;
