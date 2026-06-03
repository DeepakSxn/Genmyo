import { useState } from "react";
import { z } from "zod";
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, CheckCircle } from "lucide-react";

const WHATSAPP_REDIRECT_URL = "https://wa.me/message/Y4GOKBIGBWUUM1?text=HI";
const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdYB479pboOh2TO8dgUFSObYR5Kd7P0qOhw30kgJ0A33-jzqw/formResponse";
const REGISTRATION_API_URL = import.meta.env.DEV
  ? "/api/register"
  : "https://slruck3a27.execute-api.ap-south-1.amazonaws.com/prod/register";

function buildRegistrationPayload(
  data: FormData,
  fullWhatsapp: string
): Record<string, string> {
  return {
    "entry.1907368519": data.firstName,
    "entry.1208177102": data.surname,
    "entry.44984313": data.email,
    "entry.1640555608": data.dob,
    "entry.1030588086": fullWhatsapp,
    "entry.1418652324": data.country,
    "entry.142785906": data.city,
    "entry.79544609": data.context || "",
  };
}

// Country codes with flag emoji + country name. Sorted by country name.
const COUNTRY_CODES_RAW: { code: string; flag: string; country: string }[] = [
  { code: "+93", flag: "🇦🇫", country: "Afghanistan" },
  { code: "+355", flag: "🇦🇱", country: "Albania" },
  { code: "+213", flag: "🇩🇿", country: "Algeria" },
  { code: "+376", flag: "🇦🇩", country: "Andorra" },
  { code: "+244", flag: "🇦🇴", country: "Angola" },
  { code: "+54", flag: "🇦🇷", country: "Argentina" },
  { code: "+374", flag: "🇦🇲", country: "Armenia" },
  { code: "+61", flag: "🇦🇺", country: "Australia" },
  { code: "+43", flag: "🇦🇹", country: "Austria" },
  { code: "+994", flag: "🇦🇿", country: "Azerbaijan" },
  { code: "+973", flag: "🇧🇭", country: "Bahrain" },
  { code: "+880", flag: "🇧🇩", country: "Bangladesh" },
  { code: "+375", flag: "🇧🇾", country: "Belarus" },
  { code: "+32", flag: "🇧🇪", country: "Belgium" },
  { code: "+501", flag: "🇧🇿", country: "Belize" },
  { code: "+229", flag: "🇧🇯", country: "Benin" },
  { code: "+975", flag: "🇧🇹", country: "Bhutan" },
  { code: "+591", flag: "🇧🇴", country: "Bolivia" },
  { code: "+387", flag: "🇧🇦", country: "Bosnia & Herzegovina" },
  { code: "+267", flag: "🇧🇼", country: "Botswana" },
  { code: "+55", flag: "🇧🇷", country: "Brazil" },
  { code: "+673", flag: "🇧🇳", country: "Brunei" },
  { code: "+359", flag: "🇧🇬", country: "Bulgaria" },
  { code: "+226", flag: "🇧🇫", country: "Burkina Faso" },
  { code: "+257", flag: "🇧🇮", country: "Burundi" },
  { code: "+855", flag: "🇰🇭", country: "Cambodia" },
  { code: "+237", flag: "🇨🇲", country: "Cameroon" },
  { code: "+1", flag: "🇨🇦", country: "Canada" },
  { code: "+238", flag: "🇨🇻", country: "Cape Verde" },
  { code: "+236", flag: "🇨🇫", country: "Central African Republic" },
  { code: "+235", flag: "🇹🇩", country: "Chad" },
  { code: "+56", flag: "🇨🇱", country: "Chile" },
  { code: "+86", flag: "🇨🇳", country: "China" },
  { code: "+57", flag: "🇨🇴", country: "Colombia" },
  { code: "+269", flag: "🇰🇲", country: "Comoros" },
  { code: "+506", flag: "🇨🇷", country: "Costa Rica" },
  { code: "+385", flag: "🇭🇷", country: "Croatia" },
  { code: "+53", flag: "🇨🇺", country: "Cuba" },
  { code: "+357", flag: "🇨🇾", country: "Cyprus" },
  { code: "+420", flag: "🇨🇿", country: "Czech Republic" },
  { code: "+243", flag: "🇨🇩", country: "DR Congo" },
  { code: "+45", flag: "🇩🇰", country: "Denmark" },
  { code: "+253", flag: "🇩🇯", country: "Djibouti" },
  { code: "+593", flag: "🇪🇨", country: "Ecuador" },
  { code: "+20", flag: "🇪🇬", country: "Egypt" },
  { code: "+503", flag: "🇸🇻", country: "El Salvador" },
  { code: "+372", flag: "🇪🇪", country: "Estonia" },
  { code: "+251", flag: "🇪🇹", country: "Ethiopia" },
  { code: "+679", flag: "🇫🇯", country: "Fiji" },
  { code: "+358", flag: "🇫🇮", country: "Finland" },
  { code: "+33", flag: "🇫🇷", country: "France" },
  { code: "+241", flag: "🇬🇦", country: "Gabon" },
  { code: "+220", flag: "🇬🇲", country: "Gambia" },
  { code: "+995", flag: "🇬🇪", country: "Georgia" },
  { code: "+49", flag: "🇩🇪", country: "Germany" },
  { code: "+233", flag: "🇬🇭", country: "Ghana" },
  { code: "+30", flag: "🇬🇷", country: "Greece" },
  { code: "+502", flag: "🇬🇹", country: "Guatemala" },
  { code: "+224", flag: "🇬🇳", country: "Guinea" },
  { code: "+592", flag: "🇬🇾", country: "Guyana" },
  { code: "+509", flag: "🇭🇹", country: "Haiti" },
  { code: "+504", flag: "🇭🇳", country: "Honduras" },
  { code: "+852", flag: "🇭🇰", country: "Hong Kong" },
  { code: "+36", flag: "🇭🇺", country: "Hungary" },
  { code: "+354", flag: "🇮🇸", country: "Iceland" },
  { code: "+91", flag: "🇮🇳", country: "India" },
  { code: "+62", flag: "🇮🇩", country: "Indonesia" },
  { code: "+98", flag: "🇮🇷", country: "Iran" },
  { code: "+964", flag: "🇮🇶", country: "Iraq" },
  { code: "+353", flag: "🇮🇪", country: "Ireland" },
  { code: "+972", flag: "🇮🇱", country: "Israel" },
  { code: "+39", flag: "🇮🇹", country: "Italy" },
  { code: "+225", flag: "🇨🇮", country: "Ivory Coast" },
  { code: "+81", flag: "🇯🇵", country: "Japan" },
  { code: "+962", flag: "🇯🇴", country: "Jordan" },
  { code: "+7", flag: "🇰🇿", country: "Kazakhstan" },
  { code: "+254", flag: "🇰🇪", country: "Kenya" },
  { code: "+965", flag: "🇰🇼", country: "Kuwait" },
  { code: "+996", flag: "🇰🇬", country: "Kyrgyzstan" },
  { code: "+856", flag: "🇱🇦", country: "Laos" },
  { code: "+371", flag: "🇱🇻", country: "Latvia" },
  { code: "+961", flag: "🇱🇧", country: "Lebanon" },
  { code: "+266", flag: "🇱🇸", country: "Lesotho" },
  { code: "+231", flag: "🇱🇷", country: "Liberia" },
  { code: "+218", flag: "🇱🇾", country: "Libya" },
  { code: "+423", flag: "🇱🇮", country: "Liechtenstein" },
  { code: "+370", flag: "🇱🇹", country: "Lithuania" },
  { code: "+352", flag: "🇱🇺", country: "Luxembourg" },
  { code: "+853", flag: "🇲🇴", country: "Macau" },
  { code: "+261", flag: "🇲🇬", country: "Madagascar" },
  { code: "+265", flag: "🇲🇼", country: "Malawi" },
  { code: "+60", flag: "🇲🇾", country: "Malaysia" },
  { code: "+960", flag: "🇲🇻", country: "Maldives" },
  { code: "+223", flag: "🇲🇱", country: "Mali" },
  { code: "+356", flag: "🇲🇹", country: "Malta" },
  { code: "+222", flag: "🇲🇷", country: "Mauritania" },
  { code: "+230", flag: "🇲🇺", country: "Mauritius" },
  { code: "+52", flag: "🇲🇽", country: "Mexico" },
  { code: "+373", flag: "🇲🇩", country: "Moldova" },
  { code: "+377", flag: "🇲🇨", country: "Monaco" },
  { code: "+976", flag: "🇲🇳", country: "Mongolia" },
  { code: "+382", flag: "🇲🇪", country: "Montenegro" },
  { code: "+212", flag: "🇲🇦", country: "Morocco" },
  { code: "+258", flag: "🇲🇿", country: "Mozambique" },
  { code: "+95", flag: "🇲🇲", country: "Myanmar" },
  { code: "+264", flag: "🇳🇦", country: "Namibia" },
  { code: "+977", flag: "🇳🇵", country: "Nepal" },
  { code: "+31", flag: "🇳🇱", country: "Netherlands" },
  { code: "+64", flag: "🇳🇿", country: "New Zealand" },
  { code: "+505", flag: "🇳🇮", country: "Nicaragua" },
  { code: "+227", flag: "🇳🇪", country: "Niger" },
  { code: "+234", flag: "🇳🇬", country: "Nigeria" },
  { code: "+850", flag: "🇰🇵", country: "North Korea" },
  { code: "+389", flag: "🇲🇰", country: "North Macedonia" },
  { code: "+47", flag: "🇳🇴", country: "Norway" },
  { code: "+968", flag: "🇴🇲", country: "Oman" },
  { code: "+92", flag: "🇵🇰", country: "Pakistan" },
  { code: "+970", flag: "🇵🇸", country: "Palestine" },
  { code: "+507", flag: "🇵🇦", country: "Panama" },
  { code: "+675", flag: "🇵🇬", country: "Papua New Guinea" },
  { code: "+595", flag: "🇵🇾", country: "Paraguay" },
  { code: "+51", flag: "🇵🇪", country: "Peru" },
  { code: "+63", flag: "🇵🇭", country: "Philippines" },
  { code: "+48", flag: "🇵🇱", country: "Poland" },
  { code: "+351", flag: "🇵🇹", country: "Portugal" },
  { code: "+974", flag: "🇶🇦", country: "Qatar" },
  { code: "+242", flag: "🇨🇬", country: "Republic of Congo" },
  { code: "+40", flag: "🇷🇴", country: "Romania" },
  { code: "+250", flag: "🇷🇼", country: "Rwanda" },
  { code: "+966", flag: "🇸🇦", country: "Saudi Arabia" },
  { code: "+221", flag: "🇸🇳", country: "Senegal" },
  { code: "+381", flag: "🇷🇸", country: "Serbia" },
  { code: "+232", flag: "🇸🇱", country: "Sierra Leone" },
  { code: "+65", flag: "🇸🇬", country: "Singapore" },
  { code: "+421", flag: "🇸🇰", country: "Slovakia" },
  { code: "+386", flag: "🇸🇮", country: "Slovenia" },
  { code: "+252", flag: "🇸🇴", country: "Somalia" },
  { code: "+27", flag: "🇿🇦", country: "South Africa" },
  { code: "+82", flag: "🇰🇷", country: "South Korea" },
  { code: "+34", flag: "🇪🇸", country: "Spain" },
  { code: "+94", flag: "🇱🇰", country: "Sri Lanka" },
  { code: "+249", flag: "🇸🇩", country: "Sudan" },
  { code: "+597", flag: "🇸🇷", country: "Suriname" },
  { code: "+46", flag: "🇸🇪", country: "Sweden" },
  { code: "+41", flag: "🇨🇭", country: "Switzerland" },
  { code: "+963", flag: "🇸🇾", country: "Syria" },
  { code: "+886", flag: "🇹🇼", country: "Taiwan" },
  { code: "+992", flag: "🇹🇯", country: "Tajikistan" },
  { code: "+255", flag: "🇹🇿", country: "Tanzania" },
  { code: "+66", flag: "🇹🇭", country: "Thailand" },
  { code: "+228", flag: "🇹🇬", country: "Togo" },
  { code: "+216", flag: "🇹🇳", country: "Tunisia" },
  { code: "+90", flag: "🇹🇷", country: "Turkey" },
  { code: "+993", flag: "🇹🇲", country: "Turkmenistan" },
  { code: "+256", flag: "🇺🇬", country: "Uganda" },
  { code: "+380", flag: "🇺🇦", country: "Ukraine" },
  { code: "+971", flag: "🇦🇪", country: "United Arab Emirates" },
  { code: "+44", flag: "🇬🇧", country: "United Kingdom" },
  { code: "+1", flag: "🇺🇸", country: "United States" },
  { code: "+598", flag: "🇺🇾", country: "Uruguay" },
  { code: "+998", flag: "🇺🇿", country: "Uzbekistan" },
  { code: "+58", flag: "🇻🇪", country: "Venezuela" },
  { code: "+84", flag: "🇻🇳", country: "Vietnam" },
  { code: "+967", flag: "🇾🇪", country: "Yemen" },
  { code: "+260", flag: "🇿🇲", country: "Zambia" },
  { code: "+263", flag: "🇿🇼", country: "Zimbabwe" },
];

