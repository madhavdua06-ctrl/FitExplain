"use client";

import { ChartShell, LegendItem } from "@/components/charts/ChartShell";
import { LineChart } from "@/components/charts/LineChart";
import { BarChart } from "@/components/charts/BarChart";

function chartsFor(slug: string): React.ReactNode[] {
  switch (slug) {
    case "progressive-overload":
      return [
        <ChartShell
          key="overload"
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
        </ChartShell>,
      ];

    case "muscle-protein-synthesis":
      return [
        <ChartShell
          key="mps-timecourse"
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
        </ChartShell>,
        <ChartShell
          key="protein-plateau"
          title="Protein intake vs. muscle gain"
          subtitle="Illustrative curve shaped to the real finding: gains plateau around 1.6g/kg/day (95% CI up to 2.2g/kg/day) — Morton et al. 2018."
        >
          <LineChart
            yUnit="%"
            yFormat={(v) => `${v}`}
            zeroBaseline={false}
            series={[
              {
                label: "Relative muscle gain",
                colorVar: "--viz-series-1",
                area: true,
                data: [
                  { x: "0.5 g/kg", y: 40 },
                  { x: "1.0 g/kg", y: 75 },
                  { x: "1.6 g/kg", y: 100 },
                  { x: "2.2 g/kg", y: 104 },
                  { x: "3.0 g/kg", y: 105 },
                ],
              },
            ]}
          />
        </ChartShell>,
      ];

    case "caloric-deficit":
      return [
        <ChartShell
          key="deficit"
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
        </ChartShell>,
      ];

    case "vo2-max":
      return [
        <ChartShell
          key="vo2-ranges"
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
        </ChartShell>,
        <ChartShell
          key="vo2-personalized"
          title="VO2max gain: personalized vs. standardized training"
          subtitle="Real 13-week RCT results (n=109) — Weatherwax et al. 2024. Personalized = threshold-based; standardized = generic heart-rate-reserve program."
        >
          <BarChart
            yUnit=" mL/kg/min"
            data={[
              { label: "Standardized", value: 3.1, muted: true },
              { label: "Personalized", value: 4.85 },
            ]}
          />
        </ChartShell>,
      ];

    case "recovery-sleep":
      return [
        <ChartShell
          key="gh-release"
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
        </ChartShell>,
      ];

    case "hydration":
      return [
        <ChartShell
          key="hydration-decrement"
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
        </ChartShell>,
      ];

    case "supplements-that-work":
      return [
        <ChartShell
          key="supplement-labels"
          title="Label accuracy in tested performance supplements"
          subtitle="Real results, but narrow scope: 57 products tested for 5 specific botanical/stimulant ingredients — Cohen et al. 2023, JAMA Network Open. Not a survey of supplements broadly."
        >
          <BarChart
            yUnit="%"
            data={[
              { label: "Accurately labeled", value: 11 },
              { label: "Prohibited stimulant found", value: 12 },
              { label: "No listed ingredient detected", value: 40 },
              { label: "Inaccurately labeled (any)", value: 89, muted: true },
            ]}
          />
        </ChartShell>,
      ];

    case "macronutrients-101":
      return [
        <ChartShell
          key="kcal-density"
          title="Energy density by macronutrient"
          subtitle="Kcal per gram — established nutrition science constants, not estimates."
        >
          <BarChart
            yUnit=" kcal/g"
            data={[
              { label: "Protein", value: 4 },
              { label: "Carbs", value: 4 },
              { label: "Alcohol", value: 7 },
              { label: "Fat", value: 9 },
            ]}
          />
        </ChartShell>,
      ];

    case "doms-muscle-soreness":
      return [
        <ChartShell
          key="doms-timecourse"
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
        </ChartShell>,
      ];

    case "habit-formation":
      return [
        <ChartShell
          key="automaticity"
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
        </ChartShell>,
      ];

    case "injury-prevention":
      return [
        <ChartShell
          key="injury-rate"
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
        </ChartShell>,
      ];

    case "resistance-vs-cardio":
      return [
        <ChartShell
          key="hearty-trial"
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
        </ChartShell>,
        <ChartShell
          key="fat-mass-meta"
          title="Extra fat-mass loss vs. resistance training alone"
          subtitle="Real 2025 meta-analysis of trials ≥10 weeks, general adult population — Lafontant et al. Body-fat percentage did not differ significantly between groups; this chart is absolute fat mass specifically."
        >
          <BarChart
            yUnit=" kg"
            data={[
              { label: "Aerobic", value: 1.06 },
              { label: "Combined", value: 1.09 },
            ]}
          />
        </ChartShell>,
      ];

    default:
      return [];
  }
}

export function TopicChart({ slug }: { slug: string }) {
  const charts = chartsFor(slug);
  if (!charts.length) return null;
  return <div className="space-y-6">{charts}</div>;
}
