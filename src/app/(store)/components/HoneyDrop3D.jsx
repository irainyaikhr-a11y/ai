'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, PerspectiveCamera } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

const HoneyMaterial = new THREE.MeshPhysicalMaterial({
    color: '#C9A24D',
    metalness: 0.1,
    roughness: 0.1,
    transmission: 0.6, // Glass-like transmission
    thickness: 2, // Thickness for refraction
    ior: 1.5, // Index of Refraction (honey is ~1.5)
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    attenuationColor: '#C9A24D',
    attenuationDistance: 0.5,
});

function HoneyDrop() {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.003; // Auto-rotate slowly
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <mesh ref={meshRef} position={[0, 0, 0]} castShadow receiveShadow>
                {/* Drop shape using a distorted sphere */}
                <sphereGeometry args={[1.5, 64, 64]} />
                <primitive object={HoneyMaterial} attach="material" />
            </mesh>
        </Float>
    );
}

export default function HoneyDrop3D() {
    return (
        <div style={{ width: '100%', height: '300px', position: 'relative' }}>
            <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />

                {/* Lighting */}
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#C9A24D" />

                {/* Honey Drop */}
                <HoneyDrop />

                {/* Environment for reflections */}
                <Environment preset="city" />

                {/* Controls */}
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.5}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />
            </Canvas>
        </div>
    );
}
