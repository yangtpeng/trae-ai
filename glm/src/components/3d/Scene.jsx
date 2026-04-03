import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Stars } from '@react-three/drei';

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
      camera={{ position: [0, 14, 18], fov: 48 }}
      shadows
    >
      <color attach="background" args={['#1a1a2e']} />
      <fog attach="fog" args={['#1a1a2e', 20, 50]} />
      
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[10, 25, 10]} 
        intensity={1.8} 
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      <directionalLight position={[-10, 15, -10]} intensity={0.6} />
      <pointLight position={[0, 10, 0]} intensity={0.5} color="#667eea" />
      
      <Stars 
        radius={100} 
        depth={50} 
        count={3000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={0.5}
      />
      
      <OrbitControls
        enableDamping={true}
        dampingFactor={0.08}
        enableZoom={true}
        enablePan={true}
        maxPolarAngle={Math.PI / 2.2}
        minPolarAngle={Math.PI / 6}
        minDistance={8}
        maxDistance={40}
        target={[0, 0, 0]}
      />
      
      {children}
    </Canvas>
  );
};

export default Scene;
