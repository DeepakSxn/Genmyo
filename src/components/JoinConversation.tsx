import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import CountryCodeCombobox from "@/components/CountryCodeCombobox";
import CountryNameCombobox from "@/components/CountryNameCombobox";
import DateOfBirthPicker from "@/components/DateOfBirthPicker";
import { getWhatsAppUrl } from "@/config/whatsapp";
import { trackJoinBeat, trackWhatsappRedirect } from "@/lib/analytics";
import { JoinHowItWorks } from "@/components/JoinHowItWorks";

/* ────────────────────────────────────────────────────────────
   Types (unchanged public API)
──────────────────────────────────────────────────────────── */
export type JoinFormFields = {
  firstName: string;
  email: string;
  dob: string;
  country: string;
  countryCode: string;
  whatsapp: string;
  context?: string;
  termsAccepted: boolean;
};

type CountryRow = { code: string; flag: string; country: string };

type BeatId =
  | "name"
  | "context"
  | "country"
  | "whatsapp"
  | "email"
  | "dob"
  | "terms";

// Practical details first; "how are you arriving" last before terms.
const BEAT_ORDER: BeatId[] = [
  "name",
  "country",
  "whatsapp",
  "email",
  "dob",
  "context",
  "terms",
];
const IDX = Object.fromEntries(BEAT_ORDER.map((b, i) => [b, i])) as Record<
  BeatId,
  number
>;

type JoinConversationProps = {
  formData: JoinFormFields;
  errors: Partial<Record<keyof JoinFormFields, string>>;
  countries: CountryRow[];
  quizFromNav?: boolean;
  isSubmitting: boolean;
  alreadyRegistered: boolean;
  submitError: string | null;
  onChange: (field: keyof JoinFormFields, value: string | boolean) => void;
  onFieldFocus: (fieldName: string) => void;
  onSubmit: () => void;
};

/* ────────────────────────────────────────────────────────────
   Copy + helpers
──────────────────────────────────────────────────────────── */
const MOODS: { label: string; reply: string }[] = [
  {
    label: "Good",
    reply: "Glad you're landing well. We'll keep that energy.",
  },
  {
    label: "Chilled",
    reply: "Chilled is a lovely place to start. Soft and easy.",
  },
  {
    label: "Curious",
    reply: "Curiosity is a good door. One quiet question at a time.",
  },
  {
    label: "Excited",
    reply: "Love that. Let's put that spark to gentle use.",
  },
  {
    label: "Hopeful",
    reply: "Hope is a strong thread. I'll hold it with you.",
  },
  {
    label: "Open",
    reply: "Open is enough. We'll go at your pace.",
  },
];

function promptFor(beat: BeatId, firstName: string): string {
  switch (beat) {
    case "name":
      return "What can I call you?";
    case "context":
      return firstName
        ? `Almost there, ${firstName}. How are you arriving today?`
        : "How are you arriving today?";
    case "country":
      return "Where are you based? I'm wherever you are, 24/7. I'll check in periodically.";
    case "whatsapp":
      return "I'll need a number to open this private space. Only for this chat. No calls, no spam.";
    case "email":
      return "And your email, so we can find you if WhatsApp is quiet?";
    case "dob":
      return "Unfortunately I don't have a date of birth. What's yours?";
    case "terms":
      return "One last tick, then we continue in real WhatsApp.";
  }
}

function generationReply(dob: string): string | null {
  const parts = dob.trim().split("/");
  if (parts.length !== 3) return null;
  const year = Number(parts[2]);
  if (!Number.isFinite(year) || year < 1920 || year > new Date().getFullYear())
    return null;
  // Light wink by generation: warm, not roast-y.
  if (year >= 2013)
    return "Gen Alpha? Okay, impressively early. I'll keep the slang dictionary open.";
  if (year >= 1997 && year <= 2012)
    return "Gen Z. Noted. I promise not to say 'periodt' unless you start.";
  if (year >= 1981 && year <= 1996)
    return "Millennial! A fellow survivor of 'loading…' screens and avocado-adjacent jokes.";
  if (year >= 1965 && year <= 1980)
    return "Gen X. Cool. The generation that invented 'whatever' and somehow still runs the room.";
  if (year >= 1946 && year <= 1964)
    return "Boomer crew! Respect: you survived before Ctrl+Z was a lifestyle.";
  if (year >= 1928 && year <= 1945)
    return "Silent Generation energy: quiet on the label, loud on the wisdom. Honoured.";
  return "Got the year. I won't guess your playlist… unless you ask.";
}

/** Short Mirror reaction shown right after a user answer. */
function reactionFor(
  beat: BeatId,
  data: JoinFormFields,
  skipped: boolean,
): string | null {
  switch (beat) {
    case "context": {
      const t = data.context?.trim();
      if (!t || skipped) return "All good. We can start light.";
      const hit = MOODS.find((m) => m.label === t);
      return hit ? hit.reply : "Thank you for telling me that.";
    }
    case "country":
      return data.country.trim()
        ? `${data.country.trim()}. Good. I'll be there when you are.`
        : null;
    case "dob":
      return generationReply(data.dob);
    default:
      return null;
  }
}

function summaryFor(beat: BeatId, data: JoinFormFields): string {
  switch (beat) {
    case "name":
      return data.firstName.trim();
    case "email":
      return data.email.trim();
    case "country":
      return data.country.trim();
    case "whatsapp":
      return `${data.countryCode} ${data.whatsapp}`.trim();
    case "dob":
      return data.dob.trim();
    case "context":
      return data.context?.trim() || "Skipped";
    case "terms":
      return data.termsAccepted ? "Agreed ✓" : "";
  }
}

function isBeatFilled(beat: BeatId, data: JoinFormFields): boolean {
  switch (beat) {
    case "name":
      return Boolean(data.firstName.trim());
    case "email":
      return data.email.trim().includes("@");
    case "country":
      return Boolean(data.country.trim());
    case "whatsapp":
      return Boolean(data.countryCode.trim() && data.whatsapp.trim());
    case "dob":
      return Boolean(data.dob.trim());
    case "context":
      return true;
    case "terms":
      return data.termsAccepted === true;
  }
}

