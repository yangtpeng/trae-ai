import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const CloudIcon = () => {
  const cloudRef = useRef();
  const smallCloudRef = useRef();
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    if (cloudRef.current) {
      timeRef.current += delta;
      cloudRef.current.position.y = 0.6 + Math.sin(timeRef.current * 1.2) * 0.08;
      cloudRef.current.rotation.y = Math.sin(timeRef.current * 0.3) * 0.08;
    }
    if (smallCloudRef.current) {
      smallCloudRef.current.position.y = 0.5 + Math.sin(timeRef.current * 1.5 + 1) * 0.05;
      smallCloudRef.current.rotation.y = Math.cos(timeRef.current * 0.4) * 0.1;
    }
  });

  return (
    <group>
      {/* 主云朵 */}
      <group ref={cloudRef} position={[0, 0.6, 0]}>
        {/* 中心主体 */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.28, 24, 24]} />
          <meshStandardMaterial
            color="#FFFFFF"
            transparent
            opacity={0.95}
            metalness={0.1}
            roughness={0.6}
          />
        </mesh>

        {/* 左侧 */}
        <mesh position={[-0.22, -0.05, 0]}>
          <sphereGeometry args={[0.2, 20, 20]} />
          <meshStandardMaterial
            color="#F5F5F5"
            transparent
            opacity={0.9}
            metalness={0.1}
            roughness={0.7}
          />
        </mesh>

        {/* 右侧 */}
        <mesh position={[0.22, -0.05, 0]}>
          <sphereGeometry args={[0.2, 20, 20]} />
          <meshStandardMaterial
            color="#F5F5F5"
            transparent
            opacity={0.9}
            metalness={0.1}
            roughness={0.7}
          />
        </mesh>

        {/* 后侧 */}
        <mesh position={[0, 0.08, -0.15]}>
          <sphereGeometry args={[0.18, 18, 18]} />
          <meshStandardMaterial
            color="#E8E8E8"
            transparent
            opacity={0.85}
            metalness={0.1}
            roughness={0.8}
          />
        </mesh>

        {/* 前侧 */}
        <mesh position={[0, 0.05, 0.15]}>
          <sphereGeometry args={[0.16, 16, 16]} />
          <meshStandardMaterial
            color="#FAFAFA"
            transparent
            opacity={0.9}
            metalness={0.1}
            roughness={0.7}
          />
        </mesh>

        {/* 顶部 */}
        <mesh position={[0, 0.22, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            color="#FFFFFF"
            transparent
            opacity={0.95}
            metalness={0.1}
            roughness={0.6}
          />
        </mesh>
      </group>

      {/* 小云朵 */}
      <group ref={smallCloudRef} position={[0.5, 0.5, 0.3]}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.12, 14, 14]} />
          <meshStandardMaterial
            color="#ECEFF1"
            transparent
            opacity={0.7}
            metalness={0.1}
            roughness={0.8}
          />
        </mesh>
        <mesh position={[-0.1, -0.02, 0]}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial
            color="#E0E0E0"
            transparent
            opacity={0.65}
            metalness={0.1}
            roughness={0.8}
          />
        </mesh>
      </group>
    </group>
  );
};

export default CloudIcon;