const insights = [
  {
    id: 1,
    category: 'PHOTOGRAPHY',
    title: 'The Art of Wedding Photography: Capturing Timeless Moments',
    excerpt: 'Discover the techniques and creative approaches that make wedding photos truly memorable and timeless.',
    date: 'MAR 15, 2026',
    readTime: '8 MIN READ'
  },
  {
    id: 2,
    category: 'VIDEOGRAPHY',
    title: 'Cinematic Storytelling: Beyond Basic Video Production',
    excerpt: 'How professional cinematography elevates corporate events and personal celebrations to cinematic experiences.',
    date: 'MAR 08, 2026',
    readTime: '6 MIN READ'
  },
  {
    id: 3,
    category: 'CREATIVE',
    title: 'The Impact of Visual Content in Modern Marketing',
    excerpt: 'Why high-quality photography and videography are essential for brands looking to make an impact.',
    date: 'FEB 28, 2026',
    readTime: '10 MIN READ'
  }
];

export default function InsightsSection() {
  return (
    <section className="insights-section">
      <style>{`
        .insights-section {
          background-color: #000000;
          border-top: 1px solid #000000;
          padding: 6rem 2rem;
        }

        .insights-container {
          max-width: 1280px;
          margin: 0 auto;
        }

        .insights-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 4rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .insights-title-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .insights-small-title {
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #dc2626;
        }

        .insights-main-title {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: 8rem;
          line-height: 1;
          color: #ffffff;
          letter-spacing: -0.03em;
        }

        .insights-view-all {
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.5);
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          transition: color 0.3s ease;
        }

        .insights-view-all:hover {
          color: #ffffff;
        }

        .insights-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3rem;
        }

        .insight-card {
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .insight-card:first-child {
          border-top: none;
          padding-top: 0;
        }

        .insight-meta {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .insight-category {
          font-family: 'Inter', sans-serif;
          font-size: 0.65rem;
          color: rgba(255, 255, 255, 0.4);
          text-transform: uppercase;
          letter-spacing: 0.2em;
        }

        .insight-dot {
          width: 4px;
          height: 4px;
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
        }

        .insight-read-time {
          font-family: 'Inter', sans-serif;
          font-size: 0.65rem;
          color: rgba(255, 255, 255, 0.3);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .insight-title {
          font-family: 'Inter', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.3;
          margin-bottom: 1rem;
          transition: color 0.3s ease;
        }

        .insight-title:hover {
          color: rgba(255, 255, 255, 0.7);
        }

        .insight-excerpt {
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.5);
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }

        .insight-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .insight-date {
          font-family: 'Inter', sans-serif;
          font-size: 0.65rem;
          color: rgba(255, 255, 255, 0.3);
          text-transform: uppercase;
          letter-spacing: 0.15em;
        }

        .insight-read-link {
          font-family: 'Inter', sans-serif;
          font-size: 0.65rem;
          color: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          transition: color 0.3s ease;
        }

        .insight-read-link:hover {
          color: #ffffff;
        }

        .insights-newsletter {
          margin-top: 6rem;
          padding-top: 4rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 3rem;
        }

        .newsletter-text h3 {
          font-family: 'Inter', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }

        .newsletter-text p {
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .newsletter-form {
          display: flex;
          gap: 1rem;
        }

        .newsletter-input {
          padding: 1rem 1.5rem;
          background-color: transparent;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #ffffff;
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          outline: none;
          transition: border-color 0.3s ease;
        }

        .newsletter-input::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }

        .newsletter-input:focus {
          border-color: #ffffff;
        }

        .newsletter-btn {
          padding: 1rem 2rem;
          background-color: #ffffff;
          color: #000000;
          border: 2px solid #ffffff;
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .newsletter-btn:hover {
          background-color: #dc2626;
          border-color: #dc2626;
          color: #ffffff;
        }

        @media (max-width: 768px) {
          .insights-section {
            padding: 4rem 1.5rem;
          }

          .insights-main-title {
            font-size: 4rem;
          }

          .insights-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .insights-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .insight-card {
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding-top: 2rem;
          }

          .insight-card:first-child {
            border-top: none;
            padding-top: 0;
          }

          .insights-newsletter {
            flex-direction: column;
            align-items: flex-start;
          }

          .newsletter-form {
            flex-direction: column;
            width: 100%;
          }

          .newsletter-input,
          .newsletter-btn {
            width: 100%;
          }
        }
      `}</style>

      <div className="insights-container">
        {/* Section Header */}
        <div className="insights-header">
          <div className="insights-title-group">
            <p className="insights-small-title">Thinking</p>
            <h2 className="insights-main-title">INSIGHTS</h2>
          </div>
          <a href="#insights" className="insights-view-all">
            All Articles →
          </a>
        </div>

        {/* Articles Grid */}
        <div className="insights-grid">
          {insights.map((article, index) => (
            <article key={article.id} className={`insight-card ${index === 0 ? 'first' : ''}`}>
              <a href="#insights" style={{ textDecoration: 'none' }}>
                {/* Category & Meta */}
                <div className="insight-meta">
                  <span className="insight-category">{article.category}</span>
                  <span className="insight-dot"></span>
                  <span className="insight-read-time">{article.readTime}</span>
                </div>

                {/* Title */}
                <h3 className="insight-title">{article.title}</h3>

                {/* Excerpt */}
                <p className="insight-excerpt">{article.excerpt}</p>

                {/* Date & Link */}
                <div className="insight-footer">
                  <span className="insight-date">{article.date}</span>
                  <span className="insight-read-link">Read →</span>
                </div>
              </a>
            </article>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="insights-newsletter">
          <div className="newsletter-text">
            <h3>Stay in the loop</h3>
            <p>Get the latest photography tips, behind-the-scenes stories, and creative insights from Mark Media.</p>
          </div>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your Email"
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-btn">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
