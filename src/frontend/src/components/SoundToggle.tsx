import { Volume2, VolumeX } from 'lucide-react';
import { useSoundStore } from '../hooks/useSound';

export default function SoundToggle() {
    const { soundEnabled, toggleSound } = useSoundStore();

    return (
        <button
            onClick={toggleSound}
            className="fixed bottom-6 right-6 z-50 p-4 bg-black/50 backdrop-blur-md border border-deepGold/30 rounded-full text-deepGold hover:bg-deepGold/10 transition-all duration-300"
            aria-label="Toggle sound"
        >
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
    );
}
