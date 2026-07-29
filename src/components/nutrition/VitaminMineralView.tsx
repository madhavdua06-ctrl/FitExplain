"use client";

import { useState } from "react";
import { NUTRIENT_KEYS, NUTRIENT_META, type NutrientKey } from "@/lib/nutrition/rda";
import { NutrientProgressBar } from "./NutrientProgressBar";

export interface DayOption {
  key: string;
  label: string;
}

export function VitaminMineralView({
  days,
  totalsByDay,
  targets,
}: {
  days: DayOption[];
  totalsByDay: Record<string, Partial<Record<NutrientKey, number>>>;
  targets: Record<NutrientKey, number>;
}) {
  const [selectedKey, setSelectedKey] = useState(days[days.length - 1]?.key);
  const totals = totalsByDay[selectedKey ?? ""] ?? {};

  return (
    <div className="space-y-4">
      <div className="flex gap-1.5 overflow-x-auto">
        {days.map((day) => (
          <button
            key={day.key}
            type="button"
            onClick={() => setSelectedKey(day.key)}
            className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              selectedKey === day.key
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                : "bg-slate-100 text-slate-500 hover:text-slate-700 dark:bg-white/5 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
          >
            {day.label}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {NUTRIENT_KEYS.map((key) => (
          <NutrientProgressBar
            key={key}
            label={NUTRIENT_META[key].label}
            unit={NUTRIENT_META[key].unit}
            consumed={totals[key] ?? 0}
            target={targets[key]}
          />
        ))}
      </div>
    </div>
  );
}
