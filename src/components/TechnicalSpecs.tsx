import React from 'react';
import { Sliders, Cpu, Activity, Shield, Download, FileText } from 'lucide-react';

export const TechnicalSpecs: React.FC = () => {
  const specs = [
    { label: 'PRODUCT', value: 'MACHINE DNA™ AI Motor Predictive Maintenance System' },
    { label: 'CONTROLLER', value: 'Espressif ESP32 Dual-Core 32-bit LX6 @ 240 MHz' },
    { label: 'VIBRATION SENSOR', value: 'MPU6050 6-Axis IMU (Tri-Axial Accel ±2g/±16g)' },
    { label: 'TEMPERATURE SENSOR', value: 'DS18B20 1-Wire Digital Thermal Probe (-55°C to +125°C)' },
    { label: 'CURRENT SENSOR', value: 'ACS712 Isolated Hall-Effect Current Transducer (20A/30A RMS)' },
    { label: 'RPM ENCODER', value: 'Infrared Optical Speed Sensor (0–10,000 RPM)' },
    { label: 'LOCAL DISPLAY', value: '0.96" High-Contrast 128×64 Graphic OLED' },
    { label: 'CONNECTIVITY', value: 'Wi-Fi 802.11 b/g/n (2.4 GHz) & Bluetooth 4.2 BLE' },
    { label: 'TELEMETRY DATA', value: 'Real-time multi-channel motor telemetry & FFT power spectrum' },
    { label: 'AI ANALYTICS', value: 'Edge-embedded anomaly scoring & failure risk degradation model' },
    { label: 'SAMPLING RATE', value: '1000 Hz continuous hardware DMA edge buffer' },
    { label: 'POWER SUPPLY', value: '9–24V DC Industrial Regulated or 5V USB-C auxiliary' },
    { label: 'ENCLOSURE', value: 'IP65 Industrial Rugged Enclosure with Shielded Glands' },
    { label: 'OPERATING TEMP', value: '-20°C to +70°C ambient environment' },
    { label: 'MOUNTING OPTIONS', value: 'Heavy-duty magnetic base, DIN-rail bracket, or M4 bolting' },
    { label: 'STANDARDS', value: 'ISO 10816-3 Vibration Severity Guidelines Compliant' },
  ];

  return (
    <section className="py-24 bg-[#07090D] relative overflow-hidden border-t border-white/5">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded border border-cyan/30 bg-cyan/10 text-cyan text-[11px] font-mono font-semibold tracking-widest uppercase mb-4">
              <Sliders className="w-3.5 h-3.5" />
              <span>SECTION 09 — ENGINEERING DATASHEET</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
              TECHNICAL<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-slate-200">
                SPECIFICATIONS.
              </span>
            </h2>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-lg border border-white/10 hover:border-cyan/40 bg-industrial-900 text-xs font-mono text-slate-300 hover:text-white flex items-center space-x-2 transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-cyan" />
              <span>PRINT DATASHEET</span>
            </button>
          </div>
        </div>

        {/* Datasheet Table */}
        <div className="panel-industrial rounded-2xl border border-cyan/30 overflow-hidden shadow-2xl tech-corner-tl tech-corner-br">
          
          <div className="bg-industrial-950/80 px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan" />
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                MACHINE DNA™ MODEL MDNA-ESP32-V1 SPECIFICATION MATRIX
              </span>
            </div>
            <span className="text-[11px] font-mono text-phosphor bg-phosphor/10 px-2 py-0.5 rounded border border-phosphor/20">
              REVISION 2.4 APPROVED
            </span>
          </div>

          <div className="divide-y divide-white/5 bg-industrial-900/60">
            {specs.map((spec, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-12 px-6 py-3.5 hover:bg-industrial-800/40 transition-colors items-center text-xs font-mono"
              >
                <div className="md:col-span-4 text-slate-400 font-semibold tracking-wider uppercase mb-1 md:mb-0 flex items-center space-x-2">
                  <span className="text-cyan/60 text-[10px]">▶</span>
                  <span>{spec.label}</span>
                </div>
                <div className="md:col-span-8 text-slate-100 font-medium leading-relaxed">
                  {spec.value}
                </div>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="bg-industrial-950 px-6 py-3.5 border-t border-white/10 text-[11px] font-mono text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>CERTIFICATION: CE / FCC PRE-TESTED • ROHS COMPLIANT</span>
            <span className="text-cyan">ESD RATING: ±8KV AIR / ±4KV CONTACT</span>
          </div>

        </div>

      </div>
    </section>
  );
};
