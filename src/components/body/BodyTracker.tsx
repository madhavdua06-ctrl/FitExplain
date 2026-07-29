import { Scale } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { LogWeightForm } from "./LogWeightForm";
import { WeightChart } from "./WeightChart";

export async function BodyTracker({ userId }: { userId: string }) {
  const logs = await prisma.bodyLog.findMany({
    where: { userId },
    orderBy: { loggedAt: "asc" },
  });

  const latest = logs[logs.length - 1];
  const first = logs[0];
  const change = latest && first && logs.length > 1 ? latest.weightKg - first.weightKg : null;

  const chartData = logs.map((log) => ({
    x: log.loggedAt.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
    y: log.weightKg,
  }));

  return (
    <section className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
          <Scale className="h-4 w-4 text-cyan-500" aria-hidden />
          Body Weight Tracker
        </h2>
        {latest ? (
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Latest: <strong className="text-slate-900 dark:text-white">{latest.weightKg}kg</strong>
          </span>
        ) : null}
      </div>

      <div className="mt-4">
        <LogWeightForm />
      </div>

      {logs.length >= 2 ? (
        <div className="mt-6">
          <WeightChart
            data={chartData}
            subtitle={
              change !== null
                ? `${change > 0 ? "+" : ""}${change.toFixed(1)}kg since your first log (${logs.length} entries)`
                : undefined
            }
          />
        </div>
      ) : (
        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
          Log at least 2 entries to see your trend chart.
        </p>
      )}
    </section>
  );
}
