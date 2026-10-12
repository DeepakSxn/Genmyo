import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Check, ChevronDown } from "lucide-react";
import Layout from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { BusinessPilotForm } from "@/components/BusinessPilotForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { trackGAEvent } from "@/lib/analytics";

/* Illustrative aggregate dashboard — not a claimed result */
function CohortPreview() {
  const bars = [
    { label: "W1", v: 46 },
    { label: "W2", v: 55 },
    { label: "W3", v: 52 },
    { label: "W4", v: 68 },
    { label: "W5", v: 74 },
    { label: "W6", v: 82 },
  ];
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#141210] shadow-[0_28px_56px_-24px_rgba(0,0,0,0.55)]">
      <div className="flex gap-2 border-b border-white/10 bg-[#1C1A16] px-5 py-3.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
      </div>
      <div className="p-6 sm:p-7">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[#C2A053]">
          Cohort wellbeing · aggregate only
        </p>
        <p className="mt-2 font-serif text-2xl leading-none text-[#F6ECDD]">
          What you measure
          <span className="mt-1 block font-sans text-sm font-normal text-[#F6ECDD]/55">
            Participation, reflection rhythm, resilience signals — never names
          </span>
        </p>
        <div className="relative mt-6 h-28">
          <div className="flex h-full items-end gap-2">
            {bars.map((b, i) => (
              <div
                key={b.label}
                className="flex h-full flex-1 flex-col items-center justify-end"
              >
                <div
                  className={`w-full rounded-t-md ${
                    i === bars.length - 1 ? "bg-[#C2A053]" : "bg-[#C2A053]/35"
                  }`}
                  style={{ height: `${b.v}%` }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-2 flex gap-2">
          {bars.map((b) => (
            <span
              key={b.label}
              className="flex-1 text-center text-[0.6rem] text-[#F6ECDD]/45"
            >
              {b.label}
            </span>
          ))}
        </div>
        <p className="mt-5 border-t border-white/10 pt-4 text-[11px] italic text-[#F6ECDD]/45">
          Illustrative preview. Not a claimed pilot result.
        </p>
      </div>
    </div>
  );
}

const MIN_EMPLOYEES = 50;
const MAX_EMPLOYEES = 50000;

const EXPERIENCE_ROWS = [
  {
    label: "Employees with a common mental health condition*",
    rate: 0.425,
    bar: "#B0703E",
    on: "#FBF7F1",
  },
  {
    label: "Employees suffering in silence*",
    rate: 0.3825,
    bar: "#C2A053",
    on: "#1C1A16",
  },
  {
    label: "Employees not showing any signs of distress*",
    rate: 0.255,
    bar: "#5C7A62",
    on: "#F6ECDD",
  },
] as const;

function EmployeeExperience() {
  const [employees, setEmployees] = useState(MIN_EMPLOYEES);
  const progress =
    (employees - MIN_EMPLOYEES) / (MAX_EMPLOYEES - MIN_EMPLOYEES);
  const fullest = Math.max(
    ...EXPERIENCE_ROWS.map((row) => Math.round(MAX_EMPLOYEES * row.rate)),
  );

  return (
    <div className="rounded-[2rem] border border-[#1C1A16]/10 bg-white px-6 py-10 shadow-[0_24px_60px_-28px_rgba(28,26,22,0.28)] sm:px-10 md:px-14 md:py-12">
      <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground md:text-4xl">
        What Employees Experience
      </h2>
      <div className="mt-10 grid items-center gap-10 lg:grid-cols-[minmax(14rem,0.7fr)_minmax(0,1.45fr)] lg:gap-16">
        <div>
          <label
            htmlFor="employee-count"
            className="block text-sm font-medium text-muted-foreground md:text-base"
          >
            Number of Employees
          </label>
          <p className="mt-2 font-serif text-5xl font-medium tabular-nums leading-none tracking-tight text-[#B0703E] md:text-6xl">
            {employees}
          </p>
          <div className="relative mt-8 h-6">
            <div className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-[#E8E2D9]">
              <div
                className="h-full rounded-full bg-[#C2A053]"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute top-1/2 h-[18px] w-[18px] -translate-y-1/2 rounded-full bg-[#1C1A16] shadow-[0_0_0_6px_#F6ECDD]"
              style={{
                left: `clamp(0px, calc(${progress * 100}% - 9px), calc(100% - 18px))`,
              }}
            />
            <input
              id="employee-count"
              type="range"
              min={MIN_EMPLOYEES}
              max={MAX_EMPLOYEES}
              step={1}
              value={employees}
              aria-valuemin={MIN_EMPLOYEES}
              aria-valuemax={MAX_EMPLOYEES}
              aria-valuenow={employees}
              aria-valuetext={`${employees} employees`}
              onChange={(e) => setEmployees(Number(e.target.value))}
              className="absolute inset-0 z-10 w-full cursor-pointer opacity-0"
            />
          </div>
        </div>
        <ul className="space-y-5">
          {EXPERIENCE_ROWS.map((row) => {
            const n = Math.round(employees * row.rate);
            return (
              <li key={row.label}>
                <p className="text-sm font-medium text-foreground md:text-[15px]">
                  {row.label}
                </p>
                <div className="mt-2 h-9 rounded-full bg-[#F6ECDD]">
                  <div
                    className="flex h-full max-w-full items-center justify-center rounded-full px-2 text-sm font-semibold tabular-nums"
                    style={{
                      width: `${(n / fullest) * 100}%`,
                      minWidth: "2.25rem",
                      backgroundColor: row.bar,
                      color: row.on,
                    }}
                  >
                    {n}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <p className="mt-8 text-[11px] text-[#847362]">
        *Sources: ASSOCHAM 2015, Lancet Psychiatry 2019, Apollo 2012
      </p>
    </div>
  );
}

const EMPLOYER_SOLUTIONS = [
  "Cohort wellbeing view",
  "WhatsApp. No app to install",
  "About two minutes, at their pace",
  "Anonymous trends, never a transcript",
  "Optional Guides and Mentors",
  "Companies, startups, and collectives",
  "A pilot for 50–200 people",
] as const;

const SOLUTION_TONES = ["#C2A053", "#B0703E", "#5C7A62", "#C2A053", "#B0703E", "#5C7A62", "#C2A053"];

function EmployerShowcase() {
  const weeks = [42, 55, 48, 70, 78, 86];
  const signals = [
    { label: "Participation", v: 74 },
    { label: "Cadence", v: 68 },
    { label: "Resilience", v: 61 },
  ];

  return (
    <div className="rounded-[2rem] border border-[#1C1A16]/10 bg-white p-4 shadow-[0_24px_60px_-28px_rgba(28,26,22,0.35)] sm:p-6 lg:p-8">
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(16rem,0.72fr)] lg:gap-10">
        <div className="mx-auto w-full max-w-xl lg:max-w-none">
          <div className="rounded-[1.35rem] bg-[#1C1A16] p-2.5 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.55)] sm:p-3">
            <div className="overflow-hidden rounded-[0.9rem] bg-[#F7F3EC]">
              <div className="flex items-center justify-between border-b border-[#1C1A16]/10 px-3 py-2">
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#847362]">
                  Cohort view · aggregate only
                </span>
                <span className="text-[10px] text-[#847362]">Illustrative</span>
              </div>
              <div className="grid gap-2 p-2.5 sm:grid-cols-3 sm:p-3">
                <div className="rounded-xl bg-white p-3 shadow-[0_1px_0_rgba(28,26,22,0.04)]">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#B0703E]">
                    Rhythm
                  </p>
                  <div className="mt-3 flex h-28 items-end gap-1.5">
                    {weeks.map((v, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm bg-[#C2A053]"
                        style={{ height: `${v}%`, opacity: 0.55 + i * 0.07 }}
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-[10px] text-[#847362]">Six weeks · no names</p>
                </div>
                <div className="rounded-xl bg-white p-3 shadow-[0_1px_0_rgba(28,26,22,0.04)]">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#B0703E]">
                    Signals
                  </p>
                  <ul className="mt-3 space-y-2">
                    {signals.map((s) => (
                      <li key={s.label}>
                        <div className="flex justify-between text-[10px] text-[#3D3932]">
                          <span>{s.label}</span>
                          <span>{s.v}</span>
                        </div>
                        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[#E8E2D9]">
                          <div
                            className="h-full rounded-full bg-[#5C7A62]"
                            style={{ width: `${s.v}%` }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl bg-white p-3 shadow-[0_1px_0_rgba(28,26,22,0.04)]">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#B0703E]">
                    This period
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div className="rounded-lg bg-[#F6ECDD] px-2 py-3">
                      <p className="font-serif text-2xl leading-none text-[#1C1A16]">2 min</p>
                      <p className="mt-1.5 text-[10px] leading-snug text-[#847362]">Typical reply</p>
                    </div>
                    <div className="rounded-lg bg-[#E4EFE6] px-2 py-3">
                      <p className="font-serif text-2xl leading-none text-[#1C1A16]">50+</p>
                      <p className="mt-1.5 text-[10px] leading-snug text-[#847362]">Before a report</p>
                    </div>
                  </div>
                  <p className="mt-2 text-[10px] leading-snug text-[#847362]">
                    Themes stay with the group. Never a person.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto h-2.5 w-[92%] rounded-b-xl bg-[#2A2622]" />
          <div className="mx-auto h-1.5 w-24 rounded-b-md bg-[#3A342C]" />
        </div>

        <div className="rounded-3xl bg-[#F7F4EE] p-5 sm:p-6">
          <h3 className="font-serif text-2xl text-[#1C1A16]">For employers</h3>
          <ul className="mt-4 space-y-2.5">
            {EMPLOYER_SOLUTIONS.map((item, i) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-[#1C1A16]">
                <span
                  className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-white"
                  style={{ backgroundColor: SOLUTION_TONES[i] }}
                >
                  <Check size={10} strokeWidth={3} aria-hidden />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap gap-2">
            {["Aggregate only", "Chats stay private", "A reflection practice"].map((mark) => (
              <span
                key={mark}
                className="rounded-full border border-[#1C1A16]/10 bg-white px-2.5 py-1 text-[11px] font-medium text-[#5C564C]"
              >
                {mark}
              </span>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-4 text-center text-[11px] italic text-[#847362]">
        Illustrative preview. Not a claimed pilot result.
      </p>
    </div>
  );
}

const STEPS = [
  {
    title: "Share a link or QR",
    body: "One WhatsApp path for a company, a startup, or a collective. No app install, no SSO for day one.",
  },
  {
    title: "People reflect privately",
    body: "About two minutes on WhatsApp. Guided questions, at their pace. The chat stays theirs.",
  },
  {
    title: "You see the group, not the person",
    body: "Anonymous cohort signals only. No individual transcripts, whether the group is a company or a collective.",
  },
  {
    title: "Optional human mentors",
    body: "When someone wants a person, matched Guides and Mentors can step in.",
  },
] as const;

const SEE = [
  "Anonymous participation and reflection rhythm",
  "Cohort-level wellbeing and resilience trends",
  "Aggregate themes (never attributable to a person)",
  "Reporting only above a minimum cohort size",
] as const;

const NEVER = [
  "Individual names tied to answers",
  "Full reflection transcripts for managers",
  "Surveillance of chat content by HR",
  "Training foundation models on your people’s reflections",
] as const;

const AUDIENCES = [
  {
    title: "Companies",
    body: "HR and people teams, including distributed and frontline work. A quiet channel in WhatsApp. You see the cohort, never a private chat.",
  },
  {
    title: "Startups",
    body: "No app to roll out and no heavy EAP. A link, about two minutes, and aggregate signals.",
  },
  {
    title: "Collectives",
    body: "A community, a cohort, or a group that is not a company. Same private reflection. Same anonymous picture of the group.",
  },
  {
    title: "Consultancies, brokers, EAP providers",
    body: (
      <>
        Layer GenMyō beside existing care.{" "}
        <Link to="/partners" className="underline underline-offset-2 hover:text-[#B0703E]">
          Partner with us
        </Link>
        .
      </>
    ),
  },
] as const;

const COMPARE = [
  {
    axis: "Install friction",
    genmyo: "WhatsApp only",
    app: "New app + login",
    eap: "Hotline / portal",
    pulse: "Survey link",
  },
  {
    axis: "What employees do",
    genmyo: "Private guided reflection",
    app: "Tracks, feeds, content",
    eap: "Call when in crisis",
    pulse: "Periodic form",
  },
  {
    axis: "What employer sees",
    genmyo: "Anonymous aggregates",
    app: "Often individual dashboards",
    eap: "Utilisation stats",
    pulse: "Survey scores",
  },
  {
    axis: "Human escalation",
    genmyo: "Optional mentors",
    app: "Varies",
    eap: "Clinical pathway",
    pulse: "Rarely",
  },
  {
    axis: "What it is not",
    genmyo: "Not therapy, not surveillance",
    app: "Often wellness content",
    eap: "Clinical care",
    pulse: "Not support",
  },
] as const;

const FAQS = [
  {
    q: "Can HR see individual responses?",
    a: "No. Employers receive anonymous, aggregate trends only, and only above a minimum cohort size. Individual transcripts are not available to managers.",
  },
  {
    q: "What does a pilot cost?",
    a: "Pilots are scoped for roughly 50–200 people over about six weeks, free or low-cost, with a pre-agreed measure. Pricing for ongoing rollouts depends on headcount and mentor layer — we share ranges on the pilot call so booking is not a black box.",
  },
  {
    q: "How do we roll it out?",
    a: "Usually a WhatsApp link or QR in your existing channels, a short manager brief, and optional office-hours with us. No app store campaign required.",
  },
  {
    q: "What about crisis disclosures?",
    a: "GenMyō is not a crisis service. When language suggests acute distress, we surface helpline resources and do not route that person into a normal Mirror engagement. See our crisis page for regional lines.",
  },
  {
    q: "Which countries and languages?",
    a: "WhatsApp delivery works wherever WhatsApp does. The product experience is English-first today; additional languages are on the roadmap — ask on the pilot call for your markets.",
  },
  {
    q: "Does it replace our EAP?",
    a: "No. GenMyō is preventive reflection and optional mentorship. Keep your EAP or clinical partners for therapy and crisis care; we sit beside them, not instead of them.",
  },
  {
    q: "Is this surveillance?",
    a: "No. We design for privacy by default: aggregate employer views, no individual chat for HR, and reflections are not used to train foundation models.",
  },
  {
    q: "How is this different from a wellbeing app?",
    a: "No new install. Story-based reflection rather than mood streaks. Employers see cohorts, not people. Optional human mentors when someone wants a person.",
  },
] as const;

function BuyerDetail({
  id,
  title,
  teaser,
  children,
  wide,
  onOpen,
}: {
  id?: string;
  title: string;
  teaser: string;
  children: ReactNode;
  wide?: boolean;
  onOpen?: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const value = id ?? title;
  const panelId = `buyer-${value.replace(/\s+/g, "-").toLowerCase()}`;

  useEffect(() => {
    if (!id) return;
    const openFromHash = () => {
      if (window.location.hash.replace("#", "") === id) setIsOpen(true);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [id]);

  const toggle = () => {
    setIsOpen((open) => {
      const next = !open;
      if (next) onOpen?.();
      return next;
    });
  };

  return (
    <div id={id} className="scroll-mt-24 border-b border-[#1C1A16]/10">
      <h2 className="font-serif text-2xl font-medium leading-snug md:text-3xl">
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={toggle}
          className={`group flex w-full items-start justify-between gap-6 rounded-xl px-3 py-6 text-left outline-none transition-colors duration-200 hover:bg-[#F6ECDD] focus-visible:ring-2 focus-visible:ring-[#C2A053]/50 ${
            isOpen ? "bg-[#F6ECDD]/80" : ""
          }`}
        >
          <span>
            <span className="block text-foreground">{title}</span>
            <span className="mt-1.5 block font-sans text-sm font-normal leading-relaxed text-muted-foreground">
              {teaser}
            </span>
          </span>
          <span
            aria-hidden
            className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${
              isOpen
                ? "border-[#B0703E]/40 bg-[#B0703E]/10 text-[#B0703E]"
                : "border-[#1C1A16]/10 text-[#B0703E] group-hover:border-[#B0703E]/40 group-hover:bg-white"
            }`}
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-300 ease-out motion-reduce:transition-none ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </span>
        </button>
      </h2>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div
            id={panelId}
            role="region"
            aria-label={title}
            inert={isOpen ? undefined : true}
            className={wide ? "px-3 pb-8" : "max-w-3xl px-3 pb-8"}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

const ForBusiness = () => {
  const trustSeen = useRef(false);
  const [sticky, setSticky] = useState(false);
  const [pilotVisible, setPilotVisible] = useState(false);

  useEffect(() => {
    trackGAEvent("business_page_view", { page_path: "/for-business" });
  }, []);

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 520);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = document.getElementById("pilot");
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setPilotVisible(entry.isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const onTrustOpen = () => {
    if (trustSeen.current) return;
    trustSeen.current = true;
    trackGAEvent("business_trust_table_view", {
      page_path: "/for-business",
    });
  };

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://genmyo.ai/for-business#webpage",
        url: "https://genmyo.ai/for-business",
        name: "Employee Wellbeing on WhatsApp | GenMyo for Business",
        description:
          "Anonymous, aggregate wellbeing for your team, delivered on WhatsApp. No app to install. Not therapy, not surveillance.",
        isPartOf: { "@id": "https://genmyo.ai/#website" },
        about: { "@id": "https://genmyo.ai/#organization" },
        dateModified: "2026-10-08",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://genmyo.ai/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "For business",
            item: "https://genmyo.ai/for-business",
          },
        ],
      },
      {
        "@type": "Service",
        "@id": "https://genmyo.ai/for-business#service",
        name: "GenMyo for Business",
        provider: { "@id": "https://genmyo.ai/#organization" },
        serviceType: "Employee wellbeing — WhatsApp guided reflection",
        description:
          "GenMyo for Business is an AI-guided reflection program delivered on WhatsApp. Employees reflect privately in about two minutes a day; employers see only anonymous, aggregate wellbeing trends.",
        areaServed: "Worldwide",
        url: "https://genmyo.ai/for-business",
      },
      {
        "@type": "FAQPage",
        "@id": "https://genmyo.ai/for-business#faq",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <Layout showFAQ={false}>
      <SEO
        title="Employee Wellbeing on WhatsApp · For Business"
        description="Anonymous, aggregate wellbeing for your team, delivered on WhatsApp. No app to install. Not therapy, not surveillance. Book a GenMyo pilot."
        canonical="/for-business"
        jsonSchema={schema}
      />

      {/* Hero */}
      <section className="relative -mt-20 overflow-hidden bg-hero-dark pb-16 pt-28 text-primary-foreground md:pb-24 md:pt-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(55% 50% at 75% 35%, hsl(var(--gold) / 0.14), transparent 70%)",
          }}
        />
        <div className="relative container-wide px-6 md:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <h1 className="max-w-xl font-serif text-4xl font-medium leading-[1.15] md:text-5xl lg:text-[3.25rem]">
                Employee wellbeing your people actually use, on WhatsApp.
              </h1>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-primary-foreground/75 md:text-lg">
                Private reflection in the app they already open. You see
                anonymous cohort trends — never individual chats.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href="#pilot-form"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[#C2A053] px-7 text-[15px] font-semibold text-[#1C1A16] transition-opacity hover:opacity-90"
                >
                  Book a pilot call
                </a>
                <Link
                  to="/join"
                  data-cta-location="for_business"
                  onClick={() =>
                    trackGAEvent("business_mirror_demo_click", {
                      page_path: "/for-business",
                    })
                  }
                  className="inline-flex h-12 items-center justify-center rounded-full border border-primary-foreground/25 px-7 text-[15px] font-semibold text-primary-foreground transition-colors hover:border-primary-foreground/50"
                >
                  Try the Mirror yourself (2 min)
                </Link>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs text-primary-foreground/55 sm:text-[13px]">
                {[
                  "No app to install",
                  "Aggregate-only reporting",
                  "Not therapy",
                  "Not surveillance",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <span
                      aria-hidden
                      className="h-1 w-1 rounded-full bg-[#C2A053]"
                    />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-6">
              <CohortPreview />
            </div>
          </div>
        </div>
      </section>

      {/* GEO answer block */}
      <section className="border-b border-[#1C1A16]/08 bg-[#F9F7F2] py-10 md:py-12">
        <div className="container-narrow px-6 md:px-12">
          <p className="mx-auto max-w-2xl text-center text-base leading-relaxed text-[#3D3932] md:text-lg">
            <strong className="font-semibold text-[#1C1A16]">
              GenMyō for Business
            </strong>{" "}
            is an AI-guided reflection program delivered on WhatsApp. Employees
            reflect privately in about two minutes a day; employers see only
            anonymous, aggregate wellbeing trends.
          </p>
          <p className="mt-3 text-center text-[11px] text-[#847362]">
            Last updated 8 October 2026
          </p>
        </div>
      </section>

      {/* Problem */}
      <section className="section-padding bg-background">
        <div className="container-wide px-6 md:px-12">
          <h2 className="heading-section max-w-3xl text-foreground">
            Wellbeing programs fail on engagement, not on content
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Another app to download, another portal to forget. Frontline and
            distributed teams never open it. GenMyō meets people in WhatsApp —
            where work already happens — with short guided reflection instead of
            feeds and streaks.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Engagement drop-off on traditional wellbeing apps is widely reported
            across industry studies.{" "}
            <span className="italic text-[#847362]">
              [needs source — replace with a cited stat before publishing claims]
            </span>
          </p>
          <div className="mt-12">
            <EmployeeExperience />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding bg-cream">
        <div className="container-wide px-6 md:px-12">
          <h2 className="heading-section max-w-2xl text-foreground">
            How it works
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            The same four steps for a company, a startup, or a collective. Big
            enough for a workforce. Light enough for a group that is not a company.
          </p>
          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.title} className="relative">
                <span className="font-serif text-3xl text-[#C2A053]/80">
                  {i + 1}
                </span>
                <h3 className="mt-2 font-serif text-xl font-medium text-foreground">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-padding bg-[#F9F7F2]" aria-label="What employers see">
        <div className="container-wide px-6 md:px-12">
          <h2 className="heading-section max-w-2xl text-foreground">
            What employers see
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            A view of the group. Participation, rhythm, and resilience — never a
            name, a transcript, or a private chat.
          </p>
          <div className="mt-10">
            <EmployerShowcase />
          </div>
        </div>
      </section>

      {/* Latter half — closed until a buyer opens it */}
      <section className="section-padding bg-background" aria-label="For HR and buyers">
        <div className="container-wide px-6 md:px-12">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            For HR
          </p>
          <p className="mt-3 max-w-xl text-muted-foreground">
            The questions buyers ask before a pilot. Open the ones you need.
          </p>

          <div className="mt-8 border-t border-[#1C1A16]/10">
            <BuyerDetail
              id="trust"
              title="What does HR actually see?"
              teaser="Aggregate signals only. Never a person’s private chat."
              onOpen={onTrustOpen}
            >
              <div className="grid gap-10 md:grid-cols-2">
                <div>
                  <h3 className="font-serif text-xl text-foreground">What you see</h3>
                  <ul className="mt-4 space-y-3">
                    {SEE.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-sm leading-relaxed text-[#3D3932]"
                      >
                        <span
                          aria-hidden
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C2A053]"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-serif text-xl text-foreground">
                    What you never see
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {NEVER.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-sm leading-relaxed text-[#3D3932]"
                      >
                        <span
                          aria-hidden
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1C1A16]/25"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
                Retention and processor roles (including Meta/WhatsApp) are spelled
                out in the trust pack and on our{" "}
                <Link
                  to="/privacy"
                  className="underline underline-offset-2 hover:text-[#B0703E]"
                >
                  privacy page
                </Link>
                . Minimum cohort size for reporting is confirmed on the pilot call.
              </p>
              <a
                href="#pilot-form"
                onClick={() =>
                  trackGAEvent("business_trust_pack_cta", {
                    page_path: "/for-business",
                  })
                }
                className="mt-6 inline-flex text-sm font-semibold text-[#B0703E] underline underline-offset-4 hover:text-[#1C1A16]"
              >
                Get the trust and privacy pack →
              </a>
            </BuyerDetail>

            <BuyerDetail
              title="What we measure (and what we will not invent)"
              teaser="Participation and cohort signals. No invented results."
            >
              <p className="text-base leading-relaxed text-muted-foreground">
                Pilots agree measures up front: participation, reflection cadence,
                and cohort resilience signals. We will publish named results when
                real pilot data exists. Until then, treat dashboard visuals as
                illustrative — not proof.
              </p>
            </BuyerDetail>

            <BuyerDetail
              title="Proof and story"
              teaser="The research, and why we built this."
            >
              <p className="text-base leading-relaxed text-muted-foreground">
                Read the research behind our approach, and the founder’s reason for
                building quiet reflection instead of another noisy wellness feed.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  to="/100-conversations"
                  className="inline-flex text-sm font-semibold text-[#B0703E] underline underline-offset-4 hover:text-[#1C1A16]"
                >
                  100 Conversations report →
                </Link>
                <Link
                  to="/founders-story"
                  className="inline-flex text-sm font-semibold text-[#B0703E] underline underline-offset-4 hover:text-[#1C1A16]"
                >
                  Founder’s story →
                </Link>
                <Link
                  to="/how-it-works"
                  className="inline-flex text-sm font-semibold text-[#B0703E] underline underline-offset-4 hover:text-[#1C1A16]"
                >
                  How The Mirror works →
                </Link>
              </div>
              <p className="mt-6 text-sm italic text-[#847362]">
                Named pilot quotes and logos will land here as partners allow.
              </p>
            </BuyerDetail>
          </div>
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="container-wide px-6 md:px-12">
          <h2 className="heading-section max-w-2xl text-foreground">
            How is this different from an EAP?
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Beside a wellbeing app, a traditional EAP, and a pulse survey.
            Category comparison, not named competitors.
          </p>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#1C1A16]/15">
                  <th className="py-3 pr-4 font-semibold text-foreground">
                    Axis
                  </th>
                  <th className="py-3 pr-4 font-semibold text-[#B0703E]">
                    GenMyō
                  </th>
                  <th className="py-3 pr-4 font-medium text-muted-foreground">
                    Wellbeing app
                  </th>
                  <th className="py-3 pr-4 font-medium text-muted-foreground">
                    Traditional EAP
                  </th>
                  <th className="py-3 font-medium text-muted-foreground">
                    Pulse survey
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row) => (
                  <tr
                    key={row.axis}
                    className="border-b border-[#1C1A16]/08 align-top"
                  >
                    <td className="py-3.5 pr-4 font-medium text-foreground">
                      {row.axis}
                    </td>
                    <td className="py-3.5 pr-4 text-[#3D3932]">{row.genmyo}</td>
                    <td className="py-3.5 pr-4 text-muted-foreground">
                      {row.app}
                    </td>
                    <td className="py-3.5 pr-4 text-muted-foreground">
                      {row.eap}
                    </td>
                    <td className="py-3.5 text-muted-foreground">{row.pulse}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-wide px-6 md:px-12">
          <h2 className="heading-section text-foreground">Who it is for</h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Companies, startups, and collectives.
          </p>
          <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {AUDIENCES.map((a) => (
              <div key={a.title} className="border-t border-[#1C1A16]/10 pt-5">
                <h3 className="font-serif text-xl text-foreground">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {a.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#F9F7F2]">
        <div className="container-narrow px-6 md:px-12">
          <h2 className="heading-section text-foreground">
            Safety and scope boundary
          </h2>
          <p className="mt-4 text-sm font-medium text-[#B0703E]">
            Not therapy. Not a crisis service.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            GenMyō is not therapy, not a diagnostic tool, and not a crisis
            monitoring service. Crisis language routes people to helplines
            rather than a normal Mirror session. Keep your EAP and emergency
            pathways for clinical care.
          </p>
          <Link
            to="/crisis"
            className="mt-5 inline-flex text-sm font-semibold text-[#B0703E] underline underline-offset-4 hover:text-[#1C1A16]"
          >
            Crisis helplines and guidance →
          </Link>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-narrow px-6 md:px-12">
          <h2 className="heading-section text-foreground">
            Security and compliance
          </h2>
          <p className="mt-4 text-sm font-medium text-[#B0703E]">
            What we process, and what we do not claim.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Data processing roles (including Meta/WhatsApp as a messaging
            channel), GDPR and India’s DPDP Act considerations, retention, and
            what we do not claim as certifications are covered in the trust pack
            and{" "}
            <Link
              to="/privacy"
              className="underline underline-offset-2 hover:text-[#B0703E]"
            >
              privacy policy
            </Link>
            . We do not claim certifications we do not hold.
          </p>
        </div>
      </section>

      {/* Pilot offer + form */}
      <section
        id="pilot"
        className="section-padding scroll-mt-24 bg-primary text-primary-foreground"
      >
        <div className="container-wide px-6 md:px-12">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="font-serif text-3xl font-medium leading-tight md:text-4xl">
                A 6-week pilot for 50–200 people
              </h2>
              <p className="mt-5 text-base leading-relaxed text-primary-foreground/75">
                Free or low-cost. Pre-agreed measure. Deploy via WhatsApp link or
                QR. We review aggregate signals together at the end — no
                individual data, no black-box pricing conversation.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-primary-foreground/70">
                <li>Pilot call: scope, markets, success measure</li>
                <li>Rollout: link/QR + short manager brief</li>
                <li>Close: aggregate read-out and next-step options</li>
              </ul>
            </div>
            <div className="rounded-3xl bg-[#F6ECDD] p-6 text-foreground sm:p-8">
              <h3 className="font-serif text-2xl text-[#1C1A16]">
                Book a pilot call
              </h3>
              <p className="mt-2 text-sm text-[#5C564C]">
                Three short steps. We reply with times — calendar embed lands
                here once confirmed.
              </p>
              <div className="mt-6">
                <BusinessPilotForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-background">
        <div className="container-narrow px-6 md:px-12">
          <h2 className="heading-section text-foreground">
            Questions buyers ask
          </h2>
          <Accordion type="single" collapsible className="mt-8">
            {FAQS.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="text-left font-serif text-lg text-foreground hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Mobile sticky CTA */}
      {sticky && !pilotVisible && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#1C1A16]/10 bg-[#F6ECDD]/95 px-4 py-3 backdrop-blur-md md:hidden">
          <a
            href="#pilot-form"
            className="flex h-11 w-full items-center justify-center rounded-full bg-[#C2A053] text-sm font-semibold text-[#1C1A16]"
          >
            Book a pilot call
          </a>
        </div>
      )}
    </Layout>
  );
};

export default ForBusiness;
