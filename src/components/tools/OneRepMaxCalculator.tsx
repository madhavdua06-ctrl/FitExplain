"use client";

import { useState } from "react";
import { NumberField } from "./NumberField";

const PERCENTAGES = [100, 95, 90, 85, 80, 75, 70, 65, 60];

export function OneRepMaxCalculator() {
  const [weight, setWeight] = useState("100");
  const [reps, setReps] = useState("5");

  const weightNum = Number(weight);
  const repsNum = Number(reps);
  const valid = weightNum > 0 && repsNum > 0 && repsNum <= 15;

  // Epley formula
  const oneRepMax = valid ? weightNum * (1 + repsNum / 30) : 0;

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="space-y-4">
        <NumberField label="Weight lifted" value={weight} onChange={setWeight} unit="kg" />
        <NumberField label="Reps completed" value={reps} onChange={setReps} unit="reps" max={15} />
        {!valid && reps !== "" ? (
          <p className="text-xs text-amber-600 dark:text-amber-400">
            The Epley formula is most accurate under ~12 reps — for higher rep sets, treat this as a
            rough estimate.
          </p>
        ) : null}
      </div>

      <div className="flex flex-col justify-center rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-white p-6 text-center dark:border-indigo-900 dark:from-indigo-950/20 dark:to-slate-900">
        <span className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
          Estimated 1-rep max
        </span>
        <span className="mt-2 text-5xl font-bold text-slate-900 dark:text-white">
          {valid ? Math.round(oneRepMax) : "—"}
        </span>
        <span className="mt-1 text-sm text-slate-500 dark:text-slate-400">kg</span>
        <p className="mt-3 text-xs text-slate-400">Epley formula: 1RM = weight × (1 + reps / 30)</p>
      </div>

      {valid ? (
        <div className="animate-fade-in-up sm:col-span-2">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Training percentages</h3>
          <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-9">
            {PERCENTAGES.map((pct) => (
              <div
                key={pct}
                className="rounded-lg border border-slate-200 bg-white p-2 text-center dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="text-xs text-slate-400">{pct}%</div>
                <div className="font-semibold text-slate-900 dark:text-white">
                  {Math.round((oneRepMax * pct) / 100)}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
