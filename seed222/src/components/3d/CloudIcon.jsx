import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';

const CloudIcon = () => {
  const groupRef = useRef(null);
  const [offset] = useState(() => Math.random() * Math.PI * 2);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5 + offset) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Sphere args={[0.18, 12, 12]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#E8F4F8" transparent opacity={0.85} />
      </Sphere>
      <Sphere args={[0.14, 12, 12]} position={[-0.18, -0.03, 0.05]}>
        <meshStandardMaterial color="#E8F4F8" transparent opacity={0.85} />
      </Sphere>
      <Sphere args={[0.15, 12, 12]} position={[0.18, -0.02, 0.03]}>
        <meshStandardMaterial color="#E8F4F8" transparent opacity={0.85} />
      </Sphere>
      <Sphere args={[0.12, 12, 12]} position={[-0.08, 0.05, 0.15]}>
        <meshStandardMaterial color="#E8F4F8" transparent opacity={0.85} />
      </Sphere>
    </group>
  );
};

export default CloudIcon;