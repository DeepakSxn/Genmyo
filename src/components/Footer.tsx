import { Link } from "react-router-dom";
import { Linkedin, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-wide px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-serif text-3xl font-medium mb-4">GenMyo</h3>
            <p className="text-primary-foreground/70 max-w-md leading-relaxed">
              GenMyo is an inner wellness platform delivered through WhatsApp. The Mirror Project by GenMyo — a guided reflection to help you reconnect with yourself.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-sans text-sm font-semibold uppercase tracking-wider mb-6 text-primary-foreground/50">
              Navigate
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/how-it-works", label: "How It Works" },
                { href: "#faq", label: "FAQ" },
                { href: "/emotional-check-in", label: "Emotional Check-In" },
                { href: "/100-conversations", label: "100 Conversations Report" },
                { href: "/philosophy", label: "Our Philosophy" },
                { href: "/partners", label: "Partners" },
                { href: "/blog", label: "Blog" },
                { href: "/team", label: "Team" },
              ].map((link) => (
                <li key={link.href}>
                  {link.href.startsWith("#") ? (
                    <a
                      href={link.href}
                      className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans text-sm font-semibold uppercase tracking-wider mb-6 text-primary-foreground/50">
              Connect
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@genmyo.ai"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  hello@genmyo.ai
                </a>
              </li>
            </ul>
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.instagram.com/genmyoai/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/GenmyoAI"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/genmyo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/50">
            © {new Date().getFullYear()} GenMyo. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-primary-foreground/50">
            <Link to="/privacy" className="hover:text-primary-foreground transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-primary-foreground transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
