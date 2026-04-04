import { useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingBag, RefreshCcw, Key, ArrowRight, Star } from 'lucide-react';
import { retailProducts, loopProducts, rentalProducts } from '../data/dummyData';

gsap.registerPlugin(ScrollTrigger);

const ProductCard = ({ product, type }) => {
    const isRental = type === 'rental';
    const isLoop = type === 'loop';

    return (
        <Link 
            to={`/product/${product.id}`}
            className="group block bg-white border border-secondary/5 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
        >
            <div className="aspect-[4/5] overflow-hidden bg-cream relative">
                <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {isLoop && (
                    <div className="absolute top-4 left-4 bg-primary text-cream text-[8px] font-bold px-2 py-1 uppercase tracking-widest">
                        {product.condition} Condition
                    </div>
                )}
            </div>
            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold">
                        {product.category || (isLoop ? 'Loop' : 'Gear')}
                    </span>
                    {isLoop && (
                        <div className="flex items-center gap-1 text-primary">
                            <Star size={8} fill="currentColor" />
                            <span className="text-[8px] font-bold">{product.trustScore}</span>
                        </div>
                    )}
                </div>
                <h4 className="font-bold text-secondary mb-4 leading-tight group-hover:text-primary transition-colors line-clamp-1">
                    {product.name}
                </h4>
                <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-secondary">
                        ₹{product.price || product.depreciatedPrice || product.dailyRate}
                    </span>
                    {isRental && (
                        <span className="text-[10px] opacity-40 uppercase font-bold">/ Day</span>
                    )}
                    {isLoop && (
                        <span className="text-[10px] opacity-40 line-through font-bold">
                            ₹{product.originalPrice}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
};

const SectionHeader = ({ title, link, linkText = 'View All' }) => (
    <div className="flex justify-between items-end mb-12">
        <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold mb-2">Collection</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight uppercase italic">{title}</h2>
        </div>
        <Link 
            to={link} 
            className="group flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.2em] hover:text-primary transition-colors"
        >
            {linkText} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
    </div>
);

const Home = () => {
    const navigate = useNavigate();
    const heroRef = useRef(null);
    const imageRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
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

            {/* Product Showcases */}
            <section className="py-24 px-8 max-w-7xl mx-auto border-t border-secondary/5">
                <SectionHeader title="Arena Retail" link="/retail" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {retailProducts.slice(0, 4).map(product => (
                        <ProductCard key={product.id} product={product} type="retail" />
                    ))}
                </div>
            </section>

            <section className="py-24 px-8 max-w-7xl mx-auto border-t border-secondary/5">
                <SectionHeader title="Arena Loop" link="/loop" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {loopProducts.slice(0, 4).map(product => (
                        <ProductCard key={product.id} product={product} type="loop" />
                    ))}
                </div>
            </section>

            <section className="py-24 px-8 max-w-7xl mx-auto border-t border-secondary/5">
                <SectionHeader title="Arena Access" link="/access" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {rentalProducts.slice(0, 4).map(product => (
                        <ProductCard key={product.id} product={product} type="rental" />
                    ))}
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-24 bg-primary text-cream overflow-hidden border-t border-primary/10">
                <div className="max-w-7xl mx-auto px-8">
                    <header className="mb-16">
                        <p className="text-[10px] uppercase tracking-[0.4em] text-cream font-bold mb-4">Real stories</p>
                        <h2 className="text-4xl font-bold tracking-tight uppercase italic text-cream">Voice of the Campus.</h2>
                    </header>

                    <div className="relative w-full overflow-hidden flex">
                        <div className="flex animate-marquee w-max gap-8 px-4">
                            {[
                                {
                                    name: "Rahul S.",
                                    quote: "Arena Loop saved me ₹5000 on my cricket kit. The verification process makes it so much safer than generic marketplaces.",
                                    highlight: "₹5000 Saved"
                                },
                                {
                                    name: "Sneha K.",
                                    quote: "I rented a DSLR for our class trip. The delivery was right to my hostel gate. Super convenient!",
                                    highlight: "Instant Delivery"
                                },
                                {
                                    name: "Aman P.",
                                    quote: "Sold my old semester books in 15 minutes. Arena One is exactly what our campus needed.",
                                    highlight: "15 Min Sale"
                                },
                                {
                                    name: "Priya M.",
                                    quote: "The quality of retail gear is top-notch. It's great to have a premium store that understands student life.",
                                    highlight: "Top Quality"
                                },
                                // Duplicating for seamless marquee effect
                                {
                                    name: "Rahul S.",
                                    quote: "Arena Loop saved me ₹5000 on my cricket kit. The verification process makes it so much safer than generic marketplaces.",
                                    highlight: "₹5000 Saved"
                                },
                                {
                                    name: "Sneha K.",
                                    quote: "I rented a DSLR for our class trip. The delivery was right to my hostel gate. Super convenient!",
                                    highlight: "Instant Delivery"
                                },
                                {
                                    name: "Aman P.",
                                    quote: "Sold my old semester books in 15 minutes. Arena One is exactly what our campus needed.",
                                    highlight: "15 Min Sale"
                                },
                                {
                                    name: "Priya M.",
                                    quote: "The quality of retail gear is top-notch. It's great to have a premium store that understands student life.",
                                    highlight: "Top Quality"
                                }
                            ].map((t, i) => (
                                <div key={i} className="bg-white/5 border border-white/10 p-8 flex flex-col justify-between hover:bg-white/10 transition-all duration-500 group w-[350px] shrink-0">
                                    <div>
                                        <div className="text-[9px] font-bold uppercase tracking-widest text-cream mb-6 flex items-center gap-2">
                                            <div className="w-1 h-1 bg-cream"></div>
                                            {t.highlight}
                                        </div>
                                        <p className="text-sm leading-relaxed mb-8 italic opacity-70 group-hover:opacity-100 transition-opacity">
                                            "{t.quote}"
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold tracking-tight">{t.name}</h4>
                                        <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold">Arena Customer</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
224: 
            {/* Product Request Section */}
            <section className="py-24 bg-cream overflow-hidden">
                <div className="max-w-4xl mx-auto px-8">
                    <div className="bg-secondary p-12 md:p-16 relative overflow-hidden group">
                        {/* Ambient glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 -mr-32 -mt-32 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700"></div>
                        
                        <div className="relative z-10">
                            <header className="mb-10">
                                <p className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold mb-4">Request Gear</p>
                                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-cream leading-tight">
                                    Can't find what you're <br/> looking for?
                                </h2>
                                <p className="text-cream/50 mt-6 text-sm md:text-md max-w-xl leading-relaxed">
                                    Is there some product from any company that you want but we don't have? 
                                    Write details and we will find it and make it available for you.
                                </p>
                            </header>

                            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Request received! We'll find it for you."); }}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase font-bold tracking-widest text-cream/40">Product Name / Brand</label>
                                        <input 
                                            type="text" 
                                            placeholder="e.g. Wilson Pro Staff v14"
                                            className="w-full bg-white/5 border border-white/10 p-4 text-sm text-cream outline-none focus:border-primary transition-colors placeholder:text-cream/20"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase font-bold tracking-widest text-cream/40">Your Email</label>
                                        <input 
                                            type="email" 
                                            placeholder="your@email.com"
                                            className="w-full bg-white/5 border border-white/10 p-4 text-sm text-cream outline-none focus:border-primary transition-colors placeholder:text-cream/20"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-bold tracking-widest text-cream/40">Specific Details (Size, Color, Model)</label>
                                    <textarea 
                                        rows="3"
                                        placeholder="Tell us everything about the product..."
                                        className="w-full bg-white/5 border border-white/10 p-4 text-sm text-cream outline-none focus:border-primary transition-colors placeholder:text-cream/20 resize-none"
                                        required
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="bg-primary text-cream px-10 py-5 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-primary/90 transition-all flex items-center gap-3 shadow-2xl"
                                >
                                    Submit Request <ArrowRight size={16} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;
