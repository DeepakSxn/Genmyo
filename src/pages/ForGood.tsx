import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Heart, Users, Sparkles } from "lucide-react";

const mail = (subject: string, body: string) =>
  `mailto:hello@genmyo.ai?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

const GIVING_MAIL = mail(
  "Giving Back · I want to be part of this",
  "Hi GenMyo team,\n\nI'd like to help widen access through GenMyo for Good.\n\nName:\nOrganisation (if any):\nHow I'd like to help (sponsor access, Guide or Mentor time, give forward as someone who has been through the journey, shape the model):\n"
);

const who = [
  {
    Icon: Users,
    title: "Guides and Mentors",
    body: "If you are applying to the Human Layer, or already practice with GenMyō, you can also give time or sessions so more people can reach a human when they are ready.",
  },
  {
    Icon: Sparkles,
    title: "People who have been through the journey",
    body: "If you reflected with the Mirror, found clarity, and want to give that experience forward, you belong here. Many Mentors began this way.",
  },
  {
    Icon: Heart,
    title: "Organisations and sponsors",
    body: "Employers, collectives, and individuals who want to fund access for people who could not otherwise pay: sponsored seats, gifts of access, or help shaping the fund.",
  },
] as const;

const models = [
  [
    "Sponsored seats",
    "An organisation or person funds access for non-employees, community groups, or people who cannot pay.",
  ],
  [
    "Buy one, give one",
    "Each paying path helps open a free path for someone who needs the same quiet support.",
  ],
  [
    "Access fund",
    "A share of growth opens GenMyō in places and communities where cost would otherwise stop someone.",
  ],
] as const;

const ForGood = () => (
  <Layout showFAQ={false}>
    <SEO
      title="GenMyo for Good · Giving Back"
      description="Widen access to GenMyo. Guides, Mentors, people who have been through the journey, and sponsors can help open reflection and human support to those who could not otherwise pay."
    />

    <header className="bg-[#16130E] text-white -mt-20 pt-36 pb-24 md:pt-44 md:pb-32">
      <div className="max-w-[1120px] mx-auto px-6 md:px-10">
        <p className="text-sm font-medium uppercase tracking-widest text-[#C2A053]">
          GenMyō for Good
        </p>
        <h1 className="mt-4 font-serif font-light text-4xl md:text-7xl leading-[1.05] tracking-tight max-w-4xl">
          Growth that opens the door
          <span className="block text-[#C2A053]">for someone else.</span>
        </h1>
        <p className="mt-8 text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
          GenMyō starts on WhatsApp with private reflection. When someone wants a person, Guides and Mentors meet them.
          GenMyo for Good is the giving-back layer: the same care, opened wider for people who could not otherwise pay.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href={GIVING_MAIL}
            className="px-8 py-4 rounded-full bg-[#C2A053] text-[#1C1A16] font-semibold hover:bg-[#D9BC7A] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            I want to be part of this
          </a>
          <Link
            to="/partners"
            className="px-8 py-4 rounded-full border border-white/40 font-semibold hover:border-[#C2A053] hover:text-[#C2A053] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Become a Guide or Mentor
          </Link>
        </div>
        <p className="mt-6 text-sm text-white/60">
          Separate from the paid Human Layer. Model in development. Structure to be confirmed.
        </p>
      </div>
    </header>

    <section className="py-20 bg-background" aria-labelledby="who-heading">
      <div className="max-w-[1120px] mx-auto px-6 md:px-10">
        <h2
          id="who-heading"
          className="font-serif text-3xl md:text-5xl font-medium tracking-tight max-w-2xl"
        >
          Who this is for
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#4A463E]">
          Mentors and Guides can give back. So can people who have already walked this path. So can anyone who wants to
          sponsor access.
        </p>
        <ul className="mt-12 grid gap-10 md:grid-cols-3">
          {who.map(({ Icon, title, body }) => (
            <li key={title}>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#B0703E]/10">
                <Icon className="h-5 w-5 text-[#B0703E]" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-semibold text-[#1C1A16]">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#4A463E]">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>

    <section className="py-20 bg-[#F4F0E7]" aria-labelledby="ways-heading">
      <div className="max-w-[1120px] mx-auto px-6 md:px-10">
        <h2
          id="ways-heading"
          className="font-serif text-3xl md:text-5xl font-medium tracking-tight max-w-2xl"
        >
          Ways we are building to widen access
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#4A463E]">
          These shapes are under design. Write to us if one of them is how you want to help, or if you want to help shape
          the model.
        </p>
        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {models.map(([title, body], i) => (
            <li key={title} className="border-t-2 border-[#C2A053] pt-4">
              <span className="font-serif text-lg text-[#B0703E]">{i + 1}</span>
              <h3 className="mt-1 mb-2 font-semibold text-[#1C1A16]">{title}</h3>
              <p className="text-sm leading-relaxed text-[#4A463E]">{body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>

    <section id="involve" className="py-20 bg-background">
      <div className="max-w-[1120px] mx-auto px-6 md:px-10">
        <div className="rounded-3xl bg-[#1C1A16] p-10 text-white md:p-16">
          <h2 className="max-w-2xl font-serif text-3xl font-light tracking-tight md:text-5xl">
            Tell us how you want to give forward
          </h2>
          <p className="mt-5 max-w-xl text-white/80 leading-relaxed">
            Sponsor access, offer Guide or Mentor time, give forward after your own journey, or help us shape the model.
            We read every note.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={GIVING_MAIL}
              className="rounded-full bg-[#C2A053] px-7 py-3.5 font-semibold text-[#1C1A16] transition-colors hover:bg-[#D9BC7A]"
            >
              I want to be part of this
            </a>
            <Link
              to="/partners"
              className="rounded-full border border-white/40 px-7 py-3.5 font-semibold transition-colors hover:border-[#C2A053] hover:text-[#C2A053]"
            >
              Apply as a Guide or Mentor
            </Link>
            <a
              href="mailto:hello@genmyo.ai"
              className="text-white/80 underline underline-offset-4 hover:text-white"
            >
              hello@genmyo.ai
            </a>
          </div>
        </div>
        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-[#8C8678]">
          Looking for a workforce pilot? See{" "}
          <Link to="/for-business" className="underline hover:text-[#B0703E]">
            For business
          </Link>
          . Ready to begin your own reflection?{" "}
          <Link to="/join" className="underline hover:text-[#B0703E]">
            Start on WhatsApp
          </Link>
          .
        </p>
      </div>
    </section>
  </Layout>
);

export default ForGood;
