import { useState, useRef, useEffect } from 'react';
import { Sparkles, Map, ListChecks, ShoppingBag, ArrowRight, User, Package, Clock } from 'lucide-react';
import { retailProducts, loopProducts, rentalProducts } from '../data/dummyData';
import gsap from 'gsap';
import { useCart } from '../context/CartContext';

const AdventureGenerator = () => {
    const [prompt, setPrompt] = useState('I have a free weekend and want to go camping near the city with two friends, but we are complete beginners.');
    const [preference, setPreference] = useState('rental'); // 'retail', 'loop', 'rental'
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const { addToCart, showToast } = useCart();
    const loadingRef = useRef(null);

    const handleGenerate = async (e) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        setIsLoading(true);
        setResponse(null);

        try {
            const res = await fetch('http://localhost:5000/api/ai/generate-adventure', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt, preference })
            });
            const data = await res.json();
            
            if (data.success) {
                // Map the returned item IDs to actual product metadata from ALL sources
                const allProducts = [...retailProducts, ...loopProducts, ...rentalProducts];
                const populatedItems = data.data.cartItems.map(id => {
                    return allProducts.find(p => p.id === id);
                }).filter(Boolean);

                setResponse({
                    ...data.data,
                    items: populatedItems
                });
            }
        } catch (error) {
            console.error("Failed to fetch AI response", error);
            // Fallback mock
            const allProducts = [...retailProducts, ...loopProducts, ...rentalProducts];
            setResponse({
                location: "Pawna Lake Lakeside Campsite, Maharashtra",
                expectations: "A serene, heavily serviced location perfect for beginners. Expect calm waters, clear night skies, and mild temperatures ranging from 18°C to 25°C. The terrain is flat grass.",
                items: preference === 'rental' 
                    ? [allProducts.find(p => p.id === 'rt2'), allProducts.find(p => p.id === 'rt3')].filter(Boolean)
                    : preference === 'loop'
                    ? [allProducts.find(p => p.id === 'l1')].filter(Boolean)
                    : [allProducts.find(p => p.id === 'r3')].filter(Boolean)
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isLoading && loadingRef.current) {
            gsap.to(loadingRef.current, { rotation: 360, repeat: -1, duration: 2, ease: "linear" });
            gsap.fromTo('.loading-text', { opacity: 0.5 }, { opacity: 1, repeat: -1, yoyo: true, duration: 0.5 });
        }
    }, [isLoading]);

    return (
        <div className="bg-secondary text-cream p-8 md:p-12 border border-secondary/5 shadow-2xl relative overflow-hidden my-12 group rounded-3xl">
            {/* Ambient Background Effect */}
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-primary/30 transition-colors duration-1000"></div>

            <div className="relative z-10 max-w-4xl mx-auto">
                <header className="mb-10 text-center">
                    <div className="flex items-center justify-center gap-2 mb-4 text-primary">
                        <Sparkles size={24} />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight uppercase italic mb-4">
                        The Adventure Generator
                    </h2>
                    <p className="text-cream/60 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                        Describe your journey. Our neural engine will architect the perfect mission profile and gear loadout for you.
                    </p>
                </header>

                <div className="mb-10">
                    <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-primary mb-6 block text-center">How do you want to acquire your gear?</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { id: 'retail', label: 'First Hand', icon: Package, desc: 'Brand new premium gear' },
                            { id: 'loop', label: 'Second Hand', icon: User, desc: 'Verified pre-owned' },
                            { id: 'rental', label: 'Rental', icon: Clock, desc: 'Access for the trip' }
                        ].map((opt) => (
                            <button
                                key={opt.id}
                                onClick={() => setPreference(opt.id)}
                                className={`p-6 border text-left transition-all relative overflow-hidden group/opt ${preference === opt.id ? 'bg-primary border-primary text-cream' : 'bg-white/5 border-white/10 text-cream/60 hover:border-primary/40'}`}
                            >
                                <opt.icon size={20} className={`mb-3 ${preference === opt.id ? 'text-cream' : 'text-primary'}`} />
                                <div className="font-bold text-sm uppercase tracking-widest mb-1">{opt.label}</div>
                                <div className="text-[10px] opacity-60">{opt.desc}</div>
                                {preference === opt.id && <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-cream rounded-full"></div>}
                            </button>
                        ))}
                    </div>
                </div>

                <form onSubmit={handleGenerate} className="mb-12">
                    <div className="relative">
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="I want to go surfing next weekend but I've never touched a board..."
                            className="w-full bg-cream/5 border border-cream/10 p-6 text-cream outline-none focus:border-primary/50 transition-colors resize-none h-32 md:text-lg rounded-xl"
                        />
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="absolute bottom-4 right-4 bg-primary text-cream px-6 py-3 font-bold uppercase tracking-widest text-[10px] hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-lg"
                        >
                            {isLoading ? 'Architecting Mission...' : 'Generate Loadout'} 
                            {!isLoading && <ArrowRight size={14} />}
                        </button>
                    </div>
                </form>

                {isLoading && (
                    <div className="flex flex-col items-center justify-center py-12">
                        <div ref={loadingRef} className="w-16 h-16 border-2 border-primary/20 border-t-primary rounded-full mb-6"></div>
                        <span className="loading-text text-[10px] uppercase tracking-[0.3em] font-bold text-primary">
                            Analyzing topography, gear stats & market availability...
                        </span>
                    </div>
                )}

                {response && !isLoading && (
                    <div className="bg-cream/5 border border-cream/10 p-8 md:p-10 animate-slide-up rounded-2xl">
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-8 border-b border-cream/10 pb-4">
                            Mission Parameters Fixed
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                            <div>
                                <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest mb-4">
                                    <Map size={16} className="text-primary" /> Target Coordinates
                                </h4>
                                <p className="text-cream/80 leading-relaxed font-medium">
                                    {response.location}
                                </p>
                            </div>
                            <div>
                                <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest mb-4">
                                    <ListChecks size={16} className="text-primary" /> Terrain Intel
                                </h4>
                                <p className="text-cream/80 text-sm leading-relaxed">
                                    {response.expectations}
                                </p>
                            </div>
                        </div>

                        <div>
                            <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest mb-6">
                                <ShoppingBag size={16} className="text-primary" /> Optimized Loadout ({preference})
                            </h4>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                {response.items.map((item, idx) => (
                                    <div key={idx} className="bg-secondary/50 border border-cream/10 p-4 flex gap-4 items-center group/item hover:border-primary/40 transition-all rounded-xl">
                                        <div className="w-16 h-16 bg-cream shrink-0 rounded-lg overflow-hidden">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500" />
                                        </div>
                                        <div>
                                            <h5 className="font-bold text-xs mb-1 line-clamp-1">{item.name}</h5>
                                            <span className="text-[10px] uppercase tracking-widest opacity-60">
                                                {preference === 'rental' ? `₹${item.dailyRate}/day` : `₹${item.price || item.depreciatedPrice}`}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => {
                                    response.items.forEach(item => addToCart(item));
                                    showToast(`Entire ${preference} package added to cart!`);
                                }}
                                className="w-full bg-cream text-secondary py-5 font-bold uppercase tracking-widest text-[10px] hover:bg-primary hover:text-cream transition-all shadow-xl rounded-xl"
                            >
                                {preference === 'rental' ? 'Rent Full Loadout' : 'Purchase Full Loadout'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdventureGenerator;

