import { Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import Philosophy from "./pages/Philosophy";
import NotFound from "./pages/NotFound";
import Join from "./pages/Join";
import Team from "./pages/Team";
import Terms from "./pages/Terms";
import Partners from "./pages/Partners";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Privacy from "./pages/Privacy";
import HowItWorks from "./pages/HowItWorks";
import RosebudAlternative from "./pages/RosebudAlternative";
import StoicAlternative from "./pages/StoicAlternative";
import ClusterArticle from "./pages/ClusterArticle";
import ConversationsReport from "./pages/ConversationsReport";
import ReflectionQuestions from "./pages/ReflectionQuestions";
import EmotionalCheckIn from "./pages/EmotionalCheckIn";
import FeelingDisconnected from "./pages/FeelingDisconnected";

export const AppRoutes = () => (
  <>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/philosophy" element={<Philosophy />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/faq" element={<Navigate to="/#faq" replace />} />
      <Route path="/whatsapp-journaling" element={<Navigate to="/emotional-check-in" replace />} />
      <Route path="/ai-journaling" element={<Navigate to="/emotional-check-in" replace />} />
      <Route path="/alternatives/rosebud" element={<RosebudAlternative />} />
      <Route path="/alternatives/stoic" element={<StoicAlternative />} />
      <Route path="/100-conversations" element={<ConversationsReport />} />
      <Route path="/reflection-prompt-generator" element={<Navigate to="/join" replace />} />
      
      {/* Programmatic Question Library */}
      <Route path="/reflection-questions/feeling-stuck-at-work" element={<ReflectionQuestions situation="feeling-stuck-at-work" />} />
      <Route path="/reflection-questions/before-a-big-decision" element={<ReflectionQuestions situation="before-a-big-decision" />} />
      <Route path="/reflection-questions/after-a-breakup" element={<ReflectionQuestions situation="after-a-breakup" />} />
      <Route path="/reflection-questions/cant-sleep" element={<ReflectionQuestions situation="cant-sleep" />} />
      <Route path="/reflection-questions/feeling-behind" element={<ReflectionQuestions situation="feeling-behind" />} />
      <Route path="/reflection-questions/before-a-career-change" element={<ReflectionQuestions situation="before-a-career-change" />} />
      <Route path="/reflection-questions/feeling-numb" element={<ReflectionQuestions situation="feeling-numb" />} />
      <Route path="/reflection-questions/sunday-night" element={<ReflectionQuestions situation="sunday-night" />} />
      <Route path="/reflection-questions/overwhelmed" element={<ReflectionQuestions situation="overwhelmed" />} />
      <Route path="/reflection-questions/after-rejection" element={<ReflectionQuestions situation="after-rejection" />} />
      
      <Route path="/join" element={<Join />} />
      <Route path="/team" element={<Team />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/partners" element={<Partners />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/privacy" element={<Privacy />} />

      {/* Cluster Content Pages */}
      <Route path="/emotional-check-in" element={<EmotionalCheckIn />} />
      <Route path="/feeling-disconnected" element={<FeelingDisconnected />} />
      <Route path="/self-awareness" element={<ClusterArticle slug="self-awareness" />} />
      <Route path="/inner-alignment" element={<ClusterArticle slug="inner-alignment" />} />
      <Route path="/quiet-wellness" element={<ClusterArticle slug="quiet-wellness" />} />
      <Route path="/ai-journaling-vs-therapy" element={<ClusterArticle slug="ai-journaling-vs-therapy" />} />
      <Route path="/is-ai-journaling-private" element={<ClusterArticle slug="is-ai-journaling-private" />} />
      <Route path="/free-ai-journaling" element={<ClusterArticle slug="free-ai-journaling" />} />
      <Route path="/feeling-stuck" element={<ClusterArticle slug="feeling-stuck" />} />
      <Route path="/feeling-stuck-in-life" element={<ClusterArticle slug="feeling-stuck-in-life" />} />
      <Route path="/feeling-stuck-but-busy" element={<ClusterArticle slug="feeling-stuck-but-busy" />} />
      <Route path="/feeling-stuck-in-your-20s" element={<ClusterArticle slug="feeling-stuck-in-your-20s" />} />
      <Route path="/stuck-in-a-job" element={<ClusterArticle slug="stuck-in-a-job" />} />
      <Route path="/languishing-vs-burnout-vs-depression" element={<ClusterArticle slug="languishing-vs-burnout-vs-depression" />} />
      <Route path="/just-do-something-doesnt-work" element={<ClusterArticle slug="just-do-something-doesnt-work" />} />
      <Route path="/knowing-what-you-want" element={<ClusterArticle slug="knowing-what-you-want" />} />
      <Route path="/guided-reflection" element={<ClusterArticle slug="guided-reflection" />} />
      <Route path="/guided-reflection-end-of-day" element={<ClusterArticle slug="guided-reflection-end-of-day" />} />
      <Route path="/guided-reflection-morning" element={<ClusterArticle slug="guided-reflection-morning" />} />
      <Route path="/guided-reflection-overwhelm" element={<ClusterArticle slug="guided-reflection-overwhelm" />} />
      <Route path="/guided-reflection-clarity" element={<ClusterArticle slug="guided-reflection-clarity" />} />
      <Route path="/guided-reflection-decision-making" element={<ClusterArticle slug="guided-reflection-decision-making" />} />
      <Route path="/guided-reflection-weekly-review" element={<ClusterArticle slug="guided-reflection-weekly-review" />} />
      <Route path="/guided-reflection-career" element={<ClusterArticle slug="guided-reflection-career" />} />
      <Route path="/philosophy-streaks" element={<ClusterArticle slug="philosophy-streaks" />} />
      <Route path="/philosophy-self-optimisation-critique" element={<ClusterArticle slug="philosophy-self-optimisation-critique" />} />
      <Route path="/philosophy-inner-alignment" element={<ClusterArticle slug="philosophy-inner-alignment" />} />
      <Route path="/philosophy-no-morning-routine" element={<ClusterArticle slug="philosophy-no-morning-routine" />} />
      <Route path="/philosophy-why-wellness-got-loud" element={<ClusterArticle slug="philosophy-why-wellness-got-loud" />} />
      <Route path="/philosophy-growth-at-your-own-pace" element={<ClusterArticle slug="philosophy-growth-at-your-own-pace" />} />

      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);
