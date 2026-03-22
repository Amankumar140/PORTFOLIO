import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const projects = [
  {
    title: 'TalentTrove',
    description: 'TalentTrove — A real-time freelance marketplace enabling secure bidding, seamless collaboration, and efficient project delivery, built with MERN stack and Socket.IO.',
    tech: ["React",
      "Vite",
      "Node.js",
      "Express",
      "MongoDB",
      "Socket.IO",
      "JWT",
      "bcrypt",
      "Tailwind CSS"],
    github: 'https://github.com/Amankumar140/TalentTrove',
    demo: 'https://talenttrove.vercel.app/',
  },
  {
    title: 'ExpenseTracker',
    description: 'A full-stack MERN application with integrated ML microservice that uses OCR to process receipt images, extract expense data, auto-categorize transactions using both AI/ML and keyword-based rules, and provide analytics with interactive charts.',
    tech: [
      "MREN",
      "JWT",
      "Tesseract.js",
      "Multer",
      "scikit-learn",
      "TF-IDF Vectorizer",
      "Recharts",
      "json2csv",
    ],
    github: 'https://github.com/Amankumar140/ExpenseTracker',
    demo: '#',
  },
  {
    title: 'Portfolio Website',
    description: 'Portfolio Website — A visually stunning personal portfolio featuring an interactive 3D particle background, glassmorphism UI, smooth scroll animations, and live coding platform stats fetched via APIs.',
    tech: [
      "React",
      "Vite",
      "Three.js",
      "Framer Motion",
      "Vanilla CSS",
    ],
    github: 'https://github.com/Amankumar140/Portfolio_ALARIC',
    demo: '#',
  },
  {
    title: "SmartBus (SIH Project)",
    description: "SmartBus — A full-stack transportation system enabling real-time bus tracking, route search, and live notifications using mobile and web technologies, developed during Smart India Hackathon.",
    tech: [
      "React Native",
      "React",
      "Node.js",
      "Express.js",
      "MySQL",
      "Socket.IO",
      "JWT",
      "Google Maps API",
      "Axios"
    ],
    github: "https://github.com/Amankumar140/SmartBus_FullStack",  
    demo: ""
  }
  ,

  {
    title: "Railway Reservation System",
    description: "Railway Reservation System — A DBMS-based application that enables train search, ticket booking, cancellation, and booking management using SQL views, triggers, and stored procedures with a cloud-hosted database.",
    tech: [
      "MySQL",
      "Aiven Cloud",
      "Node.js",
      "Express.js",
      "HTML",
      "CSS",
      "JavaScript"
    ],
    github: "https://github.com/Amankumar140/Railway_Reservation_DBMS_Project",
    demo: ""
  },
  {
    title: "IQwiz",
    description: "IQwiz — An interactive quiz platform designed to enhance learning through timed assessments, real-time feedback, and performance visualization with detailed solutions.",
    tech: [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    github: "https://github.com/Amankumar140/IQwiz",
    demo: "" // add if deployed
  }
];

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const timerRef = useRef(null);
  const total = projects.length;
  const angleStep = 360 / total;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const CARD_WIDTH = isMobile ? 260 : 320;
  const CARD_HEIGHT = isMobile ? 320 : 280;
  const radius = isMobile ? 200 : 380;

  // Auto-rotate
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 3000);
    return () => clearInterval(timerRef.current);
  }, [isPaused, total]);

  const goTo = (i) => setActiveIndex(i);

  return (
    <SectionWrapper id="projects">
      {/* Heading */}
      <div className="text-center" style={{ marginBottom: '40px' }}>
        <motion.h2
          className="text-3xl md:text-4xl font-bold"
          style={{ color: 'var(--text-primary)', marginBottom: '12px' }}
        >
          My <span className="gradient-text">Projects</span>
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

      {/* 3D Carousel */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{
          perspective: '1200px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: `${CARD_HEIGHT + 80}px`,
          position: 'relative',
          marginBottom: '32px',
        }}
      >
        <div
          style={{
            width: `${CARD_WIDTH}px`,
            height: `${CARD_HEIGHT}px`,
            position: 'relative',
            transformStyle: 'preserve-3d',
            transform: `rotateY(${-activeIndex * angleStep}deg)`,
            transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {projects.map((project, i) => {
            const angle = i * angleStep;
            const isFocused = i === activeIndex;

            return (
              <div
                key={project.title}
                onClick={() => goTo(i)}
                style={{
                  position: 'absolute',
                  width: `${CARD_WIDTH}px`,
                  height: `${CARD_HEIGHT}px`,
                  top: 0,
                  left: 0,
                  transformStyle: 'preserve-3d',
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  cursor: 'pointer',
                  transition: 'opacity 0.5s ease, filter 0.5s ease',
                  opacity: isFocused ? 1 : 0.5,
                  filter: isFocused ? 'none' : 'blur(1px)',
                  willChange: 'transform, opacity',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '18px',
                    padding: '28px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    background: isMobile ? 'rgba(10, 10, 30, 0.85)' : 'var(--glass-bg)',
                    border: isFocused
                      ? '1px solid rgba(99,102,241,0.25)'
                      : '1px solid var(--glass-border)',
                    backdropFilter: isMobile ? 'blur(4px)' : 'blur(16px)',
                    WebkitBackdropFilter: isMobile ? 'blur(4px)' : 'blur(16px)',
                    boxShadow: isFocused
                      ? '0 0 30px rgba(99,102,241,0.15), 0 8px 32px rgba(0,0,0,0.2)'
                      : '0 4px 20px rgba(0,0,0,0.15)',
                    transition: 'all 0.5s ease',
                  }}
                >
                  {/* Title */}
                  <div>
                    <h3
                      style={{
                        fontSize: '1rem',
                        fontWeight: 800,
                        background: 'linear-gradient(135deg, #818cf8, #22d3ee)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '10px',
                      }}
                    >
                      {project.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.68rem',
                        lineHeight: '1.6',
                        color: 'var(--text-secondary)',
                        marginBottom: '14px',
                      }}
                    >
                      {project.description}
                    </p>

                    {/* Tech tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          style={{
                            fontSize: '0.45rem',
                            fontWeight: 600,
                            padding: '3px 10px',
                            borderRadius: '50px',
                            background: 'rgba(34,211,238,0.1)',
                            color: '#22d3ee',
                            border: '1px solid rgba(34,211,238,0.2)',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.58rem',
                        fontWeight: 600,
                        color: '#a5b4fc',
                        textDecoration: 'none',
                        transition: 'color 0.3s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#22d3ee')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#a5b4fc')}
                    >
                      <FaGithub /> GitHub
                    </a>
                    {project.demo && project.demo !== "#" && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '0.58rem',
                          fontWeight: 600,
                          color: '#a5b4fc',
                          textDecoration: 'none',
                          transition: 'color 0.3s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#22d3ee')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#a5b4fc')}
                      >
                        <FaExternalLinkAlt /> Live
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dot navigation */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to project ${i + 1}`}
            style={{
              width: activeIndex === i ? '24px' : '8px',
              height: '8px',
              borderRadius: '50px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              background:
                activeIndex === i
                  ? 'linear-gradient(90deg, #6366f1, #818cf8)'
                  : 'var(--glass-border)',
            }}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
