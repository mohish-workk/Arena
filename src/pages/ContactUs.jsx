import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    return (
        <div className="bg-cream min-h-screen pt-32 pb-24 px-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-16 text-center max-w-2xl mx-auto">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold mb-4">Connect With Us</p>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight uppercase italic text-secondary">
                        Get In Touch.
                    </h1>
                    <p className="mt-6 opacity-60 text-sm leading-relaxed">
                        We're here to help you gear up for your next adventure. Whether you have questions about our campus network, retail shop, or the Arena Loop, don't hesitate to reach out.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                    {/* Contact Info */}
                    <div className="space-y-12">
                        <section className="space-y-8">
                            <h2 className="text-xl font-bold uppercase tracking-tight pb-4 border-b border-secondary/10">Quick Channels</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="p-8 bg-white/50 border border-secondary/5 flex flex-col items-center text-center">
                                    <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center mb-6">
                                        <Mail className="text-primary" size={24} />
                                    </div>
                                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-secondary/40 mb-2">Email Us</h3>
                                    <p className="text-sm font-bold">support@arenaone.com</p>
                                </div>
                                <div className="p-8 bg-white/50 border border-secondary/5 flex flex-col items-center text-center">
                                    <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center mb-6">
                                        <MessageSquare className="text-primary" size={24} />
                                    </div>
                                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-secondary/40 mb-2">Live Chat</h3>
                                    <p className="text-sm font-bold">Available 10AM - 8PM</p>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-8">
                            <h2 className="text-xl font-bold uppercase tracking-tight pb-4 border-b border-secondary/10">Campus Hub</h2>
                            <div className="flex gap-6 items-start">
                                <div className="w-12 h-12 bg-secondary text-cream flex items-center justify-center shrink-0">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold uppercase mb-2">VESIT Campus HQ</h3>
                                    <p className="text-sm opacity-60 leading-relaxed max-w-xs">
                                        Student Activity Center <br />
                                        VESIT, Collector's Colony <br />
                                        Chembur, Mumbai - 400074
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-6 items-start">
                                <div className="w-12 h-12 bg-secondary text-cream flex items-center justify-center shrink-0">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold uppercase mb-2">Logistics Hotline</h3>
                                    <p className="text-sm opacity-60">+91 98765 43210</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Contact Form */}
                    <div className="p-12 bg-secondary text-cream">
                        {isSubmitted ? (
                            <div className="h-full flex flex-col items-center justify-center text-center py-24 animate-slide-up">
                                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-8">
                                    <Send className="text-primary" size={40} />
                                </div>
                                <h2 className="text-3xl font-bold tracking-tight mb-4 uppercase italic">Message Sent.</h2>
                                <p className="opacity-60 text-sm">Thank you for reaching out. Our team will contact you within 24 hours.</p>
                                <button 
                                    onClick={() => setIsSubmitted(false)}
                                    className="mt-10 text-[10px] uppercase tracking-widest font-bold underline"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <h2 className="text-2xl font-bold tracking-tight uppercase italic mb-8">Send a Message.</h2>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] uppercase font-bold tracking-widest opacity-40">Your Name</label>
                                        <input 
                                            type="text" 
                                            required
                                            className="w-full bg-white/5 border border-white/10 p-4 text-sm outline-none focus:border-primary transition-colors"
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] uppercase font-bold tracking-widest opacity-40">Email Address</label>
                                        <input 
                                            type="email" 
                                            required
                                            className="w-full bg-white/5 border border-white/10 p-4 text-sm outline-none focus:border-primary transition-colors"
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] uppercase font-bold tracking-widest opacity-40">Subject</label>
                                    <select 
                                        className="w-full bg-white/5 border border-white/10 p-4 text-sm outline-none focus:border-primary transition-colors appearance-none"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                    >
                                        <option className="bg-secondary" value="General Inquiry">General Inquiry</option>
                                        <option className="bg-secondary" value="Order Status">Order Status</option>
                                        <option className="bg-secondary" value="Campus Network">Campus Network</option>
                                        <option className="bg-secondary" value="Rentals">Rentals</option>
                                    </select>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] uppercase font-bold tracking-widest opacity-40">Your Message</label>
                                    <textarea 
                                        required
                                        rows="6"
                                        className="w-full bg-white/5 border border-white/10 p-4 text-sm outline-none focus:border-primary transition-colors resize-none"
                                        value={formData.message}
                                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                                    ></textarea>
                                </div>

                                <button 
                                    type="submit"
                                    className="w-full bg-primary text-cream py-5 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-primary/90 transition-all shadow-xl flex items-center justify-center gap-3"
                                >
                                    Transmit Message
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
