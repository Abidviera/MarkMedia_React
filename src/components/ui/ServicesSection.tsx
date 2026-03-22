import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'Photography',
    description: 'Stunning visual campaigns that capture attention and drive results across all platforms.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="6" y="10" width="36" height="28" rx="4" />
        <circle cx="24" cy="24" r="8" />
        <circle cx="24" cy="24" r="4" />
        <path d="M6 30l8-6 6 6 8-8 10 8" />
      </svg>
    )
  },
  {
    title: 'Videography',
    description: 'Cinematic video content that tells your story with stunning visuals and compelling narratives.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="8" width="32" height="32" rx="4" />
        <path d="M36 18l8-6v24l-8-6" />
        <path d="M16 18l8 6-8 6V18z" fill="currentColor" />
      </svg>
    )
  },
  {
    title: 'Fashion',
    description: 'High-fashion editorial and commercial photography that sets trends and captures style.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M24 4l-8 12h-8l4 28h20l4-28h-8L24 4z" />
        <path d="M16 16h16" />
      </svg>
    )
  },
  {
    title: 'Events',
    description: 'Comprehensive coverage of corporate events, galas, and conferences with artistic flair.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="24" cy="16" r="8" />
        <path d="M8 44c0-8.837 7.163-16 16-16s16 7.163 16 16" />
        <path d="M30 10l4-2M18 10l-4-2" />
      </svg>
    )
  },
  {
    title: 'Products',
    description: 'Compelling product photography that showcases your merchandise with stunning detail.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 8h24l4 8v24H8V16l4-8z" />
        <path d="M12 16h24" />
        <path d="M20 24h8M24 20v8" />
      </svg>
    )
  },
  {
    title: 'Weddings',
    description: 'Timeless wedding photography capturing love stories with elegance and emotion.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M24 44s-12-8-12-20c0-6.627 5.373-12 12-12s12 5.373 12 12c0 12-12 20-12 20z" />
        <circle cx="24" cy="20" r="4" />
        <path d="M24 8v-4M20 10l-2-2M28 10l2-2" />
      </svg>
    )
  }
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.service-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 70%'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="section-padding bg-white">
      <div className="container-main">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <span className="text-label text-[#FF4D00] block mb-4">What We Do</span>
          <h2 className="text-section gradient-text mb-6">
            Services That
            <br />
            <span className="font-display italic gradient-text-accent">Inspire</span>
          </h2>
          <p className="text-large text-gray max-w-xl">
            From concept to completion, we bring your vision to life with exceptional creativity and technical excellence.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card group p-8 bg-[#FAFAFA] rounded-2xl card-hover cursor-pointer"
            >
              {/* Icon */}
              <div className="w-16 h-16 mb-6 text-[#FF4D00] transition-transform duration-300 group-hover:scale-110">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="font-display text-[24px] font-semibold text-dark mb-3">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-body text-gray leading-relaxed">
                {service.description}
              </p>

              {/* Arrow */}
              <div className="mt-6 flex items-center gap-2 text-[#FF4D00] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-label">Learn More</span>
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
