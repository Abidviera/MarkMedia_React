import { useState, useEffect } from 'react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', href: '#work' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Insights', href: '#insights' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled ? 'py-4 bg-black/90 backdrop-blur-md' : 'py-8'
        }`}
      >
        <div className="container-main px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="font-display text-[20px] font-bold tracking-tighter text-white hover:tracking-normal transition-all">
            MARKMEDIA
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-12">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[11px] font-medium tracking-[0.15em] text-white/70 hover:text-white transition-colors link-underline"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#contact"
            className="hidden lg:block text-[11px] font-medium tracking-[0.15em] px-6 py-3 border border-white hover:bg-white hover:text-black transition-all"
          >
            START PROJECT
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-2"
          >
            <span className={`w-6 h-[1px] bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`} />
            <span className={`w-6 h-[1px] bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-[1px] bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-black transition-transform duration-500 lg:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full px-8 py-32">
          <nav className="flex flex-col gap-8">
            {navLinks.map((link, i) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="font-display text-[clamp(32px,8vw,56px)] font-bold text-white hover:text-white/50 transition-colors"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="mt-auto">
            <p className="text-[10px] tracking-[0.2em] text-white/40 mb-4">CONTACT</p>
            <a href="mailto:hello@markmedia.com" className="text-lg text-white/70 hover:text-white transition-colors">
              hello@markmedia.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
