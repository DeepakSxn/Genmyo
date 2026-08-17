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
      "description": "Twenty-one years in banking, then founder of ORP2b. Founded GenMyō to build Inner Wellness Intelligence for people.",
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
                Founder &amp; CEO
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
                Sooner or later, life asks something hard of all of us. And when it does, we are left holding the same quiet questions. Who am I. What do I really want. Why do I feel this way, when so much is going right. What we are reaching for, underneath it all, is the same. Answers, and a steady kind of happiness that holds up when life does not.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                We keep looking outward
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                So look at where we go searching. Apps and quick fixes give a moment of relief and leave us where we started. Feeds and notifications promise connection and leave us more scattered than before. Slowly, the noise crowds out the very abilities that once carried us through: the ability to pause, to reflect, to be curious, to find our own way to a solution. The truth we keep missing is that the answers were never in the noise. They were always within us.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                How I came to this
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                I did not arrive at this from theory. I spent twenty-one years with a leading international
                bank, working in risk and resilience, recognised among the top fifty globally in my field, and
                working alongside leading regulators around the world. Then, in 2011, I chose to leave it
                behind, to give back to a still young profession, operational risk, and to help the people
                building their careers in it. That became ORP2b. Across all of it, my years inside the
                corporate world and later among ORP2b's clients and partners, I kept seeing the same thing
                beneath the surface. Not just the struggling, and not just the successful. Everyone was
                carrying something, a question, a quiet emptiness, with nowhere to set it down. And this was
                never only a corporate story. I saw it in the society around me, across generations.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                I have lived it myself. Building on my own brought a loneliness no one warns you about. I still
                remember sitting out on the balcony at 3am, long after the house had gone quiet, turning the
                same questions over and over. Was I on the right track. Like many of my generation, I had been
                raised to hold it together, to be the steady one, to cope quietly and never let it show. My
                family carried it with me, more than I always let them see. Once, we made it to the final two
                for a project against every major consulting firm and vendor in the field. For a few days it
                felt like everything was about to change. Then came the no, and the silence after it, and the
                long question of whether I had ever really belonged in that room at all. You learn who is truly
                there in those moments, and you start to see people, others and yourself, more honestly. A
                Buddhist practice I took up in 2013 gently shifted how I see the world, deepening my sense of
                our shared humanity and how much our inner wellness shapes everything. Slowly I found a
                resilience I did not know I had, and began to see the struggle, and the strength, in others far
                more clearly.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                Starting with the person
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                One thing became clear. We had grown very good at building resilient systems, and somehow stopped looking after well people. So I chose to start with the person. Whatever already grounds you, your faith, your family, your community, GenMyō is not here to replace it. It is here to help you hear yourself more clearly.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                A guide, always within reach
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Imagine a place you can turn to whenever you need it, day or night, that is only ever interested in one thing. You, and how you are truly doing. Picture someone at the end of a heavy day who types a single honest sentence instead of scrolling. <em>I feel like I am failing at everything and I do not know why.</em> And rather than a like, an ad, or silence, something answers. Not with a lecture, but with a question that helps them see the day a little more clearly. That small moment, lived again and again, is what we built GenMyō for. It is not a therapist and does not pretend to be, and the moment you need a real person, it will help you reach one.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                Built on real science
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                None of this is wishful thinking. Beneath the simple conversation sits a framework we have spent years building, grounded in reality, behavioural psychology and neuroscience. You will never see the machinery. You are only meant to feel understood, because the brain is not fixed. It reshapes itself, at any age, through small things done often.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                Inner Wellness Intelligence
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                What all of this builds in you has a name. Inner Wellness Intelligence. We understand intelligence in many forms already. IQ for the mind. EQ for emotions. Inner Wellness Intelligence is the next one, the lifelong capacity to understand your inner world, steady it when life shakes it, and keep lifting it, so you can thrive in your outer one. Like any intelligence, it can be strengthened at any age, in good seasons and hard ones alike.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                The name carries the whole idea. Gen, for generations. Myō, for bringing light, for rejuvenating what has grown dim. Generations, renewing together.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                Not a transaction. A journey.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                And this is not something you buy once and finish with. GenMyō is a guide for the long journey, and it grows as you grow. It helps you find your feet, then truly know yourself, then live by your own choices, decision by decision, until you hold a steadier hand on your own life. And eventually, when you are full and steady, it helps you do the most meaningful thing a person can do. Turn back, and lift others. The surest way to a stronger family, a stronger team, a stronger society, is a well person.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                The people behind it
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                I am not building this alone. My son, Sid, has poured himself into GenMyō beside me, a father and a son from two different generations building a place where generations can renew one another. Around us stands a small team who have each lived the very thing we are building to help with.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                A story still being written
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We launched GenMyō first to listen and to learn, and we are now opening up to individuals and organisations in careful stages, with much more still to come. These are the opening chapters, and the best ones lie ahead.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                An invitation
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                So let me leave you with an invitation rather than an explanation. Come and see for yourself. Ask it the question you have been carrying. Your path is already there, waiting for your first step, and there has never been a better moment than now.
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
            <h2 className="font-serif text-3xl font-medium text-foreground mb-4">
              The Founding Team
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm">
              A father and a son, alongside a multidisciplinary team combining AI architecture, behavioural science, and product design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {/* Rajit */}
            <div className="bg-white p-6 rounded-2xl border border-border/80 text-center flex flex-col items-center shadow-xs">
              <img src={personaRajit} alt="Rajit Punshi" className="w-20 h-20 rounded-full object-cover mb-4 border" />
              <h3 className="font-serif font-semibold text-foreground text-lg">Rajit Punshi</h3>
              <p className="text-xs text-accent font-medium uppercase tracking-wider mb-2">Founder &amp; CEO</p>
              <p className="text-xs text-muted-foreground leading-relaxed">20+ yrs Risk &amp; Resilience Leadership</p>
            </div>

            {/* Sid */}
            <div className="bg-white p-6 rounded-2xl border border-border/80 text-center flex flex-col items-center shadow-xs">
              <img src={personaSid} alt="Sid Punshi" className="w-20 h-20 rounded-full object-cover mb-4 border" />
              <h3 className="font-serif font-semibold text-foreground text-lg">Sid Punshi</h3>
              <p className="text-xs text-accent font-medium uppercase tracking-wider mb-2">Product &amp; Growth</p>
              <p className="text-xs text-muted-foreground leading-relaxed">AI, Fintech &amp; Youth Wellness Insights</p>
            </div>

            {/* Gaurav */}
            <div className="bg-white p-6 rounded-2xl border border-border/80 text-center flex flex-col items-center shadow-xs">
              <img src={personaGaurav} alt="Gaurav Singh" className="w-20 h-20 rounded-full object-cover object-top mb-4 border" />
              <h3 className="font-serif font-semibold text-foreground text-lg">Gaurav Singh</h3>
              <p className="text-xs text-accent font-medium uppercase tracking-wider mb-2">AI &amp; Business Growth</p>
              <p className="text-xs text-muted-foreground leading-relaxed">Agentic AI &amp; Business Strategy</p>
            </div>

            {/* Deepak */}
            <div className="bg-white p-6 rounded-2xl border border-border/80 text-center flex flex-col items-center shadow-xs">
              <img src={personaDeepak} alt="Deepak Saxena" className="w-20 h-20 rounded-full object-cover object-top mb-4 border" />
              <h3 className="font-serif font-semibold text-foreground text-lg">Deepak Saxena</h3>
              <p className="text-xs text-accent font-medium uppercase tracking-wider mb-2">AI Software Engineer</p>
              <p className="text-xs text-muted-foreground leading-relaxed">Product Engineering &amp; AI Architecture</p>
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
