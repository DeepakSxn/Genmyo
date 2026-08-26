import personaRajit from "@/assets/Rajit.png";
import personaSid from "@/assets/sid.png";
import personaGaurav from "@/assets/gaurav.jpg";
import personaDeepak from "@/assets/deepak.png";
import Layout from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import { MessageCircle, Linkedin } from "lucide-react";
import { Helmet } from "react-helmet-async";

const foundersStorySchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": "https://genmyo.ai/founders-story#about",
      "url": "https://genmyo.ai/founders-story",
      "name": "The GenMyō Story — A Letter from Our Founder",
      "description": "What if the answers you have been searching for, in all the noise, were never out there to begin with? The story of GenMyō by Founder and CEO Rajit Punshi.",
      "publisher": { "@type": "Organization", "name": "GenMyō", "url": "https://genmyo.ai" }
    },
    {
      "@type": "Person",
      "name": "Rajit Punshi",
      "jobTitle": "Founder and CEO",
      "worksFor": { "@type": "Organization", "name": "GenMyō" },
      "description": "For more than twenty years helping large institutions stay standing under pressure. Founded GenMyō to build Inner Wellness Intelligence for people.",
      "image": "https://www.genmyo.ai/Rajit.png",
      "sameAs": ["https://www.linkedin.com/in/rajit-punshi-337490/"]
    }
  ]
};

