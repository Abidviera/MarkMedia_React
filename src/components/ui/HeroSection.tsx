import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline animation
      gsap.from(headlineRef.current, {
        y: 200,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.3
      });

      // Subline animation
      gsap.from(sublineRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.8
      });

      // CTA animation
      gsap.from(ctaRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 1.1
      });

      // Parallax on scroll
      gsap.to(headlineRef.current, {
        y: -200,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });

      // Video scale on scroll
      if (videoRef.current) {
        gsap.to(videoRef.current, {
          scale: 1.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0 bg-black">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-40"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-white-sand-beach-and-palm-trees-1564-large.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black" />
      </div>

      {/* Grid Lines */}
      <div className="grid-lines opacity-30" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end section-padding">
        <div className="container-main">
          {/* Eyebrow */}
          

          {/* Main Headline */}
          <h1
            ref={headlineRef}
            className="text-hero font-display font-bold text-white mb-8"
          >
            CRAFTING
            <br />
            <span className="text-white/30">CULTURE</span>
          </h1>

          {/* Subline */}
          <p
            ref={sublineRef}
            className="text-large text-white/70 max-w-xl font-light mb-12"
          >
            We transform vision into visceral experiences.
            <br />
            Where art meets algorithm.
          </p>

          {/* CTA */}
          <div ref={ctaRef} className="flex flex-wrap gap-6">
            <a
              href="#work"
              className="btn-primary"
            >
              VIEW WORK
            </a>
            <a
              href="#about"
              className="btn-outline"
            >
              LEARN MORE
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4">
        <span className="text-[10px] tracking-[0.3em] text-white/50">SCROLL</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
      </div>

      {/* Corner Accent */}
      <div className="absolute top-24 right-8 lg:right-12 z-10">
        <div className="flex items-center gap-3">
          <span className="text-[10px] tracking-[0.2em] text-white/40">EST. 2024</span>
          <div className="w-8 h-[1px] bg-white/20" />
        </div>
      </div>
    </section>
  );
}
