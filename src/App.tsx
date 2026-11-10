import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Carpark,
  SingaporeRegion,
  CarparkAgency,
  VehicleType,
  RealtimeSyncStats,
} from './types/carpark';
import {
  INITIAL_CARPARKS,
  fetchGovAvailabilityMap,
  updateCarparkLots,
} from './services/carparkData';
import { TopNav } from './components/TopNav';
import { HeroSection } from './components/HeroSection';
import { FilterControls } from './components/FilterControls';
import { SingaporeMap } from './components/SingaporeMap';
import { CarparkCard } from './components/CarparkCard';
import { CarparkDetailModal } from './components/CarparkDetailModal';
import { SavedCarparksDrawer } from './components/SavedCarparksDrawer';
import { RateCalculatorModal } from './components/RateCalculatorModal';
import { DeveloperApiModal } from './components/DeveloperApiModal';
import {
  MapPin,
  Sparkles,
  Layers,
  ChevronRight,
  ExternalLink,
  Code2,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';

export default function App() {
  // Core Carpark State
  const [carparks, setCarparks] = useState<Carpark[]>(INITIAL_CARPARKS);
  const [selectedCarpark, setSelectedCarpark] = useState<Carpark | null>(null);

  // Navigation and Modals
  const [activeTab, setActiveTab] = useState<'tracker' | 'directory' | 'calculator' | 'developer'>('tracker');
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [isRateCalcOpen, setIsRateCalcOpen] = useState(false);
  const [isDevApiOpen, setIsDevApiOpen] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<SingaporeRegion>('All');
  const [agency, setAgency] = useState<'All' | CarparkAgency>('All');
  const [vehicleType, setVehicleType] = useState<VehicleType>('car');
  const [minClearance, setMinClearance] = useState<number>(0);
  const [hasEvOnly, setHasEvOnly] = useState(false);
  const [freeParkingOnly, setFreeParkingOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'availability' | 'occupancy' | 'name' | 'clearance'>('availability');
  const [viewMode, setViewMode] = useState<'split' | 'map' | 'grid'>('split');

  // Favorites
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('parksg_favorites');
      return saved ? JSON.parse(saved) : ['sg-cp-mbs', 'sg-cp-jewel', 'sg-cp-amk-he12'];
    } catch {
      return ['sg-cp-mbs', 'sg-cp-jewel'];
    }
  });

  // Custom backend URL for future integration
  const [customBackendUrl, setCustomBackendUrl] = useState(() => {
    return localStorage.getItem('parksg_backend_url') || '';
  });

  // Telemetry Sync Stats
  const [syncStats, setSyncStats] = useState<RealtimeSyncStats>({
    lastSyncTime: new Date(),
    source: 'Data.gov.sg Live API',
    totalCarparksTracked: INITIAL_CARPARKS.length,
    totalLotsAvailable: INITIAL_CARPARKS.reduce((acc, c) => acc + c.lots.car.available, 0),
    totalCapacity: INITIAL_CARPARKS.reduce((acc, c) => acc + c.lots.car.total, 0),
    isLoading: false,
    error: null,
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('parksg_favorites', JSON.stringify(favoriteIds));
    } catch (e) {
      console.error(e);
    }
  }, [favoriteIds]);

  const toggleFavorite = (id: string) => {
    setFavoriteIds((prev) => {
      const isFav = prev.includes(id);
      const next = isFav ? prev.filter((item) => item !== id) : [...prev, id];
      showToast(isFav ? 'Removed from saved carparks' : 'Saved to favorites');
      return next;
    });
  };

  // Perform Live Sync with Data.gov.sg or Backend
  const handleRefresh = useCallback(async () => {
    setSyncStats((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      // 1. Fetch live Singapore Government Data
      const govMap = await fetchGovAvailabilityMap();

      // 2. Merge into current carpark collection
      setCarparks((prev) => {
        const updated = updateCarparkLots(prev, govMap);

        // Update stats
        const totalAvail = updated.reduce((acc, c) => acc + c.lots.car.available, 0);
        const totalCap = updated.reduce((acc, c) => acc + c.lots.car.total, 0);

        setSyncStats({
          lastSyncTime: new Date(),
          source: 'Data.gov.sg Live API',
          totalCarparksTracked: updated.length,
          totalLotsAvailable: totalAvail,
          totalCapacity: totalCap,
          isLoading: false,
          error: null,
        });

        return updated;
      });

      showToast('Synced live lot availabilities with Singapore Government API');
    } catch (err: any) {
      setSyncStats((prev) => ({
        ...prev,
        isLoading: false,
        error: err.message || 'Sync failed',
      }));
    }
  }, []);

  // Initial Sync & 45-second live ticker
  useEffect(() => {
    handleRefresh();
    const interval = setInterval(() => {
      handleRefresh();
    }, 45000); // 45 seconds refresh
    return () => clearInterval(interval);
  }, [handleRefresh]);

  // Filtered & Sorted Carparks
  const filteredCarparks = useMemo(() => {
    return carparks
      .filter((cp) => {
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = cp.name.toLowerCase().includes(q);
          const matchAddress = cp.address.toLowerCase().includes(q);
          const matchNumber = cp.carparkNumber.toLowerCase().includes(q);
          const matchEstate = cp.estate.toLowerCase().includes(q);
          if (!matchName && !matchAddress && !matchNumber && !matchEstate) return false;
        }

        // Region filter
        if (selectedRegion !== 'All' && cp.region !== selectedRegion) {
          return false;
        }

        // Agency filter
        if (agency !== 'All' && cp.agency !== agency) {
          return false;
        }

        // Clearance filter
        if (minClearance > 0 && cp.gantryHeightMeters < minClearance) {
          return false;
        }

        // EV only
        if (hasEvOnly && (!cp.evChargers || cp.evChargers.available <= 0)) {
          return false;
        }

        // Free parking only
        if (freeParkingOnly && !cp.freeParking.toLowerCase().includes('sunday')) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'availability') {
          return b.lots.car.available - a.lots.car.available;
        }
        if (sortBy === 'occupancy') {
          const occA = a.lots.car.total > 0 ? (a.lots.car.total - a.lots.car.available) / a.lots.car.total : 0;
          const occB = b.lots.car.total > 0 ? (b.lots.car.total - b.lots.car.available) / b.lots.car.total : 0;
          return occB - occA;
        }
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        }
        if (sortBy === 'clearance') {
          return b.gantryHeightMeters - a.gantryHeightMeters;
        }
        return 0;
      });
  }, [
    carparks,
    searchQuery,
    selectedRegion,
    agency,
    minClearance,
    hasEvOnly,
    freeParkingOnly,
    sortBy,
  ]);

  const savedCarparksList = useMemo(() => {
    return carparks.filter((c) => favoriteIds.includes(c.id));
  }, [carparks, favoriteIds]);

  // Open Navigation in Google Maps
  const handleOpenNavigation = (cp: Carpark) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${cp.coordinates.lat},${cp.coordinates.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navigation */}
      <TopNav
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'calculator') setIsRateCalcOpen(true);
          if (tab === 'developer') setIsDevApiOpen(true);
        }}
        savedCount={favoriteIds.length}
        onOpenSaved={() => setIsSavedDrawerOpen(true)}
        onRefresh={handleRefresh}
        isRefreshing={syncStats.isLoading}
        lastUpdatedText={
          syncStats.lastSyncTime ? syncStats.lastSyncTime.toLocaleTimeString() : 'Syncing'
        }
      />

      {/* Main View Area */}
      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <HeroSection
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          vehicleType={vehicleType}
          onVehicleTypeChange={setVehicleType}
          syncStats={syncStats}
          onRefresh={handleRefresh}
        />

        {/* Filter Controls Bar */}
        <FilterControls
          agency={agency}
          onAgencyChange={setAgency}
          selectedRegion={selectedRegion}
          onRegionChange={setSelectedRegion}
          minClearance={minClearance}
          onMinClearanceChange={setMinClearance}
          hasEvOnly={hasEvOnly}
          onHasEvOnlyChange={setHasEvOnly}
          freeParkingOnly={freeParkingOnly}
          onFreeParkingOnlyChange={setFreeParkingOnly}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          resultCount={filteredCarparks.length}
        />

        {/* Dynamic Layout Content */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 w-full flex-1">
          {/* Result Metadata Strip (Zero-pill text specs) */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-4 pb-2 border-b border-slate-800/60">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white font-mono">{filteredCarparks.length}</span>
              <span>carparks match criteria</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400">Region: <strong className="text-slate-200">{selectedRegion}</strong></span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Vehicle: <strong className="text-slate-200 capitalize">{vehicleType}s</strong></span>
            </div>

            <div className="text-[11px] text-slate-500 hidden sm:block">
              Click any pin or card to inspect clearance &amp; rates
            </div>
          </div>

          {/* VIEW MODE 1: Split View (Map + List) */}
          {viewMode === 'split' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Map Column */}
              <div className="lg:col-span-7 sticky top-20">
                <SingaporeMap
                  carparks={filteredCarparks}
                  selectedCarpark={selectedCarpark}
                  onSelectCarpark={setSelectedCarpark}
                  activeRegion={selectedRegion}
                  onSelectRegion={setSelectedRegion}
                />
              </div>

              {/* Scrollable List Column */}
              <div className="lg:col-span-5 space-y-3 max-h-[620px] overflow-y-auto pr-1">
                {filteredCarparks.length === 0 ? (
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-xs text-slate-400">
                    <AlertCircle className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                    <p className="font-bold text-white text-sm mb-1">No carparks found</p>
                    <p className="mb-4">Try clearing your search keyword or relaxing height clearance filters.</p>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedRegion('All');
                        setAgency('All');
                        setMinClearance(0);
                        setHasEvOnly(false);
                        setFreeParkingOnly(false);
                      }}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-medium"
                    >
                      Reset All Filters
                    </button>
                  </div>
                ) : (
                  filteredCarparks.map((cp) => (
                    <CarparkCard
                      key={cp.id}
                      carpark={cp}
                      vehicleType={vehicleType}
                      isFavorite={favoriteIds.includes(cp.id)}
                      onToggleFavorite={toggleFavorite}
                      onSelect={setSelectedCarpark}
                      onOpenNavigation={handleOpenNavigation}
                    />
                  ))
                )}
              </div>
            </div>
          )}

          {/* VIEW MODE 2: Map Focus View */}
          {viewMode === 'map' && (
            <div className="space-y-4">
              <SingaporeMap
                carparks={filteredCarparks}
                selectedCarpark={selectedCarpark}
                onSelectCarpark={setSelectedCarpark}
                activeRegion={selectedRegion}
                onSelectRegion={setSelectedRegion}
              />

              {/* Quick horizontal carousel of top available carparks */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold text-slate-300">Quick Select from Map</span>
                  <span>{filteredCarparks.length} locations visible</span>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-3 pt-1">
                  {filteredCarparks.slice(0, 8).map((cp) => (
                    <div
                      key={cp.id}
                      onClick={() => setSelectedCarpark(cp)}
                      className="min-w-[260px] max-w-[280px] bg-slate-900 border border-slate-800 hover:border-slate-700 p-3 rounded-xl cursor-pointer shrink-0 transition-colors"
                    >
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                        <span className="font-mono text-emerald-400">{cp.carparkNumber}</span>
                        <span>{cp.estate}</span>
                      </div>
                      <h4 className="text-xs font-bold text-white line-clamp-1 mb-2">{cp.name}</h4>
                      <div className="flex items-baseline justify-between text-xs pt-1 border-t border-slate-800">
                        <span className="text-slate-400 text-[10px]">Available</span>
                        <span className="font-mono font-bold text-emerald-400">
                          {cp.lots.car.available} <span className="text-slate-500 font-normal">/ {cp.lots.car.total}</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* VIEW MODE 3: Cards Grid View */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCarparks.map((cp) => (
                <CarparkCard
                  key={cp.id}
                  carpark={cp}
                  vehicleType={vehicleType}
                  isFavorite={favoriteIds.includes(cp.id)}
                  onToggleFavorite={toggleFavorite}
                  onSelect={setSelectedCarpark}
                  onOpenNavigation={handleOpenNavigation}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 px-4 lg:px-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-bold text-white">ParkSG</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span>Singapore Open Data Powered</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span>Updated via Data.gov.sg API</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button
              type="button"
              onClick={() => setIsRateCalcOpen(true)}
              className="hover:text-white transition-colors"
            >
              Rate Estimator
            </button>
            <button
              type="button"
              onClick={() => setIsDevApiOpen(true)}
              className="hover:text-cyan-400 transition-colors flex items-center gap-1"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Backend Contract</span>
            </button>
            <a
              href="https://data.gov.sg/datasets/d_23f063b555026b76077344378e2d6348/view"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors flex items-center gap-1"
            >
              <span>Data.gov.sg Source</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>

      {/* Carpark Detail Modal */}
      <CarparkDetailModal
        carpark={selectedCarpark}
        onClose={() => setSelectedCarpark(null)}
        isFavorite={selectedCarpark ? favoriteIds.includes(selectedCarpark.id) : false}
        onToggleFavorite={toggleFavorite}
      />

      {/* Saved Carparks Drawer */}
      <SavedCarparksDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedCarparks={savedCarparksList}
        onSelectCarpark={setSelectedCarpark}
        onRemoveSaved={toggleFavorite}
      />

      {/* Rate Calculator Modal */}
      <RateCalculatorModal
        isOpen={isRateCalcOpen}
        onClose={() => setIsRateCalcOpen(false)}
        carparks={carparks}
        defaultCarpark={selectedCarpark}
      />

      {/* Developer Backend Integration Modal */}
      <DeveloperApiModal
        isOpen={isDevApiOpen}
        onClose={() => setIsDevApiOpen(false)}
        customBackendUrl={customBackendUrl}
        onUpdateCustomBackendUrl={(url) => {
          setCustomBackendUrl(url);
          localStorage.setItem('parksg_backend_url', url);
          showToast(`Custom backend set to: ${url}`);
        }}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 border border-slate-700 text-slate-100 text-xs px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom-2 duration-200">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
