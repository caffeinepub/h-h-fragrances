import { create } from 'zustand';

interface SoundStore {
    soundEnabled: boolean;
    toggleSound: () => void;
}

export const useSoundStore = create<SoundStore>((set) => ({
    soundEnabled: false,
    toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
}));

export function useSound() {
    const { soundEnabled } = useSoundStore();

    const playSpray = () => {
        if (!soundEnabled) return;
        
        // Create a simple spray sound using Web Audio API
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.type = 'white' as any;
        oscillator.frequency.setValueAtTime(8000, audioContext.currentTime);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    };

    return { playSpray, soundEnabled };
}
