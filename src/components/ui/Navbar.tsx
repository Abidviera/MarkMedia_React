import { useState, useEffect } from 'react';

export default function Navbar({ onOpenMenu, isMenuOpen }: { onOpenMenu: () => void; isMenuOpen: boolean }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', href: '#portfolio' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'glass py-4' : 'py-6 bg-transparent'
      }`}
    >
      <div className="container-main px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-1 group">
          <span className="font-display text-[28px] font-semibold tracking-tight text-dark group-hover:text-[#FF4D00] transition-colors">
            LENS
          </span>
          <svg viewBox="0 0 12 12" className="w-3 h-3">
            <circle cx="6" cy="6" r="5" fill="#FF4D00" />
          </svg>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-label text-dark link-hover"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* CTA & Menu */}
        <div className="flex items-center gap-6">
          <a href="#contact" className="hidden lg:block btn-primary">
            <span>Get in Touch</span>
          </a>

          <button
            onClick={onOpenMenu}
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          >
            <span
              className={`w-6 h-[2px] bg-dark transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`w-6 h-[2px] bg-dark transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-6 h-[2px] bg-dark transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </div>
    </nav>
  );
}
