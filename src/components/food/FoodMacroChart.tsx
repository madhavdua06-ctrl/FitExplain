"use client";

import { ChartShell } from "@/components/charts/ChartShell";
import { LineChart } from "@/components/charts/LineChart";

export function FoodMacroChart({ data }: { data: { x: string; y: number }[] }) {
  return (
    <ChartShell title="Calories over time" subtitle={`${data.length} days logged`}>
      <LineChart
        yUnit="kcal"
        yFormat={(v) => Math.round(v).toLocaleString()}
        zeroBaseline={true}
        series={[{ label: "Calories", colorVar: "--viz-series-1", area: true, data }]}
      />
    </ChartShell>
  );
}
