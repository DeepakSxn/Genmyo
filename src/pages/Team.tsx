import personaRajit from "@/assets/Rajit.png";
import personaSid from "@/assets/sid.png";
import personaGaurav from "@/assets/gaurav.jpg";
import personaDeepak from "@/assets/deepak.png";
import Layout from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import { MessageCircle, Linkedin } from "lucide-react";
import { Helmet } from "react-helmet-async";

const teamSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: "Rajit Punshi",
      jobTitle: "Founder",
      worksFor: { "@type": "Organization", name: "GenMyo" },
      description:
        "25+ years of global leadership in governance, risk and systems design. Founded GenMyo as an AI-first platform for inner development.",
      image: "https://www.genmyo.ai/Rajit.png",
      sameAs: ["https://www.linkedin.com/in/rajit-punshi-337490/"],
    },
    {
      "@type": "Person",
      name: "Sid Punshi",
      jobTitle: "Head of Product & Growth",
      worksFor: { "@type": "Organization", name: "GenMyo" },
      image: "https://www.genmyo.ai/sid.png",
      sameAs: ["https://www.linkedin.com/in/sidharthpunshi/"],
    },
    {
      "@type": "Person",
      name: "Gaurav Singh",
      jobTitle: "AI, Product & Business Growth",
      worksFor: { "@type": "Organization", name: "GenMyo" },
      description:
        "Building agentic AI systems and intelligent workflows while driving product development, business operations, and growth strategy.",
      image: "https://www.genmyo.ai/gaurav.jpg",
      sameAs: ["https://www.linkedin.com/in/gaurav-singh-5392a7272/"],
    },
    {
      "@type": "Person",
      name: "Deepak Saxena",
      jobTitle: "AI Software & Product Engineer",
      worksFor: { "@type": "Organization", name: "GenMyo" },
      description:
        "Leading technical product development, early-stage AI innovation, rapid prototyping, and core software engineering at GenMyo.",
      image: "https://www.genmyo.ai/deepak.png",
      sameAs: ["https://www.linkedin.com/in/deepaksxn"],
    },
  ],
};

