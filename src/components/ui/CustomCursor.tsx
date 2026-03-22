import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const isHoveringLink = useRef(false);
  const isHoveringButton = useRef(false);
  const isHoveringImage = useRef(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Check if device supports hover (not touch device)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    let targetX = 0;
    let targetY = 0;

    const moveCursor = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      // Smooth lerp for dot (follows immediately)
      dot.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;

      // Slower lerp for ring (delayed follow)
      const ease = isHoveringLink.current ? 0.15 : isHoveringButton.current ? 0.1 : 0.08;
      ringPos.current.x += (pos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * ease;

      ring.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;

      rafRef.current = requestAnimationFrame(animate);
    };

    const handleEnterLink = () => {
      isHoveringLink.current = true;
      ring.classList.add('hover-link');
      ring.classList.remove('hover-button', 'hover-image');
    };

    const handleEnterButton = () => {
      isHoveringButton.current = true;
      ring.classList.add('hover-button');
      ring.classList.remove('hover-link', 'hover-image');
    };

    const handleEnterImage = () => {
      isHoveringImage.current = true;
      ring.classList.add('hover-image');
      ring.classList.remove('hover-link', 'hover-button');
    };

    const handleLeave = () => {
      isHoveringLink.current = false;
      isHoveringButton.current = false;
      isHoveringImage.current = false;
      ring.classList.remove('hover-link', 'hover-button', 'hover-image');
    };

    // Attach event listeners to interactive elements
    const interactiveSelectors = 'a, button, [role="button"], input, textarea, select, [data-cursor-hover]';
    const buttonSelectors = '[data-cursor-button]';
    const imageSelectors = '[data-cursor-image]';

    const attachListeners = () => {
      const interactives = document.querySelectorAll(interactiveSelectors);
      const buttons = document.querySelectorAll(buttonSelectors);
      const images = document.querySelectorAll(imageSelectors);

      interactives.forEach(el => {
        el.addEventListener('mouseenter', handleEnterLink);
        el.addEventListener('mouseleave', handleLeave);
      });

      buttons.forEach(el => {
        el.addEventListener('mouseenter', handleEnterButton);
        el.addEventListener('mouseleave', handleLeave);
      });

      images.forEach(el => {
        el.addEventListener('mouseenter', handleEnterImage);
        el.addEventListener('mouseleave', handleLeave);
      });
    };

    // Initial attachment
    attachListeners();

    // Re-attach on DOM changes (for dynamically loaded content)
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('mousemove', moveCursor, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring">
        <div ref={textRef} className="cursor-text" />
      </div>

      <style>{`
        .cursor-dot {
          position: fixed;
          top: 0;
          left: 0;
          width: 8px;
          height: 8px;
          background: #dc2626;
          border-radius: 50%;
          pointer-events: none;
          z-index: 99999;
          transform: translate(-50%, -50%);
          will-change: transform;
          mix-blend-mode: difference;
        }

        .cursor-ring {
          position: fixed;
          top: 0;
          left: 0;
          width: 40px;
          height: 40px;
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          pointer-events: none;
          z-index: 99998;
          transform: translate(-50%, -50%);
          will-change: transform;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                      height 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                      background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                      border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                      opacity 0.3s ease;
        }

        /* Hover state for links */
        .cursor-ring.hover-link {
          width: 60px;
          height: 60px;
          border-color: #dc2626;
          background-color: rgba(220, 38, 38, 0.1);
        }

        /* Hover state for buttons */
        .cursor-ring.hover-button {
          width: 80px;
          height: 80px;
          border-color: #ffffff;
          background-color: rgba(255, 255, 255, 0.1);
          mix-blend-mode: difference;
        }

        /* Hover state for images */
        .cursor-ring.hover-image {
          width: 100px;
          height: 100px;
          border-color: rgba(255, 255, 255, 0.3);
          background-color: rgba(255, 255, 255, 0.05);
        }

        .cursor-ring.hover-image::after {
          content: 'VIEW';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-family: 'Inter', sans-serif;
          font-size: 0.5rem;
          font-weight: 600;
          color: #ffffff;
          letter-spacing: 0.1em;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .cursor-ring.hover-image:hover::after {
          opacity: 1;
        }

        /* Hide on mobile */
        @media (max-width: 1024px) {
          .cursor-dot,
          .cursor-ring {
            display: none !important;
          }
        }

        /* Hide when leaving window */
        .cursor-dot.hidden,
        .cursor-ring.hidden {
          opacity: 0;
        }
      `}</style>
    </>
  );
}
