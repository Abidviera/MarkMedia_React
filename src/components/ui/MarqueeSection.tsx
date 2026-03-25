const ITEMS = [
  'PHOTOGRAPHY',
  'VIDEOGRAPHY',
  'WEDDING COVERAGE',
  'CORPORATE EVENTS',
  'FASHION EDITORIAL',
  'SPORTS PHOTOGRAPHY',
  'REAL ESTATE',
  'AERIAL DRONE'
] as const;

export default function MarqueeSection() {
  // Only need 2x items for seamless infinite loop
  const doubledItems = [...ITEMS, ...ITEMS];

  return (
    <section className="marquee-section">
      <div className="marquee-track" aria-hidden="true">
        <div className="marquee-inner">
          {doubledItems.map((item, i) => (
            <span key={i} className="marquee-item">
              <span className="marquee-text">{item}</span>
              <span className="marquee-dot" />
            </span>
          ))}
        </div>
      </div>

      {/* Gradient Fades */}
      <div className="marquee-fade marquee-fade-left" />
      <div className="marquee-fade marquee-fade-right" />

      <style>{`
        .marquee-section {
          position: relative;
          padding: 4rem 0;
          overflow: hidden;
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
          background-color: var(--bg-primary);
          contain: layout style;
        }

        .marquee-track {
          position: relative;
          overflow: hidden;
        }

        .marquee-inner {
          display: flex;
          align-items: center;
          width: max-content;
          animation: marquee-scroll 30s linear infinite;
          /* GPU optimization hints */
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          perspective: 1000px;
        }

        .marquee-inner:hover {
          animation-play-state: paused;
        }

        .marquee-item {
          display: flex;
          align-items: center;
          gap: 2rem;
          padding: 0 2rem;
          flex-shrink: 0;
        }

        .marquee-text {
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.25em;
          font-weight: 500;
          /* Prevent text rendering issues during animation */
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
        }

        .marquee-dot {
          width: 6px;
          height: 6px;
          background-color: var(--text-dim);
          border-radius: 50%;
          flex-shrink: 0;
        }

        .marquee-fade {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 8rem;
          pointer-events: none;
          z-index: 1;
        }

        .marquee-fade-left {
          left: 0;
          background: linear-gradient(to right, var(--bg-primary), transparent);
        }

        .marquee-fade-right {
          right: 0;
          background: linear-gradient(to left, var(--bg-primary), transparent);
        }

        @keyframes marquee-scroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @media (max-width: 768px) {
          .marquee-section {
            padding: 3rem 0;
          }

          .marquee-text {
            font-size: 0.65rem;
            letter-spacing: 0.15em;
          }
        }
      `}</style>
    </section>
  );
}
