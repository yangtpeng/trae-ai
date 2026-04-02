import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const SunIcon = () => {
  const sunRef = useRef();
  const raysRef = useRef();
  const glowRef = useRef();

  useFrame((state, delta) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += delta * 0.8;
      sunRef.current.rotation.z += delta * 0.3;
    }
    if (raysRef.current) {
      raysRef.current.rotation.y -= delta * 0.5;
      raysRef.current.rotation.x += delta * 0.2;
    }
    if (glowRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      glowRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group position={[0, 0.8, 0]}>
      {/* 外层光晕 */}
      <mesh ref={glowRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial
          color="#FFD700"
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* 中层光晕 */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshBasicMaterial
          color="#FFA500"
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* 太阳主体 */}
      <mesh ref={sunRef}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial
          color="#FFD700"
          emissive="#FF8C00"
          emissiveIntensity={0.6}
          metalness={0.3}
          roughness={0.2}
        />
      </mesh>

      {/* 太阳光芒 */}
      <group ref={raysRef}>
        {[...Array(12)].map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const x = Math.cos(angle) * 0.45;
          const z = Math.sin(angle) * 0.45;
          return (
            <mesh key={i} position={[x, 0, z]} rotation={[0, 0, angle]}>
              <cylinderGeometry args={[0.03, 0.06, 0.25, 8]} />
              <meshStandardMaterial
                color="#FFD700"
                emissive="#FFA500"
                emissiveIntensity={0.4}
                metalness={0.5}
                roughness={0.3}
              />
            </mesh>
          );
        })}
      </group>

      {/* 内部发光核心 */}
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial
          color="#FFF8DC"
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
};

export default SunIcon;