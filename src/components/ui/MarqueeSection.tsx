export default function MarqueeSection() {
  const items = [
    'PHOTOGRAPHY',
    'VIDEOGRAPHY',
    'WEDDING COVERAGE',
    'CORPORATE EVENTS',
    'FASHION EDITORIAL',
    'SPORTS PHOTOGRAPHY',
    'REAL ESTATE',
    'AERIAL DRONE'
  ];

  return (
    <section className="marquee-section">
      <style>{`
        .marquee-section {
          padding: 4rem 0;
          overflow: hidden;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          background-color: #000000;
        }

        .marquee-wrapper {
          display: flex;
          align-items: center;
          white-space: nowrap;
          animation: marquee 30s linear infinite;
        }

        .marquee-item {
          display: flex;
          align-items: center;
          gap: 2rem;
          padding: 0 2rem;
        }

        .marquee-text {
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.7);
          text-transform: uppercase;
          letter-spacing: 0.25em;
          font-weight: 500;
        }

        .marquee-dot {
          width: 6px;
          height: 6px;
          background-color: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
        }

        .marquee-fade-left {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 8rem;
          background: linear-gradient(to right, #000000, transparent);
          pointer-events: none;
        }

        .marquee-fade-right {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 8rem;
          background: linear-gradient(to left, #000000, transparent);
          pointer-events: none;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
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

      <div className="marquee-wrapper">
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} className="marquee-item">
            <span className="marquee-text">{item}</span>
            <span className="marquee-dot" />
          </span>
        ))}
      </div>

      {/* Gradient Fades */}
      <div className="marquee-fade-left" />
      <div className="marquee-fade-right" />
    </section>
  );
}
