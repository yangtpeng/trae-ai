import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const Scene = ({ children }) => {
  return (
    <Canvas style={{ width: '100%', height: '100vh' }} camera={{ position: [12, 12, 12], fov: 50 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.4} />

      <OrbitControls
        enableDamping={true}
        dampingFactor={0.05}
        enableZoom={true}
        enablePan={true}
        maxPolarAngle={Math.PI / 2}
      />

      {children}
    </Canvas>
  );
};

export default Scene;