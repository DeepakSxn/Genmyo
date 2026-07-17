import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Helmet } from "react-helmet-async";
import rajitImage from "@/assets/Rajit.png";
import sidImage from "@/assets/sid.png";

export interface BlogPostData {
  slug: string;
  kicker: string;
  title: string;
  description: string;
  author: string;
  role: string;
  avatar: string;
  readTime: string;
  datePublished: string;
  authorJobTitle: string;
  lead: string;
  content: React.ReactNode;
}

export const BLOG_POSTS: BlogPostData[] = [
  {
    slug: "the-conversation-after-the-workshop",
    kicker: "Founder's note · July 2026",
    title: "The Conversation After the Workshop — Where Real Reflection Starts",
    description: "The most important thing anyone says at a wellness workshop is usually said afterwards, in the hallway. This is the moment GenMyo was built for.",
    author: "Rajit Punshi",
    role: "Founder & CEO, GenMyō",
    avatar: rajitImage,
    readTime: "5 min read",
    datePublished: "2026-07-01",
    authorJobTitle: "Founder & CEO",
    lead: "For years, my job was to teach resilience to people who were not allowed to look fragile.",
    content: (
      <>
        <p>
          I ran operational resilience and risk programmes for banks and institutions across Singapore, the wider APAC region and the Gulf. Thousands of executives came through those rooms. We talked about crisis response, about pressure, about how organisations survive shocks. The material was good. The frameworks worked. And yet the moments I remember are not from the sessions at all.
        </p>
        <p>
          They are from the corridor afterwards. Someone would wait until the room emptied, walk over, and lower their voice. What they wanted to talk about was never the framework. It was the thing underneath: the promotion that arrived and somehow felt like nothing. The parent they had become without ever deciding to be like their own. The quiet 3am question of whether any of it was theirs, or just a script they had inherited and performed well.
        </p>
        
        <blockquote className="border-l-[3px] border-[#C2A053] pl-6 my-6 font-serif italic text-xl md:text-2xl text-[#1C1A16]">
          Stress was never the real subject. The story was.
        </blockquote>

        <p>
          Here is what those corridor conversations taught me. Most of what we call stress is a symptom. Beneath it sits a story, and the story is generational. A 28-year-old and a 52-year-old are not carrying the same script. One inherited "you can be anything" and is drowning in the weight of infinite options. The other inherited "provide, endure, do not complain" and is discovering that arrival does not feel like the brochure promised. Same office, same pressure, entirely different inner architecture.
        </p>
        <p>
          The people who could afford to explore that story had therapists and coaches. Most people cannot. Not because they are not struggling, but because the front door is too heavy: too expensive, too clinical, too much of an admission. So they carry it, quietly, and perform wellness at the office town hall.
        </p>

        <h4 className="font-serif text-xl md:text-2xl font-medium mt-10 mb-4 text-[#1C1A16]">
          Why we built it on WhatsApp
        </h4>
        <p>
          GenMyō began with a simple conviction: the work of understanding yourself should start upstream, long before anything needs a diagnosis, in a place with no waiting room. For most of the world, that place is WhatsApp. No app to download, no account to perform, no threshold to cross. Just a calm, AI-guided space that asks you one honest question a day and remembers your answers.
        </p>
        <p>
          We call it The Mirror Project because that is what it does. It does not advise. It does not diagnose. It reflects, and over time the reflection gets truer, because it learns the chapter you are in and the patterns you inherited. Two minutes a day. That is the whole ask.
        </p>
        <p>
          I should be clear about what GenMyō is not, because in this space honesty is the product. It is not therapy. It is not religion. It is not a substitute for professional care, and we will never pretend otherwise. It is the step before all of that: the daily practice of noticing your own story, so that whatever you do next, you do it awake.
        </p>
        <p>
          The corridor conversations convinced me there are millions of people standing just outside the room, waiting for a way in that does not cost them their privacy, their savings, or their pride. We are building that way in.
        </p>
        <p>
          If that sounds like something you have been waiting for, the mirror is ready when you are.
        </p>
      </>
    )
  },
  {
    slug: "what-a-hundred-honest-conversations-taught-us",
    kicker: "Research notes · July 2026",
    title: "What 100 Honest Conversations Taught Us About Feeling Stuck",
    description: "We ran 100 guided reflections before we built anything. Here's the pattern we didn't expect: most people didn't want answers. They wanted a better question.",
    author: "Sid",
    role: "Founding Team: Product and Growth, GenMyō",
    avatar: sidImage,
    readTime: "4 min read",
    datePublished: "2026-07-01",
    authorJobTitle: "Founding Team: Product and Growth",
    lead: "Before we wrote a line of product, we spent months doing something unfashionable: listening without pitching.",
    content: (
      <>
        <p>
          The discipline came from customer development research I did during my time at UCL. The rule is simple and brutal: never ask people whether they would use your idea, because they will be polite and lie. Ask instead about their life as it actually is. What they struggle with. What they have tried. What they gave up on, and why.
        </p>
        <p>
          So that is what we did, across ages, industries and cities. And three findings reshaped what GenMyō became.
        </p>

        <h4 className="font-serif text-xl md:text-2xl font-medium mt-10 mb-4 text-[#1C1A16]">
          1. Wellness is not a perk. It is the development need.
        </h4>
        <p>
          When we asked people what they most wanted to develop in themselves, we expected skills: leadership, communication, technical depth. Instead, nearly two thirds named their mental and emotional wellness first, ahead of any professional skill. Read that again. The thing people most want to grow is not on any corporate training catalogue. They are not asking to be more productive. They are asking to understand themselves better.
        </p>

        <h4 className="font-serif text-xl md:text-2xl font-medium mt-10 mb-4 text-[#1C1A16]">
          2. People do not want to be tracked. They want to be understood.
        </h4>
        <p>
          Almost everyone we spoke to had tried a wellness app, and many had tried an AI chatbot too. Almost everyone had abandoned them. Mood scores, streaks and dashboards measure you, but they do not know you. The chatbots were worse in a particular way: fluent, generic advice, the kind you could find in any article, with no sense of the patterns across time or the deeper behaviour underneath a person's words. People could tell us what an app had recorded about them, and in the same breath tell us it understood nothing about why they felt the way they did.
        </p>
        <p>
          That is the gap in this entire industry. Mood is a reading. Story is an understanding. Every product measures the first; almost none attempts the second. The moment we tested reflections that responded to a person's actual chapter of life, the reaction changed from polite interest to something closer to being seen.
        </p>

        <h4 className="font-serif text-xl md:text-2xl font-medium mt-10 mb-4 text-[#1C1A16]">
          3. Small and daily beats deep and rare.
        </h4>
        <p>
          People told us they could not sustain 40-minute sessions, weekly journals, or anything that felt like homework. What they could sustain was two minutes, inside an app they already open fifty times a day. Depth, we learned, is not a function of session length. It is a function of consistency multiplied by relevance. A short reflection that lands exactly where you are does more than an hour of generic content.
        </p>
        <p>
          These three findings are now the spine of GenMyō: wellness as the first development need, story over mood, and consistency over intensity. The daily two-minute rhythm on WhatsApp is how we chose to answer them, but the findings themselves came first. None of it came from a brainstorm. All of it came from people generous enough to tell us the truth.
        </p>
        <p>
          The research continues with every cohort we run, and honestly, being proven wrong by real people is the best part of this job. If you would like to be one of the people who shapes what GenMyō becomes, begin your reflection. We are listening.
        </p>
      </>
    )
  }
];

