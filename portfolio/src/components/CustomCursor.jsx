import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let glowX = 0, glowY = 0;

    const handleMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      // Smooth follow for cursor dot
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      // Slower follow for glow
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorX - 4}px, ${cursorY - 4}px)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${glowX - 20}px, ${glowY - 20}px)`;
      }
      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMove);
    const raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Hide on touch devices
  const isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window;
  if (isTouchDevice) return null;

  return (
    <>
      {/* Small cursor dot */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: '#818cf8',
          pointerEvents: 'none',
          zIndex: 9998,
          mixBlendMode: 'screen',
          transition: 'width 0.2s, height 0.2s',
        }}
      />
      {/* Glow trail */}
      <div
        ref={glowRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.15), transparent 70%)',
          pointerEvents: 'none',
          zIndex: 9997,
          filter: 'blur(2px)',
        }}
      />
    </>
  );
}
