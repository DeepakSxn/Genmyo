import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { MessageCircle, Wifi, Wind, Coffee, Moon, ArrowRight } from "lucide-react";

const faqs = [
  {
    q: "Why do I feel disconnected from myself?",
    a: "Disconnection is a protective mechanism. When the rate of external input — stress, decisions, notifications, expectations — exceeds your internal processing speed, your mind creates a buffer between you and your feelings. This prevents overload but leaves you feeling numb, on autopilot, or emotionally absent.",
  },
  {
    q: "Is feeling emotionally numb the same as feeling disconnected?",
    a: "They often come together. Emotional numbness is one expression of disconnection — the blunting of feelings as a side effect of that protective buffer. You can feel disconnected without being fully numb: present physically, absent from your own experience.",
  },
  {
    q: "I don't feel sad exactly. I just feel… nothing. Is that normal?",
    a: "Yes, and it's more common than people admit. 'Nothing' is often a feeling in disguise — accumulated tiredness, low-grade grief, or unprocessed stress that hasn't been given a name yet. Naming it is the first step to shifting it.",
  },
  {
    q: "How do I reconnect with myself when I feel like this?",
    a: "Intense introspection usually makes it worse. The most effective approach is narrow focus: one honest question, one honest answer, in a familiar space with no pressure. That's what The Mirror Project by GenMyo is designed to offer — a quiet check-in, not a deep excavation.",
  },
  {
    q: "Is this something I should see a therapist about?",
    a: "If disconnection is persistent, severe, or accompanied by distressing symptoms like depersonalization disorder, please consult a licensed professional. GenMyo is a self-awareness practice — not therapy, not a crisis service. For crisis support, contact a local mental health helpline.",
  },
];

const faqSchema = {
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
  "headline": "Feeling Disconnected from Yourself: Why It Happens & What Actually Helps",
  "description": "Feeling emotionally numb, on autopilot, or disconnected from yourself? Understand the psychology and find a gentle first step back — inside WhatsApp.",
  "publisher": {
    "@type": "Organization",
    "name": "GenMyo",
    "logo": { "@type": "ImageObject", "url": "https://genmyo.ai/favicon.png" },
  },
  "datePublished": "2026-07-16",
};

const signs = [
  { icon: Wifi, label: "Going through the motions", desc: "Physically present, mentally somewhere else. You complete tasks but feel like you're watching yourself do them from a distance." },
  { icon: Wind, label: "Can't name what you're feeling", desc: "Something is there — you can sense the weight of it — but when you try to put a word to it, you come up blank." },
  { icon: Moon, label: "Emotionally flat", desc: "Things that used to spark something — music, a conversation, a good meal — land without much resonance." },
  { icon: Coffee, label: "Constantly busy, zero clarity", desc: "Your schedule is full. Your mind is full. But there's no sense of moving toward anything. Just movement for its own sake." },
];

