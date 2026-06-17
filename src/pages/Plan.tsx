import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { ArrowRight, Circle } from "lucide-react";
import phaseCrawl from "@/assets/phase-crawl.jpg";
import phaseWalk from "@/assets/phase-walk.jpg";
import phaseRun from "@/assets/phase-run.jpg";

const Plan = () => {
  const phases = [
    {
      number: "01",
      title: "The Mirror Project",
      timeline: "Now",
      status: "active",
      image: phaseCrawl,
      alt: "Phase 1 — The Mirror Project: guided WhatsApp reflection sessions helping users build daily self-awareness habits",
      description:
        "A free, lightweight experience designed to help you build small but meaningful habits of self-reflection.",
      outcome:
        "Build clarity and establish the foundation for deeper growth.",
    },
    {
      number: "02",
      title: "Personalised Growth",
      timeline: "Coming Soon",
      status: "upcoming",
      image: phaseWalk,
      alt: "Phase 2 — Personalised Growth: AI that adapts to your reflection patterns and delivers tailored prompts over time",
      description:
        "AI-enhanced experiences that adapt to you, making every interaction more relevant and more useful over time.",
      outcome:
        "Move from isolated moments of clarity to coherent journeys that compound.",
    },
    {
      number: "03",
      title: "The Full Platform",
      timeline: "On the Horizon",
      status: "future",
      image: phaseRun,
      alt: "Phase 3 — The Full GenMyo Platform: expert content, structured inner-development pathways and community spaces",
      description:
        "A complete ecosystem for sustained inner development, combining AI-driven pathways, a curated repository of expert-led content and resources, and a supportive community.",
      outcome:
        "Democratize access to meaningful, lasting inner change.",
    },
  ];

  return (
    <Layout>
      <SEO
        title="The Roadmap — From WhatsApp Reflection to Full AI Wellness Platform"
        description="See how GenMyo evolves from The Mirror Project (live on WhatsApp) to personalised AI growth pathways and a full inner wellness platform. Join us at the beginning."
        canonical="/plan"
      />
      {/* Hero */}
      <section className="bg-gradient-hero section-padding">
        <div className="container-narrow text-center">
          <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-6 animate-fade-up">
            Our Roadmap
          </p>
          <h1 className="heading-display text-foreground mb-8 animate-fade-up delay-100">
            How We're Getting There
          </h1>
          <p className="text-body-large max-w-2xl mx-auto animate-fade-up delay-200">
            A phased approach to building something meaningful. Starting simple, 
            learning as we go, and growing with our community.
          </p>
        </div>
      </section>

      {/* Visual Timeline */}
      <section className="py-20 bg-background overflow-hidden">
        <div className="container-wide px-6 md:px-12">
          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-accent via-secondary to-muted transform -translate-y-1/2 z-0" />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
              {phases.map((phase, index) => (
                <div key={phase.number} className="relative z-10">
                  <div className="flex flex-col items-center">
                    <div
                      className={`relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-6 transition-all border-4 ${
                        phase.status === "active"
                          ? "border-accent shadow-lg shadow-accent/20"
                          : phase.status === "upcoming"
                          ? "border-secondary"
                          : "border-muted"
                      }`}
                    >
                      <img 
                        src={phase.image} 
                        alt={phase.alt}
                        width={512}
                        height={512}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <p className="font-serif text-xl md:text-2xl font-medium text-foreground text-center">
                      {phase.title}
                    </p>
                    <span
                      className={`inline-flex items-center gap-2 px-4 py-1.5 text-xs font-medium uppercase tracking-wider rounded-full mt-3 ${
                        phase.status === "active"
                          ? "bg-accent/20 text-accent"
                          : phase.status === "upcoming"
                          ? "bg-secondary text-secondary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {phase.status === "active" && <Circle size={6} className="fill-current" />}
                      {phase.timeline}
                    </span>
                  </div>
                  
                  {index < phases.length - 1 && (
                    <div className="flex justify-center py-6 lg:hidden">
                      <ArrowRight size={24} className="text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Phases */}
      <section className="section-padding bg-background pt-0">
        <div className="container-wide px-6 md:px-12">
          <div className="space-y-24 md:space-y-32">
            {phases.map((phase, index) => (
              <div
                key={phase.number}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-serif text-6xl md:text-7xl font-light text-muted-foreground/30">
                      {phase.number}
                    </span>
                    {phase.status === "active" && (
                      <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-medium uppercase tracking-wider bg-accent/20 text-accent rounded-full">
                        <Circle size={8} className="fill-current" />
                        {phase.timeline}
                      </span>
                    )}
                    {phase.status === "upcoming" && (
                      <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-medium uppercase tracking-wider bg-secondary text-secondary-foreground rounded-full">
                        {phase.timeline}
                      </span>
                    )}
                    {phase.status === "future" && (
                      <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-medium uppercase tracking-wider bg-muted text-muted-foreground rounded-full">
                        {phase.timeline}
                      </span>
                    )}
                  </div>
                  <h2 className="heading-section text-foreground mb-6">
                    {phase.title}
                  </h2>
                  <p className="text-body-large mb-8">{phase.description}</p>
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div
                    className={`rounded-3xl p-10 md:p-12 ${
                      phase.status === "active"
                        ? "bg-gradient-warm"
                        : "bg-card border border-border"
                    }`}
                  >
                    <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-4">
                      Outcome
                    </p>
                    <p className="font-serif text-2xl md:text-3xl text-foreground leading-relaxed">
                      {phase.outcome}
                    </p>
                    {phase.status === "active" && (
                      <Link
                        to="/join"
                        className="inline-flex items-center gap-2 mt-8 text-foreground font-medium link-underline"
                      >
                        Join now
                        <ArrowRight size={16} />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="section-padding bg-cream">
        <div className="container-narrow text-center">
          <h2 className="heading-section text-foreground mb-8">
            The Vision
          </h2>
          <p className="text-body-large max-w-2xl mx-auto">
            We're building toward a future where meaningful inner development 
            is accessible to everyone, not just those with the time, money, 
            or luck to find the right support.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-narrow text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6">
            Start With Phase One
          </h2>
          <p className="text-xl text-primary-foreground/80 max-w-xl mx-auto mb-10">
            The Mirror Project is free to join and designed to fit into your 
            everyday life. Begin building clarity today.
          </p>
          <Link
            to="/join"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium bg-primary-foreground text-primary rounded-full hover:opacity-90 transition-opacity"
          >
            Join The Mirror Project
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Plan;
