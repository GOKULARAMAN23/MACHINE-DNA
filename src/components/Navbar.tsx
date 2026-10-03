import React, { useState, useEffect } from 'react';
import { Menu, X, Activity, ChevronRight } from 'lucide-react';

interface NavbarProps {
  onRequestDemo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onRequestDemo }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'PRODUCT', href: '#product' },
    { label: 'TECHNOLOGY', href: '#technology' },
    { label: 'HOW IT WORKS', href: '#how-it-works' },
    { label: 'MONITORING', href: '#monitoring' },
    { label: 'APPLICATIONS', href: '#applications' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-industrial-950/85 backdrop-blur-md border-b border-white/10 py-3 shadow-lg shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center space-x-3 group">
          <div className="w-8 h-8 rounded border border-cyan/40 bg-industrial-900 flex items-center justify-center relative overflow-hidden group-hover:border-cyan transition-colors">
            {/* Custom geometric 'M' mark */}
            <span className="font-mono font-black text-cyan text-sm tracking-tighter">M</span>
            <div className="absolute inset-0 bg-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold tracking-wider text-base text-white group-hover:text-cyan transition-colors flex items-center gap-1">
              MACHINE DNA<span className="text-[10px] text-cyan align-top">™</span>
            </span>
            <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase hidden sm:block">
              AI MOTOR HEALTH
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-mono tracking-widest text-slate-300 hover:text-cyan px-3 py-1.5 transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-cyan scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
            </a>
          ))}
        </nav>

        {/* Right Action */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-[11px] font-mono text-phosphor bg-phosphor/10 px-2.5 py-1 rounded-full border border-phosphor/30">
            <span className="w-1.5 h-1.5 rounded-full bg-phosphor animate-pulse" />
            <span>ESP32 ACTIVE</span>
          </div>
          <button
            onClick={onRequestDemo}
            className="px-4 py-2 text-xs font-mono font-bold tracking-wider uppercase text-black bg-cyan hover:bg-cyan/90 transition-all rounded shadow-md hover:shadow-cyan/20 hover:shadow-lg flex items-center space-x-1.5 active:scale-95"
          >
            <span>REQUEST DEMO</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center space-x-3">
          <button
            onClick={onRequestDemo}
            className="px-2.5 py-1.5 text-[10px] font-mono font-bold uppercase text-black bg-cyan rounded"
          >
            DEMO
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-slate-300 hover:text-white rounded border border-white/10 bg-industrial-900"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-industrial-950/95 backdrop-blur-xl border-b border-white/10 px-4 pt-3 pb-6 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-mono tracking-wider text-slate-200 hover:text-cyan py-2 border-b border-white/5"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-mono text-phosphor">
              <Activity className="w-3.5 h-3.5" />
              <span>SYSTEM ONLINE</span>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onRequestDemo();
              }}
              className="w-full mt-2 py-2.5 text-center text-xs font-mono font-bold uppercase text-black bg-cyan rounded"
            >
              REQUEST DEMO
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
