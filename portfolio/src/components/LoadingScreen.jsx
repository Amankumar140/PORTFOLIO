import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

/* ─── Constants ─── */
const TOTAL_DURATION = 2400; // ms total before exit begins
const SKIP_KEY = 'alaric_loader_seen';

/* Brand gradient palette — pulled directly from index.css / Hero.jsx */
const BRAND = {
  indigo: '#6366f1',
  indigoLight: '#818cf8',
  purple: '#a78bfa',
  pink: '#f472b6',
  bg: '#0a0a0f',
};

/* Easing curves reused from codebase */
const EASE_HERO = [0.16, 1, 0.3, 1]; // Hero entrance
const EASE_SMOOTH = [0.4, 0, 0.2, 1]; // Projects carousel

/* ─── Phase 2: System validation skills ─── */
const SYSTEM_CHECKS = [
  { label: 'React', delay: 0.55 },
  { label: 'Node.js', delay: 0.75 },
  { label: 'MongoDB', delay: 0.95 },
  { label: 'TypeScript', delay: 1.15 },
];

/* ─── Phase 3: Boot log lines ─── */
const BOOT_LINES = [
  { text: '> booting alaric.dev', delay: 0.5 },
  { text: '> compiling identity...', delay: 0.8 },
  { text: '> loading projects', delay: 1.1, hasBar: true },
  { text: '> ready_', delay: 1.7, isReady: true },
];

/* ─────────────────────────────────────────────
 *  LoadingScreen — Developer Boot Sequence
 * ───────────────────────────────────────────── */
