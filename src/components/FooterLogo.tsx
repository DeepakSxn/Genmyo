import { forwardRef } from "react";
import footerLogoImage from "@/assets/gemmo-white.png";

interface FooterLogoProps {
  className?: string;
  size?: number;
}

const FooterLogo = forwardRef<HTMLDivElement, FooterLogoProps>(
  ({ className = "", size = 30 }, ref) => {
    return (
      <div ref={ref} className={`flex items-center ${className}`}>
        <img
          src={footerLogoImage}
          alt="GenMyo"
          width={1400}
          height={364}
          loading="lazy"
          style={{ height: size, width: "auto" }}
        />
      </div>
    );
  }
);

FooterLogo.displayName = "FooterLogo";

export default FooterLogo;

