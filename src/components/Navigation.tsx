import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const sectionLinks = [{ id: "for-you", label: "For you" }] as const;

  const isActive = (path: string) => location.pathname === path;

  // Home, partners, how-it-works, for-business, & linktree heroes are dark; light nav chrome until html.is-scrolled (see index.css)
  const darkHero =
    location.pathname === "/" ||
    location.pathname === "/partners" ||
    location.pathname === "/how-it-works" ||
    location.pathname === "/for-business" ||
    location.pathname === "/for-good" ||
    location.pathname === "/linktree";

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
            <Link
              to="/how-it-works"
              data-active={isActive("/how-it-works") ? "true" : undefined}
              className={linkClass(isActive("/how-it-works"))}
            >
              How It Works
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
              to="/for-business"
              data-active={isActive("/for-business") ? "true" : undefined}
              className={linkClass(isActive("/for-business"))}
            >
              For business
            </Link>
            <Link
              to="/partners"
              data-active={isActive("/partners") ? "true" : undefined}
              className={linkClass(isActive("/partners"))}
            >
              For partners
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/quiz"
              data-active={isActive("/quiz") ? "true" : undefined}
              className="text-sm font-semibold text-[#C2A053] hover:text-[#D9C48C] transition-colors"
              style={{ color: "#C2A053" }}
            >
              Take the quiz
            </Link>
            <Link
              to="/stories"
              data-active={isActive("/stories") ? "true" : undefined}
              className="text-sm font-semibold text-[#C2A053] hover:text-[#D9C48C] transition-colors"
              style={{ color: "#C2A053" }}
            >
              Stories
            </Link>
            <Link
              to="/join"
              data-cta-location="nav"
              className="inline-flex items-center justify-center px-7 py-2.5 text-sm font-semibold bg-[#C2A053] text-[#1C1A16] rounded-full shadow-sm hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#C2A053", color: "#1C1A16" }}
            >
              Join
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

        {isOpen &&
          createPortal(
          <div
            className={`md:hidden fixed inset-x-0 top-20 bottom-0 z-[60] overflow-y-auto overscroll-contain px-6 py-6 pb-28 ${
              darkHero
                ? "bg-[#181613] text-primary-foreground"
                : "bg-background text-foreground"
            }`}
          >
            <div className="flex flex-col gap-3">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className={`text-base font-medium py-2 transition-colors ${
                  isActive("/")
                    ? "text-gold font-semibold"
                    : darkHero
                    ? "text-primary-foreground/80 hover:text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Home
              </Link>
              <Link
                to="/how-it-works"
                onClick={() => setIsOpen(false)}
                className={`text-base font-medium py-2 transition-colors ${
                  isActive("/how-it-works")
                    ? "text-gold font-semibold"
                    : darkHero
                    ? "text-primary-foreground/80 hover:text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                How It Works
              </Link>
              <Link
                to="/for-business"
                onClick={() => setIsOpen(false)}
                className={`text-base font-medium py-2 transition-colors ${
                  isActive("/for-business")
                    ? "text-gold font-semibold"
                    : darkHero
                    ? "text-primary-foreground/80 hover:text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                For business
              </Link>
              <Link
                to="/partners"
                onClick={() => setIsOpen(false)}
                className={`text-base font-medium py-2 transition-colors ${
                  isActive("/partners")
                    ? "text-gold font-semibold"
                    : darkHero
                    ? "text-primary-foreground/80 hover:text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                For partners
              </Link>
              <Link
                to="/quiz"
                onClick={() => setIsOpen(false)}
                className="text-base font-semibold py-2 text-[#C2A053] transition-colors"
                style={{ color: "#C2A053" }}
              >
                Take the quiz
              </Link>
              <Link
                to="/stories"
                onClick={() => setIsOpen(false)}
                className="text-base font-semibold py-2 text-[#C2A053] transition-colors"
                style={{ color: "#C2A053" }}
              >
                Stories
              </Link>
              <div className="pt-3 border-t border-border/20 mt-2 flex flex-col gap-3">
                <Link
                  to="/join"
                  data-cta-location="mobile_sticky"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 text-sm font-semibold bg-[#C2A053] text-[#1C1A16] rounded-full hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: "#C2A053", color: "#1C1A16" }}
                >
                  Join
                </Link>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </nav>
  );
};

export default Navigation;
