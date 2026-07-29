import Link from "next/link";
import { Flame, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { computeStreak } from "@/lib/topics/progress";
import { StatTile, StatRow } from "@/components/charts/StatTile";

export async function ProgressSummary({ userId }: { userId: string }) {
  const [totalTopics, progress] = await Promise.all([
    prisma.topic.count(),
    prisma.topicProgress.findMany({ where: { userId }, select: { completedAt: true } }),
  ]);

  const streak = computeStreak(progress.map((p) => p.completedAt));

  return (
    <section className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Your Progress</h2>
        <Link
          href="/journey"
          className="flex items-center gap-1 text-xs font-medium text-cyan-600 hover:underline dark:text-cyan-400"
        >
          Full journey
          <ArrowRight className="h-3 w-3" aria-hidden />
        </Link>
      </div>
      <div className="mt-3">
        <StatRow>
          <StatTile label="Topics completed" value={`${progress.length}/${totalTopics}`} />
          <StatTile
            label="Current streak"
            value={streak > 0 ? `${streak}` : "0"}
            sub={streak > 0 ? "days" : "start today"}
          />
        </StatRow>
      </div>
      {streak > 0 ? (
        <p className="mt-3 flex items-center gap-1.5 text-xs text-orange-600 dark:text-orange-400">
          <Flame className="h-3.5 w-3.5" aria-hidden />
          Keep it going — you&apos;re on a {streak}-day streak.
        </p>
      ) : null}
    </section>
  );
}
