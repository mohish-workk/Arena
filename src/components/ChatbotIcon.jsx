import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquareText } from 'lucide-react';
import gsap from 'gsap';

const ChatbotIcon = () => {
    const navigate = useNavigate();
    const iconRef = useRef(null);

    useEffect(() => {
        const el = iconRef.current;
        
        // Initial floating animation
        gsap.to(el, {
            y: -10,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        const handleEnter = () => {
            gsap.to(el, { scale: 1.1, duration: 0.3, ease: "back.out(2)" });
        };
        const handleLeave = () => {
            gsap.to(el, { scale: 1, duration: 0.3, ease: "power2.out" });
        };

        el.addEventListener('mouseenter', handleEnter);
        el.addEventListener('mouseleave', handleLeave);

        return () => {
            el.removeEventListener('mouseenter', handleEnter);
            el.removeEventListener('mouseleave', handleLeave);
        };
    }, []);

    return (
        <button
            ref={iconRef}
            onClick={() => navigate('/adventure-generator')}
            className="fixed bottom-10 right-10 z-[9999] bg-primary text-cream p-5 rounded-full shadow-[0_20px_50px_rgba(31,52,48,0.3)] hover:shadow-primary/40 transition-shadow group flex items-center justify-center border border-white/10"
            title="Open Adventure Generator"
        >
            <MessageSquareText size={28} className="group-hover:rotate-12 transition-transform duration-300" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-secondary animate-pulse"></div>
        </button>
    );
};

export default ChatbotIcon;
