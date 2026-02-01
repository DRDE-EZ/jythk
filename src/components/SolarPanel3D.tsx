"use client";

import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Float } from "@react-three/drei";
import * as THREE from "three";

function SolarPanelModel({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(modelPath);
  const groupRef = useRef<THREE.Group>(null);

  // Center the model by computing bounding box and offsetting
  useEffect(() => {
    if (scene) {
      // Compute bounding box to find center
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());

      // Offset the scene so it rotates around its center
      scene.position.sub(center);

      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [scene]);

  // Slow auto-rotation around the centered pivot
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.2}>
      <group ref={groupRef}>
        <primitive
          object={scene}
          scale={0.4}
          rotation={[0, -Math.PI / 3.2, 0]}
        />
      </group>
    </Float>
  );
}

function LoadingFallback() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 0.1, 1.5]} />
      <meshStandardMaterial color="#10b981" wireframe />
    </mesh>
  );
}

interface SolarPanel3DProps {
  className?: string;
  modelPath?: string;
}

export default function SolarPanel3D({
  className = "",
  modelPath = "/models/solar_panel.glb",
}: SolarPanel3DProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 35 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        {/* Lighting setup for solar panel */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize={1024}
        />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} />
        <pointLight position={[0, 10, 0]} intensity={0.3} />

        {/* Environment for realistic reflections on solar cells */}
        <Environment preset="sunset" />

        {/* 3D Model */}
        <Suspense fallback={<LoadingFallback />}>
          <SolarPanelModel modelPath={modelPath} />
        </Suspense>

        {/* Controls - allows user to rotate */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.2}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}

// Preload the model
useGLTF.preload("/models/solar_panel.glb");
