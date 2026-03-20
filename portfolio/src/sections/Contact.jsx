import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';
import { FaPaperPlane, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { sendEmail } from '../utils/Email';

const socials = [
  { icon: FaGithub, href: 'https://github.com/Amankumar140/', label: 'GitHub', color: '#e4e4e7' },
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/amankumar140426/', label: 'LinkedIn', color: '#0A66C2' },
  { icon: FaEnvelope, href: 'https://mail.google.com/mail/?view=cm&to=aman140426@gmail.com', label: 'Email', color: '#f472b6' },
];

function FloatingIcon({ social, delay }) {
  return (
    <motion.a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.label}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      animate={{ y: [0, -6, 0] }}
      whileHover={{ scale: 1.2 }}
      style={{
        width: '48px',
        height: '48px',
        borderRadius: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--glass-bg)',
        border: '1px solid var(--glass-border)',
        backdropFilter: 'blur(10px)',
        color: social.color,
        fontSize: '1.2rem',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `0 0 20px ${social.color}30`)}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
    >
      <social.icon />
    </motion.a>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');
  const [focused, setFocused] = useState(null);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email';
    if (!form.message.trim()) errs.message = 'Message is required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    setSendError('');
    if (Object.keys(errs).length > 0) return;

    setSending(true);
    const result = await sendEmail(form);
    setSending(false);

    if (result.success) {
      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 4000);
    } else {
      setSendError('Failed to send message. Please try again.');
    }
  };

  const inputStyle = (field) => ({
    width: '100%',
    padding: '10px 14px',
    borderRadius: '8px',
    border: errors[field]
      ? '1px solid #ef4444'
      : focused === field
        ? '1px solid var(--accent)'
        : '1px solid var(--glass-border)',
    background: 'transparent',
    color: 'var(--text-primary)',
    fontSize: '0.85rem',
    fontFamily: 'Inter, sans-serif',
    outline: 'none',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    boxShadow: focused === field ? '0 0 15px rgba(99,102,241,0.15)' : 'none',
  });

  return (
    <SectionWrapper id="contact">
      {/* Background gradient accent */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(500px, 100vw)',
          height: 'min(500px, 100vw)',
          borderRadius: '50%',
          opacity: 0.08,
          background: 'radial-gradient(circle, #6366f1, transparent)',
          pointerEvents: 'none',
          filter: 'blur(80px)',
        }}
      />

      {/* Heading */}
      <div className="text-center" style={{ marginBottom: '12px' }}>
        <motion.h2
          className="text-3xl md:text-4xl font-bold"
          style={{ color: 'var(--text-primary)', marginBottom: '12px' }}
        >
          Get In <span className="gradient-text">Touch</span>
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

      {/* CTA tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center"
        style={{
          color: 'var(--text-secondary)',
          fontSize: '1.05rem',
          maxWidth: '480px',
          margin: '0 auto 36px auto',
          lineHeight: '1.6',
        }}
      >
        Let&apos;s Build Something <span style={{ color: 'var(--accent-light)', fontWeight: 600 }}>Amazing</span> Together
      </motion.p>

      {/* Social icons */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '14px',
          marginBottom: '36px',
        }}
      >
        {socials.map((s, i) => (
          <FloatingIcon key={s.label} social={s} delay={i * 0.1} />
        ))}
      </div>

      {/* Contact form card */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{
          maxWidth: '440px',
          maxHeight: '400px',
          margin: '0 auto',
          padding: '28px 24px',
          borderRadius: '20px',
          background: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        {/* Name */}
        <div style={{ marginBottom: '12px' }}>
          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            onFocus={() => setFocused('name')}
            onBlur={() => setFocused(null)}
            style={inputStyle('name')}
          />
          {errors.name && (
            <span style={{ fontSize: '0.65rem', color: '#ef4444', marginTop: '4px', display: 'block' }}>
              {errors.name}
            </span>
          )}
        </div>

        {/* Email */}
        <div style={{ marginBottom: '12px' }}>
          <input
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            onFocus={() => setFocused('email')}
            onBlur={() => setFocused(null)}
            style={inputStyle('email')}
          />
          {errors.email && (
            <span style={{ fontSize: '0.65rem', color: '#ef4444', marginTop: '4px', display: 'block' }}>
              {errors.email}
            </span>
          )}
        </div>

        {/* Message */}
        <div style={{ marginBottom: '18px' }}>
          <textarea
            placeholder="Your Message"
            rows={3}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            onFocus={() => setFocused('message')}
            onBlur={() => setFocused(null)}
            style={{ ...inputStyle('message'), resize: 'none' }}
          />
          {errors.message && (
            <span style={{ fontSize: '0.65rem', color: '#ef4444', marginTop: '4px', display: 'block' }}>
              {errors.message}
            </span>
          )}
        </div>

        {/* Error message */}
        {sendError && (
          <p style={{
            fontSize: '0.8rem',
            color: '#ef4444',
            textAlign: 'center',
            marginBottom: '12px',
          }}>
            {sendError}
          </p>
        )}

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={sending}
          whileHover={sending ? {} : { scale: 1.03, boxShadow: '0 0 30px rgba(99,102,241,0.35)' }}
          whileTap={sending ? {} : { scale: 0.97 }}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            border: 'none',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: '0.85rem',
            color: '#fff',
            background: submitted
              ? 'linear-gradient(135deg, #10b981, #06b6d4)'
              : 'linear-gradient(135deg, #6366f1, #818cf8)',
            cursor: sending ? 'not-allowed' : 'pointer',
            opacity: sending ? 0.75 : 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'background 0.4s ease, opacity 0.3s ease',
          }}
        >
          {sending ? (
            <>
              <span
                style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTopColor: '#fff',
                  borderRadius: '50%',
                  display: 'inline-block',
                  animation: 'spin 0.8s linear infinite',
                }}
              />
              Sending...
            </>
          ) : submitted ? (
            'Message Sent! ✓'
          ) : (
            <>
              Send Message <FaPaperPlane style={{ fontSize: '0.8rem' }} />
            </>
          )}
        </motion.button>

        {/* Spinner keyframes */}
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </motion.form>
    </SectionWrapper>
  );
}
