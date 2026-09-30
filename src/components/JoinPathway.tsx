 type JoinStep = 1 | 2 | 3;

const STEPS: { id: JoinStep; label: string; upcomingHint: string }[] = [
  { id: 1, label: "Your details", upcomingHint: "Up next" },
  { id: 2, label: "Say Hi", upcomingHint: "To get started" },
  { id: 3, label: "Reflect", upcomingHint: "Then" },
];

interface JoinPathwayProps {
  currentStep?: JoinStep;
  className?: string;
}

/**
 * Top pathway for /join — wireframe step rail.
 */
export function JoinPathway({ currentStep = 1, className = "" }: JoinPathwayProps) {
  return (
    <nav aria-label="How joining works" className={`w-full ${className}`}>
      <ol className="flex items-center w-full">
        {STEPS.map((step, index) => {
          const done = step.id < currentStep;
          const active = step.id === currentStep;
          const upcoming = step.id > currentStep;
          const isLast = index === STEPS.length - 1;

          return (
            <li
              key={step.id}
              className={`flex items-center min-w-0 ${isLast ? "flex-none" : "flex-1"}`}
            >
              <div className="flex flex-col items-center text-center shrink-0 w-[5rem] sm:w-[7rem]">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                    done
                      ? "bg-[#C2A053] text-[#1C1A16]"
                      : active
                        ? "bg-[#1C1A16] text-[#F7F3EB]"
                        : "bg-transparent text-[#5C564C] border border-[#1C1A16]/20"
                  }`}
                  aria-current={active ? "step" : undefined}
                >
                  {done ? "✓" : step.id}
                </span>
                <span
                  className={`mt-2 text-[10px] sm:text-[11px] font-medium leading-tight ${
                    active ? "text-[#1C1A16]" : upcoming ? "text-[#5C564C]/80" : "text-[#1C1A16]/80"
                  }`}
                >
                  {step.label}
                </span>
                <span className="mt-0.5 hidden sm:block text-[9px] uppercase tracking-[0.14em] text-[#5C564C]/90">
                  {done
                    ? "Done"
                    : active
                      ? step.id === 2
                        ? "To get started"
                        : "You're here"
                      : step.id === currentStep + 1
                        ? step.upcomingHint
                        : "Then"}
                </span>
              </div>

              {!isLast && (
                <div
                  aria-hidden
                  className={`mx-1 sm:mx-2 h-px flex-1 min-w-[12px] ${
                    done ? "bg-[#C2A053]" : active ? "bg-[#C2A053]/50" : "bg-[#1C1A16]/12"
                  }`}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
