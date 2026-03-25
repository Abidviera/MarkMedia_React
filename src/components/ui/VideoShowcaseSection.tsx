import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Section {
  service: string;
  featured: string;
  category: string;
  video: string;
}

const sections: Section[] = [
  {
    service: 'Events',
    featured: 'Captured Moments',
    category: 'Exhibitions',
    video: '/exhibition.mp4'
  },
  {
    service: 'Hospital',
    featured: 'Medical Excellence',
    category: 'Healthcare',
    video: '/hospital.mp4'
  },
  {
    service: 'Fashion',
    featured: 'Style Stories',
    category: 'Modeling',
    video: '/fashion.mp4'
  },
  {
    service: 'Sports',
    featured: 'Action Shots',
    category: 'Athletics',
    video: '/F1.mp4'
  },
  {
    service: 'Product',
    featured: 'Commercial Vision',
    category: 'Advertisement',
    video: '/advertisement.mp4'
  },
  {
    service: 'Weddings',
    featured: 'Love Stories',
    category: 'Celebrations',
    video: '/Wedding.mp4'
  }
];

export default function VideoShowcaseSection() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const desktopVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll-based video change for Desktop
  useEffect(() => {
    if (isMobile) return;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;

      const scrollStart = rect.top;
      const scrollEnd = rect.bottom - viewportHeight;

      if (scrollEnd <= 0) {
        setCurrentSection(5);
        return;
      }

      if (scrollStart >= 0) {
        setCurrentSection(0);
        return;
      }

      const progress = Math.abs(scrollStart) / (containerHeight - viewportHeight);
      const newSection = Math.min(5, Math.floor(progress * 6));
      setCurrentSection(newSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  // Play/pause videos based on current section
  useEffect(() => {
    if (isMobile) {
      // Mobile: single video
      if (mobileVideoRef.current) {
        mobileVideoRef.current.src = sections[currentSection].video;
        mobileVideoRef.current.load();
        mobileVideoRef.current.play().catch(() => {
          // Silently handle autoplay restrictions
        });
      }
    } else {
      // Desktop: all videos - play current, pause others
      desktopVideoRefs.current.forEach((video, index) => {
        if (video) {
          if (index === currentSection) {
            video.muted = false;
            video.play().catch(() => {
              // Try muted if autoplay fails
              video.muted = true;
              video.play().catch(() => {});
            });
          } else {
            video.pause();
          }
        }
      });
    }
  }, [currentSection, isMobile]);

  // Initialize videos on mount
  useEffect(() => {
    // Desktop: initialize all videos
    if (!isMobile) {
      desktopVideoRefs.current.forEach((video, index) => {
        if (video) {
          if (index === 0) {
            video.play().catch(() => {});
          }
        }
      });
    }
  }, [isMobile]);

  // Touch handlers for swipe (Mobile only)
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentSection < sections.length - 1) {
      setCurrentSection(prev => prev + 1);
    }
    if (isRightSwipe && currentSection > 0) {
      setCurrentSection(prev => prev - 1);
    }
  };

  const progressPercent = (currentSection / (sections.length - 1)) * 100;

  // Mobile Layout
  if (isMobile) {
    return (
      <div style={{ backgroundColor: 'var(--bg-primary)', width: '100%', margin: 0, padding: 0 }}>
        <div
          style={{
            height: 'calc(100vh - 60px)',
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
            touchAction: 'pan-y'
          }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Video Background */}
          <video
            ref={mobileVideoRef}
            src={sections[currentSection].video}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.6)'
            }}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            key={currentSection}
          />

          {/* Gradient Overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0.6) 100%)',
              zIndex: 1
            }}
          />

          {/* Content */}
          <div
            style={{
              position: 'relative',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '1.5rem 1rem',
              zIndex: 2
            }}
          >
            {/* Top - Visual Stories */}
            <div
              style={{
                textAlign: 'center',
                paddingTop: '1rem'
              }}
            >
              <h2
                style={{
                  fontSize: '1.75rem',
                  fontWeight: 800,
                  color: 'rgba(255, 255, 255, 0.95)',
                  fontFamily: "'Inter', sans-serif",
                  textTransform: 'uppercase',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  margin: 0
                }}
              >
                Visual Stories
              </h2>
            </div>

            {/* Center - Main Content */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem'
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSection}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    textAlign: 'center'
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.65rem',
                      fontWeight: 500,
                      color: 'rgba(255, 255, 255, 0.6)',
                      fontFamily: "'Inter', sans-serif",
                      textTransform: 'uppercase',
                      letterSpacing: '0.2em'
                    }}
                  >
                    {sections[currentSection].category}
                  </span>
                  <h3
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      fontFamily: "'Inter', sans-serif",
                      textTransform: 'uppercase',
                      letterSpacing: '-0.01em',
                      margin: '0.5rem 0'
                    }}
                  >
                    {sections[currentSection].featured}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontFamily: "'Inter', sans-serif",
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em'
                    }}
                  >
                    {sections[currentSection].service}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Play Button Indicator */}
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '0.5rem'
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="white"
                >
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              </div>
            </div>

            {/* Bottom - Capturing Excellence + Progress */}
            <div style={{ textAlign: 'center' }}>
              <h2
                style={{
                  fontSize: '1.75rem',
                  fontWeight: 800,
                  color: 'rgba(255, 255, 255, 0.95)',
                  fontFamily: "'Inter', sans-serif",
                  textTransform: 'uppercase',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  margin: '0 0 1.5rem 0'
                }}
              >
                Capturing Excellence
              </h2>

              {/* Progress Indicator */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}
              >
                {/* Progress Bar */}
                <div
                  style={{
                    width: '100%',
                    maxWidth: '200px',
                    height: '3px',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '2px',
                    overflow: 'hidden'
                  }}
                >
                  <motion.div
                    style={{
                      height: '100%',
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '2px'
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Dots */}
                <div
                  style={{
                    display: 'flex',
                    gap: '0.5rem',
                    justifyContent: 'center'
                  }}
                >
                  {sections.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSection(index)}
                      style={{
                        width: index === currentSection ? '24px' : '8px',
                        height: '8px',
                        borderRadius: '4px',
                        backgroundColor: index === currentSection
                          ? 'rgba(255, 255, 255, 0.9)'
                          : 'rgba(255, 255, 255, 0.3)',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        padding: 0
                      }}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Counter */}
                <div
                  style={{
                    fontSize: '0.7rem',
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: '0.1em'
                  }}
                >
                  {String(currentSection + 1).padStart(2, '0')} / {String(sections.length).padStart(2, '0')}
                </div>
              </div>

              {/* Swipe Hint */}
              <p
                style={{
                  fontSize: '0.65rem',
                  color: 'rgba(255, 255, 255, 0.4)',
                  fontFamily: "'Inter', sans-serif",
                  marginTop: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
                Swipe to explore
              </p>
            </div>
          </div>

          {/* Side Navigation Arrows */}
          <button
            onClick={() => currentSection > 0 && setCurrentSection(prev => prev - 1)}
            disabled={currentSection === 0}
            style={{
              position: 'absolute',
              left: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: currentSection === 0 ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)',
              border: 'none',
              cursor: currentSection === 0 ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 3,
              opacity: currentSection === 0 ? 0.3 : 1
            }}
            aria-label="Previous"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>

          <button
            onClick={() => currentSection < sections.length - 1 && setCurrentSection(prev => prev + 1)}
            disabled={currentSection === sections.length - 1}
            style={{
              position: 'absolute',
              right: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: currentSection === sections.length - 1 ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)',
              border: 'none',
              cursor: currentSection === sections.length - 1 ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 3,
              opacity: currentSection === sections.length - 1 ? 0.3 : 1
            }}
            aria-label="Next"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .video-showcase-mobile {
              -webkit-user-select: none;
              user-select: none;
            }
          }
        `}</style>
      </div>
    );
  }

  // Desktop Layout (Original)
  return (
    <div style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Scroll Section */}
      <div
        ref={containerRef}
        style={{
          height: '600vh',
          position: 'relative',
          backgroundColor: 'var(--bg-primary)'
        }}
      >
        {/* Fixed Content */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            overflow: 'hidden',
            backgroundColor: 'var(--bg-primary)'
          }}
        >
          {/* Video Backgrounds */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 1
            }}
          >
            {sections.map((section, index) => (
              <video
                key={index}
                ref={(el) => { desktopVideoRefs.current[index] = el; }}
                src={section.video}
                style={{
                  position: 'absolute',
                  top: '-10%',
                  left: 0,
                  width: '100%',
                  height: '120%',
                  objectFit: 'cover',
                  opacity: index === currentSection ? 1 : 0,
                  filter: 'brightness(0.7)',
                  transition: 'opacity 0.8s ease',
                  zIndex: index === currentSection ? 2 : 0
                }}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              />
            ))}
          </div>

          {/* Content Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: '1rem',
              padding: '0 2rem',
              height: '100%',
              position: 'relative',
              zIndex: 2
            }}
          >
            {/* Header */}
            <div
              style={{
                gridColumn: '1 / 13',
                alignSelf: 'start',
                paddingTop: '5vh',
                fontSize: '10vw',
                lineHeight: 0.8,
                textAlign: 'center',
                color: 'rgba(255, 255, 255, 0.9)',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '-0.02em'
              }}
            >
              <div>Visual</div>
              <div>Stories</div>
            </div>

            {/* Content */}
            <div
              style={{
                gridColumn: '1 / 13',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                position: 'absolute',
                top: '50%',
                left: 0,
                transform: 'translateY(-50%)',
                padding: '0 2rem'
              }}
            >
              {/* Left Column - Services */}
              <div
                style={{
                  width: '40%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  textAlign: 'left',
                  fontFamily: "'Inter', sans-serif",
                  textTransform: 'uppercase',
                  letterSpacing: '-0.02em'
                }}
              >
                {sections.map((section, index) => (
                  <div
                    key={index}
                    style={{
                      fontSize: '2vw',
                      color: 'rgba(255, 255, 255, 0.9)',
                      cursor: 'pointer',
                      position: 'relative',
                      paddingLeft: index === currentSection ? '20px' : '0',
                      opacity: index === currentSection ? 1 : 0.3,
                      transform: index === currentSection ? 'translateX(10px)' : 'translateX(0)',
                      transition: 'all 0.5s ease'
                    }}
                  >
                    {index === currentSection && (
                      <span
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: '6px',
                          height: '6px',
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          borderRadius: '50%'
                        }}
                      />
                    )}
                    {section.service}
                  </div>
                ))}
              </div>

              {/* Center - Featured */}
              <div
                style={{
                  width: '20%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  fontSize: '1.5vw',
                  position: 'relative',
                  height: '10vh',
                  overflow: 'hidden',
                  fontFamily: "'Inter', sans-serif",
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}
              >
                {sections.map((section, index) => (
                  <div
                    key={index}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '100%',
                      fontWeight: 500,
                      color: 'rgba(255, 255, 255, 0.9)',
                      opacity: index === currentSection ? 1 : 0,
                      transition: 'opacity 0.5s ease'
                    }}
                  >
                    {section.featured}
                  </div>
                ))}
              </div>

              {/* Right Column - Categories */}
              <div
                style={{
                  width: '40%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  textAlign: 'right',
                  fontFamily: "'Inter', sans-serif",
                  textTransform: 'uppercase',
                  letterSpacing: '-0.02em'
                }}
              >
                {sections.map((section, index) => (
                  <div
                    key={index}
                    style={{
                      fontSize: '1.5vw',
                      color: 'rgba(255, 255, 255, 0.9)',
                      cursor: 'pointer',
                      position: 'relative',
                      paddingRight: index === currentSection ? '20px' : '0',
                      opacity: index === currentSection ? 1 : 0.3,
                      transform: index === currentSection ? 'translateX(-10px)' : 'translateX(0)',
                      transition: 'all 0.5s ease'
                    }}
                  >
                    {index === currentSection && (
                      <span
                        style={{
                          position: 'absolute',
                          right: 0,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: '6px',
                          height: '6px',
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          borderRadius: '50%'
                        }}
                      />
                    )}
                    {section.category}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div
              style={{
                gridColumn: '1 / 13',
                alignSelf: 'end',
                paddingBottom: '5vh',
                fontSize: '10vw',
                lineHeight: 0.8,
                textAlign: 'center',
                color: 'rgba(255, 255, 255, 0.9)',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '-0.02em'
              }}
            >
              <div>Capturing</div>
              <div>Excellence</div>

              {/* Progress Indicator */}
              <div
                style={{
                  width: '160px',
                  height: '1px',
                  margin: '2vh auto 0',
                  position: 'relative',
                  backgroundColor: 'rgba(255, 255, 255, 0.3)'
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: `${progressPercent}%`,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    transition: 'width 0.3s ease'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.7rem',
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: '-0.02em',
                    transform: 'translateY(-50%)',
                    margin: '0 -25px'
                  }}
                >
                  <span>{String(currentSection + 1).padStart(2, '0')}</span>
                  <span>{String(sections.length).padStart(2, '0')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* End Section */}
      <div
        style={{
          height: '0vh',
          backgroundColor: 'var(--bg-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      />
    </div>
  );
}
