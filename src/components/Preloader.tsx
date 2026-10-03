import React from 'react';
import { Cpu, Activity } from 'lucide-react';

interface PreloaderProps {
  percentage: number;
  isReady: boolean;
}

export const Preloader: React.FC<PreloaderProps> = ({ percentage, isReady }) => {
  if (isReady && percentage >= 100) return null;

  // Generate 20 block bar
  const totalBlocks = 20;
  const filledBlocks = Math.min(totalBlocks, Math.floor((percentage / 100) * totalBlocks));
  const emptyBlocks = totalBlocks - filledBlocks;
  const barString = '█'.repeat(filledBlocks) + '░'.repeat(emptyBlocks);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07090D] transition-opacity duration-700 ${
        isReady ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative p-8 rounded-xl border border-cyan/20 bg-industrial-900/90 backdrop-blur-xl shadow-2xl max-w-md w-11/12 mx-auto tech-corner-tl tech-corner-br">
        {/* Subtle top indicator */}
        <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
          <div className="flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-cyan animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-widest text-cyan uppercase">
              MACHINE DNA™ SYSTEM INITIALIZATION
            </span>
          </div>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan"></span>
          </span>
        </div>

        {/* Text and percentage */}
        <div className="text-center space-y-3 mb-6">
          <div className="text-sm font-mono tracking-wider text-slate-300">
            LOADING TELEMETRY & 3D ASSETS
          </div>
          <div className="font-mono text-cyan text-base tracking-widest bg-black/60 py-2 px-3 rounded border border-cyan/30 flex justify-between items-center">
            <span className="text-xs text-slate-400">PROGRESS</span>
            <span className="text-cyan font-bold">{percentage}%</span>
          </div>
          <div className="font-mono text-cyan/90 text-sm tracking-wider overflow-hidden select-none">
            [{barString}]
          </div>
        </div>

        {/* Bottom system status text */}
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-2 border-t border-white/5">
          <div className="flex items-center space-x-1.5">
            <Activity className="w-3 h-3 text-cyan" />
            <span>ESP32 HIGH-DPI FRAME PIPELINE</span>
          </div>
          <span>162 SAMPLES</span>
        </div>
      </div>
    </div>
  );
};
