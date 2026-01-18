import React, { useState, useEffect, useRef } from 'react';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const FAQ: React.FC = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const revealedIndices = useRef<Set<number>>(new Set());

  const faqData = [
    { q: t.faq.q1, a: t.faq.a1 },
    { q: t.faq.q2, a: t.faq.a2 },
    { q: t.faq.q3, a: t.faq.a3 },
    { q: t.faq.q4, a: t.faq.a4 },
    { q: t.faq.q5, a: t.faq.a5 },
    { q: t.faq.q6, a: t.faq.a6 },
    { q: t.faq.q7, a: t.faq.a7 },
    { q: t.faq.q8, a: t.faq.a8 },
  ];

  useEffect(() => {
    const checkActive = () => {
      const elements = document.querySelectorAll('.faq-item-container');
      elements.forEach((el, idx) => {
        if (el.classList.contains('active')) {
          revealedIndices.current.add(idx);
        }
      });
    };

    const interval = setInterval(checkActive, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="faq" className="py-32 relative overflow-hidden bg-slate-950/20">
      {/* Dynamic Background Element */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent"></div>

      <div className="px-6 mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-24 reveal flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass border-white/5 bg-white/5 mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-display font-bold text-slate-300 uppercase tracking-[0.3em]">{t.faq.badge}</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-black text-white mb-8 tracking-tight">
            {t.faq.title}
          </h2>
          <div className="h-[2px] w-32 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {faqData.map((item, index) => {
            const isOpened = openIndex === index;
            const revealClass = revealedIndices.current.has(index) ? 'active' : '';

            return (
              <div
                key={index}
                className={`faq-item-container reveal transition-all duration-500 ${revealClass}`}
                style={{ transitionDelay: `${(index % 5) * 0.05}s` }}
              >
                <div
                  className={`group glass border-white/5 rounded-[2.5rem] transition-all duration-500 overflow-hidden cursor-pointer ${isOpened
                      ? 'bg-white/5 border-primary/30 shadow-[0_0_40px_rgba(0,216,255,0.1)]'
                      : 'hover:bg-white/5 hover:border-white/20'
                    }`}
                  onClick={() => setOpenIndex(isOpened ? null : index)}
                >
                  <div className="p-8 flex items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                      <div className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${isOpened ? 'bg-primary text-slate-950 rotate-[5deg]' : 'bg-white/5 text-primary border border-white/10'
                        }`}>
                        <HelpCircle className="w-7 h-7" strokeWidth={2.5} />
                      </div>
                      <h3 className={`text-lg sm:text-xl font-display font-black leading-snug tracking-tight transition-colors ${isOpened ? 'text-white' : 'text-slate-200'
                        }`}>
                        {item.q || t.faq.question_fallback}
                      </h3>
                    </div>
                    <div className={`transition-all duration-300 ${isOpened ? 'text-primary rotate-180' : 'text-slate-600'}`}>
                      <ChevronDown className="w-8 h-8" strokeWidth={3} />
                    </div>
                  </div>

                  <div
                    className={`transition-all duration-500 ease-in-out ${isOpened ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                  >
                    <div className="px-8 sm:px-12 pb-10">
                      <div className="pt-8 border-t border-white/5">
                        <p className="text-slate-400 text-lg leading-relaxed font-medium">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Decorative Blur */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[160px] pointer-events-none"></div>
    </section>
  );
};

export default FAQ;