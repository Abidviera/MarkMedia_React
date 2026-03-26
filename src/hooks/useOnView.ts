import { useEffect, useRef, useState } from 'react';

/**
 * useOnView — tracks real-time viewport visibility.
 * Returns true while the element is visible, false when scrolled out.
 * Perfect for controlling video playback, animations, etc.
 *
 * @param threshold - 0 to 1, what fraction of the element must be visible (default 0.1)
 * @param rootMargin - Intersection Observer rootMargin (default '0px')
 */
export function useOnView(
  threshold: number | number[] = 0.1,
  rootMargin: string = '0px'
) {
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Set true when entering viewport, false when leaving
        setIsInView(entry.isIntersecting);
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isInView };
}
