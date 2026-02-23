import { useState } from "react";
import { z } from "zod";
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowRight, CheckCircle } from "lucide-react";

const WHATSAPP_REDIRECT_URL = "https://wa.me/message/Y4GOKBIGBWUUM1?text=HI";
const GOOGLE_FORM_URL = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdYB479pboOh2TO8dgUFSObYR5Kd7P0qOhw30kgJ0A33-jzqw/formResponse";

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255),
  whatsapp: z.string().trim().min(1, "WhatsApp number is required").max(20, "Please enter a valid number")
    .regex(/^\+?[0-9\s\-()]+$/, "Please enter a valid phone number with country code"),
  context: z.string().max(500, "Please keep it under 500 characters").optional(),
});

type FormData = z.infer<typeof formSchema>;

const Join = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    whatsapp: "",
    context: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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

    // Submit to Google Forms via hidden iframe to avoid CORS issues
    const iframe = document.createElement("iframe");
    iframe.name = "hidden_iframe";
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    const form = document.createElement("form");
    form.method = "POST";
    form.action = GOOGLE_FORM_URL;
    form.target = "hidden_iframe";

    const fields: Record<string, string> = {
      "entry.1907368519": formData.name,
      "entry.44984313": formData.email,
      "entry.1030588086": formData.whatsapp,
      "entry.79544609": formData.context || "",
    };

    Object.entries(fields).forEach(([name, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();

    // Clean up
    setTimeout(() => {
      document.body.removeChild(form);
      document.body.removeChild(iframe);
    }, 1000);

    setSubmitted(true);
    setTimeout(() => {
      window.open(WHATSAPP_REDIRECT_URL, "_blank");
    }, 5000);
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
              Thanks! Redirecting you to WhatsApp…
            </h1>
            <p className="text-muted-foreground animate-fade-up delay-200 mb-6">
              A new tab should open shortly. If it doesn't,{" "}
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
                Once WhatsApp opens, send a message like <span className="font-semibold text-accent">"Hello"</span> or <span className="font-semibold text-accent">"Mirror"</span> to start your journey. The Mirror won't activate until it hears from you!
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
              <div className="space-y-2">
                <Label htmlFor="name">Name <span className="text-accent">*</span></Label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email <span className="text-accent">*</span></Label>
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
                <Label htmlFor="whatsapp">WhatsApp Number <span className="text-accent">*</span></Label>
                <Input
                  id="whatsapp"
                  placeholder="+1 234 567 8900"
                  value={formData.whatsapp}
                  onChange={(e) => handleChange("whatsapp", e.target.value)}
                  className={errors.whatsapp ? "border-destructive" : ""}
                />
                <p className="text-xs text-muted-foreground">Include your country code (e.g. +44, +1)</p>
                {errors.whatsapp && <p className="text-sm text-destructive">{errors.whatsapp}</p>}
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

              <Button
                type="submit"
                className="w-full rounded-full py-6 text-base gap-2"
              >
                Join & Connect on WhatsApp
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
