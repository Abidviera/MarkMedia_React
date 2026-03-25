import { useState, useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import CustomCursor from "./components/ui/CustomCursor";
import Preloader from "./components/ui/Preloader";
import Navigation from "./components/ui/Navigation";
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
import "./styles/globals.css";

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

  return (
    <ThemeProvider>
      <CustomCursor />

      {isLoading && <Preloader />}

      <div className={`${isLoading ? "invisible" : "visible"}`}>
        <Navigation />

        <main>
          {/* Hero with 3D poster wall (Three.js) */}
          <PeacockHero />

          {/* About & Stats */}
          <AboutMark />

          {/* Video showcase with scroll (GSAP) */}
          <VideoShowcaseSection />

          {/* Craft Edge with timeline (GSAP) */}
          <CraftEdgeSection />

          {/* Bento Grid Portfolio */}
          <BentoGrid />

          {/* 3D Gallery with Three.js */}
          <Gallery3DSection />

          {/* Marquee with smooth scroll */}
          <MarqueeSection />

          {/* Stats Counter (GSAP animated) */}
          <StatsSection />

          {/* Team Talents */}
          <TalentsSection />

          {/* Awards with 3D particles (Three.js) */}
          <AwardsSection />

          {/* Testimonials with Framer Motion */}
          <TestimonialsSection />

          {/* Insights/Blog */}
          <InsightsSection />

          {/* Contact Form */}
          <ContactSection />

          {/* Footer */}
          <FooterSection />
        </main>
      </div>
    </ThemeProvider>
  );
}
