import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Link from "next/link";
import { CheckCircle2, Circle, ArrowRight, Compass } from "lucide-react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { computeStreak } from "@/lib/topics/progress";

export default async function JourneyPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const [plan, totalTopics, progress, allTopics] = await Promise.all([
    prisma.generatedPlan.findUnique({ where: { userId: session.user.id } }),
    prisma.topic.count(),
    prisma.topicProgress.findMany({ where: { userId: session.user.id } }),
    prisma.topic.findMany({ orderBy: { order: "asc" } }),
  ]);

  const completedSlugs = new Set(progress.map((p) => p.topicSlug));
  const remainingTopics = allTopics.filter((t) => !completedSlugs.has(t.slug)).slice(0, 3);
  const streak = computeStreak(progress.map((p) => p.completedAt));
  const topicsPct = totalTopics > 0 ? Math.round((progress.length / totalTopics) * 100) : 0;

  const steps: {
    title: string;
    description: string;
    done: boolean;
    href?: string;
    cta?: string;
    progressPct?: number;
  }[] = [
    {
      title: "Create your account",
      description: "You're in — welcome to FitExplain.",
      done: true,
    },
    {
      title: "Complete onboarding",
      description: plan ? "Your personalized plan is ready." : "Answer a few questions to get your plan.",
      done: Boolean(plan),
      href: plan ? "/dashboard" : "/onboarding",
      cta: plan ? "View your plan" : "Start onboarding",
    },
    {
      title: "Explore the topic library",
      description: `${progress.length} of ${totalTopics} topics completed.`,
      done: totalTopics > 0 && progress.length === totalTopics,
      progressPct: topicsPct,
    },
    {
      title: "Build a streak",
      description:
        streak > 0 ? `You're on a ${streak}-day streak — keep it going.` : "Complete a topic today to start a streak.",
      done: streak >= 3,
    },
  ];

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-sm">
        <Compass className="h-5 w-5" aria-hidden />
      </span>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Your Journey</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300">
        Your path from sign-up to a fitness routine you actually understand.
      </p>

      <div className="mt-8">
        {steps.map((step, i) => (
          <div key={step.title} className="relative flex gap-4">
            {i < steps.length - 1 ? (
              <span
                className="absolute left-[15px] top-8 h-full w-px bg-slate-200 dark:bg-slate-800"
                aria-hidden
              />
            ) : null}
            <span
              className={`z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                step.done
                  ? "bg-emerald-600 text-white"
                  : "border-2 border-slate-300 text-slate-400 dark:border-slate-700"
              }`}
            >
              {step.done ? <CheckCircle2 className="h-5 w-5" aria-hidden /> : <Circle className="h-4 w-4" aria-hidden />}
            </span>
            <div className="flex-1 pb-8">
              <h3 className="font-semibold text-slate-900 dark:text-white">{step.title}</h3>
              <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{step.description}</p>
              {typeof step.progressPct === "number" ? (
                <div className="mt-2 h-2 w-full max-w-xs overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all"
                    style={{ width: `${step.progressPct}%` }}
                  />
                </div>
              ) : null}
              {step.href ? (
                <Link
                  href={step.href}
                  className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-emerald-600 hover:underline"
                >
                  {step.cta}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      {remainingTopics.length ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Continue where you left off</h3>
          <ul className="mt-3 space-y-2">
            {remainingTopics.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/topics/${t.slug}`}
                  className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-700 transition hover:border-emerald-300 hover:text-emerald-600 dark:border-slate-700 dark:text-slate-200"
                >
                  {t.title}
                  <ArrowRight className="h-4 w-4 text-slate-300" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center dark:border-emerald-900 dark:bg-emerald-950/30">
          <p className="font-medium text-emerald-700 dark:text-emerald-400">
            You&apos;ve completed every topic in the library.
          </p>
        </div>
      )}
    </div>
  );
}
