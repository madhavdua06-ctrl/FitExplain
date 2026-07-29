"use client";

import { ChartShell } from "@/components/charts/ChartShell";
import { LineChart } from "@/components/charts/LineChart";

export function WaterChart({ data }: { data: { x: string; y: number }[] }) {
  return (
    <ChartShell title="Your water intake over time" subtitle={`${data.length} days logged`}>
      <LineChart
        yUnit="ml"
        yFormat={(v) => Math.round(v).toLocaleString()}
        zeroBaseline={true}
        series={[{ label: "Water", colorVar: "--viz-series-1", area: true, data }]}
      />
    </ChartShell>
  );
}
