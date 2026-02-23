import personaRajit from "@/assets/Rajit.png";
import personaSid from "@/assets/sid.png";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Team = () => {
  return (
    <Layout>
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
          <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden flex-shrink-0 bg-secondary">
                <img src={personaRajit} alt="Rajit Punshi" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-sm font-medium tracking-widest uppercase text-accent mb-4">
                  Founder
                </p>
                <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-10">
                  Rajit Punshi
                </h2>
              </div>
            </div>
            <div className="space-y-8 text-lg text-muted-foreground leading-relaxed">
              <p>
                Rajit Punshi is the Founder and Architect of GenMyo. With 25+ years of
                global leadership experience across governance, risk, and complex systems
                design, he has built frameworks that strengthen accountability, resilience,
                and long-term trust across institutions worldwide. Having trained over
                2,000 professionals and senior executives, and recognised among the Top 50
                Operational Risk Professionals globally, Rajit has spent his career
                understanding how systems behave under pressure.
              </p>
              <p>
                Across generations, he observed a deeper structural gap: Gen Z navigating
                uncertainty and identity, Millennials balancing ambition with burnout,
                Gen X carrying responsibility without emotional bandwidth, and Baby Boomers
                facing reinvention and transition. The world was building performance
                capability at scale, but not inner capability. GenMyo was conceptualised as
                a structured, human-first, AI-enabled architecture for developing clarity,
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
          <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden flex-shrink-0 bg-secondary">
                <img src={personaSid} alt="Sid Punshi" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-sm font-medium tracking-widest uppercase text-accent mb-4">
                  Founding Team: Product and Growth
                </p>
                <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-10">
                  Sid Punshi
                </h2>
              </div>
            </div>
            <div className="space-y-8 text-lg text-muted-foreground leading-relaxed">
              <p>
                Sid is a final-year student at UCL School of Management (First Class
                predicted) with professional experience spanning fintech, data analytics,
                and product development. He brings both first-hand experience in the
                wellness space and a genuine understanding of the challenges younger
                generations face around mental wellbeing, identity, and digital overload.
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
            Join The Mirror Project
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </Layout>
  );
};
export default Team;