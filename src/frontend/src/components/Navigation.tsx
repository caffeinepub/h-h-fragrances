import { useState, useEffect } from 'react';

export default function Navigation() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
                scrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'
            }`}
        >
            <div className="container mx-auto px-6 py-6 flex items-center justify-between">
                <div className="font-serif text-2xl tracking-wider text-deepGold">
                    H&H Fragrances
                </div>
                
                <div className="hidden md:flex items-center gap-8">
                    <a
                        href="#essence"
                        className="text-sm tracking-widest uppercase text-ivory/70 hover:text-deepGold transition-colors duration-500"
                    >
                        Our Story
                    </a>
                    <a
                        href="#notes"
                        className="text-sm tracking-widest uppercase text-ivory/70 hover:text-deepGold transition-colors duration-500"
                    >
                        Notes
                    </a>
                    <a
                        href="#collection"
                        className="text-sm tracking-widest uppercase text-ivory/70 hover:text-deepGold transition-colors duration-500"
                    >
                        Collection
                    </a>
                </div>
            </div>
        </nav>
    );
}