const Team = () => {
  return (
    <Layout>
      <SEO
        title="The People Behind GenMyo — Team & Founders"
        description="Meet the small team building The Mirror Project. Who we are, what we've built before, and why we chose to make something quiet."
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(teamSchema)}</script>
      </Helmet>
      {/* Hero */}
      <section className="bg-gradient-hero section-padding">
        <div className="container-narrow text-center">
          <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-6 animate-fade-up">
            Who We Are
          </p>
          <h1 className="heading-display text-foreground mb-8 animate-fade-up delay-100">
            Founding Team & Advisory Network
          </h1>
          <p className="text-body-large max-w-2xl mx-auto animate-fade-up delay-200">
            GenMyo is built by people who understand both the systems that shape us
            and the inner work required to navigate them.
          </p>
        </div>
      </section>
      {/* Rajit */}
      <section className="section-padding bg-background">
        <div className="container-wide px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start mb-10 md:mb-12">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden flex-shrink-0 bg-secondary">
                <img src={personaRajit} alt="Rajit Punshi, Founder of GenMyo — AI wellness platform" className="w-full h-full object-cover" width={1080} height={1080} loading="lazy" />
              </div>
              <div>
                <p className="text-sm font-medium tracking-widest uppercase text-accent mb-4">
                  Founder
                </p>
                <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-4">
                  Rajit Punshi
                </h2>
                <a
                  href="https://www.linkedin.com/in/rajit-punshi-337490/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 ml-0.5 mt-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:underline"
                >
                  <Linkedin size={16} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
            <div className="space-y-8 text-lg text-muted-foreground leading-relaxed">
              <p>
                Rajit Punshi is the Founder and Architect of GenMyo. With 25+ years of global leadership experience across governance, risk, and complex systems design, he has built frameworks that strengthen accountability, resilience, and long-term trust across institutions worldwide. Having trained over 2,000 professionals and senior executives, and recognised among the Top 50 Operational Risk Professionals globally, Rajit has spent his career understanding how systems behave under pressure.
              </p>
              <p>
                Across generations, he observed a deeper structural gap: Gen Z navigating
                uncertainty and identity, Millennials balancing ambition with burnout,
                Gen X carrying responsibility without emotional bandwidth, and Baby Boomers
                facing reinvention and transition. The world was building performance
                capability at scale, but not inner capability. GenMyo was conceptualised as
                a structured, AI-first, Human-enabled architecture for developing clarity,
                regulation, and agency across life stages, not episodically, but
                continuously.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Sid */}
      <section className="section-padding bg-cream">
        <div className="container-wide px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start mb-10 md:mb-12">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden flex-shrink-0 bg-secondary">
                <img src={personaSid} alt="Sid Punshi, Head of Product and Growth at GenMyo" className="w-full h-full object-cover" width={816} height={1001} loading="lazy" />
              </div>
              <div>
                <p className="text-sm font-medium tracking-widest uppercase text-accent mb-4">
                  Founding Team: Product and Growth
                </p>
                <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-4">
                  Sid Punshi
                </h2>
                <a
                  href="https://www.linkedin.com/in/sidharthpunshi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 ml-0.5 mt-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:underline"
                >
                  <Linkedin size={16} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
            <div className="space-y-8 text-lg text-muted-foreground leading-relaxed">
              <p>
                Sid brings professional experience spanning AI, fintech, data analytics,
                and product development, alongside first-hand experience in the wellness
                space and a genuine understanding of the challenges younger generations
                face around mental wellbeing, identity, and digital overload.
              </p>
              <p>
                He leads product design, user experience, and growth strategy for GenMyo,
                ensuring the platform resonates with Gen Z and Millennial users. His
                contribution keeps GenMyo practical, relatable, and grounded in real user
                behaviour, ensuring that what is built is not just well-structured, but
                genuinely usable in everyday life.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Gaurav */}
      <section className="section-padding bg-background border-t border-border/40">
        <div className="container-wide px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start mb-10 md:mb-12">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden flex-shrink-0 bg-secondary">
                <img
                  src={personaGaurav}
                  alt="Gaurav Singh, AI, Product and Business Growth at GenMyo"
                  className="w-full h-full object-cover object-top"
                  width={1080}
                  height={1080}
                  loading="lazy"
                />
              </div>
              <div>
                <p className="text-sm font-medium tracking-widest uppercase text-accent mb-4">
                  Founding Team: AI, Product & Growth
                </p>
                <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-4">
                  Gaurav Singh
                </h2>
                <a
                  href="https://www.linkedin.com/in/gaurav-singh345/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 ml-0.5 mt-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:underline"
                >
                  <Linkedin size={16} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
            <div className="space-y-8 text-lg text-muted-foreground leading-relaxed">
              <p>
                Gaurav brings a unique blend of technical AI capability and strategic business growth expertise. He specializes in designing intelligent agentic AI systems and automated workflows that directly connect engineering innovation with real-world business impact and user value.
              </p>
              <p>
                He works across both technical engineering and non-technical growth—focusing on product development, AI-driven process automation and business operations. By combining modern AI capabilities with practical growth strategy, he helps build scalable infrastructure and execution models that expand market reach, optimize operations, and drive sustainable business growth.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Deepak */}
      <section className="section-padding bg-cream border-t border-border/40">
        <div className="container-wide px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start mb-10 md:mb-12">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden flex-shrink-0 bg-secondary">
                <img
                  src={personaDeepak}
                  alt="Deepak Saxena, AI & Product Engineer at GenMyo"
                  className="w-full h-full object-cover object-top"
                  width={1080}
                  height={1080}
                  loading="lazy"
                />
              </div>
              <div>
                <p className="text-sm font-medium tracking-widest uppercase text-accent mb-4">
                  Founding Team: AI & Product Engineering
                </p>
                <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-4">
                  Deepak Saxena
                </h2>
                <a
                  href="https://www.linkedin.com/in/deepaksxn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 ml-0.5 mt-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:underline"
                >
                  <Linkedin size={16} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
            <div className="space-y-8 text-lg text-muted-foreground leading-relaxed">
              <p>
                Deepak leads core software development and technical product engineering for GenMyo. Driven by structured thinking and creative problem-solving, he specializes in early-stage research, rapid experimentation, and transforming abstract ideas into robust, production-grade applications.
              </p>
              <p>
                He focuses primarily on the technical development of the platform—building product features, engineering automated workflows, and deploying predictive data models. His hands-on technical architecture ensures that what is designed is executed with precision, high performance, and long-term scalability.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Advisory */}
      <section className="section-padding bg-sand">
        <div className="container-wide px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
              Collective Expertise
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-10">
              Advisory & Expert Network
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              GenMyo is supported by a cross-disciplinary advisory and expert network
              spanning strategy, technology architecture, AI governance, behavioural
              science, and human development. Alongside strategic and product advisors,
              the platform draws on qualified content specialists across wellness
              practices, psychology-informed frameworks, and applied growth methodologies,
              ensuring ethical integrity, safety, and practical relevance. This distributed
              model enables GenMyo to combine systems-level design with domain depth,
              scaling responsibly while maintaining credibility and real-world effectiveness.
            </p>
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-narrow text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6">
            Join the Journey
          </h2>
          <p className="text-xl text-primary-foreground/80 max-w-xl mx-auto mb-10">
            Be part of what we're building. Join The Mirror Project and
            experience GenMyo for yourself.
          </p>
          <Link
            to="/join"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium bg-primary-foreground text-primary rounded-full hover:opacity-90 transition-opacity"
          >
            <MessageCircle size={18} />
            Start your reflection on WhatsApp →
          </Link>
        </div>
      </section>
    </Layout>
  );
};
export default Team;
