import React, { useState, useEffect } from 'react';
import { DaySchedule } from './types';
import { INITIAL_ITINERARY } from './constants';
import Countdown from './components/Countdown';
import DayCard from './components/DayCard';

const STORAGE_KEY = 'jp_trip_2026_itinerary';

const App: React.FC = () => {
  const [days, setDays] = useState<DaySchedule[]>([]);
  const [activeDayId, setActiveDayId] = useState<string>('day1');
  const [loading, setLoading] = useState(true);

  // Load from Storage or Constants
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        setDays(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to parse local storage", e);
        setDays(INITIAL_ITINERARY);
      }
    } else {
      setDays(INITIAL_ITINERARY);
    }
    setLoading(false);
  }, []);

  // Determine which day to open by default
  useEffect(() => {
    if (loading) return;

    const today = new Date().toISOString().split('T')[0];
    const foundDay = days.find(d => d.date === today);
    
    if (foundDay) {
      setActiveDayId(foundDay.id);
    } else {
      // If today is not in itinerary, default to first day
      setActiveDayId('day1');
    }
  }, [days, loading]);

  const handleUpdateDay = (updatedDay: DaySchedule) => {
    const newDays = days.map(d => d.id === updatedDay.id ? updatedDay : d);
    setDays(newDays);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newDays));
  };

  const resetData = () => {
    if (window.confirm('確定要重置行程到原始設定嗎？所有修改將會遺失。')) {
      setDays(INITIAL_ITINERARY);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-zen-bg"><div className="text-zen-pink animate-pulse text-xl">Loading...</div></div>;

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Header */}
      <header className="relative bg-zen-blue text-white pt-16 pb-32 px-4 rounded-b-[3rem] shadow-xl overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             {/* Japanese Pattern Background SVG pattern simulation */}
             <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="seigaiha" patternUnits="userSpaceOnUse" width="40" height="20">
                    <path d="M0,10 A10,10 0 0,1 20,10 A10,10 0 0,1 40,10" fill="none" stroke="white" strokeWidth="1"/>
                    <path d="M20,0 A10,10 0 0,1 40,0" fill="none" stroke="white" strokeWidth="1"/>
                    <path d="M0,0 A10,10 0 0,1 20,0" fill="none" stroke="white" strokeWidth="1"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#seigaiha)" />
            </svg>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-1 border border-white/30 rounded-full text-sm tracking-widest mb-4 bg-white/10 backdrop-blur-md">
            FAMILY TRIP 2026
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4 leading-tight">
            新春孝親之旅<br/>
            <span className="text-2xl md:text-4xl mt-2 block text-zen-pink">鳥取・有馬溫泉</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 font-light tracking-wide">
            2026.02.13 — 02.17 (共5天)
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 -mt-20 relative z-20">
        
        <Countdown />

        <div className="space-y-4">
          <div className="flex justify-between items-end px-2 mb-2">
            <h2 className="text-2xl font-serif text-zen-blue font-bold flex items-center gap-2">
              <span className="w-2 h-8 bg-zen-pink rounded-full block"></span>
              行程總覽
            </h2>
            <button onClick={resetData} className="text-xs text-gray-400 hover:text-red-400 underline decoration-dotted">
              重置設定
            </button>
          </div>

          {days.map((day) => (
            <DayCard
              key={day.id}
              day={day}
              isActive={activeDayId === day.id}
              onToggle={() => setActiveDayId(activeDayId === day.id ? '' : day.id)}
              onUpdate={handleUpdateDay}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-10 text-gray-400 text-sm">
        <p>© 2026 Family Trip Project</p>
        <p className="mt-1 text-xs">Built with React & Tailwind</p>
      </footer>
    </div>
  );
};

export default App;