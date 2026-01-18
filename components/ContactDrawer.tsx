import React, { useState, useEffect } from 'react';
import { X, Send, User, Mail, MessageSquare, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { sendContactEmail } from '../utils/email';

interface ContactDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const ContactDrawer: React.FC<ContactDrawerProps> = ({ isOpen, onClose }) => {
    const { t } = useLanguage();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const form = e.target as HTMLFormElement;

        // Extract values
        const name = (form.elements[0] as HTMLInputElement).value;
        const email = (form.elements[1] as HTMLInputElement).value;
        const message = (form.elements[2] as HTMLTextAreaElement).value;

        try {
            await sendContactEmail({
                name,
                email,
                message
            });

            setIsSubmitting(false);
            setIsSuccess(true);

            setTimeout(() => {
                setIsSuccess(false);
                onClose();
            }, 3000);
        } catch (error) {
            console.error('Failed to send email:', error);
            setIsSubmitting(false);
            alert("Une erreur est survenue lors de l'envoi. Veuillez réessayer.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[150] flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm transition-opacity duration-500 animate-fade-in"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className={`relative w-full max-w-md bg-slate-900 h-full shadow-2xl border-l border-white/10 flex flex-col transform transition-transform duration-500 ease-out animate-slide-in-right overflow-hidden`}>

                {/* Decorative Background */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

                {/* Header */}
                <div className="relative z-10 px-8 pt-10 pb-6 flex items-center justify-between border-b border-white/5 bg-slate-900/50 backdrop-blur-md">
                    <div>
                        <h3 className="text-2xl font-display font-black text-white uppercase tracking-tight">
                            {t.contact_drawer.title}
                        </h3>
                        <p className="text-primary text-[10px] font-mono font-bold uppercase tracking-[0.3em] mt-1">
                            {t.contact_drawer.header_badge}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition-all border border-white/5"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form Content */}
                <div className="relative z-10 flex-grow overflow-y-auto px-8 py-8 scrollbar-hide">
                    {isSuccess ? (
                        <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in">
                            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 border border-primary/20 shadow-[0_0_30px_rgba(0,216,255,0.2)]">
                                <CheckCircle2 className="w-10 h-10 text-primary" />
                            </div>
                            <h4 className="text-xl font-display font-bold text-white mb-2 uppercase tracking-tight">
                                {t.contact_drawer.success_title}
                            </h4>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-[250px]">
                                {t.contact_drawer.success_message}
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest pl-1">{t.contact_drawer.labels.name}</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-primary transition-colors" />
                                    <input
                                        required
                                        type="text"
                                        placeholder={t.contact_drawer.placeholders.name}
                                        className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white text-sm focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-slate-700"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest pl-1">{t.contact_drawer.labels.email}</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-primary transition-colors" />
                                    <input
                                        required
                                        type="email"
                                        placeholder={t.contact_drawer.placeholders.email}
                                        className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white text-sm focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-slate-700"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest pl-1">{t.contact_drawer.labels.message}</label>
                                <div className="relative group">
                                    <MessageSquare className="absolute left-4 top-5 w-4 h-4 text-slate-500 group-focus-within:text-primary transition-colors" />
                                    <textarea
                                        required
                                        rows={4}
                                        placeholder={t.contact_drawer.placeholders.message}
                                        className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-4 pl-11 pr-4 text-white text-sm focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-slate-700 resize-none h-32"
                                    ></textarea>
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-4 bg-primary text-slate-950 rounded-xl font-display font-black text-sm tracking-[0.2em] uppercase hover:bg-white transition-all shadow-[0_0_30px_rgba(0,216,255,0.2)] disabled:opacity-50 flex items-center justify-center gap-3 overflow-hidden group"
                                >
                                    {isSubmitting ? (
                                        <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            <span>{t.contact_drawer.btn_submit}</span>
                                            <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </div>

                {/* Footer */}
                <div className="relative z-10 px-8 py-6 border-t border-white/5 bg-slate-950/30 text-center">
                    <p className="text-[9px] font-mono font-bold text-slate-600 uppercase tracking-widest">
                        {t.contact_drawer.footer}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ContactDrawer;
