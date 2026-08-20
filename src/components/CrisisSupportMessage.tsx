import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export function CrisisSupportNudge({ className = "" }: { className?: string }) {
  return (
    <p className={`text-sm text-[#4A463E] leading-relaxed ${className}`}>
      If what you shared feels heavy, you are not alone. Free, confidential support is available
      anytime at{" "}
      <a
        href="https://findahelpline.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#B0703E] underline underline-offset-4 hover:text-[#8A5A32]"
      >
        findahelpline.com
      </a>
      .
    </p>
  );
}

export function CrisisSupportMessage({ className = "" }: { className?: string }) {
  return (
    <div className={`text-left space-y-4 ${className}`}>
      <p className="text-[#4A463E] text-sm md:text-base leading-relaxed">
        You are not alone. If you need someone to talk to, free and confidential support is
        available right now:
      </p>

      <div className="space-y-3 text-sm md:text-base text-[#4A463E] leading-relaxed">
        <p>
          <span className="font-medium text-foreground">Find a helpline in your country:</span>
          <br />
          <a
            href="https://findahelpline.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#B0703E] underline underline-offset-4 hover:text-[#8A5A32]"
          >
            https://findahelpline.com
          </a>
        </p>

        <p>
          <span className="font-medium text-foreground">In Singapore:</span> call{" "}
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
          (Samaritans of Singapore, 24 hours)
        </p>

        <p>
          If you are in immediate danger, please call your local emergency services.
        </p>
      </div>
    </div>
  );
}

export function CrisisSupportScreen() {
  return (
    <section className="bg-background min-h-[75vh] flex items-center justify-center py-12">
      <div className="px-6 animate-fade-up max-w-md mx-auto">
        <div className="w-16 h-16 bg-[#B0703E]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart className="w-8 h-8 text-[#B0703E]" />
        </div>
        <h1 className="font-serif text-3xl md:text-4xl text-foreground font-light leading-snug text-center">
          You are not alone
        </h1>
        <p className="mt-3 text-muted-foreground text-sm text-center leading-relaxed">
          Your details have been received. GenMyō is not a crisis service. Please reach out for immediate, confidential support.
        </p>

        <div className="mt-8 p-6 bg-card border border-border/80 rounded-2xl shadow-sm">
          <CrisisSupportMessage />
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-block text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
          >
            Back to GenMyō
          </Link>
        </div>
      </div>
    </section>
  );
}
