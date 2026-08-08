import React, { useState } from 'react';
import { FileCode, Folder, Search, Copy, Check, Download, Github, Smartphone, Globe, Database, Server } from 'lucide-react';
import { ANDROID_FILES } from '../data/androidFiles';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export const CodeViewer: React.FC = () => {
  const [activeProjectFilter, setActiveProjectFilter] = useState<'all' | 'android' | 'backend'>('all');
  const [selectedFile, setSelectedFile] = useState(ANDROID_FILES[5]); // ApiManager.java or RemoteRepository
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const filteredFiles = ANDROID_FILES.filter(f => {
    const matchesProject = activeProjectFilter === 'all' || f.project === activeProjectFilter;
    const matchesSearch = f.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          f.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesProject && matchesSearch;
  });

  const handleCopyCode = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    setIsExporting(true);
    try {
      const zip = new JSZip();

      // Add all files
      ANDROID_FILES.forEach(file => {
        zip.file(file.path, file.content);
      });

      // Add README.md
      zip.file('README.md', `# AI Voice Studio - Full 2-Project Architecture

This package contains complete source code for both:
1. **Project 1: Android App (Java + XML)** with Retrofit REST API Client and MVVM pattern.
2. **Project 2: Website + Admin Panel (PHP + MySQL + REST API)** with Database schema (\`database.sql\`), REST API endpoints, and Admin Panel.

## Features
- **Dynamic Character Loading**: Add characters in Website Admin Panel and they appear immediately in Android app without updating APK.
- **Dynamic API Key Sync**: Manage Fish Audio, Gemini, ElevenLabs & OpenRouter API keys in PHP Admin Panel.
- **Offline Cache**: SharedPreferences fallback cache in Android app.

## Author
Asif Qureshi (asifqureshi4462@gmail.com)
`);

      const blob = await zip.generateAsync({ type: 'blob' });
      saveAs(blob, 'AI-Voice-Studio-Full-2Projects.zip');
    } catch (e) {
      console.error(e);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="bg-[#0B0F19] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[750px] text-slate-200 font-sans">
      
      {/* Top Header */}
      <div className="bg-[#0F172A] px-5 py-3 border-b border-slate-800 flex items-center justify-between flex-wrap gap-3">
        
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveProjectFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                activeProjectFilter === 'all' 
                  ? 'bg-violet-600 text-white' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Code Files ({ANDROID_FILES.length})
            </button>
            <button
              onClick={() => setActiveProjectFilter('android')}
              className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeProjectFilter === 'android' 
                  ? 'bg-violet-600 text-white' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-amber-400" />
              <span>Project 1: Android (Java+XML)</span>
            </button>
            <button
              onClick={() => setActiveProjectFilter('backend')}
              className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeProjectFilter === 'backend' 
                  ? 'bg-violet-600 text-white' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>Project 2: Website (PHP+MySQL)</span>
            </button>
          </div>
        </div>

        <button
          onClick={handleDownloadZip}
          disabled={isExporting}
          className="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow-md transition-all active:scale-95 disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          <span>{isExporting ? 'Packaging ZIP...' : 'Export 2-Project Bundle ZIP'}</span>
        </button>
      </div>

      {/* Code Inspector Body */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar: File Tree */}
        <div className="w-80 bg-[#080C14] border-r border-slate-800/80 flex flex-col">
          
          <div className="p-3 border-b border-slate-800/80">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
              <input 
                type="text" 
                placeholder="Search files by path or name..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 outline-none focus:border-violet-500"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin">
            {filteredFiles.map(file => {
              const isSelected = selectedFile.path === file.path;
              return (
                <button
                  key={file.path}
                  onClick={() => setSelectedFile(file)}
                  className={`w-full text-left p-2 rounded-lg flex items-center gap-2 text-xs transition-all ${
                    isSelected 
                      ? 'bg-violet-600/20 text-violet-200 font-semibold border border-violet-500/40' 
                      : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                  }`}
                >
                  <FileCode className={`w-3.5 h-3.5 flex-shrink-0 ${
                    file.type === 'java' ? 'text-amber-400' :
                    file.type === 'xml' ? 'text-cyan-400' :
                    file.type === 'php' ? 'text-violet-400' :
                    file.type === 'sql' ? 'text-emerald-400' :
                    file.type === 'gradle' ? 'text-indigo-400' : 'text-slate-400'
                  }`} />
                  <div className="truncate flex-1">
                    <div className="truncate flex items-center justify-between">
                      <span className="font-medium text-slate-200">{file.name}</span>
                      <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                        file.project === 'android' ? 'bg-amber-500/20 text-amber-300' : 'bg-cyan-500/20 text-cyan-300'
                      }`}>
                        {file.project === 'android' ? 'Android' : 'PHP API'}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">{file.path}</div>
                  </div>
                </button>
              );
            })}
          </div>

        </div>

        {/* Right Code Display Panel */}
        <div className="flex-1 flex flex-col bg-[#05080E]">
          
          {/* File Path Toolbar */}
          <div className="bg-[#0D1322] px-4 py-2 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-300 font-mono">
              <Folder className="w-3.5 h-3.5 text-violet-400" />
              <span>{selectedFile.path}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                {selectedFile.project === 'android' ? 'Project 1 (Android)' : 'Project 2 (Backend Website)'}
              </span>
            </div>

            <button
              onClick={handleCopyCode}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>

          {/* Code Viewer Text Area */}
          <div className="flex-1 overflow-auto p-4 font-mono text-xs text-slate-300 leading-relaxed scrollbar-thin select-text">
            <pre className="whitespace-pre">
              {selectedFile.content.split('\n').map((line, idx) => (
                <div key={idx} className="flex hover:bg-slate-900/50 px-1 rounded">
                  <span className="w-10 text-slate-600 select-none text-right pr-4 flex-shrink-0">{idx + 1}</span>
                  <span className="flex-1">{line}</span>
                </div>
              ))}
            </pre>
          </div>

        </div>

      </div>

    </div>
  );
};
