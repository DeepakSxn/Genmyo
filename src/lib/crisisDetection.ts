/**
 * Client-side safeguard for reflective text fields. Not a monitoring service;
 * surfaces helpline resources when language suggests acute distress.
 *
 * Design notes:
 * - Two severity tiers: HIGH (block submission, full-screen resources) and
 *   MEDIUM (non-blocking inline nudge — supportive, doesn't halt the flow).
 * - Word-boundary + context scoping on ambiguous terms (kill, plan, overdose)
 *   to cut false positives without losing recall on the phrasing that matters.
 * - Simple negation/third-person guard so "my friend was suicidal last year"
 *   or "I don't want to hurt myself" don't trip the same as a first-person,
 *   present-tense statement. This is intentionally conservative — it only
 *   suppresses a match when the negation/other-person cue sits close to the
 *   trigger phrase, not anywhere in the text.
 * - Bias stays toward over-triggering on ambiguous cases: the cost of a
 *   false positive (showing a helpline message) is low; the cost of a false
 *   negative is not. Negation handling exists to cut *obvious* noise, not to
 *   make the detector clever.
 *
 * Algospeak (evasion slang): added "unalive," "sewerslide/sewerslidal,"
 * "self-delete" at HIGH, and a narrow "doing/been doing SH" phrasing at
 * MEDIUM, based on published research on youth using coded terms to evade
 * platform moderation (Traumatology, 2026). Deliberately did NOT add a bare
 * "SH" token match — two letters is too short to scope safely without a
 * verb anchor, and would false-positive constantly (interjections, "ssh",
 * initials, etc). "kys" only matches when clearly self-directed
 * ("I want to kys," "kys myself") — bare "kys" is excluded because it's
 * extremely common as second-person gaming/chat banter aimed at someone
 * else, not a first-person disclosure.
 *
 * Explicitly NOT attempted (documented gaps, not oversights):
 * - Absolutist language ("nothing will ever get better," "always/never/
 *   completely") is a published correlate of depression/SI risk in
 *   linguistic research, but it's also extremely common in ordinary venting
 *   and would false-positive at a rate that erodes trust in the tool.
 *   Needs a proper scoring model, not a keyword list.
 * - Method/means-specific language (drug names + dosages, e.g. Crisis Text
 *   Line's own published finding that "ibuprofen," "excedrin," "800mg" were
 *   their actual top predictive tokens) is real signal, but drug names
 *   alone are mundane in daily life ("took ibuprofen for a headache") and
 *   only become meaningful combined with intent/access phrasing. That
 *   combination is a job for a classifier trained on labeled data, not a
 *   handful of regexes bolted onto this file.
 * - Farewell-adjacent phrasing ("just want everyone to know I love them,
 *   in case," "sorry for everything, I mean it this time") is a real
 *   clinical warning sign but is indistinguishable from ordinary sentiment
 *   using pattern matching alone.
 */

export type CrisisSeverity = "none" | "medium" | "high";

export interface CrisisCheckResult {
  severity: CrisisSeverity;
  matched: boolean; // convenience: severity !== "none"
}

// --- Negation / third-person guard -----------------------------------------
// If one of these sits within ~4 words *before* the matched phrase, we treat
// it as probably not a first-person present-tense crisis statement.
//
// Negation and third-person are NOT the same signal and must not be
// collapsed into one boolean (this was the source of a real bug — see
// below). They mean different things and warrant different handling:
//   - Negation ("I don't want to hurt myself") means the statement itself
//     denies the risk. On a MEDIUM match this can reasonably drop to NONE.
//   - Third-person ("my dad struggles with self harm") means the risk is
//     real but about someone else. It should never be discarded down to
//     NONE — that would make a genuine disclosure about another person's
//     wellbeing invisible. It should stay at (or settle at) MEDIUM, not be
//     suppressed further.
const NEGATION_WINDOW = /\b(don'?t|doesn'?t|didn'?t|never|not|no longer|used to|stopped|isn'?t|wasn'?t|won'?t)\s+(\w+\s+){0,3}$/;

const THIRD_PERSON_WINDOW = /\b(my (friend|sister|brother|mom|dad|mother|father|partner|cousin|colleague)|he|she|they|someone i know)\s+(\w+\s+){0,3}$/;

interface PrefixContext {
  negated: boolean;
  thirdPerson: boolean;
}

function getPrefixContext(text: string, matchIndex: number): PrefixContext {
  const prefix = text.slice(0, matchIndex);
  return {
    negated: NEGATION_WINDOW.test(prefix),
    thirdPerson: THIRD_PERSON_WINDOW.test(prefix),
  };
}

