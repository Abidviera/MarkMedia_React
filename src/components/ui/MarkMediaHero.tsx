import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 240;
const FRAME_PATH = '/heroSection/ezgif-frame-';

const texts = {
  eyebrow: 'Photography & Cinematography',
  line1: 'MARK',
  line2: 'MEDIA',
  subline: 'We craft visual stories that move, inspire, and endure — from cinematic films to striking photographs.',
  cta1: 'Explore Work',
  cta2: 'Get In Touch',
};

function getFrameUrl(index: number): string {
  const padded = String(index).padStart(3, '0');
  return `${FRAME_PATH}${padded}.jpg`;
}

export default function MarkMediaHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadedImages, setLoadedImages] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(1);
  const textRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [imagesReady, setImagesReady] = useState(false);

  // Preload all frames
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        loaded++;
        setLoadedImages(loaded);
      };
      img.onerror = () => {
        loaded++;
        setLoadedImages(loaded);
      };
      images.push(img);
    }
    imagesRef.current = images;

    const checkReady = setInterval(() => {
      if (loaded >= TOTAL_FRAMES) {
        clearInterval(checkReady);
        setImagesReady(true);
      }
    }, 100);

    return () => clearInterval(checkReady);
  }, []);

  // Canvas frame renderer
  useEffect(() => {
    if (!imagesReady || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = (frameIndex: number) => {
      const img = imagesRef.current[frameIndex - 1];
      if (!img || !img.complete || !img.naturalWidth) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    draw(1);

    // Expose draw function globally for scroll trigger
    (window as unknown as Record<string, unknown>).markMediaDrawFrame = draw;

    return () => {
      delete (window as unknown as Record<string, unknown>).markMediaDrawFrame;
    };
  }, [imagesReady]);

  // GSAP scroll-driven animations
  useEffect(() => {
    if (!imagesReady) return;

    const ctx = gsap.context(() => {
      // ---- Text entrance animation (on load) ----
      const tl = gsap.timeline({ delay: 0.3 });

      gsap.set([line1Ref.current, line2Ref.current], { yPercent: 110, opacity: 0 });
      gsap.set(eyebrowRef.current, { opacity: 0, y: 20 });
      gsap.set(sublineRef.current, { opacity: 0, y: 30 });
      gsap.set(ctaRef.current, { opacity: 0, y: 20 });
      gsap.set(scrollIndicatorRef.current, { opacity: 0 });
      gsap.set(overlayRef.current, { opacity: 0.6 });

      tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
        .to(line1Ref.current, { yPercent: 0, opacity: 1, duration: 1.1, ease: 'expo.out' }, '-=0.4')
        .to(line2Ref.current, { yPercent: 0, opacity: 1, duration: 1.1, ease: 'expo.out' }, '-=0.7')
        .to(sublineRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
        .to(scrollIndicatorRef.current, { opacity: 1, duration: 0.6 }, '-=0.2')
        .to(overlayRef.current, { opacity: 0.35, duration: 1.2 }, 0);

      // ---- Frame scrub — pins section until all 240 frames complete ----
      const drawFn = (window as unknown as Record<string, (n: number) => void>).markMediaDrawFrame;
      if (drawFn) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=1500',
          pin: true,
          scrub: 1,
          refreshPriority: 10,
          onUpdate: (self) => {
            const frame = Math.max(1, Math.round(self.progress * TOTAL_FRAMES));
            setCurrentFrame(frame);
            drawFn(frame);
          },
        });
      }

      // ---- Parallax: text moves up on scroll ----
      gsap.to(textRef.current, {
        y: -120,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=1500',
          scrub: 1,
          refreshPriority: 9,
        },
      });

      // ---- Overlay darkens as you scroll ----
      gsap.to(overlayRef.current, {
        opacity: 0.88,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=1500',
          scrub: 1,
          refreshPriority: 9,
        },
      });

      // ---- Eyebrow fade out ----
      gsap.to(eyebrowRef.current, {
        opacity: 0,
        y: -40,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=1200',
          scrub: 1,
          refreshPriority: 8,
        },
      });

      // ---- CTA fade out ----
      gsap.to(ctaRef.current, {
        opacity: 0,
        y: -30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '+=500',
          end: '+=1400',
          scrub: 1,
          refreshPriority: 8,
        },
      });

      // ---- Scroll indicator bounce ----
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.5,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [imagesReady]);

  return (
    <section
      ref={sectionRef}
      id="markmedia-hero"
      className="relative w-full h-screen overflow-hidden"
      style={{ backgroundColor: '#000' }}
    >
      {/* Loading state */}
      {!imagesReady && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-6">
          <div className="flex flex-col items-center gap-3">
            <div
              className="h-px bg-white/20 w-48 overflow-hidden"
            >
              <motion.div
                className="h-full bg-white"
                initial={{ width: 0 }}
                animate={{ width: `${(loadedImages / TOTAL_FRAMES) * 100}%` }}
                transition={{ duration: 0.3 }}
                style={{ width: `${(loadedImages / TOTAL_FRAMES) * 100}%` }}
              />
            </div>
            <span className="text-[10px] tracking-[0.3em] text-white/40 font-space-mono uppercase">
              Loading {Math.round((loadedImages / TOTAL_FRAMES) * 100)}%
            </span>
          </div>
        </div>
      )}

      {/* Frame canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      />

      {/* Dark overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black pointer-events-none"
        style={{ zIndex: 1, opacity: 0.35 }}
      />

      {/* Gradient overlays for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 30%, transparent 60%, rgba(0,0,0,0.8) 100%)',
        }}
      />

      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          zIndex: 3,
          backgroundImage:
            'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Text content */}
      <div
        ref={textRef}
        className="relative h-full flex flex-col justify-end section-padding"
        style={{ zIndex: 10 }}
      >
        <div className="container-main">
          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-white/60" />
            <span
              ref={eyebrowRef}
              className="text-[10px] tracking-[0.4em] text-white/70 uppercase font-space-mono"
            >
              {texts.eyebrow}
            </span>
          </div>

          {/* Main headline */}
          <div
            className="overflow-hidden mb-4"
            style={{ perspective: '800px' }}
          >
            <h1 className="text-hero font-display font-bold text-white leading-[0.85] tracking-[-0.04em]">
              <motion.span
                ref={line1Ref}
                className="block"
                initial={{ y: '110%', opacity: 0 }}
                animate={imagesReady ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {texts.line1}
              </motion.span>
            </h1>
            <h1
              className="text-hero font-display font-bold leading-[0.85] tracking-[-0.04em]"
              style={{
                WebkitTextStroke: '2px rgba(255, 255, 255, 0.41)',
                color: 'transparent',
              }}
            >
              <motion.span
                ref={line2Ref}
                className="block"
                initial={{ y: '110%', opacity: 0 }}
                animate={imagesReady ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              >
                {texts.line2}
              </motion.span>
            </h1>
          </div>

          {/* Subline */}
          <p
            ref={sublineRef}
            className="text-base sm:text-lg md:text-xl text-white/60 max-w-xl font-light mb-10 leading-relaxed"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {texts.subline}
          </p>

          {/* CTA buttons */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-6">
            <a
              href="#work"
              className="btn-primary text-[11px] tracking-[0.15em]"
            >
              {texts.cta1}
            </a>
            <a
              href="#contact"
              className="btn-outline text-[11px] tracking-[0.15em]"
            >
              {texts.cta2}
            </a>
          </div>
        </div>
      </div>

      {/* Frame counter (dev/debug — remove in production) */}
      <div
        className="absolute bottom-6 right-8 z-20 opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{ zIndex: 20 }}
      >
        <span
          className="text-[9px] tracking-widest text-white/20 font-space-mono"
        >
          FRAME {currentFrame} / {TOTAL_FRAMES}
        </span>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
        style={{ opacity: 0 }}
      >
        <span className="text-[9px] tracking-[0.4em] text-white/40 uppercase font-space-mono">
          Scroll
        </span>
        <div className="flex flex-col items-center gap-1">
          <div className="w-px h-10 bg-gradient-to-b from-white/50 to-transparent" />
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="opacity-40">
            <path d="M1 1L5 5L9 1" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Corner accent — brand mark */}
      <div className="absolute top-24 right-8 lg:right-12 z-20">
        <div className="flex items-center gap-3">
          <span className="text-[9px] tracking-[0.25em] text-white/30 uppercase font-space-mono">
            MarkMedia
          </span>
          <div className="w-6 h-px bg-white/20" />
        </div>
      </div>

      {/* Vertical line accent */}
      <div className="absolute top-0 right-20 w-px h-full overflow-hidden z-10 pointer-events-none">
        <div
          className="w-full h-1/3 bg-gradient-to-b from-transparent via-white/10 to-transparent"
          style={{
            animation: 'scrollLine 3s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  );
}
