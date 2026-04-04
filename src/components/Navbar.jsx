import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, User, Search, LogOut, X, Command, ArrowRight, Menu, Plus, Minus, CreditCard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { isLoggedIn, logout, isAdmin } = useAuth();
    const { cartItems, cartCount, isCartOpen, toggleCart, removeFromCart, updateQuantity, cartTotal } = useCart();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Keyboard shortcut to toggle search
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === '/' && !isSearchOpen) {
                e.preventDefault();
                setIsSearchOpen(true);
            }
            if (e.key === 'Escape' && isSearchOpen) {
                setIsSearchOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isSearchOpen]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Retail', path: '/retail' },
        { name: 'Loop', path: '/loop' },
        { name: 'Access', path: '/access' },
    ];

    return (
        <>
            <nav className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md border-b border-primary/10 px-6 md:px-8 py-4 flex items-center">
                {/* Logo Area */}
                <div className="flex-1 flex items-center gap-4">
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="md:hidden text-secondary hover:text-primary transition-colors"
                    >
                        <Menu size={24} />
                    </button>
                    <Link to="/" className="text-xl md:text-2xl font-bold tracking-tighter text-primary">
                        ARENA<span className="text-secondary opacity-50">ONE</span>
                    </Link>
                </div>

                {/* Navigation Links - Centered (Desktop) */}
                <div className="hidden md:flex items-center gap-8 px-6">
                    {navLinks.map(link => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) => `text-[10px] uppercase font-bold tracking-widest transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-secondary/40'}`}
                        >
                            {link.name}
                        </NavLink>
                    ))}
                    {isLoggedIn && (
                        <NavLink to="/dashboard" className={({ isActive }) => `text-[10px] uppercase font-bold tracking-widest transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-secondary/40'}`}>Dashboard</NavLink>
                    )}
                    {isLoggedIn && isAdmin && (
                        <NavLink to="/admin/dashboard" className={({ isActive }) => `text-[10px] uppercase font-bold tracking-widest transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-secondary/40'}`}>Admin</NavLink>
                    )}
                </div>

                {/* Utility Area */}
                <div className="flex-1 flex items-center justify-end gap-3 md:gap-5">
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        title="Search (/)"
                        className="text-secondary/60 hover:text-primary transition-colors flex items-center gap-2"
                    >
                        <Search size={18} />
                        <span className="hidden lg:block text-[9px] font-bold opacity-30 uppercase tracking-widest">Type /</span>
                    </button>
                    <button onClick={toggleCart} title="Cart" className="text-secondary/60 hover:text-primary transition-colors relative">
                        <ShoppingCart size={18} md:size={20} />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-primary text-cream text-[8px] md:text-[10px] w-3.5 h-3.5 md:w-4 md:h-4 rounded-full flex items-center justify-center font-bold">
                                {cartCount}
                            </span>
                        )}
                    </button>
                    {isLoggedIn ? (
                        <div className="hidden md:flex items-center gap-4">
                            <Link to="/dashboard" title="Dashboard" className="text-secondary/60 hover:text-primary transition-colors">
                                <User size={20} />
                            </Link>
                            <button
                                onClick={logout}
                                title="Logout"
                                className="text-secondary/60 hover:text-primary transition-colors"
                            >
                                <LogOut size={20} />
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" title="Login" className="hidden md:block text-[10px] font-bold uppercase tracking-widest text-primary hover:opacity-70 transition-opacity">
                            Sign In
                        </Link>
                    )}

                    {/* Compact Sign In for Mobile */}
                    {!isLoggedIn && (
                        <Link to="/login" className="md:hidden text-secondary/60">
                            <User size={20} />
                        </Link>
                    )}
                </div>
            </nav>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[110] md:hidden">
                    <div className="absolute inset-0 bg-secondary/20 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
                    <div className="absolute top-0 left-0 bottom-0 w-[80%] max-w-sm bg-cream shadow-2xl animate-in slide-in-from-left duration-500">
                        <div className="p-8 flex flex-col h-full">
                            <div className="flex items-center justify-between mb-16">
                                <span className="text-xl font-bold tracking-tighter text-primary">
                                    ARENA<span className="text-secondary opacity-50">ONE</span>
                                </span>
                                <button onClick={() => setIsMobileMenuOpen(false)} className="text-secondary/40">
                                    <X size={24} />
                                </button>
                            </div>

                            <nav className="flex flex-col gap-8">
                                {navLinks.map(link => (
                                    <NavLink
                                        key={link.path}
                                        to={link.path}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={({ isActive }) => `text-2xl font-bold tracking-tight uppercase italic transition-all ${isActive ? 'text-primary' : 'text-secondary/40 hover:text-secondary'}`}
                                    >
                                        {link.name}
                                    </NavLink>
                                ))}
                                {isLoggedIn && (
                                    <NavLink
                                        to="/dashboard"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={({ isActive }) => `text-2xl font-bold tracking-tight uppercase italic transition-all ${isActive ? 'text-primary' : 'text-secondary/40'}`}
                                    >
                                        Dashboard
                                    </NavLink>
                                )}
                            </nav>

                            <div className="mt-auto pt-12 border-t border-secondary/5">
                                {isLoggedIn ? (
                                    <button
                                        onClick={() => {
                                            logout();
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="w-full bg-secondary text-cream py-4 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2"
                                    >
                                        <LogOut size={16} /> Sign Out
                                    </button>
                                ) : (
                                    <Link
                                        to="/login"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="w-full bg-primary text-cream py-4 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center"
                                    >
                                        Sign In
                                    </Link>
                                )}
                                <p className="text-center mt-6 text-[10px] uppercase tracking-widest font-bold text-secondary/20">Elite Campus Network</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Search Overlay */}
            {isSearchOpen && (
                <div className="fixed inset-0 z-[100] bg-cream/95 backdrop-blur-xl animate-in fade-in duration-300">
                    <div className="max-w-4xl mx-auto px-8 pt-32">
                        <div className="flex items-center justify-between mb-16">
                            <div className="flex items-center gap-3 text-primary">
                                <Command size={20} />
                                <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Command Center</span>
                            </div>
                            <button
                                onClick={() => setIsSearchOpen(false)}
                                className="w-12 h-12 rounded-full border border-secondary/10 flex items-center justify-center hover:bg-secondary hover:text-cream transition-all duration-500"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="relative group">
                            <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-primary opacity-50 group-focus-within:opacity-100 transition-opacity" size={32} />
                            <input
                                autoFocus
                                type="text"
                                placeholder="Search Gear, Loops, or Services..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-transparent border-b-2 border-secondary/5 py-8 pl-14 text-4xl md:text-5xl font-bold text-secondary outline-none focus:border-primary transition-all placeholder:text-secondary/10"
                            />
                        </div>

                        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-16">
                            <div>
                                <p className="text-[10px] uppercase font-bold tracking-widest text-secondary/30 mb-8 flex items-center gap-2">
                                    <ArrowRight size={10} /> Quick Links
                                </p>
                                <div className="space-y-4">
                                    {['Cricket Bats', 'Surfboards', 'Camping Tents', 'Student Listings'].map((item) => (
                                        <button key={item} className="block text-xl font-medium text-secondary/60 hover:text-primary transition-colors">
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-bold tracking-widest text-secondary/30 mb-8 flex items-center gap-2">
                                    <ArrowRight size={10} /> Popular Now
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {['VESIT Verified', 'Rentals', 'Used Gear', 'Zero Waste'].map((tag) => (
                                        <span key={tag} className="px-4 py-2 bg-secondary/5 text-[10px] font-bold uppercase tracking-widest text-secondary/60 hover:bg-primary hover:text-cream transition-all cursor-pointer">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Cart Slide-over */}
            {isCartOpen && (
                <div className="fixed inset-0 z-[120] flex justify-end">
                    <div className="absolute inset-0 bg-secondary/20 backdrop-blur-sm transition-opacity" onClick={toggleCart}></div>
                    <div className="relative w-full max-w-md bg-cream shadow-2xl animate-in slide-in-from-right duration-500 h-full flex flex-col border-l border-secondary/10">
                        {/* Cart Header */}
                        <div className="p-8 border-b border-secondary/5 flex items-center justify-between shrink-0">
                            <div>
                                <h2 className="text-2xl font-bold text-secondary tracking-tight">Your Cart</h2>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-secondary/40">{cartCount} items</p>
                            </div>
                            <button onClick={toggleCart} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-secondary/5 text-secondary/40 hover:text-secondary transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-6">
                            {cartItems.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-secondary/30">
                                    <ShoppingCart size={48} className="mb-4 opacity-50" />
                                    <p className="text-sm font-medium">Your cart is empty</p>
                                </div>
                            ) : (
                                cartItems.map(item => (
                                    <div key={item.id} className="flex gap-4 p-4 bg-white border border-secondary/5 relative group">
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-red-600"
                                        >
                                            <X size={12} />
                                        </button>
                                        <div className="w-20 h-20 bg-cream/50 shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale-[0.2]" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <h4 className="text-sm font-bold text-secondary leading-tight line-clamp-2 pr-4">{item.name}</h4>
                                                <span className="text-[10px] uppercase font-bold tracking-widest text-primary">{item.category || 'Gear'}</span>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                                <span className="font-bold">₹{item.cartPrice}</span>
                                                <div className="flex items-center gap-3 bg-cream px-2 py-1 border border-secondary/5">
                                                    <button onClick={() => updateQuantity(item.id, -1)} className="text-secondary/40 hover:text-secondary">
                                                        <Minus size={12} />
                                                    </button>
                                                    <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, 1)} className="text-secondary/40 hover:text-secondary">
                                                        <Plus size={12} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Cart Footer */}
                        {cartItems.length > 0 && (
                            <div className="p-8 bg-white border-t border-secondary/5 shrink-0">
                                <div className="flex justify-between items-end mb-6">
                                    <span className="text-[10px] uppercase font-bold tracking-widest text-secondary/40">Subtotal</span>
                                    <span className="text-2xl font-bold tracking-tighter text-secondary">₹{cartTotal}</span>
                                </div>
                                <Link
                                    to="/checkout"
                                    onClick={toggleCart}
                                    className="w-full bg-primary text-cream py-5 text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                                >
                                    <CreditCard size={14} /> Checkout Securely
                                </Link>
                                <p className="text-center mt-4 text-[10px] font-bold uppercase tracking-widest text-secondary/30 flex items-center justify-center gap-1">
                                    Taxes calculated at checkout
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
