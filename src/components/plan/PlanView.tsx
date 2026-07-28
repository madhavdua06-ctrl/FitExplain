"use client";

import Link from "next/link";
import { CalendarDays, Utensils, HeartPulse, BookOpen } from "lucide-react";
import { ModeText } from "@/components/ModeText";
import { StatTile, StatRow } from "@/components/charts/StatTile";
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
  "Full Body": "border-l-emerald-500",
  "Upper Body": "border-l-emerald-500",
  "Lower Body": "border-l-indigo-500",
  Push: "border-l-emerald-500",
  Pull: "border-l-indigo-500",
  Legs: "border-l-orange-500",
};

export function PlanView({ plan }: { plan: PlanResult }) {
  const calorieValue =
    plan.nutrition.calorieDirection === "MAINTENANCE"
      ? "0%"
      : `${plan.nutrition.calorieAdjustmentPct > 0 ? "+" : ""}${plan.nutrition.calorieAdjustmentPct}%`;

  return (
    <div className="mx-auto max-w-3xl space-y-10 px-4 py-12">
      <section>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Your Plan: {SPLIT_LABELS[plan.splitType]}
        </h1>
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
          <CalendarDays className="h-5 w-5 text-emerald-600" aria-hidden />
          Weekly Schedule
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {plan.weeklySchedule.map((day) => (
            <div
              key={day.day}
              className={`rounded-xl border border-l-4 border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900 ${
                FOCUS_ACCENT[day.focus] ?? "border-l-emerald-500"
              }`}
            >
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
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900 dark:text-white">
          <Utensils className="h-5 w-5 text-emerald-600" aria-hidden />
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
          <HeartPulse className="h-5 w-5 text-emerald-600" aria-hidden />
          Cardio
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">{plan.cardio.style}</p>
      </section>

      <section>
        <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900 dark:text-white">
          <BookOpen className="h-5 w-5 text-emerald-600" aria-hidden />
          Learn More
        </h2>
        <ul className="mt-2 flex flex-wrap gap-2">
          {plan.relatedTopicSlugs.map((slug) => (
            <li key={slug}>
              <Link
                href={`/topics/${slug}`}
                className="rounded-full border border-slate-300 px-3 py-1 text-sm text-slate-700 transition hover:border-emerald-600 hover:text-emerald-600 dark:border-slate-700 dark:text-slate-300"
              >
                {TOPIC_TITLES[slug] ?? slug}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="border-t border-slate-200 pt-6 dark:border-slate-700">
        <Link href="/onboarding" className="text-sm font-medium text-emerald-600 hover:underline">
          Retake questionnaire
        </Link>
      </div>
    </div>
  );
}
