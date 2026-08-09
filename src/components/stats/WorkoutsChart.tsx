"use client";

import { ChartShell } from "@/components/charts/ChartShell";
import { BarChart } from "@/components/charts/BarChart";

export function WorkoutsChart({ data }: { data: { label: string; value: number }[] }) {
  return (
    <ChartShell title="Workouts per week" subtitle="Last 4 weeks">
      <BarChart data={data} yFormat={(v) => String(Math.round(v))} />
    </ChartShell>
  );
}
