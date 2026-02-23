import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowRight, Quote } from "lucide-react";
import personaAisha from "@/assets/persona-aisha.jpg";
import personaDavid from "@/assets/persona-david.jpg";

const GOOGLE_FORM_URL = "https://forms.gle/fgDzXX8EQz6yCiKMA";

const Philosophy = () => {
  const personas = [
    {
      name: "Aisha",
      age: 22,
      generation: "Gen Z",
      image: personaAisha,
      challenge: "Career Uncertainty",
      story:
        "100+ applications. 90% rejection rate. Anxious and questioning her purpose. Therapy helps her process, meditation apps calm her briefly, but nothing addresses why she feels lost or how to rebuild confidence.",
    },
    {
      name: "David",
      age: 43,
      generation: "Millennial",
      image: personaDavid,
      challenge: "Burnout & Transition",
      story:
        "Facing redundancy after 15 years. Burnt out, financially stressed, relationship strained. Wellness apps offer temporary relief before the weight returns. Nothing helps him navigate what comes next.",
    },
  ];

  const principles = [
    {
      title: "Capacities, Not Content",
      description:
        "We focus on building enduring inner skills: clarity, self-trust, emotional resilience. Rather than offering temporary fixes or content to consume.",
    },
    {
      title: "AI Supports, Never Replaces",
      description:
        "Technology serves to structure reflection, deepen integration, and meet you where you are. Human wisdom and connection remain central.",
    },
    {
      title: "Personalized Pathways",
      description:
        "Generic advice fails because it ignores context. We provide guidance that adapts to your emotional state, patterns, and growth over time.",
    },
    {
      title: "Integrated, Not Fragmented",
      description:
        "Existing tools address isolated symptoms. We combine psychological, behavioral, and directional support into a coherent developmental journey.",
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-hero section-padding">
        <div className="container-narrow text-center">
          <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-6 animate-fade-up">
            Our Philosophy
          </p>
          <h1 className="heading-display text-foreground mb-8 animate-fade-up delay-100">
            Why GenMyo Exists
          </h1>
          <p className="text-body-large max-w-2xl mx-auto animate-fade-up delay-200">
            Born from personal experience and validated through research, 
            GenMyo addresses a crisis that existing tools are failing to solve.
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="section-padding bg-background">
        <div className="container-wide px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
              The Origin
            </p>
            <h2 className="heading-section text-foreground mb-8">
              It Started With a Conversation
            </h2>
            
            <div className="space-y-8 text-lg text-muted-foreground leading-relaxed">
              <p>
                Our motivation emerged from personal experiences navigating uncertainty, 
                and conversations with peers, colleagues, and young adults facing similar challenges.
              </p>
              <p>
                Despite being capable, motivated, and ambitious, many felt overwhelmed 
                by constant rejection, confused about the next step, and emotionally 
                exhausted by the pressure to "figure out" their lives in an increasingly 
                complex world.
              </p>
              
              <div className="bg-cream rounded-2xl p-8 my-12">
                <Quote size={32} className="text-accent mb-4" />
                <blockquote className="font-serif text-2xl md:text-3xl text-foreground leading-relaxed mb-4">
                  "Meditation apps helped me calm down for a moment, but they didn't 
                  help me understand why I felt lost, how to rebuild confidence, or 
                  what to do next."
                </blockquote>
                <p className="text-sm text-muted-foreground">
                  From early customer conversations
                </p>
              </div>

              <p>
                Another peer described a similar emotional cycle: "I know I'm capable, 
                but every setback feels like proof that maybe I'm not."
              </p>
              <p>
                These weren't isolated stories. They reflected a broader crisis of 
                self-belief and resilience, one that existing tools weren't addressing 
                because they focused on symptoms rather than root causes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Personas */}
      <section className="section-padding bg-cream">
        <div className="container-wide px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
              The People We Serve
            </p>
            <h2 className="heading-section text-foreground mb-4">
              Behind Every Statistic Is a Person
            </h2>
            <p className="text-body-large max-w-2xl mx-auto">
              These represent real challenges faced by people in our network 
              today. Challenges that existing solutions aren't solving.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {personas.map((persona) => (
              <div key={persona.name} className="group bg-card rounded-2xl overflow-hidden border border-border">
                <div className="aspect-[4/3] overflow-hidden bg-secondary">
                  <img
                    src={persona.image}
                    alt={`${persona.name}, ${persona.age}`}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="font-serif text-2xl font-medium text-foreground">
                      {persona.name}, {persona.age}
                    </h3>
                    <span className="text-sm text-muted-foreground">
                      ({persona.generation})
                    </span>
                  </div>
                  <p className="text-sm font-medium text-accent uppercase tracking-wider mb-3">
                    {persona.challenge}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {persona.story}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Core Problems */}
      <section className="section-padding bg-background">
        <div className="container-wide px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
                What We Discovered
              </p>
              <h2 className="heading-section text-foreground mb-8">
                Three Core Pain Points
              </h2>
              <p className="text-body-large mb-8">
                Through extensive research and customer conversations, we 
                identified three interconnected challenges that existing 
                solutions fail to address.
              </p>
            </div>
            <div className="space-y-6">
              {[
                {
                  number: "01",
                  title: "Emotional Overwhelm & Erosion of Agency",
                  description:
                    "Prolonged uncertainty erodes confidence and agency, limiting the ability to act even when you know what to do. Small setbacks disproportionately impact self-belief.",
                },
                {
                  number: "02",
                  title: "Lack of Coherent, Reflective Support",
                  description:
                    "Rather than feeling guided through change, many feel left alone to interpret their experiences in isolation. Existing platforms offer resources but no structure for meaning-making.",
                },
                {
                  number: "03",
                  title: "Generic, Disconnected Guidance",
                  description:
                    "Advice fails to account for emotional states, past patterns, or fluctuating motivation. Without continuity and personalization, motivation declines rapidly.",
                },
              ].map((item) => (
                <div key={item.number} className="card-elevated">
                  <div className="flex items-start gap-4">
                    <span className="font-serif text-3xl font-light text-accent">
                      {item.number}
                    </span>
                    <div>
                      <h3 className="font-serif text-xl font-medium text-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Principles */}
      <section className="section-padding bg-sand">
        <div className="container-wide px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
              Our Approach
            </p>
            <h2 className="heading-section text-foreground mb-6">
              The GenMyo Philosophy
            </h2>
            <p className="text-body-large max-w-2xl mx-auto">
              These principles guide everything we build.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {principles.map((principle, index) => (
              <div key={index} className="card-elevated">
                <h3 className="font-serif text-2xl font-medium text-foreground mb-4">
                  {principle.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="section-padding bg-cream">
        <div className="container-narrow text-center">
          <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
            The Vision
          </p>
          <h2 className="heading-section text-foreground mb-8">
            Cultivating the Conditions for Inner Change
          </h2>
          <p className="font-serif text-2xl md:text-3xl text-foreground leading-relaxed max-w-3xl mx-auto mb-12">
            At its core, GenMyo is about cultivating the conditions for meaningful, 
            self-directed inner change, combining the scale of technology 
            with the depth of human connection.
          </p>
          <Link
            to="/plan"
            className="inline-flex items-center gap-2 text-foreground font-medium link-underline"
          >
            See how we're building this
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-narrow text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6">
            Experience It Yourself
          </h2>
          <p className="text-xl text-primary-foreground/80 max-w-xl mx-auto mb-10">
            The best way to understand what we're building is to experience 
            it. Join The Mirror Project and begin the journey.
          </p>
          <a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium bg-primary-foreground text-primary rounded-full hover:opacity-90 transition-opacity"
          >
            Join The Mirror Project
            <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default Philosophy;