export default function LoadingScreen() {
  const [show, setShow] = useState(() => {
    // Session-based skip: only show once per session
    if (sessionStorage.getItem(SKIP_KEY)) return false;
    return true;
  });

  const [phase, setPhase] = useState(0); // 0→identity, 1→checks, 2→boot, 3→exit
  const ringControls = useAnimation();

  /* ── Phase sequencing ── */
  useEffect(() => {
    if (!show) return;

    sessionStorage.setItem(SKIP_KEY, '1');

    const timers = [
      setTimeout(() => setPhase(1), 400),   // Start system checks
      setTimeout(() => setPhase(2), 900),   // Start boot log
      setTimeout(() => setPhase(3), TOTAL_DURATION), // Begin exit
    ];

    return () => timers.forEach(clearTimeout);
  }, [show]);

  /* ── Exit ring expansion ── */
  useEffect(() => {
    if (phase === 3) {
      ringControls.start({
        scale: [1, 35],
        opacity: [0.6, 0],
        transition: { duration: 0.7, ease: EASE_SMOOTH },
      });
      // Remove from DOM after exit animation
      const exitTimer = setTimeout(() => setShow(false), 750);
      return () => clearTimeout(exitTimer);
    }
  }, [phase, ringControls]);

  /* ── Reduced motion support ── */
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: BRAND.bg,
            overflow: 'hidden',
            willChange: 'opacity',
          }}
        >
          {/* ═══ Ambient background glow — matches ParticleField orbs ═══ */}
          <div
            style={{
              position: 'absolute',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${BRAND.indigo}15, ${BRAND.purple}08, transparent 70%)`,
              filter: 'blur(80px)',
              pointerEvents: 'none',
            }}
          />

          {/* ═══ PHASE 1: Identity Initialization — <AK /> ═══ */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0, filter: 'blur(8px)' }}
            animate={{
              scale: phase >= 3 ? 1.15 : 1,
              opacity: phase >= 3 ? 0 : 1,
              filter: 'blur(0px)',
            }}
            transition={{
              scale: { duration: 0.5, ease: EASE_HERO },
              opacity: { duration: phase >= 3 ? 0.35 : 0.45, ease: 'easeOut' },
              filter: { duration: 0.4 },
            }}
            style={{ position: 'relative', zIndex: 2 }}
          >
            {/* Glow halo behind logo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0.3] }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                inset: '-30px',
                borderRadius: '50%',
                background: `radial-gradient(circle, ${BRAND.indigo}40, transparent 70%)`,
                filter: 'blur(20px)',
                pointerEvents: 'none',
              }}
            />
            <span
              style={{
                fontSize: 'clamp(2rem, 5vw, 2.8rem)',
                fontWeight: 800,
                fontFamily: "'Inter', sans-serif",
                background: `linear-gradient(135deg, ${BRAND.indigoLight}, ${BRAND.purple}, ${BRAND.pink})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em',
                userSelect: 'none',
                position: 'relative',
              }}
            >
              &lt;AK /&gt;
            </span>
          </motion.div>

          {/* ═══ PHASE 2: System Validation Checks ═══ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 1 ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              display: 'flex',
              gap: '12px',
              marginTop: '28px',
              flexWrap: 'wrap',
              justifyContent: 'center',
              maxWidth: '340px',
              position: 'relative',
              zIndex: 2,
            }}
          >
            {SYSTEM_CHECKS.map((check) => (
              <motion.div
                key={check.label}
                initial={{ opacity: 0, x: -8 }}
                animate={{
                  opacity: phase >= 3 ? 0 : 1,
                  x: 0,
                }}
                transition={{
                  delay: check.delay,
                  duration: 0.3,
                  ease: EASE_HERO,
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 14px',
                  borderRadius: '50px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(99,102,241,0.15)',
                  fontSize: '0.72rem',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  color: BRAND.indigoLight,
                  letterSpacing: '0.01em',
                  willChange: 'transform, opacity',
                }}
              >
                <span style={{ color: '#4ade80', fontSize: '0.65rem' }}>✓</span>
                {check.label}
              </motion.div>
            ))}
          </motion.div>

          {/* ═══ PHASE 3: Boot Log (Terminal) ═══ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 2 ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              marginTop: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              fontFamily: "'Inter', monospace",
              fontSize: '0.68rem',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.35)',
              position: 'relative',
              zIndex: 2,
              minWidth: '220px',
            }}
          >
            {BOOT_LINES.map((line) => (
              <motion.div
                key={line.text}
                initial={{ opacity: 0, y: 4 }}
                animate={{
                  opacity: phase >= 3 ? 0 : 1,
                  y: 0,
                }}
                transition={{
                  delay: line.delay,
                  duration: 0.25,
                  ease: 'easeOut',
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  willChange: 'transform, opacity',
                }}
              >
                <span
                  style={{
                    color: line.isReady ? '#4ade80' : 'rgba(255,255,255,0.35)',
                    fontWeight: line.isReady ? 600 : 400,
                  }}
                >
                  {line.text}
                </span>

                {/* Progress bar for "loading projects" line */}
                {line.hasBar && (
                  <ProgressMini delay={line.delay + 0.1} />
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* ═══ Main progress bar (subtle, below everything) ═══ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 3 ? 0 : 0.6 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            style={{
              position: 'absolute',
              bottom: '48px',
              width: '140px',
              height: '2px',
              borderRadius: '10px',
              background: 'rgba(255,255,255,0.06)',
              overflow: 'hidden',
              zIndex: 2,
            }}
          >
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{
                duration: (TOTAL_DURATION / 1000) - 0.3,
                ease: EASE_SMOOTH,
                delay: 0.3,
              }}
              style={{
                height: '100%',
                borderRadius: '10px',
                background: `linear-gradient(90deg, ${BRAND.indigo}, ${BRAND.purple})`,
              }}
            />
          </motion.div>

          {/* ═══ PHASE 4: Exit ring — expands outward, becomes hero glow ═══ */}
          <motion.div
            animate={ringControls}
            style={{
              position: 'absolute',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              border: `2px solid ${BRAND.indigo}`,
              boxShadow: `0 0 40px ${BRAND.indigo}50, 0 0 80px ${BRAND.indigo}20`,
              opacity: 0,
              pointerEvents: 'none',
              willChange: 'transform, opacity',
              zIndex: 1,
            }}
          />

          {/* ═══ Scan line (aesthetic touch) ═══ */}
          {!prefersReducedMotion && (
            <motion.div
              initial={{ top: '0%' }}
              animate={{ top: '100%' }}
              transition={{
                duration: 2.2,
                ease: 'linear',
                repeat: 0,
              }}
              style={{
                position: 'absolute',
                left: 0,
                width: '100%',
                height: '1px',
                background: `linear-gradient(90deg, transparent, ${BRAND.indigo}30, transparent)`,
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Mini progress bar for the boot log ─── */
function ProgressMini({ delay }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        fontSize: '0.62rem',
        color: 'rgba(255,255,255,0.3)',
      }}
    >
      <span style={{ position: 'relative', width: '48px', height: '4px', borderRadius: '2px', overflow: 'hidden', background: 'rgba(255,255,255,0.08)' }}>
        <motion.span
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{
            delay,
            duration: 0.5,
            ease: EASE_SMOOTH,
          }}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '2px',
            background: `linear-gradient(90deg, ${BRAND.indigo}, ${BRAND.purple})`,
          }}
        />
      </span>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.45, duration: 0.15 }}
        style={{ color: '#4ade80', fontWeight: 600, fontSize: '0.6rem' }}
      >
        100%
      </motion.span>
    </span>
  );
}
