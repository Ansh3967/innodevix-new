import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Points, PointMaterial } from "@react-three/drei";
import { useRef, Suspense, useMemo } from "react";
import * as THREE from "three";

const WireRing = ({ radius, tube, color, rotation, speed }: { radius: number; tube: number; color: string; rotation: [number, number, number]; speed: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.x = rotation[0] + s.clock.elapsedTime * speed * 0.4;
    ref.current.rotation.y = rotation[1] + s.clock.elapsedTime * speed * 0.6;
  });
  return (
    <mesh ref={ref} rotation={rotation}>
      <torusGeometry args={[radius, tube, 16, 100]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.55} />
    </mesh>
  );
};

const GlowOrb = ({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) => (
  <Float speed={1.4} rotationIntensity={0.4} floatIntensity={1.2}>
    <mesh position={position} scale={scale}>
      <sphereGeometry args={[0.6, 32, 32]} />
      <meshBasicMaterial color={color} transparent opacity={0.35} />
    </mesh>
    <pointLight position={position} intensity={2} color={color} distance={6} />
  </Float>
);

const ParticleField = () => {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(1500 * 3);
    for (let i = 0; i < arr.length; i++) arr[i] = (Math.random() - 0.5) * 18;
    return arr;
  }, []);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.y = s.clock.elapsedTime * 0.04;
    ref.current.rotation.x = s.clock.elapsedTime * 0.02;
  });
  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial transparent color="#00D4FF" size={0.025} sizeAttenuation depthWrite={false} opacity={0.85} />
    </Points>
  );
};

const CenterCore = () => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.y = s.clock.elapsedTime * 0.5;
    ref.current.position.y = Math.sin(s.clock.elapsedTime * 0.8) * 0.15;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[0.85, 1]} />
        <meshStandardMaterial color="#8B5CF6" emissive="#00D4FF" emissiveIntensity={0.6} wireframe />
      </mesh>
    </Float>
  );
};

const HeroScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <pointLight position={[-4, -2, -3]} intensity={2} color="#00D4FF" />
        <pointLight position={[4, 3, 2]} intensity={2} color="#8B5CF6" />

        <ParticleField />
        <CenterCore />

        <WireRing radius={1.8} tube={0.012} color="#00D4FF" rotation={[Math.PI / 2.5, 0, 0]} speed={1} />
        <WireRing radius={2.4} tube={0.01} color="#8B5CF6" rotation={[0, Math.PI / 3, Math.PI / 4]} speed={-0.8} />
        <WireRing radius={3.0} tube={0.008} color="#00D4FF" rotation={[Math.PI / 4, Math.PI / 6, 0]} speed={0.6} />

        <GlowOrb position={[-2.8, 1.4, -1.5]} color="#00D4FF" scale={0.55} />
        <GlowOrb position={[2.7, -1.3, -1.5]} color="#8B5CF6" scale={0.6} />
        <GlowOrb position={[2.4, 1.8, -2.5]} color="#00D4FF" scale={0.4} />
        <GlowOrb position={[-2.4, -1.6, -2]} color="#8B5CF6" scale={0.5} />
      </Suspense>
    </Canvas>
  );
};

export default HeroScene;
