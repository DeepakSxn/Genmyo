import { useRef, useState } from "react";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import CountryNameCombobox from "@/components/CountryNameCombobox";
import { COUNTRY_CODES } from "@/data/countries";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { trackFormStart, trackGAEvent } from "@/lib/analytics";

const ADMIN_EMAIL = "hello@genmyo.ai";

const FREE_EMAIL =
  /@(gmail|googlemail|yahoo|hotmail|outlook|live|icloud|me|aol|proton|protonmail|mail|yandex|gmx|qq|163)\./i;

const HEADCOUNTS = [
  { value: "1-49", label: "1–49", hint: "Small team" },
  { value: "50-200", label: "50–200", hint: "Pilot size" },
  { value: "201-1000", label: "201–1,000", hint: "A few teams" },
  { value: "1000+", label: "1,000+", hint: "Workforce" },
] as const;

const AIMS = [
  "Engagement",
  "Frontline reach",
  "EAP alternative",
  "A quiet daily habit",
] as const;

const STEPS = [
  { id: "you", label: "You" },
  { id: "team", label: "Team" },
  { id: "aim", label: "Aim" },
] as const;

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z
    .string()
    .trim()
    .email("Please enter a valid work email")
    .max(255)
    .refine((v) => !FREE_EMAIL.test(v), {
      message: "Use a work email so we can send the trust pack securely",
    }),
  company: z.string().trim().min(1, "Company is required").max(120),
  headcount: z.string().min(1, "Pick a headcount band"),
  country: z.string().trim().min(1, "Country is required").max(80),
  hope: z.string().trim().max(500).optional(),
  trustPack: z.boolean(),
});

type FieldErrors = Partial<Record<keyof z.infer<typeof schema>, string>>;

type Props = {
  /** When true, pre-check trust pack request */
  defaultTrustPack?: boolean;
  id?: string;
};

function togglePhrase(current: string, phrase: string) {
  const pattern = new RegExp(
    phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    "ig",
  );
  if (pattern.test(current)) {
    return current
      .replace(pattern, "")
      .replace(/\s*,\s*,/g, ", ")
      .replace(/^\s*,\s*|\s*,\s*$/g, "")
      .replace(/\s{2,}/g, " ")
      .trim();
  }
  return current.trim() ? `${current.trim()}, ${phrase}` : phrase;
}

/**
 * B2B pilot enquiry — mailto handoff until a CRM/calendar is wired.
 * Captures UTMs from the URL into the email body.
 */
