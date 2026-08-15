import { useState, useEffect } from "react";
import { z } from "zod";
import Layout from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CountryCodeCombobox from "@/components/CountryCodeCombobox";
import CountryNameCombobox from "@/components/CountryNameCombobox";
import DateOfBirthPicker from "@/components/DateOfBirthPicker";
import { useToast } from "@/components/ui/use-toast";
import { useSearchParams, Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import { 
  trackCTAView, 
  trackFormStart,
  trackFormFieldFocus,
} from "@/lib/analytics";
import {
  readQuizCompletion,
  buildJoinContextFromQuiz,
} from "@/lib/quizRegistration";
import { getWhatsAppUrl } from "@/config/whatsapp";

function getInitialJoinContext(searchParams: URLSearchParams) {
  const urlContext = searchParams.get("context");
  if (urlContext) return urlContext;
  const quiz = readQuizCompletion();
  if (quiz) return buildJoinContextFromQuiz(quiz);
  return "";
}

const ADMIN_EMAIL = "hello@genmyo.ai";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdYB479pboOh2TO8dgUFSObYR5Kd7P0qOhw30kgJ0A33-jzqw/formResponse";
const REGISTRATION_API_URL = "/api/register";
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


const formSchema = z.object({
  firstName: z.string().trim().min(1, "Name is required").max(100, "Must be less than 100 characters"),
  surname: z.string().optional(),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email")
    .max(255, "Email is too long"),
  dob: z.string().optional(),
  countryCode: z.string().min(1, "Select a country code"),
  whatsapp: z
    .string()
    .trim()
    .min(1, "WhatsApp number is required")
    .max(20, "Please enter a valid number")
    .regex(/^[0-9\s\-()]+$/, "Digits only (no country code here)"),
  country: z.string().optional(),
  city: z.string().optional(),
  context: z.string().max(500, "Please keep it under 500 characters").optional(),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the Terms & Conditions to continue" }),
  }),
});

type FormData = z.infer<typeof formSchema>;

const businessSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email is too long"),
  phoneCode: z.string().min(1, "Select a region code"),
  phone: z
    .string()
    .trim()
    .min(1, "Contact number is required")
    .max(20, "Please enter a valid number")
    .regex(/^[0-9\s\-()]+$/, "Digits only (no region code here)"),
  company: z.string().trim().min(1, "Please enter your company").max(120, "Company name is too long"),
  role: z.string().trim().max(120, "Role is too long").optional(),
  teamSize: z.string().trim().max(50).optional(),
  notes: z.string().trim().max(1000, "Notes are too long").optional(),
});

type BusinessData = z.infer<typeof businessSchema>;

const joinSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "@id": "https://genmyo.ai/join#howto",
  "name": "How to join GenMyo on WhatsApp",
  "description": "Save your details to connect directly with The Mirror on WhatsApp.",
  "totalTime": "PT3M",
  "provider": { "@id": "https://genmyo.ai/#organization" },
  "isPartOf": { "@id": "https://genmyo.ai/#website" },
  "step": [
    {
      "@type": "HowToStep",
      "name": "Take the quiz (optional)",
      "text": "Discover your inner weather profile in about two minutes."
    },
    {
      "@type": "HowToStep",
      "name": "Fill details",
      "text": "Provide your name, email, and WhatsApp number on the join form."
    },
    {
      "@type": "HowToStep",
      "name": "Start on WhatsApp",
      "text": "Submit once to connect directly with The Mirror on WhatsApp."
    }
  ]
};

