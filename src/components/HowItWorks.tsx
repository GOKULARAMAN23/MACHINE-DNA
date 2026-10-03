import React, { useState, useEffect } from 'react';
import { Cpu, ArrowRight, ArrowDown, Activity, Sparkles, ShieldAlert, CheckCircle, Database, Network } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const pipelineSteps = [
    {
      step: '01',
      title: 'INDUSTRIAL MOTOR',
      category: 'SOURCE ASSET',
      description: 'Physical 3-phase induction motor, drive assembly, or pump operating under variable load conditions.',
      telemetry: 'Mechanical & electromagnetic physical vibration, thermal flux, and current draw.',
      badge: 'PHYSICAL PHENOMENA',
      icon: Activity,
    },
    {
      step: '02',
      title: 'MULTI-SENSOR ARRAY',
      category: 'PHYSICAL ACQUISITION',
      description: 'MPU6050 (Vibration), DS18B20 (Temperature), ACS712 (Current), and Optical IR (RPM) continuously probe operating state.',
      telemetry: 'Synchronized multi-channel analog & digital sensor telemetry.',
      badge: '1000 Hz HIGH DENSITY',
      icon: Network,
    },
    {
      step: '03',
      title: 'ESP32 EDGE CONTROLLER',
      category: 'EDGE HARDWARE',
      description: 'Dual-core 240MHz microcontroller aggregates raw channels, executes hardware DMA sampling, and applies anti-aliasing filters.',
      telemetry: 'Real-time FreeRTOS buffered edge data acquisition pipeline.',
      badge: 'DUAL-CORE LX6 @ 240MHz',
      icon: Cpu,
    },
    {
      step: '04',
      title: 'FEATURE EXTRACTION',
      category: 'DSP & TIME-FREQUENCY',
      description: 'Computes FFT power spectrum, spectral kurtosis, crest factor, harmonic sidebands, and true RMS envelope on-device.',
      telemetry: 'Compressed 64-dimensional statistical condition fingerprint vector.',
      badge: 'FFT & STATISTICAL MOMENTS',
      icon: Database,
    },
    {
      step: '05',
      title: 'AI ANOMALY DETECTION',
      category: 'PREDICTIVE INFERENCE',
      description: 'Lightweight anomaly detection model compares extracted feature vectors against the motor baseline operating profile.',
      telemetry: 'Deviations from learned nominal behavior flagged in milliseconds.',
      badge: 'BASELINE REGIME SCORING',
      icon: Sparkles,
    },
    {
      step: '06',
      title: 'HEALTH SCORE & FAILURE RISK',
      category: 'CONDITION ASSESSMENT',
      description: 'Outputs a normalized Health Score (0–100%) and Failure Risk Index based on multi-variable degradation curves.',
      telemetry: 'e.g. Health: 94% | Failure Risk: 6% (Nominal) or 72% | Risk 28% (Warning).',
      badge: 'P-F INTERVAL ESTIMATE',
      icon: CheckCircle,
    },
    {
      step: '07',
      title: 'ACTIONABLE INDUSTRIAL ALERT',
      category: 'MAINTENANCE RESPONSE',
      description: 'Issues context-rich diagnostic alerts to shop floor dashboard, SCADA systems, and maintenance engineer mobile devices.',
      telemetry: '"Abnormal vibration pattern detected at drive-end bearing. Recommended: Inspect lubrication."',
      badge: 'PROACTIVE INTERVENTION',
      icon: ShieldAlert,
    },
  ];

  // Auto-advance active step softly
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % pipelineSteps.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [pipelineSteps.length]);

  return (
    <section className="py-24 bg-[#07090D] relative overflow-hidden border-t border-white/5" id="how-it-works">
      
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-tech-grid opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded border border-cyan/30 bg-cyan/10 text-cyan text-[11px] font-mono font-semibold tracking-widest uppercase mb-4">
            <Activity className="w-3.5 h-3.5" />
            <span>SECTION 03 — END-TO-END PIPELINE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight mb-4">
            FROM SENSOR DATA<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-slate-300">
              TO MACHINE INTELLIGENCE.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-400 font-normal leading-relaxed">
            MACHINE DNA transforms raw continuous sensor voltages into actionable maintenance decisions through a deterministic edge-to-intelligence pipeline.
          </p>
        </div>

        {/* Process Flow Cards (Desktop horizontal timeline + vertical responsive list) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {pipelineSteps.slice(0, 4).map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;
            return (
              <div
                key={step.step}
                onClick={() => setActiveStep(idx)}
                className={`panel-industrial p-5 rounded-xl transition-all duration-300 cursor-pointer relative overflow-hidden tech-corner-tl ${
                  isSelected
                    ? 'border-cyan shadow-[0_0_25px_rgba(0,240,255,0.15)] bg-industrial-900'
                    : 'border-white/10 hover:border-white/20 bg-industrial-950/60'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    isSelected ? 'bg-cyan text-black' : 'bg-industrial-800 text-slate-400'
                  }`}>
                    STAGE {step.step}
                  </span>
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-cyan' : 'text-slate-500'}`} />
                </div>
                
                <div className="text-[10px] font-mono text-cyan tracking-wider uppercase mb-1">
                  {step.category}
                </div>
                <h3 className="text-base font-display font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {pipelineSteps.slice(4, 7).map((step, idx) => {
            const realIdx = idx + 4;
            const Icon = step.icon;
            const isSelected = activeStep === realIdx;
            return (
              <div
                key={step.step}
                onClick={() => setActiveStep(realIdx)}
                className={`panel-industrial p-5 rounded-xl transition-all duration-300 cursor-pointer relative overflow-hidden tech-corner-tl ${
                  isSelected
                    ? 'border-cyan shadow-[0_0_25px_rgba(0,240,255,0.15)] bg-industrial-900'
                    : 'border-white/10 hover:border-white/20 bg-industrial-950/60'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    isSelected ? 'bg-cyan text-black' : 'bg-industrial-800 text-slate-400'
                  }`}>
                    STAGE {step.step}
                  </span>
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-cyan' : 'text-slate-500'}`} />
                </div>
                
                <div className="text-[10px] font-mono text-cyan tracking-wider uppercase mb-1">
                  {step.category}
                </div>
                <h3 className="text-base font-display font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Highlighted Step Telemetry Inspector */}
        <div className="panel-industrial p-6 sm:p-8 rounded-xl border border-cyan/40 bg-industrial-900/90 tech-corner-tl tech-corner-br">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-4">
            <div className="flex items-center space-x-3">
              <span className="bg-cyan text-black font-mono font-bold text-xs px-2.5 py-1 rounded">
                PIPELINE STAGE {pipelineSteps[activeStep].step} OF 07
              </span>
              <span className="text-white font-display font-bold text-lg">
                {pipelineSteps[activeStep].title}
              </span>
            </div>
            <span className="text-xs font-mono text-cyan px-2.5 py-1 rounded bg-cyan/10 border border-cyan/30 self-start md:self-auto">
              {pipelineSteps[activeStep].badge}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-1">
                SYSTEM FUNCTION
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">
                {pipelineSteps[activeStep].description}
              </p>
            </div>
            <div className="bg-black/60 p-4 rounded-lg border border-white/5">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1">
                DATA STREAM TELEMETRY
              </div>
              <div className="font-mono text-xs text-cyan">
                {pipelineSteps[activeStep].telemetry}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
