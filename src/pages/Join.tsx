import { useState, useEffect } from "react";
import { z } from "zod";
import Layout from "@/components/Layout";
import { SEO } from "@/components/SEO";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CountryCodeCombobox from "@/components/CountryCodeCombobox";
import CountryNameCombobox from "@/components/CountryNameCombobox";
import DateOfBirthPicker from "@/components/DateOfBirthPicker";
import { useToast } from "@/components/ui/use-toast";
import { useSearchParams } from "react-router-dom";
import { ArrowRight, CheckCircle, MessageCircle } from "lucide-react";
import { 
  trackCTAView, 
  trackCTAClickWhatsApp, 
  trackReflectionStarted,
  trackFormStart,
  trackFormFieldFocus,
  trackDesktopQRShown,
  trackWhatsAppRedirectFired
} from "@/lib/analytics";

const ADMIN_EMAIL = "hello@genmyo.ai";

const WHATSAPP_REDIRECT_URL = "https://wa.me/message/Y4GOKBIGBWUUM1?text=HI";
const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdYB479pboOh2TO8dgUFSObYR5Kd7P0qOhw30kgJ0A33-jzqw/formResponse";
const REGISTRATION_API_URL = "/api/register";

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
  { code: "+1 ", flag: "🇺🇸", country: "United States" },
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
  email: z.string().optional(),
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

const Join = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [sessionToken, setSessionToken] = useState("");
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [hasTrackedFormStart, setHasTrackedFormStart] = useState(false);

  useEffect(() => {
    trackCTAView("join_page", "/join");
    
    // Generate unique session token
    const token = "genmyo_ref_" + Math.random().toString(36).substring(2, 10).toUpperCase();
    setSessionToken(token);

    // Device check
    const ua = window.navigator.userAgent;
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua);
    setIsMobileDevice(isMobile);
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
    context: searchParams.get("context") || "",
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

    const fullName = formData.firstName.trim();
    const emailValue = formData.email || "no-email@genmyo.ai";
    const dobValue = formData.dob || "01/01/2000";
    const countryValue = formData.country || "N/A";
    const cityValue = formData.city || "N/A";
    const surnameValue = formData.surname || "";

    const fullWhatsapp = `${formData.countryCode} ${formData.whatsapp}`.trim();
    const contextPayload = [
      `DOB: ${dobValue}`,
      `Country: ${countryValue}`,
      `City: ${cityValue}`,
      `Token: ${sessionToken}`,
      formData.context ? `Notes: ${formData.context}` : "",
    ]
      .filter(Boolean)
      .join(" | ");

    const fields: Record<string, string> = {
      "entry.1907368519": fullName,
      "entry.44984313": emailValue,
      "entry.1030588086": fullWhatsapp,
      "entry.79544609": contextPayload,
      
      // Backward compatibility keys from the old schema:
      "entry.1208177102": surnameValue,
      "entry.1640555608": dobValue,
      "entry.1418652324": countryValue,
      "entry.142785906": cityValue,
    };

    const triggerEmailNotification = () => {
      // Trigger Resend email notification asynchronously
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
          context: formData.context ? `${formData.context} (Token: ${sessionToken})` : `Token: ${sessionToken}`,
        }),
      }).catch((err) => console.error("Email notification error:", err));
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
        setIsSubmitting(false);
        return;
      }

      triggerEmailNotification();
      submitToGoogleFormAndFinish(fields);
    } catch (err) {
      // Fallback: still post to Google Forms even if API is down
      triggerEmailNotification();
      submitToGoogleFormAndFinish(fields);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (submitted && !isMobileDevice) {
      trackDesktopQRShown("individual_registration");
    }
  }, [submitted, isMobileDevice]);

  if (submitted) {
    const waUrl = `https://wa.me/message/Y4GOKBIGBWUUM1?text=${encodeURIComponent(
      formData.context 
        ? `I'm ready to start my first reflection. My thought: ${formData.context} [Token: ${sessionToken}]`
        : `I'm ready to start my first reflection. [Token: ${sessionToken}]`
    )}`;
    
    const handleRedirectClick = () => {
      trackCTAClickWhatsApp("join_success_page", waUrl);
      trackWhatsAppRedirectFired("individual_registration", sessionToken);
      trackReflectionStarted("form_success");
    };

    return (
      <Layout>
        <section className="bg-background min-h-[65vh] flex items-center justify-center">
          <div className="text-center px-6 animate-fade-up max-w-lg mx-auto">
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-light leading-snug">
              Hi {formData.firstName}.
            </h1>
            <p className="mt-4 text-[#4A463E] text-base md:text-lg leading-relaxed font-serif">
              Your details have been saved. To begin your first reflection, follow the steps below to connect on WhatsApp.
            </p>
            
            {!isMobileDevice ? (
              <div className="mt-8 flex flex-col items-center gap-4 bg-cream p-6 rounded-2xl border border-border/80 max-w-sm mx-auto animate-fade-in">
                <p className="text-sm font-medium text-foreground">Scan with your phone to start on WhatsApp</p>
                <div className="bg-white p-3 rounded-xl shadow-sm border border-border/40">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(waUrl)}`}
                    alt="Scan to start reflection on WhatsApp"
                    className="w-[180px] h-[180px]"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Or continue on this device:
                </p>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-2 text-sm font-medium border border-border/80 bg-background text-foreground rounded-full hover:bg-secondary/40 transition-colors"
                  onClick={handleRedirectClick}
                >
                  <MessageCircle size={16} />
                  Open WhatsApp Web →
                </a>
              </div>
            ) : (
              <div className="mt-8">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium bg-[#B0703E] text-white rounded-full hover:opacity-90 transition-opacity"
                  onClick={handleRedirectClick}
                >
                  <MessageCircle size={18} />
                  Start your reflection on WhatsApp →
                </a>
              </div>
            )}
            
            <p className="text-xs text-muted-foreground mt-8 leading-relaxed">
              Free &middot; No app, no account, no card
              <br />
              Your reflections are private. <a href="/privacy" className="underline hover:text-[#B0703E]">What we store &rarr;</a>
            </p>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO
        title="Start Your First Reflection — Free, on WhatsApp | GenMyo"
        description="Send one message and your first Mirror Project reflection begins. Free, about 6 minutes, entirely in WhatsApp. No account, no download, no card."
      />
      <section className="section-padding bg-background min-h-[70vh] flex items-center">
        <div className="container-narrow">
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
                    Start Your Journey
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Save your baseline, details, and context before starting.
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

               {submitError && (
                 <p className="text-sm text-destructive rounded-lg border border-destructive/30 bg-destructive/5 p-4 animate-fade-in">
                   {submitError}
                 </p>
               )}

               <div className="space-y-3">
                 <Button
                   type="submit"
                   disabled={isSubmitting}
                   className="w-full rounded-full py-6 text-base gap-2 disabled:cursor-not-allowed disabled:opacity-60 bg-gold text-gold-foreground hover:opacity-90 transition-opacity"
                 >
                   {isSubmitting ? "Opening WhatsApp..." : "Open WhatsApp and begin →"}
                 </Button>
                 
                 <div className="text-center text-xs text-muted-foreground space-y-1">
                   <p>We'll open WhatsApp and your first reflection begins.</p>
                   <p className="text-accent">We never message you first.</p>
                 </div>
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