// Unique id per row (Canada and US both use +1).
type CountryCodeOption = { id: string; code: string; flag: string; country: string };

const COUNTRY_CODES: CountryCodeOption[] = COUNTRY_CODES_RAW.map((entry) => {
  const code = entry.code.trim();
  return {
    ...entry,
    code,
    id: `${entry.country}::${code}`,
  };
});

function dialCodeFromSelectId(selectId: string): string {
  const match = COUNTRY_CODES.find((c) => c.id === selectId);
  if (match) return match.code;
  const fromId = selectId.split("::")[1];
  return fromId ?? selectId;
}

const formSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50, "Must be less than 50 characters"),
  surname: z.string().trim().min(1, "Surname is required").max(50, "Must be less than 50 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255),
  dob: z.string().regex(/^\d{2}\/\d{2}\/\d{2}$/, "Use format dd/mm/yy"),
  countryCode: z.string().min(1, "Select a country code"),
  whatsapp: z
    .string()
    .trim()
    .min(1, "WhatsApp number is required")
    .max(20, "Please enter a valid number")
    .regex(/^[0-9\s\-()]+$/, "Digits only (no country code here)"),
  country: z.string().trim().min(1, "Country is required").max(100),
  city: z.string().trim().min(1, "City is required").max(100),
  context: z.string().max(500, "Please keep it under 500 characters").optional(),
});

