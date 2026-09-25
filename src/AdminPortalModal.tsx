import React, { useState } from 'react';
import { Lock, X, ShieldCheck, CheckCircle2, DollarSign, Calendar, Users, Award, Wine } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  passcode: string;
}

export const AdminPortalModal: React.FC<Props> = ({ isOpen, onClose, passcode }) => {
  const [inputCode, setInputCode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'service' | 'cellar' | 'vip'>('service');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.trim().toLowerCase() === passcode.toLowerCase()) {
      setIsAuthenticated(true);
    } else {
      alert("Invalid Maitre D' passkey. Click '[ AUTO-FILL DEMO KEY ]' to test.");
    }
  };

  const handleAutoFill = () => {
    setInputCode(passcode);
    setIsAuthenticated(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-4xl bg-[#0b0c10] border border-gold/40 rounded-2xl shadow-2xl p-6 sm:p-8 text-zinc-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-zinc-400 hover:text-white p-2 rounded-lg bg-zinc-800/60"
        >
          <X className="w-5 h-5" />
        </button>

        {!isAuthenticated ? (
          <div className="max-w-md mx-auto py-8 text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center text-gold">
              <Lock className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-white">Maitre D' Operations Gate</h3>
              <p className="text-base text-zinc-300 mt-2">Enter your Michelin service passkey or auto-fill for verification.</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="Enter service passkey..."
                className="w-full py-3 px-4 bg-zinc-900/90 border border-zinc-700 rounded-xl text-base text-white focus:border-gold outline-none min-h-[44px]"
              />
              <button
                type="submit"
                className="w-full py-3 px-5 bg-gold hover:bg-yellow-500 text-black font-bold rounded-xl text-base min-h-[44px] tracking-wider transition-all"
              >
                UNLOCK SERVICE CONSOLE
              </button>
            </form>
            <div className="pt-2 border-t border-zinc-800">
              <button
                type="button"
                onClick={handleAutoFill}
                className="text-sm font-semibold text-gold hover:underline py-2 px-4 rounded-lg bg-gold/10 border border-gold/30"
              >
                ⚡ [ AUTO-FILL DEMO KEY: {passcode} ]
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/30">
                  VERIFIED OPERATIONAL CONSOLE
                </span>
                <h3 className="text-2xl font-bold text-white font-serif-luxury mt-2">AURA ÉTOILE — Service Desk</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('service')}
                  className={`py-2 px-4 rounded-lg text-sm font-semibold min-h-[44px] ${activeTab === 'service' ? 'bg-gold text-black' : 'bg-zinc-800 text-zinc-300'}`}
                >
                  Floor Dispatch
                </button>
                <button
                  onClick={() => setActiveTab('cellar')}
                  className={`py-2 px-4 rounded-lg text-sm font-semibold min-h-[44px] ${activeTab === 'cellar' ? 'bg-gold text-black' : 'bg-zinc-800 text-zinc-300'}`}
                >
                  Cellar Allocation
                </button>
                <button
                  onClick={() => setActiveTab('vip')}
                  className={`py-2 px-4 rounded-lg text-sm font-semibold min-h-[44px] ${activeTab === 'vip' ? 'bg-gold text-black' : 'bg-zinc-800 text-zinc-300'}`}
                >
                  VIP Ledgers
                </button>
              </div>
            </div>

            {activeTab === 'service' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-xl">
                    <span className="text-xs text-zinc-400 font-medium">Tonight's Covers</span>
                    <p className="text-3xl font-extrabold text-white mt-1">42 / 44</p>
                    <span className="text-xs text-emerald-400 font-semibold">95.4% Capacity</span>
                  </div>
                  <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-xl">
                    <span className="text-xs text-zinc-400 font-medium">Average Spend / Guest</span>
                    <p className="text-3xl font-extrabold text-gold mt-1">$485.50</p>
                    <span className="text-xs text-zinc-300 font-medium">Wine Pairing attach: 78%</span>
                  </div>
                  <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-xl">
                    <span className="text-xs text-zinc-400 font-medium">Dietary Alerts</span>
                    <p className="text-3xl font-extrabold text-amber-400 mt-1">6 Active</p>
                    <span className="text-xs text-zinc-300 font-medium">3 Celiac • 2 Shellfish • 1 Vegan</span>
                  </div>
                </div>

                <div className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-3">
                  <h4 className="text-lg font-bold text-white">Live Service Timeline</h4>
                  <div className="divide-y divide-zinc-800">
                    <div className="py-3 flex items-center justify-between">
                      <div>
                        <span className="text-base font-semibold text-white">Table 4 (Booth) • 4 Guests</span>
                        <p className="text-sm text-zinc-300">Course 5: Miyazaki A5 Wagyu • Wine: 2010 Margaux</p>
                      </div>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        SEATED
                      </span>
                    </div>
                    <div className="py-3 flex items-center justify-between">
                      <div>
                        <span className="text-base font-semibold text-white">Chef's Counter (Seats 1-4)</span>
                        <p className="text-sm text-zinc-300">Course 2: Hokkaido Scallop • Wine: Dom Pérignon 2012</p>
                      </div>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        IN PROGRESS
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'cellar' && (
              <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-xl space-y-3">
                <h4 className="text-lg font-bold text-gold">Grand Cru Sommelier Vault Telemetry</h4>
                <div className="space-y-2 text-base">
                  <div className="flex justify-between py-2 border-b border-zinc-800">
                    <span className="text-zinc-200">2018 Domaine de la Romanée-Conti</span>
                    <span className="font-bold text-gold">3 Bottles in Cellar ($4,200)</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-zinc-800">
                    <span className="text-zinc-200">2015 Château Margaux Premier Grand Cru</span>
                    <span className="font-bold text-gold">5 Bottles in Cellar ($1,850)</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-zinc-800">
                    <span className="text-zinc-200">2012 Dom Pérignon Vintage Brut</span>
                    <span className="font-bold text-gold">8 Bottles in Cellar ($420)</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'vip' && (
              <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-xl space-y-3">
                <h4 className="text-lg font-bold text-white">VIP Guest Profiles</h4>
                <p className="text-base text-zinc-300">Private dining history, favorite vintage pairings, and special requests stored securely in Supabase.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
