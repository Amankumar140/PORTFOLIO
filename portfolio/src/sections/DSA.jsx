import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';
import { SiLeetcode, SiCodeforces, SiHackerrank, SiCodechef } from 'react-icons/si';
import { FaGithub, FaExternalLinkAlt, FaStar, FaTrophy } from 'react-icons/fa';
import {
  fetchLeetCodeStats,
  fetchCodeforcesStats,
  fetchGitHubStats,
  fetchCodeChefStats,
} from '../utils/codingApis';

/* ── Animated counter ── */
function AnimatedNumber({ value, duration = 1800 }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    if (value == null) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = value / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= value) {
              setDisplay(value);
              clearInterval(timer);
            } else {
              setDisplay(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration]);

  return <span ref={ref}>{value != null ? display : '—'}</span>;
}

/* ── Skeleton loader ── */
function SkeletonCard() {
  return (
    <div
      style={{
        padding: '32px 28px',
        borderRadius: '20px',
        background: 'var(--glass-bg)',
        border: '1px solid var(--glass-border)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            height: i === 1 ? '28px' : '16px',
            width: i === 1 ? '60%' : i === 4 ? '45%' : '80%',
            borderRadius: '8px',
            background: 'rgba(255,255,255,0.06)',
            marginBottom: '16px',
            animation: 'pulse-skeleton 1.5s ease-in-out infinite',
          }}
        />
      ))}
    </div>
  );
}

/* ── Stat item inside card ── */
function StatRow({ label, value, color }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '6px 0',
      }}
    >
      <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
        {label}
      </span>
      <span style={{ fontSize: '0.9rem', fontWeight: 700, color }}>
        {typeof value === 'number' ? <AnimatedNumber value={value} /> : value ?? '—'}
      </span>
    </div>
  );
}

/* ── Platform card ── */
function PlatformCard({ platform, index }) {
  const {
    name,
    icon: Icon,
    color,
    username,
    link,
    stats,
    loading,
    badge,
  } = platform;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.5 }}
      whileHover={{
        y: -8,
        boxShadow: `0 0 40px ${color}22, 0 8px 32px rgba(0,0,0,0.3)`,
      }}
      style={{
        padding: '32px 28px',
        borderRadius: '20px',
        background: 'var(--glass-bg)',
        border: '1px solid var(--glass-border)',
        backdropFilter: 'blur(12px)',
        cursor: 'default',
        transition: 'box-shadow 0.4s ease, transform 0.4s ease',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle top glow line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '20%',
          right: '20%',
          height: '2px',
          borderRadius: '0 0 4px 4px',
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          opacity: 0.6,
        }}
      />

      {/* Header: Icon + Name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '4px' }}>
        <div
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: `${color}14`,
            border: `1px solid ${color}25`,
            flexShrink: 0,
          }}
        >
          <Icon style={{ fontSize: '1.6rem', color }} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            {name}
          </h3>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            @{username}
          </span>
        </div>
        {badge && (
          <span
            style={{
              marginLeft: 'auto',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.68rem',
              fontWeight: 700,
              padding: '4px 10px',
              borderRadius: '50px',
              background: `${color}18`,
              color,
              border: `1px solid ${color}30`,
            }}
          >
            <FaStar style={{ fontSize: '8px' }} /> {badge}
          </span>
        )}
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'var(--glass-border)', margin: '4px 0 8px' }} />

      {/* Stats */}
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                height: '14px',
                borderRadius: '6px',
                background: 'rgba(255,255,255,0.05)',
                animation: 'pulse-skeleton 1.5s ease-in-out infinite',
              }}
            />
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {stats.map((s, i) => (
            <StatRow key={i} label={s.label} value={s.value} color={color} />
          ))}
        </div>
      )}

      {/* View Profile button */}
      <motion.a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          marginTop: 'auto',
          paddingTop: '12px',
          padding: '10px 20px',
          borderRadius: '12px',
          fontWeight: 600,
          fontSize: '0.82rem',
          color,
          border: `1px solid ${color}30`,
          background: `${color}08`,
          textDecoration: 'none',
          cursor: 'pointer',
          transition: 'background 0.3s ease',
        }}
      >
        <FaExternalLinkAlt style={{ fontSize: '0.65rem' }} />
        View Profile
      </motion.a>
    </motion.div>
  );
}

