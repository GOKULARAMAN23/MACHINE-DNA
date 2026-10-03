import React from 'react';
import { useImageSequence } from '../hooks/useImageSequence';
import { ArrowDown, Radio, Activity, ShieldCheck } from 'lucide-react';

interface ScrollProductProps {
  onRequestDemo: () => void;
  onExplore: () => void;
}

export const ScrollProduct: React.FC<ScrollProductProps> = ({ onRequestDemo, onExplore }) => {
  const {
    canvasRef,
    containerRef,
    currentFrameIndex,
    scrollProgress,
    totalFrames,
  } = useImageSequence({
    frameCount: 162,
    framePrefix: '/frames/ezgif-frame-',
    frameExtension: '.jpg',
    padLength: 3,
    lerpFactor: 0.2,
  });

  // Calculate overlay visibility phases
  // Frame 1 to 4: Clean product alone with zero overlay text.
  // Frame 017 Phase (Frame 5 to ~32): Clean, bold, centered "MACHINE DNA" title.
  
  const riseStart = 4 / (totalFrames - 1);      // ~0.025 (Frame 5)
  const peakStart = 12 / (totalFrames - 1);     // ~0.075 (Approaching Frame 17)
  const peakEnd = 24 / (totalFrames - 1);       // ~0.150 (Past Frame 17)
  const fadeOutEnd = 34 / (totalFrames - 1);    // ~0.210 (Fades out before telemetry phase)

  let titleOpacity = 0;
  let titleTranslateY = 40;

  if (scrollProgress >= riseStart && scrollProgress < peakStart) {
    const progress = (scrollProgress - riseStart) / (peakStart - riseStart);
    titleOpacity = progress;
    titleTranslateY = (1 - progress) * 40;
  } else if (scrollProgress >= peakStart && scrollProgress <= peakEnd) {
    titleOpacity = 1;
    titleTranslateY = 0;
  } else if (scrollProgress > peakEnd && scrollProgress <= fadeOutEnd) {
    const progress = (scrollProgress - peakEnd) / (fadeOutEnd - peakEnd);
    titleOpacity = 1 - progress;
    titleTranslateY = -progress * 30;
  } else {
    titleOpacity = 0;
  }

  // Telemetry stream phase (Frames 45 to 105)
  const telemetryOverlayOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.28) * 4) * Math.min(1, (0.65 - scrollProgress) * 4));
  
  // Exploded architecture phase (Frames 110 to 162)
  const explodedOverlayOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.68) * 4));

  // Initial scroll prompt (visible on frames 1-4 only)
  const initialPromptOpacity = currentFrameIndex <= 4 ? 1 : Math.max(0, 1 - (currentFrameIndex - 4) * 0.25);



  return (
    <section ref={containerRef} className="relative h-[380vh] bg-transparent w-full" id="product">
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden bg-transparent">
        
        {/* Background subtle radial ambient light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-cyan/10 rounded-full blur-3xl pointer-events-none z-0" />

        {/* Center Canvas Container (Main 3D Sequence) */}
        <div className="relative flex-1 w-full h-full flex items-center justify-center">
          <canvas
            ref={canvasRef}
            className="w-full h-full max-h-[88vh] object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.9)] cursor-grab active:cursor-grabbing"
            style={{
              touchAction: 'none',
              maskImage: 'radial-gradient(ellipse 88% 85% at 50% 50%, black 70%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 88% 85% at 50% 50%, black 70%, transparent 100%)',
            }}
          />

          {/* ========================================================
              INITIAL CLEAN VIEW SCROLL HINT (FRAMES 01 TO 04 ONLY)
             ======================================================== */}
          {currentFrameIndex <= 4 && (
            <div
              className="absolute bottom-16 sm:bottom-12 inset-x-0 mx-auto text-center pointer-events-none transition-opacity duration-300 z-30"
              style={{ opacity: initialPromptOpacity }}
            >
              <div className="inline-flex items-center space-x-3 px-5 py-2.5 rounded-full bg-industrial-950/90 border border-cyan/40 backdrop-blur-md shadow-2xl animate-bounce">
                <div className="w-2 h-2 rounded-full bg-cyan animate-ping" />
                <span className="text-xs font-mono font-bold tracking-widest text-white uppercase">
                  SCROLL DOWN TO EXPLORE MACHINE DNA™
                </span>
                <ArrowDown className="w-4 h-4 text-cyan" />
              </div>
            </div>
          )}

          {/* ========================================================
              FRAME 017 FOCUSED OVERLAY: PROMINENT CENTERED "MACHINE DNA"
             ======================================================== */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none transition-all duration-300 z-20"
            style={{
              opacity: titleOpacity,
              transform: `translateY(${titleTranslateY}px)`,
            }}
          >
            {/* Top Category Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-cyan/40 bg-industrial-950/90 text-cyan text-[10px] sm:text-xs font-mono font-bold tracking-[0.25em] uppercase mb-4 sm:mb-6 backdrop-blur-md shadow-[0_0_25px_rgba(0,240,255,0.25)] tech-corner-tl tech-corner-br">
              <Radio className="w-3.5 h-3.5 animate-pulse text-cyan" />
              <span>AI-POWERED MOTOR HEALTH MONITORING</span>
            </div>

            {/* Bold Centered High-Contrast Title */}
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-extrabold tracking-tight text-white uppercase leading-none drop-shadow-[0_15px_40px_rgba(0,0,0,0.95)]">
              MACHINE{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan via-white to-cyan glow-cyan">
                DNA
              </span>
              <span className="text-2xl sm:text-4xl lg:text-5xl font-mono text-cyan align-top ml-1 drop-shadow-none">
                ™
              </span>
            </h1>

            {/* Subtitle technical divider */}
            <div className="mt-5 sm:mt-6 flex items-center justify-center space-x-3 sm:space-x-4 text-[11px] sm:text-xs font-mono tracking-[0.25em] sm:tracking-[0.35em] text-slate-300 uppercase bg-industrial-950/80 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-sm shadow-lg">
              <span className="w-6 sm:w-10 h-[1px] bg-cyan/50" />
              <span>PREDICTIVE MAINTENANCE SYSTEM</span>
              <span className="w-6 sm:w-10 h-[1px] bg-cyan/50" />
            </div>
          </div>

          {/* ========================================================
              PHASE 2: TELEMETRY STREAM OVERLAY (FRAMES 45 TO 105)
             ======================================================== */}
          <div
            className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between pointer-events-none transition-opacity duration-300"
            style={{ opacity: telemetryOverlayOpacity }}
          >
            {/* Left Telemetry Annotation */}
            <div className="max-w-xs panel-industrial p-4 rounded-lg border border-cyan/30 tech-corner-tl backdrop-blur-md hidden md:block">
              <div className="flex items-center space-x-2 text-xs font-mono text-cyan mb-2">
                <Activity className="w-4 h-4" />
                <span className="font-bold uppercase tracking-wider">EDGE TELEMETRY STREAM</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                Continuous high-frequency signal capture directly at the motor housing via tri-axial vibration, surface thermistor, and current transducer.
              </p>
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 bg-black/40 p-2 rounded border border-white/5">
                <span>SAMPLE RATE</span>
                <span className="text-cyan font-bold">1000 Hz REAL-TIME</span>
              </div>
            </div>

            {/* Right Telemetry Health Badge */}
            <div className="max-w-xs panel-industrial p-4 rounded-lg border border-phosphor/30 tech-corner-br backdrop-blur-md hidden md:block">
              <div className="flex items-center space-x-2 text-xs font-mono text-phosphor mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span className="font-bold uppercase tracking-wider">SYSTEM CONDITION: HEALTHY</span>
              </div>
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-slate-300">
                  <span>HEALTH SCORE</span>
                  <span className="text-phosphor font-bold">94%</span>
                </div>
                <div className="w-full bg-industrial-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-phosphor h-full w-[94%]" />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 pt-1">
                  <span>FAILURE RISK INDEX</span>
                  <span className="text-cyan">6% (NOMINAL)</span>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================
              PHASE 3: EXPLODED VIEW CALLOUTS (FRAMES 110 TO 162)
             ======================================================== */}
          <div
            className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between py-24 pointer-events-none transition-opacity duration-300"
            style={{ opacity: explodedOverlayOpacity }}
          >
            {/* Top callout banner */}
            <div className="text-center max-w-xl mx-auto bg-industrial-950/85 backdrop-blur-md px-4 py-2.5 rounded-lg border border-cyan/40 tech-corner-tl tech-corner-br">
              <div className="text-[10px] font-mono uppercase tracking-widest text-cyan font-bold">
                INTERNAL ARCHITECTURE DISASSEMBLY
              </div>
              <div className="text-sm font-display font-bold text-white">
                PRECISION HARDWARE ENGINEERED FOR HARSH INDUSTRIAL ENCLOSURES
              </div>
            </div>

            {/* Exploded parts labels grid on desktop */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 text-center">
              <div className="panel-industrial p-2.5 rounded border border-white/10">
                <div className="text-[9px] font-mono text-cyan font-bold">01</div>
                <div className="text-xs font-bold text-white">FRONT COVER</div>
                <div className="text-[10px] text-slate-400">IP65 Sealed Bezel</div>
              </div>
              <div className="panel-industrial p-2.5 rounded border border-white/10">
                <div className="text-[9px] font-mono text-cyan font-bold">02</div>
                <div className="text-xs font-bold text-white">OLED DISPLAY</div>
                <div className="text-[10px] text-slate-400">0.96" High Contrast</div>
              </div>
              <div className="panel-industrial p-2.5 rounded border border-cyan/30">
                <div className="text-[9px] font-mono text-cyan font-bold">03</div>
                <div className="text-xs font-bold text-cyan">ESP32 CONTROLLER</div>
                <div className="text-[10px] text-slate-300">Dual-Core AI Edge</div>
              </div>
              <div className="panel-industrial p-2.5 rounded border border-white/10">
                <div className="text-[9px] font-mono text-cyan font-bold">04</div>
                <div className="text-xs font-bold text-white">SIGNAL BOARD</div>
                <div className="text-[10px] text-slate-400">Low-Noise Filtering</div>
              </div>
              <div className="panel-industrial p-2.5 rounded border border-white/10">
                <div className="text-[9px] font-mono text-cyan font-bold">05</div>
                <div className="text-xs font-bold text-white">ENCLOSURE</div>
                <div className="text-[10px] text-slate-400">Shock-Isolated Body</div>
              </div>
              <div className="panel-industrial p-2.5 rounded border border-white/10">
                <div className="text-[9px] font-mono text-cyan font-bold">06</div>
                <div className="text-xs font-bold text-white">BACK COVER</div>
                <div className="text-[10px] text-slate-400">Thermal Heat Plate</div>
              </div>
            </div>
          </div>
        </div>



      </div>
    </section>
  );
};
