import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutMark() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate headings on scroll
      gsap.from(".craft-heading-line", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".craft-hero",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate stats
      gsap.from(".craft-stat", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".craft-stats",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate service cards
      gsap.from(".craft-service-card", {
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".craft-services",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="craft-section">
      <style>{`
        .craft-section {
          background-color: #000000;
          color: #ffffff;
          overflow: hidden;
        }

        .craft-hero {
          min-height: 80vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 8rem 2rem 4rem;
          position: relative;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .craft-hero-content {
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
        }

        .craft-eyebrow {
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: #dc2626;
          margin-bottom: 2rem;
        }

        .craft-main-heading {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: clamp(3rem, 12vw, 10rem);
          line-height: 0.9;
          letter-spacing: -0.03em;
          text-transform: uppercase;
          margin-bottom: 2rem;
        }

        .craft-heading-line {
          display: block;
        }

        .craft-heading-accent {
          color: transparent;
          -webkit-text-stroke: 1px #ffffff;
        }

        .craft-subheading {
          font-family: 'Inter', sans-serif;
          font-size: clamp(1rem, 2vw, 1.5rem);
          font-weight: 300;
          color: rgba(255, 255, 255, 0.6);
          max-width: 600px;
          line-height: 1.6;
          margin-top: 2rem;
        }

        .craft-camera-wrapper {
          position: absolute;
          right: 5%;
          top: 50%;
          transform: translateY(-50%);
          width: 40%;
          max-width: 500px;
          opacity: 0.3;
        }

        .craft-camera-wrapper img {
          width: 100%;
          height: auto;
        }

        /* Stats Section */
        .craft-stats {
          padding: 4rem 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .craft-stats-grid {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }

        .craft-stat {
          text-align: center;
          padding: 2rem;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
        }

        .craft-stat:last-child {
          border-right: none;
        }

        .craft-stat-number {
          font-family: 'Inter', sans-serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          color: #dc2626;
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .craft-stat-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: rgba(255, 255, 255, 0.5);
        }

        /* Services Section */
        .craft-services {
          padding: 6rem 2rem;
        }

        .craft-services-header {
          max-width: 1400px;
          margin: 0 auto 4rem;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 2rem;
        }

        .craft-services-title {
          font-family: 'Inter', sans-serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: -0.02em;
        }

        .craft-services-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.5);
          max-width: 400px;
        }

        .craft-services-grid {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background-color: rgba(255, 255, 255, 0.1);
        }

        .craft-service-card {
          background-color: #000000;
          padding: 3rem 2rem;
          position: relative;
          overflow: hidden;
          transition: all 0.4s ease;
        }

        .craft-service-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: #dc2626;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }

        .craft-service-card:hover::before {
          transform: scaleX(1);
        }

        .craft-service-card:hover {
          background-color: #0a0a0a;
        }

        .craft-service-number {
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          color: #dc2626;
          letter-spacing: 0.2em;
          margin-bottom: 1.5rem;
        }

        .craft-service-title {
          font-family: 'Inter', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: -0.01em;
        }

        .craft-service-desc {
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.5);
          line-height: 1.7;
        }

        /* CTA Section */
        .craft-cta {
          padding: 6rem 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
        }

        .craft-cta-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .craft-cta-heading {
          font-family: 'Inter', sans-serif;
          font-size: clamp(2rem, 5vw, 4rem);
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          margin-bottom: 2rem;
        }

        .craft-cta-btn {
          display: inline-block;
          padding: 1.25rem 3rem;
          background-color: #dc2626;
          color: #ffffff;
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .craft-cta-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s ease;
        }

        .craft-cta-btn:hover::before {
          left: 100%;
        }

        .craft-cta-btn:hover {
          background-color: #b91c1c;
          transform: translateY(-2px);
        }

        @media (max-width: 1024px) {
          .craft-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .craft-stat:nth-child(2) {
            border-right: none;
          }

          .craft-services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .craft-stats-grid {
            grid-template-columns: 1fr;
          }

          .craft-stat {
            border-right: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }

          .craft-services-grid {
            grid-template-columns: 1fr;
          }

          .craft-camera-wrapper {
            display: none;
          }
        }
      `}</style>

      {/* Hero Section */}
      <div className="craft-hero">
        <div className="craft-hero-content">
          <p className="craft-eyebrow">Mark Media Studio</p>
          <h1 className="craft-main-heading">
            <span className="craft-heading-line">Visual</span>
            <span className="craft-heading-line craft-heading-accent">
              Excellence
            </span>
          </h1>
          <p className="craft-subheading">
            We transform moments into timeless visual stories. With over a
            decade of experience in photography and cinematography, we deliver
            exceptional visual content that captures the essence of your brand,
            event, or special occasion.
          </p>
        </div>

        {/* Camera decoration */}
        <div className="craft-camera-wrapper">
          <img src="/camera.png" alt="Camera" />
        </div>
      </div>

      {/* Stats Section */}
      <div className="craft-stats">
        <div className="craft-stats-grid">
          <div className="craft-stat">
            <p className="craft-stat-number">500+</p>
            <p className="craft-stat-label">Projects Completed</p>
          </div>
          <div className="craft-stat">
            <p className="craft-stat-number">10+</p>
            <p className="craft-stat-label">Years Experience</p>
          </div>
          <div className="craft-stat">
            <p className="craft-stat-number">450+</p>
            <p className="craft-stat-label">Happy Clients</p>
          </div>
          <div className="craft-stat">
            <p className="craft-stat-number">15+</p>
            <p className="craft-stat-label">Team Members</p>
          </div>
        </div>
      </div>
    </section>
  );
}
