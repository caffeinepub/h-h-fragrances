import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MistSprayProps {
    mistProgress: number;
}

export default function MistSpray({ mistProgress }: MistSprayProps) {
    const mistRef = useRef<THREE.Points>(null);

    const mistGeometry = useMemo(() => {
        const count = 500;
        const positions = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * 0.5;
            positions[i * 3] = Math.cos(angle) * radius;
            positions[i * 3 + 1] = 2 + Math.random() * 0.5;
            positions[i * 3 + 2] = Math.sin(angle) * radius;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        return geometry;
    }, []);

    useFrame((state) => {
        if (mistRef.current && mistProgress > 0) {
            const positions = mistRef.current.geometry.attributes.position.array as Float32Array;
            const originalPositions = mistGeometry.attributes.position.array as Float32Array;
            
            for (let i = 0; i < positions.length; i += 3) {
                const spreadFactor = mistProgress * 15;
                const angle = Math.atan2(originalPositions[i + 2], originalPositions[i]);
                
                positions[i] = originalPositions[i] + Math.cos(angle) * spreadFactor;
                positions[i + 1] = originalPositions[i + 1] + mistProgress * 5;
                positions[i + 2] = originalPositions[i + 2] + Math.sin(angle) * spreadFactor;
            }
            
            mistRef.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    if (mistProgress === 0) return null;

    return (
        <points ref={mistRef} geometry={mistGeometry}>
            <pointsMaterial
                size={0.15 * mistProgress}
                color="#F8F6F0"
                transparent
                opacity={Math.min(mistProgress * 0.8, 0.6)}
                sizeAttenuation
            />
        </points>
    );
}
