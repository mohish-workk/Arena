import { useState, useMemo } from 'react';
import { loopProducts } from '../data/dummyData';
import { ShieldCheck, CheckCircle2, Star, ArrowDownRight, X, IndianRupee, Send, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Loop = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [offerAmount, setOfferAmount] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [addedProductId, setAddedProductId] = useState(null);
    const { addToCart } = useCart();

    const handleBuyNow = (product) => {
        addToCart(product);
        setAddedProductId(product.id);
        setTimeout(() => setAddedProductId(null), 2000);
    };

    const openOfferModal = (product) => {
        setSelectedProduct(product);
        setOfferAmount(product.depreciatedPrice - 10); // Default suggestion
        setIsModalOpen(true);
        setIsSubmitted(false);
    };

    const submitOffer = (e) => {
        e.preventDefault();
        // Mock submission
        setIsSubmitted(true);
        setTimeout(() => {
            setIsModalOpen(false);
            setIsSubmitted(false);
        }, 2500);
    };

    const filteredLoopProducts = useMemo(() => {
        if (!searchQuery) return loopProducts;
        return loopProducts.filter(p => 
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            p.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    return (
        <div className="bg-cream min-h-screen pt-12 pb-24">
            <div className="max-w-7xl mx-auto px-8">
                <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 uppercase tracking-widest">Student Economy</span>
                            <span className="text-secondary/30 text-[10px] uppercase font-bold tracking-widest">Verified Marketplace</span>
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight text-secondary">Arena Loop</h1>
                        <p className="text-secondary/50 mt-2">Verified student resale. Buy and sell with total confidence.</p>
                    </div>
                    <div>
                        <input 
                            type="text" 
                            placeholder="Search Loop..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent border-b border-secondary/20 py-2 text-sm outline-none focus:border-primary transition-colors text-secondary placeholder:text-secondary/30 w-full md:w-64"
                        />
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {filteredLoopProducts.map(product => (
                        <div key={product.id} className="bg-white border border-secondary/5 flex flex-col sm:flex-row overflow-hidden group transition-all duration-300 hover:shadow-xl">
                            {/* Image Section */}
                            <div className="sm:w-2/5 aspect-square sm:aspect-auto overflow-hidden bg-cream relative">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
                                />
                                <div className="absolute top-4 left-4 flex flex-col gap-2">
                                    <div className="flex items-center gap-1.5 bg-primary text-cream text-[9px] font-bold px-2 py-1 uppercase tracking-wider shadow-lg">
                                        <CheckCircle2 size={10} />
                                        Verified @ves.ac.in
                                    </div>
                                    <div className="bg-secondary text-cream text-[9px] font-bold px-2 py-1 uppercase tracking-wider shadow-lg">
                                        Condition: {product.condition}
                                    </div>
                                </div>
                            </div>

                            {/* Info Section */}
                            <div className="p-8 flex-grow flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-secondary mb-1">{product.name}</h3>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs font-medium text-secondary/60">{product.sellerName}</span>
                                            <div className="flex items-center gap-1 text-[#D4AF37]">
                                                <Star size={12} fill="currentColor" />
                                                <span className="text-[11px] font-bold">{product.trustScore}/5</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-primary">
                                                <ShieldCheck size={12} />
                                                <span className="text-[10px] font-bold uppercase tracking-tight">Trust Protocol</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-sm text-secondary/60 mb-8 flex-grow leading-relaxed italic">
                                    "{product.description}"
                                </p>

                                <div className="mt-auto pt-6 border-t border-secondary/5">
                                    {/* Pricing UI */}
                                    <div className="flex items-end justify-between mb-8">
                                        <div>
                                            <span className="block text-[10px] uppercase tracking-[0.2em] text-secondary/30 mb-1 font-bold">Resale Price</span>
                                            <div className="flex items-baseline gap-3">
                                                <span className="text-3xl font-bold text-primary">₹{product.depreciatedPrice}</span>
                                                <div className="flex items-center text-primary text-xs font-bold bg-primary/5 px-2 py-0.5">
                                                    <ArrowDownRight size={14} />
                                                    <span>{Math.round(((product.originalPrice - product.depreciatedPrice) / product.originalPrice) * 100)}% Lower</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="block text-[10px] uppercase tracking-widest text-secondary/30 mb-1">Original MSRP</span>
                                            <span className="text-sm text-secondary/40 line-through font-medium">₹{product.originalPrice}</span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => handleBuyNow(product)}
                                            className="flex-grow bg-primary text-cream py-4 rounded-none text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-primary/90 transition-all shadow-md flex items-center justify-center gap-2"
                                        >
                                            {addedProductId === product.id ? (
                                                <><Check size={14} /> Added to Cart</>
                                            ) : (
                                                <><ShoppingCart size={14} /> Add to Cart</>
                                            )}
                                        </button>
                                        <button
                                            onClick={() => openOfferModal(product)}
                                            className="flex-grow bg-transparent border border-secondary/10 text-secondary py-4 rounded-none text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-secondary hover:text-white hover:border-secondary transition-all"
                                        >
                                            Make an Offer
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Offer Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-secondary/80 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-lg relative shadow-2xl overflow-hidden border border-secondary/5">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-6 right-6 text-secondary/40 hover:text-secondary transition-colors z-20"
                        >
                            <X size={20} />
                        </button>

                        {!isSubmitted ? (
                            <div className="p-12">
                                <header className="mb-10">
                                    <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-primary mb-2 block">Trust Protocol Negotiation</span>
                                    <h2 className="text-3xl font-bold text-secondary tracking-tight">Make an Offer</h2>
                                    <p className="text-secondary/40 text-xs mt-2">Item: <span className="text-secondary font-bold">{selectedProduct?.name}</span></p>
                                </header>

                                <form onSubmit={submitOffer} className="space-y-8">
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-end">
                                            <label className="text-[10px] uppercase font-bold tracking-widest text-secondary/40">Your Counter Offer</label>
                                            <span className="text-[10px] uppercase font-bold tracking-widest text-primary italic">Listed at ₹{selectedProduct?.depreciatedPrice}</span>
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                required
                                                value={offerAmount}
                                                onChange={(e) => setOfferAmount(e.target.value)}
                                                className="w-full bg-cream border border-secondary/5 p-6 text-4xl font-bold text-secondary outline-none focus:border-primary transition-colors pl-16 pr-8"
                                            />
                                            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-secondary/20">
                                                <IndianRupee size={28} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-primary/5 p-6 space-y-3">
                                        <div className="flex items-center gap-3 text-primary">
                                            <ShieldCheck size={18} />
                                            <span className="text-[10px] uppercase font-bold tracking-widest">Arena Protection</span>
                                        </div>
                                        <p className="text-[10px] text-secondary/60 leading-relaxed">
                                            Your offer will be sent to the seller. If accepted, you'll have 24 hours to complete the purchase via Arena Loop.
                                        </p>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-primary text-cream py-5 text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-3"
                                    >
                                        Send Offer <Send size={16} />
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <div className="p-16 text-center">
                                <div className="w-20 h-20 bg-primary text-cream rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl animate-bounce">
                                    <CheckCircle2 size={40} />
                                </div>
                                <h2 className="text-3xl font-bold text-secondary mb-4 tracking-tight">Offer Sent</h2>
                                <p className="text-secondary/50 text-sm leading-relaxed mb-4">
                                    We've notified the seller of your counter-offer of <span className="text-secondary font-bold">₹{offerAmount}</span>.
                                </p>
                                <p className="text-[10px] uppercase tracking-widest text-primary font-bold italic">
                                    Checking matching protocols...
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Loop;