const FoundersStory = () => {
  return (
    <Layout>
      <SEO
        title="The GenMyō Story — A Letter from Founder Rajit Punshi"
        description="What if the answers you have been searching for were never out there to begin with? Read the GenMyō story by Founder and CEO Rajit Punshi."
        jsonSchema={foundersStorySchema}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(foundersStorySchema)}</script>
      </Helmet>

      {/* Hero Header */}
      <section className="bg-gradient-hero section-padding min-h-[45vh] flex items-center justify-center">
        <div className="container-narrow text-center">
          <p className="text-sm font-medium tracking-widest uppercase text-accent mb-6 animate-fade-up">
            Our Story
          </p>
          <h1 className="heading-display text-foreground mb-6 animate-fade-up delay-100">
            The GenMyō Story
          </h1>
          <p className="text-body-large max-w-2xl mx-auto animate-fade-up delay-150 text-muted-foreground leading-relaxed italic font-serif">
            A letter from our founder, Rajit Punshi.
          </p>
        </div>
      </section>

      {/* Main Founder Story Content */}
      <section className="section-padding bg-background border-t border-border/40">
        <div className="container-narrow">
          
          {/* Founder Bio Card */}
          <div className="bg-cream p-8 md:p-10 rounded-3xl border border-border/80 mb-16 flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden flex-shrink-0 bg-secondary border-2 border-accent/20">
              <img
                src={personaRajit}
                alt="Rajit Punshi, Founder and CEO of GenMyō"
                className="w-full h-full object-cover"
                width={1080}
                height={1080}
              />
            </div>
            <div className="space-y-4 text-center md:text-left">
              <div className="inline-block px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-semibold uppercase tracking-wider">
                Founder
              </div>
              <h2 className="font-serif text-3xl font-medium text-foreground">
                Rajit Punshi
              </h2>
              <p className="text-sm text-muted-foreground font-medium">
                Founder and CEO, GenMyō
              </p>
              <p className="text-body-large text-foreground font-serif leading-relaxed italic">
                "The answers were never in the noise. They were always within us."
              </p>
              <a
                href="https://www.linkedin.com/in/rajit-punshi-337490/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
              >
                <Linkedin size={16} />
                <span>Connect on LinkedIn</span>
              </a>
            </div>
          </div>

          {/* The GenMyō Story */}
          <article className="prose max-w-3xl mx-auto space-y-10 text-foreground/90 leading-relaxed font-sans text-base md:text-lg">
            
            <div>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                The question worth asking
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                What if the answers you have been searching for, in all the noise, were never out there to begin with?
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Sooner or later, life asks something hard of all of us. And we are left holding the same quiet questions. Who am I. What do I really want. Why do I feel this way, when so much is going right. Underneath them all, we are reaching for the same thing: answers, and a steady kind of happiness that holds when life does not.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                We keep looking outward
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                So look at where we search. Apps and quick fixes give a moment's relief and leave us where we started. Feeds promise connection and leave us more scattered.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Slowly, the noise crowds out the very things that once carried us through: the ability to pause, to reflect, to find our own way. The answers were never in the noise. They were always within us.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                How I came to this
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                I did not arrive at this from theory. For more than twenty years I worked in risk and resilience, alongside some of the world's largest institutions and regulators, before leaving in 2011 to build something of my own. Across all of it, I kept seeing the same thing beneath the surface. Everyone, the struggling and the successful alike, was carrying something with nowhere to set it down. People who could hold a room together, and had nowhere to be held themselves.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                I have lived it too. Building something of your own asks more of you than anyone tells you. The highs that lift you one week and the doubts that find you the next. The 3am questions out on the balcony, wondering if I was on the right track.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                At one point, a change of senior management at a key client saw bid after bid fall away, work we had counted on, gone. It forced me to think hard. Rather than wait for the tide to turn, I went back to the ecosystem I had spent years building, and used those relationships to find opportunities elsewhere, and steady the ground beneath us.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Somewhere in that stretch, something settled in me. The uncertainty would always be there, and so would the challenges. But the solutions, and the happiness, were mine to seize, from within.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                Why I built GenMyō
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                That truth did not stay mine for long. Once I had felt it, I started seeing it everywhere. In the founder holding it together for everyone but themselves. In the friend who seemed fine. In people across every generation, each carrying their own weight, each with the same strength inside them, and nowhere to turn to find it.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                We have built a world with a tool for almost everything, and left the inner life to fend for itself. That was the gap I could not unsee.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                So I set out to build what I had needed myself. A private space to come back to whenever life asks something hard of us. A guide that does not hand you answers, but helps you find your own.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Simple mindfulness practices that, done often, quietly build your strength over time. And real people when you want them, mentors and guides who have walked their own hard roads, because sometimes you do not need an answer, you need someone who understands.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                GenMyō is not here to replace what already grounds you, your faith, your values, or the people you love. It is here to sit alongside them, and to help you reach the strength that was always yours.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                Built on real science
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                None of this is wishful thinking. Beneath the simple conversation sits a framework we have spent years building, grounded in behavioural science and neuroscience. You never see the machinery. You are only meant to feel understood, because the brain is not fixed. It reshapes itself, at any age, through small things done often.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                What it builds in you has a name. Inner Wellness Intelligence™. Like IQ for the mind or EQ for emotions, it is the lifelong capacity to understand your inner world, steady it when life shakes it, and keep lifting it, so you can thrive in your outer one. Gen, for generations. Myō, for bringing light. Generations, renewing together.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                Not a transaction. A journey.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                This is not something you buy once and finish with. GenMyō grows as you grow. It helps you find your feet, then know yourself, then live by your own choices. And in time, when you are steady, it helps you do the most meaningful thing a person can. Turn back, and lift others. Because the surest path to a stronger family, team and society is a well person.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                The people behind it
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                I am not building this alone. My son, Sid, has poured himself into it beside me, a father and son from two generations, and around us stands a small team who have each lived the very thing we are building to help with.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                An invitation
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                So let me leave you with an invitation, not an explanation. Come and see for yourself. Ask it the question you have been carrying.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                The answers you are looking for were always within you. There has never been a better moment to begin.
              </p>
            </div>

            <div className="pt-6 border-t border-border/60">
              <p className="font-serif font-semibold text-[#1C1A16] text-xl">
                Rajit Punshi
              </p>
              <p className="text-sm text-muted-foreground">
                Founder and CEO, GenMyō
              </p>
            </div>

          </article>
        </div>
      </section>

      {/* Team Grid Callout */}
      <section className="section-padding bg-cream border-t border-border/40">
        <div className="container-wide px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
              Who We Are
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">
              Founding Team &amp; Advisory Network
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm">
              GenMyo is built by people who understand both the systems that shape us and the inner work required to navigate them.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {/* Rajit */}
            <div className="bg-white p-6 rounded-2xl border border-border/80 text-center flex flex-col items-center shadow-xs">
              <img src={personaRajit} alt="Rajit Punshi" className="w-20 h-20 rounded-full object-cover mb-4 border" />
              <h3 className="font-serif font-semibold text-foreground text-lg">Rajit Punshi</h3>
              <p className="text-xs text-accent font-medium uppercase tracking-wider mb-2">Founder</p>
            </div>

            {/* Sid */}
            <div className="bg-white p-6 rounded-2xl border border-border/80 text-center flex flex-col items-center shadow-xs">
              <img src={personaSid} alt="Sid Punshi" className="w-20 h-20 rounded-full object-cover mb-4 border" />
              <h3 className="font-serif font-semibold text-foreground text-lg">Sid Punshi</h3>
              <p className="text-xs text-accent font-medium uppercase tracking-wider mb-2 leading-snug">
                Founding Team: Product and Growth
              </p>
            </div>

            {/* Gaurav */}
            <div className="bg-white p-6 rounded-2xl border border-border/80 text-center flex flex-col items-center shadow-xs">
              <img src={personaGaurav} alt="Gaurav Singh" className="w-20 h-20 rounded-full object-cover object-top mb-4 border" />
              <h3 className="font-serif font-semibold text-foreground text-lg">Gaurav Singh</h3>
              <p className="text-xs text-accent font-medium uppercase tracking-wider mb-2 leading-snug">
                Founding Team: AI, Product &amp; Growth
              </p>
            </div>

            {/* Deepak */}
            <div className="bg-white p-6 rounded-2xl border border-border/80 text-center flex flex-col items-center shadow-xs">
              <img src={personaDeepak} alt="Deepak Saxena" className="w-20 h-20 rounded-full object-cover object-top mb-4 border" />
              <h3 className="font-serif font-semibold text-foreground text-lg">Deepak Saxena</h3>
              <p className="text-xs text-accent font-medium uppercase tracking-wider mb-2 leading-snug">
                Founding Team: AI &amp; Product Engineering
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link to="/team" className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline">
              <span>Meet the full team and advisory network →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-narrow text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-medium mb-4 leading-tight">
            Ready to find your path inward?
          </h2>
          <p className="text-primary-foreground/70 mb-8 max-w-md mx-auto text-sm">
            No app to download. No streak to manage. One honest question to start.
          </p>
          <div className="flex flex-col items-center">
            <Link
              to="/join"
              data-cta-location="founders_story"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium bg-gold text-gold-foreground rounded-full hover:opacity-90 transition-opacity shadow-md"
            >
              <MessageCircle size={18} />
              Start your reflection on WhatsApp →
            </Link>
            <p className="text-xs text-primary-foreground/60 mt-4 leading-relaxed">
              Free · No credit card · Privacy protected
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FoundersStory;
