import { useState } from 'react';

interface IngredientVisualProps {
    src: string;
    alt: string;
}

export default function IngredientVisual({ src, alt }: IngredientVisualProps) {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="relative aspect-square rounded-lg overflow-hidden">
            <img
                src={src}
                alt={alt}
                className={`w-full h-full object-cover transition-all duration-1000 ${
                    loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                onLoad={() => setLoaded(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
    );
}
