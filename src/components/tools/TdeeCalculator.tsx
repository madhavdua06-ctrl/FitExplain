"use client";

import { useState } from "react";
import { NumberField } from "./NumberField";

const ACTIVITY_MULTIPLIERS = [
  { value: "1.2", label: "Sedentary (little to no exercise)" },
  { value: "1.375", label: "Light activity (1–3 days/week)" },
  { value: "1.55", label: "Moderate activity (3–5 days/week)" },
  { value: "1.725", label: "Very active (6–7 days/week)" },
  { value: "1.9", label: "Athlete (2x/day training)" },
];

export function TdeeCalculator() {
  const [sex, setSex] = useState<"male" | "female">("male");
  const [age, setAge] = useState("30");
  const [weightKg, setWeightKg] = useState("75");
  const [heightCm, setHeightCm] = useState("175");
  const [activity, setActivity] = useState("1.55");

  const ageNum = Number(age);
  const weightNum = Number(weightKg);
  const heightNum = Number(heightCm);
  const activityNum = Number(activity);

  const valid = ageNum > 0 && weightNum > 0 && heightNum > 0;

  const bmr = valid
    ? 10 * weightNum + 6.25 * heightNum - 5 * ageNum + (sex === "male" ? 5 : -161)
    : 0;
  const tdee = bmr * activityNum;

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="space-y-4">
        <div className="flex rounded-lg border border-slate-300 p-1 dark:border-slate-700">
          {(["male", "female"] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setSex(option)}
              className={`flex-1 rounded-md py-1.5 text-sm font-medium capitalize transition ${
                sex === option
                  ? "bg-orange-500 text-white shadow-sm"
                  : "text-slate-500 dark:text-slate-400"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        <NumberField label="Age" value={age} onChange={setAge} unit="years" />
        <NumberField label="Weight" value={weightKg} onChange={setWeightKg} unit="kg" />
        <NumberField label="Height" value={heightCm} onChange={setHeightCm} unit="cm" />
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Activity level
          </span>
          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
          >
            {ACTIVITY_MULTIPLIERS.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex flex-col justify-center rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 to-white p-6 text-center dark:border-orange-900 dark:from-orange-950/20 dark:to-slate-900">
        <span className="text-xs font-semibold uppercase tracking-wide text-orange-600">
          Maintenance calories
        </span>
        <span className="mt-2 text-5xl font-bold text-slate-900 dark:text-white">
          {valid ? Math.round(tdee).toLocaleString() : "—"}
        </span>
        <span className="mt-1 text-sm text-slate-500 dark:text-slate-400">kcal / day (TDEE)</span>
        <div className="mt-4 border-t border-orange-200/60 pt-4 text-sm text-slate-600 dark:border-orange-900/60 dark:text-slate-300">
          Basal rate (BMR): <strong>{valid ? Math.round(bmr).toLocaleString() : "—"}</strong> kcal/day
        </div>
        <p className="mt-3 text-xs text-slate-400">
          Mifflin-St Jeor equation — a well-validated estimate, not a lab measurement.
        </p>
      </div>
    </div>
  );
}
