import { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import PerfumeBottle3D from './PerfumeBottle3D';
import FloatingParticles from './FloatingParticles';
import MistSpray from './MistSpray';
import { useSound } from '../hooks/useSound';

export default function HeroSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [rotationProgress, setRotationProgress] = useState(0);
    const [atomizerProgress, setAtomizerProgress] = useState(0);
    const [mistProgress, setMistProgress] = useState(0);
    const { playSpray, soundEnabled } = useSound();
    const [hasPlayedSound, setHasPlayedSound] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;

            const rect = sectionRef.current.getBoundingClientRect();
            const sectionHeight = sectionRef.current.offsetHeight;
            const viewportHeight = window.innerHeight;
            
            // Calculate scroll progress through the section
            const scrolled = -rect.top;
            const totalScrollDistance = sectionHeight - viewportHeight;
            const progress = Math.max(0, Math.min(1, scrolled / totalScrollDistance));

            // Rotation: 0 to 0.5 progress
            const rotationProg = Math.min(progress * 2, 1);
            setRotationProgress(rotationProg * 2);

            // Atomizer: 0.3 to 0.6 progress
            const atomizerProg = Math.max(0, Math.min(1, (progress - 0.3) / 0.3));
            setAtomizerProgress(atomizerProg);

            // Play sound at the right moment
            if (atomizerProg > 0.3 && atomizerProg < 0.4 && soundEnabled && !hasPlayedSound) {
                playSpray();
                setHasPlayedSound(true);
            }

            // Mist: 0.4 to 1.0 progress
            const mistProg = Math.max(0, Math.min(1, (progress - 0.4) / 0.6));
            setMistProgress(mistProg);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial call

        return () => window.removeEventListener('scroll', handleScroll);
    }, [playSpray, soundEnabled, hasPlayedSound]);

    return (
        <section
            ref={sectionRef}
            className="relative h-[300vh] bg-black"
            id="hero"
        >
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <Canvas
                    camera={{ position: [0, 0, 8], fov: 45 }}
                    className="w-full h-full"
                >
                    <ambientLight intensity={0.3} />
                    <directionalLight position={[5, 5, 5]} intensity={0.5} />
                    <spotLight
                        position={[-5, 10, 5]}
                        angle={0.3}
                        penumbra={1}
                        intensity={1}
                        castShadow
                    />
                    <pointLight position={[0, 5, 0]} intensity={0.5} color="#B8860B" />
                    
                    <PerfumeBottle3D
                        rotationProgress={rotationProgress}
                        atomizerProgress={atomizerProgress}
                    />
                    <FloatingParticles />
                    <MistSpray mistProgress={mistProgress} />
                    
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        enableRotate={false}
                    />
                </Canvas>

                {/* Mist overlay transition */}
                <div
                    className="absolute inset-0 bg-ivory pointer-events-none transition-opacity duration-1000"
                    style={{ opacity: Math.min(mistProgress * 1.5, 1) }}
                />

                {/* Hero text */}
                <div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-700"
                    style={{ opacity: 1 - mistProgress }}
                >
                    <div className="text-center">
                        <h1 className="font-serif text-6xl md:text-8xl text-deepGold mb-4 tracking-wider">
                            H&H Fragrances
                        </h1>
                        <p className="text-ivory/60 text-sm md:text-base tracking-[0.3em] uppercase">
                            Scroll to Experience
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