const Join = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const quizFromNav = searchParams.get("from") === "quiz";
  const [hasTrackedFormStart, setHasTrackedFormStart] = useState(false);

  useEffect(() => {
    trackCTAView("join_page", "/join");
  }, []);

  const handleFieldFocus = (fieldName: string) => {
    if (!hasTrackedFormStart) {
      trackFormStart("individual_registration");
      setHasTrackedFormStart(true);
    }
    trackFormFieldFocus("individual_registration", fieldName);
  };

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    surname: "",
    email: "",
    dob: "",
    countryCode: "",
    whatsapp: "",
    country: "",
    city: "",
    context: getInitialJoinContext(searchParams),
    termsAccepted: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [business, setBusiness] = useState<BusinessData>({
    name: "",
    email: "",
    phoneCode: "",
    phone: "",
    company: "",
    role: "",
    teamSize: "",
    notes: "",
  });
  const [businessErrors, setBusinessErrors] = useState<Partial<Record<keyof BusinessData, string>>>({});

  const handleBusinessChange = (field: keyof BusinessData, value: string) => {
    setBusiness((prev) => ({ ...prev, [field]: value }));
    if (businessErrors[field]) {
      setBusinessErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleBusinessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = businessSchema.safeParse(business);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof BusinessData, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof BusinessData;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      });
      setBusinessErrors(fieldErrors);
      return;
    }
    setBusinessErrors({});

    const { name, email, phoneCode, phone, company, role, teamSize, notes } = result.data;
    const subject = `Business enquiry from ${company}`;
    const bodyLines = [
      "A new business enquiry has come in:",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Contact number: ${phoneCode} ${phone}`,
      `Company: ${company}`,
      role ? `Role: ${role}` : null,
      teamSize ? `Team size: ${teamSize}` : null,
      notes ? `Notes: ${notes}` : null,
    ].filter(Boolean);
    const mailto = `mailto:${ADMIN_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

    window.location.href = mailto;
    toast({
      title: "Opening your email app",
      description: `Your enquiry is ready to send to ${ADMIN_EMAIL}. Just hit send.`,
    });
  };

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (submitError) {
      setSubmitError(null);
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
    setSubmitted(true);
    toast({
      title: "Details saved!",
      description: "Scan the QR code or click the button below to connect on WhatsApp.",
    });
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
    const dobValue = formData.dob || "01/01/2000";
    const countryValue = formData.country || "N/A";
    const cityValue = formData.city || "N/A";
    const surnameValue = formData.surname || "";
    const quizDone = readQuizCompletion();

    const fullWhatsapp = `${formData.countryCode} ${formData.whatsapp}`.trim();
    const contextPayload = [
      quizFromNav || quizDone ? "Path: from_quiz" : "Path: direct_whatsapp",
      quizDone ? "Quiz completed: yes" : null,
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
    };

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
      }).catch((err) => console.error("Secondary AWS API submission error:", err));
    };

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

      triggerSecondaryAws();
      triggerEmailNotification();
      postToGoogleForm(fields);
      finishWaitlistSuccess();
    } catch {
      triggerSecondaryAws();
      triggerEmailNotification();
      postToGoogleForm(fields);
      finishWaitlistSuccess();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await runRegistration();
  };

  if (submitted) {
    const waUrl = getWhatsAppUrl();
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&color=1C1A16&bgcolor=FFFFFF&data=${encodeURIComponent(
      waUrl
    )}`;

    return (
      <Layout>
        <SEO
          title="Start on WhatsApp — GenMyo"
          description="Connecting you to The Mirror on WhatsApp."
          jsonSchema={joinSchema}
        />
        <section className="bg-background min-h-[75vh] flex items-center justify-center py-12">
          <div className="text-center px-6 animate-fade-up max-w-md mx-auto">
            <div className="w-16 h-16 bg-[#B0703E]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-[#B0703E]" />
            </div>
            <h1 className="font-serif text-3xl md:text-4xl text-foreground font-light leading-snug">
              You're all set
            </h1>
            <p className="mt-2 text-lg font-serif text-[#B0703E]">
              Thanks, {formData.firstName}!
            </p>
            <p className="mt-3 text-[#4A463E] text-sm md:text-base leading-relaxed">
              Your details are saved. Tap the button below or scan the QR code to begin your first reflection on WhatsApp.
            </p>

            {/* QR Code Container */}
            <div className="mt-8 p-6 bg-card border border-border/80 rounded-2xl shadow-sm flex flex-col items-center">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white rounded-xl shadow-inner border border-border/40 hover:scale-105 transition-transform cursor-pointer group"
                title="Click or scan to open WhatsApp"
              >
                <img
                  src={qrCodeUrl}
                  alt="Click or scan to open WhatsApp"
                  className="w-48 h-48 object-contain rounded-lg"
                  loading="eager"
                />
              </a>
              <p className="text-xs text-muted-foreground mt-4 font-medium">
                Click or scan with your camera to open WhatsApp directly
              </p>
            </div>

            {/* Direct WhatsApp Button */}
            <div className="mt-6 space-y-4">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 w-full px-8 py-4 text-base font-semibold bg-[#C2A053] text-[#1C1A16] rounded-full shadow-md hover:opacity-95 transition-all group"
              >
                <ArrowRight className="w-5 h-5 hidden" />
                <span>Open WhatsApp &amp; Start Reflection →</span>
              </a>

              <div>
                <Link
                  to="/"
                  className="inline-block text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
                >
                  Back to GenMyo
                </Link>
              </div>
            </div>

            <p className="text-xs text-muted-foreground mt-8 leading-relaxed">
              Free &middot; No app download required &middot; Confidential
              <br />
              Your reflections are private.{" "}
              <a href="/privacy" className="underline hover:text-[#B0703E]">
                What we store &rarr;
              </a>
            </p>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO
        title="Start on WhatsApp — GenMyo"
        description="Save your details to connect directly with The Mirror on WhatsApp."
        jsonSchema={joinSchema}
      />
      <section className="section-padding bg-background min-h-[75vh] flex items-center justify-center">
        <div className="container-narrow flex flex-col items-center justify-center">
          <div className="max-w-lg mx-auto">
            <Tabs defaultValue="individual" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-10">
                <TabsTrigger value="individual">Individual</TabsTrigger>
                <TabsTrigger value="business">Business</TabsTrigger>
              </TabsList>

              <TabsContent value="individual">
                <div className="text-center mb-10">
                  <p className="text-sm font-medium tracking-widest uppercase text-accent mb-4">
                    Join The Mirror Project
                  </p>
                  <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">
                    {quizFromNav || readQuizCompletion()
                      ? "Complete your signup"
                      : "Start on WhatsApp"}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    {quizFromNav || readQuizCompletion()
                      ? "Your quiz results are ready. Save details to connect directly on WhatsApp."
                      : "Save your details to connect directly with The Mirror on WhatsApp."}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">
                      Your Name <span className="text-accent">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="Your Name"
                      value={formData.firstName}
                      onChange={(e) => handleChange("firstName", e.target.value)}
                      onFocus={() => handleFieldFocus("firstName")}
                      className={errors.firstName ? "border-destructive" : ""}
                    />
                    {errors.firstName && (
                      <p className="text-sm text-destructive">{errors.firstName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email <span className="text-accent">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@email.com"
                      autoComplete="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      onFocus={() => handleFieldFocus("email")}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of Birth</Label>
                      <DateOfBirthPicker
                        value={formData.dob}
                        onChange={(value) => handleChange("dob", value)}
                      />
                      {errors.dob && (
                        <p className="text-sm text-destructive">{errors.dob}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <CountryNameCombobox
                        countries={COUNTRY_CODES}
                        value={formData.country}
                        onChange={(value) => handleChange("country", value)}
                        placeholder="Select country"
                      />
                      {errors.country && (
                        <p className="text-sm text-destructive">{errors.country}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2" onFocusCapture={() => handleFieldFocus("whatsapp")}>
                    <Label>
                      WhatsApp Number <span className="text-accent">*</span>
                    </Label>
                    <div className="grid grid-cols-[180px_1fr] gap-2">
                      <CountryCodeCombobox
                        countries={COUNTRY_CODES}
                        value={formData.countryCode}
                        onChange={(value) => handleChange("countryCode", value)}
                        placeholder="Country code"
                        ariaLabel="Country code"
                        hasError={!!errors.countryCode}
                      />
                      <Input
                        id="whatsapp"
                        placeholder="234 567 8900"
                        inputMode="tel"
                        value={formData.whatsapp}
                        onChange={(e) => handleChange("whatsapp", e.target.value)}
                        onFocus={() => handleFieldFocus("whatsapp")}
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

                  <div className="space-y-2">
                    <Label htmlFor="context">What's been sitting with you lately?</Label>
                    <Textarea
                      id="context"
                      placeholder="Optional: share one thing that is on your mind right now"
                      value={formData.context}
                      onChange={(e) => handleChange("context", e.target.value)}
                      onFocus={() => handleFieldFocus("context")}
                      rows={3}
                      className={errors.context ? "border-destructive" : ""}
                    />
                    {errors.context && <p className="text-sm text-destructive">{errors.context}</p>}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start gap-3 rounded-xl border border-border/70 bg-muted/20 p-4">
                      <Checkbox
                        id="termsAccepted"
                        checked={formData.termsAccepted}
                        onCheckedChange={(checked) => handleChange("termsAccepted", checked === true)}
                        aria-invalid={errors.termsAccepted ? "true" : "false"}
                        className={errors.termsAccepted ? "border-destructive" : ""}
                      />
                      <div className="space-y-1 text-sm leading-relaxed">
                        <Label htmlFor="termsAccepted" className="cursor-pointer font-normal text-foreground">
                          I agree to the{" "}
                          <Link to="/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#B0703E]">
                            Terms & Conditions
                          </Link>{" "}
                          and acknowledge the{" "}
                          <Link to="/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#B0703E]">
                            Privacy Policy
                          </Link>
                          .
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          This includes the WhatsApp opt-in terms described in Section 20.
                        </p>
                      </div>
                    </div>
                    {errors.termsAccepted && (
                      <p className="text-sm text-destructive">{errors.termsAccepted}</p>
                    )}
                  </div>

                  {submitError && (
                    <p className="text-sm text-destructive rounded-lg border border-destructive/30 bg-[#FEE2E2]/10 p-4 animate-fade-in">
                      {submitError}
                    </p>
                  )}

                  <div className="space-y-3">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-full py-6 text-base font-semibold gap-2 disabled:cursor-not-allowed disabled:opacity-60 bg-gold text-gold-foreground hover:opacity-90 transition-opacity shadow-sm"
                    >
                      {isSubmitting ? "Saving details..." : "Start Your Reflection on WhatsApp →"}
                    </Button>

                    {!quizFromNav && !readQuizCompletion() && (
                      <div className="pt-1 text-center animate-fade-in">
                        <Link
                          to="/quiz"
                          className="inline-flex items-center justify-center gap-2 w-full px-5 py-3.5 text-sm font-semibold border border-[#C2A053]/60 bg-[#C2A053]/15 text-[#1C1A16] hover:bg-[#C2A053]/25 rounded-full transition-all duration-200 shadow-xs group"
                        >
                          <Sparkles className="w-4 h-4 text-[#C2A053] group-hover:scale-110 transition-transform" />
                          <span>Take the 2-min quiz first →</span>
                        </Link>
                      </div>
                    )}

                    <p className="text-center text-xs text-muted-foreground pt-1">
                      GenMyo is not therapy, not a diagnostic tool, and not a crisis service.
                    </p>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="business">
                <div className="text-center mb-10">
                  <p className="text-sm font-medium tracking-widest uppercase text-accent mb-4">
                    GenMyo for Business
                  </p>
                  <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">
                    Enquire for Your Team
                  </h1>
                  <p className="text-muted-foreground">
                    Tell us about your organisation and we'll be in touch to arrange a walkthrough.
                  </p>
                </div>

                <form onSubmit={handleBusinessSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="biz-name">
                        Name <span className="text-accent">*</span>
                      </Label>
                      <Input
                        id="biz-name"
                        placeholder="Your name"
                        value={business.name}
                        onChange={(e) => handleBusinessChange("name", e.target.value)}
                        className={businessErrors.name ? "border-destructive" : ""}
                      />
                      {businessErrors.name && (
                        <p className="text-sm text-destructive">{businessErrors.name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="biz-email">
                        Work Email <span className="text-accent">*</span>
                      </Label>
                      <Input
                        id="biz-email"
                        type="email"
                        placeholder="you@company.com"
                        value={business.email}
                        onChange={(e) => handleBusinessChange("email", e.target.value)}
                        className={businessErrors.email ? "border-destructive" : ""}
                      />
                      {businessErrors.email && (
                        <p className="text-sm text-destructive">{businessErrors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>
                      Contact Number <span className="text-accent">*</span>
                    </Label>
                    <div className="grid grid-cols-[180px_1fr] gap-2">
                      <CountryCodeCombobox
                        countries={COUNTRY_CODES}
                        value={business.phoneCode}
                        onChange={(value) => handleBusinessChange("phoneCode", value)}
                        placeholder="Country code"
                        ariaLabel="Country code"
                        hasError={!!businessErrors.phoneCode}
                      />
                      <Input
                        id="biz-phone"
                        type="tel"
                        placeholder="Contact number"
                        value={business.phone}
                        onChange={(e) => handleBusinessChange("phone", e.target.value)}
                        className={businessErrors.phone ? "border-destructive" : ""}
                      />
                    </div>
                    {(businessErrors.phoneCode || businessErrors.phone) && (
                      <p className="text-sm text-destructive">
                        {businessErrors.phoneCode || businessErrors.phone}
                      </p>
                    )}
                  </div>


                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="biz-company">
                        Company <span className="text-accent">*</span>
                      </Label>
                      <Input
                        id="biz-company"
                        placeholder="Company name"
                        value={business.company}
                        onChange={(e) => handleBusinessChange("company", e.target.value)}
                        className={businessErrors.company ? "border-destructive" : ""}
                      />
                      {businessErrors.company && (
                        <p className="text-sm text-destructive">{businessErrors.company}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="biz-role">
                        Role <span className="text-muted-foreground">(optional)</span>
                      </Label>
                      <Input
                        id="biz-role"
                        placeholder="e.g. Head of People"
                        value={business.role}
                        onChange={(e) => handleBusinessChange("role", e.target.value)}
                        className={businessErrors.role ? "border-destructive" : ""}
                      />
                      {businessErrors.role && (
                        <p className="text-sm text-destructive">{businessErrors.role}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="biz-team">
                      Team Size <span className="text-muted-foreground">(optional)</span>
                    </Label>
                    <Input
                      id="biz-team"
                      placeholder="e.g. 50-200"
                      value={business.teamSize}
                      onChange={(e) => handleBusinessChange("teamSize", e.target.value)}
                      className={businessErrors.teamSize ? "border-destructive" : ""}
                    />
                    {businessErrors.teamSize && (
                      <p className="text-sm text-destructive">{businessErrors.teamSize}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="biz-notes">
                      Notes <span className="text-muted-foreground">(optional)</span>
                    </Label>
                    <Textarea
                      id="biz-notes"
                      placeholder="Anything you'd like us to know"
                      value={business.notes}
                      onChange={(e) => handleBusinessChange("notes", e.target.value)}
                      rows={3}
                      className={businessErrors.notes ? "border-destructive" : ""}
                    />
                    {businessErrors.notes && (
                      <p className="text-sm text-destructive">{businessErrors.notes}</p>
                    )}
                  </div>

                  <Button type="submit" className="w-full rounded-full py-6 text-base gap-2">
                    Send Enquiry
                    <ArrowRight size={18} />
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Join;
