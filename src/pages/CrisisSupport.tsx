import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Heart } from "lucide-react";

const HELPLINES = [
  {
    region: "International",
    detail: (
      <>
        Find a free, confidential helpline in your country at{" "}
        <a
          href="https://findahelpline.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#B0703E] underline underline-offset-4 hover:text-[#8A5A32]"
        >
          findahelpline.com
        </a>
      </>
    ),
  },
  {
    region: "Singapore",
    detail: (
      <>
        Call{" "}
        <a href="tel:1767" className="text-[#B0703E] underline underline-offset-4">
          1767
        </a>{" "}
        or message{" "}
        <a
          href="https://wa.me/6591511767"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#B0703E] underline underline-offset-4"
        >
          9151 1767 on WhatsApp
        </a>{" "}
        — Samaritans of Singapore, 24 hours
      </>
    ),
  },
  {
    region: "United States",
    detail: (
      <>
        Call or text{" "}
        <a href="tel:988" className="text-[#B0703E] underline underline-offset-4">
          988
        </a>{" "}
        — 988 Suicide &amp; Crisis Lifeline
      </>
    ),
  },
  {
    region: "United Kingdom",
    detail: (
      <>
        Call{" "}
        <a href="tel:116123" className="text-[#B0703E] underline underline-offset-4">
          116 123
        </a>{" "}
        — Samaritans
      </>
    ),
  },
  {
    region: "India",
    detail: (
      <>
        Call{" "}
        <a href="tel:+919820466726" className="text-[#B0703E] underline underline-offset-4">
          +91-9820466726
        </a>{" "}
        (AASRA) or{" "}
        <a href="tel:+919999666555" className="text-[#B0703E] underline underline-offset-4">
          +91-9999666555
        </a>{" "}
        (Vandrevala Foundation)
      </>
    ),
  },
] as const;

const CrisisSupport = () => {
  return (
    <Layout>
      <SEO
        title="If you need support — Crisis helplines"
        description="GenMyō is not a crisis service. Free, confidential helplines are available now — find support in your country, Singapore, US, UK, and India."
        canonical="/crisis"
      />

      <section className="relative section-padding bg-background min-h-[70vh]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(ellipse 70% 45% at 50% 0%, hsl(35 30% 90% / 0.75), transparent 60%)",
          }}
        />

        <div className="relative max-w-xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="w-14 h-14 bg-[#B0703E]/10 rounded-full flex items-center justify-center mx-auto mb-5">
              <Heart className="w-7 h-7 text-[#B0703E]" aria-hidden />
            </div>
            <p className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-[#B0703E] mb-3">
              Support resources
            </p>
            <h1 className="font-serif text-3xl md:text-4xl font-medium text-[#1C1A16] leading-snug tracking-tight">
              You are not alone
            </h1>
            <p className="mt-4 text-sm md:text-base text-[#4A463E] leading-relaxed max-w-md mx-auto">
              GenMyō is a space for reflection — not a crisis service. If you need someone to talk
              to right now, free and confidential support is available.
            </p>
          </div>

          <div className="rounded-2xl border border-[#1C1A16]/10 bg-[#FFFcf7]/95 shadow-[0_12px_40px_-16px_rgba(28,26,22,0.12)] overflow-hidden">
            <ul className="divide-y divide-[#1C1A16]/08">
              {HELPLINES.map((item) => (
                <li key={item.region} className="px-5 py-5 sm:px-7 sm:py-6">
                  <p className="text-sm font-semibold text-[#1C1A16] tracking-tight">
                    {item.region}
                  </p>
                  <p className="mt-1.5 text-sm text-[#4A463E] leading-relaxed">{item.detail}</p>
                </li>
              ))}
            </ul>

            <div className="px-5 py-4 sm:px-7 bg-[#F4F0E7]/70 border-t border-[#1C1A16]/08">
              <p className="text-sm text-[#4A463E] leading-relaxed">
                If you are in immediate danger, please call your local emergency services.
              </p>
            </div>
          </div>

          <div className="mt-10 text-center space-y-3">
            <Link
              to="/join"
              className="inline-block text-sm text-[#5C564C] underline underline-offset-4 hover:text-[#B0703E]"
            >
              Back to joining GenMyō
            </Link>
            <p className="text-xs text-[#5C564C]/90">
              Or return{" "}
              <Link to="/" className="underline underline-offset-4 hover:text-[#B0703E]">
                home
              </Link>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CrisisSupport;
