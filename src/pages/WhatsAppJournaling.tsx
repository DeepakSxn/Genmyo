import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { MessageCircle, ShieldCheck, Check, X, RefreshCw } from "lucide-react";
import { trackCTAClickWhatsApp } from "@/lib/analytics";

const WhatsAppJournaling = () => {
  const waUrl = "https://wa.me/message/Y4GOKBIGBWUUM1?text=I%27m%20ready%20to%20start%20my%20first%20reflection";

  const journalingSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "WhatsApp Journaling with The Mirror Project by GenMyo",
    "description": "Reflect and journal natively inside WhatsApp without downloading another application. Free, private, and guided.",
    "publisher": {
      "@type": "Organization",
      "name": "GenMyo",
      "logo": {
        "@type": "ImageObject",
        "url": "https://genmyo.ai/favicon.png"
      }
    }
  };

  return (
    <Layout>
      <SEO
        title="WhatsApp Journaling — Reflect and Journal Without Downloading an App"
        description="Ditch the noise. The Mirror Project by GenMyo lets you journal and reflect natively inside WhatsApp. Free, secure, private, and ready in 2 minutes."
        jsonSchema={journalingSchema}
      />

      {/* Hero */}
      <section className="bg-gradient-hero section-padding min-h-[50vh] flex items-center justify-center">
        <div className="container-narrow text-center flex flex-col items-center justify-center">
          <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-6 animate-fade-up">
            Zero Install Journaling
          </p>
          <h1 className="heading-display text-foreground mb-8 animate-fade-up delay-100">
            Journal & Reflect <br />
            <span className="text-accent italic font-serif">natively inside WhatsApp.</span>
          </h1>
          <p className="text-body-large max-w-2xl mx-auto animate-fade-up delay-200">
            Traditional journaling apps demand downloads, log-ins, and paid subscriptions. 
            The Mirror Project by GenMyo lets you reflect in under 2 minutes, using the chat interface you already use every day.
          </p>
        </div>
      </section>

      {/* Why WhatsApp Journaling */}
      <section className="section-padding bg-background">
        <div className="container-wide px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="heading-section text-foreground mb-4">
              Why Journaling on WhatsApp is Different
            </h2>
            <p className="text-muted-foreground">
              Most digital journals feel like another task on your to-do list. GenMyo went the other way.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-cream rounded-2xl p-8 border border-border">
              <h3 className="font-serif text-xl font-medium text-foreground mb-3">No New App to Install</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                You don't need another app icon cluttering your screen, sending pushy notifications, or requiring updates. Simply open WhatsApp and start writing.
              </p>
            </div>

            <div className="bg-cream rounded-2xl p-8 border border-border">
              <h3 className="font-serif text-xl font-medium text-foreground mb-3">Guided Conversations</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Staring at a blank page is intimidating. GenMyo guides you with single, slow questions that help you name what you are feeling without the pressure to write a memoir.
              </p>
            </div>

            <div className="bg-cream rounded-2xl p-8 border border-border">
              <h3 className="font-serif text-xl font-medium text-foreground mb-3">Reflect at Your Own Pace</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                There are no daily streaks or optimization scores to keep up. Reply immediately or three hours later—your reflection session stays open and wait-free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section-padding bg-cream">
        <div className="container-narrow">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="heading-section mb-4">Compare Your Options</h2>
            <p className="text-muted-foreground">
              How The Mirror Project by GenMyo compares to traditional journaling formats.
            </p>
          </div>

          <div className="bg-white border border-border/80 rounded-3xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/60 bg-secondary/30">
                  <th className="p-4 md:p-6 text-sm font-semibold uppercase tracking-wider text-foreground">Feature</th>
                  <th className="p-4 md:p-6 text-sm font-semibold uppercase tracking-wider text-accent">GenMyo WhatsApp</th>
                  <th className="p-4 md:p-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Traditional Apps</th>
                  <th className="p-4 md:p-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Paper Journal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 text-sm md:text-base">
                <tr>
                  <td className="p-4 md:p-6 font-medium text-foreground">Setup time</td>
                  <td className="p-4 md:p-6 text-accent font-semibold">&lt; 30 seconds</td>
                  <td className="p-4 md:p-6 text-muted-foreground">3–5 minutes</td>
                  <td className="p-4 md:p-6 text-muted-foreground">Varies (must buy book)</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-6 font-medium text-foreground">App download</td>
                  <td className="p-4 md:p-6 text-accent"><X size={18} className="inline mr-1 text-red-500" /> None required</td>
                  <td className="p-4 md:p-6 text-muted-foreground"><Check size={18} className="inline mr-1 text-green-600" /> Mandatory download</td>
                  <td className="p-4 md:p-6 text-muted-foreground"><X size={18} className="inline mr-1 text-red-500" /> None</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-6 font-medium text-foreground">Cost</td>
                  <td className="p-4 md:p-6 text-accent font-semibold"><Check size={18} className="inline mr-1 text-green-600" /> Free to reflect</td>
                  <td className="p-4 md:p-6 text-muted-foreground">Free trial / $10+ month</td>
                  <td className="p-4 md:p-6 text-muted-foreground">Cost of physical book</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-6 font-medium text-foreground">Guided prompts</td>
                  <td className="p-4 md:p-6 text-accent"><Check size={18} className="inline mr-1 text-green-600" /> Interactive & responsive</td>
                  <td className="p-4 md:p-6 text-muted-foreground">Static templates</td>
                  <td className="p-4 md:p-6 text-muted-foreground"><X size={18} className="inline mr-1 text-red-500" /> None (blank page)</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-6 font-medium text-foreground">Streaks / Gamification</td>
                  <td className="p-4 md:p-6 text-accent"><X size={18} className="inline mr-1 text-red-500" /> None (no anxiety)</td>
                  <td className="p-4 md:p-6 text-muted-foreground">High (points & popups)</td>
                  <td className="p-4 md:p-6 text-muted-foreground"><X size={18} className="inline mr-1 text-red-500" /> None</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Objection Killing Q&A */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="heading-section mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Addressing your primary security and experience questions.
            </p>
          </div>

          <div className="space-y-8 max-w-3xl mx-auto">
            <div>
              <h3 className="font-serif text-xl font-medium text-foreground mb-2">Is journaling on WhatsApp secure and private?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Yes. Your reflections are processed programmatically. We do not sell your data or share transcripts with Meta. Furthermore, your data is never used to train baseline AI models. Your thoughts remain private and secure on our AWS server integrations.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-xl font-medium text-foreground mb-2">Why journal on WhatsApp instead of a standard app?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Friction. Most journaling apps are forgotten because they require you to build a new habit around a new app. WhatsApp is already integrated into your routine. By reflection inside your active channels, starting a session is as simple as replying to a text message.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-xl font-medium text-foreground mb-2">What happens if I want to stop?</h3>
              <p className="text-muted-foreground leading-relaxed">
                You are in complete control. Reply <code className="bg-cream px-1.5 py-0.5 rounded text-xs font-mono font-bold text-[#B0703E]">STOP</code> to instantly halt all messages. Reply <code className="bg-cream px-1.5 py-0.5 rounded text-xs font-mono font-bold text-[#B0703E]">DELETE</code> to wipe your reflection history forever. We don't send unprompted reminders or marketing follow-ups.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Boundaries Block */}
      <section className="section-padding bg-cream border-t border-border/80">
        <div className="container-narrow">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="font-serif text-2xl font-medium text-foreground">Our Boundaries</h3>
            <p className="text-sm text-muted-foreground mt-2">
              GenMyo supports inner development but is not a clinical tool.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="border-l-[2px] border-accent pl-5">
              <h4 className="font-semibold text-foreground mb-1">It is not therapy</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We do not diagnose or offer medical treatment. Guided reflections are meant for general self-awareness and wellness purposes.
              </p>
            </div>
            <div className="border-l-[2px] border-accent pl-5">
              <h4 className="font-semibold text-foreground mb-1">It is not a crisis service</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                If you are in distress or experiencing a mental health crisis, please contact local professional emergency hotlines or refer to our <a href="#faq" className="underline hover:text-accent font-medium">crisis resources list</a> immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-narrow text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-medium mb-8 leading-tight">
            Reflect natively. Try WhatsApp Journaling today.
          </h2>
          <div className="flex flex-col items-center">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium bg-gold text-gold-foreground rounded-full hover:opacity-90 transition-opacity"
              onClick={() => trackCTAClickWhatsApp("whatsapp_journaling_closing", waUrl)}
            >
              <MessageCircle size={18} />
              Start your reflection on WhatsApp
            </a>
            <p className="text-xs text-primary-foreground/60 mt-4 leading-relaxed">
              Free · About 2 minutes · No app, no account, no card
              <br />
              Your reflections are private. <Link to="/privacy" className="underline hover:text-gold transition-colors">What we store →</Link>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default WhatsAppJournaling;
