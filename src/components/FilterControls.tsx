import React from 'react';
import { CarparkAgency, SingaporeRegion } from '../types/carpark';
import { SlidersHorizontal, Map as MapIcon, LayoutGrid, Split, Zap, ShieldCheck } from 'lucide-react';

interface FilterControlsProps {
  agency: 'All' | CarparkAgency;
  onAgencyChange: (a: 'All' | CarparkAgency) => void;
  selectedRegion: SingaporeRegion;
  onRegionChange: (r: SingaporeRegion) => void;
  minClearance: number;
  onMinClearanceChange: (c: number) => void;
  hasEvOnly: boolean;
  onHasEvOnlyChange: (v: boolean) => void;
  freeParkingOnly: boolean;
  onFreeParkingOnlyChange: (v: boolean) => void;
  sortBy: 'availability' | 'occupancy' | 'name' | 'clearance';
  onSortByChange: (s: 'availability' | 'occupancy' | 'name' | 'clearance') => void;
  viewMode: 'split' | 'map' | 'grid';
  onViewModeChange: (m: 'split' | 'map' | 'grid') => void;
  resultCount: number;
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  agency,
  onAgencyChange,
  selectedRegion,
  onRegionChange,
  minClearance,
  onMinClearanceChange,
  hasEvOnly,
  onHasEvOnlyChange,
  freeParkingOnly,
  onFreeParkingOnlyChange,
  sortBy,
  onSortByChange,
  viewMode,
  onViewModeChange,
  resultCount,
}) => {
  return (
    <div className="bg-slate-950/60 border-y border-slate-800/80 px-4 lg:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Left Side: Agency and Quick Toggles */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Agency Segmented Control (Functional buttons) */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
            {(['All', 'HDB', 'URA', 'Commercial'] as const).map((ag) => (
              <button
                key={ag}
                type="button"
                onClick={() => onAgencyChange(ag)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  agency === ag
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {ag === 'All' ? 'All Agencies' : ag}
              </button>
            ))}
          </div>

          {/* Clearance Filter */}
          <select
            value={minClearance}
            onChange={(e) => onMinClearanceChange(parseFloat(e.target.value))}
            className="bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
          >
            <option value="0">Any Clearance</option>
            <option value="2.0">&ge; 2.0m Clearance</option>
            <option value="2.15">&ge; 2.15m (SUV/Van)</option>
            <option value="4.0">&ge; 4.0m (Heavy/Bus)</option>
          </select>

          {/* EV Toggle */}
          <button
            type="button"
            onClick={() => onHasEvOnlyChange(!hasEvOnly)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors whitespace-nowrap ${
              hasEvOnly
                ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>EV Charging</span>
          </button>

          {/* Free Parking Toggle */}
          <button
            type="button"
            onClick={() => onFreeParkingOnlyChange(!freeParkingOnly)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors whitespace-nowrap ${
              freeParkingOnly
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Sunday Free Scheme</span>
          </button>
        </div>

        {/* Right Side: Sorting & Layout View Toggle */}
        <div className="flex items-center justify-between md:justify-end gap-3 text-xs">
          {/* Sorting */}
          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value as any)}
              className="bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
            >
              <option value="availability">Most Available Lots</option>
              <option value="occupancy">Highest Occupancy</option>
              <option value="name">Name (A-Z)</option>
              <option value="clearance">Highest Clearance</option>
            </select>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-0.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => onViewModeChange('split')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'split' ? 'bg-slate-800 text-emerald-400' : 'text-slate-400 hover:text-white'
              }`}
              title="Split Map & List View"
            >
              <Split className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('map')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'map' ? 'bg-slate-800 text-emerald-400' : 'text-slate-400 hover:text-white'
              }`}
              title="Map Focus View"
            >
              <MapIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-slate-800 text-emerald-400' : 'text-slate-400 hover:text-white'
              }`}
              title="Cards Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
