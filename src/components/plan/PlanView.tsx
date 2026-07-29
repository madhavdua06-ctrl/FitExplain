"use client";

import Link from "next/link";
import { CalendarDays, Utensils, HeartPulse, BookOpen } from "lucide-react";
import { ModeText } from "@/components/ModeText";
import { StatTile, StatRow } from "@/components/charts/StatTile";
import { PrintButton } from "@/components/ui/PrintButton";
import { MarkWorkoutCompleteButton } from "@/components/plan/MarkWorkoutCompleteButton";
import { planExplanations } from "@/lib/plan/explanations";
import type { PlanResult } from "@/lib/plan/types";

const SPLIT_LABELS: Record<PlanResult["splitType"], string> = {
  FULL_BODY: "Full Body",
  UPPER_LOWER: "Upper / Lower",
  PUSH_PULL_LEGS: "Push / Pull / Legs",
};

const TOPIC_TITLES: Record<string, string> = {
  "progressive-overload": "Progressive Overload",
  "muscle-protein-synthesis": "How Muscle Grows",
  "caloric-deficit": "Caloric Deficit & Weight Loss",
  "vo2-max": "VO2 Max & Cardiovascular Fitness",
  "recovery-sleep": "Recovery & Sleep",
  hydration: "Hydration & Electrolytes",
};

const FOCUS_ACCENT: Record<string, string> = {
  "Full Body": "bg-emerald-500",
  "Upper Body": "bg-emerald-500",
  "Lower Body": "bg-indigo-500",
  Push: "bg-emerald-500",
  Pull: "bg-indigo-500",
  Legs: "bg-orange-500",
};

export function PlanView({
  plan,
  completedDayIndicesToday = [],
}: {
  plan: PlanResult;
  completedDayIndicesToday?: number[];
}) {
  const calorieValue =
    plan.nutrition.calorieDirection === "MAINTENANCE"
      ? "0%"
      : `${plan.nutrition.calorieAdjustmentPct > 0 ? "+" : ""}${plan.nutrition.calorieAdjustmentPct}%`;

  return (
    <div className="mx-auto max-w-3xl space-y-10 px-4 py-12">
      <section>
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="text-slate-900 dark:text-white">Your Plan: </span>
            <span className="text-gradient">{SPLIT_LABELS[plan.splitType]}</span>
          </h1>
          <PrintButton />
        </div>
        <div className="mt-4 space-y-2 text-slate-600 dark:text-slate-300">
          {plan.rationaleKeys.map((key) => {
            const explanation = planExplanations[key];
            if (!explanation) return null;
            return (
              <p key={key}>
                <ModeText simple={explanation.simple} scientific={explanation.scientific} />
              </p>
            );
          })}
        </div>

        <div className="mt-6">
          <StatRow>
            <StatTile label="Training days/wk" value={String(plan.weeklySchedule.length)} />
            <StatTile label="Calorie target" value={calorieValue} sub="vs. maintenance" />
            <StatTile
              label="Protein target"
              value={`${plan.nutrition.proteinPerKgMin}–${plan.nutrition.proteinPerKgMax}`}
              sub="g/kg bodyweight"
            />
            <StatTile label="Cardio" value={`${plan.cardio.sessionsPerWeek}x/wk`} />
          </StatRow>
        </div>
      </section>

      <section>
        <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900 dark:text-white">
          <CalendarDays className="h-5 w-5 text-cyan-500" aria-hidden />
          Weekly Schedule
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {plan.weeklySchedule.map((day) => (
            <div key={day.day} className="glass relative overflow-hidden rounded-xl p-4 pl-5">
              <span
                className={`absolute inset-y-0 left-0 w-1 ${FOCUS_ACCENT[day.focus] ?? "bg-emerald-500"}`}
                aria-hidden
              />
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Day {day.day}: {day.focus}
              </h3>
              <ul className="mt-2 space-y-1 text-sm text-slate-600 dark:text-slate-300">
                {day.exercises.map((ex) => (
                  <li key={ex.name}>
                    <span className="font-medium text-slate-800 dark:text-slate-100">{ex.name}</span>{" "}
                    — {ex.sets} sets x {ex.reps}
                    {ex.notes ? (
                      <span className="block text-xs text-amber-600 dark:text-amber-400">{ex.notes}</span>
                    ) : null}
                  </li>
                ))}
              </ul>
              <MarkWorkoutCompleteButton
                dayIndex={day.day}
                dayLabel={day.focus}
                completedToday={completedDayIndicesToday.includes(day.day)}
              />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900 dark:text-white">
          <Utensils className="h-5 w-5 text-orange-500" aria-hidden />
          Nutrition
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          {plan.nutrition.calorieDirection === "DEFICIT"
            ? `Aim for roughly ${Math.abs(plan.nutrition.calorieAdjustmentPct)}% below your maintenance calories.`
            : plan.nutrition.calorieDirection === "SURPLUS"
              ? `Aim for roughly ${plan.nutrition.calorieAdjustmentPct}% above your maintenance calories.`
              : "Aim to eat around your maintenance calories."}{" "}
          Target {plan.nutrition.proteinPerKgMin}–{plan.nutrition.proteinPerKgMax}g of protein per kg of
          bodyweight.
        </p>
      </section>

      <section>
        <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900 dark:text-white">
          <HeartPulse className="h-5 w-5 text-fuchsia-500" aria-hidden />
          Cardio
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">{plan.cardio.style}</p>
      </section>

      <section>
        <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900 dark:text-white">
          <BookOpen className="h-5 w-5 text-cyan-500" aria-hidden />
          Learn More
        </h2>
        <ul className="mt-2 flex flex-wrap gap-2">
          {plan.relatedTopicSlugs.map((slug) => (
            <li key={slug}>
              <Link
                href={`/topics/${slug}`}
                className="glass rounded-full px-3 py-1 text-sm text-slate-700 transition hover:border-cyan-400/50 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400"
              >
                {TOPIC_TITLES[slug] ?? slug}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="no-print border-t border-slate-200 pt-6 dark:border-white/10">
        <Link
          href="/onboarding"
          className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-400"
        >
          Retake questionnaire
        </Link>
      </div>
    </div>
  );
}
