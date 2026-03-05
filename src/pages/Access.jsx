import { useState, useMemo } from 'react';
import { rentalProducts } from '../data/dummyData';
import { Calendar, Shield, Zap, CheckCircle2, X, Info } from 'lucide-react';

const Access = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Calculate rental duration and costs
    const pricing = useMemo(() => {
        if (!selectedProduct || !startDate || !endDate) return null;

        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.max(0, end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

        const rentalTotal = diffDays * selectedProduct.dailyRate;
        const deposit = selectedProduct.securityDeposit;
        const finalTotal = rentalTotal + deposit;

        return { diffDays, rentalTotal, deposit, finalTotal };
    }, [selectedProduct, startDate, endDate]);

    const handleBooking = () => {
        alert(`Booking confirmed for ${selectedProduct.name}! Total: ₹${pricing?.finalTotal}`);
        setSelectedProduct(null);
        setStartDate('');
        setEndDate('');
    };

    return (
        <div className="bg-cream min-h-screen pt-12 pb-24">
            <div className="max-w-7xl mx-auto px-8">
                <header className="mb-16">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="bg-primary text-cream text-[10px] font-bold px-2 py-0.5 uppercase tracking-widest">Premium Leasing</span>
                        <span className="text-secondary/30 text-[10px] uppercase font-bold tracking-widest">seasonal</span>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-secondary">Arena Access</h1>
                    <p className="text-secondary/50 mt-2">Rent high-ticket gear. Adventure without the commitment.</p>
                </header>

                {/* Product Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {rentalProducts.map(product => (
                        <div
                            key={product.id}
                            onClick={() => setSelectedProduct(product)}
                            className="bg-white border border-secondary/5 p-8 flex flex-col group relative overflow-hidden transition-all duration-500 hover:border-primary/20 cursor-pointer"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 -mr-16 -mt-16 rounded-full group-hover:bg-primary/10 transition-colors"></div>

                            <div className="mb-8">
                                <div className="aspect-video overflow-hidden bg-cream mb-6">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                <h3 className="text-2xl font-bold text-secondary mb-2 tracking-tight">{product.name}</h3>
                                <p className="text-sm text-secondary/50 line-clamp-2 leading-relaxed">
                                    {product.description}
                                </p>
                            </div>

                            <div className="flex-grow">
                                <div className="grid grid-cols-1 gap-3 mb-8">
                                    {product.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-xs text-secondary/70">
                                            <CheckCircle2 size={14} className="text-primary" />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center py-3 border-y border-secondary/5">
                                        <div className="flex items-center gap-2 text-primary font-bold">
                                            <Zap size={16} />
                                            <span className="text-xs uppercase tracking-widest">Daily Rate</span>
                                        </div>
                                        <span className="text-xl font-bold text-secondary">₹{product.dailyRate}<span className="text-[10px] text-secondary/30 font-normal">/day</span></span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <button className="w-full bg-primary text-cream py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-sm group-hover:shadow-md">
                                    <Calendar size={14} /> Check Availability
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Booking Modal */}
                {selectedProduct && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-secondary/80 backdrop-blur-sm" onClick={() => setSelectedProduct(null)}></div>
                        <div className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-none shadow-2xl flex flex-col md:flex-row border border-secondary/10">

                            {/* Image Sidebar (Desktop) */}
                            <div className="hidden md:block w-1/3 bg-cream p-1 border-r border-secondary/10">
                                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover grayscale-[0.2]" />
                            </div>

                            <div className="flex-grow p-8 sm:p-12">
                                <button
                                    onClick={() => setSelectedProduct(null)}
                                    className="absolute top-6 right-6 text-secondary/30 hover:text-secondary transition-colors"
                                >
                                    <X size={24} />
                                </button>

                                <div className="mb-10">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2 block">Rental Booking</span>
                                    <h2 className="text-3xl font-bold tracking-tight text-secondary">{selectedProduct.name}</h2>
                                </div>

                                {/* Date Selection UI */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase font-bold tracking-widest text-secondary/40">Start Date</label>
                                        <input
                                            type="date"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            className="w-full bg-cream border border-secondary/5 p-4 text-sm outline-none focus:border-primary transition-colors cursor-pointer"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase font-bold tracking-widest text-secondary/40">End Date</label>
                                        <input
                                            type="date"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            className="w-full bg-cream border border-secondary/5 p-4 text-sm outline-none focus:border-primary transition-colors cursor-pointer"
                                        />
                                    </div>
                                </div>

                                {/* Price Breakdown UI */}
                                {pricing ? (
                                    <div className="bg-cream p-8 space-y-4 mb-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                        <h4 className="text-[10px] uppercase font-bold tracking-widest text-secondary/60 mb-4 border-b border-secondary/10 pb-2">Price Breakdown</h4>

                                        <div className="flex justify-between text-sm">
                                            <span className="text-secondary/60">₹{selectedProduct.dailyRate} x {pricing.diffDays} Days</span>
                                            <span className="font-bold text-secondary">₹{pricing.rentalTotal}</span>
                                        </div>

                                        <div className="flex justify-between text-sm">
                                            <div className="flex items-center gap-2">
                                                <span className="text-secondary/60">Refundable Security Deposit</span>
                                                <div className="group relative">
                                                    <Info size={12} className="text-primary cursor-help" />
                                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-secondary text-cream text-[9px] p-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 font-medium tracking-wide">
                                                        The security deposit is frozen on your card and fully refunded within 24h of item return inspection.
                                                    </div>
                                                </div>
                                            </div>
                                            <span className="font-bold text-secondary">₹{pricing.deposit}</span>
                                        </div>

                                        <div className="pt-4 border-t-2 border-primary/20 flex justify-between items-end">
                                            <div>
                                                <span className="block text-[10px] uppercase font-bold tracking-widest text-primary">Total Payable Today</span>
                                                <div className="flex items-center gap-2">
                                                    <Shield size={14} className="text-primary" />
                                                    <span className="text-[9px] text-primary font-bold uppercase tracking-tight italic">100% Refundable Deposit Included</span>
                                                </div>
                                            </div>
                                            <span className="text-3xl font-bold text-secondary">₹{pricing.finalTotal}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-primary/5 p-8 text-center mb-10 flex flex-col items-center gap-3">
                                        <Calendar size={24} className="text-primary opacity-40" />
                                        <p className="text-xs text-primary/60 font-medium">Please select dates to view pricing and availability.</p>
                                    </div>
                                )}

                                <button
                                    disabled={!pricing}
                                    onClick={handleBooking}
                                    className={`w-full py-5 rounded-none text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-xl ${pricing
                                        ? 'bg-primary text-white hover:bg-primary/90'
                                        : 'bg-secondary/10 text-secondary/30 cursor-not-allowed'
                                        }`}
                                >
                                    <Zap size={16} /> Confirm Reservation
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* FAQ/Info Section */}
                <div className="mt-24 p-12 bg-secondary text-cream flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/2">
                        <h2 className="text-3xl font-bold tracking-tight mb-4 tracking-tighter">Arena Access Protocol</h2>
                        <p className="text-cream/60 text-sm leading-relaxed mb-6 font-medium italic">
                            "We provide the elite equipment, you provide the performance. High-ticket items managed with transparency."
                        </p>
                        <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                            <Shield size={16} />
                            <span>Full Damage Waiver Included</span>
                        </div>
                    </div>
                    <div className="md:w-1/2 grid grid-cols-2 gap-4">
                        <div className="bg-cream/5 p-8 border border-cream/10 flex flex-col gap-2">
                            <span className="block text-2xl font-bold">100%</span>
                            <span className="text-[10px] uppercase tracking-widest opacity-40 font-bold">Deposit Refund Ratio</span>
                        </div>
                        <div className="bg-cream/5 p-8 border border-cream/10 flex flex-col gap-2 text-primary">
                            <Zap size={24} />
                            <span className="text-[10px] uppercase tracking-widest opacity-100 font-bold">Instant Campus Hub Pickup</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Access;
