import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Set mounted to true after first render
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to('.preloader', {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete: () => setIsVisible(false),
        });
      },
    });

    // Initial states
    gsap.set('.preloader-content', { opacity: 0 });
    gsap.set('.preloader-letter', { y: 60, opacity: 0 });
    gsap.set('.preloader-progress-wrapper', { opacity: 0 });
    gsap.set('.preloader-progress', { scaleX: 0, transformOrigin: 'left center' });
    gsap.set('.preloader-text', { opacity: 0 });

    // Animate content container
    tl.to('.preloader-content', {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out',
    });

    // Animate letters
    tl.to('.preloader-letter', {
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.03,
      ease: 'power3.out',
    }, '-=0.2');

    // Show progress wrapper
    tl.to('.preloader-progress-wrapper', {
      opacity: 1,
      duration: 0.2,
    }, '-=0.2');

    // Animate progress bar
    tl.to('.preloader-progress', {
      scaleX: 1,
      duration: 2,
      ease: 'power2.inOut',
    }, '-=0.2');

    // Show text
    tl.to('.preloader-text', {
      opacity: 1,
      duration: 0.3,
    }, '-=1.5');

    // Animate dots
    tl.to('.preloader-dot', {
      opacity: 0.3,
      duration: 0.3,
      stagger: 0.1,
      repeat: 4,
      yoyo: true,
      ease: 'power1.inOut',
    }, '-=2');

  }, [isMounted]);

  if (!isVisible) return null;

  return (
    <div className="preloader">
      {/* Decorative corners */}
      <div className="preloader-corner preloader-corner-tl" />
      <div className="preloader-corner preloader-corner-tr" />
      <div className="preloader-corner preloader-corner-bl" />
      <div className="preloader-corner preloader-corner-br" />

      <div className="preloader-content">
        {/* Logo */}
        <div className="preloader-logo">
          <div className="preloader-word">
            {'MARK'.split('').map((letter, i) => (
              <span key={`m-${i}`} className="preloader-letter">{letter}</span>
            ))}
          </div>
          <div className="preloader-word preloader-word-accent">
            {'MEDIA'.split('').map((letter, i) => (
              <span key={`me-${i}`} className="preloader-letter">{letter}</span>
            ))}
          </div>
        </div>

        {/* Progress */}
        <div className="preloader-progress-wrapper">
          <div className="preloader-progress" />
        </div>

        {/* Loading Text */}
        <p className="preloader-text">
          
          <span className="preloader-dots">
            <span className="preloader-dot" />
            <span className="preloader-dot" />
            <span className="preloader-dot" />
          </span>
        </p>
      </div>

      <style>{`
        .preloader {
          position: fixed;
          inset: 0;
          z-index: 99999;
          background: #000000;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .preloader-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2.5rem;
        }

        .preloader-logo {
          display: flex;
          gap: 0.5rem;
        }

        .preloader-word {
          display: flex;
        }

        .preloader-letter {
          font-family: 'Inter', sans-serif;
          font-size: clamp(2.5rem, 8vw, 5rem);
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.02em;
          display: inline-block;
        }

        .preloader-word-accent .preloader-letter {
          color: transparent;
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.5);
        }

        .preloader-progress-wrapper {
          width: 200px;
          height: 2px;
          background: rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
        }

        .preloader-progress {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, #dc2626, #f97316, #dc2626);
          background-size: 200% 100%;
          animation: preloader-shimmer 1.5s linear infinite;
          transform: scaleX(0);
          transform-origin: left center;
        }

        @keyframes preloader-shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }

        .preloader-text {
          font-family: 'Inter', sans-serif;
          font-size: 0.65rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.4);
          letter-spacing: 0.3em;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .preloader-dots {
          display: flex;
          gap: 0.25rem;
        }

        .preloader-dot {
          width: 3px;
          height: 3px;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 50%;
          opacity: 1;
        }

        /* Corner decorations */
        .preloader-corner {
          position: absolute;
          width: 60px;
          height: 60px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .preloader-corner-tl {
          top: 2rem;
          left: 2rem;
          border-right: none;
          border-bottom: none;
        }

        .preloader-corner-tr {
          top: 2rem;
          right: 2rem;
          border-left: none;
          border-bottom: none;
        }

        .preloader-corner-bl {
          bottom: 2rem;
          left: 2rem;
          border-right: none;
          border-top: none;
        }

        .preloader-corner-br {
          bottom: 2rem;
          right: 2rem;
          border-left: none;
          border-top: none;
        }

        @media (max-width: 768px) {
          .preloader-corner {
            width: 30px;
            height: 30px;
          }

          .preloader-corner-tl,
          .preloader-corner-tr {
            top: 1rem;
          }

          .preloader-corner-bl,
          .preloader-corner-br {
            bottom: 1rem;
          }

          .preloader-corner-tl,
          .preloader-corner-bl {
            left: 1rem;
          }

          .preloader-corner-tr,
          .preloader-corner-br {
            right: 1rem;
          }

          .preloader-progress-wrapper {
            width: 150px;
          }
        }
      `}</style>
    </div>
  );
}
