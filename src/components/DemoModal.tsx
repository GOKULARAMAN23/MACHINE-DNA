import React, { useState } from 'react';
import { X, CheckCircle2, Send, Cpu, Building2, User, Mail, Phone, Factory } from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    motorCount: '10-50 Motors',
    assetType: 'Centrifugal Pumps & Drives',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl panel-industrial bg-industrial-950 border border-cyan/50 rounded-2xl p-6 sm:p-8 shadow-2xl tech-corner-tl tech-corner-br my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-industrial-900 border border-white/10 hover:border-white/20 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 rounded-full bg-phosphor/10 border border-phosphor/40 flex items-center justify-center mx-auto text-phosphor animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-display font-bold text-white">
              PILOT REQUEST SUBMITTED
            </h3>
            <p className="text-sm font-mono text-slate-300 max-w-md mx-auto leading-relaxed">
              Thank you, <span className="text-cyan font-bold">{formData.name}</span>. An industrial IoT application engineer from MACHINE DNA will contact you within 24 hours to schedule your live motor evaluation.
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-6 py-2.5 bg-cyan text-black font-mono text-xs font-bold uppercase rounded hover:bg-cyan/90 transition-all"
              >
                RETURN TO WEBSITE
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="flex items-center space-x-2 mb-2">
              <Cpu className="w-4 h-4 text-cyan" />
              <span className="text-xs font-mono font-bold tracking-widest text-cyan uppercase">
                SCHEDULE AN INDUSTRIAL EVALUATION
              </span>
            </div>

            <h3 className="text-2xl font-display font-bold text-white mb-2">
              REQUEST MACHINE DNA™ DEMO
            </h3>
            <p className="text-xs font-mono text-slate-400 mb-6">
              Test ESP32 edge anomaly detection on your high-criticality facility motors.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-300 mb-1">
                    FULL NAME *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      required
                      type="text"
                      placeholder="e.g. Marcus Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs font-mono bg-industrial-900 border border-white/10 rounded focus:border-cyan focus:outline-none text-white placeholder-slate-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-300 mb-1">
                    WORK EMAIL *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      required
                      type="email"
                      placeholder="e.g. m.vance@plant-energy.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs font-mono bg-industrial-900 border border-white/10 rounded focus:border-cyan focus:outline-none text-white placeholder-slate-600"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-300 mb-1">
                    COMPANY / PLANT *
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      required
                      type="text"
                      placeholder="e.g. Apex Dynamics Mfg"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs font-mono bg-industrial-900 border border-white/10 rounded focus:border-cyan focus:outline-none text-white placeholder-slate-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-300 mb-1">
                    NUMBER OF MOTORS
                  </label>
                  <select
                    value={formData.motorCount}
                    onChange={(e) => setFormData({ ...formData, motorCount: e.target.value })}
                    className="w-full px-3 py-2 text-xs font-mono bg-industrial-900 border border-white/10 rounded focus:border-cyan focus:outline-none text-white"
                  >
                    <option>1-10 Pilot Motors</option>
                    <option>10-50 Motors</option>
                    <option>50-200 Motors</option>
                    <option>200+ Fleet-wide Deployment</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-300 mb-1">
                  PRIMARY ROTATING ASSET TYPE
                </label>
                <div className="relative">
                  <Factory className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <select
                    value={formData.assetType}
                    onChange={(e) => setFormData({ ...formData, assetType: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-xs font-mono bg-industrial-900 border border-white/10 rounded focus:border-cyan focus:outline-none text-white"
                  >
                    <option>Centrifugal Pumps & Chemical Drives</option>
                    <option>Heavy Conveyors & Bucket Elevators</option>
                    <option>Industrial Kiln Fans & Exhaust Blowers</option>
                    <option>Screw / Reciprocating Compressors</option>
                    <option>CNC Machine Spindles & Lathes</option>
                    <option>Automated Production Line Motors</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-300 mb-1">
                  SPECIFIC VIBRATION / OVERHEATING CHALLENGES
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your current motor failure patterns, operating speeds, or SCADA integration requirements..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-mono bg-industrial-900 border border-white/10 rounded focus:border-cyan focus:outline-none text-white placeholder-slate-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-cyan text-black font-mono font-bold text-xs uppercase tracking-wider rounded hover:bg-cyan/90 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-cyan/20 active:scale-98"
              >
                <Send className="w-4 h-4" />
                <span>SUBMIT PILOT EVALUATION REQUEST</span>
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