const Blog = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "GenMyō Blog",
    "description": "Notes on inner wellness from the GenMyō team.",
    "url": "https://www.genmyo.ai/blog",
    "publisher": {
      "@type": "Organization",
      "name": "GenMyō Pte. Ltd.",
      "url": "https://www.genmyo.ai"
    },
    "blogPost": BLOG_POSTS.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.description,
      "url": `https://www.genmyo.ai/blog/${post.slug}`,
      "datePublished": post.datePublished,
      "author": { "@type": "Person", "name": post.author, "jobTitle": post.authorJobTitle },
      "publisher": { "@type": "Organization", "name": "GenMyō Pte. Ltd." }
    }))
  };

  return (
    <Layout>
      <SEO
        title="The GenMyo Journal — Notes on Reflection, Clarity & Quiet Growth"
        description="Essays on self-awareness, honest conversation, and growing at your own pace. Written by the people building The Mirror Project."
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      {/* HEADER */}
      <header className="py-20 md:py-24 text-center bg-background">
        <div className="max-w-[1080px] mx-auto px-6 md:px-10">
          <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[#B0703E] mb-4">
            The GenMyō Blog
          </div>
          <h1 className="font-serif font-light text-4xl md:text-6xl tracking-tight leading-[1.06] text-[#1C1A16] max-w-3xl mx-auto">
            Notes on the <em className="italic text-[#B0703E] not-italic">inner life.</em>
          </h1>
          <p className="text-base md:text-lg text-[#4A463E] max-w-[560px] mx-auto mt-6 leading-relaxed">
            Short essays from the people building GenMyō. On reflection, generations, and why understanding your story matters more than tracking your mood.
          </p>
        </div>
      </header>

      {/* INDEX CARDS */}
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="text-left bg-white border border-border/80 rounded-[22px] p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-250 flex flex-col w-full"
            >
              <div
                className={`text-xs font-bold tracking-[0.14em] uppercase mb-4 ${
                  post.slug === "the-conversation-after-the-workshop"
                    ? "text-[#B0703E]"
                    : "text-[#5C7060]"
                }`}
              >
                {post.kicker.split(" · ")[0]}
              </div>
              <h3 className="font-serif text-2xl font-medium leading-snug mb-3 text-[#1C1A16]">
                {post.title}
              </h3>
              <p className="text-sm text-[#4A463E] leading-relaxed mb-6">
                {post.description}
              </p>
              
              <div className="flex justify-between items-center mt-auto pt-4 border-t border-border/20">
                <div className="by flex items-center gap-3">
                  <img
                    src={post.avatar}
                    alt={post.author}
                    className="w-[38px] h-[38px] rounded-full object-cover shrink-0"
                  />
                  <div>
                    <div className="text-xs font-semibold text-[#1C1A16]">{post.author}</div>
                    <div className="text-[10px] text-[#8C8678]">{post.readTime}</div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#B0703E] hover:underline">
                  Read more →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <section className="bg-[#F4F0E7] text-center py-16">
        <div className="max-w-[1080px] mx-auto px-6 md:px-10">
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#1C1A16] mb-6">
            Two minutes a day. Begin on WhatsApp.
          </h2>
          <Link
            to="/join"
            className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold rounded-full bg-[#B0703E] text-white hover:bg-[#965A2C] transition-colors"
          >
            Start your free reflection
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
