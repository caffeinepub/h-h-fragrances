import { useRef, useEffect, useState } from 'react';

export default function EssenceSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const subtextRef = useRef<HTMLParagraphElement>(null);
    const [headlineProgress, setHeadlineProgress] = useState(0);
    const [subtextProgress, setSubtextProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current || !headlineRef.current || !subtextRef.current) return;

            const rect = sectionRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            
            // Trigger when section enters viewport
            const headlineStart = viewportHeight * 0.7;
            const headlineEnd = viewportHeight * 0.3;
            const headlineProg = Math.max(0, Math.min(1, (headlineStart - rect.top) / (headlineStart - headlineEnd)));
            setHeadlineProgress(headlineProg);

            const subtextStart = viewportHeight * 0.6;
            const subtextEnd = viewportHeight * 0.2;
            const subtextProg = Math.max(0, Math.min(1, (subtextStart - rect.top) / (subtextStart - subtextEnd)));
            setSubtextProgress(subtextProg);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section
            ref={sectionRef}
            id="essence"
            className="relative min-h-screen bg-ivory flex items-center justify-center py-32 px-6"
        >
            <div className="absolute inset-0 bg-gradient-to-b from-ivory via-ivory to-ivory/95" />
            
            <div className="relative max-w-4xl mx-auto text-center">
                <h2
                    ref={headlineRef}
                    className="font-serif text-5xl md:text-7xl lg:text-8xl text-black mb-12 tracking-tight leading-tight transition-all duration-700"
                    style={{
                        opacity: headlineProgress,
                        transform: `translateY(${(1 - headlineProgress) * 100}px)`,
                    }}
                >
                    Crafted for Presence
                </h2>
                
                <p
                    ref={subtextRef}
                    className="text-black/70 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto tracking-wide transition-all duration-700"
                    style={{
                        opacity: subtextProgress,
                        transform: `translateY(${(1 - subtextProgress) * 80}px)`,
                    }}
                >
                    Each fragrance is a journey through time and memory, meticulously composed
                    to evoke emotion and leave an indelible mark. We blend the finest ingredients
                    with artisanal precision, creating scents that transcend the ordinary and
                    become part of your story.
                </p>
            </div>
        </section>
    );
}
