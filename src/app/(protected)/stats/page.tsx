import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { BarChart3, Dumbbell, Droplet, Scale, BookCheck } from "lucide-react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { daysAgo } from "@/lib/topics/progress";
import { StatTile, StatRow } from "@/components/charts/StatTile";
import { WeightChart } from "@/components/body/WeightChart";
import { WaterChart } from "@/components/water/WaterChart";
import { WorkoutsChart } from "@/components/stats/WorkoutsChart";

function dayKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export default async function StatsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");
  const userId = session.user.id;

  const thirtyDaysAgo = daysAgo(30);

  const [bodyLogs, waterLogs, workoutLogs, topicProgress] = await Promise.all([
    prisma.bodyLog.findMany({
      where: { userId, loggedAt: { gte: thirtyDaysAgo } },
      orderBy: { loggedAt: "asc" },
    }),
    prisma.waterLog.findMany({
      where: { userId, loggedAt: { gte: thirtyDaysAgo } },
      orderBy: { loggedAt: "asc" },
    }),
    prisma.workoutLog.findMany({
      where: { userId, completedAt: { gte: thirtyDaysAgo } },
      orderBy: { completedAt: "asc" },
    }),
    prisma.topicProgress.findMany({
      where: { userId, completedAt: { gte: thirtyDaysAgo } },
    }),
  ]);

  const weightChartData = bodyLogs.map((log) => ({
    x: log.loggedAt.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
    y: log.weightKg,
  }));
  const weightChange =
    bodyLogs.length > 1 ? bodyLogs[bodyLogs.length - 1].weightKg - bodyLogs[0].weightKg : null;

  const waterByDay = new Map<string, number>();
  for (const log of waterLogs) {
    const key = dayKey(log.loggedAt);
    waterByDay.set(key, (waterByDay.get(key) ?? 0) + log.amountMl);
  }
  const waterChartData = Array.from(waterByDay.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, amountMl]) => ({
      x: new Date(key).toLocaleDateString(undefined, { month: "short", day: "numeric" }),
      y: amountMl,
    }));
  const waterDaysLogged = waterByDay.size;
  const waterAvgMl = waterDaysLogged > 0
    ? Array.from(waterByDay.values()).reduce((sum, ml) => sum + ml, 0) / waterDaysLogged
    : 0;

  const workoutsByWeek: { label: string; value: number }[] = Array.from({ length: 4 }, (_, i) => {
    const weeksAgo = 3 - i;
    const start = daysAgo((weeksAgo + 1) * 7 - 1);
    start.setHours(0, 0, 0, 0);
    const end = daysAgo(weeksAgo * 7);
    end.setHours(23, 59, 59, 999);
    const count = workoutLogs.filter((log) => log.completedAt >= start && log.completedAt <= end).length;
    return { label: weeksAgo === 0 ? "This wk" : `${weeksAgo} wk${weeksAgo > 1 ? "s" : ""} ago`, value: count };
  });

  const topicsCompleted = topicProgress.length;
  const scoredQuizzes = topicProgress.filter((p) => p.quizScore !== null);
  const avgQuizScore = scoredQuizzes.length
    ? scoredQuizzes.reduce((sum, p) => sum + (p.quizScore ?? 0), 0) / scoredQuizzes.length
    : 0;

  const hasAnyData =
    bodyLogs.length > 0 || waterLogs.length > 0 || workoutLogs.length > 0 || topicProgress.length > 0;

  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-12">
      <span className="glow-cyan inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-white">
        <BarChart3 className="h-5 w-5" aria-hidden />
      </span>
      <h1 className="mt-3 text-3xl font-bold tracking-tight">
        <span className="text-gradient">Your Monthly Stats</span>
      </h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300">
        Everything you&apos;ve logged over the last 30 days, in one place.
      </p>

      {!hasAnyData ? (
        <div className="glass mt-6 rounded-2xl p-5 text-center text-sm text-slate-500 dark:text-slate-400">
          No activity logged in the last 30 days yet. Track your weight, water, or workouts to see stats here.
        </div>
      ) : (
        <>
          <div className="mt-6">
            <StatRow>
              <StatTile
                label="Workouts logged"
                value={workoutLogs.length}
                sub="Last 30 days"
              />
              <StatTile
                label="Water avg / day"
                value={`${Math.round(waterAvgMl).toLocaleString()}ml`}
                sub={`${waterDaysLogged} day${waterDaysLogged === 1 ? "" : "s"} logged`}
              />
              <StatTile
                label="Weight change"
                value={weightChange !== null ? `${weightChange > 0 ? "+" : ""}${weightChange.toFixed(1)}kg` : "—"}
                sub={`${bodyLogs.length} log${bodyLogs.length === 1 ? "" : "s"}`}
              />
              <StatTile
                label="Topics completed"
                value={topicsCompleted}
                sub={scoredQuizzes.length ? `Avg quiz ${avgQuizScore.toFixed(1)}/3` : "No quizzes yet"}
              />
            </StatRow>
          </div>

          <div className="mt-6">
            <WorkoutsChart data={workoutsByWeek} />
          </div>

          {weightChartData.length >= 2 ? (
            <div className="mt-6">
              <WeightChart
                data={weightChartData}
                subtitle={
                  weightChange !== null
                    ? `${weightChange > 0 ? "+" : ""}${weightChange.toFixed(1)}kg over the last 30 days`
                    : undefined
                }
              />
            </div>
          ) : (
            <EmptyChartNote icon={Scale} text="Log your weight on at least 2 days to see a trend chart." />
          )}

          {waterChartData.length >= 2 ? (
            <div className="mt-6">
              <WaterChart data={waterChartData} />
            </div>
          ) : (
            <EmptyChartNote icon={Droplet} text="Log water on at least 2 days to see a trend chart." />
          )}

          {workoutLogs.length === 0 ? (
            <EmptyChartNote icon={Dumbbell} text="Complete a workout from your plan to start tracking training volume." />
          ) : null}

          {topicsCompleted === 0 ? (
            <EmptyChartNote icon={BookCheck} text="Finish a topic in the library to see it reflected here." />
          ) : null}
        </>
      )}
    </div>
  );
}

function EmptyChartNote({ icon: Icon, text }: { icon: typeof Scale; text: string }) {
  return (
    <div className="glass mt-6 flex items-center gap-2 rounded-2xl p-4 text-sm text-slate-500 dark:text-slate-400">
      <Icon className="h-4 w-4 shrink-0 text-cyan-500" aria-hidden />
      {text}
    </div>
  );
}