function canSendBeat(beat: BeatId, data: JoinFormFields): boolean {
  switch (beat) {
    case "name":
      return Boolean(data.firstName.trim());
    case "email":
      return data.email.trim().includes("@");
    case "country":
      return Boolean(data.country.trim() && data.countryCode.trim());
    case "whatsapp":
      return (
        Boolean(data.countryCode.trim() && data.whatsapp.trim()) &&
        /^[0-9\s\-()]+$/.test(data.whatsapp.trim())
      );
    case "dob":
      return Boolean(data.dob.trim());
    case "context":
      return (data.context?.length ?? 0) <= 500;
    case "terms":
      return data.termsAccepted;
  }
}

function initialActiveIndex(d: JoinFormFields): number {
  if (!d.firstName.trim()) return 0;
  if (!d.country.trim()) return IDX.country;
  if (!d.countryCode.trim() || !d.whatsapp.trim()) return IDX.whatsapp;
  if (!d.email.trim().includes("@")) return IDX.email;
  if (!d.dob.trim()) return IDX.dob;
  if (!d.context?.trim() && !d.termsAccepted) return IDX.context;
  return IDX.terms;
}

function placeholderFor(beat: BeatId): string {
  switch (beat) {
    case "name":
      return "Type your name…";
    case "email":
      return "you@email.com";
    case "whatsapp":
      return "Your number…";
    case "context":
      return "Or type something…";
    default:
      return "";
  }
}

/** Keep Mirror "typing" brief: long delays read as lag on send. */
const typingMs = (text: string, extra = 0, reduceMotion = false) => {
  if (reduceMotion) return 0;
  return Math.min(380, 140 + Math.min(text.length, 48) * 4 + extra);
};

const nowLabel = () =>
  new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

/* ────────────────────────────────────────────────────────────
   Motion presets
──────────────────────────────────────────────────────────── */
const SPRING = { type: "spring", stiffness: 520, damping: 32, mass: 0.65 } as const;
const SPRING_SNAP = { type: "spring", stiffness: 620, damping: 34, mass: 0.55 } as const;

