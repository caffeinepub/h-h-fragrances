import { useRef } from 'react';
import { Mesh } from 'three';
import { Text } from '@react-three/drei';

interface PerfumeBottle3DProps {
    rotationProgress: number;
    atomizerProgress: number;
}

export default function PerfumeBottle3D({ rotationProgress, atomizerProgress }: PerfumeBottle3DProps) {
    const bottleRef = useRef<Mesh>(null);
    const capRef = useRef<Mesh>(null);

    return (
        <group rotation={[0, rotationProgress * Math.PI * 2, 0]}>
            {/* Main bottle body */}
            <mesh ref={bottleRef} position={[0, 0, 0]} castShadow>
                <cylinderGeometry args={[0.8, 0.9, 3, 32]} />
                <meshPhysicalMaterial
                    color="#1a1a1a"
                    metalness={0.9}
                    roughness={0.1}
                    transparent
                    opacity={0.95}
                    reflectivity={1}
                />
            </mesh>

            {/* Bottle cap/atomizer */}
            <mesh
                ref={capRef}
                position={[0, 1.5 + atomizerProgress * -0.2, 0]}
                castShadow
            >
                <cylinderGeometry args={[0.4, 0.5, 0.6, 32]} />
                <meshStandardMaterial
                    color="#B8860B"
                    metalness={1}
                    roughness={0.2}
                />
            </mesh>

            {/* Atomizer nozzle */}
            <mesh position={[0, 1.8 + atomizerProgress * -0.2, 0]}>
                <cylinderGeometry args={[0.1, 0.15, 0.3, 16]} />
                <meshStandardMaterial
                    color="#B8860B"
                    metalness={1}
                    roughness={0.2}
                />
            </mesh>

            {/* Label */}
            <Text
                position={[0, 0, 0.91]}
                fontSize={0.25}
                color="#B8860B"
                anchorX="center"
                anchorY="middle"
                font="/fonts/serif.woff"
            >
                H&H
            </Text>
            <Text
                position={[0, -0.3, 0.91]}
                fontSize={0.12}
                color="#F8F6F0"
                anchorX="center"
                anchorY="middle"
                letterSpacing={0.1}
            >
                FRAGRANCES
            </Text>
        </group>
    );
}
