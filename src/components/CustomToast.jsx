import { useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, X } from 'lucide-react';
import gsap from 'gsap';

const CustomToast = () => {
    const { toast, setToast } = useCart();
    const toastRef = useRef(null);

    useEffect(() => {
        if (toast.show) {
            gsap.fromTo(toastRef.current, 
                { y: 50, opacity: 0, scale: 0.9 }, 
                { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
            );
        } else if (toastRef.current) {
            gsap.to(toastRef.current, { y: 20, opacity: 0, scale: 0.9, duration: 0.3, ease: "power2.in" });
        }
    }, [toast.show]);

    if (!toast.show) return null;

    return (
        <div className="fixed bottom-10 left-10 z-[10000] pointer-events-none">
            <div 
                ref={toastRef}
                className="bg-secondary/90 backdrop-blur-xl border border-white/10 p-4 md:p-6 shadow-2xl flex items-center gap-4 min-w-[300px] pointer-events-auto"
            >
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary shrink-0">
                    <CheckCircle2 size={24} />
                </div>
                
                <div className="flex-grow">
                    <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-primary mb-1">System Message</p>
                    <p className="text-cream text-sm font-medium tracking-tight">{toast.message}</p>
                </div>

                <button 
                    onClick={() => setToast(prev => ({ ...prev, show: false }))}
                    className="text-cream/30 hover:text-cream transition-colors p-1"
                >
                    <X size={16} />
                </button>

                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 h-1 bg-primary/30 w-full overflow-hidden">
                    <div 
                        className="h-full bg-primary"
                        style={{
                            animation: 'toast-progress 3s linear forwards'
                        }}
                    ></div>
                </div>
            </div>

            <style>{`
                @keyframes toast-progress {
                    from { width: 100%; }
                    to { width: 0%; }
                }
            `}</style>
        </div>
    );
};

export default CustomToast;
