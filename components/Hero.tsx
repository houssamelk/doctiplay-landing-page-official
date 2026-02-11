import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import DashboardModal from './DashboardModal';

interface HeroProps {
  onOpenPartnership: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenPartnership }) => {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <section id="simulation" className="relative pt-20 sm:pt-44 pb-12 sm:pb-32 overflow-hidden min-h-[90vh] flex flex-col items-center justify-center">
      {/* Background Ambience */}
      <div className="abstract-wave top-[10%] -left-[20%] opacity-50 sm:opacity-100"></div>
      <div className="abstract-wave bottom-[10%] -right-[20%] rotate-[165deg] opacity-50 sm:opacity-100"></div>

      <DashboardModal
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
      />

      {/* Centered Content Wrapper */}
      <div className="relative z-10 px-4 max-w-[95vw] mx-auto w-full flex flex-col items-center text-center mb-8 sm:mb-24">

        {/* Subtle Badge */}
        <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full border border-primary/20 bg-primary/5 mb-6 sm:mb-10 animate-fade-in-up">
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" />
          <span className="text-[10px] sm:text-[12px] font-display font-black tracking-[0.2em] sm:tracking-[0.25em] text-primary uppercase">
            {t.hero.badge}
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="mb-6 sm:mb-10 animate-fade-in-up [animation-delay:100ms] w-full flex flex-col items-center">
          <span className="block font-display font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-2 sm:mb-4 leading-tight antialiased tracking-tight">
            {t.hero.headline}
          </span>
          <span className="block font-body font-black text-3xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.8rem] text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary leading-[1.1] sm:leading-[1] pb-2 sm:pb-4 antialiased tracking-tighter max-w-full px-2 break-words">
            {t.hero.headline_highlight}
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-slate-300 text-base sm:text-xl md:text-2xl font-medium max-w-3xl mb-8 sm:mb-14 animate-fade-in-up [animation-delay:200ms] leading-relaxed px-4">
          {t.hero_extended.subtext_full}
        </p>

        {/* Primary CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-12 sm:mb-24 animate-fade-in-up [animation-delay:300ms] w-full max-w-sm sm:max-w-none">
          <button
            onClick={() => setIsDashboardOpen(true)}
            className="group w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 bg-white text-slate-950 rounded-full font-display font-black text-[12px] sm:text-sm tracking-widest uppercase flex items-center justify-center gap-4 hover:bg-primary hover:text-white transition-all shadow-[0_20px_50px_rgba(0,216,255,0.2)] hover:-translate-y-1 cursor-pointer"
          >
            {t.hero_extended.btn_command}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Aesthetic Spreading Elements */}
      <div className="absolute top-[20%] right-[10%] w-40 h-40 sm:w-64 sm:h-64 bg-primary/5 rounded-full blur-[80px] sm:blur-[100px] animate-pulse-slow"></div>
      <div className="absolute bottom-[20%] left-[10%] w-60 h-60 sm:w-96 sm:h-96 bg-blue-600/5 rounded-full blur-[100px] sm:blur-[120px] animate-pulse-slow" style={{ animationDelay: '3s' }}></div>
    </section>
  );
};

export default Hero;