import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { HiArrowDown, HiDownload, HiEye } from 'react-icons/hi';
import { FaRocket } from 'react-icons/fa';
import { useTheme } from '../components/ThemeProvider';

/* ── Typing animation hook ── */
function useTypingAnimation(words, typingSpeed = 100, deletingSpeed = 60, pauseTime = 1800) {
  const [display, setDisplay] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplay(currentWord.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);

        if (charIndex + 1 === currentWord.length) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        setDisplay(currentWord.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);

        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return display;
}

/* ── Animated counter for a subtle stat bar ── */
const roles = ['Web Developer', 'Problem Solver', 'AI Enthusiast'];

export default function Hero() {
  const typedText = useTypingAnimation(roles);
  const { isDark } = useTheme();

  return (
    <section
      id="hero"
      className="relative z-10 w-full min-h-[100svh] flex flex-col px-4 sm:px-8 md:px-12"
    >
      {/* ── Top Spacer: absolutely guarantees content clears the fixed navbar ── */}
      <div className="flex-[1] min-h-[110px] md:min-h-[140px]" />

      {/* ── Two-column hero layout ── */}
      <div className="relative w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        
        {/* ── Left: Text content ── */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="order-2 md:order-1 flex flex-col items-center text-center md:pl-16 lg:pl-32"
        >
          {/* Greeting chip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 rounded-full text-xs font-semibold tracking-wider uppercase"
            style={{
              padding: '8px 20px',
              marginBottom: '24px',
              background: 'rgba(99,102,241,0.12)',
              border: '1px solid rgba(99,102,241,0.25)',
              color: 'var(--accent-light)',
            }}
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Available for opportunities
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="font-extrabold leading-tight"
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              marginBottom: '12px',
              color: 'var(--text-primary)',
            }}
          >
            Aman{' '}
            <span className="gradient-text">Kumar</span>
          </motion.h1>

          {/* Title */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="font-medium tracking-wide"
            style={{
              fontSize: 'clamp(0.8rem, 1.5vw, 1rem)',
              marginBottom: '24px',
              color: 'var(--text-secondary)',
            }}
          >
            Final Year Engineering Student &nbsp;|&nbsp; Software Developer
          </motion.p>

          {/* Typing animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex items-center justify-center"
            style={{ minHeight: '44px', marginBottom: '32px' }}
          >
            <span
              className="font-bold"
              style={{
                fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
                color: 'var(--accent-light)',
              }}
            >
              {typedText}
            </span>
            <span
              className="inline-block w-[3px] rounded-sm align-middle"
              style={{
                height: '1.6em',
                marginLeft: '4px',
                background: 'var(--accent)',
                animation: 'blink 1s step-end infinite',
              }}
            />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="flex flex-wrap justify-center"
            style={{ gap: '16px' }}
          >
            {/* View Projects */}
            <Link to="projects" smooth={true} duration={500} offset={-80}>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 35px rgba(99,102,241,0.45)' }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2.5 rounded-full font-semibold text-white cursor-pointer transition-all duration-300"
                style={{
                  padding: '14px 32px',
                  fontSize: '0.9rem',
                  background: 'linear-gradient(135deg, #6366f1, #818cf8)',
                }}
              >
                <FaRocket className="text-sm" />
                View Projects
              </motion.button>
            </Link>

            {/* Download Resume */}
            <motion.a
              href="/resume.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2.5 rounded-full font-semibold glass cursor-pointer transition-all duration-300"
              style={{
                padding: '14px 32px',
                fontSize: '0.9rem',
                color: 'var(--text-primary)',
              }}
            >
              <HiDownload className="text-lg" />
              Download Resume
            </motion.a>

            {/* View Resume */}
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2.5 rounded-full font-semibold cursor-pointer transition-all duration-300"
              style={{
                padding: '14px 32px',
                fontSize: '0.9rem',
                color: 'var(--accent-light)',
                border: '1px solid rgba(99,102,241,0.35)',
              }}
            >
              <HiEye className="text-lg" />
              View Resume
            </motion.a>
          </motion.div>
        </motion.div>

        {/* ── Right: Profile Image ── */}
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="order-1 md:order-2 flex justify-center md:justify-end md:translate-x-8 lg:translate-x-16"
        >
          <div
            className="relative animate-float mx-auto md:mr-0"
            style={{ width: 'clamp(180px, 45vw, 340px)', height: 'clamp(180px, 45vw, 340px)' }}
          >
            {/* Glow behind image */}
            <div
              className="absolute inset-0 rounded-full blur-[60px] opacity-30"
              style={{ background: 'radial-gradient(circle, #6366f1, #a78bfa, transparent)' }}
            />
            {/* Gradient ring */}
            <div
              className="absolute inset-0 rounded-full p-[3px]"
              style={{ background: 'linear-gradient(135deg, #6366f1, #a78bfa, #f472b6)' }}
            >
              <div
                className="w-full h-full rounded-full overflow-hidden"
                style={{ background: 'var(--bg-primary)' }}
              >
                {/* Replace src with your actual profile photo */}
                <img
                  src={isDark ? '/picDarkMode.jpeg' : '/picLightMode.png'}
                  alt="Aman Kumar"
                  className="w-full h-full object-cover rounded-full"
                  style={{ opacity: 0.9 }}
                  onError={(e) => {
                    // Fallback: show initials if image not found
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                {/* Fallback initials */}
                <div
                  className="w-full h-full rounded-full items-center justify-center gradient-text"
                  style={{
                    display: 'none',
                    fontSize: 'clamp(3rem, 6vw, 5rem)',
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(167,139,250,0.08))',
                  }}
                >
                  AK
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Bottom Spacer ── */}
      <div className="flex-[1] min-h-[80px]" />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <Link to="about" smooth={true} duration={500} offset={-80}>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="cursor-pointer p-3 rounded-full glass"
            style={{ color: 'var(--text-secondary)' }}
          >
            <HiArrowDown size={22} />
          </motion.div>
        </Link>
      </motion.div>

      {/* Blinking cursor keyframes */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
