import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { SEO } from "@/components/SEO";
import genmyoOrb from "@/assets/genmyo-orb-gold.png";
import { MessageCircle, Linkedin, Instagram, Twitter, Mail, ArrowUpRight } from "lucide-react";

const primaryAction = {
  title: "Start Reflection on WhatsApp",
  subtitle: "Free 2-minute guided reflection — no app required",
  url: "https://wa.me/message/Y4GOKBIGBWUUM1?text=hi%20mirror",
  icon: MessageCircle,
};

const socialHandles = [
  {
    title: "GenMyō Instagram",
    subtitle: "@genmyoai — Daily prompts & quiet reflection notes",
    url: "https://www.instagram.com/genmyoai/",
    icon: Instagram,
  },
  {
    title: "GenMyō Twitter / X",
    subtitle: "@GenmyoAI — Thoughts on inner development & AI",
    url: "https://x.com/GenmyoAI",
    icon: Twitter,
  },
  {
    title: "GenMyō LinkedIn",
    subtitle: "Official company updates & research insights",
    url: "https://www.linkedin.com/company/genmyo",
    icon: Linkedin,
  },
  {
    title: "Contact Us Directly",
    subtitle: "hello@genmyo.ai",
    url: "mailto:hello@genmyo.ai",
    icon: Mail,
  },
];

const Linktree = () => {
  const linktreeSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://genmyo.ai/linktree#webpage",
    "url": "https://genmyo.ai/linktree",
    "name": "GenMyō Official Social Handles & Channels",
    "description": "Connect with GenMyō across all official social handles, LinkedIn profiles, and WhatsApp channels.",
    "publisher": { "@id": "https://genmyo.ai/#organization" }
  };

  return (
    <Layout showFAQ={false}>
      <SEO
        title="Official Handles & Links — GenMyō"
        description="Access all official GenMyō social channels, LinkedIn handles, and WhatsApp reflection links in one high-contrast hub."
        jsonSchema={linktreeSchema}
      />

      <section className="relative overflow-hidden -mt-20 text-primary-foreground bg-hero-dark min-h-screen flex items-center justify-center py-28 px-4 sm:px-6">
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(60% 60% at 50% 35%, hsl(var(--gold) / 0.15), transparent 70%)" }}
        />

        <div className="relative w-full max-w-lg mx-auto text-center flex flex-col items-center justify-center">
          {/* Header profile */}
          <div className="mb-8 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-[#24211D] border border-white/15 flex items-center justify-center mb-4 p-3 backdrop-blur-md shadow-2xl">
              <img src={genmyoOrb} alt="GenMyo Orb" className="w-full h-full object-contain" />
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-white mb-2">
              GenMyō
            </h1>
            <p className="text-sm md:text-base text-stone-300 font-light max-w-md leading-relaxed">
              An inner wellness space delivered through WhatsApp. Connect with our team and official channels below.
            </p>
          </div>

          {/* Primary CTA Button */}
          <div className="w-full mb-6">
            <a
              href={primaryAction.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full p-4 rounded-2xl bg-[#C2A053] hover:bg-[#d4b05e] text-[#141210] border border-[#d4b05e] transition-all duration-300 flex items-center justify-between gap-4 shadow-xl shadow-gold/15 scale-[1.01]"
            >
              <div className="w-10 h-10 rounded-xl bg-black/10 text-[#141210] grid place-items-center shrink-0">
                <MessageCircle size={22} />
              </div>
              <div className="flex-1 text-left">
                <h2 className="font-serif text-base font-bold leading-snug">
                  {primaryAction.title}
                </h2>
                <p className="text-xs text-[#141210]/80 font-medium">
                  {primaryAction.subtitle}
                </p>
              </div>
              <ArrowUpRight size={18} className="shrink-0 text-[#141210]" />
            </a>
          </div>

          {/* Divider label */}
          <div className="w-full flex items-center gap-3 my-4">
            <div className="h-px bg-white/10 flex-1" />
            <span className="text-xs uppercase tracking-widest text-[#E6C675] font-semibold">Official Channels & Handles</span>
            <div className="h-px bg-white/10 flex-1" />
          </div>

          {/* Social Links List */}
          <div className="w-full space-y-3">
            {socialHandles.map((item, idx) => {
              const Icon = item.icon;
              return (
                <a
                  key={idx}
                  href={item.url}
                  target={item.url.startsWith("mailto:") ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  className="group block w-full text-left"
                >
                  <div className="w-full p-4 rounded-2xl bg-[#221F1C]/90 border border-white/15 hover:border-[#C2A053]/60 hover:bg-[#2A2622] transition-all duration-300 flex items-center justify-between gap-4 backdrop-blur-md shadow-md">
                    <div className="w-10 h-10 rounded-xl bg-[#C2A053]/15 border border-[#C2A053]/30 text-[#E6C675] grid place-items-center shrink-0">
                      <Icon size={18} />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-serif text-base font-medium text-white group-hover:text-[#E6C675] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-stone-300 font-light mt-0.5 line-clamp-1">
                        {item.subtitle}
                      </p>
                    </div>
                    <ArrowUpRight size={16} className="shrink-0 text-stone-400 group-hover:text-[#E6C675] transition-colors" />
                  </div>
                </a>
              );
            })}
          </div>

          {/* Navigation Links */}
          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-stone-400">
            <Link to="/philosophy" className="hover:text-[#E6C675] transition-colors">Our Philosophy</Link>
            <span>&middot;</span>
            <Link to="/how-it-works" className="hover:text-[#E6C675] transition-colors">How It Works</Link>
            <span>&middot;</span>
            <Link to="/privacy" className="hover:text-[#E6C675] transition-colors">Privacy Policy</Link>
          </div>

          {/* Footer note */}
          <div className="mt-6 text-xs text-stone-400">
            © {new Date().getFullYear()} GenMyō Pte. Ltd. &middot; hello@genmyo.ai
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Linktree;
