import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { ChevronDown, MessageCircle } from "lucide-react";
import { trackCTAClickWhatsApp } from "@/lib/analytics";

const FAQ = () => {
  const waUrl = "https://wa.me/message/Y4GOKBIGBWUUM1?text=I%27m%20ready%20to%20start%20my%20first%20reflection";

  const faqs = [
    {
      q: "What is GenMyo?",
      a: "GenMyo is an inner wellness platform delivered entirely through WhatsApp. Its core experience, The Mirror Project by GenMyo, is a guided reflection — a few honest questions, asked slowly, that help you reconnect with yourself and see what's actually going on. Not therapy. Not another app. No advice."
    },
    {
      q: "What is The Mirror Project?",
      a: "The Mirror Project is the core introductory experience of GenMyo. It is a free, 2-minute guided reflection session conducted entirely over WhatsApp. By asking a series of thoughtful, slow-paced questions, it helps you pause, clear away mental chatter, and identify what is actually happening in your life right now."
    },
    {
      q: "Is GenMyo a journaling app or a meditation app?",
      a: "No. GenMyo is not a journaling app, a diary, or a meditation library. There is no blank page to fill and no content to browse. The Mirror Project by GenMyo guides you through a short reflection by asking questions — you simply answer, at your own pace."
    },
    {
      q: "Is GenMyo safe for deep personal secrets?",
      a: "GenMyo uses secure API connections and AWS encryption. However, because it is an automated space, it is best used as a patient thought partner for clarity rather than a clinical vault for severe trauma. We prioritize your privacy, never sell your data, and explicitly exclude your reflections from AI model training weights."
    },
    {
      q: "Is it free?",
      a: "Yes. The Mirror Project is completely free to start and reflect. There are no hidden fees, subscriptions, or credit card requirements to start your daily or weekly sessions."
    },
    {
      q: "Do I need to download an app?",
      a: "No. GenMyo runs directly within WhatsApp. There are no accounts to create, passwords to remember, or new applications to install on your phone. You reflect using the interface you already interact with daily."
    },
    {
      q: "How long does a reflection take?",
      a: "A standard reflection session takes about 2 minutes. However, because you are in control of the pace, you can take as long as you'd like to reply. The system will never rush or nudge you."
    },
    {
      q: "Is it private? Can a human read my reflections?",
      a: "Yes, it is private by default. Your reflection transcripts are processed programmatically. No human at GenMyo reads your reflections unless you explicitly flag a session for technical support or raise a safety concern. We never sell, rent, or share your transcripts with third parties or advertisers."
    },
    {
      q: "Do you use my reflections to train AI?",
      a: "No. We process your reflections using secure API endpoints that explicitly exclude private user reflections from training foundation language models. Your inputs remain entirely your own."
    },
    {
      q: "Is this therapy? Can it replace a therapist?",
      a: "No, GenMyo is not therapy, clinical psychology, or psychiatric care. We do not diagnose, treat, or provide clinical advice. Guided reflection is a wellness practice designed for self-discovery and clarity. If you need mental health care, we strongly encourage you to seek a licensed professional."
    },
    {
      q: "What if I'm in crisis?",
      a: "GenMyo is not a crisis monitoring service. If you are in distress, self-harming, or experiencing a mental health emergency, please seek immediate help. You can contact these verified, confidential resources:\n- **United States:** Call or text 988 (988 Suicide & Crisis Lifeline)\n- **United Kingdom:** Call 116 123 (Samaritans)\n- **India:** Call +91-9820466726 (AASRA) or +91-9999666555 (Vandrevala Foundation)\n- **International:** Visit [Find A Helpline](https://findahelpline.com/) to find immediate support in your country."
    },
    {
      q: "Will you message me if I don't reply?",
      a: "No. We only message you when you initiate a session. We do not use engagement algorithms, pushy reminders, or spam notifications. You can end automated prompts at any time by replying STOP."
    },
    {
      q: "Who is GenMyo for?",
      a: "GenMyo is designed for anyone feeling busy, stuck, or overwhelmed who wants to build self-awareness and self-reflection habits. It is particularly helpful for people looking for a low-friction, private way to clear their mind without adopting complex productivity systems or downloading more apps."
    },
    {
      q: "How do I start?",
      a: "Simply click any of our CTA buttons to start. This will open WhatsApp with a prefilled message. Once you send that first message, our AI-guided assistant will walk you through your first reflection session."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://genmyo.ai/faq#faqpage",
    "isPartOf": { "@id": "https://genmyo.ai/#website" },
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a.replace(/\n/g, " ")
      }
    }))
  };

  return (
    <Layout>
      <SEO
        title="GenMyo FAQ — Is It Free? Is It Private? Is It Therapy?"
        description="Straight answers about The Mirror Project: cost, privacy, data, whether AI reads your reflections, whether this replaces therapy, and how to stop at any time."
        jsonSchema={faqSchema}
      />

      {/* Hero */}
      <section className="bg-gradient-hero section-padding min-h-[45vh] flex items-center justify-center">
        <div className="container-narrow text-center flex flex-col items-center justify-center">
          <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-6 animate-fade-up">
            Support & Info
          </p>
          <h1 className="heading-display text-foreground mb-8 animate-fade-up delay-100">
            Frequently Asked Questions
          </h1>
          <p className="text-body-large max-w-2xl mx-auto animate-fade-up delay-200">
            GenMyo is an inner wellness platform delivered entirely through WhatsApp. Its core experience, The Mirror Project by GenMyo, is a guided reflection — a few honest questions, asked slowly, that help you reconnect with yourself and see what's actually going on. Not therapy. Not another app. No advice.
          </p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="bg-white border border-border/80 rounded-3xl p-6 md:p-8 shadow-sm">
            <div className="w-full">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="border-b border-border py-2 group last:border-b-0"
                >
                  <summary className="flex flex-1 cursor-pointer list-none items-center justify-between py-4 font-serif text-lg md:text-xl font-medium text-[#1C1A16] hover:text-[#B0703E] text-left transition-colors [&::-webkit-details-marker]:hidden">
                    {faq.q}
                    <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <div className="pb-4 pt-2 text-sm md:text-base text-[#4A463E] leading-relaxed whitespace-pre-line">
                    {faq.a.includes("https") || faq.a.includes("Find A Helpline") ? (
                      <>
                        GenMyo is not a crisis monitoring service. If you are in distress, self-harming, or experiencing a mental health emergency, please seek immediate help. You can contact these verified, confidential resources:
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                          <li><strong>United States:</strong> Call or text 988 (988 Suicide & Crisis Lifeline)</li>
                          <li><strong>United Kingdom:</strong> Call 116 123 (Samaritans)</li>
                          <li><strong>India:</strong> Call +91-9820466726 (AASRA) or +91-9999666555 (Vandrevala Foundation)</li>
                          <li><strong>International:</strong> Visit <a href="https://findahelpline.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#B0703E]">Find A Helpline</a> to find immediate support in your country.</li>
                        </ul>
                      </>
                    ) : (
                      faq.a
                    )}
                  </div>
                </details>
              ))}
            </div>
          </div>
          <div className="flex justify-center border-t border-border/40 pt-8 mt-10">
            <div className="text-muted-foreground text-xs text-center max-w-xl leading-relaxed">
              <strong>Scope & Safety Boundary:</strong> GenMyo is not therapy, not a diagnostic tool, and not a crisis service. The Mirror Project by GenMyo is an aid for self-reflection and general wellness. It is not licensed therapy, does not offer clinical diagnosis, and is not a crisis monitoring service. If you are in mental distress or experiencing an emergency, please contact local professional emergency hotlines immediately.
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-narrow text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-medium mb-8 leading-tight">
            Still have questions? Try a session.
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

export default FAQ;
