import { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import SectionWrapper from '../components/SectionWrapper';
import {
  FaReact, FaNodeJs, FaJsSquare, FaDatabase, FaPython, FaJava, FaGitAlt, FaGithub,
  FaCss3Alt, FaKey, FaCogs, FaDesktop, FaProjectDiagram,
} from 'react-icons/fa';
import {
  SiCplusplus, SiExpress, SiPostman, SiMysql, SiJsonwebtokens,
} from 'react-icons/si';
import { TbBrain, TbBinaryTree, TbApi } from 'react-icons/tb';

const skills = [
  // Languages
  { name: 'C++', icon: SiCplusplus, color: '#00599C' },
  { name: 'Java', icon: FaJava, color: '#ED8B00' },
  { name: 'JavaScript ', icon: FaJsSquare, color: '#F7DF1E' },
  { name: 'Python', icon: FaPython, color: '#3776AB' },
  // Frontend
  { name: 'React', icon: FaReact, color: '#61DAFB' },
  { name: 'React Native', icon: FaReact, color: '#61DAFB' },
  { name: 'CSS3', icon: FaCss3Alt, color: '#2965F1' },
  // Backend
  { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
  { name: 'Express', icon: SiExpress, color: '#ffffff' },
  { name: 'RESTful APIs', icon: TbApi, color: '#48C774' },
  { name: 'JWT', icon: SiJsonwebtokens, color: '#D63AFF' },
  // Databases
  { name: 'MongoDB', icon: FaDatabase, color: '#47A248' },
  { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
  // Tools
  { name: 'Git', icon: FaGitAlt, color: '#F05032' },
  { name: 'GitHub', icon: FaGithub, color: '#E6EDF3' },
  { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
  // CS Fundamentals
  { name: 'OOPs', icon: FaCogs, color: '#FF9F43' },
  { name: 'Operating System', icon: FaDesktop, color: '#A29BFE' },
  { name: 'DBMS', icon: FaProjectDiagram, color: '#00B894' },
  { name: 'DSA', icon: TbBinaryTree, color: '#00D4AA' },
];

/* ── Wireframe globe ── */
function Globe() {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.elapsedTime * 0.08;
      meshRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.05) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2.2, 16, 16]} />
      <meshBasicMaterial
        color="#6366f1"
        wireframe
        transparent
        opacity={0.12}
      />
    </mesh>
  );
}

/* ── Orbiting skill nodes ── */
function SkillNode({ skill, index, total, hovered, setHovered }) {
  const groupRef = useRef();
  const radius = 2.8;

  // Distribute points on a sphere using golden-angle spiral
  const position = useMemo(() => {
    const phi = Math.acos(1 - (2 * (index + 0.5)) / total);
    const theta = Math.PI * (1 + Math.sqrt(5)) * index;
    return [
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta),
    ];
  }, [index, total]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Gentle floating motion
      groupRef.current.position.y =
        position[1] + Math.sin(clock.elapsedTime * 0.6 + index) * 0.08;
    }
  });

  const isHovered = hovered === skill.name;

  return (
    <group ref={groupRef} position={position}>
      {/* Glowing sphere behind the icon */}
      <mesh>
        <sphereGeometry args={[isHovered ? 0.22 : 0.16, 12, 12]} />
        <meshBasicMaterial
          color={skill.color}
          transparent
          opacity={isHovered ? 0.5 : 0.25}
        />
      </mesh>

      {/* HTML overlay */}
      <Html center distanceFactor={6}>
        <div
          onMouseEnter={() => setHovered(skill.name)}
          onMouseLeave={() => setHovered(null)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer',
            transition: 'transform 0.3s ease, opacity 0.3s ease',
            transform: isHovered ? 'scale(1.3)' : 'scale(1)',
            opacity: hovered && !isHovered ? 0.4 : 1,
            filter: isHovered
              ? `drop-shadow(0 0 8px ${skill.color})`
              : 'none',
          }}
        >
          <skill.icon
            style={{
              fontSize: isHovered ? '28px' : '22px',
              color: skill.color,
              transition: 'font-size 0.3s ease',
            }}
          />
          <span
            style={{
              fontSize: '10px',
              fontWeight: 600,
              color: isHovered ? skill.color : 'var(--text-secondary)',
              fontFamily: 'Inter, sans-serif',
              whiteSpace: 'nowrap',
              transition: 'color 0.3s ease',
            }}
          >
            {skill.name}
          </span>
        </div>
      </Html>
    </group>
  );
}

/* ── 3D Scene ── */
function SkillGlobe() {
  const [hovered, setHovered] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      style={{ height: 'clamp(375px, 55vh, 420px)', width: '100%', touchAction: 'pan-y' }}
      gl={{ alpha: true, antialias: false }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.3} />
      <Globe />
      {skills.map((skill, i) => (
        <SkillNode
          key={skill.name}
          skill={skill}
          index={i}
          total={skills.length}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={!isMobile}
        autoRotate
        autoRotateSpeed={1.2}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={(2 * Math.PI) / 3}
      />
    </Canvas>
  );
}

export default function Skills() {
  return (
    <SectionWrapper id="skills">
      {/* Heading */}
      <div className="text-center" style={{ marginBottom: '12px' }}>
        <motion.h2
          className="text-3xl md:text-4xl font-bold"
          style={{ color: 'var(--text-primary)', marginBottom: '12px' }}
        >
          My <span className="gradient-text">Skills</span>
        </motion.h2>
        <div
          style={{
            width: '60px',
            height: '3px',
            margin: '0 auto',
            borderRadius: '4px',
            background: 'linear-gradient(90deg, var(--accent), var(--accent-light))',
          }}
        />
      </div>

      <p
        className="text-center"
        style={{
          color: 'var(--text-secondary)',
          fontSize: '0.95rem',
          maxWidth: '500px',
          margin: '0 auto 8px auto',
        }}
      >
        Drag to rotate &middot; Hover to highlight
      </p>

      {/* 3D Globe */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <SkillGlobe />
      </motion.div>

      {/* Skill list fallback / additional context */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '10px',
          marginTop: '48px',
        }}
      >
        {skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ scale: 1.08 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 18px',
              borderRadius: '50px',
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              backdropFilter: 'blur(10px)',
              cursor: 'default',
              transition: 'all 0.3s ease',
            }}
          >
            <skill.icon style={{ color: skill.color, fontSize: '14px' }} />
            <span
              style={{
                fontSize: '0.8rem',
                fontWeight: 500,
                color: 'var(--text-secondary)',
              }}
            >
              {skill.name}
            </span>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
