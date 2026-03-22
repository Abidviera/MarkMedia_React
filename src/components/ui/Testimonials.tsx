import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    quote: "LENS Studio transformed our brand identity with their stunning visual storytelling. The attention to detail and creative direction exceeded all expectations.",
    name: 'Sarah Mitchell',
    role: 'Creative Director',
    company: 'Vogue Magazine'
  },
  {
    id: 2,
    quote: "Working with their team was an absolute pleasure. They captured the essence of our products in ways we never imagined possible.",
    name: 'Marcus Chen',
    role: 'CEO',
    company: 'TechFlow Inc.'
  },
  {
    id: 3,
    quote: "The wedding photos are beyond beautiful. Every moment, every emotion - they captured it all with such artistry and care.",
    name: 'Emily & James',
    role: 'Clients',
    company: 'Malibu Wedding'
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="section-padding bg-[#FAFAFA]">
      <div className="container-main">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-label text-[#FF4D00] block mb-4">Testimonials</span>
          <h2 className="text-section gradient-text">
            What Our
            <span className="font-display italic"> Clients</span> Say
          </h2>
        </div>

        {/* Testimonial */}
        <div className="max-w-4xl mx-auto">
          <div className="relative min-h-[300px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={{
                  enter: (direction: number) => ({ x: direction > 0 ? 200 : -200, opacity: 0 }),
                  center: { x: 0, opacity: 1 },
                  exit: (direction: number) => ({ x: direction < 0 ? 200 : -200, opacity: 0 })
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="absolute inset-0 flex flex-col items-center text-center px-8"
              >
                {/* Quote Icon */}
                <svg viewBox="0 0 48 48" className="w-12 h-12 text-[#FF4D00] mb-6 opacity-50">
                  <path fill="currentColor" d="M14 24c0-5.5 4.5-10 10-10s10 4.5 10 10c0 8.8-7.2 16-10 16v-4c1.8 0 3.4-1.4 3.4-3.2 0-1.8-1.4-3.2-3.4-3.2s-3.4 1.4-3.4 3.2H14v-5.6zm14 0c0-5.5 4.5-10 10-10s10 4.5 10 10c0 8.8-7.2 16-10 16v-4c1.8 0 3.4-1.4 3.4-3.2 0-1.8-1.4-3.2-3.4-3.2s-3.4 1.4-3.4 3.2H28v-5.6z" />
                </svg>

                {/* Quote */}
                <p className="font-display text-[clamp(20px,2.5vw,28px)] text-dark leading-relaxed mb-8 italic">
                  "{testimonials[currentIndex].quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FF4D00] to-[#C9A227] flex items-center justify-center">
                    <span className="text-white font-display text-lg font-semibold">
                      {testimonials[currentIndex].name.charAt(0)}
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="font-heading font-semibold text-dark">
                      {testimonials[currentIndex].name}
                    </p>
                    <p className="text-small text-gray">
                      {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentIndex ? 1 : -1);
                  setCurrentIndex(i);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? 'bg-[#FF4D00] scale-125'
                    : 'bg-[#E8E8E6] hover:bg-gray'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
