import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";



const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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



  const sectionLinks = [
    { id: "for-you", label: "For you" },
    { id: "for-business", label: "For business" },
  ];

  const isActive = (path: string) => location.pathname === path;

  // On the home route and partners route the hero is dark (black/gold); render light nav until scrolled.
  const overDark = (location.pathname === "/" || location.pathname === "/partners") && !isScrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "nav-scrolled border-b border-border"
          : "bg-transparent"
      }`}
      style={
        isScrolled
          ? {
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }
          : undefined
      }
    >
      <div className="container-wide px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Logo size={30} invert={overDark} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors link-underline ${overDark
                ? isActive("/")
                  ? "text-primary-foreground"
                  : "text-primary-foreground/70 hover:text-primary-foreground"
                : isActive("/")
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
                }`}
            >
              Home
            </Link>
            {sectionLinks.map((s) => (
              <a
                key={s.id}
                href={`/#${s.id}`}
                className={`text-sm font-medium transition-colors link-underline ${overDark
                  ? "text-primary-foreground/70 hover:text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {s.label}
              </a>
            ))}
            <Link
              to="/partners"
              className={`text-sm font-medium transition-colors link-underline ${overDark
                ? isActive("/partners")
                  ? "text-primary-foreground"
                  : "text-primary-foreground/70 hover:text-primary-foreground"
                : isActive("/partners")
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
                }`}
            >
              For partners
            </Link>
            <Link
              to="/how-it-works"
              className={`text-sm font-medium transition-colors link-underline ${overDark
                ? isActive("/how-it-works")
                  ? "text-primary-foreground"
                  : "text-primary-foreground/70 hover:text-primary-foreground"
                : isActive("/how-it-works")
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
                }`}
            >
              How It Works
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/join"
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium bg-gold text-gold-foreground rounded-full hover:opacity-90 transition-opacity"
            >
              Join Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 ${overDark ? "text-primary-foreground" : "text-foreground"}`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-6 border-t border-border/50 animate-fade-in bg-background">
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className={`text-lg font-medium py-2 ${isActive("/")
                  ? "text-foreground"
                  : "text-muted-foreground"
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
                className={`text-lg font-medium py-2 ${isActive("/partners")
                  ? "text-foreground"
                  : "text-muted-foreground"
                  }`}
              >
                For partners
              </Link>
              <Link
                to="/how-it-works"
                onClick={() => setIsOpen(false)}
                className={`text-lg font-medium py-2 ${isActive("/how-it-works")
                  ? "text-foreground"
                  : "text-muted-foreground"
                  }`}
              >
                How It Works
              </Link>
              <div className="flex flex-col gap-3 mt-4">
                <Link
                  to="/join"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium bg-gold text-gold-foreground rounded-full"
                >
                  Join Now
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
