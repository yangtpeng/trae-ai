import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const SunIcon = () => {
  const sunRef = useRef();
  const raysRef = useRef();
  const glowRef = useRef();

  useFrame((state, delta) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += delta * 0.3;
      sunRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
    if (raysRef.current) {
      raysRef.current.rotation.y -= delta * 0.2;
    }
    if (glowRef.current) {
      glowRef.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <group position={[0, 0.6, 0]}>
      {/* 外层光晕 */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshBasicMaterial
          color="#FFD54F"
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* 中层光晕 */}
      <mesh>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshBasicMaterial
          color="#FFEB3B"
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* 主太阳体 */}
      <mesh ref={sunRef}>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshStandardMaterial
          color="#FFC107"
          emissive="#FF9800"
          emissiveIntensity={0.6}
          metalness={0.4}
          roughness={0.3}
        />
      </mesh>

      {/* 太阳光芒 */}
      <group ref={raysRef}>
        {[...Array(12)].map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const x = Math.cos(angle) * 0.4;
          const z = Math.sin(angle) * 0.4;
          return (
            <mesh key={i} position={[x, 0, z]} rotation={[0, 0, angle]}>
              <coneGeometry args={[0.04, 0.18, 8]} />
              <meshStandardMaterial
                color="#FFD54F"
                emissive="#FFC107"
                emissiveIntensity={0.4}
                metalness={0.2}
                roughness={0.4}
              />
            </mesh>
          );
        })}
      </group>

      {/* 内部光点 */}
      <mesh>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#FFF9C4" />
      </mesh>
    </group>
  );
};

export default SunIcon;