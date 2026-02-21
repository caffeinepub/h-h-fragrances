import { useRef, useEffect, useState } from 'react';

export default function EndingSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const bottleRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const [bottleProgress, setBottleProgress] = useState(1);
    const [headlineProgress, setHeadlineProgress] = useState(0);
    const [ctaProgress, setCtaProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;

            const rect = sectionRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            
            // Bottle fade out
            const bottleStart = viewportHeight * 0.5;
            const bottleEnd = viewportHeight * 0.2;
            const bottleProg = 1 - Math.max(0, Math.min(1, (bottleStart - rect.top) / (bottleStart - bottleEnd)));
            setBottleProgress(bottleProg);

            // Headline fade in
            const headlineStart = viewportHeight * 0.3;
            const headlineEnd = viewportHeight * 0.1;
            const headlineProg = Math.max(0, Math.min(1, (headlineStart - rect.top) / (headlineStart - headlineEnd)));
            setHeadlineProgress(headlineProg);

            // CTA fade in
            const ctaStart = viewportHeight * 0.2;
            const ctaEnd = viewportHeight * 0.05;
            const ctaProg = Math.max(0, Math.min(1, (ctaStart - rect.top) / (ctaStart - ctaEnd)));
            setCtaProgress(ctaProg);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen bg-black flex items-center justify-center py-32 px-6"
        >
            <div className="relative text-center">
                <div
                    ref={bottleRef}
                    className="mb-16 transition-all duration-700"
                    style={{
                        opacity: bottleProgress,
                        transform: `scale(${0.8 + bottleProgress * 0.2})`,
                    }}
                >
                    <img
                        src="/assets/generated/perfume-bottle-hero.dim_800x1200.png"
                        alt="H&H Fragrances Bottle"
                        className="w-48 h-auto mx-auto opacity-50"
                    />
                </div>

                <h2
                    ref={headlineRef}
                    className="font-serif text-5xl md:text-7xl text-ivory mb-12 leading-tight transition-all duration-700"
                    style={{
                        opacity: headlineProgress,
                        transform: `translateY(${(1 - headlineProgress) * 50}px)`,
                    }}
                >
                    Leave a trail that lingers.
                </h2>

                <div
                    ref={ctaRef}
                    className="transition-all duration-700"
                    style={{
                        opacity: ctaProgress,
                        transform: `translateY(${(1 - ctaProgress) * 30}px)`,
                    }}
                >
                    <button className="group relative px-12 py-5 bg-transparent border-2 border-deepGold text-deepGold text-sm tracking-[0.3em] uppercase overflow-hidden transition-all duration-500 hover:text-black">
                        <span className="relative z-10">Explore the Collection</span>
                        <div className="absolute inset-0 bg-deepGold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_30px_rgba(184,134,11,0.6)]" />
                    </button>
                </div>
            </div>

            {/* Footer */}
            <footer className="absolute bottom-8 left-0 right-0 text-center">
                <p className="text-ivory/40 text-sm">
                    © {new Date().getFullYear()} H&H Fragrances. Built with love using{' '}
                    <a
                        href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                            typeof window !== 'undefined' ? window.location.hostname : 'hh-fragrances'
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-deepGold hover:text-deepGold/80 transition-colors"
                    >
                        caffeine.ai
                    </a>
                </p>
            </footer>
        </section>
    );
}
