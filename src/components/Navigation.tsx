import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, MessageCircle } from "lucide-react";
import Logo from "./Logo";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const sectionLinks = [
    { id: "for-you", label: "For you" },
    { id: "for-business", label: "For business" },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Home + partners heroes are dark; light nav chrome until html.is-scrolled (see index.css)
  const darkHero = location.pathname === "/" || location.pathname === "/partners";

  const linkClass = (active: boolean) =>
    darkHero
      ? `nav-link text-sm font-medium transition-colors link-underline`
      : `text-sm font-medium transition-colors link-underline ${
          active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
        }`;

  return (
    <nav
      data-site-nav
      {...(darkHero ? { "data-dark-hero": "true" } : {})}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent"
    >
      <div className="container-wide px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="nav-logo">
              <Logo size={30} />
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            <Link
              to="/"
              data-active={isActive("/") ? "true" : undefined}
              className={linkClass(isActive("/"))}
            >
              Home
            </Link>
            {sectionLinks.map((s) => (
              <a
                key={s.id}
                href={`/#${s.id}`}
                className={linkClass(false)}
              >
                {s.label}
              </a>
            ))}
            <Link
              to="/partners"
              data-active={isActive("/partners") ? "true" : undefined}
              className={linkClass(isActive("/partners"))}
            >
              For partners
            </Link>
            <Link
              to="/how-it-works"
              data-active={isActive("/how-it-works") ? "true" : undefined}
              className={linkClass(isActive("/how-it-works"))}
            >
              How It Works
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/join"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium bg-gold text-gold-foreground rounded-full hover:opacity-90 transition-opacity"
            >
              <Menu size={0} className="hidden" />
              <MessageCircle size={16} />
              Start on WhatsApp
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`nav-menu-btn md:hidden p-2 ${darkHero ? "" : "text-foreground"}`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-6 border-t border-border/50 animate-fade-in bg-background">
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className={`text-lg font-medium py-2 ${
                  isActive("/") ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                Home
              </Link>
              {sectionLinks.map((s) => (
                <a
                  key={s.id}
                  href={`/#${s.id}`}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium py-2 text-left text-muted-foreground block"
                >
                  {s.label}
                </a>
              ))}
              <Link
                to="/partners"
                onClick={() => setIsOpen(false)}
                className={`text-lg font-medium py-2 ${
                  isActive("/partners") ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                For partners
              </Link>
              <Link
                to="/how-it-works"
                onClick={() => setIsOpen(false)}
                className={`text-lg font-medium py-2 ${
                  isActive("/how-it-works") ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                How It Works
              </Link>
              <div className="flex flex-col gap-3 mt-4">
                <Link
                  to="/join"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium bg-gold text-gold-foreground rounded-full"
                >
                  <MessageCircle size={16} />
                  Start on WhatsApp
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