const FeelingDisconnected = () => {
  return (
    <Layout>
      <SEO
        title="Feeling Disconnected from Yourself: Why It Happens & What Helps | GenMyo"
        description="Emotionally numb? On autopilot? Can't name what you're feeling? Understand why disconnection happens and find a gentle, pressure-free first step back to yourself."
        jsonSchema={[faqSchema, articleSchema]}
      />

      {/* Hero */}
      <section className="bg-gradient-hero section-padding">
        <div className="container-narrow text-center">
          <p className="text-sm font-medium tracking-widest uppercase text-accent mb-6 animate-fade-up">
            Inner Wellness
          </p>
          <h1 className="heading-display text-foreground mb-6 animate-fade-up delay-100">
            Feeling Disconnected from Yourself
          </h1>
          <p className="text-body-large max-w-2xl mx-auto mb-10 animate-fade-up delay-150 text-muted-foreground">
            Not sad exactly. Not anxious exactly. Just… off. Present in the room but absent from your own experience. If that resonates, you're not alone — and there's a name for what you're going through.
          </p>
          <div className="bg-cream rounded-2xl p-6 border border-border/80 text-left max-w-2xl mx-auto animate-fade-up delay-200">
            <p className="text-body-large text-foreground font-serif leading-relaxed">
              Feeling disconnected from yourself is a real and common experience — a protective mechanism that kicks in when the world demands more than you can process. Understanding it is the first step. A single honest check-in is often the second.
            </p>
          </div>
        </div>
      </section>

      {/* Signs */}
      <section className="section-padding bg-background">
        <div className="container-wide px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-medium tracking-widest uppercase text-accent mb-4">Signs of Disconnection</p>
            <h2 className="heading-section text-foreground mb-4">
              How does inner disconnection actually show up?
            </h2>
            <p className="text-body-large">
              It rarely announces itself. It seeps in slowly, wearing the disguise of "just being tired" or "having a lot on."
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {signs.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="bg-cream border border-border/80 rounded-2xl p-7 flex gap-5 items-start">
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-accent/15 grid place-items-center text-accent">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-foreground mb-1">{label}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why it happens */}
      <section className="section-padding bg-cream">
        <div className="container-narrow">
          <div className="prose max-w-3xl mx-auto space-y-10">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                Why do I feel disconnected from myself?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Disconnection is your nervous system's way of protecting you. When the pace of external demands — decisions to make, things to perform, emotions to manage — outstrips your ability to process them, your mind creates distance between you and your inner experience. It blunts the signal.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                In the short term, this is adaptive. You keep functioning. You get through the meeting. But when the buffer stays up, you stop knowing how you feel. And when you stop knowing how you feel, you start making choices on autopilot — choices that move you further from what you actually need.
              </p>
            </div>

            {/* Data callout */}
            <div className="bg-secondary/40 p-6 rounded-2xl border-l-4 border-accent">
              <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-accent mb-2">
                Our research found
              </h4>
              <p className="text-foreground text-sm font-serif leading-relaxed italic">
                "72% of participants in our 100-conversations report described their primary state as 'disconnected' — not depressed, not anxious, just off. Structured, single-focus questions helped them ground themselves better than open-ended writing."
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                How do you reconnect with yourself when you feel numb?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Counterintuitively, intense introspection — "why do I feel this way? what's wrong with me? what should I do?" — tends to deepen the disconnection. You're asking an overwhelmed system to do more analytical work.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                What works better is narrowing the focus to one question, asked gently, in a low-pressure context. Not "what's wrong with your whole life?" but "what's taking up the most space in your mind right now?" One honest answer to one specific question often does more than a full evening of unstructured reflection.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                That's the design logic behind The Mirror Project by GenMyo. One question at a time. Inside WhatsApp. No blank page. No streak to maintain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mid-scroll CTA */}
      <section className="py-12 bg-background border-y border-border/40">
        <div className="container-narrow text-center">
          <p className="font-serif text-xl text-foreground mb-2">One question can be enough to start.</p>
          <p className="text-sm text-muted-foreground mb-6">
            No blank page. No app. Just a quiet check-in in WhatsApp, waiting when you're ready.
          </p>
          <Link
            to="/join?context=I've been feeling disconnected from myself"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium bg-[#B0703E] text-white rounded-full hover:opacity-90 transition-opacity shadow-sm"
          >
            <MessageCircle size={18} />
            Start your reflection →
          </Link>
          <p className="text-xs text-muted-foreground mt-3">Free · No app, no account, no card</p>
        </div>
      </section>

      {/* What helps vs. doesn't */}
      <section className="section-padding bg-background">
        <div className="container-wide px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-sm font-medium tracking-widest uppercase text-accent mb-4">Honest Comparison</p>
            <h2 className="heading-section text-foreground mb-4">
              What actually helps when you feel disconnected from yourself?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-secondary/30 rounded-2xl p-7 border border-border/60">
              <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                Often less helpful when disconnected
              </h3>
              <ul className="space-y-3">
                {[
                  "Broad open-ended journaling (\u201cwrite anything\u201d)",
                  "Asking 'why do I feel this way' in loops",
                  "Adding another habit or wellness app",
                  "Waiting until you feel 'ready' to reflect",
                  "Consuming more content about reconnecting",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                    <span className="text-border flex-shrink-0 mt-0.5">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-cream rounded-2xl p-7 border border-accent/30">
              <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-accent mb-4">
                What tends to create a shift
              </h3>
              <ul className="space-y-3">
                {[
                  "One specific, honest question asked for you",
                  "Responding in a familiar, low-pressure space",
                  "Naming the feeling, even if imprecisely",
                  "Small action that doesn't require feeling 'ready'",
                  "Not needing to fix it — just noticing it",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-foreground leading-relaxed">
                    <span className="text-accent flex-shrink-0 mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="section-padding bg-cream border-t border-border/40">
        <div className="container-narrow">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-serif text-2xl md:text-3xl text-foreground font-medium mb-3">
              Related inner wellness topics
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto text-center sm:text-left">
            {[
              ["/emotional-check-in", "How to Do an Emotional Check-In →"],
              ["/self-awareness", "How to Build Self-Awareness →"],
              ["/feeling-stuck", "What to Do When Feeling Stuck →"],
              ["/inner-alignment", "A Guide to Inner Alignment →"],
              ["/quiet-wellness", "Understanding Quiet Wellness →"],
              ["/guided-reflection", "Guided Reflection Practices →"],
            ].map(([to, label]) => (
              <Link
                key={to}
                to={to}
                className="p-4 rounded-xl border border-border/60 hover:border-accent/40 bg-background transition-colors block text-sm font-medium text-foreground"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-background border-t border-border/40">
        <div className="container-narrow">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-sm font-medium tracking-widest uppercase text-accent mb-4">Common Questions</p>
            <h2 className="font-serif text-2xl md:text-3xl text-foreground font-medium">
              Frequently asked about feeling disconnected
            </h2>
          </div>
          <div className="max-w-2xl mx-auto space-y-5">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-cream rounded-2xl border border-border/60 p-6">
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
            You don't need to fix it all at once.
          </h2>
          <p className="text-primary-foreground/70 max-w-lg mx-auto mb-8 text-base leading-relaxed">
            One honest check-in. One question asked for you. That's often enough to shift the feeling that nothing is shifting.
          </p>
          <div className="flex flex-col items-center">
            <Link
              to="/join?context=I've been feeling disconnected from myself"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium bg-gold text-gold-foreground rounded-full hover:opacity-90 transition-opacity"
            >
              <MessageCircle size={18} />
              Start your reflection →
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

export default FeelingDisconnected;
