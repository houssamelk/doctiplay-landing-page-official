import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface MonitorProps {
  logs?: string[];
}

const Monitor: React.FC<MonitorProps> = ({ logs = [] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="relative mx-auto w-full max-w-[520px]" dir="ltr">
      {/* Dynamic Glow Aura */}
      <div className="absolute -inset-4 bg-primary/20 blur-[40px] sm:blur-[60px] rounded-full animate-glow-pulse"></div>

      {/* Monitor Outer Shell */}
      <div className="relative glass-dark rounded-[1.5rem] sm:rounded-[2rem] p-1 shadow-[0_32px_64px_-16px_rgba(15,23,42,0.4)] overflow-hidden border border-white/10">

        {/* Inner Screen Display */}
        <div className="relative bg-black rounded-[1.4rem] sm:rounded-[1.8rem] p-4 sm:p-6 overflow-hidden min-h-[380px] sm:min-h-[420px] flex flex-col">

          {/* CRTs Scanline Effect */}
          <div className="absolute inset-0 pointer-events-none z-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(0,216,255,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]"></div>
          <div className="absolute inset-0 z-20 pointer-events-none w-full h-1/4 bg-gradient-to-b from-transparent via-white/5 to-transparent animate-scanline"></div>

          {/* Digital Header */}
          <div className="flex justify-between items-center mb-4 sm:mb-6 border-b border-white/10 pb-3 sm:pb-4 relative z-10">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative">
                <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-red-500 animate-pulse"></div>
                <div className="absolute inset-0 w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-red-400 blur-sm animate-pulse"></div>
              </div>
              <span className="text-[10px] sm:text-[10px] text-white/90 font-display tracking-[0.2em] sm:tracking-[0.3em] font-bold uppercase">{t.monitor.live}</span>
            </div>
            <div className="px-2 sm:px-3 py-0.5 sm:py-1 bg-white/5 rounded-full border border-white/10">
              <span className="text-[9px] sm:text-[9px] text-primary font-display font-bold tracking-widest uppercase">X ben X</span>
            </div>
          </div>

          {/* ECG Vital Feed */}
          <div className="h-24 sm:h-32 bg-slate-900/40 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 relative overflow-hidden flex items-center border border-white/5 shadow-inner">
            {/* ECG Grid Lines */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="h-full w-full" style={{ backgroundImage: 'radial-gradient(circle, rgba(0, 216, 255, 0.4) 1px, transparent 1px)', backgroundSize: '15px 15px' }}></div>
            </div>

            {/* Moving Waveform */}
            <div className="ecg-line h-full w-full absolute top-0 left-0"></div>

            {/* Vital Readout Overlay */}
            <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 text-right">
              <div className="text-3xl sm:text-4xl font-bold font-display text-primary leading-none drop-shadow-[0_0_15px_rgba(0,216,255,0.5)]">
                72
              </div>
              <div className="text-[9px] sm:text-[9px] text-primary/90 font-display font-bold uppercase tracking-[0.2em] mt-1">bpm</div>
            </div>
          </div>

          {/* System Console Logs */}
          <div className="flex-grow flex flex-col relative z-10">
            <div className="text-[9px] sm:text-[9px] text-white/80 font-display uppercase tracking-widest mb-2 sm:mb-3 flex items-center gap-2">
              <div className="w-0.5 sm:w-1 h-2 sm:h-3 bg-primary rounded-full"></div>
              {t.monitor_extended.system_log_label}
            </div>

            <div
              ref={scrollRef}
              className="bg-black/40 rounded-lg sm:rounded-xl p-3 sm:p-4 font-display text-[10px] sm:text-[10px] h-32 sm:h-40 overflow-y-auto scrollbar-hide border border-white/5"
            >
              {logs.length === 0 ? (
                <div className="space-y-2 sm:space-y-3">
                  <div className="text-primary flex items-center gap-2">
                    <span className="opacity-50">01.</span>
                    <span>&gt; {t.monitor.standby}</span>
                  </div>
                  <div className="text-white/40 flex items-center gap-2 animate-pulse">
                    <span className="opacity-50">02.</span>
                    <span>&gt; {t.monitor.waiting}</span>
                  </div>
                </div>
              ) : (
                logs.map((log, index) => (
                  <div key={index} className="text-primary/90 py-1 border-b border-white/5 last:border-0 flex items-start gap-2 animate-fade-in-up">
                    <span className="opacity-30 flex-shrink-0">{(index + 1).toString().padStart(2, '0')}.</span>
                    <span className="leading-relaxed">{log}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monitor;