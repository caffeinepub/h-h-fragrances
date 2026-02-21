import { useEffect, useState } from 'react';

export default function ScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = window.scrollY;
            const progress = (scrolled / scrollHeight) * 100;
            setProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 h-64 w-px bg-ivory/10">
            <div
                className="w-full bg-deepGold transition-all duration-300 ease-out"
                style={{ height: `${progress}%` }}
            />
        </div>
    );
}