type FormData = z.infer<typeof formSchema>;

const Join = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    surname: "",
    email: "",
    dob: "",
    countryCode: "",
    whatsapp: "",
    country: "",
    city: "",
    context: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (submitError) {
      setSubmitError(null);
    }
  };

  const submitToGoogleFormAndFinish = (fields: Record<string, string>) => {
    const iframe = document.createElement("iframe");
    iframe.name = "hidden_iframe";
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    const form = document.createElement("form");
    form.method = "POST";
    form.action = GOOGLE_FORM_URL;
    form.target = "hidden_iframe";

    Object.entries(fields).forEach(([name, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();

    setTimeout(() => {
      document.body.removeChild(form);
      document.body.removeChild(iframe);
    }, 1000);

    window.open(WHATSAPP_REDIRECT_URL, "_blank");
    setSubmitted(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    const result = formSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof FormData;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    const fullWhatsapp = `${dialCodeFromSelectId(formData.countryCode)} ${formData.whatsapp}`.trim();
    const fields = buildRegistrationPayload(formData, fullWhatsapp);

    setIsSubmitting(true);
    try {
      const response = await fetch(REGISTRATION_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });

      if (response.status === 409) {
        const message =
          "This phone number is already registered. If you joined before, open WhatsApp and message The Mirror, or use a different number.";
        setSubmitError(message);
        setErrors((prev) => ({
          ...prev,
          whatsapp: "This number is already registered.",
        }));
        return;
      }

      submitToGoogleFormAndFinish(fields);
    } catch {
      // If the API is unreachable, still complete Google Form + WhatsApp flow.
      submitToGoogleFormAndFinish(fields);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Layout>
        <section className="section-padding bg-background min-h-[70vh] flex items-center">
          <div className="container-narrow text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 mb-6 animate-fade-up">
              <CheckCircle className="text-accent" size={32} />
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4 animate-fade-up delay-100">
              Thanks! WhatsApp should open in a new tab.
            </h1>
            <p className="text-muted-foreground animate-fade-up delay-200 mb-6">
              If it didn't open,{" "}
              <a
                href={WHATSAPP_REDIRECT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline"
              >
                click here
              </a>.
            </p>
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-5 text-left animate-fade-up delay-300">
              <p className="text-sm font-medium text-foreground mb-2">
                ✨ One more step to activate The Mirror:
              </p>
              <p className="text-sm text-muted-foreground">
                Once WhatsApp opens, send a message like{" "}
                <span className="font-semibold text-accent">"Hello"</span> or{" "}
                <span className="font-semibold text-accent">"Mirror"</span> to start your journey.
                The Mirror won't activate until it hears from you!
              </p>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="section-padding bg-background min-h-[70vh] flex items-center">
        <div className="container-narrow">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-10">
              <p className="text-sm font-medium tracking-widest uppercase text-accent mb-4">
                Join The Mirror Project
              </p>
              <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">
                Start Your Journey
              </h1>
              <p className="text-muted-foreground">
                Fill in your details and we'll connect with you on WhatsApp.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">
                    First Name <span className="text-accent">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    className={errors.firstName ? "border-destructive" : ""}
                  />
                  {errors.firstName && (
                    <p className="text-sm text-destructive">{errors.firstName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="surname">
                    Surname <span className="text-accent">*</span>
                  </Label>
                  <Input
                    id="surname"
                    placeholder="Surname"
                    value={formData.surname}
                    onChange={(e) => handleChange("surname", e.target.value)}
                    className={errors.surname ? "border-destructive" : ""}
                  />
                  {errors.surname && (
                    <p className="text-sm text-destructive">{errors.surname}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-accent">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dob">
                  Date of Birth <span className="text-accent">*</span>
                </Label>
                <Input
                  id="dob"
                  placeholder="dd/mm/yy"
                  inputMode="numeric"
                  value={formData.dob}
                  onChange={(e) => handleChange("dob", e.target.value)}
                  className={errors.dob ? "border-destructive" : ""}
                />
                <p className="text-xs text-muted-foreground">Format: dd/mm/yy (e.g. 15/08/90)</p>
                {errors.dob && <p className="text-sm text-destructive">{errors.dob}</p>}
              </div>

              <div className="space-y-2">
                <Label>
                  WhatsApp Number <span className="text-accent">*</span>
                </Label>
                <div className="grid grid-cols-[180px_1fr] gap-2">
                  <Select
                    value={formData.countryCode}
                    onValueChange={(value) => handleChange("countryCode", value)}
                  >
                    <SelectTrigger
                      className={errors.countryCode ? "border-destructive" : ""}
                      aria-label="Country code"
                    >
                      <SelectValue placeholder="Country code" />
                    </SelectTrigger>
                    <SelectContent className="max-h-72">
                      {COUNTRY_CODES.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          <span className="inline-flex items-center gap-2">
                            <span aria-hidden>{c.flag}</span>
                            <span>{c.code}</span>
                            <span className="text-muted-foreground">{c.country}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    id="whatsapp"
                    placeholder="234 567 8900"
                    inputMode="tel"
                    value={formData.whatsapp}
                    onChange={(e) => handleChange("whatsapp", e.target.value)}
                    className={errors.whatsapp ? "border-destructive" : ""}
                    aria-label="WhatsApp number"
                  />
                </div>
                {errors.countryCode && (
                  <p className="text-sm text-destructive">{errors.countryCode}</p>
                )}
                {errors.whatsapp && (
                  <p className="text-sm text-destructive">{errors.whatsapp}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="country">
                    Country <span className="text-accent">*</span>
                  </Label>
                  <Select
                    value={formData.country}
                    onValueChange={(value) => handleChange("country", value)}
                  >
                    <SelectTrigger
                      id="country"
                      className={errors.country ? "border-destructive" : ""}
                    >
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent className="max-h-72">
                      {COUNTRY_CODES.map((c) => (
                        <SelectItem key={`country-${c.country}`} value={c.country}>
                          <span className="inline-flex items-center gap-2">
                            <span aria-hidden>{c.flag}</span>
                            <span>{c.country}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.country && (
                    <p className="text-sm text-destructive">{errors.country}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">
                    City <span className="text-accent">*</span>
                  </Label>
                  <Input
                    id="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    className={errors.city ? "border-destructive" : ""}
                  />
                  {errors.city && (
                    <p className="text-sm text-destructive">{errors.city}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="context">What made you interested in GenMyo?</Label>
                <Textarea
                  id="context"
                  placeholder="Optional — share what brought you here"
                  value={formData.context}
                  onChange={(e) => handleChange("context", e.target.value)}
                  rows={3}
                  className={errors.context ? "border-destructive" : ""}
                />
                {errors.context && <p className="text-sm text-destructive">{errors.context}</p>}
              </div>

              {submitError && (
                <p className="text-sm text-destructive rounded-lg border border-destructive/30 bg-destructive/5 p-4">
                  {submitError}
                </p>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full py-6 text-base gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting…" : "Join & Connect on WhatsApp"}
                <ArrowRight size={18} />
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Join;
