import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { MessageCircle, Check, X } from "lucide-react";
import { trackCTAClickWhatsApp } from "@/lib/analytics";

const StoicAlternative = () => {
  const waUrl = "https://wa.me/message/Y4GOKBIGBWUUM1?text=I%27m%20ready%20to%20start%20my%20first%20reflection";

  const stoicSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "The Best App-Free Stoic App Alternative | GenMyo",
    "description": "Looking for a calm, distraction-free alternative to the Stoic app? Compare Stoic with The Mirror Project by GenMyo.",
    "lastReviewed": "2026-07-14"
  };

  return (
    <Layout>
      <SEO
        title="Stoic App Alternative — Calm & Conversational Reflection"
        description="Looking for an alternative to the Stoic app? Compare Stoic's visual tracking with the conversational, app-free experience of The Mirror Project by GenMyo."
        jsonSchema={stoicSchema}
      />

      {/* Hero */}
      <section className="bg-gradient-hero section-padding">
        <div className="container-narrow text-center">
          <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-6 animate-fade-up">
            Alternative Comparison
          </p>
          <h1 className="heading-display text-foreground mb-8 animate-fade-up delay-100">
            The App-Free Alternative to Stoic App
          </h1>
          <div className="text-sm text-muted-foreground mb-8 flex justify-center gap-4 animate-fade-up delay-150">
            <span>Last updated: July 14, 2026</span>
          </div>

          {/* 2-Sentence Standalone Answer Up Top */}
          <div className="bg-cream rounded-2xl p-6 border border-border/80 text-left max-w-2xl mx-auto mb-10 animate-fade-up delay-200">
            <p className="text-body-large text-foreground font-serif leading-relaxed">
              <strong>The best alternative to the Stoic app is The Mirror Project by GenMyo, which provides guided self-reflection sessions directly in WhatsApp.</strong> While the Stoic app is excellent for visual mood tracking, daily quotes, and gamified streak counters, GenMyo offers a quiet, un-gamified conversational interface focused solely on clarifying your thoughts without app setup or premium subscriptions.
            </p>
          </div>
        </div>
      </section>

      {/* Admitting Competitor Strengths */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <h2 className="font-serif text-2xl font-semibold text-foreground mb-6 text-center">Where Stoic Excels</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Stoic is a beautifully designed, premium app that provides an aesthetic and gamified journaling experience. It is highly recommended if you love tracking your daily mood scores on visual calendars, reading morning quotes, and completing pre-built meditation and breathing exercises. If keeping a streak and collecting achievement points keeps you motivated to journal, Stoic is the industry gold standard.
          </p>

          <h2 className="font-serif text-2xl font-semibold text-foreground mb-6 text-center">Why Members Choose The Mirror Project</h2>
          <p className="text-muted-foreground leading-relaxed mb-12">
            The Mirror Project by GenMyo is designed to offer an alternative to wellness gamification. We believe that self-reflection shouldn't feel like another app streak to maintain or another task to optimize. By conducting reflections inside WhatsApp, we strip away notification-induced anxiety, logins, and premium popups. You simply reply to a question when you are ready.
          </p>

          {/* Feature Matrix */}
          <div className="bg-white border border-border/80 rounded-3xl overflow-hidden shadow-sm mb-12">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/60 bg-secondary/30">
                  <th className="p-4 md:p-6 text-sm font-semibold uppercase tracking-wider text-foreground">Comparison</th>
                  <th className="p-4 md:p-6 text-sm font-semibold uppercase tracking-wider text-accent">GenMyo (The Mirror Project)</th>
                  <th className="p-4 md:p-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Stoic App</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 text-sm md:text-base">
                <tr>
                  <td className="p-4 md:p-6 font-medium text-foreground">Platform</td>
                  <td className="p-4 md:p-6 text-accent">WhatsApp (Native Chat)</td>
                  <td className="p-4 md:p-6 text-muted-foreground">iOS / Android App</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-6 font-medium text-foreground">Streaks & Gamification</td>
                  <td className="p-4 md:p-6 text-accent"><X size={18} className="inline mr-1 text-red-500" /> None</td>
                  <td className="p-4 md:p-6 text-muted-foreground"><Check size={18} className="inline mr-1 text-green-600" /> High (Streaks, Points)</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-6 font-medium text-foreground">Interaction style</td>
                  <td className="p-4 md:p-6 text-accent font-semibold">Conversational questions</td>
                  <td className="p-4 md:p-6 text-muted-foreground">Static templates & buttons</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-6 font-medium text-foreground">Premium paywall</td>
                  <td className="p-4 md:p-6 text-accent font-semibold">100% Free</td>
                  <td className="p-4 md:p-6 text-muted-foreground">Free basic / $9.99 month</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Question H2s */}
      <section className="section-padding bg-cream">
        <div className="container-narrow space-y-10">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-3">Why journal on WhatsApp instead of the Stoic app?</h2>
            <p className="text-[#4A463E] leading-relaxed">
              Stoic requires you to open a dedicated app, choose from templates, and complete multiple-choice prompts. The Mirror Project by GenMyo runs directly on WhatsApp so you can reflect without leaving your active chat channels. It feels less like completing a survey and more like a quiet, slow conversation with a supportive thought partner.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-3">Is it private? Can other people read my WhatsApp reflections?</h2>
            <p className="text-[#4A463E] leading-relaxed">
              Yes. All reflections are securely processed through AWS API endpoints. We do not sell your data, use entries for advertising, or analyze them for LLM foundation training. Additionally, your data can be wiped from our databases at any time by sending the command <code className="bg-white px-1.5 py-0.5 rounded text-xs font-mono font-bold text-[#B0703E]">DELETE</code>.
            </p>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-narrow text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-medium mb-8 leading-tight">
            Reflect on your terms. Try GenMyo today.
          </h2>
          <div className="flex flex-col items-center">
            <Link
              to="/join"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium bg-gold text-gold-foreground rounded-full hover:opacity-90 transition-opacity"
            >
              <MessageCircle size={18} />
              Start your reflection →
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

export default StoicAlternative;
