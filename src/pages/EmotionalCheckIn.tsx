import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { MessageCircle, Heart, Compass, Zap, Brain, ArrowRight, CheckCircle } from "lucide-react";

const faqs = [
  {
    q: "What is an emotional check-in?",
    a: "An emotional check-in is the act of pausing to honestly ask yourself what you're feeling right now — not what you think you should feel, or what you felt yesterday, but your actual present-moment inner state. It's a practice of naming your experience before reacting to it.",
  },
  {
    q: "How often should I do an emotional check-in?",
    a: "There's no rule. Most people find a brief weekly check-in more sustainable and more honest than a daily one. The goal isn't frequency — it's genuine attention when you actually need it.",
  },
  {
    q: "Can AI help with self-reflection and emotional check-ins?",
    a: "Yes, when it's designed for it. GenMyo's Mirror Project asks one guided question at a time inside WhatsApp, gently walking you through a structured inner check-in without requiring a new app, subscription, or account.",
  },
  {
    q: "Is this therapy?",
    a: "No. An emotional check-in is a self-awareness practice, not a clinical treatment. If you are experiencing mental health symptoms that interfere with daily life, please reach out to a licensed professional. GenMyo is not a crisis service.",
  },
  {
    q: "How is this different from journaling?",
    a: "Journaling is self-directed writing — which is great, but often hard to start. GenMyo asks the questions for you, one at a time, inside a conversation. You respond like you would to a thoughtful friend. No blank page, no pressure.",
  },
];

const checkInSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map((f) => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": { "@type": "Answer", "text": f.a },
  })),
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to Do an Emotional Check-In: The Gentle Practice That Actually Works",
  "description": "Learn how a daily or weekly emotional check-in builds self-awareness without pressure. No blank pages, no apps — just a guided pause inside WhatsApp.",
  "publisher": {
    "@type": "Organization",
    "name": "GenMyo",
    "logo": { "@type": "ImageObject", "url": "https://genmyo.ai/favicon.png" },
  },
  "datePublished": "2026-07-16",
};

