import { useRef, useEffect, useState } from 'react';
import IngredientVisual from './IngredientVisual';

interface NoteSectionProps {
    type: string;
    title: string;
    description: string;
    ingredients: string[];
    imageSrc: string;
    imageAlt: string;
    isLast?: boolean;
}

export default function NoteSection({
    type,
    title,
    description,
    ingredients,
    imageSrc,
    imageAlt,
    isLast = false,
}: NoteSectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const [contentProgress, setContentProgress] = useState(0);
    const [imageProgress, setImageProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current || !contentRef.current || !imageRef.current) return;

            const rect = sectionRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            
            const start = viewportHeight * 0.7;
            const end = viewportHeight * 0.3;
            const progress = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));
            
            setContentProgress(progress);
            setImageProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            ref={sectionRef}
            className={`relative min-h-screen flex items-center py-32 px-6 ${
                !isLast ? 'border-b border-deepGold/20' : ''
            }`}
        >
            <div className="container mx-auto">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div
                        ref={contentRef}
                        className="transition-all duration-700"
                        style={{
                            opacity: contentProgress,
                            transform: `translateX(${(1 - contentProgress) * -100}px)`,
                        }}
                    >
                        <p className="text-deepGold text-sm tracking-[0.3em] uppercase mb-4">
                            {type}
                        </p>
                        <h3 className="font-serif text-4xl md:text-6xl text-ivory mb-6">
                            {title}
                        </h3>
                        <p className="text-ivory/70 text-lg leading-relaxed mb-8">
                            {description}
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {ingredients.map((ingredient, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 border border-deepGold/30 text-deepGold text-sm tracking-wider"
                                >
                                    {ingredient}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div
                        ref={imageRef}
                        className="transition-all duration-700"
                        style={{
                            opacity: imageProgress,
                            transform: `scale(${0.8 + imageProgress * 0.2})`,
                        }}
                    >
                        <IngredientVisual src={imageSrc} alt={imageAlt} />
                    </div>
                </div>
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-deepGold/20 rounded-full animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${10 + Math.random() * 10}s`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
