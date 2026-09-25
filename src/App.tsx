import React, { useState } from 'react';
import { 
  UtensilsCrossed, 
  Wine, 
  Calendar, 
  Clock, 
  Users, 
  ShieldCheck, 
  Sparkles, 
  Flame, 
  CheckCircle2, 
  ChevronRight, 
  Info, 
  AlertTriangle,
  Lock,
  Layers
} from 'lucide-react';
import { AdminPortalModal } from './AdminPortalModal';

// Seating areas
interface TableSeat {
  id: string;
  name: string;
  type: 'booth' | 'counter' | 'salon' | 'cellar';
  capacity: number;
  status: 'available' | 'reserved' | 'current';
  priceFloor: number;
}

const SEATS: TableSeat[] = [
  { id: 't1', name: "Chef's Counter 01-02", type: 'counter', capacity: 2, status: 'available', priceFloor: 295 },
  { id: 't2', name: "Chef's Counter 03-04", type: 'counter', capacity: 2, status: 'current', priceFloor: 295 },
  { id: 't3', name: "Chef's Counter 05-06", type: 'counter', capacity: 2, status: 'available', priceFloor: 295 },
  { id: 't4', name: "Chef's Counter 07-08", type: 'counter', capacity: 2, status: 'reserved', priceFloor: 295 },
  { id: 't5', name: "Alcove Booth Alpha", type: 'booth', capacity: 4, status: 'available', priceFloor: 350 },
  { id: 't6', name: "Alcove Booth Beta", type: 'booth', capacity: 4, status: 'reserved', priceFloor: 350 },
  { id: 't7', name: "Main Salon Table 11", type: 'salon', capacity: 2, status: 'available', priceFloor: 265 },
  { id: 't8', name: "Main Salon Table 12", type: 'salon', capacity: 4, status: 'available', priceFloor: 265 },
  { id: 't9', name: "Grand Cellar Vault", type: 'cellar', capacity: 10, status: 'available', priceFloor: 500 }
];

const TIME_SLOTS = [
  { time: '5:30 PM', label: 'Early Evening Overture', available: true },
  { time: '6:15 PM', label: 'Twilight Seating', available: false },
  { time: '7:45 PM', label: 'Prime Gastronomic Seating', available: true },
  { time: '8:30 PM', label: 'Mid-Evening Tasting', available: true },
  { time: '9:45 PM', label: 'Late Midnight Hearth', available: true }
];

const TASTINGS = [
  {
    id: 'nine-course',
    name: '9-Course Omakase Hearth Experience',
    price: 295,
    description: 'Binchotan grilled seasonal game, Hokkaido uni, A5 Miyazaki Wagyu, and Périgord winter truffle service.',
    badge: 'SIGNATURE TASTING'
  },
  {
    id: 'twelve-course',
    name: '12-Course Grand Prestige Journey',
    price: 385,
    description: 'Extended rare seafood exploration, live langoustine, aged duck breast, and dual pastry confection sequence.',
    badge: 'CHEF SELECTION'
  }
];

const PAIRINGS = [
  {
    id: 'grand-cru',
    name: 'Grand Cru Sommelier Pairing',
    price: 185,
    notes: '6 curated glasses featuring Premier Grand Cru Classé Bordeaux, Burgundy Monopoles, and aged Champagne.'
  },
  {
    id: 'reserve-vintage',
    name: 'Trophy Vintage & Rare Library Pour',
    price: 280,
    notes: 'Cellar allocations from Romanée-Conti, Château d’Yquem, and vintage Krug.'
  },
  {
    id: 'botanical-infusion',
    name: 'Artisan Non-Alcoholic Ferment Pairing',
    price: 95,
    notes: 'House-fermented heirloom vinegars, wild mountain pine teas, and smoked fruit reductions.'
  }
];

