import React from 'react';
import { Carpark, VehicleType } from '../types/carpark';
import { Bookmark, Navigation, Zap, AlertCircle, ArrowUpRight } from 'lucide-react';

interface CarparkCardProps {
  carpark: Carpark;
  vehicleType: VehicleType;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelect: (cp: Carpark) => void;
  onOpenNavigation: (cp: Carpark) => void;
}

export const CarparkCard: React.FC<CarparkCardProps> = ({
  carpark,
  vehicleType,
  isFavorite,
  onToggleFavorite,
  onSelect,
  onOpenNavigation,
}) => {
  // Determine lots based on vehicle type
  let lotsData = carpark.lots.car;
  let vehicleLabel = 'Car lots';
  if (vehicleType === 'motorcycle' && carpark.lots.motorcycle) {
    lotsData = carpark.lots.motorcycle;
    vehicleLabel = 'Motorcycle lots';
  } else if (vehicleType === 'heavy' && carpark.lots.heavy) {
    lotsData = carpark.lots.heavy;
    vehicleLabel = 'Heavy lots';
  }

  const { available, total } = lotsData;
  const pct = total > 0 ? (available / total) * 100 : 0;
  const occupancyPct = total > 0 ? 100 - pct : 100;

  // Status color
  let statusColor = 'text-emerald-400';
  let barColor = 'bg-emerald-500';
  let statusText = 'Plenty of Lots';
  if (available === 0 || pct < 5) {
    statusColor = 'text-rose-400';
    barColor = 'bg-rose-500';
    statusText = 'Full / Critical';
  } else if (pct < 25 || available < 20) {
    statusColor = 'text-amber-400';
    barColor = 'bg-amber-500';
    statusText = 'Filling Fast';
  }

  return (
    <div
      onClick={() => onSelect(carpark)}
      className="group relative bg-slate-900/80 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 rounded-xl p-4 transition-all duration-200 cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-md"
    >
      <div>
        {/* Top Header Row: Clean unboxed metadata with separators (NO PILLS) */}
        <div className="flex items-center justify-between gap-2 text-xs text-slate-400 mb-1.5">
          <div className="flex items-center gap-1.5 truncate">
            <span className="font-semibold text-slate-300">{carpark.agency}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="font-mono text-emerald-400/90">{carpark.carparkNumber}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="truncate">{carpark.estate}</span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(carpark.id);
            }}
            className="p-1 text-slate-500 hover:text-amber-400 transition-colors shrink-0"
            title={isFavorite ? 'Remove from Saved' : 'Save Carpark'}
          >
            <Bookmark
              className={`w-4 h-4 ${
                isFavorite ? 'fill-amber-400 text-amber-400' : ''
              }`}
            />
          </button>
        </div>

        {/* Primary Title */}
        <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors leading-snug mb-1">
          {carpark.name}
        </h3>

        {/* Quiet Address */}
        <p className="text-xs text-slate-400 line-clamp-1 mb-3">
          {carpark.address}
        </p>

        {/* Availability Meter Strip */}
        <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800/60 mb-3">
          <div className="flex items-baseline justify-between mb-1.5">
            <div className="flex items-baseline gap-1.5">
              <span className={`text-2xl font-bold font-mono tabular-nums ${statusColor}`}>
                {available}
              </span>
              <span className="text-xs font-mono text-slate-500">
                / {total} available
              </span>
            </div>
            <span className={`text-[11px] font-medium ${statusColor}`}>
              {statusText}
            </span>
          </div>

          {/* Clean Progress Bar */}
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full ${barColor} transition-all duration-500`}
              style={{ width: `${Math.min(100, Math.max(2, pct))}%` }}
            />
          </div>
        </div>

        {/* Key Operational Metadata (Zero-pill text specs) */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 mb-2">
          <span>Height limit: <strong className="font-mono text-slate-200">{carpark.gantryHeightMeters}m</strong></span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>{carpark.carparkType.split(' ')[0]}</span>
          {carpark.evChargers && (
            <>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-cyan-400 flex items-center gap-0.5">
                <Zap className="w-3 h-3 inline" />
                {carpark.evChargers.available} EV Lots
              </span>
            </>
          )}
        </div>
      </div>

      {/* Footer Row: Rates Preview + Direct Action Button */}
      <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs mt-1">
        <div className="truncate text-slate-400 pr-2">
          <span className="text-[11px] block text-slate-500">Day Rate:</span>
          <span className="text-slate-200 font-mono font-medium text-[11px] truncate">
            {carpark.rates.weekdayDay.split(',')[0]}
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenNavigation(carpark);
            }}
            className="p-1.5 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded-lg transition-colors"
            title="Directions in Google Maps / Waze"
          >
            <Navigation className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => onSelect(carpark)}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-lg transition-colors whitespace-nowrap"
          >
            <span>Details</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
