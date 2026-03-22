import { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    lenisRef.current = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
    });

    const raf = (time: number) => {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    };

    const rafId = requestAnimationFrame(raf);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(rafId);
      lenisRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      lenisRef.current?.stop();
    } else {
      document.body.style.overflow = '';
      lenisRef.current?.start();
    }
    return () => {
      document.body.style.overflow = '';
      lenisRef.current?.start();
    };
  }, [isMenuOpen]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      setIsMenuOpen(false);
      // Use Lenis smooth scroll
      lenisRef.current?.scrollTo(element, {
        offset: -80,
        duration: 1.5,
      });
    }
  };

  const navLinks = [
    { name: 'Work', href: '#work' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Team', href: '#team' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <>
      <style>{`
        .nav-main {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 9999;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 1.5rem 3rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: transparent;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-main.scrolled .nav-inner {
          padding: 1rem 3rem;
        }

        .nav-logo {
          font-family: 'Inter', sans-serif;
          font-size: 1.5rem;
          font-weight: 800;
          color: #ffffff;
          text-decoration: none;
          letter-spacing: -0.02em;
          position: relative;
          z-index: 10001;
        }

        .nav-logo::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: #dc2626;
          transition: width 0.3s ease;
        }

        .nav-logo:hover::after {
          width: 100%;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 3rem;
        }

        .nav-link {
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          position: relative;
          transition: color 0.3s ease;
          padding: 0.5rem 0;
        }

        .nav-link:hover {
          color: #ffffff;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: #dc2626;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .nav-cta-btn {
          position: relative;
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          color: #000000;
          background: #ffffff;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 1rem 2rem;
          border: none;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.3s ease;
          display: inline-block;
        }

        .nav-cta-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, #dc2626, #f97316);
          transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 0;
        }

        .nav-cta-btn span {
          position: relative;
          z-index: 1;
          transition: color 0.3s ease;
        }

        .nav-cta-btn:hover {
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(220, 38, 38, 0.3);
        }

        .nav-cta-btn:hover::before {
          left: 0;
        }

        .nav-hamburger {
          display: none;
          flex-direction: column;
          gap: 6px;
          cursor: pointer;
          padding: 10px;
          z-index: 10001;
          background: transparent;
          border: none;
          position: relative;
        }

        .nav-hamburger span {
          width: 28px;
          height: 2px;
          background: #ffffff;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: center;
        }

        .nav-hamburger.active span:nth-child(1) {
          transform: rotate(45deg) translate(6px, 6px);
          background: #dc2626;
        }

        .nav-hamburger.active span:nth-child(2) {
          opacity: 0;
          transform: translateX(-20px);
        }

        .nav-hamburger.active span:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
          background: #dc2626;
        }

        .nav-mobile-overlay {
          position: fixed;
          top: 0;
          right: -100%;
          width: 100%;
          height: 100vh;
          background: #000000;
          z-index: 10000;
          transition: right 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .nav-mobile-overlay.open {
          right: 0;
        }

        .nav-mobile-links {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          text-align: center;
        }

        .nav-mobile-link {
          font-family: 'Inter', sans-serif;
          font-size: 2.5rem;
          font-weight: 700;
          color: #ffffff;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          transition: all 0.3s ease;
          opacity: 0;
          transform: translateX(50px);
        }

        .nav-mobile-overlay.open .nav-mobile-link {
          opacity: 1;
          transform: translateX(0);
        }

        .nav-mobile-overlay.open .nav-mobile-link:nth-child(1) { transition-delay: 0.1s; }
        .nav-mobile-overlay.open .nav-mobile-link:nth-child(2) { transition-delay: 0.15s; }
        .nav-mobile-overlay.open .nav-mobile-link:nth-child(3) { transition-delay: 0.2s; }
        .nav-mobile-overlay.open .nav-mobile-link:nth-child(4) { transition-delay: 0.25s; }
        .nav-mobile-overlay.open .nav-mobile-link:nth-child(5) { transition-delay: 0.3s; }

        .nav-mobile-link:hover {
          color: #dc2626;
        }

        .nav-mobile-cta {
          margin-top: 3rem;
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          color: #000000;
          background: #ffffff;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 1.25rem 3rem;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.3s ease 0.35s;
        }

        .nav-mobile-overlay.open .nav-mobile-cta {
          opacity: 1;
          transform: translateY(0);
        }

        .nav-mobile-cta:hover {
          background: #dc2626;
          color: #ffffff;
        }

        .nav-mobile-contact {
          margin-top: 2rem;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.3s ease 0.4s;
        }

        .nav-mobile-overlay.open .nav-mobile-contact {
          opacity: 1;
          transform: translateY(0);
        }

        .nav-mobile-email {
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.5);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .nav-mobile-email:hover {
          color: #ffffff;
        }

        @media (max-width: 1024px) {
          .nav-links, .nav-cta-desktop {
            display: none;
          }

          .nav-hamburger {
            display: flex;
          }

          .nav-inner {
            padding: 1.5rem 2rem;
          }
        }

        @media (max-width: 768px) {
          .nav-mobile-link {
            font-size: 2rem;
          }

          .nav-inner {
            padding: 1rem 1.5rem;
          }
        }
      `}</style>

      {/* Navigation */}
      <nav className={`nav-main ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          {/* Logo */}
          <a
            href="#"
            className="nav-logo"
            onClick={(e) => {
              e.preventDefault();
              lenisRef.current?.scrollTo(0, { duration: 1.5 });
            }}
          >
            MARKMEDIA
          </a>

          {/* Desktop Links */}
          <div className="nav-links">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="nav-link"
                onClick={(e) => scrollToSection(e, link.href)}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Button Desktop */}
          <a
            href="#contact"
            className="nav-cta-btn nav-cta-desktop"
            onClick={(e) => scrollToSection(e, '#contact')}
          >
            <span>Start Project</span>
          </a>

          {/* Mobile Hamburger */}
          <button
            className={`nav-hamburger ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`nav-mobile-overlay ${isMenuOpen ? 'open' : ''}`}>
        <nav className="nav-mobile-links">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="nav-mobile-link"
              onClick={(e) => scrollToSection(e, link.href)}
            >
              {link.name}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="nav-mobile-cta"
          onClick={(e) => scrollToSection(e, '#contact')}
        >
          Start Project
        </a>

        <div className="nav-mobile-contact">
          <a href="mailto:hello@markmedia.com" className="nav-mobile-email">
            hello@markmedia.com
          </a>
        </div>
      </div>
    </>
  );
}
