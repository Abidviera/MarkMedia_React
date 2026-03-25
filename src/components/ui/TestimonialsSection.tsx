import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: 'SHEIKH KHALIFA',
    role: 'CEO, Emirates Group',
    quote: 'Mark Media transformed our corporate event into a cinematic masterpiece. Their attention to detail and creative vision exceeded all expectations.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80'
  },
  {
    id: 2,
    name: 'PRINCESS AMIRA',
    role: 'Royal Wedding Committee',
    quote: 'They captured every precious moment of our wedding with such artistry and elegance. These photos will be treasured for generations.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80'
  },
  {
    id: 3,
    name: 'JAMES WALKER',
    role: 'Creative Director, Vogue Arabia',
    quote: 'Working with Mark Media on our editorial shoots was incredible. They bring a unique perspective that elevates every frame.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80'
  },
  {
    id: 4,
    name: 'DR. FATIMA ALI',
    role: 'Director, Dubai Health Authority',
    quote: 'Their medical photography work is exceptional. They understand the delicate balance between clinical precision and artistic expression.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80'
  }
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from('.testimonial-heading-line', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.testimonials-header',
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      // Cards animation
      gsap.from('.testimonial-card', {
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.testimonials-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="testimonials-section">
      <style>{`
        .testimonials-section {
          position: relative;
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
          padding: 8rem 2rem;
          overflow: hidden;
        }

        .testimonials-container {
          position: relative;
          max-width: 1400px;
          margin: 0 auto;
          z-index: 2;
        }

        .testimonials-header {
          text-align: center;
          margin-bottom: 5rem;
        }

        .testimonials-eyebrow {
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: var(--accent);
          margin-bottom: 1.5rem;
        }

        .testimonials-main-title {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: clamp(3rem, 8vw, 6rem);
          line-height: 1;
          color: var(--text-primary);
          letter-spacing: -0.03em;
          text-transform: uppercase;
        }

        .testimonial-heading-line {
          display: block;
        }

        .testimonial-heading-accent {
          color: transparent;
          -webkit-text-stroke: 1px var(--border-hover);
        }

        /* Featured Testimonial */
        .testimonial-featured {
          position: relative;
          max-width: 900px;
          margin: 0 auto 4rem;
          padding: 4rem;
          background: var(--card-bg);
          border: 1px solid var(--card-border);
        }

        .testimonial-quote-mark {
          font-family: 'Georgia', serif;
          font-size: 8rem;
          color: var(--accent);
          line-height: 1;
          opacity: 0.5;
          position: absolute;
          top: 1rem;
          left: 2rem;
        }

        .testimonial-featured-content {
          position: relative;
          z-index: 1;
        }

        .testimonial-featured-quote {
          font-family: 'Inter', sans-serif;
          font-size: clamp(1.25rem, 3vw, 2rem);
          font-weight: 300;
          color: var(--text-primary);
          line-height: 1.6;
          margin-bottom: 2rem;
          text-align: center;
        }

        .testimonial-featured-author {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
        }

        .testimonial-author-image {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid var(--accent);
        }

        .testimonial-author-info {
          text-align: left;
        }

        .testimonial-author-name {
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: 0.05em;
        }

        .testimonial-author-role {
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem;
          color: var(--text-dim);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .testimonial-rating {
          display: flex;
          gap: 0.25rem;
          margin-left: auto;
        }

        .testimonial-star {
          color: #f97316;
          font-size: 1rem;
        }

        /* Testimonial Indicators */
        .testimonial-indicators {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 4rem;
        }

        .testimonial-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--border-color);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .testimonial-indicator.active {
          background: var(--accent);
          transform: scale(1.5);
        }

        /* Testimonials Grid */
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }

        .testimonial-card {
          padding: 2.5rem;
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          transition: all 0.4s ease;
        }

        .testimonial-card:hover {
          background: var(--card-bg);
          border-color: var(--card-border-hover);
          transform: translateY(-5px);
        }

        .testimonial-card-quote {
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          color: var(--text-muted);
          line-height: 1.8;
          margin-bottom: 2rem;
        }

        .testimonial-card-author {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .testimonial-card-image {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: cover;
        }

        .testimonial-card-name {
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .testimonial-card-role {
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem;
          color: var(--text-dim);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        /* Background decoration */
        .testimonials-bg {
          position: absolute;
          top: 50%;
          left: -10%;
          transform: translateY(-50%);
          pointer-events: none;
          z-index: 1;
        }

        .testimonials-bg-text {
          font-family: 'Inter', sans-serif;
          font-size: 30vw;
          font-weight: 800;
          color: var(--text-primary);
          white-space: nowrap;
          opacity: 0.01;
          letter-spacing: -0.05em;
          user-select: none;
        }

        @media (max-width: 1024px) {
          .testimonials-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .testimonials-section {
            padding: 5rem 1.5rem;
          }

          .testimonial-featured {
            padding: 2.5rem 1.5rem;
          }

          .testimonial-quote-mark {
            font-size: 5rem;
            top: 0.5rem;
            left: 1rem;
          }

          .testimonial-featured-author {
            flex-direction: column;
            text-align: center;
          }

          .testimonial-author-info {
            text-align: center;
          }

          .testimonial-rating {
            margin: 1rem auto 0;
          }
        }
      `}</style>

      <div className="testimonials-container">
        {/* Header */}
        <div className="testimonials-header">
          <p className="testimonials-eyebrow">Client Stories</p>
          <h2 className="testimonials-main-title">
            <span className="testimonial-heading-line">WHAT THEY</span>
            <span className="testimonial-heading-line testimonial-heading-accent">SAY</span>
          </h2>
        </div>

        {/* Featured Testimonial */}
        <div className="testimonial-featured">
          <span className="testimonial-quote-mark">"</span>
          <div className="testimonial-featured-content">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <p className="testimonial-featured-quote">
                  "{testimonials[activeIndex].quote}"
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="testimonial-featured-author">
              <img
                src={testimonials[activeIndex].image}
                alt={testimonials[activeIndex].name}
                className="testimonial-author-image"
              />
              <div className="testimonial-author-info">
                <p className="testimonial-author-name">{testimonials[activeIndex].name}</p>
                <p className="testimonial-author-role">{testimonials[activeIndex].role}</p>
              </div>
              <div className="testimonial-rating">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <span key={i} className="testimonial-star">★</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Indicators */}
        <div className="testimonial-indicators">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`testimonial-indicator ${index === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="testimonial-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <p className="testimonial-card-quote">"{testimonial.quote}"</p>
              <div className="testimonial-card-author">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="testimonial-card-image"
                />
                <div>
                  <p className="testimonial-card-name">{testimonial.name}</p>
                  <p className="testimonial-card-role">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background decoration */}
      <div className="testimonials-bg">
        <span className="testimonials-bg-text">CLIENTS</span>
      </div>
    </section>
  );
}
