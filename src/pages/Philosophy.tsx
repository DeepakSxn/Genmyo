import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { ArrowRight, Compass, Shield, Users, Sparkles, MessageCircle } from "lucide-react";

const Philosophy = () => {
  return (
    <Layout>
      <SEO
        title="Our Philosophy — Why GenMyo Is Quiet on Purpose"
        description="Wellness got loud. We went the other way. Why GenMyo asks questions instead of giving advice, why there's no streak, no feed, and no optimisation score — and what 'inner alignment' actually means to us."
      />
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
            GenMyo is an inner wellness platform delivered entirely through WhatsApp. Its core experience, The Mirror Project by GenMyo, is a guided reflection — a few honest questions, asked slowly, that help you reconnect with yourself and see what's actually going on. Not therapy. Not another app. No advice.
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


      {/* Exploration Guides */}
      <section className="section-padding bg-background border-t border-border/40">
        <div className="container-narrow">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-serif text-2xl md:text-3xl text-foreground font-medium mb-3">
              Guides on Inner Wellness & Growth
            </h2>
            <p className="text-sm text-muted-foreground">
              Explore our articles and research on self-reflection, mindfulness, and quiet development.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto text-center sm:text-left">
            <Link to="/feeling-disconnected" className="p-4 rounded-xl border border-border/60 hover:border-accent/40 bg-cream/40 transition-colors block text-sm font-medium text-foreground">
              Feeling Disconnected from Yourself →
            </Link>
            <Link to="/feeling-stuck" className="p-4 rounded-xl border border-border/60 hover:border-accent/40 bg-cream/40 transition-colors block text-sm font-medium text-foreground">
              What to Do When Feeling Stuck →
            </Link>
            <Link to="/self-awareness" className="p-4 rounded-xl border border-border/60 hover:border-accent/40 bg-cream/40 transition-colors block text-sm font-medium text-foreground">
              How to Practice Self-Awareness →
            </Link>
            <Link to="/inner-alignment" className="p-4 rounded-xl border border-border/60 hover:border-accent/40 bg-cream/40 transition-colors block text-sm font-medium text-foreground">
              A Guide to Inner Alignment →
            </Link>
            <Link to="/quiet-wellness" className="p-4 rounded-xl border border-border/60 hover:border-accent/40 bg-cream/40 transition-colors block text-sm font-medium text-foreground">
              Understanding Quiet Wellness →
            </Link>
            <Link to="/guided-reflection" className="p-4 rounded-xl border border-border/60 hover:border-accent/40 bg-cream/40 transition-colors block text-sm font-medium text-foreground">
              Guided Reflection Practices →
            </Link>
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
            it. Start reflecting natively inside WhatsApp today.
          </p>
          <div className="flex flex-col items-center">
            <Link
              to="/join"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium bg-gold text-gold-foreground rounded-full hover:opacity-90 transition-opacity"
            >
              <MessageCircle size={18} />
              Start your reflection on WhatsApp →
            </Link>
            <p className="text-xs text-primary-foreground/60 mt-4 leading-relaxed">
              Free · No app, no account, no card
              <br />
              Your reflections are private. <Link to="/privacy" className="underline hover:text-gold transition-colors font-medium">What we store →</Link>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Philosophy;
