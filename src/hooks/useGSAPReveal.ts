import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UseGSAPRevealOptions {
  trigger?: string | HTMLElement;
  start?: string;
  end?: string;
  stagger?: number;
  y?: number;
}

export default function useGSAPReveal(
  selector: string,
  options: UseGSAPRevealOptions = {}
) {
  const ref = useRef<HTMLElement>(null);

  const {
    trigger,
    start = 'top 70%',
    end = 'bottom 20%',
    stagger = 0.1,
    y = 60
  } = options;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = document.querySelectorAll(selector);

      gsap.fromTo(
        elements,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: trigger || ref.current,
            start,
            end,
            once: true
          }
        }
      );
    });

    return () => ctx.revert();
  }, [selector, trigger, start, end, stagger, y]);

  return ref;
}