const EmotionalCheckIn = () => {
  return (
    <Layout>
      <SEO
        title="How to Do an Emotional Check-In — Without the Pressure | GenMyo"
        description="A daily or weekly emotional check-in helps you name what you're feeling before you react. No blank page, no app — just one guided question at a time inside WhatsApp."
        jsonSchema={[checkInSchema, articleSchema]}
      />

      {/* Hero */}
      <section className="bg-gradient-hero section-padding">
        <div className="container-narrow text-center">
          <p className="text-sm font-medium tracking-widest uppercase text-accent mb-6 animate-fade-up">
            Inner Wellness Practice
          </p>
          <h1 className="heading-display text-foreground mb-6 animate-fade-up delay-100">
            How to Do an Emotional Check-In
          </h1>
          <p className="text-body-large max-w-2xl mx-auto mb-10 animate-fade-up delay-150 text-muted-foreground">
            Not a mood tracker. Not a journaling habit. A simple, honest pause — one question at a time — so you know what's actually going on inside before the day gets away from you.
          </p>
          <div className="bg-cream rounded-2xl p-6 border border-border/80 text-left max-w-2xl mx-auto animate-fade-up delay-200">
            <p className="text-body-large text-foreground font-serif leading-relaxed">
              An emotional check-in is the act of pausing to honestly ask yourself what you're feeling right now — not what you think you should feel, but your actual present-moment inner state. It is the simplest form of self-awareness, and it is the thing most people skip.
            </p>
          </div>
        </div>
      </section>

      {/* Why it's hard */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="prose max-w-3xl mx-auto space-y-10">

            <div>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                Why checking in with yourself feels harder than it should
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                You know the feeling. Something's off — not broken, not in crisis, just slightly disconnected — and you can't quite name it. You're busy, so you push through. A week passes. The low hum doesn't leave; it just becomes familiar.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                The problem isn't that you lack self-awareness. It's that the standard tools — blank journals, mood apps, meditation streaks — all require you to already know what you're feeling before you start. A genuine check-in works differently: it asks the question <em>for</em> you, one at a time, slowly enough that an honest answer can surface.
              </p>
            </div>

            {/* Proprietary callout */}
            <div className="bg-secondary/40 p-6 rounded-2xl border-l-4 border-accent">
              <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-accent mb-2">
                What our research found
              </h4>
              <p className="text-foreground text-sm font-serif leading-relaxed italic">
                "In our 100-conversations research, 68% of participants said they felt emotionally clearer after one structured check-in than after an entire week of attempting to keep a journal. The difference was the question being asked for them, not by them."
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                The difference between an emotional check-in and journaling
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Journaling is a blank canvas — powerful when you know what you want to explore, paralysing when you don't. An emotional check-in is a guided conversation: someone (or something) asks you one specific, honest question, and you respond to it. No opening line to write. No pressure to fill a page.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                That's what The Mirror Project by GenMyo is. It asks the questions. You answer them in WhatsApp — the app already on your phone. The whole thing takes a few minutes and leaves you knowing something about yourself you didn't know before you started.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Mid-scroll CTA */}
      <section className="py-12 bg-cream border-y border-border/40">
        <div className="container-narrow text-center">
          <p className="font-serif text-xl text-foreground mb-2">Ready to try one right now?</p>
          <p className="text-sm text-muted-foreground mb-6">
            A gentle check-in is waiting. No app. No account. No blank page.
          </p>
          <Link
            to="/join"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium bg-[#B0703E] text-white rounded-full hover:opacity-90 transition-opacity shadow-sm"
          >
            <MessageCircle size={18} />
            Start your check-in on WhatsApp →
          </Link>
          <p className="text-xs text-muted-foreground mt-3">Free · No app setup required</p>
        </div>
      </section>

      {/* The 4 questions of a good check-in */}
      <section className="section-padding bg-background">
        <div className="container-wide px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-medium tracking-widest uppercase text-accent mb-4">The Practice</p>
            <h2 className="heading-section text-foreground mb-4">
              Four questions at the heart of every good emotional check-in
            </h2>
            <p className="text-body-large">
              You don't need to ask all four every time. One honest answer to one honest question is enough.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {[
              {
                icon: Heart,
                number: "01",
                q: "What am I actually feeling right now?",
                note: "Not 'fine.' Not 'stressed.' The real thing, named as precisely as you can.",
              },
              {
                icon: Brain,
                number: "02",
                q: "What's been taking up the most space in my mind today?",
                note: "Not the loudest thing — the heaviest. The one you keep circling back to.",
              },
              {
                icon: Compass,
                number: "03",
                q: "Is there something I've been avoiding that I already know I need to face?",
                note: "You usually already know the answer before you finish reading the question.",
              },
              {
                icon: Zap,
                number: "04",
                q: "What's one small thing that would make me feel more like myself today?",
                note: "Small. Specific. Yours — not what someone else would say you should do.",
              },
            ].map(({ icon: Icon, number, q, note }) => (
              <div
                key={number}
                className="bg-cream border border-border/80 rounded-2xl p-7 flex gap-5 items-start"
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-accent/15 grid place-items-center text-accent">
                  <Icon size={20} />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{number}</span>
                  <h3 className="font-serif text-lg text-foreground mt-1 mb-2 leading-snug">{q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed italic">{note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GenMyo vs. the alternatives */}
      <section className="section-padding bg-cream">
        <div className="container-wide px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">The GenMyo Difference</p>
            <h2 className="heading-section text-foreground mb-4">
              A gentle door instead of another article
            </h2>
            <p className="text-body-large">
              Calm, PsychCentral, and therapy blogs give you a 10-tip article and leave you to do the work alone. GenMyo asks the question for you and waits for your answer.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border/80 max-w-3xl mx-auto shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/60 bg-secondary/30">
                  {["", "Typical Wellness Article", "GenMyo Mirror Project"].map((h, i) => (
                    <th key={i} className="p-4 text-xs font-semibold uppercase tracking-wider text-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 text-sm">
                {[
                  ["Format", "Long listicle", "One question at a time in WhatsApp"],
                  ["Starting effort", "Read 1,500 words first", "Reply to one message"],
                  ["Who asks the questions", "You have to", "We do"],
                  ["App required", "Sometimes yes", "No — runs in WhatsApp"],
                  ["Cost", "Free (ad-supported)", "Free, no ads"],
                  ["Leaves you with", "More to-read bookmarks", "One honest answer about yourself"],
                ].map(([label, col1, col2], i) => (
                  <tr key={i}>
                    <td className="p-4 font-medium text-foreground">{label}</td>
                    <td className="p-4 text-muted-foreground">{col1}</td>
                    <td className="p-4 text-foreground font-medium">{col2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Related signals / semantic cluster */}
      <section className="section-padding bg-background border-t border-border/40">
        <div className="container-narrow">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-serif text-2xl md:text-3xl text-foreground font-medium mb-3">
              More on the inner wellness space
            </h2>
            <p className="text-sm text-muted-foreground">
              Explore connected topics — all journaling-free, all in the same quiet territory.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto text-center sm:text-left">
            {[
              ["/feeling-disconnected", "Feeling Disconnected from Yourself →"],
              ["/self-awareness", "How to Build Self-Awareness →"],
              ["/feeling-stuck", "What to Do When Feeling Stuck →"],
              ["/inner-alignment", "A Guide to Inner Alignment →"],
              ["/quiet-wellness", "Understanding Quiet Wellness →"],
              ["/guided-reflection", "Guided Reflection Practices →"],
            ].map(([to, label]) => (
              <Link
                key={to}
                to={to}
                className="p-4 rounded-xl border border-border/60 hover:border-accent/40 bg-cream/40 transition-colors block text-sm font-medium text-foreground"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-cream border-t border-border/40">
        <div className="container-narrow">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-sm font-medium tracking-widest uppercase text-accent mb-4">Common Questions</p>
            <h2 className="font-serif text-2xl md:text-3xl text-foreground font-medium">
              Frequently asked about emotional check-ins
            </h2>
          </div>
          <div className="max-w-2xl mx-auto space-y-5">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-background rounded-2xl border border-border/60 p-6">
                <h3 className="font-serif text-lg font-medium text-foreground mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-narrow text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-medium mb-4 leading-tight">
            Stop waiting to feel ready.
          </h2>
          <p className="text-primary-foreground/70 max-w-lg mx-auto mb-8 text-base leading-relaxed">
            A check-in takes a few minutes. The clarity you get from one honest answer can reframe the rest of your week.
          </p>
          <div className="flex flex-col items-center">
            <Link
              to="/join"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium bg-gold text-gold-foreground rounded-full hover:opacity-90 transition-opacity"
            >
              <MessageCircle size={18} />
              Start your emotional check-in on WhatsApp →
            </Link>
            <p className="text-xs text-primary-foreground/60 mt-4 leading-relaxed">
              Free · No app, no account, no card
              <br />
              Your reflections are private.{" "}
              <Link to="/privacy" className="underline hover:text-gold transition-colors font-medium">
                What we store →
              </Link>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default EmotionalCheckIn;
