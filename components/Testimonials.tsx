
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Testimonials: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-32 relative overflow-hidden bg-slate-950/20">
      <div className="px-6 mx-auto max-w-7xl relative z-10 flex flex-col items-center">
        <div className="reveal flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass border-white/5 mb-10">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <span className="text-[11px] font-display font-black text-slate-400 uppercase tracking-[0.4em]">{t.testimonials.badge}</span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-8xl font-display font-black text-white tracking-tighter max-w-5xl leading-none">
            {t.testimonials.title}
          </h2>

          <div className="mt-16 w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-40"></div>
        </div>
      </div>

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-primary/5 rounded-full blur-[140px] pointer-events-none"></div>
    </section>
  );
};

export default Testimonials;
