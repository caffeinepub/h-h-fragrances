import { useEffect } from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import EssenceSection from './components/EssenceSection';
import FragranceNotes from './components/FragranceNotes';
import SignatureCollection from './components/SignatureCollection';
import BrandPhilosophy from './components/BrandPhilosophy';
import EndingSection from './components/EndingSection';
import ScrollProgress from './components/ScrollProgress';
import SoundToggle from './components/SoundToggle';

function App() {
    useEffect(() => {
        // Enable smooth scrolling
        document.documentElement.style.scrollBehavior = 'smooth';
        
        return () => {
            document.documentElement.style.scrollBehavior = 'auto';
        };
    }, []);

    return (
        <div className="relative bg-black text-ivory overflow-x-hidden">
            <Navigation />
            <ScrollProgress />
            <SoundToggle />
            
            <main>
                <HeroSection />
                <EssenceSection />
                <FragranceNotes />
                <SignatureCollection />
                <BrandPhilosophy />
                <EndingSection />
            </main>
        </div>
    );
}

export default App;
