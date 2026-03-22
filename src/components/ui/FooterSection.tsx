export default function FooterSection() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Navigate',
      links: [
        { name: 'Work', href: '#work' },
        { name: 'About', href: '#about' },
        { name: 'Services', href: '#services' },
        { name: 'Insights', href: '#insights' },
        { name: 'Contact', href: '#contact' }
      ]
    },
    {
      title: 'Services',
      links: [
        { name: 'Photography', href: '#contact' },
        { name: 'Videography', href: '#contact' },
        { name: 'Wedding Coverage', href: '#contact' },
        { name: 'Corporate Events', href: '#contact' }
      ]
    },
    {
      title: 'Connect',
      links: [
        { name: 'Instagram', href: '#contact' },
        { name: 'Facebook', href: '#contact' },
        { name: 'Twitter', href: '#contact' },
        { name: 'LinkedIn', href: '#contact' }
      ]
    }
  ];

  return (
    <footer className="footer-section">
      <style>{`
        .footer-section {
          background-color: #000000;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding: 6rem 2rem 3rem;
        }

        .footer-container {
          max-width: 1280px;
          margin: 0 auto;
        }

        .footer-top {
          display: flex;
          justify-content: space-between;
          gap: 4rem;
          margin-bottom: 6rem;
        }

        .footer-cta {
          flex: 1;
          max-width: 50%;
        }

        .footer-cta-title {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: 6rem;
          line-height: 1;
          color: #ffffff;
          letter-spacing: -0.03em;
          margin-bottom: 2rem;
        }

        .footer-cta-title span {
          color: rgba(255, 255, 255, 0.3);
        }

        .footer-cta-btn {
          display: inline-block;
          padding: 1rem 2rem;
          border: 1px solid #ffffff;
          color: #ffffff;
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .footer-cta-btn:hover {
          background-color: #ffffff;
          color: #000000;
        }

        .footer-links-grid {
          display: flex;
          gap: 4rem;
          flex: 1;
          justify-content: flex-end;
        }

        .footer-link-column {
          min-width: 150px;
        }

        .footer-link-title {
          font-family: 'Inter', sans-serif;
          font-size: 0.65rem;
          color: rgba(255, 255, 255, 0.3);
          text-transform: uppercase;
          letter-spacing: 0.2em;
          margin-bottom: 1.5rem;
        }

        .footer-link-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .footer-link-item a {
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-link-item a:hover {
          color: #dc2626;
        }

        .footer-bottom {
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .footer-logo-text {
          font-family: 'Inter', sans-serif;
          font-size: 1.25rem;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.02em;
        }

        .footer-logo-sub {
          font-family: 'Inter', sans-serif;
          font-size: 0.65rem;
          color: rgba(255, 255, 255, 0.3);
          text-transform: uppercase;
          letter-spacing: 0.15em;
        }

        .footer-copyright {
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.3);
        }

        .footer-legal {
          display: flex;
          gap: 2rem;
        }

        .footer-legal a {
          font-family: 'Inter', sans-serif;
          font-size: 0.65rem;
          color: rgba(255, 255, 255, 0.3);
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          transition: color 0.3s ease;
        }

        .footer-legal a:hover {
          color: rgba(255, 255, 255, 0.6);
        }

        .footer-accent {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2), transparent);
        }

        @media (max-width: 768px) {
          .footer-section {
            padding: 4rem 1.5rem 2rem;
          }

          .footer-top {
            flex-direction: column;
            gap: 3rem;
            margin-bottom: 4rem;
          }

          .footer-cta,
          .footer-links-grid {
            max-width: 100%;
            width: 100%;
          }

          .footer-links-grid {
            flex-wrap: wrap;
            gap: 2rem;
          }

          .footer-link-column {
            min-width: 120px;
          }

          .footer-cta-title {
            font-size: 3.5rem;
          }

          .footer-bottom {
            flex-direction: column;
            gap: 1.5rem;
            text-align: center;
          }

          .footer-logo {
            justify-content: center;
          }

          .footer-legal {
            justify-content: center;
          }
        }
      `}</style>

      <div className="footer-container">
        {/* Top Section */}
        <div className="footer-top">
          {/* Logo & CTA */}
          <div className="footer-cta">
            <h2 className="footer-cta-title">
              LET'S<br />
              <span>TALK</span>
            </h2>
            <a href="mailto:hello@markmedia.com" className="footer-cta-btn">
              HELLO@MARKMEDIA.COM
            </a>
          </div>

          {/* Links Grid */}
          <div className="footer-links-grid">
            {footerLinks.map((section) => (
              <div key={section.title} className="footer-link-column">
                <p className="footer-link-title">{section.title}</p>
                <ul className="footer-link-list">
                  {section.links.map((link) => (
                    <li key={link.name} className="footer-link-item">
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          {/* Logo */}
          <div className="footer-logo">
            <span className="footer-logo-text">MARK</span>
            <span className="footer-logo-sub">MEDIA</span>
          </div>

          {/* Copyright */}
          <p className="footer-copyright">
            © {currentYear} Mark Media. All rights reserved.
          </p>

          {/* Legal */}
          <div className="footer-legal">
            <a href="#contact">Privacy</a>
            <a href="#contact">Terms</a>
          </div>
        </div>
      </div>

      {/* Background Accent */}
      <div className="footer-accent" />
    </footer>
  );
}
