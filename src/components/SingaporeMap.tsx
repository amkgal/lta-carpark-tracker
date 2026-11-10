import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Carpark, SingaporeRegion } from '../types/carpark';
import { Locate, Layers, Navigation, Zap } from 'lucide-react';

interface SingaporeMapProps {
  carparks: Carpark[];
  selectedCarpark: Carpark | null;
  onSelectCarpark: (cp: Carpark) => void;
  activeRegion: SingaporeRegion;
  onSelectRegion: (r: SingaporeRegion) => void;
}

const REGION_CENTERS: Record<SingaporeRegion, { lat: number; lng: number; zoom: number }> = {
  All: { lat: 1.3521, lng: 103.8198, zoom: 12 },
  Central: { lat: 1.293, lng: 103.845, zoom: 14 },
  East: { lat: 1.355, lng: 103.95, zoom: 13 },
  West: { lat: 1.338, lng: 103.74, zoom: 13 },
  North: { lat: 1.425, lng: 103.81, zoom: 13 },
  'North-East': { lat: 1.385, lng: 103.88, zoom: 13 },
};

export const SingaporeMap: React.FC<SingaporeMapProps> = ({
  carparks,
  selectedCarpark,
  onSelectCarpark,
  activeRegion,
  onSelectRegion,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Bounds for Singapore island to restrict panning outside SG
    const sgBounds = L.latLngBounds(
      L.latLng(1.15, 103.55),
      L.latLng(1.48, 104.10)
    );

    const map = L.map(mapContainerRef.current, {
      center: [1.3521, 103.8198],
      zoom: 12,
      minZoom: 11,
      maxZoom: 18,
      maxBounds: sgBounds,
      maxBoundsViscosity: 0.8,
      zoomControl: false,
    });

    // High quality CartoDB Dark Matter tiles (free, crisp, no API key needed)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);

    // Zoom control at bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    const markersGroup = L.layerGroup().addTo(map);
    markersLayerRef.current = markersGroup;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Sync region center
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    const config = REGION_CENTERS[activeRegion] || REGION_CENTERS.All;
    map.flyTo([config.lat, config.lng], config.zoom, { duration: 1.2 });
  }, [activeRegion]);

  // Center on selected carpark
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedCarpark) return;
    map.flyTo([selectedCarpark.coordinates.lat, selectedCarpark.coordinates.lng], 16, {
      duration: 1.0,
    });
  }, [selectedCarpark]);

  // Render Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersGroup = markersLayerRef.current;
    if (!map || !markersGroup) return;

    markersGroup.clearLayers();

    carparks.forEach((cp) => {
      const avail = cp.lots.car.available;
      const total = cp.lots.car.total;
      const pct = total > 0 ? (avail / total) * 100 : 0;

      // Color logic:
      // Emerald if > 25% or > 50 lots
      // Amber if between 5% and 25%
      // Rose if < 5% or 0
      let bgClass = 'bg-emerald-600 border-emerald-400 text-white';
      let statusDot = 'bg-emerald-300';
      if (avail === 0 || pct < 5) {
        bgClass = 'bg-rose-700 border-rose-500 text-white';
        statusDot = 'bg-rose-300';
      } else if (pct < 25 || avail < 20) {
        bgClass = 'bg-amber-600 border-amber-400 text-slate-950';
        statusDot = 'bg-amber-950';
      }

      const isSelected = selectedCarpark?.id === cp.id;

      const customIcon = L.divIcon({
        className: 'custom-carpark-pin',
        html: `
          <div class="relative group cursor-pointer transition-transform duration-200 ${
            isSelected ? 'scale-125 z-50' : 'hover:scale-110'
          }">
            <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full shadow-lg border-2 ${bgClass} font-mono font-bold text-xs whitespace-nowrap">
              <span class="w-1.5 h-1.5 rounded-full ${statusDot}"></span>
              <span>${avail}</span>
              ${cp.evChargers ? '<span class="text-[9px] opacity-90">⚡</span>' : ''}
            </div>
            <div class="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-current mx-auto -mt-[1px] ${
              avail === 0 || pct < 5 ? 'text-rose-700' : pct < 25 || avail < 20 ? 'text-amber-600' : 'text-emerald-600'
            }"></div>
          </div>
        `,
        iconSize: [60, 32],
        iconAnchor: [30, 32],
        popupAnchor: [0, -32],
      });

      const marker = L.marker([cp.coordinates.lat, cp.coordinates.lng], {
        icon: customIcon,
      });

      const popupHtml = `
        <div class="p-3 text-slate-100 min-w-[240px]">
          <div class="flex items-center justify-between gap-2 border-b border-slate-700/60 pb-2 mb-2">
            <div>
              <span class="text-[10px] font-mono font-semibold tracking-wider text-emerald-400 uppercase">${cp.agency} · ${cp.carparkNumber}</span>
              <h4 class="text-sm font-bold text-white leading-tight">${cp.name}</h4>
            </div>
          </div>
          <p class="text-xs text-slate-400 mb-2.5 line-clamp-2">${cp.address}</p>
          
          <div class="grid grid-cols-2 gap-2 mb-3 bg-slate-800/80 p-2 rounded-lg border border-slate-700/50 text-xs">
            <div>
              <span class="text-[10px] text-slate-400 block">Available Lots</span>
              <span class="font-mono text-sm font-bold text-white">${avail} <span class="text-[10px] font-normal text-slate-400">/ ${total}</span></span>
            </div>
            <div>
              <span class="text-[10px] text-slate-400 block">Clearance</span>
              <span class="font-mono text-xs font-semibold text-slate-200">${cp.gantryHeightMeters}m</span>
            </div>
          </div>

          <div class="flex items-center justify-between text-[11px] text-slate-300">
            <span>Rate: ${cp.rates.weekdayDay.split(',')[0]}</span>
            <button id="view-details-${cp.id}" class="text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-2">
              View Info &rarr;
            </button>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);

      marker.on('click', () => {
        onSelectCarpark(cp);
      });

      marker.on('popupopen', () => {
        const btn = document.getElementById(`view-details-${cp.id}`);
        if (btn) {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            onSelectCarpark(cp);
          });
        }
      });

      markersGroup.addLayer(marker);
    });
  }, [carparks, selectedCarpark, onSelectCarpark]);

  const handleSimulateLocation = (preset: 'CBD' | 'Orchard' | 'Changi' | 'Jurong') => {
    const coords = {
      CBD: { lat: 1.283, lng: 103.851, name: 'Marina Bay / CBD' },
      Orchard: { lat: 1.304, lng: 103.832, name: 'Orchard Road' },
      Changi: { lat: 1.36, lng: 103.989, name: 'Jewel Changi' },
      Jurong: { lat: 1.333, lng: 103.743, name: 'Jurong East' },
    }[preset];

    mapInstanceRef.current?.flyTo([coords.lat, coords.lng], 15, { duration: 1 });
  };

  return (
    <div className="relative w-full h-[520px] lg:h-[620px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900">
      {/* Map DOM Canvas */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Region Fast Switches (Top Left overlay) */}
      <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-1 bg-slate-950/85 backdrop-blur-md p-1.5 rounded-xl border border-slate-800/80 shadow-lg">
        {(['All', 'Central', 'East', 'West', 'North', 'North-East'] as SingaporeRegion[]).map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => onSelectRegion(r)}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeRegion === r
                ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            {r === 'All' ? 'Island-wide' : r}
          </button>
        ))}
      </div>

      {/* Map Legend (Top Right overlay) */}
      <div className="absolute top-4 right-4 z-10 hidden sm:flex items-center gap-3 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800/80 text-[11px] font-medium shadow-lg">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          <span className="text-slate-300">&gt;25% Plenty</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
          <span className="text-slate-300">&lt;25% Filling</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
          <span className="text-slate-300">Full / &lt;5%</span>
        </div>
      </div>

      {/* Driver Quick Hop Bar (Bottom Left overlay) */}
      <div className="absolute bottom-4 left-4 z-10 hidden md:flex items-center gap-2 bg-slate-950/90 backdrop-blur-md p-1.5 rounded-xl border border-slate-800/80 shadow-lg text-xs">
        <span className="text-slate-400 pl-2 text-[11px] font-medium flex items-center gap-1">
          <Navigation className="w-3.5 h-3.5 text-emerald-400" />
          Hop to Area:
        </span>
        <button
          type="button"
          onClick={() => handleSimulateLocation('CBD')}
          className="px-2 py-1 text-[11px] rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800"
        >
          Marina Bay
        </button>
        <button
          type="button"
          onClick={() => handleSimulateLocation('Orchard')}
          className="px-2 py-1 text-[11px] rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800"
        >
          Orchard
        </button>
        <button
          type="button"
          onClick={() => handleSimulateLocation('Jurong')}
          className="px-2 py-1 text-[11px] rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800"
        >
          Jurong East
        </button>
        <button
          type="button"
          onClick={() => handleSimulateLocation('Changi')}
          className="px-2 py-1 text-[11px] rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800"
        >
          Jewel Changi
        </button>
      </div>
    </div>
  );
};
