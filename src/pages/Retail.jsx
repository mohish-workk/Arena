import { useState, useMemo } from 'react';
import { retailProducts } from '../data/dummyData';
import { ShoppingCart, X, Plus, SlidersHorizontal, ChevronRight } from 'lucide-react';

const Retail = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [showBundleModal, setShowBundleModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const categories = ['All', ...new Set(retailProducts.map(p => p.category))];

    const filteredProducts = useMemo(() => {
        if (activeCategory === 'All') return retailProducts;
        return retailProducts.filter(p => p.category === activeCategory);
    }, [activeCategory]);

    const handleAddToCart = (product) => {
        // For specific items like Cricket Bat, trigger the bundle modal
        if (product.name.toLowerCase().includes('cricket bat') || product.id === 'r1') {
            setSelectedProduct(product);
            setShowBundleModal(true);
        } else {
            // Normal add to cart logic (mock)
            alert(`${product.name} added to cart!`);
        }
    };

    return (
        <div className="bg-cream min-h-screen pt-12 pb-24 relative overflow-x-hidden">
            <div className="max-w-7xl mx-auto px-8">
                <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight text-secondary uppercase italic">Arena Retail</h1>
                        <p className="text-secondary/50 mt-2 text-xs font-bold uppercase tracking-widest">Premium gear for the modern explorer.</p>
                    </div>
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className={`flex items-center gap-2 px-6 py-3 border transition-all text-[10px] font-bold uppercase tracking-widest ${isSidebarOpen ? 'bg-secondary text-cream border-secondary' : 'bg-transparent text-secondary border-secondary/10 hover:border-secondary'}`}
                    >
                        <SlidersHorizontal size={14} />
                        {isSidebarOpen ? 'Hide Filters' : 'Show Filters'}
                    </button>
                </header>

                <div className="flex gap-12 relative">
                    {/* Sidebar Filtering - Animated Toggle */}
                    <aside className={`fixed md:relative top-0 left-0 h-full md:h-auto w-72 md:w-64 bg-cream md:bg-transparent z-40 border-r md:border-r-0 border-secondary/5 p-8 md:p-0 transition-transform duration-500 ease-quiet-luxury ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:hidden'}`}>
                        <div className="flex items-center justify-between mb-8 md:hidden">
                            <h3 className="text-sm font-bold uppercase tracking-widest">Filters</h3>
                            <button onClick={() => setIsSidebarOpen(false)} className="text-secondary/40 hover:text-secondary">
                                <X size={20} />
                            </button>
                        </div>

                        <h3 className="hidden md:block text-[10px] font-bold uppercase tracking-widest mb-6 border-b border-secondary/10 pb-2 text-secondary/30">Category</h3>
                        <div className="space-y-4">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => {
                                        setActiveCategory(cat);
                                        // On mobile, close sidebar after selecting
                                        if (window.innerWidth < 768) setIsSidebarOpen(false);
                                    }}
                                    className={`flex items-center justify-between w-full text-left text-[11px] font-bold uppercase tracking-[0.15em] py-2 transition-all ${activeCategory === cat
                                        ? 'text-primary'
                                        : 'text-secondary/40 hover:text-secondary'
                                        }`}
                                >
                                    {cat}
                                    {activeCategory === cat && <ChevronRight size={10} />}
                                </button>
                            ))}
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <main className="flex-grow">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredProducts.map(product => (
                                <div
                                    key={product.id}
                                    className="group relative bg-white border border-secondary/5 rounded-none overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                                >
                                    <div className="aspect-[4/5] overflow-hidden bg-cream">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-[10px] uppercase tracking-widest text-primary font-bold">{product.category}</span>
                                            <span className="text-sm font-medium text-secondary/60">₹{product.price}</span>
                                        </div>
                                        <h4 className="text-lg font-bold text-secondary mb-4 leading-tight">{product.name}</h4>
                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            className="w-full bg-secondary text-cream py-3 rounded-none text-xs font-bold uppercase tracking-widest hover:bg-primary transition-colors flex items-center justify-center gap-2"
                                        >
                                            <ShoppingCart size={14} /> Add to Cart
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </main>
                </div>
            </div>

            {/* Dynamic Bundle Modal / Slide-up Toast */}
            {showBundleModal && (
                <div className="fixed inset-0 z-[100] flex items-end justify-center px-4 pb-12 sm:pb-24 pointer-events-none">
                    <div className="bg-secondary text-cream w-full max-w-xl p-8 rounded-none shadow-2xl pointer-events-auto transform animate-slide-up duration-500 ease-out border-t-4 border-primary">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <span className="inline-block bg-primary text-[10px] font-bold px-2 py-0.5 uppercase tracking-widest mb-2">Limited Offer</span>
                                <h3 className="text-2xl font-bold tracking-tight">Complete your kit.</h3>
                            </div>
                            <button
                                onClick={() => setShowBundleModal(false)}
                                className="text-cream/50 hover:text-cream transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <p className="text-cream/70 text-sm leading-relaxed mb-8">
                            Add a <span className="text-cream font-bold">Premium Grip</span> and <span className="text-cream font-bold">Practice Ball</span> to your {selectedProduct?.name} for <span className="text-primary-light font-bold">15% off</span>.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => {
                                    alert("Bundle added successfully!");
                                    setShowBundleModal(false);
                                }}
                                className="flex-grow bg-primary text-cream py-4 rounded-none text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                            >
                                <Plus size={16} /> Add Bundle (₹500)
                            </button>
                            <button
                                onClick={() => setShowBundleModal(false)}
                                className="flex-grow bg-transparent border border-cream/20 text-cream py-4 rounded-none text-xs font-bold uppercase tracking-widest hover:bg-cream hover:text-secondary transition-all"
                            >
                                No Thanks
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Retail;
