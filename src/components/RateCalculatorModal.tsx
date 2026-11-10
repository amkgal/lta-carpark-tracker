import React, { useState } from 'react';
import { Carpark } from '../types/carpark';
import { calculateEstimatedFee } from '../services/rateCalculator';
import { X, Calculator, Clock, Calendar, CheckCircle2, DollarSign } from 'lucide-react';

interface RateCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  carparks: Carpark[];
  defaultCarpark?: Carpark | null;
}

export const RateCalculatorModal: React.FC<RateCalculatorModalProps> = ({
  isOpen,
  onClose,
  carparks,
  defaultCarpark,
}) => {
  const [selectedId, setSelectedId] = useState<string>(
    defaultCarpark?.id || carparks[0]?.id || ''
  );
  const [durationMinutes, setDurationMinutes] = useState<number>(120);
  const [dayType, setDayType] = useState<'weekday' | 'sunday'>('weekday');
  const [entryTimeOfDay, setEntryTimeOfDay] = useState<'day' | 'night'>('day');

  if (!isOpen) return null;

  const currentCarpark = carparks.find((c) => c.id === selectedId) || carparks[0];

  // Construct dates for calculation
  const entryDate = new Date();
  if (dayType === 'sunday') {
    entryDate.setDate(entryDate.getDate() + ((7 - entryDate.getDay()) % 7));
  }
  entryDate.setHours(entryTimeOfDay === 'day' ? 14 : 23, 0, 0, 0);

  const exitDate = new Date(entryDate.getTime() + durationMinutes * 60 * 1000);

  const feeResult = currentCarpark
    ? calculateEstimatedFee(currentCarpark, entryDate, exitDate)
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/80 backdrop-blur-sm">
      <div
        className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Singapore Parking Fee Estimator
              </h2>
              <p className="text-xs text-slate-400">
                Simulate electronic gantry charges, grace periods &amp; Sunday waivers
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5 text-xs text-slate-200 overflow-y-auto max-h-[80vh]">
          {/* Select Carpark */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Select Destination Carpark
            </label>
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white text-xs focus:outline-none focus:border-emerald-500"
            >
              {carparks.map((cp) => (
                <option key={cp.id} value={cp.id}>
                  [{cp.agency}] {cp.name} ({cp.carparkNumber}) · {cp.estate}
                </option>
              ))}
            </select>
          </div>

          {/* Quick presets & Duration */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-300">
                Parking Duration
              </label>
              <span className="font-mono text-emerald-400 font-bold text-sm">
                {Math.floor(durationMinutes / 60)}h {durationMinutes % 60}m
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[
                { label: '15m Grace', mins: 15 },
                { label: '1 Hour', mins: 60 },
                { label: '2.5 Hours', mins: 150 },
                { label: 'Overnight (8h)', mins: 480 },
              ].map((preset) => (
                <button
                  key={preset.mins}
                  type="button"
                  onClick={() => setDurationMinutes(preset.mins)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-medium border transition-colors ${
                    durationMinutes === preset.mins
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <input
              type="range"
              min="10"
              max="720"
              step="10"
              value={durationMinutes}
              onChange={(e) => setDurationMinutes(parseInt(e.target.value, 10))}
              className="w-full accent-emerald-400 cursor-pointer mt-2"
            />
          </div>

          {/* Day & Timing Options */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400">Day Schedule</label>
              <select
                value={dayType}
                onChange={(e) => setDayType(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white text-xs"
              >
                <option value="weekday">Monday – Saturday</option>
                <option value="sunday">Sunday / Public Holiday</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-400">Entry Time Window</label>
              <select
                value={entryTimeOfDay}
                onChange={(e) => setEntryTimeOfDay(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white text-xs"
              >
                <option value="day">Daytime (7:00 AM – 10:30 PM)</option>
                <option value="night">Night Time (10:30 PM – 7:00 AM)</option>
              </select>
            </div>
          </div>

          {/* Estimated Fee Calculation Card */}
          {feeResult && (
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-baseline justify-between border-b border-slate-800/80 pb-3">
                <div>
                  <span className="text-[11px] text-slate-400 block">Total Estimated Fee:</span>
                  <div className="flex items-baseline gap-1 text-emerald-400">
                    <span className="text-3xl font-bold font-mono">
                      ${feeResult.estimatedCost.toFixed(2)}
                    </span>
                    <span className="text-xs font-mono text-slate-400">SGD</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-500 uppercase font-mono block">Status</span>
                  <span className="text-xs font-semibold text-white">
                    {feeResult.isGracePeriod
                      ? 'Free (Within Grace Period)'
                      : feeResult.isFreeParking
                      ? 'Free Parking Scheme'
                      : 'Standard Billable Rate'}
                  </span>
                </div>
              </div>

              <div className="space-y-1 pt-1">
                {feeResult.breakdown.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
