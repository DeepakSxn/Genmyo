import { useEffect, useState } from "react";
import HeroMirrorCard from "@/components/HeroMirrorCard";
import HeroPhoneShell from "@/components/HeroPhoneShell";
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
    <div className="relative h-full w-full">
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-1000 ease-out",
          showCard ? "pointer-events-none opacity-0" : "opacity-100"
        )}
        aria-hidden={showCard}
      >
        <HeroPhoneShell className="h-full w-full">
          <iframe
            src="/mirror-demo.html?embed=1"
            title="The Mirror — conversation preview"
            className="absolute inset-0 block h-full w-full border-0 bg-transparent"
            onLoad={() => setDemoReady(true)}
            scrolling="no"
          />

          {!demoReady && (
            <div className="absolute inset-0 bg-[#F2EBE3]" aria-hidden />
          )}
        </HeroPhoneShell>
      </div>

      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-1000 ease-out",
          showCard ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        aria-hidden={!showCard}
      >
        <HeroMirrorCard className="hero-mirror-card-final h-full w-full rounded-none" />
      </div>
    </div>
  );
};

export default HeroMirrorPanel;
