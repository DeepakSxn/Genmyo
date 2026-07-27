const QUIZ_RESULT_KEY = "genmyo_quiz_result";

export interface QuizCompletionResult {
  weatherKey: string;
  weatherName: string;
  weatherTag: string;
  generation: string | null;
  completedAt: string;
}

export function saveQuizCompletion(
  data: Omit<QuizCompletionResult, "completedAt">
) {
  if (typeof window === "undefined") return;
  const payload: QuizCompletionResult = {
    ...data,
    completedAt: new Date().toISOString(),
  };
  sessionStorage.setItem(QUIZ_RESULT_KEY, JSON.stringify(payload));
}

export function readQuizCompletion(): QuizCompletionResult | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(QUIZ_RESULT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as QuizCompletionResult;
  } catch {
    return null;
  }
}

export function buildJoinContextFromQuiz(result: QuizCompletionResult) {
  const parts = [
    `Weather Profile: ${result.weatherName} (${result.weatherTag})`,
    "Quiz completed",
  ];
  if (result.generation) parts.push(`Life stage: ${result.generation}`);
  return parts.join(" | ");
}

export function buildJoinPathFromQuiz(result: QuizCompletionResult) {
  const context = buildJoinContextFromQuiz(result);
  const params = new URLSearchParams({
    from: "quiz",
    context,
  });
  return `/join?${params.toString()}`;
}
