import { useState } from 'react';

export default function ContactSection() {
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

  return (
    <section className="contact-section">
      <style>{`
        .contact-section {
          background-color: #ffffff;
          border-top: 1px solid #000000;
          padding: 6rem 2rem;
        }

        .contact-container {
          max-width: 1280px;
          margin: 0 auto;
        }

        .contact-grid {
          display: flex;
          gap: 6rem;
          justify-content: space-between;
        }

        .contact-left {
          flex: 1;
          max-width: 45%;
        }

        .contact-right {
          flex: 1;
          max-width: 45%;
          padding-left: 4rem;
          border-left: 1px solid rgba(0, 0, 0, 0.1);
        }

        .contact-small-title {
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #dc2626;
          margin-bottom: 1rem;
        }

        .contact-main-title {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: 5rem;
          line-height: 1;
          color: #000000;
          letter-spacing: -0.03em;
          margin-bottom: 2rem;
        }

        .contact-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 1.1rem;
          color: #737373;
          line-height: 1.7;
          margin-bottom: 3rem;
          max-width: 450px;
        }

        .contact-info {
          margin-bottom: 3rem;
        }

        .contact-info-item {
          margin-bottom: 2rem;
        }

        .contact-info-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.65rem;
          color: rgba(0, 0, 0, 0.3);
          text-transform: uppercase;
          letter-spacing: 0.2em;
          margin-bottom: 0.5rem;
        }

        .contact-info-value {
          font-family: 'Inter', sans-serif;
          font-size: 1.25rem;
          color: #000000;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .contact-info-value:hover {
          color: #dc2626;
        }

        .contact-info-text {
          font-family: 'Inter', sans-serif;
          font-size: 1.25rem;
          color: #000000;
          line-height: 1.6;
        }

        .contact-info-sub {
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          color: #737373;
        }

        .contact-social {
          display: flex;
          gap: 1.5rem;
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(0, 0, 0, 0.1);
        }

        .contact-social-link {
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem;
          color: rgba(0, 0, 0, 0.4);
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          transition: color 0.3s ease;
        }

        .contact-social-link:hover {
          color: #000000;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.65rem;
          color: rgba(0, 0, 0, 0.4);
          text-transform: uppercase;
          letter-spacing: 0.2em;
          margin-bottom: 0.75rem;
        }

        .form-input,
        .form-select,
        .form-textarea {
          padding: 1rem 0;
          background-color: transparent;
          border: none;
          border-bottom: 1px solid rgba(0, 0, 0, 0.2);
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          color: #000000;
          outline: none;
          transition: border-color 0.3s ease;
        }

        .form-input::placeholder,
        .form-textarea::placeholder {
          color: rgba(0, 0, 0, 0.3);
        }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          border-bottom-color: #000000;
        }

        .form-select {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 0 center;
          background-size: 1em;
        }

        .form-textarea {
          resize: none;
          min-height: 100px;
        }

        .form-submit {
          width: 100%;
          padding: 1.5rem;
          background-color: #000000;
          color: #ffffff;
          border: 2px solid #000000;
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 1rem;
        }

        .form-submit:hover {
          background-color: #dc2626;
          border-color: #dc2626;
        }

        @media (max-width: 768px) {
          .contact-section {
            padding: 4rem 1.5rem;
          }

          .contact-grid {
            flex-direction: column;
            gap: 4rem;
          }

          .contact-left,
          .contact-right {
            max-width: 100%;
            width: 100%;
          }

          .contact-right {
            padding-left: 0;
            border-left: none;
          }

          .contact-main-title {
            font-size: 3.5rem;
          }

          .contact-social {
            flex-wrap: wrap;
            gap: 1rem;
          }
        }
      `}</style>

      <div className="contact-container">
        <div className="contact-grid">
          {/* Left - Info */}
          <div className="contact-left">
            <p className="contact-small-title">Get In Touch</p>
            <h2 className="contact-main-title">
              START A<br />
              PROJECT
            </h2>
            <p className="contact-subtitle">
              Ready to transform your vision into something extraordinary?
              We'd love to hear about your next project.
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
                  Dubai, UAE<br />
                  <span className="contact-info-sub">Available worldwide</span>
                </p>
              </div>
            </div>

            {/* Social */}
            <div className="contact-social">
              {['IG', 'FB', 'TW', 'LN'].map((social) => (
                <a key={social} href="#contact" className="contact-social-link">
                  {social}
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
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