/* ── Main DSA Section ── */
export default function DSA() {
  const [lcData, setLcData] = useState(null);
  const [cfData, setCfData] = useState(null);
  const [ghData, setGhData] = useState(null);
  const [ccData, setCcData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAll() {
      const [lc, cf, gh, cc] = await Promise.allSettled([
        fetchLeetCodeStats('amankumar140'),
        fetchCodeforcesStats('amankr196'),
        fetchGitHubStats('Amankumar140'),
        fetchCodeChefStats('amankr_20'),
      ]);
      setLcData(lc.status === 'fulfilled' ? lc.value : null);
      setCfData(cf.status === 'fulfilled' ? cf.value : null);
      setGhData(gh.status === 'fulfilled' ? gh.value : null);
      setCcData(cc.status === 'fulfilled' ? cc.value : null);
      setLoading(false);
    }
    loadAll();
  }, []);

  /* Build platform cards with live data + fallback */
  const platforms = [
    {
      name: 'LeetCode',
      icon: SiLeetcode,
      color: '#FFA116',
      username: 'amankumar140',
      link: 'https://leetcode.com/u/amankumar140/',
      loading,
      stats: [
        { label: 'Problems Solved', value: lcData?.totalSolved ?? 500 },
        { label: 'Easy', value: lcData?.easySolved ?? '—' },
        { label: 'Medium', value: lcData?.mediumSolved ?? '—' },
        { label: 'Hard', value: lcData?.hardSolved ?? '—' },
        { label: 'Ranking', value: lcData?.ranking ? `#${lcData.ranking.toLocaleString()}` : '—' },
      ],
    },
    {
      name: 'Codeforces',
      icon: SiCodeforces,
      color: '#1F8ACB',
      username: 'amankr196',
      link: 'https://codeforces.com/profile/amankr196',
      loading,
      stats: [
        { label: 'Rating', value: cfData?.rating ?? '—' },
        { label: 'Max Rating', value: cfData?.maxRating ?? '—' },
        {
          label: 'Rank',
          value: cfData?.rank
            ? cfData.rank.charAt(0).toUpperCase() + cfData.rank.slice(1)
            : '—',
        },
        {
          label: 'Max Rank',
          value: cfData?.maxRank
            ? cfData.maxRank.charAt(0).toUpperCase() + cfData.maxRank.slice(1)
            : '—',
        },
      ],
    },
    {
      name: 'CodeChef',
      icon: SiCodechef,
      color: '#5B4638',
      username: 'amankr_20',
      link: 'https://www.codechef.com/users/amankr_20',
      loading,
      stats: [
        { label: 'Rating', value: ccData?.rating ?? '—' },
        { label: 'Stars', value: ccData?.stars ? `${ccData.stars}★` : '—' },
        { label: 'Global Rank', value: ccData?.globalRank ? `#${ccData.globalRank.toLocaleString()}` : '—' },
        { label: 'Problems Solved', value: ccData?.problemsSolved ?? '100+' },
      ],
      badge: ccData?.stars ? `${ccData.stars}★` : 'Competitive',
    },
    {
      name: 'HackerRank',
      icon: SiHackerrank,
      color: '#00EA64',
      username: 'aman140426',
      link: 'https://www.hackerrank.com/profile/aman140426',
      loading: false,
      stats: [
        { label: 'Problems Solved', value: '150+' },
        { label: 'Language', value: 'C++' },
      ],
      badge: '4★ C++',
    },
    {
      name: 'GitHub',
      icon: FaGithub,
      color: '#8B5CF6',
      username: 'Amankumar140',
      link: 'https://github.com/Amankumar140',
      loading,
      stats: [
        { label: 'Public Repos', value: ghData?.publicRepos ?? '—' },
        { label: 'Followers', value: ghData?.followers ?? '—' },
        { label: 'Following', value: ghData?.following ?? '—' },
      ],
    },
  ];

  return (
    <SectionWrapper id="dsa">
      {/* Heading */}
      <div className="text-center" style={{ marginBottom: '48px' }}>
        <motion.h2
          className="text-3xl md:text-4xl font-bold"
          style={{ color: 'var(--text-primary)', marginBottom: '12px' }}
        >
          DSA & <span className="gradient-text">Problem Solving</span>
        </motion.h2>
        <div
          style={{
            width: '60px',
            height: '3px',
            margin: '0 auto 16px',
            borderRadius: '4px',
            background: 'linear-gradient(90deg, var(--accent), var(--accent-light))',
          }}
        />
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '520px', margin: '0 auto' }}>
          Real-time coding profiles — data fetched live from platform APIs
        </p>
      </div>

      {/* Card grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px',
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        {platforms.map((p, i) => (
          <PlatformCard key={p.name} platform={p} index={i} />
        ))}
      </div>

      {/* Skeleton animation keyframes */}
      <style>{`
        @keyframes pulse-skeleton {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </SectionWrapper>
  );
}
