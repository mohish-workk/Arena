import React from 'react';
import { Truck, Zap, MapPin, Globe } from 'lucide-react';

const ShippingPolicy = () => {
    return (
        <div className="bg-cream min-h-screen pt-32 pb-24 px-8">
            <div className="max-w-4xl mx-auto">
                <header className="mb-16">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold mb-4">Logistics & Delivery</p>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight uppercase italic text-secondary">
                        Shipping Policy.
                    </h1>
                </header>

                <div className="bg-primary/5 border-l-4 border-primary p-12 mb-16">
                    <div className="flex flex-col md:flex-row items-center gap-10">
                        <div className="w-24 h-24 bg-primary text-cream flex items-center justify-center shrink-0">
                            <Zap size={48} />
                        </div>
                        <div className="text-center md:text-left">
                            <h2 className="text-2xl font-bold tracking-tight mb-4">ELITE CAMPUS NETWORK</h2>
                            <p className="text-sm opacity-60 leading-relaxed">
                                Join the exclusive network of student athletes and adventurers. 
                                **&lt; 2 hour delivery** is guaranteed for all verified campus locations on orders placed between 10 AM and 8 PM.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-secondary/5 rounded-full flex items-center justify-center">
                                <Truck className="text-secondary" size={20} />
                            </div>
                            <h3 className="text-lg font-bold uppercase tracking-tight">Campus Delivery</h3>
                        </div>
                        <div className="space-y-4 text-sm opacity-70 leading-relaxed">
                            <p>Our dedicated campus logistics team ensures lightning-fast delivery to your dorm or department.</p>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-primary"></div>**Standard Delivery**: ₹30 (2-4 hours)</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-primary"></div>**Elite Delivery**: Free (Sub-2 hours) for members</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-primary"></div>**Scheduled**: Select your preferred time slot</li>
                            </ul>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-secondary/5 rounded-full flex items-center justify-center">
                                <Globe className="text-secondary" size={20} />
                            </div>
                            <h3 className="text-lg font-bold uppercase tracking-tight">Pan-India Shipping</h3>
                        </div>
                        <div className="space-y-4 text-sm opacity-70 leading-relaxed">
                            <p>Not on campus? No problem. We partner with India's leading logistics providers to reach you anywhere.</p>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-primary"></div>**Cities**: 2-4 business days</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-primary"></div>**Rest of India**: 4-7 business days</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-primary"></div>**Tracking**: Detailed real-time GPS tracking</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="space-y-12">
                    <section>
                        <h2 className="text-xl font-bold uppercase tracking-tight mb-6">3. Tracking & Support</h2>
                        <div className="space-y-4 opacity-70 text-sm leading-relaxed">
                            <p>Once your order is processed, you'll receive a notification via email and SMS with a tracking link. 
                                For campus deliveries, you'll receive a live GPS tracking link through which you can see the delivery partner's real-time location.</p>
                        </div>
                    </section>

                    <section className="border-t border-secondary/5 pt-12">
                        <div className="flex flex-wrap gap-8 items-center justify-between">
                            <div className="flex gap-4">
                                <MapPin className="text-primary" size={24} />
                                <div>
                                    <h4 className="font-bold text-sm uppercase">Campus Hub</h4>
                                    <p className="text-xs opacity-50">Student Activity Center, VESIT, Chembur.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Zap className="text-primary" size={24} />
                                <div>
                                    <h4 className="font-bold text-sm uppercase">Express Service</h4>
                                    <p className="text-xs opacity-50">Operational 365 Days a Year.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ShippingPolicy;
