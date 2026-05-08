'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

const stats = [
  {
    id: 1,
    value: 500,
    suffix: '+',
    label: 'Projects Completed',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
        <circle cx="12" cy="13" r="4"/>
      </svg>
    ),
  },
  {
    id: 2,
    value: 10,
    suffix: '+',
    label: 'Years Experience',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    id: 3,
    value: 450,
    suffix: '+',
    label: 'Happy Clients',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
  {
    id: 4,
    value: 15,
    suffix: '+',
    label: 'Team Members',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    id: 5,
    value: 50,
    suffix: '+',
    label: 'Awards Won',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="7"/>
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
      </svg>
    ),
  },
  {
    id: 6,
    value: 100,
    suffix: '%',
    label: 'Client Satisfaction',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  }
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const startTime = Date.now();

          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOutQuart * value));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          animate();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, value]);

  return (
    <div ref={ref} className="stat-counter-wrapper">
      <span className="stat-counter">{count}</span>
      <span className="stat-suffix">{suffix}</span>
    </div>
  );
}

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  return (
    <motion.div
      className="stat-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      <div className="stat-icon-wrapper">
        {stat.icon}
      </div>
      <div className="stat-content">
        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
        <h3 className="stat-label">{stat.label}</h3>
      </div>
    </motion.div>
  );
}

export default function StatsSection() {
  return (
    <section className="stats-section">
      {/* Background gradient */}
      <div className="stats-bg-gradient" />

      <div className="stats-container">
        {/* Header */}
        <motion.div
          className="stats-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="stats-eyebrow">Our Track Record</span>
          <h2 className="stats-title">
            <span className="stats-title-line">Numbers</span>
            <span className="stats-title-line stats-title-accent">That Matter</span>
          </h2>
          <p className="stats-subtitle">
            Proven excellence through years of delivering exceptional visual stories
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <StatCard key={stat.id} stat={stat} index={index} />
          ))}
        </div>

        {/* Divider */}
        <motion.div
          className="stats-divider"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className="divider-line" />
          <span className="divider-dot" />
          <span className="divider-line" />
        </motion.div>

        {/* CTA */}
        <motion.div
          className="stats-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="stats-cta-text">Ready to add your story to our portfolio?</p>
          <a href="#contact" className="stats-cta-btn">
            <span>Start Your Project</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </motion.div>
      </div>

      <style>{`
        .stats-section {
          position: relative;
          background: var(--bg-primary);
          padding: 8rem 2rem;
          overflow: hidden;
        }

        .stats-bg-gradient {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 50%, rgba(220, 38, 38, 0.03) 0%, transparent 70%);
          pointer-events: none;
        }

        .stats-container {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          z-index: 1;
        }

        /* Header */
        .stats-header {
          text-align: center;
          margin-bottom: 5rem;
        }

        .stats-eyebrow {
          display: inline-block;
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #dc2626;
          margin-bottom: 1.5rem;
        }

        .stats-title {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          margin: 0 0 1.5rem;
        }

        .stats-title-line {
          display: block;
        }

        .stats-title-accent {
          color: transparent;
          -webkit-text-stroke: 2px var(--border-hover);
        }

        .stats-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 1.125rem;
          font-weight: 400;
          color: var(--text-secondary);
          max-width: 500px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-bottom: 5rem;
        }

        /* Stat Card */
        .stat-card {
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          padding: 2.5rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 1.25rem;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          border-color: var(--card-border-hover);
          transform: translateY(-4px);
        }

        .stat-icon-wrapper {
          width: 48px;
          height: 48px;
          background: rgba(220, 38, 38, 0.1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #dc2626;
          transition: all 0.3s ease;
        }

        .stat-card:hover .stat-icon-wrapper {
          background: #dc2626;
          color: #ffffff;
        }

        .stat-content {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .stat-counter-wrapper {
          display: flex;
          align-items: baseline;
          gap: 0.125rem;
        }

        .stat-counter {
          font-family: 'Inter', sans-serif;
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1;
          letter-spacing: -0.02em;
        }

        .stat-suffix {
          font-family: 'Inter', sans-serif;
          font-size: clamp(1.25rem, 2.5vw, 1.75rem);
          font-weight: 700;
          color: #dc2626;
        }

        .stat-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin: 0;
        }

        /* Divider */
        .stats-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 4rem;
          transform-origin: center;
        }

        .divider-line {
          width: 80px;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border-color), transparent);
        }

        .divider-dot {
          width: 6px;
          height: 6px;
          background: #dc2626;
          border-radius: 50%;
        }

        /* CTA */
        .stats-cta {
          text-align: center;
        }

        .stats-cta-text {
          font-family: 'Inter', sans-serif;
          font-size: 1.25rem;
          font-weight: 400;
          color: var(--text-secondary);
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .stats-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 2rem;
          background: #dc2626;
          border: none;
          color: #ffffff;
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          text-decoration: none;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .stats-cta-btn:hover {
          background: #b91c1c;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px -10px rgba(220, 38, 38, 0.4);
        }

        .stats-cta-btn svg {
          transition: transform 0.3s ease;
        }

        .stats-cta-btn:hover svg {
          transform: translateX(4px);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.25rem;
          }

          .stat-card {
            padding: 2rem 1.5rem;
          }
        }

        @media (max-width: 640px) {
          .stats-section {
            padding: 5rem 1.5rem;
          }

          .stats-header {
            margin-bottom: 3rem;
          }

          .stats-title {
            font-size: clamp(2rem, 8vw, 3rem);
          }

          .stats-title-accent {
            -webkit-text-stroke: 1.5px var(--border-hover);
          }

          .stats-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
            margin-bottom: 3rem;
          }

          .stat-card {
            flex-direction: row;
            align-items: center;
            padding: 1.5rem;
            gap: 1rem;
          }

          .stat-icon-wrapper {
            width: 44px;
            height: 44px;
            flex-shrink: 0;
          }

          .stat-content {
            gap: 0.25rem;
          }

          .stat-label {
            font-size: 0.75rem;
          }

          .stats-cta-text {
            font-size: 1.125rem;
            margin-bottom: 1.5rem;
          }

          .stats-cta-btn {
            padding: 0.875rem 1.5rem;
            font-size: 0.8125rem;
          }
        }
      `}</style>
    </section>
  );
}
