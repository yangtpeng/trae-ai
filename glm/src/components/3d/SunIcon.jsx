import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Torus } from '@react-three/drei';

const SunIcon = () => {
  const groupRef = useRef();
  const coreRef = useRef();
  const raysRef = useRef([]);
  const glowRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.008;
    }
    if (coreRef.current) {
      coreRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.05);
    }
    raysRef.current.forEach((ray, i) => {
      if (ray) {
        const pulse = Math.sin(state.clock.elapsedTime * 2.5 + i * 0.5) * 0.15;
        ray.scale.x = 1 + pulse;
        ray.scale.y = 1 + pulse * 0.5;
      }
    });
    if (glowRef.current) {
      glowRef.current.material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group ref={groupRef} scale={0.38}>
      <Sphere ref={glowRef} args={[0.5, 32, 32]}>
        <meshBasicMaterial color="#FFD93D" transparent opacity={0.2} />
      </Sphere>

      <Sphere ref={coreRef} args={[0.28, 32, 32]}>
        <meshStandardMaterial
          color="#FFD93D"
          emissive="#FFA500"
          emissiveIntensity={1.2}
          metalness={0.3}
          roughness={0.2}
        />
      </Sphere>

      {[...Array(12)].map((_, i) => {
        const angle = (i * Math.PI * 2) / 12;
        const radius = 0.48;
        const length = i % 2 === 0 ? 0.22 : 0.15;
        return (
          <mesh
            key={i}
            ref={(el) => raysRef.current[i] = el}
            position={[
              Math.cos(angle) * radius,
              0,
              Math.sin(angle) * radius
            ]}
            rotation={[0, -angle, 0]}
          >
            <boxGeometry args={[length, 0.05, 0.05]} />
            <meshStandardMaterial
              color="#FFE066"
              emissive="#FFD93D"
              emissiveIntensity={0.8}
              metalness={0.2}
              roughness={0.3}
            />
          </mesh>
        );
      })}
    </group>
  );
};

export default SunIcon;
