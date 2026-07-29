"use client";

import { useState } from "react";
import { NumberField } from "./NumberField";

const CATEGORIES = [
  { label: "Sedentary", max: 40 },
  { label: "Recreational", max: 50 },
  { label: "Trained", max: 65 },
  { label: "Elite endurance", max: Infinity },
];

function categoryFor(vo2: number) {
  return CATEGORIES.find((c) => vo2 < c.max)?.label ?? "Elite endurance";
}

export function Vo2MaxCalculator() {
  const [distance, setDistance] = useState("2400");

  const distanceNum = Number(distance);
  const valid = distanceNum > 504.9;
  const vo2max = valid ? (distanceNum - 504.9) / 44.73 : 0;

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="space-y-4">
        <NumberField label="Distance covered in 12 minutes" value={distance} onChange={setDistance} unit="m" />
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Run as far as you can, at a steady hard effort, for exactly 12 minutes, then enter the
          distance covered.
        </p>
      </div>

      <div className="flex flex-col justify-center rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6 text-center dark:border-emerald-900 dark:from-emerald-950/20 dark:to-slate-900">
        <span className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
          Estimated VO2 max
        </span>
        <span className="mt-2 text-5xl font-bold text-slate-900 dark:text-white">
          {valid ? vo2max.toFixed(1) : "—"}
        </span>
        <span className="mt-1 text-sm text-slate-500 dark:text-slate-400">mL O2 · kg⁻¹ · min⁻¹</span>
        {valid ? (
          <span className="mt-2 inline-flex items-center justify-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
            {categoryFor(vo2max)} range
          </span>
        ) : null}
        <p className="mt-3 text-xs text-slate-400">
          Cooper 12-minute run test — Cooper, K.H. (1968), JAMA. A field estimate, not a lab
          measurement.
        </p>
      </div>
    </div>
  );
}
