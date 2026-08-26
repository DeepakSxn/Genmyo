import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { ArrowLeft, Sparkles } from "lucide-react";
import {
  saveQuizCompletion,
  readQuizCompletion,
  buildJoinPathFromQuiz,
} from "@/lib/quizRegistration";
import { trackQuizStart, trackQuizComplete } from "@/lib/analytics";

interface WeatherScore {
  storm?: number;
  press?: number;
  fog?: number;
  still?: number;
}

interface QuizOption {
  t: string;
  w?: WeatherScore;
  g?: string;
}

interface QuizQuestion {
  q: string;
  opts: QuizOption[];
}

const QUESTIONS: QuizQuestion[] = [
  {
    q: "When the week gets heavy, where do you feel it first?",
    opts: [
      { t: "In my head. The thinking won't stop.", w: { storm: 2, fog: 1 } },
      { t: "In my body. Tight, restless, wired.", w: { storm: 2, press: 1 } },
      { t: "I go quiet and pull away from people.", w: { fog: 2, still: 1 } },
      { t: "I just keep going. I don't really stop to feel it.", w: { press: 2, still: 1 } },
    ],
  },
  {
    q: "Which of these sounds most like where you are in life?",
    opts: [
      { t: "Still working out who I am and what I want.", g: "Gen Z" },
      { t: "Building the life, and wondering if this is it.", g: "Millennial" },
      { t: "Holding a lot together for other people.", g: "Gen X" },
      { t: "The roles have quietened. Working out what comes next.", g: "Boomer" },
    ],
  },
  {
    q: "What's the thought that shows up most often?",
    opts: [
      { t: '"I should be further along than this."', w: { press: 2, fog: 1 } },
      { t: '"I\'m carrying this on my own."', w: { still: 2, fog: 1 } },
      { t: '"I can\'t switch off."', w: { storm: 2, press: 1 } },
      { t: '"I don\'t know what I actually want."', w: { fog: 2 } },
    ],
  },
  {
    q: "When you've felt better before, what actually helped?",
    opts: [
      { t: "Saying it out loud to someone who got it.", w: { still: 1, fog: 1 } },
      { t: "Doing something small and physical.", w: { storm: 1, press: 1 } },
      { t: "Getting it out of my head and onto paper.", w: { fog: 1, storm: 1 } },
      { t: "Honestly, nothing has stuck yet.", w: { fog: 2, press: 1 } },
    ],
  },
  {
    q: "How much room do you realistically have in a day?",
    opts: [
      { t: "Two minutes. I'm stretched thin.", w: { press: 2 } },
      { t: "Five, if it's easy to start.", w: { press: 1, storm: 1 } },
      { t: "Ten or fifteen. I'd protect that.", w: { still: 1, fog: 1 } },
      { t: "As much as it takes. I'm ready.", w: { fog: 1, still: 1 } },
    ],
  },
  {
    q: "What would make something like this actually worth opening?",
    opts: [
      { t: "That it feels written for me, not for everyone.", w: { fog: 1 } },
      { t: "That I can bring a real question and get a real answer.", w: { storm: 1 } },
      { t: "That nobody else ever sees it.", w: { still: 1 } },
      { t: "That it's short and doesn't add to the pile.", w: { press: 1 } },
    ],
  },
];

interface WeatherResult {
  name: string;
  tag: string;
  body: string;
  reads: string[];
  start: string;
  startD: string;
}

