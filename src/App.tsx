import { useState, useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
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
import "./styles/globals.css";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

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

  // ─────────────────────────────────────────────────────────────
  // UNIFIED SMOOTH SCROLL — Lenis + GSAP ScrollTrigger integration
  // This is the single source of truth for all scroll behavior.
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    // Create Lenis with ultra-smooth settings
    const lenis = new Lenis({
      duration: 1.2,          // smooth, not too slow
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      syncTouch: false,
    });

    // ── Integrate Lenis with GSAP ScrollTrigger ──
    // This makes GSAP read Lenis scroll values instead of native scroll,
    // eliminating the conflict between the two systems.
    lenis.on('scroll', ScrollTrigger.update);

    // Lenis RAF loop — drives both Lenis and GSAP ticker
    gsap.ticker.lagSmoothing(0);
    gsap.ticker.add((time: number) => {
      lenis.raf(time * 1000);
    });

    // Expose Lenis globally so Navigation can use it
    (window as unknown as Record<string, unknown>).__lenis = lenis;

    return () => {
      gsap.ticker.remove((time: number) => lenis.raf(time * 1000));
      lenis.destroy();
      delete (window as unknown as Record<string, unknown>).__lenis;
    };
  }, []);

  return (
    <ThemeProvider>
      <CustomCursor />

      {isLoading && <Preloader />}

      <div className={`${isLoading ? "invisible" : "visible"}`}>
        <Navigation />

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
            {/* 3D Gallery with Three.js */}
            <Gallery3DSection />
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
            {/* Team Talents */}
            <TalentsSection />
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
    </ThemeProvider>
  );
}
