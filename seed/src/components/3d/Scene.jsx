import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const Scene = ({ children }) => {
  return (
    <Canvas
      style={{
        width: '100%',
        height: '100vh',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 10
      }}
      camera={{ position: [0, 15, 18], fov: 45 }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 20, 10]} intensity={1.2} castShadow />
      <directionalLight position={[-10, 10, -10]} intensity={0.5} />

      <OrbitControls
        enableDamping={true}
        dampingFactor={0.05}
        enableZoom={true}
        enablePan={true}
        maxPolarAngle={Math.PI / 2.5}
        minDistance={5}
        maxDistance={30}
        target={[0, 0, 0]}
      />

      {children}
    </Canvas>
  );
};

export default Scene;