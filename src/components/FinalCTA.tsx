import React from 'react';
import { ChevronRight, Radio, ShieldCheck, Mail, Phone, Cpu } from 'lucide-react';

interface FinalCTAProps {
  onRequestDemo: () => void;
  onExploreTop: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onRequestDemo, onExploreTop }) => {
  return (
    <section className="py-28 bg-[#0B0F15] relative overflow-hidden border-t border-white/10">
      
      {/* Factory Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/images/factory-bg.jpg"
          alt="Industrial Plant Background"
          className="w-full h-full object-cover object-center opacity-20 filter brightness-50 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F15] via-transparent to-[#0B0F15]" />
      </div>

      {/* Ambient glowing spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-tech-grid opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="panel-industrial p-8 sm:p-16 rounded-3xl border border-cyan/40 bg-industrial-900/90 text-center max-w-4xl mx-auto tech-corner-tl tech-corner-br shadow-[0_0_50px_rgba(0,240,255,0.1)]">
          
          {/* Top Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-cyan/40 bg-cyan/10 text-cyan text-xs font-mono font-semibold tracking-widest uppercase mb-8">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>DEPLOY MACHINE DNA™ ON YOUR ROTATING ASSETS</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-tight mb-6">
            KNOW YOUR MACHINE.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan via-white to-cyan/80">
              BEFORE IT FAILS.
            </span>
          </h2>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed mb-10">
            MACHINE DNA transforms high-frequency motor telemetry into continuous, actionable machine intelligence. Protect critical production lines against unplanned downtime today.
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <button
              onClick={onRequestDemo}
              className="px-8 py-4 bg-cyan text-black font-mono font-bold text-sm tracking-wider uppercase rounded-lg hover:bg-cyan/90 transition-all shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:shadow-[0_0_40px_rgba(0,240,255,0.6)] active:scale-95 flex items-center space-x-2"
            >
              <span>REQUEST A PILOT DEMO</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={onExploreTop}
              className="px-7 py-4 border border-white/20 hover:border-cyan/50 bg-industrial-950 text-slate-200 font-mono text-sm tracking-wider uppercase rounded-lg transition-all"
            >
              REPLAY 3D SEQUENCE
            </button>
          </div>

          {/* Footer Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-white/10 text-xs font-mono text-slate-400">
            <div className="flex items-center justify-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-cyan" />
              <span>NON-INVASIVE SENSOR CLAMPING</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Cpu className="w-4 h-4 text-cyan" />
              <span>ESP32 EDGE COMPUTATION</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Radio className="w-4 h-4 text-cyan" />
              <span>PLUG & PLAY MQTT / REST</span>
            </div>
          </div>

        </div>

        {/* Bottom copyright & engineering note */}
        <div className="mt-16 text-center text-xs font-mono text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto border-t border-white/5 pt-8">
          <div>
            © 2026 MACHINE DNA™ Technologies. All rights reserved.
          </div>
          <div className="flex items-center space-x-4 text-slate-400">
            <span>AI Predictive Maintenance System</span>
            <span>•</span>
            <span className="text-cyan font-bold">ESP32 POWERED</span>
          </div>
        </div>

      </div>
    </section>
  );
};
