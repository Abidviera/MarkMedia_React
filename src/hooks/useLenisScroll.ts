import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';

/**
 * Hook to get scroll progress for a specific element using Lenis
 * This replaces framer-motion's useScroll for Lenis-integrated scrolling
 */
export function useLenisScroll(options?: {
  container?: React.RefObject<HTMLElement | null>;
  target?: React.RefObject<HTMLElement | null>;
  offset?: [string, string];
}) {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const lenis = (window as unknown as Record<string, { raf: (time: number) => boolean; scroll: number; limit: number; on: (event: string, callback: (e: { scroll: number; limit: number }) => void) => void; off: (event: string, callback: (e: { scroll: number; limit: number }) => void) => void }>).__lenis;

    if (!lenis) return;

    const updateProgress = () => {
      const scrollY = lenis.scroll;
      const limit = lenis.limit;

      if (options?.target?.current) {
        const rect = options.target.current.getBoundingClientRect();
        const elementTop = rect.top + scrollY;
        const elementHeight = rect.height;
        const viewportHeight = window.innerHeight;

        // Calculate progress based on element position
        const start = elementTop - viewportHeight;
        const end = elementTop + elementHeight;
        const current = scrollY - start;
        const total = end - start;

        setProgress(Math.max(0, Math.min(1, current / total)));
      } else {
        // Overall page scroll progress
        setProgress(Math.min(1, scrollY / limit));
      }
    };

    const handleScroll = () => {
      rafRef.current = requestAnimationFrame(updateProgress);
    };

    lenis.on('scroll', handleScroll);
    updateProgress();

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      lenis.off('scroll', handleScroll);
    };
  }, [options?.target, options?.container]);

  return progress;
}

/**
 * Hook to create a smooth MotionValue from Lenis scroll
 */
export function useLenisScrollValue(): MotionValue<number> {
  const motionValue = useRef<MotionValue<number> | null>(null);

  if (!motionValue.current) {
    motionValue.current = useRef(new motionValue(0)).current;
  }

  useEffect(() => {
    const lenis = (window as unknown as Record<string, { raf: (time: number) => boolean; scroll: number; on: (event: string, callback: (e: { scroll: number }) => void) => void; off: (event: string, callback: (e: { scroll: number }) => void) => void }>).__lenis;

    if (!lenis) return;

    const handleScroll = ({ scroll }: { scroll: number }) => {
      motionValue.current?.set(scroll);
    };

    lenis.on('scroll', handleScroll);

    return () => {
      lenis.off('scroll', handleScroll);
    };
  }, []);

  return motionValue.current;
}

/**
 * Hook to get raw Lenis scroll value with spring physics
 */
export function useLenisScrollSpring() {
  const [scrollY, setScrollY] = useState(0);
  const lenisRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const lenis = (window as unknown as Record<string, { raf: (time: number) => boolean; scroll: number; on: (event: string, callback: (e: { scroll: number }) => void) => void; off: (event: string, callback: (e: { scroll: number }) => void) => void }>).__lenis;

    if (!lenis) return;

    const handleScroll = ({ scroll }: { scroll: number }) => {
      setScrollY(scroll);
    };

    lenis.on('scroll', handleScroll);

    return () => {
      lenis.off('scroll', handleScroll);
    };
  }, []);

  const springY = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  });

  return springY;
}

/**
 * Creates a motion value from Lenis scroll for use with useTransform
 */
export function createLenisScrollMotionValue(): MotionValue<number> {
  return new MotionValue(0);
}
