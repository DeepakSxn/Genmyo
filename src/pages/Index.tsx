import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowRight, Sparkles, Heart, Compass, Users, Play } from "lucide-react";


const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero min-h-[90vh] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--accent)/0.08),transparent_50%)]" />
        <div className="container-wide px-6 md:px-12 py-20 md:py-32 relative z-10">
          <div className="max-w-4xl">
            <p className="text-sm font-medium tracking-widest uppercase text-accent mb-6 animate-fade-up">
              Inner Development, Reimagined
            </p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium text-foreground mb-8 animate-fade-up delay-100 leading-[1.1]">
              Build Clarity.{" "}
              <span className="text-gradient">Cultivate Resilience.</span>{" "}
              Reclaim Agency.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-10 animate-fade-up delay-200 leading-relaxed">
              GenMyo is an AI-led platform for lasting human development, supporting 
              you to navigate uncertainty with self-trust and meaningful direction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up delay-300">
              <Link
                to="/join"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
              >
                Join The Mirror Project
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/philosophy"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium border border-border rounded-full hover:bg-secondary transition-colors"
              >
                Our Philosophy
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Statement */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="text-center mb-16">
            <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
              The Modern Challenge
            </p>
            <h2 className="heading-section text-foreground mb-8">
              Powerful Tools. Constant Stimulation.<br />
              <span className="text-muted-foreground">Yet Many Feel Lost.</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { stat: "46%", label: "of Gen Z workers feel stressed or depressed" },
              { stat: "34%", label: "of Millennials report burnout and financial stress" },
              { stat: "64%", label: "identify mental wellness as a primary need" },
            ].map((item, index) => (
              <div key={index} className="text-center p-8 rounded-2xl bg-cream">
                <span className="font-serif text-5xl md:text-6xl font-medium text-accent block mb-3">
                  {item.stat}
                </span>
                <p className="text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
          
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-body-large mb-6">
              Existing solutions offer temporary fixes: content to consume, 
              not capacities to build. Meditation apps calm for a moment. 
              Coaching is prohibitively expensive. Generic advice misses 
              the emotional complexity of real experience.
            </p>
            <p className="text-lg text-muted-foreground">
              What's missing is integrated, continuous support that helps you 
              make sense of uncertainty and build lasting inner strength.
            </p>
          </div>
        </div>
      </section>

      {/* What GenMyo Offers */}
      <section className="section-padding bg-sand">
        <div className="container-wide px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
              A Different Path
            </p>
            <h2 className="heading-section text-foreground mb-6">
              Not Temporary Fixes. Enduring Capacities.
            </h2>
            <p className="text-body-large max-w-2xl mx-auto">
               GenMyo brings humanistic teachings, wellness practices from industry experts, and AI-powered 
               guidance into a coherent pathway that grows with you over time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Sparkles,
                title: "Clarity",
                description: "Surface patterns and build understanding through guided reflection.",
              },
              {
                icon: Heart,
                title: "Resilience",
                description: "Develop emotional strength that compounds over time.",
              },
              {
                icon: Compass,
                title: "Agency",
                description: "Strengthen your sense of direction and self-trust.",
              },
              {
                icon: Users,
                title: "Connection",
                description: "Access wisdom without isolation. Grow within community.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="card-elevated group hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <item.icon size={24} />
                </div>
                <h3 className="font-serif text-2xl font-medium text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mirror Project CTA */}
      <section className="section-padding bg-background">
        <div className="container-wide px-6 md:px-12">
          <div className="bg-gradient-warm rounded-3xl p-10 md:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-medium mb-6">
                  <Play size={14} className="fill-current" />
                  Now Open
                </div>
                <h2 className="heading-section text-foreground mb-6">
                  The Mirror Project
                </h2>
                <p className="text-body-large mb-8">
                  A WhatsApp-native experience designed to help you build small, 
                  supportive habits that create space for reflection and honest 
                  self-inquiry in the flow of everyday life.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "Daily reflective prompts via WhatsApp",
                    "Simple but meaningful questions for self-inquiry",
                    "Build habits that create space for awareness",
                    "Free to join and participate",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-accent" />
                      </div>
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/join"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
                >
                  Join The Mirror Project
                  <ArrowRight size={18} />
                </Link>
              </div>
              <div className="hidden lg:flex items-center justify-center">
                <div className="text-center px-8">
                  <p className="font-serif text-2xl md:text-3xl text-foreground italic leading-relaxed mb-6">
                    "Some days it might feel light and grounding. Other days it 
                    might prompt deeper reflection. Both are part of the journey."
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Begins with Phase One of the GenMyo roadmap
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* What's Ahead */}
      <section className="section-padding bg-background">
        <div className="container-narrow text-center">
          <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
            What's Ahead
          </p>
          <h2 className="heading-section text-foreground mb-6">
            AI-Powered Inner Change
          </h2>
          <p className="text-body-large max-w-2xl mx-auto mb-12">
            We're building toward an AI-enhanced platform that personalizes your 
            journey, adapting to your patterns, remembering your progress, and 
            connecting you with the right resources at the right time.
          </p>
          <Link
            to="/plan"
            className="inline-flex items-center gap-2 text-foreground font-medium link-underline"
          >
            See How We're Building This
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-narrow text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6">
            Begin Your Journey
          </h2>
          <p className="text-xl text-primary-foreground/80 max-w-xl mx-auto mb-10">
            Join a growing community committed to meaningful, self-directed 
            inner change.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/join"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium bg-primary-foreground text-primary rounded-full hover:opacity-90 transition-opacity"
            >
              Join The Mirror Project
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/philosophy"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium border border-primary-foreground/30 rounded-full hover:bg-primary-foreground/10 transition-colors"
            >
              Learn Our Philosophy
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
