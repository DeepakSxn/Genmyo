import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowRight, Compass, Shield, Users, Sparkles } from "lucide-react";

const Philosophy = () => {
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
            A quieter alternative to modern wellness culture, built to help people
            pause, hear themselves clearly, and grow at their own pace.
          </p>
        </div>
      </section>



      {/* Capacities */}
      <section className="section-padding bg-background">
        <div className="container-wide px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-sm font-medium tracking-widest uppercase text-accent mb-4">
              The Capacities
            </p>
            <h2 className="heading-section text-foreground mb-6">
              Four capacities we help you build.
            </h2>
            <p className="text-body-large">
              Every reflection quietly strengthens the inner qualities that carry you
              through daily life.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: Compass,
                title: "Clarity",
                desc: "See your situation plainly, without the noise, so decisions feel lighter.",
              },
              {
                icon: Shield,
                title: "Resilience",
                desc: "Meet setbacks with steadiness, recovering faster each time you're tested.",
              },
              {
                icon: Users,
                title: "Belonging",
                desc: "Feel connected to yourself and others, part of a story larger than today.",
              },
              {
                icon: Sparkles,
                title: "Purpose",
                desc: "Move toward what genuinely matters to you, at your own pace.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-cream rounded-2xl p-7 border border-border">
                <div className="w-11 h-11 rounded-full bg-accent/15 grid place-items-center text-accent mb-4">
                  <Icon size={20} />
                </div>
                <h3 className="font-serif text-xl text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles — The GenMyo Philosophy */}
      <section className="section-padding bg-cream">
        <div className="container-wide px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
              Our Approach
            </p>
            <h2 className="heading-section text-foreground mb-6">
              The GenMyo Philosophy
            </h2>
            <p className="text-body-large">
              These principles guide everything we build.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                title: "Capacities, Not Content",
                desc: "We focus on building enduring inner skills: clarity, self-trust, emotional resilience. Rather than offering temporary fixes or content to consume.",
              },
              {
                title: "AI Supports, Never Replaces",
                desc: "Technology serves to structure reflection, deepen integration, and meet you where you are. Human wisdom and connection remain central.",
              },
              {
                title: "Personalized Pathways",
                desc: "Generic advice fails because it ignores context. We provide guidance that adapts to your emotional state, patterns, and growth over time.",
              },
              {
                title: "Integrated, Not Fragmented",
                desc: "Existing tools address isolated symptoms. We combine psychological, behavioral, and directional support into a coherent developmental journey.",
              },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-background rounded-2xl p-8 border border-border">
                <h3 className="font-serif text-2xl text-foreground mb-3">{title}</h3>
                <p className="text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
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

export default Philosophy;
