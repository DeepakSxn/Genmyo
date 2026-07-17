import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { SEO } from "@/components/SEO";
import {
  Heart,
  FileText,
  Gift,
  Globe,
  Users,
  Clock,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  Mail,
  Plus,
  Shield,
  Compass,
  ArrowRight,
} from "lucide-react";

const Partners = () => {
  return (
    <Layout showFAQ={false}>
      <SEO
        title="Partners & Collaborators | GenMyo"
        description="The coaches, practitioners, and organisations we build The Mirror Project alongside — and how to partner with us."
      />

      {/* ===== BLACK AND GOLD HERO ===== */}
      <header className="relative bg-hero-dark text-primary-foreground text-center py-24 md:py-32 overflow-hidden -mt-20">
        {/* Ambient glow */}
        <div className="absolute top-[-180px] left-1/2 -translate-x-1/2 w-[820px] h-[820px] rounded-full bg-[radial-gradient(circle,rgba(194,160,83,0.16),transparent_62%)] pointer-events-none" />
        
        {/* Rings */}
        <div className="absolute inset-0 pointer-events-none opacity-55">
          <svg viewBox="0 0 1000 700" className="w-full h-full object-cover">
            <circle cx="500" cy="150" r="150" fill="none" stroke="rgba(194,160,83,0.20)" strokeWidth="1" />
            <circle cx="500" cy="150" r="270" fill="none" stroke="rgba(194,160,83,0.14)" strokeWidth="1" />
            <circle cx="500" cy="150" r="400" fill="none" stroke="rgba(194,160,83,0.09)" strokeWidth="1" />
            <circle cx="500" cy="150" r="540" fill="none" stroke="rgba(194,160,83,0.05)" strokeWidth="1" />
          </svg>
        </div>

        <div className="relative z-10 max-w-[1120px] mx-auto px-6 md:px-10 flex flex-col items-center">
          {/* Sun icon */}
          <svg className="mb-8 w-16 h-16 animate-[spin_70s_linear_infinite]" viewBox="0 0 100 100" fill="none">
            <g stroke="#C2A053" strokeWidth="3" strokeLinecap="round">
              <path d="M50 50 C50 34 52 26 50 14" />
              <path d="M50 50 C61 39 68 35 78 28" />
              <path d="M50 50 C66 50 74 52 86 50" />
              <path d="M50 50 C61 61 68 65 78 72" />
              <path d="M50 50 C50 66 52 74 50 86" />
              <path d="M50 50 C39 61 35 65 28 78" />
              <path d="M50 50 C34 50 26 52 14 50" />
              <path d="M50 50 C39 39 35 35 28 22" />
            </g>
            <circle cx="50" cy="50" r="6" fill="#C2A053" />
          </svg>

          <div className="text-xs font-semibold tracking-[0.24em] uppercase text-[#C2A053] mb-4">
            Partners · Value creation · Giving back
          </div>

          <h1 className="font-serif font-light text-4xl md:text-6xl tracking-tight leading-[1.07] mb-6 text-white max-w-3xl">
            Do work that <em className="italic text-[#C2A053] not-italic">matters.</em>
          </h1>

          <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed mb-10">
            GenMyō begins as a calm, AI-guided space on WhatsApp where people reflect, think clearly, and take the first step inward. When they are ready, it connects them to a real human. There are two ways to be part of that: join our paid Human Layer as a Guide or Mentor, or help widen access through our giving-back model.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#roles"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold bg-[#C2A053] text-[#1C1A16] rounded-full hover:bg-[#D9BC7A] transition-colors shadow-lg shadow-[#C2A053]/35 active:scale-[0.98] duration-150"
            >
              Join as a Guide or Mentor
            </a>
            <a
              href="#giving"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold border border-white/30 text-white rounded-full hover:border-[#C2A053] hover:text-[#C2A053] bg-transparent transition-colors active:scale-[0.98] duration-150"
            >
              Pay it forward ↓
            </a>
          </div>

          <p className="text-xs text-white/50 mt-6">
            Non-clinical, non-religious · mindfulness &amp; mentorship · independent, flexible, online
          </p>

          <div className="relative z-10 flex flex-wrap gap-2 justify-center mt-10">
            {[
              { label: "Why join", href: "#why" },
              { label: "The roles", href: "#roles" },
              { label: "What we look for", href: "#look" },
              { label: "How to apply", href: "#apply" },
              { label: "Pay it forward", href: "#giving", highlight: true },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-xs font-semibold px-4 py-2 rounded-full border transition-colors ${
                  link.highlight
                    ? "border-[#C2A053]/30 text-[#C2A053] hover:bg-[#C2A053]/10"
                    : "border-white/20 text-white/80 hover:text-white hover:border-white/40"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Giving Back upfront plaque */}
          <div className="relative z-10 max-w-3xl w-full mt-14 p-6 md:p-8 rounded-2xl border border-[#C2A053]/30 bg-gradient-to-br from-[#C2A053]/10 to-[#C2A053]/03 flex flex-col md:flex-row items-center gap-6 text-left">
            <div className="w-14 h-14 rounded-xl border border-[#C2A053]/30 flex items-center justify-center bg-[#C2A053]/10 shrink-0">
              <Heart className="w-6 h-6 text-[#C2A053]" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <span className="text-[10px] font-semibold tracking-widest text-[#C2A053] uppercase block mb-1">
                The second way · Pay it forward
              </span>
              <h3 className="font-serif text-xl text-white font-medium mb-2">
                Wellbeing that <em className="italic text-[#C2A053] not-italic">pays itself forward.</em>
              </h3>
              <p className="text-sm text-white/70 leading-relaxed">
                We are building a give-forward layer so commercial success widens access rather than gates it, reaching people who could never otherwise afford to take part.
              </p>
            </div>
            <a
              href="#giving"
              className="px-6 py-2.5 text-sm font-semibold border border-white/30 text-white rounded-full hover:border-[#C2A053] hover:text-[#C2A053] transition-colors shrink-0"
            >
              Learn more
            </a>
          </div>
        </div>
      </header>

      {/* ===== GIVING BACK showpiece ===== */}
      <section id="giving" className="py-20 bg-gradient-to-b from-[#16130E] to-[#1C1811] text-white relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-[-160px] right-[-140px] w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,rgba(194,160,83,0.14),transparent_65%)] pointer-events-none" />

        <div className="max-w-[1120px] mx-auto px-6 md:px-10 text-center relative z-10">
          <div className="text-xs font-semibold tracking-widest text-[#C2A053] uppercase mb-4">
            The second way · Pay it forward
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight leading-tight mb-6">
            Growth and good,<br />
            <em className="italic text-[#C2A053] not-italic">compounding together.</em>
          </h2>
          <div className="w-[74px] h-[1px] bg-gradient-to-r from-transparent via-[#C2A053] to-transparent mx-auto mb-8" />
          
          <p className="text-white/75 text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-12">
            GenMyō reaches people on the channel they already use, with no app and no cost barrier. That reach is our impact. As the platform grows, a give-forward layer grows with it, carrying real inner wellness to those who could never pay for it. This is separate from our paid Human Layer above; it is for anyone, including practitioners, who wants to help widen access.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
            {[
              {
                icon: <FileText className="w-5 h-5 text-[#C2A053]" />,
                title: "Sponsored seats",
                desc: "Organisations sponsor access for non-employees or underserved groups.",
              },
              {
                icon: <Gift className="w-5 h-5 text-[#C2A053]" />,
                title: "Buy one, give one",
                desc: "Each paying member helps fund free access for someone who cannot pay.",
              },
              {
                icon: <Globe className="w-5 h-5 text-[#C2A053]" />,
                title: "Access fund",
                desc: "A share of revenue opens the platform in lower-income communities.",
              },
            ].map((model, i) => (
              <div
                key={i}
                className="border border-[#C2A053]/30 rounded-2xl p-6 bg-gradient-to-b from-[#C2A053]/07 to-[#C2A053]/02 hover:border-[#C2A053]/60 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl border border-[#C2A053]/30 flex items-center justify-center bg-[#C2A053]/10 mb-4">
                  {model.icon}
                </div>
                <h4 className="font-serif text-lg font-medium text-white mb-2">{model.title}</h4>
                <p className="text-sm text-white/66 leading-relaxed">{model.desc}</p>
              </div>
            ))}
          </div>

          <div className="inline-flex items-center gap-2 mt-12 px-5 py-2.5 rounded-full border border-dashed border-[#C2A053]/30 text-xs font-semibold tracking-wider text-[#C2A053] uppercase bg-[#C2A053]/05">
            <Clock className="w-4 h-4" />
            Model in development · structure to be confirmed
          </div>

          <div className="mt-8">
            <a
              href="mailto:hello@genmyo.ai?subject=Giving%20Back%20%C2%B7%20I%20want%20to%20be%20part%20of%20this&body=Hi%20GenMy%C5%8D%20team%2C%0A%0AI'd%20like%20to%20get%20involved%20with%20the%20GenMy%C5%8D%20giving-back%20initiative.%0A%0A(Please%20let%20us%20know%20how%20you%20would%20like%20to%20contribute%20-%20for%20example%3A%20sponsoring%20access%20for%20underserved%20groups%2C%20contributing%20mentor%2Fpractitioner%20time%2C%20or%20helping%20shape%20the%20model.)%0A%0AMy%20details%3A%0A-%20Name%3A%20%0A-%20Organization%20(if%20applicable)%3A%20%0A-%20How%20I'd%20like%20to%20help%3A%20%0"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold bg-[#C2A053] text-[#1C1A16] rounded-full hover:bg-[#D9BC7A] transition-colors shadow-lg shadow-[#C2A053]/35 active:scale-[0.98] duration-150"
            >
              I want to be part of this
            </a>
          </div>

          <p className="text-xs text-white/50 mt-6">
            Want to sponsor access, contribute mentor time, or help shape the model? Write to{" "}
            <strong className="text-white">hello@genmyo.ai</strong>. We would love to talk.
          </p>
        </div>
      </section>

      {/* ===== WHY JOIN ===== */}
      <section id="why" className="py-16 bg-background">
        <div className="max-w-[1120px] mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <div className="text-xs font-semibold tracking-widest text-[#B0703E] uppercase mb-3">
              Why this is different
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight">
              Meaningful work, on your terms.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                bgIcon: "bg-[#5C7060]/15",
                icon: <Users className="w-6 h-6 text-[#5C7060]" />,
                title: "Matched, not assigned",
                desc: "GenMyō connects you only with people you are genuinely suited to help: by focus, by generation, by need. Fewer mismatches, more meaningful work.",
              },
              {
                bgIcon: "bg-[#B0703E]/12",
                icon: <Clock className="w-6 h-6 text-[#B0703E]" />,
                title: "Work that fits your life",
                desc: "Sessions are online and you set your own availability. You stay independent, contributing as much or as little as suits your practice and season of life.",
              },
              {
                bgIcon: "bg-[#2C3A4A]/12",
                icon: <TrendingUp className="w-6 h-6 text-[#2C3A4A]" />,
                title: "Grow with a movement",
                desc: "Join early and help shape how a new kind of inner wellness reaches people who could never otherwise afford to join, across generations and at real scale.",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-white border border-border/80 rounded-[22px] p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${card.bgIcon}`}>
                  {card.icon}
                </div>
                <h3 className="font-serif text-xl font-medium mb-3 text-[#1C1A16]">{card.title}</h3>
                <p className="text-sm text-[#4A463E] leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== THE ROLES ===== */}
      <section id="roles" className="py-20 bg-[#F4F0E7]">
        <div className="max-w-[1120px] mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <div className="text-xs font-semibold tracking-widest text-[#B0703E] uppercase mb-3">
              The first way · Join the Human Layer
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight mb-4">
              Find where you belong.
            </h2>
            <p className="text-sm md:text-base text-[#4A463E] max-w-2xl mx-auto leading-relaxed">
              Our Human Layer is a paid marketplace of independent Guides and Mentors. Both roles are non-clinical and deeply human; the difference is in focus and rhythm.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Guide Role */}
            <div className="rounded-3xl border border-border/80 bg-white shadow-lg overflow-hidden flex flex-col">
              <div className="p-8 md:p-10 text-white relative bg-gradient-to-br from-[#5C7060] to-[#46563F]">
                <div className="absolute top-6 right-6 w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-white/80 block mb-2">
                  Mindfulness Guide
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-medium leading-snug mb-3">
                  The framework-aligned<br />practitioner.
                </h3>
                <p className="text-sm text-white/90 leading-relaxed max-w-xs">
                  For experienced mindfulness, meditation and somatic practitioners who can guide people through GenMyō's approach to inner wellness with depth and care.
                </p>
              </div>
              <div className="p-8 md:p-10 flex-1 flex flex-col">
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#B0703E] block mb-4">
                  What you'd do
                </span>
                <ul className="space-y-3.5 mb-8 flex-1">
                  {[
                    "Lead 1:1 sessions and small group circles, grounded in mindfulness and reflective practice",
                    "Help people move from insight to practice, turning the noticing into the doing",
                    "Bring your own tradition and training to a shared standard of care",
                    "Hold a calm, non-clinical space; guide toward wellbeing, never diagnosis or therapy",
                  ].map((item, idx) => (
                    <li key={idx} className="text-sm text-[#4A463E] leading-relaxed pl-7 relative">
                      <span className="absolute left-0 top-1 w-4 h-4 rounded-full bg-[#5C7060]/14 flex items-center justify-center">
                        <CheckCircle2 className="w-3 h-3 text-[#5C7060]" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="bg-[#F4F0E7] border border-border/80 rounded-xl p-4 mb-6">
                  <div className="text-[10px] font-bold tracking-widest uppercase text-[#8C8678] mb-1">
                    Best sent by email
                  </div>
                  <p className="text-xs text-[#4A463E] leading-relaxed">
                    A CV or résumé, any relevant certifications or training, and a line on your practice. A LinkedIn link is welcome too.
                  </p>
                </div>

                <a
                  href="mailto:hello@genmyo.ai?subject=Mindfulness%20Guide%20%C2%B7%20GenMy%C5%8D%20Partners&body=Hi%20GenMy%C5%8D%20team%2C%0A%0AI'd%20like%20to%20apply%20to%20join%20as%20a%20Mindfulness%20Guide.%0A%0A(Please%20attach%20your%20CV%2Fr%C3%A9sum%C3%A9%20and%20any%20certifications%2C%20and%20add%20a%20LinkedIn%20link%20if%20you%20have%20one.)%0A%0AA%20little%20about%20my%20practice%3A%0A"
                  className="w-full text-center py-3.5 px-6 text-sm font-semibold rounded-full bg-[#B0703E] text-white hover:bg-[#965A2C] transition-colors"
                >
                  Apply as a Guide →
                </a>
              </div>
            </div>

            {/* Mentor Role */}
            <div className="rounded-3xl border border-border/80 bg-white shadow-lg overflow-hidden flex flex-col">
              <div className="p-8 md:p-10 text-white relative bg-gradient-to-br from-[#B0703E] to-[#965A2C]">
                <div className="absolute top-6 right-6 w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">
                  <Compass className="w-5 h-5 text-white" />
                </div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-white/80 block mb-2">
                  Mentor
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-medium leading-snug mb-3">
                  The one who's<br />walked it before.
                </h3>
                <p className="text-sm text-white/90 leading-relaxed max-w-xs">
                  For people with real lived experience and wisdom to share: on careers, relationships, transitions, identity. You have been where others are going, and you want to help them through.
                </p>
              </div>
              <div className="p-8 md:p-10 flex-1 flex flex-col">
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#B0703E] block mb-4">
                  What you'd do
                </span>
                <ul className="space-y-3.5 mb-8 flex-1">
                  {[
                    "Meet people 1:1 for honest, practical mentorship on life and work",
                    "Draw on your own journey; GenMyō matches you to those you can truly help",
                    "Offer perspective and encouragement, as a guide who is one chapter ahead",
                    "Give an hour where it changes a week. Flexible, online, on your schedule",
                  ].map((item, idx) => (
                    <li key={idx} className="text-sm text-[#4A463E] leading-relaxed pl-7 relative">
                      <span className="absolute left-0 top-1 w-4 h-4 rounded-full bg-[#5C7060]/14 flex items-center justify-center">
                        <CheckCircle2 className="w-3 h-3 text-[#5C7060]" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="bg-[#F4F0E7] border border-border/80 rounded-xl p-4 mb-6">
                  <div className="text-[10px] font-bold tracking-widest uppercase text-[#8C8678] mb-1">
                    Best sent by email
                  </div>
                  <p className="text-xs text-[#4A463E] leading-relaxed">
                    Your LinkedIn profile or a short company/personal profile, and a few lines on the experience you'd mentor from. A CV works too.
                  </p>
                </div>

                <a
                  href="mailto:hello@genmyo.ai?subject=Mentor%20%C2%B7%20GenMy%C5%8D%20Partners&body=Hi%20GenMy%C5%8D%20team%2C%0A%0AI'd%20like%20to%20apply%20to%20join%20as%20a%20Mentor.%0A%0A(Please%20share%20your%20LinkedIn%20or%20a%20short%20profile%2C%20and%20a%20CV%20if%20handy.)%0A%0AThe%20experience%20I'd%20mentor%20from%3A%0A"
                  className="w-full text-center py-3.5 px-6 text-sm font-semibold rounded-full bg-[#B0703E] text-white hover:bg-[#965A2C] transition-colors"
                >
                  Apply as a Mentor →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PERSONAS ===== */}
      <section id="personas" className="py-20 bg-background">
        <div className="max-w-[1120px] mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <div className="text-xs font-semibold tracking-widest text-[#B0703E] uppercase mb-3">
              Who joins
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight mb-4">
              People like these.
            </h2>
            <p className="text-sm md:text-base text-[#4A463E] max-w-2xl mx-auto leading-relaxed">
              Illustrative examples of the Guides and Mentors we welcome. These are not actual GenMyo partners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: "Mei Lin, 45",
                role: "Singapore · Mindfulness Guide",
                desc: "Teaching mindfulness and somatic practice for twelve years. Holds 1:1 sessions and small circles, and helps people turn noticing into doing.",
                quote: "The pause is where the change happens.",
                tags: ["Mindfulness", "Breathwork", "Group circles"],
                avatarColor: "bg-[#5C7060]/14",
                iconColor: "#5C7060",
                quoteColor: "text-[#46563F]",
              },
              {
                name: "Arjun, 52",
                role: "Bengaluru, India · Mentor",
                desc: "Led banking operations for two decades, hit the wall, and rebuilt. Mentors mid-career professionals through burnout, transitions and what comes next.",
                quote: "I have sat where you are sitting.",
                tags: ["Career transitions", "Leadership", "Burnout recovery"],
                avatarColor: "bg-[#B0703E]/14",
                iconColor: "#B0703E",
                quoteColor: "text-[#965A2C]",
              },
              {
                name: "Sarah, 34",
                role: "Singapore · Mentor",
                desc: "A product leader who navigated her own quarter-life reset. Mentors younger professionals on identity, direction and building a life that fits.",
                quote: "You are allowed to change your mind about who you are.",
                tags: ["Early career", "Identity", "Direction"],
                avatarColor: "bg-[#2C3A4A]/12",
                iconColor: "#2C3A4A",
                quoteColor: "text-[#2C3A4A]",
              },
              {
                name: "Marcus, 56",
                role: "Singapore · Mentor · Gen X",
                desc: "Three decades in corporate life, from the trading floor to the boardroom. Now shares his lived experience with people wrestling with who they are when the business card goes away.",
                quote: "The title was never the whole of you.",
                tags: ["Mid-life reinvention", "Purpose", "Identity beyond work"],
                avatarColor: "bg-[#C2A053]/18",
                iconColor: "#96793B",
                quoteColor: "text-[#96793B]",
              },
            ].map((persona, i) => (
              <div
                key={i}
                className="bg-white border border-border/80 rounded-[22px] p-7 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-[54px] h-[54px] rounded-full flex items-center justify-center shrink-0 ${persona.avatarColor}`}>
                    <svg width="28" height="28" viewBox="0 0 54 54" fill="none">
                      <circle cx="27" cy="21" r="8" stroke={persona.iconColor} strokeWidth="2" fill="none" />
                      <path d="M12 44c2-8 8-12 15-12s13 4 15 12" stroke={persona.iconColor} strokeWidth="2" fill="none" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-[#1C1A16] font-medium">{persona.name}</h4>
                    <span className="text-xs text-[#8C8678] block">{persona.role}</span>
                  </div>
                </div>
                <p className="text-sm text-[#4A463E] leading-relaxed mb-3">{persona.desc}</p>
                <p className={`font-serif italic text-base mb-4 ${persona.quoteColor}`}>"{persona.quote}"</p>
                <div className="flex flex-wrap gap-1.5">
                  {persona.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-semibold px-3 py-1 rounded-full border border-border/80 bg-[#F4F0E7] text-[#4A463E]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-[#8C8678] max-w-xl mx-auto mt-8 leading-relaxed">
            GenMyo is not a job platform, recruitment service or professional network. Mentorship here is about the inner life: clarity, resilience and direction, never placements or referrals.
          </p>
        </div>
      </section>

      {/* ===== USER TO MENTOR LOOP ===== */}
      <section className="py-0 bg-background">
        <div className="max-w-[1120px] mx-auto px-6 md:px-10">
          <div className="relative bg-gradient-to-br from-[#5C7060] to-[#46563F] rounded-3xl p-10 md:p-12 text-white overflow-hidden">
            {/* Glow circle */}
            <div className="absolute top-[-120px] right-[-90px] w-[360px] h-[360px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.10),transparent_65%)] pointer-events-none" />

            <div className="relative z-10 max-w-3xl">
              <div className="text-xs font-semibold tracking-widest text-[#D9E2D6] uppercase mb-4">
                The loop that makes us different
              </div>
              <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight leading-tight mb-4 text-white">
                Many of our Mentors<br />began as users.
              </h2>
              <p className="text-white/95 text-base md:text-lg leading-relaxed mb-6">
                This is the quiet engine of GenMyo. Someone arrives carrying a hard chapter, works through it with reflection and support, and comes out the other side with something valuable: lived experience, and the wish to give it back. More often than not, they return not as a Guide, which asks for formal training, but as a Mentor, where what matters most is having walked the path.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 mt-6 text-sm font-semibold">
                <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-[18px] py-2">
                  Reflect
                </div>
                <span className="text-white/50 text-xl font-light leading-none">→</span>
                <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-[18px] py-2">
                  Grow
                </div>
                <span className="text-white/50 text-xl font-light leading-none">→</span>
                <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-[18px] py-2">
                  Give back
                </div>
                <span className="text-white/50 text-xl font-light leading-none">→</span>
                <div className="flex items-center gap-2 bg-[#C2A053] text-[#1C1A16] rounded-full px-[18px] py-2 font-bold">
                  Mentor
                </div>
              </div>

              <p className="text-xs text-white/70 mt-6 leading-relaxed">
                If GenMyo helped you through something and you feel ready to help others, we would love to hear from you. The same care and boundaries apply to every Mentor, however they came to us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHAT WE LOOK FOR ===== */}
      <section id="look" className="py-20 bg-background">
        <div className="max-w-[1120px] mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <div className="text-xs font-semibold tracking-widest text-[#B0703E] uppercase mb-3">
              What we look for
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight mb-4">
              Qualities, not just credentials.
            </h2>
            <p className="text-sm md:text-base text-[#4A463E] max-w-2xl mx-auto leading-relaxed">
              Certifications and track record matter, but these are what make someone right for GenMyō.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {[
              {
                icon: <Heart className="w-[18px] h-[18px] text-[#B0703E]" />,
                title: "Genuine presence",
                desc: "You listen more than you fix. People feel met when they're with you.",
              },
              {
                icon: <CheckCircle2 className="w-[18px] h-[18px] text-[#B0703E]" />,
                title: "Clarity on what we are not",
                desc: "GenMyō is not religion, therapy or clinical treatment. You know that line and you honour it.",
              },
              {
                icon: <Plus className="w-[18px] h-[18px] text-[#B0703E]" />,
                title: "Cross-generational range",
                desc: "You can meet a 24-year-old and a 54-year-old each where they are.",
              },
              {
                icon: <CheckCircle2 className="w-[18px] h-[18px] text-[#B0703E]" />,
                title: "Reliability & care",
                desc: "People are trusting you with something tender. You show up, prepared.",
              },
              {
                icon: <Heart className="w-[18px] h-[18px] text-[#B0703E]" />,
                title: "True believers",
                desc: "You are drawn to value creation and giving back, not purely commercial work. You want wellbeing to reach people who cannot always pay.",
              },
              {
                icon: <Shield className="w-[18px] h-[18px] text-[#B0703E]" />,
                title: "Boundaries & confidentiality",
                desc: "You respect GenMyō’s boundaries and uphold our confidentiality and privacy standards, without exception.",
              },
            ].map((quality, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-[34px] h-[34px] rounded-lg bg-[#B0703E]/12 flex items-center justify-center shrink-0">
                  {quality.icon}
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-1 text-[#1C1A16]">{quality.title}</h4>
                  <p className="text-xs text-[#4A463E] leading-relaxed">{quality.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== APPLY BAND ===== */}
      <section id="apply" className="py-10 bg-background">
        <div className="max-w-[1120px] mx-auto px-6 md:px-10">
          <div className="relative bg-[#1C1A16] text-white rounded-3xl p-10 md:p-16 text-center overflow-hidden">
            {/* Glow */}
            <div className="absolute top-[-140px] right-[-100px] w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(194,160,83,0.22),transparent_65%)] pointer-events-none" />

            <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
              <div className="text-xs font-semibold tracking-widest text-[#C2A053] uppercase mb-4">
                How to apply
              </div>
              <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight leading-tight mb-4 text-white">
                Introduce yourself.<br />We'd love to meet you.
              </h2>
              <p className="text-white/80 text-sm md:text-base leading-relaxed mb-6">
                There is no long form to fill in. Just write to us with a little about who you are and how you would like to contribute, as a Guide or a Mentor.
              </p>

              <a
                href="mailto:hello@genmyo.ai?subject=Joining%20the%20GenMy%C5%8D%20Partners"
                className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-[#C2A053]/14 border border-[#C2A053]/32 font-serif text-lg md:text-xl text-white hover:bg-[#C2A053]/22 hover:border-[#C2A053] transition-all"
              >
                <Mail className="w-5 h-5 text-white" />
                hello@genmyo.ai
              </a>

              <p className="text-xs text-white/60 mt-4">
                Tell us whether you're applying as a <strong className="text-white">Guide</strong> or a <strong className="text-white">Mentor</strong>, and attach whatever best represents you.
              </p>

              <div className="flex flex-wrap justify-center gap-3 mt-8">
                {[
                  { num: "1", label: "Email hello@genmyo.ai" },
                  { num: "2", label: "Send your CV, profile, or LinkedIn" },
                  { num: "3", label: "We'll be in touch to talk" },
                ].map((step) => (
                  <div
                    key={step.num}
                    className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/10 border border-white/10 text-xs text-white/85"
                  >
                    <span className="w-[22px] h-[22px] rounded-full bg-[#C2A053] text-[#1C1A16] flex items-center justify-center text-[10px] font-bold shrink-0">
                      {step.num}
                    </span>
                    <span className="text-left">{step.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FUTURE PARTNERS ===== */}
      <section className="py-10 bg-background">
        <div className="max-w-[1120px] mx-auto px-6 md:px-10">
          <div className="border border-dashed border-border/80 rounded-3xl p-8 bg-[#F4F0E7] flex flex-col md:flex-row gap-6 items-center justify-between text-center md:text-left">
            <div>
              <h4 className="font-serif text-lg font-medium text-[#1C1A16] mb-2 md:mb-1">
                More ways to partner with GenMyō are coming.
              </h4>
              <p className="text-xs text-[#8C8678]">
                Interested already? Write to{" "}
                <a href="mailto:hello@genmyo.ai" className="color-[#B0703E] font-semibold hover:underline">
                  hello@genmyo.ai
                </a>
                .
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5 justify-center md:justify-end">
              {["Content partners", "Pilot employers", "Community leaders"].map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3.5 py-1.5 rounded-full bg-white border border-border/80 text-[#4A463E] font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-16 bg-[#F4F0E7]">
        <div className="max-w-[1120px] mx-auto px-6 md:px-10">
          <div className="text-center mb-10">
            <div className="text-xs font-semibold tracking-widest text-[#B0703E] uppercase mb-3">
              Good to know
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight">
              A few common questions.
            </h2>
          </div>

          <div className="max-w-3xl mx-auto flex flex-col gap-3">
            {[
              {
                q: "Is this employment or freelance?",
                a: "The Human Layer is a marketplace: you set your availability and are matched to people you can help. We will cover how sessions, scheduling and rates work when we talk. You stay independent.",
              },
              {
                q: "Do I need formal certifications?",
                a: "For Guides, relevant mindfulness, meditation or somatic training matters. For Mentors, lived experience and wisdom matter most. In both cases, we look at the whole person. Send what best represents you.",
              },
              {
                q: "How does matching work?",
                a: "GenMyō connects people to the Guides and Mentors best suited to their needs and focus. We'll walk you through how it works, and the standards we hold, when we talk.",
              },
              {
                q: "Is GenMyō a job or networking platform?",
                a: "No. GenMyō is not a job platform, recruitment service or professional network. Mentors share lived experience to support a person's inner life: clarity, resilience and direction. They do not offer placements, referrals or career services.",
              },
              {
                q: "Is GenMyō religious or clinical?",
                a: "No. GenMyō is non-clinical, non-religious inner wellness: mindfulness and mentorship. It is not religion, therapy or clinical treatment, and it does not provide or arrange clinical care.",
              },
              {
                q: "Where do sessions happen?",
                a: "Online, so you can contribute from wherever you are.",
              },
            ].map((faq, idx) => (
              <details
                key={idx}
                className="bg-white border border-border/80 rounded-xl overflow-hidden group [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="p-5 font-semibold text-sm md:text-base cursor-pointer list-none flex justify-between items-center select-none text-[#1C1A16]">
                  {faq.q}
                  <span className="text-[#B0703E] text-xl transition-transform duration-300 group-open:rotate-45 leading-none shrink-0 ml-4 select-none">
                    +
                  </span>
                </summary>
                <div className="px-5 pb-5 text-xs md:text-sm text-[#4A463E] leading-relaxed border-t border-border/20 pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Partners;
