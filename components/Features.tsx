import React, { useState } from 'react';
import { Activity, FileSearch, Mic, BarChart3, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Features: React.FC = () => {
  const { t } = useLanguage();
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({});

  const toggleCard = (index: number) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const features = [
    {
      icon: Activity,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      title: t.features.f1_title,
      desc: t.features.f1_desc,
      delay: '0s'
    },
    {
      icon: FileSearch,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      title: t.features.f2_title,
      desc: t.features.f2_desc,
      delay: '0.1s'
    },
    {
      icon: Mic,
      color: 'text-sky-400',
      bg: 'bg-sky-500/10',
      title: t.features.f3_title,
      desc: t.features.f3_desc,
      delay: '0.2s'
    },
    {
      icon: BarChart3,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      title: t.features.f4_title,
      desc: t.features.f4_desc,
      delay: '0.3s'
    }
  ];

  return (
    <section id="expertise" className="py-20 sm:py-32 relative overflow-hidden bg-slate-950/40">
      <div className="px-6 mx-auto max-w-7xl relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-24 reveal">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/5 bg-white/5 mb-6 sm:mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-[10px] sm:text-xs font-display font-bold tracking-[0.2em] sm:tracking-[0.3em] text-slate-300 uppercase">{t.features_extended.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-display font-black text-white mb-6 sm:mb-8 leading-tight">{t.features_extended.main_title}</h2>
          <p className="text-slate-300 max-w-3xl mx-auto font-medium text-lg sm:text-xl leading-relaxed">{t.features_extended.main_desc}</p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
          {features.map((feature, idx) => {
            const isExpanded = !!expandedCards[idx];

            return (
              <div
                key={idx}
                className={`group p-8 sm:p-12 glass rounded-[2.5rem] sm:rounded-[3rem] border-white/5 hover:border-primary/20 transition-all duration-700 reveal flex flex-col items-start text-left cursor-pointer`}
                style={{
                  transitionDelay: feature.delay,
                  minHeight: isExpanded ? 'auto' : '300px'
                }}
                onClick={() => toggleCard(idx)}
              >
                {/* Icon Circle */}
                <div className={`w-16 h-16 sm:w-20 sm:h-20 mb-6 sm:mb-10 rounded-2xl ${feature.bg} flex items-center justify-center ${feature.color} border border-white/5 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                  <feature.icon className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={2.5} />
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-display font-black text-white mb-6 sm:mb-8 leading-tight group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>

                {/* Description Container */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-96 opacity-100 mb-6 sm:mb-8' : 'max-h-0 opacity-0'
                    }`}
                >
                  <p className="text-slate-400 leading-relaxed text-sm sm:text-base font-medium">
                    {feature.desc}
                  </p>
                </div>

                {/* Toggle Button */}
                <div className="mt-auto flex items-center gap-3 sm:gap-4 text-[10px] sm:text-xs font-display font-black text-primary tracking-widest uppercase py-2">
                  {isExpanded ? (
                    <>{t.features_extended.toggle.hide} <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" /></>
                  ) : (
                    <>{t.features_extended.toggle.show} <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" /></>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] h-[400px] bg-primary/5 rounded-full blur-[120px] sm:blur-[160px] pointer-events-none"></div>
    </section>
  );
};

export default Features;