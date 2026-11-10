import React from 'react';
import { VehicleType, RealtimeSyncStats } from '../types/carpark';
import { Search, Car, Bike, Truck, Zap, Activity, RefreshCw } from 'lucide-react';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  vehicleType: VehicleType;
  onVehicleTypeChange: (v: VehicleType) => void;
  syncStats: RealtimeSyncStats;
  onRefresh: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  onSearchChange,
  vehicleType,
  onVehicleTypeChange,
  syncStats,
  onRefresh,
}) => {
  return (
    <section className="relative overflow-hidden border-b border-slate-800 bg-slate-950">
      {/* Background Ambience with Scrim */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <img
          src="/src/assets/images/hero_sg_mobility_1794281781951.jpg"
          alt="Singapore Urban Mobility"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter saturate-150"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8 pt-8 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headline, Description & Search */}
          <div className="lg:col-span-7 space-y-5">
            {/* Live Data Kicker */}
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="font-semibold text-emerald-400">Singapore Smart Mobility</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>HDB · URA · Commercial Centers</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="font-mono text-slate-300">Data.gov.sg Sync</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]" style={{ textWrap: 'balance' }}>
              Real-Time Carpark Availability Across Singapore
            </h1>

            <p className="text-sm md:text-base text-slate-300 max-w-2xl leading-relaxed">
              Track live parking vacancy counts, electronic gantry clearance heights, Sunday free parking schemes, and EV charging bays across 24 Singapore estates.
            </p>

            {/* Live Search & Filter Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search by carpark name, estate (e.g. Tampines), code (e.g. TH20)..."
                  className="w-full bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-400 text-xs sm:text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-emerald-500 shadow-lg"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => onSearchChange('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Vehicle Type Interactive Selector */}
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 shrink-0">
                <button
                  type="button"
                  onClick={() => onVehicleTypeChange('car')}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
                    vehicleType === 'car'
                      ? 'bg-emerald-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Car className="w-3.5 h-3.5" />
                  <span>Cars</span>
                </button>
                <button
                  type="button"
                  onClick={() => onVehicleTypeChange('motorcycle')}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
                    vehicleType === 'motorcycle'
                      ? 'bg-emerald-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Bike className="w-3.5 h-3.5" />
                  <span>Bikes</span>
                </button>
                <button
                  type="button"
                  onClick={() => onVehicleTypeChange('heavy')}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
                    vehicleType === 'heavy'
                      ? 'bg-emerald-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>Heavy</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Live Telemetry Metric Strip */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Singapore Network Telemetry
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onRefresh}
                  disabled={syncStats.isLoading}
                  className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 hover:text-emerald-300 disabled:opacity-50"
                >
                  <RefreshCw className={`w-3 h-3 ${syncStats.isLoading ? 'animate-spin' : ''}`} />
                  <span>{syncStats.isLoading ? 'Syncing...' : 'Live 60s Ticker'}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80">
                  <span className="text-[11px] text-slate-400 block mb-0.5">Available Car Lots</span>
                  <span className="text-2xl font-bold font-mono tabular-nums text-emerald-400">
                    {syncStats.totalLotsAvailable.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-500 block font-mono mt-0.5">
                    of {syncStats.totalCapacity.toLocaleString()} island-wide
                  </span>
                </div>

                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80">
                  <span className="text-[11px] text-slate-400 block mb-0.5">Tracked Nodes</span>
                  <span className="text-2xl font-bold font-mono tabular-nums text-white">
                    {syncStats.totalCarparksTracked}
                  </span>
                  <span className="text-[10px] text-slate-500 block font-mono mt-0.5">
                    HDB / URA / Commercial
                  </span>
                </div>

                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80">
                  <span className="text-[11px] text-slate-400 block mb-0.5">Average Vacancy</span>
                  <span className="text-2xl font-bold font-mono tabular-nums text-cyan-400">
                    {syncStats.totalCapacity > 0
                      ? `${Math.round((syncStats.totalLotsAvailable / syncStats.totalCapacity) * 100)}%`
                      : '0%'}
                  </span>
                  <span className="text-[10px] text-slate-500 block font-mono mt-0.5">
                    Nominal capacity
                  </span>
                </div>

                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80">
                  <span className="text-[11px] text-slate-400 block mb-0.5">EV Charging Bays</span>
                  <span className="text-2xl font-bold font-mono tabular-nums text-amber-400">
                    95+
                  </span>
                  <span className="text-[10px] text-slate-500 block font-mono mt-0.5">
                    SP · Shell · CDG ENGIE
                  </span>
                </div>
              </div>

              {/* Status Note */}
              <div className="pt-1 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Source: Data.gov.sg &amp; LTA DataMall</span>
                <span className="font-mono text-slate-500">
                  {syncStats.lastSyncTime ? syncStats.lastSyncTime.toLocaleTimeString() : 'Connected'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
