import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Helmet } from "react-helmet-async";
import { ArrowLeft } from "lucide-react";
import { BLOG_POSTS } from "./Blog";
import NotFound from "./NotFound";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return <NotFound />;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "url": `https://www.genmyo.ai/blog/${post.slug}`,
    "datePublished": post.datePublished,
    "author": {
      "@type": "Person",
      "name": post.author,
      "jobTitle": post.authorJobTitle
    },
    "publisher": {
      "@type": "Organization",
      "name": "GenMyō Pte. Ltd.",
      "url": "https://www.genmyo.ai"
    }
  };

  return (
    <Layout>
      <SEO
        title={`${post.title} · GenMyō Blog`}
        description={post.description}
      />
      <Helmet>
        <link rel="canonical" href={`https://www.genmyo.ai/blog/${post.slug}`} />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <div className="bg-white border-b border-border/80">
        <article
          className="max-w-[720px] mx-auto px-6 py-16"
          itemScope
          itemType="https://schema.org/BlogPosting"
        >
          <div className="mb-6">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B0703E] hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to all notes
            </Link>
          </div>

          <div
            className={`text-xs font-semibold tracking-widest uppercase mb-4 ${
              post.slug === "the-conversation-after-the-workshop"
                ? "text-[#B0703E]"
                : "text-[#5C7060]"
            }`}
          >
            {post.kicker}
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-medium leading-tight mb-6 text-[#1C1A16]">
            {post.title}
          </h2>
          <div className="flex items-center gap-3 mb-8">
            <img
              src={post.avatar}
              alt={post.author}
              className="w-[44px] h-[44px] rounded-full object-cover shrink-0"
            />
            <div>
              <div className="text-sm font-semibold text-[#1C1A16]">{post.author}</div>
              <div className="text-xs text-[#8C8678]">{post.role} · {post.readTime}</div>
            </div>
          </div>

          <div className="space-y-6 text-[#4A463E] text-base md:text-lg leading-relaxed">
            <p className="font-medium text-lg md:text-xl text-[#1C1A16] leading-relaxed">
              {post.lead}
            </p>
            {post.content}
          </div>

          <div className="border-t border-border/80 mt-10 pt-6 text-xs text-[#8C8678] italic leading-relaxed">
            GenMyō is non-clinical, non-religious inner wellness: guided reflection and mentorship, not therapy or medical care. If you are in distress, please contact local support services. In Singapore, the Samaritans of Singapore are available 24 hours on 1767.
          </div>
        </article>
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

export default BlogPost;
