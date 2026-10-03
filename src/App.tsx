import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { SmartBackground } from './components/SmartBackground';
import { ScrollProduct } from './components/ScrollProduct';
import { ProductIntro } from './components/ProductIntro';
import { ExplodedView } from './components/ExplodedView';
import { HowItWorks } from './components/HowItWorks';
import { LiveDashboard } from './components/LiveDashboard';
import { AIAnomaly } from './components/AIAnomaly';
import { AlertConsole } from './components/AlertConsole';
import { Applications } from './components/Applications';
import { ProductBenefits } from './components/ProductBenefits';
import { TechnicalSpecs } from './components/TechnicalSpecs';
import { FinalCTA } from './components/FinalCTA';
import { DemoModal } from './components/DemoModal';
import { Preloader } from './components/Preloader';

export const App: React.FC = () => {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [loadPercentage, setLoadPercentage] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // Preload initial frames for smooth first load
  useEffect(() => {
    let loaded = 0;
    const criticalCount = 20;

    for (let i = 1; i <= criticalCount; i++) {
      const img = new Image();
      const numStr = i.toString().padStart(3, '0');
      img.src = `/frames/ezgif-frame-${numStr}.jpg`;
      img.onload = () => {
        loaded++;
        const pct = Math.round((loaded / criticalCount) * 100);
        setLoadPercentage(pct);
        if (loaded >= criticalCount) {
          setTimeout(() => setIsReady(true), 300);
        }
      };
      img.onerror = () => {
        loaded++;
        if (loaded >= criticalCount) {
          setIsReady(true);
        }
      };
    }
  }, []);

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#07090D] text-slate-100 selection:bg-cyan selection:text-black">
      {/* Global Smart Industrial Factory Background */}
      <SmartBackground />

      {/* Technical Preloader */}
      <Preloader percentage={loadPercentage} isReady={isReady} />

      {/* Fixed Industrial Navbar */}
      <Navbar onRequestDemo={() => setDemoModalOpen(true)} />

      {/* Main Content Sections with Semi-Transparent Industrial Glass */}
      <main className="relative z-10">
        {/* HERO & SCROLL CONTROLLED 3D PRODUCT ANIMATION */}
        <ScrollProduct
          onRequestDemo={() => setDemoModalOpen(true)}
          onExplore={() => handleScrollToSection('technology')}
        />

        {/* SECTION 01 — PRODUCT INTRODUCTION */}
        <ProductIntro />

        {/* SECTION 02 — EXPLODED PRODUCT & HARDWARE ARCHITECTURE */}
        <ExplodedView />

        {/* SECTION 03 — HOW IT WORKS PIPELINE */}
        <HowItWorks />

        {/* SECTION 04 — REAL-TIME SCADA MONITORING DASHBOARD */}
        <LiveDashboard />

        {/* SECTION 05 — AI ANOMALY DETECTION ENGINE */}
        <AIAnomaly />

        {/* SECTION 06 — INCIDENT & WARNING ALERT CONSOLE */}
        <AlertConsole />

        {/* SECTION 07 — INDUSTRIAL ROTATING ASSET APPLICATIONS */}
        <Applications />

        {/* SECTION 08 — PRODUCT BENEFITS & PLANT ROI */}
        <ProductBenefits />

        {/* SECTION 09 — TECHNICAL SPECIFICATIONS DATASHEET */}
        <TechnicalSpecs />

        {/* FINAL SECTION — CINEMATIC SUMMARY & CTA */}
        <FinalCTA
          onRequestDemo={() => setDemoModalOpen(true)}
          onExploreTop={handleScrollToTop}
        />
      </main>

      {/* Interactive Demo Evaluation Modal */}
      <DemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
      />
    </div>
  );
};
