import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const talents = [
  {
    id: 1,
    name: 'AHMED KHAN',
    role: 'Lead Photographer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    discipline: 'Photography'
  },
  {
    id: 2,
    name: 'SARA ALI',
    role: 'Videographer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80',
    discipline: 'Videography'
  },
  {
    id: 3,
    name: 'OMAR HASSAN',
    role: 'Creative Director',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80',
    discipline: 'Direction'
  },
  {
    id: 4,
    name: 'FATIMA MALIK',
    role: 'Photo Editor',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80',
    discipline: 'Editing'
  },
  {
    id: 5,
    name: 'YUSUF IBRAHIM',
    role: 'Drone Operator',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80',
    discipline: 'Aerial'
  },
  {
    id: 6,
    name: 'LAYLA OMAR',
    role: 'Art Director',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80',
    discipline: 'Creative'
  }
];

export default function TalentsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section header
      gsap.from('.talents-heading-line', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.talents-header',
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      // Animate cards with stagger
      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        gsap.from(card, {
          y: 80,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          delay: (i % 3) * 0.1,
        });
      });

      // Animate background text
      gsap.from('.talents-bg-text', {
        x: 100,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.talents-section',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="talents-section">
      <style>{`
        .talents-section {
          position: relative;
          background-color: var(--bg-primary);
          border-top: 1px solid var(--border-color);
          padding: 8rem 2rem;
          overflow: hidden;
        }

        .talents-container {
          position: relative;
          max-width: 1400px;
          margin: 0 auto;
          z-index: 2;
        }

        .talents-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 5rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid var(--border-color);
        }

        .talents-title-group {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .talents-eyebrow {
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: #dc2626;
        }

        .talents-main-title {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: clamp(4rem, 10vw, 8rem);
          line-height: 1;
          color: var(--text-primary);
          letter-spacing: -0.03em;
          text-transform: uppercase;
          overflow: hidden;
        }

        .talents-heading-line {
          display: block;
        }

        .talents-heading-accent {
          color: transparent;
          -webkit-text-stroke: 1px var(--border-hover);
        }

        .talents-view-all {
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem;
          color: var(--text-dim);
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          transition: color 0.3s ease;
          position: relative;
          padding-bottom: 0.5rem;
        }

        .talents-view-all::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: var(--accent);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.3s ease;
        }

        .talents-view-all:hover {
          color: var(--text-primary);
        }

        .talents-view-all:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        .talents-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .talent-card {
          position: relative;
          cursor: pointer;
          transform: translate3d(0, 0, 0);
          will-change: transform;
        }

        .talent-image-wrapper {
          position: relative;
          aspect-ratio: 3/4;
          overflow: hidden;
          margin-bottom: 1.5rem;
          background-color: var(--card-bg);
        }

        .talent-image-wrapper::before {
          content: '';
          position: absolute;
          inset: 0;
          border: 1px solid transparent;
          transition: border-color 0.5s ease;
          z-index: 2;
          pointer-events: none;
        }

        .talent-card:hover .talent-image-wrapper::before {
          border-color: var(--card-border-hover);
        }

        .talent-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(100%) contrast(1.1);
          transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
          transform: scale3d(1.05, 1.05, 1);
        }

        .talent-card:hover .talent-image {
          filter: grayscale(0%) contrast(1);
          transform: scale3d(1.1, 1.1, 1);
        }

        .talent-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.9) 0%,
            rgba(0, 0, 0, 0.3) 30%,
            transparent 60%
          );
          opacity: 0;
          transition: opacity 0.5s ease;
          z-index: 1;
        }

        .talent-card:hover .talent-overlay {
          opacity: 1;
        }

        .talent-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          padding: 0.5rem 1rem;
          background-color: var(--shadow);
          backdrop-filter: blur(10px);
          color: var(--text-primary);
          font-family: 'Inter', sans-serif;
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          z-index: 3;
          border: 1px solid var(--border-color);
          transition: all 0.3s ease;
        }

        .talent-card:hover .talent-badge {
          background-color: var(--accent);
          border-color: var(--accent);
        }

        .talent-info {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .talent-name {
          font-family: 'Inter', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: 0.02em;
          transition: color 0.3s ease;
        }

        .talent-card:hover .talent-name {
          color: var(--text-muted);
        }

        .talent-role {
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem;
          color: var(--text-dim);
          text-transform: uppercase;
          letter-spacing: 0.15em;
        }

        .talent-line {
          width: 0;
          height: 1px;
          background: var(--accent);
          margin-top: 0.75rem;
          transition: width 0.5s ease;
        }

        .talent-card:hover .talent-line {
          width: 3rem;
        }

        /* Background decorative text */
        .talents-bg {
          position: absolute;
          top: 50%;
          right: -5%;
          transform: translateY(-50%);
          pointer-events: none;
          z-index: 1;
        }

        .talents-bg-text {
          font-family: 'Inter', sans-serif;
          font-size: 20vw;
          font-weight: 800;
          color: var(--text-primary);
          white-space: nowrap;
          opacity: 0.02;
          letter-spacing: -0.05em;
          user-select: none;
        }

        @media (max-width: 1024px) {
          .talents-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .talents-section {
            padding: 5rem 1.5rem;
          }

          .talents-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.5rem;
            margin-bottom: 3rem;
          }

          .talents-main-title {
            font-size: 3rem;
          }

          .talents-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .talents-bg-text {
            font-size: 40vw;
            right: -20%;
          }
        }
      `}</style>

      <div className="talents-container">
        {/* Section Header */}
        <div className="talents-header">
          <div className="talents-title-group">
            <p className="talents-eyebrow">The Team</p>
            <h2 className="talents-main-title">
              <span className="talents-heading-line">CREATIVE</span>
              <span className="talents-heading-line talents-heading-accent">
                TALENTS
              </span>
            </h2>
          </div>
          <a href="#team" className="talents-view-all">
            Join Our Team →
          </a>
        </div>

        {/* Talents Grid */}
        <div className="talents-grid">
          {talents.map((talent, index) => (
            <div
              key={talent.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="talent-card"
              onMouseEnter={() => setHoveredId(talent.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image */}
              <div className="talent-image-wrapper">
                <img
                  src={talent.image}
                  alt={talent.name}
                  className="talent-image"
                  loading="lazy"
                />
                <div className="talent-overlay" />
                <div className="talent-badge">{talent.discipline}</div>
              </div>

              {/* Info */}
              <div className="talent-info">
                <h3 className="talent-name">{talent.name}</h3>
                <p className="talent-role">{talent.role}</p>
                <div className="talent-line" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background Text */}
      <div className="talents-bg">
        <span className="talents-bg-text">TEAM</span>
      </div>
    </section>
  );
}
