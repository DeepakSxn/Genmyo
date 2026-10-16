import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Mail, Heart, Shield, Clock, Users } from "lucide-react";

const mail = (subject: string, body: string) =>
  `mailto:hello@genmyo.ai?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

const GUIDE_MAIL = mail(
  "Guide application | GenMyo",
  "Hi GenMyo team,\n\nI'd like to apply as a Guide.\n\nName:\nLocation / time zone:\n\nMy training and practice:\n\nCV / certifications (attach or link):\nLinkedIn (optional):\n\nA line on why GenMyo:\n"
);

const MENTOR_MAIL = mail(
  "Mentor application | GenMyo",
  "Hi GenMyo team,\n\nI'd like to apply as a Mentor.\n\nName:\nLocation / time zone:\n\nThe experience I'd mentor from:\n\nLinkedIn or short profile:\n\nA line on why GenMyo:\n"
);

// The journey, in order. This is a real sequence, so it is numbered.
const journey = [
  ["Someone reflects", "A person works through the Mirror on WhatsApp, one question at a time, at their own pace."],
  ["They choose a human", "When they're ready for more than reflection, they ask for a person. Nobody is pushed."],
  ["We match you", "By focus, generation and need. You see what they chose to share before you say yes."],
  ["You meet online", "One-to-one, or in a small circle for Guides, at times you set."],
  ["You're paid", "For each session, at a rate you've seen before accepting your first match."],
];

const roles = [
  {
    name: "Mindfulness Guide",
    tone: "bg-[#5C7060]",
    who: "You teach mindfulness, meditation or somatic practice, and have trained to do it.",
    does: "Lead 1:1 sessions and small circles that help people turn insight into daily practice.",
    send: "Email us. The note opens with a short template: your training, CV or certifications, and a line on your practice.",
    cta: "Apply as a Guide",
    href: GUIDE_MAIL,
  },
  {
    name: "Mentor",
    tone: "bg-[#B0703E]",
    who: "You've lived through something real, like a career break, burnout, a move or a reinvention, and came out wiser.",
    does: "Meet people 1:1 for honest, practical perspective on the inner side of life and work.",
    send: "Email us. The note opens with a short template: LinkedIn or a short profile, and a few lines on what you'd mentor from.",
    cta: "Apply as a Mentor",
    href: MENTOR_MAIL,
  },
];

// TODO(founders): confirm every answer below is true before publishing.
const faqs = [
  ["How much time does it take?", "You set your availability and can change it any time. Contribute as much or as little as suits your practice and your season of life."],
  ["Who will I meet?", "People who have reflected with the Mirror and chosen to talk to a person. You're matched by focus, generation and need, not assigned at random."],
  ["Do I see what someone told the Mirror?", "You see only what the person chooses to share with you. We hold you to the same confidentiality standards we hold ourselves to."],
  ["What if someone is in crisis?", "GenMyo is not a crisis service, and you are not expected to act as one. Before your first session you'll get a clear escalation path and helpline details."],
  ["Do I need certifications?", "For Guides, relevant mindfulness, meditation or somatic training matters. For Mentors, lived experience matters most. Send what best represents you."],
  ["Is this employment?", "No. You're an independent practitioner and stay independent. It's a marketplace, so you choose when you're available."],
  ["Is GenMyo clinical, religious, or a job network?", "None of those. It's non-clinical, non-religious inner wellness. Mentors don't offer placements, referrals or career services; mentorship here is about clarity, resilience and direction."],
];

const looksFor = [
  [Heart, "You listen more than you fix", "People should feel met, not managed."],
  [Shield, "You know where the line is", "Not therapy, not religion, not clinical care. You honour that without exception."],
  [Users, "You can meet a 24-year-old and a 54-year-old where they are", "Range across generations matters here."],
  [Clock, "You show up, prepared", "People are trusting you with something tender."],
] as const;

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(([q, a]) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const Partners = () => (
  <Layout showFAQ={false}>
    <SEO
      title="Become a Guide or Mentor | GenMyo"
      description="Join GenMyo's paid Human Layer as a Mindfulness Guide or Mentor. Meet people online, on your schedule, after they've reflected with the Mirror on WhatsApp."
    />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

    {/* Hero: the one bold moment on the page */}
    <header className="bg-[#16130E] text-white -mt-20 pt-36 pb-24 md:pt-44 md:pb-32">
      <div className="max-w-[1120px] mx-auto px-6 md:px-10">
        <h1 className="font-serif font-light text-4xl md:text-7xl leading-[1.05] tracking-tight max-w-4xl">
          People start with a question.
          <span className="block text-[#C2A053]">Then they need a person.</span>
        </h1>
        <p className="mt-8 text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
          GenMyo begins on WhatsApp, where people reflect on their own. When they want more, we connect them to a
          Mindfulness Guide or a Mentor. We're looking for the people who'll be on the other side of that conversation.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href={GUIDE_MAIL}
            className="px-8 py-4 rounded-full bg-[#C2A053] text-[#1C1A16] font-semibold hover:bg-[#D9BC7A] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Apply as a Guide
          </a>
          <a
            href={MENTOR_MAIL}
            className="px-8 py-4 rounded-full border border-white/40 font-semibold hover:border-[#C2A053] hover:text-[#C2A053] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Apply as a Mentor
          </a>
        </div>
        <p className="mt-6 text-sm text-white/60">
          Paid, independent and online. You set your own availability. Non-clinical and non-religious.
        </p>
      </div>
    </header>

    {/* Journey */}
    <section id="how" className="py-20 bg-background">
      <div className="max-w-[1120px] mx-auto px-6 md:px-10">
        <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight max-w-2xl">
          What the work looks like, start to finish
        </h2>
        <ol className="mt-12 grid gap-8 md:grid-cols-5">
          {journey.map(([title, body], i) => (
            <li key={title} className="border-t-2 border-[#C2A053] pt-4">
              <span className="font-serif text-[#B0703E] text-lg">{i + 1}</span>
              <h3 className="font-semibold text-[#1C1A16] mt-1 mb-2">{title}</h3>
              <p className="text-sm text-[#4A463E] leading-relaxed">{body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>

    {/* Roles */}
    <section id="roles" className="py-20 bg-[#F4F0E7]">
      <div className="max-w-[1120px] mx-auto px-6 md:px-10">
        <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight max-w-2xl">
          Two roles. Pick the one that sounds like you.
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {roles.map((r) => (
            <article key={r.name} className="bg-white rounded-3xl overflow-hidden flex flex-col shadow-sm">
              <div className={`${r.tone} text-white px-8 py-6`}>
                <h3 className="font-serif text-2xl">{r.name}</h3>
              </div>
              <dl className="p-8 flex-1 space-y-5 text-sm text-[#4A463E] leading-relaxed">
                <div><dt className="font-semibold text-[#1C1A16]">Who you are</dt><dd>{r.who}</dd></div>
                <div><dt className="font-semibold text-[#1C1A16]">What you'll do</dt><dd>{r.does}</dd></div>
                <div><dt className="font-semibold text-[#1C1A16]">How to apply</dt><dd>{r.send}</dd></div>
              </dl>
              <div className="px-8 pb-8">
                <a
                  href={r.href}
                  className="block text-center py-3.5 rounded-full bg-[#1C1A16] text-white font-semibold hover:bg-[#3a362e] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B0703E]"
                >
                  {r.cta}
                </a>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-[#4A463E] leading-relaxed">
          Many of our Mentors began as people who reflected with GenMyo, worked through a hard chapter, and wanted to give
          that experience back. The same care and boundaries apply to every Mentor, however they came to us.
        </p>
      </div>
    </section>

    {/* Qualities */}
    <section id="look" className="py-20 bg-background">
      <div className="max-w-[1120px] mx-auto px-6 md:px-10">
        <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight max-w-2xl">
          What we look for beyond credentials
        </h2>
        <ul className="mt-12 grid gap-8 md:grid-cols-2 max-w-4xl">
          {looksFor.map(([Icon, title, body]) => (
            <li key={title} className="flex gap-4">
              <span className="w-10 h-10 shrink-0 rounded-lg bg-[#B0703E]/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-[#B0703E]" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-semibold text-[#1C1A16] mb-1">{title}</h3>
                <p className="text-sm text-[#4A463E] leading-relaxed">{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>

    {/* Straight answers */}
    <section id="answers" className="py-20 bg-[#F4F0E7]">
      <div className="max-w-[1120px] mx-auto px-6 md:px-10">
        <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight max-w-2xl">
          What you'll want to know before you write to us
        </h2>
        <div className="mt-10 max-w-3xl flex flex-col gap-3">
          {faqs.map(([q, a]) => (
            <details key={q} className="group bg-white rounded-xl border border-black/10">
              <summary className="p-5 cursor-pointer list-none flex justify-between items-center font-semibold text-[#1C1A16] [&::-webkit-details-marker]:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B0703E] rounded-xl">
                {q}
                <span className="ml-4 text-[#B0703E] text-xl transition-transform group-open:rotate-45 motion-reduce:transition-none" aria-hidden="true">+</span>
              </summary>
              <p className="px-5 pb-5 text-sm text-[#4A463E] leading-relaxed">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>

    {/* Apply */}
    <section id="apply" className="py-20 bg-background">
      <div className="max-w-[1120px] mx-auto px-6 md:px-10">
        <div className="bg-[#1C1A16] text-white rounded-3xl p-10 md:p-16">
          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight max-w-2xl">
            There's no long form. Write to us.
          </h2>
          <ol className="mt-8 space-y-3 text-white/80 max-w-xl list-decimal list-inside">
            <li>Email us as a Guide or a Mentor. The message opens with a short prefilled note so you only fill in the blanks.</li>
            <li>We read every note and reply to talk.</li>
            <li>If it's a fit, we cover rates, scheduling and standards, then match you.</li>
          </ol>
          <div className="mt-10 flex flex-wrap gap-4 items-center">
            <a
              href={GUIDE_MAIL}
              className="px-7 py-3.5 rounded-full bg-[#C2A053] text-[#1C1A16] font-semibold hover:bg-[#D9BC7A] transition-colors"
            >
              Apply as a Guide
            </a>
            <a
              href={MENTOR_MAIL}
              className="px-7 py-3.5 rounded-full border border-white/40 font-semibold hover:border-[#C2A053] hover:text-[#C2A053] transition-colors"
            >
              Apply as a Mentor
            </a>
            <a href="mailto:hello@genmyo.ai" className="inline-flex items-center gap-2 text-white/80 hover:text-white">
              <Mail className="w-4 h-4" aria-hidden="true" /> hello@genmyo.ai
            </a>
          </div>
        </div>
      </div>
    </section>

    {/* Giving back: points to GenMyo for Good */}
    <section id="giving" className="pb-20 bg-background">
      <div className="max-w-[1120px] mx-auto px-6 md:px-10">
        <div className="border border-[#C2A053]/30 rounded-2xl p-8 md:p-10 grid gap-6 md:grid-cols-[1fr_auto] items-center">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#1C1A16]">Help widen access</h2>
            <p className="mt-3 text-[#4A463E] leading-relaxed max-w-2xl">
              GenMyo for Good is our giving-back layer: sponsored seats, buy-one-give-one, and an access fund under
              design. Guides and Mentors can give time. People who have been through the journey can give forward too.
            </p>
          </div>
          <Link
            to="/for-good"
            className="px-6 py-3 rounded-full border border-[#1C1A16]/30 font-semibold text-[#1C1A16] hover:border-[#B0703E] hover:text-[#B0703E] transition-colors text-center"
          >
            GenMyo for Good
          </Link>
        </div>
        <p className="mt-6 text-sm text-[#8C8678]">
          Representing an employer or community group? Write to{" "}
          <a href="mailto:hello@genmyo.ai" className="underline hover:text-[#B0703E]">hello@genmyo.ai</a>
          , or read{" "}
          <Link to="/for-good" className="underline hover:text-[#B0703E]">
            GenMyo for Good
          </Link>
          .
        </p>
      </div>
    </section>
  </Layout>
);

export default Partners;  