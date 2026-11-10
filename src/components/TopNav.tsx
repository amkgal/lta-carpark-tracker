import React from 'react';
import { RefreshCw, Bookmark, SlidersHorizontal, Code2, Compass } from 'lucide-react';

interface TopNavProps {
  activeTab: 'tracker' | 'directory' | 'calculator' | 'developer';
  setActiveTab: (tab: 'tracker' | 'directory' | 'calculator' | 'developer') => void;
  savedCount: number;
  onOpenSaved: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  lastUpdatedText: string;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  onOpenSaved,
  onRefresh,
  isRefreshing,
  lastUpdatedText,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-lg shadow-sm">
            P
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-white whitespace-nowrap">
              ParkSG
            </span>
            <span className="text-[10px] tracking-wide text-slate-400 -mt-0.5 whitespace-nowrap">
              Singapore Real-Time Lots
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links (Single-line prose, hover states) */}
        <nav className="hidden md:flex items-center gap-8 text-xs lg:text-sm font-medium text-slate-400">
          <button
            type="button"
            onClick={() => setActiveTab('tracker')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeTab === 'tracker' ? 'text-emerald-400 font-semibold' : ''
            }`}
          >
            Live Map & Tracker
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('directory')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeTab === 'directory' ? 'text-emerald-400 font-semibold' : ''
            }`}
          >
            Carpark Directory
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('calculator')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeTab === 'calculator' ? 'text-emerald-400 font-semibold' : ''
            }`}
          >
            Fee Calculator
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('developer')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeTab === 'developer' ? 'text-emerald-400 font-semibold' : ''
            }`}
          >
            Backend Hookup API
          </button>
        </nav>

        {/* Zone 3: Primary Action & Saved Drawer Toggle */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onOpenSaved}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800 hover:text-white transition-colors whitespace-nowrap shrink-0"
            title="Saved Carparks"
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Saved</span>
            {savedCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 text-[10px] font-mono bg-amber-400/20 text-amber-300 rounded">
                {savedCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 active:scale-95 transition-all rounded-lg shadow-sm whitespace-nowrap shrink-0 disabled:opacity-60"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Sync Live Lots</span>
          </button>
        </div>
      </div>
    </header>
  );
};
