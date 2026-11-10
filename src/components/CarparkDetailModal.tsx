import React, { useState } from 'react';
import { Carpark, VehicleType } from '../types/carpark';
import { calculateEstimatedFee } from '../services/rateCalculator';
import {
  X,
  Navigation,
  Bookmark,
  Share2,
  Clock,
  ShieldAlert,
  Zap,
  CheckCircle2,
  Calculator,
  ExternalLink,
  Code2,
  Car,
  Bike,
  Truck,
  Copy,
  Check,
} from 'lucide-react';

interface CarparkDetailModalProps {
  carpark: Carpark | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const CarparkDetailModal: React.FC<CarparkDetailModalProps> = ({
  carpark,
  onClose,
  isFavorite,
  onToggleFavorite,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'calculator' | 'backend'>('overview');
  const [copiedCode, setCopiedCode] = useState(false);

  // Estimator state
  const [parkDurationHours, setParkDurationHours] = useState<number>(2);
  const [isSunday, setIsSunday] = useState<boolean>(false);

  if (!carpark) return null;

  const { car, motorcycle, heavy } = carpark.lots;
  const carPct = car.total > 0 ? (car.available / car.total) * 100 : 0;

  // Status colors
  let statusBadge = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
  let statusText = 'Plenty of lots available';
  if (car.available === 0 || carPct < 5) {
    statusBadge = 'bg-rose-500/10 text-rose-400 border-rose-500/30';
    statusText = 'Carpark full / critical capacity';
  } else if (carPct < 25 || car.available < 20) {
    statusBadge = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    statusText = 'Lots filling fast';
  }

  // Calculate live fee
  const now = new Date();
  if (isSunday) {
    now.setDate(now.getDate() + ((7 - now.getDay()) % 7)); // Move to Sunday
  }
  const exitTime = new Date(now.getTime() + parkDurationHours * 60 * 60 * 1000);
  const feeEstimate = calculateEstimatedFee(carpark, now, exitTime);

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(carpark.carparkNumber);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const navUrlGoogle = `https://www.google.com/maps/dir/?api=1&destination=${carpark.coordinates.lat},${carpark.coordinates.lng}`;
  const navUrlWaze = `https://waze.com/ul?ll=${carpark.coordinates.lat},${carpark.coordinates.lng}&navigate=yes`;
  const navUrlApple = `https://maps.apple.com/?daddr=${carpark.coordinates.lat},${carpark.coordinates.lng}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-start justify-between p-5 border-b border-slate-800 bg-slate-900/90">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <span className="font-semibold text-slate-200">{carpark.agency}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                title="Click to copy carpark code"
              >
                <span>{carpark.carparkNumber}</span>
                {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 opacity-60" />}
              </button>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>{carpark.estate}</span>
            </div>
            <h2 className="text-lg md:text-xl font-bold text-white leading-tight">
              {carpark.name}
            </h2>
            <p className="text-xs text-slate-400 mt-1 line-clamp-1">
              {carpark.address}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 ml-3">
            <button
              type="button"
              onClick={() => onToggleFavorite(carpark.id)}
              className="p-2 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors"
              title={isFavorite ? 'Remove from Saved' : 'Save Carpark'}
            >
              <Bookmark className={`w-5 h-5 ${isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Segmented Tabs (Functional interactive tabs) */}
        <div className="flex items-center gap-1 px-5 pt-3 border-b border-slate-800/80 bg-slate-950/40">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Overview & Facilities
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('calculator')}
            className={`px-3 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'calculator'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Fee Estimator
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('backend')}
            className={`px-3 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'backend'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Backend Schema</span>
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-slate-200">
          {activeTab === 'overview' && (
            <>
              {/* Live Lot Availability Breakdown */}
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300">Real-Time Lot Availability</span>
                  <span className="text-[11px] font-mono text-slate-400">
                    Updated {carpark.lastUpdated} ({carpark.trend})
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Car Lots */}
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span className="flex items-center gap-1 font-medium text-slate-300">
                        <Car className="w-3.5 h-3.5 text-emerald-400" />
                        Cars
                      </span>
                      <span className="text-[11px] font-mono">{Math.round(carPct)}% free</span>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-bold font-mono tabular-nums text-white">
                        {car.available}
                      </span>
                      <span className="text-xs font-mono text-slate-500">/ {car.total}</span>
                    </div>
                  </div>

                  {/* Motorcycle Lots */}
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span className="flex items-center gap-1 font-medium text-slate-300">
                        <Bike className="w-3.5 h-3.5 text-amber-400" />
                        Motorcycles
                      </span>
                      <span className="text-[11px] font-mono">
                        {motorcycle ? `${Math.round((motorcycle.available / motorcycle.total) * 100)}%` : 'N/A'}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-bold font-mono tabular-nums text-white">
                        {motorcycle ? motorcycle.available : '—'}
                      </span>
                      <span className="text-xs font-mono text-slate-500">
                        {motorcycle ? `/ ${motorcycle.total}` : 'no lots'}
                      </span>
                    </div>
                  </div>

                  {/* Heavy Vehicle Lots */}
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span className="flex items-center gap-1 font-medium text-slate-300">
                        <Truck className="w-3.5 h-3.5 text-cyan-400" />
                        Heavy Vehicles
                      </span>
                      <span className="text-[11px] font-mono">
                        {heavy ? `${Math.round((heavy.available / heavy.total) * 100)}%` : 'None'}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-bold font-mono tabular-nums text-white">
                        {heavy ? heavy.available : '0'}
                      </span>
                      <span className="text-xs font-mono text-slate-500">
                        {heavy ? `/ ${heavy.total}` : 'restricted'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Physical Specifications & Gantry */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                  <span className="text-slate-400 block mb-1">Clearance Height</span>
                  <span className="text-sm font-bold font-mono text-white">
                    {carpark.gantryHeightMeters}m
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">
                    {carpark.gantryHeightMeters < 2.0 ? 'Low clearance' : 'Standard SUV/van'}
                  </span>
                </div>

                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                  <span className="text-slate-400 block mb-1">System Type</span>
                  <span className="text-sm font-bold text-white truncate block">
                    {carpark.carparkType.split(' ')[0]}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">
                    {carpark.parkingSystem.includes('EPS') ? 'EPS Gantry' : 'Coupon/Open'}
                  </span>
                </div>

                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                  <span className="text-slate-400 block mb-1">Night Parking</span>
                  <span className="text-sm font-bold text-emerald-400">
                    {carpark.nightParking ? '$5.00 Cap' : 'Standard'}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">10:30pm - 7:00am</span>
                </div>

                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                  <span className="text-slate-400 block mb-1">Grace Period</span>
                  <span className="text-sm font-bold font-mono text-white">
                    {carpark.rates.gracePeriodMinutes} mins
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Free exit window</span>
                </div>
              </div>

              {/* EV Charging Station Information */}
              {carpark.evChargers && (
                <div className="bg-cyan-950/20 border border-cyan-800/40 p-3.5 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">
                        EV Charging Powered by {carpark.evChargers.provider}
                      </h4>
                      <p className="text-slate-400 text-[11px]">
                        Up to {carpark.evChargers.powerKw || 50}kW DC/AC Fast Charging
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold font-mono text-cyan-400">
                      {carpark.evChargers.available}
                    </span>
                    <span className="text-xs text-slate-400"> / {carpark.evChargers.total} bays free</span>
                  </div>
                </div>
              )}

              {/* Official Parking Rates Table */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-slate-300">Official Rate Schedule</h4>
                <div className="bg-slate-950/80 rounded-xl border border-slate-800 divide-y divide-slate-800 text-xs">
                  <div className="flex items-center justify-between p-3">
                    <span className="text-slate-400">Mondays – Saturdays (Day)</span>
                    <span className="font-mono font-medium text-white">{carpark.rates.weekdayDay}</span>
                  </div>
                  <div className="flex items-center justify-between p-3">
                    <span className="text-slate-400">Mondays – Saturdays (Night)</span>
                    <span className="font-mono font-medium text-white">{carpark.rates.weekdayNight}</span>
                  </div>
                  <div className="flex items-center justify-between p-3">
                    <span className="text-slate-400">Sundays &amp; Public Holidays</span>
                    <span className="font-mono font-medium text-emerald-400">
                      {carpark.freeParking || carpark.rates.weekendDay}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'calculator' && (
            <div className="space-y-4">
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-4">
                <h4 className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Calculator className="w-4 h-4 text-emerald-400" />
                  Estimated Parking Fee for {carpark.name}
                </h4>

                {/* Duration Slider */}
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                    <span>Planned Parking Duration:</span>
                    <span className="font-bold text-white font-mono">{parkDurationHours} hour(s)</span>
                  </div>
                  <input
                    type="range"
                    min="0.25"
                    max="12"
                    step="0.25"
                    value={parkDurationHours}
                    onChange={(e) => setParkDurationHours(parseFloat(e.target.value))}
                    className="w-full accent-emerald-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                    <span>15 mins (Grace)</span>
                    <span>2 hrs</span>
                    <span>6 hrs</span>
                    <span>12 hrs</span>
                  </div>
                </div>

                {/* Day selector */}
                <div className="flex items-center gap-3 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                    <input
                      type="radio"
                      name="daySelect"
                      checked={!isSunday}
                      onChange={() => setIsSunday(false)}
                      className="accent-emerald-400"
                    />
                    <span>Weekday / Saturday</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                    <input
                      type="radio"
                      name="daySelect"
                      checked={isSunday}
                      onChange={() => setIsSunday(true)}
                      className="accent-emerald-400"
                    />
                    <span>Sunday / Public Holiday</span>
                  </label>
                </div>

                {/* Estimated Output Result */}
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-700/80 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block">Estimated Charge:</span>
                    <span className="text-3xl font-bold font-mono text-emerald-400">
                      ${feeEstimate.estimatedCost.toFixed(2)}
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      Duration: {feeEstimate.durationFormatted}
                    </span>
                  </div>

                  <div className="text-right text-xs space-y-1">
                    {feeEstimate.breakdown.map((item, idx) => (
                      <p key={idx} className="text-slate-400 text-[11px]">
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'backend' && (
            <div className="space-y-4">
              <div className="bg-slate-950/90 p-4 rounded-xl border border-cyan-800/40 text-xs space-y-3 font-mono">
                <div className="flex items-center justify-between text-cyan-400 border-b border-slate-800 pb-2">
                  <span className="font-bold">Backend Integration Contract</span>
                  <span className="text-[10px] text-slate-400 font-sans">For your Node/Python/Go backend</span>
                </div>
                <p className="text-slate-300 font-sans text-xs">
                  This frontend is ready to receive live telemetry from your backend service. Hook into your database or LTA DataMall proxy using this schema:
                </p>

                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 overflow-x-auto text-[11px] text-slate-300">
                  <pre>{`// GET /api/v1/carparks/${carpark.carparkNumber}/availability
{
  "carpark_number": "${carpark.carparkNumber}",
  "timestamp": "${new Date().toISOString()}",
  "source": "LTA_DATAMALL",
  "lots": {
    "C": { "available": ${car.available}, "total": ${car.total} },
    "Y": { "available": ${motorcycle?.available || 0}, "total": ${motorcycle?.total || 0} },
    "H": { "available": ${heavy?.available || 0}, "total": ${heavy?.total || 0} }
  },
  "ev_status": {
    "available_chargers": ${carpark.evChargers?.available || 0},
    "provider": "${carpark.evChargers?.provider || 'SP_MOBILITY'}"
  }
}`}</pre>
                </div>

                <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-[11px] font-sans space-y-1.5 text-slate-400">
                  <strong className="text-white block font-mono">Integration Endpoint Hook:</strong>
                  <p>In <code className="text-emerald-400 font-mono">src/services/carparkData.ts</code>, set your backend URL:</p>
                  <p className="text-slate-300 font-mono">const BACKEND_URL = process.env.VITE_BACKEND_API_URL || 'https://api.data.gov.sg/v1';</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Direct Navigation Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/90 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-400">
            Coordinates: <span className="font-mono text-slate-300">{carpark.coordinates.lat.toFixed(4)}, {carpark.coordinates.lng.toFixed(4)}</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={navUrlGoogle}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Navigation className="w-3.5 h-3.5 text-emerald-400" />
              <span>Google Maps</span>
            </a>
            <a
              href={navUrlWaze}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-lg transition-colors flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              <span>Waze</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
