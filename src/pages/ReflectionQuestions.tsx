import { Link, useParams, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { MessageCircle, HelpCircle, CheckSquare, ArrowLeft } from "lucide-react";
import { trackCTAClickWhatsApp } from "@/lib/analytics";
import { reflectionQuestionsLibrary } from "@/data/reflectionQuestions";

interface ReflectionQuestionsProps {
  situation?: string;
}

const ReflectionQuestions = ({ situation: propSituation }: ReflectionQuestionsProps) => {
  const { situation: paramSituation } = useParams<{ situation: string }>();
  const situation = propSituation || paramSituation;
  const data = situation ? reflectionQuestionsLibrary[situation] : null;

  if (!data) {
    return <Navigate to="/404" replace />;
  }

  const waUrl = `https://wa.me/message/Y4GOKBIGBWUUM1?text=I%27d%20like%20to%20reflect%20on%20${encodeURIComponent(data.situation.toLowerCase())}`;

  // ItemList Schema for the questions to win SERP Rich Snippets
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `${data.situation} Reflection Questions`,
    "description": data.introduction,
    "numberOfItems": data.questions.length,
    "itemListElement": data.questions.map((q, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": q
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://genmyo.ai"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": data.pillarName,
        "item": `https://genmyo.ai/${data.pillarSlug}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": data.situation,
        "item": `https://genmyo.ai/reflection-questions/${data.slug}`
      }
    ]
  };

  const combinedSchema = [itemListSchema, breadcrumbSchema];

  return (
    <Layout>
      <SEO
        title={`${data.situation} — Guided Reflection Questions | GenMyo`}
        description={data.introduction.slice(0, 160)}
        jsonSchema={combinedSchema}
      />

      {/* Hero */}
      <section className="bg-gradient-hero section-padding">
        <div className="container-narrow">
          <div className="mb-6">
            <Link
              to={`/${data.pillarSlug}`}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent hover:underline"
            >
              <ArrowLeft size={14} />
              Back to {data.pillarName} Pillar
            </Link>
          </div>
          
          <h1 className="heading-display text-foreground mb-8 animate-fade-up">
            {data.situation}: Guided Prompts
          </h1>
          
          <div className="text-sm text-muted-foreground mb-8 flex gap-4 animate-fade-up delay-100">
            <span>Methodology: Qualitative Analysis</span>
            <span>•</span>
            <span>Last reviewed: July 14, 2026</span>
          </div>

          {/* 150-Word Original Intro */}
          <div className="bg-cream rounded-3xl p-8 border border-border/80 text-left max-w-3xl mx-auto mb-10 animate-fade-up delay-150">
            <p className="text-body-large text-foreground font-serif leading-relaxed whitespace-pre-wrap">
              {data.introduction}
            </p>
          </div>
        </div>
      </section>

      {/* Questions Checklist */}
      <section className="section-padding bg-background border-t border-border/40">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto space-y-10">
            
            {/* Anonymized Excerpt Box */}
            <div className="bg-secondary/40 p-6 rounded-2xl border-l-4 border-accent mb-8">
              <span className="text-xs uppercase tracking-wider text-accent font-semibold block mb-2">Member Excerpt</span>
              <p className="text-foreground text-sm font-serif italic leading-relaxed">
                {data.excerpt}
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">
                Reflection Prompts for Naming Your Reality
              </h2>
              
              <div className="space-y-4">
                {data.questions.map((question, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 p-5 bg-white border border-border/60 rounded-2xl shadow-sm hover:border-accent transition-colors duration-300"
                  >
                    <div className="w-8 h-8 rounded-full bg-accent/15 text-accent flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-body-large text-foreground font-serif leading-relaxed">
                        {question}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mid-Scroll CTA Card */}
            <div className="my-12 p-6 bg-cream rounded-2xl border border-border/80 text-center max-w-lg mx-auto">
              <Link
                to={`/join?context=I want to reflect on ${encodeURIComponent(data.situation.toLowerCase())}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-3 w-full text-base font-medium bg-[#B0703E] text-white rounded-full hover:opacity-90 transition-opacity shadow-sm"
              >
                <MessageCircle size={18} />
                Start your reflection →
              </Link>
              <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                Free · No app setup required
              </p>
            </div>

            <div className="border-t border-border/40 pt-10">
              <h3 className="font-serif text-xl font-medium text-foreground mb-4">Why use guided WhatsApp reflection?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Operating inside WhatsApp reduces the anxiety of maintaining a daily routine. There are no notification badges, no premium paywalls, and no visual dashboard clutter. You simply answer one slow, targeted question at a time and move forward with clarity.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-narrow text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-medium mb-8 leading-tight">
            Stop looping. Start reflecting.
          </h2>
          <div className="flex flex-col items-center">
            <Link
              to={`/join?context=I want to reflect on ${encodeURIComponent(data.situation.toLowerCase())}`}
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

export default ReflectionQuestions;
