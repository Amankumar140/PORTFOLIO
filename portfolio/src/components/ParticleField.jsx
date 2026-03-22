import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ── Mouse-reactive star field ── */
function Stars({ count = 2000, mouse }) {
  const mesh = useRef();

  const [positions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25;
      const t = Math.random();
      col[i * 3] = 0.35 + t * 0.25;
      col[i * 3 + 1] = 0.38 + t * 0.2;
      col[i * 3 + 2] = 0.95;
      sz[i] = Math.random() * 0.04 + 0.01;
    }
    return [pos, col, sz];
  }, [count]);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.elapsedTime;
    mesh.current.rotation.x = Math.sin(t * 0.04) * 0.15 + mouse.current.y * 0.3;
    mesh.current.rotation.y = t * 0.025 + mouse.current.x * 0.3;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} count={count} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ── Floating neon orbs ── */
function FloatingOrb({ position, color, speed, size = 0.1 }) {
  const mesh = useRef();
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.elapsedTime;
    mesh.current.position.y = position[1] + Math.sin(t * speed) * 0.6;
    mesh.current.position.x = position[0] + Math.cos(t * speed * 0.7) * 0.4;
    mesh.current.scale.setScalar(1 + Math.sin(t * speed * 1.5) * 0.15);
  });

  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[size, 20, 20]} />
      <meshBasicMaterial color={color} transparent opacity={0.5} />
    </mesh>
  );
}

/* ── Glowing ring ── */
function GlowRing({ mouse }) {
  const mesh = useRef();
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.elapsedTime;
    mesh.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.3) * 0.15 + mouse.current.y * 0.2;
    mesh.current.rotation.z = t * 0.1 + mouse.current.x * 0.2;
  });

  return (
    <mesh ref={mesh} position={[0, 0, -3]}>
      <torusGeometry args={[3, 0.02, 10, 48]} />
      <meshBasicMaterial color="#6366f1" transparent opacity={0.25} />
    </mesh>
  );
}

export default function ParticleField() {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: false }}
        dpr={[1, 1.5]}
      >
        <Stars mouse={mouse} />
        <GlowRing mouse={mouse} />
        <FloatingOrb position={[-4, 1.5, -3]} color="#6366f1" speed={0.7} size={0.12} />
        <FloatingOrb position={[4, -1, -4]} color="#a78bfa" speed={0.5} size={0.1} />
        <FloatingOrb position={[0, 2.5, -5]} color="#f472b6" speed={0.9} size={0.08} />
        <FloatingOrb position={[-2.5, -2, -3]} color="#818cf8" speed={0.8} size={0.09} />
        <FloatingOrb position={[3, 2, -4]} color="#c084fc" speed={0.6} size={0.11} />
        <FloatingOrb position={[-1, -3, -2]} color="#6366f1" speed={1.0} size={0.07} />
        <FloatingOrb position={[2, -2.5, -5]} color="#a78bfa" speed={0.75} size={0.06} />
        <ambientLight intensity={0.4} />
      </Canvas>
    </div>
  );
}
