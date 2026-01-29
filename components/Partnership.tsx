import React from 'react';
import { Handshake, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import fmpLogo from '../src/assets/logo-fmp.png';
import chuLogo from '../src/assets/logo-chu.jpg';
import doctifyLogo from '../src/assets/logo-doctify.png';
import moroccoSimLogo from '../src/assets/logo-moroccosim.jpg';

interface PartnershipProps {
  onOpenDrawer: () => void;
}

const Partnership: React.FC<PartnershipProps> = ({ onOpenDrawer }) => {
  const { t } = useLanguage();

  const partners = [
    {
      name: "Faculté de Médecine et de Pharmacie de Rabat",
      logo: fmpLogo,
      isPrimary: true,
      url: "https://fmp.um5.ac.ma/"
    },
    {
      name: "Centre Hospitalo-Universitaire Ibn Sina",
      logo: chuLogo,
      isPrimary: true,
      url: "http://www.chisrabat.ma/"
    },
    {
      name: "Doctify IA",
      logo: doctifyLogo,
      isPrimary: true,
      url: "https://www.doctifyhealth.com/"
    },
    {
      name: "Société Marocaine de Simulation en Santé",
      logo: moroccoSimLogo,
      isPrimary: true,
      url: "https://www.moroccosim.org/"
    },
  ];

  return (
    <section id="partenaires" className="py-16 sm:py-24 relative overflow-hidden bg-white/40">
      <div className="px-6 mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 mb-12 sm:mb-16 reveal">
          <div className="max-w-xl text-center lg:text-left rtl:lg:text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Handshake className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] font-display font-bold text-primary uppercase tracking-widest">{t.partnership.badge}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black text-slate-900 mb-4">{t.partnership.title}</h2>
            <p className="text-slate-500 font-medium text-lg">{t.partnership.subtitle}</p>
          </div>

          <button
            onClick={onOpenDrawer}
            className="px-8 py-4 bg-primary text-slate-950 rounded-2xl border-2 border-primary hover:bg-white hover:border-white transition-all font-display font-bold text-sm tracking-widest uppercase flex items-center gap-3 shadow-[0_0_30px_rgba(0,216,255,0.3)] group"
          >
            {t.partnership.cta}
            <ArrowUpRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 items-stretch justify-center reveal" style={{ transitionDelay: '0.2s' }}>
          {partners.map((partner, i) => {
            const CardContent = (
              <>
                {partner.isPrimary ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-full h-32 relative">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
                      />
                    </div>
                    <div className="text-[10px] font-display font-black text-slate-900 text-center leading-tight uppercase tracking-tighter max-w-[200px] mt-2">
                      {partner.name}
                    </div>
                  </div>
                ) : (
                  <div className="text-[9px] font-mono font-bold text-slate-400 tracking-tighter group-hover:text-primary transition-colors text-center">
                    {partner.name}
                  </div>
                )}
              </>
            );

            const cardClasses = `flex flex-col items-center justify-center p-2 transition-all group overflow-hidden ${partner.isPrimary ? 'opacity-100 scale-110' : 'glass rounded-[2rem] border-white/60 opacity-40 grayscale hover:grayscale-0 hover:opacity-100'}`;

            return partner.url ? (
              <a
                key={i}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cardClasses}
              >
                {CardContent}
              </a>
            ) : (
              <div key={i} className={cardClasses}>
                {CardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Partnership;