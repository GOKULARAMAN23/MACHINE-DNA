import React from 'react';
import { Factory, Cog, Wind, Compass, Wrench, Shield, CheckCircle, Cpu } from 'lucide-react';

export const Applications: React.FC = () => {
  const applications = [
    {
      title: 'PUMPS & CENTRIFUGAL DRIVES',
      category: 'FLUID & CHEMICAL HANDLING',
      description: 'Continuous monitoring of impeller cavitation, seal degradation, and bearing misalignment in high-duty slurry and coolant pumps.',
      kpis: ['Cavitation harmonic detection', 'Dry-run overheating warning', 'Impeller imbalance tracking'],
      operatingHours: '24/7 Continuous Duty',
      environment: 'IP65 Wet / Washdown Zones',
    },
    {
      title: 'CONVEYOR & MATERIAL HANDLING',
      category: 'LOGISTICS & MINING',
      description: 'Prevents catastrophic belt stoppage across bulk handling conveyors, bucket elevators, and high-throughput distribution hubs.',
      kpis: ['Roller bearing seizure warning', 'Motor gearbox load surge tracking', 'Belt slip & speed sync'],
      operatingHours: 'High Duty Dynamic Load',
      environment: 'Dust & High Particle Loading',
    },
    {
      title: 'INDUSTRIAL FANS & BLOWERS',
      category: 'HVAC & EXHAUST VENTILATION',
      description: 'Detects blade aerodynamic unbalance, bearing fluting caused by VFDs, and structural resonance in critical kiln and ventilation systems.',
      kpis: ['Blade erosion unbalance', 'VFD bearing electrical pitting', 'Foundation resonance analysis'],
      operatingHours: 'Continuous Baseline',
      environment: 'High Airflow & Thermal Flux',
    },
    {
      title: 'ROTARY COMPRESSORS & CHILLERS',
      category: 'REFRIGERATION & AIR POWER',
      description: 'Guards screw and reciprocating compressor motors against thermal runaway, valve leakage shock, and lubrication breakdown.',
      kpis: ['Compression stroke harmonic analysis', 'Discharge thermal spike tracking', 'Electrical phase load balancing'],
      operatingHours: 'Intermittent High Pressure',
      environment: 'Enclosed Acoustic Chambers',
    },
    {
      title: 'CNC & PRECISION MACHINE TOOLS',
      category: 'ADVANCED MANUFACTURING',
      description: 'Maintains sub-micron machining tolerances by detecting spindle runout, thermal growth, and tool chatter before workpiece scrap.',
      kpis: ['High-RPM spindle harmonic health', 'Tool chatter vibration alerts', 'Spindle bearing preload loss'],
      operatingHours: 'High-Precision Cycles',
      environment: 'Dielectric Mist & Fine Chips',
    },
    {
      title: 'CONTINUOUS PRODUCTION LINES',
      category: 'HEAVY AUTOMOTIVE & STEEL',
      description: 'Fleet-wide edge deployment protecting hundreds of critical motors across stamping presses, roll forming, and automated assembly cells.',
      kpis: ['Fleet health scoring matrix', 'Instant edge MQTT SCADA sync', 'Shift-level MTBF optimization'],
      operatingHours: '3-Shift Manufacturing',
      environment: 'High Electrical Noise (EMI)',
    },
  ];

  return (
    <section className="py-24 bg-[#07090D] relative overflow-hidden border-t border-white/5" id="applications">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded border border-cyan/30 bg-cyan/10 text-cyan text-[11px] font-mono font-semibold tracking-widest uppercase mb-4">
            <Factory className="w-3.5 h-3.5" />
            <span>SECTION 07 — FIELD DEPLOYMENTS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight mb-4">
            BUILT FOR INDUSTRIAL<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-slate-200">
              ROTATING ASSETS.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-400 font-normal leading-relaxed">
            From heavy chemical process pumps to high-speed CNC spindles, MACHINE DNA brings non-invasive predictive intelligence to every critical motor on your facility floor.
          </p>
        </div>

        {/* 6 High-Impact Industrial Application Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((app, index) => (
            <div
              key={index}
              className="panel-industrial p-6 rounded-2xl border border-white/10 hover:border-cyan/40 bg-industrial-900/80 transition-all duration-300 flex flex-col justify-between group tech-corner-tl"
            >
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan bg-cyan/10 px-2.5 py-1 rounded border border-cyan/20">
                    {app.category}
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    0{index + 1}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-cyan transition-colors">
                  {app.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                  {app.description}
                </p>

                {/* Key KPIs */}
                <div className="space-y-2 mb-6">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                    MONITORED ANOMALIES:
                  </div>
                  {app.kpis.map((kpi, kIdx) => (
                    <div key={kIdx} className="flex items-center space-x-2 text-xs font-mono text-slate-300">
                      <CheckCircle className="w-3 h-3 text-cyan shrink-0" />
                      <span>{kpi}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Environmental Footer */}
              <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-400">
                <div>
                  <span className="text-slate-500 block">DUTY PROFILE:</span>
                  <span className="text-slate-200">{app.operatingHours}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">RATING:</span>
                  <span className="text-cyan font-bold">{app.environment}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
