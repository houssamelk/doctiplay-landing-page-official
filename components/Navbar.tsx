import React, { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from '../utils/translations';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const langs: Language[] = ['fr', 'en', 'ar'];
    const currentIndex = langs.indexOf(language);
    const nextIndex = (currentIndex + 1) % langs.length;
    setLanguage(langs[nextIndex]);
  };

  const navLinks = [
    { label: t.navbar.sim, href: "#simulation" },
    { label: t.navbar.expertise, href: "#expertise" },
    { label: t.navbar.faq, href: "#faq" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed w-full z-[100] top-0 left-0 pt-4 px-4 transition-all duration-300 pointer-events-none">
      {/* Container: Floating capsule style */}
      <div className={`mx-auto pointer-events-auto transition-all duration-500 ease-out ${scrolled ? 'max-w-4xl' : 'max-w-6xl'}`}>
        <div className={`relative flex items-center justify-between rounded-full border transition-all duration-500 shadow-2xl overflow-hidden ${scrolled
          ? 'bg-slate-950/90 backdrop-blur-3xl border-white/10 py-2 px-4 sm:px-6 shadow-cyan-500/10'
          : 'bg-slate-950/70 backdrop-blur-2xl border-white/5 py-3 px-5 sm:px-8'
          }`}>

          {/* Logo Area */}
          <a href="#simulation" onClick={(e) => handleNavClick(e, '#simulation')} className="flex items-center gap-3 shrink-0 mr-2 sm:mr-4 group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 transform group-hover:scale-110 transition-transform">
              <Logo className="w-full h-full" showPulse={true} />
            </div>
            <span className="block font-display font-black text-white tracking-tighter text-sm sm:text-lg">
              DOCTI<span className="text-primary">PLAY</span>
            </span>
          </a>

          {/* Center Links - Responsive */}
          <div className="flex flex-1 items-center justify-center gap-3 sm:gap-6 md:gap-8 px-2 sm:px-4 overflow-x-auto">
            {navLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-[9px] sm:text-[10px] md:text-xs font-display font-bold text-slate-300 hover:text-white uppercase tracking-[0.1em] sm:tracking-[0.15em] relative group py-2 transition-colors whitespace-nowrap"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="shrink-0 ml-2 sm:ml-4 flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/50 transition-all group"
          >
            <Globe className="w-3.5 h-3.5 text-primary group-hover:rotate-12 transition-transform" />
            <span className="font-display font-black text-[10px] text-white tracking-widest">{language.toUpperCase()}</span>
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;