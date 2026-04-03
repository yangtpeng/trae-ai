import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';

const CloudIcon = () => {
  const groupRef = useRef();
  const spheresRef = useRef([]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.08;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
    spheresRef.current.forEach((sphere, i) => {
      if (sphere) {
        sphere.position.y = sphere.userData.baseY + Math.sin(state.clock.elapsedTime * 0.8 + i) * 0.02;
      }
    });
  });

  const cloudParts = [
    { args: [0.38, 24, 24], position: [0, 0, 0], opacity: 0.95 },
    { args: [0.28, 24, 24], position: [-0.28, 0.06, 0], opacity: 0.9 },
    { args: [0.32, 24, 24], position: [0.25, 0.08, 0], opacity: 0.92 },
    { args: [0.22, 24, 24], position: [0, -0.08, 0.18], opacity: 0.88 },
    { args: [0.18, 24, 24], position: [-0.15, 0.02, 0.12], opacity: 0.85 },
  ];

  return (
    <group ref={groupRef} scale={0.32}>
      {cloudParts.map((part, i) => (
        <Sphere
          key={i}
          ref={(el) => {
            spheresRef.current[i] = el;
            if (el) el.userData.baseY = part.position[1];
          }}
          args={part.args}
          position={part.position}
        >
          <meshStandardMaterial
            color="#E8F4F8"
            transparent
            opacity={part.opacity}
            metalness={0.1}
            roughness={0.8}
          />
        </Sphere>
      ))}

      <mesh position={[0, -0.15, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial
          color="#B8D4E3"
          transparent
          opacity={0.6}
          metalness={0.1}
          roughness={0.9}
        />
      </mesh>
    </group>
  );
};

export default CloudIcon;
