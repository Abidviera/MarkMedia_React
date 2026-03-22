import { useState, useEffect } from "react";
import CustomCursor from "./components/ui/CustomCursor";
import Preloader from "./components/ui/Preloader";
import Navigation from "./components/ui/Navigation";
import PeacockHero from "./components/ui/PeacockHero";
import VideoShowcaseSection from "./components/ui/VideoShowcaseSection";
import AboutMark from "./components/ui/AboutMark";
import CraftEdgeSection from "./components/ui/CraftEdgeSection";
import BentoGrid from "./components/ui/BentoGrid";
import MarqueeSection from "./components/ui/MarqueeSection";
import TalentsSection from "./components/ui/TalentsSection";
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

  return (
    <>
      <CustomCursor />

      {isLoading && <Preloader />}

      <div className={`${isLoading ? "invisible" : "visible"}`}>
        <Navigation />

        <main>
          <PeacockHero />
          <AboutMark />
          <VideoShowcaseSection />
          <CraftEdgeSection />
          <BentoGrid />
          <MarqueeSection />
          <TalentsSection />
          <InsightsSection />
          <ContactSection />
          <FooterSection />
        </main>
      </div>
    </>
  );
}
