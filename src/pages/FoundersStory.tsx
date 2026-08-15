import { useState } from "react";
import personaRajit from "@/assets/Rajit.png";
import personaSid from "@/assets/sid.png";
import personaGaurav from "@/assets/gaurav.jpg";
import personaDeepak from "@/assets/deepak.png";
import Layout from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import { MessageCircle, Linkedin, ChevronDown, ChevronUp } from "lucide-react";
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
  const [showFullLetter, setShowFullLetter] = useState(false);

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

          {/* Web Story Content (~800 words) */}
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
                I did not arrive at that from theory. For more than twenty years my work was risk and resilience, helping some of the world's largest institutions stay standing under pressure. It put me in rooms with thousands of people, and again and again I saw the same thing beneath the surface. Capable, accomplished people who felt hollow. And this was never only a corporate story. I saw it in the society around me, across generations, and like everyone, I have lived my own chapters of it.
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

          {/* Toggle Full Founder's Letter */}
          <div className="max-w-3xl mx-auto mt-16 text-center">
            <button
              onClick={() => setShowFullLetter(!showFullLetter)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-cream border border-border rounded-full text-sm font-medium text-foreground hover:bg-secondary transition-colors"
            >
              <span>{showFullLetter ? "Hide full founder's letter" : "Read the full founder's letter (1,700 words)"}</span>
              {showFullLetter ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>

          {showFullLetter && (
            <div className="max-w-3xl mx-auto mt-12 p-8 bg-cream/70 rounded-3xl border border-border animate-fade-in space-y-10 font-sans text-base md:text-lg">
              <div className="border-b border-border/80 pb-4">
                <h3 className="font-serif text-2xl font-bold text-foreground">The GenMyō Story (Full Founder's Letter)</h3>
                <p className="text-sm text-muted-foreground italic font-serif mt-1">A letter from our founder, Rajit Punshi.</p>
              </div>

              <div>
                <h4 className="font-serif text-xl font-semibold text-foreground mb-3">The question worth asking</h4>
                <p className="text-muted-foreground leading-relaxed">
                  What if the answers you have been searching for, in all the noise, were never out there to begin with?
                </p>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  Sooner or later, life asks something hard of all of us. The one who seems to have it all together, the one who is struggling openly, you, and me. And when it does, we are left holding the same quiet questions. Who am I. What do I really want. Why do I feel this way, when so much is going right. Underneath every one of them, we are reaching for the same thing. Answers. Solutions. And a steady kind of happiness that holds up when life does not.
                </p>
              </div>

              <div>
                <h4 className="font-serif text-xl font-semibold text-foreground mb-3">We keep looking outward</h4>
                <p className="text-muted-foreground leading-relaxed">
                  So look at where we go searching. The apps and the quick fixes give us a moment of relief and then leave us more or less where we started, still without the answers. Feeds and notifications promise us connection and leave us more scattered than before. Slowly, all that noise crowds out the very abilities that once carried us through. The ability to pause. To reflect. To be curious. To think for ourselves, to learn, and to find our own way to a solution. We hand our sense of who we are over to algorithms, and let them tell us who to be.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  And here is the quiet truth we keep missing. The answers were never in the noise. They were always in here, within us, waiting for someone to help us look.
                </p>
              </div>

              <div>
                <h4 className="font-serif text-xl font-semibold text-foreground mb-3">How I came to this</h4>
                <p className="text-muted-foreground leading-relaxed">
                  I did not arrive at that truth from theory.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  For more than twenty years my work was risk and resilience. Through ORP2b, I helped some of the largest institutions in the world stay standing when everything around them was shaking. That work put me in rooms with thousands of people, across many countries and many generations. From the outside, these were the strong ones. Capable, accomplished, running resilient organisations. But if you sat with them long enough, you saw it. Successful people who felt hollow. Leaders who could control every outcome but their own restlessness. And this was never only a corporate story. I saw the same thing in the society around me, across generations and across geographies. And like everyone, I have had my own chapters of it. So when I say this touches every one of us, I am not speaking from a safe distance. I am speaking as one of the many.
                </p>
              </div>

              <div>
                <h4 className="font-serif text-xl font-semibold text-foreground mb-3">Starting with the person</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Somewhere in all of this, one thing became clear. We had become very good at building resilient systems, and we had somehow stopped looking after well people. We keep trying to fix the organisation, but an organisation is only ever as well as the people inside it.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  So I chose to start with the person.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  That is why GenMyō exists. Not to hand you another quick fix, but to give you back something far more valuable. A pathway inward. A way to seek, to become aware, to learn, to practise, and to find your own solutions. Because that is where they were all along.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  And this is not about turning away from whatever already sustains you. Your faith, your family, your community, the practices that steady you: GenMyō is not here to replace any of it. It is here to help you hear yourself more clearly, so you can bring your fullest self to all of it.
                </p>
              </div>

              <div>
                <h4 className="font-serif text-xl font-semibold text-foreground mb-3">A guide, always within reach</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Imagine a place you can turn to whenever you need it, day or night, that is only ever interested in one thing. You, and how you are truly doing. You can bring it the thought that has been sitting on your chest at two in the morning, and think out loud without being sold anything in return.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  Picture someone at the end of a heavy day, thumb hovering over the same apps as always, who this time types a single honest sentence instead. <em>I feel like I am failing at everything and I do not know why.</em> And rather than a like, an ad, or silence, something answers. Not with a lecture, but with a question that helps them see the day a little more clearly. A few minutes later they are breathing more easily and reaching for their own next thought. That small moment, lived again and again across the years, is what we built GenMyō for.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  It is not a therapist and does not pretend to be. It stays with what it is here for, your inner wellbeing, and the moment you need a real human being, it will help you reach one.
                </p>
              </div>

              <div>
                <h4 className="font-serif text-xl font-semibold text-foreground mb-3">Built on real science</h4>
                <p className="text-muted-foreground leading-relaxed">
                  I have spent my life around risk, so I have little patience for wishful thinking, and GenMyō is not built on any. Beneath that simple conversation sits a framework we have spent years building, grounded in reality, behavioural psychology and neuroscience. You will never see the machinery, and you are not meant to. You are only meant to feel understood.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  Here is the part that gives me hope. The brain is not fixed. It keeps reshaping itself, at any age, through small things done often. And none of us can think our way out of a hard moment until the body feels safe enough to let us, which is exactly why GenMyō meets you as a whole person rather than a problem to be corrected. The science is quietly at work the entire time. You simply get to feel met.
                </p>
              </div>

              <div>
                <h4 className="font-serif text-xl font-semibold text-foreground mb-3">Inner Wellness Intelligence</h4>
                <p className="text-muted-foreground leading-relaxed">
                  What all of this builds in you has a name. Inner Wellness Intelligence.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  We already understand intelligence in many forms. IQ for the mind. EQ for emotions. Inner Wellness Intelligence is the next one. It is the lifelong capacity to understand your inner world, steady it when life shakes it, and keep lifting it, so you can thrive in your outer one. And here is the most hopeful part. Like any intelligence, it can be learned, practised and strengthened at any age. It is a strength for the good times as much as the hard ones. You do not wait until you are unwell to look after your body, and this is no different. You build it in the calm seasons so you are ready for the storms, and it makes the calm seasons richer while you are in them. As you grow, you can even see it, gently, in a Resilience Score that rises as your capacity builds. It is not a scoreboard, only a quiet sign that the work is real and taking hold.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  The name carries the whole idea. Gen, for generations. Myō, for bringing light, for rejuvenating what has grown dim. Generations, renewing together. Because every generation is carrying something, and every generation can renew.
                </p>
              </div>

              <div>
                <h4 className="font-serif text-xl font-semibold text-foreground mb-3">The people behind it</h4>
                <p className="text-muted-foreground leading-relaxed">
                  I am not building this alone, and there is one person I want to name. My son, Sid, has poured himself into GenMyō from the very beginning, and there is something fitting in that. A father and a son, from two different generations, building a place where generations can understand and renew one another. He has shaped this in ways the finished product will never fully show, and I could not be prouder to be doing it beside him.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  Around us stands a small and determined team, each carrying their own reasons for caring about this work. Between us we bring real depth in artificial intelligence, human development, behavioural science, product and community. And just as importantly, we have all lived the very thing we are building to help with. So you are not being sold something by strangers. You are being invited in by people walking the same path as you.
                </p>
              </div>

              <div>
                <h4 className="font-serif text-xl font-semibold text-foreground mb-3">A story still being written</h4>
                <p className="text-muted-foreground leading-relaxed">
                  We did not launch GenMyō to declare it finished. We launched it to listen. The first chapter was about learning. Understanding what people truly want, how they wish to be met, and how to make this genuinely useful and worth returning to. Every conversation has taught us something, and quietly shaped what comes next.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  Now we are opening the doors more widely, to individuals and to organisations, in careful and deliberate stages. There is a great deal still to come. New features, new depth, and new ways for this to fit into your life and grow with you. What you are looking at today is the beginning, not the finished thing.
                </p>
              </div>

              <div>
                <h4 className="font-serif text-xl font-semibold text-foreground mb-3">Not a transaction. A journey.</h4>
                <p className="text-muted-foreground leading-relaxed">
                  And just as our story is still unfolding, so is yours. GenMyō is not something you buy once and finish with. It is a guide for the long journey, and it grows as you grow. In the beginning it helps you find your feet. In time it helps you truly know yourself. Later it helps you act with intention and live by your own choices, so that decision by decision you feel it, a steadier hand on your own life and the quiet certainty that you are the one holding the pen. And eventually, when you are full and steady, it helps you do the most meaningful thing a person can do. Turn back, and lift others. That is where a real journey of inner wellness leads. Not to endless self improvement, but to contribution. It is the arc of a life well lived, and GenMyō is built to walk every stage of it with you.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  I have spent my whole working life helping organisations stay strong. What I understand now, more clearly than ever, is that the surest way to a stronger organisation, a stronger family, a stronger society, is a well person. That is where I have chosen to put my energy, and my heart.
                </p>
              </div>

              <div>
                <h4 className="font-serif text-xl font-semibold text-foreground mb-3">An invitation</h4>
                <p className="text-muted-foreground leading-relaxed">
                  I could keep describing it, but this is not something you understand by reading about it. It is something you feel the first time you are met by it. So let me leave you with an invitation rather than an explanation. Come and see for yourself. Ask it the question you have been carrying. Notice what happens when, perhaps for the first time in a long while, something reflects you back to yourself instead of selling you something.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  Your path is already there. It has been waiting for you. All it needs is your first step, and there has never been a better moment than now.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  These are the opening chapters. The best are still to come, and we would love for you to help write them.
                </p>
              </div>

              <div className="pt-4 border-t border-border/80">
                <p className="font-serif font-bold text-foreground text-xl">Rajit Punshi</p>
                <p className="text-sm text-muted-foreground">Founder and CEO, GenMyō</p>
              </div>
            </div>
          )}

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
