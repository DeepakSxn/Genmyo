import { forwardRef } from "react";
import logoImage from "@/assets/genmyo-logo.png";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: number;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ className = "", size = 32 }, ref) => {
    return (
      <div ref={ref} className={`flex items-center ${className}`}>
        <img
          src={logoImage}
          alt="GENMYŌ"
          style={{ height: size, width: "auto" }}
          className="dark:invert"
        />
      </div>
    );
  }
);

Logo.displayName = "Logo";

export default Logo;
