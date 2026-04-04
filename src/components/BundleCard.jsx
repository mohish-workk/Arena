import { useRef, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

const BundleCard = ({ bundle, onAddToCart }) => {
    const cardRef = useRef(null);
    const btnRef = useRef(null);

    useEffect(() => {
        const card = cardRef.current;
        const btn = btnRef.current;
        
        const enterAnim = () => {
            gsap.to(card, { y: -10, duration: 0.3, ease: 'power2.out', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' });
            gsap.to(btn, { scale: 1.05, duration: 0.2 });
        };
        const leaveAnim = () => {
            gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' });
            gsap.to(btn, { scale: 1, duration: 0.2 });
        };

        card.addEventListener('mouseenter', enterAnim);
        card.addEventListener('mouseleave', leaveAnim);

        return () => {
            card.removeEventListener('mouseenter', enterAnim);
            card.removeEventListener('mouseleave', leaveAnim);
        };
    }, []);

    const handleAddClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        gsap.to(cardRef.current, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });
        if (onAddToCart) onAddToCart(bundle);
    };

    return (
        <Link 
            to={`/bundle/${bundle.id}`}
            ref={cardRef} 
            className="block h-full bg-white border border-secondary/10 flex flex-col transition-all overflow-hidden group"
        >
            <div className="relative aspect-video overflow-hidden bg-cream">
                <img 
                    src={bundle.coverImage} 
                    alt={bundle.name} 
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-primary text-cream text-[10px] uppercase font-bold tracking-widest px-3 py-1">
                    Save {bundle.discountPercentage}%
                </div>
            </div>
            
            <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-2xl font-bold tracking-tight text-secondary mb-2">{bundle.name}</h3>
                
                <p className="text-xs text-primary/60 font-bold uppercase tracking-widest mb-4 h-8 overflow-hidden">
                    Target: {bundle.targetAudience}
                </p>
                
                <div className="mb-6 flex-grow">
                    <h4 className="text-[10px] uppercase tracking-widest text-secondary/40 font-bold mb-3 border-b border-secondary/10 pb-2">Kit Includes</h4>
                    <ul className="space-y-2">
                        {bundle.items.map((item, idx) => (
                            <li key={idx} className="flex justify-between text-[13px] text-secondary/80">
                                <span className="truncate pr-2 font-medium">• {(item.quantity > 1) ? `${item.quantity}x ` : ''}{item.name}</span>
                                <span className="opacity-50 shrink-0">₹{item.dailyRate}/day</span>
                            </li>
                        ))}
                    </ul>
                </div>
                
                <div className="mt-auto border-t border-secondary/10 pt-6">
                    <div className="flex justify-between items-end mb-4">
                        <div>
                            <span className="block text-[10px] uppercase tracking-widest text-secondary/40 font-bold mb-1">Total Daily Rate</span>
                            <span className="text-xs text-secondary/40 line-through font-medium">₹{bundle.originalTotal}/day</span>
                        </div>
                        <div className="text-3xl font-bold text-primary">
                            ₹{bundle.bundlePrice}<span className="text-sm font-normal text-primary/60">/day</span>
                        </div>
                    </div>
                    
                    <button 
                        ref={btnRef}
                        onClick={handleAddClick}
                        className="w-full bg-secondary text-cream py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-primary transition-colors flex items-center justify-center gap-2"
                    >
                        <ShoppingBag size={14} /> Add Kit to Cart
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default BundleCard;
