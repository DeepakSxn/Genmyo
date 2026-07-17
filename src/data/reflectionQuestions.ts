export interface QuestionLibraryData {
  slug: string;
  situation: string;
  introduction: string;
  excerpt: string;
  questions: string[];
  pillarSlug: string;
  pillarName: string;
}

export const reflectionQuestionsLibrary: Record<string, QuestionLibraryData> = {
  "feeling-stuck-at-work": {
    slug: "feeling-stuck-at-work",
    situation: "Feeling Stuck at Work",
    introduction: "Feeling stagnant in your job is a common experience that often stems from a lack of learning growth, misalignment of values, or burnout. When work feels like a chore, it is easy to fall into active procrastination, doing busywork rather than driving meaningful career moves. This guide offers 6 targeted reflection questions to help you analyze your current workplace friction, evaluate your energy drains, and plan your next career transition with clarity.",
    excerpt: "Anonymized Excerpt: 'I realized I was spending 3 hours a day preparing status reports just to look busy. I was terrified of being asked what I actually accomplished because my core project had stalled.'",
    questions: [
      "What is the single most draining task you performed this week, and why did it feel heavy?",
      "If you could redesign your job description tomorrow, what three tasks would you completely eliminate?",
      "Are you staying in this role for the safety of the salary, the status of the title, or genuine skill development?",
      "What is a boundary with a coworker or manager that you have let slip, causing extra stress?",
      "When was the last time you felt proud of a work delivery, and what were you doing in that moment?",
      "What is the single smallest action you can take this week to prepare for a career pivot?"
    ],
    pillarSlug: "feeling-stuck",
    pillarName: "Feeling Stuck"
  },
  "before-a-big-decision": {
    slug: "before-a-big-decision",
    situation: "Before a Big Decision",
    introduction: "Major life decisions often bring choice paralysis. We tend to loop through scenarios, worrying about making the 'wrong' choice. The goal of this reflection guide is to help you externalize your options, look at worst-case outcomes objectively, and separate your authentic values from external societal pressure. By answering these questions, you will build the cognitive distance necessary to choose with confidence and peace of mind.",
    excerpt: "Anonymized Excerpt: 'I was torn between staying at my stable firm or starting my own studio. Writing down the recovery plan for the worst-case scenario made me realize the risk was actually manageable.'",
    questions: [
      "What is the absolute worst-case outcome for each option, and how exactly would you recover from it?",
      "How will you view this decision in 10 minutes? In 10 months? In 10 years?",
      "Whose approval or pride are you trying to protect with the choice you are leaning toward?",
      "If both paths yielded the exact same income and social status, which one would your gut choose?",
      "What advice would you give a close friend facing this exact same dilemma?",
      "What is a bias or fear-based assumption you are bringing into this decision?"
    ],
    pillarSlug: "guided-reflection",
    pillarName: "Guided Reflection"
  },
  "after-a-breakup": {
    slug: "after-a-breakup",
    situation: "After a Breakup",
    introduction: "The end of a relationship brings a complex mix of grief, identity loss, and emotional noise. It is tempting to look for answers or jump into new distractions. This reflection workspace is designed to help you process the grief quietly, externalize the sorrow, and begin rebuilding your individual center. These prompts encourage you to reflect on what the relationship taught you without falling into self-blame or idealizing the past.",
    excerpt: "Anonymized Excerpt: 'I kept missing the daily texts. Reflecting helped me realize I didn't miss the conflicts; I missed the routine of having someone to share my day with.'",
    questions: [
      "What is a truth about the relationship that you are currently avoiding or trying to sugarcoat?",
      "What parts of your personal routine, hobbies, or friendships did you sacrifice to keep the peace?",
      "What did this connection teach you about your core values and what you need in a partner?",
      "What is the heaviest emotion you are carrying today, and where do you feel it in your body?",
      "How can you extend kindness and patience to yourself as you adjust to this new layout?",
      "What is one tiny self-care action you can take today to reclaim your individual space?"
    ],
    pillarSlug: "guided-reflection",
    pillarName: "Guided Reflection"
  },
  "cant-sleep": {
    slug: "cant-sleep",
    situation: "Can't Sleep",
    introduction: "Lying awake with a racing mind is a sign that your brain is attempting to process unresolved daily stress and tasks in the dark. Without a structured outlet, these thoughts cycle endlessly, triggering anxiety and keeping you awake. This evening reflection is a gentle cognitive brain-dump designed to process today's events, write down pending tasks, and transition your mind into a restful state.",
    excerpt: "Anonymized Excerpt: 'My mind kept looping on a project deadline. Writing it down and stating it could wait until 9 AM allowed me to finally fall asleep.'",
    questions: [
      "What is the single biggest source of tension or worry still lingering from today?",
      "What is one task or decision that is causing anxiety but can absolutely wait until tomorrow morning?",
      "What is a small win or moment of ease from today that you can appreciate right now?",
      "What is one thing you did today that you wish you had handled differently, and how do you let it go?",
      "What is the main priority you need to address tomorrow to clear your head?",
      "Can you take three slow breaths and focus entirely on the physical weight of your body on the bed?"
    ],
    pillarSlug: "guided-reflection",
    pillarName: "Guided Reflection"
  },
  "feeling-behind": {
    slug: "feeling-behind",
    situation: "Feeling Behind in Life",
    introduction: "Feeling behind is a psychological stressor driven by comparison culture, social timelines, and unrealistic expectations. We measure our internal struggles against other people's polished highlight reels. This guided reflection helps you step out of the comparison loop, audit your unique timeline, and identify what genuine progress looks like to you, independent of external peer status.",
    excerpt: "Anonymized Excerpt: 'I felt like everyone my age was buying houses and getting promoted. Reflecting helped me see that I value creative autonomy over early home ownership.'",
    questions: [
      "Whose life or career are you comparing yourself to right now, and what specific part of their path makes you envious?",
      "Is the timeline you are judging yourself by actually yours, or was it inherited from family or peers?",
      "What is one area of your life where you have made significant progress that doesn't fit a standard checklist?",
      "If you could never show off your achievements to anyone, how would your daily goals change?",
      "What does 'enough' look like for you in terms of income, status, and lifestyle?",
      "What is one way you can celebrate your current stage of growth today?"
    ],
    pillarSlug: "feeling-stuck",
    pillarName: "Feeling Stuck"
  },
  "before-a-career-change": {
    slug: "before-a-career-change",
    situation: "Before a Career Change",
    introduction: "Pivoting careers requires both strategic planning and emotional readiness. It is natural to feel caught between the safety of your current path and the excitement of a new direction. This reflection framework guides you to audit your transferable skills, clarify your core work values, and build a transition plan that minimizes panic and maximizes alignment.",
    excerpt: "Anonymized Excerpt: 'I was terrified of losing my senior title. Writing it down helped me see that the title was just ego; the actual work was making me miserable.'",
    questions: [
      "What is the main driver of your desire to change careers: burnout, compensation, or values mismatch?",
      "What are three core skills you possess that will transfer to any industry or role?",
      "What is the biggest sacrifice you are willing to make to transition into your next field?",
      "How much financial runway do you need to establish before making the transition comfortable?",
      "What is one small experiment you can run this month to test your interest in the new career path?",
      "Whose guidance or feedback will you seek out as you begin planning this pivot?"
    ],
    pillarSlug: "feeling-stuck",
    pillarName: "Feeling Stuck"
  },
  "feeling-numb": {
    slug: "feeling-numb",
    situation: "Feeling Numb or Disconnected",
    introduction: "Feeling numb is often a defense mechanism of the nervous system when overwhelmed by persistent stress, task fatigue, or unaddressed emotions. Rather than forcing yourself to feel productive or happy, this reflection invites you to gently acknowledge the numbness without judgment. These prompts help you trace where your energy is blocked and reconnect with your immediate physical and emotional reality.",
    excerpt: "Anonymized Excerpt: 'I felt nothing after completing a huge launch. The reflection helped me realize I had been in survival mode for six months straight.'",
    questions: [
      "When did you first notice this feeling of numbness or emotional distance creep in?",
      "What is a heavy emotion or conflict that you might be protecting yourself from feeling right now?",
      "What does your body feel like in this moment? Is there tension in your shoulders, jaw, or chest?",
      "What is one simple sensory experience (a warm drink, cool air, music) you can focus on for a minute?",
      "If your numbness was trying to protect you from burning out, what is it trying to say?",
      "What is the single smallest choice you can make today to honor your energy limits?"
    ],
    pillarSlug: "guided-reflection",
    pillarName: "Guided Reflection"
  },
  "sunday-night": {
    slug: "sunday-night",
    situation: "Sunday Night Anxiety",
    introduction: "The 'Sunday scaries' are a response to the transition from weekend autonomy back to weekday structure and expectations. This anxiety is often amplified by dreading tasks or feeling misaligned in your career. This Sunday night reflection helps you process the upcoming week's challenges, establish boundaries, and anchor your focus so you can sleep peacefully.",
    excerpt: "Anonymized Excerpt: 'Sundays were ruined by thinking about my weekly sync meeting. Pre-planning my talking points on Sunday evening took the anxiety away.'",
    questions: [
      "What is the specific meeting, task, or interaction causing the Sunday night dread?",
      "What is one thing you can prepare or schedule tonight to make Monday morning feel lighter?",
      "How can you schedule a small pocket of play or rest on Monday to break up the work week?",
      "What is a work boundary you will practice maintaining starting tomorrow morning?",
      "What is the single most important project you want to direct your energy toward this week?",
      "How can you transition your attention away from work and into a relaxing evening routine tonight?"
    ],
    pillarSlug: "guided-reflection",
    pillarName: "Guided Reflection"
  },
  "overwhelmed": {
    slug: "overwhelmed",
    situation: "Overwhelmed by Choice",
    introduction: "When faced with too many tasks, choices, or demands, our brains freeze up, leading to stagnation. Overwhelm is not a sign of laziness; it is a sign of working memory overload. This reflection is designed to help you brain-dump all inputs, categorize them objectively, and select the single best step forward to rebuild your daily momentum.",
    excerpt: "Anonymized Excerpt: 'I had 15 different ideas for my portfolio. Forcing myself to pick just one and commit to it for one week broke my paralysis.'",
    questions: [
      "Write down everything currently demanding your energy, without sorting or filtering.",
      "Which of these items are completely within your control, and which are out of your hands?",
      "What is the single task that, if completed, will make the other items easier or irrelevant?",
      "Where are you expecting perfect outcomes where a 'good enough' attempt is sufficient?",
      "What is one task you will explicitly cross off your list and refuse to do today?",
      "What is the single smallest action you can take in the next 5 minutes to get started?"
    ],
    pillarSlug: "feeling-stuck",
    pillarName: "Feeling Stuck"
  },
  "after-rejection": {
    slug: "after-rejection",
    situation: "After Rejection",
    introduction: "Rejection—whether in careers, writing, or relationships—feels like a direct critique of our self-worth. It triggers fear of inadequacy and social isolation. This reflection guide is designed to help you separate the rejection of a specific proposal or proposal from a rejection of your identity, allowing you to process the disappointment and find next steps.",
    excerpt: "Anonymized Excerpt: 'Losing that client felt like a verdict on my consulting skills. The reflection helped me see that their budget constraints had nothing to do with my worth.'",
    questions: [
      "What is the story you are telling yourself about this rejection? (e.g., 'I am not good enough').",
      "What are the objective facts of the situation, separate from your emotional interpretation?",
      "What is one useful piece of feedback you can extract from this event to improve your next attempt?",
      "How does this rejection redirect you toward options that might be a better fit for your skills?",
      "What is a strength or past success that this single rejection cannot take away from you?",
      "What is the next tiny step you will take to put yourself back out there?"
    ],
    pillarSlug: "guided-reflection",
    pillarName: "Guided Reflection"
  }
};
