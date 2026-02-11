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
            <div className="relative z-10 w-full max-w-7xl grid lg:grid-cols-12 gap-6 sm:gap-8 items-start animate-scale-in">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute -top-12 right-0 p-2 text-slate-400 hover:text-white transition-colors"
                >
                    <X className="w-8 h-8" />
                </button>

                {/* Left Column: Config */}
                <div className="lg:col-span-3 space-y-6 flex flex-col h-full">
                    {/* Modes Panel */}
                    <div className="glass p-6 rounded-[2rem] border-white/10 bg-slate-900/40 backdrop-blur-md flex-1 flex flex-col justify-center">
                        <label className="block text-[10px] font-mono font-black uppercase tracking-[0.2em] text-primary mb-6">
                            {t.hero.mode_title}
                        </label>
                        <div className="space-y-3">
                            {modes.map((m) => (
                                <button
                                    key={m.id}
                                    onClick={() => setSelectedMode(m.id as any)}
                                    className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl transition-all border font-black text-[11px] uppercase tracking-widest text-left ${selectedMode === m.id ? 'bg-primary text-slate-950 border-white shadow-[0_0_20px_rgba(0,216,255,0.3)]' : 'bg-white/5 text-slate-400 border-white/5 hover:border-white/20 hover:text-white'}`}
                                >
                                    <m.icon className={`w-4 h-4 ${selectedMode === m.id ? 'text-slate-950' : 'text-primary'}`} />
                                    {m.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Categories Panel */}
                    <div className="glass p-6 rounded-[2rem] border-white/10 bg-slate-900/40 backdrop-blur-md flex-1 flex flex-col justify-center">
                        <label className="block text-[10px] font-mono font-black uppercase tracking-[0.2em] text-primary mb-6">
                            {t.hero.cat_title}
                        </label>
                        <div className="space-y-3">
                            {cats.map((c) => (
                                <button
                                    key={c.id}
                                    onClick={() => setSelectedCat(c.id as any)}
                                    className={`w-full px-5 py-4 rounded-xl transition-all border font-black text-[11px] uppercase tracking-widest text-center ${selectedCat === c.id ? 'bg-white text-slate-950 border-white shadow-xl' : 'bg-white/5 text-slate-400 border-white/5 hover:border-white/20 hover:text-white'}`}
                                >
                                    {c.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Center Column: Monitor */}
                <div className="lg:col-span-6 flex flex-col justify-center perspective-monitor">
                    <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(0,216,255,0.1)] bg-black">
                        {/* Simple Monitor Wrapper */}
                        <div className="p-1">
                            <Monitor logs={logs} />
                        </div>
                    </div>
                </div>

                {/* Right Column: Debrief & Actions */}
                <div className="lg:col-span-3 space-y-6 flex flex-col h-full">
                    {/* Debrief Card - Reusing Styles */}
                    <div className="relative overflow-hidden glass p-6 rounded-[2rem] border-primary/20 bg-gradient-to-br from-primary/5 via-slate-900/60 to-transparent flex flex-col flex-1">
                        <div className="w-12 h-12 rounded-xl bg-primary text-slate-950 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(0,216,255,0.4)]">
                            <BarChart3 className="w-6 h-6" />
                        </div>

                        <h3 className="text-xl font-display font-black text-white mb-2 uppercase">{t.hero_extended.debrief.title}</h3>
                        <p className="text-slate-400 text-xs mb-6 font-medium leading-relaxed">{t.hero_extended.debrief.subtitle}</p>

                        <ul className="space-y-3 mb-auto">
                            {debriefItems.map((item, idx) => (
                                <li key={idx} className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded-full border border-primary/30 bg-primary/10 flex items-center justify-center shrink-0">
                                        <CheckCircle2 className="w-2.5 h-2.5 text-primary" />
                                    </div>
                                    <span className="text-slate-300 text-[11px] font-bold">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-[9px] font-mono font-bold text-primary/50">
                            <span>ANALYSIS_CORE_V2</span>
                            <Zap className="w-3 h-3" />
                        </div>
                    </div>

                    {/* Launch Button */}
                    <button
                        onClick={startSimulation}
                        disabled={isLoading}
                        className="w-full py-5 bg-white text-slate-950 rounded-[2rem] font-display font-black text-sm tracking-widest uppercase hover:bg-primary hover:text-white transition-all shadow-xl disabled:opacity-70 flex items-center justify-center gap-3 group"
                    >
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />}
                        {isLoading ? "INITIALIZING..." : t.hero_extended.btn_start_now}
                    </button>

                    {/* Sensor Card */}
                    <div className="glass p-6 rounded-[2rem] border-white/10 bg-white/5 flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-primary">
                                <Target className="w-4 h-4" />
                                <span className="text-[9px] font-bold uppercase tracking-widest">{t.hero_extended.sensor.label}</span>
                            </div>
                            <div className="text-[9px] text-slate-400 font-mono">{t.hero_extended.sensor.status}</div>
                        </div>
                        <div className="text-4xl font-black text-white font-body">99%</div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DashboardModal;
