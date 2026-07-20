import { useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { trackCTAView, trackCTAClickWhatsApp } from "@/lib/analytics";

import {
  ArrowRight,
  MessageCircle,
  Star,
} from "lucide-react";

import WalkthroughDialog from "@/components/WalkthroughDialog";
import genmyoOrb from "@/assets/genmyo-orb-gold.png";

/* ── Mirror Portrait card (outcome, IP-safe) ── */
const PortraitCard = () => {
  const C = 2 * Math.PI * 40;
  const offset = C * (1 - 0.42);
  const dims = [
    { name: "Clarity", value: 58, delta: "+6" },
    { name: "Belonging", value: 44, delta: "+3" },
    { name: "Purpose", value: 61, delta: "+8" },
  ];
  return (
    <div className="bg-card rounded-3xl overflow-hidden border border-border shadow-[var(--shadow-elevated)]">
      <div className="flex gap-2 px-5 py-4 border-b border-border bg-secondary">
        <span className="w-2.5 h-2.5 rounded-full bg-border" />
        <span className="w-2.5 h-2.5 rounded-full bg-border" />
        <span className="w-2.5 h-2.5 rounded-full bg-border" />
      </div>
      <div className="p-7">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-[0.65rem] tracking-[0.14em] uppercase text-primary font-bold">
              Mirror Portrait
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">Day 7 · Snapshot</p>
          </div>
          <span className="text-[0.65rem] font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary">
            ▲ Steady
          </span>
        </div>

        <div className="grid grid-cols-[auto_1fr] gap-6 items-center">
          <div className="relative w-32 h-32">
            <div
              className="absolute inset-2 rounded-full"
              style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.18), transparent 70%)" }}
            />
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--sand))" strokeWidth="7" />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="url(#ring-grad)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={C}
                strokeDashoffset={offset}
                className="[transition:stroke-dashoffset_1.2s_ease]"
              />
              <defs>
                <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="hsl(var(--warm-brown))" />
                  <stop offset="1" stopColor="hsl(var(--primary))" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 grid place-content-center text-center">
              <div className="font-serif text-4xl leading-none text-foreground">42</div>
              <div className="text-[0.55rem] tracking-[0.14em] uppercase text-primary font-bold mt-1.5">
                Resilience
              </div>
            </div>
          </div>

          <div className="space-y-3.5">
            {dims.map((d) => (
              <div key={d.name}>
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-xs text-muted-foreground">{d.name}</span>
                  <span className="text-xs font-semibold text-foreground">
                    {d.value}
                    <span className="text-primary font-medium ml-1.5">▲ {d.delta}</span>
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-sand overflow-hidden">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${d.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-border flex items-center justify-between">
          <div>
            <p className="text-[0.6rem] tracking-[0.12em] uppercase text-muted-foreground">
              Growth from baseline
            </p>
            <p className="font-serif text-2xl text-foreground leading-none mt-1">+14%</p>
          </div>
          <p className="text-xs text-muted-foreground italic max-w-[52%] text-right leading-snug">
            "Recovery after stress is stabilising."
          </p>
        </div>
      </div>
    </div>
  );
};

/* ── Cohort wellbeing card (teams, aggregate-only) ── */
const TeamViz = () => {
  const bars = [
    { label: "W1", v: 46 },
    { label: "W2", v: 55 },
    { label: "W3", v: 52 },
    { label: "W4", v: 68 },
    { label: "W5", v: 74 },
    { label: "W6", v: 82 },
  ];
  const benchmark = 60;
  const kpis = [
    { label: "Reflecting", value: "78%", delta: "+5" },
    { label: "Avg resilience", value: "64", delta: "+9" },
    { label: "Participation", value: "84%", delta: "+7" },
  ];
  return (
    <div className="bg-card rounded-3xl overflow-hidden border border-border shadow-[var(--shadow-elevated)]">
      <div className="flex gap-2 px-5 py-4 border-b border-border bg-secondary">
        <span className="w-2.5 h-2.5 rounded-full bg-border" />
        <span className="w-2.5 h-2.5 rounded-full bg-border" />
        <span className="w-2.5 h-2.5 rounded-full bg-border" />
      </div>
      <div className="p-7">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="text-[0.65rem] tracking-[0.14em] uppercase text-primary font-bold">
              Cohort wellbeing · aggregate
            </p>
            <p className="font-serif text-2xl text-foreground leading-none mt-2">
              +18% <span className="text-base text-muted-foreground font-sans">wellbeing in 6 weeks</span>
            </p>
          </div>
        </div>

        <div className="relative h-32 mb-2">
          <div
            className="absolute left-0 right-0 border-t border-dashed border-primary/40"
            style={{ bottom: `${benchmark}%` }}
          >
            <span className="absolute -top-4 right-0 text-[0.55rem] text-primary/70 font-medium">
              Benchmark
            </span>
          </div>
          <div className="flex items-end gap-2 h-full">
            {bars.map((b, i) => (
              <div key={b.label} className="flex-1 flex flex-col items-center justify-end h-full">
                <div
                  className={`w-full rounded-t-md ${i === bars.length - 1 ? "bg-primary" : "bg-primary/35"}`}
                  style={{ height: `${b.v}%` }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-2 mb-6">
          {bars.map((b) => (
            <span key={b.label} className="flex-1 text-center text-[0.6rem] text-muted-foreground">
              {b.label}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3 pt-5 border-t border-border">
          {kpis.map((k) => (
            <div key={k.label}>
              <p className="text-[0.55rem] tracking-[0.1em] uppercase text-muted-foreground mb-1">
                {k.label}
              </p>
              <div className="flex items-baseline gap-1">
                <span className="font-serif text-xl text-foreground leading-none">{k.value}</span>
                <span className="text-[0.6rem] font-semibold text-primary">▲ {k.delta}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  useEffect(() => {
    trackCTAView("homepage", "/");
  }, []);

  const howItWorks = [
    ["First", "Say hello on WhatsApp", "A short reflection to begin. No download, no form."],
    ["Daily", "Receive your prompt", "Two minutes. A question, a small practice, tuned to you."],
    ["Over time", "Watch clarity build", "Your reflections form a picture only you can see."],
    ["When ready", "Talk to a real guide", "A matched mentor, already briefed. Optional, always."],
  ];

  const homepageSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "GenMyo",
      "url": "https://genmyo.ai",
      "logo": "https://genmyo.ai/favicon.png",
      "description": "GenMyo is an inner wellness platform delivered entirely through WhatsApp. Its core experience, The Mirror Project by GenMyo, is a guided reflection — a few honest questions, asked slowly, that help you reconnect with yourself and see what's actually going on. Not therapy. Not another app. No advice."
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "GenMyo",
      "url": "https://genmyo.ai"
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "The Mirror Project by GenMyo",
      "provider": {
        "@type": "Organization",
        "name": "GenMyo"
      },
      "description": "GenMyo is an inner wellness platform delivered entirely through WhatsApp. Its core experience, The Mirror Project by GenMyo, is a guided reflection — a few honest questions, asked slowly, that help you reconnect with yourself and see what's actually going on. Not therapy. Not another app. No advice.",
      "serviceType": "inner wellness / guided reflection",
      "areaServed": "Worldwide"
    }
  ];

  return (
    <Layout>
      <SEO
        title="AI Guided Reflection on WhatsApp — The Mirror Project by GenMyo"
        description="Feeling stuck or overwhelmed? The Mirror Project is a free 6-minute guided reflection that runs entirely inside WhatsApp. No app, no feed, no advice. Just one honest question at a time."
        jsonSchema={homepageSchema}
      />
      {/* Hero — series.so style, black / gold, with the Mirror animation */}
      <section className="relative overflow-hidden -mt-20 text-primary-foreground min-h-screen flex items-center bg-hero-dark">
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(60% 60% at 70% 40%, hsl(var(--gold) / 0.12), transparent 70%)" }}
        />

        {/* Content */}
        <div className="relative w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-32 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col items-center text-center">
              <img
                src={genmyoOrb}
                alt="GenMyo"
                width={64}
                height={64}
                className="mb-6 w-16 h-16 animate-fade-up"
              />

              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium animate-fade-up delay-100 leading-[1.15] text-center max-w-3xl">
                <span className="text-primary-foreground">Wellness apps read</span><br />
                <span className="text-primary-foreground">your </span><span className="text-primary-foreground/35">mood.</span><br />
                <span className="text-gold italic">We read your story.</span>
              </h1>


              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up delay-300">
                <Link
                  to="/join"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium bg-gold text-gold-foreground rounded-full hover:opacity-90 transition-opacity"
                >
                  <MessageCircle size={18} />
                  Start your reflection on WhatsApp →
                </Link>
                <Link
                  to="/philosophy"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium border border-primary-foreground/40 text-primary-foreground rounded-full hover:bg-primary-foreground/10 transition-colors"
                >
                  Learn more
                </Link>
              </div>

              <div className="mt-4 text-xs text-primary-foreground/60 text-center animate-fade-up delay-350 flex items-center justify-center gap-1.5 flex-wrap">
                <span>Free &middot; No app, no account</span>
                <span>&middot;</span>
                <span className="inline-flex items-center gap-0.5">Your reflections are private.{" "}
                  <Link to="/privacy" className="inline-flex items-center gap-0.5 hover:text-gold transition-colors">
                    <ArrowRight size={11} />
                  </Link>
                </span>
              </div>

              <div className="mt-8 text-xs text-primary-foreground/60 flex flex-wrap justify-center gap-x-4 gap-y-2 animate-fade-up delay-400">
                <span>150+ guided reflections completed</span>
                <span>•</span>
                <span>Runs inside WhatsApp — nothing to install</span>
                <span>•</span>
                <Link to="/privacy" className="underline hover:text-gold transition-colors">Private by default</Link>
              </div>
            </div>

            {/* Mirror phone animation */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end animate-fade-up delay-200">
              <iframe
                src="/mirror-demo.html?v=4"
                title="The Mirror conversation"
                className="w-[360px] h-[720px] max-w-full border-0 bg-transparent"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>


      {/* Editorial intro */}
      <section className="section-padding bg-background">
        <div className="container-narrow text-center">
          <p className="text-sm font-medium tracking-widest uppercase text-accent mb-6">
            About GenMyo
          </p>
          <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground leading-relaxed mb-8">
            GenMyo is a home for inner wellness, a calmer alternative to a noisy world,
            built to help people pause, hear themselves clearly, and grow at their own pace.
          </p>
          <p className="font-serif italic text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            The Mirror Project is the first step in that journey, a gentle, guided
            experience that opens the door inward.
          </p>
        </div>
      </section>

      {/* For you — a guide that remembers who you are */}
      <section id="for-you" className="section-padding bg-primary text-primary-foreground scroll-mt-20">
        <div className="container-wide px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-sm font-medium tracking-widest uppercase text-primary-foreground/80 mb-4">
                For you
              </p>
              <h2 className="heading-section mb-6">
                A guide that remembers who you are.
              </h2>
              <p className="text-lg text-primary-foreground/80 leading-relaxed mb-8">
                It starts with one honest question and grows into a portrait, your resilience, your
                patterns, the story you inherited. Reflect on WhatsApp; go deeper in a space of your
                own.
              </p>
              <Link
                to="/join"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-medium bg-primary-foreground text-primary rounded-full hover:opacity-90 transition-opacity"
                onClick={() => trackCTAClickWhatsApp("homepage_foryou_cta", "/join")}
              >
                Start free
                <ArrowRight size={16} />
              </Link>
            </div>
            <PortraitCard />
          </div>
        </div>
      </section>

      {/* For businesses & employers */}
      <section id="for-business" className="section-padding bg-cream scroll-mt-20">
        <div className="container-wide px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="lg:order-2">
              <p className="text-sm font-medium tracking-widest uppercase text-primary mb-4">
                For businesses &amp; employers
              </p>
              <h2 className="heading-section text-foreground mb-6">
                Wellbeing your people actually use.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                WhatsApp is already where your team is. You see anonymous, aggregate wellbeing, never
                an individual. Human support where it's earned.
              </p>
              <WalkthroughDialog />

            </div>
            <div className="lg:order-1">
              <TeamViz />
            </div>
          </div>
        </div>
      </section>



      {/* How it works */}
      <section className="section-padding bg-background">
        <div className="container-wide px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-sm font-medium tracking-widest uppercase text-accent mb-4">
              How it works
            </p>
            <h2 className="heading-section text-foreground mb-6">
              On WhatsApp. No app to be downloaded.
            </h2>
            <p className="text-body-large">
              Guided reflection that builds clarity, resilience and better habits, then deepens into
              pathways and real human mentorship.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map(([label, title, desc]) => (
              <div
                key={label}
                className="bg-cream rounded-2xl p-7 border border-border animate-fade-up"
              >
                <div className="font-serif text-2xl text-accent mb-3 font-semibold">{label}</div>
                <h4 className="font-medium text-foreground mb-2">{title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Early Voices / Testimonials */}
      <section className="section-padding bg-secondary">
        <div className="container-wide px-6 md:px-12">
          <div className="max-w-3xl mb-14">
            <p className="text-sm font-medium tracking-widest uppercase text-accent mb-4">
              Early Voices
            </p>
            <h2 className="heading-section text-foreground mb-6">
              What Mirror Project members say
            </h2>
            <p className="text-body-large">
              A small but growing community of early members exploring what it means to reflect
              with intention.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "I didn't expect a WhatsApp conversation to make me feel this seen. It's quiet, thoughtful, and doesn't push me.",
                name: "Sarah A.",
                location: "Singapore",
                initials: "SA",
                bg: "bg-accent/30 text-accent"
              },
              {
                quote: "No streaks to keep up with, no badges, just a quiet space when I need it. It's a breath of fresh air.",
                name: "David L.",
                location: "Sydney",
                initials: "DL",
                bg: "bg-cream text-foreground"
              },
              {
                quote: "A simple WhatsApp prompt in the morning has done more for my clarity than years of writing in blank journals.",
                name: "Elena M.",
                location: "Berlin",
                initials: "EM",
                bg: "bg-primary text-primary-foreground"
              },
              {
                quote: "It feels like talking to a friend who asks incredibly good questions and doesn't give unsolicited advice.",
                name: "James T.",
                location: "Toronto",
                initials: "JT",
                bg: "bg-cream text-foreground"
              },
              {
                quote: "The slow pace is perfect. I can stop, reply when I have a second, and go on with my day.",
                name: "Komal S.",
                location: "Mumbai",
                initials: "KS",
                bg: "bg-accent/30 text-accent"
              },
              {
                quote: "I deleted my other self-improvement apps because they felt like homework. GenMyo is the only one I've kept.",
                name: "Marcus K.",
                location: "London",
                initials: "MK",
                bg: "bg-cream text-foreground"
              },
              {
                quote: "It's private, simple, and actually works. I leave each conversation with one less thing cluttering my mind.",
                name: "Nadia R.",
                location: "Dubai",
                initials: "NR",
                bg: "bg-primary text-primary-foreground"
              },
              {
                quote: "Being able to review my snapshot at the end of the week gives me a sense of steadiness I didn't know I lacked.",
                name: "Chloe W.",
                location: "New York",
                initials: "CW",
                bg: "bg-cream text-foreground"
              },
              {
                quote: "It has helped me slow down my decision making. I feel much more in control of where my energy is going.",
                name: "Kenji H.",
                location: "Tokyo",
                initials: "KH",
                bg: "bg-accent/30 text-accent"
              }
            ].map((t, i) => (
              <div key={i} className="bg-cream rounded-2xl p-6 border border-border flex flex-col justify-between h-full shadow-sm">
                <div>
                  <div className="flex gap-1 mb-4 text-accent">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star key={idx} size={14} className="fill-current" />
                    ))}
                  </div>
                  <p className="font-serif italic text-base text-foreground leading-relaxed mb-6">
                    "{t.quote}"
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-border/60 mt-auto">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${t.bg}`}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground leading-tight">{t.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Mirror member · {t.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-narrow text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-medium mb-8 leading-tight">
            Stop tracking your mood.
            <br />
            Start understanding your story.
          </h2>
          <Link
            to="/join"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium bg-accent text-accent-foreground rounded-full hover:opacity-90 transition-opacity"
          >
            <MessageCircle size={18} />
            Start your reflection on WhatsApp →
          </Link>
          <p className="text-xs text-primary-foreground/60 mt-4 leading-relaxed flex items-center justify-center gap-1.5 flex-wrap">
            <span>Free &middot; No app, no account</span>
            <span>&middot;</span>
            <span className="inline-flex items-center gap-0.5">Your reflections are private.{" "}
              <Link to="/privacy" className="inline-flex items-center gap-0.5 hover:text-gold transition-colors font-medium">
                <ArrowRight size={11} />
              </Link>
            </span>
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
