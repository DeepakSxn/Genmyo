import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { MessageCircle, ArrowRight, ShieldCheck, Clock, CheckCircle } from "lucide-react";
import { trackCTAClickWhatsApp } from "@/lib/analytics";

const HowItWorks = () => {
  const waUrl = "https://wa.me/message/Y4GOKBIGBWUUM1?text=I%27m%20ready%20to%20start%20my%20first%20reflection";

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": "https://genmyo.ai/how-it-works#howto",
    "name": "How to Reflect with The Mirror Project by GenMyo",
    "description": "A 3-step, 2-minute guided reflection entirely on WhatsApp to help you build clarity and resilience.",
    "provider": { "@id": "https://genmyo.ai/#organization" },
    "isPartOf": { "@id": "https://genmyo.ai/#website" },
    "totalTime": "PT2M",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Send one message",
        "text": "Open WhatsApp using our link and send the prefilled message to start your reflection session.",
        "url": "https://genmyo.ai/join"
      },
      {
        "@type": "HowToStep",
        "name": "Answer a few honest questions",
        "text": "Reflect on one prompt at a time. The session is guided slowly, taking about 2 minutes.",
        "url": "https://genmyo.ai/join"
      },
      {
        "@type": "HowToStep",
        "name": "Leave with one clear thing",
        "text": "Conclude the session with one thing seen more clearly, rather than a complex list of todo items.",
        "url": "https://genmyo.ai/join"
      }
    ]
  };

  return (
    <Layout>
      <SEO
        title="How The Mirror Project Works — 3 Steps, 2 Minutes, in WhatsApp"
        description="Send one message. Answer a few honest questions. Leave with one clear next step. Here's exactly what happens in a GenMyo reflection, message by message."
        jsonSchema={howToSchema}
      />

      {/* Hero — Dark series.so style with gold radial glow */}
      <section className="relative overflow-hidden -mt-20 text-primary-foreground bg-hero-dark min-h-screen flex items-center justify-center pt-24 pb-16">
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(60% 60% at 70% 40%, hsl(var(--gold) / 0.12), transparent 70%)" }}
        />

        <div className="relative container-narrow text-center flex flex-col items-center justify-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium animate-fade-up delay-100 leading-[1.18] text-center max-w-3xl mx-auto mb-8">
            Meet The <span className="text-gold italic">Mirror</span>.
          </h1>
          <p className="font-light text-base md:text-lg text-primary-foreground/90 max-w-2xl mx-auto animate-fade-up delay-150 leading-relaxed">
            It learns you through reflection, then creates for you — personalised content, prompts, and practices shaped around your patterns and story. All inside WhatsApp, no app to download.
          </p>
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="section-padding bg-background">
        <div className="container-wide px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-cream rounded-2xl p-8 border border-border">
              <div className="w-12 h-12 rounded-full bg-accent/15 grid place-items-center text-accent mb-6 font-serif text-xl font-bold">
                1
              </div>
              <h3 className="font-serif text-2xl text-foreground mb-3 font-semibold">Send one message</h3>
              <p className="text-muted-foreground leading-relaxed">
                Clicking start opens WhatsApp with a prefilled message. Simply hit send to open your reflection session. No profile set-up or email confirmation required.
              </p>
            </div>

            <div className="bg-cream rounded-2xl p-8 border border-border">
              <div className="w-12 h-12 rounded-full bg-accent/15 grid place-items-center text-accent mb-6 font-serif text-xl font-bold">
                2
              </div>
              <h3 className="font-serif text-2xl text-foreground mb-3 font-semibold">Answer a few questions</h3>
              <p className="text-muted-foreground leading-relaxed">
                The conversation progresses one prompt at a time. No complex surveys or multiple choice buttons. You type your honest response, taking all the time you need.
              </p>
            </div>

            <div className="bg-cream rounded-2xl p-8 border border-border">
              <div className="w-12 h-12 rounded-full bg-accent/15 grid place-items-center text-accent mb-6 font-serif text-xl font-bold">
                3
              </div>
              <h3 className="font-serif text-2xl text-foreground mb-3 font-semibold">Leave with one clear thing</h3>
              <p className="text-muted-foreground leading-relaxed">
                We don't give you advice or productivity scores. The session ends with your own thoughts surfaced clearly, helping you know what to do next.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Control & Privacy Section */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="text-accent mt-1 shrink-0">
                <Clock size={24} />
              </div>
              <div>
                <h4 className="font-serif text-xl font-medium text-foreground mb-2">You control the pace</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  There are no reminders, ticks, or alerts to force your return. Reply in 2 minutes or 2 days—the session continues exactly when you are ready.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-accent mt-1 shrink-0">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="font-serif text-xl font-medium text-foreground mb-2">Stop or Delete anytime</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Reply <code className="bg-cream px-1.5 py-0.5 rounded text-xs font-mono font-bold text-[#B0703E]">STOP</code> to instantly halt all messages. Reply <code className="bg-cream px-1.5 py-0.5 rounded text-xs font-mono font-bold text-[#B0703E]">DELETE</code> to wipe your history from our systems immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transcript Section */}
      <section className="section-padding bg-cream">
        <div className="container-narrow">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="heading-section mb-4">Inside a Reflection Session</h2>
            <p className="text-muted-foreground">
              A real, anonymised exchange from The Mirror Project by GenMyo, illustrating how the conversation unfolds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto font-sans">
            {/* Transcript 1 */}
            <div className="bg-white rounded-3xl p-6 border border-border/80 shadow-sm flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold text-accent tracking-widest uppercase mb-6 text-center border-b border-border/40 pb-3">
                  Register 1: Feeling Stuck & Busy
                </p>
                <div className="space-y-5">
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] font-semibold text-accent mb-1 tracking-wider uppercase">GenMyo</span>
                    <div className="bg-[#F4F0E7] text-[#1C1A16] rounded-2xl rounded-tl-none px-4 py-2.5 text-sm leading-relaxed max-w-[85%]">
                      What's been sitting with you this week?
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-semibold text-muted-foreground mb-1 tracking-wider uppercase">You</span>
                    <div className="bg-[#1C1A16] text-[#F4F0E7] rounded-2xl rounded-tr-none px-4 py-2.5 text-sm leading-relaxed max-w-[85%]">
                      I don't know. I've been busy but it doesn't feel like it's going anywhere.
                    </div>
                  </div>

                  <div className="flex flex-col items-start">
                    <span className="text-[10px] font-semibold text-accent mb-1 tracking-wider uppercase">GenMyo</span>
                    <div className="bg-[#F4F0E7] text-[#1C1A16] rounded-2xl rounded-tl-none px-4 py-2.5 text-sm leading-relaxed max-w-[85%]">
                      Busy is easy to measure. Let's try a harder one — what's one thing you did this week that you'd do again even if no one noticed?
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-center text-[10px] text-muted-foreground mt-6 italic">
                *Real exchange, shared with permission.
              </p>
            </div>

            {/* Transcript 2 */}
            <div className="bg-white rounded-3xl p-6 border border-border/80 shadow-sm flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold text-accent tracking-widest uppercase mb-6 text-center border-b border-border/40 pb-3">
                  Register 2: Before a Big Decision
                </p>
                <div className="space-y-5">
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] font-semibold text-accent mb-1 tracking-wider uppercase">GenMyo</span>
                    <div className="bg-[#F4F0E7] text-[#1C1A16] rounded-2xl rounded-tl-none px-4 py-2.5 text-sm leading-relaxed max-w-[85%]">
                      You mentioned you're standing before a big decision. What's the cost of choosing the path that feels "safer"?
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-semibold text-muted-foreground mb-1 tracking-wider uppercase">You</span>
                    <div className="bg-[#1C1A16] text-[#F4F0E7] rounded-2xl rounded-tr-none px-4 py-2.5 text-sm leading-relaxed max-w-[85%]">
                      If I stay, I keep my salary and routine. But I'll always wonder what if I tried.
                    </div>
                  </div>

                  <div className="flex flex-col items-start">
                    <span className="text-[10px] font-semibold text-accent mb-1 tracking-wider uppercase">GenMyo</span>
                    <div className="bg-[#F4F0E7] text-[#1C1A16] rounded-2xl rounded-tl-none px-4 py-2.5 text-sm leading-relaxed max-w-[85%]">
                      It sounds like staying borrows safety from your future self. What is one small step you can take today to test the other path without jumping yet?
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-center text-[10px] text-muted-foreground mt-6 italic">
                *Real exchange, shared with permission.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety boundary note */}
      <section className="py-8 bg-background">
        <div className="container-narrow">
          <div className="flex justify-center border-t border-border/40 pt-8">
            <div className="text-muted-foreground text-xs text-center max-w-xl leading-relaxed">
              <strong>Scope & Safety Boundary:</strong> GenMyo is not therapy, not a diagnostic tool, and not a crisis service. The Mirror Project by GenMyo is an aid for self-reflection and general wellness. It is not licensed therapy, does not offer clinical diagnosis, and is not a crisis monitoring service. If you are in mental distress or experiencing an emergency, please contact local professional emergency hotlines immediately.
            </div>
          </div>
        </div>
      </section>

      {/* Exploration Guides */}
      <section className="section-padding bg-[#F9F7F2] border-t border-border/40">
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
            <Link to="/feeling-disconnected" className="p-4 rounded-xl border border-border/60 hover:border-accent/40 bg-white transition-colors block text-sm font-medium text-foreground">
              Feeling Disconnected from Yourself →
            </Link>
            <Link to="/feeling-stuck" className="p-4 rounded-xl border border-border/60 hover:border-accent/40 bg-white transition-colors block text-sm font-medium text-foreground">
              What to Do When Feeling Stuck →
            </Link>
            <Link to="/self-awareness" className="p-4 rounded-xl border border-border/60 hover:border-accent/40 bg-white transition-colors block text-sm font-medium text-foreground">
              How to Practice Self-Awareness →
            </Link>
            <Link to="/inner-alignment" className="p-4 rounded-xl border border-border/60 hover:border-accent/40 bg-white transition-colors block text-sm font-medium text-foreground">
              A Guide to Inner Alignment →
            </Link>
            <Link to="/quiet-wellness" className="p-4 rounded-xl border border-border/60 hover:border-accent/40 bg-white transition-colors block text-sm font-medium text-foreground">
              Understanding Quiet Wellness →
            </Link>
            <Link to="/guided-reflection" className="p-4 rounded-xl border border-border/60 hover:border-accent/40 bg-white transition-colors block text-sm font-medium text-foreground">
              Guided Reflection Practices →
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-narrow text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-medium mb-8 leading-tight">
            Ready to try your first reflection?
          </h2>
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
              Your reflections are private. <Link to="/privacy" className="underline hover:text-gold transition-colors">What we store →</Link>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HowItWorks;
