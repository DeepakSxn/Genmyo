import logoImage from "@/assets/genmyo-logo.png";
import { cn } from "@/lib/utils";

const HERO_TERRACOTTA = "#B07346";
const HERO_CREAM = "#FFF9F0";
const HERO_TEXT = "#2D2D2D";
const HERO_ACCENT = "#B57E5D";
const HERO_GLOW = "#F2D07D";

const LotusIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 64 72"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("relative z-10 h-11 w-11 sm:h-12 sm:w-12 md:h-14 md:w-14", className)}
    aria-hidden
  >
    <path
      d="M32 18C26 18 21 23 19 30C17 37 20 43 25 47C28 43 30 37 32 32C34 37 36 43 39 47C44 43 47 37 45 30C43 23 38 18 32 18Z"
      stroke={HERO_TEXT}
      strokeWidth="1.25"
      strokeLinejoin="round"
    />
    <path
      d="M32 32C27 32 22 36 20 43C24 39 28 37 32 37C36 37 40 39 44 43C42 36 37 32 32 32Z"
      stroke={HERO_TEXT}
      strokeWidth="1.25"
      strokeLinejoin="round"
    />
    <path
      d="M32 37V54M25 49C28 51 32 52 32 52C32 52 36 51 39 49"
      stroke={HERO_TEXT}
      strokeWidth="1.25"
      strokeLinecap="round"
    />
  </svg>
);

type HeroMirrorCardProps = {
  className?: string;
};

const HeroMirrorCard = ({ className }: HeroMirrorCardProps) => (
  <div
    className={cn(
      "flex h-full w-full flex-col",
      "bg-[radial-gradient(ellipse_at_center,#FFFEF9_0%,#FFF9F0_45%,#F5EBDD_100%)]",
      "px-7 py-10 xs:px-8 sm:px-10 sm:py-12 md:px-12 md:py-14 lg:px-16 lg:py-20 xl:py-20",
      className
    )}
  >
    <div className="flex flex-1 flex-col items-center justify-between text-center">
      <div className="relative flex items-center justify-center pt-1 sm:pt-2">
        <div
          className="absolute h-14 w-14 rounded-full blur-2xl sm:h-[4.5rem] sm:w-[4.5rem]"
          style={{ backgroundColor: `${HERO_GLOW}99` }}
        />
        <LotusIcon />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-1 sm:px-2">
        <h2
          className="font-serif text-[1.35rem] font-medium leading-[1.28] xs:text-[1.5rem] sm:text-[1.65rem] md:text-[1.85rem] lg:text-[2rem]"
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
          className="mt-5 max-w-[12.5rem] font-sans text-[0.75rem] leading-[1.6] xs:max-w-[13.5rem] xs:text-[0.8rem] sm:mt-6 sm:max-w-[15rem] sm:leading-[1.65] md:mt-7 md:max-w-[17rem] md:text-[0.85rem]"
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
        className="mt-8 h-5 w-auto opacity-70 sm:mt-10 sm:h-6 md:mt-12 md:h-7"
      />
    </div>
  </div>
);

export { HERO_TERRACOTTA, HERO_CREAM, HERO_TEXT, HERO_ACCENT };
export default HeroMirrorCard;
