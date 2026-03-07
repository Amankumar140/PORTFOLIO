import { motion } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';
import {
  FaProjectDiagram, FaServer, FaDatabase, FaNetworkWired, FaCubes,
} from 'react-icons/fa';

const coreConcepts = [
  { name: 'DSA', icon: FaProjectDiagram, color: '#6366f1' },
  { name: 'Operating Systems', icon: FaServer, color: '#a78bfa' },
  { name: 'DBMS', icon: FaDatabase, color: '#06b6d4' },
  { name: 'Computer Networks', icon: FaNetworkWired, color: '#f472b6' },
  { name: 'OOP', icon: FaCubes, color: '#f59e0b' },
];

export default function About() {
  return (
    <SectionWrapper id="about">
      {/* Section heading */}
      <div className="text-center" style={{ marginBottom: '40px' }}>
        <motion.h2
          className="text-3xl md:text-4xl font-bold"
          style={{ color: 'var(--text-primary)', marginBottom: '12px' }}
        >
          About <span className="gradient-text">Me</span>
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

      {/* Introduction */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ maxWidth: '720px', margin: '0 auto 48px auto', textAlign: 'center' }}
      >
        <p
          style={{
            fontSize: '1.05rem',
            lineHeight: '1.8',
            color: 'var(--text-secondary)',
            marginBottom: '16px',
          }}
        >
          Hi, I'm{' '}
          <span style={{ color: 'var(--accent-light)', fontWeight: 600 }}>Aman Kumar</span>{' '}
          — a pre final-year engineering student with a strong foundation in software development and problem solving.
        </p>
        <p
          style={{
            fontSize: '1.05rem',
            lineHeight: '1.8',
            color: 'var(--text-secondary)',
          }}
        >
         I enjoy building scalable web applications and exploring how systems work under the hood. My interests lie in full-stack development, data structures & algorithms, and applying technology to solve real-world problems.</p>
         <p
          style={{
            fontSize: '1.05rem',
            lineHeight: '1.8',
            color: 'var(--text-secondary)',
          }}
        >

I have consistently practiced problem solving and have developed the ability to break down complex problems into efficient solutions. Alongside this, I focus on writing clean, maintainable code and building user-friendly applications.
</p>
<p
          style={{
            fontSize: '1.05rem',
            lineHeight: '1.8',
            color: 'var(--text-secondary)',
          }}
        >

I am always eager to learn new technologies, improve my skills, and take on challenging projects that help me grow as a developer.
        </p>
      </motion.div>

      {/* Core Concepts */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h3
          className="text-center font-semibold"
          style={{ color: 'var(--text-primary)', fontSize: '1.1rem', marginBottom: '24px' }}
        >
          Core <span className="gradient-text">Concepts</span>
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '14px',
            maxWidth: '700px',
            margin: '0 auto',
          }}
        >
          {coreConcepts.map((concept, i) => (
            <motion.div
              key={concept.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{
                y: -5,
                boxShadow: `0 0 20px ${concept.color}18`,
              }}
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                backdropFilter: 'blur(10px)',
                borderRadius: '14px',
                padding: '20px 10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                cursor: 'default',
                transition: 'all 0.3s ease',
              }}
            >
              <concept.icon style={{ fontSize: '1.4rem', color: concept.color }} />
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  textAlign: 'center',
                  lineHeight: '1.3',
                }}
              >
                {concept.name}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
