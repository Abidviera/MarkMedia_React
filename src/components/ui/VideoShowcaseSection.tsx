import { useEffect, useRef, useState, useCallback } from 'react';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const fixedContainerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handleScroll = useCallback(() => {
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
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Play/pause videos based on current section
  useEffect(() => {
    const playCurrentVideo = async () => {
      videoRefs.current.forEach((video, index) => {
        if (video) {
          if (index === currentSection) {
            video.muted = false;
            video.play().catch(() => {
              // If autoplay fails, try with muted
              video.muted = true;
              video.play().catch(() => {});
            });
          } else {
            video.pause();
          }
        }
      });
    };

    playCurrentVideo();
  }, [currentSection]);

  // Initialize videos
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        video.load();
        if (index === 0) {
          video.play().catch(() => {});
        }
      }
    });
  }, []);

  const progressPercent = (currentSection / (sections.length - 1)) * 100;

  return (
    <div style={{ backgroundColor: '#000' }}>
      {/* Scroll Section */}
      <div
        ref={containerRef}
        style={{
          height: '600vh',
          position: 'relative',
          backgroundColor: '#000'
        }}
      >
        {/* Fixed Content */}
        <div
          ref={fixedContainerRef}
          style={{
            position: 'sticky',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            overflow: 'hidden',
            backgroundColor: '#000'
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
                ref={(el) => { videoRefs.current[index] = el; }}
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
                muted
                loop
                playsInline
                preload="auto"
              >
                <source src={section.video} type="video/mp4" />
              </video>
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
          backgroundColor: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        
      </div>
    </div>
  );
}
