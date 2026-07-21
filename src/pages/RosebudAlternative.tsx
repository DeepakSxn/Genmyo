import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { MessageCircle, Check, X } from "lucide-react";
import { trackCTAClickWhatsApp } from "@/lib/analytics";

const RosebudAlternative = () => {
  const waUrl = "https://wa.me/message/Y4GOKBIGBWUUM1?text=I%27m%20ready%20to%20start%20my%20first%20reflection";

  const rosebudSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "The Best App-Free Rosebud Journal Alternative | GenMyo",
    "description": "Looking for a quiet, app-free alternative to Rosebud? Compare Rosebud with The Mirror Project by GenMyo to find the right guided journaling tool.",
    "lastReviewed": "2026-07-14"
  };

  return (
    <Layout>
      <SEO
        title="Rosebud Journal Alternative — Quiet & App-Free Reflection"
        description="Looking for an alternative to Rosebud? Compare Rosebud with The Mirror Project by GenMyo. Learn why WhatsApp-native reflection is the quiet choice."
        jsonSchema={rosebudSchema}
      />

      {/* Hero */}
      <section className="bg-gradient-hero section-padding min-h-[50vh] flex items-center justify-center">
        <div className="container-narrow text-center flex flex-col items-center justify-center">
          <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-6 animate-fade-up">
            Alternative Comparison
          </p>
          <h1 className="heading-display text-foreground mb-8 animate-fade-up delay-100">
            The App-Free Alternative to Rosebud
          </h1>
          <div className="text-sm text-muted-foreground mb-8 flex justify-center gap-4 animate-fade-up delay-150">
            <span>Last updated: July 14, 2026</span>
          </div>

          {/* 2-Sentence Standalone Answer Up Top */}
          <div className="bg-cream rounded-2xl p-6 border border-border/80 text-left max-w-2xl mx-auto mb-10 animate-fade-up delay-200">
            <p className="text-body-large text-foreground font-serif leading-relaxed">
              <strong>The best app-free alternative to Rosebud is The Mirror Project by GenMyo, which runs entirely inside WhatsApp without any downloads or subscriptions.</strong> While Rosebud offers structured desktop dashboards and habit tracker grids, GenMyo prioritizes a quiet, text-native conversational interface to eliminate setup friction and app fatigue.
            </p>
          </div>
        </div>
      </section>

      {/* Admitting Competitor Strengths */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <h2 className="font-serif text-2xl font-semibold text-foreground mb-6 text-center">Where Rosebud Excels</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Rosebud is a powerful and beautifully built tool. It is an excellent choice if you want to keep a long-term database of your entries, track your mood on interactive calendars, or map out detailed goal progress with a structured digital dashboard. If you enjoy having a dedicated app icon and visual workspace on your phone or desktop, Rosebud is highly recommended.
          </p>

          <h2 className="font-serif text-2xl font-semibold text-foreground mb-6 text-center">Why Members Choose The Mirror Project</h2>
          <p className="text-muted-foreground leading-relaxed mb-12">
            The Mirror Project by GenMyo is designed for individuals who find dedicated journaling apps high-maintenance or anxiety-inducing. By moving the conversation into WhatsApp, we eliminate the friction of learning a new interface, notifications, and subscription paywalls. You answer one honest question at a time and leave with clarity in 2 minutes.
          </p>

          {/* Feature Matrix */}
          <div className="bg-white border border-border/80 rounded-3xl overflow-hidden shadow-sm mb-12">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/60 bg-secondary/30">
                  <th className="p-4 md:p-6 text-sm font-semibold uppercase tracking-wider text-foreground">Comparison</th>
                  <th className="p-4 md:p-6 text-sm font-semibold uppercase tracking-wider text-accent">GenMyo (The Mirror Project)</th>
                  <th className="p-4 md:p-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Rosebud</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 text-sm md:text-base">
                <tr>
                  <td className="p-4 md:p-6 font-medium text-foreground">Platform</td>
                  <td className="p-4 md:p-6 text-accent">WhatsApp (Native Chat)</td>
                  <td className="p-4 md:p-6 text-muted-foreground">Web / iOS / Android App</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-6 font-medium text-foreground">App Download</td>
                  <td className="p-4 md:p-6 text-accent"><X size={18} className="inline mr-1 text-red-500" /> None</td>
                  <td className="p-4 md:p-6 text-muted-foreground"><Check size={18} className="inline mr-1 text-green-600" /> Required</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-6 font-medium text-foreground">Friction level</td>
                  <td className="p-4 md:p-6 text-accent font-semibold">1-click to start</td>
                  <td className="p-4 md:p-6 text-muted-foreground">Requires sign-up & tour</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-6 font-medium text-foreground">Premium paywall</td>
                  <td className="p-4 md:p-6 text-accent font-semibold">100% Free</td>
                  <td className="p-4 md:p-6 text-muted-foreground">Limited free / $12.99 month</td>
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
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-3">Why journal on WhatsApp instead of Rosebud?</h2>
            <p className="text-[#4A463E] leading-relaxed">
              Friction is the single biggest reason self-reflection routines fail. Setting up Rosebud requires installing an application, configuring accounts, and responding to notifications. The Mirror Project by GenMyo utilizes WhatsApp because it is already part of your daily routine. Reflecting requires no new habits—just replying to a message.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-3">Is my data secure on a WhatsApp alternative?</h2>
            <p className="text-[#4A463E] leading-relaxed">
              Yes. All messages are securely processed over Meta's API directly to our servers. We never sell, share, or analyze your reflections for commercial marketing, and unlike raw AI tools, your private entries are completely excluded from foundational model training. You can delete all data at any point by typing <code className="bg-white px-1.5 py-0.5 rounded text-xs font-mono font-bold text-[#B0703E]">DELETE</code>.
            </p>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-narrow text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-medium mb-8 leading-tight">
            Try a simpler, app-free reflection.
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

export default RosebudAlternative;
