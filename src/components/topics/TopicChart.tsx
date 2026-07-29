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
                  { x: "Wk 1", y: 0, note: "Baseline strength before any added stimulus." },
                  { x: "Wk 3", y: 4, note: "Early gains come fast — mostly neural efficiency, not new muscle yet." },
                  { x: "Wk 5", y: 8, note: "Steady climb as load, reps, or sets keep rising week over week." },
                  { x: "Wk 7", y: 13, note: "Gains keep compounding because the stimulus never stalls." },
                  { x: "Wk 9", y: 17, note: "The gap vs. a static routine is now clearly widening." },
                  { x: "Wk 11", y: 21, note: "Near the end of the block — sustained rising demand still paying off." },
                  { x: "Wk 12", y: 23, note: "12-week total: roughly 23% relative strength gain in this model." },
                ],
              },
              {
                label: "Same load every week",
                colorVar: "--viz-text-muted",
                data: [
                  { x: "Wk 1", y: 0, note: "Same starting point as the overload group." },
                  { x: "Wk 3", y: 3, note: "A brief initial bump — still some adaptation to a new routine." },
                  { x: "Wk 5", y: 4, note: "Progress has already nearly stalled without a rising stimulus." },
                  { x: "Wk 7", y: 4, note: "Flat — the body has no new signal to keep adapting to." },
                  { x: "Wk 9", y: 4, note: "This is the plateau progressive overload is designed to avoid." },
                  { x: "Wk 11", y: 4, note: "Still flat after 11 weeks of unchanging demand." },
                  { x: "Wk 12", y: 4, note: "Ends near +4% — a fraction of what rising overload produced." },
                ],
              },
            ]}
          />
        </ChartShell>,
        <ChartShell
          key="periodization-effect"
          title="Periodization's effect on strength gains (1RM)"
          subtitle="Real meta-analytic effect size across resistance-training studies, both statistically significant (p<0.001) — Williams et al. 2017."
        >
          <BarChart
            yUnit=" ES"
            data={[
              {
                label: "Raw effect size",
                value: 0.43,
                note: "The initial pooled effect size favoring periodized over non-periodized training, before correcting for publication bias.",
              },
              {
                label: "Bias-corrected",
                value: 0.23,
                muted: true,
                note: "After removing outlier studies flagged by bias testing — smaller, but still a real, statistically significant edge.",
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
                  { x: "0h", y: 0, note: "Right after eating — the amino-acid signal hasn't kicked in yet." },
                  { x: "1h", y: 45, note: "MPS is already rising fast as leucine crosses the per-meal threshold." },
                  { x: "2h", y: 90, note: "Approaching peak — most of the meal's protein is now being put to use." },
                  { x: "3h", y: 100, note: "Peak muscle protein synthesis for this meal." },
                  { x: "4h", y: 70, note: "Response starts tapering as amino acid availability declines." },
                  { x: "5h", y: 30, note: "Mostly back toward baseline — this is part of why spacing meals matters." },
                  { x: "6h", y: 10, note: "Response has nearly fully faded — a good time for the next protein dose." },
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
                  { x: "0.5 g/kg", y: 40, note: "Well below typical needs — muscle-building potential is left on the table here." },
                  { x: "1.0 g/kg", y: 75, note: "Better, but still under the intake most lifters should target." },
                  { x: "1.6 g/kg", y: 100, note: "The point estimate where added protein stops producing meaningfully more gains." },
                  { x: "2.2 g/kg", y: 104, note: "Upper end of the 95% CI — only marginal extra benefit over 1.6g/kg." },
                  { x: "3.0 g/kg", y: 105, note: "Well past the plateau — extra protein here isn't harmful, just unnecessary for muscle gain." },
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
                  { x: "Wk 0", y: 0, note: "Starting weight, before the deficit begins." },
                  { x: "Wk 2", y: 1.8, note: "Early loss often runs a bit faster — partly water weight." },
                  { x: "Wk 4", y: 3.3, note: "Still tracking close to the naive projection at this point." },
                  { x: "Wk 6", y: 4.5, note: "Adaptive thermogenesis is starting to slow real-world progress." },
                  { x: "Wk 8", y: 5.4, note: "The gap vs. the straight-line projection keeps widening." },
                  { x: "Wk 10", y: 6.1, note: "Metabolic adaptation means fewer calories are now needed to maintain the deficit." },
                  { x: "Wk 12", y: 6.6, note: "12-week total — well under naive math's predicted 12%, and that's expected." },
                ],
              },
              {
                label: "Naive projection",
                colorVar: "--viz-text-muted",
                data: [
                  { x: "Wk 0", y: 0, note: "Same starting point." },
                  { x: "Wk 2", y: 2, note: "Straight-line math: deficit ÷ 7700 kcal per kg fat, no adaptation." },
                  { x: "Wk 4", y: 4, note: "This line assumes metabolism never adjusts — it always does in reality." },
                  { x: "Wk 6", y: 6, note: "Naive projections like this are why weight loss can feel 'behind schedule.'" },
                  { x: "Wk 8", y: 8, note: "Still just extrapolating the original deficit with no slowdown." },
                  { x: "Wk 10", y: 10, note: "The widening gap here is the real cost of ignoring adaptation." },
                  { x: "Wk 12", y: 12, note: "Naive math predicts double the actual 12-week result." },
                ],
              },
            ]}
          />
        </ChartShell>,
        <ChartShell
          key="metabolic-adaptation"
          title="Resting metabolic rate suppression below original baseline"
          subtitle="Real data, The Biggest Loser contestants: competition finale vs. 6 years later. Raw RMR decrease, not adjusted for body-composition change — Fothergill et al. 2016."
        >
          <BarChart
            yUnit=" kcal/day"
            data={[
              {
                label: "At competition finale",
                value: 610,
                muted: true,
                note: "Resting metabolic rate right after the extreme weight loss — already well below the original baseline.",
              },
              {
                label: "6 years later",
                value: 704,
                note: "Even after most weight was regained, RMR suppression didn't recover — it actually deepened slightly.",
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
              { label: "Sedentary", value: 35, note: "Typical for an inactive adult doing little to no structured cardio." },
              { label: "Recreational", value: 45, note: "Consistent with regular casual cardio a few times a week." },
              { label: "Trained", value: 55, note: "Reflects structured endurance training over months to years." },
              { label: "Elite endurance", value: 75, note: "Elite endurance athletes — genetics plus years of specific training." },
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
              {
                label: "Standardized",
                value: 3.1,
                muted: true,
                note: "A generic heart-rate-reserve program — real gains, but noticeably smaller.",
              },
              {
                label: "Personalized",
                value: 4.85,
                note: "Training intensity individualized to each person's own physiological thresholds — roughly 56% more gain.",
              },
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
                  { x: "0h", y: 1, note: "Just after falling asleep — baseline secretion." },
                  { x: "1h", y: 4, note: "Rising fast as the first slow-wave (deep) sleep episode begins." },
                  { x: "2h", y: 5, note: "Peak growth hormone pulse — the biggest release of the night." },
                  { x: "3h", y: 2, note: "Sharp drop-off after the first deep-sleep window closes." },
                  { x: "4h", y: 1.5, note: "Secretion has mostly normalized by this point." },
                  { x: "5h", y: 1, note: "Back near baseline — later sleep cycles release far less GH." },
                  { x: "6h", y: 1, note: "Staying low — this is why cutting sleep short at the front costs the most." },
                  { x: "7h", y: 0.8, note: "Minimal additional GH release this late in the night." },
                  { x: "8h", y: 0.5, note: "Lowest point, near waking — most of the night's repair signal already happened hours ago." },
                ],
              },
            ]}
          />
        </ChartShell>,
        <ChartShell
          key="sleep-testosterone"
          title="Daytime testosterone after 1 week of sleep restriction"
          subtitle="Real RCT data, healthy young men: 10-hour vs. 5-hour nightly sleep opportunities — Leproult & Van Cauter 2011, JAMA."
        >
          <BarChart
            yUnit=" nmol/L"
            data={[
              {
                label: "10-hr sleep (baseline)",
                value: 18.4,
                note: "Daytime testosterone after a stretch of full, unrestricted sleep.",
              },
              {
                label: "5-hr sleep (restricted)",
                value: 16.5,
                muted: true,
                note: "Just one week of short sleep — a 10-15% drop, comparable to roughly a decade of aging.",
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
                  { x: "0%", y: 0, note: "Fully hydrated — no measurable performance cost." },
                  { x: "1%", y: 2, note: "Mild fluid loss — often not yet noticeable subjectively." },
                  { x: "2%", y: 5, note: "ACSM's commonly cited threshold where decrements start reliably appearing." },
                  { x: "3%", y: 9, note: "The decrement curve is accelerating, not flat, from here on." },
                  { x: "4%", y: 14, note: "Meaningful performance cost — cardiovascular strain and thermoregulation are both compromised." },
                  { x: "5%", y: 20, note: "Substantial dehydration — a fifth of performance capacity lost in this illustrative model." },
                ],
              },
            ]}
          />
        </ChartShell>,
        <ChartShell
          key="sweat-rate-range"
          title="Sweat rate range across individuals"
          subtitle="Real reported range for whole-body sweat rate during exercise — Baker 2017. Genetics, heat acclimatization, fitness, body size, and sex all drive this variability."
        >
          <BarChart
            yUnit=" L/hr"
            data={[
              { label: "Lower end", value: 0.5, note: "Typical low end for a smaller, less heat-acclimated person in a cooler session." },
              { label: "Higher end", value: 2.0, note: "Well-acclimated, larger, or high-intensity athletes can sweat this much or more per hour." },
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
              {
                label: "Accurately labeled",
                value: 11,
                note: "Only about 1 in 9 tested products matched their label for all 5 tested ingredients.",
              },
              {
                label: "Prohibited stimulant found",
                value: 12,
                note: "Roughly 1 in 8 products contained a banned stimulant not disclosed on the label.",
              },
              {
                label: "No listed ingredient detected",
                value: 40,
                note: "A listed botanical/stimulant ingredient was simply missing from the actual product in 40% of cases.",
              },
              {
                label: "Inaccurately labeled (any)",
                value: 89,
                muted: true,
                note: "The overall failure rate — inaccurate for at least one of the 5 tested ingredients.",
              },
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
              { label: "Protein", value: 4, note: "Same energy density as carbs, but used mainly for tissue repair, not fuel." },
              { label: "Carbs", value: 4, note: "The body's preferred quick-energy source, especially for hard exercise." },
              { label: "Alcohol", value: 7, note: "Often overlooked in calorie counts — nearly double protein or carbs per gram." },
              { label: "Fat", value: 9, note: "More than double protein or carbs — why fat-heavy foods add up fast." },
            ]}
          />
        </ChartShell>,
        <ChartShell
          key="thermic-effect"
          title="Thermic effect of food, by macronutrient"
          subtitle="Real data — share of each macronutrient's own calories spent on digestion (upper end of each reported range) — Westerterp 2004."
        >
          <BarChart
            yUnit="%"
            data={[
              { label: "Fat", value: 3, muted: true, note: "The least metabolically 'expensive' macro to digest — almost all its calories are usable." },
              { label: "Carbohydrate", value: 10, note: "A moderate digestive cost — some energy is spent processing it before it's usable." },
              { label: "Protein", value: 30, note: "The most expensive to digest — up to 30% of its calories go toward processing it." },
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
                  { x: "0h", y: 0, note: "Right after the workout — soreness hasn't set in yet, since it's inflammation-driven, not immediate." },
                  { x: "24h", y: 6, note: "Soreness is climbing as the inflammatory repair response builds." },
                  { x: "48h", y: 8, note: "Typical peak of DOMS — right in the 24-72 hour window research describes." },
                  { x: "72h", y: 5, note: "Starting to fade as repair processes wind down." },
                  { x: "96h", y: 2, note: "Mostly resolved for most people by this point." },
                  { x: "120h", y: 1, note: "Nearly gone — the repeated-bout effect means it'll be milder next time." },
                ],
              },
            ]}
          />
        </ChartShell>,
        <ChartShell
          key="foam-rolling-effect"
          title="Foam rolling's soreness-reduction effect, by time post-exercise"
          subtitle="Real effect size (SMD) from a 2024 meta-analysis of 16 RCTs — larger = greater reduction in soreness. Zhou et al. 2024."
        >
          <LineChart
            yUnit=""
            yFormat={(v) => `${v}`}
            series={[
              {
                label: "Reduction effect size",
                colorVar: "--viz-series-1",
                area: true,
                data: [
                  { x: "Immediate", y: 0.38, note: "Smallest effect — foam rolling right after exercise helps least." },
                  { x: "24h", y: 0.53, note: "A meaningfully larger benefit rolling out a day after training." },
                  { x: "48h", y: 0.77, note: "The largest effect in this meta-analysis — right around DOMS's usual peak." },
                  { x: "72h", y: 0.67, note: "Still a strong effect as soreness begins to fade on its own." },
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
                  { x: "Day 1", y: 5, note: "Brand new routine — still requires full conscious effort." },
                  { x: "Day 14", y: 25, note: "Two weeks in — nowhere near the mythical '21 days,' and that's normal." },
                  { x: "Day 30", y: 50, note: "Halfway to feeling automatic, roughly a month in." },
                  { x: "Day 45", y: 68, note: "Getting noticeably easier, but still short of the median plateau." },
                  { x: "Day 66", y: 82, note: "The median day habits become automatic, per Lally et al. 2010." },
                  { x: "Day 90", y: 92, note: "Past the median — automaticity is now close to its individual ceiling." },
                  { x: "Day 120", y: 96, note: "Near full automaticity — the habit now largely runs itself." },
                ],
              },
            ]}
          />
        </ChartShell>,
        <ChartShell
          key="habit-frequency-dosage"
          title="Reaching habit formation by week 6, by exercise frequency"
          subtitle="Real data, new gym members: ≥4x/week vs. <4x/week in their first 6 weeks — Kaushal & Rhodes 2015."
        >
          <BarChart
            yUnit="%"
            data={[
              {
                label: "<4x/week",
                value: 44.8,
                muted: true,
                note: "Lower early-weeks frequency — less than half reported the habit had formed by week 6.",
              },
              {
                label: "≥4x/week",
                value: 61.5,
                note: "Training at least 4x/week in the first 6 weeks meaningfully raised the odds of habit formation.",
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
              { label: "Control", value: 100, muted: true, note: "Baseline injury rate with no structured strength training — indexed to 100." },
              { label: "Strength training", value: 30, note: "Less than a third of the control group's injury rate — one of the strongest effects in this literature." },
            ]}
          />
        </ChartShell>,
        <ChartShell
          key="acwr-sweet-spot"
          title="Injury risk by training-load ratio (ACWR)"
          subtitle="Illustrative curve shaped to Gabbett 2016's reported pattern: risk is lowest in the ~0.8–1.3 'sweet spot' and rises sharply outside it."
        >
          <LineChart
            yUnit=""
            yFormat={(v) => `${v}`}
            series={[
              {
                label: "Relative injury risk",
                colorVar: "--viz-series-2",
                area: true,
                data: [
                  { x: "0.5", y: 70, note: "Training far below your usual chronic load — undertraining also raises risk, since tissue isn't well conditioned." },
                  { x: "0.8", y: 25, note: "Entering the 'sweet spot' — acute load stays close to your rolling average." },
                  { x: "1.0", y: 15, note: "Lowest-risk point — this week's load matches your chronic baseline almost exactly." },
                  { x: "1.3", y: 20, note: "Still within the safe zone, near the upper edge of the sweet spot." },
                  { x: "1.6", y: 55, note: "A meaningful spike above chronic load — risk is climbing fast here." },
                  { x: "2.0", y: 85, note: "A large, sudden jump in training load — the classic 'too much too soon' injury pattern." },
                ],
              },
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
              { label: "Control", value: 0.3, muted: true, note: "No structured training — minimal body-fat change over 22 weeks." },
              { label: "Aerobic only", value: 1.1, note: "Cardio alone produced a real, but comparatively modest, reduction." },
              { label: "Combined", value: 1.4, note: "Aerobic + resistance training together — better than aerobic alone in this trial." },
              { label: "Resistance only", value: 1.6, note: "The single largest body-fat-percentage drop of any group in this trial." },
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
              { label: "Aerobic", value: 1.06, note: "Extra absolute fat mass lost compared to resistance training alone, in adults." },
              { label: "Combined", value: 1.09, note: "Aerobic + resistance training's extra fat-mass edge over resistance alone — similar to aerobic's edge." },
            ]}
          />
        </ChartShell>,
      ];

    case "vitamins-and-minerals":
      return [
        <ChartShell
          key="under-consumed-nutrients"
          title="Commonly under-consumed nutrients"
          subtitle="Illustrative — approximate share of U.S. adults falling short of daily targets, based on dietary-survey patterns."
        >
          <BarChart
            yUnit="%"
            data={[
              { label: "Vitamin D", value: 95, note: "The single most commonly under-consumed nutrient, largely due to limited sun exposure and few dietary sources." },
              { label: "Calcium", value: 60, note: "Especially common in adults who consume little dairy or fortified alternatives." },
              { label: "Potassium", value: 88, note: "Under-consumed even though it's found in many common foods like potatoes and bananas." },
              { label: "Iron", value: 20, muted: true, note: "Shortfalls concentrate heavily in menstruating women rather than the population overall." },
              { label: "Vitamin B12", value: 10, muted: true, note: "Low overall, but rises sharply in people eating a fully plant-based diet." },
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
