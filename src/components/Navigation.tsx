import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { HERO_CREAM } from "@/components/HeroMirrorCard";
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const links = [
    { href: "/", label: "Home" },
    { href: "/philosophy", label: "Our Philosophy" },
    { href: "/plan", label: "The Plan" },
    { href: "/team", label: "Team" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "border-b border-border/40 shadow-sm" : ""
      }`}
      style={{ backgroundColor: HERO_CREAM }}
    >
      <div className="container-wide px-4 sm:px-6 md:px-12">
        <div className="flex h-16 items-center justify-between sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex shrink-0 items-center gap-2">
            <Logo size={28} className="sm:[&_img]:!h-[30px]" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 lg:gap-10 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition-colors link-underline ${
                  isActive(link.href)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block shrink-0">
            <Link
              to="/join"
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 lg:px-6 lg:py-2.5"
            >
              Join Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div
            className="md:hidden animate-fade-in border-t border-border/50 py-6"
            style={{ backgroundColor: HERO_CREAM }}
          >
            <div className="flex flex-col gap-3 px-4 sm:gap-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-medium py-2 ${
                    isActive(link.href)
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/join"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center justify-center px-6 py-3 mt-4 text-sm font-medium bg-primary text-primary-foreground rounded-full"
              >
                Join Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
