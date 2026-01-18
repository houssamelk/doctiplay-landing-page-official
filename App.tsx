import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Gamification from './components/Gamification';
import Testimonials from './components/Testimonials';
import Partnership from './components/Partnership';
import PartnershipDrawer from './components/PartnershipDrawer';
import ContactDrawer from './components/ContactDrawer';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import { LanguageProvider } from './contexts/LanguageContext';

const AppContent: React.FC = () => {
  const [isPartnershipOpen, setIsPartnershipOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -20px 0px'
    });

    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden selection:bg-primary selection:text-white bg-slate-50 tech-grid">
      <PartnershipDrawer
        isOpen={isPartnershipOpen}
        onClose={() => setIsPartnershipOpen(false)}
      />
      <ContactDrawer
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
      <Navbar />
      <main className="flex-grow relative z-10">
        <Hero />
        <Features />
        <Gamification />
        <Testimonials />
        <Partnership onOpenDrawer={() => setIsPartnershipOpen(true)} />
        <FAQ />
      </main>
      <Footer
        onOpenPartnership={() => setIsPartnershipOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;