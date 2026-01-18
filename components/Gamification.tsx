import React, { useState } from 'react';
import { Award, Shield, Zap, TrendingUp, Lock, FileSearch, Sparkles, X, Heart, Eye, Clock, Users, BookOpen, Fingerprint } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Gamification: React.FC = () => {
  const { t } = useLanguage();
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const mainBadges = [
    { icon: Zap, color: 'text-amber-500', title: t.gamification.b1, desc: t.gamification_extended.badges.desc_zip, delay: '0.2s' },
    { icon: FileSearch, color: 'text-purple-500', title: t.gamification.b2, desc: t.gamification_extended.badges.desc_filesearch, delay: '0.4s' },
    { icon: Shield, color: 'text-sky-600', title: t.gamification.b3, desc: t.gamification_extended.badges.desc_shield, delay: '0.6s' }
  ];

  const galleryBadges = [
    ...mainBadges,
    { icon: Heart, color: 'text-rose-500', title: t.gamification_extended.badges.expert_reanim, desc: t.gamification_extended.badges.desc_expert_reanim },
    { icon: Eye, color: 'text-cyan-400', title: t.gamification_extended.badges.oeil_lynx, desc: t.gamification_extended.badges.desc_oeil_lynx },
    { icon: Clock, color: 'text-emerald-400', title: t.gamification_extended.badges.vitesse_eclair, desc: t.gamification_extended.badges.desc_vitesse_eclair },
    { icon: Users, color: 'text-blue-400', title: t.gamification_extended.badges.maitre_orateur, desc: t.gamification_extended.badges.desc_maitre_orateur },
    { icon: BookOpen, color: 'text-indigo-400', title: t.gamification_extended.badges.major_promo, desc: t.gamification_extended.badges.desc_major_promo },
    { icon: Fingerprint, color: 'text-fuchsia-400', title: t.gamification_extended.badges.precision_chir, desc: t.gamification_extended.badges.desc_precision_chir },
  ];

  return (
    <section id="progression" className="py-20 sm:py-32 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] bg-primary/5 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none"></div>

      <div className="px-6 mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-16 sm:mb-24 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-white/5 bg-white/5 mb-6 sm:mb-8">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] font-display font-bold text-slate-300 uppercase tracking-[0.3em]">{t.gamification_extended.system_badge}</span>
          </div>
          <h2 className="text-3xl sm:text-7xl font-display font-black text-white mb-6 tracking-tight">
            {t.gamification.title}
          </h2>
          <p className="text-slate-400 font-medium text-base sm:text-lg max-w-2xl mx-auto">
            {t.gamification_extended.description}
          </p>
        </div>

        {/* Progression Path */}
        <div className="relative flex flex-col md:flex-row justify-between items-center max-w-4xl mx-auto mb-20 sm:mb-40 gap-16 md:gap-4 reveal">
          {/* Connecting line for desktop */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 -z-10 hidden md:block">
            <div className="h-full w-1/3 bg-primary/40 animate-pulse"></div>
          </div>

          {/* Connecting line for mobile */}
          <div className="absolute left-1/2 top-0 w-px h-full bg-white/5 -z-10 block md:hidden -translate-x-1/2">
            <div className="w-full h-1/3 bg-primary/40 animate-pulse"></div>
          </div>

          {[
            { id: 'I', label: t.gamification.rank_student, sub: 'LVL 01-10', current: false, delay: '0.1s' },
            { id: 'II', label: t.gamification.rank_intern, sub: 'LVL 11-25', active: true, current: true, icon: TrendingUp, delay: '0.3s' },
            { id: 'III', label: t.gamification.rank_pro, sub: 'LVL 50+', locked: true, delay: '0.5s' }
          ].map((rank, i) => (
            <div
              key={i}
              className={`flex flex-col items-center group transition-all duration-700 bg-slate-950 md:bg-transparent p-4 rounded-3xl md:p-0 border border-white/5 md:border-none ${rank.locked ? 'opacity-30' : 'opacity-100'}`}
              style={{ transitionDelay: rank.delay }}
            >
              <div className={`w-24 h-24 sm:w-32 sm:h-32 rounded-[2rem] sm:rounded-[2.5rem] flex items-center justify-center mb-6 sm:mb-8 relative transition-all duration-500 ${rank.active ? 'bg-primary text-slate-950 shadow-[0_0_40px_rgba(0,216,255,0.3)] rotate-3' : 'glass border-white/10 text-white/20'}`}>
                {rank.locked ? <Lock className="w-8 h-8 sm:w-10 sm:h-10" /> : rank.icon ? <rank.icon className="w-10 h-10 sm:w-12 sm:h-12" /> : <span className="text-3xl sm:text-4xl font-display font-black">{rank.id}</span>}
                {rank.current && (
                  <div className="absolute -top-3 sm:-top-4 -right-3 sm:-right-4 bg-white text-slate-950 text-[8px] sm:text-[9px] font-display font-black px-3 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-xl animate-bounce tracking-widest uppercase">{t.gamification_extended.rank_current}</div>
                )}
              </div>
              <div className={`text-lg sm:text-xl font-display font-black mb-1 sm:mb-2 ${rank.active ? 'text-primary' : 'text-slate-500'}`}>{rank.label}</div>
              <div className="text-[9px] sm:text-[10px] text-slate-500 font-mono font-bold tracking-widest">{rank.sub}</div>
            </div>
          ))}
        </div>

        {/* Badges Section */}
        <div className="glass border-white/5 rounded-[2rem] sm:rounded-[3.5rem] p-8 sm:p-12 lg:p-20 shadow-2xl reveal">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 sm:mb-16 gap-8">
            <div className="flex items-center gap-4 sm:gap-6 text-center md:text-left flex-col md:flex-row">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/20">
                <Award className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-display font-black text-white">{t.gamification.badges_title}</h3>
                <p className="text-slate-400 text-xs sm:text-sm font-medium">{t.gamification_extended.badges.subtitle}</p>
              </div>
            </div>
            <button
              onClick={() => setIsGalleryOpen(true)}
              className="w-full md:w-auto px-10 py-4 glass hover:bg-white text-[10px] font-display font-black text-primary hover:text-slate-950 rounded-full border border-primary/20 transition-all uppercase tracking-[0.2em]"
            >
              {t.gamification_extended.gallery_btn}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10">
            {mainBadges.map((badge, idx) => (
              <div
                key={idx}
                className="flex items-center gap-6 sm:gap-8 p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] bg-white/5 border border-white/5 hover:border-primary/30 transition-all group reveal"
                style={{ transitionDelay: badge.delay }}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform flex-shrink-0">
                  <badge.icon className={`w-8 h-8 sm:w-10 sm:h-10 ${badge.color}`} />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-display font-black text-white mb-1 sm:mb-2 leading-tight">{badge.title}</div>
                  <div className="text-[9px] sm:text-[10px] text-slate-500 font-mono font-bold uppercase tracking-widest">{badge.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Modal */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-3xl animate-fade-in">
          <div className="glass border-white/10 w-full max-w-5xl rounded-[2rem] sm:rounded-[3.5rem] p-8 sm:p-10 lg:p-16 max-h-[90vh] overflow-y-auto scrollbar-hide relative shadow-2xl">
            <button
              onClick={() => setIsGalleryOpen(false)}
              className="absolute top-4 sm:top-8 right-4 sm:right-8 p-3 sm:p-4 rounded-full glass border-white/10 text-white hover:bg-white/10 transition-all"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <div className="text-center mb-10 sm:mb-16">
              <h3 className="text-3xl lg:text-6xl font-display font-black text-white mb-4">{t.gamification_extended.gallery_modal.title}</h3>
              <p className="text-slate-400 font-medium text-sm sm:text-base px-4">{t.gamification_extended.gallery_modal.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
              {galleryBadges.map((badge, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/5 border border-white/5 hover:border-primary/20 hover:bg-white/10 transition-all group"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform flex-shrink-0">
                    <badge.icon className={`w-7 h-7 sm:w-8 sm:h-8 ${badge.color}`} />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-display font-black text-white mb-1">{badge.title}</div>
                    <div className="text-[8px] sm:text-[10px] text-slate-500 font-mono font-bold uppercase tracking-widest">{badge.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 sm:mt-20 pt-8 sm:pt-10 border-t border-white/5 text-center">
              <p className="text-[10px] sm:text-xs font-mono text-slate-500 uppercase tracking-widest">{t.gamification_extended.gallery_modal.footer}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gamification;