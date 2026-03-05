import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingBag, RefreshCcw, Key, X, ShieldCheck, CheckCircle2, MapPin, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const navigate = useNavigate();
    const heroRef = useRef(null);
    const imageRef = useRef(null);
    const textRef = useRef(null);

    // Eligibility Modal State
    const [isElModalOpen, setIsElModalOpen] = useState(false);
    const [elEmail, setElEmail] = useState('');
    const [isElLoading, setIsElLoading] = useState(false);
    const [elStep, setElStep] = useState(1); // 1: input, 2: success, 3: fail

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero Image Animation
            gsap.fromTo(
                imageRef.current,
                { scale: 1.1, opacity: 0.8 },
                {
                    scale: 1,
                    opacity: 1,
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: true,
                    },
                }
            );

            // Hero Text Animation
            gsap.fromTo(
                textRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: 'power4.out',
                    delay: 0.2,
                }
            );
        }, heroRef);

        return () => ctx.revert();
    }, []);

    const handleCheckEligibility = (e) => {
        e.preventDefault();
        setIsElLoading(true);

        // Simulate checking process
        setTimeout(() => {
            setIsElLoading(false);
            if (elEmail.toLowerCase().endsWith('@ves.ac.in')) {
                setElStep(2);
            } else {
                setElStep(3);
            }
        }, 2000);
    };

    const resetElModal = () => {
        setIsElModalOpen(false);
        setElEmail('');
        setElStep(1);
        setIsElLoading(false);
    };

    return (
        <div className="bg-cream min-h-screen">
            {/* Hero Section */}
            <section ref={heroRef} className="relative h-[90vh] overflow-hidden flex items-center justify-center px-8">
                <div className="absolute inset-0 z-0">
                    <img
                        ref={imageRef}
                        src="https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=2000"
                        alt="Premium Adventure Gear"
                        className="w-full h-full object-cover brightness-75 text-secondary"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 to-transparent"></div>
                </div>

                <div ref={textRef} className="relative z-10 text-center max-w-4xl text-cream">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                        Equipping Your <br /> Next Adventure.
                    </h1>
                    <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
                        Premium gear to buy, sell, and rent. Delivered to your campus in under 2 hours.
                    </p>
                    <div className="mt-10 flex flex-wrap justify-center gap-4">
                        <button
                            onClick={() => navigate('/retail')}
                            className="bg-primary text-cream px-8 py-4 rounded-none text-sm font-bold uppercase tracking-widest hover:bg-primary/90 transition-all"
                        >
                            Explore Retail
                        </button>
                        <button
                            onClick={() => navigate('/loop')}
                            className="bg-transparent border border-cream text-cream px-8 py-4 rounded-none text-sm font-bold uppercase tracking-widest hover:bg-cream hover:text-secondary transition-all"
                        >
                            Join the Loop
                        </button>
                    </div>
                </div>
            </section>

            {/* Pillars Section */}
            <section className="py-24 px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                    <div className="flex flex-col items-center text-center group">
                        <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                            <ShoppingBag className="text-primary" size={28} />
                        </div>
                        <h3 className="text-xl font-bold mb-4 uppercase tracking-tighter">Arena Retail</h3>
                        <p className="text-secondary/60 text-sm leading-relaxed">
                            Hand-picked, high-performance gear from the world's most trusted brands.
                            Elevate your game with zero compromise.
                        </p>
                    </div>

                    <div className="flex flex-col items-center text-center group">
                        <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                            <RefreshCcw className="text-primary" size={28} />
                        </div>
                        <h3 className="text-xl font-bold mb-4 uppercase tracking-tighter">Arena Loop</h3>
                        <p className="text-secondary/60 text-sm leading-relaxed">
                            The verified campus circular economy. Securely buy and sell gear within
                            your student community with total trust.
                        </p>
                    </div>

                    <div className="flex flex-col items-center text-center group">
                        <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                            <Key className="text-primary" size={28} />
                        </div>
                        <h3 className="text-xl font-bold mb-4 uppercase tracking-tighter">Arena Access</h3>
                        <p className="text-secondary/60 text-sm leading-relaxed">
                            Why buy when you can access? Premium gear rentals for weekend
                            escapades and seasonal sports.
                        </p>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-24 bg-secondary text-cream overflow-hidden">
                <div className="max-w-7xl mx-auto px-8">
                    <header className="mb-16">
                        <p className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold mb-4">Real stories</p>
                        <h2 className="text-4xl font-bold tracking-tight uppercase italic">Voice of the Campus.</h2>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                name: "Rahul S.",
                                year: "Final Year IT",
                                quote: "Arena Loop saved me ₹5000 on my cricket kit. The verification process makes it so much safer than generic marketplaces.",
                                highlight: "₹5000 Saved"
                            },
                            {
                                name: "Sneha K.",
                                year: "FE Computer Science",
                                quote: "I rented a DSLR for our class trip. The delivery was right to my hostel gate. Super convenient!",
                                highlight: "Instant Delivery"
                            },
                            {
                                name: "Aman P.",
                                year: "TE Automation",
                                quote: "Sold my old semester books in 15 minutes. Arena One is exactly what our campus needed.",
                                highlight: "15 Min Sale"
                            },
                            {
                                name: "Priya M.",
                                year: "SE Electronics",
                                quote: "The quality of retail gear is top-notch. It's great to have a premium store that understands student life.",
                                highlight: "Top Quality"
                            }
                        ].map((t, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 p-8 flex flex-col justify-between hover:bg-white/10 transition-all duration-500 group">
                                <div>
                                    <div className="text-[9px] font-bold uppercase tracking-widest text-primary mb-6 flex items-center gap-2">
                                        <div className="w-1 h-1 bg-primary"></div>
                                        {t.highlight}
                                    </div>
                                    <p className="text-sm leading-relaxed mb-8 italic opacity-70 group-hover:opacity-100 transition-opacity">
                                        "{t.quote}"
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold tracking-tight">{t.name}</h4>
                                    <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold">{t.year}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Campus Banner */}
            <section className="px-6 py-16 md:px-8 md:pt-32 md:pb-24">
                <div className="bg-[#1A3C34] py-10 px-8 md:py-12 md:px-24 rounded-none flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative">
                    {/* Subtle geometric overlay */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-cream/5 rounded-full -mr-20 -mt-20"></div>

                    <div className="relative z-10 text-cream text-center md:text-left">
                        <p className="text-[10px] uppercase tracking-[0.3em] opacity-60 mb-2 font-bold">Campus Exclusive</p>
                        <h2 className="text-2xl md:text-4xl font-bold tracking-tight leading-tight">
                            VESIT Campus Exclusive: <br className="hidden md:block" />
                            <span className="text-cream/80">&lt; 2 Hour Dorm Delivery.</span>
                        </h2>
                    </div>

                    <div className="relative z-10 w-full md:w-auto">
                        <button
                            onClick={() => setIsElModalOpen(true)}
                            className="w-full md:w-auto bg-cream text-primary px-10 py-4 rounded-none text-sm font-bold uppercase tracking-widest hover:bg-cream/90 transition-all shadow-xl"
                        >
                            Check Eligibility
                        </button>
                    </div>
                </div>
            </section>

            {/* Eligibility Modal */}
            {isElModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-secondary/90 backdrop-blur-md">
                    <div className="bg-white w-full max-w-lg relative shadow-2xl overflow-hidden border border-secondary/5">
                        <button
                            onClick={resetElModal}
                            className="absolute top-6 right-6 text-secondary/40 hover:text-secondary transition-colors z-20"
                        >
                            <X size={20} />
                        </button>

                        <div className="p-12">
                            {elStep === 1 ? (
                                <>
                                    <header className="mb-10 text-center">
                                        <div className="w-16 h-16 bg-primary/5 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                                            <MapPin size={28} />
                                        </div>
                                        <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-primary mb-2 block">Location Verification</span>
                                        <h2 className="text-3xl font-bold text-secondary tracking-tight">Check Eligibility</h2>
                                        <p className="text-secondary/40 text-xs mt-2">Enter your campus email to verify 2-hour delivery.</p>
                                    </header>

                                    <form onSubmit={handleCheckEligibility} className="space-y-6">
                                        <div className="space-y-4">
                                            <label className="text-[10px] uppercase font-bold tracking-widest text-secondary/40 flex items-center gap-2">
                                                <Mail size={12} /> University Email
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                placeholder="name@ves.ac.in"
                                                value={elEmail}
                                                onChange={(e) => setElEmail(e.target.value)}
                                                className="w-full bg-cream border border-secondary/5 p-5 text-sm outline-none focus:border-primary transition-colors"
                                            />
                                        </div>

                                        <button
                                            disabled={isElLoading}
                                            type="submit"
                                            className="w-full bg-primary text-cream py-5 text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-3"
                                        >
                                            {isElLoading ? 'Verifying Coordinates...' : 'Verify My Campus'}
                                        </button>
                                    </form>
                                </>
                            ) : elStep === 2 ? (
                                <div className="text-center py-8">
                                    <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-8">
                                        <CheckCircle2 size={40} />
                                    </div>
                                    <h2 className="text-3xl font-bold text-secondary tracking-tight mb-4 text-center">You're Eligible!</h2>
                                    <p className="text-secondary/50 text-sm leading-relaxed mb-10 text-center">
                                        VESIT is part of our **Elite Campus Network**. You can now enjoy sub-2 hour deliveries on all retail orders.
                                    </p>
                                    <button
                                        onClick={resetElModal}
                                        className="w-full bg-primary text-cream py-5 text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl"
                                    >
                                        Start Shopping Retail
                                    </button>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-8">
                                        <ShieldCheck size={40} />
                                    </div>
                                    <h2 className="text-3xl font-bold text-secondary tracking-tight mb-4 text-center">Out of Range</h2>
                                    <p className="text-secondary/50 text-sm leading-relaxed mb-10 text-center">
                                        Currently, 2-hour delivery is exclusive to the **@ves.ac.in** community. Stay tuned as we expand to other campuses.
                                    </p>
                                    <button
                                        onClick={() => setElStep(1)}
                                        className="w-full bg-secondary text-cream py-5 text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl"
                                    >
                                        Try Another Email
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
