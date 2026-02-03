import React, { useState } from 'react';
import { Loader2, Activity, Target, HeartPulse, Truck, Stethoscope, Sparkles, ArrowRight, CheckCircle2, BarChart3, Zap } from 'lucide-react';
import Monitor from './Monitor';
import { useLanguage } from '../contexts/LanguageContext';

interface HeroProps {
  onOpenPartnership: () => void;
  onOpenComingSoon: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenPartnership, onOpenComingSoon }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMode, setSelectedMode] = useState<'geste' | 'ambulance' | 'dechocage'>('ambulance');
  const [selectedCat, setSelectedCat] = useState<'medical' | 'surgical' | 'pediatric'>('medical');
  const { t, language } = useLanguage();

  const startSimulation = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setLogs([`>> [SYSTEM] ${language === 'ar' ? 'جار الاتصال بـ NEURAL LINK...' : 'ESTABLISHING NEURAL LINK...'}`]);

    // Simulated scenario logs
    const mockScenario = [
      ">> [LINK] NEURAL CONNECTION STABLE (L4)",
      ">> [DATA] PATIENT VITALS STREAMING...",
      `>> [ALERT] MODE: ${selectedMode.toUpperCase()} | CAT: ${selectedCat.toUpperCase()}`,
      ">> [SCENARIO] Patient: Male, 45y. Sudden onset of chest pain.",
      ">> [VITAL] HR: 115 bpm | SpO2: 92% | BP: 145/90",
      ">> [ACTION] Preparing emergency intervention protocol...",
      ">> [SYSTEM] AI ANALYZING REAL-TIME DECISION MAKING...",
      ">> [HINT] Consider checking for ST-segment elevation.",
      ">> [LOG] Simulation running. Awaiting clinical gestures..."
    ];

    for (let i = 0; i < mockScenario.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1000));
      setLogs(prev => [...prev, mockScenario[i]]);
    }

    setIsLoading(false);
  };

  const modes = [
    { id: 'geste', label: t.modes.geste, icon: HeartPulse },
    { id: 'ambulance', label: t.modes.ambulance, icon: Truck },
    { id: 'dechocage', label: t.modes.dechocage, icon: Stethoscope },
  ];

  const cats = [
    { id: 'medical', label: t.categories.medical },
    { id: 'surgical', label: t.categories.surgical },
    { id: 'pediatric', label: t.categories.pediatric },
  ];

  const debriefItems = [
    { text: t.hero_extended.debrief.items[0], icon: CheckCircle2 },
    { text: t.hero_extended.debrief.items[1], icon: CheckCircle2 },
    { text: t.hero_extended.debrief.items[2], icon: CheckCircle2 },
    { text: t.hero_extended.debrief.items[3], icon: CheckCircle2 },
  ];

  return (
    <section id="simulation" className="relative pt-32 sm:pt-44 pb-16 sm:pb-32 overflow-hidden min-h-screen flex flex-col items-center">
      {/* Background Ambience */}
      <div className="abstract-wave top-[10%] -left-[20%] opacity-50 sm:opacity-100"></div>
      <div className="abstract-wave bottom-[10%] -right-[20%] rotate-[165deg] opacity-50 sm:opacity-100"></div>

      {/* Centered Content Wrapper */}
      <div className="relative z-10 px-4 max-w-[95vw] mx-auto w-full flex flex-col items-center text-center mb-12 sm:mb-24">

        {/* Subtle Badge */}
        <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full border border-primary/20 bg-primary/5 mb-6 sm:mb-10 animate-fade-in-up">
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" />
          <span className="text-[10px] sm:text-[12px] font-display font-black tracking-[0.2em] sm:tracking-[0.25em] text-primary uppercase">
            {t.hero.badge}
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="mb-6 sm:mb-10 animate-fade-in-up [animation-delay:100ms] w-full flex flex-col items-center">
          <span className="block font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-2 sm:mb-4 leading-tight antialiased tracking-tight">
            {t.hero.headline}
          </span>
          <span className="block font-body font-black text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.8rem] text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary leading-[1.1] sm:leading-[1] pb-2 sm:pb-4 antialiased tracking-tighter max-w-full px-2">
            {t.hero.headline_highlight}
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-slate-300 text-base sm:text-xl md:text-2xl font-medium max-w-3xl mb-8 sm:mb-14 animate-fade-in-up [animation-delay:200ms] leading-relaxed px-4">
          {t.hero_extended.subtext_full}
        </p>

        {/* Primary CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-12 sm:mb-24 animate-fade-in-up [animation-delay:300ms] w-full max-w-sm sm:max-w-none">
          <a
            href="/pitch/"
            target="_blank"
            rel="noopener noreferrer"
            className="group w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 bg-white text-slate-950 rounded-full font-display font-black text-[12px] sm:text-sm tracking-widest uppercase flex items-center justify-center gap-4 hover:bg-primary hover:text-white transition-all shadow-[0_20px_50px_rgba(0,216,255,0.2)] hover:-translate-y-1 cursor-pointer"
          >
            {t.hero_extended.btn_command}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>

          <button
            onClick={onOpenComingSoon}
            className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 rounded-full border border-white/20 text-white font-display font-black text-[12px] sm:text-sm tracking-widest uppercase hover:bg-white/10 transition-all text-center"
          >
            {t.hero.btn_tutorial}
          </button>
        </div>
      </div>

      {/* Interactive Cockpit / Monitor Area */}
      <div id="config-panel" className="relative z-10 w-full max-w-[1600px] px-4 sm:px-6 grid lg:grid-cols-12 gap-8 sm:gap-12 items-start reveal">

        {/* Configuration Cockpit */}
        <div className="order-2 lg:order-1 lg:col-span-4 space-y-6 sm:space-y-8">
          <div className="glass p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] border-white/5">
            <label className="block text-[10px] font-mono font-black uppercase tracking-[0.3em] text-primary mb-6 sm:mb-10">{t.hero.mode_title}</label>
            <div className="flex flex-col gap-3 sm:gap-4">
              {modes.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMode(m.id as any)}
                  className={`flex items-center gap-4 sm:gap-5 px-6 sm:px-8 py-4 sm:py-5 rounded-xl sm:rounded-2xl transition-all border font-black text-[11px] sm:text-sm uppercase tracking-widest ${selectedMode === m.id ? 'bg-primary text-slate-950 border-white shadow-[0_0_30px_rgba(0,216,255,0.2)]' : 'bg-white/5 text-slate-400 border-white/5 hover:border-white/20'}`}
                >
                  <m.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${selectedMode === m.id ? 'text-slate-950' : 'text-primary'}`} />
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <div className="glass p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] border-white/5">
            <label className="block text-[10px] font-mono font-black uppercase tracking-[0.3em] text-primary mb-6 sm:mb-10">{t.hero.cat_title}</label>
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              {cats.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCat(c.id as any)}
                  className={`px-6 sm:px-8 py-4 sm:py-5 rounded-xl sm:rounded-2xl transition-all border font-black text-[11px] sm:text-sm uppercase tracking-widest ${selectedCat === c.id ? 'bg-white text-slate-950 border-white shadow-xl' : 'bg-white/5 text-slate-400 border-white/5 hover:border-white/20'}`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Start Button - below Mode and Category */}
          <div className="flex justify-center lg:hidden">
            <button
              onClick={startSimulation}
              disabled={isLoading}
              className="w-full py-5 bg-primary text-slate-950 rounded-2xl font-display font-black text-sm tracking-widest uppercase shadow-[0_0_30px_rgba(0,216,255,0.3)] disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
              {isLoading ? t.hero.btn_initializing : t.hero.btn_start}
            </button>
          </div>
        </div>

        {/* Central Monitor Display */}
        <div className="order-1 lg:order-2 lg:col-span-5 perspective-monitor py-4 sm:py-12">
          {/* Reduce rotation on mobile for better usability */}
          <div className="sm:rotate-3d-soft origin-center scale-100 sm:scale-110">
            <Monitor logs={logs} />
          </div>
        </div>

        {/* Right Info / Debrief */}
        <div className="order-3 lg:col-span-3 flex flex-col gap-6 sm:gap-8">
          <div className="relative group overflow-hidden glass p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] border-primary/30 bg-gradient-to-br from-primary/10 via-slate-950/40 to-transparent flex flex-col items-start text-left shadow-[0_0_50px_rgba(0,216,255,0.1)] transition-all hover:border-primary/60 hover:shadow-[0_0_70px_rgba(0,216,255,0.2)]">
            {/* Decorative scanning line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 animate-scanline"></div>

            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-primary text-slate-950 flex items-center justify-center mb-6 sm:mb-8 shadow-[0_0_20px_rgba(0,216,255,0.5)] group-hover:scale-110 transition-transform">
              <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>

            <h3 className="text-xl sm:text-2xl font-display font-black text-white mb-2 uppercase tracking-tight">{t.hero_extended.debrief.title}</h3>
            <p className="text-slate-200 text-xs sm:text-sm mb-6 sm:mb-8 font-medium">{t.hero_extended.debrief.subtitle}</p>

            <ul className="space-y-4 sm:space-y-5 w-full">
              {debriefItems.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 sm:gap-4 group/item">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20 group-hover/item:bg-primary/30 transition-colors">
                    <item.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" />
                  </div>
                  <span className="text-slate-300 text-[14px] sm:text-[16px] font-bold leading-tight group-hover/item:text-white transition-colors">{item.text}</span>
                </li>
              ))}
            </ul>

            {/* Aesthetic Spacer */}
            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/5 w-full flex items-center justify-between text-[9px] sm:text-[10px] font-mono font-bold text-primary opacity-40">
              <span>ANALYSIS_CORE_V2</span>
              <Activity className="w-3 h-3" />
            </div>
          </div>

          {/* Start Simulation Button (Desktop) */}
          <button
            onClick={startSimulation}
            disabled={isLoading}
            className="hidden lg:flex w-full py-6 bg-white text-slate-950 rounded-[2rem] font-display font-black text-sm tracking-widest uppercase hover:bg-primary hover:text-white transition-all shadow-xl disabled:opacity-50 items-center justify-center gap-4 group"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />}
            {isLoading ? t.hero.btn_initializing : t.hero_extended.btn_start_now}
          </button>

          <div className="glass p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] border-white/5 hidden sm:block bg-white/2">
            <div className="flex items-center gap-4 sm:gap-5 mb-4 sm:mb-5">
              <Target className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              <span className="text-[10px] sm:text-xs font-display font-bold text-slate-400 uppercase tracking-widest">{t.hero_extended.sensor.label}</span>
            </div>
            <div className="flex items-end justify-between">
              <div className="text-4xl sm:text-5xl font-black text-white font-body">99%</div>
              <div className="text-[10px] text-primary font-mono font-black uppercase pb-1 tracking-tighter">{t.hero_extended.sensor.status}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Aesthetic Spreading Elements */}
      <div className="absolute top-[20%] right-[10%] w-40 h-40 sm:w-64 sm:h-64 bg-primary/5 rounded-full blur-[80px] sm:blur-[100px] animate-pulse-slow"></div>
      <div className="absolute bottom-[20%] left-[10%] w-60 h-60 sm:w-96 sm:h-96 bg-blue-600/5 rounded-full blur-[100px] sm:blur-[120px] animate-pulse-slow" style={{ animationDelay: '3s' }}></div>
    </section>
  );
};

export default Hero;