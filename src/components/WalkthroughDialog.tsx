import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const ADMIN_EMAIL = "hello@genmyo.ai";

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Please enter your name" })
    .max(100, { message: "Name is too long" }),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email" })
    .max(255, { message: "Email is too long" }),
  company: z.string().trim().max(120, { message: "Company name is too long" }).optional(),
  notes: z.string().trim().max(1000, { message: "Notes are too long" }).optional(),
});

const WalkthroughDialog = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; company?: string; notes?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse({ name, email, company, notes });
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        company: fieldErrors.company?.[0],
        notes: fieldErrors.notes?.[0],
      });
      return;
    }
    setErrors({});

    const { name: n, email: em, company: co, notes: nt } = result.data;
    const subject = `Enquiry from ${n}`;
    const bodyLines = [
      "A new enquiry has come in:",
      "",
      `Name: ${n}`,
      `Email: ${em}`,
      co ? `Company: ${co}` : null,
      nt ? `Notes: ${nt}` : null,
    ].filter(Boolean);
    const mailto = `mailto:${ADMIN_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

    window.location.href = mailto;

    toast({
      title: "Opening your email app",
      description: `Your request is ready to send to ${ADMIN_EMAIL}. Just hit send.`,
    });
    setOpen(false);
    setName("");
    setEmail("");
    setCompany("");
    setNotes("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-8 py-4 text-base font-medium bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
        >
          Book an enquiry
          <ArrowRight size={16} />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">Book an enquiry</DialogTitle>
          <DialogDescription>
            Share your details and we'll be in touch shortly.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="wt-name">Name</Label>
            <Input
              id="wt-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              maxLength={100}
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="wt-email">Email</Label>
            <Input
              id="wt-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              maxLength={255}
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="wt-company">
              Company <span className="text-muted-foreground">(optional)</span>
            </Label>
            <Input
              id="wt-company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Your company"
              maxLength={120}
            />
            {errors.company && <p className="text-sm text-destructive">{errors.company}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="wt-notes">
              Notes <span className="text-muted-foreground">(optional)</span>
            </Label>
            <Textarea
              id="wt-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Anything you'd like us to know"
              maxLength={1000}
              rows={3}
            />
            {errors.notes && <p className="text-sm text-destructive">{errors.notes}</p>}
          </div>
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
          >
            Send request
            <ArrowRight size={16} />
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WalkthroughDialog;
