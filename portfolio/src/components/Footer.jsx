import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaHeart } from 'react-icons/fa';

const socials = [
  { icon: FaGithub, href: 'https://github.com/Amankumar140/', label: 'GitHub' },
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/amankumar140426/', label: 'LinkedIn' },
  { icon: FaTwitter, href: 'https://x.com/the_amankumar_', label: 'Twitter' },
  { icon: FaEnvelope, href: 'https://mail.google.com/mail/?view=cm&to=aman140426@gmail.com', label: 'Email' },
];

export default function Footer() {
  return (
    <footer
      className="relative z-10"
      style={{
        borderTop: '1px solid var(--glass-border)',
        background: 'var(--bg-secondary)',
        padding: '26px 24px',
      }}
    >
      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        {/* Logo */}
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          style={{ fontSize: '1.3rem', fontWeight: 700 }}
          className="gradient-text"
        >
          &lt;AK /&gt;
        </motion.span>

        {/* Social links */}
        <div style={{ display: 'flex', gap: '16px' }}>
          {socials.map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -2 }}
              aria-label={s.label}
              style={{
                color: 'var(--text-secondary)',
                fontSize: '1.1rem',
                transition: 'color 0.3s',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-light)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              <s.icon />
            </motion.a>
          ))}
        </div>

        {/* Copyright */}
        <p
          style={{
            fontSize: '0.8rem',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          ©2026 Aman Kumar. Made with
          <FaHeart style={{ color: '#f472b6', fontSize: '0.7rem' }} />
        </p>
      </div>
    </footer>
  );
}
