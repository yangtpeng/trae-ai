import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

const RainIcon = () => {
  const raindrops = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 0.7,
      y: Math.random() * 0.9,
      z: (Math.random() - 0.5) * 0.7,
      speed: 0.015 + Math.random() * 0.025,
      scale: 0.5 + Math.random() * 0.5
    }));
  }, []);

  const rainRef = useRef([]);
  const cloudRef = useRef();

  useFrame((state, delta) => {
    rainRef.current.forEach((mesh, i) => {
      if (mesh) {
        mesh.position.y -= raindrops[i].speed;
        if (mesh.position.y < -0.6) {
          mesh.position.y = 0.9;
        }
      }
    });

    if (cloudRef.current) {
      cloudRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group position={[0, 0.8, 0]}>
      {/* 雨云 */}
      <group ref={cloudRef}>
        <mesh position={[0, 0.3, 0]}>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshStandardMaterial
            color="#78909C"
            transparent
            opacity={0.9}
            metalness={0.2}
            roughness={0.9}
          />
        </mesh>
        <mesh position={[-0.2, 0.25, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial
            color="#607D8B"
            transparent
            opacity={0.85}
            metalness={0.2}
            roughness={0.9}
          />
        </mesh>
        <mesh position={[0.2, 0.25, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial
            color="#607D8B"
            transparent
            opacity={0.85}
            metalness={0.2}
            roughness={0.9}
          />
        </mesh>
      </group>

      {/* 雨滴 */}
      {raindrops.map((drop, index) => (
        <mesh
          key={drop.id}
          ref={el => { rainRef.current[index] = el; }}
          position={[drop.x, drop.y, drop.z]}
          scale={[drop.scale, drop.scale, drop.scale]}
        >
          <cylinderGeometry args={[0.015, 0.008, 0.15, 6]} />
          <meshStandardMaterial
            color="#4FC3F7"
            transparent
            opacity={0.8}
            metalness={0.3}
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* 地面水波纹效果 */}
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.3, 0.35, 32]} />
        <meshBasicMaterial
          color="#4FC3F7"
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
};

export default RainIcon;