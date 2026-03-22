import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { number: 500, suffix: '+', label: 'Projects Completed' },
  { number: 12, suffix: '', label: 'Years Experience' },
  { number: 1000, suffix: '+', label: 'Happy Clients' },
  { number: 50, suffix: '+', label: 'Industry Awards' }
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [counters, setCounters] = useState(stats.map(() => 0));
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      stats.forEach((stat, i) => {
        gsap.to({ val: 0 }, {
          val: stat.number,
          duration: 2,
          delay: i * 0.2,
          ease: 'power2.out',
          onUpdate: function () {
            setCounters(prev => {
              const newCounters = [...prev];
              newCounters[i] = Math.round(this.targets()[0].val);
              return newCounters;
            });
          }
        });
      });
    }
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="section-padding bg-[#1A1A1A] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container-main relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center lg:text-left">
              <p className="text-[clamp(48px,8vw,80px)] font-display font-bold text-white leading-none mb-4">
                {counters[i]}{stat.suffix}
              </p>
              <p className="text-label text-gray tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <h3 className="font-display text-[clamp(32px,4vw,48px)] text-white mb-6">
            Ready to Create Something
            <span className="text-[#FF4D00] italic"> Beautiful?</span>
          </h3>
          <a href="#contact" className="btn-primary">
            <span>Start Your Project</span>
          </a>
        </div>
      </div>

      {/* Decorative */}
      <div className="absolute bottom-0 left-0 w-1/2 h-1 bg-gradient-to-r from-[#FF4D00] to-transparent" />
    </section>
  );
}
