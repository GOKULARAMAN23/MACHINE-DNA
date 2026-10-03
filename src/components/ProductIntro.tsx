import React, { useState } from 'react';
import { Activity, Thermometer, Zap, Gauge, ArrowUpRight, Cpu, Radio, Shield } from 'lucide-react';

export const ProductIntro: React.FC = () => {
  const [activeParam, setActiveParam] = useState<number>(0);

  const parameters = [
    {
      id: 'vibration',
      title: 'VIBRATION',
      subtitle: 'Mechanical condition',
      sensor: 'MPU-6050 6-DOF IMU',
      spec: 'Tri-axial acceleration & angular rate',
      range: '±2g / ±4g / ±8g / ±16g',
      role: 'Captures micro-vibrations, rotor imbalance, bearing misalignment, and structural looseness.',
      icon: Activity,
      color: 'text-cyan',
      borderColor: 'border-cyan/40',
      bgColor: 'bg-cyan/10',
      metric: '1.02 g',
      unit: 'RMS Velocity',
      status: 'ISO 10816 Class II: Zone A',
    },
    {
      id: 'temperature',
      title: 'TEMPERATURE',
      subtitle: 'Thermal condition',
      sensor: 'DS18B20 1-Wire Digital Probe',
      spec: 'Direct casing / bearing thermal coupling',
      range: '-55°C to +125°C (±0.5°C accuracy)',
      role: 'Monitors friction heat dissipation, cooling degradation, and stator winding thermal strain.',
      icon: Thermometer,
      color: 'text-amber',
      borderColor: 'border-amber/40',
      bgColor: 'bg-amber/10',
      metric: '36.5 °C',
      unit: 'Casing Surface',
      status: 'Delta-T: +4.2°C above ambient',
    },
    {
      id: 'current',
      title: 'CURRENT',
      subtitle: 'Electrical load',
      sensor: 'ACS712 Hall-Effect Sensor',
      spec: 'Isolated AC/DC current transducer',
      range: '0 to 20A / 30A True RMS',
      role: 'Measures load surges, phase imbalances, rotor bar fractures, and stator winding electrical resistance.',
      icon: Zap,
      color: 'text-cyan',
      borderColor: 'border-cyan/40',
      bgColor: 'bg-cyan/10',
      metric: '0.82 A',
      unit: 'Phase Amperage',
      status: 'Power Factor: 0.92 Optimal',
    },
    {
      id: 'rpm',
      title: 'RPM',
      subtitle: 'Rotational behavior',
      sensor: 'Infrared Optical Speed Sensor',
      spec: 'Shaft pulse encoder / slotted disc',
      range: '0 to 10,000 RPM (High resolution)',
      role: 'Tracks rotational velocity, slip frequency, belt slippage, and mechanical torque drag.',
      icon: Gauge,
      color: 'text-phosphor',
      borderColor: 'border-phosphor/40',
      bgColor: 'bg-phosphor/10',
      metric: '1460 RPM',
      unit: '4-Pole Induction',
      status: 'Slip Ratio: 2.67% Nominal',
    },
  ];

  return (
    <section className="py-24 bg-[#07090D] relative overflow-hidden border-t border-white/5" id="technology">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded border border-cyan/30 bg-cyan/10 text-cyan text-[11px] font-mono font-semibold tracking-widest uppercase mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>SECTION 01 — MULTI-PARAMETER SENSING</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight mb-6">
            MEET MACHINE DNA™
          </h2>

          <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed mb-4">
            <strong className="text-white font-semibold">MACHINE DNA</strong> transforms raw motor telemetry into machine intelligence.
          </p>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            An industrial motor rarely fails without warning. Before catastrophic burnout or bearing seizure occurs, the machine exhibits subtle shifts across its physical harmonics, thermal signature, electrical load draw, and rotational slip. MACHINE DNA continuously monitors these four fundamental parameters at the edge to detect abnormal behavior before irreversible breakdown.
          </p>
        </div>

        {/* 4 Parameters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {parameters.map((param, index) => {
            const Icon = param.icon;
            const isSelected = activeParam === index;
            return (
              <div
                key={param.id}
                onClick={() => setActiveParam(index)}
                className={`panel-industrial rounded-xl p-6 transition-all duration-300 cursor-pointer relative overflow-hidden tech-corner-tl ${
                  isSelected
                    ? 'border-cyan/60 shadow-[0_0_30px_rgba(0,240,255,0.15)] bg-industrial-900/90 transform -translate-y-1'
                    : 'border-white/10 hover:border-white/20 hover:bg-industrial-900/70'
                }`}
              >
                {/* Active glow bar */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 transition-colors duration-300 ${
                    isSelected ? 'bg-cyan' : 'bg-transparent'
                  }`}
                />

                {/* Top icon and badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className={`p-3 rounded-lg ${param.bgColor} border ${param.borderColor}`}>
                    <Icon className={`w-6 h-6 ${param.color}`} />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 bg-industrial-950 px-2 py-1 rounded border border-white/5">
                    PARAM 0{index + 1}
                  </span>
                </div>

                {/* Title & subtitle */}
                <div className="mb-4">
                  <h3 className="text-lg font-display font-bold text-white tracking-wide flex items-center justify-between">
                    <span>{param.title}</span>
                    <ArrowUpRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-cyan translate-x-0.5 -translate-y-0.5' : 'text-slate-600'}`} />
                  </h3>
                  <div className="text-xs font-mono text-cyan tracking-wider uppercase">
                    {param.subtitle}
                  </div>
                </div>

                {/* Live sample readout */}
                <div className="bg-black/50 rounded-lg p-3 border border-white/5 mb-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-mono font-bold text-white tracking-tight">
                      {param.metric}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {param.unit}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-phosphor mt-1 flex items-center space-x-1">
                    <Shield className="w-3 h-3 text-phosphor" />
                    <span>{param.status}</span>
                  </div>
                </div>

                {/* Sensor model badge */}
                <div className="text-xs font-mono text-slate-300 bg-industrial-800/80 px-2.5 py-1.5 rounded border border-white/5 mb-3 flex items-center justify-between">
                  <span className="text-slate-400">SENSOR</span>
                  <span className="text-cyan font-bold">{param.sensor}</span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-400 leading-relaxed">
                  {param.role}
                </p>
              </div>
            );
          })}
        </div>

        {/* Comparison Callout Box: Traditional vs MACHINE DNA */}
        <div className="mt-12 panel-industrial p-6 sm:p-8 rounded-xl border border-cyan/30 relative overflow-hidden bg-tech-grid-dense">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            {/* Traditional */}
            <div className="p-5 rounded-lg bg-industrial-950/80 border border-danger/30">
              <div className="flex items-center space-x-2 text-danger font-mono text-xs font-bold uppercase mb-2">
                <span className="w-2 h-2 rounded-full bg-danger" />
                <span>TRADITIONAL REACTIVE MONITORING</span>
              </div>
              <div className="text-xl font-display font-bold text-white mb-2 italic">
                "Motor is overheating."
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Threshold alarms only trigger when the motor has already sustained internal insulation damage, melted lubricant grease, or experienced bearing spalling. At this point, downtime and costly repairs are inevitable.
              </p>
            </div>

            {/* MACHINE DNA */}
            <div className="p-5 rounded-lg bg-industrial-950/80 border border-cyan/50 shadow-[0_0_25px_rgba(0,240,255,0.1)]">
              <div className="flex items-center space-x-2 text-cyan font-mono text-xs font-bold uppercase mb-2">
                <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
                <span>MACHINE DNA™ PREDICTIVE INTELLIGENCE</span>
              </div>
              <div className="text-xl font-display font-bold text-white mb-2 italic text-cyan">
                "Abnormal motor behavior detected. Failure risk is increasing."
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                By fusing cross-sensor correlations (e.g. harmonic vibration frequency shifts combined with sub-degree temperature rise and micro-current ripple), MACHINE DNA warns maintenance teams weeks before physical damage takes place.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
