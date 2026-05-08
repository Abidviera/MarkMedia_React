import { useEffect } from 'react';
import Lenis from 'lenis';

interface UseLenisOptions {
  /** Duration of the smooth scroll animation */
  duration?: number;
  /** Easing function for smooth scroll */
  easing?: (t: number) => number;
  /** Wheel multiplier for sensitivity */
  wheelMultiplier?: number;
  /** Touch multiplier for mobile */
  touchMultiplier?: number;
  /** Enable smooth wheel scrolling */
  smoothWheel?: boolean;
}

export function useLenis(options: UseLenisOptions = {}) {
  const {
    duration = 1.2,
    easing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    wheelMultiplier = 1,
    touchMultiplier = 2,
    smoothWheel = true,
  } = options;

  useEffect(() => {
    // Get existing Lenis instance or create new one
    const existingLenis = (window as unknown as Record<string, Lenis>).__lenis;

    if (existingLenis) {
      return; // Let LenisContext handle it
    }

    const lenis = new Lenis({
      duration,
      easing,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel,
      wheelMultiplier,
      touchMultiplier,
      normalizeWheel: true,
    });

    // RAF loop
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const rafId = requestAnimationFrame(raf);

    // Expose globally
    (window as unknown as Record<string, unknown>).__lenis = lenis;

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as unknown as Record<string, unknown>).__lenis;
    };
  }, [duration, easing, wheelMultiplier, touchMultiplier, smoothWheel]);
}

/**
 * Hook to get current scroll position from Lenis
 */
export function useLenisScroll() {
  useEffect(() => {
    const lenis = (window as unknown as Record<string, Lenis>).__lenis;

    if (!lenis) return;

    let scrollY = 0;

    const handleScroll = ({ scroll }: { scroll: number }) => {
      scrollY = scroll;
    };

    lenis.on('scroll', handleScroll);

    return () => {
      lenis.off('scroll', handleScroll);
    };
  }, []);
}

/**
 * Hook to integrate Lenis with GSAP ScrollTrigger
 */
export function useLenisGSAP() {
  useEffect(() => {
    const lenis = (window as unknown as Record<string, Lenis>).__lenis;

    if (!lenis) return;

    // Import GSAP dynamically to avoid circular dependencies
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        // Configure GSAP ticker
        gsap.ticker.lagSmoothing(0);

        // Update ScrollTrigger on each GSAP tick
        gsap.ticker.add(() => {
          ScrollTrigger.update();
        });

        // Sync Lenis with GSAP ticker
        gsap.ticker.add((time: number) => {
          lenis.raf(time * 1000);
        });

        // Disable lag smoothing for immediate response
        gsap.ticker.lagSmoothing(0);
      });
    });

    return () => {
      import('gsap').then(({ gsap }) => {
        import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
          gsap.ticker.remove(() => ScrollTrigger.update());
        });
      });
    };
  }, []);
}
