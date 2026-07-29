"use client";

import { ChartShell } from "@/components/charts/ChartShell";
import { LineChart } from "@/components/charts/LineChart";

export function WeightChart({
  data,
  subtitle,
}: {
  data: { x: string; y: number }[];
  subtitle?: string;
}) {
  return (
    <ChartShell title="Your weight over time" subtitle={subtitle}>
      <LineChart
        yUnit="kg"
        yFormat={(v) => v.toFixed(1)}
        zeroBaseline={false}
        series={[{ label: "Weight", colorVar: "--viz-series-1", area: true, data }]}
      />
    </ChartShell>
  );
}
