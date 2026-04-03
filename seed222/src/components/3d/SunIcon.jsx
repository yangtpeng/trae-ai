import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Torus } from '@react-three/drei';

const SunIcon = () => {
  const sunRef = useRef(null);
  const ringRef = useRef(null);

  useFrame((state, delta) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += delta * 0.5;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x += delta * 0.3;
      ringRef.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <group>
      <group ref={sunRef}>
        <Sphere args={[0.25, 16, 16]} position={[0, 0, 0]}>
          <meshStandardMaterial 
            color="#FFD93D" 
            emissive="#FFD93D" 
            emissiveIntensity={0.5}
          />
        </Sphere>
      </group>
      <group ref={ringRef}>
        <Torus args={[0.35, 0.03, 8, 32]} position={[0, 0, 0]}>
          <meshBasicMaterial color="#FFE066" transparent opacity={0.6} />
        </Torus>
      </group>
    </group>
  );
};

export default SunIcon;