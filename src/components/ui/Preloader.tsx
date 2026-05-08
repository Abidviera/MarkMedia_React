import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'reveal' | 'done'>('loading');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const ctx = gsap.context(() => {
      // Phase 1: Initial reveal - letters fly in from bottom
      gsap.fromTo('.preloader-word-mark .letter',
        { y: 100, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'back.out(1.7)'
        }
      );

      gsap.fromTo('.preloader-word-media .letter',
        { y: 100, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'back.out(1.7)',
          delay: 0.3
        }
      );

      // Phase 2: Progress animation
      const progressObj = { value: 0 };
      gsap.to(progressObj, {
        value: 100,
        duration: 2.5,
        ease: 'power2.inOut',
        onUpdate: () => {
          setProgress(progressObj.value);
        },
        onComplete: () => {
          setPhase('reveal');
        }
      });

      // Animate progress bar
      gsap.fromTo('.preloader-progress-fill',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 2.5,
          ease: 'power2.inOut',
          delay: 0.6
        }
      );

      // Rotate decorative shapes
      gsap.to('.deco-shape-1', {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: 'none'
      });

      gsap.to('.deco-shape-2', {
        rotation: -360,
        duration: 25,
        repeat: -1,
        ease: 'none'
      });

      // Pulse the orbs
      gsap.to('.preloader-orb', {
        scale: 1.2,
        opacity: 0.3,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        stagger: 0.5
      });

    }, containerRef);

    return () => ctx.revert();
  }, [isMounted]);

  // Handle reveal phase
  useEffect(() => {
    if (phase !== 'reveal') return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setTimeout(() => setIsVisible(false), 100);
        }
      });

      // Letters separate and fly out
      tl.to('.preloader-word-mark .letter', {
        y: -150,
        opacity: 0,
        scale: 0.5,
        rotation: -20,
        stagger: 0.04,
        ease: 'power3.in'
      });

      tl.to('.preloader-word-media .letter', {
        y: 150,
        opacity: 0,
        scale: 0.5,
        rotation: 20,
        stagger: 0.04,
        ease: 'power3.in'
      }, '-=0.3');

      // Progress bar expands and fades
      tl.to('.preloader-progress-container', {
        scaleX: 2,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.in'
      }, '-=0.3');

      // Wipe overlay slides in
      tl.fromTo('.reveal-wipe',
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.7,
          ease: 'power4.inOut'
        }
      );

      // Logo reveal from wipe
      tl.fromTo('.reveal-logo',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'back.out(1.4)'
        },
        '-=0.3'
      );

      // Tagline reveal
      tl.fromTo('.reveal-tagline',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out'
        },
        '-=0.2'
      );

      // Fade out entire preloader
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out'
      }, '+=0.3');

    }, containerRef);

    return () => ctx.revert();
  }, [phase]);

  if (!isVisible) return null;

  if (phase === 'reveal') {
    return (
      <div className="preloader-reveal" ref={containerRef}>
        <div className="reveal-content">
          <div className="reveal-wipe">
            <div className="reveal-inner">
              <div className="reveal-logo">
                <span className="reveal-mark">MARK</span>
                <span className="reveal-media">MEDIA</span>
              </div>
              <p className="reveal-tagline">Visual Storytelling Excellence</p>
            </div>
          </div>
        </div>

        <style>{`
          .preloader-reveal {
            position: fixed;
            inset: 0;
            z-index: 99999;
            background: #0a0a0a;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
          }

          .reveal-content {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .reveal-wipe {
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, #dc2626 0%, #991b1b 50%, #7f1d1d 100%);
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .reveal-inner {
            text-align: center;
            color: #ffffff;
          }

          .reveal-logo {
            display: flex;
            gap: 0.75rem;
            justify-content: center;
            margin-bottom: 1.5rem;
          }

          .reveal-mark {
            font-family: 'Inter', sans-serif;
            font-size: clamp(3rem, 10vw, 7rem);
            font-weight: 900;
            letter-spacing: -0.03em;
          }

          .reveal-media {
            font-family: 'Inter', sans-serif;
            font-size: clamp(3rem, 10vw, 7rem);
            font-weight: 900;
            letter-spacing: -0.03em;
            -webkit-text-stroke: 2px #ffffff;
            color: transparent;
          }

          .reveal-tagline {
            font-family: 'Inter', sans-serif;
            font-size: clamp(0.875rem, 2vw, 1.125rem);
            font-weight: 400;
            letter-spacing: 0.3em;
            text-transform: uppercase;
            opacity: 0.8;
            margin: 0;
          }

          @media (max-width: 640px) {
            .reveal-logo {
              flex-direction: column;
              gap: 0;
            }

            .reveal-mark,
            .reveal-media {
              -webkit-text-stroke: 1px #ffffff;
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="preloader" ref={containerRef}>
      {/* Animated background elements */}
      <div className="preloader-bg">
        {/* Floating orbs */}
        <div className="preloader-orb preloader-orb-1" />
        <div className="preloader-orb preloader-orb-2" />
        <div className="preloader-orb preloader-orb-3" />

        {/* Decorative shapes */}
        <div className="deco-shape deco-shape-1">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="38" stroke="rgba(220,38,38,0.2)" strokeWidth="1" strokeDasharray="4 4"/>
          </svg>
        </div>
        <div className="deco-shape deco-shape-2">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            <rect x="10" y="10" width="100" height="100" stroke="rgba(249,115,22,0.15)" strokeWidth="1" strokeDasharray="6 6" transform="rotate(45 60 60)"/>
          </svg>
        </div>
      </div>

      {/* Main content */}
      <div className="preloader-main">
        {/* Logo */}
        <div className="preloader-logo">
          <div className="preloader-word preloader-word-mark">
            {'MARK'.split('').map((letter, i) => (
              <span key={`m-${i}`} className="letter">{letter}</span>
            ))}
          </div>
          <div className="preloader-word preloader-word-media">
            {'MEDIA'.split('').map((letter, i) => (
              <span key={`me-${i}`} className="letter">{letter}</span>
            ))}
          </div>
        </div>

     


      </div>

      {/* Corner frames */}
      <div className="preloader-frame frame-tl">
        <span className="frame-line" />
        <span className="frame-line" />
      </div>
      <div className="preloader-frame frame-tr">
        <span className="frame-line" />
        <span className="frame-line" />
      </div>
      <div className="preloader-frame frame-bl">
        <span className="frame-line" />
        <span className="frame-line" />
      </div>
      <div className="preloader-frame frame-br">
        <span className="frame-line" />
        <span className="frame-line" />
      </div>

      <style>{`
        .preloader {
          position: fixed;
          inset: 0;
          z-index: 99999;
          background: #050505;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          perspective: 1000px;
        }

        /* Background */
        .preloader-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .preloader-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
        }

        .preloader-orb-1 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(220, 38, 38, 0.15) 0%, transparent 70%);
          top: -100px;
          right: -100px;
        }

        .preloader-orb-2 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(249, 115, 22, 0.1) 0%, transparent 70%);
          bottom: -50px;
          left: -50px;
        }

        .preloader-orb-3 {
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(220, 38, 38, 0.08) 0%, transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .deco-shape {
          position: absolute;
          opacity: 0.5;
        }

        .deco-shape-1 {
          top: 15%;
          left: 10%;
        }

        .deco-shape-2 {
          bottom: 20%;
          right: 15%;
        }

        /* Main content */
        .preloader-main {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3rem;
        }

        /* Logo */
        .preloader-logo {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          transform-style: preserve-3d;
        }

        .preloader-word {
          display: flex;
          overflow: hidden;
          padding: 0.5rem 0;
        }

        .preloader-word .letter {
          font-family: 'Inter', sans-serif;
          font-size: clamp(4rem, 15vw, 10rem);
          font-weight: 900;
          line-height: 0.9;
          letter-spacing: -0.04em;
          display: inline-block;
          transform-style: preserve-3d;
        }

        .preloader-word-mark .letter {
          color: #ffffff;
        }

        .preloader-word-media .letter {
          color: transparent;
          -webkit-text-stroke: 3px rgba(255, 255, 255, 0.8);
        }

        /* Progress */
        .preloader-progress-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          width: 100%;
          max-width: 400px;
        }

        .preloader-progress-track {
          width: 100%;
          height: 3px;
          background: rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
          border-radius: 2px;
        }

        .preloader-progress-fill {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, #dc2626, #f97316, #dc2626);
          background-size: 200% 100%;
          animation: shimmer 2s linear infinite;
          transform-origin: left center;
        }

        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .preloader-progress-text {
          display: flex;
          align-items: baseline;
          gap: 0.25rem;
        }

        .progress-number {
          font-family: 'Inter', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #ffffff;
          min-width: 3ch;
          text-align: right;
        }

        .progress-percent {
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.5);
        }

        /* Loading text */
        .preloader-loading {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .loading-text {
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.4);
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        .loading-dots {
          display: flex;
          gap: 0.375rem;
        }

        .loading-dots .dot {
          width: 4px;
          height: 4px;
          background: #dc2626;
          border-radius: 50%;
          animation: dotPulse 1.4s ease-in-out infinite;
        }

        .loading-dots .dot:nth-child(2) {
          animation-delay: 0.2s;
        }

        .loading-dots .dot:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes dotPulse {
          0%, 80%, 100% {
            transform: scale(0.6);
            opacity: 0.4;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }

        /* Frame corners */
        .preloader-frame {
          position: absolute;
          width: 80px;
          height: 80px;
        }

        .preloader-frame .frame-line {
          position: absolute;
          background: rgba(255, 255, 255, 0.15);
        }

        .frame-tl {
          top: 2rem;
          left: 2rem;
        }
        .frame-tl .frame-line:nth-child(1) {
          top: 0;
          left: 0;
          width: 60px;
          height: 1px;
        }
        .frame-tl .frame-line:nth-child(2) {
          top: 0;
          left: 0;
          width: 1px;
          height: 60px;
        }

        .frame-tr {
          top: 2rem;
          right: 2rem;
        }
        .frame-tr .frame-line:nth-child(1) {
          top: 0;
          right: 0;
          width: 60px;
          height: 1px;
        }
        .frame-tr .frame-line:nth-child(2) {
          top: 0;
          right: 0;
          width: 1px;
          height: 60px;
        }

        .frame-bl {
          bottom: 2rem;
          left: 2rem;
        }
        .frame-bl .frame-line:nth-child(1) {
          bottom: 0;
          left: 0;
          width: 60px;
          height: 1px;
        }
        .frame-bl .frame-line:nth-child(2) {
          bottom: 0;
          left: 0;
          width: 1px;
          height: 60px;
        }

        .frame-br {
          bottom: 2rem;
          right: 2rem;
        }
        .frame-br .frame-line:nth-child(1) {
          bottom: 0;
          right: 0;
          width: 60px;
          height: 1px;
        }
        .frame-br .frame-line:nth-child(2) {
          bottom: 0;
          right: 0;
          width: 1px;
          height: 60px;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .preloader-word .letter {
            font-size: clamp(2.5rem, 18vw, 5rem);
            -webkit-text-stroke-width: 2px;
          }

          .preloader-progress-container {
            max-width: 280px;
          }

          .preloader-frame {
            width: 50px;
            height: 50px;
          }

          .frame-tl .frame-line:nth-child(1),
          .frame-tr .frame-line:nth-child(1),
          .frame-bl .frame-line:nth-child(1),
          .frame-br .frame-line:nth-child(1) {
            width: 40px;
          }

          .frame-tl .frame-line:nth-child(2),
          .frame-tr .frame-line:nth-child(2),
          .frame-bl .frame-line:nth-child(2),
          .frame-br .frame-line:nth-child(2) {
            height: 40px;
          }

          .deco-shape {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .preloader-logo {
            gap: 0;
          }

          .preloader-word .letter {
            -webkit-text-stroke-width: 1.5px;
          }
        }
      `}</style>
    </div>
  );
}
