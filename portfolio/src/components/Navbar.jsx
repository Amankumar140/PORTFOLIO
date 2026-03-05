import { useState } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { BsSun, BsMoon } from 'react-icons/bs';
import { useTheme } from './ThemeProvider';

const navLinks = [
  { name: 'Home', to: 'hero' },
  { name: 'About', to: 'about' },
  { name: 'Skills', to: 'skills' },
  { name: 'DSA', to: 'dsa' },
  { name: 'Projects', to: 'projects' },
  { name: 'Certificates', to: 'certificates' },
  { name: 'Contact', to: 'contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('hero');
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 w-full z-50 glass"
      style={{ borderBottom: '1px solid var(--glass-border)' }}
    >
      <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="hero"
          smooth={true}
          duration={500}
          className="cursor-pointer"
        >
          <motion.span
            className="text-3xl font-bold gradient-text"
            whileHover={{ scale: 1.05 }}
          >
            &lt;AK /&gt;
          </motion.span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              smooth={true}
              duration={500}
              offset={-80}
              spy={true}
              activeClass="active-nav-link"
              onSetActive={() => setActiveLink(link.to)}
              className="relative cursor-pointer text-[15px] font-medium tracking-wide py-1 transition-colors duration-300 hover:text-[var(--accent-light)]"
              style={{ color: 'var(--text-secondary)' }}
            >
              {link.name}
              {activeLink === link.to && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 w-full h-[2px] rounded-full"
                  style={{ background: 'var(--accent-light)' }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}

          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            className={`w-10 h-10 flex items-center justify-center rounded-full cursor-pointer transition-all duration-300 ${
              isDark ? 'glass' : 'bg-white shadow-md shadow-black/5 border border-black/5 hover:shadow-lg'
            }`}
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isDark ? "dark" : "light"}
                initial={{ y: -20, opacity: 0, rotate: -90 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: 20, opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
              >
                {isDark ? (
                  <BsSun size={20} className="text-yellow-400 drop-shadow-md" />
                ) : (
                  <BsMoon size={20} style={{ color: 'var(--accent-light)' }} />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-4">
          <motion.button
            onClick={toggleTheme}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            className={`w-10 h-10 flex items-center justify-center rounded-full cursor-pointer transition-all duration-300 ${
              isDark ? 'glass' : 'bg-white shadow-md shadow-black/5 border border-black/5'
            }`}
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isDark ? "dark" : "light"}
                initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.5, opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
              >
                {isDark ? (
                  <BsSun size={20} className="text-yellow-400 drop-shadow-md" />
                ) : (
                  <BsMoon size={20} style={{ color: 'var(--accent-light)' }} />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer"
            style={{ color: 'var(--text-primary)' }}
            aria-label="Toggle menu"
          >
            {isOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass overflow-hidden"
            style={{ borderTop: '1px solid var(--glass-border)' }}
          >
            <div className="flex flex-col items-center gap-7 py-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.to}
                    smooth={true}
                    duration={500}
                    offset={-80}
                    onClick={() => setIsOpen(false)}
                    className="cursor-pointer text-lg font-medium tracking-wide transition-colors duration-300 hover:text-[var(--accent-light)]"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
