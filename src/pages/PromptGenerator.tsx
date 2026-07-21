import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { MessageCircle, RefreshCw, Compass, ArrowRight, Sparkles } from "lucide-react";
import { trackCTAClickWhatsApp } from "@/lib/analytics";

interface PromptScenario {
  id: string;
  label: string;
  description: string;
  icon: typeof Compass;
  questions: string[];
  waText: string;
}

const scenarios: PromptScenario[] = [
  {
    id: "career",
    label: "I feel stuck in my career",
    description: "Clarify your professional trajectory, boundaries, and alignment.",
    icon: Compass,
    questions: [
      "What was the single moment this week where you felt most alive or engaged at work?",
      "If you could remove one recurring task from your schedule without penalty, what would it be?",
      "Are you climbing this career ladder for the compensation, the learning, or the status?",
      "What is a boundary you've let slide at work that is draining your evening energy?",
      "If you were guaranteed not to fail, what small pivot would you start planning today?"
    ],
    waText: "I'd like to reflect on my career path"
  },
  {
    id: "overwhelm",
    label: "I am overwhelmed by tasks",
    description: "Calm a racing mind, brain-dump, and isolate the top priority.",
    icon: Compass,
    questions: [
      "What is the single task you are actively avoiding today, and what fear is attached to it?",
      "If you could only complete one action item to feel satisfied tonight, what would it be?",
      "What percentage of your current to-do list was written to satisfy other people's urgency?",
      "Where can you choose 'good enough' instead of perfection to save two hours today?",
      "What is one thing you can explicitly delegate or postpone until next week?"
    ],
    waText: "I'd like to reflect on task overwhelm"
  },
  {
    id: "decision",
    label: "I have a difficult decision to make",
    description: "Weigh options objectively and strip away temporary fear.",
    icon: Compass,
    questions: [
      "What is the absolute worst-case scenario for each option, and how would you recover?",
      "How will you feel about this decision in 10 minutes? In 10 months? In 10 years?",
      "Who are you trying to protect or please with the option you are leaning toward?",
      "If both options paid the exact same and had no public status, which would you choose?",
      "What advice would you give a close friend facing this exact dilemma?"
    ],
    waText: "I'd like to reflect on a hard decision"
  },
  {
    id: "meh",
    label: "I am feeling stagnant or 'meh'",
    description: "Navigate languishing, low motivation, and day-to-day monotony.",
    icon: Compass,
    questions: [
      "When was the last time you did something purely for play, with zero optimization or goal?",
      "Is your body exhausted, or is your mind bored with the repetition?",
      "What is one small change in your physical environment you can make right now?",
      "If you had to describe your current state in three words, what would they be?",
      "What is a tiny, low-stakes curiosity you've ignored because it 'doesn't make money'?"
    ],
    waText: "I'd like to reflect on feeling stagnant"
  }
];