// --- High severity: explicit statements of suicidal intent / self-harm ----
const HIGH_PATTERNS: RegExp[] = [
  /\bsuicidal\b/,
  /\bsuicide\b/,
  /\bkill(ing)?\s+my\s?self\b/,
  /\b(end(ing)?|take|taking)\s+my\s+(own\s+)?life\b/,
  /\bwant(ed)?\s+to\s+die\b/,
  /\bwish(ed)?\s+i\s+(was|were)\s+dead\b/,
  /\bdon'?t\s+want\s+to\s+(be\s+alive|live\s+anymore|live)\b/,
  /\bno\s+reason\s+to\s+(live|be\s+here|go\s+on)\b/,
  /\b(everyone('?s| is)?\s+)?better\s+off\s+(without\s+me|if\s+i\s+(was|were)\s+dead|dead)\b/,
  /\bend(ing)?\s+it\s+all\b/,
  /\bcut(ting)?\s+my\s?self\b(?!\s+(some\s+)?(slack|a\s+break))/,
  /\bhang(ing)?\s+my\s?self\b/,
  /\bunalive\s+my\s?self\b/,
  /\bwant(ed)?\s+to\s+be\s+dead\b/,
  /\bready\s+to\s+die\b/,
  /\bkill\s+myself\b/,
  /\bunalive(d|ing)?\s+my\s?self\b|\bunalive\s+(rn|now|today)?\b|\bwant(ed)?\s+to\s+unalive\b/,
  /\bsewer\s?slid(e|al)\b/,
  /\bself[\s-]delete\b/,
  /\bi\s+(just\s+)?want(ed)?\s+to\s+kys\b|\bkys\s+my\s?self\b/,
  /\bplan(ning)?\s+(on\s+|to\s+)?(kill(ing)?|end(ing)?)\s+(my\s?self|my\s+life)\b/,
  /\btook\s+(a\s+)?(bunch|handful|lot)\s+of\s+(pills|meds)\s+to\s+(die|end)\b/,
];

// --- Medium severity: concerning but ambiguous without more context -------
// These get a supportive, non-blocking nudge rather than a hard stop.
const MEDIUM_PATTERNS: RegExp[] = [
  /\bself[\s-]?harm\b/,
  /\b(doing|done|been\s+doing|relapsed\s+into|back\s+to)\s+sh\b/,
  /\bharm(ing)?\s+my\s?self\b/,
  /\bhurt(ing)?\s+my\s?self\b/,
  /\bcan'?t\s+go\s+on\b/,
  /\bcan'?t\s+take\s+it\s+anymore\b/,
  /\bcan'?t\s+do\s+this\s+anymore\b/,
  /\bthinking\s+about\s+(dying|death|not\s+being\s+here)\b/,
  /\boverdose(d|ing)?\b/,
  /\bwhat'?s\s+the\s+point\s+(of\s+(any\s+of\s+)?(this|it|anything)\s+)?(even\s+)?(is\s+)?(anymore|any\s?more)?\b/,
  /\bi\s+just\s+want\s+(it|everything)\s+to\s+stop\b/,
  /\bi\s+want\s+to\s+disappear\b/,
];

function findFirstMatch(text: string, patterns: RegExp[]): number | null {
  for (const pattern of patterns) {
    const m = pattern.exec(text);
    if (m) return m.index;
  }
  return null;
}

export function checkCrisisContent(text: string): CrisisCheckResult {
  if (!text?.trim()) return { severity: "none", matched: false };

  const normalized = text
    .toLowerCase()
    // Normalize every apostrophe-like character to a plain straight quote.
    // Real users overwhelmingly type curly quotes without knowing it — iOS,
    // Android, and Word all auto-substitute \u2018/\u2019 for a typed ' by
    // default. The previous version of this regex only covered straight
    // quotes and a backtick, so "don\u2019t want to live anymore" (iOS
    // autocorrect) silently fell through as unmatched. Covers: right single
    // quote \u2019, left single quote \u2018, backtick, acute accent \u00b4,
    // and the Unicode "modifier letter apostrophe" \u02bc sometimes used by
    // predictive keyboards.
    .replace(/[\u2018\u2019\u02bc\u00b4`]/g, "'")
    .replace(/\s+/g, " ");

  const highIdx = findFirstMatch(normalized, HIGH_PATTERNS);
  if (highIdx !== null) {
    const ctx = getPrefixContext(normalized, highIdx);
    if (ctx.negated || ctx.thirdPerson) {
      // Downgrade rather than discard — still worth a supportive nudge,
      // whether it's "I used to feel suicidal" or "my brother is suicidal".
      return { severity: "medium", matched: true };
    }
    return { severity: "high", matched: true };
  }

  const medIdx = findFirstMatch(normalized, MEDIUM_PATTERNS);
  if (medIdx !== null) {
    // Intentionally no negation/third-person branch that drops to "none"
    // here. MEDIUM is already the low-severity, non-blocking tier — a
    // context guard has nothing lower to downgrade it to except silence,
    // and silence is the one outcome this tool is designed to avoid for
    // real matches. "I don't want to hurt myself, just needed to vent"
    // stays MEDIUM: still worth a quiet, non-blocking resource nudge.
    return { severity: "medium", matched: true };
  }

  return { severity: "none", matched: false };
}

// Backward-compatible boolean API, in case other call sites still use it.
export function containsCrisisContent(text: string): boolean {
  return checkCrisisContent(text).severity !== "none";
}
