import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'LUXURY WEDDING',
    category: 'Wedding Photography',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    span: 'col-span-2 row-span-2'
  },
  {
    id: 2,
    title: 'CORPORATE EVENT',
    category: 'Event Coverage',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
    span: 'col-span-1 row-span-1'
  },
  {
    id: 3,
    title: 'FASHION EDITORIAL',
    category: 'Fashion Photography',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80',
    span: 'col-span-1 row-span-1'
  },
  {
    id: 4,
    title: 'SPORTS ACTION',
    category: 'Sports Photography',
    image: 'https://images.unsplash.com/photo-1461896836934- voices?w=600&q=80',
    span: 'col-span-1 row-span-2'
  },
  {
    id: 5,
    title: 'PRODUCT SHOOT',
    category: 'Commercial Photography',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
    span: 'col-span-1 row-span-1'
  },
  {
    id: 6,
    title: 'REAL ESTATE',
    category: 'Architecture Photography',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
    span: 'col-span-2 row-span-1'
  }
];

export default function BentoGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, i) => {
        if (!item) return;

        gsap.from(item, {
          y: 100,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
          },
          delay: (i % 3) * 0.1
        });
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bento-section">
      <style>{`
        .bento-section {
          background-color: #000000;
          border-top: 1px solid #000000;
          padding: 6rem 2rem;
        }

        .bento-container {
          max-width: 1280px;
          margin: 0 auto;
        }

        .bento-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 4rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .bento-title-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .bento-small-title {
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #dc2626;
        }

        .bento-main-title {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: 5rem;
          line-height: 1;
          color: #ffffff;
          letter-spacing: -0.03em;
        }

        .bento-view-all {
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.5);
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          transition: color 0.3s ease;
        }

        .bento-view-all:hover {
          color: #ffffff;
        }

        .bento-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: minmax(200px, auto);
          gap: 1.5rem;
        }

        .bento-item {
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }

        .bento-item:first-child {
          grid-column: span 2;
          grid-row: span 2;
        }

        .bento-item:nth-child(4) {
          grid-column: span 1;
          grid-row: span 2;
        }

        .bento-item:nth-child(6) {
          grid-column: span 2;
          grid-row: span 1;
        }

        .bento-item-inner {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background-color: rgba(255, 255, 255, 0.05);
        }

        .bento-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(100%);
          transition: all 0.7s ease;
        }

        .bento-item:hover img {
          filter: grayscale(0%);
          transform: scale(1.05);
        }

        .bento-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.2), transparent);
        }

        .bento-content {
          position: absolute;
          inset: 0;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        .bento-category {
          font-family: 'Inter', sans-serif;
          font-size: 0.65rem;
          color: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.2em;
          margin-bottom: 0.5rem;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .bento-item:hover .bento-category {
          opacity: 1;
        }

        .bento-title {
          font-family: 'Inter', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.3;
        }

        .bento-border {
          position: absolute;
          inset: 0;
          border: 1px solid transparent;
          transition: border-color 0.5s ease;
        }

        .bento-item:hover .bento-border {
          border-color: rgba(255, 255, 255, 0.2);
        }

        @media (max-width: 768px) {
          .bento-section {
            padding: 4rem 1.5rem;
          }

          .bento-main-title {
            font-size: 3rem;
          }

          .bento-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .bento-grid {
            grid-template-columns: 1fr;
            grid-auto-rows: minmax(250px, auto);
          }

          .bento-item:first-child,
          .bento-item:nth-child(4),
          .bento-item:nth-child(6) {
            grid-column: span 1;
            grid-row: span 1;
          }
        }
      `}</style>

      <div className="bento-container">
        {/* Section Header */}
        <div className="bento-header">
          <div className="bento-title-group">
            <p className="bento-small-title">Selected Work</p>
            <h2 className="bento-main-title">PROJECTS</h2>
          </div>
          <a href="#work" className="bento-view-all">View All →</a>
        </div>

        {/* Bento Grid */}
        <div className="bento-grid">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => { itemsRef.current[index] = el; }}
              className="bento-item"
            >
              <div className="bento-item-inner">
                <img src={project.image} alt={project.title} />
                <div className="bento-overlay" />
                <div className="bento-content">
                  <p className="bento-category">{project.category}</p>
                  <h3 className="bento-title">{project.title}</h3>
                </div>
                <div className="bento-border" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