export default function App() {
  const [selectedSeat, setSelectedSeat] = useState<TableSeat>(SEATS[0]);
  const [selectedTime, setSelectedTime] = useState<string>('7:45 PM');
  const [selectedTasting, setSelectedTasting] = useState(TASTINGS[0]);
  const [selectedPairing, setSelectedPairing] = useState(PAIRINGS[0]);
  const [guestCount, setGuestCount] = useState<number>(2);
  const [dietary, setDietary] = useState<string[]>(['Gluten Free / Celiac Alert']);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const toggleDietary = (item: string) => {
    if (dietary.includes(item)) {
      setDietary(dietary.filter(d => d !== item));
    } else {
      setDietary([...dietary, item]);
    }
  };

  const totalPrice = (selectedTasting.price + selectedPairing.price) * guestCount;
  const depositAmount = guestCount * 100;

  return (
    <div className="min-h-screen bg-[#08090A] text-zinc-100 selection:bg-gold selection:text-black">
      {/* Top Banner / Maitre D Door */}
      <div className="bg-[#0e1014] border-b border-gold/30 px-4 py-2.5 text-center text-sm font-semibold tracking-wider text-zinc-300 flex items-center justify-center gap-3">
        <span>⭐ TWO-STAR MICHELIN RATED RESERVATION MATRIX</span>
        <span className="text-zinc-600">•</span>
        <button
          onClick={() => setIsAdminOpen(true)}
          className="text-gold hover:text-yellow-400 font-mono text-xs font-semibold underline px-3 py-1 bg-gold/10 rounded-md border border-gold/30"
        >
          [ MAITRE D' PORTAL ]
        </button>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-[#08090A]/90 backdrop-blur-md border-b border-zinc-800 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center text-gold">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-serif-luxury tracking-wider text-white">AURA ÉTOILE</h1>
              <p className="text-xs uppercase tracking-widest text-gold font-mono">Michelin Seat & Cellar OS</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="px-5 py-3 rounded-xl bg-gold/10 hover:bg-gold/20 text-gold border border-gold/40 text-base font-semibold min-h-[44px] transition-all flex items-center gap-2"
            >
              <Lock className="w-4 h-4" /> Live Floor Control
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold bg-gold/10 border border-gold/30 px-3.5 py-1.5 rounded-full inline-block">
              ARCHETYPE D: TIMELINE & SEAT MATRIX
            </span>
            <h2 className="text-4xl sm:text-6xl font-extrabold text-white font-serif-luxury tracking-tight leading-none">
              The SevenRooms-Grade <span className="text-gold">Seat & Cellar</span> System
            </h2>
            <p className="text-base sm:text-lg text-zinc-200 leading-relaxed max-w-2xl">
              Real-time table assignment, sommelier cellar allocations, and multi-course culinary tasting intake for Michelin-starred hospitality operations.
            </p>
            
            {/* Quick KPIs */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-800">
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold text-white font-serif-luxury">24</span>
                <p className="text-sm font-semibold text-zinc-300 uppercase mt-1">Covers / Seating</p>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold text-gold font-serif-luxury">$485</span>
                <p className="text-sm font-semibold text-zinc-300 uppercase mt-1">Avg Spend / Guest</p>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-serif-luxury">100%</span>
                <p className="text-sm font-semibold text-zinc-300 uppercase mt-1">Deposit Guarantee</p>
              </div>
            </div>
          </div>

          {/* Sommelier Cellar Tally Card */}
          <div className="lg:col-span-5 bg-zinc-950 border border-gold/30 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Wine className="w-5 h-5 text-gold" />
                <span className="text-base font-bold text-white uppercase tracking-wider font-mono">Live Sommelier Cellar Tally</span>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                IN VAULT
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-zinc-900/60 rounded-xl border border-zinc-800">
                <div>
                  <h4 className="text-base font-bold text-white">2018 Romanée-Conti Grand Cru</h4>
                  <p className="text-sm text-zinc-300">Vosne-Romanée, Burgundy</p>
                </div>
                <span className="text-sm font-bold text-gold bg-gold/10 px-3 py-1 rounded-lg">3 Bottles Left</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-zinc-900/60 rounded-xl border border-zinc-800">
                <div>
                  <h4 className="text-base font-bold text-white">2010 Château Margaux 1er Cru</h4>
                  <p className="text-sm text-zinc-300">Margaux, Bordeaux</p>
                </div>
                <span className="text-sm font-bold text-gold bg-gold/10 px-3 py-1 rounded-lg">5 Bottles Left</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-zinc-900/60 rounded-xl border border-zinc-800">
                <div>
                  <h4 className="text-base font-bold text-white">2012 Dom Pérignon Vintage Brut</h4>
                  <p className="text-sm text-zinc-300">Épernay, Champagne</p>
                </div>
                <span className="text-sm font-bold text-gold bg-gold/10 px-3 py-1 rounded-lg">7 Bottles Left</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Seat Matrix & Reservation Flow */}
      <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-10">
        
        {/* Step 1: Time Slot Matrix */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-gold" />
            <h3 className="text-2xl font-bold font-serif-luxury text-white">1. Select Evening Service Time-Slot</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {TIME_SLOTS.map((slot) => (
              <button
                key={slot.time}
                disabled={!slot.available}
                onClick={() => setSelectedTime(slot.time)}
                className={`p-4 rounded-xl text-left border transition-all min-h-[44px] ${
                  !slot.available 
                    ? 'opacity-40 bg-zinc-900/40 border-zinc-800 cursor-not-allowed'
                    : selectedTime === slot.time
                      ? 'bg-gold/15 border-gold text-white shadow-lg shadow-gold/10'
                      : 'bg-zinc-900/70 border-zinc-800 hover:border-zinc-700 text-zinc-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold font-mono">{slot.time}</span>
                  {slot.available ? (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">OPEN</span>
                  ) : (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-rose-500/20 text-rose-400">BOOKED</span>
                  )}
                </div>
                <p className="text-sm text-zinc-300 mt-2">{slot.label}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Interactive Table & Station Matrix */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-gold" />
              <h3 className="text-2xl font-bold font-serif-luxury text-white">2. Live Floor & Seating Station Matrix</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-zinc-300">Party Size:</span>
              {[1, 2, 4, 6].map(num => (
                <button
                  key={num}
                  onClick={() => setGuestCount(num)}
                  className={`py-2 px-4 rounded-lg text-sm font-bold min-h-[44px] ${guestCount === num ? 'bg-gold text-black' : 'bg-zinc-800 text-zinc-300'}`}
                >
                  {num} Guests
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SEATS.map((seat) => (
              <div
                key={seat.id}
                onClick={() => seat.status !== 'reserved' && setSelectedSeat(seat)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  seat.status === 'reserved'
                    ? 'opacity-40 bg-zinc-900/30 border-zinc-800 cursor-not-allowed'
                    : selectedSeat.id === seat.id
                      ? 'bg-gold/15 border-gold ring-1 ring-gold shadow-xl'
                      : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-xs font-bold uppercase font-mono tracking-wider text-gold">
                      {seat.type.toUpperCase()}
                    </span>
                    <h4 className="text-lg font-bold text-white mt-1">{seat.name}</h4>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    seat.status === 'available' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' :
                    seat.status === 'current' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' :
                    'bg-zinc-800 text-zinc-400'
                  }`}>
                    {seat.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-zinc-300">Capacity: Up to {seat.capacity} Guests</p>
                <div className="mt-4 pt-3 border-t border-zinc-800 flex justify-between items-center text-sm">
                  <span className="text-zinc-400 font-medium">Tasting Floor:</span>
                  <span className="font-mono font-bold text-gold">${seat.priceFloor} / guest</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step 3: Tasting & Pairing Configuration */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Tasting Menu */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 space-y-4">
            <h4 className="text-xl font-bold font-serif-luxury text-white">3. Select Culinary Tasting Journey</h4>
            <div className="space-y-3">
              {TASTINGS.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setSelectedTasting(t)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    selectedTasting.id === t.id ? 'bg-gold/10 border-gold' : 'bg-zinc-900/50 border-zinc-800'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold uppercase tracking-wider text-gold font-mono">{t.badge}</span>
                    <span className="text-lg font-bold text-white font-mono">${t.price} / guest</span>
                  </div>
                  <h5 className="text-base font-bold text-white mt-1">{t.name}</h5>
                  <p className="text-sm text-zinc-300 mt-2 leading-relaxed">{t.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Beverage Pairing */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 space-y-4">
            <h4 className="text-xl font-bold font-serif-luxury text-white">4. Sommelier Beverage Pairing</h4>
            <div className="space-y-3">
              {PAIRINGS.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedPairing(p)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    selectedPairing.id === p.id ? 'bg-gold/10 border-gold' : 'bg-zinc-900/50 border-zinc-800'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <h5 className="text-base font-bold text-white">{p.name}</h5>
                    <span className="text-base font-bold text-gold font-mono">+${p.price} / guest</span>
                  </div>
                  <p className="text-sm text-zinc-300 mt-2 leading-relaxed">{p.notes}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step 4: Dietary Flags & Checkout Tally */}
        <div className="bg-zinc-950 border border-gold/40 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-zinc-800">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h4 className="text-xl font-bold text-white font-serif-luxury">5. Dietary Flags & Kitchen Intake</h4>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              'Gluten Free / Celiac Alert',
              'Shellfish Allergy (Severe)',
              'Alliums / Garlic Free',
              'Pescatarian Accommodation',
              'Zero Alcohol Preparation'
            ].map((flag) => (
              <button
                key={flag}
                type="button"
                onClick={() => toggleDietary(flag)}
                className={`py-2 px-4 rounded-xl text-sm font-semibold transition-all min-h-[44px] border ${
                  dietary.includes(flag) 
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300' 
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                }`}
              >
                {dietary.includes(flag) ? '✓ ' : '+ '} {flag}
              </button>
            ))}
          </div>

          {/* Checkout Bar */}
          <div className="pt-4 border-t border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-xs uppercase font-mono text-zinc-400">Reservation Summary</span>
              <p className="text-lg font-bold text-white">
                {selectedSeat.name} • {selectedTime} • {guestCount} Guests
              </p>
              <p className="text-sm text-zinc-300">
                {selectedTasting.name} + {selectedPairing.name}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="text-right">
                <span className="text-xs font-mono text-zinc-400 block">Total Experience: ${totalPrice.toLocaleString()}</span>
                <span className="text-2xl font-extrabold text-gold font-mono">${depositAmount} Deposit Due</span>
              </div>
              <button
                onClick={() => setBookingConfirmed(true)}
                className="w-full sm:w-auto py-3 px-8 bg-gold hover:bg-yellow-500 text-black font-bold text-base min-h-[44px] rounded-xl transition-all shadow-xl shadow-gold/20 flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" /> CONFIRM RESERVATION
              </button>
            </div>
          </div>

          {bookingConfirmed && (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/40 rounded-xl text-emerald-300 text-base font-semibold flex items-center justify-between">
              <span>🎉 Reservation Confirmed for {guestCount} guests at {selectedTime}! A confirmation text and dietary sheet have been dispatched.</span>
              <button 
                onClick={() => setBookingConfirmed(false)}
                className="text-xs text-emerald-200 underline font-mono"
              >
                Dismiss
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Admin Passcode Modal */}
      <AdminPortalModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        passcode="finedining2026"
      />
    </div>
  );
}
