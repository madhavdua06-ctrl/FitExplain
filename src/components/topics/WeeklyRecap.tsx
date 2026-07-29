import { CalendarClock } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { daysAgo } from "@/lib/topics/progress";

export async function WeeklyRecap({ userId }: { userId: string }) {
  const sevenDaysAgo = daysAgo(7);

  const [weekLogs, weekProgress, latestBefore] = await Promise.all([
    prisma.bodyLog.findMany({
      where: { userId, loggedAt: { gte: sevenDaysAgo } },
      orderBy: { loggedAt: "asc" },
      select: { weightKg: true, loggedAt: true },
    }),
    prisma.topicProgress.findMany({
      where: { userId, completedAt: { gte: sevenDaysAgo } },
      select: { quizScore: true },
    }),
    prisma.bodyLog.findFirst({
      where: { userId, loggedAt: { lt: sevenDaysAgo } },
      orderBy: { loggedAt: "desc" },
      select: { weightKg: true },
    }),
  ]);

  const topicsCompleted = weekProgress.length;
  const quizzesTaken = weekProgress.filter((p) => p.quizScore !== null).length;

  const startWeight = latestBefore?.weightKg ?? weekLogs[0]?.weightKg;
  const endWeight = weekLogs[weekLogs.length - 1]?.weightKg;
  const weightDelta = startWeight !== undefined && endWeight !== undefined ? endWeight - startWeight : null;

  const hasActivity = topicsCompleted > 0 || weekLogs.length > 0;

  if (!hasActivity) return null;

  return (
    <section className="glass rounded-2xl p-5">
      <h2 className="flex items-center gap-1.5 text-sm font-semibold text-slate-900 dark:text-white">
        <CalendarClock className="h-4 w-4 text-cyan-500" aria-hidden />
        Your Week in Review
      </h2>
      <div className="mt-3 grid grid-cols-3 gap-3">
        <div className="rounded-xl bg-slate-50 p-3 text-center dark:bg-white/5">
          <div className="text-xl font-semibold text-slate-900 dark:text-white">{topicsCompleted}</div>
          <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">Topics completed</div>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 text-center dark:bg-white/5">
          <div className="text-xl font-semibold text-slate-900 dark:text-white">{quizzesTaken}</div>
          <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">Quizzes taken</div>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 text-center dark:bg-white/5">
          <div className="text-xl font-semibold text-slate-900 dark:text-white">
            {weightDelta !== null ? `${weightDelta > 0 ? "+" : ""}${weightDelta.toFixed(1)} kg` : "—"}
          </div>
          <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">Weight change</div>
        </div>
      </div>
      <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
        {topicsCompleted > 0
          ? `Nice work — ${topicsCompleted} topic${topicsCompleted === 1 ? "" : "s"} learned this week.`
          : "Log a topic or your weight to build this week's recap."}
      </p>
    </section>
  );
}
