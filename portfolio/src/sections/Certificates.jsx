import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';
import { HiX } from 'react-icons/hi';
import { FaCertificate, FaCalendarAlt, FaExternalLinkAlt } from 'react-icons/fa';

const certificates = [
  {
    title: "MongoDB Node.js Developer Path for SmartBridge",
    description: "",
    issuer: "MongoDB University",
    date: "2025",
    Link: "https://learn.mongodb.com/c/SK3wegTXTeueCtmrqoWIcw",
    color: '#a855f7',
    gradient: 'linear-gradient(135deg, #a855f7, #6366f1)',
  },
  {
    title: "AI Agents Intensive Course",
    issuer: "Google + Kaggle",
    date: "2025",
    Link: "https://www.kaggle.com/certification/badges/aman140/105",
    color: '#6366f1',
    gradient: 'linear-gradient(135deg, #6366f1, #06b6d4)',
  },
  {
    title: "Summer Analytics Program",
    issuer: "IIT Guwahati",
    date: "2025",
    Link: "https://certificate.givemycertificate.com/c/10c1b3a4-47bf-4c7a-ae9a-5233270a686e",
    color: '#06b6d4',
    gradient: 'linear-gradient(135deg, #06b6d4, #6366f1)',
  },
  {
    title: "Cybersecurity Foundation",
    issuer: "Palo Alto Networks",
    date: "2025",
    Link: "https://drive.google.com/file/d/1XqnigkpGZb9s2Lnqpie-aU1nx4yx7I6i/view",
    color: '#f472b6',
    gradient: 'linear-gradient(135deg, #f472b6, #a855f7)',
  },
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco",
    date: "2025",
    Link: "https://drive.google.com/file/d/18pf0-Vt5cLMJlWyUdHtziQigdGnn35Wc/view",
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b, #f472b6)',
  },

];

export default function Certificates() {
  const [selected, setSelected] = useState(null);

  return (
    <SectionWrapper id="certificates">
      {/* Heading */}
      <div className="text-center" style={{ marginBottom: '40px' }}>
        <motion.h2
          className="text-3xl md:text-4xl font-bold"
          style={{ color: 'var(--text-primary)', marginBottom: '12px' }}
        >
          My <span className="gradient-text">Certificates</span>
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

      {/* Grid */}
      <div
        className="certificates-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '22px',
          maxWidth: '920px',
          margin: '0 auto',
        }}
      >
        {certificates.map((cert, i) => (
          <motion.div
            key={cert.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -6, scale: 1.025, boxShadow: `0 12px 32px ${cert.color}30` }}
            onClick={() => setSelected(cert)}
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              cursor: 'pointer',
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              backdropFilter: 'blur(12px)',
              transition: 'all 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Preview header */}
            <div
              style={{
                height: '90px',
                background: cert.gradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <FaCertificate
                style={{
                  fontSize: '4rem',
                  color: 'rgba(255,255,255,0.1)',
                  position: 'absolute',
                  right: '-8px',
                  bottom: '-8px',
                }}
              />
              <FaCertificate
                style={{ fontSize: '1.8rem', color: '#fff', opacity: 0.95 }}
              />
            </div>

            {/* Card body */}
            <div style={{
              padding: '16px 18px 18px',
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
            }}>
              <h3
                style={{
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '8px',
                  lineHeight: '1.35',
                  minHeight: '2.7em',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {cert.title}
              </h3>
              <p
                style={{
                  fontSize: '0.78rem',
                  color: cert.color,
                  fontWeight: 500,
                  marginBottom: '4px',
                }}
              >
                {cert.issuer}
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                marginBottom: '14px',
              }}>
                <FaCalendarAlt style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', opacity: 0.7 }} />
                <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', opacity: 0.7 }}>
                  {cert.date}
                </span>
              </div>

              {/* Spacer to push button to bottom */}
              <div style={{ flex: 1 }} />

              {cert.Link && (
                <a
                  href={cert.Link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '8px 0',
                    borderRadius: '8px',
                    background: 'transparent',
                    border: `1.5px solid ${cert.color}50`,
                    color: cert.color,
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                    width: '100%',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = cert.gradient;
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.borderColor = 'transparent';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = cert.color;
                    e.currentTarget.style.borderColor = `${cert.color}50`;
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <FaExternalLinkAlt style={{ fontSize: '0.6rem' }} />
                  View Certificate
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Responsive grid override */}
      <style>{`
        @media (max-width: 768px) {
          #certificates .certificates-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          #certificates .certificates-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
              background: 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '440px',
                width: '100%',
                borderRadius: '20px',
                overflow: 'hidden',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--glass-border)',
              }}
            >
              {/* Modal header */}
              <div
                style={{
                  height: '140px',
                  background: selected.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                <FaCertificate style={{ fontSize: '3.5rem', color: '#fff', opacity: 0.9 }} />
                <button
                  onClick={() => setSelected(null)}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'rgba(0,0,0,0.3)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#fff',
                  }}
                >
                  <HiX size={16} />
                </button>
              </div>

              {/* Modal body */}
              <div style={{ padding: '28px 28px 32px' }}>
                <h3
                  style={{
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '8px',
                  }}
                >
                  {selected.title}
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Issued by <span style={{ fontWeight: 600, color: selected.color }}>{selected.issuer}</span>
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
                  <FaCalendarAlt style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }} />
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{selected.date}</span>
                </div>
                <p
                  style={{
                    fontSize: '0.88rem',
                    lineHeight: '1.7',
                    color: 'var(--text-secondary)',
                    marginBottom: '20px',
                  }}
                >
                  This certification validates proficiency in{' '}
                  {selected.title.toLowerCase()} concepts and practical
                  application of industry-standard practices.
                </p>
                {selected.Link && (
                  <a
                    href={selected.Link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 22px',
                      borderRadius: '10px',
                      background: selected.gradient,
                      color: '#fff',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      transition: 'opacity 0.2s ease, transform 0.2s ease',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'scale(1.04)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)'; }}
                  >
                    <FaExternalLinkAlt style={{ fontSize: '0.8rem' }} />
                    View Certificate
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
