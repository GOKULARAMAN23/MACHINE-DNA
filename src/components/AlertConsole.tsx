import React, { useState } from 'react';
import { AlertTriangle, AlertOctagon, ShieldAlert, CheckCircle2, Terminal, RefreshCw, Send, BellRing } from 'lucide-react';

export const AlertConsole: React.FC = () => {
  const [incidentMode, setIncidentMode] = useState<'warning' | 'critical'>('warning');
  const [acknowledged, setAcknowledged] = useState<boolean>(false);

  const incidents = {
    warning: {
      type: 'WARNING',
      code: 'WARN-VIB-0428',
      title: 'ABNORMAL VIBRATION PATTERN DETECTED',
      aiAnalysis: 'Motor behavior is deviating from its normal operating pattern. High-frequency 2.78g RMS spikes detected on drive-end bearing with emerging sideband modulation.',
      riskLevel: 'INCREASING (28%)',
      confidence: '96.4%',
      assetId: 'PUMP-MOTOR-04 (Line B)',
      recommendedAction: 'Inspect motor condition, verify drive-end bearing grease levels, and check coupling alignment during scheduled shift change.',
      border: 'border-amber/50',
      bg: 'bg-amber/10',
      text: 'text-amber',
      pill: 'bg-amber text-black',
      icon: AlertTriangle,
    },
    critical: {
      type: 'CRITICAL ALARM',
      code: 'CRIT-THR-0912',
      title: 'HIGH BEARING THERMAL & MECHANICAL SEVERITY',
      aiAnalysis: 'Rapid cross-sensor divergence. Temperature elevated to 76.5°C with severe 4.42g vibration shock train. High probability of bearing cage spalling and impending rotor rub.',
      riskLevel: 'CRITICAL (84%)',
      confidence: '99.1%',
      assetId: 'COMPRESSOR-MOTOR-01 (Main Feed)',
      recommendedAction: 'Immediate dispatch required. Prepare backup unit, throttle motor load, and plan controlled shutdown within 12 hours.',
      border: 'border-danger/60',
      bg: 'bg-danger/10',
      text: 'text-danger',
      pill: 'bg-danger text-white',
      icon: AlertOctagon,
    },
  };

  const inc = incidents[incidentMode];
  const Icon = inc.icon;

  return (
    <section className="py-24 bg-[#0B0F15] relative overflow-hidden border-t border-white/5">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded border border-amber/40 bg-amber/10 text-amber text-[11px] font-mono font-semibold tracking-widest uppercase mb-4">
              <BellRing className="w-3.5 h-3.5 animate-bounce" />
              <span>SECTION 06 — INCIDENT & ALERT CONSOLE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
              ACTIONABLE INSIGHTS.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber to-slate-200">
                NOT JUST RAW NUMBERS.
              </span>
            </h2>
          </div>

          {/* Toggle Warning vs Critical demo */}
          <div className="flex items-center space-x-2 self-start md:self-auto">
            <span className="text-xs font-mono text-slate-400">ALERT SIMULATION:</span>
            <div className="flex bg-black/60 p-1 rounded-lg border border-white/10">
              <button
                onClick={() => {
                  setIncidentMode('warning');
                  setAcknowledged(false);
                }}
                className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all ${
                  incidentMode === 'warning' ? 'bg-amber text-black' : 'text-slate-400 hover:text-white'
                }`}
              >
                WARNING DEMO
              </button>
              <button
                onClick={() => {
                  setIncidentMode('critical');
                  setAcknowledged(false);
                }}
                className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all ${
                  incidentMode === 'critical' ? 'bg-danger text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                CRITICAL DEMO
              </button>
            </div>
          </div>
        </div>

        {/* Industrial Dispatch Alert Card */}
        <div
          className={`panel-industrial p-6 sm:p-8 rounded-2xl border ${inc.border} bg-industrial-900/90 transition-all duration-300 tech-corner-tl tech-corner-br shadow-2xl relative overflow-hidden`}
        >
          
          {/* Top Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5 mb-6">
            <div className="flex items-center space-x-3">
              <div className={`p-2.5 rounded-lg ${inc.bg} border ${inc.border}`}>
                <Icon className={`w-6 h-6 ${inc.text} animate-pulse`} />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${inc.pill}`}>
                    {inc.type}
                  </span>
                  <span className="text-xs font-mono text-slate-400">{inc.code}</span>
                </div>
                <div className="text-lg sm:text-xl font-display font-bold text-white mt-1">
                  {inc.title}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 bg-black/40 px-3 py-1.5 rounded border border-white/5 self-start sm:self-auto">
              <span>TARGET:</span>
              <span className="text-white font-bold">{inc.assetId}</span>
            </div>
          </div>

          {/* AI Analysis Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            
            {/* Left AI diagnosis */}
            <div className="lg:col-span-8 space-y-4">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-cyan mb-1 flex items-center space-x-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>AI EDGE DIAGNOSTIC ANALYSIS</span>
                </div>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal bg-black/40 p-4 rounded-xl border border-white/5">
                  "{inc.aiAnalysis}"
                </p>
              </div>

              {/* Recommended action box */}
              <div className="bg-industrial-950 p-4 rounded-xl border border-cyan/30">
                <div className="text-xs font-mono uppercase tracking-widest text-cyan font-bold mb-1">
                  RECOMMENDED MAINTENANCE ACTION
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {inc.recommendedAction}
                </p>
              </div>
            </div>

            {/* Right Risk Matrix */}
            <div className="lg:col-span-4 space-y-3">
              <div className="panel-industrial p-4 rounded-xl border border-white/10 bg-black/50 space-y-3">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                  SEVERITY ASSESSMENT
                </div>
                
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-400">RISK LEVEL:</span>
                  <span className={`font-bold ${inc.text}`}>{inc.riskLevel}</span>
                </div>

                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-400">MODEL CONFIDENCE:</span>
                  <span className="text-cyan font-bold">{inc.confidence}</span>
                </div>

                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-400">NOTIFICATION:</span>
                  <span className="text-phosphor font-bold">SMS / MQTT / EMAIL SENT</span>
                </div>
              </div>

              {/* Action button */}
              <button
                onClick={() => setAcknowledged(!acknowledged)}
                className={`w-full py-3 rounded-lg font-mono text-xs font-bold uppercase transition-all flex items-center justify-center space-x-2 ${
                  acknowledged
                    ? 'bg-phosphor/20 text-phosphor border border-phosphor/50'
                    : 'bg-cyan text-black hover:bg-cyan/90 shadow-md'
                }`}
              >
                {acknowledged ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>INCIDENT ACKNOWLEDGED BY OPERATOR</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>ACKNOWLEDGE & DISPATCH WORK ORDER</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
