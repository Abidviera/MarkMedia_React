import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'LUXURY WEDDING',
    category: 'Wedding Photography',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
    span: 'col-span-2 row-span-2'
  },
  {
    id: 2,
    title: 'CORPORATE EVENT',
    category: 'Event Coverage',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    span: 'col-span-1 row-span-1'
  },
  {
    id: 3,
    title: 'FASHION EDITORIAL',
    category: 'Fashion Photography',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80',
    span: 'col-span-1 row-span-1'
  },
  {
    id: 4,
    title: 'SPORTS ACTION',
    category: 'Sports Photography',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80',
    span: 'col-span-1 row-span-2'
  },
  {
    id: 5,
    title: 'PRODUCT SHOOT',
    category: 'Commercial Photography',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    span: 'col-span-1 row-span-1'
  },
  {
    id: 6,
    title: 'REAL ESTATE',
    category: 'Architecture Photography',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
    span: 'col-span-2 row-span-1'
  }
];

export default function BentoGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header
      gsap.from('.bento-heading-line', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.bento-header',
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      // Animate each bento item with staggered reveal
      itemsRef.current.forEach((item, i) => {
        if (!item) return;

        // Set initial state
        gsap.set(item, { opacity: 0, y: 60 });

        // Create timeline for each item
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          }
        });

        tl.to(item, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: (i % 3) * 0.1,
        });

        // Image parallax effect
        const img = item.querySelector('.bento-item-img');
        if (img) {
          gsap.fromTo(img,
            { y: '10%' },
            {
              y: '-10%',
              ease: 'none',
              scrollTrigger: {
                trigger: item,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              }
            }
          );
        }
      });

      // Background text animation
      gsap.from('.bento-bg-text', {
        x: -100,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.bento-section',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={gridRef} className="bento-section">
      <style>{`
        .bento-section {
          position: relative;
          background-color: #000000;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding: 8rem 2rem;
          overflow: hidden;
        }

        .bento-container {
          position: relative;
          max-width: 1400px;
          margin: 0 auto;
          z-index: 2;
        }

        .bento-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 5rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .bento-title-group {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .bento-eyebrow {
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: #dc2626;
        }

        .bento-main-title {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: clamp(4rem, 10vw, 8rem);
          line-height: 1;
          color: #ffffff;
          letter-spacing: -0.03em;
          text-transform: uppercase;
          overflow: hidden;
        }

        .bento-heading-line {
          display: block;
        }

        .bento-heading-accent {
          color: transparent;
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.5);
        }

        .bento-view-all {
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.5);
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          transition: color 0.3s ease;
          position: relative;
          padding-bottom: 0.5rem;
        }

        .bento-view-all::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: #dc2626;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.3s ease;
        }

        .bento-view-all:hover {
          color: #ffffff;
        }

        .bento-view-all:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        .bento-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: minmax(250px, auto);
          gap: 1.5rem;
        }

        .bento-item {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transform: translate3d(0, 0, 0);
          will-change: transform, opacity;
        }

        .bento-item:first-child {
          grid-column: span 2;
          grid-row: span 2;
          min-height: 520px;
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
          background-color: rgba(255, 255, 255, 0.02);
        }

        .bento-item-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 120%;
          top: -10%;
          object-fit: cover;
          filter: grayscale(100%) contrast(1.1);
          transition: filter 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
          transform: scale3d(1, 1, 1);
        }

        .bento-item:hover .bento-item-img {
          filter: grayscale(0%) contrast(1);
          transform: scale3d(1.08, 1.08, 1);
        }

        .bento-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.95) 0%,
            rgba(0, 0, 0, 0.4) 40%,
            rgba(0, 0, 0, 0.1) 70%,
            transparent 100%
          );
          transition: background 0.5s ease;
          z-index: 1;
        }

        .bento-item:hover .bento-overlay {
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.95) 0%,
            rgba(0, 0, 0, 0.5) 30%,
            rgba(0, 0, 0, 0.2) 60%,
            rgba(0, 0, 0, 0.1) 100%
          );
        }

        .bento-content {
          position: absolute;
          inset: 0;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          z-index: 2;
        }

        .bento-category {
          font-family: 'Inter', sans-serif;
          font-size: 0.6rem;
          color: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.2em;
          margin-bottom: 0.75rem;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.4s ease;
        }

        .bento-item:hover .bento-category {
          opacity: 1;
          transform: translateY(0);
        }

        .bento-title {
          font-family: 'Inter', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.2;
          margin-bottom: 0.5rem;
        }

        .bento-arrow {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          transition: all 0.4s ease;
          transform: translateX(-10px);
          opacity: 0;
        }

        .bento-item:hover .bento-arrow {
          color: #dc2626;
          transform: translateX(0);
          opacity: 1;
        }

        .bento-border {
          position: absolute;
          inset: 0;
          border: 1px solid transparent;
          transition: border-color 0.5s ease;
          z-index: 3;
          pointer-events: none;
        }

        .bento-item:hover .bento-border {
          border-color: rgba(255, 255, 255, 0.15);
        }

        /* Animated corner lines */
        .bento-corner {
          position: absolute;
          width: 20px;
          height: 20px;
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: 4;
        }

        .bento-corner::before,
        .bento-corner::after {
          content: '';
          position: absolute;
          background: #dc2626;
          transition: transform 0.4s ease;
        }

        .bento-corner.top-left {
          top: 10px;
          left: 10px;
        }

        .bento-corner.top-left::before {
          top: 0;
          left: 0;
          width: 20px;
          height: 1px;
          transform: scaleX(0);
          transform-origin: left;
        }

        .bento-corner.top-left::after {
          top: 0;
          left: 0;
          width: 1px;
          height: 20px;
          transform: scaleY(0);
          transform-origin: top;
        }

        .bento-corner.bottom-right {
          bottom: 10px;
          right: 10px;
        }

        .bento-corner.bottom-right::before {
          bottom: 0;
          right: 0;
          width: 20px;
          height: 1px;
          transform: scaleX(0);
          transform-origin: right;
        }

        .bento-corner.bottom-right::after {
          bottom: 0;
          right: 0;
          width: 1px;
          height: 20px;
          transform: scaleY(0);
          transform-origin: bottom;
        }

        .bento-item:hover .bento-corner {
          opacity: 1;
        }

        .bento-item:hover .bento-corner.top-left::before,
        .bento-item:hover .bento-corner.top-left::after {
          transform: scaleX(1);
        }

        .bento-item:hover .bento-corner.bottom-right::before,
        .bento-item:hover .bento-corner.bottom-right::after {
          transform: scaleY(1);
        }

        /* Background decoration */
        .bento-bg {
          position: absolute;
          top: 50%;
          right: -10%;
          transform: translateY(-50%);
          pointer-events: none;
          z-index: 1;
        }

        .bento-bg-text {
          font-family: 'Inter', sans-serif;
          font-size: 25vw;
          font-weight: 800;
          color: #ffffff;
          white-space: nowrap;
          opacity: 0.02;
          letter-spacing: -0.05em;
          user-select: none;
        }

        @media (max-width: 1024px) {
          .bento-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: minmax(300px, auto);
          }

          .bento-item:first-child {
            grid-column: span 2;
            grid-row: span 1;
            min-height: 400px;
          }

          .bento-item:nth-child(4) {
            grid-column: span 1;
            grid-row: span 1;
          }

          .bento-item:nth-child(6) {
            grid-column: span 2;
            grid-row: span 1;
          }
        }

        @media (max-width: 768px) {
          .bento-section {
            padding: 5rem 1.5rem;
          }

          .bento-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.5rem;
            margin-bottom: 3rem;
          }

          .bento-main-title {
            font-size: 3rem;
          }

          .bento-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .bento-item:first-child,
          .bento-item:nth-child(4),
          .bento-item:nth-child(6) {
            grid-column: span 1;
            grid-row: span 1;
            min-height: 350px;
          }

          .bento-title {
            font-size: 1.25rem;
          }

          .bento-bg-text {
            font-size: 50vw;
            right: -30%;
          }
        }
      `}</style>

      <div className="bento-container">
        {/* Section Header */}
        <div className="bento-header">
          <div className="bento-title-group">
            <p className="bento-eyebrow">Selected Work</p>
            <h2 className="bento-main-title">
              <span className="bento-heading-line">PRO</span>
              <span className="bento-heading-line bento-heading-accent">JECTS</span>
            </h2>
          </div>
          <a href="#work" className="bento-view-all">View All Work →</a>
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
                <img
                  src={project.image}
                  alt={project.title}
                  className="bento-item-img"
                  loading="lazy"
                />
                <div className="bento-overlay" />
                <div className="bento-content">
                  <p className="bento-category">{project.category}</p>
                  <h3 className="bento-title">{project.title}</h3>
                  <span className="bento-arrow">
                    View Project →
                  </span>
                </div>
                <div className="bento-border" />
                <div className="bento-corner top-left" />
                <div className="bento-corner bottom-right" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background decoration */}
      <div className="bento-bg">
        <span className="bento-bg-text">WORK</span>
      </div>
    </section>
  );
}
