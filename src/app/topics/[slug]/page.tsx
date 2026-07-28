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
import { Tabs } from "@/components/ui/Tabs";
import { Accordion } from "@/components/ui/Accordion";
import type { Mistake, Faq, QuizQuestion } from "@/lib/topics/types";
import type { PlanResult } from "@/lib/plan/types";

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const [topic, allTopics, session] = await Promise.all([
    prisma.topic.findUnique({ where: { slug } }),
    prisma.topic.findMany({ orderBy: { order: "asc" }, select: { slug: true, title: true, order: true } }),
    auth.api.getSession({ headers: await headers() }),
  ]);
  if (!topic) notFound();

  const isLoggedIn = Boolean(session);
  const [progress, plan] = await Promise.all([
    isLoggedIn
      ? prisma.topicProgress.findUnique({
          where: { userId_topicSlug: { userId: session!.user.id, topicSlug: slug } },
        })
      : Promise.resolve(null),
    isLoggedIn
      ? prisma.generatedPlan.findUnique({ where: { userId: session!.user.id } })
      : Promise.resolve(null),
  ]);

  const inPlan = plan
    ? ((plan.planData as unknown as PlanResult).relatedTopicSlugs ?? []).includes(slug)
    : false;

  const currentIndex = allTopics.findIndex((t) => t.slug === slug);
  const nextTopic = allTopics[(currentIndex + 1) % allTopics.length];

  const sources = (topic.sources ?? []) as unknown as Source[];
  const keyTakeaways = (topic.keyTakeaways ?? []) as unknown as string[];
  const commonMistakes = (topic.commonMistakes ?? []) as unknown as Mistake[];
  const faqs = (topic.faqs ?? []) as unknown as Faq[];
  const quiz = (topic.quiz ?? []) as unknown as QuizQuestion[];

  const overviewTab = (
    <div className="space-y-8">
      <div className="text-base leading-relaxed text-slate-700 dark:text-slate-300">
        <ModeText simple={<p>{topic.simpleContent}</p>} scientific={<p>{topic.scientificContent}</p>} />
      </div>

      {keyTakeaways.length ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 dark:border-emerald-900 dark:bg-emerald-950/20">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
            <Sparkles className="h-4 w-4" aria-hidden />
            Key takeaways
          </h3>
          <ul className="mt-3 space-y-2">
            {keyTakeaways.map((takeaway) => (
              <li key={takeaway} className="flex gap-2 text-sm text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
                {takeaway}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <TopicChart slug={topic.slug} />
      <Sources sources={sources} />

      {isLoggedIn ? (
        <div className="border-t border-slate-200 pt-4 dark:border-slate-800">
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
        className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600 hover:underline"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        All topics
      </Link>

      <div className="mt-4 flex items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-emerald-600">{topic.category}</span>
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

      <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{topic.title}</h1>

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

      <Link
        href={`/topics/${nextTopic.slug}`}
        className="group mt-10 flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-800"
      >
        <div>
          <span className="text-xs font-medium uppercase tracking-wide text-slate-400">Next up</span>
          <p className="mt-0.5 font-semibold text-slate-900 dark:text-white">{nextTopic.title}</p>
        </div>
        <ArrowRight
          className="h-5 w-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-emerald-600 dark:text-slate-600"
          aria-hidden
        />
      </Link>
    </article>
  );
}
