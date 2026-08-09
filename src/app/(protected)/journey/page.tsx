import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Link from "next/link";
import {
  CheckCircle2,
  Circle,
  ArrowRight,
  Compass,
  Footprints,
  Trophy,
  Flame,
  BookCheck,
  Scale,
  Award,
  GraduationCap,
  Droplet,
  Dumbbell,
} from "lucide-react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { computeStreak } from "@/lib/topics/progress";
import { AchievementBadges } from "@/components/topics/AchievementBadges";
import { RadialProgress } from "@/components/charts/RadialProgress";

export default async function JourneyPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const [plan, totalTopics, progress, allTopics, bodyLogCount, waterLogs, workoutLogCount] =
    await Promise.all([
      prisma.generatedPlan.findUnique({ where: { userId: session.user.id } }),
      prisma.topic.count(),
      prisma.topicProgress.findMany({ where: { userId: session.user.id } }),
      prisma.topic.findMany({ orderBy: { order: "asc" } }),
      prisma.bodyLog.count({ where: { userId: session.user.id } }),
      prisma.waterLog.findMany({ where: { userId: session.user.id }, select: { loggedAt: true } }),
      prisma.workoutLog.count({ where: { userId: session.user.id } }),
    ]);

  const waterStreak = computeStreak(waterLogs.map((log) => log.loggedAt));

  const completedSlugs = new Set(progress.map((p) => p.topicSlug));
  const remainingTopics = allTopics.filter((t) => !completedSlugs.has(t.slug)).slice(0, 3);
  const streak = computeStreak(progress.map((p) => p.completedAt));
  const topicsPct = totalTopics > 0 ? Math.round((progress.length / totalTopics) * 100) : 0;
  const hasPerfectQuiz = progress.some((p) => (p.quizScore ?? 0) >= 3);
  const scoredProgress = progress.filter((p) => p.quizScore !== null);
  const avgQuizScore = scoredProgress.length
    ? scoredProgress.reduce((sum, p) => sum + (p.quizScore ?? 0), 0) / scoredProgress.length
    : 0;
  const isCompletionist = totalTopics > 0 && progress.length === totalTopics;
  const isCertified = isCompletionist && avgQuizScore >= 2.5;

  const badges = [
    { icon: Footprints, label: "First Steps", achieved: progress.length >= 1 },
    { icon: Trophy, label: "Perfect Quiz", achieved: hasPerfectQuiz },
    { icon: Flame, label: "On a Streak", achieved: streak >= 3 },
    { icon: BookCheck, label: "Halfway There", achieved: totalTopics > 0 && progress.length >= totalTopics / 2 },
    { icon: Scale, label: "Tracking Progress", achieved: bodyLogCount >= 3 },
    { icon: Award, label: "Completionist", achieved: isCompletionist },
    { icon: GraduationCap, label: "FitExplain Certified", achieved: isCertified },
    { icon: Droplet, label: "7-Day Water Streak", achieved: waterStreak >= 7 },
    { icon: Dumbbell, label: "3 Workouts Completed", achieved: workoutLogCount >= 3 },
  ];

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
      <span className="glow-violet inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white">
        <Compass className="h-5 w-5" aria-hidden />
      </span>
      <h1 className="mt-3 text-3xl font-bold tracking-tight">
        <span className="text-gradient">Your Journey</span>
      </h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300">
        Your path from sign-up to a fitness routine you actually understand.
      </p>

      <div className="glass mt-6 flex flex-wrap justify-around gap-6 rounded-2xl p-5">
        <RadialProgress
          percent={topicsPct}
          label="Topics completed"
          sublabel={`${progress.length} of ${totalTopics}`}
          colorVar="--viz-series-1"
          icon={<BookCheck className="h-4 w-4" />}
        />
        <RadialProgress
          percent={avgQuizScore > 0 ? (avgQuizScore / 3) * 100 : 0}
          label="Quiz mastery"
          sublabel={scoredProgress.length ? `Avg ${avgQuizScore.toFixed(1)}/3` : "No quizzes yet"}
          colorVar="--viz-series-2"
          icon={<Trophy className="h-4 w-4" />}
        />
        <RadialProgress
          percent={Math.min(100, (streak / 7) * 100)}
          label="Streak progress"
          sublabel={streak > 0 ? `${streak}-day streak` : "Start today"}
          colorVar="--viz-series-1"
          icon={<Flame className="h-4 w-4" />}
        />
      </div>

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
                  ? "glow-cyan bg-gradient-to-br from-cyan-500 to-violet-600 text-white"
                  : "border-2 border-slate-300 text-slate-400 dark:border-white/20"
              }`}
            >
              {step.done ? <CheckCircle2 className="h-5 w-5" aria-hidden /> : <Circle className="h-4 w-4" aria-hidden />}
            </span>
            <div className="flex-1 pb-8">
              <h3 className="font-semibold text-slate-900 dark:text-white">{step.title}</h3>
              <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{step.description}</p>
              {typeof step.progressPct === "number" ? (
                <div className="mt-2 h-2 w-full max-w-xs overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 transition-all"
                    style={{ width: `${step.progressPct}%` }}
                  />
                </div>
              ) : null}
              {step.href ? (
                <Link
                  href={step.href}
                  className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-400"
                >
                  {step.cta}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <AchievementBadges badges={badges} />
      </div>

      {remainingTopics.length ? (
        <div className="glass rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Continue where you left off</h3>
          <ul className="mt-3 space-y-2">
            {remainingTopics.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/topics/${t.slug}`}
                  className="glass flex items-center justify-between rounded-xl px-4 py-2.5 text-sm text-slate-700 transition hover:border-cyan-400/50 hover:text-cyan-600 dark:text-slate-200 dark:hover:text-cyan-400"
                >
                  {t.title}
                  <ArrowRight className="h-4 w-4 text-slate-300" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="glow-cyan glass rounded-2xl p-5 text-center">
          <p className="font-medium text-cyan-700 dark:text-cyan-400">
            You&apos;ve completed every topic in the library.
          </p>
        </div>
      )}
    </div>
  );
}
