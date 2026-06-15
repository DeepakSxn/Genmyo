import { useEffect, useState } from "react";
import HeroMirrorCard from "@/components/HeroMirrorCard";
import { cn } from "@/lib/utils";

const DEMO_COMPLETE = "GENMYO_MIRROR_DEMO_COMPLETE";
const DEMO_FALLBACK_MS = 55000;

const HeroMirrorPanel = () => {
  const [showCard, setShowCard] = useState(false);
  const [demoReady, setDemoReady] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setShowCard(true);
      return;
    }

    const onMessage = (event: MessageEvent) => {
      if (event.data?.type === DEMO_COMPLETE) {
        setShowCard(true);
      }
    };

    const fallback = window.setTimeout(() => setShowCard(true), DEMO_FALLBACK_MS);

    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener("message", onMessage);
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <div className="relative h-full min-h-[22rem] w-full sm:min-h-[26rem] md:min-h-[24rem]">
      <iframe
        src="/mirror-demo.html?embed=1"
        title="The Mirror — conversation preview"
        className={cn(
          "absolute inset-0 h-full w-full border-0 bg-transparent transition-opacity duration-1000 ease-out",
          showCard ? "pointer-events-none opacity-0" : "opacity-100"
        )}
        onLoad={() => setDemoReady(true)}
        aria-hidden={showCard}
      />

      {!demoReady && !showCard && (
        <div
          className="absolute inset-0 animate-pulse bg-[radial-gradient(ellipse_at_center,#FFFEF9_0%,#FFF9F0_45%,#F5EBDD_100%)]"
          aria-hidden
        />
      )}

      <div
        className={cn(
          "absolute inset-0 flex transition-opacity duration-1000 ease-out",
          showCard ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <HeroMirrorCard className="h-full" />
      </div>
    </div>
  );
};

export default HeroMirrorPanel;
