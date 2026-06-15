import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import HeroMirrorPanel from "@/components/HeroMirrorPanel";
import { HERO_ACCENT, HERO_CREAM, HERO_TERRACOTTA } from "@/components/HeroMirrorCard";
import { ArrowRight, MessageCircle, Star } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="grid min-h-[calc(100dvh-4rem)] grid-cols-1 sm:min-h-[calc(100dvh-5rem)] md:grid-cols-2 lg:min-h-[calc(100dvh-5rem)]">
        {/* Left — copy & CTAs */}
        <div
          className="flex items-center px-4 py-12 xs:px-5 sm:px-8 sm:py-16 md:px-10 md:py-16 lg:px-16 lg:py-20 xl:py-24"
          style={{ backgroundColor: HERO_CREAM }}
        >
          <div className="mx-auto w-full max-w-xl md:mx-0">
            <p
              className="mb-4 animate-fade-up text-[0.65rem] font-medium uppercase tracking-[0.18em] xs:text-xs sm:mb-5 sm:tracking-[0.2em] md:mb-6 md:text-sm"
              style={{ color: HERO_ACCENT }}
            >
              Inner Development, Reimagined
            </p>
            <h1
              className="mb-5 animate-fade-up delay-100 font-serif text-[1.75rem] font-medium leading-[1.15] xs:text-3xl sm:mb-6 sm:text-4xl sm:leading-[1.12] md:mb-7 md:text-[2.35rem] lg:mb-8 lg:text-5xl xl:text-6xl 2xl:text-7xl"
              style={{ color: "#2D2D2D" }}
            >
              Your AI-powered guide for{" "}
              <span style={{ color: HERO_ACCENT }}>clarity,</span>{" "}
              <span style={{ color: HERO_ACCENT }}>resilience</span> and better daily decisions.
            </h1>
            <p
              className="mb-7 max-w-lg animate-fade-up delay-200 text-[0.95rem] leading-relaxed sm:mb-8 sm:text-base md:mb-10 md:text-lg lg:text-xl"
              style={{ color: "#6B6B6B" }}
            >
              A calm, reflective space to pause, understand yourself, and move forward, without
              pressure or judgement. Start in two minutes on WhatsApp.
            </p>
            <div className="flex animate-fade-up flex-col gap-3 delay-300 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                to="/join"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto sm:px-7 md:px-8 md:py-4 md:text-base"
              >
                <MessageCircle size={18} />
                Start your first session
              </Link>
              <Link
                to="/plan"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary/80 sm:w-auto sm:px-7 md:px-8 md:py-4 md:text-base"
                style={{ backgroundColor: HERO_CREAM }}
              >
                Learn about the Mirror Project
              </Link>
            </div>
          </div>
        </div>

        {/* Right — mirror card on terracotta panel */}
        <div
          className="flex min-h-[24rem] w-full items-center justify-center px-4 py-10 xs:px-5 sm:min-h-[28rem] sm:px-8 sm:py-12 md:min-h-[calc(100dvh-5rem)] md:px-10 md:py-10 lg:px-12 lg:py-12"
          style={{ backgroundColor: HERO_TERRACOTTA }}
        >
          <div className="animate-fade-up delay-200 flex h-auto min-h-[22rem] w-full max-w-[18rem] items-stretch xs:max-w-[19rem] sm:min-h-[26rem] sm:max-w-[22rem] md:h-[75%] md:min-h-[24rem] md:max-w-[24rem] lg:max-w-[28rem] xl:max-w-[30rem]">
            <HeroMirrorPanel />
          </div>
        </div>
      </section>

      {/* Editorial Intro: GenMyo brand + Mirror Project as first step */}
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

      {/* Where you are now. Where you're going. */}
      <section className="section-padding bg-sand">
        <div className="container-wide px-6 md:px-12">
          <div className="max-w-3xl mb-16">
            <h2 className="heading-section text-foreground mb-6">
              Where you are now. Where you're going.
            </h2>
            <p className="text-body-large">
              A guided, evolving experience that grows with you, from your first reflection to a
              deeply personalised practice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Phase 1 — Live */}
            <div className="bg-primary text-primary-foreground rounded-3xl p-8 md:p-10 flex flex-col">
              <p className="text-sm tracking-wide text-primary-foreground/70 mb-4">01 — Now</p>
              <span className="inline-flex w-fit items-center px-4 py-1.5 rounded-full bg-primary-foreground/15 text-primary-foreground text-xs font-medium tracking-widest uppercase mb-8">
                Live
              </span>
              <h3 className="font-serif text-3xl font-medium mb-5">The Mirror Project</h3>
              <p className="text-primary-foreground/80 leading-relaxed mb-8">
                A simple, guided WhatsApp experience that helps you pause, reflect, and think more
                clearly, in just a few minutes a day.
              </p>
              <ul className="space-y-3 mb-8 text-primary-foreground/90">
                {[
                  "Respond to short reflection prompts",
                  "Get gentle, guided responses",
                  "Build a daily habit of clarity",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-primary-foreground/60">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-primary-foreground/20 pt-6 mt-auto">
                <p className="font-serif italic text-primary-foreground/90 mb-6">
                  Start understanding your thoughts, one small moment at a time.
                </p>
                <Link
                  to="/join"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-primary-foreground text-primary rounded-full hover:opacity-90 transition-opacity"
                >
                  Join now
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="bg-cream rounded-3xl p-8 md:p-10 flex flex-col">
              <p className="text-sm tracking-wide text-muted-foreground mb-4">02 — In Production</p>
              <span className="inline-flex w-fit items-center px-4 py-1.5 rounded-full bg-accent/15 text-accent text-xs font-medium tracking-widest uppercase mb-8">
                Coming Soon
              </span>
              <h3 className="font-serif text-3xl font-medium text-foreground mb-5">
                Personalised Growth
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Your experience becomes more tailored over time, based on what you share, how you
                think, and what you need.
              </p>
              <ul className="space-y-3 mb-8 text-foreground/90">
                {[
                  "Pattern recognition from your reflections",
                  "Adaptive prompts to your growth areas",
                  "Progress you can actually feel",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-muted-foreground">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-border pt-6 mt-auto">
                <p className="text-foreground font-medium">
                  Move from one-off reflections to a consistent, personalised journey.
                </p>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="bg-cream rounded-3xl p-8 md:p-10 flex flex-col">
              <p className="text-sm tracking-wide text-muted-foreground mb-4">03 — Coming Soon</p>
              <span className="inline-flex w-fit items-center px-4 py-1.5 rounded-full bg-accent/15 text-accent text-xs font-medium tracking-widest uppercase mb-8">
                On The Horizon
              </span>
              <h3 className="font-serif text-3xl font-medium text-foreground mb-5">
                The Full Platform
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                A deeper ecosystem combining guided AI experiences, expert insights, and structured
                growth pathways.
              </p>
              <ul className="space-y-3 mb-8 text-foreground/90">
                {[
                  "Expert-led content & guidance",
                  "Structured personal growth pathways",
                  "Community & peer reflection spaces",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-muted-foreground">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-border pt-6 mt-auto">
                <p className="text-foreground font-medium">
                  Sustain and deepen your personal growth over time.
                </p>
              </div>
            </div>
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
                quote:
                  "I didn't expect a WhatsApp conversation to make me feel this seen. It's quiet, thoughtful, and doesn't push me, it just helps me think.",
                name: "Sarah A.",
                location: "Singapore",
                initials: "SA",
                bg: "bg-accent/30 text-accent",
              },
              {
                quote:
                  "The prompts are surprisingly deep without being overwhelming. I've started looking forward to my morning check-ins. It's become a small ritual.",
                name: "Marcus K.",
                location: "London",
                initials: "MK",
                bg: "bg-cream text-foreground",
              },
              {
                quote:
                  "It's not therapy, it's not journaling, it's something different. Like having a calm, patient thought partner in your pocket.",
                name: "Nadia R.",
                location: "Dubai",
                initials: "NR",
                bg: "bg-primary text-primary-foreground",
              },
            ].map((t, i) => (
              <div key={i} className="bg-cream rounded-2xl p-8 flex flex-col">
                <div className="flex gap-1 mb-6 text-accent">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} size={16} className="fill-current" />
                  ))}
                </div>
                <p className="font-serif italic text-lg text-foreground leading-relaxed mb-8 flex-grow">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-4 pt-6 border-t border-border">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium ${t.bg}`}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{t.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Early Mirror member · {t.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why we built this */}
      <section className="section-padding bg-background">
        <div className="container-wide px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-sm font-medium tracking-widest uppercase text-accent mb-4">
                Why We Built This
              </p>
              <h2 className="heading-section text-foreground mb-8">
                Built for the quiet moments between decisions.
              </h2>
              <p className="text-body-large mb-6">
                GenMyo was created as a quieter alternative to modern wellness culture. In a world
                shaped by noise and constant performance, we wanted to build a space where people
                could simply pause and think.
              </p>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                We're not here to optimise you. We're here to help you understand yourself, gently,
                and at your own pace.
              </p>
              <Link
                to="/philosophy"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-medium bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
              >
                Read our story
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-5">
              {[
                { stat: "2 min", label: "Average daily session time" },
                { stat: "89%", label: "Members returned the next day" },
                { stat: "0", label: "Apps to download" },
                { stat: "∞", label: "No pressure, no judgement" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-cream rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[180px]"
                >
                  <span className="font-serif text-4xl md:text-5xl font-medium text-accent block mb-3">
                    {item.stat}
                  </span>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-narrow text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6">
            Ready to pause and reflect?
          </h2>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10">
            Join the Mirror Project. Your first guided session takes less than two minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/join"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium bg-accent text-accent-foreground rounded-full hover:opacity-90 transition-opacity"
            >
              <MessageCircle size={18} />
              Start on WhatsApp
            </Link>
            <Link
              to="/philosophy"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium border border-primary-foreground/30 rounded-full hover:bg-primary-foreground/10 transition-colors"
            >
              Learn more first
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
