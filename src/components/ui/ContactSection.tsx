import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    service: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formState);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header
      gsap.from('.contact-heading-line', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-header',
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      // Animate info items
      gsap.from('.contact-info-item', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-info',
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      // Animate form
      gsap.from('.form-group', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-form',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="contact-section">
      <style>{`
        .contact-section {
          position: relative;
          background-color: var(--bg-primary);
          border-top: 1px solid var(--border-color);
          padding: 8rem 2rem;
          overflow: hidden;
        }

        .contact-container {
          position: relative;
          max-width: 1400px;
          margin: 0 auto;
          z-index: 2;
        }

        .contact-header {
          margin-bottom: 5rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid var(--border-color);
        }

        .contact-eyebrow {
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: var(--accent);
          margin-bottom: 1rem;
        }

        .contact-main-title {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: clamp(3rem, 8vw, 6rem);
          line-height: 1;
          color: var(--text-primary);
          letter-spacing: -0.03em;
          text-transform: uppercase;
          overflow: hidden;
        }

        .contact-heading-line {
          display: block;
        }

        .contact-heading-accent {
          color: transparent;
          -webkit-text-stroke: 1px var(--border-hover);
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
        }

        .contact-left {
          display: flex;
          flex-direction: column;
        }

        .contact-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 1.1rem;
          color: var(--text-dim);
          line-height: 1.8;
          margin-bottom: 3rem;
          max-width: 450px;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .contact-info-item {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .contact-info-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.65rem;
          color: var(--text-dim);
          text-transform: uppercase;
          letter-spacing: 0.2em;
        }

        .contact-info-value {
          font-family: 'Inter', sans-serif;
          font-size: 1.25rem;
          color: var(--text-primary);
          text-decoration: none;
          transition: color 0.3s ease;
          display: inline-block;
        }

        .contact-info-value:hover {
          color: var(--accent);
        }

        .contact-info-text {
          font-family: 'Inter', sans-serif;
          font-size: 1.25rem;
          color: var(--text-primary);
          line-height: 1.6;
        }

        .contact-info-sub {
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          color: var(--text-dim);
        }

        .contact-social {
          display: flex;
          gap: 1.5rem;
          margin-top: auto;
          padding-top: 2rem;
          border-top: 1px solid var(--border-color);
        }

        .contact-social-link {
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem;
          color: var(--text-dim);
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          transition: all 0.3s ease;
          padding: 0.5rem 1rem;
          border: 1px solid var(--border-color);
          position: relative;
          overflow: hidden;
        }

        .contact-social-link::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--accent);
          transform: translateY(100%);
          transition: transform 0.3s ease;
          z-index: 0;
        }

        .contact-social-link span {
          position: relative;
          z-index: 1;
        }

        .contact-social-link:hover {
          color: var(--text-primary);
          border-color: var(--accent);
        }

        .contact-social-link:hover::before {
          transform: translateY(0);
        }

        .contact-right {
          padding-left: 4rem;
          border-left: 1px solid var(--border-color);
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .form-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.65rem;
          color: var(--text-dim);
          text-transform: uppercase;
          letter-spacing: 0.2em;
        }

        .form-input,
        .form-select,
        .form-textarea {
          width: 100%;
          padding: 1rem 0;
          background-color: transparent;
          border: none;
          border-bottom: 1px solid var(--border-color);
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          color: var(--text-primary);
          outline: none;
          transition: border-color 0.3s ease;
        }

        .form-input::placeholder,
        .form-textarea::placeholder {
          color: var(--text-dim);
        }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          border-bottom-color: var(--accent);
        }

        .form-select {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 0 center;
          background-size: 1em;
        }

        .form-select option {
          background: var(--bg-primary);
          color: var(--text-primary);
        }

        .form-textarea {
          resize: none;
          min-height: 120px;
        }

        .form-submit {
          position: relative;
          width: 100%;
          padding: 1.5rem;
          background-color: transparent;
          color: var(--text-primary);
          border: 1px solid var(--text-primary);
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          cursor: pointer;
          transition: all 0.4s ease;
          overflow: hidden;
          margin-top: 1rem;
        }

        .form-submit::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--accent);
          transform: translateX(-100%);
          transition: transform 0.4s ease;
          z-index: 0;
        }

        .form-submit span {
          position: relative;
          z-index: 1;
        }

        .form-submit:hover {
          border-color: var(--accent);
          color: var(--text-primary);
        }

        .form-submit:hover::before {
          transform: translateX(0);
        }

        .form-submit:active {
          transform: scale(0.98);
        }

        /* Background decoration */
        .contact-bg-text {
          position: absolute;
          bottom: -10%;
          left: -5%;
          font-family: 'Inter', sans-serif;
          font-size: 30vw;
          font-weight: 800;
          color: var(--text-primary);
          opacity: 0.01;
          letter-spacing: -0.05em;
          pointer-events: none;
          user-select: none;
          z-index: 1;
        }

        @media (max-width: 1024px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 4rem;
          }

          .contact-right {
            padding-left: 0;
            border-left: none;
          }
        }

        @media (max-width: 768px) {
          .contact-section {
            padding: 5rem 1.5rem;
          }

          .contact-main-title {
            font-size: 2.5rem;
          }

          .contact-social {
            flex-wrap: wrap;
            gap: 1rem;
          }

          .contact-bg-text {
            font-size: 50vw;
            bottom: 0;
          }
        }
      `}</style>

      <div className="contact-container">
        <div className="contact-grid">
          {/* Left - Info */}
          <div className="contact-left">
            <div className="contact-header">
              <p className="contact-eyebrow">Get In Touch</p>
              <h2 className="contact-main-title">
                <span className="contact-heading-line">START A</span>
                <span className="contact-heading-line contact-heading-accent">PROJECT</span>
              </h2>
            </div>

            <p className="contact-subtitle">
              Ready to transform your vision into something extraordinary?
              We'd love to hear about your next project. Let's create something amazing together.
            </p>

            {/* Contact Info */}
            <div className="contact-info">
              <div className="contact-info-item">
                <p className="contact-info-label">Email</p>
                <a href="mailto:hello@markmedia.com" className="contact-info-value">
                  hello@markmedia.com
                </a>
              </div>
              <div className="contact-info-item">
                <p className="contact-info-label">Phone</p>
                <a href="tel:+971501234567" className="contact-info-value">
                  +971 50 123 4567
                </a>
              </div>
              <div className="contact-info-item">
                <p className="contact-info-label">Location</p>
                <p className="contact-info-text">
                  Dubai, UAE
                  <span className="contact-info-sub"> — Available worldwide</span>
                </p>
              </div>
            </div>

            {/* Social */}
            <div className="contact-social">
              {['IG', 'FB', 'TW', 'LN'].map((social) => (
                <a key={social} href="#contact" className="contact-social-link">
                  <span>{social}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right - Form */}
          <div className="contact-right">
            <form onSubmit={handleSubmit} className="contact-form">
              {/* Service Select */}
              <div className="form-group">
                <label className="form-label">Service Interest</label>
                <select
                  name="service"
                  value={formState.service}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Select a service</option>
                  <option value="photography">Photography</option>
                  <option value="videography">Videography</option>
                  <option value="wedding">Wedding Coverage</option>
                  <option value="corporate">Corporate Events</option>
                  <option value="fashion">Fashion & Editorial</option>
                  <option value="other">Something else</option>
                </select>
              </div>

              {/* Name */}
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="What should we call you?"
                />
              </div>

              {/* Email */}
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="Where can we reach you?"
                />
              </div>

              {/* Company */}
              <div className="form-group">
                <label className="form-label">Company / Organization</label>
                <input
                  type="text"
                  name="company"
                  value={formState.company}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Optional"
                />
              </div>

              {/* Message */}
              <div className="form-group">
                <label className="form-label">Tell Us About Your Project</label>
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  rows={4}
                  required
                  className="form-textarea"
                  placeholder="What's on your mind?"
                />
              </div>

              {/* Submit */}
              <button type="submit" className="form-submit">
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <span className="contact-bg-text">SAY</span>
    </section>
  );
}
