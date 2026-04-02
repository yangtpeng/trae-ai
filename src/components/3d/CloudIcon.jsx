import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const CloudIcon = () => {
  const cloudRef = useRef();
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    if (cloudRef.current) {
      timeRef.current += delta;
      cloudRef.current.position.y = Math.sin(timeRef.current * 1.5) * 0.08;
      cloudRef.current.rotation.y = Math.sin(timeRef.current * 0.5) * 0.1;
    }
  });

  return (
    <group position={[0, 0.8, 0]}>
      <group ref={cloudRef}>
        {/* 主云体 */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.3, 24, 24]} />
          <meshStandardMaterial
            color="#F5F5F5"
            transparent
            opacity={0.95}
            metalness={0.1}
            roughness={0.8}
          />
        </mesh>

        {/* 左侧云团 */}
        <mesh position={[-0.25, 0.05, 0]}>
          <sphereGeometry args={[0.22, 20, 20]} />
          <meshStandardMaterial
            color="#EEEEEE"
            transparent
            opacity={0.9}
            metalness={0.1}
            roughness={0.8}
          />
        </mesh>

        {/* 右侧云团 */}
        <mesh position={[0.25, 0.05, 0]}>
          <sphereGeometry args={[0.22, 20, 20]} />
          <meshStandardMaterial
            color="#EEEEEE"
            transparent
            opacity={0.9}
            metalness={0.1}
            roughness={0.8}
          />
        </mesh>

        {/* 左后云团 */}
        <mesh position={[-0.4, -0.05, -0.1]}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial
            color="#E0E0E0"
            transparent
            opacity={0.85}
            metalness={0.1}
            roughness={0.8}
          />
        </mesh>

        {/* 右后云团 */}
        <mesh position={[0.4, -0.05, -0.1]}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial
            color="#E0E0E0"
            transparent
            opacity={0.85}
            metalness={0.1}
            roughness={0.8}
          />
        </mesh>

        {/* 顶部云团 */}
        <mesh position={[0, 0.15, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial
            color="#FFFFFF"
            transparent
            opacity={0.9}
            metalness={0.1}
            roughness={0.8}
          />
        </mesh>

        {/* 底部阴影 */}
        <mesh position={[0, -0.2, 0]}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshBasicMaterial
            color="#BDBDBD"
            transparent
            opacity={0.2}
          />
        </mesh>
      </group>
    </group>
  );
};

export default CloudIcon;