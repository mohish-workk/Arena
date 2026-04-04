import { useState } from 'react';
import { User, Package, CreditCard, Heart, CheckCircle2, QrCode, ArrowRight, History, ShoppingBag, Database } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import DOMPurify from 'dompurify';
import AdminInventoryLedger from '../components/AdminInventoryLedger';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('Rentals');
    const { user } = useAuth();
    
    // Sanitize user data before rendering to prevent DOM-based XSS
    const safeName = DOMPurify.sanitize(user?.name || 'Arena User');
    const safeEmail = DOMPurify.sanitize(user?.email || 'user@ves.ac.in');

    const tabs = ['Rentals', 'Listings', 'History', 'Inventory'];

    return (
        <div className="bg-cream min-h-screen pt-12 pb-24">
            <div className="max-w-7xl mx-auto px-8">

                {/* User Header */}
                <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center text-cream">
                            <User size={40} />
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h1 className="text-3xl font-bold tracking-tight text-secondary" dangerouslySetInnerHTML={{ __html: safeName }}></h1>
                                <span className="flex items-center gap-1 bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 uppercase tracking-widest border border-primary/20">
                                    <CheckCircle2 size={10} />
                                    Fully Verified
                                </span>
                            </div>
                            <p className="text-secondary/40 text-sm font-medium italic" dangerouslySetInnerHTML={{ __html: safeEmail }}></p>
                        </div>
                    </div>
                    <button className="bg-secondary text-cream px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-all shadow-lg">
                        Edit Profile
                    </button>
                </header>

                {/* Arena Credits Wallet */}
                <div className="bg-primary p-8 md:p-12 mb-12 md:mb-16 relative overflow-hidden group shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-cream/5 -mr-20 -mt-20 rounded-full group-hover:bg-cream/10 transition-colors"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-cream/5 -ml-10 -mb-10 rounded-full group-hover:bg-cream/10 transition-colors"></div>

                    <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <CreditCard className="text-primary-light" size={20} />
                                <span className="text-[10px] uppercase tracking-[0.3em] text-cream/60 font-bold">Arena Credits Wallet</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold text-cream tracking-tight">₹ 1,250 <span className="text-xl font-normal opacity-40">Credits</span></h2>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="w-full sm:w-auto bg-cream text-primary px-10 py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-cream/90 transition-all shadow-xl">
                                Top Up
                            </button>
                            <button 
                            className="w-full sm:w-auto bg-transparent border border-cream/20 text-cream px-10 py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-cream hover:text-primary transition-all">
                                <a href="./retail">Redeem</a>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Unified Tabbed Interface */}
                <div className="bg-white border border-secondary/5 min-h-[600px] flex flex-col">
                    <div className="flex border-b border-secondary/5 overflow-x-auto no-scrollbar">
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-grow md:flex-none md:px-12 py-6 text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative whitespace-nowrap ${activeTab === tab
                                    ? 'text-primary'
                                    : 'text-secondary/30 hover:text-secondary'
                                    }`}
                            >
                                {tab === 'Rentals' && 'Active Rentals'}
                                {/* {tab === 'Listings' && 'My Loop Listings'} */}
                                {tab === 'History' && 'Order History'}
                                {/* {tab === 'Inventory' && <span className="flex items-center gap-2"><Database size={12} /> Asset Ledger</span>} */}
                                {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary"></div>}
                            </button>
                        ))}
                    </div>

                    <div className="p-0 flex-grow">
                        {activeTab === 'Rentals' && (
                            <div className="p-8 md:p-12 animate-in fade-in duration-500">
                                <div className="bg-cream p-8 flex flex-col md:flex-row items-center gap-8 group hover:bg-white border border-transparent hover:border-secondary/5 transition-all">
                                    <div className="w-full md:w-32 aspect-square bg-secondary/5 overflow-hidden">
                                        <img src="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&q=80&w=300" alt="Quechua Tent" className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700" />
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-[9px] font-bold px-2 py-0.5 bg-primary text-cream uppercase tracking-widest">Ongoing</span>
                                            <span className="text-[10px] text-secondary/40 font-bold uppercase tracking-widest flex items-center gap-1">
                                                <History size={12} /> Return in 2 Days
                                            </span>
                                        </div>
                                        <h4 className="text-xl font-bold text-secondary mb-2">Quechua 3-Person Explorer Tent</h4>
                                        <p className="text-xs text-secondary/50 font-medium">Booked for 5 days. Deposit will be released upon return.</p>
                                    </div>
                                    <button className="bg-secondary text-cream py-4 px-8 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-primary transition-all whitespace-nowrap">
                                        <QrCode size={16} /> Generate Return QR
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Listings' && (
                            <div className="p-8 md:p-12 animate-in fade-in duration-500 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="border border-secondary/5 p-6 hover:border-primary/20 transition-all group">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-16 h-16 bg-cream overflow-hidden">
                                            <img src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=200" alt="Bat" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                        </div>
                                        <span className="text-[9px] font-bold px-2 py-1 bg-secondary/10 text-secondary uppercase tracking-widest">Unsold</span>
                                    </div>
                                    <h5 className="text-sm font-bold text-secondary mb-1">Grade A Willow Bat</h5>
                                    <p className="text-xs text-primary font-bold mb-4">₹ 4,500</p>
                                    <button className="text-[9px] font-bold uppercase tracking-widest text-secondary/40 hover:text-primary transition-colors flex items-center gap-1">
                                        Edit Listing <ArrowRight size={10} />
                                    </button>
                                </div>
                                <div className="border border-secondary/5 p-6 hover:border-primary/20 transition-all group">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-16 h-16 bg-cream overflow-hidden">
                                            <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=200" alt="Mat" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                        </div>
                                        <span className="text-[9px] font-bold px-2 py-1 bg-primary/10 text-primary uppercase tracking-widest">Offer Pending</span>
                                    </div>
                                    <h5 className="text-sm font-bold text-secondary mb-1">Eco-Grip Yoga Mat</h5>
                                    <p className="text-xs text-primary font-bold mb-4">₹ 1,200</p>
                                    <button className="text-[9px] font-bold uppercase tracking-widest text-primary flex items-center gap-1">
                                        View Offer <ArrowRight size={10} />
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'History' && (
                            <div className="p-8 md:p-12 animate-in fade-in duration-500 space-y-4">
                                {[1, 2, 3].map(item => (
                                    <div key={item} className="flex items-center justify-between p-6 bg-cream/40 border-l-4 border-primary">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-white flex items-center justify-center">
                                                <ShoppingBag size={18} className="text-secondary/20" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-secondary">Premium Cricket Helmet v2.0</p>
                                                <p className="text-[10px] text-secondary/40 font-medium">Purchased on March 0{item}, 2026</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold text-secondary">₹ 2,499</p>
                                            <p className="text-[9px] text-primary font-bold uppercase tracking-tight">Delivered</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'Inventory' && (
                            <div className="animate-in fade-in duration-500 h-full">
                                <AdminInventoryLedger />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
