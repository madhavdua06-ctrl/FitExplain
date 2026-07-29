import { Droplet } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { RadialProgress } from "@/components/charts/RadialProgress";
import { computeWaterGoalMl } from "@/lib/water/goal";
import { LogWaterForm } from "./LogWaterForm";
import { WaterChart } from "./WaterChart";
import { EnableRemindersButton } from "./EnableRemindersButton";

export async function WaterTracker({ userId }: { userId: string }) {
  const fourteenDaysAgo = new Date();
  fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);
  fourteenDaysAgo.setHours(0, 0, 0, 0);

  const [logs, latestBodyLog] = await Promise.all([
    prisma.waterLog.findMany({
      where: { userId, loggedAt: { gte: fourteenDaysAgo } },
      orderBy: { loggedAt: "asc" },
    }),
    prisma.bodyLog.findFirst({ where: { userId }, orderBy: { loggedAt: "desc" } }),
  ]);

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const todaysTotal = logs
    .filter((log) => log.loggedAt >= startOfToday)
    .reduce((sum, log) => sum + log.amountMl, 0);

  const goalMl = computeWaterGoalMl(latestBodyLog?.weightKg);
  const percent = goalMl > 0 ? (todaysTotal / goalMl) * 100 : 0;

  const totalsByDay = new Map<string, number>();
  for (const log of logs) {
    const key = log.loggedAt.toISOString().slice(0, 10);
    totalsByDay.set(key, (totalsByDay.get(key) ?? 0) + log.amountMl);
  }
  const chartData = Array.from(totalsByDay.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, amountMl]) => ({
      x: new Date(key).toLocaleDateString(undefined, { month: "short", day: "numeric" }),
      y: amountMl,
    }));

  return (
    <section className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
          <Droplet className="h-4 w-4 text-cyan-500" aria-hidden />
          Water Tracker
        </h2>
        <EnableRemindersButton />
      </div>

      <div className="mt-4 flex justify-center">
        <RadialProgress
          percent={percent}
          label="Today's water"
          sublabel={`${Math.round(todaysTotal)} / ${Math.round(goalMl)}ml`}
          colorVar="--viz-series-1"
          icon={<Droplet className="h-4 w-4" />}
        />
      </div>

      <div className="mt-4">
        <LogWaterForm />
      </div>

      {chartData.length >= 2 ? (
        <div className="mt-6">
          <WaterChart data={chartData} />
        </div>
      ) : (
        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
          Log water on at least 2 days to see your trend chart.
        </p>
      )}
    </section>
  );
}