const PromptGenerator = () => {
  const [selectedScenario, setSelectedScenario] = useState<PromptScenario>(scenarios[0]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleScenarioChange = (scenario: PromptScenario) => {
    setIsGenerating(true);
    setTimeout(() => {
      setSelectedScenario(scenario);
      setIsGenerating(false);
    }, 450);
  };

  const getWaLink = (text: string) => {
    return `https://wa.me/message/Y4GOKBIGBWUUM1?text=${encodeURIComponent(text)}`;
  };

  const generatorSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Reflection Prompt Generator",
    "description": "Generate customized self-reflection questions instantly. No signup required. Select your situation and reflect directly inside WhatsApp.",
    "applicationCategory": "Mindfulness / Wellness Application",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript. Requires HTML5."
  };

  return (
    <Layout>
      <SEO
        title="Free Reflection Prompt Generator — No Sign-up | GenMyo"
        description="Stuck, overwhelmed, or facing a big decision? Select your scenario and instantly generate 5 tailored reflection questions. No sign-up required."
        jsonSchema={generatorSchema}
      />

      {/* Hero */}
      <section className="bg-gradient-hero section-padding min-h-[40vh] flex items-center justify-center">
        <div className="container-narrow text-center flex flex-col items-center justify-center">
          <p className="text-sm font-medium tracking-widest uppercase text-accent mb-6 animate-fade-up">
            Interactive Tool
          </p>
          <h1 className="heading-display text-foreground mb-6 animate-fade-up delay-100">
            Reflection Prompt Generator
          </h1>
          <p className="text-body-large max-w-2xl mx-auto mb-8 animate-fade-up delay-150 text-muted-foreground">
            Select your current bottleneck. Get five targeted reflection questions to cut through the noise.
          </p>
        </div>
      </section>

      {/* Tool Container */}
      <section className="section-padding bg-background border-t border-border/40">
        <div className="container-wide px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
            
            {/* Left Column: Situation Selection */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                1. What is your current state?
              </h3>
              <div className="space-y-3">
                {scenarios.map((scenario) => {
                  const Icon = scenario.icon;
                  const isSelected = selectedScenario.id === scenario.id;
                  return (
                    <button
                      key={scenario.id}
                      onClick={() => handleScenarioChange(scenario)}
                      className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 ${
                        isSelected
                          ? "bg-cream border-accent shadow-sm"
                          : "bg-white border-border/60 hover:border-border hover:bg-secondary/20"
                      }`}
                    >
                      <div className="flex gap-4">
                        <div className={`w-10 h-10 rounded-xl grid place-items-center ${
                          isSelected ? "bg-accent/15 text-accent" : "bg-secondary/40 text-muted-foreground"
                        }`}>
                          <Icon size={18} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-serif text-base font-semibold text-foreground">
                            {scenario.label}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                            {scenario.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Generated Prompts Card */}
            <div className="lg:col-span-7">
              <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                2. Your Custom Prompts
              </h3>
              
              <div className="bg-cream border border-border/80 rounded-3xl p-8 shadow-sm space-y-8 relative overflow-hidden min-h-[420px] flex flex-col justify-between">
                
                {/* Backdrop design element */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/5 rounded-full filter blur-3xl pointer-events-none" />

                <div className={`space-y-6 transition-opacity duration-300 ${isGenerating ? "opacity-30" : "opacity-100"}`}>
                  <div className="flex justify-between items-center border-b border-border/60 pb-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-accent flex items-center gap-1.5">
                      <Sparkles size={14} />
                      {selectedScenario.label}
                    </span>
                    <span className="text-xs text-muted-foreground">5 prompts</span>
                  </div>

                  <ul className="space-y-4">
                    {selectedScenario.questions.map((q, idx) => (
                      <li key={idx} className="flex gap-4 items-start">
                        <span className="font-serif text-sm font-bold text-accent/60 mt-0.5 bg-white border border-border/40 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                          {idx + 1}
                        </span>
                        <p className="text-sm md:text-base text-foreground leading-relaxed">
                          {q}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4 pt-6 border-t border-border/60">
                  <a
                    href={getWaLink(selectedScenario.waText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 w-full text-base font-medium bg-[#B0703E] text-white rounded-full hover:opacity-90 transition-opacity shadow-sm"
                    onClick={() => trackCTAClickWhatsApp(`generator_${selectedScenario.id}`, getWaLink(selectedScenario.waText))}
                  >
                    <MessageCircle size={18} />
                    Reflect on WhatsApp — Free
                  </a>
                  <p className="text-xs text-muted-foreground text-center leading-relaxed">
                    Free · Pre-loads your scenario · No signup required
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-narrow text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-medium mb-8 leading-tight">
            Take a 2-minute pause from the noise.
          </h2>
          <div className="flex flex-col items-center">
            <a
              href="https://wa.me/message/Y4GOKBIGBWUUM1?text=I%27m%20ready%20to%20start%20my%20first%20reflection"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium bg-gold text-gold-foreground rounded-full hover:opacity-90 transition-opacity"
              onClick={() => trackCTAClickWhatsApp("generator_closing_cta", "https://wa.me/message/Y4GOKBIGBWUUM1")}
            >
              <MessageCircle size={18} />
              Open WhatsApp directly
            </a>
            <p className="text-xs text-primary-foreground/60 mt-4 leading-relaxed">
              Free · No app, no account, no card
              <br />
              All reflections are private. <Link to="/privacy" className="underline hover:text-gold transition-colors font-medium">Read our Privacy Policy →</Link>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PromptGenerator;
