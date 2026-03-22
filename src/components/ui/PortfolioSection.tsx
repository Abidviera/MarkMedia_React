import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    image: 'https://images.unsplash.com/photo-1552168324-d612d77725e3?w=800',
    title: 'Vogue Editorial',
    category: 'Fashion',
    year: '2024'
  },
  {
    image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800',
    title: 'Nike Campaign',
    category: 'Commercial',
    year: '2024'
  },
  {
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800',
    title: 'Ethereal Beauty',
    category: 'Beauty',
    year: '2023'
  },
  {
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800',
    title: 'Urban Stories',
    category: 'Documentary',
    year: '2023'
  },
  {
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800',
    title: 'Golden Hour',
    category: 'Wedding',
    year: '2023'
  },
  {
    image: 'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=800',
    title: 'Timeless Elegance',
    category: 'Luxury',
    year: '2022'
  }
];

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.portfolio-item',
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.portfolio-grid',
            start: 'top 70%'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="portfolio" ref={sectionRef} className="section-padding bg-[#FAFAFA]">
      <div className="container-main">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <span className="text-label text-[#FF4D00] block mb-4">Selected Work</span>
            <h2 className="text-section gradient-text">
              Our
              <span className="font-display italic"> Portfolio</span>
            </h2>
          </div>

          <a href="#" className="btn-outline flex-shrink-0">
            View All Projects
          </a>
        </div>

        {/* Portfolio Grid */}
        <div className="portfolio-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="portfolio-item group relative overflow-hidden rounded-2xl"
            >
              {/* Image */}
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-semibold text-[#FF4D00] tracking-wider uppercase">
                    {project.category}
                  </span>
                  <span className="text-[10px] text-white/60">{project.year}</span>
                </div>
                <h3 className="font-display text-[24px] font-semibold text-white">
                  {project.title}
                </h3>
              </div>

              {/* View Icon */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
