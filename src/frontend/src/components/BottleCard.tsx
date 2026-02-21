import { useRef, useEffect, useState } from 'react';

interface BottleCardProps {
    name: string;
    description: string;
    image: string;
    index: number;
    scrollProgress: number;
}

export default function BottleCard({ name, description, image, index, scrollProgress }: BottleCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            { threshold: 0.5 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Calculate if this card is centered based on scroll progress
    const cardPosition = index / 3; // 0, 0.33, 0.66
    const isCentered = Math.abs(scrollProgress - cardPosition) < 0.2;

    return (
        <div
            ref={cardRef}
            className={`flex-shrink-0 w-[400px] transition-all duration-700 ${
                isCentered ? 'scale-110' : 'scale-100'
            }`}
        >
            <div className="relative group">
                <div className="aspect-[2/3] overflow-hidden rounded-lg mb-6">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
                
                <h3 className="font-serif text-3xl text-ivory mb-3">{name}</h3>
                <p className="text-ivory/60 text-sm tracking-wide leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
}
