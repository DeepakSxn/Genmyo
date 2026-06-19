import { cn } from "@/lib/utils";

type HeroPhoneShellProps = {
  children: React.ReactNode;
  className?: string;
};

const HeroPhoneShell = ({ children, className }: HeroPhoneShellProps) => (
  <div className={cn("hero-phone-shell", className)}>
    <span className="hero-phone-btn hero-phone-btn--mute" aria-hidden="true" />
    <span className="hero-phone-btn hero-phone-btn--vol-up" aria-hidden="true" />
    <span className="hero-phone-btn hero-phone-btn--vol-down" aria-hidden="true" />
    <span className="hero-phone-btn hero-phone-btn--power" aria-hidden="true" />

    <div className="hero-phone-screen">
      <div className="hero-phone-island" aria-hidden="true" />
      <div className="hero-phone-content">{children}</div>
      <div className="hero-phone-home" aria-hidden="true" />
    </div>
  </div>
);

export default HeroPhoneShell;
