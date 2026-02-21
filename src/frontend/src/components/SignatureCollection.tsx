import { useRef, useEffect, useState } from 'react';
import BottleCard from './BottleCard';

const bottles = [
    {
        name: 'Noir Éternel',
        description: 'A midnight symphony of oud and leather',
        image: '/assets/generated/collection-bottle-1.dim_400x600.png',
    },
    {
        name: 'Lumière Dorée',
        description: 'Golden warmth wrapped in amber and vanilla',
        image: '/assets/generated/collection-bottle-2.dim_400x600.png',
    },
    {
        name: 'Rose Mystique',
        description: 'Timeless elegance in every precious drop',
        image: '/assets/generated/collection-bottle-3.dim_400x600.png',
    },
];

export default function SignatureCollection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current || !containerRef.current) return;

            const rect = sectionRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            
            // Calculate how far through the section we've scrolled
            const sectionTop = rect.top;
            const sectionHeight = rect.height;
            
            if (sectionTop <= 0 && sectionTop > -sectionHeight + viewportHeight) {
                const progress = Math.abs(sectionTop) / (sectionHeight - viewportHeight);
                setScrollProgress(Math.max(0, Math.min(1, progress)));
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section
            ref={sectionRef}
            id="collection"
            className="relative min-h-[200vh] bg-black"
        >
            <div className="sticky top-0 h-screen overflow-hidden">
                <div className="absolute top-12 left-6 md:left-12 z-10">
                    <p className="text-deepGold text-sm tracking-[0.3em] uppercase mb-2">
                        Signature Collection
                    </p>
                    <h2 className="font-serif text-4xl md:text-6xl text-ivory">
                        Our Masterpieces
                    </h2>
                </div>

                <div className="h-full flex items-center overflow-x-hidden pt-48 px-6 md:px-12">
                    <div
                        ref={containerRef}
                        className="flex gap-12 transition-transform duration-300 ease-out"
                        style={{
                            transform: `translateX(-${scrollProgress * 50}%)`,
                        }}
                    >
                        {bottles.map((bottle, index) => (
                            <BottleCard
                                key={index}
                                name={bottle.name}
                                description={bottle.description}
                                image={bottle.image}
                                index={index}
                                scrollProgress={scrollProgress}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
