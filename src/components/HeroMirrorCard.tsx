import logoImage from "@/assets/genmyo-logo.png";
import { cn } from "@/lib/utils";

const HERO_TERRACOTTA = "#B07346";
const HERO_CREAM = "#FFF9F0";
const HERO_TEXT = "#2D2D2D";
const HERO_ACCENT = "#B57E5D";

const MirrorCardLogo = ({ className }: { className?: string }) => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("relative z-10 h-[5.5rem] w-[5.5rem] sm:h-24 sm:w-24", className)}
    aria-hidden
  >
    <defs>
      <radialGradient id="hero-mirror-suno" cx="50%" cy="42%" r="50%">
        <stop offset="0%" stopColor="#F4C95D" />
        <stop offset="55%" stopColor="#F4C95D" />
        <stop offset="100%" stopColor="#F7DD9A" stopOpacity="0" />
      </radialGradient>
    </defs>
    <circle cx="50" cy="40" r="34" fill="url(#hero-mirror-suno)" />
    <g fill="none" stroke="#3A3128" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round">
      <path d="M50 78 C 30 74, 13 66, 9 52 C 22 47, 38 52, 50 78 Z" />
      <path d="M50 78 C 70 74, 87 66, 91 52 C 78 47, 62 52, 50 78 Z" />
      <path d="M50 78 C 40 66, 33 54, 36 42 C 45 48, 50 60, 50 78 Z" />
      <path d="M50 78 C 60 66, 67 54, 64 42 C 55 48, 50 60, 50 78 Z" />
      <path d="M50 78 C 44 64, 44 46, 50 33 C 56 46, 56 64, 50 78 Z" />
    </g>
  </svg>
);

type HeroMirrorCardProps = {
  className?: string;
};

const HeroMirrorCard = ({ className }: HeroMirrorCardProps) => (
  <div
    className={cn(
      "flex h-full w-full flex-col overflow-hidden bg-[#FDFAF5]",
      "px-8 py-10 sm:px-10 sm:py-12",
      className
    )}
  >
    <div className="flex min-h-0 flex-1 flex-col items-center justify-between text-center">
      <div className="relative flex items-center justify-center">
        <MirrorCardLogo />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-2 sm:px-3">
        <h2
          className="font-serif text-[1.75rem] font-medium leading-[1.22] xs:text-[1.9rem] sm:text-[2.125rem]"
          style={{ color: HERO_TEXT }}
        >
          You deserve
          <br />
          someone who{" "}
          <em className="font-medium italic" style={{ color: HERO_ACCENT }}>
            listens.
          </em>
        </h2>
        <p
          className="mt-5 max-w-[16rem] font-sans text-[0.9rem] leading-[1.6] xs:max-w-[17rem] xs:text-[0.95rem] sm:mt-6 sm:max-w-[18rem] sm:text-[1rem]"
          style={{ color: `${HERO_TEXT}CC` }}
        >
          The Mirror is an AI companion built to help you slow down, reflect, and feel more like
          yourself, whenever you need it.
        </p>
      </div>

      <img
        src={logoImage}
        alt="GenMyo"
        width={1920}
        height={430}
        className="mt-8 h-6 w-auto opacity-70 sm:mt-10 sm:h-7"
      />
    </div>
  </div>
);

export { HERO_TERRACOTTA, HERO_CREAM, HERO_TEXT, HERO_ACCENT };
export default HeroMirrorCard;
