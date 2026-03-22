import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CraftEdgeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const bottleWrapperRef = useRef<HTMLDivElement>(null);
  const bottleRef = useRef<HTMLImageElement>(null);
  const stampRef = useRef<HTMLImageElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const header = headerRef.current;

      // ==========================
      // Initial Page Load Animations
      // ==========================

      const onLoadTl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      onLoadTl
        // Animate header border width expansion
        .to('header', {
          '--border-width': '100%',
          duration: 3,
        }, 0)
        // Slide in desktop nav links from above
        .from('.desktop-nav a', {
          y: -100,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
        }, 0)
        // Fade in hero heading
        .to('.hero-content h1', {
          opacity: 1,
          duration: 1,
        }, 0)
        // Animate text stroke to solid black color
        .to('.hero-content h1', {
          delay: 0.5,
          duration: 1.2,
          color: '#000000',
          WebkitTextStroke: '0px #000000',
        }, 0)
        // Slide in each line of the heading from the right
        .from('.hero-content .line', {
          x: 100,
          delay: 1,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
        }, 0)
        // Reveal the bottle wrapper
        .to('.hero-bottle-wrapper', {
          opacity: 1,
          scale: 1,
          delay: 1.5,
          duration: 1.3,
          ease: 'power3.out',
        }, 0)
        // Pop-in stamp image with scaling
        .to('.hero-stamp', {
          opacity: 1,
          scale: 1,
          delay: 2,
          duration: 0.2,
          ease: 'back.out(3)',
        }, 0)
        // Subtle vibration/bounce effect on the stamp
        .to('.hero-stamp', {
          y: '+=5',
          x: '-=3',
          repeat: 2,
          yoyo: true,
          duration: 0.05,
          ease: 'power1.inOut',
        }, 0);

      // ==========================
      // Scroll-Based Animations
      // ==========================

      const headerOffset = header?.offsetHeight || 80;

      // 1. Bottle animates on scroll from hero to intro
      gsap.timeline({
        scrollTrigger: {
          trigger: '.hero',
          start: `top top+=${headerOffset}`,
          endTrigger: '.section-intro',
          end: `top top+=${headerOffset}`,
          scrub: 1,
          pin: '.hero-bottle-wrapper',
          pinSpacing: false,
          invalidateOnRefresh: true,
        },
      })
        .to('.hero-bottle', {
          rotate: 0,
          scale: 0.8,
          duration: 1,
        });

      // 2. Bottle shifts right during the intro section
      gsap.timeline({
        scrollTrigger: {
          trigger: '.section-intro',
          start: `top top+=${headerOffset}`,
          endTrigger: '.timeline-entry:nth-child(even)',
          end: `top top+=${headerOffset}`,
          scrub: 1,
          pin: '.hero-bottle-wrapper',
          pinSpacing: false,
          invalidateOnRefresh: true,
        },
      })
        .to('.hero-bottle', {
          rotate: 10,
          scale: 0.7,
          duration: 1,
        })
        .to('.hero-bottle-wrapper', {
          x: '30%',
          duration: 1,
        }, 0);

      // 3. Bottle shifts left during the first timeline entry
      gsap.timeline({
        scrollTrigger: {
          trigger: '.timeline-entry:nth-child(even)',
          start: `top top+=${headerOffset}`,
          endTrigger: '.timeline-entry:nth-child(odd)',
          end: `top top+=${headerOffset}`,
          scrub: 1,
          pin: '.hero-bottle-wrapper',
          pinSpacing: false,
          invalidateOnRefresh: true,
        },
      })
        .to('.hero-bottle', {
          rotate: -10,
          scale: 0.7,
          duration: 1,
        })
        .to('.hero-bottle-wrapper', {
          x: '-25%',
          duration: 1,
        }, 0);

      // Timeline animations on scroll
      gsap.from('.timeline-entry', {
        opacity: 0,
        y: 100,
        duration: 1,
        stagger: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.timeline-section',
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from('.timeline-date', {
        y: 50,
        duration: 0.8,
        stagger: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.timeline-section',
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      // Ingredients animation
      gsap.from('.ingredient-item', {
        x: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.section-intro',
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative" style={{ color: '#000' }}>

      {/* Main Content */}
      <main className="relative" style={{ backgroundColor: '#ffffff' }}>
        {/* Hero Bottle Overlay Wrapper */}
        <div ref={bottleWrapperRef} className="hero-bottle-wrapper opacity-0">
          <img ref={bottleRef} src="/camera.png" alt="Mark Media Camera" className="hero-bottle" />
        </div>

        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            {/* Decorative Stamp */}
            <img ref={stampRef} src="/logo.png" alt="Mark Media Stamp" className="hero-stamp" />

            {/* Main Heading */}
            <h1 ref={headlineRef} className="opacity-0" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 'clamp(4rem, 14vw, 11rem)', textTransform: 'uppercase', letterSpacing: '-0.02em', margin: '0.5rem 0', lineHeight: 0.85, color: 'transparent', WebkitTextStroke: '1px #000000' }}>
              <span className="line">Mark Media</span>
              <span className="line highlight" style={{ WebkitTextStroke: '0px #dc2626', color: '#dc2626' }}>Visual Excellence</span>
            </h1>
          </div>
        </section>

        {/* About Us Section */}
        <section ref={introRef} className="section-intro">
          <div className="intro-grid">
            {/* Left Side: Headings and Description */}
            <div className="intro-left">
              <p className="small-title">About Us</p>
              <h2 className="main-heading">Capturing<br />Timeless Moments</h2>
              <p className="description">
                Mark Media is a premier photography and videography studio based in the United Arab Emirates. We specialize in transforming moments into timeless visual stories through our comprehensive range of professional photography services. From breathtaking weddings to high-energy events, sophisticated corporate campaigns to intimate fashion editorials, we bring creativity, precision, and passion to every project.
              </p>
              <a href="#" className="cta-box">Explore Work</a>
            </div>

            {/* Right Side: Achievements & Expertise */}
            <div className="intro-right">
              <div className="ingredients-log">
                <h3 className="ingredients-title">Our Achievements</h3>

                {[
                  { qty: '01', name: '500+ Projects Completed', desc: 'Delivering excellence across all projects.' },
                  { qty: '02', name: '10+ Years Experience', desc: 'A decade of visual storytelling expertise.' },
                  { qty: '03', name: '450+ Happy Clients', desc: 'Trusted by businesses and individuals.' },
                  { qty: '04', name: '15+ Team Members', desc: 'Skilled photographers and videographers.' },
                ].map((item, i) => (
                  <div key={i} className="ingredient-item">
                    <div className="ingredient-qty">{item.qty}</div>
                    <div className="ingredient-text">
                      <strong>{item.name}</strong>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* Timeline Section */}
        <section ref={timelineRef} className="timeline-section">
          <h2 className="timeline-main-title">Our Services</h2>

          {/* First Timeline Entry - Photography & Videography */}
          <div className="timeline-entry">
            <div className="timeline-left">
              <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80" alt="Photography Services" className="timeline-img" />
              <div className="timeline-date">01</div>
            </div>
            <div className="timeline-right">
              <h3 className="timeline-title">Photography & Videography Services</h3>
              <p className="timeline-description">
                Event & Corporate Photography, Wedding & Engagement Sessions, Fashion & Editorial Shoots, Sports & Action Photography, Portrait & Lifestyle Photography, Product & Commercial Photography, Real Estate & Architecture Photography, Medical & Healthcare Documentation, Cinematic Wedding Films, Corporate Video Production, Event Videography & Live Coverage, Fashion & Promotional Videos, Product Demonstration Videos, Drone & Aerial Photography/Videography, 360° Virtual Tours
              </p>
            </div>
          </div>

          {/* Second Timeline Entry - Post-Production */}
          <div className="timeline-entry">
            <div className="timeline-left">
              <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80" alt="Post-Production Services" className="timeline-img" />
              <div className="timeline-date">02</div>
            </div>
            <div className="timeline-right">
              <h3 className="timeline-title">Post-Production & Specialized Services</h3>
              <p className="timeline-description">
                Professional Editing & Color Grading, Photo Retouching & Enhancement, Beauty & Skin Retouching, Background Removal & Manipulation, HDR Processing & Compositing, Studio & On-Location Shoots, Professional Lighting Setup, Makeup Artist & Stylist Collaboration, Creative Direction & Art Direction, Model & Talent Coordination, Fast Turnaround (24–48 hours), Print-Ready File Preparation, Custom Album & Print Design, Digital Gallery & Cloud Delivery, Video Post-Production & Motion Graphics
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="black-footer">
        <div className="footer-inner">
          <div className="footer-logo">Mark Media</div>
          <div className="footer-links">
            <a href="#">Work</a>
            <a href="#">Services</a>
            <a href="#">Contact</a>
          </div>
          <div className="footer-contact">
            <a href="#">hello@markmedia.com</a>
            <a href="#">Instagram</a>
            <a href="#">LinkedIn</a>
          </div>
        </div>
      </footer>

      {/* Inline Styles */}
      <style>{`
        :root {
          --red: #dc2626;
          --black: #000000;
          --white: #ffffff;
          --gray: #737373;
          --light-gray: #f5f5f5;
        }

        * {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: 'Inter', sans-serif;
          background-color: var(--white);
          color: var(--black);
        }

        header {
          position: sticky;
          top: 0;
          z-index: 999;
          background-color: var(--white);
        }

        header::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          height: 1px;
          width: var(--border-width);
          background-color: var(--black);
        }

        .header-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 1.2rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: 2rem;
          color: var(--black);
          letter-spacing: -0.02em;
        }

        .desktop-nav a {
          font-weight: 500;
          color: var(--black);
          text-decoration: none;
          font-size: 0.95rem;
          transition: color 0.3s ease;
          letter-spacing: 0.05em;
        }

        .desktop-nav a:hover {
          color: var(--red);
        }

        .hamburger div {
          width: 26px;
          height: 2px;
          background: var(--black);
          margin: 5px 0;
        }

        .hero {
          position: relative;
          min-height: calc(50rem - 80px);
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--white);
          padding: 2rem;
          text-align: center;
          overflow: hidden;
        }

        .hero-content {
          position: relative;
          z-index: 2;
        }

        .hero-content h1 {
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          margin: 0.5rem 0;
          line-height: 0.85;
          color: transparent;
          -webkit-text-stroke: 1px var(--black);
        }

        .hero-content .line {
          display: block;
        }

        .hero-bottle-wrapper {
          position: absolute;
          left: 0;
          top: 0;
          height: 45rem;
          width: 100%;
          z-index: 4;
          opacity: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-bottle {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          width: auto;
          height: 100%;
          margin: auto;
          filter: drop-shadow(8px 8px 12px rgba(0, 0, 0, 0.1));
          transform: rotate(20deg);
          transition: filter 0.3s ease;
        }

        .hero-stamp {
          position: absolute;
          left: 35%;
          top: 0;
          z-index: 5;
          transform: translate(-50%, -50%) rotate(-20deg) scale(100);
          opacity: 0;
          max-width: 120px;
        }

        .section-intro {
          background-color: var(--white);
          border-top: 1px solid var(--black);
          padding: 1rem 2rem;
          position: relative;
          z-index: 1;
        }

        .intro-grid {
          display: flex;
          align-items: center;
          gap: 4rem;
          justify-content: space-between;
        }

        .intro-left,
        .intro-right {
          max-width: 30%;
        }

        .small-title {
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--red);
          margin-bottom: 1rem;
        }

        .main-heading {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: 4rem;
          line-height: 1;
          color: var(--black);
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
        }

        .description {
          font-size: 1rem;
          color: var(--gray);
          line-height: 1.7;
          margin-bottom: 2rem;
        }

        .cta-box {
          display: inline-block;
          padding: 1rem 2rem;
          border: 2px solid var(--black);
          background-color: var(--black);
          color: var(--white);
          text-decoration: none;
          font-weight: 600;
          font-size: 0.85rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: all 0.3s ease;
        }

        .cta-box:hover {
          background-color: var(--white);
          color: var(--black);
        }

        .ingredients-title {
          font-family: 'Inter', sans-serif;
          font-size: 1.5rem;
          color: var(--black);
          margin-bottom: 2.5rem;
          text-transform: uppercase;
          text-align: left;
          letter-spacing: 0.05em;
          font-weight: 700;
        }

        .ingredient-item {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .ingredient-qty {
          font-family: 'Inter', sans-serif;
          font-size: 1.5rem;
          color: var(--red);
          min-width: 50px;
          text-align: left;
          line-height: 1;
          font-weight: 700;
        }

        .ingredient-text {
          max-width: 400px;
        }

        .ingredient-text strong {
          font-family: 'Inter', sans-serif;
          font-size: 1.1rem;
          color: var(--black);
          display: block;
          margin-bottom: 0.2rem;
          font-weight: 600;
        }

        .ingredient-text p {
          font-size: 0.95rem;
          line-height: 1.5;
          color: var(--gray);
          margin: 0;
        }

        .timeline-section {
          padding: 6rem 0rem 3rem;
          border-top: 1px solid var(--black);
          display: flex;
          flex-direction: column;
        }

        .timeline-entry {
          margin: 0;
          padding: 0 2rem 0;
          display: flex;
          gap: 3rem;
          align-items: center;
          min-height: 600px;
          max-width: 70%;
        }

        .timeline-entry:nth-child(odd) {
          margin-left: auto;
        }

        .timeline-entry:nth-child(odd) .timeline-left {
          order: 2;
        }

        .timeline-entry:nth-child(odd) .timeline-right {
          order: 1;
        }

        .timeline-entry:nth-child(even) {
          margin-right: auto;
        }

        .timeline-main-title {
          padding: 0 2rem 0rem;
          font-weight: 800;
          font-family: 'Inter', sans-serif;
          font-size: 8rem;
          line-height: 1;
          color: var(--black);
          margin-bottom: 2.5rem;
          letter-spacing: -0.03em;
        }

        .timeline-left {
          flex: 0 0 300px;
          text-align: center;
        }

        .timeline-date {
          font-family: 'Inter', sans-serif;
          font-size: 4rem;
          color: var(--red);
          line-height: 1;
          transform: translateY(30px);
          font-weight: 800;
          position: relative;
          z-index: 2;
          margin-top: -60px;
        }

        .timeline-img {
          width: 100%;
          max-width: 240px;
          border: 2px solid var(--black);
          padding: 0;
          background-color: var(--white);
          filter: grayscale(100%);
          position: relative;
          z-index: 1;
        }

        .timeline-right {
          flex: 1;
          max-width: 400px;
        }

        .timeline-title {
          font-family: 'Inter', sans-serif;
          font-size: 1.75rem;
          color: var(--black);
          margin-bottom: 1rem;
          font-weight: 700;
        }

        .timeline-description {
          font-size: 1rem;
          color: var(--gray);
          line-height: 1.7;
          word-wrap: break-word;
        }

        .black-footer {
          background: var(--black);
          color: var(--white);
          padding: 4rem 2rem;
        }

        .footer-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 2rem;
        }

        .footer-logo {
          font-family: 'Inter', sans-serif;
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .footer-links,
        .footer-contact {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .footer-links a,
        .footer-contact a {
          color: var(--white);
          font-size: 0.9rem;
          text-decoration: none;
          opacity: 0.7;
          transition: opacity 0.3s ease;
        }

        .footer-links a:hover,
        .footer-contact a:hover {
          opacity: 1;
          color: var(--red);
        }

        @media (max-width: 768px) {
          .main {
            padding-left: 0;
          }

          .hero-bottle-wrapper {
            height: 25rem;
          }

          .hero-stamp {
            max-width: 80px;
          }

          .hero-content h1 {
            font-size: 12vw;
          }

          .intro-grid {
            text-align: center;
            flex-direction: column;
            gap: 5rem;
          }

          .intro-left,
          .intro-right {
            max-width: 100%;
            width: 100%;
          }

          .main-heading {
            font-size: 2.5rem;
          }

          .ingredient-item {
            flex-direction: column;
            text-align: center;
            align-items: center;
            gap: 1rem;
            margin-bottom: 3rem;
          }

          .ingredient-qty {
            font-size: 1.5rem;
            text-align: center;
          }

          .ingredients-title {
            text-align: center;
            font-size: 2rem;
          }

          .timeline-main-title {
            font-size: 4rem;
            text-align: center;
          }

          .timeline-entry {
            flex-direction: column;
            text-align: center;
            margin: 0 auto 2rem;
            gap: 1rem;
            max-width: 100%;
            min-height: unset;
          }

          .timeline-left {
            margin-bottom: 2rem;
          }

          .timeline-title {
            font-size: 1.5rem;
          }

          .timeline-date {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </section>
  );
}
