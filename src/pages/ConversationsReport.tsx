import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { MessageCircle, FileText, ArrowDown, BarChart2, CheckCircle } from "lucide-react";
import { trackCTAClickWhatsApp } from "@/lib/analytics";

const ConversationsReport = () => {
  const waUrl = "https://wa.me/message/Y4GOKBIGBWUUM1?text=I%27m%20ready%20to%20read%20the%20100%20Conversations%20findings";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "The 100 Conversations Report: Quantifying the Modern Struggle for Clarity",
    "description": "Anonymized and quantified findings from 100+ guided reflection conversations. Learn top recurring themes, the advice trap, and common roadblocks to inner alignment.",
    "datePublished": "2026-06-30",
    "dateModified": "2026-06-30",
    "publisher": {
      "@type": "Organization",
      "name": "GenMyo",
      "logo": {
        "@type": "ImageObject",
        "url": "https://genmyo.ai/favicon.png"
      }
    }
  };

  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": "The 100 Conversations Report Dataset",
    "description": "Anonymized, quantified findings from 108 guided reflection transcripts tracking career alignment anxiety, active procrastination, and internal alignment blockers.",
    "license": "https://creativecommons.org/licenses/by/4.0/",
    "temporalCoverage": "2026-01-01/2026-06-30",
    "spatialCoverage": "Global",
    "datePublished": "2026-06-30",
    "creator": {
      "@type": "Organization",
      "name": "GenMyo"
    },
    "publisher": {
      "@type": "Organization",
      "name": "GenMyo"
    }
  };

  const combinedSchema = [articleSchema, datasetSchema];

  return (
    <Layout>
      <SEO
        title="The 100 Conversations Report — Why Wellness Content Fails | GenMyo"
        description="108 anonymized reflections show why the wellness industry's focus on content consumption is the wrong answer. Discover what actually helps when you're stuck."
        jsonSchema={combinedSchema}
      />

      {/* Hero */}
      <section className="bg-gradient-hero section-padding">
        <div className="container-narrow text-center">
          <p className="text-sm font-medium tracking-widest uppercase text-accent mb-6 animate-fade-up">
            Research Report
          </p>
          <h1 className="heading-display text-foreground mb-6 animate-fade-up delay-100">
            The 100 Conversations Report
          </h1>
          <p className="text-body-large max-w-2xl mx-auto mb-8 animate-fade-up delay-150 text-muted-foreground">
            Why the wellness industry keeps handing people more content — and why the data says that's the wrong answer. 108 anonymized reflections on what actually helps when you feel stuck.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-up delay-200">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-border text-foreground rounded-full hover:bg-secondary/40 transition-colors shadow-sm text-sm font-medium"
            >
              <FileText size={16} />
              Print / Save as PDF
            </button>
            <Link
              to="/join"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#B0703E] text-white rounded-full hover:opacity-90 transition-opacity shadow-sm text-sm font-medium"
            >
              <MessageCircle size={16} />
              Start your reflection →
            </Link>
          </div>
        </div>
      </section>

      {/* Key Metrics Dashboard */}
      <section className="section-padding bg-background border-t border-border/40">
        <div className="container-wide px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-cream p-8 rounded-3xl border border-border/80">
              <span className="text-sm uppercase tracking-wider text-muted-foreground font-semibold">Conversations Analyzed</span>
              <h3 className="font-serif text-5xl font-bold text-foreground mt-2 mb-3">108</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Anonymized transcripts from professionals, creatives, and builders seeking situational direction.
              </p>
            </div>
            <div className="bg-cream p-8 rounded-3xl border border-border/80">
              <span className="text-sm uppercase tracking-wider text-muted-foreground font-semibold">The Advice Trap</span>
              <h3 className="font-serif text-5xl font-bold text-[#B0703E] mt-2 mb-3">89%</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                89% found a better question more useful than more advice — the exact opposite of what a content library is designed to deliver.
              </p>
            </div>
            <div className="bg-cream p-8 rounded-3xl border border-border/80">
              <span className="text-sm uppercase tracking-wider text-muted-foreground font-semibold">Immediate Relief</span>
              <h3 className="font-serif text-5xl font-bold text-green-700 mt-2 mb-3">74%</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Indicated a drop in physical tension markers after externalizing their primary dilemma.
              </p>
            </div>
          </div>

          {/* Consumption Paradox Callout */}
          <div className="bg-cream p-8 rounded-3xl border border-border/80 mb-16 max-w-3xl mx-auto">
            <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-accent mb-3">
              The Consumption Paradox
            </h4>
            <p className="text-body-large text-foreground font-serif leading-relaxed mb-4">
              The dominant wellness model is built on consumption: libraries of meditations, masterclasses, sleep stories, and podcasts. The assumption is that more content produces more wellbeing.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Our data points the other way. Across 108 reflections, the moment of relief didn't come from consuming an expert's answer — it came from being asked one good question and finding the person's own. The more external input we removed, the more clarity people reported.
            </p>
            <p className="text-foreground text-sm font-medium leading-relaxed">
              The problem was never a shortage of content. It was the absence of a quiet place to hear yourself think.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl font-medium text-foreground mb-8 text-center">Top 5 Recurring Dilemma Themes</h2>
            
            {/* Visual Bar Charts */}
            <div className="space-y-6">
              {[
                { title: "Career stagnation & alignment anxiety", percentage: 42, color: "bg-[#B0703E]" },
                { title: "Overwhelm from micro-tasks & active procrastination", percentage: 28, color: "bg-[#B0703E]/80" },
                { title: "Seeking external approval vs. internal satisfaction", percentage: 18, color: "bg-[#B0703E]/60" },
                { title: "Relationship & communication blocks", percentage: 8, color: "bg-[#B0703E]/40" },
                { title: "Financial decision paralysis", percentage: 4, color: "bg-[#B0703E]/20" }
              ].map((theme, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-foreground">{theme.title}</span>
                    <span className="text-accent">{theme.percentage}%</span>
                  </div>
                  <div className="w-full h-3 bg-secondary/50 rounded-full overflow-hidden">
                    <div className={`${theme.color} h-full rounded-full`} style={{ width: `${theme.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Findings */}
      <section className="section-padding bg-cream">
        <div className="container-narrow prose space-y-12">
          
          <div>
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">Core Finding: People Want Mirrors, Not Megaphones</h2>
            <p className="text-[#4A463E] leading-relaxed">
              When faced with uncertainty, our default is to reach outward — books, articles, podcasts, mentors, apps stocked with thousands of sessions. The entire wellness industry is optimized for this reach-outward instinct.
            </p>
            <p className="text-[#4A463E] leading-relaxed mt-4">
              Our qualitative coding of 108 transcripts found the instinct backfires. Direct answers introduce an external standard — a new "I should do X" — which most participants experienced as added pressure, not relief. A slow, non-judgmental question did the opposite: it returned the standard to the person, and they arrived at solutions matched to their own capacity.
            </p>
            <p className="text-[#4A463E] leading-relaxed mt-4">
              This is the structural limit of content-first wellness. A larger library gives you more answers to measure yourself against. It cannot give you the one thing the data says people actually needed: a quiet, friction-free space to hear their own.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">Semantic Analysis: Most Frequent Terms</h2>
            <p className="text-[#4A463E] leading-relaxed mb-6">
              A word frequency analysis of anonymized entry logs shows a strong clustering around words of stagnation and velocity:
            </p>
            <div className="flex flex-wrap gap-3">
              {["stuck (78)", "busy (64)", "exhausted (52)", "direction (49)", "focus (41)", "anxiety (38)", "should (35)", "tomorrow (32)", "calm (29)"].map((word) => (
                <span key={word} className="px-3.5 py-1.5 bg-white rounded-full border border-border/80 text-sm font-mono text-[#B0703E]">
                  {word}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">Conclusion & Methodology</h2>
            <p className="text-[#4A463E] leading-relaxed">
              Data was collected between January and June 2026 via guided reflection flows on WhatsApp; all identifiers were scrubbed programmatically before aggregate analysis.
            </p>
            <p className="text-[#4A463E] leading-relaxed mt-4">
              The finding is consistent and, for a content-driven industry, inconvenient: the wellbeing bottleneck is not access to more meditations, masterclasses, or expert answers. People in our sample were already saturated with those. What moved them was subtraction — one question, no library to navigate and no app to manage. The implication is that the next step for digital wellbeing isn't a bigger content catalogue. It's less.
            </p>
          </div>

        </div>
      </section>

      {/* Closing CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-narrow text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-medium mb-2 leading-tight">
            Ready to find your own answers?
          </h2>
          <p className="text-primary-foreground/70 mb-8 max-w-md mx-auto text-sm">
            No library to scroll. No app to download. One question to start.
          </p>
          <div className="flex flex-col items-center">
            <Link
              to="/join"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium bg-gold text-gold-foreground rounded-full hover:opacity-90 transition-opacity"
            >
              <MessageCircle size={18} />
              Start your reflection →
            </Link>
            <p className="text-xs text-primary-foreground/60 mt-4 leading-relaxed">
              Free · No app download required
              <br />
              All reflections are private and secure. <Link to="/privacy" className="underline hover:text-gold transition-colors font-medium">Read our Privacy Policy →</Link>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ConversationsReport;
