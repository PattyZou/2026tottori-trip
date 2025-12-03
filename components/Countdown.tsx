import React, { useState, useEffect } from 'react';

const Countdown: React.FC = () => {
  // 設定目標時間：2026年2月13日 11:25 (台灣時間預計抵達機場)
  const targetDate = new Date('2026-02-13T11:25:00').getTime();
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md border-t-4 border-zen-pink text-center max-w-lg mx-auto mb-10">
      <h2 className="text-xl md:text-2xl font-serif text-zen-blue mb-2 tracking-widest">距離出發還有</h2>
      <p className="text-sm text-gray-500 mb-4">(預計 11:25 抵達機場)</p>
      
      <div className="flex justify-center items-center gap-4 md:gap-8 mb-6">
        <div className="flex flex-col items-center">
          <span className="text-3xl md:text-5xl font-bold text-zen-text font-serif">{timeLeft.days}</span>
          <span className="text-sm text-gray-500 mt-1">天</span>
        </div>
        <div className="text-2xl text-zen-pink pb-4">:</div>
        <div className="flex flex-col items-center">
          <span className="text-3xl md:text-5xl font-bold text-zen-text font-serif">{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="text-sm text-gray-500 mt-1">時</span>
        </div>
        <div className="text-2xl text-zen-pink pb-4">:</div>
        <div className="flex flex-col items-center">
          <span className="text-3xl md:text-5xl font-bold text-zen-text font-serif">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="text-sm text-gray-500 mt-1">分</span>
        </div>
        <div className="text-2xl text-zen-pink pb-4">:</div>
        <div className="flex flex-col items-center">
          <span className="text-3xl md:text-5xl font-bold text-zen-text font-serif">{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className="text-sm text-gray-500 mt-1">秒</span>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 mt-2">
        <div className="flex items-center justify-center gap-2 text-zen-blue font-bold text-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 12h20"/><path d="m22 12-5-5m5 5-5 5"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
          <span>航班資訊：IT724</span>
        </div>
        <p className="text-gray-600 mt-1">13:25 起飛</p>
      </div>
    </div>
  );
};

export default Countdown;