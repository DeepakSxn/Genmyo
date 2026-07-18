import { ChevronDown } from "lucide-react";

export const FAQSection = () => {
  const faqs = [
    {
      q: "What is GenMyo?",
      a: "GenMyo is an AI-guided inner-wellness platform built to support lasting human development through slow reflection, guidance, and self-awareness. It operates natively inside messaging platforms like WhatsApp, prioritizing quiet, self-directed reflection over the noise of typical wellness applications."
    },
    {
      q: "What is The Mirror Project?",
      a: "The Mirror Project is the core introductory experience of GenMyo. It is a free, 6-minute guided reflection session conducted entirely over WhatsApp. By asking a series of thoughtful, slow-paced questions, it helps you pause, clear away mental chatter, and identify what is actually happening in your life right now."
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
      a: "A standard reflection session takes about 6 minutes. However, because you are in control of the pace, you can take as long as you'd like to reply. The system will never rush or nudge you."
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <section id="faq" className="section-padding bg-background border-t border-border/20 scroll-mt-20">
        <div className="container-narrow">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <p className="text-sm font-medium tracking-widest uppercase text-accent mb-4">Support & Info</p>
            <h2 className="heading-section text-foreground">Frequently Asked Questions</h2>
          </div>

          {/*
            Native <details> — not Radix Accordion.
            Production serves prerendered HTML; Radix leaves closed panels empty and
            needs client JS to open. <details> works in static HTML and after React mounts.
          */}
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
              <strong>Scope & Safety Boundary:</strong> The Mirror Project by GenMyo is an aid for self-reflection and general wellness. It is not licensed therapy, does not offer clinical diagnosis, and is not a crisis monitoring service. If you are in mental distress or experiencing an emergency, please contact local professional emergency hotlines immediately.
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
