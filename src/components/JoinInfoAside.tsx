import { Link } from "react-router-dom";

const POINTS = [
  { title: "Privacy by default", faqHref: "/faq#privacy" },
  { title: "Not used to train AI", faqHref: "/faq#train-ai" },
  { title: "Lives in WhatsApp", faqHref: "/faq#no-app" },
  { title: "About 2 minutes", faqHref: "/faq#how-long" },
] as const;

/**
 * Cold-user trust bullets beside the join form — title-only links to FAQ.
 */
export function JoinInfoAside() {
  return (
    <aside
      aria-label="About GenMyō and privacy"
      className="h-fit lg:sticky lg:top-28 text-left"
    >
      <ul className="space-y-0">
        {POINTS.map((point, i) => (
          <li
            key={point.title}
            className={`py-4 ${i === 0 ? "pt-0" : ""} ${
              i < POINTS.length - 1 ? "border-b border-[#1C1A16]/08" : ""
            }`}
          >
            <Link
              to={point.faqHref}
              className="group flex items-center gap-3 rounded-lg -mx-2 px-2 py-1.5 transition-colors hover:bg-[#F4F0E7]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C2A053]/50"
            >
              <span
                aria-hidden
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#C2A053]"
              />
              <span className="text-sm font-semibold text-[#1C1A16] tracking-tight group-hover:text-[#B0703E] transition-colors">
                {point.title}
                <span className="ml-1.5 text-[#B0703E]/70 group-hover:text-[#B0703E]" aria-hidden>
                  →
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <footer className="mt-6 pt-5 border-t border-[#1C1A16]/10">
        <p className="text-[0.75rem] text-[#5C564C] leading-relaxed">
          GenMyō is not a crisis service.{" "}
          <Link
            to="/crisis"
            className="underline underline-offset-4 decoration-[#1C1A16]/25 hover:text-[#B0703E] hover:decoration-[#B0703E]"
          >
            What if I&apos;m in crisis?
          </Link>
        </p>
      </footer>
    </aside>
  );
}
