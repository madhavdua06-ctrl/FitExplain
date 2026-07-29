import { notFound } from "next/navigation";
import Link from "next/link";
import { headers } from "next/headers";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ModeText } from "@/components/ModeText";
import { TopicChart } from "@/components/topics/TopicChart";
import { Sources, type Source } from "@/components/topics/Sources";
import { QuizCard } from "@/components/topics/QuizCard";
import { MarkCompleteButton } from "@/components/topics/MarkCompleteButton";
import { QuickFacts } from "@/components/topics/QuickFacts";
import { Conclusion } from "@/components/topics/Conclusion";
import { TopicCard } from "@/components/topics/TopicCard";
import { Tabs } from "@/components/ui/Tabs";
import { Accordion } from "@/components/ui/Accordion";
import type { Mistake, Faq, QuizQuestion } from "@/lib/topics/types";
import type { PlanResult } from "@/lib/plan/types";

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const [topic, allTopics, session] = await Promise.all([
    prisma.topic.findUnique({ where: { slug } }),
    prisma.topic.findMany({ orderBy: { order: "asc" } }),
    auth.api.getSession({ headers: await headers() }),
  ]);
  if (!topic) notFound();

  const isLoggedIn = Boolean(session);
  const [progress, plan, allProgress] = await Promise.all([
    isLoggedIn
      ? prisma.topicProgress.findUnique({
          where: { userId_topicSlug: { userId: session!.user.id, topicSlug: slug } },
        })
      : Promise.resolve(null),
    isLoggedIn
      ? prisma.generatedPlan.findUnique({ where: { userId: session!.user.id } })
      : Promise.resolve(null),
    isLoggedIn
      ? prisma.topicProgress.findMany({ where: { userId: session!.user.id }, select: { topicSlug: true } })
      : Promise.resolve([]),
  ]);

  const completedSlugs = new Set(allProgress.map((p) => p.topicSlug));

  const inPlan = plan
    ? ((plan.planData as unknown as PlanResult).relatedTopicSlugs ?? []).includes(slug)
    : false;

  const currentIndex = allTopics.findIndex((t) => t.slug === slug);
  const nextTopic = allTopics[(currentIndex + 1) % allTopics.length];
  const relatedTopics = allTopics.filter((t) => t.slug !== slug && t.category === topic.category).slice(0, 3);

  const sources = (topic.sources ?? []) as unknown as Source[];
  const keyTakeaways = (topic.keyTakeaways ?? []) as unknown as string[];
  const commonMistakes = (topic.commonMistakes ?? []) as unknown as Mistake[];
  const faqs = (topic.faqs ?? []) as unknown as Faq[];
  const quiz = (topic.quiz ?? []) as unknown as QuizQuestion[];
  const quickFacts = (topic.quickFacts ?? []) as unknown as string[];
  const simpleParagraphs = topic.simpleContent.split(/\n\n+/);
  const scientificParagraphs = topic.scientificContent.split(/\n\n+/);

  const overviewTab = (
    <div className="space-y-8">
      <QuickFacts facts={quickFacts} />

      <div className="text-base leading-relaxed text-slate-700 dark:text-slate-300">
        <ModeText
          simple={
            <div className="space-y-4">
              {simpleParagraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          }
          scientific={
            <div className="space-y-4">
              {scientificParagraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          }
        />
      </div>

      {topic.conclusionSimple && topic.conclusionScientific ? (
        <Conclusion simple={topic.conclusionSimple} scientific={topic.conclusionScientific} />
      ) : null}

      {keyTakeaways.length ? (
        <div className="glow-cyan glass rounded-2xl p-5">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-cyan-700 dark:text-cyan-400">
            <Sparkles className="h-4 w-4" aria-hidden />
            Key takeaways
          </h3>
          <ul className="mt-3 space-y-2">
            {keyTakeaways.map((takeaway) => (
              <li key={takeaway} className="flex gap-2 text-sm text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-500" aria-hidden />
                {takeaway}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <TopicChart slug={topic.slug} />

      {isLoggedIn ? (
        <div className="border-t border-slate-200 pt-4 dark:border-white/10">
          <MarkCompleteButton slug={slug} completed={Boolean(progress)} />
        </div>
      ) : null}
    </div>
  );

  const mistakesTab = commonMistakes.length ? (
    <Accordion
      items={commonMistakes.map((m) => ({
        title: `❌ ${m.mistake}`,
        content: <p>✅ {m.fix}</p>,
      }))}
    />
  ) : (
    <p className="text-sm text-slate-500 dark:text-slate-400">No common mistakes listed yet.</p>
  );

  const faqTab = faqs.length ? (
    <Accordion items={faqs.map((f) => ({ title: f.question, content: <p>{f.answer}</p> }))} />
  ) : (
    <p className="text-sm text-slate-500 dark:text-slate-400">No FAQs listed yet.</p>
  );

  const quizTab = quiz.length ? (
    <QuizCard slug={slug} questions={quiz} isLoggedIn={isLoggedIn} />
  ) : (
    <p className="text-sm text-slate-500 dark:text-slate-400">No quiz available for this topic yet.</p>
  );

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <Link
        href="/topics"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-400"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        All topics
      </Link>

      <div className="mt-4 flex items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-cyan-600 dark:text-cyan-400">
          {topic.category}
        </span>
        {inPlan ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-400">
            <CheckCircle2 className="h-3 w-3" aria-hidden />
            In your plan
          </span>
        ) : null}
        {progress ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
            <CheckCircle2 className="h-3 w-3" aria-hidden />
            Completed
          </span>
        ) : null}
      </div>

      <h1 className="mt-1 text-3xl font-bold tracking-tight">
        <span className="text-gradient">{topic.title}</span>
      </h1>

      <div className="mt-8">
        <Tabs
          tabs={[
            { id: "overview", label: "Overview", content: overviewTab },
            { id: "mistakes", label: "Common Mistakes", content: mistakesTab },
            { id: "faq", label: "FAQ", content: faqTab },
            { id: "quiz", label: "Quiz", content: quizTab },
          ]}
        />
      </div>

      {relatedTopics.length ? (
        <div className="mt-10">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Related topics</h2>
          <div className="mt-3 grid gap-4 sm:grid-cols-3">
            {relatedTopics.map((t, i) => (
              <div key={t.slug} className="animate-fade-in-up" style={{ animationDelay: `${i * 100}ms`, animationFillMode: "backwards" }}>
                <TopicCard
                  slug={t.slug}
                  title={t.title}
                  shortDescription={t.shortDescription}
                  category={t.category}
                  completed={completedSlugs.has(t.slug)}
                />
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <Link
        href={`/topics/${nextTopic.slug}`}
        className="glass group mt-6 flex items-center justify-between rounded-2xl p-5 transition hover:border-cyan-400/50"
      >
        <div>
          <span className="text-xs font-medium uppercase tracking-wide text-slate-400">Next up</span>
          <p className="mt-0.5 font-semibold text-slate-900 dark:text-white">{nextTopic.title}</p>
        </div>
        <ArrowRight
          className="h-5 w-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-cyan-500 dark:text-slate-600"
          aria-hidden
        />
      </Link>

      <Sources sources={sources} />
    </article>
  );
}
