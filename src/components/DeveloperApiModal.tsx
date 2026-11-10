import React, { useState } from 'react';
import { X, Code2, Copy, Check, Server, Database, Globe, Play, ArrowRight, ShieldCheck, ExternalLink } from 'lucide-react';

interface DeveloperApiModalProps {
  isOpen: boolean;
  onClose: () => void;
  customBackendUrl: string;
  onUpdateCustomBackendUrl: (url: string) => void;
}

export const DeveloperApiModal: React.FC<DeveloperApiModalProps> = ({
  isOpen,
  onClose,
  customBackendUrl,
  onUpdateCustomBackendUrl,
}) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [testUrl, setTestUrl] = useState(customBackendUrl || 'http://localhost:5000/api/carparks');
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'failed'>('idle');
  const [testMessage, setTestMessage] = useState('');

  if (!isOpen) return null;

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleTestBackend = async () => {
    setTestStatus('testing');
    setTestMessage('Pinging backend endpoint...');
    try {
      const res = await fetch(testUrl, { method: 'GET', headers: { Accept: 'application/json' } });
      if (res.ok) {
        setTestStatus('success');
        setTestMessage(`HTTP ${res.status}: Backend connected successfully!`);
        onUpdateCustomBackendUrl(testUrl);
      } else {
        setTestStatus('failed');
        setTestMessage(`HTTP ${res.status}: Endpoint reached but returned an error status.`);
      }
    } catch (err: any) {
      setTestStatus('failed');
      setTestMessage(`Connection failed (${err.message || 'Network error'}). Ensure backend CORS allows localhost:3000.`);
    }
  };

  const expressSnippet = `import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// 1. Return all carparks with real-time lots
app.get('/api/carparks', async (req, res) => {
  try {
    // Optional: Fetch live from LTA DataMall or Data.gov.sg
    const govRes = await fetch('https://api.data.gov.sg/v1/transport/carpark-availability');
    const govData = await govRes.json();
    
    // Return aggregated database records
    res.json({
      timestamp: new Date().toISOString(),
      carparks: [ /* Your database items */ ]
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch carpark telemetry' });
  }
});

// 2. Return real-time lot count for specific carpark
app.get('/api/carparks/:carparkNumber/availability', (req, res) => {
  const { carparkNumber } = req.params;
  res.json({
    carparkNumber,
    availableLots: 142,
    totalLots: 300,
    timestamp: new Date().toISOString()
  });
});

app.listen(5000, () => console.log('Carpark backend live on port 5000'));`;

  const fastApiSnippet = `from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import httpx
from datetime import datetime

app = FastAPI(title="ParkSG Backend API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/carparks")
async def get_carparks():
    async with httpx.AsyncClient() as client:
        resp = await client.get("https://api.data.gov.sg/v1/transport/carpark-availability")
        data = resp.json()
    return {
        "status": "success",
        "timestamp": datetime.utcnow().isoformat(),
        "data": data
    }

@app.get("/api/carparks/{cp_number}/availability")
async def get_carpark_lot(cp_number: str):
    return {
        "carpark_number": cp_number,
        "available_lots": 88,
        "total_lots": 250,
        "status": "OPEN"
    }`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/80 backdrop-blur-sm">
      <div
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Backend Connection &amp; API Integration Guide
              </h2>
              <p className="text-xs text-slate-400">
                Plug your future Node.js, Python, or Go microservice directly into ParkSG
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

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-300">
          {/* Custom Backend URL Connector */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white flex items-center gap-1.5">
                <Server className="w-4 h-4 text-emerald-400" />
                Live Backend Connection Endpoint
              </span>
              <span className="text-[11px] text-emerald-400 font-mono">
                Currently using: Direct Data.gov.sg API
              </span>
            </div>

            <p className="text-slate-400 text-[11px]">
              When you launch your backend, paste your local or production endpoint here to route carpark queries through your server:
            </p>

            <div className="flex gap-2">
              <input
                type="text"
                value={testUrl}
                onChange={(e) => setTestUrl(e.target.value)}
                placeholder="http://localhost:5000/api/carparks"
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
              />
              <button
                type="button"
                onClick={handleTestBackend}
                disabled={testStatus === 'testing'}
                className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Test &amp; Connect</span>
              </button>
            </div>

            {testMessage && (
              <div
                className={`p-2.5 rounded-lg border text-[11px] font-mono ${
                  testStatus === 'success'
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                    : testStatus === 'failed'
                    ? 'bg-rose-950/40 border-rose-500/40 text-rose-300'
                    : 'bg-slate-900 border-slate-800 text-slate-300'
                }`}
              >
                {testMessage}
              </div>
            )}
          </div>

          {/* Live Serverless Endpoints Table */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-sm">Active Serverless LTA Endpoints</h3>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                Serverless Active in /api
              </span>
            </div>
            <div className="bg-slate-950 rounded-xl border border-slate-800 divide-y divide-slate-800">
              {/* /api/carparkavailability */}
              <div className="p-3.5 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      GET
                    </span>
                    <span className="font-mono text-white text-xs font-semibold">/api/carparkavailability</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Pulls live carpark lots directly from LTA DataMall v2 (<code className="text-slate-300">CarParkAvailabilityv2</code>) using your <code className="text-slate-300">AccountKey</code> header. Aggregates HDB, LTA, and URA lots across Singapore.
                  </p>
                  <p className="text-[10px] text-slate-500 font-mono">
                    Query options: <span className="text-slate-400">?all=true</span> (fetch all pages) or <span className="text-slate-400">?$skip=500</span>
                  </p>
                </div>
                <a
                  href="/api/carparkavailability"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 text-[11px] font-semibold text-emerald-400 bg-slate-900 hover:bg-slate-800 rounded border border-slate-700 shrink-0 self-start text-center flex items-center gap-1"
                >
                  <span>Test Endpoint</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* /api/health */}
              <div className="p-3.5 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      GET
                    </span>
                    <span className="font-mono text-white text-xs font-semibold">/api/health</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Health status check verifying uptime, environment state, and whether <code className="text-slate-300">LTA_DATAMALL_ACCOUNT_KEY</code> is loaded.
                  </p>
                </div>
                <a
                  href="/api/health"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 text-[11px] font-semibold text-cyan-400 bg-slate-900 hover:bg-slate-800 rounded border border-slate-700 shrink-0 self-start text-center flex items-center gap-1"
                >
                  <span>Test Endpoint</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="p-3 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      GET
                    </span>
                    <span className="font-mono text-white text-xs">/api/carparks/:code/availability</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Real-time polling hook for single carpark (e.g. <code className="text-slate-300">/api/carparks/HE12/availability</code>).
                  </p>
                </div>
                <span className="text-slate-500 font-mono text-[11px] shrink-0">Real-time object</span>
              </div>

              <div className="p-3 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      WS
                    </span>
                    <span className="font-mono text-white text-xs">/api/carparks/stream</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Optional WebSocket stream for sub-second lot occupancy updates from gantry sensors.
                  </p>
                </div>
                <span className="text-slate-500 font-mono text-[11px] shrink-0">WebSocket</span>
              </div>
            </div>
          </div>

          {/* Code Starter Templates */}
          <div className="space-y-4">
            <h3 className="font-bold text-white text-sm">Backend Starter Snippets</h3>

            {/* Express */}
            <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
              <div className="flex items-center justify-between p-3 bg-slate-900/60 border-b border-slate-800">
                <span className="font-mono font-bold text-emerald-400">Node.js (Express &amp; TypeScript)</span>
                <button
                  type="button"
                  onClick={() => handleCopy(expressSnippet, 'express')}
                  className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded transition-colors"
                >
                  {copiedSection === 'express' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSection === 'express' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-4 text-[11px] font-mono text-slate-300 overflow-x-auto leading-relaxed">
                {expressSnippet}
              </pre>
            </div>

            {/* FastAPI */}
            <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
              <div className="flex items-center justify-between p-3 bg-slate-900/60 border-b border-slate-800">
                <span className="font-mono font-bold text-cyan-400">Python (FastAPI &amp; HTTPX)</span>
                <button
                  type="button"
                  onClick={() => handleCopy(fastApiSnippet, 'fastapi')}
                  className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded transition-colors"
                >
                  {copiedSection === 'fastapi' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSection === 'fastapi' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-4 text-[11px] font-mono text-slate-300 overflow-x-auto leading-relaxed">
                {fastApiSnippet}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
