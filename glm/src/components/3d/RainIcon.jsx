import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';

const RainIcon = () => {
  const dropsRef = useRef([]);
  const cloudRef = useRef();

  const drops = useMemo(() => {
    return [...Array(15)].map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 0.5,
      z: (Math.random() - 0.5) * 0.5,
      delay: Math.random() * 2,
      speed: 0.8 + Math.random() * 0.4
    }));
  }, []);

  useFrame((state) => {
    dropsRef.current.forEach((drop, i) => {
      if (drop && drops[i]) {
        const t = ((state.clock.elapsedTime * drops[i].speed) + drops[i].delay) % 1;
        drop.position.y = 0.4 - t * 1.0;
        drop.material.opacity = t < 0.1 ? t * 8 : t > 0.9 ? (1 - t) * 8 : 0.8;
      }
    });
    if (cloudRef.current) {
      cloudRef.current.position.y = 0.5 + Math.sin(state.clock.elapsedTime * 0.5) * 0.03;
    }
  });

  return (
    <group scale={0.42}>
      <group ref={cloudRef} position={[0, 0.5, 0]}>
        <Sphere args={[0.22, 20, 20]} position={[0, 0, 0]}>
          <meshStandardMaterial 
            color="#B8D4E3" 
            transparent 
            opacity={0.85}
            metalness={0.1}
            roughness={0.8}
          />
        </Sphere>
        <Sphere args={[0.15, 20, 20]} position={[-0.12, 0.04, 0]}>
          <meshStandardMaterial 
            color="#C5DDE8" 
            transparent 
            opacity={0.8}
            metalness={0.1}
            roughness={0.8}
          />
        </Sphere>
        <Sphere args={[0.17, 20, 20]} position={[0.1, 0.05, 0]}>
          <meshStandardMaterial 
            color="#C5DDE8" 
            transparent 
            opacity={0.82}
            metalness={0.1}
            roughness={0.8}
          />
        </Sphere>
      </group>

      {drops.map((drop, i) => (
        <mesh
          key={drop.id}
          ref={(el) => dropsRef.current[i] = el}
          position={[drop.x, 0.4, drop.z]}
        >
          <capsuleGeometry args={[0.012, 0.08, 4, 8]} />
          <meshStandardMaterial
            color="#4FC3F7"
            transparent
            opacity={0.8}
            emissive="#29B6F6"
            emissiveIntensity={0.4}
            metalness={0.3}
            roughness={0.2}
          />
        </mesh>
      ))}

      <mesh position={[0, -0.35, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.15, 0.25, 32]} />
        <meshStandardMaterial
          color="#4FC3F7"
          transparent
          opacity={0.3}
          emissive="#29B6F6"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
};

export default RainIcon;
