import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, CreditCard, Lock, CheckCircle2, Download } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useErpCrm } from '../context/ErpCrmContext';
import { jsPDF } from 'jspdf';

const Checkout = () => {
    const navigate = useNavigate();
    const { cartItems, cartTotal, clearCart } = useCart();
    const { processCartCheckout } = useErpCrm();
    const { getRedeemableValue, redeemCredits, arenaCredits } = useAuth();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [purchaseSummary, setPurchaseSummary] = useState([]); // Store what was bought for PDF
    const [purchaseTotal, setPurchaseTotal] = useState(0);
    const [redeemedRupees, setRedeemedRupees] = useState(0);
    const [netTotal, setNetTotal] = useState(cartTotal);
    const [billingDetails, setBillingDetails] = useState({
        name: 'Mohish Padave',
        email: 'mohish.padave@ves.ac.in',
        phone: '9999999999'
    });

    useEffect(() => {
        const maxRedeem = Math.min(cartTotal, getRedeemableValue());
        if (redeemedRupees > maxRedeem) {
            setRedeemedRupees(maxRedeem);
        }
        setNetTotal(cartTotal - redeemedRupees);
    }, [cartTotal, redeemedRupees, getRedeemableValue]);

    // If cart is empty and not in success state, redirect or show message
    if (cartItems.length === 0 && !isSuccess) {
        return (
            <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-8">
                <h2 className="text-2xl font-bold text-secondary mb-4">Your cart is empty.</h2>
                <div className="flex gap-4">
                    <Link to="/retail" className="text-primary font-bold uppercase tracking-widest text-[10px] hover:underline">Shop Retail</Link>
                    <Link to="/loop" className="text-primary font-bold uppercase tracking-widest text-[10px] hover:underline">Shop Loop</Link>
                </div>
            </div>
        );
    }

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        const res = await loadRazorpayScript();

        if (!res) {
            alert('Razorpay SDK failed to load. Are you offline?');
            setIsProcessing(false);
            return;
        }

        // Save state for receipt before clearing cart
        setPurchaseSummary([...cartItems]);
        setPurchaseTotal(netTotal);

        // Redeem credits before payment
        if (redeemedRupees > 0) {
            const success = redeemCredits(redeemedRupees);
            if (!success) {
                alert('Insufficient credits!');
                setIsProcessing(false);
                return;
            }
        }

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_SBjSdHKEo2wOh6", // Use the Key ID from env variables
            amount: netTotal * 100, // Amount is in currency subunits. 
            currency: "INR",
            name: "Arena One",
            description: "Premium Student Gear Platform",
            handler: function () {
                setIsProcessing(false);
                setIsSuccess(true);
                processCartCheckout(billingDetails.email, billingDetails.name, cartItems, netTotal);
                clearCart();
            },
            prefill: {
                name: billingDetails.name,
                email: billingDetails.email,
                contact: billingDetails.phone
            },
            theme: {
                color: "#1a3c34"
            }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.on('payment.failed', function (response) {
            alert(`Payment failed: ${response.error.description}`);
            setIsProcessing(false);
        });

        paymentObject.open();
    };

    const downloadInvoice = () => {
        const doc = new jsPDF();

        // Header
        doc.setFontSize(22);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(26, 60, 52); // Secondary color
        doc.text("ARENA ONE", 105, 20, null, null, "center");

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(150, 150, 150);
        doc.text("Premium Student Gear Platform", 105, 28, null, null, "center");

        // Separator
        doc.setDrawColor(200, 200, 200);
        doc.line(20, 35, 190, 35);

        // Order Info
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        const dateStr = new Date().toLocaleDateString('en-IN', {
            day: 'numeric', month: 'long', year: 'numeric'
        });
        doc.text(`Date: ${dateStr}`, 20, 50);
        doc.text(`Order ID: ARN-${Math.floor(Math.random() * 1000000)}`, 140, 50);

        // Items Header
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.text("Item", 20, 70);
        doc.text("Qty", 140, 70);
        doc.text("Price", 170, 70);

        doc.line(20, 75, 190, 75);

        // Items List
        doc.setFont("helvetica", "normal");
        let yPos = 85;
        purchaseSummary.forEach((item) => {
            doc.text(item.name.substring(0, 50), 20, yPos);
            doc.text(item.quantity.toString(), 145, yPos);
            doc.text(`Rs ${item.cartPrice * item.quantity}`, 170, yPos);
            yPos += 10;
        });

        // Total
        doc.line(20, yPos, 190, yPos);
        yPos += 10;
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("Total Amount:", 120, yPos);
        doc.text(`Rs ${purchaseTotal}`, 170, yPos);

        // Footer
        doc.setFontSize(10);
        doc.setFont("helvetica", "italic");
        doc.setTextColor(100, 100, 100);
        doc.text("Thank you for choosing Arena One.", 105, yPos + 30, null, null, "center");

        doc.save("arena-one-invoice.pdf");
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-cream flex items-center justify-center px-8">
                <div className="max-w-md w-full bg-white border border-secondary/5 p-12 text-center shadow-2xl">
                    <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 size={40} />
                    </div>
                    <h1 className="text-3xl font-bold text-secondary mb-4 tracking-tight">Payment Successful</h1>
                    <p className="text-secondary/50 text-sm leading-relaxed mb-8">
                        Your order for {purchaseSummary.length} item(s) has been confirmed.
                        Total paid: <span className="font-bold text-secondary">₹{purchaseTotal}</span>.
                    </p>
                    <div className="space-y-4">
                        <button
                            onClick={downloadInvoice}
                            className="w-full bg-transparent border-2 border-primary text-primary py-5 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
                        >
                            <Download size={16} /> Download Invoice
                        </button>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="w-full bg-primary text-cream py-5 text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl hover:bg-primary/90 transition-all"
                        >
                            Go to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-cream min-h-screen pt-12 pb-24 relative">
            <div className="max-w-7xl mx-auto px-8">
                <header className="mb-12">
                    <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-secondary/40 hover:text-secondary transition-colors mb-8">
                        <ArrowLeft size={14} /> Back
                    </button>
                    <h1 className="text-4xl font-bold tracking-tight text-secondary">Secure Checkout</h1>
                    <p className="text-secondary/50 mt-2 italic font-medium">Finalizing your order via Dummy Razorpay.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
                    {/* Form Side */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white border border-secondary/5 p-8 sm:p-12">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-secondary mb-8 border-b border-secondary/10 pb-4">Razorpay Test Environment</h3>
                            <form onSubmit={handlePayment} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-bold tracking-widest text-secondary/40">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={billingDetails.name}
                                        onChange={(e) => setBillingDetails({ ...billingDetails, name: e.target.value })}
                                        className="w-full bg-cream border border-secondary/5 p-4 text-sm outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-bold tracking-widest text-secondary/40">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        value={billingDetails.email}
                                        onChange={(e) => setBillingDetails({ ...billingDetails, email: e.target.value })}
                                        className="w-full bg-cream border border-secondary/5 p-4 text-sm outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-bold tracking-widest text-secondary/40">Phone Number</label>
                                    <input
                                        type="tel"
                                        required
                                        value={billingDetails.phone}
                                        onChange={(e) => setBillingDetails({ ...billingDetails, phone: e.target.value })}
                                        className="w-full bg-cream border border-secondary/5 p-4 text-sm outline-none focus:border-primary transition-colors"
                                    />
                                </div>

<div className="mb-6 p-4 bg-cream/50 rounded-lg border border-secondary/10">
                                    <div className="flex justify-between text-xs text-secondary/60 mb-2">
                                        <span>Arena Credits Available</span>
                                        <span>₹{getRedeemableValue()}</span>
                                    </div>
                                    <input 
                                        type="range" 
                                        min="0" 
                                        max={Math.min(cartTotal, getRedeemableValue())}
                                        value={redeemedRupees}
                                        onChange={(e) => setRedeemedRupees(Number(e.target.value))}
                                        className="w-full h-2 bg-secondary/20 rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                    <div className="flex justify-between text-xs font-bold mt-2">
                                        <span>₹0</span>
                                        <span>₹{redeemedRupees}</span>
                                        <span className="max-w-[60px]">Max</span>
                                    </div>
                                    {redeemedRupees > 0 && (
                                        <div className="text-[9px] text-green-600 font-bold uppercase tracking-wider mt-1 text-center">
                                            Saving ₹{redeemedRupees} today!
                                        </div>
                                    )}
                                </div>
                                <div className="pt-6">
                                    <button
                                        disabled={isProcessing}
                                        className="w-full bg-[#3399cc] text-cream py-5 text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl hover:bg-[#2b82ad] transition-all flex items-center justify-center gap-3 relative overflow-hidden group"
                                    >
                                        {isProcessing ? (
                                            <span className="flex items-center gap-2">
                                                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Verifying Payment...
                                            </span>
                                        ) : (
                                            <>
                                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                                <Lock size={16} className="relative z-10" />
                                                <span className="relative z-10">Pay ₹{netTotal} via Razorpay</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Summary Side - Lists all Cart Items */}
                    <div className="space-y-8">
                        <div className="bg-secondary text-cream p-8 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 -mr-16 -mt-16 rounded-full opacity-20"></div>
                            <h3 className="text-[10px] uppercase tracking-widest opacity-40 font-bold mb-8 italic">Order Summary</h3>

                            <div className="max-h-64 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
                                {cartItems.map((item, index) => (
                                    <div key={item.id + index} className="flex gap-4 pb-4 border-b border-cream/5 last:border-0">
                                        <div className="w-16 h-16 bg-cream/5 border border-cream/10 overflow-hidden shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale-[0.2]" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-xs font-bold tracking-tight mb-1 line-clamp-1">{item.name}</h4>
                                            <div className="flex justify-between items-center mt-2 opacity-60 text-[10px]">
                                                <span>Qty: {item.quantity}</span>
                                                <span>₹{item.cartPrice * item.quantity}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 pt-6 mt-4 border-t border-cream/5">
                                <div className="flex justify-between text-xs">
                                    <span className="opacity-40">Subtotal</span>
                                    <span className="font-bold">₹{cartTotal}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="opacity-40">Taxes & Fees</span>
                                    <span className="font-bold">₹0</span>
                                </div>
                                {redeemedRupees > 0 && (
                                    <div className="flex justify-between text-xs text-green-600 font-bold">
                                        <span>Arena Credits Redeemed</span>
                                        <span>-₹{redeemedRupees}</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-end pt-6 border-t-2 border-primary/20">
                                    <span className="text-[10px] uppercase font-bold tracking-widest text-primary">Total Amount</span>
                                    <span className="text-3xl font-bold tracking-tighter">₹{netTotal}</span>
                                </div>
                            </div>

                            <div className="mt-12 flex items-center justify-between text-primary/60 text-[9px] font-bold uppercase tracking-[0.15em]">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck size={14} /> Set Security
                                </div>
                                <span>Powered by DummyRazorpay</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Razorpay decorative absolute element */}
                <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-[#3399cc]/5 to-transparent rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none z-0"></div>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 4px;
                }
            `}</style>
        </div>
    );
};

export default Checkout;
