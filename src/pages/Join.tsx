import { useState, useEffect } from "react";
import { z } from "zod";
import Layout from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { useSearchParams, Link } from "react-router-dom";
import {
  trackJoinPageView,
  trackJoinFormStart,
  trackJoinFormSubmit,
  trackFormFieldFocus,
  trackWhatsappRedirect,
  getGaIds,
  getOrCreateLeadId,
} from "@/lib/analytics";
import {
  readQuizCompletion,
  buildJoinContextFromQuiz,
} from "@/lib/quizRegistration";
import { getWhatsAppUrl } from "@/config/whatsapp";
import { checkCrisisContent } from "@/lib/crisisDetection";
import { CrisisSupportScreen } from "@/components/CrisisSupportMessage";
import { JoinConversation } from "@/components/JoinConversation";

const JOIN_DRAFT_KEY = "genmyo_join_draft";

type JoinDraft = {
  firstName?: string;
  email?: string;
  dob?: string;
  country?: string;
  countryCode?: string;
  whatsapp?: string;
  context?: string;
};

function loadJoinDraft(): JoinDraft {
  try {
    const raw = localStorage.getItem(JOIN_DRAFT_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as JoinDraft;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function saveJoinDraft(draft: JoinDraft) {
  try {
    localStorage.setItem(JOIN_DRAFT_KEY, JSON.stringify(draft));
  } catch {
    // ignore quota / private mode
  }
}

function clearJoinDraft() {
  try {
    localStorage.removeItem(JOIN_DRAFT_KEY);
  } catch {
    // ignore
  }
}

function getInitialJoinContext(searchParams: URLSearchParams) {
  const urlContext = searchParams.get("context");
  if (urlContext) return urlContext;
  const quiz = readQuizCompletion();
  if (quiz) return buildJoinContextFromQuiz(quiz);
  return "";
}

const GOOGLE_FORM_URL =  "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdYB479pboOh2TO8dgUFSObYR5Kd7P0qOhw30kgJ0A33-jzqw/formResponse";
const REGISTRATION_API_URL = "/api/register";
const CRISIS_REGISTRATION_API_URL = "/api/register-crisis";
const SECONDARY_AWS_API_URL =
  "https://2zvjy3mw7f.execute-api.ap-south-1.amazonaws.com/prod/register";

// Country codes with flag emoji + country name. Sorted by country name.
const COUNTRY_CODES: { code: string; flag: string; country: string }[] = [
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

function dialCodeForCountry(country: string): string | null {
  const match = COUNTRY_CODES.find((c) => c.country === country);
  return match ? match.code : null;
}

const formSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Must be less than 100 characters"),
  surname: z.string().optional(),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email")
    .max(255, "Email is too long"),
  dob: z.string().trim().min(1, "Date of birth is required"),
  countryCode: z.string().min(1, "Select a country code"),
  whatsapp: z
    .string()
    .trim()
    .min(1, "WhatsApp number is required")
    .max(20, "Please enter a valid number")
    .regex(/^[0-9\s\-()]+$/, "Digits only (no country code here)"),
  country: z.string().trim().min(1, "Country is required"),
  city: z.string().optional(),
  context: z
    .string()
    .max(500, "Please keep it under 500 characters")
    .optional(),
  termsAccepted: z.boolean().refine((v) => v === true, {
    message: "You must accept the Terms & Conditions to continue",
  }),
});

type FormData = z.infer<typeof formSchema>;

const joinSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "@id": "https://genmyo.ai/join#howto",
  name: "How to join GenMyo on WhatsApp",
  description:
    "Share a few details to connect directly with The Mirror on WhatsApp.",
  totalTime: "PT3M",
  provider: { "@id": "https://genmyo.ai/#organization" },
  isPartOf: { "@id": "https://genmyo.ai/#website" },
  step: [
    {
      "@type": "HowToStep",
      name: "Share your details",
      text: "Answer a few quiet questions â€” name, email, country, date of birth, and WhatsApp.",
    },
    {
      "@type": "HowToStep",
      name: "Start on WhatsApp",
      text: "Submit once, then say hi to The Mirror on WhatsApp to begin reflecting.",
    },
  ],
};

const Join = () => {
  const [searchParams] = useSearchParams();
  const quizFromNav = searchParams.get("from") === "quiz";
  const [hasTrackedFormStart, setHasTrackedFormStart] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const initialContext = getInitialJoinContext(searchParams);

  useEffect(() => {
    trackJoinPageView();
  }, []);

  const handleFieldFocus = (fieldName: string) => {
    if (!hasTrackedFormStart) {
      trackJoinFormStart();
      setHasTrackedFormStart(true);
    }
    trackFormFieldFocus("individual_registration", fieldName);
  };

  const [formData, setFormData] = useState<FormData>(() => {
    const draft = loadJoinDraft();
    return {
      firstName: draft.firstName || "",
      surname: "",
      email: draft.email || "",
      dob: draft.dob || "",
      countryCode: draft.countryCode || "",
      whatsapp: draft.whatsapp || "",
      country: draft.country || "",
      city: "",
      context: initialContext || draft.context || "",
      termsAccepted: false,
    };
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [bridging, setBridging] = useState(false);
  const [crisisMode, setCrisisMode] = useState(false);

  useEffect(() => {
    saveJoinDraft({
      firstName: formData.firstName,
      email: formData.email,
      dob: formData.dob,
      country: formData.country,
      countryCode: formData.countryCode,
      whatsapp: formData.whatsapp,
      context: formData.context,
    });
  }, [
    formData.firstName,
    formData.email,
    formData.dob,
    formData.country,
    formData.countryCode,
    formData.whatsapp,
    formData.context,
  ]);

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => {
      const next: FormData = { ...prev, [field]: value } as FormData;
      if (field === "country" && typeof value === "string") {
        const dial = dialCodeForCountry(value);
        if (dial) next.countryCode = dial;
      }
      return next;
    });
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (field === "country") {
      setErrors((prev) => ({ ...prev, countryCode: undefined }));
    }
    if (submitError || alreadyRegistered) {
      setSubmitError(null);
      setAlreadyRegistered(false);
    }
  };

  const postToGoogleForm = (fields: Record<string, string>) => {
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
  };

  const finishWaitlistSuccess = () => {
    clearJoinDraft();
    setBridging(true);
    window.setTimeout(() => {
      setBridging(false);
      setSubmitted(true);
    }, 900);
  };

  const finishCrisisRegistration = () => {
    clearJoinDraft();
    setCrisisMode(true);
  };

  const buildAnalyticsMeta = async () => {
    const leadId = getOrCreateLeadId();
    const { clientId, sessionId } = await getGaIds();
    return { leadId, clientId, sessionId };
  };

  const runRegistration = async () => {
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

    const fullName = formData.firstName.trim();
    const emailValue = formData.email.trim();
    const dobValue = formData.dob.trim();
    const countryValue = formData.country.trim();
    const cityValue = formData.city || "N/A";
    const surnameValue = formData.surname || "";
    const quizDone = readQuizCompletion();
    const crisisCheck = checkCrisisContent(formData.context);
    const isCrisisHigh = crisisCheck.severity === "high";
    const wroteNote = Boolean(formData.context?.trim());
    const hasCountry = Boolean(countryValue);
    const hasDob = Boolean(dobValue);

    const fullWhatsapp = `${formData.countryCode} ${formData.whatsapp}`.trim();
    const { leadId, clientId, sessionId } = await buildAnalyticsMeta();

    const contextPayload = [
      quizFromNav || quizDone ? "Path: from_quiz" : "Path: direct_whatsapp",
      quizDone ? "Quiz completed: yes" : null,
      isCrisisHigh ? "Crisis hold: yes â€” Mirror blocked" : null,
      leadId ? `lead_id: ${leadId}` : null,
      clientId ? `ga_client_id: ${clientId}` : null,
      sessionId ? `ga_session_id: ${sessionId}` : null,
      `DOB: ${dobValue}`,
      `Country: ${countryValue}`,
      `City: ${cityValue}`,
      formData.context ? `Notes: ${formData.context}` : "",
    ]
      .filter(Boolean)
      .join(" | ");

    const fields: Record<string, string> = {
      "entry.1907368519": fullName,
      "entry.44984313": emailValue,
      "entry.1030588086": fullWhatsapp,
      "entry.79544609": contextPayload,

      "entry.1208177102": surnameValue,
      "entry.1640555608": dobValue,
      "entry.1418652324": countryValue,
      "entry.142785906": cityValue,

      // Stitch keys for Mirror (not GA4 event params)
      lead_id: leadId,
      ga_client_id: clientId,
      ga_session_id: sessionId,
    };

    if (isCrisisHigh) {
      setIsSubmitting(true);
      try {
        const crisisResponse = await fetch(CRISIS_REGISTRATION_API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: fullName,
            surname: surnameValue,
            fullName,
            email: emailValue,
            whatsapp: fullWhatsapp,
            dob: dobValue,
            country: countryValue,
            city: cityValue,
            context: formData.context || "",
            contextPayload,
            crisisSeverity: "high",
            crisisDetectedAt: new Date().toISOString(),
            quizPath: quizFromNav || quizDone ? "from_quiz" : "direct_whatsapp",
            source: "join",
            lead_id: leadId,
            ga_client_id: clientId,
            ga_session_id: sessionId,
          }),
        });

        fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: fullName,
            fullName,
            email: emailValue,
            whatsapp: fullWhatsapp,
            dob: dobValue,
            country: countryValue,
            city: cityValue,
            context: formData.context || "",
            crisis: true,
          }),
        }).catch((err) =>
          console.error("Crisis email notification error:", err),
        );

        if (!crisisResponse.ok) {
          const err = await crisisResponse.json().catch(() => ({}));
          setSubmitError(
            (err as { error?: string }).error ||
              "We couldn't save your details right now. Please use the helpline resources below or try again.",
          );
          setCrisisMode(true);
          return;
        }

        trackJoinFormSubmit({
          has_country: hasCountry,
          has_dob: hasDob,
          wrote_reflection_note: wroteNote,
          crisis_hold: true,
        });
        finishCrisisRegistration();
      } catch {
        setSubmitError(
          "We couldn't save your details right now. Please use the helpline resources below.",
        );
        setCrisisMode(true);
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    const triggerEmailNotification = () => {
      fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: fullName,
          fullName,
          email: emailValue,
          whatsapp: fullWhatsapp,
          dob: dobValue,
          country: countryValue,
          city: cityValue,
          context: formData.context || "",
        }),
      }).catch((err) => console.error("Email notification error:", err));
    };

    const triggerSecondaryAws = () => {
      fetch(SECONDARY_AWS_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      }).catch((err) =>
        console.error("Secondary AWS API submission error:", err),
      );
    };

    setIsSubmitting(true);
    try {
      const response = await fetch(REGISTRATION_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });

      if (response.status === 409) {
        setAlreadyRegistered(true);
        setSubmitError(null);
        setErrors((prev) => ({
          ...prev,
          whatsapp: "This number is already registered.",
        }));
        return;
      }

      trackJoinFormSubmit({
        has_country: hasCountry,
        has_dob: hasDob,
        wrote_reflection_note: wroteNote,
        crisis_hold: false,
      });
      triggerSecondaryAws();
      triggerEmailNotification();
      postToGoogleForm(fields);
      finishWaitlistSuccess();
    } catch {
      trackJoinFormSubmit({
        has_country: hasCountry,
        has_dob: hasDob,
        wrote_reflection_note: wroteNote,
        crisis_hold: false,
      });
      triggerSecondaryAws();
      triggerEmailNotification();
      postToGoogleForm(fields);
      finishWaitlistSuccess();
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleSubmit = async () => {
    await runRegistration();
  };

  if (crisisMode) {
    return (
      <Layout showFAQ={false}>
        <SEO
          title="Support resources — GenMyō"
          description="Free and confidential crisis support resources."
        />
        <CrisisSupportScreen />
      </Layout>
    );
  }

  if (bridging) {
    return (
      <Layout showFAQ={false}>
        <SEO
          title="Start on WhatsApp — GenMyo"
          description="Connecting you to The Mirror on WhatsApp."
        />
        <section className="bg-background min-h-[70vh] flex items-center justify-center py-16">
          <div className="text-center px-6 animate-fade-up">
            <div
              className="mx-auto mb-6 h-10 w-10 rounded-full border-2 border-[#C2A053]/30 border-t-[#C2A053] animate-spin"
              aria-hidden
            />
            <p className="font-serif text-2xl text-[#1C1A16] font-medium">
              Opening your next step…
            </p>
            <p className="mt-2 text-sm text-[#5C564C]">
              Details saved. Getting WhatsApp ready.
            </p>
          </div>
        </section>
      </Layout>
    );
  }

  if (submitted) {
    const waUrl = getWhatsAppUrl();
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&color=1C1A16&bgcolor=FFFFFF&data=${encodeURIComponent(
      waUrl,
    )}`;

    return (
      <Layout showFAQ={false}>
        <SEO
          title="Start on WhatsApp — GenMyo"
          description="Connecting you to The Mirror on WhatsApp."
          jsonSchema={joinSchema}
        />
        <section className="bg-background min-h-[75vh] flex items-center justify-center py-12">
          <div className="text-center px-6 animate-fade-up max-w-md mx-auto w-full">
            <h1 className="font-serif text-3xl md:text-4xl text-foreground font-light leading-snug">
              You&apos;re all set
            </h1>
            {formData.firstName.trim() && (
              <p className="mt-2 text-base text-[#B0703E] font-serif">
                Thanks, {formData.firstName.trim()}.
              </p>
            )}
            <p className="mt-3 text-[#4A463E] text-sm leading-relaxed max-w-sm mx-auto">
              Say hi on WhatsApp to begin your first reflection.
            </p>

            <div className="mt-8 space-y-5">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsappRedirect("button")}
                className="inline-flex items-center justify-center gap-2 w-full px-8 py-4 text-base font-semibold bg-[#C2A053] text-[#1C1A16] rounded-full shadow-md hover:opacity-95 transition-opacity"
              >
                Open WhatsApp →
              </a>

              <div className="hidden md:flex flex-col items-center pt-2">
                <p className="text-xs text-muted-foreground mb-3">
                  Or scan with your phone
                </p>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsappRedirect("qr")}
                  className="p-3 bg-white rounded-xl border border-border/50"
                  title="Scan to open WhatsApp"
                >
                  <img
                    src={qrCodeUrl}
                    alt="QR code to open WhatsApp"
                    className="w-40 h-40 object-contain"
                    loading="eager"
                  />
                </a>
              </div>

              <Link
                to="/"
                className="inline-block text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
              >
                Back to GenMyō
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout showFAQ={false}>
      <SEO
        title="Start on WhatsApp — GenMyo"
        description="Share a few details to connect directly with The Mirror on WhatsApp."
        jsonSchema={joinSchema}
      />
      <section className="relative section-padding bg-background min-h-[75vh] overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-80"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 10% 0%, hsl(35 30% 90% / 0.7), transparent 55%), radial-gradient(ellipse 60% 40% at 90% 20%, hsl(42 40% 88% / 0.45), transparent 50%)",
          }}
        />
        <div className="relative w-full max-w-md mx-auto px-4 sm:px-6 pb-8">
          <JoinConversation
            formData={{
              firstName: formData.firstName,
              email: formData.email,
              dob: formData.dob,
              country: formData.country,
              countryCode: formData.countryCode,
              whatsapp: formData.whatsapp,
              context: formData.context,
              termsAccepted: formData.termsAccepted,
            }}
            errors={errors}
            countries={COUNTRY_CODES}
            quizFromNav={Boolean(quizFromNav || readQuizCompletion())}
            isSubmitting={isSubmitting}
            alreadyRegistered={alreadyRegistered}
            submitError={submitError}
            onChange={handleChange}
            onFieldFocus={handleFieldFocus}
            onSubmit={handleSubmit}
          />
        </div>
      </section>
    </Layout>
  );
};

export default Join;