const RESULTS: Record<string, WeatherResult> = {
  storm: {
    name: "The Weather Inside",
    tag: "a system running hot",
    body: "Your inner weather runs fast and loud. The thinking doesn't stop when you want it to, and your body tends to know it before your mind admits it. That isn't a flaw in you, it's a nervous system doing its job a little too well, for a little too long. <strong>The aim isn't to switch it off. It's to learn you can steady it.</strong>",
    reads: [
      "The mind that keeps running after the day has ended",
      "Feeling wired and tired at the same time",
      "Rest that doesn't quite land as rest",
    ],
    start: "Grounding",
    startD: "Short practices that settle the system, then the gentler work of noticing what's underneath the noise.",
  },
  press: {
    name: "The Long Carry",
    tag: "full, and running on momentum",
    body: "Your inner weather is shaped by load. The days are full, you're capable, and you keep going, which is exactly why it rarely gets questioned. Somewhere in there the question of what <em>you</em> actually want got quietly postponed. <strong>You don't need more to do. You need somewhere that asks nothing of you.</strong>",
    reads: [
      "Being the reliable one, and rarely being asked how you are",
      "A list that refills faster than it empties",
      "Wanting things but never getting to them",
    ],
    start: "Space that's yours",
    startD: "Small, unhurried moments with no task attached, and permission to want something for yourself.",
  },
  fog: {
    name: "The Unclear Middle",
    tag: "in between, and not sure of the shape",
    body: "Your inner weather isn't dramatic, it's unclear. Things aren't falling apart, but they aren't landing either. You've probably tried a few things and none of them stuck, which can quietly become a story about you rather than about them. <strong>It isn't. Unclear is a stage, not a verdict.</strong>",
    reads: [
      "Knowing something needs to shift, without knowing what",
      "Trying things that don't quite take",
      "A low hum of not-quite-right that's hard to name",
    ],
    start: "Noticing",
    startD: "The quiet skill of seeing what's actually there, before deciding what to do about it. Everything else builds on this.",
  },
  still: {
    name: "The Quiet Hold",
    tag: "holding it, mostly alone",
    body: "Your inner weather is contained. You handle things, and you handle them yourself, which has served you and cost you at the same time. Being self-sufficient can slowly become being unaccompanied. <strong>Letting one thing be witnessed doesn't cost you your strength.</strong>",
    reads: [
      "Managing rather than sharing",
      "Being surrounded and still feeling unmet",
      "Rarely saying the true thing out loud",
    ],
    start: "Being met",
    startD: "Bringing one real thing somewhere private, and finding it's lighter once it's been said.",
  },
};

const quizSchema = {
  "@context": "https://schema.org",
  "@type": "Quiz",
  "@id": "https://genmyo.ai/quiz#quiz",
  "name": "What's your inner weather? — GenMyo Self-Reflection Quiz",
  "description": "Six gentle questions to help you understand what emotional state or load you're carrying right now.",
  "educationalUse": "Self Reflection & Inner Wellness",
  "about": {
    "@type": "Thing",
    "name": "Inner Wellness & Self-Awareness",
  },
  "provider": { "@id": "https://genmyo.ai/#organization" },
  "isPartOf": { "@id": "https://genmyo.ai/#website" },
};

const Quiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | undefined)[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [resultKey, setResultKey] = useState<string>("fog");
  const [generation, setGeneration] = useState<string | null>(null);
  const [joinPath, setJoinPath] = useState("/join?from=quiz");

  useEffect(() => {
    trackQuizStart();
  }, []);

  const currentQ = QUESTIONS[currentIndex];

  const handlePick = (optionIndex: number) => {
    const updated = [...answers];
    updated[currentIndex] = optionIndex;
    setAnswers(updated);
  };

  const handleNext = () => {
    if (answers[currentIndex] === undefined) return;
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      calculateResult();
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const calculateResult = () => {
    const scores: Record<string, number> = { storm: 0, press: 0, fog: 0, still: 0 };
    let detectedGen: string | null = null;

    answers.forEach((ansIndex, qIndex) => {
      if (ansIndex === undefined) return;
      const opt = QUESTIONS[qIndex].opts[ansIndex];
      if (opt.g) detectedGen = opt.g;
      if (opt.w) {
        Object.entries(opt.w).forEach(([key, val]) => {
          scores[key] = (scores[key] || 0) + (val || 0);
        });
      }
    });

    const topResult = Object.keys(scores).reduce((a, b) => (scores[a] >= scores[b] ? a : b));
    const result = RESULTS[topResult] || RESULTS["fog"];

    setResultKey(topResult);
    setGeneration(detectedGen);
    setIsFinished(true);

    saveQuizCompletion({
      weatherKey: topResult,
      weatherName: result.name,
      weatherTag: result.tag,
      generation: detectedGen,
    });
    const saved = readQuizCompletion();
    if (saved) {
      setJoinPath(buildJoinPathFromQuiz(saved));
    }
    trackQuizComplete(topResult);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setAnswers([]);
    setIsFinished(false);
    setResultKey("fog");
    setGeneration(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentResult = RESULTS[resultKey] || RESULTS["fog"];
  const fillPercentage = (currentIndex / QUESTIONS.length) * 100;

  return (
    <Layout>
      <SEO
        title="What's Your Inner Weather? — 2-Min Reflection Quiz | GenMyo"
        description="Six quiet questions. No diagnosis, no scores. Discover your current inner weather pattern and find where to begin your reflection."
        jsonSchema={quizSchema}
      />

      <div
        className="fixed top-0 left-0 right-0 h-1.5 z-[60] transition-all duration-700 ease-out"
        style={{
          background:
            "linear-gradient(90deg, #6B7B8C 0%, #8B8378 22%, #C2A053 55%, #D9C48A 78%, #EFE4C6 100%)",
          backgroundSize: "200% 100%",
          backgroundPosition: `${isFinished ? 100 : (currentIndex / (QUESTIONS.length - 1)) * 100}% 0`,
        }}
      />

      <div className="min-h-[85vh] bg-[#FBF9F4] text-[#1C1A16] pt-12 pb-24 px-6 md:px-12">
        <div className="max-w-[660px] mx-auto">
          <header className="text-center pt-8 pb-6">
            <span className="text-xs md:text-sm font-serif font-semibold tracking-[0.4em] text-[#C2A053] uppercase pl-[0.4em]">
              GenMyō
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-light leading-tight mt-4 tracking-tight">
              What's your <em className="italic text-[#8B5E3C] font-normal">inner weather</em>?
            </h1>
            <p className="mt-3 text-sm md:text-base text-[#8B8378] font-light max-w-md mx-auto">
              Six questions. No scores, no diagnosis. Just a clearer picture of what you're carrying right now.
            </p>
          </header>

          {!isFinished ? (
            <main className="mt-6 animate-fade-in">
              <div className="flex flex-col-reverse md:flex-row items-stretch md:items-baseline gap-2 md:gap-4 my-8">
                <div className="flex-1 h-[1px] bg-[#E4DED2] relative">
                  <div
                    className="absolute left-0 top-0 h-[1px] bg-[#1C1A16] transition-all duration-500 ease-out"
                    style={{ width: `${fillPercentage}%` }}
                  >
                    <span className="absolute -right-1 -top-[2px] w-2 h-2 rounded-full bg-[#C2A053]" />
                  </div>
                </div>
                <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#8B8378] text-right">
                  {currentIndex + 1} of {QUESTIONS.length}
                </span>
              </div>

              <div className="mb-8">
                <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#C2A053] mb-3">
                  Question {currentIndex + 1}
                </p>
                <h2 className="font-serif text-2xl md:text-3xl font-light leading-snug tracking-tight text-[#1C1A16]">
                  {currentQ.q}
                </h2>
              </div>

              <div className="flex flex-col gap-3">
                {currentQ.opts.map((opt, n) => {
                  const isSelected = answers[currentIndex] === n;
                  return (
                    <button
                      key={n}
                      type="button"
                      onClick={() => handlePick(n)}
                      className={`flex items-center gap-4 p-4 md:p-5 border rounded-sm text-left transition-all duration-200 text-base leading-relaxed ${
                        isSelected
                          ? "border-[#1C1A16] bg-[#C2A053]/10 text-[#1C1A16] font-medium shadow-xs"
                          : "border-[#E4DED2] bg-transparent text-[#4A443C] hover:border-[#C2A053] hover:bg-[#C2A053]/10 hover:translate-x-1"
                      }`}
                    >
                      <span
                        className={`w-2.5 h-2.5 rounded-full border shrink-0 transition-all ${
                          isSelected
                            ? "bg-[#C2A053] border-[#C2A053] ring-4 ring-[#C2A053]/10"
                            : "border-[#8B8378]"
                        }`}
                      />
                      <span>{opt.t}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between mt-10">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={currentIndex === 0}
                  className={`text-sm text-[#8B8378] hover:text-[#1C1A16] transition-colors flex items-center gap-1 ${
                    currentIndex === 0 ? "invisible" : ""
                  }`}
                >
                  <ArrowLeft size={16} /> Back
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={answers[currentIndex] === undefined}
                  className="bg-[#1C1A16] text-[#FBF9F4] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#8B5E3C] transition-colors text-xs font-semibold tracking-[0.09em] uppercase px-8 py-3.5 rounded-xs"
                >
                  {currentIndex === QUESTIONS.length - 1 ? "See my weather" : "Continue"}
                </button>
              </div>
            </main>
          ) : (
            <section className="mt-8 animate-fade-up">
              <div className="text-center">
                <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#C2A053]">
                  Your Inner Weather
                </p>
                <h2 className="font-serif text-3xl md:text-5xl font-light mt-3 mb-2 tracking-tight">
                  {currentResult.name}
                </h2>
                <p className="font-serif italic text-sm md:text-base text-[#8B8378] mb-8">
                  {currentResult.tag}
                </p>
              </div>

              <div
                className="text-base md:text-lg leading-relaxed text-[#4A443C] py-7 border-y border-[#E4DED2]"
                dangerouslySetInnerHTML={{ __html: currentResult.body }}
              />

              <div className="my-8">
                <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#8B8378] mb-4">
                  What this usually looks like
                </p>
                <div className="space-y-3">
                  {currentResult.reads.map((readText, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 text-sm md:text-base text-[#4A443C] border-b border-dotted border-[#E4DED2] pb-3"
                    >
                      <span className="text-[#C2A053] shrink-0 font-serif">◦</span>
                      <span>{readText}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10 text-center bg-white border border-[#E4DED2] rounded-2xl p-8 md:p-10 shadow-xs">
                <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#8B8378] mb-2">
                  Your inner weather
                </p>
                <h3 className="font-serif text-2xl md:text-3xl font-light text-[#1C1A16]">
                  {currentResult.name}
                </h3>
                <p className="font-serif italic text-sm text-[#8B8378] mt-1 mb-6">
                  {currentResult.tag}
                </p>

                <div className="text-left bg-[#C2A053]/10 border-l-2 border-[#C2A053] p-5 md:p-6 mb-6 rounded-r-lg">
                  <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#8B5E3C] mb-2">
                    Where Mirror would begin with you
                  </p>
                  <p className="font-serif text-lg md:text-xl text-[#1C1A16] mb-2">
                    {currentResult.start}
                  </p>
                  <p className="text-sm text-[#4A443C] leading-relaxed">
                    {currentResult.startD}
                  </p>
                </div>

                <p className="text-sm text-[#4A443C] max-w-md mx-auto mb-6 leading-relaxed">
                  {generation
                    ? `Save your details once—your ${currentResult.name} profile and your life stage (${generation}) travel with you so the first WhatsApp question isn't generic.`
                    : `Save your details once—your ${currentResult.name} profile travels with you so the first WhatsApp question isn't generic.`}
                </p>

                <Link
                  to={joinPath}
                  data-cta-location="quiz_result"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold bg-[#C2A053] text-[#1C1A16] rounded-full hover:opacity-90 transition-opacity shadow-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  Start your reflection on WhatsApp →
                </Link>

                <p className="text-xs text-[#8B8378] mt-4">
                  Non-clinical. Private. About two minutes—no app download.
                </p>

                <button
                  type="button"
                  onClick={handleRestart}
                  className="mt-6 text-xs text-[#8B8378] hover:text-[#1C1A16] underline underline-offset-4 cursor-pointer block mx-auto"
                >
                  Take the quiz again
                </button>
              </div>
            </section>
          )}

          <footer className="mt-16 pt-6 border-t border-[#E4DED2] text-center text-xs text-[#8B8378] leading-relaxed">
            GenMyō is a wellness space, not a medical or crisis service.
            <br />
            If you need urgent support, contact your local emergency services or a crisis line.
          </footer>
        </div>
      </div>
    </Layout>
  );
};

export default Quiz;
