import React, { useState } from 'react';
import { useTelemetry } from '../hooks/useTelemetry';
import { Activity, Thermometer, Zap, Gauge, ShieldCheck, AlertTriangle, AlertOctagon, RefreshCw, Radio, Play } from 'lucide-react';
import { AnomalyPreset } from '../types/telemetry';

export const LiveDashboard: React.FC = () => {
  const { telemetry, history, activePreset, setPreset } = useTelemetry();
  const [activeChart, setActiveChart] = useState<'vibration' | 'temperature' | 'current' | 'rpm' | 'health'>('vibration');

  // Chart min/max scaling helpers
  const getPoints = (key: 'vibration' | 'temperature' | 'current' | 'rpm' | 'health') => {
    if (!history.length) return '';
    const values = history.map((h) => h[key]);
    const min = Math.min(...values) * 0.92;
    const max = Math.max(...values) * 1.08 || 1;
    const range = max - min || 1;

    const width = 800;
    const height = 200;

    return values
      .map((val, idx) => {
        const x = (idx / (values.length - 1)) * width;
        const y = height - ((val - min) / range) * (height - 30) - 15;
        return `${x},${y}`;
      })
      .join(' ');
  };

  const getAreaPoints = (key: 'vibration' | 'temperature' | 'current' | 'rpm' | 'health') => {
    const pts = getPoints(key);
    if (!pts) return '';
    const firstX = '0,200';
    const lastX = '800,200';
    return `${firstX} ${pts} ${lastX}`;
  };

  const statusColor = 
    telemetry.status === 'NORMAL' ? 'text-phosphor' :
    telemetry.status === 'WARNING' ? 'text-amber' : 'text-danger';

  const statusBorder =
    telemetry.status === 'NORMAL' ? 'border-phosphor/40' :
    telemetry.status === 'WARNING' ? 'border-amber/40' : 'border-danger/40';

  const statusBg =
    telemetry.status === 'NORMAL' ? 'bg-phosphor/10' :
    telemetry.status === 'WARNING' ? 'bg-amber/10' : 'bg-danger/10';

  return (
    <section className="py-24 bg-[#0B0F15] relative overflow-hidden border-t border-white/5" id="monitoring">
      
      {/* Dense grid background */}
      <div className="absolute inset-0 bg-tech-grid-dense opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded border border-cyan/30 bg-cyan/10 text-cyan text-[11px] font-mono font-semibold tracking-widest uppercase mb-4">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>SECTION 04 — SCADA TELEMETRY CONSOLE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
              REAL-TIME MOTOR<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-slate-200">
                HEALTH DASHBOARD.
              </span>
            </h2>
          </div>

          {/* Interactive Simulation Preset Buttons */}
          <div className="flex flex-col space-y-2">
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
              <Play className="w-3 h-3 text-cyan" />
              <span>INTERACTIVE ANOMALY SIMULATION:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(
                [
                  { id: 'NORMAL', label: 'NORMAL OPERATION', color: 'border-phosphor/40 hover:bg-phosphor/10 text-phosphor' },
                  { id: 'VIBRATION_SPIKE', label: 'VIBRATION IMBALANCE', color: 'border-amber/40 hover:bg-amber/10 text-amber' },
                  { id: 'THERMAL_OVERHEAT', label: 'THERMAL OVERLOAD', color: 'border-amber/40 hover:bg-amber/10 text-amber' },
                  { id: 'BEARING_FAULT', label: 'BEARING CAGE FAULT', color: 'border-danger/40 hover:bg-danger/10 text-danger' },
                ] as const
              ).map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => setPreset(preset.id as AnomalyPreset)}
                  className={`px-3 py-1.5 rounded text-xs font-mono font-bold transition-all border ${
                    activePreset === preset.id
                      ? `${preset.color} bg-black/80 shadow-md shadow-cyan/10`
                      : 'border-white/10 text-slate-400 hover:text-white bg-industrial-900/60'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Top 6 KPI Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          
          {/* Motor Health */}
          <div className="panel-industrial p-4 rounded-xl border border-white/10 relative overflow-hidden tech-corner-tl">
            <div className="text-[10px] font-mono text-slate-400 mb-1">MOTOR HEALTH</div>
            <div className={`text-2xl sm:text-3xl font-mono font-bold ${statusColor}`}>
              {telemetry.healthScore}%
            </div>
            <div className="w-full bg-industrial-800 rounded-full h-1.5 mt-2 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  telemetry.healthScore > 75 ? 'bg-phosphor' : telemetry.healthScore > 50 ? 'bg-amber' : 'bg-danger'
                }`}
                style={{ width: `${telemetry.healthScore}%` }}
              />
            </div>
          </div>

          {/* Temperature */}
          <div className="panel-industrial p-4 rounded-xl border border-white/10 relative overflow-hidden">
            <div className="text-[10px] font-mono text-slate-400 mb-1">TEMPERATURE</div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-white">
              {telemetry.temperature} <span className="text-sm font-normal text-slate-400">°C</span>
            </div>
            <div className="text-[10px] font-mono text-slate-500 mt-1 flex items-center space-x-1">
              <Thermometer className="w-3 h-3 text-amber" />
              <span>CASING PROBE</span>
            </div>
          </div>

          {/* Vibration */}
          <div className="panel-industrial p-4 rounded-xl border border-white/10 relative overflow-hidden">
            <div className="text-[10px] font-mono text-slate-400 mb-1">VIBRATION</div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-cyan">
              {telemetry.vibration} <span className="text-sm font-normal text-slate-400">g</span>
            </div>
            <div className="text-[10px] font-mono text-slate-500 mt-1 flex items-center space-x-1">
              <Activity className="w-3 h-3 text-cyan" />
              <span>RMS TRI-AXIS</span>
            </div>
          </div>

          {/* Current */}
          <div className="panel-industrial p-4 rounded-xl border border-white/10 relative overflow-hidden">
            <div className="text-[10px] font-mono text-slate-400 mb-1">CURRENT</div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-white">
              {telemetry.current} <span className="text-sm font-normal text-slate-400">A</span>
            </div>
            <div className="text-[10px] font-mono text-slate-500 mt-1 flex items-center space-x-1">
              <Zap className="w-3 h-3 text-cyan" />
              <span>ISOLATED RMS</span>
            </div>
          </div>

          {/* RPM */}
          <div className="panel-industrial p-4 rounded-xl border border-white/10 relative overflow-hidden">
            <div className="text-[10px] font-mono text-slate-400 mb-1">RPM SPEED</div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-white">
              {telemetry.rpm}
            </div>
            <div className="text-[10px] font-mono text-slate-500 mt-1 flex items-center space-x-1">
              <Gauge className="w-3 h-3 text-phosphor" />
              <span>4-POLE SHAFT</span>
            </div>
          </div>

          {/* Failure Risk & Status */}
          <div className={`panel-industrial p-4 rounded-xl border ${statusBorder} ${statusBg} relative overflow-hidden tech-corner-br`}>
            <div className="text-[10px] font-mono text-slate-400 mb-1">FAILURE RISK</div>
            <div className={`text-2xl sm:text-3xl font-mono font-bold ${statusColor}`}>
              {telemetry.failureRisk}%
            </div>
            <div className={`text-[10px] font-mono font-bold mt-1 uppercase flex items-center space-x-1 ${statusColor}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              <span>STATUS: {telemetry.status}</span>
            </div>
          </div>

        </div>

        {/* Live Industrial Oscilloscope / SCADA Graph Container */}
        <div className="panel-industrial p-6 rounded-2xl border border-cyan/40 bg-industrial-900/90 relative overflow-hidden tech-corner-tl tech-corner-br">
          
          {/* Chart Header & Stream Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan animate-pulse" />
              <div>
                <div className="text-sm font-display font-bold text-white uppercase tracking-wider">
                  REAL-TIME TELEMETRY WAVEFORM STREAM
                </div>
                <div className="text-[10px] font-mono text-slate-400">
                  ESP32 REAL-TIME BUFFERED SAMPLING @ 1000 HZ (10 HZ VISUAL UPDATE)
                </div>
              </div>
            </div>

            {/* Stream tabs */}
            <div className="flex items-center space-x-1 bg-black/50 p-1 rounded-lg border border-white/5">
              {(
                [
                  { id: 'vibration', label: 'VIBRATION (g)' },
                  { id: 'temperature', label: 'TEMP (°C)' },
                  { id: 'current', label: 'CURRENT (A)' },
                  { id: 'rpm', label: 'RPM' },
                  { id: 'health', label: 'HEALTH SCORE' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveChart(tab.id)}
                  className={`px-3 py-1 text-[11px] font-mono font-semibold rounded transition-all ${
                    activeChart === tab.id
                      ? 'bg-cyan text-black shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Waveform Rendering */}
          <div className="relative h-64 w-full bg-black/60 rounded-xl p-4 border border-white/5 flex flex-col justify-between scanline-overlay">
            
            {/* Background Grid Horizontal Lines */}
            <div className="absolute inset-x-4 inset-y-4 flex flex-col justify-between pointer-events-none opacity-20">
              <div className="border-b border-cyan/40 w-full" />
              <div className="border-b border-cyan/40 w-full" />
              <div className="border-b border-cyan/40 w-full" />
              <div className="border-b border-cyan/40 w-full" />
            </div>

            {/* SVG Sparkline & Fill */}
            <svg
              viewBox="0 0 800 200"
              preserveAspectRatio="none"
              className="w-full h-full relative z-10 overflow-visible"
            >
              <defs>
                <linearGradient id="cyanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#00F0FF" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Area polygon */}
              <polygon
                points={getAreaPoints(activeChart)}
                fill="url(#cyanGradient)"
              />

              {/* Polyline trace */}
              <polyline
                fill="none"
                stroke="#00F0FF"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={getPoints(activeChart)}
              />
            </svg>

            {/* Live Timestamp Ticker */}
            <div className="relative z-20 flex items-center justify-between text-[10px] font-mono text-slate-500 pt-2 border-t border-white/5">
              <span>ROLLING WINDOW: LAST 20 SAMPLES</span>
              <div className="flex items-center space-x-2 text-cyan">
                <RefreshCw className="w-3 h-3 animate-spin" />
                <span>LIVE TELEMETRY STREAMING</span>
              </div>
            </div>

          </div>

          {/* Diagnostic Note */}
          <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-mono text-slate-400 gap-2">
            <div className="flex items-center space-x-2">
              <span className="text-slate-500">EDGE RECOGNITION MODEL:</span>
              <span className="text-slate-200">ESP32 ON-CHIP TENSOR FLOW LITE EMBEDDED</span>
            </div>
            <div className="text-cyan">
              LAST INFERENCE LATENCY: <span className="font-bold">4.2 ms</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
