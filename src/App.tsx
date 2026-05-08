import { useState, useEffect, useRef } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { LenisProvider } from "./context/LenisContext";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomCursor from "./components/ui/CustomCursor";
import Preloader from "./components/ui/Preloader";
import Navigation from "./components/ui/Navigation";
import MarkMediaHero from "./components/ui/MarkMediaHero";
import PeacockHero from "./components/ui/PeacockHero";
import AboutMark from "./components/ui/AboutMark";
import VideoShowcaseSection from "./components/ui/VideoShowcaseSection";
import CraftEdgeSection from "./components/ui/CraftEdgeSection";
import BentoGrid from "./components/ui/BentoGrid";
import Gallery3DSection from "./components/ui/Gallery3DSection";
import MarqueeSection from "./components/ui/MarqueeSection";
import StatsSection from "./components/ui/StatsSection";
import TalentsSection from "./components/ui/TalentsSection";
import AwardsSection from "./components/ui/AwardsSection";
import TestimonialsSection from "./components/ui/TestimonialsSection";
import InsightsSection from "./components/ui/InsightsSection";
import ContactSection from "./components/ui/ContactSection";
import FooterSection from "./components/ui/FooterSection";
import LazySection from "./components/ui/LazySection";
import ZoomParallaxSection from "./components/ui/ZoomParallaxSection";
import StellarCardGallerySingle from "./components/ui/3d-image-gallery";
import "./styles/globals.css";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showWorkGallery, setShowWorkGallery] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Initialize theme from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('lens-theme');
    if (stored === 'light' || stored === 'dark') {
      document.documentElement.setAttribute('data-theme', stored);
    }
  }, []);

  // Expose gallery close function globally so the gallery can close itself
  useEffect(() => {
    (window as unknown as Record<string, unknown>).__closeWorkGallery = () => setShowWorkGallery(false);
    return () => {
      delete (window as unknown as Record<string, unknown>).__closeWorkGallery;
    };
  }, []);

  // ─────────────────────────────────────────────────────────────
  // ULTRA-SMOOTH SCROLL — Lenis + GSAP ScrollTrigger Integration
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (showWorkGallery) return;

    // Add Lenis class to html for CSS targeting
    document.documentElement.classList.add('lenis', 'lenis-smooth');

    // Create Lenis instance with optimized settings for ultra-smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,          // Enable smooth wheel scrolling
      wheelMultiplier: 1,         // Wheel sensitivity
      touchMultiplier: 2,         // Touch sensitivity for mobile
      infinite: false,
    });

    lenisRef.current = lenis;

    // ── Integrate Lenis with GSAP ScrollTrigger ──
    // Configure GSAP ticker for smooth animations
    gsap.ticker.lagSmoothing(0);

    // Update ScrollTrigger on each GSAP tick
    gsap.ticker.add(() => {
      ScrollTrigger.update();
    });

    // Connect Lenis RAF to GSAP ticker for synchronized animations
    gsap.ticker.add((time: number) => {
      lenis.raf(time * 1000);
    });

    // Expose Lenis globally for components
    (window as unknown as Record<string, unknown>).__lenis = lenis;

    return () => {
      // Cleanup
      document.documentElement.classList.remove('lenis', 'lenis-smooth');
      gsap.ticker.remove(() => {
        ScrollTrigger.update();
      });
      gsap.ticker.remove((time: number) => lenis.raf(time * 1000));
      lenis.destroy();
      lenisRef.current = null;
      delete (window as unknown as Record<string, unknown>).__lenis;
    };
  }, [showWorkGallery]);

  // ─────────────────────────────────────────────────────────────
  // Lenis scroll helper for components
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (showWorkGallery) return;

    // Helper function for smooth scroll-to
    (window as unknown as Record<string, unknown>).__lenisScrollTo = (
      target: string | number | HTMLElement,
      options?: {
        offset?: number;
        duration?: number;
        immediate?: boolean;
        lock?: boolean;
        easing?: (t: number) => number;
      }
    ) => {
      lenisRef.current?.scrollTo(target, {
        offset: 0,
        duration: 1.2,
        immediate: false,
        lock: true,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        ...options,
      });
    };

    return () => {
      delete (window as unknown as Record<string, unknown>).__lenisScrollTo;
    };
  }, [showWorkGallery]);

  if (showWorkGallery) {
    return (
      <ThemeProvider>
        <StellarCardGallerySingle />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <LenisProvider>
        <CustomCursor />

        {isLoading && <Preloader />}

        <div className={`${isLoading ? "invisible" : "visible"}`}>
          <Navigation onOpenWorkGallery={() => setShowWorkGallery(true)} />

          <main>
            {/* New hero — scroll-driven frame animation with peacock imagery */}
            <MarkMediaHero />

            <LazySection>
              {/* Hero with 3D poster wall (Three.js) */}
              <PeacockHero />
            </LazySection>

            <LazySection>
              {/* About & Stats */}
              <AboutMark />
            </LazySection>

            <LazySection>
              {/* Video showcase with scroll (GSAP) */}
              <VideoShowcaseSection />
            </LazySection>

            <LazySection>
              {/* Craft Edge with timeline (GSAP) */}
              <CraftEdgeSection />
            </LazySection>

            <LazySection>
              {/* Bento Grid Portfolio */}
              <BentoGrid />
            </LazySection>

            <LazySection>
              {/* Zoom Parallax */}
              <ZoomParallaxSection />
            </LazySection>

            <LazySection>
              {/* Marquee with smooth scroll */}
              <MarqueeSection />
            </LazySection>

            <LazySection>
              {/* Stats Counter (GSAP animated) */}
              <StatsSection />
            </LazySection>

            <LazySection>
              {/* Awards with 3D particles (Three.js) */}
              <AwardsSection />
            </LazySection>

            <LazySection>
              {/* Testimonials with Framer Motion */}
              <TestimonialsSection />
            </LazySection>

            <LazySection>
              {/* Insights/Blog */}
              <InsightsSection />
            </LazySection>

            <LazySection>
              {/* Contact Form */}
              <ContactSection />
            </LazySection>

            <LazySection>
              {/* Footer */}
              <FooterSection />
            </LazySection>
          </main>
        </div>
      </LenisProvider>
    </ThemeProvider>
  );
}
