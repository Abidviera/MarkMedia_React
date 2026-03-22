const footerLinks = {
  quick: [
    { name: 'Work', href: '#portfolio' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ],
  services: [
    { name: 'Photography', href: '#services' },
    { name: 'Videography', href: '#services' },
    { name: 'Fashion', href: '#services' },
    { name: 'Events', href: '#services' }
  ],
  social: [
    { name: 'Instagram', href: '#' },
    { name: 'YouTube', href: '#' },
    { name: 'Vimeo', href: '#' },
    { name: 'LinkedIn', href: '#' }
  ]
};

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white">
      {/* Main Footer */}
      <div className="section-padding pb-8">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-1 mb-6">
                <span className="font-display text-[32px] font-semibold tracking-tight">
                  LENS
                </span>
                <svg viewBox="0 0 12 12" className="w-3 h-3">
                  <circle cx="6" cy="6" r="5" fill="#FF4D00" />
                </svg>
              </div>
              <p className="text-body text-gray mb-6 max-w-sm leading-relaxed">
                Award-winning photography and cinematography studio crafting visuals that move people and tell stories that last forever.
              </p>
              <div className="flex gap-4">
                {footerLinks.social.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-[#FF4D00] hover:border-[#FF4D00] transition-all duration-300"
                    aria-label={social.name}
                  >
                    <span className="text-xs">{social.name.charAt(0)}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-heading font-semibold text-sm tracking-wider uppercase mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {footerLinks.quick.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-body text-gray hover:text-[#FF4D00] transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-heading font-semibold text-sm tracking-wider uppercase mb-6">Services</h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-body text-gray hover:text-[#FF4D00] transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-heading font-semibold text-sm tracking-wider uppercase mb-6">Contact</h4>
              <ul className="space-y-3">
                <li className="text-body text-gray">Los Angeles, CA</li>
                <li>
                  <a href="mailto:hello@lensstudio.com" className="text-body text-gray hover:text-[#FF4D00] transition-colors">
                    hello@lensstudio.com
                  </a>
                </li>
                <li>
                  <a href="tel:+15551234567" className="text-body text-gray hover:text-[#FF4D00] transition-colors">
                    +1 (555) 123-4567
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-main px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-small text-gray">
            © 2024 LENS Studio. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-small text-gray hover:text-[#FF4D00] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-small text-gray hover:text-[#FF4D00] transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
