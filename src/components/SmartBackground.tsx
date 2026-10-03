import React, { useEffect, useState } from 'react';
import { Activity, Wifi, Radio, Cpu } from 'lucide-react';

export const SmartBackground: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax translation
  const parallaxOffset = scrollY * 0.08;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      
      {/* 1. Main High-Res Industrial Factory Background with Parallax */}
      <div
        className="absolute inset-0 w-full h-[120vh] -top-[10vh] transition-transform duration-100 ease-out"
        style={{
          transform: `translateY(-${parallaxOffset}px) scale(1.04)`,
        }}
      >
        <img
          src="/images/factory-bg.jpg"
          alt="Smart Industrial Factory"
          className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.25] saturate-[0.85]"
        />

        {/* Dynamic Dark Vignette & Industrial Atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#07090D]/90 via-[#07090D]/60 to-[#07090D]" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#07090D]/50 to-[#07090D]/95" />
      </div>

      {/* 2. Smart Factory Grid & Engineering Coordinate HUD */}
      <div className="absolute inset-0 bg-tech-grid opacity-30" />

      {/* 3. Floating IoT Factory Nodes (Telemetry points in the plant) */}
      <div className="absolute top-[22%] left-[12%] hidden lg:flex items-center space-x-2 bg-black/60 border border-cyan/30 px-2.5 py-1 rounded backdrop-blur-md opacity-60">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-ping" />
        <span className="text-[9px] font-mono text-cyan">BAY 04 • MOTOR 1460 RPM [NORMAL]</span>
      </div>

      <div className="absolute top-[38%] right-[14%] hidden lg:flex items-center space-x-2 bg-black/60 border border-phosphor/30 px-2.5 py-1 rounded backdrop-blur-md opacity-60">
        <span className="w-1.5 h-1.5 rounded-full bg-phosphor animate-pulse" />
        <span className="text-[9px] font-mono text-phosphor">CRANE 10T • LINE A [CONNECTED]</span>
      </div>

      <div className="absolute bottom-[28%] left-[18%] hidden lg:flex items-center space-x-2 bg-black/60 border border-white/20 px-2.5 py-1 rounded backdrop-blur-md opacity-50">
        <Wifi className="w-3 h-3 text-cyan" />
        <span className="text-[9px] font-mono text-slate-300">ESP32 MESH GATEWAY • 2.4 GHz</span>
      </div>

      {/* 4. Ambient Cyan/Amber Industrial Lighting Beams */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-cyan/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-amber/5 rounded-full blur-[120px] pointer-events-none" />

      {/* 5. Precision Horizontal Scanline Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.3)_51%)] bg-[length:100%_4px] opacity-40 pointer-events-none" />

    </div>
  );
};
