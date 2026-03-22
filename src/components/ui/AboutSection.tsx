import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-text', {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      });

      gsap.from('.about-image', {
        x: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="about-section">
      <style>{`
        .about-section {
          background-color: #ffffff;
          border-top: 1px solid #000000;
          padding: 6rem 2rem;
        }

        .about-grid {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 4rem;
          justify-content: space-between;
        }

        .about-left {
          flex: 1;
          max-width: 50%;
        }

        .about-right {
          flex: 1;
          max-width: 40%;
        }

        .about-small-title {
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #dc2626;
          margin-bottom: 1rem;
        }

        .about-main-heading {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: 3.5rem;
          line-height: 1.1;
          color: #000000;
          margin-bottom: 2rem;
          letter-spacing: -0.02em;
        }

        .about-description {
          font-size: 1rem;
          color: #737373;
          line-height: 1.8;
          margin-bottom: 1.5rem;
        }

        .about-stats {
          display: flex;
          gap: 3rem;
          padding-top: 2rem;
          border-top: 1px solid #000000;
          margin-top: 2rem;
        }

        .about-stat-item {
          text-align: left;
        }

        .about-stat-number {
          font-family: 'Inter', sans-serif;
          font-size: 3rem;
          color: #000000;
          font-weight: 800;
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .about-stat-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.65rem;
          color: #737373;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          font-weight: 600;
        }

        .about-image-wrapper {
          position: relative;
          border: 2px solid #000000;
          padding: 0;
          background-color: #ffffff;
        }

        .about-image {
          width: 100%;
          display: block;
          filter: grayscale(100%);
          transition: filter 0.3s ease;
        }

        .about-image:hover {
          filter: grayscale(0%);
        }

        .about-image-decor {
          position: absolute;
          bottom: -12px;
          left: -12px;
          width: 60px;
          height: 60px;
          background-color: #dc2626;
          z-index: -1;
        }

        .about-image-decor-2 {
          position: absolute;
          top: -12px;
          right: -12px;
          width: 40px;
          height: 40px;
          border: 2px solid #000000;
          background-color: #ffffff;
          z-index: -1;
        }

        @media (max-width: 768px) {
          .about-grid {
            flex-direction: column;
            gap: 4rem;
          }

          .about-left,
          .about-right {
            max-width: 100%;
            width: 100%;
          }

          .about-main-heading {
            font-size: 2.5rem;
          }

          .about-stats {
            flex-wrap: wrap;
            gap: 2rem;
          }

          .about-stat-item {
            flex: 1;
            min-width: 120px;
          }

          .about-stat-number {
            font-size: 2.5rem;
          }
        }
      `}</style>

      <div className="about-grid">
        {/* Left Side: Text Content */}
        <div className="about-left about-text">
          <p className="about-small-title">Who We Are</p>
          <h2 className="about-main-heading">
            Capturing Moments,<br />
            Creating Memories
          </h2>
          <p className="about-description">
            Mark Media is a premier photography and videography studio based in the United Arab Emirates. We specialize in transforming moments into timeless visual stories through our comprehensive range of professional photography services.
          </p>
          <p className="about-description">
            From breathtaking weddings to high-energy events, sophisticated corporate campaigns to intimate fashion editorials, we bring creativity, precision, and passion to every project.
          </p>

          {/* Stats */}
          <div className="about-stats">
            <div className="about-stat-item">
              <p className="about-stat-number">500+</p>
              <p className="about-stat-label">Projects</p>
            </div>
            <div className="about-stat-item">
              <p className="about-stat-number">10+</p>
              <p className="about-stat-label">Years</p>
            </div>
            <div className="about-stat-item">
              <p className="about-stat-number">450+</p>
              <p className="about-stat-label">Clients</p>
            </div>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="about-right about-image">
          <div className="about-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
              alt="Mark Media Studio"
              className="about-image"
            />
            <div className="about-image-decor"></div>
            <div className="about-image-decor-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