export function BusinessPilotForm({
  defaultTrustPack = false,
  id = "pilot-form",
}: Props) {
  const { toast } = useToast();
  const started = useRef(false);
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [headcount, setHeadcount] = useState("");
  const [country, setCountry] = useState("");
  const [hope, setHope] = useState("");
  const [trustPack, setTrustPack] = useState(defaultTrustPack);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const markStart = () => {
    if (started.current) return;
    started.current = true;
    trackFormStart("business_pilot");
    trackGAEvent("business_form_start", { page_path: "/for-business" });
  };

  const utmBlob = () => {
    if (typeof window === "undefined") return "";
    const p = new URLSearchParams(window.location.search);
    const keys = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
      "ref",
    ];
    const lines = keys
      .map((k) => {
        const v = p.get(k);
        return v ? `${k}: ${v}` : null;
      })
      .filter(Boolean);
    if (document.referrer) lines.push(`referrer: ${document.referrer}`);
    return lines.length ? `\n\nAttribution:\n${lines.join("\n")}` : "";
  };

  const fieldErrors = (
    result: ReturnType<typeof schema.safeParse>,
  ): FieldErrors => {
    if (result.success) return {};
    const fe = result.error.flatten().fieldErrors;
    return {
      name: fe.name?.[0],
      email: fe.email?.[0],
      company: fe.company?.[0],
      headcount: fe.headcount?.[0],
      country: fe.country?.[0],
      hope: fe.hope?.[0],
    };
  };

  const payload = () => ({
    name,
    email,
    company,
    headcount,
    country,
    hope,
    trustPack,
  });

  const goNext = () => {
    const all = fieldErrors(schema.safeParse(payload()));
    const keys: (keyof FieldErrors)[] =
      step === 0
        ? ["name", "email"]
        : ["company", "country", "headcount"];
    const next: FieldErrors = {};
    for (const key of keys) {
      if (all[key]) next[key] = all[key];
    }
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < STEPS.length - 1) {
      goNext();
      return;
    }

    const result = schema.safeParse(payload());
    if (!result.success) {
      setErrors(fieldErrors(result));
      const fe = fieldErrors(result);
      if (fe.name || fe.email) setStep(0);
      else if (fe.company || fe.country || fe.headcount) setStep(1);
      return;
    }
    setErrors({});
    setSubmitting(true);

    const d = result.data;
    const subject = d.trustPack
      ? `Pilot + trust pack · ${d.company}`
      : `Pilot call · ${d.company}`;
    const body = [
      "GenMyo for Business enquiry",
      "",
      `Name: ${d.name}`,
      `Work email: ${d.email}`,
      `Company: ${d.company}`,
      `Headcount: ${d.headcount}`,
      `Country: ${d.country}`,
      d.hope ? `Hoping to solve: ${d.hope}` : null,
      `Trust pack: ${d.trustPack ? "yes" : "no"}`,
      utmBlob(),
    ]
      .filter(Boolean)
      .join("\n");

    trackGAEvent("business_form_submit", {
      page_path: "/for-business",
      trust_pack: d.trustPack,
      headcount_band: d.headcount,
    });
    if (d.trustPack) {
      trackGAEvent("business_trust_pack_request", {
        page_path: "/for-business",
      });
    }

    window.location.href = `mailto:${ADMIN_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    toast({
      title: "Opening your email app",
      description: `Send to ${ADMIN_EMAIL} and we'll reply with a pilot call slot.`,
    });
    setSubmitting(false);
  };

  const field =
    "h-12 rounded-2xl border-[#1C1A16]/12 bg-white text-[#1C1A16] placeholder:text-[#9C9285] focus-visible:ring-[#C2A053]/50";

  const summary = [name, company, HEADCOUNTS.find((h) => h.value === headcount)?.label]
    .filter(Boolean)
    .join(" · ");

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      onFocusCapture={markStart}
      className="scroll-mt-28"
      noValidate
    >
      <ol className="flex items-center gap-2" aria-label="Pilot form progress">
        {STEPS.map((s, i) => (
          <li key={s.id} className="flex min-w-0 flex-1 items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (i < step) {
                  setErrors({});
                  setStep(i);
                }
              }}
              disabled={i > step}
              aria-current={i === step ? "step" : undefined}
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-serif text-sm transition-colors",
                i === step && "bg-[#1C1A16] text-[#F6ECDD]",
                i < step && "bg-[#C2A053] text-[#1C1A16] hover:opacity-90",
                i > step && "bg-[#E8E2D9] text-[#847362]",
              )}
            >
              {i + 1}
            </button>
            <span
              className={cn(
                "truncate text-xs font-medium",
                i === step ? "text-[#1C1A16]" : "text-[#847362]",
              )}
            >
              {s.label}
            </span>
            {i < STEPS.length - 1 && (
              <span
                className={cn(
                  "h-px min-w-3 flex-1",
                  i < step ? "bg-[#C2A053]" : "bg-[#E8E2D9]",
                )}
                aria-hidden
              />
            )}
          </li>
        ))}
      </ol>
      <p className="mt-3 min-h-5 text-sm text-[#847362]">
        {summary || "Three short steps. We reply with times."}
      </p>

      <div key={step} className="mt-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
        {step === 0 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="biz-name">Your name</Label>
              <Input
                id="biz-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={field}
                autoComplete="name"
                maxLength={100}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="biz-email">Work email</Label>
              <Input
                id="biz-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={field}
                autoComplete="email"
                maxLength={255}
                placeholder="you@company.com"
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="biz-company">Company</Label>
                <Input
                  id="biz-company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className={field}
                  autoComplete="organization"
                  maxLength={120}
                />
                {errors.company && (
                  <p className="text-sm text-destructive">{errors.company}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="biz-country">Country</Label>
                <div className="[&_button]:h-12 [&_button]:rounded-2xl [&_button]:border-[#1C1A16]/12 [&_button]:bg-white [&_button]:px-3">
                  <CountryNameCombobox
                    id="biz-country"
                    countries={COUNTRY_CODES}
                    value={country}
                    onChange={setCountry}
                    placeholder="Search country"
                    ariaLabel="Country"
                    hasError={Boolean(errors.country)}
                  />
                </div>
                {errors.country && (
                  <p className="text-sm text-destructive">{errors.country}</p>
                )}
              </div>
            </div>
            <fieldset className="space-y-2">
              <legend className="text-sm font-medium text-[#1C1A16]">
                Team size
              </legend>
              <div className="grid grid-cols-2 gap-2">
                {HEADCOUNTS.map((h) => {
                  const selected = headcount === h.value;
                  return (
                    <button
                      key={h.value}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setHeadcount(h.value)}
                      className={cn(
                        "rounded-2xl border px-3 py-3 text-left transition-colors",
                        selected
                          ? "border-[#B0703E] bg-[#B0703E] text-[#FBF7F1]"
                          : "border-[#1C1A16]/12 bg-white text-[#1C1A16] hover:border-[#C2A053]",
                      )}
                    >
                      <span className="block font-serif text-lg leading-none">
                        {h.label}
                      </span>
                      <span
                        className={cn(
                          "mt-1 block text-[11px]",
                          selected ? "text-[#F6ECDD]" : "text-[#847362]",
                        )}
                      >
                        {h.hint}
                      </span>
                    </button>
                  );
                })}
              </div>
              {errors.headcount && (
                <p className="text-sm text-destructive">{errors.headcount}</p>
              )}
            </fieldset>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <fieldset className="space-y-2">
              <legend className="text-sm font-medium text-[#1C1A16]">
                What are you hoping to solve?
              </legend>
              <div className="flex flex-wrap gap-2">
                {AIMS.map((aim) => {
                  const on = hope.toLowerCase().includes(aim.toLowerCase());
                  return (
                    <button
                      key={aim}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setHope((prev) => togglePhrase(prev, aim))}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-sm transition-colors",
                        on
                          ? "border-[#C2A053] bg-[#C2A053] text-[#1C1A16]"
                          : "border-[#1C1A16]/12 bg-white text-[#5C564C] hover:border-[#C2A053]",
                      )}
                    >
                      {aim}
                    </button>
                  );
                })}
              </div>
            </fieldset>
            <div className="space-y-1.5">
              <Label htmlFor="biz-hope">Add a note (optional)</Label>
              <Textarea
                id="biz-hope"
                value={hope}
                onChange={(e) => setHope(e.target.value)}
                rows={3}
                maxLength={500}
                className="resize-none rounded-2xl border-[#1C1A16]/12 bg-white text-[#1C1A16] placeholder:text-[#9C9285] focus-visible:ring-[#C2A053]/50"
                placeholder="A sentence on the team, if you want."
              />
              {errors.hope && (
                <p className="text-sm text-destructive">{errors.hope}</p>
              )}
            </div>
            <button
              type="button"
              aria-pressed={trustPack}
              onClick={() => setTrustPack((v) => !v)}
              className={cn(
                "flex w-full items-start gap-3 rounded-2xl border px-4 py-3 text-left transition-colors",
                trustPack
                  ? "border-[#5C7A62] bg-[#E7EFE8]"
                  : "border-[#1C1A16]/12 bg-white hover:border-[#5C7A62]",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px]",
                  trustPack
                    ? "border-[#5C7A62] bg-[#5C7A62] text-white"
                    : "border-[#1C1A16]/20",
                )}
              >
                {trustPack ? "✓" : ""}
              </span>
              <span>
                <span className="block text-sm font-medium text-[#1C1A16]">
                  Also send the trust and privacy pack
                </span>
                <span className="mt-0.5 block text-xs leading-relaxed text-[#5C564C]">
                  Data roles, retention, and what HR never sees.
                </span>
              </span>
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center gap-3">
        {step > 0 && (
          <button
            type="button"
            onClick={() => {
              setErrors({});
              setStep((s) => s - 1);
            }}
            className="inline-flex h-12 items-center justify-center rounded-full px-5 text-sm font-semibold text-[#5C564C] hover:text-[#1C1A16]"
          >
            Back
          </button>
        )}
        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={goNext}
            className="inline-flex h-12 flex-1 items-center justify-center rounded-full bg-[#C2A053] text-[15px] font-semibold text-[#1C1A16] transition-opacity hover:opacity-90"
          >
            Continue
          </button>
        ) : (
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex h-12 flex-1 items-center justify-center rounded-full bg-[#C2A053] text-[15px] font-semibold text-[#1C1A16] transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {submitting ? "Opening email…" : "Book a pilot call"}
          </button>
        )}
      </div>
      <p className="mt-3 text-center text-xs leading-relaxed text-[#847362]">
        Opens your email to {ADMIN_EMAIL}. We reply with times for a short pilot
        call. No spam.
      </p>
    </form>
  );
}
