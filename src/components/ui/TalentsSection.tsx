import { useState } from 'react';

const talents = [
  {
    id: 1,
    name: 'AHMED KHAN',
    role: 'Lead Photographer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    discipline: 'Photography'
  },
  {
    id: 2,
    name: 'SARA ALI',
    role: 'Videographer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    discipline: 'Videography'
  },
  {
    id: 3,
    name: 'OMAR HASSAN',
    role: 'Creative Director',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    discipline: 'Direction'
  },
  {
    id: 4,
    name: 'FATIMA MALIK',
    role: 'Photo Editor',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
    discipline: 'Editing'
  },
  {
    id: 5,
    name: 'YUSUF IBRAHIM',
    role: 'Drone Operator',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    discipline: 'Aerial'
  },
  {
    id: 6,
    name: 'LAYLA OMAR',
    role: 'Art Director',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
    discipline: 'Creative'
  }
];

export default function TalentsSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="talents-section">
      <style>{`
        .talents-section {
          background-color: #ffffff;
          border-top: 1px solid #000000;
          padding: 6rem 2rem;
        }

        .talents-container {
          max-width: 1280px;
          margin: 0 auto;
        }

        .talents-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 4rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid #000000;
        }

        .talents-title-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .talents-small-title {
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #dc2626;
        }

        .talents-main-title {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: 5rem;
          line-height: 1;
          color: #000000;
          letter-spacing: -0.03em;
        }

        .talents-join {
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem;
          color: rgba(0, 0, 0, 0.5);
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          transition: color 0.3s ease;
        }

        .talents-join:hover {
          color: #dc2626;
        }

        .talents-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3rem;
        }

        .talent-card {
          cursor: pointer;
        }

        .talent-image-wrapper {
          position: relative;
          aspect-ratio: 3/4;
          overflow: hidden;
          margin-bottom: 1.5rem;
          background-color: rgba(0, 0, 0, 0.05);
        }

        .talent-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(100%);
          transition: all 0.7s ease;
        }

        .talent-card:hover .talent-image {
          filter: grayscale(0%);
          transform: scale(1.05);
        }

        .talent-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          padding: 0.5rem 1rem;
          background-color: #000000;
          color: #ffffff;
          font-family: 'Inter', sans-serif;
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
        }

        .talent-name {
          font-family: 'Inter', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: #000000;
          margin-bottom: 0.25rem;
        }

        .talent-role {
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem;
          color: rgba(0, 0, 0, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.15em;
        }

        .talents-bg {
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
          pointer-events: none;
          overflow: hidden;
          opacity: 0.03;
        }

        .talents-bg-text {
          font-family: 'Inter', sans-serif;
          font-size: 15vw;
          font-weight: 800;
          color: #000000;
          white-space: nowrap;
        }

        @media (max-width: 768px) {
          .talents-section {
            padding: 4rem 1.5rem;
          }

          .talents-main-title {
            font-size: 3rem;
          }

          .talents-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .talents-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
          }
        }
      `}</style>

      <div className="talents-container">
        {/* Section Header */}
        <div className="talents-header">
          <div className="talents-title-group">
            <p className="talents-small-title">The Team</p>
            <h2 className="talents-main-title">TALENTS</h2>
          </div>
          <a href="#talents" className="talents-join">Join Us →</a>
        </div>

        {/* Talents Grid */}
        <div className="talents-grid">
          {talents.map((talent) => (
            <div
              key={talent.id}
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
                />
                <div className="talent-badge">{talent.discipline}</div>
              </div>

              {/* Info */}
              <h3 className="talent-name">{talent.name}</h3>
              <p className="talent-role">{talent.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
