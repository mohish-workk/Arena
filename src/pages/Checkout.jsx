import { useLocation, Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, CreditCard, Lock, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { product } = location.state || {};
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    if (!product) {
        return (
            <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-8">
                <h2 className="text-2xl font-bold text-secondary mb-4">No product selected.</h2>
                <Link to="/loop" className="text-primary font-bold uppercase tracking-widest text-[10px] hover:underline">Back to Loop</Link>
            </div>
        );
    }

    const handlePayment = (e) => {
        e.preventDefault();
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
        }, 2000);
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-cream flex items-center justify-center px-8">
                <div className="max-w-md w-full bg-white border border-secondary/5 p-12 text-center shadow-2xl">
                    <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 size={40} />
                    </div>
                    <h1 className="text-3xl font-bold text-secondary mb-4 tracking-tight">Order Confirmed</h1>
                    <p className="text-secondary/50 text-sm leading-relaxed mb-10">
                        Thank you for your purchase. Your order for the <span className="text-secondary font-bold">{product.name}</span> has been successfully placed.
                    </p>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="w-full bg-primary text-cream py-5 text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl hover:bg-primary/90 transition-all"
                    >
                        Go to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-cream min-h-screen pt-12 pb-24">
            <div className="max-w-7xl mx-auto px-8">
                <header className="mb-12">
                    <Link to="/loop" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-secondary/40 hover:text-secondary transition-colors mb-8">
                        <ArrowLeft size={14} /> Back to Loop
                    </Link>
                    <h1 className="text-4xl font-bold tracking-tight text-secondary">Secure Checkout</h1>
                    <p className="text-secondary/50 mt-2 italic font-medium">Finalizing your Student-to-Student transaction.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Form Side */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white border border-secondary/5 p-8 sm:p-12">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-secondary mb-8 border-b border-secondary/10 pb-4">Payment Details</h3>
                            <form onSubmit={handlePayment} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-bold tracking-widest text-secondary/40">Cardholder Name</label>
                                    <input type="text" required placeholder="Mohish Padave" className="w-full bg-cream border border-secondary/5 p-4 text-sm outline-none focus:border-primary transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-bold tracking-widest text-secondary/40">Card Number</label>
                                    <div className="relative">
                                        <input type="text" required placeholder="0000 0000 0000 0000" className="w-full bg-cream border border-secondary/5 p-4 text-sm outline-none focus:border-primary transition-colors pl-12" />
                                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/20" size={18} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase font-bold tracking-widest text-secondary/40">Expiry Date</label>
                                        <input type="text" required placeholder="MM/YY" className="w-full bg-cream border border-secondary/5 p-4 text-sm outline-none focus:border-primary transition-colors" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase font-bold tracking-widest text-secondary/40">CVV</label>
                                        <input type="text" required placeholder="•••" className="w-full bg-cream border border-secondary/5 p-4 text-sm outline-none focus:border-primary transition-colors" />
                                    </div>
                                </div>

                                <div className="pt-6">
                                    <button
                                        disabled={isProcessing}
                                        className="w-full bg-primary text-cream py-5 text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-3"
                                    >
                                        {isProcessing ? 'Processing...' : (
                                            <>
                                                <Lock size={16} /> Pay ₹{product.depreciatedPrice} Securely
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Summary Side */}
                    <div className="space-y-8">
                        <div className="bg-secondary text-cream p-8 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 -mr-16 -mt-16 rounded-full opacity-20"></div>
                            <h3 className="text-[10px] uppercase tracking-widest opacity-40 font-bold mb-8 italic">Order Summary</h3>

                            <div className="flex gap-4 mb-8">
                                <div className="w-20 h-20 bg-cream/5 border border-cream/10 overflow-hidden shrink-0">
                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover grayscale-[0.2]" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold tracking-tight mb-1">{product.name}</h4>
                                    <span className="text-[9px] px-2 py-0.5 bg-primary text-cream uppercase tracking-widest font-bold">Resale</span>
                                </div>
                            </div>

                            <div className="space-y-4 pt-6 border-t border-cream/5">
                                <div className="flex justify-between text-xs">
                                    <span className="opacity-40">Purchase Price</span>
                                    <span className="font-bold">₹{product.depreciatedPrice}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="opacity-40">Arena Service Fee</span>
                                    <span className="font-bold">₹0</span>
                                </div>
                                <div className="flex justify-between items-end pt-6 border-t-2 border-primary/20">
                                    <span className="text-[10px] uppercase font-bold tracking-widest text-primary">Total Amount</span>
                                    <span className="text-3xl font-bold tracking-tighter">₹{product.depreciatedPrice}</span>
                                </div>
                            </div>

                            <div className="mt-12 flex items-center gap-2 text-primary/60 text-[9px] font-bold uppercase tracking-[0.15em]">
                                <ShieldCheck size={14} />
                                Trust Protocol Guaranteed
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
