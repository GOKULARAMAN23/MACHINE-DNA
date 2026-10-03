import React from 'react';
import { Eye, Zap, RefreshCcw, Clock, BarChart3, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const ProductBenefits: React.FC = () => {
  const benefits = [
    {
      icon: Eye,
      title: 'REAL-TIME MONITORING',
      tagline: 'Continuous visibility into motor condition',
      description: 'Stream live vibration, temperature, current, and rotational speed at millisecond resolution directly to your central SCADA and cloud telemetry lake.',
      metric: '1000 Hz',
      metricLabel: 'EDGE SAMPLING RATE',
    },
    {
      icon: Zap,
      title: 'EARLY ANOMALY DETECTION',
      tagline: 'Identify abnormal operating patterns',
      description: 'Detect micro-harmonic frequency shifts and low-level thermal drift weeks before traditional threshold alarms or human ear detection.',
      metric: '3-6 WEEKS',
      metricLabel: 'ADVANCE LEAD TIME',
    },
    {
      icon: RefreshCcw,
      title: 'PREDICTIVE MAINTENANCE',
      tagline: 'From reactive firefighting to condition-based planning',
      description: 'Eliminate arbitrary calendar-based maintenance schedules. Replace bearings and top up grease strictly when machine telemetry dictates.',
      metric: '-45%',
      metricLabel: 'UNPLANNED OUTAGES',
    },
    {
      icon: Clock,
      title: 'REDUCED DOWNTIME',
      tagline: 'Identify problems before unexpected failure',
      description: 'Prevent catastrophic rotor seizure, stator burnout, and cascading gearbox damage that halts high-throughput automated assembly lines.',
      metric: '99.4%',
      metricLabel: 'PLANT AVAILABILITY',
    },
    {
      icon: BarChart3,
      title: 'DATA-DRIVEN DECISIONS',
      tagline: 'Turn raw sensor measurements into actionable machine information',
      description: 'Empower plant engineers with deterministic condition scores, spectral FFT graphs, and clear maintenance dispatch instructions.',
      metric: '100%',
      metricLabel: 'AUDITABLE TELEMETRY',
    },
  ];

  return (
    <section className="py-24 bg-[#0B0F15] relative overflow-hidden border-t border-white/5">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded border border-cyan/30 bg-cyan/10 text-cyan text-[11px] font-mono font-semibold tracking-widest uppercase mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>SECTION 08 — OPERATIONAL IMPACT</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight mb-4">
            WHY INDUSTRY LEADERS<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-slate-200">
              CHOOSE MACHINE DNA™.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-400 font-normal leading-relaxed">
            Move from expensive reactive motor replacements to predictable, condition-based operational reliability.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, index) => {
            const Icon = b.icon;
            return (
              <div
                key={index}
                className="panel-industrial p-6 sm:p-7 rounded-2xl border border-white/10 hover:border-cyan/40 bg-industrial-900/80 transition-all duration-300 flex flex-col justify-between tech-corner-tl"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3 rounded-lg bg-cyan/10 border border-cyan/30">
                      <Icon className="w-5 h-5 text-cyan" />
                    </div>
                    <span className="text-xs font-mono text-slate-500">0{index + 1}</span>
                  </div>

                  <h3 className="text-lg font-display font-bold text-white mb-1.5">
                    {b.title}
                  </h3>
                  <div className="text-xs font-mono text-cyan mb-3 font-semibold">
                    {b.tagline}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6 font-normal">
                    {b.description}
                  </p>
                </div>

                {/* Metric footer */}
                <div className="bg-black/50 p-3.5 rounded-xl border border-white/5 flex items-baseline justify-between">
                  <div>
                    <span className="text-2xl font-mono font-bold text-white">{b.metric}</span>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cyan font-semibold">
                    {b.metricLabel}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