/* ────────────────────────────────────────────────────────────
   Main component
──────────────────────────────────────────────────────────── */
export function JoinConversation({
  formData,
  errors,
  countries,
  quizFromNav = false,
  isSubmitting,
  alreadyRegistered,
  submitError,
  onChange,
  onFieldFocus,
  onSubmit,
}: JoinConversationProps) {
  const reduce = useReducedMotion();
  const startIdx = initialActiveIndex(formData);

  const [activeIndex, setActiveIndex] = useState(startIdx);
  const [furthest, setFurthest] = useState(Math.max(startIdx, 0));
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [contextSkipped, setContextSkipped] = useState(
    () => !formData.context?.trim() && Boolean(formData.country.trim()),
  );
  const [beatError, setBeatError] = useState<string | null>(null);
  const [introReady, setIntroReady] = useState(startIdx > 0);
  const [introStep, setIntroStep] = useState(startIdx > 0 ? 3 : 0);
  const [mirrorTyping, setMirrorTyping] = useState(false);
  const [promptVisible, setPromptVisible] = useState(startIdx > 0);
  const [composerReady, setComposerReady] = useState(startIdx > 0);
  const [guessDismissed, setGuessDismissed] = useState(false);
  const [finale, setFinale] = useState(false);

  const activeInputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(
    null,
  );
  const chatRef = useRef<HTMLDivElement>(null);
  const liveRef = useRef<HTMLDivElement>(null);
  const revealTimer = useRef<number | null>(null);
  const advancingRef = useRef(false);
  const lastBeatRef = useRef<BeatId | null>(null);
  const dataRef = useRef(formData);
  dataRef.current = formData;
  const advanceRef = useRef<(i: number) => void>(() => {});
  const shake = useAnimationControls();

  const displayIndex = editingIndex ?? activeIndex;
  const activeBeat = BEAT_ORDER[displayIndex];

  /* Country guess from the browser locale (one-tap shortcut). */
  const guess = useMemo(() => {
    try {
      const region = navigator.language.split("-")[1]?.toUpperCase();
      if (!region) return null;
      const name = new Intl.DisplayNames(["en"], { type: "region" }).of(region);
      return (
        countries.find(
          (c) => c.country.toLowerCase() === (name || "").toLowerCase(),
        ) ?? null
      );
    } catch {
      return null;
    }
  }, [countries]);

  const historyBeats = useMemo(() => {
    const end = editingIndex !== null ? editingIndex : activeIndex;
    return BEAT_ORDER.slice(0, end).filter((beat, i) => {
      if (beat === "context" && contextSkipped && !formData.context?.trim())
        return true;
      return isBeatFilled(beat, formData) || i < furthest;
    });
  }, [activeIndex, editingIndex, formData, furthest, contextSkipped]);

  const progress = Math.min(1, (furthest + (finale ? 1 : 0)) / (BEAT_ORDER.length - 1));

  /* ── Intro stagger ── */
  useEffect(() => {
    if (introReady) return;
    const timers = [
      window.setTimeout(() => setIntroStep(1), 450),
      window.setTimeout(() => setIntroStep(2), 1150),
      window.setTimeout(() => {
        setIntroStep(3);
        setMirrorTyping(true);
      }, 1800),
      window.setTimeout(() => {
        setMirrorTyping(false);
        setPromptVisible(true);
        setComposerReady(true);
        setIntroReady(true);
      }, 2500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [introReady]);

  /* ── Focus ── */
  useEffect(() => {
    if (!composerReady || mirrorTyping || !promptVisible) return;
    const t = window.setTimeout(() => activeInputRef.current?.focus(), 80);
    return () => clearTimeout(t);
  }, [displayIndex, editingIndex, composerReady, mirrorTyping, promptVisible]);

  /* ── Auto-scroll ── */
  useEffect(() => {
    const el = liveRef.current;
    const chat = chatRef.current;
    if (!el || !chat) return;
    const top = el.offsetTop - chat.clientHeight + el.offsetHeight + 24;
    // Instant scroll: smooth scrolling stacks with typing delay and feels laggy.
    chat.scrollTo({ top: Math.max(0, top), behavior: "auto" });
  }, [
    displayIndex,
    historyBeats.length,
    promptVisible,
    mirrorTyping,
    introStep,
    beatError,
    finale,
  ]);

  /* ── Esc cancels edit ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && editingIndex !== null) {
        setEditingIndex(null);
        setBeatError(null);
        setPromptVisible(true);
        setComposerReady(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [editingIndex]);

  /* ── Jump to first server-side error ── */
  useEffect(() => {
    const order: Array<{ beat: BeatId; key: keyof JoinFormFields }> = [
      { beat: "name", key: "firstName" },
      { beat: "country", key: "country" },
      { beat: "whatsapp", key: "whatsapp" },
      { beat: "email", key: "email" },
      { beat: "dob", key: "dob" },
      { beat: "context", key: "context" },
      { beat: "terms", key: "termsAccepted" },
    ];
    const hit = order.find(({ key }) => errors[key]);
    if (!hit) return;
    const idx = IDX[hit.beat];
    setEditingIndex(null);
    setActiveIndex(idx);
    setFurthest((f) => Math.max(f, idx));
    setPromptVisible(true);
    setComposerReady(true);
    setMirrorTyping(false);
  }, [errors]);

  /* ── Beat funnel analytics ── */
  useEffect(() => {
    if (!promptVisible || mirrorTyping || finale) return;
    if (lastBeatRef.current === activeBeat) return;
    lastBeatRef.current = activeBeat;
    trackJoinBeat({
      beat: activeBeat,
      action: "reached",
      index: displayIndex,
    });
  }, [activeBeat, displayIndex, promptVisible, mirrorTyping, finale]);

  /* ── Shake on validation error ── */
  useEffect(() => {
    if (beatError && !reduce) {
      shake.start({
        x: [0, -7, 7, -5, 5, -2, 0],
        transition: { duration: 0.38 },
      });
    }
  }, [beatError, reduce, shake]);

  /* ── If submit fails, leave finale ── */
  useEffect(() => {
    if (submitError) setFinale(false);
  }, [submitError]);

  useEffect(
    () => () => {
      if (revealTimer.current) window.clearTimeout(revealTimer.current);
    },
    [],
  );

  /* ── Phone tilt (desktop pointer only) ── */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), {
    stiffness: 120,
    damping: 18,
  });
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), {
    stiffness: 120,
    damping: 18,
  });
  useEffect(() => {
    if (reduce) return;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [mx, my, reduce]);

  /* ────────────── logic ────────────── */
  const validateBeat = (beat: BeatId): string | null => {
    const d = dataRef.current;
    switch (beat) {
      case "name":
        if (!d.firstName.trim()) return "Just your name is enough.";
        if (d.firstName.trim().length > 100) return "A shorter name works better.";
        return null;
      case "email": {
        const email = d.email.trim();
        if (!email) return "I'll need an email to keep the door open.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
          return "That email doesn't look quite right.";
        return null;
      }
      case "country":
        if (!d.country.trim()) return "Where should I find you?";
        return null;
      case "whatsapp":
        if (!d.countryCode.trim()) return "Pick a country code first.";
        if (!d.whatsapp.trim()) return "Drop your number when you're ready.";
        if (!/^[0-9\s\-()]+$/.test(d.whatsapp.trim()))
          return "Digits only. No country code in this box.";
        return null;
      case "dob":
        if (!d.dob.trim()) return "Year, month, and day when you're ready.";
        return null;
      case "context":
        if ((d.context?.length ?? 0) > 500)
          return "Keep it under 500 characters. We can go deeper later.";
        return null;
      case "terms":
        if (!d.termsAccepted) return "Tick the box and we're good to go.";
        return null;
    }
  };

  const revealNext = (nextIndex: number, extra = 0) => {
    if (revealTimer.current) window.clearTimeout(revealTimer.current);
    setComposerReady(false);
    setPromptVisible(false);
    setMirrorTyping(true);
    setBeatError(null);
    const nextPrompt = promptFor(
      BEAT_ORDER[nextIndex],
      dataRef.current.firstName.trim(),
    );
    const delay = typingMs(nextPrompt, extra, !!reduce);
    const finish = () => {
      setActiveIndex(nextIndex);
      setFurthest((f) => Math.max(f, nextIndex));
      setEditingIndex(null);
      setMirrorTyping(false);
      setPromptVisible(true);
      setComposerReady(true);
      advancingRef.current = false;
    };
    if (delay <= 0) {
      finish();
      return;
    }
    revealTimer.current = window.setTimeout(finish, delay);
  };

  const advanceFrom = (index: number) => {
    if (advancingRef.current || mirrorTyping) return;
    const beat = BEAT_ORDER[index];
    const err = validateBeat(beat);
    if (err) {
      setBeatError(err);
      return;
    }
    setBeatError(null);
    advancingRef.current = true;
    trackJoinBeat({ beat, action: "completed", index });

    // Tiny pause when a reaction bubble will land: not a full "thinking" beat.
    const hasReaction = Boolean(
      reactionFor(beat, dataRef.current, contextSkipped),
    );
    const extra = hasReaction ? 90 : 0;

    if (editingIndex !== null) {
      const next = Math.min(
        Math.max(furthest, editingIndex + 1),
        BEAT_ORDER.length - 1,
      );
      revealNext(next, extra);
      return;
    }

    if (index >= BEAT_ORDER.length - 1) {
      // Finale: celebrate, then hand off.
      setFinale(true);
      try {
        navigator.vibrate?.(30);
      } catch {
        /* noop */
      }
      window.setTimeout(
        () => {
          advancingRef.current = false;
          onSubmit();
        },
        reduce ? 80 : 520,
      );
      return;
    }
    revealNext(index + 1, extra);
  };
  advanceRef.current = advanceFrom;

  const skipContext = () => {
    if (advancingRef.current || mirrorTyping) return;
    setContextSkipped(true);
    setBeatError(null);
    advancingRef.current = true;
    trackJoinBeat({ beat: "context", action: "completed", index: IDX.context });
    revealNext(IDX.country, 40);
  };

  const pickMood = (label: string) => {
    if (advancingRef.current || mirrorTyping) return;
    setContextSkipped(false);
    onChange("context", label);
    window.setTimeout(() => advanceRef.current(IDX.context), 40);
  };

  const pickGuess = () => {
    if (!guess || advancingRef.current || mirrorTyping) return;
    onChange("country", guess.country);
    onChange("countryCode", guess.code);
    window.setTimeout(() => advanceRef.current(IDX.country), 40);
  };

  const onEnterAdvance = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter") return;
    if (activeBeat === "context" && e.shiftKey) return;
    if (activeBeat === "terms" || activeBeat === "country" || activeBeat === "dob")
      return;
    e.preventDefault();
    if (activeBeat === "context")
      setContextSkipped(!formData.context?.trim());
    advanceFrom(displayIndex);
  };

  const startEdit = (beat: BeatId) => {
    if (mirrorTyping || finale) return;
    const idx = IDX[beat];
    if (revealTimer.current) window.clearTimeout(revealTimer.current);
    advancingRef.current = false;
    setEditingIndex(idx);
    setBeatError(null);
    setMirrorTyping(false);
    setPromptVisible(true);
    setComposerReady(true);
  };

  const fieldError =
    beatError ||
    (activeBeat === "name" && errors.firstName) ||
    (activeBeat === "email" && errors.email) ||
    (activeBeat === "country" && (errors.country || errors.countryCode)) ||
    (activeBeat === "whatsapp" && (errors.whatsapp || errors.countryCode)) ||
    (activeBeat === "dob" && errors.dob) ||
    (activeBeat === "context" && errors.context) ||
    (activeBeat === "terms" && errors.termsAccepted) ||
    null;

  const canSubmit =
    formData.termsAccepted &&
    isBeatFilled("name", formData) &&
    isBeatFilled("email", formData) &&
    isBeatFilled("country", formData) &&
    isBeatFilled("whatsapp", formData) &&
    isBeatFilled("dob", formData);

  const sendEnabled =
    composerReady &&
    !mirrorTyping &&
    promptVisible &&
    canSendBeat(activeBeat, formData);

  const handleSend = () => {
    if (!sendEnabled && activeBeat !== "context") return;
    if (activeBeat === "context") setContextSkipped(!formData.context?.trim());
    advanceFrom(displayIndex);
  };

  const handleCountryChange = (value: string) => {
    onChange("country", value);
    setBeatError(null);
    window.setTimeout(() => {
      if (!value.trim()) return;
      advanceRef.current(IDX.country);
    }, 40);
  };

  const handleDobChange = (value: string) => {
    onChange("dob", value);
    setBeatError(null);
    if (value.trim().length >= 8) {
      window.setTimeout(() => advanceRef.current(IDX.dob), 60);
    }
  };

  const showMoodChips =
    promptVisible &&
    !mirrorTyping &&
    activeBeat === "context" &&
    !formData.context?.trim();
  const showGuessChips =
    promptVisible &&
    !mirrorTyping &&
    activeBeat === "country" &&
    guess &&
    !guessDismissed &&
    !formData.country.trim();

  /* ────────────── render ────────────── */
  return (
    <div className="flex w-full flex-col items-center">
      <header className="mb-6 max-w-sm text-center">
        <h1 className="font-serif text-3xl font-medium tracking-tight text-[#1C1A16] sm:text-[2.1rem]">
          {quizFromNav ? "Your quiz is ready" : "GenMyō"}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-[#5C564C]">
          {quizFromNav
            ? "Join The Mirror on WhatsApp. Quiet guided reflection, no new app."
            : "Inner wellness on WhatsApp. Meet The Mirror: a quiet guided reflection, about two minutes."}
        </p>
        <p className="mt-3 text-xs leading-relaxed text-[#847362]">
          Privacy by default.{" "}
          <Link
            to="/faq#privacy"
            className="underline underline-offset-2 hover:text-[#B0703E]"
          >
            Learn more
          </Link>
          . Teams:{" "}
          <Link
            to="/for-business"
            className="underline underline-offset-2 hover:text-[#B0703E]"
          >
            enquire here
          </Link>
          .
        </p>
      </header>

      {/* entrance + idle float */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 48, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 16, delay: 0.1 }}
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* pointer tilt */}
          <motion.div
            style={
              reduce
                ? undefined
                : { rotateX: rotX, rotateY: rotY, transformPerspective: 1000 }
            }
            className="relative h-[min(82vh,780px)] min-h-[640px] w-[min(100vw-32px,340px)] rounded-[48px] bg-[#0a0a0a] p-[9px] shadow-[0_0_0_2px_#1f1f1f,0_28px_56px_-18px_rgba(0,0,0,0.55)]"
            role="region"
            aria-label="Join The Mirror on WhatsApp"
          >
            {/* ambient glow behind the phone */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -inset-6 -z-10 rounded-[64px] bg-[radial-gradient(closest-side,rgba(201,147,104,0.28),transparent)] blur-2xl"
              animate={
                reduce
                  ? undefined
                  : {
                      opacity: mirrorTyping ? [0.5, 1, 0.5] : [0.35, 0.6, 0.35],
                    }
              }
              transition={{
                duration: mirrorTyping ? 1.1 : 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <span
              aria-hidden
              className="absolute -left-[2px] top-[100px] h-7 w-[3px] rounded-sm bg-[#1a1a1a] shadow-[0_48px_0_#1a1a1a,0_96px_0_#1a1a1a]"
            />
            <span
              aria-hidden
              className="absolute -right-[2px] top-[140px] h-[54px] w-[3px] rounded-sm bg-[#1a1a1a]"
            />

            <div className="relative flex h-full flex-col overflow-hidden rounded-[40px] bg-[#0B0B0D]">
              {/* status bar */}
              <div className="relative z-[2] flex h-10 shrink-0 items-center justify-between bg-black px-6 pt-3 text-xs font-semibold text-white">
                <span>{nowLabel()}</span>
                <span
                  aria-hidden
                  className="absolute left-1/2 top-[7px] h-[26px] w-[92px] -translate-x-1/2 rounded-2xl bg-black"
                />
                <span className="opacity-80" aria-hidden>
                  ●●●
                </span>
              </div>

              {/* header */}
              <div className="relative flex shrink-0 items-center gap-2.5 bg-black px-3 pb-2.5 pt-1.5 text-white">
                <span aria-hidden className="text-xl leading-none">
                  ‹
                </span>
                <MirrorAvatar typing={mirrorTyping} progress={progress} reduce={!!reduce} />
                <div className="min-w-0 flex-1 leading-tight">
                  <div className="truncate text-sm font-semibold tracking-tight">
                    The Mirror
                  </div>
                  <div className="text-[11px] text-white/85">
                    <motion.span
                      className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-[#25D366] align-middle"
                      aria-hidden
                      animate={
                        reduce
                          ? undefined
                          : { scale: [1, 1.5, 1], opacity: [1, 0.55, 1] }
                      }
                      transition={{ duration: 1.8, repeat: Infinity }}
                    />
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={mirrorTyping ? "t" : "o"}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }}
                        className="inline-block"
                      >
                        {mirrorTyping ? "typing…" : "online"}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>
                {/* progress bar */}
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white/5">
                  <motion.div
                    className="h-full origin-left bg-gradient-to-r from-[#B5703A] via-[#C99368] to-[#C2A053]"
                    initial={false}
                    animate={{ scaleX: progress }}
                    transition={{ type: "spring", stiffness: 90, damping: 18 }}
                  />
                </div>
              </div>

              {/* chat */}
              <div
                className="relative min-h-0 flex-1"
                style={{
                  backgroundColor: "#0B0B0D",
                  backgroundImage:
                    "radial-gradient(rgba(200,147,104,0.05) 1px, transparent 1px), radial-gradient(rgba(200,147,104,0.035) 1px, transparent 1px)",
                  backgroundSize: "22px 22px, 36px 36px",
                  backgroundPosition: "0 0, 11px 11px",
                }}
              >
                {!reduce && <Motes />}
                <div
                  ref={chatRef}
                  className="relative flex h-full flex-col gap-2 overflow-y-auto px-2.5 pb-3 pt-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                  aria-live="polite"
                >
                  {introStep >= 1 && (
                    <MirrorBubble>
                      {quizFromNav
                        ? "Welcome back to your private space. Your quiz is ready."
                        : "Welcome to your private space."}
                    </MirrorBubble>
                  )}
                  {introStep >= 2 && (
                    <MirrorBubble>You can call me The Mirror.</MirrorBubble>
                  )}

                  {historyBeats.map((beat) => {
                    const text = summaryFor(beat, formData);
                    if (!text && beat !== "context") return null;
                    const reaction = reactionFor(beat, formData, contextSkipped);
                    return (
                      <div key={`hist-${beat}`} className="contents">
                        <MirrorBubble>
                          {promptFor(beat, formData.firstName.trim())}
                        </MirrorBubble>
                        <UserBubble onEdit={() => startEdit(beat)}>
                          {text || "Skipped"}
                        </UserBubble>
                        {reaction && <MirrorBubble>{reaction}</MirrorBubble>}
                      </div>
                    );
                  })}

                  <div ref={liveRef} className="flex flex-col gap-2">
                    <AnimatePresence>
                      {mirrorTyping && <TypingBubble key="typing" />}
                    </AnimatePresence>

                    {promptVisible && !mirrorTyping && (
                      <MirrorBubble key={`active-q-${activeBeat}`}>
                        {promptFor(activeBeat, formData.firstName.trim())}
                      </MirrorBubble>
                    )}

                    {showMoodChips && (
                      <QuickReplies
                        label="How are you arriving"
                        options={MOODS.map((m) => ({ key: m.label, label: m.label }))}
                        onPick={pickMood}
                      />
                    )}

                    {showGuessChips && guess && (
                      <QuickReplies
                        label="Confirm your country"
                        options={[
                          { key: "yes", label: `Yes, ${guess.country} ${guess.flag}` },
                          { key: "no", label: "Somewhere else" },
                        ]}
                        onPick={(k) =>
                          k === "yes" ? pickGuess() : setGuessDismissed(true)
                        }
                      />
                    )}

                    {promptVisible && !mirrorTyping && activeBeat === "terms" && (
                      <MirrorCard>
                        <div className="flex items-start gap-2.5">
                          <Checkbox
                            id="join-terms"
                            checked={formData.termsAccepted}
                            onCheckedChange={(checked) => {
                              onChange("termsAccepted", checked === true);
                              setBeatError(null);
                              if (checked === true)
                                try {
                                  navigator.vibrate?.(10);
                                } catch {
                                  /* noop */
                                }
                            }}
                            aria-invalid={fieldError ? "true" : "false"}
                            className={
                              fieldError
                                ? "mt-0.5 border-destructive"
                                : "mt-0.5 border-[#C99368]/50 data-[state=checked]:border-[#C99368] data-[state=checked]:bg-[#C99368]"
                            }
                          />
                          <Label
                            htmlFor="join-terms"
                            className="cursor-pointer text-[12.5px] font-normal leading-relaxed text-[#ECE5DD]"
                          >
                            I agree to the{" "}
                            <Link
                              to="/terms"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#C99368] underline underline-offset-2"
                            >
                              Terms
                            </Link>{" "}
                            and{" "}
                            <Link
                              to="/privacy"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#C99368] underline underline-offset-2"
                            >
                              Privacy Policy
                            </Link>
                            .
                          </Label>
                        </div>
                        {alreadyRegistered && (
                          <div className="mt-3 space-y-2 border-t border-white/10 pt-3">
                            <p className="text-xs text-[#ECE5DD]/90">
                              This number is already registered.
                            </p>
                            <a
                              href={getWhatsAppUrl()}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => trackWhatsappRedirect("button")}
                              className="inline-flex w-full items-center justify-center rounded-full bg-[#C2A053] px-4 py-2.5 text-[13px] font-semibold text-[#1C1A16]"
                            >
                              Open WhatsApp →
                            </a>
                          </div>
                        )}
                        {submitError && (
                          <p className="mt-2 text-xs text-red-300" role="alert">
                            {submitError}
                          </p>
                        )}
                      </MirrorCard>
                    )}

                    {fieldError && promptVisible && !mirrorTyping && (
                      <MirrorBubble tone="soft" key={String(fieldError)}>
                        {fieldError}
                      </MirrorBubble>
                    )}

                    {finale && (
                      <MirrorBubble key="finale">
                        Great. We're all set
                        {formData.firstName.trim()
                          ? `, ${formData.firstName.trim()}`
                          : ""}
                        . Opening WhatsApp…
                      </MirrorBubble>
                    )}
                  </div>
                </div>
              </div>

              {/* composer */}
              <motion.div
                animate={shake}
                className={`relative shrink-0 space-y-2 bg-black px-2 pb-5 pt-2 transition-opacity duration-300 ${
                  composerReady && !mirrorTyping
                    ? "opacity-100"
                    : "pointer-events-none opacity-40"
                }`}
                onKeyDown={onEnterAdvance}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {activeBeat !== "terms" ? (
                    <motion.div
                      key={`composer-${activeBeat}`}
                      initial={reduce ? false : { opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-end gap-1.5"
                    >
                      <div className="min-w-0 flex-1 space-y-1.5">
                        {activeBeat === "name" && (
                          <ComposerInput
                            ref={activeInputRef as React.RefObject<HTMLInputElement>}
                            id="join-name"
                            placeholder={placeholderFor("name")}
                            autoComplete="given-name"
                            value={formData.firstName}
                            onChange={(v) => {
                              onChange("firstName", v);
                              setBeatError(null);
                            }}
                            onFocus={() => onFieldFocus("firstName")}
                            invalid={!!fieldError}
                          />
                        )}
                        {activeBeat === "email" && (
                          <ComposerInput
                            ref={activeInputRef as React.RefObject<HTMLInputElement>}
                            id="join-email"
                            type="email"
                            placeholder={placeholderFor("email")}
                            autoComplete="email"
                            value={formData.email}
                            onChange={(v) => {
                              onChange("email", v);
                              setBeatError(null);
                            }}
                            onFocus={() => onFieldFocus("email")}
                            invalid={!!fieldError}
                          />
                        )}
                        {activeBeat === "country" && (
                          <div
                            className="rounded-[22px] bg-[#1C1C1F] px-1 py-1"
                            onFocusCapture={() => onFieldFocus("country")}
                          >
                            <CountryNameCombobox
                              countries={countries}
                              value={formData.country}
                              onChange={handleCountryChange}
                              placeholder="Search where you're based…"
                            />
                          </div>
                        )}
                        {activeBeat === "whatsapp" && (
                          <div
                            className="flex gap-1.5"
                            onFocusCapture={() => onFieldFocus("whatsapp")}
                          >
                            <div className="w-[7.25rem] shrink-0 rounded-[22px] bg-[#1C1C1F]">
                              <CountryCodeCombobox
                                countries={countries}
                                value={formData.countryCode}
                                onChange={(value) => {
                                  onChange("countryCode", value);
                                  setBeatError(null);
                                }}
                                placeholder="Code"
                                ariaLabel="Country code"
                                hasError={!!errors.countryCode}
                              />
                            </div>
                            <ComposerInput
                              ref={activeInputRef as React.RefObject<HTMLInputElement>}
                              id="join-whatsapp"
                              placeholder={placeholderFor("whatsapp")}
                              inputMode="tel"
                              autoComplete="tel-national"
                              value={formData.whatsapp}
                              onChange={(v) => {
                                onChange("whatsapp", v);
                                setBeatError(null);
                              }}
                              onFocus={() => onFieldFocus("whatsapp")}
                              invalid={!!fieldError}
                              className="flex-1"
                            />
                          </div>
                        )}
                        {activeBeat === "dob" && (
                          <div
                            className="rounded-[16px] bg-[#1C1C1F] p-2"
                            onFocusCapture={() => onFieldFocus("dob")}
                          >
                            <DateOfBirthPicker
                              value={formData.dob}
                              onChange={handleDobChange}
                              hasError={!!errors.dob}
                              id="join-dob"
                            />
                            <p className="mt-1.5 px-1 text-[10px] text-[#9C9285]">
                              Continues automatically when complete
                            </p>
                          </div>
                        )}
                        {activeBeat === "context" && (
                          <>
                            <Textarea
                              ref={activeInputRef as React.RefObject<HTMLTextAreaElement>}
                              id="join-context"
                              placeholder={placeholderFor("context")}
                              value={formData.context || ""}
                              onChange={(e) => {
                                setContextSkipped(false);
                                onChange("context", e.target.value);
                                setBeatError(null);
                              }}
                              onFocus={() => onFieldFocus("context")}
                              rows={2}
                              className="min-h-[64px] resize-none rounded-[18px] border-0 bg-[#1C1C1F] text-[13.5px] text-[#ECE5DD] placeholder:text-[#6E6A63] focus-visible:ring-[#C99368]/40"
                            />
                            <p className="px-1 text-[10px] leading-snug text-[#9C9285]">
                              In crisis?{" "}
                              <Link to="/crisis" className="text-[#C99368] underline">
                                Helplines
                              </Link>
                            </p>
                          </>
                        )}
                      </div>

                      <div className="flex shrink-0 flex-col items-center gap-1 pb-0.5">
                        {activeBeat === "context" && (
                          <button
                            type="button"
                            onClick={skipContext}
                            className="text-[11px] text-[#9C9285] underline underline-offset-2 hover:text-[#C99368]"
                          >
                            Skip
                          </button>
                        )}
                        <motion.button
                          type="button"
                          onClick={handleSend}
                          disabled={!sendEnabled && activeBeat !== "context"}
                          aria-label="Send"
                          whileTap={{ scale: 0.86 }}
                          animate={
                            sendEnabled && !reduce
                              ? {
                                  boxShadow: [
                                    "0 0 0 0 rgba(201,147,104,0.55)",
                                    "0 0 0 11px rgba(201,147,104,0)",
                                  ],
                                  scale: 1,
                                }
                              : { boxShadow: "0 0 0 0 rgba(201,147,104,0)", scale: 1 }
                          }
                          transition={
                            sendEnabled && !reduce
                              ? { duration: 1.5, repeat: Infinity, ease: "easeOut" }
                              : { duration: 0.2 }
                          }
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#111] disabled:opacity-35"
                        >
                          <motion.svg
                            viewBox="0 0 24 24"
                            width="18"
                            height="18"
                            fill="none"
                            aria-hidden
                            animate={
                              sendEnabled && !reduce ? { x: [0, 1.5, 0] } : { x: 0 }
                            }
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <path
                              d="M3.4 20.6 21 12 3.4 3.4 3.4 10l11 2-11 2z"
                              fill="currentColor"
                            />
                          </motion.svg>
                        </motion.button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="composer-terms"
                      className="relative"
                      initial={reduce ? false : { opacity: 0, y: 14, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={SPRING}
                    >
                      <motion.div
                        whileTap={{ scale: 0.97 }}
                        animate={
                          canSubmit && !reduce && !finale
                            ? { scale: [1, 1.025, 1] }
                            : { scale: 1 }
                        }
                        transition={
                          canSubmit && !reduce && !finale
                            ? { duration: 1.6, repeat: Infinity }
                            : { duration: 0.2 }
                        }
                      >
                        <Button
                          type="button"
                          disabled={isSubmitting || !canSubmit || mirrorTyping || finale}
                          onClick={() => advanceFrom(displayIndex)}
                          className="relative h-11 w-full overflow-hidden rounded-full bg-[#C2A053] text-[13px] font-semibold text-[#1C1A16] hover:opacity-90 disabled:opacity-45"
                        >
                          {canSubmit && !reduce && !finale && (
                            <motion.span
                              aria-hidden
                              className="absolute inset-y-0 w-10 -skew-x-12 bg-white/45"
                              animate={{ x: ["-200%", "900%"] }}
                              transition={{
                                duration: 1.4,
                                repeat: Infinity,
                                repeatDelay: 1.4,
                                ease: "easeInOut",
                              }}
                            />
                          )}
                          <span className="relative">
                            {finale
                              ? "We're all set…"
                              : isSubmitting
                                ? "Saving…"
                                : "Start on WhatsApp →"}
                          </span>
                        </Button>
                      </motion.div>
                      {finale && !reduce && <Burst />}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* finale ripple */}
              {finale && !reduce && (
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute bottom-8 left-1/2 z-[8] h-10 w-10 -translate-x-1/2 rounded-full bg-[#C99368]"
                  initial={{ scale: 0, opacity: 0.4 }}
                  animate={{ scale: 34, opacity: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              )}

              <div
                aria-hidden
                className="pointer-events-none absolute bottom-1.5 left-1/2 h-1 w-[110px] -translate-x-1/2 rounded-full bg-white/35"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <JoinHowItWorks />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Chat avatar: gold GenMyō orb + progress ring; soft pulse while typing.
──────────────────────────────────────────────────────────── */
function MirrorAvatar({
  typing,
  progress,
  reduce,
}: {
  typing: boolean;
  progress: number;
  reduce: boolean;
}) {
  const R = 20;
  return (
    <div className="relative h-11 w-11 shrink-0">
      <svg
        className="absolute inset-0 -rotate-90"
        viewBox="0 0 44 44"
        aria-hidden
      >
        <circle cx="22" cy="22" r={R} stroke="rgba(255,255,255,0.08)" strokeWidth="2" fill="none" />
        <motion.circle
          cx="22"
          cy="22"
          r={R}
          stroke="#C99368"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={false}
          animate={{ pathLength: Math.max(0.04, progress) }}
          transition={{ type: "spring", stiffness: 80, damping: 16 }}
        />
      </svg>
      <motion.div
        className="absolute inset-[4px] flex items-center justify-center overflow-hidden rounded-full bg-[#1A1814] shadow-[inset_0_0_0_1px_rgba(201,147,104,0.25)]"
        animate={
          reduce
            ? undefined
            : typing
              ? {
                  scale: [1, 1.06, 1],
                  boxShadow: [
                    "0 0 0 0 rgba(201,147,104,0.45)",
                    "0 0 0 7px rgba(201,147,104,0)",
                    "0 0 0 0 rgba(201,147,104,0)",
                  ],
                }
              : { scale: [1, 1.03, 1] }
        }
        transition={{
          duration: typing ? 0.9 : 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <img
          src="/genmyo-orb-gold.png"
          alt=""
          width={28}
          height={28}
          className="h-[72%] w-[72%] object-contain"
          draggable={false}
        />
      </motion.div>
    </div>
  );
}

/* Slow drifting clay motes behind the chat. */
function Motes() {
  const motes = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => ({
        left: `${(i * 37 + 8) % 92}%`,
        size: 2 + (i % 3),
        dur: 9 + (i % 5) * 2.2,
        delay: i * 0.9,
      })),
    [],
  );
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {motes.map((m, i) => (
        <motion.span
          key={i}
          className="absolute bottom-[-10px] rounded-full bg-[#C99368]"
          style={{ left: m.left, width: m.size, height: m.size }}
          animate={{
            y: [0, -680],
            x: [0, i % 2 ? 18 : -18, 0],
            opacity: [0, 0.35, 0],
          }}
          transition={{
            duration: m.dur,
            delay: m.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

/* Confetti-style burst from the final button. */
function Burst() {
  const parts = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        a: (i / 26) * Math.PI * 2 + (i % 3) * 0.2,
        d: 70 + ((i * 29) % 70),
        s: 4 + (i % 4),
        c: ["#C99368", "#C2A053", "#F6ECDD"][i % 3],
        delay: (i % 5) * 0.015,
      })),
    [],
  );
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {parts.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{ width: p.s, height: p.s, background: p.c }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos(p.a) * p.d,
            y: Math.sin(p.a) * p.d - 14,
            opacity: 0,
            scale: 0.3,
          }}
          transition={{ duration: 0.95, ease: "easeOut", delay: p.delay }}
        />
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Bubbles
──────────────────────────────────────────────────────────── */
function TypingBubble() {
  return (
    <motion.div
      className="flex max-w-[84%] origin-bottom-left self-start"
      initial={{ opacity: 0, scale: 0.85, y: 4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.08 } }}
      transition={SPRING_SNAP}
    >
      <div className="flex items-center gap-1.5 rounded-lg rounded-tl-sm bg-[#1C1C1F] px-3.5 py-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.35)]">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-[#C99368]"
            animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

function MirrorBubble({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "soft";
}) {
  const [time] = useState(nowLabel);
  return (
    <motion.div
      className="flex max-w-[84%] origin-bottom-left flex-col items-start self-start"
      initial={{ opacity: 0, y: 6, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={SPRING_SNAP}
    >
      <div
        className={`rounded-lg rounded-tl-sm px-2.5 py-2 text-[13.5px] leading-snug shadow-[0_1px_2px_rgba(0,0,0,0.35)] ${
          tone === "soft"
            ? "bg-[#2A221C] text-[#E8D5C4]"
            : "bg-[#1C1C1F] text-[#ECE5DD]"
        }`}
      >
        {children}
      </div>
      <span className="mt-0.5 px-1.5 text-[10px] text-[#ECE5DD]/40">{time}</span>
    </motion.div>
  );
}

function MirrorCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="mb-1 max-w-[92%] origin-bottom-left self-start rounded-lg rounded-tl-sm bg-[#1C1C1F] p-3 text-[13px] leading-relaxed text-[#ECE5DD] shadow-[0_1px_2px_rgba(0,0,0,0.35)]"
      initial={{ opacity: 0, y: 6, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ ...SPRING_SNAP, delay: 0.04 }}
    >
      {children}
    </motion.div>
  );
}

function Ticks({ read }: { read: boolean }) {
  return (
    <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden>
      <motion.path
        d="M1 5.5 4 8.5 10 1.5"
        stroke={read ? "#C99368" : "rgba(236,229,221,0.45)"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.25 }}
      />
      <motion.path
        d="M6 8.5 12 1.5"
        stroke="#C99368"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={read ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.25 }}
      />
    </svg>
  );
}

function UserBubble({
  children,
  onEdit,
}: {
  children: React.ReactNode;
  onEdit: () => void;
}) {
  const [time] = useState(nowLabel);
  const [read, setRead] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setRead(true), 180);
    return () => clearTimeout(t);
  }, []);
  return (
    <motion.div
      className="flex max-w-[84%] origin-bottom-right flex-col items-end self-end"
      initial={{ opacity: 0, x: 10, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={SPRING_SNAP}
    >
      <motion.button
        type="button"
        onClick={onEdit}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
        className="rounded-lg rounded-tr-sm px-2.5 py-2 text-left text-[13.5px] leading-snug text-[#F6ECDD] shadow-[0_1px_2px_rgba(0,0,0,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C99368]/50"
        style={{ background: "linear-gradient(160deg, #5A421F 0%, #43301A 100%)" }}
        title="Tap to edit"
        aria-label="Edit this answer"
      >
        {children}
      </motion.button>
      <span className="mt-0.5 flex items-center gap-1 px-1.5 text-[10px] text-[#ECE5DD]/40">
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M4 20h4L19 9l-4-4L4 16v4zM14 6l4 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
        {time}
        <Ticks read={read} />
      </span>
    </motion.div>
  );
}

/* Quick-reply chips with staggered spring-in. */
function QuickReplies({
  options,
  onPick,
  label,
}: {
  options: { key: string; label: string }[];
  onPick: (key: string) => void;
  label: string;
}) {
  return (
    <motion.div
      role="group"
      aria-label={label}
      className="mt-1 flex max-w-full flex-wrap justify-end gap-1.5 self-end"
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.04, delayChildren: 0.04 } } }}
    >
      {options.map((o) => (
        <motion.button
          key={o.key}
          type="button"
          onClick={() => onPick(o.key)}
          variants={{
            hidden: { opacity: 0, y: 14, scale: 0.7 },
            show: { opacity: 1, y: 0, scale: 1, transition: SPRING },
          }}
          whileHover={{ scale: 1.06, backgroundColor: "rgba(90,66,31,0.85)" }}
          whileTap={{ scale: 0.92 }}
          className="rounded-[18px] border border-[#C99368]/45 bg-[#1C1C1F]/90 px-3 py-2 text-[12.5px] font-medium text-[#F6ECDD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C99368]/60"
        >
          {o.label}
        </motion.button>
      ))}
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────
   Input
──────────────────────────────────────────────────────────── */
const ComposerInput = React.forwardRef<
  HTMLInputElement,
  {
    id: string;
    value: string;
    onChange: (v: string) => void;
    onFocus?: () => void;
    placeholder?: string;
    type?: string;
    autoComplete?: string;
    inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
    invalid?: boolean;
    className?: string;
  }
>(function ComposerInput(
  {
    id,
    value,
    onChange,
    onFocus,
    placeholder,
    type = "text",
    autoComplete,
    inputMode,
    invalid,
    className = "",
  },
  ref,
) {
  return (
    <Input
      ref={ref}
      id={id}
      type={type}
      placeholder={placeholder}
      autoComplete={autoComplete}
      inputMode={inputMode}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={onFocus}
      aria-invalid={invalid ? "true" : "false"}
      className={`h-10 rounded-[22px] border-0 bg-[#1C1C1F] text-[13.5px] text-[#ECE5DD] placeholder:text-[#6E6A63] focus-visible:ring-[#C99368]/40 ${
        invalid ? "ring-1 ring-red-400/70" : ""
      } ${className}`}
    />
  );
});
