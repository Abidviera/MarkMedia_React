import { createContext, useContext, useEffect, useRef, useState, ReactNode, useCallback } from 'react';
import Lenis, { LenisRef } from 'lenis';

interface LenisContextType {
  lenis: Lenis | null;
  scrollY: number;
  isScrolling: boolean;
  scrollTo: (target: string | number | HTMLElement, options?: object) => void;
}

const LenisContext = createContext<LenisContextType>({
  lenis: null,
  scrollY: 0,
  isScrolling: false,
  scrollTo: () => {},
});

export function useLenisContext() {
  return useContext(LenisContext);
}

interface LenisProviderProps {
  children: ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number>(0);
  const [scrollY, setScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    // Create Lenis instance with optimized settings for ultra-smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
      normalizeWheel: true,
    });

    lenisRef.current = lenis;

    // Track scroll position
    lenis.on('scroll', ({ scroll, limit, velocity }: { scroll: number; limit: number; velocity: number }) => {
      setScrollY(scroll);

      // Debounce isScrolling state
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      if (Math.abs(velocity) > 0.01) {
        setIsScrolling(true);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    });

    // RAF loop for smooth animation
    const raf = (time: number) => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };

    rafRef.current = requestAnimationFrame(raf);

    // Expose lenis globally for GSAP integration
    (window as unknown as Record<string, unknown>).__lenis = lenis;

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      lenis.destroy();
      lenisRef.current = null;
      delete (window as unknown as Record<string, unknown>).__lenis;
    };
  }, []);

  const scrollTo = useCallback((target: string | number | HTMLElement, options?: object) => {
    lenisRef.current?.scrollTo(target, {
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      ...options,
    });
  }, []);

  return (
    <LenisContext.Provider value={{ lenis: lenisRef.current, scrollY, isScrolling, scrollTo }}>
      {children}
    </LenisContext.Provider>
  );
}
