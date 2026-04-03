import { useState, useEffect } from 'react';
import gsap from 'gsap';

const words = [
    "Premium Retails.", 
    "Verified Loop.", 
    "Campus Leasing.", 
    "< 2 Hour Delivery.", 
    "ARENA ONE"
];

const Preloader = ({ onComplete }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index === words.length) return;

        const tl = gsap.timeline();

        // Animate the current word
        tl.fromTo('.word-flash', 
            { opacity: 0, scale: 0.8, filter: 'blur(10px)', y: 20 }, 
            { opacity: 1, scale: 1, filter: 'blur(0px)', y: 0, duration: 0.25, ease: "power3.out" }
        )
        .to('.word-flash', {
            opacity: 0, 
            scale: 1.1, 
            filter: 'blur(10px)', 
            y: -20, 
            duration: 0.2, 
            ease: "power2.in", 
            delay: 0.15,
            onComplete: () => {
                if (index < words.length - 1) {
                    setIndex(prev => prev + 1);
                } else {
                    // Once all words have flashed, animate the background wrapper up and off screen
                    gsap.to('.preloader-wrapper', {
                        yPercent: -100,
                        duration: 1,
                        ease: "power4.inOut",
                        delay: 0.1,
                        onComplete: () => {
                            if(onComplete) onComplete();
                        }
                    });
                }
            }
        });

        return () => {
            tl.kill();
        };
    }, [index, onComplete]);

    return (
        <div className="preloader-wrapper fixed inset-0 z-[9999] bg-secondary flex flex-col items-center justify-center text-cream overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-gradient-radial from-primary/10 to-transparent opacity-50"></div>
            
            <h2 className="word-flash text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter uppercase text-center absolute px-4 z-10 w-full">
                <span className={index === words.length - 1 ? "text-primary italic tracking-tight" : "text-cream"}>
                    {words[index]}
                </span>
            </h2>

            <div className="absolute bottom-8 flex flex-col items-center gap-2">
                <div className="w-48 h-[1px] bg-secondary/50 relative overflow-hidden">
                    {/* Simulated loading bar */}
                    <div 
                        className="absolute top-0 left-0 h-full bg-primary transition-all duration-[2000ms] ease-out w-full"
                        style={{ transform: `translateX(-${100 - ((index + 1) / words.length) * 100}%)` }}
                    ></div>
                </div>
                <div className="text-[9px] uppercase tracking-[0.4em] font-bold text-primary animate-pulse">
                    Initiating Protocols...
                </div>
            </div>
        </div>
    );
};

export default Preloader;
