import { useRef, useEffect, useState } from 'react';

export default function BrandPhilosophy() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current || !contentRef.current) return;

            const rect = sectionRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            
            const start = viewportHeight * 0.6;
            const end = viewportHeight * 0.2;
            const prog = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));
            setProgress(prog);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen flex items-center justify-center py-32 px-6 overflow-hidden"
        >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-deepGold/10 to-black animate-gradient" />
            
            <div
                ref={contentRef}
                className="relative max-w-4xl mx-auto text-center z-10 transition-all duration-700"
                style={{
                    opacity: progress,
                    transform: `translateY(${(1 - progress) * 100}px)`,
                }}
            >
                <h2 className="font-serif text-5xl md:text-7xl text-ivory mb-12 leading-tight">
                    The Art of Olfactory Storytelling
                </h2>
                
                <p className="text-ivory/70 text-xl md:text-2xl leading-relaxed mb-8">
                    We believe fragrance is more than scent—it's memory, emotion, and identity
                    distilled into liquid form.
                </p>
                
                <p className="text-ivory/60 text-lg leading-relaxed max-w-2xl mx-auto">
                    Every bottle represents years of exploration, sourcing the rarest ingredients
                    from around the world, and perfecting the balance between tradition and innovation.
                    This is not just perfume. This is your signature.
                </p>
            </div>
        </section>
    );
}
