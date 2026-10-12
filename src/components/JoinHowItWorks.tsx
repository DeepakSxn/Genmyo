import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const STEPS = [
  {
    n: 1,
    short: "Hello",
    title: "Send hello",
    body: "Finish here, open WhatsApp, and send hello. The Mirror answers and starts the conversation with a few ways in: how your day has been, a question on inner wellness, or something that has been bothering you. Any of them helps build your profile.",
  },
  {
    n: 2,
    short: "Day",
    title: "Talk about your day",
    body: "Pick a way in, or just talk. A few honest lines about your day is enough. No surveys, no streaks. Reply in two minutes or two days. The session waits for you.",
  },
  {
    n: 3,
    short: "Continue",
    title: "Start on WhatsApp, or continue",
    body: "When you want the real chat, get started on WhatsApp. Or stay and continue. Same private space either way. No new app.",
  },
  {
    n: 4,
    short: "Create",
    title: "The Mirror creates for you",
    body: "What you share becomes the picture. Then The Mirror creates prompts and practices shaped around your story.",
  },
] as const;

type Line = { who: "mirror" | "you"; text: string };

const SAMPLE: Line[] = [
  { who: "you", text: "Hello" },
  {
    who: "mirror",
    text: "Hello. I'll start the conversation. How's your day been, a question on inner wellness, or something that's been bothering you?",
  },
  { who: "you", text: "How's your day been" },
  {
    who: "mirror",
    text: "Tell me one thing from today that stayed with you. Even a small one helps me learn you.",
  },
  {
    who: "you",
    text: "It was loud. I never quite switched off.",
  },
  {
    who: "mirror",
    text: "We can get started on WhatsApp, or continue here. I'll create something shaped around what you just said.",
  },
];

/**
 * Interactive how-it-works strip for /join — steps + tap-through sample session.
 * Sits under the phone. The phone conversation itself is unchanged.
 */
export function JoinHowItWorks() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [revealed, setRevealed] = useState(1);

  const active = STEPS[step];
  const lines = SAMPLE.slice(0, revealed);
  const done = revealed >= SAMPLE.length;

  const advanceSample = () => {
    if (done) {
      setRevealed(1);
      return;
    }
    setRevealed((n) => Math.min(SAMPLE.length, n + 1));
  };

  return (
    <section
      aria-label="How The Mirror works"
      className="mt-10 w-full max-w-md border-t border-[#1C1A16]/10 pt-8"
    >
      <div className="text-center">
        <h2 className="font-serif text-xl font-medium tracking-tight text-[#1C1A16]">
          What happens next
        </h2>
        <p className="mt-1.5 text-sm leading-relaxed text-[#5C564C]">
          Same path as on WhatsApp. Tap through.
        </p>
      </div>

      {/* Step tabs */}
      <div
        role="tablist"
        aria-label="Reflection steps"
        className="mt-5 flex gap-1.5"
      >
        {STEPS.map((s, i) => {
          const on = i === step;
          return (
            <button
              key={s.n}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setStep(i)}
              className={`flex-1 rounded-full px-2 py-2 text-[12px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C2A053]/50 ${
                on
                  ? "bg-[#1C1A16] text-[#F6ECDD]"
                  : "bg-[#1C1A16]/05 text-[#5C564C] hover:bg-[#1C1A16]/10"
              }`}
            >
              <span className="mr-1 opacity-70">{s.n}</span>
              {s.short}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={active.n}
          role="tabpanel"
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="mt-4"
        >
          <h3 className="font-serif text-lg text-[#1C1A16]">{active.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-[#5C564C]">
            {active.body}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Tap-through sample */}
      <div className="mt-8">
        <div className="mb-3 flex items-baseline justify-between gap-3">
          <h3 className="font-serif text-lg text-[#1C1A16]">
            Inside a session
          </h3>
          <span className="text-[11px] text-[#847362]">
            {revealed}/{SAMPLE.length}
          </span>
        </div>

        <button
          type="button"
          onClick={advanceSample}
          aria-label={
            done ? "Replay sample reflection" : "Reveal next message"
          }
          className="w-full rounded-2xl bg-[#F4F0E7]/80 px-3 py-3 text-left transition-colors hover:bg-[#F4F0E7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C2A053]/50"
        >
          <div className="space-y-2.5">
            <AnimatePresence initial={false}>
              {lines.map((line, i) => (
                <motion.div
                  key={`${i}-${line.text.slice(0, 12)}`}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22 }}
                  className={`flex flex-col ${
                    line.who === "you" ? "items-end" : "items-start"
                  }`}
                >
                  <span className="mb-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#B0703E]/90">
                    {line.who === "you" ? "You" : "The Mirror"}
                  </span>
                  <span
                    className={`max-w-[88%] rounded-2xl px-3 py-2 text-[13px] leading-snug ${
                      line.who === "you"
                        ? "rounded-tr-sm bg-[#1C1A16] text-[#F6ECDD]"
                        : "rounded-tl-sm bg-white text-[#1C1A16] shadow-[0_1px_0_rgba(28,26,22,0.06)]"
                    }`}
                  >
                    {line.text}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <p className="mt-3 text-center text-[11px] font-medium text-[#B0703E]">
            {done ? "Tap to replay" : "Tap for the next message"}
          </p>
        </button>

        <p className="mt-2 text-center text-[10px] italic text-[#847362]">
          Illustrative exchange. Your chat stays private.
        </p>
      </div>

      {/* Control chips */}
      <ul className="mt-6 space-y-3 text-sm text-[#5C564C]">
        <li className="leading-relaxed">
          <span className="font-semibold text-[#1C1A16]">Your pace. </span>
          No reminders or streaks. Reply when you are ready.
        </li>
        <li className="leading-relaxed">
          <span className="font-semibold text-[#1C1A16]">Your control. </span>
          Reply{" "}
          <code className="rounded bg-[#F4F0E7] px-1.5 py-0.5 font-mono text-[11px] font-bold text-[#B0703E]">
            STOP
          </code>{" "}
          or{" "}
          <code className="rounded bg-[#F4F0E7] px-1.5 py-0.5 font-mono text-[11px] font-bold text-[#B0703E]">
            DELETE
          </code>{" "}
          anytime in WhatsApp.
        </li>
      </ul>

      <p className="mt-5 text-center text-xs text-[#847362]">
        <Link
          to="/how-it-works"
          className="underline underline-offset-2 hover:text-[#B0703E]"
        >
          Full walkthrough
        </Link>
        {" · "}
        <Link
          to="/crisis"
          className="underline underline-offset-2 hover:text-[#B0703E]"
        >
          Not a crisis service
        </Link>
      </p>
    </section>
  );
}
