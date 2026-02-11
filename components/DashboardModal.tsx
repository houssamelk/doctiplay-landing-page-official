import React, { useState, useEffect } from 'react';
import { X, Activity, Target, HeartPulse, Truck, Stethoscope, CheckCircle2, Zap, BarChart3, Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Monitor from './Monitor';

interface DashboardModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const DashboardModal: React.FC<DashboardModalProps> = ({ isOpen, onClose }) => {
    const { t, language } = useLanguage();
    const [logs, setLogs] = useState<string[]>([]);
    const [selectedMode, setSelectedMode] = useState<'geste' | 'ambulance' | 'dechocage'>('ambulance');
    const [selectedCat, setSelectedCat] = useState<'medical' | 'surgical' | 'pediatric'>('medical');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            // Initialize logs
            setLogs([`>> [SYSTEM] ${language === 'ar' ? 'جار الاتصال بـ NEURAL LINK...' : 'ESTABLISHING NEURAL LINK...'}`]);

            const timer = setTimeout(() => {
                setLogs(prev => [...prev, ">> [LINK] NEURAL CONNECTION STABLE (L4)", ">> [DATA] PATIENT VITALS STREAMING..."]);
            }, 1000);

            return () => clearTimeout(timer);
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen, language]);

    const startSimulation = async () => {
        if (isLoading) return;
        setIsLoading(true);
        setLogs(prev => [...prev, `>> [ALERT] MODE: ${selectedMode.toUpperCase()} | CAT: ${selectedCat.toUpperCase()}`]);

        // Simulate loading scenario
        await new Promise(resolve => setTimeout(resolve, 800));
        setLogs(prev => [...prev, ">> [SCENARIO] Patient: Male, 45y. Sudden onset of chest pain.", ">> [VITAL] HR: 115 bpm | SpO2: 92% | BP: 145/90"]);

        await new Promise(resolve => setTimeout(resolve, 800));
        setIsLoading(false);
        // In a real app, this would navigate to the game interface
        window.location.href = 'https://app.doctiplay.com'; // Redirect to official app
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
        t.hero_extended.debrief.items[0],
        t.hero_extended.debrief.items[1],
        t.hero_extended.debrief.items[2],
        t.hero_extended.debrief.items[3]
    ];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 fade-in">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" onClick={onClose}></div>

            {/* Modal Content - The Dashboard */}
            <div className="relative z-10 w-full max-w-7xl flex flex-col lg:grid lg:grid-cols-12 gap-4 sm:gap-8 items-start animate-scale-in max-h-[90vh] overflow-y-auto lg:overflow-visible">

                {/* Close Button - Moved inside for mobile safety, absolute for desktop */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 lg:-top-12 lg:right-0 p-2 text-slate-400 hover:text-white transition-colors z-50 bg-slate-950/50 rounded-full lg:bg-transparent"
                >
                    <X className="w-6 h-6 sm:w-8 sm:h-8" />
                </button>

                {/* Center Column (Monitor) - Order 1 on Mobile */}
                <div className="w-full lg:col-span-6 flex flex-col justify-center perspective-monitor order-1 lg:order-2 mt-8 lg:mt-0">
                    <div className="relative rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,216,255,0.1)] bg-black">
                        {/* Simple Monitor Wrapper */}
                        <div className="p-1">
                            <Monitor logs={logs} />
                        </div>
                    </div>
                </div>

                {/* Left Column (Config) - Order 2 on Mobile */}
                <div className="w-full lg:col-span-3 space-y-4 sm:space-y-6 flex flex-col h-full order-2 lg:order-1">
                    <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                        {/* Modes Panel */}
                        <div className="glass p-4 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] border-white/10 bg-slate-900/40 backdrop-blur-md flex-1 flex flex-col justify-center">
                            <label className="block text-[9px] sm:text-[10px] font-mono font-black uppercase tracking-[0.2em] text-primary mb-3 sm:mb-6">
                                {t.hero.mode_title}
                            </label>
                            <div className="space-y-2 sm:space-y-3">
                                {modes.map((m) => (
                                    <button
                                        key={m.id}
                                        onClick={() => setSelectedMode(m.id as any)}
                                        className={`w-full flex items-center gap-2 sm:gap-4 px-3 sm:px-5 py-3 sm:py-4 rounded-xl transition-all border font-black text-[9px] sm:text-[11px] uppercase tracking-widest text-left ${selectedMode === m.id ? 'bg-primary text-slate-950 border-white shadow-[0_0_20px_rgba(0,216,255,0.3)]' : 'bg-white/5 text-slate-400 border-white/5 hover:border-white/20 hover:text-white'}`}
                                    >
                                        <m.icon className={`w-3 h-3 sm:w-4 sm:h-4 ${selectedMode === m.id ? 'text-slate-950' : 'text-primary'}`} />
                                        <span className="truncate">{m.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Categories Panel */}
                        <div className="glass p-4 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] border-white/10 bg-slate-900/40 backdrop-blur-md flex-1 flex flex-col justify-center">
                            <label className="block text-[9px] sm:text-[10px] font-mono font-black uppercase tracking-[0.2em] text-primary mb-3 sm:mb-6">
                                {t.hero.cat_title}
                            </label>
                            <div className="space-y-2 sm:space-y-3">
                                {cats.map((c) => (
                                    <button
                                        key={c.id}
                                        onClick={() => setSelectedCat(c.id as any)}
                                        className={`w-full px-3 sm:px-5 py-3 sm:py-4 rounded-xl transition-all border font-black text-[9px] sm:text-[11px] uppercase tracking-widest text-center ${selectedCat === c.id ? 'bg-white text-slate-950 border-white shadow-xl' : 'bg-white/5 text-slate-400 border-white/5 hover:border-white/20 hover:text-white'}`}
                                    >
                                        <span className="truncate block">{c.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column (Debrief & Actions) - Order 3 on Mobile */}
                <div className="w-full lg:col-span-3 space-y-4 sm:space-y-6 flex flex-col h-full order-3 lg:order-3 pb-8 lg:pb-0">
                    {/* Debrief Card */}
                    <div className="relative overflow-hidden glass p-4 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] border-primary/20 bg-gradient-to-br from-primary/5 via-slate-900/60 to-transparent flex flex-col flex-1">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary text-slate-950 flex items-center justify-center shadow-[0_0_20px_rgba(0,216,255,0.4)]">
                                <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-display font-black text-white uppercase">{t.hero_extended.debrief.title}</h3>
                        </div>

                        <p className="text-slate-400 text-[10px] sm:text-xs mb-4 sm:mb-6 font-medium leading-relaxed">{t.hero_extended.debrief.subtitle}</p>

                        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 sm:gap-3 mb-auto">
                            {debriefItems.map((item, idx) => (
                                <li key={idx} className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded-full border border-primary/30 bg-primary/10 flex items-center justify-center shrink-0">
                                        <CheckCircle2 className="w-2.5 h-2.5 text-primary" />
                                    </div>
                                    <span className="text-slate-300 text-[10px] sm:text-[11px] font-bold">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-4 sm:mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-[9px] font-mono font-bold text-primary/50">
                            <span>ANALYSIS_CORE_V2</span>
                            <Zap className="w-3 h-3" />
                        </div>
                    </div>

                    {/* Launch Button */}
                    <button
                        onClick={startSimulation}
                        disabled={isLoading}
                        className="w-full py-4 sm:py-5 bg-white text-slate-950 rounded-[1.5rem] sm:rounded-[2rem] font-display font-black text-xs sm:text-sm tracking-widest uppercase hover:bg-primary hover:text-white transition-all shadow-xl disabled:opacity-70 flex items-center justify-center gap-3 group"
                    >
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />}
                        {isLoading ? "INITIALIZING..." : t.hero_extended.btn_start_now}
                    </button>

                    {/* Sensor Card */}
                    <div className="glass p-4 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] border-white/10 bg-white/5 flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-primary">
                                <Target className="w-4 h-4" />
                                <span className="text-[9px] font-bold uppercase tracking-widest">{t.hero_extended.sensor.label}</span>
                            </div>
                            <div className="text-[9px] text-slate-400 font-mono">{t.hero_extended.sensor.status}</div>
                        </div>
                        <div className="text-3xl sm:text-4xl font-black text-white font-body">99%</div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DashboardModal;
