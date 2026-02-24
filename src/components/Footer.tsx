import { Link } from "react-router-dom";
import FooterLogo from "./FooterLogo";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-wide px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <FooterLogo size={60} />
            </div>
            <p className="text-primary-foreground/70 max-w-md leading-relaxed">
              An AI-led platform designed to support lasting human development 
              through personalized reflection, guidance, and growth.
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
                { href: "/philosophy", label: "Our Philosophy" },
                { href: "/plan", label: "The Plan" },
                { href: "/team", label: "Team" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
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
                  href="mailto:admin@genmyo.ai"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  admin@genmyo.ai
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/50">
            © {new Date().getFullYear()} GenMyo. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-primary-foreground/50">
          <Link to="/terms" className="hover:text-primary-foreground transition-colors">
              Privacy & Terms
            
          </Link>
           
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
