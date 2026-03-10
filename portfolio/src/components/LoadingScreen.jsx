import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#0a0a0f',
          }}
        >
          {/* Animated logo */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <span
              style={{
                fontSize: '2.2rem',
                fontWeight: 800,
                fontFamily: 'Inter, sans-serif',
                background: 'linear-gradient(135deg, #818cf8, #a78bfa, #f472b6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              &lt;AK /&gt;
            </span>
          </motion.div>

          {/* Loading bar */}
          <div
            style={{
              width: '120px',
              height: '3px',
              borderRadius: '10px',
              background: 'rgba(255,255,255,0.06)',
              marginTop: '24px',
              overflow: 'hidden',
            }}
          >
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
              style={{
                height: '100%',
                borderRadius: '10px',
                background: 'linear-gradient(90deg, #6366f1, #a78bfa)',
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
