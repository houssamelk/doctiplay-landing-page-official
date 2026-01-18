
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Mail, Handshake } from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
  onOpenPartnership: () => void;
  onOpenContact: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenPartnership, onOpenContact }) => {
  const { t } = useLanguage();

  return (
    <footer className="relative bg-darkest pt-32 pb-20 overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 mb-24">

          {/* Brand & Tagline */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 max-w-md">
            <a href="#" className="flex items-center space-x-2 rtl:space-x-reverse group">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <Logo className="w-full h-full" showPulse={false} />
              </div>
              <span className="text-3xl font-display font-black text-white tracking-tighter">
                DOCTI<span className="text-primary">PLAY</span>
              </span>
            </a>
            <p className="text-slate-400 text-lg font-medium leading-relaxed">
              {t.footer.tagline}
            </p>
          </div>

          {/* Action Buttons Area */}
          <div className="flex flex-col sm:flex-row gap-6 w-full lg:w-auto">
            <button
              onClick={onOpenContact}
              className="flex items-center justify-center gap-4 px-10 py-5 rounded-2xl glass border-white/5 text-white hover:bg-white hover:text-slate-950 transition-all group min-w-[240px]"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                <div className="relative">
                  <Mail className="w-5 h-5" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-ping"></div>
                </div>
              </div>
              <div className="text-left">
                <div className="text-[10px] font-display font-black uppercase tracking-widest opacity-50">{t.footer.contact_label}</div>
                <div className="font-display font-bold text-sm tracking-tight">{t.footer.contact_action}</div>
              </div>
            </button>

            <button
              onClick={onOpenPartnership}
              className="flex items-center justify-center gap-4 px-10 py-5 rounded-2xl glass border-white/5 text-white hover:bg-primary hover:text-slate-950 transition-all group min-w-[240px]"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-white/20 transition-colors">
                <Handshake className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-[10px] font-display font-black uppercase tracking-widest opacity-50">{t.footer.partnership_label}</div>
                <div className="font-display font-bold text-sm tracking-tight">{t.footer.partnership_action}</div>
              </div>
            </button>
          </div>
        </div>

        {/* Minimal Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-center">
          <div className="text-[10px] font-mono font-bold text-slate-600 uppercase tracking-[0.3em] text-center">
            {t.footer.copyright}
          </div>
        </div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[200px] bg-primary/5 blur-[120px] pointer-events-none rounded-full"></div>
    </footer>
  );
};

export default Footer;
