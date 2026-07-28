"use client";

import { ChartShell, LegendItem } from "@/components/charts/ChartShell";
import { LineChart } from "@/components/charts/LineChart";
import { BarChart } from "@/components/charts/BarChart";

export function TopicChart({ slug }: { slug: string }) {
  switch (slug) {
    case "progressive-overload":
      return (
        <ChartShell
          title="Progressive overload vs. a static routine"
          subtitle="Illustrative model of relative strength over 12 weeks — individual results vary."
          legend={
            <>
              <LegendItem color="var(--viz-series-1)" label="Progressive overload" />
              <LegendItem color="var(--viz-text-muted)" label="Same load every week" />
            </>
          }
        >
          <LineChart
            yUnit="%"
            yFormat={(v) => `+${v}`}
            series={[
              {
                label: "Progressive overload",
                colorVar: "--viz-series-1",
                data: [
                  { x: "Wk 1", y: 0 },
                  { x: "Wk 3", y: 4 },
                  { x: "Wk 5", y: 8 },
                  { x: "Wk 7", y: 13 },
                  { x: "Wk 9", y: 17 },
                  { x: "Wk 11", y: 21 },
                  { x: "Wk 12", y: 23 },
                ],
              },
              {
                label: "Same load every week",
                colorVar: "--viz-text-muted",
                data: [
                  { x: "Wk 1", y: 0 },
                  { x: "Wk 3", y: 3 },
                  { x: "Wk 5", y: 4 },
                  { x: "Wk 7", y: 4 },
                  { x: "Wk 9", y: 4 },
                  { x: "Wk 11", y: 4 },
                  { x: "Wk 12", y: 4 },
                ],
              },
            ]}
          />
        </ChartShell>
      );

    case "muscle-protein-synthesis":
      return (
        <ChartShell
          title="Muscle protein synthesis after a protein-rich meal"
          subtitle="Generalized pattern from muscle biopsy research — timing varies by meal size and training status."
        >
          <LineChart
            yUnit="%"
            yFormat={(v) => `+${v}`}
            series={[
              {
                label: "MPS above baseline",
                colorVar: "--viz-series-1",
                area: true,
                data: [
                  { x: "0h", y: 0 },
                  { x: "1h", y: 45 },
                  { x: "2h", y: 90 },
                  { x: "3h", y: 100 },
                  { x: "4h", y: 70 },
                  { x: "5h", y: 30 },
                  { x: "6h", y: 10 },
                ],
              },
            ]}
          />
        </ChartShell>
      );

    case "caloric-deficit":
      return (
        <ChartShell
          title="Actual weight loss vs. a naive linear projection"
          subtitle="Illustrative model of a sustained ~18% deficit — metabolic adaptation slows real-world progress below a straight-line projection."
          legend={
            <>
              <LegendItem color="var(--viz-series-1)" label="Actual (with adaptation)" />
              <LegendItem color="var(--viz-text-muted)" label="Naive projection" />
            </>
          }
        >
          <LineChart
            yUnit="%"
            yFormat={(v) => `-${v}`}
            series={[
              {
                label: "Actual (with adaptation)",
                colorVar: "--viz-series-1",
                data: [
                  { x: "Wk 0", y: 0 },
                  { x: "Wk 2", y: 1.8 },
                  { x: "Wk 4", y: 3.3 },
                  { x: "Wk 6", y: 4.5 },
                  { x: "Wk 8", y: 5.4 },
                  { x: "Wk 10", y: 6.1 },
                  { x: "Wk 12", y: 6.6 },
                ],
              },
              {
                label: "Naive projection",
                colorVar: "--viz-text-muted",
                data: [
                  { x: "Wk 0", y: 0 },
                  { x: "Wk 2", y: 2 },
                  { x: "Wk 4", y: 4 },
                  { x: "Wk 6", y: 6 },
                  { x: "Wk 8", y: 8 },
                  { x: "Wk 10", y: 10 },
                  { x: "Wk 12", y: 12 },
                ],
              },
            ]}
          />
        </ChartShell>
      );

    case "vo2-max":
      return (
        <ChartShell
          title="Typical VO2 max by training status"
          subtitle="Illustrative approximate ranges, mL O2 · kg⁻¹ · min⁻¹ — actual norms vary substantially by age, sex, and testing protocol."
        >
          <BarChart
            yUnit=""
            data={[
              { label: "Sedentary", value: 35 },
              { label: "Recreational", value: 45 },
              { label: "Trained", value: 55 },
              { label: "Elite endurance", value: 75 },
            ]}
          />
        </ChartShell>
      );

    case "recovery-sleep":
      return (
        <ChartShell
          title="Growth hormone release across a night's sleep"
          subtitle="Generalized pattern — GH secretion peaks during early slow-wave (deep) sleep."
        >
          <LineChart
            yUnit=""
            yFormat={(v) => `${v}×`}
            series={[
              {
                label: "Relative GH secretion",
                colorVar: "--viz-series-1",
                area: true,
                data: [
                  { x: "0h", y: 1 },
                  { x: "1h", y: 4 },
                  { x: "2h", y: 5 },
                  { x: "3h", y: 2 },
                  { x: "4h", y: 1.5 },
                  { x: "5h", y: 1 },
                  { x: "6h", y: 1 },
                  { x: "7h", y: 0.8 },
                  { x: "8h", y: 0.5 },
                ],
              },
            ]}
          />
        </ChartShell>
      );

    case "hydration":
      return (
        <ChartShell
          title="Performance decrement by body-mass water loss"
          subtitle="Illustrative — reflects the general accelerating-decrement pattern reported in exercise-physiology research; exact figures vary by study, activity, and heat."
        >
          <LineChart
            yUnit="%"
            yFormat={(v) => `-${v}`}
            series={[
              {
                label: "Performance decrement",
                colorVar: "--viz-series-2",
                area: true,
                data: [
                  { x: "0%", y: 0 },
                  { x: "1%", y: 2 },
                  { x: "2%", y: 5 },
                  { x: "3%", y: 9 },
                  { x: "4%", y: 14 },
                  { x: "5%", y: 20 },
                ],
              },
            ]}
          />
        </ChartShell>
      );

    case "macronutrients-101":
      return (
        <ChartShell title="Energy density by macronutrient" subtitle="Kcal per gram — established nutrition science constants, not estimates.">
          <BarChart
            yUnit=" kcal/g"
            data={[
              { label: "Protein", value: 4 },
              { label: "Carbs", value: 4 },
              { label: "Alcohol", value: 7 },
              { label: "Fat", value: 9 },
            ]}
          />
        </ChartShell>
      );

    case "doms-muscle-soreness":
      return (
        <ChartShell
          title="Soreness intensity after a hard, unfamiliar workout"
          subtitle="Illustrative — reflects the typical rise-and-fall pattern; exact intensity and duration vary widely by person and exercise."
        >
          <LineChart
            yUnit=""
            yFormat={(v) => `${v}`}
            series={[
              {
                label: "Relative soreness",
                colorVar: "--viz-series-2",
                area: true,
                data: [
                  { x: "0h", y: 0 },
                  { x: "24h", y: 6 },
                  { x: "48h", y: 8 },
                  { x: "72h", y: 5 },
                  { x: "96h", y: 2 },
                  { x: "120h", y: 1 },
                ],
              },
            ]}
          />
        </ChartShell>
      );

    case "habit-formation":
      return (
        <ChartShell
          title="How automatic a new habit feels over time"
          subtitle="Illustrative curve shaped to match the real finding: automaticity plateaus at a median of 66 days (range 18–254) in controlled research."
        >
          <LineChart
            yUnit="%"
            yFormat={(v) => `${v}`}
            series={[
              {
                label: "Automaticity",
                colorVar: "--viz-series-1",
                area: true,
                data: [
                  { x: "Day 1", y: 5 },
                  { x: "Day 14", y: 25 },
                  { x: "Day 30", y: 50 },
                  { x: "Day 45", y: 68 },
                  { x: "Day 66", y: 82 },
                  { x: "Day 90", y: 92 },
                  { x: "Day 120", y: 96 },
                ],
              },
            ]}
          />
        </ChartShell>
      );

    case "injury-prevention":
      return (
        <ChartShell
          title="Relative sports-injury rate, by training group"
          subtitle="Index where the control group = 100. Reflects Lauersen et al. (2014): strength training reduced injuries to less than one-third of control rates."
        >
          <BarChart
            yUnit=""
            data={[
              { label: "Control", value: 100, muted: true },
              { label: "Strength training", value: 30 },
            ]}
          />
        </ChartShell>
      );

    case "resistance-vs-cardio":
      return (
        <ChartShell
          title="Body fat % reduction after 22 weeks, by training type"
          subtitle="Real intention-to-treat results from the HEARTY trial in obese adolescents — not a general-adult dataset, see caveat below."
        >
          <BarChart
            yUnit="%"
            data={[
              { label: "Control", value: 0.3, muted: true },
              { label: "Aerobic only", value: 1.1 },
              { label: "Combined", value: 1.4 },
              { label: "Resistance only", value: 1.6 },
            ]}
          />
        </ChartShell>
      );

    default:
      return null;
  }
}
