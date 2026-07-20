import { Link, useParams, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { MessageCircle, Check, X, Shield, ArrowRight } from "lucide-react";
import { trackCTAClickWhatsApp } from "@/lib/analytics";
import { clusterArticles } from "@/data/clusterContent";

interface ClusterArticleProps {
  slug?: string;
}

const ClusterArticle = ({ slug: propSlug }: ClusterArticleProps) => {
  const { slug: paramSlug } = useParams<{ slug: string }>();
  const slug = propSlug || paramSlug;
  const article = slug ? clusterArticles[slug] : null;

  if (!article) {
    return <Navigate to="/404" replace />;
  }

  const waUrl = "https://wa.me/message/Y4GOKBIGBWUUM1?text=I%27m%20ready%20to%20start%20my%20first%20reflection";

  // Create dynamic BlogPosting and BreadcrumbList schemas
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.description,
    "datePublished": article.lastUpdated,
    "dateModified": article.lastUpdated,
    "publisher": {
      "@type": "Organization",
      "name": "GenMyo",
      "logo": {
        "@type": "ImageObject",
        "url": "https://genmyo.ai/favicon.png"
      }
    }
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
        "name": article.category,
        "item": `https://genmyo.ai/${article.category.toLowerCase().replace(/[^a-z0-9]/g, "-")}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": article.title,
        "item": `https://genmyo.ai/${article.slug}`
      }
    ]
  };

  const combinedSchema = [blogPostingSchema, breadcrumbSchema];

  return (
    <Layout>
      <SEO
        title={`${article.title} | GenMyo`}
        description={article.description}
        jsonSchema={combinedSchema}
      />

      {/* Hero */}
      <section className="bg-gradient-hero section-padding">
        <div className="container-narrow">
          <div className="text-center">
            <p className="text-sm font-medium tracking-widest uppercase text-accent mb-6 animate-fade-up">
              {article.category}
            </p>
            <h1 className="heading-display text-foreground mb-8 animate-fade-up delay-100">
              {article.title}
            </h1>
            <div className="text-sm text-muted-foreground mb-8 flex justify-center gap-4 animate-fade-up delay-150">
              <span>Last updated: {article.lastUpdated}</span>
            </div>
            
            {/* 2-Sentence Standalone Answer Up Top (LLM Hook) */}
            <div className="bg-cream rounded-2xl p-6 border border-border/80 text-left max-w-2xl mx-auto mb-10 animate-fade-up delay-200">
              <p className="text-body-large text-foreground font-serif leading-relaxed">
                {article.standaloneAnswer}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="prose max-w-3xl mx-auto space-y-10">
            {/* First H2 */}
            {article.h2s[0] && (
              <div>
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  {article.h2s[0].title}
                </h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {article.h2s[0].content}
                </p>
              </div>
            )}

            {/* Proprietary Data Point Callout */}
            <div className="bg-secondary/40 p-6 rounded-2xl border-l-4 border-accent">
              <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-accent mb-2">
                Proprietary Insight
              </h4>
              <p className="text-foreground text-sm font-serif leading-relaxed italic">
                "{article.proprietaryDataPoint}"
              </p>
            </div>

            {/* List Data (if any) */}
            {article.listData && (
              <div className="bg-cream p-6 rounded-2xl border border-border/60">
                <h3 className="font-serif text-xl font-medium text-foreground mb-4">
                  {article.listData.title}
                </h3>
                <ul className="space-y-3">
                  {article.listData.items.map((item, idx) => (
                    <li key={idx} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                      <span className="text-accent font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Second H2 */}
            {article.h2s[1] && (
              <div>
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  {article.h2s[1].title}
                </h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {article.h2s[1].content}
                </p>
              </div>
            )}

            {/* Mid-Scroll WhatsApp CTA Card */}
            <div className="my-10 p-6 bg-cream rounded-2xl border border-border/80 text-center max-w-lg mx-auto">
              <Link
                to="/join"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 w-full text-base font-medium bg-[#B0703E] text-white rounded-full hover:opacity-90 transition-opacity shadow-sm"
              >
                <MessageCircle size={18} />
                Reflect on WhatsApp — Free
              </Link>
              <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                Free · No app setup required
              </p>
            </div>

            {/* Table Data (if any) */}
            {article.tableData && (
              <div className="bg-white border border-border/80 rounded-2xl overflow-hidden shadow-sm my-8">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border/60 bg-secondary/30">
                      {article.tableData.headers.map((h, i) => (
                        <th key={i} className="p-4 text-xs font-semibold uppercase tracking-wider text-foreground">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/40 text-sm">
                    {article.tableData.rows.map((row, rowIdx) => (
                      <tr key={rowIdx}>
                        {row.map((cell, cellIdx) => (
                          <td key={cellIdx} className={`p-4 ${cellIdx === 0 ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
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
              to="/join"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium bg-gold text-gold-foreground rounded-full hover:opacity-90 transition-opacity"
            >
              <MessageCircle size={18} />
              Start your reflection on WhatsApp →
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

export default ClusterArticle;
