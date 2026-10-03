import React, { useState } from 'react';
import { Sparkles, Activity, AlertTriangle, AlertOctagon, CheckCircle2, TrendingDown, Layers, HelpCircle } from 'lucide-react';

export const AIAnomaly: React.FC = () => {
  const [selectedRegime, setSelectedRegime] = useState<'normal' | 'warning' | 'critical'>('normal');

  const regimes = {
    normal: {
      title: 'NORMAL OPERATION',
      health: '94%',
      risk: '6%',
      status: 'STABLE BEHAVIOR',
      color: 'text-phosphor',
      border: 'border-phosphor/40',
      bg: 'bg-phosphor/10',
      description: 'Motor operates inside learned baseline envelope. Tri-axial vibration harmonics match nominal electromagnetic flux with balanced phase current and stable casing heat dissipation.',
      spectralInsight: 'Harmonic peaks centered precisely at 1X rotational frequency (24.3 Hz) with zero sideband modulation.',
      action: 'No intervention required. Standard automated continuous edge polling.',
    },
    warning: {
      title: 'WARNING REGIME',
      health: '72%',
      risk: '28%',
      status: 'INCREASING DEVIATION',
      color: 'text-amber',
      border: 'border-amber/40',
      bg: 'bg-amber/10',
      description: 'Subtle micro-vibration harmonics begin deviating from baseline. Signal conditioning detects low-amplitude high-frequency acceleration bursts indicating early lubrication grease breakdown or minor shaft eccentricity.',
      spectralInsight: 'Emergence of 2X and 3X harmonic sidebands and crest factor elevation above 3.5.',
      action: 'Schedule planned inspection during next standard maintenance window. Top up bearing lubricant.',
    },
    critical: {
      title: 'CRITICAL REGIME',
      health: '38%',
      risk: '84%',
      status: 'STRONG ABNORMAL BEHAVIOR',
      color: 'text-danger',
      border: 'border-danger/40',
      bg: 'bg-danger/10',
      description: 'Severe multi-parameter deviation across vibration, thermal flux, and current draw. High risk of mechanical bearing cage destruction or stator winding insulation breakdown.',
      spectralInsight: 'Broadband floor noise elevation, severe shock impact modulation, and elevated RMS current ripple.',
      action: 'Immediate maintenance intervention required to prevent catastrophic shaft seizure and production stoppage.',
    },
  };

  const current = regimes[selectedRegime];

  return (
    <section className="py-24 bg-[#07090D] relative overflow-hidden border-t border-white/5">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded border border-cyan/30 bg-cyan/10 text-cyan text-[11px] font-mono font-semibold tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SECTION 05 — AI ANOMALY DETECTION ENGINE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight mb-4">
            DETECT THE CHANGE.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan via-amber to-danger">
              BEFORE THE FAILURE.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            <strong className="text-white">MACHINE DNA</strong> analyzes changing machine behavior rather than waiting for a complete failure. By observing micro-trends across vibration, temperature, current, and RPM, the edge model identifies subtle condition degradation.
          </p>
        </div>

        {/* P-F Interval Curve Interactive Diagram */}
        <div className="panel-industrial p-6 sm:p-8 rounded-2xl border border-cyan/40 bg-industrial-900/90 mb-12 tech-corner-tl tech-corner-br">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
            <div>
              <div className="text-sm font-display font-bold text-white uppercase tracking-wider">
                THE PREDICTIVE CONDITION DEGRADATION CURVE (P-F INTERVAL)
              </div>
              <div className="text-xs font-mono text-slate-400">
                POINT OF POTENTIAL FAILURE (P) TO FUNCTIONAL BREAKDOWN (F)
              </div>
            </div>

            {/* Regime Selector */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSelectedRegime('normal')}
                className={`px-3 py-1.5 rounded text-xs font-mono font-bold transition-all border ${
                  selectedRegime === 'normal'
                    ? 'bg-phosphor text-black border-phosphor shadow-[0_0_15px_rgba(0,230,118,0.4)]'
                    : 'border-white/10 text-slate-400 hover:text-white bg-black/40'
                }`}
              >
                NORMAL (94%)
              </button>
              <button
                onClick={() => setSelectedRegime('warning')}
                className={`px-3 py-1.5 rounded text-xs font-mono font-bold transition-all border ${
                  selectedRegime === 'warning'
                    ? 'bg-amber text-black border-amber shadow-[0_0_15px_rgba(255,184,0,0.4)]'
                    : 'border-white/10 text-slate-400 hover:text-white bg-black/40'
                }`}
              >
                WARNING (72%)
              </button>
              <button
                onClick={() => setSelectedRegime('critical')}
                className={`px-3 py-1.5 rounded text-xs font-mono font-bold transition-all border ${
                  selectedRegime === 'critical'
                    ? 'bg-danger text-white border-danger shadow-[0_0_15px_rgba(255,51,75,0.4)]'
                    : 'border-white/10 text-slate-400 hover:text-white bg-black/40'
                }`}
              >
                CRITICAL (38%)
              </button>
            </div>
          </div>

          {/* SVG P-F Curve Diagram */}
          <div className="relative h-64 sm:h-72 w-full bg-black/60 rounded-xl p-4 border border-white/5 flex flex-col justify-between overflow-hidden">
            
            {/* Zone background shading */}
            <div className="absolute inset-0 grid grid-cols-3 pointer-events-none opacity-20">
              <div className="bg-phosphor/10 border-r border-dashed border-phosphor/30" />
              <div className="bg-amber/10 border-r border-dashed border-amber/30" />
              <div className="bg-danger/10" />
            </div>

            <svg viewBox="0 0 900 240" className="w-full h-full relative z-10" preserveAspectRatio="none">
              <defs>
                <linearGradient id="degradationGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00E676" />
                  <stop offset="45%" stopColor="#00E676" />
                  <stop offset="65%" stopColor="#FFB800" />
                  <stop offset="90%" stopColor="#FF334B" />
                  <stop offset="100%" stopColor="#FF334B" />
                </linearGradient>
              </defs>

              {/* Degradation Curve Path */}
              <path
                d="M 50 40 C 300 40, 480 50, 600 110 C 720 170, 780 210, 850 220"
                fill="none"
                stroke="url(#degradationGradient)"
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* MACHINE DNA Detection Point (Early) */}
              <circle cx="500" cy="55" r="7" fill="#00F0FF" className="animate-pulse" />
              <line x1="500" y1="55" x2="500" y2="230" stroke="#00F0FF" strokeWidth="1.5" strokeDasharray="4 4" />
              <text x="508" y="75" fill="#00F0FF" fontSize="11" fontFamily="monospace" fontWeight="bold">
                MACHINE DNA ANOMALY DETECTION (P)
              </text>
              <text x="508" y="90" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                (Weeks before breakdown)
              </text>

              {/* Traditional Sensor Alarm Point (Late) */}
              <circle cx="760" cy="195" r="6" fill="#FF334B" />
              <line x1="760" y1="195" x2="760" y2="230" stroke="#FF334B" strokeWidth="1.5" strokeDasharray="4 4" />
              <text x="640" y="165" fill="#FF334B" fontSize="11" fontFamily="monospace" fontWeight="bold">
                TRADITIONAL ALARM THRESHOLD
              </text>
              <text x="640" y="180" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                (Damage already occurring)
              </text>
            </svg>

            {/* Bottom Timeline Labels */}
            <div className="relative z-20 grid grid-cols-3 text-[11px] font-mono text-center pt-2 border-t border-white/10">
              <div className="text-phosphor font-bold">ZONE A: OPTIMAL BASELINE</div>
              <div className="text-amber font-bold">ZONE B: EARLY DEVIATION</div>
              <div className="text-danger font-bold">ZONE C: CRITICAL DAMAGE</div>
            </div>

          </div>

          {/* Active Regime Telemetry Card */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Condition badge */}
            <div className={`panel-industrial p-5 rounded-xl border ${current.border} ${current.bg}`}>
              <div className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-1">
                OPERATING REGIME
              </div>
              <div className={`text-xl font-display font-bold ${current.color} mb-3`}>
                {current.title}
              </div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-300 py-1.5 border-b border-white/5">
                <span>HEALTH SCORE</span>
                <span className={`font-bold ${current.color}`}>{current.health}</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-300 py-1.5">
                <span>FAILURE RISK</span>
                <span className={`font-bold ${current.color}`}>{current.risk}</span>
              </div>
            </div>

            {/* AI Behavioral Analysis */}
            <div className="panel-industrial p-5 rounded-xl border border-white/10 bg-black/40 lg:col-span-2 space-y-3">
              <div>
                <div className="text-xs font-mono text-cyan uppercase tracking-widest mb-1">
                  AI CONDITION ASSESSMENT
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {current.description}
                </p>
              </div>

              <div className="pt-2 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
                <div className="text-slate-400">
                  SPECTRAL INSIGHT: <span className="text-slate-200">{current.spectralInsight}</span>
                </div>
              </div>

              <div className="bg-industrial-800/80 p-2.5 rounded border border-white/5 text-xs font-mono flex items-center space-x-2">
                <span className="text-cyan font-bold">ACTION:</span>
                <span className="text-slate-300">{current.action}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
