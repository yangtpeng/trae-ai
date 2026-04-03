import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

const RainIcon = () => {
  const raindrops = useMemo(() => {
    return Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 0.6,
      y: Math.random() * 0.9,
      z: (Math.random() - 0.5) * 0.6,
      speed: 0.02 + Math.random() * 0.025,
      size: 0.015 + Math.random() * 0.01
    }));
  }, []);

  const rainRef = useRef([]);
  const cloudRef = useRef();

  useFrame((state, delta) => {
    rainRef.current.forEach((mesh, i) => {
      if (mesh) {
        mesh.position.y -= raindrops[i].speed;
        if (mesh.position.y < -0.6) {
          mesh.position.y = 0.8;
        }
      }
    });

    if (cloudRef.current) {
      cloudRef.current.position.y = 0.7 + Math.sin(state.clock.elapsedTime * 0.8) * 0.03;
    }
  });

  return (
    <group>
      {/* 雨云 */}
      <group ref={cloudRef}>
        <mesh position={[0, 0.7, 0]}>
          <sphereGeometry args={[0.25, 20, 20]} />
          <meshStandardMaterial
            color="#78909C"
            transparent
            opacity={0.9}
            metalness={0.2}
            roughness={0.8}
          />
        </mesh>
        <mesh position={[-0.18, 0.65, 0]}>
          <sphereGeometry args={[0.18, 18, 18]} />
          <meshStandardMaterial
            color="#607D8B"
            transparent
            opacity={0.85}
            metalness={0.2}
            roughness={0.8}
          />
        </mesh>
        <mesh position={[0.18, 0.65, 0]}>
          <sphereGeometry args={[0.18, 18, 18]} />
          <meshStandardMaterial
            color="#607D8B"
            transparent
            opacity={0.85}
            metalness={0.2}
            roughness={0.8}
          />
        </mesh>
      </group>

      {/* 雨滴 */}
      {raindrops.map((drop, index) => (
        <mesh
          key={drop.id}
          ref={el => { rainRef.current[index] = el; }}
          position={[drop.x, drop.y, drop.z]}
        >
          <capsuleGeometry args={[drop.size, 0.12, 4, 8]} />
          <meshStandardMaterial
            color="#4FC3F7"
            transparent
            opacity={0.75}
            metalness={0.4}
            roughness={0.3}
          />
        </mesh>
      ))}

      {/* 地面水花 */}
      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const r = 0.3 + Math.random() * 0.2;
        return (
          <mesh
            key={`splash-${i}`}
            position={[Math.cos(angle) * r, -0.5, Math.sin(angle) * r]}
          >
            <ringGeometry args={[0.02, 0.04, 8]} />
            <meshBasicMaterial
              color="#81D4FA"
              transparent
              opacity={0.4}
            />
          </mesh>
        );
      })}
    </group>
  );
};

export default RainIcon;