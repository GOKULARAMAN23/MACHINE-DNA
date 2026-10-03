import React, { useState } from 'react';
import { Layers, Cpu, Shield, Activity, Radio, Terminal, Sparkles, CheckCircle2 } from 'lucide-react';

export const ExplodedView: React.FC = () => {
  const [selectedPart, setSelectedPart] = useState<string>('esp32');

  const components = [
    {
      id: 'front-cover',
      name: 'FRONT BEZEL & SEAL',
      category: 'CHASSIS',
      tag: '01',
      spec: 'Anodized 6061 Aluminum & NBR Gasket (IP65)',
      description: 'Ruggedized front faceplate with laser-etched alignment markings and viewing aperture for the local status screen.',
      points: ['Corrosion resistant', 'Vibration dampening gasket', 'M3 stainless hex fasteners'],
    },
    {
      id: 'oled',
      name: 'OLED STATUS DISPLAY',
      category: 'DISPLAY',
      tag: '02',
      spec: '0.96" High-Contrast 128x64 I2C Graphic Display',
      description: 'Provides real-time, at-a-glance shop floor metrics including motor health %, temperature, vibration g-force, current, and Wi-Fi status.',
      points: ['Wide viewing angle (>160°)', 'Direct I2C bus @ 400kHz', 'Low power 0.04W consumption'],
    },
    {
      id: 'esp32',
      name: 'ESP32 EDGE CONTROLLER',
      category: 'COMPUTE',
      tag: '03',
      spec: 'Xtensa Dual-Core 32-bit LX6 @ 240 MHz',
      description: 'The core AI compute engine. Handles multi-sensor high-rate sampling, on-device FFT spectral calculations, feature extraction, and secure MQTT/HTTPS telemetry uplink.',
      points: ['520 KB SRAM + 4MB SPI Flash', 'Integrated 802.11 b/g/n Wi-Fi & BLE 4.2', 'Deterministic real-time FreeRTOS tasks'],
    },
    {
      id: 'signal-board',
      name: 'SIGNAL CONDITIONING BOARD',
      category: 'ANALOG',
      tag: '04',
      spec: 'Low-Noise Active Filters & Protection Rail',
      description: 'Custom analog front-end conditioning sensor voltages, providing active 2nd-order Sallen-Key low-pass filtering, anti-aliasing, and ESD surge protection.',
      points: ['Transient voltage suppressor (TVS)', 'Isolated analog ground plane', 'Multi-channel ADC buffering'],
    },
    {
      id: 'enclosure',
      name: 'INDUSTRIAL ENCLOSURE',
      category: 'CHASSIS',
      tag: '05',
      spec: 'Polycarbonate / Die-Cast Polymeric Hybrid (IP65)',
      description: 'Main structural housing containing mounting bosses, shock-absorbing silicone dampeners, and dual M12 industrial cable glands.',
      points: ['DIN-rail and magnetic mounting options', 'Operating range -20°C to +70°C', 'High dielectric strength'],
    },
    {
      id: 'back-cover',
      name: 'BACK COVER & HEAT SINK',
      category: 'CHASSIS',
      tag: '06',
      spec: 'Passive Thermal Backplate with QR Identity',
      description: 'Rear closure featuring integrated thermal transfer interface and unique machine cryptographic ID QR code for instant mobile asset pairing.',
      points: ['Passive conduction cooling', 'Unique MAC identity badge', 'Grounding contact point'],
    },
  ];

  const activeData = components.find((c) => c.id === selectedPart) || components[2];

  return (
    <section className="py-24 bg-[#0B0F15] relative overflow-hidden border-t border-white/5">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-tech-grid opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded border border-cyan/30 bg-cyan/10 text-cyan text-[11px] font-mono font-semibold tracking-widest uppercase mb-4">
              <Layers className="w-3.5 h-3.5" />
              <span>SECTION 02 — HARDWARE ARCHITECTURE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
              PRECISION HARDWARE.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-slate-200">
                ENGINEERED FOR HARSH FACTORY FLOORS.
              </span>
            </h2>
          </div>

          <div className="text-sm font-mono text-slate-400 max-w-sm">
            Designed to withstand industrial electrical noise, mechanical shock, and continuous thermal cycling right on the motor housing.
          </div>
        </div>

        {/* Main Interactive Assembly Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Component Selector Tabs */}
          <div className="lg:col-span-5 space-y-2.5">
            <div className="text-xs font-mono tracking-widest text-slate-400 uppercase mb-3 flex items-center justify-between">
              <span>EXPLODED HARDWARE STACK</span>
              <span className="text-cyan">6 MODULES</span>
            </div>

            {components.map((comp) => {
              const isSelected = selectedPart === comp.id;
              return (
                <button
                  key={comp.id}
                  onClick={() => setSelectedPart(comp.id)}
                  className={`w-full text-left p-3.5 rounded-lg transition-all duration-200 flex items-center justify-between border ${
                    isSelected
                      ? 'bg-industrial-900 border-cyan/60 shadow-[0_0_20px_rgba(0,240,255,0.12)] text-white'
                      : 'bg-industrial-950/60 border-white/5 text-slate-400 hover:border-white/15 hover:text-slate-200 hover:bg-industrial-900/40'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span
                      className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                        isSelected ? 'bg-cyan text-black' : 'bg-industrial-800 text-slate-400'
                      }`}
                    >
                      {comp.tag}
                    </span>
                    <div>
                      <div className="font-display font-bold text-sm text-slate-100">{comp.name}</div>
                      <div className="text-[11px] font-mono text-slate-400">{comp.spec}</div>
                    </div>
                  </div>

                  <span
                    className={`w-2 h-2 rounded-full transition-all ${
                      isSelected ? 'bg-cyan shadow-[0_0_8px_#00F0FF]' : 'bg-industrial-700'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right: Technical Part Spec & Visual Inspection */}
          <div className="lg:col-span-7">
            <div className="panel-industrial p-6 sm:p-8 rounded-xl border border-cyan/40 tech-corner-tl tech-corner-br bg-industrial-900/90 relative">
              
              {/* Top Meta Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded bg-cyan/10 border border-cyan/30 text-cyan text-xs font-mono font-bold">
                    MODULE 0{activeData.tag}
                  </span>
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    {activeData.category} SUBSYSTEM
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-phosphor text-xs font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-phosphor animate-pulse" />
                  <span>QC VERIFIED</span>
                </div>
              </div>

              {/* Title & Spec */}
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
                {activeData.name}
              </h3>
              <div className="text-sm font-mono text-cyan mb-4 font-semibold">
                {activeData.spec}
              </div>

              <p className="text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                {activeData.description}
              </p>

              {/* Engineering Highlights */}
              <div className="space-y-2.5 mb-6">
                <div className="text-xs font-mono uppercase tracking-widest text-slate-400">
                  DESIGN HIGHLIGHTS:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeData.points.map((pt, i) => (
                    <div
                      key={i}
                      className="flex items-center space-x-2 text-xs font-mono text-slate-300 bg-black/40 p-2.5 rounded border border-white/5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hardware Interconnect Schematic Footer */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-3.5 h-3.5 text-cyan" />
                  <span>BUS: I2C / SPI / 1-WIRE / ANALOG ADC</span>
                </div>
                <div className="text-slate-300">
                  ENCLOSURE RATING: <strong className="text-cyan">IP65 / NEMA 4X</strong>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
