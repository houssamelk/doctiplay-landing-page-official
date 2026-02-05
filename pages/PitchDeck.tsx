import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './PitchDeck.css';

// Logo SVG Component
const DoctiplayLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 120 40" fill="none" className={className}>
    <path d="M5 20h15l3-10l5 20l4-15l3 5h10" stroke="#00f2ff" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M45 8h10c8 0 12 5 12 12s-4 12-12 12H45V8z" stroke="#00f2ff" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M51 15l6 5l-6 5v-10z" fill="#00f2ff" />
    <path d="M70 20h10l3-10l5 20l4-15l3 5h15" stroke="#00f2ff" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// Scroll Arrow Component
const ScrollArrow: React.FC<{ to: string; className?: string }> = ({ to, className }) => (
  <a href={to} className={`scroll-arrow reveal ${className || ''}`} aria-label="Slide suivante">
    <svg viewBox="0 0 24 24">
      <path d="M7 10l5 5 5-5" />
    </svg>
  </a>
);

// Live Monitor Component with ECG animation
const LiveMonitor: React.FC = () => {
  const ecgCanvasRef = useRef<HTMLCanvasElement>(null);
  const plethCanvasRef = useRef<HTMLCanvasElement>(null);
  const [vitals, setVitals] = useState({ fc: 90, spo2: 99, nibpSys: 100, nibpDia: 60 });
  const [toast, setToast] = useState<string | null>(null);
  const [time, setTime] = useState('14:58:22');
  const animationRef = useRef<number | undefined>(undefined);
  const posRef = useRef(0);

  // ECG waveform function
  const ecgWave = useCallback((x: number): number => {
    const phase = x % 800;
    let y = 0;
    if (phase > 180 && phase < 210) y -= 90 * Math.sin((phase - 180) / 30 * Math.PI);
    if (phase > 300 && phase < 450) y -= 12 * Math.sin((phase - 300) / 150 * Math.PI);
    if (phase > 50 && phase < 150) y -= 4 * Math.sin((phase - 50) / 100 * Math.PI);
    return y;
  }, []);

  // Pleth waveform function
  const plethWave = useCallback((x: number): number => {
    const phase = x % 800;
    let y = 0;
    if (phase < 300) y -= Math.sin(phase / 300 * Math.PI) * 45;
    else y -= Math.cos((phase - 300) / 500 * Math.PI / 2) * 45;
    return y;
  }, []);

  // Animation loop
  useEffect(() => {
    const ecgCanvas = ecgCanvasRef.current;
    const plethCanvas = plethCanvasRef.current;
    if (!ecgCanvas || !plethCanvas) return;

    const ecgCtx = ecgCanvas.getContext('2d');
    const plethCtx = plethCanvas.getContext('2d');
    if (!ecgCtx || !plethCtx) return;

    const resizeCanvases = () => {
      const ecgParent = ecgCanvas.parentElement;
      const plethParent = plethCanvas.parentElement;
      if (ecgParent && plethParent) {
        ecgCanvas.width = ecgParent.clientWidth;
        ecgCanvas.height = ecgParent.clientHeight;
        plethCanvas.width = plethParent.clientWidth;
        plethCanvas.height = plethParent.clientHeight;
      }
    };

    resizeCanvases();
    window.addEventListener('resize', resizeCanvases);

    const speed = 1.4;
    const animate = () => {
      const ecgH = ecgCanvas.height;
      const plethH = plethCanvas.height;
      const ecgMid = ecgH / 2 + 25;
      const plethMid = plethH / 2 + 15;
      const clearWidth = 14;
      const waveSpeed = 20;

      // Clear ahead
      if (posRef.current + clearWidth < ecgCanvas.width) {
        ecgCtx.clearRect(posRef.current, 0, clearWidth, ecgH);
        plethCtx.clearRect(posRef.current, 0, clearWidth, plethH);
      }

      // Draw ECG
      ecgCtx.beginPath();
      ecgCtx.strokeStyle = '#00ff00';
      ecgCtx.lineWidth = 1.5;
      const ecgPrev = ecgMid + ecgWave((posRef.current - speed) * waveSpeed);
      const ecgCurr = ecgMid + ecgWave(posRef.current * waveSpeed);
      ecgCtx.moveTo(posRef.current - speed, ecgPrev);
      ecgCtx.lineTo(posRef.current, ecgCurr);
      ecgCtx.stroke();

      // Draw Pleth
      plethCtx.beginPath();
      plethCtx.strokeStyle = '#00ffff';
      plethCtx.lineWidth = 1.5;
      const plethPrev = plethMid + plethWave((posRef.current - speed) * waveSpeed);
      const plethCurr = plethMid + plethWave(posRef.current * waveSpeed);
      plethCtx.moveTo(posRef.current - speed, plethPrev);
      plethCtx.lineTo(posRef.current, plethCurr);
      plethCtx.stroke();

      posRef.current += speed;
      if (posRef.current >= ecgCanvas.width) {
        posRef.current = 0;
        ecgCtx.clearRect(0, 0, speed + 10, ecgH);
        plethCtx.clearRect(0, 0, speed + 10, plethH);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvases);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [ecgWave, plethWave]);

  // Update time
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString('fr-FR'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAction = (action: string) => {
    const now = new Date().toLocaleTimeString('fr-FR');
    let message = '';

    if (action === 'o2') {
      setVitals(v => ({ ...v, spo2: 98 }));
      message = 'O₂ administré';
    } else if (action === 'remplissage') {
      setVitals(v => ({ ...v, nibpSys: 110, nibpDia: 70 }));
      message = 'Remplissage initié';
    } else if (action === 'insuline') {
      setVitals(v => ({ ...v, fc: 85 }));
      message = 'Insulinothérapie débutée';
    }

    setToast(`[${now}] ${message}`);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="live-monitor no-print">
      <div className="scope-header">
        <div className="live-badge-anim"><span>●</span> LIVE</div>
        <div className="scope-time">{time}</div>
      </div>

      <div className="scope-content">
        <div className="scope-graphs">
          <div className="graph-row">
            <span className="graph-label green-text">II 1mV</span>
            <canvas ref={ecgCanvasRef} className="ecg-canvas"></canvas>
          </div>
          <div className="graph-row">
            <span className="graph-label cyan-text">PLETH</span>
            <canvas ref={plethCanvasRef} className="pleth-canvas"></canvas>
          </div>
        </div>

        <div className="scope-values">
          <div className="val-box">
            <span className="val-label green-text">FC <small>bpm</small></span>
            <span className="val-num green-text val-fc">{vitals.fc}</span>
          </div>
          <div className="val-box">
            <span className="val-label cyan-text">SpO₂ <small>%</small></span>
            <span className="val-num cyan-text val-spo2">{vitals.spo2}</span>
          </div>
          <div className="val-box">
            <span className="val-label red-text">NIBP <small>mmHg</small></span>
            <span className="val-num red-text val-nibp">{vitals.nibpSys}/{vitals.nibpDia}</span>
            <span className="val-sub red-text">({Math.round((vitals.nibpSys + 2 * vitals.nibpDia) / 3)})</span>
          </div>
        </div>
      </div>

      <div className="scope-actions">
        <button onClick={() => handleAction('o2')}>O₂</button>
        <button onClick={() => handleAction('remplissage')}>Remplissage</button>
        <button onClick={() => handleAction('insuline')}>Insuline</button>
      </div>

      <div className={`scope-toast ${toast ? 'show' : ''}`}>{toast}</div>
    </div>
  );
};

// Main PitchDeck Component
const PitchDeck: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll progress tracking
  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    const handleScroll = () => {
      const scrollTop = main.scrollTop;
      const scrollHeight = main.scrollHeight - main.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    main.addEventListener('scroll', handleScroll);
    return () => main.removeEventListener('scroll', handleScroll);
  }, []);

  // Reveal animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    // Activate first slide immediately
    document.querySelectorAll('#slide-1 .reveal').forEach((el) => {
      el.classList.add('active');
    });

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const handlePdfExport = () => {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('active'));
    setTimeout(() => window.print(), 300);
  };

  return (
    <div className="pitch-page">
      {/* Top Bar */}
      <div className="topbar">
        <Link to="/" className="brand" title="Doctiplay">
          <div className="brand-logo">
            <DoctiplayLogo />
          </div>
          <span className="logo-text">DOCTI<span>PLAY</span></span>
        </Link>

        <nav className="nav" aria-label="Navigation">
          <a href="#slide-2">Défis</a>
          <a href="#slide-3">Objectifs</a>
          <a href="#slide-moteur">Technologie</a>
          <a href="#slide-5">Débrief</a>
          <a href="#slide-trace">Suivi</a>
          <a href="#slide-scenarios">Scénarios</a>
          <a href="#slide-implementation">Pilote</a>
        </nav>

        <div className="top-actions">
          <a href="https://Doctiplay.com" target="_blank" rel="noopener noreferrer" className="btn-top">
            Tester le simulateur
          </a>
          <button className="btn-top" title="Exporter en PDF" onClick={handlePdfExport}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14, marginRight: 6 }}>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <span>PDF</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar" aria-hidden="true">
        <div className="progress-fill" style={{ height: `${scrollProgress}%` }}></div>
      </div>

      {/* Main Content */}
      <div className="snap-container" id="main" ref={mainRef}>
        {/* SLIDE 1: COVER */}
        <section id="slide-1" className="slide pitch-slide slide-hero">
          <div className="safe">
            <div className="inner center" style={{ padding: 0, flex: 'none', transform: 'scale(1.15)', transformOrigin: 'center center' }}>
              <div className="centered-hero" style={{ marginTop: 0 }}>
                <div className="hero-logo-icon" style={{ transform: 'scale(0.85)', marginBottom: 2 }}>
                  <DoctiplayLogo />
                </div>
                <h1 className="hero-title" style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)' }}>DOCTI<span>PLAY</span></h1>
              </div>

              <p className="reveal" style={{ marginTop: 15, marginBottom: 25, fontSize: 'clamp(0.85rem, 1.8vw, 1.1rem)', maxWidth: 800, width: '100%', color: '#fff', fontWeight: 800, lineHeight: 1.2, fontFamily: "'Inter', sans-serif", textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', whiteSpace: 'nowrap' }}>
                Le patient parle. Vous agissez. Les constantes réagissent en temps réel.
              </p>

              <div className="hero-product-wrap" style={{ maxWidth: 630, margin: '0 auto', position: 'relative' }}>
                <div className="hero-visual" style={{ filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.3))' }}>
                  <div className="tablet-frame" style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', border: '4px solid #1a1a1a', boxShadow: '0 10px 30px rgba(0,242,255,0.1)' }}>
                    <div className="tablet-camera" style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', width: 6, height: 6, background: '#333', borderRadius: '50%', zIndex: 10 }}></div>
                    <img src="/ppt/doctiplay_screen_actual.png" alt="Interface Simulateur" style={{ display: 'block', width: '100%', height: 'auto', opacity: 1 }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ScrollArrow to="#slide-2" />
        </section>

        {/* SLIDE 2: THE CHALLENGE */}
        <section id="slide-2" className="slide pitch-slide">
          <div className="safe">
            <div className="slide-header">
              <h2 className="reveal ultra-title">Les défis de la simulation médicale</h2>
              <p className="subtitle reveal single-line">Former à l'urgence avec des contraintes fortes.</p>
            </div>

            <div className="slide-content">
              <div className="reveal freins-pill-wrap">
                <div className="freins-pill">
                  <span>4 freins récurrents :</span> exposition • répétition • charge • traçabilité des données
                </div>
              </div>

              <div className="card-grid reveal deck-cards">
                {/* Card 1: Terrain & pratique */}
                <div className="card col-6 square-card">
                  <h3>
                    <div className="card-icon-inline">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </div>
                    Terrain & pratique
                  </h3>
                  <div className="alert-rows">
                    <div className="alert-row">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                      <span>exposition <span className="cyan-text">inégale</span> en stage</span>
                    </div>
                    <div className="alert-row">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M23 4v6h-6"></path>
                        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                      </svg>
                      <span><span className="cyan-text">peu</span> de répétition</span>
                    </div>
                    <div className="alert-row">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                        <line x1="12" y1="9" x2="12" y2="13"></line>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                      </svg>
                      <span>décision sous <span className="cyan-text">stress</span> difficile</span>
                    </div>
                  </div>
                </div>

                {/* Card 2: Logistique & organisation */}
                <div className="card col-6 square-card">
                  <h3>
                    <div className="card-icon-inline">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                    </div>
                    Logistique & organisation
                  </h3>
                  <div className="alert-rows">
                    <div className="alert-row">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                      </svg>
                      <span><span className="cyan-text">charge</span> formateur</span>
                    </div>
                    <div className="alert-row">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                      </svg>
                      <span>capacité simu <span className="cyan-text">limitée</span></span>
                    </div>
                    <div className="alert-row">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span>préparation + débriefing <span className="cyan-text">lourds</span></span>
                    </div>
                  </div>
                </div>

                {/* Card 3: Évaluation & traçabilité */}
                <div className="card col-6 square-card">
                  <h3>
                    <div className="card-icon-inline">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </div>
                    Évaluation & traçabilité
                  </h3>
                  <div className="alert-rows">
                    <div className="alert-row">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="9" y1="3" x2="9" y2="21"></line>
                      </svg>
                      <span><span className="cyan-text">manque</span> de preuves</span>
                    </div>
                    <div className="alert-row">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                      </svg>
                      <span>feedback <span className="cyan-text">peu granulaire</span></span>
                    </div>
                    <div className="alert-row">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M17 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M9 21v-2a4 4 0 0 1 3-3.87"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      <span>évaluation <span className="cyan-text">individuelle</span> complexe</span>
                    </div>
                  </div>
                </div>

                {/* Card 4: Pédagogie & progression */}
                <div className="card col-6 square-card">
                  <h3>
                    <div className="card-icon-inline">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                      </svg>
                    </div>
                    Pédagogie & progression
                  </h3>
                  <div className="alert-rows">
                    <div className="alert-row">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                        <polyline points="17 6 23 6 23 12"></polyline>
                      </svg>
                      <span>niveaux <span className="cyan-text">hétérogènes</span></span>
                    </div>
                    <div className="alert-row">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <line x1="8" y1="6" x2="21" y2="6"></line>
                        <line x1="8" y1="12" x2="21" y2="12"></line>
                        <line x1="8" y1="18" x2="21" y2="18"></line>
                        <line x1="3" y1="6" x2="3.01" y2="6"></line>
                        <line x1="3" y1="12" x2="3.01" y2="12"></line>
                        <line x1="3" y1="18" x2="3.01" y2="18"></line>
                      </svg>
                      <span>manque de <span className="cyan-text">standardisation</span></span>
                    </div>
                    <div className="alert-row">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      </svg>
                      <span>expérience <span className="cyan-text">peu comparable</span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ScrollArrow to="#slide-3" />
        </section>

        {/* SLIDE 3: OBJECTIFS PÉDAGOGIQUES */}
        <section id="slide-3" className="slide pitch-slide">
          <div className="safe">
            <div className="slide-header">
              <h2 className="reveal ultra-title">Objectifs pédagogiques</h2>
              <p className="subtitle reveal single-line">Un entraînement standardisé pour sécuriser les pratiques.</p>
            </div>

            <div className="slide-content">
              <div className="reveal freins-pill-wrap">
                <div className="freins-pill">
                  <span>COMPÉTENCES VISÉES</span> Raisonnement clinique, sécurité, coordination, gestes..
                </div>
              </div>

              <div className="card-grid reveal deck-cards">
                {/* Card 1: Raisonnement & priorisation */}
                <div className="card col-6 square-card">
                  <h3>
                    <div className="card-icon-inline">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                      </svg>
                    </div>
                    Raisonnement & priorisation
                  </h3>
                  <div className="alert-rows">
                    <div className="alert-row">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                      <span>Identifier <span className="cyan-text">risques</span> / signaux d'alerte</span>
                    </div>
                    <div className="alert-row">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                      </svg>
                      <span>Hiérarchiser <span className="cyan-text">ABCDE</span></span>
                    </div>
                    <div className="alert-row">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span>Décision <span className="cyan-text">rapide</span></span>
                    </div>
                  </div>
                </div>

                {/* Card 2: Sécurité & surveillance */}
                <div className="card col-6 square-card">
                  <h3>
                    <div className="card-icon-inline">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      </svg>
                    </div>
                    Sécurité & surveillance
                  </h3>
                  <div className="alert-rows">
                    <div className="alert-row">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                      </svg>
                      <span>Surveillance + <span className="cyan-text">réévaluation</span></span>
                    </div>
                    <div className="alert-row">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                      <span>Sécurisation <span className="cyan-text">environnement</span></span>
                    </div>
                    <div className="alert-row">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                      <span>Alerte <span className="cyan-text">précoce</span></span>
                    </div>
                  </div>
                </div>

                {/* Card 3: Communication & coordination */}
                <div className="card col-6 square-card">
                  <h3>
                    <div className="card-icon-inline">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
                    Communication & coordination
                  </h3>
                  <div className="alert-rows">
                    <div className="alert-row">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M12 2v6m0 0a2 2 0 0 1-2 2H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-4a2 2 0 0 1-2-2m0 0V2"></path>
                      </svg>
                      <span>SBAR / Transmissions <span className="cyan-text">ciblées</span></span>
                    </div>
                    <div className="alert-row">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                        <polyline points="17 6 23 6 23 12"></polyline>
                      </svg>
                      <span>Répartition des <span className="cyan-text">rôles</span></span>
                    </div>
                    <div className="alert-row">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M9 11l3 3L22 4"></path>
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                      </svg>
                      <span>Boucle de <span className="cyan-text">communication</span> fermée</span>
                    </div>
                  </div>
                </div>

                {/* Card 4: Réflexes & procédures */}
                <div className="card col-6 square-card">
                  <h3>
                    <div className="card-icon-inline">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg>
                    </div>
                    Réflexes & procédures
                  </h3>
                  <div className="alert-rows">
                    <div className="alert-row">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                      <span>Protocoles + <span className="cyan-text">listes de contrôle</span></span>
                    </div>
                    <div className="alert-row">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                        <line x1="12" y1="9" x2="12" y2="13"></line>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                      </svg>
                      <span>Administration <span className="cyan-text">thérapeutique</span></span>
                    </div>
                    <div className="alert-row">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                        <polyline points="17 6 23 6 23 12"></polyline>
                      </svg>
                      <span>Gestes <span className="cyan-text">standardisés</span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ScrollArrow to="#slide-moteur" />
        </section>

        {/* SLIDE: LE MOTEUR DOCTIPLAY */}
        <section id="slide-moteur" className="slide pitch-slide">
          <div className="safe">
            <div className="slide-header">
              <h2 className="reveal ultra-title">Le moteur : simulation clinique en temps réel</h2>
              <p className="subtitle reveal single-line single-line-wide">
                Chaque action met à jour les constantes, alimente un log horodaté, et prépare le débrief.
              </p>
            </div>
            <div className="slide-content" style={{ overflow: 'visible' }}>
              {/* Action Banner */}
              <div className="reveal" style={{ textAlign: 'center', marginBottom: 25 }}>
                <span style={{ fontFamily: "'IBM Plex Mono'", fontSize: '0.65rem', color: 'var(--primary-cyan)', border: '1px solid rgba(0,242,255,0.25)', borderRadius: 20, padding: '6px 18px', textTransform: 'uppercase', letterSpacing: 1, background: 'rgba(0,242,255,0.05)' }}>
                  Une action → une réaction → une trace → un débrief
                </span>
              </div>

              {/* Main Engine Visualization */}
              <div className="reveal current-view-container" style={{ width: '100%', maxWidth: 960, margin: '0 auto', position: 'relative', padding: '0 100px', transform: 'scale(0.8)', transformOrigin: 'top center' }}>
                {/* Callouts */}
                <div className="engine-callout" style={{ top: -60, left: -120 }}>
                  <span className="label">CONSTANTES (TEMPS RÉEL)</span>
                  <span className="text">ECG, SpO₂, PNI… réagissent aux actions.</span>
                </div>

                <div className="engine-callout" style={{ top: 80, left: -120 }}>
                  <span className="label">PARLER AVEC LE PATIENT</span>
                  <span className="text">Entretien voix/texte + évaluation ABCDE.</span>
                </div>

                <div className="engine-callout" style={{ top: 250, left: -120 }}>
                  <span className="label">ORDRE</span>
                  <span className="text">Prescrire / administrer / surveiller.</span>
                </div>

                <div className="engine-callout" style={{ top: 400, left: -120 }}>
                  <span className="label">JOURNAL</span>
                  <span className="text">Log horodaté des actions & événements.</span>
                </div>

                <div className="engine-callout" style={{ top: 120, right: -120 }}>
                  <span className="label">RÉSULTATS</span>
                  <span className="text">Biologie / examens complémentaires évolutifs selon le cas.</span>
                </div>

                {/* Tablet with Live Monitor */}
                <div className="tablet-frame" style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', border: '4px solid #1a1a1a', boxShadow: '0 10px 40px rgba(0,242,255,0.15)' }}>
                  <div className="tablet-camera" style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', width: 6, height: 6, background: '#333', borderRadius: '50%', zIndex: 10 }}></div>
                  <img src="/ppt/doctiplay_screen_actual.png" alt="Interface Simulateur" style={{ display: 'block', width: '100%', height: 'auto', opacity: 1 }} />
                  <LiveMonitor />
                </div>
              </div>
            </div>
          </div>
          <ScrollArrow to="#slide-5" />
        </section>

        {/* SLIDE 5: DÉBRIEF */}
        <section id="slide-5" className="slide pitch-slide">
          <div className="safe">
            <div className="slide-header">
              <h2 className="reveal ultra-title" style={{ whiteSpace: 'nowrap' }}>
                Débrief assisté : rapport pédagogique prêt à exploiter
              </h2>
              <p className="subtitle reveal single-line">
                Trace complète → scoring → erreurs critiques → PDF prêt à partager.
              </p>
            </div>

            <div className="slide-content reveal" style={{ display: 'grid', gridTemplateColumns: '220px 1fr 220px', gap: 50, width: '100%', alignItems: 'center' }}>
              {/* Timeline */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 32, position: 'relative', padding: 0, width: '100%', alignItems: 'flex-start' }}>
                  <div style={{ position: 'absolute', left: 20, top: 0, bottom: 0, width: 1, background: 'rgba(255,255,255,0.25)', transform: 'translateX(-50%)' }}></div>
                  <div style={{ opacity: 0.4, display: 'flex', gap: 16, alignItems: 'center', paddingLeft: 16 }}>
                    <div style={{ width: 8, height: 8, background: '#556', borderRadius: '50%', border: '1px solid #000' }}></div>
                    <div className="mono-label" style={{ fontSize: '0.65rem', letterSpacing: 1 }}>Brief</div>
                  </div>
                  <div style={{ opacity: 0.4, display: 'flex', gap: 16, alignItems: 'center', paddingLeft: 16 }}>
                    <div style={{ width: 8, height: 8, background: '#556', borderRadius: '50%', border: '1px solid #000' }}></div>
                    <div className="mono-label" style={{ fontSize: '0.65rem', letterSpacing: 1 }}>Simulation</div>
                  </div>
                  <div style={{ display: 'flex', gap: 16, alignItems: 'center', paddingLeft: 14.5 }}>
                    <div style={{ width: 11, height: 11, background: 'var(--primary-cyan)', borderRadius: '50%', boxShadow: '0 0 15px var(--primary-cyan)', zIndex: 1 }}></div>
                    <div className="mono-label" style={{ fontSize: '0.85rem', color: 'var(--primary-cyan)', fontWeight: 800, textShadow: '0 0 12px rgba(0,242,255,0.5)', letterSpacing: 1.5 }}>Débrief</div>
                  </div>
                  <div style={{ opacity: 0.4, display: 'flex', gap: 16, alignItems: 'center', paddingLeft: 16 }}>
                    <div style={{ width: 8, height: 8, background: '#556', borderRadius: '50%', border: '1px solid #000' }}></div>
                    <div className="mono-label" style={{ fontSize: '0.65rem', letterSpacing: 1 }}>Suivi</div>
                  </div>
                </div>
              </div>

              {/* Report Preview */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="report-doc">
                  <div style={{ height: 6, background: 'var(--primary-cyan)', opacity: 0.2 }}></div>
                  <div className="rep-body">
                    <div>
                      <div className="mono-label" style={{ color: 'var(--primary-cyan)', fontSize: '0.55rem' }}>DIAGNOSTIC FINAL</div>
                      <h3 style={{ margin: '2px 0', fontSize: '1.2rem', color: '#fff' }}>Acidocétose diabétique</h3>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 10 }}>
                      <div style={{ padding: 8, border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: 6 }}>
                        <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff' }}>70<span style={{ fontSize: '0.6rem', opacity: 0.5 }}>/100</span></div>
                      </div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <div style={{ flex: 1, background: 'rgba(255,255,255,0.02)', borderRadius: 6, padding: 6, border: '1px solid rgba(255,255,255,0.05)' }}>
                          <div className="mono-label" style={{ color: '#bf95f9', fontSize: '0.45rem' }}>INITIAL</div>
                          <div style={{ fontSize: '0.55rem', opacity: 0.7, fontStyle: 'italic' }}>"Onde T pointue, agité."</div>
                        </div>
                        <div style={{ flex: 1, background: 'rgba(255,255,255,0.02)', borderRadius: 6, padding: 6, border: '1px solid rgba(255,255,255,0.05)' }}>
                          <div className="mono-label" style={{ color: '#bf95f9', fontSize: '0.45rem' }}>FINAL</div>
                          <div style={{ fontSize: '0.55rem', opacity: 0.7, fontStyle: 'italic' }}>"Stabilisation validée."</div>
                        </div>
                      </div>
                    </div>

                    <div className="report-section" style={{ borderLeft: '3px solid #5a7dff', fontSize: '0.65rem', color: '#aab', padding: 10 }}>
                      <div className="mono-label" style={{ color: '#5a7dff', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span>📄</span> OBSERVATION CLINIQUE
                      </div>
                      Réactivité conforme aux protocoles. Séquence logique validée.
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, padding: 8 }}>
                        <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: '0.45rem', color: '#5a9fff', fontWeight: 'bold', marginBottom: 4 }}>RAISONNEMENT</div>
                        <div style={{ fontSize: '0.65rem', color: '#ccc', lineHeight: 1.2, marginBottom: 6 }}>Investigations rapides et pertinentes.</div>
                        <div style={{ fontSize: '0.6rem', color: '#4caf50', fontWeight: 'bold', marginBottom: 2 }}>✓ FORTS : Scope, Gazométrie</div>
                        <div style={{ fontSize: '0.6rem', color: '#ff5252', fontWeight: 'bold' }}>⊗ MANQUÉ : Anamnèse</div>
                      </div>
                      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, padding: 8 }}>
                        <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: '0.45rem', color: '#50e3c2', fontWeight: 'bold', marginBottom: 4 }}>PRISE EN CHARGE</div>
                        <div style={{ fontSize: '0.65rem', color: '#ccc', lineHeight: 1.2, marginBottom: 6 }}>Décisions thérapeutiques conformes.</div>
                        <div style={{ fontSize: '0.6rem', color: '#4caf50', fontWeight: 'bold', marginBottom: 2 }}>✓ FORTS : VVP, NaCl, Insuline</div>
                        <div style={{ fontSize: '0.6rem', color: '#ff5252', fontWeight: 'bold' }}>⊗ MANQUÉ : Surv. ECG</div>
                      </div>
                      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, padding: 8 }}>
                        <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: '0.45rem', color: '#ff6b6b', fontWeight: 'bold', marginBottom: 4 }}>SÉCURITÉ</div>
                        <div style={{ fontSize: '0.65rem', color: '#ccc', lineHeight: 1.2, marginBottom: 6 }}>Interventions sûres, aucune erreur.</div>
                        <div style={{ fontSize: '0.6rem', color: '#4caf50', fontWeight: 'bold', marginBottom: 2 }}>✓ FORTS : Bonnes pratiques</div>
                        <div style={{ fontSize: '0.6rem', color: '#ff5252', fontWeight: 'bold' }}>⊗ MANQUÉ : Complications</div>
                      </div>
                    </div>

                    <div style={{ marginTop: 4, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                      <div className="mono-label" style={{ fontSize: '0.8rem', color: '#889' }}>JOURNAL DE BORD</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginTop: 8 }}>
                        {[
                          { time: '14:58', text: 'Patient conscient, tachycarde. Pose VVP.' },
                          { time: '15:02', text: 'Bilan sanguin complet + Gaz du sang.' },
                          { time: '15:30', text: 'Contrôle Glycémie/K+ post-insulinothérapie.' },
                          { time: '15:50', text: 'Stabilisation et transfert unité de soins.' }
                        ].map((entry, i) => (
                          <div key={i} className="journal-entry">
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                              <div className="mono-label" style={{ color: 'var(--primary-cyan)' }}>{entry.time}</div>
                              <div style={{ color: '#ccc' }}>{entry.text}</div>
                            </div>
                            <div style={{ fontSize: '0.5rem', color: '#4ade80', background: 'rgba(74, 222, 128, 0.1)', padding: '2px 6px', borderRadius: 4, fontWeight: 'bold', textTransform: 'uppercase' }}>Optimal</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16, width: '100%', alignItems: 'flex-end' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', maxWidth: 240 }}>
                  <div className="summary-card" style={{ borderTop: '1px solid rgba(0,242,255,0.2)', background: 'rgba(0,242,255,0.03)' }}>
                    <div className="mono-label" style={{ color: 'var(--primary-cyan)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                      🏆 Score & compétences
                    </div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: '#eee', lineHeight: 1.5, fontWeight: 400 }}>
                      Score global + compétences ciblées (référentiel).
                    </div>
                  </div>

                  <div className="summary-card" style={{ borderTop: '1px solid rgba(255,68,68,0.2)', background: 'rgba(255,68,68,0.03)' }}>
                    <div className="mono-label" style={{ color: '#ff4444', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                      ⚠️ Erreurs critiques
                    </div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: '#eee', lineHeight: 1.5, fontWeight: 400 }}>
                      Points bloquants + impact (sécurité/diagnostic).
                    </div>
                  </div>

                  <div className="summary-card" style={{ borderTop: '1px solid rgba(90,125,255,0.2)', background: 'rgba(90,125,255,0.03)' }}>
                    <div className="mono-label" style={{ color: '#5a7dff', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                      ⏱️ Journal horodaté
                    </div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: '#eee', lineHeight: 1.5, fontWeight: 400 }}>
                      Chronologie des actions → base du débrief.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ScrollArrow to="#slide-trace" />
        </section>

        {/* SLIDE: SUIVI & TRAÇABILITÉ */}
        <section id="slide-trace" className="slide pitch-slide">
          <div className="safe">
            <div className="slide-header">
              <h2 className="reveal ultra-title">Suivi & traçabilité</h2>
              <p className="subtitle reveal single-line">Pilotage de promo • Exports PDF individuels</p>
            </div>

            <div className="slide-content reveal" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, padding: '20px 0' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 50, alignItems: 'stretch', height: '100%' }}>
                {/* Timeline */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 32, position: 'relative', padding: 0, width: '100%', alignItems: 'flex-start' }}>
                    <div style={{ position: 'absolute', left: 20, top: 0, bottom: 0, width: 1, background: 'rgba(255,255,255,0.25)', transform: 'translateX(-50%)' }}></div>
                    {['BRIEF', 'SIMULATION', 'DÉBRIEF'].map((step, i) => (
                      <div key={i} style={{ opacity: 0.4, display: 'flex', gap: 16, alignItems: 'center', paddingLeft: 16 }}>
                        <div style={{ width: 8, height: 8, background: '#556', borderRadius: '50%', border: '1px solid #000' }}></div>
                        <div className="mono-label" style={{ fontSize: '0.65rem', letterSpacing: 1 }}>{step}</div>
                      </div>
                    ))}
                    <div style={{ display: 'flex', gap: 16, alignItems: 'center', paddingLeft: 14.5 }}>
                      <div style={{ width: 11, height: 11, background: 'var(--primary-cyan)', borderRadius: '50%', boxShadow: '0 0 15px var(--primary-cyan)', zIndex: 1 }}></div>
                      <div className="mono-label" style={{ fontSize: '0.85rem', color: 'var(--primary-cyan)', fontWeight: 800, textShadow: '0 0 12px rgba(0,242,255,0.5)', letterSpacing: 1.5 }}>SUIVI</div>
                    </div>
                  </div>
                </div>

                {/* Dashboard */}
                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 12, padding: 25, display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 5 }}>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', marginBottom: 5, color: '#fff', fontWeight: 700 }}>Suivi de Cohorte • Promotion 2026</h3>
                      <p className="subtitle" style={{ margin: 0, fontFamily: "'IBM Plex Mono'", fontSize: '0.75rem', opacity: 0.7 }}>Groupe A • 42 étudiants actifs</p>
                    </div>
                    <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.05)', padding: '8px 15px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.05)' }}>
                      Filtre: Tous les scénarios ▾
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr', gap: 25 }}>
                    {/* Student Table */}
                    <div>
                      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1.2fr', gap: 15, padding: '0 10px 10px 10px', fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <div>Étudiant</div>
                        <div style={{ textAlign: 'center' }}>DKA</div>
                        <div style={{ textAlign: 'center' }}>PolyT</div>
                        <div style={{ textAlign: 'center' }}>Score Global</div>
                        <div style={{ textAlign: 'right' }}>Dernier Accès</div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 10 }}>
                        {[
                          { initials: 'AM', name: 'Alice M.', dka: '9.0', poly: '8.5', score: '8.8', access: 'Il y a 2h', color: 'linear-gradient(135deg, var(--primary-cyan), #0066cc)' },
                          { initials: 'TB', name: 'Thomas B.', dka: '6.0', poly: '7.0', score: '6.5', access: 'Hier', color: 'rgba(255,255,255,0.1)', scoreColor: '#facc15' },
                          { initials: 'SL', name: 'Sarah L.', dka: '9.5', poly: '9.0', score: '9.3', access: 'Il y a 3j', color: 'linear-gradient(135deg, #bf95f9, #9b6dff)' }
                        ].map((student, i) => (
                          <div key={i} className="dashboard-row" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1.2fr', gap: 15, alignItems: 'center', padding: 10, background: 'rgba(255,255,255,0.03)', borderRadius: 8, fontSize: '0.75rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                              <div style={{ width: 22, height: 22, background: student.color, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.55rem', color: student.color.includes('gradient') ? '#000' : '#fff', fontWeight: 800 }}>{student.initials}</div>
                              <span style={{ color: '#fff', fontWeight: 600 }}>{student.name}</span>
                            </div>
                            <div style={{ textAlign: 'center', color: student.scoreColor || '#4ade80', fontFamily: "'IBM Plex Mono'", fontWeight: 700 }}>{student.dka}</div>
                            <div style={{ textAlign: 'center', color: student.scoreColor || '#4ade80', fontFamily: "'IBM Plex Mono'", fontWeight: 700 }}>{student.poly}</div>
                            <div style={{ textAlign: 'center', color: '#fff', fontFamily: "'IBM Plex Mono'", fontWeight: 800 }}>{student.score}</div>
                            <div style={{ textAlign: 'right', color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem' }}>{student.access}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Insights */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <div style={{ background: 'rgba(255,188,46,0.015)', border: '1px solid rgba(255,188,46,0.08)', borderRadius: 8, padding: 12 }}>
                        <div style={{ fontSize: '0.55rem', color: '#ffbc2e', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.1em', marginBottom: 8 }}>⚡ Priorité pédagogique</div>
                        <div style={{ fontSize: '0.7rem', color: '#ccc', lineHeight: 1.4 }}>3 étudiants sous le seuil sur "Gestion de l'hypoglycémie"</div>
                      </div>
                      <div style={{ background: 'rgba(0,242,255,0.015)', border: '1px solid rgba(0,242,255,0.08)', borderRadius: 8, padding: 12 }}>
                        <div style={{ fontSize: '0.55rem', color: 'var(--primary-cyan)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.1em', marginBottom: 8 }}>📊 Tendance</div>
                        <div style={{ fontSize: '0.7rem', color: '#ccc', lineHeight: 1.4 }}>Score moyen en hausse de +12% ce mois</div>
                      </div>
                      <div style={{ background: 'rgba(74,222,128,0.015)', border: '1px solid rgba(74,222,128,0.08)', borderRadius: 8, padding: 12 }}>
                        <div style={{ fontSize: '0.55rem', color: '#4ade80', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.1em', marginBottom: 8 }}>✓ Complétion</div>
                        <div style={{ fontSize: '0.7rem', color: '#ccc', lineHeight: 1.4 }}>89% des étudiants ont terminé le parcours obligatoire</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ScrollArrow to="#slide-scenarios" />
        </section>

        {/* SLIDE: SCÉNARIOS */}
        <section id="slide-scenarios" className="slide pitch-slide">
          <div className="safe">
            <div className="slide-header">
              <h2 className="reveal ultra-title">Scénarios & Cas Cliniques</h2>
              <p className="subtitle reveal single-line">Bibliothèque évolutive alignée sur les référentiels</p>
            </div>

            <div className="slide-content reveal">
              <div className="freins-pill-wrap" style={{ marginBottom: 20 }}>
                <div className="freins-pill">
                  <span>DISPONIBLES</span> Urgences • Médecine interne • Pédiatrie • Gériatrie
                </div>
              </div>

              <div className="card-grid deck-cards" style={{ maxWidth: 900 }}>
                <div className="card col-4" style={{ padding: 20 }}>
                  <div className="tag-capsule">URGENCES</div>
                  <h3 style={{ fontSize: '1rem', marginBottom: 12 }}>Acidocétose diabétique</h3>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                    Patient jeune, déshydraté, glycémie élevée. Gestion ABCDE, remplissage, insulinothérapie.
                  </p>
                  <div style={{ marginTop: 'auto', paddingTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.6rem', padding: '4px 8px', background: 'rgba(0,242,255,0.1)', borderRadius: 4, color: 'var(--primary-cyan)' }}>DFGSM3</span>
                    <span style={{ fontSize: '0.6rem', padding: '4px 8px', background: 'rgba(255,255,255,0.05)', borderRadius: 4, color: '#aaa' }}>30 min</span>
                  </div>
                </div>

                <div className="card col-4" style={{ padding: 20 }}>
                  <div className="tag-capsule">CARDIOLOGIE</div>
                  <h3 style={{ fontSize: '1rem', marginBottom: 12 }}>Syndrome coronarien aigu</h3>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                    Douleur thoracique typique, modifications ECG. Prise en charge initiale et orientation.
                  </p>
                  <div style={{ marginTop: 'auto', paddingTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.6rem', padding: '4px 8px', background: 'rgba(0,242,255,0.1)', borderRadius: 4, color: 'var(--primary-cyan)' }}>DFASM1</span>
                    <span style={{ fontSize: '0.6rem', padding: '4px 8px', background: 'rgba(255,255,255,0.05)', borderRadius: 4, color: '#aaa' }}>45 min</span>
                  </div>
                </div>

                <div className="card col-4" style={{ padding: 20 }}>
                  <div className="tag-capsule">PÉDIATRIE</div>
                  <h3 style={{ fontSize: '1rem', marginBottom: 12 }}>Bronchiolite du nourrisson</h3>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                    Détresse respiratoire, évaluation de la gravité, critères d'hospitalisation.
                  </p>
                  <div style={{ marginTop: 'auto', paddingTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.6rem', padding: '4px 8px', background: 'rgba(0,242,255,0.1)', borderRadius: 4, color: 'var(--primary-cyan)' }}>DFGSM3</span>
                    <span style={{ fontSize: '0.6rem', padding: '4px 8px', background: 'rgba(255,255,255,0.05)', borderRadius: 4, color: '#aaa' }}>25 min</span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 30, textAlign: 'center' }}>
                <span style={{ fontFamily: "'IBM Plex Mono'", fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)' }}>
                  + 15 scénarios supplémentaires en développement
                </span>
              </div>
            </div>
          </div>
          <ScrollArrow to="#slide-implementation" />
        </section>

        {/* SLIDE: IMPLÉMENTATION */}
        <section id="slide-implementation" className="slide pitch-slide">
          <div className="safe">
            <div className="slide-header">
              <h2 className="reveal ultra-title">Pilote & Déploiement</h2>
              <p className="subtitle reveal single-line">Une approche progressive et mesurée</p>
            </div>

            <div className="slide-content reveal">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, maxWidth: 900, width: '100%' }}>
                <div className="card" style={{ padding: 24, textAlign: 'center' }}>
                  <div style={{ width: 48, height: 48, background: 'rgba(0,242,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', border: '1px solid rgba(0,242,255,0.2)' }}>
                    <span style={{ fontSize: '1.5rem' }}>1</span>
                  </div>
                  <h3 style={{ fontSize: '1rem', marginBottom: 8, color: '#fff' }}>Phase Pilote</h3>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                    Test avec 2-3 promotions sur 3 mois. Collecte de feedback et ajustements.
                  </p>
                </div>

                <div className="card" style={{ padding: 24, textAlign: 'center' }}>
                  <div style={{ width: 48, height: 48, background: 'rgba(0,242,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', border: '1px solid rgba(0,242,255,0.2)' }}>
                    <span style={{ fontSize: '1.5rem' }}>2</span>
                  </div>
                  <h3 style={{ fontSize: '1rem', marginBottom: 8, color: '#fff' }}>Validation</h3>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                    Mesure d'impact pédagogique. Validation avec les équipes enseignantes.
                  </p>
                </div>

                <div className="card" style={{ padding: 24, textAlign: 'center' }}>
                  <div style={{ width: 48, height: 48, background: 'rgba(0,242,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', border: '1px solid rgba(0,242,255,0.2)' }}>
                    <span style={{ fontSize: '1.5rem' }}>3</span>
                  </div>
                  <h3 style={{ fontSize: '1rem', marginBottom: 8, color: '#fff' }}>Déploiement</h3>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                    Extension progressive à l'ensemble des promotions et spécialités.
                  </p>
                </div>
              </div>

              <div style={{ marginTop: 40, textAlign: 'center' }}>
                <a href="https://doctiplay.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Demander une démo
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PitchDeck;
