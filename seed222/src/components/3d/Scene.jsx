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
      camera={{ position: [0, 12, 16], fov: 50 }}
    >
      <ambientLight intensity={1.0} />
      <directionalLight position={[10, 20, 10]} intensity={1.5} castShadow />
      <directionalLight position={[-10, 15, -10]} intensity={0.7} />

      <OrbitControls
        enableDamping={true}
        dampingFactor={0.05}
        enableZoom={true}
        enablePan={true}
        maxPolarAngle={Math.PI / 2}
        minDistance={5}
        maxDistance={35}
        target={[0, 0, 0]}
      />

      {children}
    </Canvas>
  );
};

export default Scene;