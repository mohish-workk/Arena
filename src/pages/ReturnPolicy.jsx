import React from 'react';
import { RotateCcw, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';

const ReturnPolicy = () => {
    return (
        <div className="bg-cream min-h-screen pt-32 pb-24 px-8">
            <div className="max-w-4xl mx-auto">
                <header className="mb-16">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold mb-4">Support & Care</p>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight uppercase italic text-secondary">
                        Return Policy.
                    </h1>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-center">
                    <div className="p-8 bg-white/50 border border-secondary/5">
                        <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Clock className="text-primary" size={24} />
                        </div>
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-2">7-Day Window</h3>
                        <p className="text-xs opacity-50 font-medium">Changed your mind? Return within 7 days for a full refund or exchange.</p>
                    </div>
                    <div className="p-8 bg-white/50 border border-secondary/5">
                        <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
                            <RotateCcw className="text-primary" size={24} />
                        </div>
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-2">Campus Pickup</h3>
                        <p className="text-xs opacity-50 font-medium">Free returns for campus residents. We'll pick it up from your dorm.</p>
                    </div>
                    <div className="p-8 bg-white/50 border border-secondary/5">
                        <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShieldCheck className="text-primary" size={24} />
                        </div>
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-2">Verified Gear</h3>
                        <p className="text-xs opacity-50 font-medium">All returns are inspected by our quality assurance team.</p>
                    </div>
                </div>

                <div className="space-y-12">
                    <section>
                        <h2 className="text-xl font-bold uppercase tracking-tight mb-6">1. Eligibility</h2>
                        <div className="space-y-4 opacity-70 text-sm leading-relaxed">
                            <p>To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You’ll also need the receipt or proof of purchase.</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Retail items qualify for full refund if returned within 7 days.</li>
                                <li>Loop items (pre-owned) have a specific 48-hour inspection period.</li>
                                <li>Rentals must be returned by the agreed duration end time.</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold uppercase tracking-tight mb-6">2. Return Process</h2>
                        <div className="space-y-6">
                            <div className="flex gap-6 items-start">
                                <div className="w-8 h-8 bg-secondary text-cream flex items-center justify-center font-bold text-xs shrink-0 mt-1">01</div>
                                <div className="space-y-2">
                                    <h4 className="font-bold uppercase text-sm tracking-widest">Initiate Request</h4>
                                    <p className="text-sm opacity-60">Log in to your Dashboard and select the order you wish to return. Click 'Request Return'.</p>
                                </div>
                            </div>
                            <div className="flex gap-6 items-start">
                                <div className="w-8 h-8 bg-secondary text-cream flex items-center justify-center font-bold text-xs shrink-0 mt-1">02</div>
                                <div className="space-y-2">
                                    <h4 className="font-bold uppercase text-sm tracking-widest">Verification</h4>
                                    <p className="text-sm opacity-60">Our team will review your request within 24 hours. Once approved, you'll receive a return authorization code.</p>
                                </div>
                            </div>
                            <div className="flex gap-6 items-start">
                                <div className="w-8 h-8 bg-secondary text-cream flex items-center justify-center font-bold text-xs shrink-0 mt-1">03</div>
                                <div className="space-y-2">
                                    <h4 className="font-bold uppercase text-sm tracking-widest">Handover</h4>
                                    <p className="text-sm opacity-60">Schedule a pickup for campus delivery or drop it off at our designated campus hub.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="bg-[#1A3C34] text-cream p-12">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="w-16 h-16 bg-cream/10 rounded-full flex items-center justify-center">
                                <CheckCircle2 className="text-cream" size={32} />
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-2xl font-bold tracking-tight mb-2">Need help with a return?</h3>
                                <p className="opacity-70 text-sm">Our campus support team is available 24/7 to assist with your requests.</p>
                            </div>
                            <button className="bg-cream text-primary px-8 py-4 font-bold uppercase tracking-widest text-xs hover:bg-cream/90 transition-all">
                                Support Hub
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ReturnPolicy;
