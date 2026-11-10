import React from 'react';
import { Carpark } from '../types/carpark';
import { X, Bookmark, Navigation, Trash2, ArrowRight } from 'lucide-react';

interface SavedCarparksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedCarparks: Carpark[];
  onSelectCarpark: (cp: Carpark) => void;
  onRemoveSaved: (id: string) => void;
}

export const SavedCarparksDrawer: React.FC<SavedCarparksDrawerProps> = ({
  isOpen,
  onClose,
  savedCarparks,
  onSelectCarpark,
  onRemoveSaved,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-amber-400 fill-amber-400" />
              <h2 className="text-sm font-bold text-white">
                Saved Carparks ({savedCarparks.length})
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* List or Empty State */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {savedCarparks.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-12 h-12 rounded-full bg-slate-800/80 flex items-center justify-center mx-auto mb-3 text-slate-500">
                  <Bookmark className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-semibold text-slate-300 mb-1">
                  No saved carparks yet
                </h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Click the bookmark icon on any carpark card or map marker to pin your home estate or office parking lots here for fast monitoring.
                </p>
              </div>
            ) : (
              savedCarparks.map((cp) => {
                const avail = cp.lots.car.available;
                const total = cp.lots.car.total;
                const pct = total > 0 ? (avail / total) * 100 : 0;
                let colorClass = 'text-emerald-400';
                if (avail === 0 || pct < 5) colorClass = 'text-rose-400';
                else if (pct < 25) colorClass = 'text-amber-400';

                return (
                  <div
                    key={cp.id}
                    onClick={() => {
                      onSelectCarpark(cp);
                      onClose();
                    }}
                    className="p-3 bg-slate-950/80 hover:bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-xl transition-all cursor-pointer flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-emerald-400 font-semibold">
                        {cp.agency} · {cp.carparkNumber}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveSaved(cp.id);
                        }}
                        className="p-1 text-slate-500 hover:text-rose-400"
                        title="Remove from saved"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h4 className="text-xs font-bold text-white line-clamp-1">
                      {cp.name}
                    </h4>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Available</span>
                        <span className={`font-mono font-bold ${colorClass}`}>
                          {avail} <span className="text-slate-500 text-[10px] font-normal">/ {total}</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-slate-400 font-mono">
                          {cp.gantryHeightMeters}m
                        </span>
                        <span className="text-emerald-400 flex items-center text-xs font-semibold">
                          View <ArrowRight className="w-3 h-3 ml-0.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Quick note */}
          <div className="p-3 border-t border-slate-800 bg-slate-950/60 text-[11px] text-slate-500 text-center">
            Saved items persist locally in your browser storage.
          </div>
        </div>
      </div>
    </div>
  );
};
