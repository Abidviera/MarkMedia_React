import { useEffect, useRef, useState, type ReactNode } from 'react';

interface LazySectionProps {
  children: ReactNode;
  /** CSS class for the wrapper div */
  className?: string;
  /** IntersectionObserver threshold — how much of the component must be visible (0–1). Default 0.1 */
  threshold?: number;
  /** Root margin — how far outside viewport to start loading. Default "0px" */
  rootMargin?: string;
  /** Whether to unmount once loaded (true = only render once on first view). Default true */
  once?: boolean;
}

/**
 * LazySection — wraps any component so it only mounts when it enters the viewport.
 * Uses IntersectionObserver under the hood for zero-overhead scroll detection.
 *
 * Usage:
 *   <LazySection>
 *     <MyHeavySection />
 *   </LazySection>
 */
export default function LazySection({
  children,
  className,
  threshold = 0.1,
  rootMargin = '0px',
  once = true,
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return (
    <div ref={ref} className={className} data-lazy-section="">
      {isVisible ? children : null}
    </div>
  );
}
