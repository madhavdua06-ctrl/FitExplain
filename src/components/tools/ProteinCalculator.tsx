"use client";

import { useState } from "react";
import { NumberField } from "./NumberField";

const GOAL_RANGES = {
  "Weight loss": { min: 1.8, max: 2.2 },
  "Muscle gain": { min: 1.6, max: 2.2 },
  "Endurance / general health": { min: 1.2, max: 1.6 },
} as const;

export type GoalKey = keyof typeof GOAL_RANGES;

export function ProteinCalculator({
  initialWeightKg,
  initialGoal,
}: {
  initialWeightKg?: number;
  initialGoal?: GoalKey;
}) {
  const [weightKg, setWeightKg] = useState(initialWeightKg ? String(initialWeightKg) : "75");
  const [goal, setGoal] = useState<GoalKey>(initialGoal ?? "Muscle gain");

  const weightNum = Number(weightKg);
  const valid = weightNum > 0;
  const { min, max } = GOAL_RANGES[goal];
  const minGrams = valid ? Math.round(weightNum * min) : 0;
  const maxGrams = valid ? Math.round(weightNum * max) : 0;

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="space-y-4">
        <NumberField label="Bodyweight" value={weightKg} onChange={setWeightKg} unit="kg" />
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 dark:text-slate-300">Goal</span>
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value as GoalKey)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
          >
            {Object.keys(GOAL_RANGES).map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex flex-col justify-center rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6 text-center dark:border-emerald-900 dark:from-emerald-950/20 dark:to-slate-900">
        <span className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
          Daily protein target
        </span>
        <span className="mt-2 text-5xl font-bold text-slate-900 dark:text-white">
          {valid ? `${minGrams}–${maxGrams}` : "—"}
        </span>
        <span className="mt-1 text-sm text-slate-500 dark:text-slate-400">grams / day</span>
        <p className="mt-3 text-xs text-slate-400">
          {min}–{max}g per kg of bodyweight for {goal.toLowerCase()}.
        </p>
      </div>
    </div>
  );
}
